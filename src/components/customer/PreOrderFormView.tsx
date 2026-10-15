import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const PreOrderFormView: React.FC = () => {
  const { cartItems, removeFromCart, submitPreOrder, setCurrentView, ovenSlots } = useApp();

  const [customerName, setCustomerName] = useState('Nadia Larasati');
  const [customerPhone, setCustomerPhone] = useState('0812-9876-5432');
  const [customerEmail, setCustomerEmail] = useState('nadia.larasati@gmail.com');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [deliveryAddress, setDeliveryAddress] = useState('Jl. Senopati Dalam No. 18, Kebayoran Baru, Jakarta Selatan');
  const [deliveryDate, setDeliveryDate] = useState('18 Okt 2026');
  const [timeSlot, setTimeSlot] = useState('13:00 – 16:00 WIB');
  const [notes, setNotes] = useState('Kue tolong ditaruh di tempat yang sejuk jika saya belum sampai.');
  const [paymentOption, setPaymentOption] = useState<'dp_50' | 'full'>('dp_50');

  const subtotal = cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const deliveryFee = deliveryMethod === 'courier' ? 60000 : 0;
  const total = subtotal + deliveryFee;
  const dpAmount = paymentOption === 'dp_50' ? Math.ceil(total * 0.5) : total;
  const remainingAmount = total - dpAmount;

  // Check if selected date is fully booked
  const selectedSlot = ovenSlots.find(s => s.dateStr === deliveryDate || s.dateStr.includes(deliveryDate.slice(0, 2)));
  const isDateFull = selectedSlot ? selectedSlot.status === 'full' : false;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Silakan periksa kembali data pesananmu. Keranjang pesanan masih kosong.');
      return;
    }
    if (!deliveryDate) {
      alert('Silakan pilih tanggal pesanan.');
      return;
    }
    if (isDateFull) {
      alert('Tanggal ini sudah penuh. Silakan pilih tanggal lain.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitPreOrder({
        customerName,
        customerPhone,
        customerEmail,
        deliveryMethod,
        deliveryAddress: deliveryMethod === 'courier' ? deliveryAddress : 'Toko Sweet Bakery: Jl. Senopati No. 42, Jakarta Selatan',
        deliveryDate,
        timeSlot,
        notes,
        paymentOption
      });
      setCurrentView('pembayaran-dp');
    } catch (err: any) {
      alert(err.message || 'Gagal memproses pesanan di server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-8">
      
      {/* Title */}
      <div className="space-y-2">
        <div className="inline-block text-xs font-semibold tracking-wider uppercase text-[#C62828] bg-[#FFF5E9] px-3 py-1 rounded-md border border-[#EADFD9]">
          Pemesanan Kue
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B2925] tracking-tight">
          Formulir Pemesanan &amp; Pengiriman
        </h1>
        <p className="text-xs sm:text-sm text-[#705954]">
          Lengkapi data pemesan dan tanggal acara Anda. Seluruh kue dibuat segar berdasarkan pesanan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form Fields */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Data Pemesan */}
          <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#3B2925] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C62828] text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
              <span>Informasi Pemesan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-[#3B2925]">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full bg-[#FFFDFB] border border-[#EADFD9] rounded-xl px-4 py-2.5 text-sm text-[#3B2925] focus:outline-hidden focus:border-[#C62828]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3B2925]">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#FFFDFB] border border-[#EADFD9] rounded-xl px-4 py-2.5 text-sm text-[#3B2925] focus:outline-hidden focus:border-[#C62828]"
                />
                <span className="text-[10px] text-[#705954]">Digunakan untuk konfirmasi pesanan &amp; kurir</span>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3B2925]">Alamat Email</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  className="w-full bg-[#FFFDFB] border border-[#EADFD9] rounded-xl px-4 py-2.5 text-sm text-[#3B2925] focus:outline-hidden focus:border-[#C62828]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Metode Penyerahan Kue */}
          <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#3B2925] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C62828] text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
              <span>Metode Penyerahan Kue</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setDeliveryMethod('courier')}
                className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  deliveryMethod === 'courier'
                    ? 'border-[#C62828] bg-[#FFF5E9]/50 shadow-xs'
                    : 'border-[#EADFD9] bg-[#FFFDFB] hover:border-[#705954]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#3B2925] flex items-center gap-1.5">
                      <span>🚗</span> Diantar Kurir Toko
                    </span>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'courier'}
                      onChange={() => setDeliveryMethod('courier')}
                      className="accent-[#C62828]"
                    />
                  </div>
                  <p className="text-xs text-[#705954] mt-2 leading-relaxed">
                    Pengantaran aman menggunakan mobil toko langsung ke alamat tujuan area Jabodetabek.
                  </p>
                </div>
                <div className="text-xs font-bold text-[#C62828] mt-3">+Rp 60.000</div>
              </label>

              <label
                onClick={() => setDeliveryMethod('pickup')}
                className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  deliveryMethod === 'pickup'
                    ? 'border-[#C62828] bg-[#FFF5E9]/50 shadow-xs'
                    : 'border-[#EADFD9] bg-[#FFFDFB] hover:border-[#705954]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#3B2925] flex items-center gap-1.5">
                      <span>🏪</span> Ambil Sendiri di Toko
                    </span>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={deliveryMethod === 'pickup'}
                      onChange={() => setDeliveryMethod('pickup')}
                      className="accent-[#C62828]"
                    />
                  </div>
                  <p className="text-xs text-[#705954] mt-2 leading-relaxed">
                    Bisa diambil langsung di toko: Jl. Senopati No. 42, Jakarta Selatan.
                  </p>
                </div>
                <div className="text-xs font-bold text-[#2E7D32] mt-3">Gratis (Rp 0)</div>
              </label>
            </div>

            {/* Jadwal Pengiriman */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3B2925]">Pilih Tanggal</label>
                <select
                  value={deliveryDate}
                  onChange={e => setDeliveryDate(e.target.value)}
                  className={`w-full bg-[#FFFDFB] border rounded-xl px-4 py-2.5 text-sm text-[#3B2925] focus:outline-hidden cursor-pointer ${
                    isDateFull ? 'border-red-500 bg-red-50/40 text-red-700' : 'border-[#EADFD9] focus:border-[#C62828]'
                  }`}
                >
                  {ovenSlots.map(slot => (
                    <option 
                      key={slot.dateStr} 
                      value={slot.dateStr}
                    >
                      {slot.dayLabel} ({slot.status === 'full' ? 'Penuh' : slot.status === 'low' ? `Sisa ${slot.totalSlots - slot.bookedSlots} Slot` : 'Tersedia'})
                    </option>
                  ))}
                  <option value="19 Okt 2026">Sen, 19 Okt 2026 (Tersedia)</option>
                  <option value="20 Okt 2026">Sel, 20 Okt 2026 (Tersedia)</option>
                  <option value="21 Okt 2026">Rab, 21 Okt 2026 (Tersedia)</option>
                </select>
                {isDateFull && (
                  <p className="text-[11px] font-bold text-red-600 flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    <span>Tanggal ini sudah penuh. Silakan pilih tanggal lain.</span>
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#3B2925]">Perkiraan Jam Tiba</label>
                <select
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  className="w-full bg-[#FFFDFB] border border-[#EADFD9] rounded-xl px-4 py-2.5 text-sm text-[#3B2925] focus:outline-hidden focus:border-[#C62828] cursor-pointer"
                >
                  <option value="09:00 – 12:00 WIB">Pagi (09:00 – 12:00 WIB)</option>
                  <option value="13:00 – 16:00 WIB">Siang (13:00 – 16:00 WIB)</option>
                  <option value="16:00 – 19:00 WIB">Sore (16:00 – 19:00 WIB)</option>
                </select>
              </div>
            </div>

            {/* Alamat */}
            {deliveryMethod === 'courier' && (
              <div className="space-y-1 pt-2">
                <label className="text-xs font-semibold text-[#3B2925]">Alamat Lengkap Pengiriman</label>
                <textarea
                  rows={2}
                  required
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="Nama jalan, nomor rumah/gedung, lantai, patokan..."
                  className="w-full bg-[#FFFDFB] border border-[#EADFD9] rounded-xl px-4 py-2.5 text-sm text-[#3B2925] focus:outline-hidden focus:border-[#C62828] resize-none"
                />
              </div>
            )}

            {/* Catatan */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#3B2925]">Catatan Tambahan untuk Toko / Kurir</label>
              <input
                type="text"
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Contoh: Titip ke resepsionis, hubungi sebelum sampai..."
                className="w-full bg-[#FFFDFB] border border-[#EADFD9] rounded-xl px-4 py-2 text-sm text-[#3B2925] focus:outline-hidden focus:border-[#C62828]"
              />
            </div>
          </div>

          {/* Section 3: Skema Pembayaran */}
          <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#3B2925] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#C62828] text-white text-xs flex items-center justify-center font-sans font-bold">3</span>
              <span>Pilihan Pembayaran</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                onClick={() => setPaymentOption('dp_50')}
                className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  paymentOption === 'dp_50'
                    ? 'border-[#C62828] bg-[#FFF5E9]/50 shadow-xs'
                    : 'border-[#EADFD9] bg-[#FFFDFB] hover:border-[#705954]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#3B2925]">Bayar Uang Muka (DP 50%)</span>
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === 'dp_50'}
                      onChange={() => setPaymentOption('dp_50')}
                      className="accent-[#C62828]"
                    />
                  </div>
                  <p className="text-xs text-[#705954] mt-2 leading-relaxed">
                    Konfirmasi pesanan dengan DP 50%. Sisa pelunasan dilakukan H-1 sebelum kue dikirim.
                  </p>
                </div>
                <div className="text-xs font-bold text-[#C62828] mt-3">
                  Rp {dpAmount.toLocaleString('id-ID')}
                </div>
              </label>

              <label
                onClick={() => setPaymentOption('full')}
                className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  paymentOption === 'full'
                    ? 'border-[#C62828] bg-[#FFF5E9]/50 shadow-xs'
                    : 'border-[#EADFD9] bg-[#FFFDFB] hover:border-[#705954]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#3B2925]">Bayar Penuh (100%)</span>
                    <input
                      type="radio"
                      name="paymentOption"
                      checked={paymentOption === 'full'}
                      onChange={() => setPaymentOption('full')}
                      className="accent-[#C62828]"
                    />
                  </div>
                  <p className="text-xs text-[#705954] mt-2 leading-relaxed">
                    Pembayaran lunas langsung di awal untuk kemudahan dan kepraktisan Anda.
                  </p>
                </div>
                <div className="text-xs font-bold text-[#3B2925] mt-3">
                  Rp {total.toLocaleString('id-ID')}
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 shadow-xs sticky top-28 space-y-6">
            <div className="flex items-center justify-between border-b border-[#EADFD9] pb-4">
              <h3 className="font-serif text-lg font-bold text-[#3B2925]">Ringkasan Pesanan</h3>
              <span className="text-xs text-[#705954] font-medium">{cartItems.length} Produk</span>
            </div>

            {/* Items List */}
            {cartItems.length === 0 ? (
              <div className="text-center py-8 space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#705954]">shopping_basket</span>
                <p className="text-xs text-[#705954]">Keranjang pesanan masih kosong.</p>
                <button
                  type="button"
                  onClick={() => setCurrentView('katalog-kue')}
                  className="text-xs font-bold text-[#C62828] underline cursor-pointer"
                >
                  Pilih kue dari katalog
                </button>
              </div>
            ) : (
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 bg-[#FFF5E9]/40 p-3 rounded-xl border border-[#EADFD9]/60">
                    <img src={item.productImage} alt={item.productName} className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-xs text-[#3B2925] truncate">{item.productName}</h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#705954] hover:text-[#C62828] text-xs cursor-pointer"
                          title="Hapus kue"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-[11px] text-[#705954] mt-0.5">{item.size} × {item.quantity}</div>
                      {item.customMessage && (
                        <div className="text-[10px] text-[#C62828] font-medium mt-1 truncate">
                          Ucapan: &ldquo;{item.customMessage}&rdquo;
                        </div>
                      )}
                      <div className="text-xs font-bold text-[#3B2925] mt-1">
                        Rp {item.totalPrice.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Cost Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-[#EADFD9] text-xs">
              <div className="flex justify-between text-[#705954]">
                <span>Subtotal Produk</span>
                <span className="font-semibold text-[#3B2925]">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-[#705954]">
                <span>Biaya Penyerahan ({deliveryMethod === 'courier' ? 'Diantar Kurir Toko' : 'Ambil Sendiri'})</span>
                <span className="font-semibold text-[#3B2925]">
                  {deliveryFee > 0 ? `Rp ${deliveryFee.toLocaleString('id-ID')}` : 'Gratis'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#3B2925] pt-2 border-t border-[#EADFD9]">
                <span>Total Nilai Pesanan</span>
                <span>Rp {total.toLocaleString('id-ID')}</span>
              </div>
              {paymentOption === 'dp_50' ? (
                <>
                  <div className="flex justify-between text-xs text-[#C62828] bg-[#FFF5E9] p-2.5 rounded-lg border border-[#EADFD9] font-bold">
                    <span>DP 50% yang Harus Dibayar</span>
                    <span>Rp {dpAmount.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#705954] px-1">
                    <span>Sisa Pelunasan (H-1 Kirim)</span>
                    <span className="font-semibold text-[#3B2925]">Rp {remainingAmount.toLocaleString('id-ID')}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-xs text-[#2E7D32] bg-green-50 p-2.5 rounded-lg border border-green-200 font-bold">
                  <span>Pembayaran Lunas (100%)</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              )}
            </div>

            {/* Submit Action */}
            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={cartItems.length === 0 || isDateFull}
                className={`w-full inline-flex items-center justify-center gap-2 text-white font-semibold text-sm px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer ${
                  cartItems.length === 0 || isDateFull ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#C62828] hover:bg-[#9B1B1B]'
                }`}
              >
                <span>Konfirmasi Pesanan</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentView('katalog-kue')}
                className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#705954] hover:text-[#3B2925] py-2 cursor-pointer transition-colors"
              >
                <span>← Kembali ke Katalog Kue</span>
              </button>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-[#705954]">
                Pesanan akan langsung dicatat oleh tim toko Sweet Bakery.
              </span>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
