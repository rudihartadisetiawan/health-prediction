# Fase 4 — Halaman Prediksi

> Pastikan Fase 1, 2, dan 3 sudah selesai  
> Jalankan prompt-prompt ini secara berurutan di Claude CLI

---

## Prompt 4.1 — Tipe Data & Konstanta

```
Buatkan file lib/types.ts dan lib/constants.ts:

FILE lib/types.ts — definisikan semua TypeScript types:

export type PredictType = "diabetes" | "heart"
export type RiskLevel = "low" | "medium" | "high"

export interface DiabetesFormData {
  age: number
  gender: "male" | "female"
  weight: number
  height: number
  bmi?: number // auto-calculated
  glucose: number
  bloodPressure: number
  insulin?: number
  pregnancies?: number
  familyHistory: "yes" | "no"
  physicalActivity: "rarely" | "sometimes" | "often"
}

export interface HeartFormData {
  age: number
  gender: "male" | "female"
  weight: number
  height: number
  bmi?: number
  cholesterol: number
  systolicBP: number
  maxHeartRate: number
  fastingBS: "yes" | "no"
  chestPainType: "none" | "atypical" | "typical"
  smoking: "never" | "former" | "current"
  familyHistory: "yes" | "no"
}

export interface PredictionResult {
  score: number // 0-100
  riskLevel: RiskLevel
  factors: Array<{
    name: string
    value: number // 0-100 kontribusi
    color: string
  }>
  recommendations: string[]
  explanation: string
}

---

FILE lib/constants.ts — definisikan konten per tipe prediksi:

export const PREDICT_CONFIG = {
  diabetes: {
    title: "Prediksi Risiko Diabetes",
    description: "Masukkan data laboratorium Anda untuk mengetahui tingkat risiko diabetes",
    color: { primary: "#3B82F6", secondary: "#06B6D4" },
    gradient: "from-blue-600 to-cyan-500",
    icon: "🩸",
    parameters: ["Kadar Glukosa", "BMI", "Tekanan Darah", "Insulin", "Riwayat Keluarga"],
  },
  heart: {
    title: "Prediksi Risiko Penyakit Jantung",
    description: "Masukkan data laboratorium Anda untuk mengetahui tingkat risiko penyakit jantung",
    color: { primary: "#EF4444", secondary: "#F59E0B" },
    gradient: "from-red-500 to-amber-500",
    icon: "❤️",
    parameters: ["Kolesterol", "Tekanan Darah", "Detak Jantung Maks", "Gula Darah Puasa", "Nyeri Dada"],
  },
}

export const RISK_CONFIG = {
  low: { label: "Risiko Rendah", color: "#10B981", bg: "rgba(16,185,129,0.1)", icon: "✅" },
  medium: { label: "Risiko Sedang", color: "#F59E0B", bg: "rgba(245,158,11,0.1)", icon: "⚠️" },
  high: { label: "Risiko Tinggi", color: "#EF4444", bg: "rgba(239,68,68,0.1)", icon: "🔴" },
}
```

---

## Prompt 4.2 — Fungsi Scoring Sementara

