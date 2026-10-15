import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, OrderProductionStatus } from '../../types';

export const OrderManagementView: React.FC = () => {
  const { orders, updateOrderStatus, setActiveOrder, setCurrentView } = useApp();
  const [filterTab, setFilterTab] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (filterTab === 'pending_dp' && o.paymentStatus !== 'pending_dp') return false;
      if (filterTab === 'baking' && o.orderStatus !== 'baking' && o.orderStatus !== 'scheduled_oven') return false;
      if (filterTab === 'in_delivery' && o.orderStatus !== 'in_delivery' && o.orderStatus !== 'decorating_qc') return false;
      if (filterTab === 'completed' && o.orderStatus !== 'completed') return false;

      if (search.trim()) {
        const q = search.toLowerCase();
        const mId = o.id.toLowerCase().includes(q);
        const mName = o.customerName.toLowerCase().includes(q);
        const mPhone = o.customerPhone.includes(q);
        const mCake = o.items.some(i => i.productName.toLowerCase().includes(q));
        if (!mId && !mName && !mPhone && !mCake) return false;
      }
      return true;
    });
  }, [orders, filterTab, search]);

  const tabs = [
    { id: 'all', label: `Semua (${orders.length})` },
    { id: 'pending_dp', label: `Menunggu DP (${orders.filter(o => o.paymentStatus === 'pending_dp').length})` },
    { id: 'baking', label: `Dalam Oven (${orders.filter(o => o.orderStatus === 'baking' || o.orderStatus === 'scheduled_oven').length})` },
    { id: 'in_delivery', label: `Siap Kirim (${orders.filter(o => o.orderStatus === 'in_delivery' || o.orderStatus === 'decorating_qc').length})` },
    { id: 'completed', label: `Selesai (${orders.filter(o => o.orderStatus === 'completed').length})` }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C62828] bg-[#FFF5E9] px-2.5 py-1 rounded-md border border-[#EADFD9]">
            Order Operations
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2925] mt-1">
            Manajemen Pesanan Pre-Order
          </h1>
          <p className="text-xs text-[#705954]">
            Total {orders.length} pesanan tercatat dalam siklus pre-order aktif.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#705954]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari ID, pelanggan, kue..."
            className="pl-9 pr-4 py-2 bg-white border border-[#EADFD9] rounded-xl text-xs text-[#3B2925] w-64 focus:outline-hidden focus:border-[#C62828]"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#EADFD9] pb-3 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setFilterTab(t.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              filterTab === t.id
                ? 'bg-[#C62828] text-white shadow-xs'
                : 'text-[#705954] hover:bg-[#FFF5E9] hover:text-[#3B2925]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#EADFD9] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF7F4] border-b border-[#EADFD9] text-[#705954]">
                <th className="py-3 px-4 font-semibold">No. Pesanan</th>
                <th className="py-3 px-4 font-semibold">Pelanggan &amp; Kontak</th>
                <th className="py-3 px-4 font-semibold">Produk &amp; Ukuran</th>
                <th className="py-3 px-4 font-semibold">Jadwal Kirim</th>
                <th className="py-3 px-4 font-semibold">Status Finansial</th>
                <th className="py-3 px-4 font-semibold">Status Dapur</th>
                <th className="py-3 px-4 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADFD9]">
              {filteredOrders.map(ord => (
                <tr key={ord.id} className="hover:bg-[#FFF5E9]/30 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#3B2925] whitespace-nowrap">
                    {ord.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#3B2925]">{ord.customerName}</div>
                    <div className="text-[11px] text-[#705954]">{ord.customerPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="text-[#3B2925] font-medium">{ord.items[0]?.productName}</div>
                    <div className="text-[11px] text-[#705954]">{ord.items[0]?.size}</div>
                    {ord.items[0]?.customMessage && (
                      <div className="text-[10px] text-[#C62828] italic">
                        Plakat: &ldquo;{ord.items[0].customMessage}&rdquo;
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="font-medium text-[#3B2925]">{ord.deliveryDate}</div>
                    <div className="text-[11px] text-[#705954]">{ord.timeSlot}</div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-block ${
                      ord.paymentStatus === 'fully_paid'
                        ? 'bg-green-100 text-green-800'
                        : ord.paymentStatus === 'dp_paid'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.paymentStatus === 'fully_paid' 
                        ? 'Lunas 100%' 
                        : ord.paymentStatus === 'dp_paid'
                          ? `DP Lunas (Rp ${ord.dpAmount.toLocaleString('id-ID')})`
                          : `Menunggu DP (Rp ${ord.dpAmount.toLocaleString('id-ID')})`}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <select
                      value={ord.orderStatus}
                      onChange={e => updateOrderStatus(ord.id, e.target.value as OrderProductionStatus)}
                      className="bg-white border border-[#EADFD9] rounded-lg px-2.5 py-1 text-xs text-[#3B2925] font-medium focus:outline-hidden focus:border-[#C62828] cursor-pointer"
                    >
                      <option value="pending_verification">Menunggu DP</option>
                      <option value="scheduled_oven">Terjadwal Oven</option>
                      <option value="baking">Sedang Baking</option>
                      <option value="decorating_qc">Dekorasi &amp; QC</option>
                      <option value="in_delivery">Dalam Pengiriman</option>
                      <option value="completed">Selesai</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="inline-flex items-center text-[#C62828] hover:underline font-semibold cursor-pointer"
                    >
                      Detail
                    </button>
                    <a
                      href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, '')}?text=Halo%20${encodeURIComponent(ord.customerName)},%20kami%20dari%20Sweet%20Bakery%20ingin%20mengonfirmasi%20pesanan%20${encodeURIComponent(ord.id)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center p-1 rounded-md text-[#2E7D32] hover:bg-green-50"
                      title="Hubungi WhatsApp Pelanggan"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-[#3B2925]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-[#EADFD9] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#EADFD9] pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#3B2925]">{selectedOrder.id}</h3>
                <span className="text-xs text-[#705954]">{selectedOrder.customerName} · {selectedOrder.customerPhone}</span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-[#705954] hover:text-[#C62828] text-sm p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-[#FAF7F4] p-3 rounded-xl border border-[#EADFD9] space-y-1">
                <span className="font-bold text-[#3B2925]">Alamat Pengiriman / Metode:</span>
                <p className="text-[#705954]">{selectedOrder.deliveryAddress}</p>
                <div className="text-[11px] font-semibold text-[#C62828] pt-1">
                  Jadwal: {selectedOrder.deliveryDate} ({selectedOrder.timeSlot})
                </div>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-[#3B2925]">Rincian Item:</span>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex gap-3 bg-[#FFF5E9]/50 p-2.5 rounded-xl border border-[#EADFD9]/60">
                    <img src={it.productImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold text-[#3B2925]">{it.productName}</div>
                      <div className="text-[#705954]">{it.size} · Jumlah: {it.quantity}</div>
                      {it.customMessage && (
                        <div className="text-[#C62828] font-medium">Plakat: &ldquo;{it.customMessage}&rdquo;</div>
                      )}
                      {it.candleOption && <div>Lilin: {it.candleOption}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#FAF7F4] p-3 rounded-xl border border-[#EADFD9] space-y-1.5">
                <div className="flex justify-between">
                  <span>Total Pesanan:</span>
                  <span className="font-bold text-[#3B2925]">Rp {selectedOrder.total.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nominal DP 50%:</span>
                  <span className="font-bold text-[#2E7D32]">Rp {selectedOrder.dpAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Sisa Pelunasan:</span>
                  <span className="font-bold text-[#C62828]">Rp {selectedOrder.remainingAmount.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setActiveOrder(selectedOrder);
                  setSelectedOrder(null);
                  setCurrentView('status-pesanan');
                }}
                className="flex-1 bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Lihat di Pelacakan Pembeli
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="border border-[#EADFD9] text-[#705954] text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-[#FFF5E9] cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
