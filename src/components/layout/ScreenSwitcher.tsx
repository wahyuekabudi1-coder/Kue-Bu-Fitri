import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AppView } from '../../types';

export const ScreenSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentView, setCurrentView } = useApp();

  const screens: { category: string; items: { name: string; view: AppView }[] }[] = [
    {
      category: 'Halaman Pelanggan',
      items: [
        { name: 'Beranda', view: 'beranda' },
        { name: 'Katalog Kue', view: 'katalog-kue' },
        { name: 'Detail Produk', view: 'detail-produk' },
        { name: 'Formulir Pemesanan', view: 'formulir-pre-order' },
        { name: 'Pembayaran DP', view: 'pembayaran-dp' },
        { name: 'Status Pesanan', view: 'status-pesanan' }
      ]
    },
    {
      category: 'Halaman Pengelola Toko',
      items: [
        { name: 'Dashboard', view: 'dashboard-kpi' },
        { name: 'Jadwal Produksi', view: 'kalender-produksi-oven' },
        { name: 'Pesanan', view: 'manajemen-pesanan' },
        { name: 'Pembayaran', view: 'verifikasi-pembayaran' }
      ]
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-sans text-sm select-none">
      {isOpen && (
        <div className="mb-2 bg-[#FFFDFB] border border-[#EADFD9] rounded-2xl shadow-2xl p-4 w-72 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between border-b border-[#EADFD9] pb-2 mb-3">
            <span className="font-serif font-bold text-[#3B2925] text-xs tracking-tight">
              Pilihan Halaman
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#705954] hover:text-[#C62828] text-xs px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto space-y-3 pr-1 text-xs">
            {screens.map(group => (
              <div key={group.category}>
                <div className="font-semibold text-[#C62828] text-[11px] uppercase tracking-wider mb-1.5">
                  {group.category}
                </div>
                <div className="space-y-1">
                  {group.items.map(item => {
                    const isCurrent = currentView === item.view;
                    return (
                      <button
                        key={item.view}
                        onClick={() => {
                          setCurrentView(item.view);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left block px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-[#C62828] text-white font-semibold shadow-xs'
                            : 'text-[#3B2925] hover:bg-[#FFF5E9] hover:text-[#C62828]'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer font-medium text-xs"
      >
        <span className="material-symbols-outlined text-[18px]">layers</span>
        <span>Lihat Halaman Toko (10)</span>
      </button>
    </div>
  );
};