```
Buatkan file lib/scoring.ts yang berisi fungsi prediksi rule-based sementara
(akan diganti dengan API call ke backend nanti):

import { DiabetesFormData, HeartFormData, PredictionResult } from './types'

export function calculateBMI(weight: number, height: number): number {
  // height dalam cm, weight dalam kg
  const heightM = height / 100
  return Math.round((weight / (heightM * heightM)) * 10) / 10
}

export function predictDiabetes(data: DiabetesFormData): PredictionResult {
  let score = 0
  
  // Logika scoring berdasarkan faktor risiko klinis:
  // Glukosa: > 126 = +30, 100-126 = +15, normal = +0
  // BMI: > 30 = +20, 25-30 = +10, normal = +0
  // Usia: > 50 = +15, 35-50 = +8, < 35 = +0
  // Tekanan darah diastolik: > 90 = +15, 80-90 = +5
  // Insulin: > 200 = +10
  // Riwayat keluarga: yes = +15
  // Kehamilan > 5: +5
  
  // Implementasikan logika di atas
  // Clamp score antara 0-95
  // Return riskLevel: score < 30 = low, 30-60 = medium, > 60 = high
  
  // Factors array harus berisi kontribusi tiap faktor dalam persentase
  // Recommendations berisi 3-4 saran sesuai riskLevel
  // Explanation berisi paragraf penjelasan singkat hasil
}

export function predictHeart(data: HeartFormData): PredictionResult {
  // Logika serupa untuk jantung:
  // Kolesterol: > 240 = +25, 200-240 = +12
  // Usia: > 60 = +20, 45-60 = +10
  // Tekanan darah sistolik: > 140 = +20, 120-140 = +8
  // Max HR rendah (< 120): +15
  // Nyeri dada tipikal: +15
  // Merokok: +10
  // Gula darah tinggi: +10
  // Riwayat keluarga: +10
  
  // Implementasikan, clamp 0-95, return PredictionResult
}
```

---

## Prompt 4.3 — Komponen Progress Bar

```
Buatkan komponen ProgressBar di components/predict/ProgressBar.tsx:

Props:
- currentStep: number (1, 2, atau 3)
- totalSteps: number (3)
- steps: Array<{ label: string }>

Tampilan:
- 3 lingkaran step di atas dihubungkan garis horizontal
- Step yang sudah selesai: lingkaran terisi warna aksen + checkmark
- Step aktif: lingkaran dengan border tebal + nomor
- Step belum: lingkaran abu-abu + nomor
- Label teks di bawah setiap lingkaran
- Garis penghubung: terisi warna aksen sesuai progress

Animasi:
- Saat step bertambah: garis penghubung animate width dari 0% ke 100%
- Lingkaran step yang baru aktif: scale bounce 0.8 → 1.1 → 1
- Framer Motion untuk semua transisi

Warna: sesuaikan dengan props type (diabetes=biru, jantung=merah) — terima props type: PredictType
```

---

## Prompt 4.4 — Form Step Components

```
Buatkan 3 komponen step form yang digunakan bersama untuk diabetes dan jantung.
Simpan di components/predict/steps/

1. StepBasicData.tsx — Data Dasar (sama untuk diabetes dan jantung)
Props: register, errors (dari react-hook-form), watch
Fields:
- Usia: input number, min 1, max 120, required
- Jenis Kelamin: radio button (Laki-laki / Perempuan)
- Berat Badan: input number dengan satuan "kg", min 20, max 300
- Tinggi Badan: input number dengan satuan "cm", min 50, max 250
- BMI: field read-only yang auto-hitung dari BB/TB menggunakan watch
  * Tampilkan label kategori: Kurus/Normal/Gemuk/Obesitas

2. StepLabDiabetes.tsx — Data Lab khusus Diabetes
Props: register, errors
Fields:
- Kadar Glukosa Puasa: input number, satuan "mg/dL", dengan tooltip "Nilai normal: 70-99 mg/dL"
- Tekanan Darah Diastolik: input number, satuan "mmHg", tooltip "Nilai normal: 60-80 mmHg"
- Kadar Insulin: input number, satuan "μU/mL", optional, tooltip "Opsional jika tersedia"

3. StepLabHeart.tsx — Data Lab khusus Jantung
Props: register, errors
Fields:
- Kolesterol Total: input number, satuan "mg/dL", tooltip "Nilai normal: < 200 mg/dL"
- Tekanan Darah Sistolik: input number, satuan "mmHg", tooltip "Nilai normal: 90-120 mmHg"
- Detak Jantung Maks: input number, satuan "bpm", tooltip "Nilai normal saat istirahat: 60-100 bpm"
- Gula Darah Puasa > 120 mg/dL: select (Ya/Tidak)
- Tipe Nyeri Dada: select (Tidak ada / Atipikal / Tipikal Angina)

4. StepHistoryDiabetes.tsx — Riwayat & Gaya Hidup Diabetes
Fields:
- Riwayat Diabetes Keluarga: select (Tidak ada / Ada - orang tua / Ada - saudara kandung)
- Jumlah Kehamilan: input number, hanya muncul jika gender = "female"
- Aktivitas Fisik: select (Jarang < 1x seminggu / Kadang 1-3x seminggu / Sering > 3x seminggu)

5. StepHistoryHeart.tsx — Riwayat & Gaya Hidup Jantung
Fields:
- Status Merokok: select (Tidak pernah / Pernah, sudah berhenti / Masih merokok)
- Riwayat Penyakit Jantung Keluarga: select (Tidak ada / Ada)
- Aktivitas Fisik: select (Jarang / Kadang / Sering)

STYLE semua step:
- Background #111827, border radius 16px, padding 32px
- Label input: font kecil, uppercase, letter-spacing lebar, warna muted
- Input field: background #1A2236, border subtle, focus ring warna aksen
- Error message: teks merah kecil di bawah field
- Tooltip: ikon "?" kecil di sebelah label, muncul teks saat hover
```

