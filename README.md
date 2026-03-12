# Invoice Manager

Aplikasi manajemen invoice modern dan lengkap yang dibangun dengan Next.js dan React. Aplikasi ini memungkinkan pengguna untuk membuat, melihat, mengelola, dan melacak invoice dengan kalkulasi real time, pelacakan status, dan dasbor keuangan yang komprehensif.

## Table of Contents

- [Features]
- [Getting Started]
- [Usage Guide]
- [Technology Stack]
- [Project Structure]

## Features

- **Dasbor**: Ringkasan komprehensif metrik keuangan termasuk total pendapatan, invoice lunas, invoice tertunda, dan invoice jatuh tempo
- **Manajemen Invoice**: Buat, lihat, dan kelola invoice dengan detail lengkap
- **Kalkulasi Real-time**: Perhitungan otomatis jumlah item baris, subtotal, pajak, dan total
- **Pelacakan Status**: Lacak status invoice (Draf, Tertunda, Lunas, Jatuh Tempo)
- **Grafik Keuangan**: Visualisasi tren pendapatan dan distribusi status invoice
- **Pencarian & Filter**: Cari dan filter invoice dengan mudah berdasarkan nama klien, nomor invoice, email, atau status
- **Paginasi**: Navigasi daftar invoice dengan paginasi bawaan
- **Mode Gelap/Terang**: Beralih antara tema gelap dan terang untuk kenyamanan viewing
- **Desain Responsif**: UI responsif penuh yang dioptimalkan untuk desktop, tablet, dan perangkat seluler

## Getting Started

### Prerequisites

- Node.js 18.0 atau lebih tinggi
- npm, yarn, atau pnpm package manager


### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-project
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Buka browser Anda dan navigasikan ke `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run start
```

## Usage Guide

### Dashboard

Dasbor menyediakan tampilan sekilas metrik bisnis Anda:

• Total Pendapatan: Menampilkan total pendapatan dari semua invoice

• Invoice Lunas: Jumlah invoice yang berhasil ditagih

• Invoice Tertunda: Invoice yang menunggu pembayaran

• Jatuh Tempo: Invoice yang memerlukan tindakan segera

• Tren Pendapatan: Grafik batang yang menunjukkan distribusi pendapatan bulanan

• Status Invoice: Diagram lingkaran yang menunjukkan rincian status invoice

• Invoice Terbaru: Tampilan cepat invoice terbaru Anda dengan tautan ke tampilan detail

### Creating an Invoice

1. Klik tombol "Buat Invoice" dari dasbor atau menu navigasi
2. Isi detail invoice:
   - **Invoice Number**: Pengidentifikasi unik yang dihasilkan otomatis
   - **Client Name**: Nama klien/perusahaan
   - **Email**: Alamat email klien
   - **Issue Date**: Tanggal invoice diterbitkan
   - **Due Date**: Batas waktu pembayaran
   - **Description**: Deskripsi singkat layanan/produk
3. Tambahkan item baris:
   - **Description**: Apa yang ditagihkan
   - **Quantity**: Jumlah unit
   - **Rate**: Biaya per unit
   - Jumlah dihitung secara otomatis (Kuantitas × Tarif)
4. Tambahkan catatan opsional untuk klien
5. Tinjau ringkasan sidebar yang menunjukkan subtotal, pajak (10%), dan total
6. Klik "Buat Invoice" untuk menyimpan

Sistem secara otomatis:
- Menghitung jumlah setiap item baris
- Menghitung subtotal dari semua item baris
- Menerapkan pajak 10%
- Menghitung jumlah total akhir

### Managing Invoices

**Melihat Daftar Invoice**:
1. Pergi ke halaman Invoice dari menu navigasi
2. Gunakan bilah pencarian untuk menemukan invoice berdasarkan nama klien, nomor invoice, atau email
3. Filter berdasarkan status menggunakan dropdown status
4. Klik header kolom untuk mengurutkan berdasarkan klien, tanggal, jumlah, atau status
5. Gunakan paginasi untuk menavigasi halaman

**Melihat Detail Invoice**:
1. Klik tombol "Lihat" pada invoice mana pun di daftar
2. Lihat informasi invoice lengkap termasuk:
   ৹ Detil klien
   ৹ Tanggal invoice
   ৹ Semua item baris dengan jumlah
   ৹ Total keuangan ( subtotal, pajak, total )
   ৹ Status dan Timeline
3.Tandai invoice sebagai lunas menggunakan tombol  "Mark as Paid" button
4. Unduh PDF atau kirim email (fitur tersedia di tampilan detail)

### Invoice Statuses

- **Draft**: Invoice baru yang belum dikirim
- **Pending**:  Invoice yang menunggu pembayaran
- **Paid**: Invoice yang berhasil ditagih
- **Overdue**: Invoice melewati tanggal jatuh tempo yang memerlukan tindakan

