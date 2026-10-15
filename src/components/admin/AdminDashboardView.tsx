import React from 'react';
import { useApp } from '../../context/AppContext';

export const AdminDashboardView: React.FC = () => {
  const { orders, paymentVerifications, ovenBatches, setCurrentView, setActiveOrder } = useApp();

  const pendingPVs = paymentVerifications.filter(p => p.status === 'pending');
  const activeOrdersCount = orders.length;

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C62828] bg-[#FFF5E9] px-2.5 py-1 rounded-md border border-[#EADFD9]">
            Operasional Sweet Bakery
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2925] mt-1">
            Dashboard
          </h1>
          <p className="text-xs text-[#705954]">
            Kamis, 15 Oktober 2026 · Dapur Sweet Bakery, Jl. Senopati No. 42
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('kalender-produksi-oven')}
            className="inline-flex items-center gap-2 bg-white border border-[#EADFD9] hover:bg-[#FFF5E9] text-[#3B2925] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span>Jadwal Produksi</span>
          </button>
          <button
            onClick={() => setCurrentView('verifikasi-pembayaran')}
            className="inline-flex items-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">payments</span>
            <span>Verifikasi Pembayaran ({pendingPVs.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#EADFD9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#705954]">Pesanan Pekan Ini</span>
            <span className="w-8 h-8 rounded-lg bg-red-50 text-[#C62828] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
            </span>
          </div>
          <div className="font-serif text-3xl font-bold text-[#3B2925]">{activeOrdersCount}</div>
          <div className="text-[11px] text-[#2E7D32] flex items-center gap-1 font-semibold">
            <span>↑ 12%</span>
            <span className="text-[#705954] font-normal">dari pekan sebelumnya</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#EADFD9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#705954]">Kapasitas Oven Hari Ini</span>
            <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">microwave</span>
            </span>
          </div>
          <div className="font-serif text-3xl font-bold text-[#3B2925]">22 / 24</div>
          <div className="text-[11px] text-[#C62828] flex items-center gap-1 font-semibold">
            <span>91% Terisi</span>
            <span className="text-[#705954] font-normal">(Sisa 2 slot sore)</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#EADFD9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#705954]">Total Nilai Pesanan</span>
            <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">payments</span>
            </span>
          </div>
          <div className="font-serif text-3xl font-bold text-[#3B2925]">Rp 12,4 Jt</div>
          <div className="text-[11px] text-[#2E7D32] flex items-center gap-1 font-semibold">
            <span>DP Diterima: Rp 6.820.000</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#EADFD9] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#705954]">Menunggu Verifikasi DP</span>
            <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
            </span>
          </div>
          <div className="font-serif text-3xl font-bold text-[#C62828]">{pendingPVs.length}</div>
          <div className="text-[11px] text-[#705954]">
            Perlu konfirmasi admin toko
          </div>
        </div>

      </div>

      {/* Two Column Grid: Urgent Action & Oven Batches */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Urgent Action List */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EADFD9] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#3B2925] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#C62828] text-[20px]">notification_important</span>
              <span>Pesanan Butuh Tindakan Segera</span>
            </h3>
            <button
              onClick={() => setCurrentView('verifikasi-pembayaran')}
              className="text-xs font-semibold text-[#C62828] hover:underline cursor-pointer"
            >
              Lihat Semua ({pendingPVs.length})
            </button>
          </div>

          <div className="space-y-3">
            {pendingPVs.slice(0, 3).map(pv => (
              <div key={pv.id} className="p-3.5 bg-[#FAF7F4] rounded-xl border border-[#EADFD9] flex items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#3B2925]">{pv.orderId}</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
                      {pv.paymentMethod}
                    </span>
                  </div>
                  <div className="text-xs text-[#705954] truncate">
                    {pv.customerName} · {pv.productName}
                  </div>
                  <div className="text-xs font-bold text-[#C62828]">
                    Nominal: {pv.formattedNominal}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView('verifikasi-pembayaran')}
                  className="shrink-0 bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Verifikasi
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Oven Schedule */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-[#EADFD9] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-[#3B2925] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ED6C02] text-[20px]">local_fire_department</span>
              <span>Jadwal Produksi Hari Ini</span>
            </h3>
            <button
              onClick={() => setCurrentView('kalender-produksi-oven')}
              className="text-xs font-semibold text-[#C62828] hover:underline cursor-pointer"
            >
              Jadwal Lengkap
            </button>
          </div>

          <div className="space-y-3">
            {ovenBatches.map(batch => (
              <div key={batch.id} className="p-3.5 bg-[#FAF7F4] rounded-xl border border-[#EADFD9] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-xs text-[#3B2925]">{batch.name}</div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                      batch.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : batch.status === 'in_progress'
                          ? 'bg-orange-100 text-orange-800 animate-pulse'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {batch.status === 'completed' ? 'Selesai' : batch.status === 'in_progress' ? 'Sedang Dipanggang' : 'Terjadwal'}
                  </span>
                </div>
                <div className="text-xs text-[#705954]">{batch.description}</div>
                <div className="text-[11px] font-mono text-[#C62828]">
                  Suhu: {batch.temperature} · {batch.orderCount} Loyang
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-[#3B2925]">
            Daftar Pesanan Terkini
          </h3>
          <button
            onClick={() => setCurrentView('manajemen-pesanan')}
            className="text-xs font-semibold text-[#C62828] hover:underline cursor-pointer"
          >
            Buka Manajemen Pesanan ({orders.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#EADFD9] text-[#705954]">
                <th className="pb-3 font-semibold">No. Pesanan</th>
                <th className="pb-3 font-semibold">Pelanggan</th>
                <th className="pb-3 font-semibold">Produk &amp; Ukuran</th>
                <th className="pb-3 font-semibold">Jadwal Kirim</th>
                <th className="pb-3 font-semibold">Status Pembayaran</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADFD9]">
              {orders.slice(0, 5).map(ord => (
                <tr key={ord.id} className="hover:bg-[#FAF7F4] transition-colors">
                  <td className="py-3 font-bold text-[#3B2925]">{ord.id}</td>
                  <td className="py-3">
                    <div className="font-semibold text-[#3B2925]">{ord.customerName}</div>
                    <div className="text-[11px] text-[#705954]">{ord.customerPhone}</div>
                  </td>
                  <td className="py-3 text-[#705954]">
                    {ord.items[0]?.productName} ({ord.items[0]?.size})
                  </td>
                  <td className="py-3 text-[#3B2925] font-medium">
                    {ord.deliveryDate}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      ord.paymentStatus === 'fully_paid' 
                        ? 'bg-green-100 text-green-800'
                        : ord.paymentStatus === 'dp_paid'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.paymentStatus === 'fully_paid' ? 'Lunas 100%' : ord.paymentStatus === 'dp_paid' ? 'DP Terbayar' : 'Menunggu DP'}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => {
                        setActiveOrder(ord);
                        setCurrentView('status-pesanan');
                      }}
                      className="text-[#C62828] hover:underline font-semibold cursor-pointer"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