---

## Prompt 4.5 — Komponen MultiStepForm

```
Buatkan komponen MultiStepForm di components/predict/MultiStepForm.tsx:

Props:
- type: PredictType ("diabetes" | "heart")
- onSubmit: (result: PredictionResult) => void

State internal:
- currentStep: 1 | 2 | 3
- isLoading: boolean

Setup react-hook-form:
- useForm dengan mode: "onChange"
- Validasi wajib pada semua field required

STRUKTUR FORM:
- ProgressBar di atas (terima props currentStep, totalSteps=3, steps)
- Area konten step di tengah dengan Framer Motion AnimatePresence
- Navigasi di bawah: tombol "Kembali" (kiri) + tombol "Lanjut"/"Prediksi" (kanan)

STEP MAPPING:
- Step 1: StepBasicData (sama untuk keduanya)
- Step 2: StepLabDiabetes ATAU StepLabHeart sesuai props type
- Step 3: StepHistoryDiabetes ATAU StepHistoryHeart sesuai props type

NAVIGASI:
- Tombol "Lanjut": validasi field step saat ini dulu sebelum lanjut
  * Jika ada error: jangan lanjut, tampilkan error
  * Jika valid: animasi slide ke step berikutnya
- Tombol "Kembali": kembali ke step sebelumnya, step 1 tidak ada tombol kembali
- Tombol di step 3 berubah jadi "Prediksi Sekarang" dengan ikon loading

ANIMASI ANTAR STEP:
- Framer Motion AnimatePresence mode="wait"
- Step lama: slide keluar ke kiri + fade out
- Step baru: slide masuk dari kanan + fade in
- Durasi: 300ms

SUBMIT:
- Saat submit di step 3:
  1. Set isLoading = true
  2. Hitung BMI dari BB/TB
  3. Panggil fungsi predictDiabetes atau predictHeart dari lib/scoring.ts
  4. Simulasikan loading 1.5 detik (setTimeout) — akan diganti API call nanti
  5. Panggil props.onSubmit(result)
  6. Set isLoading = false
```

---

## Prompt 4.6 — Komponen ResultPanel

