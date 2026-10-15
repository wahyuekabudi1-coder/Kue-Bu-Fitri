import React from 'react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#FAF0E6] border-t border-[#EADFD9] text-[#3B2925] mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#C62828] text-white flex items-center justify-center font-serif font-bold text-xl">
                S
              </span>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight block">Sweet Bakery</span>
                <span className="text-xs text-[#705954] tracking-wider uppercase font-semibold">Toko Kue Pilihan Keluarga</span>
              </div>
            </div>
            <p className="text-sm text-[#705954] max-w-md leading-relaxed">
              Beragam pilihan kue untuk ulang tahun, pernikahan, hantaran, dan berbagai momen spesial. Dibuat berdasarkan pesanan dengan bahan pilihan berkualitas serta perhatian pada rasa dan tampilan.
            </p>
            <div className="flex items-center gap-3 text-xs text-[#705954]">
              <span className="inline-flex items-center gap-1 font-semibold text-[#3B2925]">
                <span className="material-symbols-outlined text-[16px] text-[#C62828]">verified</span> Bahan Pilihan Berkualitas
              </span>
              <span>•</span>
              <span>Jl. Senopati No. 42, Jakarta Selatan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#3B2925]">Menu Halaman</h4>
            <ul className="space-y-2 text-sm text-[#705954]">
              <li>
                <button onClick={() => setCurrentView('beranda')} className="hover:text-[#C62828] transition-colors cursor-pointer">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('katalog-kue')} className="hover:text-[#C62828] transition-colors cursor-pointer">
                  Katalog Kue
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('formulir-pre-order')} className="hover:text-[#C62828] transition-colors cursor-pointer">
                  Formulir Pemesanan &amp; Kue Custom
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('status-pesanan')} className="hover:text-[#C62828] transition-colors cursor-pointer">
                  Lihat Status Pesanan
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('dashboard-kpi')} className="hover:text-[#C62828] transition-colors cursor-pointer text-xs font-semibold text-[#C62828]">
                  Dashboard Pengelola Toko →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#3B2925]">Hubungi Kami</h4>
            <p className="text-sm text-[#705954] leading-relaxed">
              Punya ide desain kue sendiri atau ingin bertanya seputar pesanan? Kami siap membantu melalui WhatsApp.
            </p>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20Sweet%20Bakery,%20saya%20ingin%20bertanya%20seputar%20pesanan%20kue" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              <span>Hubungi Kami via WhatsApp</span>
            </a>
            <div className="text-xs text-[#705954] pt-2">
              Jam Layanan: Setiap Hari 08:00 – 20:00 WIB
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-[#EADFD9] flex flex-col sm:flex-row items-center justify-between text-xs text-[#705954] gap-4">
          <div>
            &copy; {new Date().getFullYear()} Sweet Bakery. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <span>Dibuat Berdasarkan Pesanan</span>
            <span>Pengantaran Aman ke Alamat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
