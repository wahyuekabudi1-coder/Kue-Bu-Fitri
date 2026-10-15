import React from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';

export const AdminSidebar: React.FC = () => {
  const { currentView, setCurrentView, paymentVerifications } = useApp();
  const pendingCount = paymentVerifications.filter(p => p.status === 'pending').length;

  const navItems: { label: string; view: AppView; icon: string; badge?: number }[] = [
    { label: 'Dashboard', view: 'dashboard-kpi', icon: 'analytics' },
    { label: 'Jadwal Produksi', view: 'kalender-produksi-oven', icon: 'calendar_month' },
    { label: 'Pesanan', view: 'manajemen-pesanan', icon: 'shopping_bag' },
    { label: 'Pembayaran', view: 'verifikasi-pembayaran', icon: 'payments', badge: pendingCount }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-[#EADFD9] z-40 flex flex-col justify-between p-6">
      <div className="space-y-8">
        
        {/* Brand */}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#C62828] text-white flex items-center justify-center font-serif font-bold text-base shadow-xs">
              S
            </span>
            <span className="font-serif text-xl font-bold text-[#3B2925]">Sweet Bakery</span>
          </div>
          <span className="text-[11px] font-semibold text-[#705954] uppercase tracking-wider block pl-10">
            Pengelola Toko Kue
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 text-sm">
          {navItems.map(item => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer text-left font-medium ${
                  isActive
                    ? 'bg-[#C62828] text-white font-semibold shadow-xs'
                    : 'text-[#3B2925] hover:bg-[#FFF5E9] hover:text-[#C62828]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white text-[#C62828]' : 'bg-[#C62828] text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile & Customer Store Link */}
      <div className="pt-6 border-t border-[#EADFD9] space-y-4">
        <button
          onClick={() => setCurrentView('beranda')}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#705954] hover:text-[#C62828] hover:bg-[#FFF5E9] rounded-lg transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">storefront</span>
          <span>Lihat Toko Pembeli</span>
        </button>

        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-9 h-9 rounded-full bg-[#FAF0E6] border border-[#EADFD9] flex items-center justify-center font-bold text-xs text-[#3B2925]">
            AD
          </div>
          <div>
            <div className="text-xs font-bold text-[#3B2925]">Adit</div>
            <div className="text-[11px] text-[#705954]">Tim Dapur Sweet Bakery</div>
          </div>
        </div>
      </div>
    </aside>
  );
};
