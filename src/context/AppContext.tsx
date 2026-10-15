import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  AppView, 
  Product, 
  PreOrderItem, 
  Order, 
  PaymentVerification, 
  OvenSlotDay, 
  OvenBatch, 
  OrderProductionStatus 
} from '../types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_PAYMENT_VERIFICATIONS, 
  INITIAL_OVEN_SLOTS, 
  INITIAL_OVEN_BATCHES 
} from '../data/initialData';

interface AppContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  products: Product[];
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  cartItems: PreOrderItem[];
  addToCart: (item: PreOrderItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  paymentVerifications: PaymentVerification[];
  ovenSlots: OvenSlotDay[];
  ovenBatches: OvenBatch[];
  submitPreOrder: (formData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryMethod: 'courier' | 'pickup';
    deliveryAddress: string;
    deliveryDate: string;
    timeSlot: string;
    notes?: string;
    paymentOption: 'dp_50' | 'full';
  }) => Order;
  confirmPaymentProof: (orderId: string, method: string, proofUrl?: string) => void;
  verifyPayment: (pvId: string) => void;
  rejectPayment: (pvId: string, reason: string) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderProductionStatus) => void;
  findOrder: (query: string) => Order | undefined;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('beranda');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);
  
  // Default cart item
  const [cartItems, setCartItems] = useState<PreOrderItem[]>([
    {
      id: 'cart-1',
      productId: INITIAL_PRODUCTS[0].id,
      productName: INITIAL_PRODUCTS[0].name,
      productImage: INITIAL_PRODUCTS[0].image,
      size: 'Diameter 16 cm (4-6 Porsi)',
      unitPrice: 385000,
      quantity: 1,
      customMessage: 'Selamat Ulang Tahun Sarah! ✨',
      candleOption: 'Lilin Spiral Gold (2 pcs)',
      greetingCard: 'Semoga panjang umur, sehat selalu, dan bahagia bersama keluarga.',
      totalPrice: 385000
    }
  ]);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0]);
  const [paymentVerifications, setPaymentVerifications] = useState<PaymentVerification[]>(INITIAL_PAYMENT_VERIFICATIONS);
  const [ovenSlots, setOvenSlots] = useState<OvenSlotDay[]>(INITIAL_OVEN_SLOTS);
  const [ovenBatches, setOvenBatches] = useState<OvenBatch[]>(INITIAL_OVEN_BATCHES);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '');
      if (path === '' || path === 'beranda') setCurrentView('beranda');
      else if (path === 'katalog-kue') setCurrentView('katalog-kue');
      else if (path === 'detail-produk') setCurrentView('detail-produk');
      else if (path === 'formulir-pre-order' || path === 'keranjang-pre-order') setCurrentView('formulir-pre-order');
      else if (path === 'pembayaran-dp') setCurrentView('pembayaran-dp');
      else if (path === 'status-pesanan') setCurrentView('status-pesanan');
      else if (path === 'admin' || path === 'dashboard-kpi') setCurrentView('dashboard-kpi');
      else if (path === 'kalender-produksi-oven') setCurrentView('kalender-produksi-oven');
      else if (path === 'manajemen-pesanan') setCurrentView('manajemen-pesanan');
      else if (path === 'verifikasi-pembayaran') setCurrentView('verifikasi-pembayaran');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const changeView = (view: AppView) => {
    setCurrentView(view);
    const path = view === 'beranda' ? '/' : `/${view}`;
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (item: PreOrderItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const submitPreOrder = (formData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryMethod: 'courier' | 'pickup';
    deliveryAddress: string;
    deliveryDate: string;
    timeSlot: string;
    notes?: string;
    paymentOption: 'dp_50' | 'full';
  }): Order => {
    const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const deliveryFee = formData.deliveryMethod === 'courier' ? 60000 : 0;
    const total = subtotal + deliveryFee;
    const dpAmount = formData.paymentOption === 'dp_50' ? Math.round(total * 0.5) : total;
    const remainingAmount = total - dpAmount;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrderId = `#SB-2026-${randomSuffix}`;

    const newOrder: Order = {
      id: newOrderId,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone,
      customerEmail: formData.customerEmail,
      deliveryMethod: formData.deliveryMethod,
      deliveryAddress: formData.deliveryAddress,
      deliveryDate: formData.deliveryDate,
      timeSlot: formData.timeSlot,
      notes: formData.notes,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      paymentOption: formData.paymentOption,
      dpAmount,
      remainingAmount,
      paymentStatus: 'pending_dp',
      orderStatus: 'pending_verification',
      createdAt: 'Hari ini, baru saja',
      timeline: [
        { title: 'Pesanan Diterima', desc: 'Pesanan berhasil dikirim dan sedang menunggu konfirmasi.', time: 'Baru saja', done: true, current: true },
        { title: 'Menunggu Pembayaran DP', desc: 'Silakan transfer uang muka untuk mengunci jadwal pesananmu.', time: 'Menunggu transfer', done: false },
        { title: 'Jadwal Pembuatan Masuk Dapur', desc: 'Bahan disiapkan dan kue dijadwalkan di dapur.', time: `Estimasi H-1 (${formData.deliveryDate})`, done: false },
        { title: 'Dekorasi & Pengecekan Kue', desc: 'Kue dihias dan dicek kerapiannya sebelum siap dikirim.', time: formData.deliveryDate, done: false },
        { title: 'Pengantaran Kue', desc: 'Kue diantar dengan aman ke alamat tujuan.', time: `${formData.deliveryDate}, ${formData.timeSlot}`, done: false }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // Update daily slots
    setOvenSlots(prev => prev.map(slot => {
      if (slot.dateStr.includes(formData.deliveryDate.slice(0, 2))) {
        const nextBooked = Math.min(slot.totalSlots, slot.bookedSlots + 1);
        return {
          ...slot,
          bookedSlots: nextBooked,
          status: nextBooked >= slot.totalSlots ? 'full' : nextBooked >= slot.totalSlots - 2 ? 'low' : 'available'
        };
      }
      return slot;
    }));

    return newOrder;
  };

  const confirmPaymentProof = (orderId: string, method: string, proofUrl?: string) => {
    const defaultProof = proofUrl || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80';
    
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedTimeline = order.timeline.map((evt, idx) => {
          if (idx === 1) return { ...evt, done: true, current: true, title: 'Bukti Pembayaran Sedang Diperiksa', time: 'Baru saja diunggah' };
          return evt;
        });
        return {
          ...order,
          paymentMethod: method,
          transferProofUrl: defaultProof,
          timeline: updatedTimeline
        };
      }
      return order;
    }));

    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => prev ? {
        ...prev,
        paymentMethod: method,
        transferProofUrl: defaultProof
      } : null);
    }

    const targetOrder = orders.find(o => o.id === orderId) || activeOrder;
    if (targetOrder) {
      const newPV: PaymentVerification = {
        id: `pv-${Date.now()}`,
        orderId: targetOrder.id,
        customerName: targetOrder.customerName,
        phone: targetOrder.customerPhone,
        paymentMethod: method,
        productName: targetOrder.items[0]?.productName || 'Kue Pilihan',
        cakeDetails: `Acara: ${targetOrder.deliveryDate} · ${targetOrder.deliveryMethod === 'courier' ? 'Diantar Kurir Toko' : 'Ambil Sendiri di Toko'}`,
        eventDate: targetOrder.deliveryDate,
        nominal: targetOrder.dpAmount,
        formattedNominal: `Rp ${targetOrder.dpAmount.toLocaleString('id-ID')}`,
        timestamp: 'Hari ini, baru saja',
        slipUrl: defaultProof,
        status: 'pending'
      };
      setPaymentVerifications(prev => [newPV, ...prev]);
    }
  };

  const verifyPayment = (pvId: string) => {
    const pv = paymentVerifications.find(p => p.id === pvId);
    if (!pv) return;

    setPaymentVerifications(prev => prev.map(p => p.id === pvId ? { ...p, status: 'approved' } : p));

    setOrders(prev => prev.map(o => {
      if (o.id === pv.orderId) {
        const updatedTimeline = o.timeline.map((evt, idx) => {
          if (idx === 1) return { ...evt, done: true, current: false, title: 'Pembayaran Telah Dikonfirmasi' };
          if (idx === 2) return { ...evt, current: true };
          return evt;
        });
        return {
          ...o,
          paymentStatus: 'dp_paid',
          orderStatus: 'scheduled_oven',
          timeline: updatedTimeline
        };
      }
      return o;
    }));

    if (activeOrder && activeOrder.id === pv.orderId) {
      setActiveOrder(prev => prev ? {
        ...prev,
        paymentStatus: 'dp_paid',
        orderStatus: 'scheduled_oven'
      } : null);
    }
  };

  const rejectPayment = (pvId: string, reason: string) => {
    setPaymentVerifications(prev => prev.map(p => p.id === pvId ? { ...p, status: 'rejected', rejectionReason: reason } : p));
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderProductionStatus) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return { ...o, orderStatus: newStatus };
      }
      return o;
    }));

    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => prev ? { ...prev, orderStatus: newStatus } : null);
    }
  };

  const findOrder = (query: string): Order | undefined => {
    const q = query.trim().toLowerCase();
    if (!q) return undefined;
    return orders.find(o => 
      o.id.toLowerCase().includes(q) || 
      o.customerName.toLowerCase().includes(q) || 
      o.customerPhone.includes(q)
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView: changeView,
        products,
        selectedProduct,
        setSelectedProduct,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        orders,
        activeOrder,
        setActiveOrder,
        paymentVerifications,
        ovenSlots,
        ovenBatches,
        submitPreOrder,
        confirmPaymentProof,
        verifyPayment,
        rejectPayment,
        updateOrderStatus,
        findOrder
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
