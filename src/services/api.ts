import { Order, PaymentVerification, OvenSlotDay, OvenBatch, Product, PreOrderItem, OrderProductionStatus } from '../types';

const TOKEN_KEY = 'sweet_bakery_admin_jwt';

export function getAdminToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string | null): void {
  try {
    if (token) {
      sessionStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  } catch (err) {
    console.error('Gagal menyimpan token ke sessionStorage', err);
  }
}

function getAuthHeaders(): HeadersInit {
  const token = getAdminToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Products
  async getProducts(): Promise<Product[]> {
    const res = await fetch('/api/products');
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat produk.');
    return json.data;
  },

  // Oven slots
  async getOvenSlots(): Promise<OvenSlotDay[]> {
    const res = await fetch('/api/oven-slots');
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat jadwal oven.');
    return json.data;
  },

  // Track order
  async trackOrder(query: string): Promise<Order> {
    const res = await fetch(`/api/orders/track?q=${encodeURIComponent(query)}`);
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Pesanan tidak ditemukan.');
    return json.data;
  },

  // Create pre-order
  async createOrder(payload: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryMethod: 'courier' | 'pickup';
    deliveryAddress: string;
    deliveryDate: string;
    timeSlot: string;
    notes?: string;
    items: PreOrderItem[];
    paymentOption: 'dp_50' | 'full';
  }): Promise<Order> {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal mengirim pesanan.');
    return json.data;
  },

  // Upload payment proof
  async uploadPaymentProof(orderId: string, method: string, file: File | Blob): Promise<{ order: Order; pv: PaymentVerification }> {
    const formData = new FormData();
    formData.append('proof', file, 'struk-transfer.jpg');
    formData.append('method', method);

    const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/payment-proof`, {
      method: 'POST',
      body: formData
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal mengunggah bukti pembayaran.');
    return json.data;
  },

  // Auth: Login
  async loginAdmin(email: string, password: string): Promise<{ token: string; user: any }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal masuk sebagai admin.');
    setAdminToken(json.token);
    return json;
  },

  // Auth: Check me
  async getAdminMe(): Promise<any> {
    const token = getAdminToken();
    if (!token) return null;
    const res = await fetch('/api/auth/me', {
      headers: getAuthHeaders()
    });
    if (!res.ok) {
      setAdminToken(null);
      return null;
    }
    const json = await res.json();
    return json.user;
  },

  logoutAdmin(): void {
    setAdminToken(null);
  },

  // Admin: Get all orders
  async getAdminOrders(): Promise<Order[]> {
    const res = await fetch('/api/admin/orders', {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat pesanan pengelola.');
    return json.data;
  },

  // Admin: Update order status
  async updateOrderStatus(orderId: string, status: OrderProductionStatus): Promise<Order> {
    const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderId)}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memperbarui status pesanan.');
    return json.data;
  },

  // Admin: Get payment verifications
  async getPaymentVerifications(): Promise<PaymentVerification[]> {
    const res = await fetch('/api/admin/payment-verifications', {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat verifikasi pembayaran.');
    return json.data;
  },

  // Admin: Approve payment verification
  async verifyPayment(pvId: string): Promise<{ pv: PaymentVerification; order: Order }> {
    const res = await fetch(`/api/admin/payment-verifications/${encodeURIComponent(pvId)}/verify`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memverifikasi pembayaran.');
    return json.data;
  },

  // Admin: Reject payment verification
  async rejectPayment(pvId: string, reason: string): Promise<{ pv: PaymentVerification; order: Order }> {
    const res = await fetch(`/api/admin/payment-verifications/${encodeURIComponent(pvId)}/reject`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ reason })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal menolak pembayaran.');
    return json.data;
  },

  // Admin: Get batches
  async getOvenBatches(): Promise<OvenBatch[]> {
    const res = await fetch('/api/admin/oven-batches', {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memuat batch oven.');
    return json.data;
  },

  // Admin: Update batch status
  async updateBatchStatus(batchId: string, status: string): Promise<OvenBatch> {
    const res = await fetch(`/api/admin/oven-batches/${encodeURIComponent(batchId)}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Gagal memperbarui status batch.');
    return json.data;
  }
};
