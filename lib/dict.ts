import type { Lang } from "./content";

type Dict = Record<string, string>;

const id: Dict = {
  "nav.featured": "Unggulan",
  "nav.projects": "Proyek",
  "nav.cv": "CV",
  "nav.skills": "Keahlian",
  "nav.contact": "Kontak",
  "hero.hi": "Halo, saya",
  "hero.sub":
    "Saya membangun produk digital dari hulu ke hilir — backend Go, dashboard React, hingga aplikasi Flutter dan React Native yang sudah rilis di Play Store dan App Store. Berpengalaman menggarap proyek fintech, pemerintahan, kesehatan, dan retail di Indonesia.",
  "hero.cta": "Lihat Karya Saya",
  "hero.cv": "Unduh CV",
  "stat.apps": "Aplikasi & Sistem Dirilis",
  "stat.years": "Tahun Pengalaman",
  "stat.industries": "Industri Dilayani",
  "stat.stacks": "Tech Stack Dikuasai",
  "feat.title": "Proyek Unggulan",
  "feat.sub": "Produk yang saya bangun sendiri dari nol — backend, web, dan mobile.",
  "feat.badge": "Produk Utama · 2024 — Sekarang",
  "feat.role": "Founder & Full Stack Developer",
  "feat.desc":
    "Platform Point of Sale (POS) lengkap untuk UMKM Indonesia. Loka Kasir menangani seluruh alur operasional toko: transaksi kasir, manajemen stok, perhitungan HPP/BOM dengan smart pricing, pembayaran QRIS, web POS offline-first, hingga QR scan-to-order untuk meja restoran — semuanya terpusat di satu dashboard admin.",
  "feat.be.t": "Backend API",
  "feat.be.d": "Go, Gin, PostgreSQL, Redis — arsitektur berlapis dengan autentikasi JWT, rate limiting, dan akses berbasis peran",
  "feat.mob.t": "Aplikasi Mobile (iOS/Android)",
  "feat.mob.d": "Flutter dengan state management Riverpod, mendukung mode offline, tampilan responsif untuk HP & tablet",
  "feat.web.t": "Dashboard Admin",
  "feat.web.d": "React, TypeScript, Vite, Zustand — kelola produk, outlet, laporan penjualan, dan karyawan dalam satu tempat",
  "feat.land.t": "Landing Page",
  "feat.land.d": "Next.js App Router, seluruh konten dikelola lewat data (data-driven)",
  "feat.visit": "Kunjungi lokakasir.id",
  "proj.title": "Proyek Pilihan",
  "proj.sub":
    "Aplikasi yang saya bangun dan rilis untuk rumah sakit, instansi pemerintah, bank, dan perusahaan pembiayaan — klik screenshot untuk memperbesar.",
  "p.klinika.tag": "Sistem Manajemen Klinik — Produk Kreativita",
  "p.klinika.desc":
    "Sistem manajemen klinik berbasis cloud yang menyatukan pendaftaran & antrian pasien real-time per poli dengan notifikasi WhatsApp, rekam medis elektronik (catatan SOAP, diagnosa ICD-10, resep digital), apotek lengkap dengan kartu stok & stock opname, hingga kasir bershift dengan billing otomatis, laporan laba-rugi, dan komisi dokter. Mendukung multi-cabang & multi-peran — dibangun dengan backend Go dan dashboard React.",
  "p.inventra.tag": "Manajemen Gudang & Stok — Produk Kreativita",
  "p.inventra.desc":
    "Aplikasi manajemen gudang & stok yang membantu bisnis memantau stok real-time di banyak gudang: transaksi masuk, keluar, penyesuaian, dan transfer antar gudang tercatat rapi, dengan peringatan stok tipis otomatis via Telegram & web serta hak akses Admin/Staff per gudang. Dibangun dengan backend Go (Gin, PostgreSQL) dan dashboard React + TypeScript.",
  "p.nexa.tag": "Slicing Figma ke HTML — Landing Page Platform Cloud",
  "p.nexa.desc":
    "Landing page untuk NexaCloud, platform cloud modern untuk developer & bisnis. Saya menerjemahkan desain Figma menjadi halaman HTML pixel-perfect — hero dengan ilustrasi berlapis, statistik pengguna, marketplace aplikasi sekali-klik (n8n, WordPress, Nginx, Uptime Kuma), hingga section insight & blog — menjaga detail spacing, tipografi, dan responsivitas tetap setia pada desain aslinya.",
  "p.simrs.tag": "Pendaftaran Rumah Sakit — Android & iOS",
  "p.simrs.desc":
    "Aplikasi pendaftaran berobat online RSUD Padang Panjang yang memangkas antrean loket: pasien mendaftar dari rumah, memilih poliklinik dan jadwal, lalu datang sesuai nomor antrean — alurnya menemani pasien dari awal berobat sampai obat diterima. Saya bangun sendirian dari nol dalam ±6 bulan (React Native + backend Laravel) dan rilis di Play Store.",
  "p.abon.tag": "Absensi GPS — Android & iOS",
  "p.abon.desc":
    "Aplikasi absensi online yang dipakai ASN Pemprov Sumatera Barat setiap hari kerja. Absen hanya sah di dalam radius koordinat GPS kantor yang ditentukan, dilengkapi laporan kerja harian, pengajuan izin, dan riwayat kehadiran — menggantikan mesin fingerprint yang riskan di masa pandemi.",
  "p.madani.tag": "Super-App Provinsi — Android & iOS",
  "p.madani.desc":
    "Super-app layanan publik yang saya bangun dari nol untuk Diskominfo Sumatera Barat: berita daerah, statistik kesehatan & COVID harian, dokumen hukum JDIH, informasi pariwisata, lowongan kerja, survei warga, hingga pelaporan insiden — belasan layanan pemerintah dirangkum dalam satu aplikasi di Play Store dan App Store.",
  "p.warung.tag": "Marketplace & PPOB — BTPN Syariah",
  "p.warung.desc":
    "Aplikasi pemberdayaan pemilik warung dari BTPN Syariah: belanja stok dagangan lewat katalog, isi saldo, setor & tarik tunai, pembayaran pulsa/PLN/BPJS (PPOB), sampai pantauan komisi penjualan — membantu warung kecil naik kelas secara digital. Live di Play Store dan masih aktif saya kembangkan hingga kini.",
  "p.sitepat.tag": "Pembiayaan Syariah & Marketplace — Android & iOS",
  "p.sitepat.desc":
    "Aplikasi nasabah pembiayaan syariah BTPN Syariah: cek saldo rekening, ajukan fasilitas pembiayaan hingga belasan juta rupiah, kelola angsuran aktif, dan klaim hadiah — semua proses yang dulunya harus lewat agen kini ada dalam genggaman. Live di Play Store dan masih aktif saya kembangkan hingga kini.",
  "p.tepati.tag": "Akuisisi Nasabah — Aplikasi Internal BTPN Syariah",
  "p.tepati.desc":
    "Aplikasi internal untuk agen lapangan yang mengakuisisi nasabah pembiayaan: verifikasi dokumen, jadwal kunjungan rutin, pencarian nasabah, dan pipeline akuisisi lengkap dengan tahap survei & wawancara. Dirancang offline-first dengan sinkronisasi SQLite karena agen sering bertugas di daerah minim sinyal. Masih aktif dikembangkan hingga kini.",
  "p.websitepat.tag": "Dashboard Manajemen — Web",
  "p.websitepat.desc":
    "Dashboard web pendamping ekosistem Sitepat untuk kebutuhan manajemen BTPN Syariah: analitik pencairan pembiayaan per wilayah dan per periode, tabel eligibilitas nasabah, serta grafik tren 6 bulan terakhir sebagai dasar pengambilan keputusan. Dibangun sebagai repo React modular dengan autentikasi JWT.",
  "p.rece.tag": "Dompet Digital — Mobile Web View",
  "p.rece.desc":
    "Dompet digital milik Bank BRI yang saya kerjakan semasa di Sagara Technology: alur registrasi lengkap (data KTP, rekening, dan verifikasi) serta login e-wallet RECE. Dibangun dengan React + TypeScript sebagai mobile web view — terasa seperti aplikasi native, tapi berjalan di web.",
  "p.simpen.tag": "Sistem Pengadaan — PLN UPDK Pekanbaru",
  "p.simpen.desc":
    "Sistem informasi manajemen pengadaan barang untuk PLN UPDK Pekanbaru: pencatatan dan monitoring kontrak, pemantauan realisasi anggaran (EBB), status proses pengadaan, hingga dashboard ringkasan bernilai ratusan miliar rupiah untuk manajemen. Dibangun full-stack dengan Laravel.",
  "p.engine.tag": "App Engine / Generator Admin — V12 Metaindigo",
  "p.engine.desc":
    "Engine aplikasi V12 yang menjadi fondasi berbagai aplikasi admin: menu dinamis, manajemen peran & pengguna, dan kerangka CRUD langsung tersedia — tim cukup fokus pada logika bisnis tiap proyek baru tanpa membangun ulang kerangkanya. Dibangun dengan Vue.js dan Express.",
  "cv.sub": "Perjalanan karier saya — dari asisten dosen hingga membangun produk sendiri.",
  "cv.dl": "Unduh CV (PDF)",
  "cv.1.date": "2024 — SEKARANG",
  "cv.1.place":
    'Loka Kasir — Platform Point of Sale · <a href="https://www.lokakasir.id/" target="_blank" rel="noopener">lokakasir.id</a>',
  "cv.1.desc": "Merancang dan membangun seluruh ekosistem POS untuk UMKM Indonesia, seorang diri:",
  "cv.1.li1": "Backend Go (Gin, PostgreSQL, Redis) dengan arsitektur berlapis dan dukungan multi-outlet",
  "cv.1.li2": "Aplikasi kasir Flutter untuk Android/iOS, responsif untuk HP & tablet",
  "cv.1.li3": "Dashboard admin React serta situs pemasaran Next.js",
  "cv.1.li4": "Pembayaran QRIS, web POS offline-first, QR scan-to-order, dan smart pricing HPP/BOM",
  "cv.2.date": "JAN 2022 — SEKARANG",
  "cv.2.title": "Full Stack Developer",
  "cv.2.desc": "Mengembangkan ekosistem aplikasi pemberdayaan nasabah: Warung Tepat, Web Warung Tepat, Sitepat, dan Tepati.",
  "cv.2.li1": "Membangun fitur dengan React Native, React JS, dan Golang; deploy lewat GitLab CI/CD",
  "cv.2.li2": "Menganalisis tiket pekerjaan setiap sprint dan mengawal kualitas hingga rilis ke tangan pengguna",
  "cv.2.li3": "Warung Tepat & Sitepat live di Play Store dan masih aktif dikembangkan hingga kini",
  "cv.3.date": "AGU 2021 — FEB 2023",
  "cv.3.title": "Frontend Developer",
  "cv.3.li1": "<strong>BRI RECE</strong> — dompet digital Bank BRI berbasis React JS + TypeScript, tampilan mobile dalam bentuk web",
  "cv.3.li2": "<strong>Back office BAF</strong> — aplikasi operasional untuk perusahaan pembiayaan BAF, dibangun dengan Next.js",
  "cv.4.date": "JAN — MAR 2022",
  "cv.4.title": "Full Stack Facilitator",
  "cv.4.desc":
    "Mengajar ±20 peserta bootcamp materi Node.js, React JS, dan Next.js — dari membangun aplikasi dari nol hingga deploy ke server dengan CI/CD, sekitar 3 pertemuan per minggu.",
  "cv.5.date": "NOV 2020 — DES 2021",
  "cv.5.title": "Mobile Programmer",
  "cv.5.li1": "<strong>ABON</strong> — aplikasi absensi online berbasis lokasi GPS untuk ASN Sumbar (React Native, Redux, Geolocation)",
  "cv.5.li2": "<strong>Sumbar Madani</strong> — super-app informasi & layanan publik Sumatera Barat, dibangun dari nol",
  "cv.6.date": "MAR — OKT 2020",
  "cv.6.title": "Mobile Programmer",
  "cv.6.place": "RSUD Padang Panjang",
  "cv.6.desc":
    "Membangun aplikasi pendaftaran pasien SIM RS — dari mulai berobat sampai pasien menerima obat — dengan React Native, sepenuhnya seorang diri, rilis di Play Store.",
  "cv.7.date": "JAN 2019 — JAN 2020",
  "cv.7.title": "Web Programmer",
  "cv.7.desc":
    "Membangun aplikasi web pencatatan poin kinerja pegawai (dasar tunjangan tambahan) menggunakan Yii2 dan Vue.js, sekaligus menjaga aplikasi berjalan aman selama periode pencatatan.",
  "cv.edu.title": "S1 Teknik Informatika",
  "cv.edu.place": "UIN Sultan Syarif Kasim Riau — Fakultas Sains dan Teknologi",
  "cv.edu.desc":
    "IPK 3,51/4,00 (145 SKS). Tiga kali dipercaya menjadi asisten dosen: Struktur Data, Teknologi Informasi Web, dan Algoritma Pemrograman.",
  "cv.doc.t": "Butuh CV dalam bentuk dokumen?",
  "cv.doc.d":
    "Unduh CV resmi saya dalam format PDF — ringkas dan siap untuk kebutuhan rekrutmen. Portfolio lengkap dengan screenshot bisa dilihat langsung di halaman ini.",
  "cv.doc.btn": "Unduh CV (PDF)",
  "skill.title": "Keahlian & Tools",
  "skill.sub": "Teknologi yang saya pakai sehari-hari.",
  "contact.title": "Mari Bangun Sesuatu",
  "contact.sub": "Terbuka untuk proyek full-stack — aplikasi mobile, dashboard web, dan backend API.",
  "footer.txt": "Dibuat dengan Next.js & Tailwind CSS",
  "lb.hint": "Klik di mana saja untuk menutup",
  "y.now": "2021 — Sekarang",
  "y.nexa": "2026 — Sekarang",
};

