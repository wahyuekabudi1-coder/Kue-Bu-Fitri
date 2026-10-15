import { Product, Order, OvenBatch, PaymentVerification, OvenSlotDay } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    slug: 'raspberry-pistachio',
    name: 'Kue Tart Raspberry Pistachio',
    category: 'birthday',
    categoryLabel: 'Kue Ulang Tahun',
    price: 385000,
    formattedPrice: 'Rp 385.000',
    leadTime: 'Pesan Min. H-2',
    shortDesc: 'Kue tart lembut dengan selai raspberry segar dan sentuhan rasa kacang pistachio gurih.',
    fullDesc: 'Dibuat dengan bahan pilihan berkualitas. Perpaduan bolu lembut, selai raspberry asli yang segar, dan krim pistachio gurih yang pas di lidah. Dibuat dengan perhatian pada rasa dan tampilan untuk ulang tahun dan acara spesial.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX7fAc8ouzU3bsZdt5QKqKO6e8yKYt469NcG3sfJ5ynvsm9Ftv5Rjqj9t24wozcEJ1su0wLlgzRU4sFDmc7aVlyW5DekqWbB-jpT8qR2FSBBGrM6FSs6U3gOmx8ONz8nPvvqytPB7g3JRV0Mp0FPtmHaq8-TdMToOEd6NKwutYTQo1-iLbomavTRAAn9nbVthuQGZ609toLRxiN6f0HaPIkoeOis85q0AL8LLhfpinNcI_YjGzV60',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCX7fAc8ouzU3bsZdt5QKqKO6e8yKYt469NcG3sfJ5ynvsm9Ftv5Rjqj9t24wozcEJ1su0wLlgzRU4sFDmc7aVlyW5DekqWbB-jpT8qR2FSBBGrM6FSs6U3gOmx8ONz8nPvvqytPB7g3JRV0Mp0FPtmHaq8-TdMToOEd6NKwutYTQo1-iLbomavTRAAn9nbVthuQGZ609toLRxiN6f0HaPIkoeOis85q0AL8LLhfpinNcI_YjGzV60',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAPTTUiNi6yCatzmP8quhQjWW4qoYzCw438bRREQoI0BIdc3SVZMjw7HXjHbX0S8RKAUcXIjtP7L_MWckvBJA2JFU-xXlHPnfqYBBlBOKYFDvn42AOdA8_tLYGjEQZaddkLhnu8rrMFFb-lltVLuEBGgy9uzgF1RkPIoP_G1TKXomX16tIJZRDYrMQ1VwcJ7JIfoLXorqZsn2jx_y8GD0Xcqj_gTnDSQaQWfX29ukF0NX5xtSla55k',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2NXlYpV_zlpJWRXsPj5rAJqDC0iK17TpyOyAiT1361ioW7a5IQ6C54-n3x5OBChXOJ1WdeimZVtMQKr4WDic8GzLyLLQxC8BrTTyezlDaSAkj4IVnVbwz757WjRkoYCfCk4H-Punkbte8TVj8ax4-kgT40tvkhrrjhhctEq7LGJj7G6NiyEdyBTJz4HDkJmU4i43eahuvSkSON8JgJOAddW96uHXLyy_LZ1aU2fKIrKO4vnFOLn4'
    ],
    badge: 'Favorit',
    diameterOptions: [
      { size: 'Diameter 16 cm', servings: '4 - 6 Porsi', price: 385000, formattedPrice: 'Rp 385.000' },
      { size: 'Diameter 18 cm', servings: '6 - 8 Porsi', price: 465000, formattedPrice: 'Rp 465.000' },
      { size: 'Diameter 20 cm', servings: '8 - 12 Porsi', price: 580000, formattedPrice: 'Rp 580.000' },
      { size: 'Diameter 24 cm', servings: '12 - 18 Porsi', price: 750000, formattedPrice: 'Rp 750.000' }
    ],
    flavorProfile: ['Krim Pistachio Gurih', 'Selai Raspberry Segar', 'Bolu Lembut', 'Manis Pas'],
    ingredients: ['Tepung terigu pilihan', 'Telur segar', 'Mentega pilihan', 'Kacang pistachio', 'Selai raspberry asli', 'Susu sapi segar'],
    storageAdvice: 'Simpan di dalam lemari pendingin (kulkas). Sebaiknya dinikmati dalam 3 hari setelah diterima.'
  },
  {
    id: 'prod-2',
    slug: 'kue-tart-cokelat-lembut',
    name: 'Kue Tart Cokelat Lembut',
    category: 'tart',
    categoryLabel: 'Kue Tart',
    price: 345000,
    formattedPrice: 'Rp 345.000',
    leadTime: 'Pesan Min. H-2',
    shortDesc: 'Kue tart dengan lapisan cokelat lembut dan renyah, nikmat dan tidak terlalu manis.',
    fullDesc: 'Kue tart dengan cokelat berkualitas dan tekstur krim yang lembut. Dibuat dengan perhatian pada rasa dan tampilan untuk memanjakan pecinta cokelat pada berbagai acara keluarga dan sahabat.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa8LTfZ34RoO438MF-EHf8dbTSe2ookM_7VK8XdkIfmIK2lyMw-vNizygkssQ-Ls6Thhb26AVcC4b1HHeW1kFpDyA3Oro_qz2yJXLg5l6kA9HgeU5y04YcbMNVscjuaRo2FUo-edJX7DAcbTlYcY20_o_4Lf-_-BaIKOMnszglSv2f295M3U5Qv8G2hJjClMGulAe4b8JIb8pp6jVowXiBjmwcQaGurUgB_dMC2eaxFgeF9KCXelQ',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDa8LTfZ34RoO438MF-EHf8dbTSe2ookM_7VK8XdkIfmIK2lyMw-vNizygkssQ-Ls6Thhb26AVcC4b1HHeW1kFpDyA3Oro_qz2yJXLg5l6kA9HgeU5y04YcbMNVscjuaRo2FUo-edJX7DAcbTlYcY20_o_4Lf-_-BaIKOMnszglSv2f295M3U5Qv8G2hJjClMGulAe4b8JIb8pp6jVowXiBjmwcQaGurUgB_dMC2eaxFgeF9KCXelQ'
    ],
    badge: 'Favorit',
    diameterOptions: [
      { size: 'Diameter 16 cm', servings: '4 - 6 Porsi', price: 345000, formattedPrice: 'Rp 345.000' },
      { size: 'Diameter 18 cm', servings: '6 - 8 Porsi', price: 425000, formattedPrice: 'Rp 425.000' },
      { size: 'Diameter 20 cm', servings: '8 - 12 Porsi', price: 540000, formattedPrice: 'Rp 540.000' }
    ],
    flavorProfile: ['Cokelat Kaya Rasa', 'Tekstur Lembut', 'Lapisan Renyah'],
    ingredients: ['Cokelat bubuk dan leleh pilihan', 'Tepung terigu', 'Mentega pilihan', 'Telur segar', 'Krim susu'],
    storageAdvice: 'Simpan dingin di kulkas agar tekstur cokelat tetap lembut dan kokoh.'
  },
  {
    id: 'prod-3',
    slug: 'chiffon-cake-earl-grey',
    name: 'Chiffon Cake Earl Grey & Berry',
    category: 'birthday',
    categoryLabel: 'Kue Ulang Tahun',
    price: 295000,
    formattedPrice: 'Rp 295.000',
    leadTime: 'Pesan Min. H-2',
    shortDesc: 'Kue chiffon bertekstur lembut dan ringan dengan aroma teh wangi serta buah segar.',
    fullDesc: 'Bolu chiffon dengan tekstur selembut kapas, dipadukan dengan aroma teh yang menenangkan dan hiasan buah segar pilihan. Sangat pas untuk teman minum teh atau perayaan ulang tahun.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2NXlYpV_zlpJWRXsPj5rAJqDC0iK17TpyOyAiT1361ioW7a5IQ6C54-n3x5OBChXOJ1WdeimZVtMQKr4WDic8GzLyLLQxC8BrTTyezlDaSAkj4IVnVbwz757WjRkoYCfCk4H-Punkbte8TVj8ax4-kgT40tvkhrrjhhctEq7LGJj7G6NiyEdyBTJz4HDkJmU4i43eahuvSkSON8JgJOAddW96uHXLyy_LZ1aU2fKIrKO4vnFOLn4',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC2NXlYpV_zlpJWRXsPj5rAJqDC0iK17TpyOyAiT1361ioW7a5IQ6C54-n3x5OBChXOJ1WdeimZVtMQKr4WDic8GzLyLLQxC8BrTTyezlDaSAkj4IVnVbwz757WjRkoYCfCk4H-Punkbte8TVj8ax4-kgT40tvkhrrjhhctEq7LGJj7G6NiyEdyBTJz4HDkJmU4i43eahuvSkSON8JgJOAddW96uHXLyy_LZ1aU2fKIrKO4vnFOLn4'
    ],
    diameterOptions: [
      { size: 'Diameter 18 cm', servings: '6 - 8 Porsi', price: 295000, formattedPrice: 'Rp 295.000' },
      { size: 'Diameter 20 cm', servings: '8 - 10 Porsi', price: 365000, formattedPrice: 'Rp 365.000' }
    ],
    flavorProfile: ['Aroma Teh Harum', 'Sponge Ringan', 'Buah Segar Pilihan'],
    ingredients: ['Ekstrak daun teh pilihan', 'Telur ayam segar', 'Tepung terigu halus', 'Gula pasir', 'Potongan buah segar'],
    storageAdvice: 'Simpan di kulkas dan nikmati dalam keadaan sejuk.'
  },
  {
    id: 'prod-4',
    slug: 'cheesecake-panggang',
    name: 'Cheesecake Panggang Lembut',
    category: 'tart',
    categoryLabel: 'Kue Tart',
    price: 320000,
    formattedPrice: 'Rp 320.000',
    leadTime: 'Pesan Min. H-2',
    shortDesc: 'Kue keju panggang dengan bagian tengah yang lumer dan aroma karamel yang menggugah selera.',
    fullDesc: 'Dibuat dari keju krim berkualitas dengan teknik pemanggangan pas sehingga bagian luar berwarna kecokelatan sedap dan bagian dalam tetap lembut lumer.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlwUOW2SNw8uuvDyaTuBE1eWtA7iErvJG8YnY1pVLdYeFd1CM7hTE3KPpvWcPqrDJiw0XEQpTP-aaoexdKV9cr1AR4ODhZ5rbHXYUoRyZBHxzXnmrCkSPr-smns2Wtf4LrO7DnV_JihXsSKTs5yol2K9mhVxBXLCCQ1g5TPWxAffaJRyAu4fxSypci6y5x3efxUclowd2YMEzFPd-ZH1ZGrL4nd02iiK0Py5ZXmDz1JGzURPlLRac',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlwUOW2SNw8uuvDyaTuBE1eWtA7iErvJG8YnY1pVLdYeFd1CM7hTE3KPpvWcPqrDJiw0XEQpTP-aaoexdKV9cr1AR4ODhZ5rbHXYUoRyZBHxzXnmrCkSPr-smns2Wtf4LrO7DnV_JihXsSKTs5yol2K9mhVxBXLCCQ1g5TPWxAffaJRyAu4fxSypci6y5x3efxUclowd2YMEzFPd-ZH1ZGrL4nd02iiK0Py5ZXmDz1JGzURPlLRac'
    ],
    badge: 'Pilihan Spesial',
    diameterOptions: [
      { size: 'Diameter 16 cm', servings: '4 - 6 Porsi', price: 320000, formattedPrice: 'Rp 320.000' },
      { size: 'Diameter 18 cm', servings: '6 - 8 Porsi', price: 395000, formattedPrice: 'Rp 395.000' },
      { size: 'Diameter 20 cm', servings: '8 - 12 Porsi', price: 495000, formattedPrice: 'Rp 495.000' }
    ],
    flavorProfile: ['Keju Gurih Lembut', 'Aroma Panggang Wangi', 'Tekstur Lumer'],
    ingredients: ['Krim keju pilihan', 'Krim susu murni', 'Kuning telur segar', 'Gula tebu pilihan'],
    storageAdvice: 'Simpan di lemari pendingin. Bisa didiamkan 10 menit di suhu ruang sebelum disajikan agar lebih lumer.'
  },
  {
    id: 'prod-5',
    slug: 'strawberry-shortcake',
    name: 'Strawberry Shortcake Klasik',
    category: 'birthday',
    categoryLabel: 'Kue Ulang Tahun',
    price: 360000,
    formattedPrice: 'Rp 360.000',
    leadTime: 'Pesan Min. H-2',
    shortDesc: 'Kue ulang tahun dengan bolu vanila lembut, krim susu segar, dan stroberi manis.',
    fullDesc: 'Kue klasik favorit keluarga dengan bolu vanila lembut, lapisan krim susu yang ringan, dan potongan stroberi segar. Pilihan tepat untuk ulang tahun anak dan momen keluarga.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN_akFcojK1QFDACgixVBY7lbGblKtQUQk5yMTroSPQzMsARfFGp-Pf5G601fhecM54ckBlTZAVEIelSgJRUZ9JMKZz0uBWH5pde57QwPZaoVG_9tjDlwvwLtx1YsjFfzKrDCtasjOdNldRVWpTodvvV7lpUc6HLGzRgiI1Y70M-64dAyZk2Ng5XQX2sI__30WCUaG8RNV_5-yCrR8-99jv5oyTRZmMPEi7Yan7cpcB8B2KJhYGXs',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCN_akFcojK1QFDACgixVBY7lbGblKtQUQk5yMTroSPQzMsARfFGp-Pf5G601fhecM54ckBlTZAVEIelSgJRUZ9JMKZz0uBWH5pde57QwPZaoVG_9tjDlwvwLtx1YsjFfzKrDCtasjOdNldRVWpTodvvV7lpUc6HLGzRgiI1Y70M-64dAyZk2Ng5XQX2sI__30WCUaG8RNV_5-yCrR8-99jv5oyTRZmMPEi7Yan7cpcB8B2KJhYGXs'
    ],
    diameterOptions: [
      { size: 'Diameter 16 cm', servings: '4 - 6 Porsi', price: 360000, formattedPrice: 'Rp 360.000' },
      { size: 'Diameter 18 cm', servings: '6 - 8 Porsi', price: 440000, formattedPrice: 'Rp 440.000' },
      { size: 'Diameter 20 cm', servings: '8 - 12 Porsi', price: 550000, formattedPrice: 'Rp 550.000' }
    ],
    flavorProfile: ['Vanila Harum', 'Stroberi Segar', 'Krim Susu Ringan'],
    ingredients: ['Stroberi segar pilihan', 'Krim susu segar', 'Tepung terigu berkualitas', 'Telur segar', 'Gula tebu'],
    storageAdvice: 'Simpan selalu di lemari pendingin dan segera dinikmati selagi segar.'
  },
  {
    id: 'prod-6',
    slug: 'kue-pernikahan-bertingkat',
    name: 'Kue Pernikahan Bertingkat',
    category: 'wedding',
    categoryLabel: 'Kue Pernikahan',
    price: 1250000,
    formattedPrice: 'Rp 1.250.000',
    leadTime: 'Pesan Min. H-5',
    shortDesc: 'Kue pernikahan dengan desain yang bisa disesuaikan dengan tema acara.',
    fullDesc: 'Dirancang khusus untuk melengkapi hari bahagiamu. Menggunakan konstruksi kokoh, pilihan rasa lezat, dan dekorasi rapi yang bisa disesuaikan dengan konsep dan warna pernikahanmu.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jvewi97GfOf_FvrcJCT2_nXn2fBpiVCzPfu8zAXONLlmIYAju9q5wvv9CYbmdHWjOkqgpmnrNeLIxZsJFQnOaVTCmwXbZqsN4T2wWwbCI-duc4wjn2i18ol_6x3Z5qaYCvGy0ZJMr-J5PSuqB7yDHJgVkZkFTP9BVpW3PC5crcN5bXhkJMRPwtS0Xp-QXmkLO-yzdXfyPn5ekr8fslRhf2yj7fM3mZreSr5UzZGfbpSlqlzCPow',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD5jvewi97GfOf_FvrcJCT2_nXn2fBpiVCzPfu8zAXONLlmIYAju9q5wvv9CYbmdHWjOkqgpmnrNeLIxZsJFQnOaVTCmwXbZqsN4T2wWwbCI-duc4wjn2i18ol_6x3Z5qaYCvGy0ZJMr-J5PSuqB7yDHJgVkZkFTP9BVpW3PC5crcN5bXhkJMRPwtS0Xp-QXmkLO-yzdXfyPn5ekr8fslRhf2yj7fM3mZreSr5UzZGfbpSlqlzCPow'
    ],
    badge: 'Bisa Custom',
    diameterOptions: [
      { size: '2 Tingkat (16+20 cm)', servings: '25 - 35 Porsi', price: 1250000, formattedPrice: 'Rp 1.250.000' },
      { size: '3 Tingkat (16+20+24 cm)', servings: '50 - 75 Porsi', price: 2450000, formattedPrice: 'Rp 2.450.000' }
    ],
    flavorProfile: ['Pilihan Cokelat / Vanila', 'Krim Halus', 'Dekorasi Rapi'],
    ingredients: ['Bahan kue pilihan', 'Krim dekorasi berkualitas', 'Hiasan aman pangan', 'Alas kue kokoh'],
    storageAdvice: 'Diantar langsung oleh tim kami dengan penanganan hati-hati sampai ke lokasi acara.'
  },
  {
    id: 'prod-7',
    slug: 'brownies-cokelat-panggang',
    name: 'Brownies Cokelat Panggang',
    category: 'brownies',
    categoryLabel: 'Brownies',
    price: 185000,
    formattedPrice: 'Rp 185.000',
    leadTime: 'Pesan Min. H-1',
    shortDesc: 'Brownies dengan rasa cokelat yang nikmat, cocok untuk camilan atau hadiah.',
    fullDesc: 'Brownies panggang dengan bagian dalam yang legit dan permukaan renyah. Dibuat dengan cokelat pilihan dan mentega berkualitas untuk rasa yang mantap.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCY1At4pzQxYXof361fgFzhWqvqmEMP7xg-fyLegtCreJ6WXnl8PP5tc5cCLC_bQ_ciFjpCkVzI5qLqiINnWSeShqpRTQAczd4JbyvEP1tJGKIszNrr6cIynwNOg8H9lu1ZB3DUEbRVQ7LBT0UXk1Vusf95boU9Xd7jU5HLAf0S2jp9oZ88AkkqqB2F8VR5-tAgbE-4dSTFI5yAso1X6ZUJT1iyQqBGe03mCKA7ynDN6zXdaC-4AH4',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCY1At4pzQxYXof361fgFzhWqvqmEMP7xg-fyLegtCreJ6WXnl8PP5tc5cCLC_bQ_ciFjpCkVzI5qLqiINnWSeShqpRTQAczd4JbyvEP1tJGKIszNrr6cIynwNOg8H9lu1ZB3DUEbRVQ7LBT0UXk1Vusf95boU9Xd7jU5HLAf0S2jp9oZ88AkkqqB2F8VR5-tAgbE-4dSTFI5yAso1X6ZUJT1iyQqBGe03mCKA7ynDN6zXdaC-4AH4'
    ],
    badge: 'Favorit',
    diameterOptions: [
      { size: 'Kotak 20x20 cm (16 Potong)', servings: '4 - 8 Orang', price: 185000, formattedPrice: 'Rp 185.000' }
    ],
    flavorProfile: ['Cokelat Legit', 'Permukaan Renyah', 'Manis Gurih Pas'],
    ingredients: ['Cokelat pilihan', 'Mentega berkualitas', 'Telur segar', 'Tepung terigu', 'Gula'],
    storageAdvice: 'Simpan di wadah tertutup pada suhu ruang hingga 5 hari atau di kulkas hingga 10 hari.'
  },
  {
    id: 'prod-8',
    slug: 'kukis-cokelat-hantaran',
    name: 'Kukis Cokelat & Aneka Hantaran',
    category: 'hampers',
    categoryLabel: 'Hampers dan Hantaran',
    price: 165000,
    formattedPrice: 'Rp 165.000',
    leadTime: 'Pesan Min. H-1',
    shortDesc: 'Pilihan kue untuk hantaran dan bingkisan bagi keluarga maupun orang tersayang.',
    fullDesc: 'Kukis renyah dengan lelehan cokelat di dalamnya, dikemas dalam kaleng cantik. Sangat cocok untuk bingkisan hari raya, tanda terima kasih, dan oleh-oleh istimewa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0BR_RLROjcKJsKQeLlW3FCehomN58Ef-GYW9BTXHFql6bOPCOJA8ySFr2oCL0J1rCUDYr883PU-fpP5bRrdfgMXq-LXub6i_MUpbc_mNYA7krMC419i5f5wrGhdkzV7KJuUNQTUPdsW3gkpSpcIwSYFNRkJ8KC2qVvJSAokE24UQDRtIVRzGyN8n_kQt4V3f8bP04kqvR8eNj8PC_xPkoZaSmO3TkfUeRf0-c0fDB99fHtW2jzDE',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA0BR_RLROjcKJsKQeLlW3FCehomN58Ef-GYW9BTXHFql6bOPCOJA8ySFr2oCL0J1rCUDYr883PU-fpP5bRrdfgMXq-LXub6i_MUpbc_mNYA7krMC419i5f5wrGhdkzV7KJuUNQTUPdsW3gkpSpcIwSYFNRkJ8KC2qVvJSAokE24UQDRtIVRzGyN8n_kQt4V3f8bP04kqvR8eNj8PC_xPkoZaSmO3TkfUeRf0-c0fDB99fHtW2jzDE'
    ],
    diameterOptions: [
      { size: 'Kaleng Bingkisan (Isi 6 Kukis Besar)', servings: 'Isi 6 Pcs', price: 165000, formattedPrice: 'Rp 165.000' }
    ],
    flavorProfile: ['Cokelat Nikmat', 'Renyah Bermentega', 'Aroma Wangi'],
    ingredients: ['Cokelat pilihan', 'Mentega pilihan', 'Tepung terigu', 'Gula tebu', 'Sedikit garam'],
    storageAdvice: 'Simpan rapat di dalam wadah kedap udara agar tetap renyah.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#SB-2026-8942',
    customerName: 'Nadia Larasati',
    customerPhone: '0812-9876-5432',
    customerEmail: 'nadia.larasati@gmail.com',
    deliveryMethod: 'courier',
    deliveryAddress: 'Jl. Senopati Dalam No. 18, Kebayoran Baru, Jakarta Selatan',
    deliveryDate: '18 Okt 2026',
    timeSlot: '13:00 – 16:00 WIB',
    notes: 'Kue tolong ditaruh di tempat yang sejuk jika saya belum sampai.',
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        productName: 'Kue Tart Raspberry Pistachio',
        productImage: INITIAL_PRODUCTS[0].image,
        size: 'Diameter 16 cm (4-6 Porsi)',
        unitPrice: 385000,
        quantity: 1,
        customMessage: 'Selamat Ulang Tahun Nadia! ✨',
        candleOption: 'Lilin Spiral Gold (2 pcs)',
        greetingCard: 'Semoga selalu sehat, bahagia, dan sukses selalu.',
        totalPrice: 385000
      }
    ],
    subtotal: 385000,
    deliveryFee: 60000,
    total: 445000,
    paymentOption: 'dp_50',
    dpAmount: 227500,
    remainingAmount: 217500,
    paymentStatus: 'pending_dp',
    orderStatus: 'pending_verification',
    paymentMethod: 'BCA Virtual Account (8801 2026 8942 01)',
    createdAt: '15 Okt 2026, 11:15 WIB',
    timeline: [
      { title: 'Pesanan Diterima', desc: 'Pesanan berhasil dikirim dan menunggu konfirmasi.', time: '15 Okt, 11:15 WIB', done: true },
      { title: 'Bukti Pembayaran Sedang Diperiksa', desc: 'Bukti transfer sedang diperiksa oleh tim admin toko.', time: '15 Okt, 11:30 WIB', done: true, current: true },
      { title: 'Jadwal Pembuatan Masuk Dapur', desc: 'Bahan disiapkan oleh tim pembuat kue.', time: 'Estimasi 16 Okt, 08:00 WIB', done: false },
      { title: 'Dekorasi & Pengecekan Kue', desc: 'Kue dihias rapi dan dicek sebelum siap dikirim.', time: 'Estimasi 17 Okt, 14:00 WIB', done: false },
      { title: 'Pengantaran Kue', desc: 'Kue diantar dengan aman ke alamat tujuan.', time: 'Estimasi 18 Okt, 13:00 WIB', done: false }
    ]
  },
  {
    id: '#SB-2026-8940',
    customerName: 'Kevin Chandra',
    customerPhone: '0811-2345-6789',
    customerEmail: 'kevin.chandra@outlook.com',
    deliveryMethod: 'courier',
    deliveryAddress: 'Ballroom Hotel, SCBD, Jakarta Selatan',
    deliveryDate: '20 Okt 2026',
    timeSlot: '10:00 – 13:00 WIB',
    notes: 'Hubungi koordinator acara saat sampai di lokasi.',
    items: [
      {
        id: 'item-2',
        productId: 'prod-6',
        productName: 'Kue Pernikahan Bertingkat',
        productImage: INITIAL_PRODUCTS[5].image,
        size: '3 Tingkat (16+20+24 cm)',
        unitPrice: 2450000,
        quantity: 1,
        customMessage: 'Kevin & Stephanie · Bahagia Selamanya',
        candleOption: 'Tanpa Lilin',
        greetingCard: 'Selamat menempuh hidup baru dari keluarga besar.',
        totalPrice: 2450000
      }
    ],
    subtotal: 2450000,
    deliveryFee: 150000,
    total: 2600000,
    paymentOption: 'dp_50',
    dpAmount: 1300000,
    remainingAmount: 1300000,
    paymentStatus: 'dp_paid',
    orderStatus: 'scheduled_oven',
    paymentMethod: 'Transfer Mandiri',
    createdAt: '14 Okt 2026, 14:20 WIB',
    timeline: [
      { title: 'Pesanan Diterima', desc: 'Konsultasi desain kue pernikahan selesai.', time: '14 Okt, 14:20 WIB', done: true },
      { title: 'Pembayaran DP Telah Dikonfirmasi', desc: 'DP sebesar Rp 1.300.000 telah masuk dan jadwal dapur dikunci.', time: '14 Okt, 15:00 WIB', done: true },
      { title: 'Persiapan Bahan & Hiasan', desc: 'Tim menyiapkan bahan dan hiasan kue.', time: '18 Okt, 09:00 WIB', done: false, current: true },
      { title: 'Perakitan & Dekorasi Kue', desc: 'Penyusunan tingkat kue dan sentuhan akhir.', time: '19 Okt, 16:00 WIB', done: false },
      { title: 'Pengantaran ke Lokasi Acara', desc: 'Diantar oleh tim kurir toko langsung ke meja acara.', time: '20 Okt, 10:00 WIB', done: false }
    ]
  },
  {
    id: '#SB-2026-8941',
    customerName: 'Rendy Pratama',
    customerPhone: '0817-6543-2109',
    customerEmail: 'rendy.p@gmail.com',
    deliveryMethod: 'pickup',
    deliveryAddress: 'Ambil Sendiri di Toko: Jl. Senopati No. 42, Jakarta Selatan',
    deliveryDate: '17 Okt 2026',
    timeSlot: '11:00 – 14:00 WIB',
    notes: 'Akan diambil sendiri siang hari.',
    items: [
      {
        id: 'item-3',
        productId: 'prod-3',
        productName: 'Chiffon Cake Earl Grey & Berry',
        productImage: INITIAL_PRODUCTS[2].image,
        size: 'Diameter 18 cm (6-8 Porsi)',
        unitPrice: 295000,
        quantity: 1,
        customMessage: 'Selamat Ulang Tahun Pernikahan Ayah & Ibu',
        candleOption: 'Lilin Angka 25',
        greetingCard: 'Selamat ulang tahun pernikahan ke-25.',
        totalPrice: 295000
      }
    ],
    subtotal: 295000,
    deliveryFee: 0,
    total: 295000,
    paymentOption: 'dp_50',
    dpAmount: 147500,
    remainingAmount: 147500,
    paymentStatus: 'pending_dp',
    orderStatus: 'pending_verification',
    paymentMethod: 'QRIS',
    createdAt: '15 Okt 2026, 10:48 WIB',
    timeline: [
      { title: 'Pesanan Diterima', desc: 'Metode penyerahan ambil sendiri di toko.', time: '15 Okt, 10:48 WIB', done: true },
      { title: 'Bukti Pembayaran Sedang Diperiksa', desc: 'Menunggu konfirmasi penerimaan dana QRIS.', time: '15 Okt, 10:50 WIB', done: true, current: true },
      { title: 'Jadwal Pembuatan di Dapur', desc: 'Proses memanggang kue chiffon.', time: 'Estimasi 16 Okt, 10:00 WIB', done: false },
      { title: 'Siap Diambil di Toko', desc: 'Kue dikemas rapi dan siap diambil pelanggan.', time: 'Estimasi 17 Okt, 11:00 WIB', done: false }
    ]
  },
  {
    id: '#SB-2026-8938',
    customerName: 'Tasya Kamila',
    customerPhone: '0813-1122-3344',
    customerEmail: 'tasya.k@gmail.com',
    deliveryMethod: 'courier',
    deliveryAddress: 'Jl. Bumi No. 12, Mayestik, Kebayoran Baru, Jakarta Selatan',
    deliveryDate: '16 Okt 2026',
    timeSlot: '09:00 – 12:00 WIB',
    notes: 'Mohon dibawa dengan hati-hati.',
    items: [
      {
        id: 'item-4',
        productId: 'prod-5',
        productName: 'Strawberry Shortcake Klasik',
        productImage: INITIAL_PRODUCTS[4].image,
        size: 'Diameter 18 cm (6-8 Porsi)',
        unitPrice: 440000,
        quantity: 1,
        customMessage: 'Selamat Ulang Tahun ke-2 Arrasya!',
        candleOption: 'Lilin Angka 2',
        greetingCard: 'Tumbuh sehat dan ceria selalu ya anak pintar.',
        totalPrice: 440000
      }
    ],
    subtotal: 440000,
    deliveryFee: 60000,
    total: 500000,
    paymentOption: 'full',
    dpAmount: 500000,
    remainingAmount: 0,
    paymentStatus: 'fully_paid',
    orderStatus: 'baking',
    paymentMethod: 'BCA Virtual Account',
    createdAt: '14 Okt 2026, 09:10 WIB',
    timeline: [
      { title: 'Pesanan Diterima & Lunas', desc: 'Pembayaran sebesar Rp 500.000 telah lunas.', time: '14 Okt, 09:12 WIB', done: true },
      { title: 'Jadwal Dapur Terkunci', desc: 'Jadwal pembuatan batch pagi tanggal 15 Okt.', time: '14 Okt, 10:00 WIB', done: true },
      { title: 'Sedang Dipanggang di Dapur', desc: 'Kue sedang dalam proses pemanggangan.', time: '15 Okt, 08:30 WIB', done: true, current: true },
      { title: 'Dekorasi & Buah Segar', desc: 'Penataan buah stroberi segar dan ucapan cokelat.', time: 'Estimasi 15 Okt, 15:00 WIB', done: false },
      { title: 'Pengantaran Kue', desc: 'Siap diantar oleh kurir toko ke alamat pemesan.', time: 'Estimasi 16 Okt, 09:00 WIB', done: false }
    ]
  },
  {
    id: '#SB-2026-8935',
    customerName: 'Dimas Seto',
    customerPhone: '0815-9988-7766',
    customerEmail: 'dimas.seto@gmail.com',
    deliveryMethod: 'courier',
    deliveryAddress: 'Jl. Gandaria Tengah II No. 8, Jakarta Selatan',
    deliveryDate: '15 Okt 2026',
    timeSlot: '14:00 – 17:00 WIB',
    notes: 'Kue kejutan untuk keluarga.',
    items: [
      {
        id: 'item-5',
        productId: 'prod-4',
        productName: 'Cheesecake Panggang Lembut',
        productImage: INITIAL_PRODUCTS[3].image,
        size: 'Diameter 18 cm (6-8 Porsi)',
        unitPrice: 395000,
        quantity: 1,
        customMessage: 'Selamat Hari Jadi Pernikahan ❤️',
        candleOption: 'Lilin Spiral Gold',
        greetingCard: 'Terima kasih atas kebersamaan dan kebahagiaan selama ini.',
        totalPrice: 395000
      }
    ],
    subtotal: 395000,
    deliveryFee: 60000,
    total: 455000,
    paymentOption: 'full',
    dpAmount: 455000,
    remainingAmount: 0,
    paymentStatus: 'fully_paid',
    orderStatus: 'in_delivery',
    paymentMethod: 'QRIS',
    createdAt: '13 Okt 2026, 16:30 WIB',
    timeline: [
      { title: 'Pesanan Diterima & Terkonfirmasi', desc: 'Pembayaran lunas via QRIS.', time: '13 Okt, 16:35 WIB', done: true },
      { title: 'Proses Dapur Selesai', desc: 'Cheesecake selesai dipanggang sempurna.', time: '14 Okt, 14:00 WIB', done: true },
      { title: 'Penyimpanan Dingin & Pengecekan', desc: 'Kue dicek dan siap dikirim.', time: '15 Okt, 09:00 WIB', done: true },
      { title: 'Sedang Diantar Kurir Toko', desc: 'Kurir toko sedang menuju alamat tujuan.', time: '15 Okt, 14:15 WIB', done: true, current: true },
      { title: 'Pesanan Tiba di Lokasi', desc: 'Estimasi tiba pukul 15:30 WIB.', time: 'Estimasi 15 Okt, 15:30 WIB', done: false }
    ]
  }
];

