export type AppView = 
  | 'beranda'
  | 'katalog-kue'
  | 'detail-produk'
  | 'formulir-pre-order'
  | 'pembayaran-dp'
  | 'status-pesanan'
  | 'dashboard-kpi'
  | 'kalender-produksi-oven'
  | 'manajemen-pesanan'
  | 'verifikasi-pembayaran';

export type ProductCategory = 'birthday' | 'wedding' | 'kue-basah' | 'brownies' | 'tart' | 'hampers';

export interface DiameterOption {
  size: string; // e.g. "Diameter 16 cm"
  servings: string; // e.g. "4 - 6 Porsi"
  price: number;
  formattedPrice: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  formattedPrice: string;
  leadTime: string; // e.g. "Pesan Min. H-2"
  shortDesc: string;
  fullDesc: string;
  image: string;
  galleryImages: string[];
  badge?: string; // e.g. "Favorit", "Pilihan Spesial"
  diameterOptions: DiameterOption[];
  flavorProfile: string[];
  ingredients: string[];
  storageAdvice: string;
}

export interface PreOrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  size: string;
  unitPrice: number;
  quantity: number;
  customMessage: string;
  candleOption: string;
  greetingCard: string;
  totalPrice: number;
}

export type PaymentStatus = 'pending_dp' | 'dp_paid' | 'fully_paid';
export type OrderProductionStatus = 
  | 'pending_verification' 
  | 'scheduled_oven' 
  | 'baking' 
  | 'decorating_qc' 
  | 'in_delivery' 
  | 'completed';

export interface TimelineEvent {
  title: string;
  desc: string;
  time: string;
  done: boolean;
  current?: boolean;
}

export interface Order {
  id: string; // e.g. "#SB-2026-8942"
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryMethod: 'courier' | 'pickup';
  deliveryAddress: string;
  deliveryDate: string; // e.g. "18 Okt 2026"
  timeSlot: string; // e.g. "13:00 – 16:00 WIB"
  notes?: string;
  items: PreOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentOption: 'dp_50' | 'full';
  dpAmount: number;
  remainingAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderProductionStatus;
  paymentMethod?: string;
  transferProofUrl?: string;
  createdAt: string;
  timeline: TimelineEvent[];
}

export interface OvenSlotDay {
  dayLabel: string;
  dateStr: string;
  bookedSlots: number;
  totalSlots: number;
  isToday?: boolean;
  status: 'available' | 'low' | 'full';
}

export interface OvenBatch {
  id: string;
  name: string;
  timeWindow: string;
  temperature: string;
  orderCount: number;
  status: 'completed' | 'in_progress' | 'scheduled';
  description: string;
  orders: { orderId: string; cake: string; size: string; station: string }[];
}

export interface PaymentVerification {
  id: string;
  orderId: string;
  customerName: string;
  phone: string;
  paymentMethod: string;
  productName: string;
  cakeDetails: string;
  eventDate: string;
  nominal: number;
  formattedNominal: string;
  timestamp: string;
  slipUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}
