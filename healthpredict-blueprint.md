# HealthPredict.id — Blueprint & Dokumen Perancangan Web
> Prediksi Penyakit Diabetes & Jantung Berbasis Machine Learning & AI  
> Untuk Masyarakat Umum Indonesia · Versi 1.0 · 2025

---

## Daftar Isi
1. [Gambaran Umum Proyek](#1-gambaran-umum-proyek)
2. [Struktur Halaman (Sitemap)](#2-struktur-halaman-sitemap)
3. [Blueprint Landing Page (/)](#3-blueprint-landing-page-)
4. [Blueprint Halaman Prediksi](#4-blueprint-halaman-prediksi)
5. [Section About di Landing Page](#5-section-about-di-landing-page)
6. [Sistem Desain & Visual](#6-sistem-desain--visual)
7. [Tech Stack & Dependencies](#7-tech-stack--dependencies)
8. [Roadmap Pengembangan](#8-roadmap-pengembangan)

---

## 1. Gambaran Umum Proyek

| Info | Detail |
|---|---|
| **Nama Proyek** | HealthPredict.id |
| **Tujuan** | Membantu masyarakat umum Indonesia mendeteksi risiko diabetes dan penyakit jantung secara mandiri menggunakan data laboratorium |
| **Target Pengguna** | Masyarakat umum Indonesia usia 20–65 tahun yang memiliki hasil lab kesehatan |
| **Tech Stack** | Next.js (Frontend) · Express.js (Backend) · Python ML Model |
| **Model AI** | Public ML model (Hugging Face / Scikit-learn) + Claude API untuk penjelasan |
| **Bahasa** | Bahasa Indonesia (UI & Konten) |
| **Status** | Tahap Perancangan — v1.0 |

### 1.1 Nilai Utama Produk

- **Aksesibilitas** — Bisa diakses siapa saja hanya dengan data lab rutin
- **Edukatif** — Memberikan penjelasan komprehensif, bukan sekadar angka risiko
- **Transparan** — Menjelaskan faktor apa yang berkontribusi terhadap risiko pengguna
- **Aman** — Selalu disertai disclaimer medis dan anjuran konsultasi dokter

### 1.2 Fitur Utama

| Fitur | Deskripsi | Output |
|---|---|---|
| Prediksi Diabetes | Form input data lab (glukosa, BMI, tekanan darah, dll) | Skor risiko + rekomendasi |
| Prediksi Jantung | Form input data lab (kolesterol, HR, tekanan darah, dll) | Skor risiko + rekomendasi |
| Edukasi Interaktif | Konten penyebab, gejala, pencegahan | Berubah sesuai tab aktif |
| Statistik Indonesia | Angka prevalensi diabetes & jantung di Indonesia | Animasi counter |
| Cara Kerja | Visualisasi 3 langkah proses prediksi | Step visual |
| Section About | Metodologi, dataset, disclaimer resmi | Anchor scroll #about |

---

## 2. Struktur Halaman (Sitemap)

> **Total: 3 Halaman** — Landing Page · Prediksi Diabetes · Prediksi Jantung

| Route / URL | Nama Halaman | Deskripsi |
|---|---|---|
| `/` | Landing Page | Halaman utama — hero, statistik, cara kerja, edukasi, about, CTA, footer |
| `/predict/diabetes` | Form Prediksi Diabetes | Multi-step form + hasil prediksi diabetes |
| `/predict/heart` | Form Prediksi Jantung | Multi-step form + hasil prediksi jantung |

**Catatan Arsitektur:**
- Halaman **About tidak dibuat terpisah** — dijadikan section di landing page agar user cukup scroll satu halaman
- Menu "Tentang" di navbar menggunakan **smooth scroll anchor** (`#about`), bukan pindah halaman
- Halaman `/predict/diabetes` dan `/predict/heart` menggunakan **1 komponen reusable** yang sama, hanya props yang berbeda
- **Navbar dan Footer** adalah komponen global yang di-render di semua halaman

---

## 3. Blueprint Landing Page (/)

Landing page adalah satu-satunya halaman informasi. Semua konten termasuk About ada di sini — user cukup scroll dari atas ke bawah. Konten bersifat **dinamis** sesuai pilihan tab aktif (Diabetes atau Jantung).

### Urutan Section

| # | Section | Deskripsi |
|---|---|---|
| 1 | **Navbar** | Sticky di atas — logo, menu navigasi, tombol CTA |
| 2 | **Hero Section** | Animasi + headline + CTA button — dinamis sesuai tab |
| 3 | **Statistik** | Angka prevalensi penyakit di Indonesia dengan animasi counter |
| 4 | **Cara Kerja** | 3 langkah visual: Input → Analisis → Hasil |
| 5 | **Edukasi** | Penyebab, gejala, pencegahan — konten dinamis sesuai tab aktif |
| 6 | **About / Tentang** | Metodologi model, dataset, disclaimer medis — anchor `#about` |
| 7 | **CTA Bottom** | Banner ajakan prediksi sebelum footer |
| 8 | **Footer** | Logo, navigasi, copyright, disclaimer singkat |

---

### 3.1 Navbar

> Sticky · Fixed Top · Backdrop blur effect

| Elemen | Posisi | Detail |
|---|---|---|
| Logo | Kiri | "HealthPredict.id" — teks dengan dot cyan bersinar |
| Menu Navigasi | Tengah | Beranda · Prediksi (dropdown) · Edukasi · Tentang |
| CTA Button | Kanan | "Mulai Prediksi" — gradient biru/cyan, rounded pill |
| Dropdown Prediksi | Tengah | Muncul saat hover — pilihan Diabetes & Jantung |
| Link "Tentang" | Tengah | Smooth scroll anchor ke `#about` — bukan pindah halaman |
| Behavior Scroll | Global | Background transparan → blur + shadow setelah scroll 50px |

**Implementasi:**
- `useState` untuk track scroll position dan toggle navbar background
- Dropdown menggunakan `onMouseEnter/onMouseLeave` dengan animasi Framer Motion
- Active link ditandai dengan underline animated via CSS pseudo-element

---

### 3.2 Hero Section

> Full viewport height · Dinamis berdasarkan tab aktif (Diabetes / Jantung)

**Tab Selector** — di bagian atas hero terdapat dua tab pill. Tab aktif memiliki background gradient + glow effect. Saat tab berganti, seluruh konten hero melakukan transisi animasi crossfade 400ms.

#### Hero: Mode Diabetes (Default)

| Elemen | Posisi | Spesifikasi |
|---|---|---|
| Animasi Aset | **Kiri** | Lottie/SVG — molekul gula, sel darah, jarum suntik — warna biru/cyan, ukuran 450x450px, loop |
| Badge | Kanan atas | Pill kecil: "Deteksi Dini Berbasis Data Lab" — warna cyan, pulsing dot |
| Headline | Kanan | Font display besar bold. Contoh: *"Kenali Risiko Diabetes Anda Sebelum Terlambat"* |
| Subtext | Kanan | Paragraf 2–3 baris manfaat deteksi dini — warna abu-abu |
| CTA Button | Kanan bawah | "Cek Risiko Diabetes →" — gradient biru ke cyan, link ke `/predict/diabetes` |
| Secondary Link | Kanan bawah | "Pelajari lebih lanjut ↓" — smooth scroll ke section edukasi |

#### Hero: Mode Jantung

| Elemen | Posisi | Spesifikasi |
|---|---|---|
| Animasi Aset | **Kanan** | Lottie/SVG — jantung berdetak, garis EKG/pulse — warna merah/amber, ukuran 450x450px, loop |
| Badge | Kiri atas | Pill kecil: "Deteksi Dini Penyakit Jantung" — warna merah, pulsing dot |
| Headline | Kiri | Font display besar bold. Contoh: *"Jaga Jantung Anda, Deteksi Risiko Sejak Dini"* |
| Subtext | Kiri | Paragraf 2–3 baris — warna abu-abu |
| CTA Button | Kiri bawah | "Cek Risiko Jantung →" — gradient merah ke amber, link ke `/predict/heart` |
| Secondary Link | Kiri bawah | "Pelajari lebih lanjut ↓" — smooth scroll ke section edukasi |

**Animasi Transisi Antar Tab:**
- Aset slide keluar ke arah berlawanan + teks fade out
- Konten baru: aset slide masuk + teks fade in dengan slight `translateY`
- Durasi: **400ms ease-in-out** menggunakan Framer Motion `AnimatePresence`
- Background gradient halaman ikut berubah: biru gelap (diabetes) → merah gelap (jantung)

**Sumber Aset Animasi (Gratis):**
- [LottieFiles.com](https://lottiefiles.com) — cari "diabetes", "blood sugar", "heartbeat", "ECG" → download `.json`
- [Undraw.co](https://undraw.co) — ilustrasi SVG medis yang bisa dikustomisasi warna
- Alternatif: buat sendiri dengan CSS animation + SVG shapes

---

### 3.3 Section Statistik Indonesia

> Membangun urgensi dan relevansi produk

| Angka | Label | Sumber |
|---|---|---|
| **19,5 Juta** | Penderita Diabetes | IDF Diabetes Atlas 2021 — Indonesia peringkat 7 dunia |
| **2,7 Juta** | Kasus Jantung/Tahun | Kemenkes RI 2022 |
| **50%** | Tidak Terdiagnosis | Setengah penderita tidak mengetahui kondisinya |
| **< 5 Menit** | Waktu Prediksi | Dengan HealthPredict.id, skrining awal bisa dilakukan cepat |

**Implementasi:**
- `Intersection Observer API` untuk trigger animasi counter saat section masuk viewport
- Library: `react-countup` atau implementasi manual dengan `useEffect`
- Layout: 4 kolom grid — ikon besar, angka besar bold, label di bawah

---

### 3.4 Section Cara Kerja

> 3 langkah sederhana — membangun kepercayaan user

| Step | Judul | Deskripsi |
|---|---|---|
| **Step 1** | Input Data Lab | User mengisi form dengan data dari hasil cek lab rutin |
| **Step 2** | AI Menganalisis | Model ML memproses data dan menghitung skor risiko |
| **Step 3** | Lihat Hasil | User menerima skor risiko, visualisasi faktor, dan rekomendasi personal |

**Layout:** 3 kolom horizontal dengan ikon besar di atas setiap step, dihubungkan panah animasi. Animasi stagger — setiap card muncul dengan delay 150ms (Framer Motion).

---

### 3.5 Section Edukasi

> Konten dinamis — berubah sesuai tab aktif

#### Edukasi Diabetes

| Kartu | Konten | Ikon |
|---|---|---|
| Apa itu Diabetes? | Penjelasan tipe 1, tipe 2, gestasional | 🩸 |
| Faktor Risiko | Obesitas, sedentari, genetik, usia | ⚠️ |
| Gejala Umum | Sering haus, sering BAK, luka lambat sembuh | 🔍 |
| Cara Mencegah | Pola makan, olahraga, cek rutin, berat badan ideal | ✅ |

#### Edukasi Jantung

| Kartu | Konten | Ikon |
|---|---|---|
| Apa itu Peny. Jantung? | Jantung koroner, aritmia, gagal jantung | ❤️ |
| Faktor Risiko | Hipertensi, kolesterol tinggi, merokok, stres | ⚠️ |
| Tanda Bahaya | Nyeri dada, sesak napas, jantung berdebar | 🚨 |
| Gaya Hidup Sehat | Diet DASH, olahraga aerobik, berhenti merokok | ✅ |

**Layout:** Card grid 2×2. Hover: `translateY(-4px)` + shadow lebih dalam. Transisi konten antar tab menggunakan Framer Motion fade.

---

### 3.6 Section CTA Bottom

Banner full-width dengan background gradient gelap, headline besar di tengah, dua tombol side by side: **"Cek Diabetes"** dan **"Cek Jantung"**. Background bisa ditambahkan dot grid pattern atau diagonal lines sebagai tekstur.

---

### 3.7 Footer

| Elemen | Posisi | Konten |
|---|---|---|
| Logo & Tagline | Kiri | "HealthPredict.id" + tagline singkat + copyright |
| Navigasi | Tengah kiri | Beranda · Prediksi Diabetes · Prediksi Jantung · #About |
| Disclaimer | Tengah kanan | "Hasil prediksi bersifat informatif, bukan diagnosis medis" |
| Credit | Kanan | Dataset sumber, teknologi yang digunakan |

---

## 4. Blueprint Halaman Prediksi

Halaman `/predict/diabetes` dan `/predict/heart` memiliki **struktur identik**. Keduanya menggunakan satu komponen `<PredictPage>` yang menerima props berbeda (`type: "diabetes" | "heart"`).

### 4.1 Layout Halaman

Layout **2 kolom** pada desktop, 1 kolom pada mobile:

| Kolom | Lebar | Konten |
|---|---|---|
| **Kiri — Sidebar Info** | 40% | Deskripsi prediksi, daftar parameter yang dibutuhkan, tips cara mendapatkan nilai lab, disclaimer medis · Sticky saat scroll |
| **Kanan — Form + Hasil** | 60% | Progress bar, multi-step form (3 step), panel hasil prediksi |

---

### 4.2 Multi-Step Form — Diabetes

| Step | Field Input | Keterangan |
|---|---|---|
| **Step 1: Data Dasar** | Usia (tahun), Jenis Kelamin, Berat Badan (kg), Tinggi Badan (cm) | BMI dihitung otomatis dari BB & TB |
| **Step 2: Data Lab** | Kadar Glukosa Puasa (mg/dL), Tekanan Darah Diastolik (mmHg), Insulin (μU/mL, opsional) | Tooltip penjelasan setiap field |
| **Step 3: Riwayat** | Riwayat Diabetes Keluarga, Jumlah Kehamilan (khusus perempuan), Aktivitas fisik/minggu | Select dropdown & radio button |

### 4.3 Multi-Step Form — Jantung

| Step | Field Input | Keterangan |
|---|---|---|
| **Step 1: Data Dasar** | Usia (tahun), Jenis Kelamin, Berat Badan, Tinggi Badan | BMI auto-kalkulasi |
| **Step 2: Data Lab** | Kolesterol Total (mg/dL), Tekanan Darah Sistolik (mmHg), Detak Jantung Maks (bpm), Gula Darah Puasa > 120 | Input number dengan validasi range |
| **Step 3: Riwayat** | Tipe Nyeri Dada, Status Merokok, Riwayat Penyakit Jantung Keluarga, Aktivitas fisik | Select & radio button |

### 4.4 Progress Bar

Progress bar di atas form menunjukkan posisi user saat ini (Step 1 dari 3). Saat berpindah step, konten form melakukan animasi **slide kiri/kanan** (Framer Motion). Tombol "Kembali" dan "Lanjut" ada di bawah setiap step.

### 4.5 Panel Hasil Prediksi

Muncul setelah submit Step 3 — scroll otomatis ke bawah dengan animasi `fadeUp`. **Tidak membuka halaman baru.**

| Komponen | Tampilan | Detail |
|---|---|---|
| Risk Badge | Header panel | Ikon + label (Rendah/Sedang/Tinggi) — hijau/kuning/merah |
| Skor Risiko | Gauge bar animasi | Progress bar 0–100%, warna sesuai level risiko, durasi 1 detik |
| Faktor Kontribusi | Bar chart horizontal | Setiap parameter sebagai bar proporsional dengan warna risiko |
| Penjelasan AI | Paragraf teks | Penjelasan hasil dalam Bahasa Indonesia (Claude API atau template) |
| Rekomendasi | List dengan ikon | 3–5 rekomendasi tindakan spesifik sesuai level risiko |
| Tombol Aksi | Bawah panel | "Coba Lagi" · "Simpan Hasil (PDF)" · "Konsultasi ke Dokter" |

---

## 5. Section About di Landing Page

> Bagian dari Landing Page — anchor `#about` · bukan halaman terpisah

Section ini berada di **urutan ke-6** dalam landing page, tepat setelah section Edukasi. Menu "Tentang" di navbar menggunakan smooth scroll `#about`.

| Sub-Section | Konten | Format |
|---|---|---|
| Tentang Proyek | Misi, visi, dan tujuan HealthPredict.id | Teks + ilustrasi pendek |
| Metodologi Model | Algoritma yang digunakan (Random Forest, XGBoost, dll) | Diagram alur 3 langkah |
| Dataset | Pima Indians Diabetes, UCI Heart Disease, dll | Tabel ringkas + link sumber |
| Akurasi Model | Akurasi, Precision, Recall, AUC-ROC | 4 stat card bold |
| Disclaimer Resmi | Pernyataan ini bukan alat diagnosis medis | Box highlight merah/kuning |
| Tim / Kredit | Developer, teknologi, open source libraries | Card sederhana |

**Implementasi:**
- Tambahkan `id="about"` pada elemen `<section>` di JSX
- Layout: 2 kolom untuk Metodologi + Dataset, full width untuk Disclaimer
- Akurasi model ditampilkan sebagai 4 stat card (konsisten dengan section Statistik)

---

## 6. Sistem Desain & Visual

### 6.1 Palet Warna

| Nama | Hex | Penggunaan |
|---|---|---|
| Background Utama | `#0A0F1E` | Dark navy — latar halaman keseluruhan |
| Surface / Card | `#111827` | Background card dan panel |
| Surface Secondary | `#1A2236` | Input field, dropdown, secondary panel |
| **Aksen Diabetes** | `#3B82F6 → #06B6D4` | Gradient biru ke cyan — semua elemen diabetes |
| **Aksen Jantung** | `#EF4444 → #F59E0B` | Gradient merah ke amber — semua elemen jantung |
| Risiko Rendah | `#10B981` | Hijau emerald |
| Risiko Sedang | `#F59E0B` | Amber |
| Risiko Tinggi | `#EF4444` | Merah |
| Teks Utama | `#F1F5F9` | Teks utama |
| Teks Muted | `#64748B` | Label, placeholder, teks sekunder |

### 6.2 Tipografi

| Tipe | Font Family | Penggunaan |
|---|---|---|
| Display / Heading | **Syne** (Google Fonts) | Judul besar, nama tombol, label tab — weight 700–800 |
| Body Text | **DM Sans** (Google Fonts) | Teks paragraf, label form, deskripsi — weight 300–500 |
| Monospace | **JetBrains Mono** (opsional) | Angka lab, skor, kode — weight 400 |

### 6.3 Animasi & Motion

| Elemen | Teknik | Detail |
|---|---|---|
| Page Load | Framer Motion stagger | Setiap section muncul berurutan, delay 100ms |
| Hero Tab Switch | Framer Motion `AnimatePresence` | Crossfade + slide aset — 400ms ease-in-out |
| Scroll Reveal | Intersection Observer + Framer Motion | fadeUp dari `translateY(30px)` saat masuk viewport |
| Counter Statistik | `react-countup` | Count up saat section terlihat di viewport |
| Form Step Transition | Framer Motion slide | Slide kiri/kanan saat berpindah step |
| Gauge Hasil | CSS + Framer Motion | Bar animasi dari 0 ke nilai final — 1 detik |
| Hover Card | CSS transition | `translateY(-4px)` + shadow lebih dalam |
| Lottie Aset Hero | `lottie-react` | Loop animation untuk aset medis di hero |

---

## 7. Tech Stack & Dependencies

### 7.1 Frontend (Next.js)

| Package | Versi | Fungsi |
|---|---|---|
| `next` | 14+ | Framework utama — App Router, SSR, routing |
| `react` | 18+ | Library UI |
| `framer-motion` | 11+ | Animasi halaman, transisi, scroll reveal |
| `lottie-react` | 2+ | Render file animasi `.json` Lottie |
| `react-hook-form` | 7+ | Manajemen state form multi-step + validasi |
| `recharts` | latest | Visualisasi gauge dan bar chart hasil prediksi |
| `tailwindcss` | 3+ | Utility CSS — styling komponen |
| `react-countup` | 6+ | Animasi counter angka statistik |

### 7.2 Backend (Express.js)

| Package | Versi | Fungsi |
|---|---|---|
| `express` | 4+ | Server HTTP utama, routing API |
| `cors` | latest | Cross-origin request dari frontend Next.js |
| `axios` | latest | HTTP request ke Hugging Face Inference API |
| `express-validator` | latest | Validasi input sebelum dikirim ke model |
| `dotenv` | latest | Manajemen environment variable (API keys) |
| `helmet` | latest | Security headers |

### 7.3 Integrasi Model ML (Public)

| Opsi | Akses | Cara Implementasi |
|---|---|---|
| **Hugging Face Inference API** | Gratis tier tersedia | Model diabetes/jantung sudah ada — hit endpoint REST API |
| **Scikit-learn `.pkl` file** | Download dari Kaggle | Load di Python microservice (FastAPI), panggil dari Express |
| **Rule-based scoring** | Langsung di Express | Sementara untuk development — swap ke model asli saat production |

> **Rekomendasi:** Mulai dengan rule-based scoring agar frontend bisa berjalan duluan. Setelah web selesai, swap dengan Hugging Face API. Pengembangan frontend dan ML bisa berjalan **paralel**.

### 7.4 Deployment

| Komponen | Platform | Keterangan |
|---|---|---|
| Frontend (Next.js) | **Vercel** | Free tier, auto-deploy dari GitHub, domain `.vercel.app` gratis |
| Backend (Express.js) | **Railway** atau Render | Free tier tersedia, mudah setup Node.js |
| Domain Custom | Niagahoster / IDwebhost | Opsional — domain `.id` untuk kesan lebih profesional |

---

## 8. Roadmap Pengembangan

### ✅ Fase 1 — Fondasi UI (Week 1–2)
> Target: Landing page lengkap dengan semua section

- [ ] Setup project Next.js + Tailwind CSS + Framer Motion
- [ ] Buat komponen Navbar dengan dropdown dan scroll behavior
- [ ] Implementasi Hero Section dengan tab switcher dan animasi Lottie
- [ ] Buat Section Statistik dengan animasi counter
- [ ] Buat Section Cara Kerja dengan step visual
- [ ] Buat Section Edukasi dengan card grid dinamis
- [ ] Buat Section About dengan metodologi dan disclaimer
- [ ] Buat CTA Section dan Footer

### ✅ Fase 2 — Halaman Prediksi (Week 3–4)
> Target: Form prediksi lengkap dengan mock data

- [ ] Buat komponen `PredictPage` reusable (diabetes & jantung)
- [ ] Implementasi multi-step form dengan React Hook Form
- [ ] Buat progress bar dan animasi transisi antar step
- [ ] Implementasi panel hasil prediksi dengan gauge dan chart
- [ ] Setup rule-based scoring sementara untuk testing UI

### ✅ Fase 3 — Backend & Model (Week 5–6)
> Target: Integrasi Express.js + ML Model public

- [ ] Setup Express.js server dengan route `/api/predict/diabetes` dan `/api/predict/heart`
- [ ] Integrasi Hugging Face Inference API atau load model `.pkl`
- [ ] Implementasi validasi input dengan `express-validator`
- [ ] Koneksikan frontend Next.js ke backend Express via Axios
- [ ] Testing end-to-end dengan data lab nyata

### ✅ Fase 4 — Polish & Deploy (Week 7–8)
> Target: Web siap deploy dan tampil profesional

- [ ] Optimasi performa: lazy loading, image optimization, code splitting
- [ ] Responsif mobile — testing di berbagai ukuran layar
- [ ] SEO dasar: meta tags, og:image, sitemap
- [ ] Deploy frontend ke Vercel dan backend ke Railway
- [ ] Testing final dan bug fixing

---

## ⚕️ Disclaimer Medis

> **HealthPredict.id adalah alat bantu skrining awal dan BUKAN pengganti diagnosis medis profesional.**
> Semua hasil prediksi bersifat informatif dan harus selalu dikonfirmasi dengan konsultasi dokter atau tenaga medis berwenang. Untuk pengembangan lebih lanjut, disarankan untuk berkonsultasi dengan tenaga medis profesional dalam menyusun konten edukasi dan memvalidasi threshold risiko yang digunakan dalam model prediksi.

---

*HealthPredict.id — Blueprint v1.0 · 2025*