## Technology Stack

### Frontend Framework

**Next.js 16.1.6**
 Next.js menyediakan kerangka kerja React modern dengan server-side rendering (SSR) bawaan, static site generation (SSG), dan optimasi kinerja yang sangat baik. Ini adalah standar industri untuk aplikasi React tingkat produksi dengan routing berbasis file, rute API, dan deployment tanpa konfigurasi ke Vercel.

**React 19.2.4**
React adalah pustaka UI paling populer untuk membangun antarmuka pengguna interaktif. Arsitektur berbasis komponen, DOM virtual, dan ekosistem yang luas menjadikannya ideal untuk membangun aplikasi yang kompleks dan kaya fitur dengan rendering yang efisien dan manajemen status.

### Styling

**Tailwind CSS 4.2.0**
Tailwind CSS adalah kerangka kerja CSS berbasis utilitas yang memungkinkan pengembangan UI cepat dengan kelas utilitas yang sudah dibuat. Ini mengurangi ukuran file CSS, meningkatkan konsistensi, dan memungkinkan desain responsif tanpa menulis CSS kustom, sambil mempertahankan kemampuan kustomisasi penuh.

**shadcn/ui Components**
 shadcn/ui menyediakan komponen React berkualitas tinggi, tidak bergaya, dan dapat diakses yang dibangun di atas primitif Radix UI dan diberi gaya dengan Tailwind CSS. Komponen ini mengikuti praktik terbaik untuk aksesibilitas dan memberikan fondasi profesional untuk membangun UI tingkat perusahaan.

**next-themes 0.4.6**
next-themes menangani peralihan tema (mode terang/gelap) dengan penyimpanan bawaan, deteksi preferensi sistem, dan tanpa flash konten yang tidak bergaya. Ini memberikan pengalaman mode gelap yang mulus tanpa implementasi tema kustom.

### Form Management

**React Hook Form 7.54.1**
React Hook Form adalah pustaka formulir yang performan, fleksibel, dan dapat diperluas dengan dukungan validasi yang sangat baik. Ini meminimalkan render ulang, menyediakan API yang intuitif, dan terintegrasi dengan mulus dengan skema validasi.

**Zod 3.24.1**
Zod adalah pustaka validasi skema berbasis TypeScript yang menyediakan validasi aman tipe dengan sedikit boilerplate. Ini bekerja sempurna dengan React Hook Form untuk validasi formulir dengan pesan kesalahan yang jelas dan dapat dikomposisi.

**@hookform/resolvers 3.9.1**
Paket ini mengintegrasikan validasi skema Zod dengan React Hook Form, memungkinkan validasi formulir berbasis skema deklaratif yang mencegah kesalahan runtime dan memberikan pengalaman pengembang yang sangat baik.

### State Management

**Zustand 4.4.1**
Zustand adalah pustaka manajemen status ringan dengan sedikit boilerplate. Ini menggunakan hook React, mendukung TypeScript, dan dapat diskalakan dari status lokal sederhana hingga status aplikasi yang kompleks tanpa overhead Redux atau Context API.

**@tanstack/react-query 5.28.0 (TanStack Query)**
React Query menangani manajemen status server, caching, sinkronisasi, dan pengambilan ulang latar belakang secara otomatis. Ini menyederhanakan pengambilan data, mengurangi kompleksitas kode, dan menyediakan alat pengembang yang sangat baik untuk men-debug aliran data.

### Data Visualization

**Recharts 2.15.0**
Recharts adalah pustaka charting yang dapat dikomposisi untuk React yang menyediakan grafik responsif dan deklaratif dengan konfigurasi minimal. Ini dibangun di atas komponen React, membuatnya alami untuk digunakan dalam aplikasi React dengan dukungan aksesibilitas yang sangat baik.

### UI Icons

**Lucide React 0.564.0**
Lucide React menyediakan set ikon SVG yang dirancang dengan indah, dapat dikustomisasi, dan lengkap sebagai komponen React. Ini ringan, mendukung tree-shaking, dan terintegrasi dengan mulus dengan Tailwind CSS untuk styling yang mudah.

### Notifications

**Sonner 1.7.1**
Sonner menyediakan notifikasi toast yang elegan dan dapat dikustomisasi tanpa konfigurasi. Ini dibangun untuk React modern dengan dukungan untuk mode gelap, animasi, dan promise, menjadikannya ideal untuk umpan balik pengguna.

### Utilities

**date-fns 4.1.0**
date-fns adalah pustaka utilitas tanggal modern dengan API fungsional dan dukungan TypeScript yang sangat baik. Ini modular, memungkinkan Anda hanya menggunakan apa yang Anda butuhkan, dan menyediakan kemampuan manipulasi dan pemformatan tanggal yang komprehensif.

