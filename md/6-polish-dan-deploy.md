# Fase 6 — Polish & Deploy

> Fase terakhir — optimasi, perbaikan detail, dan deployment  
> Jalankan prompt-prompt ini di Claude CLI

---

## Prompt 6.1 — Responsif Mobile

```
Audit dan perbaiki responsivitas seluruh web untuk mobile dan tablet.
Lakukan perubahan di semua komponen yang diperlukan:

NAVBAR:
- Sembunyikan menu tengah di bawah breakpoint md (768px)
- Tampilkan ikon hamburger (☰) di kanan
- Saat hamburger diklik: mobile menu slide down dari atas
- Mobile menu berisi semua link navigasi dalam format vertikal
- Tambahkan tombol close (✕) di dalam mobile menu

HERO SECTION:
- Mobile (< 768px): layout 1 kolom, animasi di atas, teks di bawah
- Animasi mengecil: max-width 280px, centered
- Headline ukuran font lebih kecil (clamp)
- Dua tombol CTA stack vertikal di mobile

STATS SECTION:
- Mobile: grid 2 kolom
- Angka dan ikon lebih kecil

HOW IT WORKS:
- Mobile: 3 step tersusun vertikal bukan horizontal
- Panah berubah dari → menjadi ↓ (panah ke bawah)

EDUCATION CARDS:
- Mobile: grid 1 kolom
- Tablet: grid 2 kolom tetap

PREDICT PAGE:
- Mobile: sidebar hilang, layout jadi 1 kolom penuh
- Sidebar info bisa ditampilkan sebagai accordion yang bisa dibuka-tutup
- Form field full width

RESULT PANEL:
- Mobile: semua komponen 1 kolom
- Faktor kontribusi tetap bisa terbaca dengan baik

Gunakan Tailwind responsive prefix: sm:, md:, lg:, xl:
Pastikan tidak ada horizontal scroll di mobile.
```

---

## Prompt 6.2 — Loading States & Error Handling

```
Tambahkan loading states dan error handling yang baik di seluruh aplikasi:

1. Komponen LoadingSpinner di components/ui/LoadingSpinner.tsx:
   - Spinner animasi dengan warna sesuai type (diabetes/heart)
   - Teks "Menganalisis data Anda..." di bawah spinner
   - Overlay semi-transparan saat muncul di atas form

2. Komponen ErrorMessage di components/ui/ErrorMessage.tsx:
   - Box dengan background merah subtle
   - Ikon ⚠️ + teks error + tombol "Coba Lagi"
   - Animasi shake saat muncul (Framer Motion)

3. Update MultiStepForm untuk:
   - Tampilkan LoadingSpinner saat isLoading = true
   - Tampilkan ErrorMessage jika API call gagal
   - Tombol submit disabled saat loading

4. Tambahkan Skeleton loading di halaman utama:
   - Import komponen dengan next/dynamic dan ssr: false untuk section berat
   - Tampilkan skeleton placeholder saat komponen belum dimuat

5. Tambahkan 404 page di app/not-found.tsx:
   - Desain sesuai tema dark
   - Tombol "Kembali ke Beranda"
   - Animasi sederhana

6. Tambahkan error boundary di app/error.tsx:
   - Tampilkan pesan error yang user-friendly
   - Tombol "Refresh Halaman"
```

---

## Prompt 6.3 — Optimasi Performa

```
Lakukan optimasi performa pada frontend Next.js:

1. Lazy loading komponen berat:
   - Import animasi Lottie dengan dynamic import + loading: () => <div className="w-[450px] h-[450px]" />
   - Import komponen ResultPanel dengan dynamic import
   - Import komponen chart (recharts) dengan dynamic import

2. Optimasi gambar:
   - Pastikan semua gambar menggunakan next/image
   - Tambahkan width, height, dan loading="lazy" pada semua gambar

3. Optimasi bundle:
   - Jalankan: npx @next/bundle-analyzer
   - Identifikasi package yang terlalu besar
   - Pertimbangkan alternatif yang lebih ringan jika ada

4. Tambahkan loading.tsx per route:
   - app/loading.tsx → loading state halaman utama
   - app/predict/diabetes/loading.tsx → skeleton form
   - app/predict/heart/loading.tsx → skeleton form

5. Prefetch halaman prediksi:
   - Di komponen Navbar dan tombol CTA, tambahkan prefetch pada Link
   - Ini membuat halaman prediksi terasa lebih cepat saat dibuka
```

---

## Prompt 6.4 — SEO & Meta Tags

```
Tambahkan SEO yang proper di seluruh aplikasi:

1. Update app/layout.tsx dengan metadata global:
export const metadata: Metadata = {
  metadataBase: new URL('https://healthpredict.id'),
  title: {
    default: 'HealthPredict.id — Prediksi Risiko Diabetes & Jantung',
    template: '%s | HealthPredict.id'
  },
  description: 'Deteksi dini risiko diabetes dan penyakit jantung berbasis AI untuk masyarakat Indonesia. Gratis, cepat, dan akurat.',
  keywords: ['prediksi diabetes', 'prediksi penyakit jantung', 'deteksi dini', 'kesehatan indonesia', 'machine learning kesehatan'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://healthpredict.id',
    title: 'HealthPredict.id',
    description: 'Deteksi dini risiko diabetes dan penyakit jantung berbasis AI',
    siteName: 'HealthPredict.id',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthPredict.id',
    description: 'Deteksi dini risiko diabetes dan penyakit jantung berbasis AI',
  },
}

2. Tambahkan metadata spesifik di setiap halaman:
   - app/predict/diabetes/page.tsx: title "Prediksi Risiko Diabetes"
   - app/predict/heart/page.tsx: title "Prediksi Risiko Penyakit Jantung"

3. Buatkan app/sitemap.ts:
   - List semua URL halaman
   - Tambahkan lastModified, changeFrequency, priority

4. Buatkan app/robots.ts:
   - Allow semua crawler
   - Sertakan sitemap URL
```

