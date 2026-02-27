## Prompt 2.1 — Hero Section

```
Buatkan komponen Hero di components/sections/Hero.tsx dengan spesifikasi lengkap:

STATE:
- activeTab: "diabetes" | "heart" — default "diabetes"
- Simpan di useState, pass ke komponen Education dan section lain yang butuh

TAB SELECTOR (di atas hero):
- Dua tombol pill side by side di tengah atas
- Tab aktif: background gradient sesuai jenis (biru/cyan untuk diabetes, merah/amber untuk jantung) + box shadow glow
- Tab tidak aktif: background #1A2236, border subtle
- Animasi saat klik: scale 0.95 → 1 dengan spring Framer Motion

LAYOUT MODE DIABETES:
- Grid 2 kolom: kiri animasi (50%), kanan konten (50%)
- Kiri: placeholder div 450x450px dengan background rgba(59,130,246,0.1), border dashed, border-radius 24px, teks tengah "[ Animasi Diabetes ]" — akan diganti Lottie nanti
- Kanan atas: Badge component "🩸 Deteksi Dini Berbasis Data Lab" warna cyan
- Kanan tengah: Headline font Syne bold besar "Kenali Risiko Diabetes Anda Sebelum Terlambat"
- Kanan bawah headline: paragraf subtext 2-3 baris warna #94A3B8
- Kanan bawah: Button "Cek Risiko Diabetes →" variant primary-diabetes → link /predict/diabetes
- Kanan paling bawah: teks link "Pelajari lebih lanjut ↓" smooth scroll ke #edukasi

LAYOUT MODE JANTUNG:
- Grid 2 kolom: kiri konten (50%), kanan animasi (50%) — POSISI TERBALIK dari diabetes
- Kanan: placeholder div 450x450px background rgba(239,68,68,0.1), teks "[ Animasi Jantung ]"
- Kiri atas: Badge "❤️ Deteksi Dini Penyakit Jantung" warna merah
- Kiri tengah: Headline "Jaga Jantung Anda, Deteksi Risiko Sejak Dini"
- Kiri bawah: subtext, Button "Cek Risiko Jantung →" variant primary-heart → link /predict/heart

ANIMASI TRANSISI ANTAR TAB:
- Gunakan Framer Motion AnimatePresence dengan mode="wait"
- Saat tab berganti: konten lama fade out + slide keluar, konten baru fade in + slide masuk
- Durasi: 400ms, ease: easeInOut
- Background gradient halaman juga berubah smooth:
  * Diabetes: radial gradient dari #1e3a5f (kiri atas) ke #0A0F1E
  * Jantung: radial gradient dari #3b1010 (kanan atas) ke #0A0F1E

ANIMASI MASUK HALAMAN:
- Saat pertama load, semua elemen hero muncul dengan stagger
- Badge: fade in + translateY dari 20px, delay 0.2s
- Headline: fade in + translateY dari 30px, delay 0.4s
- Subtext: fade in, delay 0.6s
- Button: fade in + translateY dari 10px, delay 0.8s

RESPONSIF:
- Mobile: 1 kolom, animasi di atas, konten di bawah
- Tablet: 1 kolom dengan layout lebih compact
```

---

## Prompt 2.2 — Section Statistik

```
Buatkan komponen Stats di components/sections/Stats.tsx dengan spesifikasi:

LAYOUT:
- Full width section, padding atas bawah 80px
- Background: sedikit berbeda dari halaman utama — gunakan #0D1526
- Judul section di tengah atas: "Mengapa Deteksi Dini Itu Penting?"
- Subjudul: "Data prevalensi penyakit tidak menular di Indonesia"
- Grid 4 kolom pada desktop, 2 kolom pada tablet, 1 kolom mobile

4 STAT CARD:
1. Angka: 19500000 → format "19,5 Juta" | Label: "Penderita Diabetes" | Ikon: 🩸 | Warna aksen: cyan
2. Angka: 2700000 → format "2,7 Juta" | Label: "Kasus Jantung/Tahun" | Ikon: ❤️ | Warna aksen: merah
3. Angka: 50 → format "50%" | Label: "Tidak Terdiagnosis" | Ikon: ⚠️ | Warna aksen: amber
4. Angka: 5 → format "<5 Menit" | Label: "Waktu Prediksi" | Ikon: ⚡ | Warna aksen: hijau

ANIMASI COUNTER:
- Gunakan react-countup dengan enableScrollSpy: true
- Angka count up otomatis saat card masuk viewport
- Durasi count: 2.5 detik dengan easing

ANIMASI CARD:
- Gunakan Intersection Observer atau Framer Motion whileInView
- Setiap card muncul dengan stagger delay 150ms
- Animasi: fade in + translateY dari 40px ke 0

STYLE CARD:
- Background #111827, border subtle
- Ikon besar di atas (font size 2.5rem)
- Angka sangat besar + bold (font Syne, ukuran 2.5rem)
- Label di bawah warna muted
- Garis aksen berwarna di bawah angka sesuai warna card
```

