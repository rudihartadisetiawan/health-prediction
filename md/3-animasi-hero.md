# Fase 3 — Animasi Hero Section (SVG Custom)

---

## Yang Sudah Siap

- ✅ SVG Animasi Diabetes — sel darah, molekul heksagonal, partikel berkedip
- ✅ SVG Animasi Jantung — jantung berdenyut, garis EKG berjalan, partikel merah
- ✅ Placeholder animasi di Hero.tsx dari Fase 2

---

## Prompt 3.1 — Buat Komponen DiabetesAnimation

```
Buatkan komponen React di components/animations/DiabetesAnimation.tsx
dengan mengkonversi SVG berikut menjadi komponen React yang valid:

KETENTUAN KONVERSI:
- Ganti semua atribut SVG ke format JSX (class → className, dll)
- Biarkan tag <style> tetap di dalam <svg>, jangan dipindahkan keluar
- Tambahkan props: width dan height dengan default "100%"
- Export sebagai default export
- Pastikan animasi CSS tetap berjalan setelah konversi

KODE SVG DIABETES (paste SVG kamu di sini):
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
  <defs>
    <filter id="outerGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur8" />
      <feGaussianBlur stdDeviation="15" result="blur15" />
      <feMerge>
        <feMergeNode in="blur15" />
        <feMergeNode in="blur8" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <filter id="lightGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur3" />
      <feMerge>
        <feMergeNode in="blur3" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <radialGradient id="bgGradient" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#1E293B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0A0F1E;stop-opacity:1" />
    </radialGradient>

    <style>
      /* Latar Belakang */
      .bg { fill: url(#bgGradient); }
      
      /* Partikel Latar Belakang */
      .particle { fill: #E0F2FE; opacity: 0.2; animation: moveParticles 20s linear infinite; }

      /* Sel Darah: Animasi Parallax & Mengambang */
      .cell-layer-far { animation: floatSlow 12s ease-in-out infinite alternate; opacity: 0.3; transform-origin: center; }
      .cell-layer-mid { animation: float 8s ease-in-out infinite alternate; opacity: 0.6; transform-origin: center; }
      .cell-layer-near { animation: floatFast 6s ease-in-out infinite alternate; opacity: 0.9; transform-origin: center; }
      
      /* Warna Sel */
      .cell-blue { fill: #3B82F6; }
      .cell-cyan { fill: #06B6D4; }
      .cell-white { fill: #E0F2FE; }
      
      /* Molekul: Animasi Berdenyut & Mengambang */
      .molecule-group { filter: url(#outerGlow); animation: pulseFloat 5s ease-in-out infinite alternate; transform-origin: center; transition: transform 0.3s ease; }
      .molecule-group:hover { transform: scale(1.1); cursor: pointer; } /* Interaksi hover */

      .bond { stroke: #67E8F9; stroke-width: 4; stroke-linecap: round; animation: strokeGlitch 10s infinite; }
      .atom { fill: #CFFAFE; filter: url(#lightGlow); }

      /* Keyframes Animasi */
      @keyframes moveParticles {
        0% { transform: translateY(0px); }
        100% { transform: translateY(600px); }
      }
      @keyframes floatSlow {
        0% { transform: translate(0px, 0px) rotate(0deg) scale(0.9); }
        100% { transform: translate(20px, -30px) rotate(5deg) scale(1.1); }
      }
      @keyframes float {
        0% { transform: translate(0px, 0px) rotate(0deg); }
        100% { transform: translate(25px, -40px) rotate(10deg); }
      }
      @keyframes floatFast {
        0% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
        100% { transform: translate(15px, -20px) rotate(-15deg) scale(1.05); }
      }
      @keyframes pulseFloat {
        0% { opacity: 0.8; transform: scale(1) translate(0, 0); }
        100% { opacity: 1; transform: scale(1.04) translate(0, -15px); }
      }
      @keyframes strokeGlitch {
        0%, 100% { stroke-opacity: 1; stroke-width: 4; }
        90% { stroke-opacity: 1; stroke-width: 4; }
        92% { stroke-opacity: 0.4; stroke-width: 1; }
        94% { stroke-opacity: 1; stroke-width: 5; }
        96% { stroke-opacity: 0.6; stroke-width: 2; }
      }
    </style>
  </defs>

  <rect width="100%" height="100%" class="bg" />

  <g class="particle-system">
    <circle cx="100" cy="50" r="1.5" class="particle" />
    <circle cx="300" cy="200" r="1" class="particle" style="animation-delay: -5s;" />
    <circle cx="500" cy="100" r="2" class="particle" style="animation-delay: -10s;" />
    <circle cx="700" cy="300" r="1.5" class="particle" style="animation-delay: -15s;" />
    <circle cx="900" cy="50" r="1" class="particle" />
    <circle cx="200" cy="400" r="1.5" class="particle" style="animation-delay: -2s;" />
    <circle cx="800" cy="500" r="2" class="particle" style="animation-delay: -8s;" />
  </g>

  <g class="cell-layer-far">
    <ellipse cx="150" cy="100" rx="35" ry="25" class="cell-blue" />
    <ellipse cx="850" cy="500" rx="40" ry="30" class="cell-cyan" />
    <circle cx="700" cy="150" r="25" class="cell-blue" />
  </g>

  <g class="molecule-group" transform="translate(500, 300)">
    <line x1="-50" y1="-30" x2="0" y2="-60" class="bond"/>
    <line x1="0" y1="-60" x2="50" y2="-30" class="bond"/>
    <line x1="50" y1="-30" x2="50" y2="30" class="bond"/>
    <line x1="50" y1="30" x2="0" y2="60" class="bond"/>
    <line x1="0" y1="60" x2="-50" y2="30" class="bond"/>
    <line x1="-50" y1="30" x2="-50" y2="-30" class="bond"/>
    
    <line x1="-50" y1="-30" x2="-80" y2="-50" class="bond"/>
    <line x1="50" y1="30" x2="80" y2="50" class="bond"/>

    <circle cx="0" cy="-60" r="12" class="atom" />
    <circle cx="50" cy="-30" r="12" class="atom" />
    <circle cx="50" cy="30" r="12" class="atom" />
    <circle cx="0" cy="60" r="12" class="atom" />
    <circle cx="-50" cy="30" r="12" class="atom" />
    <circle cx="-50" cy="-30" r="12" class="atom" />
    <circle cx="-80" cy="-50" r="10" class="atom" />
    <circle cx="80" cy="50" r="10" class="atom" />
  </g>

  <g class="cell-layer-mid">
    <circle cx="120" cy="250" r="22" class="cell-white" />
    <circle cx="880" cy="150" r="20" class="cell-white" />
    <ellipse cx="250" cy="420" rx="30" ry="20" class="cell-cyan" />
    <ellipse cx="650" cy="400" rx="35" ry="25" class="cell-blue" />
  </g>

  <g class="molecule-group" transform="translate(200, 150) scale(0.6)" style="animation-delay: 1s;">
    <line x1="-50" y1="-30" x2="0" y2="-60" class="bond"/>
    <line x1="0" y1="-60" x2="50" y2="-30" class="bond"/>
    <line x1="50" y1="-30" x2="-50" y2="-30" class="bond"/>
    <circle cx="0" cy="-60" r="15" class="atom" />
    <circle cx="50" cy="-30" r="15" class="atom" />
    <circle cx="-50" cy="-30" r="15" class="atom" />
  </g>
  
  <g class="molecule-group cell-layer-far" transform="translate(800, 100) scale(0.4)" style="animation-delay: 2s; opacity: 0.3;">
    <line x1="-50" y1="-30" x2="0" y2="-60" class="bond"/>
    <line x1="0" y1="-60" x2="50" y2="-30" class="bond"/>
    <line x1="50" y1="-30" x2="-50" y2="-30" class="bond"/>
    <circle cx="0" cy="-60" r="15" class="atom" />
    <circle cx="50" cy="-30" r="15" class="atom" />
    <circle cx="-50" cy="-30" r="15" class="atom" />
  </g>

  <g class="cell-layer-near">
    <ellipse cx="450" cy="500" rx="40" ry="30" class="cell-blue" />
    <circle cx="300" cy="200" r="20" class="cell-cyan" />
    <ellipse cx="750" cy="380" rx="30" ry="20" class="cell-cyan" />
  </g>
</svg>

Setelah selesai, pastikan komponen bisa digunakan seperti ini:
import DiabetesAnimation from '@/components/animations/DiabetesAnimation'
<DiabetesAnimation />
```