---

## Prompt 6.5 — Final Polish Detail

```
Lakukan polish detail final pada seluruh web:

1. Konsistensi spacing:
   - Audit semua section, pastikan padding atas bawah konsisten (80px desktop, 48px mobile)
   - Pastikan gap antar elemen dalam card konsisten

2. Micro-interactions tambahan:
   - Tombol CTA: tambahkan efek ripple saat diklik
   - Input form: label float ke atas saat focused (floating label effect)
   - Saat hover kartu edukasi: ikon sedikit membesar (scale 1.1)

3. Scroll to top button:
   - Tombol bulat fixed di kanan bawah
   - Muncul setelah scroll 500px
   - Animasi masuk/keluar dengan Framer Motion
   - Klik: smooth scroll ke atas

4. Pastikan semua teks Bahasa Indonesia konsisten:
   - Cek semua label form, pesan error, tombol
   - Pastikan tidak ada teks hardcode dalam Bahasa Inggris yang terlihat user
   - Disclaimer medis tampil di tempat yang sesuai

5. Dark mode sudah default — pastikan tidak ada element dengan warna terlalu terang
   yang mengganggu tampilan dark theme.

6. Accessibility dasar:
   - Semua gambar memiliki alt text
   - Semua input form memiliki label yang terhubung
   - Tombol memiliki aria-label yang deskriptif
   - Fokus keyboard terlihat (focus ring)
```

---

## Prompt 6.6 — Deploy Frontend ke Vercel

```
Persiapkan dan deploy frontend ke Vercel:

1. Buat file vercel.json di root frontend:
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}

2. Update next.config.js:
   - Tambahkan konfigurasi untuk production
   - Set output: 'standalone' untuk optimasi deployment
   - Tambahkan domain yang diizinkan di images configuration

3. Buat .env.production dengan:
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
   (URL backend akan diisi setelah backend di-deploy)

4. Pastikan build berhasil terlebih dahulu:
   npm run build
   
   Jika ada error TypeScript atau ESLint: perbaiki semua error
   
5. Langkah deploy:
   - Push code ke GitHub repository
   - Buka vercel.com → Import Project → pilih repository
   - Set Environment Variables: NEXT_PUBLIC_API_URL
   - Deploy

6. Setelah deploy, test semua fitur di URL Vercel yang diberikan.
```

---

## Prompt 6.7 — Deploy Backend ke Railway

```
Persiapkan dan deploy backend Express.js ke Railway:

1. Buat file Procfile di root backend:
   web: node dist/index.js

2. Pastikan package.json memiliki script:
   "build": "tsc"
   "start": "node dist/index.js"

3. Update src/index.ts:
   - PORT harus dari process.env.PORT (Railway set ini otomatis)
   - CORS origin harus dari process.env.FRONTEND_URL (bukan hardcode localhost)

4. Buat .env.example lengkap:
   PORT=5000
   FRONTEND_URL=https://your-app.vercel.app
   HUGGINGFACE_API_KEY=hf_xxxxx
   NODE_ENV=production

5. Pastikan build TypeScript berhasil:
   npm run build
   
6. Langkah deploy ke Railway:
   - Push code ke GitHub repository terpisah
   - Buka railway.app → New Project → Deploy from GitHub
   - Pilih repository backend
   - Set Environment Variables di Railway dashboard:
     * FRONTEND_URL → URL Vercel frontend
     * HUGGINGFACE_API_KEY → API key dari huggingface.co
     * NODE_ENV → production
   - Railway otomatis detect Node.js dan deploy

7. Setelah Railway deploy:
   - Copy URL backend dari Railway dashboard
   - Update NEXT_PUBLIC_API_URL di Vercel environment variables
   - Redeploy frontend di Vercel

8. Test endpoint production:
   curl https://your-backend.railway.app/health
```

---

## Checklist Final Sebelum Launch

```bash
# Test build production lokal
npm run build && npm start
```

**Fungsional:**
- [ ] Semua halaman bisa diakses tanpa error
- [ ] Form prediksi diabetes berjalan end-to-end
- [ ] Form prediksi jantung berjalan end-to-end
- [ ] Hasil prediksi tampil dengan benar
- [ ] Animasi hero berjalan di kedua tab
- [ ] Smooth scroll ke section About dan Edukasi berfungsi
- [ ] Semua tombol CTA mengarah ke halaman yang benar

**Tampilan:**
- [ ] Responsif di mobile (375px), tablet (768px), desktop (1280px)
- [ ] Tidak ada horizontal scroll di ukuran apapun
- [ ] Animasi berjalan smooth tanpa jank
- [ ] Dark theme konsisten di seluruh halaman
- [ ] Font Syne dan DM Sans ter-load dengan benar

**Production:**
- [ ] Frontend live di Vercel
- [ ] Backend live di Railway
- [ ] Frontend berhasil terhubung ke backend
- [ ] Environment variables terset dengan benar
- [ ] Tidak ada URL localhost yang tertinggal di production

---

## Selamat! 🎉

Web HealthPredict.id sudah siap. Beberapa ide pengembangan selanjutnya:

- **Autentikasi** — Login/register agar user bisa menyimpan riwayat prediksi
- **Export PDF** — Hasil prediksi bisa didownload sebagai PDF
- **Multi-bahasa** — Tambahkan dukungan bahasa Inggris
- **Model lebih akurat** — Train model sendiri dengan dataset yang lebih besar
- **Claude API** — Integrasikan Claude untuk penjelasan hasil yang lebih personal dan natural
