# Fase 1 — Setup Project & Komponen Global

> Jalankan prompt-prompt ini secara berurutan di Claude CLI  
> Pastikan setiap prompt selesai dan tidak ada error sebelum lanjut ke prompt berikutnya

---

---

## Prompt 1.1 — Inisialisasi Project

```
Buatkan setup project Next.js 14 dengan konfigurasi berikut:

Framework: Next.js 14 App Router dengan TypeScript
Styling: Tailwind CSS
Direktori yang harus dibuat:
- app/
- app/predict/diabetes/
- app/predict/heart/
- app/api/predict/
- components/layout/
- components/ui/
- components/sections/
- components/predict/
- lib/
- public/animations/

Install semua dependencies berikut sekaligus:
- framer-motion
- lottie-react
- react-hook-form
- recharts
- react-countup
- axios

Setelah selesai, tampilkan struktur folder lengkap yang sudah dibuat.
```

---

## Prompt 1.2 — Konfigurasi Tailwind & Font

```
Lakukan konfigurasi berikut:

1. Update tailwind.config.ts untuk menambahkan custom colors:
   - primary: #0A0F1E
   - surface: #111827
   - surface2: #1A2236
   - accent-blue: #3B82F6
   - accent-cyan: #06B6D4
   - accent-red: #EF4444
   - accent-amber: #F59E0B
   - risk-low: #10B981
   - risk-medium: #F59E0B
   - risk-high: #EF4444

2. Update app/layout.tsx untuk import Google Fonts:
   - Syne (weight 400, 600, 700, 800) sebagai font display
   - DM Sans (weight 300, 400, 500) sebagai font body
   - Terapkan kedua font sebagai CSS variable: --font-syne dan --font-dm-sans

3. Update globals.css dengan:
   - CSS variable warna sesuai palet di atas
   - Background default #0A0F1E
   - Warna teks default #F1F5F9
   - Smooth scroll behavior pada html element
```

---

## Prompt 1.3 — Komponen UI Dasar

```
Buatkan komponen UI reusable di folder components/ui/ berikut:

1. Button.tsx
   - Variant: primary-diabetes (gradient #3B82F6 ke #06B6D4)
   - Variant: primary-heart (gradient #EF4444 ke #F59E0B)
   - Variant: outline (border subtle, background transparan)
   - Variant: ghost (tanpa border, tanpa background)
   - Size: sm, md, lg
   - Hover effect: translateY -2px + box shadow glow sesuai variant
   - Transition: all 0.25s ease
   - Terima props: variant, size, children, onClick, href, disabled

2. Badge.tsx
   - Pill shape, rounded-full
   - Variant: cyan, red, green, amber
   - Ada dot kecil di kiri yang berpulse (CSS animation)
   - Ukuran teks kecil, letter-spacing lebar

3. Card.tsx
   - Background #111827
   - Border 1px solid rgba(255,255,255,0.07)
   - Border radius 16px
   - Hover: translateY -4px + shadow lebih dalam
   - Transition: all 0.25s ease
   - Terima props: children, className, onClick
```

---

## Prompt 1.4 — Komponen Navbar

```
Buatkan komponen Navbar di components/layout/Navbar.tsx dengan spesifikasi lengkap:

Struktur:
- Logo di kiri: teks "HealthPredict" + ".id" (warna cyan #06B6D4) + dot kecil cyan bersinar di sebelah kiri logo
- Menu navigasi di tengah: Beranda, Prediksi, Edukasi, Tentang
- Tombol CTA di kanan: "Mulai Prediksi" style Button variant primary-diabetes

Behavior:
- Position: fixed top-0, z-index 50, width full
- Default: background transparan
- Setelah scroll 50px: background rgba(10,15,30,0.8) dengan backdrop-blur-md dan border-bottom subtle
- Gunakan useEffect + addEventListener scroll untuk detect scroll position

Menu Prediksi (dropdown):
- Muncul saat onMouseEnter, hilang saat onMouseLeave dengan delay 200ms
- Animasi Framer Motion: opacity 0→1, translateY -8px→0, durasi 200ms
- Isi dropdown: 
  * "🩸 Prediksi Diabetes" → link ke /predict/diabetes
  * "❤️ Prediksi Jantung" → link ke /predict/heart

Menu Tentang:
- Bukan link pindah halaman, tapi smooth scroll ke #about
- Gunakan onClick dengan window.scrollTo atau document.getElementById

Active state:
- Deteksi halaman aktif menggunakan usePathname dari next/navigation
- Halaman aktif: underline animated menggunakan CSS after pseudo-element

Mobile:
- Sembunyikan menu tengah di bawah md breakpoint
- Tampilkan hamburger icon, implementasikan mobile menu sederhana
```

---

## Prompt 1.5 — Komponen Footer

```
Buatkan komponen Footer di components/layout/Footer.tsx dengan spesifikasi:

Layout: 4 kolom pada desktop, 2 kolom pada tablet, 1 kolom pada mobile
Background: #0A0F1E dengan border-top 1px solid rgba(255,255,255,0.07)
Padding: atas bawah 48px

Kolom 1 - Logo & Tagline:
- Logo sama dengan Navbar
- Tagline: "Deteksi dini untuk hidup lebih sehat"
- Copyright: "© 2025 HealthPredict.id"

Kolom 2 - Navigasi:
- Judul: "Navigasi"
- Link: Beranda (/), Prediksi Diabetes (/predict/diabetes), Prediksi Jantung (/predict/heart), Tentang (#about)

Kolom 3 - Disclaimer:
- Judul: "Disclaimer Medis"
- Teks singkat tentang hasil prediksi bersifat informatif bukan diagnosis medis
- Warna teks lebih muted (#64748B)

Kolom 4 - Teknologi:
- Judul: "Dibangun dengan"
- List: Next.js, Express.js, Machine Learning, Claude AI

Semua teks menggunakan font DM Sans, ukuran kecil.
```

---

## Prompt 1.6 — Root Layout

```
Update file app/layout.tsx sebagai root layout dengan:

- Import dan gunakan komponen Navbar dan Footer
- Navbar dirender di atas semua konten halaman
- Footer dirender di bawah semua konten halaman
- Background body: #0A0F1E
- Terapkan font Syne dan DM Sans dari Google Fonts via next/font
- Meta tags SEO dasar:
  * title: "HealthPredict.id — Prediksi Risiko Diabetes & Jantung"
  * description: "Deteksi dini risiko diabetes dan penyakit jantung berbasis AI untuk masyarakat Indonesia"
  * og:title dan og:description yang sama
- Pastikan halaman memiliki min-height 100vh
```

---

## Validasi Fase 1

Setelah semua prompt selesai, jalankan perintah ini untuk memastikan tidak ada error:

```bash
npm run dev
```

Kemudian buka `http://localhost:3000` dan pastikan:
- [ ] Halaman terbuka tanpa error
- [ ] Navbar muncul dengan logo, menu, dan tombol CTA
- [ ] Footer muncul di bawah halaman
- [ ] Scroll behavior navbar bekerja (background berubah)
- [ ] Font Syne dan DM Sans sudah teraplikasi
- [ ] Warna background dark navy sudah benar

---

*Lanjut ke file `2-landing-page-sections.md` setelah fase ini selesai.*