---

## Prompt 3.2 — Buat Komponen HeartAnimation

```
Buatkan komponen React di components/animations/HeartAnimation.tsx
dengan mengkonversi SVG berikut menjadi komponen React yang valid:

KETENTUAN KONVERSI:
- Ganti semua atribut SVG ke format JSX (class → className, dll)
- Biarkan tag <style> tetap di dalam <svg>, jangan dipindahkan keluar
- Tambahkan props: width dan height dengan default "100%"
- Export sebagai default export
- Pastikan animasi heartbeat dan ecgPulseFlow tetap berjalan

KODE SVG JANTUNG (paste SVG kamu di sini):
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <defs>
    <filter id="ecsGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="5" result="blur5" />
      <feGaussianBlur stdDeviation="10" result="blur10" />
      <feMerge>
        <feMergeNode in="blur10" />
        <feMergeNode in="blur5" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <radialGradient id="bgGradientHeart" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:#1E293B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0A0F1E;stop-opacity:1" />
    </radialGradient>

    <style>
      /* Latar Belakang */
      .bg-heart { fill: url(#bgGradientHeart); }
      
      /* Partikel Latar Belakang */
      .heart-particle { fill: #EF4444; opacity: 0.15; animation: moveParticlesHeart 15s linear infinite; }

      /* Ilustrasi Jantung: Animasi Berdenyut */
      .heart-shape { fill: #EF4444; animation: heartBeat 1.2s ease-in-out infinite; transform-origin: center; }
      
      /* Garis ECG: Animasi Aliran Pulsa Cahaya */
      .ecg-line { fill: none; stroke: #F59E0B; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; opacity: 0.3; }
      .ecg-pulse { fill: none; stroke: #FBBF24; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; filter: url(#ecsGlow);
                   stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: ecgPulseFlow 2.4s linear infinite; }

      /* Keyframes Animasi */
      @keyframes moveParticlesHeart {
        0% { transform: translateY(0px); }
        100% { transform: translateY(500px); }
      }
      @keyframes heartBeat {
        0%, 100% { transform: scale(1); }
        15% { transform: scale(1.08); }
        30% { transform: scale(1.02); }
        45% { transform: scale(1.1); }
        70% { transform: scale(1); }
      }
      @keyframes ecgPulseFlow {
        0% { stroke-dashoffset: 1000; }
        100% { stroke-dashoffset: 0; }
      }
    </style>
  </defs>

  <rect width="100%" height="100%" class="bg-heart" />

  <g class="particle-system-heart">
    <circle cx="150" cy="80" r="2" class="heart-particle" style="animation-delay: -2s;" />
    <circle cx="650" cy="120" r="1.5" class="heart-particle" style="animation-delay: -5s;" />
    <circle cx="400" cy="400" r="2.5" class="heart-particle" style="animation-delay: -10s;" />
    <circle cx="700" cy="350" r="1" class="heart-particle" style="animation-delay: -1s;" />
    <circle cx="100" cy="450" r="2" class="heart-particle" style="animation-delay: -8s;" />
  </g>

  <path d="M0,250 L100,250 L120,200 L140,300 L160,250 L250,250 L270,100 L290,400 L310,250 L400,250 L420,200 L440,300 L460,250 L550,250 L570,100 L590,400 L610,250 L700,250 L720,200 L740,300 L760,250 L800,250" class="ecg-line" />
  
  <path d="M0,250 L100,250 L120,200 L140,300 L160,250 L250,250 L270,100 L290,400 L310,250 L400,250 L420,200 L440,300 L460,250 L550,250 L570,100 L590,400 L610,250 L700,250 L720,200 L740,300 L760,250 L800,250" class="ecg-pulse" />

  <g transform="translate(400, 250)">
    <path d="M0,30 C-20,10 -50,10 -50,-20 C-50,-50 -20,-70 0,-90 C20,-70 50,-50 50,-20 C50,10 20,10 0,30 Z" class="heart-shape" />
  </g>
</svg>

Setelah selesai, pastikan komponen bisa digunakan seperti ini:
import HeartAnimation from '@/components/animations/HeartAnimation'
<HeartAnimation />
```

