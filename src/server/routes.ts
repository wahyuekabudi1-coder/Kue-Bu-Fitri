import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import { db } from './db';
import { requireAdminAuth, generateAdminToken, AuthenticatedRequest } from './auth';
import { Order } from '../types';

export const apiRouter = express.Router();

const UPLOADS_DIR = path.resolve(process.cwd(), 'data', 'uploads', 'payment-proofs');

// Configure Multer for secure disk storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    cb(null, UPLOADS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `proof-${uniqueSuffix}${cleanExt}`);
  }
});

const fileFilter = (
  _req: Request, 
  file: Express.Multer.File, 
  cb: multer.FileFilterCallback
) => {
  const allowedMime = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format file tidak didukung. Harap unggah berkas gambar (JPG, PNG, atau WEBP).'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB
  fileFilter
});

// ==========================================
// 1. PUBLIC ENDPOINTS
// ==========================================

// GET /api/products
apiRouter.get('/products', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getProducts() });
});

// GET /api/oven-slots
apiRouter.get('/oven-slots', (_req: Request, res: Response) => {
  res.json({ success: true, data: db.getOvenSlots() });
});

// GET /api/orders/track?q=...
apiRouter.get('/orders/track', (req: Request, res: Response) => {
  const query = (req.query.q as string) || '';
  if (!query.trim()) {
    return res.status(400).json({ success: false, message: 'Masukkan nomor pesanan atau nomor HP.' });
  }

  const matches = db.findOrders(query);
  if (matches.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'Pesanan tidak ditemukan. Pastikan nomor pesanan (contoh: #SB-2026-8942) atau nomor HP sudah benar.'
    });
  }

  res.json({ success: true, data: matches[0], totalFound: matches.length });
});

