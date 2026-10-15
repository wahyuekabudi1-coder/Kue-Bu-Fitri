import fs from 'fs';
import path from 'path';
import { Product, Order, PaymentVerification, OvenSlotDay, OvenBatch } from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_PAYMENT_VERIFICATIONS, 
  INITIAL_OVEN_SLOTS, 
  INITIAL_OVEN_BATCHES 
} from '../data/initialData';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'sweet_bakery_db.json');

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'kitchen_admin' | 'admin';
  passwordHash: string;
  createdAt: string;
}

export interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  paymentVerifications: PaymentVerification[];
  ovenSlots: OvenSlotDay[];
  ovenBatches: OvenBatch[];
  adminUsers: AdminUser[];
}

// In-memory mutex for atomic capacity reservation
let isTransactionLocked = false;
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function acquireLock(maxWaitMs = 5000): Promise<() => void> {
  const start = Date.now();
  while (isTransactionLocked) {
    if (Date.now() - start > maxWaitMs) {
      throw new Error('Sistem sedang sibuk memproses pesanan lain. Silakan coba sesaat lagi.');
    }
    await wait(25);
  }
  isTransactionLocked = true;
  return () => {
    isTransactionLocked = false;
  };
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDataDir();
    this.data = this.loadData();
  }

  private ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const uploadsDir = path.join(DATA_DIR, 'uploads', 'payment-proofs');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
  }

  private loadData(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          products: parsed.products || INITIAL_PRODUCTS,
          orders: parsed.orders || INITIAL_ORDERS,
          paymentVerifications: parsed.paymentVerifications || INITIAL_PAYMENT_VERIFICATIONS,
          ovenSlots: parsed.ovenSlots || INITIAL_OVEN_SLOTS,
          ovenBatches: parsed.ovenBatches || INITIAL_OVEN_BATCHES,
          adminUsers: parsed.adminUsers || []
        };
      } catch (err) {
        console.error('Gagal membaca data database Sweet Bakery, memulihkan data awal:', err);
      }
    }

    const initial: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      orders: INITIAL_ORDERS,
      paymentVerifications: INITIAL_PAYMENT_VERIFICATIONS,
      ovenSlots: INITIAL_OVEN_SLOTS,
      ovenBatches: INITIAL_OVEN_BATCHES,
      adminUsers: []
    };
    this.saveData(initial);
    return initial;
  }

  private saveData(dataToSave: DatabaseSchema) {
    this.ensureDataDir();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(dataToSave, null, 2), 'utf-8');
    fs.renameSync(tempFile, DB_FILE);
  }

  // Public Getters
  public getProducts(): Product[] {
    return this.data.products;
  }

  public getOrders(): Order[] {
    return this.data.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find(o => o.id.toLowerCase() === id.toLowerCase());
  }

  public findOrders(query: string): Order[] {
    const q = query.trim().toLowerCase();
    const cleanQ = q.replace(/[^0-9]/g, '');
    return this.data.orders.filter(o => 
      o.id.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      (cleanQ.length >= 4 && o.customerPhone.replace(/[^0-9]/g, '').includes(cleanQ))
    );
  }

  public getPaymentVerifications(): PaymentVerification[] {
    return this.data.paymentVerifications;
  }

  public getOvenSlots(): OvenSlotDay[] {
    return this.data.ovenSlots;
  }

  public getOvenBatches(): OvenBatch[] {
    return this.data.ovenBatches;
  }

  public getAdminUsers(): AdminUser[] {
    return this.data.adminUsers;
  }

  public findAdminByEmail(email: string): AdminUser | undefined {
    return this.data.adminUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public saveAdminUsers(users: AdminUser[]) {
    this.data.adminUsers = users;
    this.saveData(this.data);
  }

  // Atomic pre-order creation with oven slot capacity validation & race condition lock
  public async createPreOrder(newOrder: Order): Promise<Order> {
    const release = await acquireLock();
    try {
      // Re-read latest data
      this.data = this.loadData();

      // Validate oven capacity for deliveryDate
      const slotIndex = this.data.ovenSlots.findIndex(s => 
        s.dateStr === newOrder.deliveryDate || 
        s.dateStr.includes(newOrder.deliveryDate.slice(0, 2))
      );

      if (slotIndex !== -1) {
        const slot = this.data.ovenSlots[slotIndex];
        if (slot.bookedSlots >= slot.totalSlots) {
          throw new Error('Tanggal ini sudah penuh. Silakan pilih tanggal lain.');
        }

        // Increment booked slot
        const nextBooked = slot.bookedSlots + 1;
        this.data.ovenSlots[slotIndex] = {
          ...slot,
          bookedSlots: nextBooked,
          status: nextBooked >= slot.totalSlots ? 'full' : nextBooked >= slot.totalSlots - 2 ? 'low' : 'available'
        };
      }

      // Add order
      this.data.orders = [newOrder, ...this.data.orders];
      this.saveData(this.data);
      return newOrder;
    } finally {
      release();
    }
  }

  // Record payment proof
  public async recordPaymentProof(
    orderId: string, 
    method: string, 
    proofPath: string
  ): Promise<{ order: Order; pv: PaymentVerification }> {
    const release = await acquireLock();
    try {
      this.data = this.loadData();
      const order = this.data.orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error(`Pesanan dengan ID ${orderId} tidak ditemukan.`);
      }

      // Keep payment status as pending_dp until verified by admin!
      const updatedTimeline = order.timeline.map((evt, idx) => {
        if (idx === 1) {
          return {
            ...evt,
            done: false,
            current: true,
            title: 'Bukti Pembayaran Sedang Diperiksa',
            desc: 'Bukti transfer sedang diperiksa oleh admin toko Sweet Bakery.',
            time: 'Baru saja diunggah'
          };
        }
        return evt;
      });

      order.paymentMethod = method;
      order.transferProofUrl = proofPath;
      order.paymentStatus = 'pending_dp';
      order.orderStatus = 'pending_verification';
      order.timeline = updatedTimeline;

      const newPV: PaymentVerification = {
        id: `pv-${Date.now()}`,
        orderId: order.id,
        customerName: order.customerName,
        phone: order.customerPhone,
        paymentMethod: method,
        productName: order.items[0]?.productName || 'Kue Pilihan',
        cakeDetails: `Acara: ${order.deliveryDate} · ${order.deliveryMethod === 'courier' ? 'Diantar Kurir Toko' : 'Ambil Sendiri di Toko'}`,
        eventDate: order.deliveryDate,
        nominal: order.dpAmount,
        formattedNominal: `Rp ${order.dpAmount.toLocaleString('id-ID')}`,
        timestamp: 'Hari ini, baru saja',
        slipUrl: proofPath,
        status: 'pending'
      };

      this.data.paymentVerifications = [newPV, ...this.data.paymentVerifications];
      this.saveData(this.data);

      return { order, pv: newPV };
    } finally {
      release();
    }
  }

  // Admin approves payment verification
  public async verifyPayment(
    pvId: string, 
    adminName: string
  ): Promise<{ pv: PaymentVerification; order: Order }> {
    const release = await acquireLock();
    try {
      this.data = this.loadData();
      const pv = this.data.paymentVerifications.find(p => p.id === pvId);
      if (!pv) {
        throw new Error(`Verifikasi pembayaran dengan ID ${pvId} tidak ditemukan.`);
      }

      const verifiedAt = new Date().toLocaleString('id-ID');
      pv.status = 'approved';
      (pv as any).verifiedBy = adminName;
      (pv as any).verifiedAt = verifiedAt;

      const order = this.data.orders.find(o => o.id === pv.orderId);
      if (!order) {
        throw new Error(`Pesanan ${pv.orderId} tidak ditemukan.`);
      }

      order.paymentStatus = 'dp_paid';
      order.orderStatus = 'scheduled_oven';
      order.timeline = order.timeline.map((evt, idx) => {
        if (idx === 1) {
          return {
            ...evt,
            done: true,
            current: false,
            title: 'Pembayaran Telah Dikonfirmasi',
            desc: `DP sebesar ${pv.formattedNominal} telah diverifikasi oleh admin ${adminName}.`
          };
        }
        if (idx === 2) return { ...evt, current: true };
        return evt;
      });

      this.saveData(this.data);
      return { pv, order };
    } finally {
      release();
    }
  }

  // Admin rejects payment verification
  public async rejectPayment(
    pvId: string, 
    reason: string, 
    adminName: string
  ): Promise<{ pv: PaymentVerification; order: Order }> {
    const release = await acquireLock();
    try {
      this.data = this.loadData();
      const pv = this.data.paymentVerifications.find(p => p.id === pvId);
      if (!pv) {
        throw new Error(`Verifikasi pembayaran dengan ID ${pvId} tidak ditemukan.`);
      }

      const rejectedAt = new Date().toLocaleString('id-ID');
      pv.status = 'rejected';
      pv.rejectionReason = reason;
      (pv as any).rejectedBy = adminName;
      (pv as any).rejectedAt = rejectedAt;

      const order = this.data.orders.find(o => o.id === pv.orderId);
      if (order) {
        order.paymentStatus = 'pending_dp';
        order.orderStatus = 'pending_verification';
        order.timeline = order.timeline.map((evt, idx) => {
          if (idx === 1) {
            return {
              ...evt,
              done: false,
              current: true,
              title: 'Bukti Pembayaran Ditolak',
              desc: `Alasan penolakan: ${reason} (Diverifikasi oleh ${adminName}). Silakan unggah bukti transfer yang sesuai.`
            };
          }
          return evt;
        });
      }

      this.saveData(this.data);
      return { pv, order: order! };
    } finally {
      release();
    }
  }

  // Update order production status
  public async updateOrderStatus(
    orderId: string, 
    newStatus: string
  ): Promise<Order> {
    const release = await acquireLock();
    try {
      this.data = this.loadData();
      const order = this.data.orders.find(o => o.id === orderId);
      if (!order) {
        throw new Error(`Pesanan ${orderId} tidak ditemukan.`);
      }

      order.orderStatus = newStatus as any;
      order.timeline = order.timeline.map((evt, idx) => {
        if (newStatus === 'scheduled_oven') {
          if (idx <= 1) return { ...evt, done: true, current: false };
          if (idx === 2) return { ...evt, done: false, current: true };
          return { ...evt, done: false, current: false };
        }
        if (newStatus === 'baking') {
          if (idx <= 2) return { ...evt, done: true, current: false };
          if (idx === 2) return { ...evt, done: false, current: true, title: 'Sedang Dipanggang di Dapur' };
          return { ...evt, done: false, current: false };
        }
        if (newStatus === 'decorating_qc') {
          if (idx <= 2) return { ...evt, done: true, current: false };
          if (idx === 3) return { ...evt, done: false, current: true };
          return { ...evt, done: false, current: false };
        }
        if (newStatus === 'in_delivery') {
          if (idx <= 3) return { ...evt, done: true, current: false };
          if (idx === 4) return { ...evt, done: false, current: true };
          return { ...evt, done: false, current: false };
        }
        if (newStatus === 'completed') {
          return { ...evt, done: true, current: false };
        }
        return evt;
      });

      this.saveData(this.data);
      return order;
    } finally {
      release();
    }
  }

  // Update oven batch status
  public async updateBatchStatus(batchId: string, newStatus: string): Promise<OvenBatch> {
    const release = await acquireLock();
    try {
      this.data = this.loadData();
      const batch = this.data.ovenBatches.find(b => b.id === batchId);
      if (!batch) {
        throw new Error(`Batch oven ${batchId} tidak ditemukan.`);
      }
      batch.status = newStatus as any;
      this.saveData(this.data);
      return batch;
    } finally {
      release();
    }
  }
}

export const db = new Database();
