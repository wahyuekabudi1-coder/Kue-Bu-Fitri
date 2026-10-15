import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PaymentConfirmationView: React.FC = () => {
  const { activeOrder, confirmPaymentProof, setCurrentView } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<'bca' | 'mandiri' | 'qris'>('bca');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofImage, setProofImage] = useState<string | null>(null);
  const [proofFileName, setProofFileName] = useState<string>('');

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

  const [rawFile, setRawFile] = useState<File | null>(null);

  const vaNumber = selectedMethod === 'bca' 
    ? '8801 2026 8942 01' 
    : '8930 2026 8942 01';

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB. Silakan pilih file yang lebih kecil.');
        return;
      }
      setRawFile(file);
      setProofFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    const methodName = selectedMethod === 'qris' 
      ? 'QRIS Dinamis' 
      : selectedMethod === 'bca' 
        ? 'BCA Virtual Account (8801 2026 8942 01)' 
        : 'Mandiri Virtual Account (8930 2026 8942 01)';

    try {
      if (rawFile) {
        await confirmPaymentProof(order.id, methodName, rawFile);
      } else {
        // Sample fallback blob if testing without picking a local file
        const blob = new Blob([`Bukti Transfer Sweet Bakery ${order.id}`], { type: 'image/jpeg' });
        await confirmPaymentProof(order.id, methodName, blob);
      }
      setCurrentView('status-pesanan');
    } catch (err: any) {
      alert(err.message || 'Gagal mengunggah bukti pembayaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-12 py-10 space-y-8">
      
      {/* Header & Payment Info */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-block text-xs font-semibold tracking-wider uppercase text-[#C62828] bg-[#FFF5E9] px-3 py-1 rounded-md border border-[#EADFD9]">
          Pembayaran Pesanan
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B2925] tracking-tight">
          Bayar DP &amp; Konfirmasi
        </h1>
        <p className="text-xs sm:text-sm text-[#705954]">
          Pembayaran uang muka untuk pesanan <strong className="text-[#3B2925]">{order.id}</strong> atas nama <strong className="text-[#3B2925]">{order.customerName}</strong>.
        </p>
      </div>

      {/* Notice Card */}
      <div className="bg-[#FFF5E9] border border-[#EADFD9] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-[#C62828]/10 text-[#C62828] flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-[22px]">schedule</span>
          </span>
          <div className="text-left">
            <span className="text-xs font-bold text-[#3B2925] block">Selesaikan Pembayaran Tepat Waktu</span>
            <span className="text-[11px] text-[#705954]">Kue dibuat berdasarkan pesanan agar rasa dan kualitas tetap segar saat diterima.</span>
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
              Transfer tepat sebesar <strong>Rp {order.dpAmount.toLocaleString('id-ID')}</strong>. Setelah bukti transfer diunggah, tim admin Sweet Bakery akan memeriksa dan memverifikasi pembayaran Anda.
            </p>
          </div>
        )}

        {/* Upload Proof Area */}
        <div className="bg-white border border-[#EADFD9] rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#3B2925] uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#C62828] text-[18px]">receipt_long</span>
              <span>Unggah Bukti Transfer / Struk</span>
            </span>
            {proofImage && (
              <button
                type="button"
                onClick={() => {
                  setProofImage(null);
                  setProofFileName('');
                }}
                className="text-[11px] text-[#C62828] hover:underline cursor-pointer"
              >
                Hapus &amp; Ganti File
              </button>
            )}
          </div>

          {proofImage ? (
            <div className="flex items-center gap-4 bg-[#FAF7F4] p-3 rounded-xl border border-[#EADFD9]">
              <img
                src={proofImage}
                alt="Preview Bukti Transfer"
                className="w-16 h-20 object-cover rounded-lg border border-[#EADFD9] shrink-0"
              />
              <div className="min-w-0 flex-1 text-xs">
                <span className="font-bold text-[#3B2925] block truncate">
                  {proofFileName || 'struk-transfer.jpg'}
                </span>
                <span className="text-[11px] text-[#2E7D32] font-semibold flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Siap diunggah untuk verifikasi admin</span>
                </span>
              </div>
            </div>
          ) : (
            <label className="border-2 border-dashed border-[#EADFD9] hover:border-[#C62828] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors bg-[#FFFDFB]">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="w-10 h-10 rounded-full bg-[#FFF5E9] text-[#C62828] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">add_photo_alternate</span>
              </span>
              <div className="text-center">
                <span className="text-xs font-semibold text-[#3B2925] block">
                  Pilih Foto / Screenshot Bukti Transfer
                </span>
                <span className="text-[10px] text-[#705954]">Format JPG, PNG, atau WEBP</span>
              </div>
            </label>
          )}

          {/* Verification Process Notice */}
          <div className="bg-[#FFF5E9] p-3 rounded-xl border border-[#EADFD9] flex items-start gap-2.5 text-xs text-[#705954]">
            <span className="material-symbols-outlined text-[#C62828] text-[18px] shrink-0 mt-0.5">info</span>
            <p className="leading-relaxed">
              <strong>Penting:</strong> Pengunggahan bukti transfer tidak otomatis menyelesaikan pesanan. Pembayaran baru berstatus <em>terkonfirmasi</em> setelah diperiksa dan disetujui oleh admin toko Sweet Bakery.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white font-semibold text-sm px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">upload_file</span>
            <span>{isSubmitting ? 'Bukti pembayaran sedang diperiksa...' : 'Unggah Bukti Pembayaran'}</span>
          </button>
          
          <a
            href={`https://wa.me/6281234567890?text=Halo%20Sweet%20Bakery,%20saya%20sudah%20transfer%20DP%20untuk%20pesanan%20${encodeURIComponent(order.id)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#EADFD9] bg-white hover:bg-[#FFF5E9] text-[#3B2925] font-semibold text-sm px-5 py-4 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-[#2E7D32]">chat</span>
            <span>Hubungi Kami</span>
          </a>

          <button
            type="button"
            onClick={() => setCurrentView('formulir-pre-order')}
            className="inline-flex items-center justify-center border border-[#EADFD9] bg-white hover:bg-[#FAF0E6] text-[#705954] text-xs font-semibold px-4 py-4 rounded-full transition-colors cursor-pointer"
          >
            Kembali
          </button>
        </div>
      </div>

    </div>
  );
};
