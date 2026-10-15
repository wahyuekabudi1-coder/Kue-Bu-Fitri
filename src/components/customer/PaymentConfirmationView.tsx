import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PaymentConfirmationView: React.FC = () => {
  const { activeOrder, confirmPaymentProof, setCurrentView } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'bca' | 'mandiri' | 'qris'>('bca');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const order = activeOrder || {
    id: '#SB-2026-8942',
    customerName: 'Nadia Larasati',
    customerPhone: '0812-9876-5432',
    deliveryDate: '18 Okt 2026',
    timeSlot: '13:00 – 16:00 WIB',
    dpAmount: 227500,
    total: 445000,
    remainingAmount: 217500,
    items: [
      {
        productName: 'Raspberry Pistachio Layer Cake',
        size: '16 cm (4-6 Porsi)',
        quantity: 1,
        totalPrice: 385000
      }
    ]
  };

  const vaNumber = selectedMethod === 'bca' 
    ? '8801 2026 8942 01' 
    : '8930 2026 8942 01';

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    const methodName = selectedMethod === 'qris' 
      ? 'QRIS Dinamis' 
      : selectedMethod === 'bca' 
        ? 'BCA Virtual Account (8801 2026 8942 01)' 
        : 'Mandiri Virtual Account (8930 2026 8942 01)';

    setTimeout(() => {
      confirmPaymentProof(order.id, methodName);
      setIsSubmitting(false);
      setCurrentView('status-pesanan');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-10 space-y-8">
      
      {/* Header & Reservation Alert */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-block text-xs font-semibold tracking-wider uppercase text-[#C62828] bg-[#FFF5E9] px-3 py-1 rounded-md border border-[#EADFD9]">
          Langkah Pembayaran
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B2925] tracking-tight">
          Konfirmasi Pembayaran DP 50%
        </h1>
        <p className="text-xs sm:text-sm text-[#705954]">
          Reservasi slot oven untuk pesanan <strong className="text-[#3B2925]">{order.id}</strong> atas nama <strong className="text-[#3B2925]">{order.customerName}</strong>.
        </p>
      </div>

      {/* Countdown Timer Card */}
      <div className="bg-[#FFF5E9] border border-[#EADFD9] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-[#C62828]/10 text-[#C62828] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[22px]">timer</span>
          </span>
          <div className="text-left">
            <span className="text-xs font-bold text-[#3B2925] block">Selesaikan Pembayaran Sebelum Slot Dilepas</span>
            <span className="text-[11px] text-[#705954]">Kapasitas oven dapur dibatasi 24 kue per hari.</span>
          </div>
        </div>
        <div className="bg-white px-4 py-1.5 rounded-xl border border-[#EADFD9] font-mono text-sm font-bold text-[#C62828] tracking-widest shadow-2xs">
          01:58:34
        </div>
      </div>

      {/* Payment Nominal Spotlight */}
      <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 text-center space-y-2 shadow-xs">
        <span className="text-xs font-semibold text-[#705954] uppercase tracking-wider block">
          Nominal Uang Muka yang Harus Ditransfer
        </span>
        <div className="font-serif text-4xl sm:text-5xl font-bold text-[#C62828] tracking-tight">
          Rp {order.dpAmount.toLocaleString('id-ID')}
        </div>
        <div className="text-xs text-[#705954] pt-1">
          Total pesanan: Rp {order.total.toLocaleString('id-ID')} · Sisa pelunasan H-1: Rp {order.remainingAmount.toLocaleString('id-ID')}
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 space-y-6">
        <h3 className="font-serif text-base font-bold text-[#3B2925]">
          Pilih Metode Pembayaran
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSelectedMethod('bca')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              selectedMethod === 'bca'
                ? 'border-[#C62828] bg-[#FFF5E9]/50 shadow-xs'
                : 'border-[#EADFD9] hover:border-[#705954]'
            }`}
          >
            <div className="font-bold text-sm text-[#3B2925]">BCA Virtual Account</div>
            <div className="text-[11px] text-[#705954] mt-1">Konfirmasi otomatis 24 jam</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('mandiri')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              selectedMethod === 'mandiri'
                ? 'border-[#C62828] bg-[#FFF5E9]/50 shadow-xs'
                : 'border-[#EADFD9] hover:border-[#705954]'
            }`}
          >
            <div className="font-bold text-sm text-[#3B2925]">Mandiri Virtual Account</div>
            <div className="text-[11px] text-[#705954] mt-1">Livin&apos; by Mandiri &amp; ATM</div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMethod('qris')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              selectedMethod === 'qris'
                ? 'border-[#C62828] bg-[#FFF5E9]/50 shadow-xs'
                : 'border-[#EADFD9] hover:border-[#705954]'
            }`}
          >
            <div className="font-bold text-sm text-[#3B2925]">QRIS Instant (Semua Bank)</div>
            <div className="text-[11px] text-[#705954] mt-1">BCA, GoPay, OVO, ShopeePay</div>
          </button>
        </div>

        {/* VA / QRIS Details */}
        {selectedMethod === 'qris' ? (
          <div className="bg-[#FAF7F4] border border-[#EADFD9] rounded-2xl p-6 text-center space-y-4">
            <span className="text-xs font-bold text-[#3B2925] uppercase tracking-wider block">
              Scan Kode QRIS Sweet Bakery
            </span>
            <div className="inline-block p-4 bg-white rounded-2xl shadow-sm border border-[#EADFD9]">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021226670014ID.LINKAJA.WWW01189360091400000000000208SWEETBAK5204581253033605802ID5912SweetBakery6007Jakarta62070703A016304"
                alt="QRIS Sweet Bakery"
                className="w-48 h-48 mx-auto"
              />
            </div>
            <p className="text-xs text-[#705954] max-w-sm mx-auto">
              Buka aplikasi m-banking atau e-wallet Anda (BCA Mobile, Livin, GoPay, ShopeePay, OVO), lalu arahkan kamera ke kode QR di atas.
            </p>
          </div>
        ) : (
          <div className="bg-[#FAF7F4] border border-[#EADFD9] rounded-2xl p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-[#705954] block">Nomor Virtual Account</span>
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#3B2925] tracking-wider">
                  {vaNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(vaNumber)}
                className="inline-flex items-center gap-1.5 bg-white border border-[#EADFD9] hover:bg-[#FFF5E9] text-[#3B2925] text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Tersalin!' : 'Salin Nomor'}</span>
              </button>
            </div>
            <p className="text-xs text-[#705954] pt-2 border-t border-[#EADFD9]">
              Transfer tepat sebesar <strong>Rp {order.dpAmount.toLocaleString('id-ID')}</strong>. Verifikasi sistem berjalan otomatis dalam 1–5 menit.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white font-semibold text-sm px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">verified</span>
            <span>{isSubmitting ? 'Memverifikasi Pembayaran...' : 'Saya Sudah Bayar (Konfirmasi Pembayaran)'}</span>
          </button>
          
          <a
            href={`https://wa.me/6281234567890?text=Halo%20Sweet%20Bakery,%20saya%20sudah%20transfer%20DP%20untuk%20pesanan%20${encodeURIComponent(order.id)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#EADFD9] bg-white hover:bg-[#FFF5E9] text-[#3B2925] font-semibold text-sm px-5 py-4 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-[#2E7D32]">chat</span>
            <span>Konfirmasi via WhatsApp</span>
          </a>
        </div>
      </div>

    </div>
  );
};
