import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PreOrderItem } from '../../types';

export const ProductDetailView: React.FC = () => {
  const { selectedProduct, addToCart, setCurrentView } = useApp();
  
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>(selectedProduct.image);
  const [quantity, setQuantity] = useState<number>(1);
  const [customMessage, setCustomMessage] = useState<string>('Selamat Ulang Tahun Sarah! ✨');
  const [candleOption, setCandleOption] = useState<string>('Lilin Spiral Gold (2 batang)');
  const [greetingCard, setGreetingCard] = useState<string>('Semoga panjang umur, sehat selalu, dan bahagia bersama keluarga.');

  const currentDiameter = selectedProduct.diameterOptions[selectedSizeIndex] || selectedProduct.diameterOptions[0];
  const unitPrice = currentDiameter ? currentDiameter.price : selectedProduct.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToBag = () => {
    const newItem: PreOrderItem = {
      id: `item-${Date.now()}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      productImage: selectedProduct.image,
      size: `${currentDiameter.size} (${currentDiameter.servings})`,
      unitPrice,
      quantity,
      customMessage: customMessage.trim(),
      candleOption,
      greetingCard: greetingCard.trim(),
      totalPrice
    };

    addToCart(newItem);
    setCurrentView('formulir-pre-order');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-[#705954]">
        <button onClick={() => setCurrentView('beranda')} className="hover:text-[#C62828] cursor-pointer">
          Beranda
        </button>
        <span>/</span>
        <button onClick={() => setCurrentView('katalog-kue')} className="hover:text-[#C62828] cursor-pointer">
          Katalog Kue
        </button>
        <span>/</span>
        <span className="text-[#3B2925] font-semibold">{selectedProduct.name}</span>
      </nav>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#FAF0E6] aspect-square border border-[#EADFD9]">
            <img
              src={selectedImage}
              alt={selectedProduct.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <span className="absolute top-4 left-4 bg-white/95 text-[#C62828] text-xs font-bold px-3 py-1.5 rounded-full border border-[#EADFD9]/60 shadow-xs">
              {selectedProduct.leadTime}
            </span>
            {selectedProduct.badge && (
              <span className="absolute top-4 right-4 bg-[#C62828] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {selectedProduct.galleryImages && selectedProduct.galleryImages.length > 1 && (
            <div className="flex items-center gap-3">
              {selectedProduct.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedImage === img ? 'border-[#C62828] shadow-xs scale-105' : 'border-[#EADFD9] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Storage Information */}
          <div className="bg-[#FFF5E9]/60 border border-[#EADFD9] rounded-2xl p-5 space-y-2 mt-6">
            <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#3B2925]">
              <span className="material-symbols-outlined text-[18px] text-[#C62828]">kitchen</span>
              <span>Petunjuk Penyimpanan</span>
            </div>
            <p className="text-xs text-[#705954] leading-relaxed">
              {selectedProduct.storageAdvice}
            </p>
          </div>
        </div>

        {/* Right Column: Customizer & Pre-Order Config */}
        <div className="lg:col-span-6 space-y-8">
          
          {/* Header Info */}
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C62828] bg-[#FFF5E9] px-2.5 py-1 rounded-md border border-[#EADFD9] inline-block">
              {selectedProduct.categoryLabel}
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B2925] tracking-tight">
              {selectedProduct.name}
            </h1>

            <p className="text-sm text-[#705954] leading-relaxed">
              {selectedProduct.fullDesc}
            </p>

            <div className="text-2xl sm:text-3xl font-bold text-[#C62828] pt-2">
              Rp {totalPrice.toLocaleString('id-ID')}
              <span className="text-xs font-normal text-[#705954] ml-2">
                (Ketentuan DP 50%: Rp {Math.round(totalPrice * 0.5).toLocaleString('id-ID')})
              </span>
            </div>
          </div>

          <hr className="border-[#EADFD9]" />

          {/* 1. Pilih Ukuran */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-[#3B2925] uppercase tracking-wider">
              1. Pilih Ukuran Kue
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedProduct.diameterOptions.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSizeIndex === idx
                      ? 'border-[#C62828] bg-[#FFF5E9] text-[#C62828] shadow-xs'
                      : 'border-[#EADFD9] bg-white text-[#3B2925] hover:border-[#705954]'
                  }`}
                >
                  <div className="font-bold text-sm">{opt.size}</div>
                  <div className="text-[11px] text-[#705954] mt-0.5">{opt.servings}</div>
                  <div className="text-xs font-semibold mt-1 text-[#3B2925]">{opt.formattedPrice}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Tulisan Ucapan */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#3B2925] uppercase tracking-wider">
              2. Tulisan Ucapan pada Kue / Plakat Cokelat
            </label>
            <input
              type="text"
              maxLength={40}
              value={customMessage}
              onChange={e => setCustomMessage(e.target.value)}
              placeholder="Contoh: Selamat Ulang Tahun Sarah! ✨"
              className="w-full bg-white border border-[#EADFD9] rounded-xl px-4 py-3 text-sm text-[#3B2925] placeholder:text-[#705954]/50 focus:outline-hidden focus:border-[#C62828]"
            />
            <span className="text-[11px] text-[#705954] block">
              Tulisan ucapan dibuat rapi menggunakan cokelat (maksimal 40 karakter).
            </span>
          </div>

          {/* 3. Pilihan Lilin */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#3B2925] uppercase tracking-wider">
              3. Pilihan Lilin
            </label>
            <select
              value={candleOption}
              onChange={e => setCandleOption(e.target.value)}
              className="w-full bg-white border border-[#EADFD9] rounded-xl px-4 py-3 text-sm text-[#3B2925] focus:outline-hidden focus:border-[#C62828] cursor-pointer"
            >
              <option value="Lilin Spiral Gold (2 batang)">Lilin Spiral Emas (2 batang) - Termasuk</option>
              <option value="Lilin Batang Standar (5 batang)">Lilin Batang Klasik (5 batang) - Termasuk</option>
              <option value="Lilin Angka">Lilin Angka (Tulis angka pada catatan)</option>
              <option value="Tanpa Lilin">Tanpa Lilin</option>
            </select>
          </div>

          {/* 4. Kartu Ucapan */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#3B2925] uppercase tracking-wider">
              4. Pesan pada Kartu Ucapan
            </label>
            <textarea
              rows={2}
              value={greetingCard}
              onChange={e => setGreetingCard(e.target.value)}
              placeholder="Tuliskan ucapan hangat untuk penerima kue..."
              className="w-full bg-white border border-[#EADFD9] rounded-xl px-4 py-2.5 text-sm text-[#3B2925] placeholder:text-[#705954]/50 focus:outline-hidden focus:border-[#C62828] resize-none"
            />
          </div>

          {/* Jumlah & Aksi */}
          <div className="pt-4 border-t border-[#EADFD9] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#3B2925] uppercase tracking-wider">
                Jumlah Pesanan
              </span>
              <div className="flex items-center gap-3 bg-[#FFF5E9] border border-[#EADFD9] rounded-full px-3 py-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#3B2925] hover:text-[#C62828] cursor-pointer"
                >
                  -
                </button>
                <span className="text-sm font-bold text-[#3B2925] px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#3B2925] hover:text-[#C62828] cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToBag}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white font-semibold text-sm px-6 py-4 rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Pesan Sekarang</span>
              </button>
              <a
                href={`https://wa.me/6281234567890?text=Halo%20Sweet%20Bakery,%20saya%20ingin%20bertanya%20tentang%20kue%20${encodeURIComponent(selectedProduct.name)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#EADFD9] bg-white hover:bg-[#FFF5E9] text-[#3B2925] font-semibold text-sm px-5 py-4 rounded-full transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-[#2E7D32]">chat</span>
                <span>Hubungi Kami</span>
              </a>
            </div>
          </div>

          {/* Bahan Pilihan */}
          <div className="pt-4 border-t border-[#EADFD9]/60">
            <h4 className="text-xs font-bold text-[#3B2925] uppercase tracking-wider mb-2">
              Bahan Pilihan Berkualitas
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.ingredients.map((ing, i) => (
                <span key={i} className="text-xs bg-white border border-[#EADFD9] text-[#705954] px-3 py-1 rounded-full">
                  {ing}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