export const INITIAL_OVEN_SLOTS: OvenSlotDay[] = [
  { dayLabel: 'Sen, 12 Okt', dateStr: '12 Okt 2026', bookedSlots: 16, totalSlots: 24, status: 'available' },
  { dayLabel: 'Sel, 13 Okt', dateStr: '13 Okt 2026', bookedSlots: 18, totalSlots: 24, status: 'available' },
  { dayLabel: 'Rab, 14 Okt', dateStr: '14 Okt 2026', bookedSlots: 20, totalSlots: 24, status: 'low' },
  { dayLabel: 'Kam, 15 Okt', dateStr: '15 Okt 2026', bookedSlots: 22, totalSlots: 24, isToday: true, status: 'low' },
  { dayLabel: 'Jum, 16 Okt', dateStr: '16 Okt 2026', bookedSlots: 24, totalSlots: 24, status: 'full' },
  { dayLabel: 'Sab, 17 Okt', dateStr: '17 Okt 2026', bookedSlots: 21, totalSlots: 24, status: 'low' },
  { dayLabel: 'Min, 18 Okt', dateStr: '18 Okt 2026', bookedSlots: 19, totalSlots: 24, status: 'available' }
];

export const INITIAL_OVEN_BATCHES: OvenBatch[] = [
  {
    id: 'batch-1',
    name: 'Jadwal Pagi (07:00 – 10:00 WIB)',
    timeWindow: '07:00 – 10:00 WIB',
    temperature: '160°C - 165°C',
    orderCount: 6,
    status: 'completed',
    description: 'Bolu vanila dan sponge cake tart',
    orders: [
      { orderId: '#SB-2026-8938', cake: 'Strawberry Shortcake Klasik', size: 'Diameter 18 cm', station: 'Oven 1' },
      { orderId: '#SB-2026-8935', cake: 'Cheesecake Panggang Lembut', size: 'Diameter 18 cm', station: 'Oven 2' },
      { orderId: '#SB-2026-8932', cake: 'Kue Tart Cokelat Lembut', size: 'Diameter 20 cm', station: 'Oven 1' }
    ]
  },
  {
    id: 'batch-2',
    name: 'Jadwal Siang (11:00 – 14:00 WIB)',
    timeWindow: '11:00 – 14:00 WIB',
    temperature: '150°C',
    orderCount: 8,
    status: 'in_progress',
    description: 'Chiffon cake dan bolu lembut',
    orders: [
      { orderId: '#SB-2026-8941', cake: 'Chiffon Cake Earl Grey & Berry', size: 'Diameter 18 cm', station: 'Oven 3' },
      { orderId: '#SB-2026-8939', cake: 'Cheesecake Panggang Lembut', size: 'Diameter 16 cm', station: 'Oven 4' }
    ]
  },
  {
    id: 'batch-3',
    name: 'Jadwal Sore (15:00 – 18:00 WIB)',
    timeWindow: '15:00 – 18:00 WIB',
    temperature: '175°C',
    orderCount: 8,
    status: 'scheduled',
    description: 'Brownies panggang dan kukis cokelat',
    orders: [
      { orderId: '#SB-2026-8943', cake: 'Brownies Cokelat Panggang (2 Kotak)', size: '20x20 cm', station: 'Oven 1' },
      { orderId: '#SB-2026-8944', cake: 'Kukis Cokelat Hantaran', size: '6 Kaleng', station: 'Oven 2' }
    ]
  }
];