---

## Prompt 2.3 — Section Cara Kerja

```
Buatkan komponen HowItWorks di components/sections/HowItWorks.tsx dengan spesifikasi:

LAYOUT:
- Full width section, padding atas bawah 80px
- Judul section tengah: "Bagaimana Cara Kerjanya?"
- Subjudul: "Tiga langkah mudah untuk mengetahui risiko kesehatan Anda"
- 3 step dalam satu baris horizontal pada desktop

3 STEP:
1. Ikon: 📋 | Judul: "Input Data Lab" | Deskripsi: "Masukkan data dari hasil pemeriksaan laboratorium rutin Anda seperti kadar glukosa, kolesterol, dan tekanan darah"
2. Ikon: 🤖 | Judul: "AI Menganalisis" | Deskripsi: "Model machine learning kami memproses data Anda dan menghitung skor risiko berdasarkan ribuan data medis"
3. Ikon: 📊 | Judul: "Lihat Hasil" | Deskripsi: "Dapatkan skor risiko lengkap, faktor kontribusi, dan rekomendasi tindakan yang personal untuk Anda"

PENGHUBUNG ANTAR STEP:
- Panah (→) animasi di antara step 1-2 dan step 2-3
- Panah menggunakan stroke-dasharray CSS animation: dash berjalan dari kiri ke kanan
- Warna panah: gradient biru ke cyan

ANIMASI STEP:
- Framer Motion whileInView
- Stagger: setiap step muncul dengan delay 200ms
- Animasi: fade in + translateY dari 50px
- Nomor step (1, 2, 3) muncul lebih dulu dari konten dengan delay lebih kecil

STYLE:
- Setiap step: card dengan background #111827, padding besar, border radius 20px
- Nomor step: lingkaran besar dengan gradient biru/cyan, font Syne bold
- Ikon di dalam lingkaran atau di atasnya
- Hover card: border berubah warna ke aksen
```

---

## Prompt 2.4 — Section Edukasi

```
Buatkan komponen Education di components/sections/Education.tsx dengan spesifikasi:

PROPS:
- activeTab: "diabetes" | "heart" — diterima dari parent (Landing Page)

LAYOUT:
- Full width section dengan id="edukasi", padding atas bawah 80px
- Judul section berubah sesuai activeTab:
  * Diabetes: "Kenali Lebih Dalam Tentang Diabetes"
  * Jantung: "Kenali Lebih Dalam Tentang Penyakit Jantung"
- Card grid 2x2 (4 card total)

KONTEN CARD DIABETES:
1. Ikon 🩸 | Judul: "Apa itu Diabetes?" | Konten: penjelasan singkat diabetes tipe 1, tipe 2, gestasional dalam 3-4 kalimat
2. Ikon ⚠️ | Judul: "Faktor Risiko" | Konten: daftar faktor risiko utama (obesitas, gaya hidup sedentari, genetik, usia di atas 45)
3. Ikon 🔍 | Judul: "Gejala Umum" | Konten: daftar gejala (sering haus, sering BAK, luka lambat sembuh, penglihatan kabur)
4. Ikon ✅ | Judul: "Cara Mencegah" | Konten: cara pencegahan (pola makan sehat, olahraga rutin, jaga berat badan, cek rutin)

KONTEN CARD JANTUNG:
1. Ikon ❤️ | Judul: "Apa itu Peny. Jantung?" | Konten: penjelasan singkat penyakit jantung koroner, aritmia dalam 3-4 kalimat
2. Ikon ⚠️ | Judul: "Faktor Risiko" | Konten: hipertensi, kolesterol tinggi, merokok, diabetes, stres kronis, obesitas
3. Ikon 🚨 | Judul: "Tanda Bahaya" | Konten: nyeri dada, sesak napas, jantung berdebar, pusing mendadak, kaki bengkak
4. Ikon ✅ | Judul: "Gaya Hidup Sehat" | Konten: diet DASH, olahraga aerobik 150 menit/minggu, berhenti merokok, kelola stres

ANIMASI:
- Transisi konten saat activeTab berubah: Framer Motion AnimatePresence fade
- Card masuk viewport: stagger fade in + translateY dengan delay 100ms
- Hover card: translateY -4px + box shadow lebih dalam + border warna aksen muncul
- Transisi hover: 0.25s ease

STYLE CARD:
- Background #111827, border radius 16px
- Ikon dalam box kecil dengan background semi-transparan sesuai warna aksen
- Judul font Syne semi-bold
- Konten font DM Sans, warna #94A3B8, line-height lega
```

