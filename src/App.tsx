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
  const { currentView, setCurrentView, isAdminAuthenticated, loginAdmin, isLoading } = useApp();
  const [adminEmail, setAdminEmail] = React.useState('admin@sweetbakery.id');
  const [adminPassword, setAdminPassword] = React.useState('');
  const [authError, setAuthError] = React.useState('');
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);

  const isAdminView = [
    'dashboard-kpi',
    'kalender-produksi-oven',
    'manajemen-pesanan',
    'verifikasi-pembayaran'
  ].includes(currentView);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim() || !adminPassword.trim()) {
      setAuthError('Email dan kata sandi wajib diisi.');
      return;
    }

    setIsLoggingIn(true);
    setAuthError('');
    try {
      const success = await loginAdmin(adminEmail.trim(), adminPassword);
      if (success) {
        setAuthError('');
        setAdminPassword('');
      } else {
        setAuthError('Email atau kata sandi pengelola salah.');
      }
    } catch (err: any) {
      setAuthError(err.message || 'Terjadi kesalahan saat masuk.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#3B2925] flex flex-col font-sans selection:bg-[#C62828] selection:text-white">
      {isAdminView ? (
        !isAdminAuthenticated ? (
          <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAF7F4]">
            <div className="bg-white rounded-3xl border border-[#EADFD9] max-w-md w-full p-8 shadow-xl space-y-6">
              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-[#FFF5E9] text-[#C62828] mx-auto flex items-center justify-center border border-[#EADFD9] shadow-xs">
                  <span className="material-symbols-outlined text-[30px]">admin_panel_settings</span>
                </div>
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#3B2925]">
                    Login Pengelola Sweet Bakery
                  </h1>
                  <p className="text-xs text-[#705954] mt-1 leading-relaxed">
                    Akses terbatas untuk tim operasional dan dapur. Dilindungi enkripsi server &amp; token otentikasi.
                  </p>
                </div>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2925]">
                    Email Pengelola
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="admin@sweetbakery.id"
                    value={adminEmail}
                    onChange={e => {
                      setAdminEmail(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    className="w-full bg-[#FAF7F4] border border-[#EADFD9] rounded-xl px-4 py-2.5 text-xs text-[#3B2925] focus:outline-hidden focus:border-[#C62828]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3B2925]">
                    Kata Sandi Pengelola
                  </label>
                  <input
                    type="password"
                    required
                    autoFocus
                    placeholder="Masukkan kata sandi..."
                    value={adminPassword}
                    onChange={e => {
                      setAdminPassword(e.target.value);
                      if (authError) setAuthError('');
                    }}
                    className="w-full bg-[#FAF7F4] border border-[#EADFD9] rounded-xl px-4 py-2.5 text-xs text-[#3B2925] focus:outline-hidden focus:border-[#C62828]"
                  />
                  {authError && (
                    <p className="text-xs text-red-600 font-semibold pt-1">{authError}</p>
                  )}
                  <div className="bg-[#FFF5E9] p-2.5 rounded-lg border border-[#EADFD9] text-[11px] text-[#705954] mt-2">
                    <span>Akun Default: <strong>admin@sweetbakery.id</strong></span>
                    <span className="block">Kata Sandi: <strong>SweetBakery2026!</strong></span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    disabled={isLoggingIn || isLoading}
                    className="w-full bg-[#C62828] hover:bg-[#9B1B1B] text-white font-semibold text-xs py-3.5 rounded-full transition-colors cursor-pointer shadow-md disabled:bg-gray-400"
                  >
                    {isLoggingIn ? 'Memverifikasi Kredensial...' : 'Masuk ke Dashboard Pengelola'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentView('beranda')}
                    className="w-full border border-[#EADFD9] bg-white hover:bg-[#FFF5E9] text-[#705954] text-xs font-semibold py-3 rounded-full transition-colors cursor-pointer"
                  >
                    ← Kembali ke Toko Pembeli
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
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
                  <span className="font-serif font-bold text-base text-[#3B2925]">Sweet Bakery Pengelola</span>
                </div>
                <button
                  onClick={() => setCurrentView('beranda')}
                  className="text-xs font-semibold text-[#C62828] hover:underline cursor-pointer"
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
        )
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
