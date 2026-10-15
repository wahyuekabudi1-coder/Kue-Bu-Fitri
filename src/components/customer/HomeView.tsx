import React from 'react';
import { useApp } from '../../context/AppContext';

export const HomeView: React.FC = () => {
  const { products, setCurrentView, setSelectedProduct } = useApp();
  const featuredCakes = products.slice(0, 4);

  const categories = [
    {
      title: 'Kue Ulang Tahun',
      desc: 'Kue ulang tahun dengan tampilan menarik dan pilihan rasa yang bisa disesuaikan.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa8LTfZ34RoO438MF-EHf8dbTSe2ookM_7VK8XdkIfmIK2lyMw-vNizygkssQ-Ls6Thhb26AVcC4b1HHeW1kFpDyA3Oro_qz2yJXLg5l6kA9HgeU5y04YcbMNVscjuaRo2FUo-edJX7DAcbTlYcY20_o_4Lf-_-BaIKOMnszglSv2f295M3U5Qv8G2hJjClMGulAe4b8JIb8pp6jVowXiBjmwcQaGurUgB_dMC2eaxFgeF9KCXelQ'
    },
    {
      title: 'Kue Pernikahan',
      desc: 'Kue pernikahan dengan desain yang bisa disesuaikan dengan tema acara.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jvewi97GfOf_FvrcJCT2_nXn2fBpiVCzPfu8zAXONLlmIYAju9q5wvv9CYbmdHWjOkqgpmnrNeLIxZsJFQnOaVTCmwXbZqsN4T2wWwbCI-duc4wjn2i18ol_6x3Z5qaYCvGy0ZJMr-J5PSuqB7yDHJgVkZkFTP9BVpW3PC5crcN5bXhkJMRPwtS0Xp-QXmkLO-yzdXfyPn5ekr8fslRhf2yj7fM3mZreSr5UzZGfbpSlqlzCPow'
    },
    {
      title: 'Kue Basah',
      desc: 'Aneka kue basah untuk teman minum teh, acara keluarga, dan berbagai kegiatan.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2NXlYpV_zlpJWRXsPj5rAJqDC0iK17TpyOyAiT1361ioW7a5IQ6C54-n3x5OBChXOJ1WdeimZVtMQKr4WDic8GzLyLLQxC8BrTTyezlDaSAkj4IVnVbwz757WjRkoYCfCk4H-Punkbte8TVj8ax4-kgT40tvkhrrjhhctEq7LGJj7G6NiyEdyBTJz4HDkJmU4i43eahuvSkSON8JgJOAddW96uHXLyy_LZ1aU2fKIrKO4vnFOLn4'
    },
    {
      title: 'Brownies',
      desc: 'Brownies dengan rasa cokelat yang nikmat, cocok untuk camilan atau hadiah.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY1At4pzQxYXof361fgFzhWqvqmEMP7xg-fyLegtCreJ6WXnl8PP5tc5cCLC_bQ_ciFjpCkVzI5qLqiINnWSeShqpRTQAczd4JbyvEP1tJGKIszNrr6cIynwNOg8H9lu1ZB3DUEbRVQ7LBT0UXk1Vusf95boU9Xd7jU5HLAf0S2jp9oZ88AkkqqB2F8VR5-tAgbE-4dSTFI5yAso1X6ZUJT1iyQqBGe03mCKA7ynDN6zXdaC-4AH4'
    },
    {
      title: 'Kue Tart',
      desc: 'Kue tart lembut dengan pilihan rasa istimewa untuk momen spesial.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlwUOW2SNw8uuvDyaTuBE1eWtA7iErvJG8YnY1pVLdYeFd1CM7hTE3KPpvWcPqrDJiw0XEQpTP-aaoexdKV9cr1AR4ODhZ5rbHXYUoRyZBHxzXnmrCkSPr-smns2Wtf4LrO7DnV_JihXsSKTs5yol2K9mhVxBXLCCQ1g5TPWxAffaJRyAu4fxSypci6y5x3efxUclowd2YMEzFPd-ZH1ZGrL4nd02iiK0Py5ZXmDz1JGzURPlLRac'
    },
    {
      title: 'Hampers dan Hantaran',
      desc: 'Pilihan kue untuk hantaran dan bingkisan bagi keluarga maupun orang tersayang.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN_akFcojK1QFDACgixVBY7lbGblKtQUQk5yMTroSPQzMsARfFGp-Pf5G601fhecM54ckBlTZAVEIelSgJRUZ9JMKZz0uBWH5pde57QwPZaoVG_9tjDlwvwLtx1YsjFfzKrDCtasjOdNldRVWpTodvvV7lpUc6HLGzRgiI1Y70M-64dAyZk2Ng5XQX2sI__30WCUaG8RNV_5-yCrR8-99jv5oyTRZmMPEi7Yan7cpcB8B2KJhYGXs'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="py-12 lg:py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copy & Primary CTAs */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block text-xs font-semibold tracking-wider uppercase text-[#C62828] bg-[#FFF5E9] px-3 py-1 rounded-md border border-[#EADFD9]">
              Toko Kue Sweet Bakery
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#3B2925] tracking-tight leading-[1.15]">
              Manisnya Momen Bersama Sweet Bakery
            </h1>
            <p className="text-base sm:text-lg text-[#705954] leading-relaxed max-w-xl">
              Beragam pilihan kue untuk ulang tahun, pernikahan, hantaran, dan berbagai momen spesial. Dibuat berdasarkan pesanan dengan bahan pilihan berkualitas.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setCurrentView('katalog-kue')}
                className="inline-flex items-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>Lihat Katalog Kue</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => setCurrentView('formulir-pre-order')}
                className="inline-flex items-center gap-2 text-[#3B2925] font-semibold text-sm px-6 py-3.5 rounded-full border border-[#EADFD9] hover:bg-[#FFF5E9] transition-colors cursor-pointer"
              >
                <span>Pesan Kue</span>
              </button>
            </div>
            <div className="pt-6 border-t border-[#EADFD9]/80 flex flex-wrap items-center gap-6 sm:gap-8 text-xs text-[#705954]">
              <div>
                <strong className="text-[#3B2925] font-semibold block text-sm">Bahan Pilihan</strong>
                Kualitas Terjamin
              </div>
              <span className="text-[#EADFD9] hidden sm:inline">|</span>
              <div>
                <strong className="text-[#3B2925] font-semibold block text-sm">Dibuat Sesuai Pesanan</strong>
                Segar Setiap Hari
              </div>
              <span className="text-[#EADFD9] hidden sm:inline">|</span>
              <div>
                <strong className="text-[#3B2925] font-semibold block text-sm">Pengantaran Aman</strong>
                Sampai ke Alamat Tujuan
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-[#FAF0E6] aspect-[4/3] lg:aspect-square group">
              <img
                src={products[0].image}
                alt="Kue Tart Raspberry Pistachio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#EADFD9]/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#C62828] uppercase tracking-wider block">
                    Kue Tart Pilihan
                  </span>
                  <span className="font-serif font-semibold text-[#3B2925] text-base">
                    {products[0].name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedProduct(products[0]);
                    setCurrentView('detail-produk');
                  }}
                  className="text-xs font-semibold text-[#C62828] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Lihat Detail</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. KATEGORI KUE */}
      <section className="py-16 bg-[#FFF5E9]/50 border-y border-[#EADFD9]/60 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#C62828] uppercase tracking-wider block mb-1">
                Kategori Kue
              </span>
              <h2 className="font-serif text-3xl font-semibold text-[#3B2925] tracking-tight">
                Pilihan Kategori Sesuai Kebutuhan
              </h2>
            </div>
            <button
              onClick={() => setCurrentView('katalog-kue')}
              className="text-sm font-semibold text-[#C62828] hover:text-[#3B2925] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Semua Kategori</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentView('katalog-kue')}
                className="text-left group bg-white rounded-2xl overflow-hidden border border-[#EADFD9]/80 p-3 hover:shadow-lg transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#FAF0E6] mb-3">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-sm font-semibold text-[#3B2925] group-hover:text-[#C62828] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-[11px] text-[#705954] mt-1 leading-snug">
                  {cat.desc}
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PRODUK UNGGULAN: Pilihan Kue Favorit */}
      <section className="py-8 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#C62828] uppercase tracking-wider block mb-1">
              Favorit Pelanggan
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#3B2925] tracking-tight">
              Pilihan Kue Favorit
            </h2>
            <p className="text-xs sm:text-sm text-[#705954] mt-1">
              Temukan kue yang cocok untuk momen spesialmu.
            </p>
          </div>
          <button
            onClick={() => setCurrentView('katalog-kue')}
            className="text-sm font-semibold text-[#C62828] hover:text-[#3B2925] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Katalog Kue</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCakes.map(cake => (
            <div
              key={cake.id}
              className="bg-white rounded-2xl border border-[#EADFD9] overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
            >
              <div className="relative aspect-[4/3] bg-[#FAF0E6] overflow-hidden">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-[#C62828] text-[10px] font-bold px-2.5 py-1 rounded-full border border-[#EADFD9]/60 shadow-xs">
                  {cake.leadTime}
                </span>
                {cake.badge && (
                  <span className="absolute top-3 right-3 bg-[#C62828] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {cake.badge}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#3B2925] group-hover:text-[#C62828] transition-colors line-clamp-1">
                    {cake.name}
                  </h3>
                  <p className="text-xs text-[#705954] mt-2 line-clamp-2 leading-relaxed">
                    {cake.shortDesc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EADFD9]/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#705954] block">Harga mulai</span>
                    <span className="font-bold text-[#3B2925] text-base">{cake.formattedPrice}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setSelectedProduct(cake);
                        setCurrentView('detail-produk');
                      }}
                      className="inline-flex items-center justify-center bg-[#FFF5E9] hover:bg-[#C62828] text-[#C62828] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
                    >
                      Lihat Detail
                    </button>
                    <button
                      onClick={() => {
                        setSelectedProduct(cake);
                        setCurrentView('detail-produk');
                      }}
                      className="inline-flex items-center justify-center bg-[#C62828] hover:bg-[#9B1B1B] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                    >
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. BAGIAN KEUNGGULAN SWEET BAKERY */}
      <section className="bg-[#FAF0E6] py-16 lg:py-20 px-6 lg:px-12 border-y border-[#EADFD9]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#C62828] uppercase tracking-wider block">
              Keunggulan Kami
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#3B2925] tracking-tight">
              Kualitas Rasa dan Pelayanan Terpercaya
            </h2>
            <p className="text-xs sm:text-sm text-[#705954] leading-relaxed">
              Kami berkomitmen menyajikan kue yang lezat dan rapi untuk menyempurnakan setiap momen berharga Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EADFD9] space-y-3">
              <span className="w-12 h-12 rounded-xl bg-[#FFF5E9] text-[#C62828] flex items-center justify-center font-bold text-xl">
                🧁
              </span>
              <h3 className="font-serif font-bold text-base text-[#3B2925]">Bahan Pilihan Berkualitas</h3>
              <p className="text-xs text-[#705954] leading-relaxed">
                Menggunakan bahan baku terpilih untuk menghasilkan rasa yang nikmat dan tekstur yang lembut.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EADFD9] space-y-3">
              <span className="w-12 h-12 rounded-xl bg-[#FFF5E9] text-[#C62828] flex items-center justify-center font-bold text-xl">
                👨‍🍳
              </span>
              <h3 className="font-serif font-bold text-base text-[#3B2925]">Dibuat Berdasarkan Pesanan</h3>
              <p className="text-xs text-[#705954] leading-relaxed">
                Setiap kue dibuat segar sesuai jadwal pesanan pelanggan sehingga kualitas rasa tetap terjaga.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EADFD9] space-y-3">
              <span className="w-12 h-12 rounded-xl bg-[#FFF5E9] text-[#C62828] flex items-center justify-center font-bold text-xl">
                📏
              </span>
              <h3 className="font-serif font-bold text-base text-[#3B2925]">Pilihan Desain dan Ukuran</h3>
              <p className="text-xs text-[#705954] leading-relaxed">
                Tersedia berbagai pilihan diameter dan model yang bisa disesuaikan dengan kebutuhan acaramu.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EADFD9] space-y-3">
              <span className="w-12 h-12 rounded-xl bg-[#FFF5E9] text-[#C62828] flex items-center justify-center font-bold text-xl">
                🎉
              </span>
              <h3 className="font-serif font-bold text-base text-[#3B2925]">Bisa untuk Berbagai Acara</h3>
              <p className="text-xs text-[#705954] leading-relaxed">
                Cocok untuk ulang tahun, syukuran, pernikahan, hantaran, dan kegiatan bersama keluarga.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BAGIAN KUE CUSTOM */}
      <section className="px-6 lg:px-12 max-w-7xl mx-auto pb-8">
        <div className="bg-[#FFF5E9] rounded-3xl border border-[#EADFD9] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <span className="text-xs font-semibold text-[#C62828] uppercase tracking-wider block">
              Pesanan Khusus
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#3B2925]">
              Punya Desain Kue Sendiri?
            </h2>
            <p className="text-xs sm:text-sm text-[#705954] leading-relaxed">
              Kirim ide atau referensi desainmu. Kami bantu menyesuaikan kue dengan kebutuhan acara.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/6281234567890?text=Halo%20Sweet%20Bakery,%20saya%20punya%20referensi%20desain%20kue%20sendiri%20dan%20ingin%20berkonsultasi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
              <span>Hubungi Kami via WhatsApp</span>
            </a>
            <button
              onClick={() => setCurrentView('formulir-pre-order')}
              className="inline-flex items-center gap-2 bg-[#C62828] hover:bg-[#9B1B1B] text-white font-semibold text-sm px-6 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Formulir Pemesanan</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
