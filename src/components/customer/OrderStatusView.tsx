import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const OrderStatusView: React.FC = () => {
  const { activeOrder, findOrder, orders, setCurrentView } = useApp();
  const [searchInput, setSearchInput] = useState(activeOrder ? activeOrder.id : '#SB-2026-8942');
  const [currentOrder, setCurrentOrder] = useState(activeOrder || orders[0]);

  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const found = await findOrder(searchInput);
      if (found) {
        setCurrentOrder(found);
      } else {
        alert('Pesanan tidak ditemukan. Pastikan nomor pesanan (contoh: #SB-2026-8942) atau nomor HP sudah benar.');
      }
    } finally {
      setIsSearching(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_verification':
        return <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-bold">Menunggu Verifikasi DP</span>;
      case 'scheduled_oven':
        return <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-bold">Jadwal Masuk Dapur</span>;
      case 'baking':
        return <span className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-bold">Sedang Dipanggang</span>;
      case 'decorating_qc':
        return <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-bold">Dekorasi &amp; Pengecekan</span>;
      case 'in_delivery':
        return <span className="bg-cyan-100 text-cyan-800 text-xs px-3 py-1 rounded-full font-bold">Dalam Pengantaran</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-bold">Selesai</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-bold">Diproses</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 py-10 space-y-8">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
        <div className="space-y-2">
          <div className="inline-block text-xs font-semibold tracking-wider uppercase text-[#C62828] bg-[#FFF5E9] px-3 py-1 rounded-md border border-[#EADFD9]">
            Pelacakan Pesanan
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B2925] tracking-tight">
            Status Pelacakan Pesanan
          </h1>
          <p className="text-xs sm:text-sm text-[#705954]">
            Pantau status pembuatan kue di dapur dan jadwal pengiriman kue Anda.
          </p>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="No. Pesanan (#SB-...) atau No. HP"
              className="pl-4 pr-4 py-2.5 bg-white border border-[#EADFD9] rounded-xl text-xs text-[#3B2925] w-64 focus:outline-hidden focus:border-[#C62828]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Lacak
          </button>
        </form>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 lg:p-8 space-y-8 shadow-xs">
        
        {/* Order Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EADFD9] gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-bold text-[#3B2925]">{currentOrder.id}</h2>
              {getStatusBadge(currentOrder.orderStatus)}
            </div>
            <div className="text-xs text-[#705954] mt-1.5 flex flex-wrap items-center gap-3">
              <span>Pemesan: <strong className="text-[#3B2925]">{currentOrder.customerName}</strong></span>
              <span>•</span>
              <span>Jadwal Kirim: <strong className="text-[#3B2925]">{currentOrder.deliveryDate} ({currentOrder.timeSlot})</strong></span>
              <span>•</span>
              <span>{currentOrder.deliveryMethod === 'courier' ? 'Diantar Kurir Toko' : 'Ambil Sendiri di Toko'}</span>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-[#EADFD9] sm:pl-6">
            <span className="text-[11px] text-[#705954] block">Status Pembayaran</span>
            <span className={`text-sm font-bold block ${currentOrder.paymentStatus === 'fully_paid' ? 'text-[#2E7D32]' : 'text-[#C62828]'}`}>
              {currentOrder.paymentStatus === 'fully_paid' 
                ? 'Lunas 100%' 
                : currentOrder.paymentStatus === 'dp_paid'
                  ? 'DP 50% Lunas (Sisa Pelunasan H-1)'
                  : 'DP 50% Menunggu Verifikasi'}
            </span>
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#3B2925]">
            Perjalanan Pesanan Anda di Sweet Bakery
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#EADFD9]">
            {currentOrder.timeline.map((item, index) => {
              const isDone = item.done;
              const isCurrent = item.current;

              return (
                <div key={index} className="relative flex items-start gap-4">
                  {/* Step Dot */}
                  <span
                    className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isDone
                        ? 'bg-[#2E7D32] text-white shadow-xs'
                        : isCurrent
                          ? 'bg-[#C62828] text-white animate-pulse shadow-md'
                          : 'bg-white border-2 border-[#EADFD9] text-[#705954]'
                    }`}
                  >
                    {isDone ? '✓' : index + 1}
                  </span>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className={`text-sm font-bold ${isCurrent ? 'text-[#C62828]' : isDone ? 'text-[#3B2925]' : 'text-[#705954]'}`}>
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-mono text-[#705954]">{item.time}</span>
                    </div>
                    <p className="text-xs text-[#705954] leading-relaxed max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cake Details and Financial Recap */}
        <div className="pt-6 border-t border-[#EADFD9] grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Cake Items */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-[#3B2925]">Kue yang Dipesan</h4>
            <div className="space-y-3">
              {currentOrder.items.map((it, idx) => (
                <div key={idx} className="flex gap-4 p-3 bg-[#FAF7F4] rounded-xl border border-[#EADFD9]">
                  <img src={it.productImage} alt={it.productName} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="font-serif font-bold text-sm text-[#3B2925] truncate">{it.productName}</div>
                    <div className="text-xs text-[#705954] mt-0.5">{it.size} · Jumlah: {it.quantity}</div>
                    {it.customMessage && (
                      <div className="text-xs text-[#C62828] font-medium mt-1">
                        Plakat: &ldquo;{it.customMessage}&rdquo;
                      </div>
                    )}
                    {it.candleOption && (
                      <div className="text-[11px] text-[#705954] mt-0.5">
                        Lilin: {it.candleOption}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-[#FFF5E9]/50 rounded-xl border border-[#EADFD9] text-xs text-[#705954] space-y-1">
              <span className="font-bold text-[#3B2925] block">Alamat Tujuan:</span>
              <p>{currentOrder.deliveryAddress}</p>
              {currentOrder.notes && (
                <p className="text-[11px] text-[#C62828] pt-1 font-medium">Catatan: {currentOrder.notes}</p>
              )}
            </div>
          </div>

          {/* Financial Recap & Actions */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-[#3B2925]">Rincian Pembayaran</h4>
            <div className="bg-[#FAF7F4] rounded-xl border border-[#EADFD9] p-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-[#705954]">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-[#3B2925]">Rp {currentOrder.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#705954]">
                <span>Biaya Penyerahan</span>
                <span className="font-semibold text-[#3B2925]">
                  {currentOrder.deliveryFee > 0 ? `Rp ${currentOrder.deliveryFee.toLocaleString('id-ID')}` : 'Gratis'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#3B2925] pt-2 border-t border-[#EADFD9]">
                <span>Total Nilai Pesanan</span>
                <span>Rp {currentOrder.total.toLocaleString('id-ID')}</span>
              </div>
              {currentOrder.paymentStatus === 'dp_paid' || currentOrder.paymentStatus === 'fully_paid' ? (
                <div className="flex justify-between text-xs font-semibold text-[#2E7D32]">
                  <span>DP Diterima ({currentOrder.paymentStatus === 'fully_paid' ? '100%' : '50%'})</span>
                  <span>Rp {currentOrder.dpAmount.toLocaleString('id-ID')}</span>
                </div>
              ) : (
                <div className="flex justify-between text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-1.5 rounded-lg border border-amber-200">
                  <span>DP 50% (Menunggu Verifikasi Admin)</span>
                  <span>Rp {currentOrder.dpAmount.toLocaleString('id-ID')}</span>
                </div>
              )}
              {currentOrder.remainingAmount > 0 && (
                <div className="flex justify-between text-xs font-semibold text-[#C62828]">
                  <span>Sisa Pelunasan (H-1)</span>
                  <span>Rp {currentOrder.remainingAmount.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>

            {/* Action to re-upload proof if still pending */}
            {currentOrder.paymentStatus === 'pending_dp' && (
              <div className="p-3 bg-[#FFF5E9] rounded-xl border border-[#EADFD9] flex items-center justify-between gap-3 text-xs">
                <div className="text-[#705954]">
                  <span className="font-bold text-[#3B2925] block">Menunggu Verifikasi Pembayaran</span>
                  <span>Perlu ganti atau unggah bukti transfer?</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentView('pembayaran-dp')}
                  className="bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Unggah Bukti
                </button>
              </div>
            )}

            {/* Courier & WhatsApp */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-white border border-[#EADFD9] rounded-xl">
                <span className="material-symbols-outlined text-2xl text-[#C62828]">local_shipping</span>
                <div className="text-xs">
                  <span className="font-bold text-[#3B2925] block">Pengantaran Pesanan</span>
                  <span className="text-[#705954]">Kurir: Pak Danang · Diantar dengan hati-hati sampai ke alamat</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Sweet%20Bakery,%20saya%20ingin%20cek%20pesanan%20${encodeURIComponent(currentOrder.id)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold px-4 py-3 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Hubungi Kami via WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-1.5 border border-[#EADFD9] bg-white hover:bg-[#FFF5E9] text-[#3B2925] text-xs font-semibold px-4 py-3 rounded-full transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">print</span>
                  <span>Cetak Nota</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