---

## Prompt 2.5 — Section About

```
Buatkan komponen About di components/sections/About.tsx dengan spesifikasi:

PENTING: Tambahkan id="about" pada elemen <section> terluar

LAYOUT:
- Full width section, padding atas bawah 80px
- Judul section tengah: "Tentang HealthPredict.id"
- Terbagi menjadi beberapa sub-section

SUB-SECTION 1 — Tentang Proyek (full width):
- Teks paragraf 2-3 kalimat tentang misi HealthPredict.id
- Layout 2 kolom: teks di kiri, 4 stat card akurasi di kanan
- Stat card akurasi: Akurasi 89%, Precision 87%, Recall 91%, AUC-ROC 0.94

SUB-SECTION 2 — Metodologi & Dataset (grid 2 kolom):
- Kiri: Metodologi
  * Judul: "Metodologi Model"
  * Diagram alur sederhana: Data Input → Preprocessing → ML Model → Output
  * Teks penjelasan algoritma: Random Forest + XGBoost ensemble
- Kanan: Dataset
  * Judul: "Dataset yang Digunakan"
  * Tabel sederhana 3 kolom: Nama Dataset | Penyakit | Jumlah Data
  * Pima Indians Diabetes | Diabetes | 768 records
  * UCI Heart Disease | Jantung | 303 records
  * Framingham Heart Study | Jantung | 4240 records

SUB-SECTION 3 — Disclaimer (full width):
- Box dengan border kiri tebal warna kuning/amber
- Background rgba(245,158,11,0.05)
- Ikon ⚕️ di kiri
- Teks disclaimer lengkap bahwa ini bukan alat diagnosis medis

ANIMASI:
- Setiap sub-section muncul dengan Framer Motion whileInView
- Fade in + translateY 30px saat masuk viewport
```

---

## Prompt 2.6 — Section CTA Bottom & Rakitan Landing Page

```
BAGIAN A — Buatkan komponen CTA di components/sections/CTA.tsx:

- Full width section, padding atas bawah 80px
- Background: gradient gelap dengan dot grid pattern subtle (gunakan CSS radial-gradient untuk dot)
- Konten di tengah (text-center):
  * Badge: "Mulai Sekarang"
  * Headline besar font Syne: "Sudah Siap Cek Risiko Kesehatan Anda?"
  * Subtext: "Gratis, cepat, dan mudah. Hanya butuh data lab rutin."
  * Dua tombol side by side:
    - "🩸 Cek Diabetes" variant primary-diabetes → /predict/diabetes
    - "❤️ Cek Jantung" variant primary-heart → /predict/heart
- Animasi: Framer Motion whileInView, fade in + scale dari 0.95

---

BAGIAN B — Rakit semua section di app/page.tsx:

Susun komponen dalam urutan berikut:
1. Hero (dengan state activeTab)
2. Stats
3. HowItWorks
4. Education (terima props activeTab dari Hero)
5. About
6. CTA

Catatan penting:
- State activeTab harus di-lift up ke app/page.tsx agar bisa dishare antara Hero dan Education
- Hero menerima props: activeTab, setActiveTab
- Education menerima props: activeTab
- Semua section sudah include Navbar dan Footer dari layout.tsx
```

---

## Validasi Fase 2

```bash
npm run dev
```

Buka `http://localhost:3000` dan pastikan:
- [ ] Hero section tampil dengan tab switcher Diabetes/Jantung
- [ ] Transisi animasi antar tab berjalan smooth
- [ ] Posisi animasi: Diabetes (kiri) dan Jantung (kanan) sudah benar
- [ ] Section Statistik tampil dengan 4 card dan counter animasi berjalan
- [ ] Section Cara Kerja tampil dengan 3 step dan panah
- [ ] Section Edukasi berubah konten saat tab hero diganti
- [ ] Section About tampil lengkap dengan disclaimer box
- [ ] Section CTA tampil dengan dua tombol
- [ ] Smooth scroll ke #edukasi dan #about dari navbar berfungsi
- [ ] Tidak ada error di console browser

---

*Lanjut ke file `3-animasi-hero.md` setelah fase ini selesai.*
