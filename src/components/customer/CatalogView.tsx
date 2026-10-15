import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCategory } from '../../types';

export const CatalogView: React.FC = () => {
  const { products, setSelectedProduct, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDesc.toLowerCase().includes(q);
          const matchIngredients = p.ingredients.some(ing => ing.toLowerCase().includes(q));
          if (!matchName && !matchDesc && !matchIngredients) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0;
      });
  }, [products, selectedCategory, sortBy, searchQuery]);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Kue' },
    { id: 'birthday', label: 'Kue Ulang Tahun' },
    { id: 'wedding', label: 'Kue Pernikahan' },
    { id: 'tart', label: 'Kue Tart' },
    { id: 'brownies', label: 'Brownies' },
    { id: 'hampers', label: 'Hampers dan Hantaran' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 space-y-10">
      
      {/* Header Banner */}
      <div className="space-y-3">
        <div className="inline-block text-xs font-semibold tracking-wider uppercase text-[#C62828] bg-[#FFF5E9] px-3 py-1 rounded-md border border-[#EADFD9]">
          Koleksi Sweet Bakery
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#3B2925] tracking-tight">
          Katalog Kue
        </h1>
        <p className="text-sm sm:text-base text-[#705954] max-w-2xl leading-relaxed">
          Beragam pilihan kue untuk ulang tahun, pernikahan, hantaran, dan berbagai momen spesial. Dibuat berdasarkan pesanan dengan bahan pilihan berkualitas.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#C62828] text-white shadow-xs'
                    : 'bg-[#FFF5E9] text-[#705954] hover:text-[#3B2925] hover:bg-[#FAF0E6] border border-[#EADFD9]/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#705954]">
                search
              </span>
              <input
                type="text"
                placeholder="Cari kue atau bahan..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-[#EADFD9] rounded-full text-xs text-[#3B2925] placeholder:text-[#705954]/60 focus:outline-hidden focus:border-[#C62828] w-48 sm:w-60"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-[#705954] hover:text-[#C62828] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-white border border-[#EADFD9] rounded-full px-3.5 py-2 text-xs text-[#3B2925] focus:outline-hidden focus:border-[#C62828] cursor-pointer font-medium"
            >
              <option value="default">Pilihan Menu</option>
              <option value="price-low">Harga: Terendah</option>
              <option value="price-high">Harga: Tertinggi</option>
            </select>
          </div>

        </div>

        {/* Counter Results */}
        <div className="text-xs text-[#705954] flex items-center justify-between">
          <span>Menampilkan <strong>{filteredProducts.length}</strong> pilihan kue</span>
          <span className="text-[11px] text-[#C62828] bg-[#FFF5E9] px-2.5 py-0.5 rounded-full border border-[#EADFD9]/80 font-medium">
            💡 Dibuat berdasarkan pesanan · Harap pesan min. H-2
          </span>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-[#EADFD9] overflow-hidden flex flex-col hover:shadow-lg transition-all group"
          >
            {/* Image & Badges */}
            <div className="relative aspect-[4/3] bg-[#FAF0E6] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-white/95 text-[#C62828] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#EADFD9]/60 shadow-xs">
                {product.leadTime}
              </span>
              {product.badge && (
                <span className="absolute top-3 right-3 bg-[#C62828] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] text-[#705954] block mb-1">
                  {product.categoryLabel}
                </span>
                <h3 className="font-serif text-lg font-semibold text-[#3B2925] group-hover:text-[#C62828] transition-colors line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-xs text-[#705954] mt-1.5 line-clamp-2 leading-relaxed">
                  {product.shortDesc}
                </p>
              </div>

              {/* Price & Actions */}
              <div className="pt-3 border-t border-[#EADFD9]/60 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-[#705954] block">Harga mulai</span>
                  <span className="font-bold text-[#3B2925] text-base">{product.formattedPrice}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentView('detail-produk');
                    }}
                    className="inline-flex items-center justify-center bg-[#FFF5E9] hover:bg-[#FAF0E6] text-[#3B2925] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#EADFD9] transition-colors cursor-pointer"
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentView('detail-produk');
                    }}
                    className="inline-flex items-center justify-center bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer shadow-xs"
                  >
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