```
Buatkan komponen ResultPanel di components/predict/ResultPanel.tsx:

Props:
- result: PredictionResult
- type: PredictType
- onReset: () => void

LAYOUT (dari atas ke bawah):

1. RISK HEADER
- Background sesuai riskLevel (low=hijau, medium=amber, high=merah) dengan opacity 10%
- Border sesuai warna
- Ikon besar (✅/⚠️/🔴) + label risiko bold besar + skor persentase
- Teks sub: saran singkat sesuai level

2. GAUGE BAR
- Label "Tingkat Risiko" kecil di atas
- Progress bar dengan fill warna sesuai risiko
- Animasi: width dari 0 ke nilai score, durasi 1.2 detik, easing ease-out
- Gunakan Framer Motion motion.div untuk animasi width
- Ticks di bawah: "Rendah", "Sedang", "Tinggi"

3. FAKTOR KONTRIBUSI
- Judul section "Faktor yang Mempengaruhi"
- Loop factors dari result.factors
- Setiap faktor: nama (kiri) + bar horizontal + persentase (kanan)
- Bar menggunakan warna dari factor.color
- Animasi stagger: setiap bar muncul dengan delay 100ms + animasi width

4. PENJELASAN
- Judul "Penjelasan Hasil"
- Paragraf result.explanation
- Background #1A2236, border radius, padding

5. REKOMENDASI
- Judul "Rekomendasi Tindakan"
- Loop result.recommendations
- Setiap item: dot berwarna + teks
- Dot warna sesuai riskLevel

6. TOMBOL AKSI
- "Coba Lagi" → panggil onReset
- "Konsultasi ke Dokter" → link eksternal ke google maps "dokter terdekat"

ANIMASI KESELURUHAN:
- Panel muncul dengan Framer Motion: opacity 0→1, translateY 30→0, delay 0.3s
- Setiap section dalam panel muncul dengan stagger
```

---

## Prompt 4.7 — Komponen PredictPage & Halaman

```
BAGIAN A — Buatkan komponen PredictPage di components/predict/PredictPage.tsx:

Props: type: PredictType

State:
- result: PredictionResult | null (null = tampilkan form, ada nilai = tampilkan hasil)
- Saat onSubmit dipanggil, set result dan scroll ke panel hasil

LAYOUT 2 KOLOM:
Kiri — Sidebar Info (40%), sticky saat scroll:
- Ikon + judul prediksi sesuai type (dari PREDICT_CONFIG)
- Deskripsi singkat
- Judul "Parameter yang Dibutuhkan"
- List parameter (dari PREDICT_CONFIG[type].parameters)
- Tips singkat cara mendapatkan nilai lab
- Box disclaimer kecil

Kanan — Konten Utama (60%):
- Jika result = null: tampilkan MultiStepForm
- Jika result ada: tampilkan ResultPanel
- Transisi antara form dan hasil: Framer Motion AnimatePresence fade

---

BAGIAN B — Buatkan dua halaman Next.js:

1. app/predict/diabetes/page.tsx:
import PredictPage from '@/components/predict/PredictPage'
export default function DiabetesPage() {
  return <PredictPage type="diabetes" />
}

2. app/predict/heart/page.tsx:
import PredictPage from '@/components/predict/PredictPage'
export default function HeartPage() {
  return <PredictPage type="heart" />
}

Pastikan kedua halaman memiliki:
- metadata (title dan description) yang sesuai
- Warna background halaman menyesuaikan type
```

---

## Validasi Fase 4

```bash
npm run dev
```

Test halaman prediksi di `http://localhost:3000/predict/diabetes` dan `/predict/heart`:
- [ ] Layout 2 kolom tampil dengan benar (sidebar + form)
- [ ] Progress bar muncul dengan 3 step
- [ ] Step 1 form data dasar tampil, BMI auto-hitung saat isi BB dan TB
- [ ] Tombol Lanjut hanya berfungsi jika field valid
- [ ] Animasi slide saat berpindah step berjalan
- [ ] Step 2 dan 3 berbeda konten antara diabetes dan jantung
- [ ] Setelah submit: loading tampil 1.5 detik
- [ ] Panel hasil muncul dengan skor, gauge, faktor, dan rekomendasi
- [ ] Animasi gauge bar berjalan smooth dari 0 ke nilai
- [ ] Tombol "Coba Lagi" mereset form kembali ke step 1
- [ ] Tidak ada TypeScript error

---

*Lanjut ke file `5-backend-dan-model.md` setelah fase ini selesai.*