---

## Prompt 3.3 — Buat Wrapper Responsif

```
Buatkan komponen wrapper di components/animations/AnimationWrapper.tsx:

Props:
- children: React.ReactNode
- type: "diabetes" | "heart"

Spesifikasi:
- Ukuran desktop (lg ke atas): width 480px, height 400px
- Ukuran tablet (md): width 380px, height 320px
- Ukuran mobile (sm ke bawah): width 100%, height 260px, max-width 320px
- border-radius: 24px, overflow: hidden
- Efek glow sesuai type:
  * diabetes: box-shadow 0 0 60px rgba(59,130,246,0.2)
  * heart: box-shadow 0 0 60px rgba(239,68,68,0.2)

Contoh penggunaan:
<AnimationWrapper type="diabetes">
  <DiabetesAnimation />
</AnimationWrapper>
```

---

## Prompt 3.4 — Integrasi ke Hero.tsx

```
Update Hero.tsx yang sudah dibuat di Fase 2.
Ganti kedua placeholder div animasi dengan komponen SVG nyata.

Tambahkan import berikut (gunakan next/dynamic agar tidak error di SSR):

const DiabetesAnimation = dynamic(
  () => import('@/components/animations/DiabetesAnimation'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full rounded-3xl bg-[#1A2236] animate-pulse" />
  }
)

const HeartAnimation = dynamic(
  () => import('@/components/animations/HeartAnimation'),
  {
    ssr: false,
    loading: () => <div className="w-full h-full rounded-3xl bg-[#1A2236] animate-pulse" />
  }
)

import AnimationWrapper from '@/components/animations/AnimationWrapper'

Perubahan di dalam JSX:

1. Ganti placeholder [ Animasi Diabetes ] dengan:
<motion.div
  key="diabetes-anim"
  initial={{ x: -60, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: -60, opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <AnimationWrapper type="diabetes">
    <DiabetesAnimation />
  </AnimationWrapper>
</motion.div>

2. Ganti placeholder [ Animasi Jantung ] dengan:
<motion.div
  key="heart-anim"
  initial={{ x: 60, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: 60, opacity: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <AnimationWrapper type="heart">
    <HeartAnimation />
  </AnimationWrapper>
</motion.div>

3. Pastikan kedua motion.div berada di dalam AnimatePresence
4. Di mobile (< md): animasi tampil di atas teks, layout 1 kolom
```

