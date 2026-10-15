import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const OvenCalendarView: React.FC = () => {
  const { ovenSlots, ovenBatches, updateBatchStatus } = useApp();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(3); // Default to Thursday (Hari ini)

  const selectedSlot = ovenSlots[selectedDayIndex] || ovenSlots[0];

  const toggleBatchStatus = (batchId: string) => {
    const current = ovenBatches.find(b => b.id === batchId);
    if (current) {
      const nextStatus = current.status === 'scheduled' ? 'in_progress' : current.status === 'in_progress' ? 'completed' : 'scheduled';
      updateBatchStatus(batchId, nextStatus);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C62828] bg-[#FFF5E9] px-2.5 py-1 rounded-md border border-[#EADFD9]">
            Jadwal Dapur
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2925] mt-1">
            Jadwal Produksi
          </h1>
          <p className="text-xs text-[#705954]">
            Kapasitas dapur: 24 pesanan per hari · Pemesanan minimal H-2
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-white border border-[#EADFD9] hover:bg-[#FFF5E9] text-[#3B2925] text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak Jadwal</span>
          </button>
        </div>
      </div>

      {/* Daily Capacity Meter Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-sm font-bold text-[#3B2925]">
            Kapasitas Produksi Harian
          </h3>
          <span className="text-xs text-[#705954]">Pilih hari untuk melihat jadwal pembuatan kue</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {ovenSlots.map((slot, idx) => {
            const isSelected = selectedDayIndex === idx;
            const percentage = Math.round((slot.bookedSlots / slot.totalSlots) * 100);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedDayIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#C62828] bg-[#FFF5E9] shadow-md ring-2 ring-[#C62828]/20'
                    : 'border-[#EADFD9] bg-white hover:border-[#705954]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#3B2925]">{slot.dayLabel}</span>
                  {slot.isToday && (
                    <span className="text-[9px] bg-[#C62828] text-white px-1.5 py-0.5 rounded-sm font-bold uppercase">
                      Hari Ini
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-[#3B2925]">{slot.bookedSlots}/{slot.totalSlots}</span>
                    <span className={slot.status === 'full' ? 'text-[#C62828]' : 'text-[#705954]'}>
                      {percentage}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-[#FAF0E6] h-2 rounded-full mt-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        slot.status === 'full' ? 'bg-[#C62828]' : slot.status === 'low' ? 'bg-[#ED6C02]' : 'bg-[#2E7D32]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="text-[10px] text-[#705954] mt-2 font-medium">
                  {slot.status === 'full' ? '🔴 Slot Penuh' : slot.status === 'low' ? `🟠 Sisa ${slot.totalSlots - slot.bookedSlots} Slot` : '🟢 Tersedia'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detailed Batches Section */}
      <div className="bg-white rounded-2xl border border-[#EADFD9] p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#EADFD9] gap-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#3B2925]">
              Rincian Jadwal Produksi ({selectedSlot.dayLabel})
            </h2>
            <p className="text-xs text-[#705954] mt-0.5">
              Jadwal pemanggangan dan persiapan kue di dapur Sweet Bakery
            </p>
          </div>
          <div className="text-xs bg-[#FFF5E9] border border-[#EADFD9] px-3.5 py-1.5 rounded-full text-[#C62828] font-bold">
            Total Terjadwal: {selectedSlot.bookedSlots} Loyang Kue
          </div>
        </div>

        {/* Batches Cards */}
        <div className="space-y-4">
          {ovenBatches.map(batch => (
            <div
              key={batch.id}
              className="p-5 rounded-2xl border border-[#EADFD9] bg-[#FAF7F4] hover:bg-white transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#FFF5E9] text-[#C62828] flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-[22px]">microwave</span>
                  </span>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#3B2925]">{batch.name}</h4>
                    <span className="text-xs text-[#705954]">{batch.description}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-[#C62828]">
                      {batch.temperature}
                    </div>
                    <div className="text-[11px] text-[#705954]">{batch.orderCount} Loyang Terisi</div>
                  </div>

                  <button
                    onClick={() => toggleBatchStatus(batch.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      batch.status === 'completed'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : batch.status === 'in_progress'
                          ? 'bg-orange-100 text-orange-800 hover:bg-orange-200 animate-pulse'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {batch.status === 'completed' ? '✓ Selesai' : batch.status === 'in_progress' ? '🔥 Dipanggang' : '⏳ Terjadwal'}
                  </button>
                </div>
              </div>

              {/* Orders in Batch */}
              <div className="pt-3 border-t border-[#EADFD9]/70 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {batch.orders.map((ord, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-[#EADFD9] text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-[#3B2925]">
                      <span>{ord.orderId}</span>
                      <span className="text-[10px] bg-[#FFF5E9] text-[#C62828] px-1.5 py-0.5 rounded-sm">
                        {ord.station}
                      </span>
                    </div>
                    <div className="text-[#705954] truncate">{ord.cake}</div>
                    <div className="text-[11px] font-semibold text-[#3B2925]">{ord.size}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
