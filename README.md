# Sweet Bakery - Artisan & Custom Cake Atelier

A modern, responsive React & TypeScript web application for **Sweet Bakery**, an artisan patisserie atelier based in Senopati, Jakarta Selatan. The application provides an end-to-end customer pre-order journey with down-payment (DP 50%) reservation, cold-storage courier tracking, and comprehensive administrative kitchen operations.

## ✨ Key Features Ported

### Customer Storefront
1. **Beranda (Home)**:
   - Editorial showcase featuring signature artisan cakes, French AOP butter storytelling, and limited daily oven slot philosophy.
   - Categorized collections: Birthday & Celebration, Wedding & Tier Cake, Tart & Dessert Box, Cookies & Hampers.
   - Curated chef highlights with interactive direct ordering and WhatsApp consultation integration.

2. **Katalog Kue & Pâtisserie**:
   - 8 artisan cakes and pastries with authentic photography, detailed flavor profiles, and allergen/dietary filters.
   - Dynamic sorting by popularity, price, and lead-time.
   - Instant search by cake name and ingredients.

3. **Detail Produk Cake**:
   - Interactive cake customizer with multiple diameter options (16cm, 18cm, 20cm, 24cm) and real-time price calculation.
   - Free chocolate plaque inscription piping with character counter.
   - Birthday candle selection and handwritten greeting card message customization.
   - Fresh ingredients breakdown and chef storage instructions (4°C chiller advice).

4. **Formulir Pre-Order & Keranjang**:
   - Order reservation form with customer information, delivery scheduling (min. H-2), and time slot selection.
   - Delivery method selection: Kurir Khusus Mobil Berpendingin (+Rp 60.000) or Self Pick-Up at Senopati Atelier (Free).
   - Payment scheme selection: Down Payment (DP 50%) or Full Payment (100%).

5. **Pembayaran DP & Konfirmasi**:
   - Slot reservation countdown timer.
   - Multi-channel payment options: BCA Virtual Account, Mandiri Virtual Account, and Instant QRIS Dinamis.
   - One-click copy for VA numbers and payment confirmation simulator.
   - WhatsApp direct confirmation link.

6. **Status Pelacakan Pesanan (Live Tracking)**:
   - Searchable order tracking by Order ID (#SB-2026-XXXX) or phone number.
   - 5-stage visual progress timeline:
     1. Pesanan Diterima & DP Terverifikasi
     2. Alokasi Bahan & Pemanggangan Base di Oven
     3. Decorating & Foto Hasil Kue untuk Pelunasan
     4. Pengantaran Armada Mobil Dingin
     5. Tiba di Lokasi & Selesai
   - Cold storage courier vehicle details and invoice printing.

### Admin Atelier Kitchen
7. **Dashboard & KPI Admin**:
   - Executive operational metrics: Weekly pre-order volume, revenue calculation, today's oven capacity (91%), and pending verification queue.
   - Urgent action alerts and today's baking batch preview.
   - Real-time recent pre-orders table.

8. **Kalender Produksi Oven Dapur**:
   - Daily oven slot capacity indicators (max 24 cakes/day) across the weekly schedule with visual capacity percentage meters.
   - Production batch schedules (Morning, Afternoon, Evening) grouped by temperature and cake category.
   - Interactive batch progress toggles and baking sheet printing.

9. **Manajemen Pesanan Pre-Order**:
   - Full order management with status filters: Semua, Menunggu DP, Dalam Oven, Siap Kirim, Selesai.
   - Status update controls and comprehensive order detail drawer.
   - One-click WhatsApp communication with customers.

10. **Verifikasi Pembayaran Uang Muka (DP)**:
    - Financial verification desk for reviewing transfer slips and bank statements.
    - One-click approval that locks oven slots and updates customer tracking timeline.
    - Rejection handling with custom feedback notes.

11. **Floating Screen Switcher**:
    - Floating navigation widget ("Jelajahi Halaman (10)") allowing instant switching between all 10 customer and kitchen administrative screens.

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 8 (running on port 3000, host `0.0.0.0`)
- **Styling**: Tailwind CSS v4 with custom warm artisanal culinary palette
- **Typography**: Playfair Display (Serif) & Plus Jakarta Sans
- **State Management**: React Context (`AppContext`) with persistent in-memory state

## 🚀 Development & Build
```bash
# Start development server
npm run dev

# Compile and build for production
npm run build

# Run TypeScript linter
npm run lint
```