**Clsx 2.1.1 & Tailwind Merge 3.3.1**
Utilitas ini memungkinkan komposisi kelas CSS bersyarat. Clsx menangani rendering kelas bersyarat, dan tailwind-merge mencegah konflik Tailwind saat menerapkan gaya secara dinamis, memastikan gaya yang konsisten.

**Class Variance Authority 0.7.1**
CVA adalah utilitas kecil yang aman tipe untuk membuat varian komponen. Ini sempurna untuk membangun komponen UI yang fleksibel dengan beberapa variasi gaya tanpa menggandakan kode atau berurusan dengan logika kondisional yang kompleks.

### Development

**TypeScript 5.7.3**
TypeScript menambahkan pemeriksaan tipe statis ke JavaScript, menangkap kesalahan pada waktu kompilasi dan meningkatkan pengalaman pengembang. Ini memberikan dukungan IDE yang lebih baik, kemampuan refactoring, dan berfungsi sebagai dokumentasi yang dapat dieksekusi untuk kode.

**PostCSS 8.5 & Autoprefixer 10.4.20**
PostCSS memproses CSS dengan plugin, dan Autoprefixer secara otomatis menambahkan prefiks vendor untuk kompatibilitas lintas browser. Ini memastikan gaya bekerja secara konsisten di berbagai browser tanpa penambahan prefiks manual.

### Accessibility & UI Components

**Radix UI Primitives**
Radix UI menyediakan primitif komponen yang tidak bergaya dan dapat diakses mengikuti pedoman WAI-ARIA. Ini membentuk fondasi untuk komponen shadcn/ui dan memastikan aplikasi memenuhi standar aksesibilitas (WCAG 2.1).

## Project Structure

```
├── app/
│   ├── page.tsx                 # Dashboard home page
│   ├── layout.tsx               # Root layout
│   ├── app-layout.tsx           # App layout wrapper
│   ├── providers.tsx            # Context providers (theme, query client, etc.)
│   └── invoices/
│       ├── page.tsx             # Invoices list page
│       ├── create/
│       │   └── page.tsx         # Create invoice form page
│       └── [id]/
│           └── page.tsx         # Invoice detail page
│
├── components/
│   ├── sidebar.tsx              # Navigation sidebar
│   ├── header.tsx               # Page header
│   ├── stat-card.tsx            # Statistics card component
│   ├── form-field.tsx           # Reusable form field
│   ├── theme-provider.tsx       # Theme provider setup
│   ├── toaster.tsx              # Toast notification container
│   └── ui/                      # shadcn/ui components
│
├── lib/
│   ├── mock-data.ts             # Invoice mock data store
│   ├── hooks/
│   │   └── use-invoices.ts      # React Query hooks for invoice operations
│   ├── schemas/
│   │   └── invoice-schema.ts    # Zod validation schema
│   ├── store/
│   │   └── ui-store.ts          # Zustand UI state store
│   └── utils/
│       ├── format.ts            # Currency and date formatting utilities
│       └── cn.ts                # Class name utility
│
└── public/                      # Static assets

```

## Key Features Explained

### Real-time Invoice Calculations

Saat membuat invoice, sistem secara otomatis:


1. Menghitung jumlah setiap item baris (kuantitas × tarif)
2. Menjumlahkan semua jumlah item baris untuk subtotal
3. Menerapkan pajak 10% ke subtota
4. Menambahkan pajak ke subtotal untuk jumlah total

Semua kalkulasi dilakukan baik di klien (untuk pembaruan UI real-time) dan diverifikasi pada pengiriman formulir.

### Revenue Trend Chart

Tren pendapatan secara dinamis menghitung pendapatan bulanan berdasarkan tanggal penerbitan invoice. Saat Anda membuat invoice baru, invoice tersebut secara otomatis muncul di grafik untuk bulan yang sesuai.

### Invoice Status Management

- **Pending invoices** secara otomatis menjadi terlihat dalam hitungan invoice tertunda
- **Paid invoices** dilacak secara terpisah dan berkontribusi pada total pendapatan
- **Overdue invoices** disorot untuk perhatian manajemen

### Data Persistence

Invoice disimpan dalam penyimpanan data mock berbasis sesi. Saat Anda membuat invoice baru, invoice tersebut ditambahkan ke penyimpanan dalam memori dan segera tersedia di semua tampilan termasuk dasbor, daftar invoice, dan hasil pencarian.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Pemisahan kode melalui impor dinamis Next.js
- Optimasi gambar dengan komponen Gambar Next.js
- Pembersihan CSS dengan Tailwind CSS
- Render ulang efisien dengan React Query dan Zustand
- Gambar responsif dan pemuatan lambat