const en: Dict = {
  "nav.featured": "Featured",
  "nav.projects": "Projects",
  "nav.cv": "CV",
  "nav.skills": "Skills",
  "nav.contact": "Contact",
  "hero.hi": "Hi, I'm",
  "hero.sub":
    "I build digital products end-to-end — Go backends, React dashboards, and Flutter & React Native apps shipped to the Play Store and App Store. Experienced across fintech, government, healthcare, and retail in Indonesia.",
  "hero.cta": "View My Work",
  "hero.cv": "Download CV",
  "stat.apps": "Apps & Systems Shipped",
  "stat.years": "Years of Experience",
  "stat.industries": "Industries Served",
  "stat.stacks": "Tech Stacks Mastered",
  "feat.title": "Featured Project",
  "feat.sub": "The product I built from scratch, solo — backend, web, and mobile.",
  "feat.badge": "Flagship · 2024 — Present",
  "feat.role": "Founder & Full Stack Developer",
  "feat.desc":
    "A complete Point of Sale (POS) platform for Indonesian SMBs. Loka Kasir handles the entire store workflow: cashier transactions, inventory, cost-of-goods (HPP/BOM) smart pricing, QRIS payments, an offline-first web POS, and QR scan-to-order for restaurant tables — all managed from a single admin dashboard.",
  "feat.be.t": "Backend API",
  "feat.be.d": "Go, Gin, PostgreSQL, Redis — layered architecture with JWT auth, rate limiting, and role-based access",
  "feat.mob.t": "Mobile App (iOS/Android)",
  "feat.mob.d": "Flutter with Riverpod state management, offline-capable, responsive layouts for phone & tablet",
  "feat.web.t": "Admin Dashboard",
  "feat.web.d": "React, TypeScript, Vite, Zustand — manage products, outlets, sales reports, and employees in one place",
  "feat.land.t": "Landing Page",
  "feat.land.d": "Next.js App Router with fully data-driven content",
  "feat.visit": "Visit lokakasir.id",
  "proj.title": "Selected Projects",
  "proj.sub":
    "Apps I've built and shipped for hospitals, government agencies, banks, and financing companies — click any screenshot to enlarge.",
  "p.klinika.tag": "Clinic Management System — A Kreativita Product",
  "p.klinika.desc":
    "Cloud-based clinic management system that brings together real-time patient registration & queues per polyclinic with WhatsApp notifications, electronic medical records (SOAP notes, ICD-10 diagnoses, digital prescriptions), a full pharmacy with stock cards & stock opname, and shift-based cashiering with automatic billing, profit & loss reports, and doctor commissions. Supports multi-branch & multi-role — built with a Go backend and React dashboard.",
  "p.inventra.tag": "Warehouse & Stock Management — A Kreativita Product",
  "p.inventra.desc":
    "Warehouse & stock management app that helps businesses monitor stock in real time across multiple warehouses: inbound, outbound, adjustment, and inter-warehouse transfers are all neatly recorded, with automatic low-stock alerts via Telegram & web and per-warehouse Admin/Staff access control. Built with a Go backend (Gin, PostgreSQL) and a React + TypeScript dashboard.",
  "p.nexa.tag": "Figma-to-HTML Slicing — Cloud Platform Landing Page",
  "p.nexa.desc":
    "Landing page for NexaCloud, a modern cloud platform for developers & businesses. I translated the Figma design into pixel-perfect HTML — the layered hero illustration, user stats, one-click app marketplace (n8n, WordPress, Nginx, Uptime Kuma), and the insight & blog section — staying faithful to the original design's spacing, typography, and responsiveness.",
  "p.simrs.tag": "Hospital Registration — Android & iOS",
  "p.simrs.desc":
    "Online medical registration app for Padang Panjang Regional Hospital that cuts front-desk queues: patients register from home, pick a clinic and schedule, then simply show up for their number — the flow follows the patient from first visit until the medicine is in hand. Built solo from scratch in ~6 months (React Native + Laravel backend) and shipped to the Play Store.",
  "p.abon.tag": "GPS Attendance — Android & iOS",
  "p.abon.desc":
    "Online attendance app used by West Sumatra civil servants every working day. Check-ins are only valid within the office's predefined GPS radius, with daily work reports, leave requests, and attendance history built in — replacing fingerprint machines that became a risk during the pandemic.",
  "p.madani.tag": "Provincial Super-App — Android & iOS",
  "p.madani.desc":
    "Public services super-app I built from scratch for Diskominfo West Sumatra: regional news, daily health & COVID statistics, JDIH legal documents, tourism info, job listings, citizen surveys, and incident reporting — a dozen government services bundled into one app on the Play Store and App Store.",
  "p.warung.tag": "Marketplace & PPOB — BTPN Syariah",
  "p.warung.desc":
    "BTPN Syariah's empowerment app for warung owners: stock shopping through a catalog, balance top-up, cash deposit & withdrawal, pulsa/electricity/BPJS bill payments (PPOB), and sales commission tracking — helping small warungs level up digitally. Live on the Play Store and still actively developed by me today.",
  "p.sitepat.tag": "Sharia Financing & Marketplace — Android & iOS",
  "p.sitepat.desc":
    "BTPN Syariah's customer app for sharia financing: check account balance, apply for financing facilities worth millions of rupiah, manage active installments, and claim rewards — processes that used to require an agent now fit in your pocket. Live on the Play Store and still actively developed by me today.",
  "p.tepati.tag": "Customer Acquisition — Internal BTPN Syariah App",
  "p.tepati.desc":
    "Internal app for field agents acquiring financing customers: document verification, routine visit schedules, customer search, and a full acquisition pipeline including survey & interview stages. Designed offline-first with SQLite sync because agents often work in low-signal areas. Still in active development.",
  "p.websitepat.tag": "Management Dashboard — Web",
  "p.websitepat.desc":
    "The web dashboard companion to the Sitepat ecosystem, built for BTPN Syariah management: financing disbursement analytics by region and period, customer eligibility tables, and 6-month trend charts that drive decision-making. Built as a modular React repo with JWT authentication.",
  "p.rece.tag": "Digital Wallet — Mobile Web View",
  "p.rece.desc":
    "Bank BRI's digital wallet, which I worked on during my time at Sagara Technology: the complete registration flow (ID card, account details, and verification) plus login for the RECE e-wallet. Built with React + TypeScript as a mobile web view — feels like a native app, runs on the web.",
  "p.simpen.tag": "Procurement System — PLN UPDK Pekanbaru",
  "p.simpen.desc":
    "Goods procurement management system for PLN UPDK Pekanbaru: contract recording and monitoring, budget realization tracking (EBB), procurement status, and a management dashboard summarizing hundreds of billions of rupiah. Built full-stack with Laravel.",
  "p.engine.tag": "App Engine / Admin Generator — V12 Metaindigo",
  "p.engine.desc":
    "The V12 application engine that underpins multiple admin apps: dynamic menus, role & user management, and CRUD scaffolding available out of the box — so each new project focuses on business logic instead of rebuilding the frame. Built with Vue.js and Express.",
  "cv.sub": "My career journey — from lecturer assistant to building my own product.",
  "cv.dl": "Download CV (PDF)",
  "cv.1.date": "2024 — PRESENT",
  "cv.1.place":
    'Loka Kasir — Point of Sale Platform · <a href="https://www.lokakasir.id/" target="_blank" rel="noopener">lokakasir.id</a>',
  "cv.1.desc": "Designing and building an entire POS ecosystem for Indonesian SMBs, solo:",
  "cv.1.li1": "Go backend (Gin, PostgreSQL, Redis) with layered architecture and multi-outlet support",
  "cv.1.li2": "Flutter cashier app for Android/iOS, responsive for phone & tablet",
  "cv.1.li3": "React admin dashboard and Next.js marketing site",
  "cv.1.li4": "QRIS payments, offline-first web POS, QR scan-to-order, and HPP/BOM smart pricing",
  "cv.2.date": "JAN 2022 — PRESENT",
  "cv.2.title": "Full Stack Developer",
  "cv.2.desc": "Developing the customer-empowerment app ecosystem: Warung Tepat, Warung Tepat Web, Sitepat, and Tepati.",
  "cv.2.li1": "Building features with React Native, React JS, and Golang; shipping through GitLab CI/CD",
  "cv.2.li2": "Analyzing sprint tickets and owning quality until each release reaches users",
  "cv.2.li3": "Warung Tepat & Sitepat are live on the Play Store and still actively developed today",
  "cv.3.date": "AUG 2021 — FEB 2023",
  "cv.3.title": "Frontend Developer",
  "cv.3.li1": "<strong>BRI RECE</strong> — Bank BRI's digital wallet in React JS + TypeScript, a mobile-like experience on the web",
  "cv.3.li2": "<strong>BAF back office</strong> — operational tooling for the financing company BAF, built with Next.js",
  "cv.4.date": "JAN — MAR 2022",
  "cv.4.title": "Full Stack Facilitator",
  "cv.4.desc":
    "Taught ~20 bootcamp students Node.js, React JS, and Next.js — from building apps from scratch to deploying to servers with CI/CD, about 3 sessions a week.",
  "cv.5.date": "NOV 2020 — DEC 2021",
  "cv.5.title": "Mobile Programmer",
  "cv.5.li1": "<strong>ABON</strong> — GPS location-based online attendance app for West Sumatra civil servants (React Native, Redux, Geolocation)",
  "cv.5.li2": "<strong>Sumbar Madani</strong> — West Sumatra public information & services super-app, built from scratch",
  "cv.6.date": "MAR — OCT 2020",
  "cv.6.title": "Mobile Programmer",
  "cv.6.place": "Padang Panjang Regional Hospital",
  "cv.6.desc":
    "Built the SIM RS patient registration app — covering the journey from first visit until the patient receives their medicine — with React Native, entirely solo, published to the Play Store.",
  "cv.7.date": "JAN 2019 — JAN 2020",
  "cv.7.title": "Web Programmer",
  "cv.7.desc":
    "Built a web app for recording employee performance points (the basis for extra allowances) using Yii2 and Vue.js, and kept it running safely throughout the recording period.",
  "cv.edu.title": "Bachelor of Informatics Engineering",
  "cv.edu.place": "UIN Sultan Syarif Kasim Riau — Faculty of Science and Technology",
  "cv.edu.desc":
    "GPA 3.51/4.00 (145 credits). Served three times as a lecturer assistant: Data Structures, Web Information Technology, and Programming Algorithms.",
  "cv.doc.t": "Need my CV as a document?",
  "cv.doc.d":
    "Download my official CV as a PDF — concise and recruitment-ready. The full portfolio with screenshots lives right here on this page.",
  "cv.doc.btn": "Download CV (PDF)",
  "skill.title": "Skills & Tools",
  "skill.sub": "The stack I use day to day.",
  "contact.title": "Let's Build Something",
  "contact.sub": "Open for full-stack projects — mobile apps, web dashboards, and backend APIs.",
  "footer.txt": "Built with Next.js & Tailwind CSS",
  "lb.hint": "Click anywhere to close",
  "y.now": "2021 — Present",
  "y.nexa": "2026 — Present",
};

export const DICT: Record<Lang, Dict> = { id, en };

export const ROLES: Record<Lang, string[]> = {
  id: ["Full Stack Developer", "Pengembang Aplikasi Mobile", "Backend Engineer", "Pembangun Platform POS"],
  en: ["Full Stack Developer", "Mobile App Developer", "Backend Engineer", "POS Platform Builder"],
};

// Resolve a value that is either a literal (prefixed with "@") or an i18n key.
export function resolve(dict: Dict, keyOrLiteral: string): string {
  if (keyOrLiteral.startsWith("@")) return keyOrLiteral.slice(1);
  return dict[keyOrLiteral] ?? keyOrLiteral;
}
