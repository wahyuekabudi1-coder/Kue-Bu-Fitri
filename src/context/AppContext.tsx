import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { api, getAdminToken } from '../services/api';

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
  }) => Promise<Order>;
  confirmPaymentProof: (orderId: string, method: string, proofFileOrUrl?: File | Blob | string) => Promise<void>;
  verifyPayment: (pvId: string) => Promise<void>;
  rejectPayment: (pvId: string, reason: string) => Promise<void>;
  updateOrderStatus: (orderId: string, newStatus: OrderProductionStatus) => Promise<void>;
  updateBatchStatus: (batchId: string, status: string) => Promise<void>;
  findOrder: (query: string) => Promise<Order | undefined>;
  isAdminAuthenticated: boolean;
  currentAdminUser: any;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('beranda');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);

  // Cart items
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
      candleOption: 'Lilin Spiral Emas (2 batang)',
      greetingCard: 'Semoga panjang umur, sehat selalu, dan bahagia bersama keluarga.',
      totalPrice: 385000
    }
  ]);

  // Backend state
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [paymentVerifications, setPaymentVerifications] = useState<PaymentVerification[]>(INITIAL_PAYMENT_VERIFICATIONS);
  const [ovenSlots, setOvenSlots] = useState<OvenSlotDay[]>(INITIAL_OVEN_SLOTS);
  const [ovenBatches, setOvenBatches] = useState<OvenBatch[]>(INITIAL_OVEN_BATCHES);
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0] || null);

  // Admin Auth state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [currentAdminUser, setCurrentAdminUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch public data & verify admin auth on mount
  const refreshData = useCallback(async () => {
    try {
      // 1. Fetch public products and slots
      const [fetchedProducts, fetchedSlots] = await Promise.all([
        api.getProducts().catch(() => INITIAL_PRODUCTS),
        api.getOvenSlots().catch(() => INITIAL_OVEN_SLOTS)
      ]);
      setProducts(fetchedProducts);
      setOvenSlots(fetchedSlots);

      // 2. Check admin auth
      const token = getAdminToken();
      if (token) {
        const user = await api.getAdminMe();
        if (user) {
          setIsAdminAuthenticated(true);
          setCurrentAdminUser(user);

          // Fetch protected admin data
          const [adminOrders, pvs, batches] = await Promise.all([
            api.getAdminOrders().catch(() => orders),
            api.getPaymentVerifications().catch(() => paymentVerifications),
            api.getOvenBatches().catch(() => ovenBatches)
          ]);
          setOrders(adminOrders);
          setPaymentVerifications(pvs);
          setOvenBatches(batches);
        } else {
          setIsAdminAuthenticated(false);
          setCurrentAdminUser(null);
        }
      }
    } catch (err) {
      console.error('Error refreshing backend data:', err);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Handle browser back/forward history
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

  // Submit Pre-Order to Backend Database with atomic slot reservation
  const submitPreOrder = async (formData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    deliveryMethod: 'courier' | 'pickup';
    deliveryAddress: string;
    deliveryDate: string;
    timeSlot: string;
    notes?: string;
    paymentOption: 'dp_50' | 'full';
  }): Promise<Order> => {
    setIsLoading(true);
    try {
      const createdOrder = await api.createOrder({
        ...formData,
        items: cartItems
      });

      setOrders(prev => [createdOrder, ...prev]);
      setActiveOrder(createdOrder);

      // Re-fetch oven slots to reflect updated capacity
      const updatedSlots = await api.getOvenSlots().catch(() => ovenSlots);
      setOvenSlots(updatedSlots);

      return createdOrder;
    } catch (err: any) {
      throw new Error(err.message || 'Gagal mengirim pesanan ke database backend.');
    } finally {
      setIsLoading(false);
    }
  };

  // Upload payment proof to private backend storage
  const confirmPaymentProof = async (
    orderId: string, 
    method: string, 
    proofFileOrUrl?: File | Blob | string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      let fileToUpload: File | Blob;

      if (proofFileOrUrl instanceof File || proofFileOrUrl instanceof Blob) {
        fileToUpload = proofFileOrUrl;
      } else {
        // Create sample placeholder blob if called with URL or empty
        const sampleText = `Sweet Bakery Proof - ${orderId} - ${method} - ${new Date().toISOString()}`;
        fileToUpload = new Blob([sampleText], { type: 'image/jpeg' });
      }

      const result = await api.uploadPaymentProof(orderId, method, fileToUpload);

      setOrders(prev => prev.map(o => o.id === orderId ? result.order : o));
      setPaymentVerifications(prev => [result.pv, ...prev]);
      if (activeOrder && activeOrder.id === orderId) {
        setActiveOrder(result.order);
      }
    } catch (err: any) {
      console.error('Gagal mengunggah bukti pembayaran:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify Payment by Admin
  const verifyPayment = async (pvId: string): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await api.verifyPayment(pvId);
      setPaymentVerifications(prev => prev.map(p => p.id === pvId ? result.pv : p));
      setOrders(prev => prev.map(o => o.id === result.order.id ? result.order : o));
      if (activeOrder && activeOrder.id === result.order.id) {
        setActiveOrder(result.order);
      }
    } catch (err: any) {
      console.error('Gagal verifikasi pembayaran:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Reject Payment by Admin
  const rejectPayment = async (pvId: string, reason: string): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await api.rejectPayment(pvId, reason);
      setPaymentVerifications(prev => prev.map(p => p.id === pvId ? result.pv : p));
      setOrders(prev => prev.map(o => o.id === result.order.id ? result.order : o));
      if (activeOrder && activeOrder.id === result.order.id) {
        setActiveOrder(result.order);
      }
    } catch (err: any) {
      console.error('Gagal menolak pembayaran:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update Order Production Status by Admin
  const updateOrderStatus = async (orderId: string, newStatus: OrderProductionStatus): Promise<void> => {
    try {
      const updated = await api.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? updated : o));
      if (activeOrder && activeOrder.id === orderId) {
        setActiveOrder(updated);
      }
    } catch (err) {
      console.error('Gagal update status pesanan:', err);
    }
  };

  // Update Batch Status by Admin
  const updateBatchStatus = async (batchId: string, status: string): Promise<void> => {
    try {
      const updated = await api.updateBatchStatus(batchId, status);
      setOvenBatches(prev => prev.map(b => b.id === batchId ? updated : b));
    } catch (err) {
      console.error('Gagal update status batch oven:', err);
    }
  };

  // Find order (searches backend database)
  const findOrder = async (query: string): Promise<Order | undefined> => {
    const q = query.trim();
    if (!q) return undefined;
    try {
      const found = await api.trackOrder(q);
      if (found) {
        setActiveOrder(found);
        return found;
      }
    } catch {
      // Fallback local memory search
      const local = orders.find(o => 
        o.id.toLowerCase().includes(q.toLowerCase()) || 
        o.customerPhone.replace(/[^0-9]/g, '').includes(q.replace(/[^0-9]/g, ''))
      );
      if (local) {
        setActiveOrder(local);
        return local;
      }
    }
    return undefined;
  };

  // Admin login via real server-side authentication
  const loginAdmin = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await api.loginAdmin(email, password);
      setIsAdminAuthenticated(true);
      setCurrentAdminUser(res.user);
      await refreshData();
      return true;
    } catch (err: any) {
      console.error('Login gagal:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logoutAdmin = (): void => {
    api.logoutAdmin();
    setIsAdminAuthenticated(false);
    setCurrentAdminUser(null);
    setCurrentView('beranda');
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
        updateBatchStatus,
        findOrder: findOrder as any,
        isAdminAuthenticated,
        currentAdminUser,
        loginAdmin,
        logoutAdmin,
        refreshData,
        isLoading
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