export const INITIAL_PAYMENT_VERIFICATIONS: PaymentVerification[] = [
  {
    id: 'pv-1',
    orderId: '#SB-2026-8942',
    customerName: 'Nadia Larasati',
    phone: '0812-9876-5432',
    paymentMethod: 'Transfer BCA Virtual Account',
    productName: 'Kue Tart Raspberry Pistachio (Diameter 16 cm)',
    cakeDetails: 'Acara: 18 Okt 2026 · Diantar Kurir Toko',
    eventDate: '18 Okt 2026',
    nominal: 227500,
    formattedNominal: 'Rp 227.500',
    timestamp: '15 Okt 2026, 11:15 WIB',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'pending'
  },
  {
    id: 'pv-2',
    orderId: '#SB-2026-8941',
    customerName: 'Rendy Pratama',
    phone: '0817-6543-2109',
    paymentMethod: 'QRIS',
    productName: 'Chiffon Cake Earl Grey & Berry (Diameter 18 cm)',
    cakeDetails: 'Acara: 17 Okt 2026 · Ambil Sendiri di Toko',
    eventDate: '17 Okt 2026',
    nominal: 147500,
    formattedNominal: 'Rp 147.500',
    timestamp: '15 Okt 2026, 10:48 WIB',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'pending'
  },
  {
    id: 'pv-3',
    orderId: '#SB-2026-8945',
    customerName: 'Clarissa Wijaya',
    phone: '0819-3344-5566',
    paymentMethod: 'Transfer Mandiri',
    productName: 'Kue Tart Cokelat Lembut (Diameter 18 cm)',
    cakeDetails: 'Acara: 19 Okt 2026 · Diantar Kurir Toko',
    eventDate: '19 Okt 2026',
    nominal: 242500,
    formattedNominal: 'Rp 242.500',
    timestamp: '15 Okt 2026, 09:30 WIB',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'pending'
  },
  {
    id: 'pv-4',
    orderId: '#SB-2026-8946',
    customerName: 'Farhan Maulana',
    phone: '0813-7766-5544',
    paymentMethod: 'Transfer BCA Manual',
    productName: 'Brownies Cokelat Panggang (Kotak 20x20 cm)',
    cakeDetails: 'Acara: 17 Okt 2026 · Diantar Kurir Toko',
    eventDate: '17 Okt 2026',
    nominal: 122500,
    formattedNominal: 'Rp 122.500',
    timestamp: '15 Okt 2026, 08:15 WIB',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    status: 'pending'
  }
];
