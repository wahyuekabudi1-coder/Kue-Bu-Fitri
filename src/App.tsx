import React from 'react';
import { useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminSidebar } from './components/layout/AdminSidebar';
import { ScreenSwitcher } from './components/layout/ScreenSwitcher';

// Customer Views
import { HomeView } from './components/customer/HomeView';
import { CatalogView } from './components/customer/CatalogView';
import { ProductDetailView } from './components/customer/ProductDetailView';
import { PreOrderFormView } from './components/customer/PreOrderFormView';
import { PaymentConfirmationView } from './components/customer/PaymentConfirmationView';
import { OrderStatusView } from './components/customer/OrderStatusView';

// Admin Views
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { OvenCalendarView } from './components/admin/OvenCalendarView';
import { OrderManagementView } from './components/admin/OrderManagementView';
import { PaymentVerificationView } from './components/admin/PaymentVerificationView';

export const App: React.FC = () => {
  const { currentView, setCurrentView } = useApp();

  const isAdminView = [
    'dashboard-kpi',
    'kalender-produksi-oven',
    'manajemen-pesanan',
    'verifikasi-pembayaran'
  ].includes(currentView);

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#3B2925] flex flex-col font-sans selection:bg-[#C62828] selection:text-white">
      {isAdminView ? (
        <div className="min-h-screen flex bg-[#FAF7F4]">
          {/* Admin Sidebar */}
          <AdminSidebar />

          {/* Admin Main Workspace */}
          <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
            {/* Top Admin Mobile Header */}
            <header className="md:hidden bg-white border-b border-[#EADFD9] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#C62828] text-white flex items-center justify-center font-serif font-bold text-sm">
                  S
                </span>
                <span className="font-serif font-bold text-base text-[#3B2925]">Sweet Bakery Admin</span>
              </div>
              <button
                onClick={() => setCurrentView('beranda')}
                className="text-xs font-semibold text-[#C62828] hover:underline"
              >
                Toko Pembeli →
              </button>
            </header>

            {/* Admin Content Area */}
            <main className="flex-1 p-6 lg:p-10 max-w-7xl w-full">
              {currentView === 'dashboard-kpi' && <AdminDashboardView />}
              {currentView === 'kalender-produksi-oven' && <OvenCalendarView />}
              {currentView === 'manajemen-pesanan' && <OrderManagementView />}
              {currentView === 'verifikasi-pembayaran' && <PaymentVerificationView />}
            </main>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {currentView === 'beranda' && <HomeView />}
            {currentView === 'katalog-kue' && <CatalogView />}
            {currentView === 'detail-produk' && <ProductDetailView />}
            {currentView === 'formulir-pre-order' && <PreOrderFormView />}
            {currentView === 'pembayaran-dp' && <PaymentConfirmationView />}
            {currentView === 'status-pesanan' && <OrderStatusView />}
          </main>
          <Footer />
        </div>
      )}

      {/* Floating 10-Screen Switcher (matches original navigation.js) */}
      <ScreenSwitcher />
    </div>
  );
};

export default App;
