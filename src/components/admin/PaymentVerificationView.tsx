import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentVerification } from '../../types';

export const PaymentVerificationView: React.FC = () => {
  const { paymentVerifications, verifyPayment, rejectPayment } = useApp();
  const [selectedProof, setSelectedProof] = useState<PaymentVerification | null>(null);
  const [rejectModalPv, setRejectModalPv] = useState<PaymentVerification | null>(null);
  const [rejectReason, setRejectReason] = useState<string>('Nominal transfer tidak sesuai dengan tagihan DP 50%.');

  const pendingList = paymentVerifications.filter(p => p.status === 'pending');
  const processedList = paymentVerifications.filter(p => p.status !== 'pending');

  const handleApprove = (pv: PaymentVerification) => {
    verifyPayment(pv.id);
  };

  const handleConfirmReject = () => {
    if (rejectModalPv) {
      rejectPayment(rejectModalPv.id, rejectReason);
      setRejectModalPv(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C62828] bg-[#FFF5E9] px-2.5 py-1 rounded-md border border-[#EADFD9]">
            Verifikasi Pembayaran
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2925] mt-1">
            Pembayaran
          </h1>
          <p className="text-xs text-[#705954]">
            {pendingList.length} bukti transfer memerlukan konfirmasi admin toko Sweet Bakery.
          </p>
        </div>

        <div className="text-xs bg-[#FFF5E9] border border-[#EADFD9] px-4 py-2 rounded-xl text-[#3B2925] font-medium">
          Rekening Toko: <strong>BCA &amp; QRIS Sweet Bakery</strong>
        </div>
      </div>

      {/* Pending Verifications */}
      <div className="space-y-4">
        <h2 className="font-serif text-base font-bold text-[#3B2925]">
          Menunggu Konfirmasi ({pendingList.length})
        </h2>

        {pendingList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EADFD9] p-8 text-center space-y-2">
            <span className="material-symbols-outlined text-4xl text-[#2E7D32]">verified</span>
            <div className="font-serif font-bold text-base text-[#3B2925]">Semua Pembayaran Telah Diverifikasi</div>
            <p className="text-xs text-[#705954]">Tidak ada bukti transfer tertunda saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pendingList.map(pv => (
              <div
                key={pv.id}
                className="bg-white rounded-2xl border border-[#EADFD9] p-5 space-y-4 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#3B2925]">{pv.orderId}</span>
                      <span className="text-[10px] bg-red-50 text-[#C62828] font-bold px-2 py-0.5 rounded-full border border-red-100">
                        {pv.paymentMethod}
                      </span>
                    </div>
                    <div className="font-serif font-semibold text-base text-[#3B2925]">{pv.customerName}</div>
                    <div className="text-xs text-[#705954]">{pv.phone}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#705954] block">Nominal Transfer:</span>
                    <span className="font-serif text-lg font-bold text-[#C62828] block">
                      {pv.formattedNominal}
                    </span>
                    <span className="text-[10px] text-[#705954]">{pv.timestamp}</span>
                  </div>
                </div>

                <div className="bg-[#FAF7F4] p-3 rounded-xl border border-[#EADFD9] text-xs text-[#705954] space-y-0.5">
                  <div><strong>Kue:</strong> {pv.productName}</div>
                  <div><strong>Jadwal:</strong> {pv.cakeDetails}</div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProof(pv)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B2925] hover:text-[#C62828] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">visibility</span>
                    <span>Lihat Struk Transfer</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRejectModalPv(pv)}
                      className="px-3 py-1.5 rounded-xl border border-[#EADFD9] hover:bg-red-50 text-xs font-semibold text-red-700 transition-colors cursor-pointer"
                    >
                      Tolak
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApprove(pv)}
                      className="px-4 py-1.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
                    >
                      Setujui Pembayaran
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History of Processed Verifications */}
      {processedList.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-[#EADFD9]">
          <h2 className="font-serif text-base font-bold text-[#3B2925]">
            Riwayat Verifikasi ({processedList.length})
          </h2>

          <div className="bg-white rounded-2xl border border-[#EADFD9] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#FAF7F4] border-b border-[#EADFD9] text-[#705954]">
                  <th className="py-3 px-4 font-semibold">No. Pesanan</th>
                  <th className="py-3 px-4 font-semibold">Pelanggan</th>
                  <th className="py-3 px-4 font-semibold">Nominal</th>
                  <th className="py-3 px-4 font-semibold">Metode</th>
                  <th className="py-3 px-4 font-semibold">Status &amp; Verifikator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EADFD9]">
                {processedList.map(pv => {
                  const anyPv = pv as any;
                  return (
                    <tr key={pv.id}>
                      <td className="py-3 px-4 font-bold text-[#3B2925]">{pv.orderId}</td>
                      <td className="py-3 px-4">{pv.customerName}</td>
                      <td className="py-3 px-4 font-semibold text-[#3B2925]">{pv.formattedNominal}</td>
                      <td className="py-3 px-4 text-[#705954]">{pv.paymentMethod}</td>
                      <td className="py-3 px-4">
                        {pv.status === 'approved' ? (
                          <div className="space-y-0.5">
                            <span className="text-green-700 font-bold bg-green-50 px-2.5 py-0.5 rounded-full text-[10px] inline-block">
                              ✓ Pembayaran telah diverifikasi
                            </span>
                            <div className="text-[10px] text-[#705954]">
                              Oleh: <strong className="text-[#3B2925]">{anyPv.verifiedBy || 'Adit (Admin Toko)'}</strong> · {anyPv.verifiedAt || pv.timestamp}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="text-red-700 font-bold bg-red-50 px-2.5 py-0.5 rounded-full text-[10px] inline-block">
                              ✕ Ditolak
                            </span>
                            <div className="text-[10px] text-red-600 font-medium">
                              Alasan: {pv.rejectionReason}
                            </div>
                            <div className="text-[9px] text-[#705954]">
                              Oleh: {anyPv.rejectedBy || 'Admin Toko'} · {anyPv.rejectedAt || pv.timestamp}
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Proof Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 bg-[#3B2925]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-[#EADFD9]">
            <div className="flex items-center justify-between border-b border-[#EADFD9] pb-3">
              <div>
                <h3 className="font-serif text-base font-bold text-[#3B2925]">Bukti Transfer</h3>
                <span className="text-xs text-[#705954]">{selectedProof.orderId} · {selectedProof.customerName}</span>
              </div>
              <button
                onClick={() => setSelectedProof(null)}
                className="text-[#705954] hover:text-[#C62828] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-[3/4] bg-[#FAF7F4] rounded-2xl overflow-hidden border border-[#EADFD9] flex items-center justify-center">
              <img
                src={
                  selectedProof.slipUrl.startsWith('/api/')
                    ? `${selectedProof.slipUrl}?token=${sessionStorage.getItem('sweet_bakery_admin_jwt') || ''}`
                    : selectedProof.slipUrl
                }
                alt="Bukti Transfer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            <div className="text-xs bg-[#FFF5E9] p-3 rounded-xl border border-[#EADFD9] text-[#705954]">
              <div><strong>Nominal:</strong> {selectedProof.formattedNominal}</div>
              <div><strong>Waktu:</strong> {selectedProof.timestamp}</div>
              <div><strong>Metode:</strong> {selectedProof.paymentMethod}</div>
            </div>

            <button
              onClick={() => {
                handleApprove(selectedProof);
                setSelectedProof(null);
              }}
              className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-semibold py-3 rounded-full transition-colors cursor-pointer"
            >
              Setujui Pembayaran Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModalPv && (
        <div className="fixed inset-0 z-50 bg-[#3B2925]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#EADFD9]">
            <div className="flex items-center justify-between border-b border-[#EADFD9] pb-3">
              <h3 className="font-serif text-base font-bold text-[#3B2925]">Tolak Bukti Pembayaran</h3>
              <button
                onClick={() => setRejectModalPv(null)}
                className="text-[#705954] hover:text-[#C62828] text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#3B2925]">Alasan Penolakan Transfer:</label>
              <textarea
                rows={3}
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                className="w-full bg-[#FAF7F4] border border-[#EADFD9] rounded-xl p-3 text-xs text-[#3B2925] focus:outline-hidden focus:border-[#C62828]"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleConfirmReject}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 rounded-xl cursor-pointer"
              >
                Konfirmasi Penolakan
              </button>
              <button
                onClick={() => setRejectModalPv(null)}
                className="border border-[#EADFD9] text-[#705954] text-xs font-semibold px-4 py-2.5 rounded-xl cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