// POST /api/orders (Submit Pre-Order with server-side capacity validation)
apiRouter.post('/orders', async (req: Request, res: Response) => {
  try {
    const { 
      customerName, 
      customerPhone, 
      customerEmail, 
      deliveryMethod, 
      deliveryAddress, 
      deliveryDate, 
      timeSlot, 
      notes, 
      items, 
      paymentOption 
    } = req.body;

    if (!customerName || !customerPhone || !deliveryDate || !items || !items.length) {
      return res.status(400).json({
        success: false,
        message: 'Data pesanan tidak lengkap. Harap periksa nama, telepon, tanggal, dan kue pilihan.'
      });
    }

    const subtotal = items.reduce((acc: number, curr: any) => acc + (curr.totalPrice || 0), 0);
    const deliveryFee = deliveryMethod === 'courier' ? 60000 : 0;
    const total = subtotal + deliveryFee;
    const dpAmount = paymentOption === 'dp_50' ? Math.ceil(total * 0.5) : total;
    const remainingAmount = total - dpAmount;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `#SB-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: newOrderId,
      customerName,
      customerPhone,
      customerEmail: customerEmail || '',
      deliveryMethod: deliveryMethod || 'pickup',
      deliveryAddress: deliveryAddress || 'Toko Sweet Bakery: Jl. Senopati No. 42, Jakarta Selatan',
      deliveryDate,
      timeSlot: timeSlot || '13:00 – 16:00 WIB',
      notes: notes || '',
      items,
      subtotal,
      deliveryFee,
      total,
      paymentOption: paymentOption || 'dp_50',
      dpAmount,
      remainingAmount,
      paymentStatus: 'pending_dp',
      orderStatus: 'pending_verification',
      createdAt: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      timeline: [
        { title: 'Pesanan Diterima', desc: 'Pesanan berhasil dicatat dan sedang menunggu konfirmasi pembayaran.', time: 'Baru saja', done: true, current: true },
        { title: 'Menunggu Pembayaran DP', desc: 'Silakan transfer uang muka untuk mengunci jadwal pesananmu.', time: 'Menunggu transfer', done: false },
        { title: 'Jadwal Pembuatan Masuk Dapur', desc: 'Bahan disiapkan dan kue dijadwalkan di dapur.', time: `Estimasi H-1 (${deliveryDate})`, done: false },
        { title: 'Dekorasi & Pengecekan Kue', desc: 'Kue dihias dan dicek kerapiannya sebelum siap dikirim.', time: deliveryDate, done: false },
        { title: 'Pengantaran Kue', desc: 'Kue diantar dengan aman ke alamat tujuan.', time: `${deliveryDate}, ${timeSlot || ''}`, done: false }
      ]
    };

    // Atomic insert with slot check
    const created = await db.createPreOrder(newOrder);

    res.status(201).json({
      success: true,
      message: 'Pesanan berhasil dibuat.',
      data: created
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message || 'Gagal membuat pesanan.'
    });
  }
});

// POST /api/orders/:orderId/payment-proof (Upload Struk Transfer)
apiRouter.post(
  '/orders/:orderId/payment-proof', 
  upload.single('proof'), 
  async (req: Request, res: Response) => {
    try {
      const orderId = String(req.params.orderId);
      const { method } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Berkas bukti transfer wajib diunggah.'
        });
      }

      // Stored relative URL (Protected backend file route)
      const fileUrl = `/api/admin/payment-proofs/${req.file.filename}`;
      const result = await db.recordPaymentProof(orderId, method || 'Transfer Bank', fileUrl);

      res.json({
        success: true,
        message: 'Bukti transfer berhasil diunggah dan sedang menunggu verifikasi admin toko.',
        data: result
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message || 'Gagal mengunggah bukti pembayaran.'
      });
    }
  }
);

// ==========================================
// 2. AUTHENTICATION ENDPOINTS
// ==========================================

// POST /api/auth/login
apiRouter.post('/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email dan kata sandi wajib diisi.'
    });
  }

  const admin = db.findAdminByEmail(email.trim());
  if (!admin) {
    return res.status(401).json({
      success: false,
      message: 'Email atau kata sandi pengelola salah.'
    });
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      message: 'Email atau kata sandi pengelola salah.'
    });
  }

  const token = generateAdminToken(admin);

  res.json({
    success: true,
    message: 'Login berhasil.',
    token,
    user: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role
    }
  });
});

// GET /api/auth/me
apiRouter.get('/auth/me', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  res.json({
    success: true,
    user: req.adminUser
  });
});

// ==========================================
// 3. PROTECTED ADMIN ENDPOINTS
// ==========================================

// GET /api/admin/orders
apiRouter.get('/admin/orders', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: db.getOrders() });
});

// PATCH /api/admin/orders/:id/status
apiRouter.patch('/admin/orders/:id/status', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status produksi harus disertakan.' });
    }

    const updated = await db.updateOrderStatus(id, status);
    res.json({ success: true, message: 'Status produksi berhasil diperbarui.', data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message || 'Gagal memperbarui status pesanan.' });
  }
});

// GET /api/admin/payment-verifications
apiRouter.get('/admin/payment-verifications', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: db.getPaymentVerifications() });
});

// POST /api/admin/payment-verifications/:id/verify
apiRouter.post('/admin/payment-verifications/:id/verify', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const adminName = req.adminUser?.name || 'Admin Toko';

    const result = await db.verifyPayment(id, adminName);
    res.json({
      success: true,
      message: `Pembayaran pesanan ${result.order.id} berhasil disetujui oleh ${adminName}.`,
      data: result
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message || 'Gagal memverifikasi pembayaran.' });
  }
});

// POST /api/admin/payment-verifications/:id/reject
apiRouter.post('/admin/payment-verifications/:id/reject', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { reason } = req.body;
    const adminName = req.adminUser?.name || 'Admin Toko';

    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, message: 'Alasan penolakan wajib dicantumkan.' });
    }

    const result = await db.rejectPayment(id, reason, adminName);
    res.json({
      success: true,
      message: `Pembayaran pesanan ${result.order.id} ditolak.`,
      data: result
    });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message || 'Gagal menolak pembayaran.' });
  }
});

// GET /api/admin/oven-batches
apiRouter.get('/admin/oven-batches', requireAdminAuth, (_req: AuthenticatedRequest, res: Response) => {
  res.json({ success: true, data: db.getOvenBatches() });
});

// PATCH /api/admin/oven-batches/:id/status
apiRouter.patch('/admin/oven-batches/:id/status', requireAdminAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const id = String(req.params.id);
    const { status } = req.body;
    const updated = await db.updateBatchStatus(id, status);
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// GET /api/admin/payment-proofs/:filename (PROTECTED FILE ACCESS)
apiRouter.get('/admin/payment-proofs/:filename', requireAdminAuth, (req: AuthenticatedRequest, res: Response) => {
  const filename = path.basename(String(req.params.filename));
  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: 'Berkas bukti pembayaran tidak ditemukan di server.' });
  }

  res.sendFile(filePath);
});