---

## Prompt 3.5 — Optimasi Aksesibilitas & Performa

```
Tambahkan dua hal berikut pada kedua komponen animasi SVG:

1. prefers-reduced-motion — tambahkan di dalam tag <style> SVG:
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
}

2. will-change — tambahkan sebagai inline style pada elemen utama 
   yang beranimasi (elemen dengan class .molecule-group, .heart-shape, .ecg-pulse):
   style={{ willChange: 'transform' }}

Ini penting untuk:
- Aksesibilitas: pengguna yang sensitif terhadap animasi
- Performa: browser bisa mengoptimalkan rendering animasi
```

---

## Validasi Fase 3

```bash
npm run dev
```

Buka `http://localhost:3000` dan pastikan:

- [ ] Animasi diabetes muncul di **sisi kiri** saat tab Diabetes aktif
- [ ] Animasi jantung muncul di **sisi kanan** saat tab Jantung aktif
- [ ] Setiap sel darah bergerak **sendiri-sendiri** dengan timing berbeda
- [ ] Molekul glukosa berputar dan atom berdenyut berurutan
- [ ] Jantung berdenyut dengan ritme natural (dua ketukan per siklus)
- [ ] Garis EKG berjalan dari kiri ke kanan terus menerus
- [ ] Partikel titik berkedip secara random
- [ ] Animasi masuk/keluar saat tab berganti berjalan smooth
- [ ] Di mobile: animasi tampil di atas teks dengan ukuran sesuai layar
- [ ] Skeleton loading muncul sesaat sebelum animasi tampil
- [ ] Tidak ada console error terkait JSX atau hydration
- [ ] Tidak ada horizontal scroll akibat animasi

---

## Referensi Konversi Atribut SVG → JSX

Atribut SVG tidak sama dengan HTML. Berikut daftar yang sering keliru:

| Atribut SVG | Atribut JSX |
|---|---|
| `class` | `className` |
| `stroke-width` | `strokeWidth` |
| `stroke-linecap` | `strokeLinecap` |
| `stroke-linejoin` | `strokeLinejoin` |
| `stroke-dasharray` | `strokeDasharray` |
| `stroke-dashoffset` | `strokeDashoffset` |
| `stroke-opacity` | `strokeOpacity` |
| `fill-opacity` | `fillOpacity` |
| `stop-color` | `stopColor` |
| `stop-opacity` | `stopOpacity` |
| `clip-path` | `clipPath` |
| `transform-origin` | `transformOrigin` (di style) |
| `animation-delay` | `animationDelay` (di style) |

**Catatan penting:**
- Tag `<style>` di dalam SVG tetap menggunakan CSS biasa (bukan camelCase)
- Atribut `style` di JSX menggunakan objek: `style={{ fillOpacity: 0.5 }}`
- `transform-origin` di dalam CSS keyframes tetap ditulis dengan tanda hubung

---

*Lanjut ke file `4-halaman-prediksi.md` setelah fase ini selesai.*