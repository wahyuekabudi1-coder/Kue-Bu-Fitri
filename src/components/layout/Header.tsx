import React from 'react';
import { useApp } from '../../context/AppContext';

export const Header: React.FC = () => {
  const { currentView, setCurrentView, cartItems } = useApp();
  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="bg-[#FFF5E9] border-b border-[#EADFD9] text-center py-2 px-4 text-xs font-medium text-[#705954]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="text-[#C62828]">✨</span>
          <span>Pesanan Acara Spesial &amp; Akhir Pekan: Harap pesan min. H-2 | Pengiriman aman area Jabodetabek</span>
        </div>
      </aside>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#FFFDFB]/95 backdrop-blur-md border-b border-[#EADFD9]/80 transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-8">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setCurrentView('beranda')} 
            className="flex items-center gap-3 shrink-0 text-left cursor-pointer group"
          >
            <span className="w-10 h-10 rounded-full bg-[#FFF5E9] flex items-center justify-center text-[#C62828] font-serif font-bold text-xl shadow-xs group-hover:bg-[#C62828] group-hover:text-white transition-colors">
              S
            </span>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#3B2925] group-hover:text-[#C62828] transition-colors block leading-tight">
                Sweet Bakery
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#705954] font-semibold block">
                Toko Kue Pilihan
              </span>
            </div>
          </button>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#705954]">
            <button
              onClick={() => setCurrentView('beranda')}
              className={`transition-colors cursor-pointer ${
                currentView === 'beranda' ? 'text-[#C62828] font-semibold' : 'hover:text-[#3B2925]'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => setCurrentView('katalog-kue')}
              className={`transition-colors cursor-pointer ${
                currentView === 'katalog-kue' ? 'text-[#C62828] font-semibold' : 'hover:text-[#3B2925]'
              }`}
            >
              Katalog Kue
            </button>
            <button
              onClick={() => setCurrentView('formulir-pre-order')}
              className={`transition-colors cursor-pointer ${
                currentView === 'formulir-pre-order' ? 'text-[#C62828] font-semibold' : 'hover:text-[#3B2925]'
              }`}
            >
              Kue Custom
            </button>
            <button
              onClick={() => setCurrentView('status-pesanan')}
              className={`transition-colors cursor-pointer ${
                currentView === 'status-pesanan' ? 'text-[#C62828] font-semibold' : 'hover:text-[#3B2925]'
              }`}
            >
              Lacak Pesanan
            </button>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Cart Trigger */}
            <button
              onClick={() => setCurrentView('formulir-pre-order')}
              aria-label="Keranjang Pesanan"
              className="relative p-2.5 rounded-full hover:bg-[#FFF5E9] text-[#3B2925] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C62828] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => setCurrentView('katalog-kue')}
              className="hidden sm:inline-flex items-center justify-center bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              Pesan Sekarang
            </button>

            {/* Admin Switcher Icon */}
            <button
              onClick={() => setCurrentView('dashboard-kpi')}
              title="Dashboard Pengelola"
              className="p-2 rounded-full hover:bg-[#FFF5E9] text-[#705954] hover:text-[#C62828] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">manage_accounts</span>
            </button>
          </div>

        </div>
      </header>
    </>
  );
};
