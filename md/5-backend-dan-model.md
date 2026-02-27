# Fase 5 — Backend Express.js & Integrasi Model ML

> Pastikan Fase 1–4 sudah selesai dan frontend berjalan dengan baik  
> Fase ini dikerjakan di folder terpisah dari frontend

---

## Persiapan Backend

```bash
# Buat folder backend terpisah dari frontend
mkdir healthpredict-api && cd healthpredict-api

# Jalankan Claude CLI di folder ini
claude
```

---

## Prompt 5.1 — Setup Project Express.js

```
Buatkan setup project Express.js dengan TypeScript untuk backend API prediksi penyakit.

Inisialisasi project dengan:
- npm init -y
- TypeScript dengan konfigurasi strict
- Folder structure:
  * src/
  * src/routes/
  * src/controllers/
  * src/middleware/
  * src/services/
  * src/types/
  * src/utils/

Install dependencies:
- express
- cors
- helmet
- dotenv
- axios
- express-validator
- morgan (logging)

Install devDependencies:
- typescript
- @types/express
- @types/cors
- @types/node
- ts-node-dev
- @types/morgan

Buatkan tsconfig.json dengan konfigurasi yang sesuai.

Buatkan scripts di package.json:
- "dev": "ts-node-dev --respawn src/index.ts"
- "build": "tsc"
- "start": "node dist/index.js"

Buatkan file .env.example:
PORT=5000
FRONTEND_URL=http://localhost:3000
HUGGINGFACE_API_KEY=your_key_here
MODEL_DIABETES_URL=https://api-inference.huggingface.co/models/...
MODEL_HEART_URL=https://api-inference.huggingface.co/models/...
```

---

## Prompt 5.2 — Server Utama & Middleware

```
Buatkan file src/index.ts sebagai entry point server:

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

Middleware yang harus dipasang (urutan penting):
1. helmet() — security headers
2. cors({
     origin: process.env.FRONTEND_URL,
     methods: ['GET', 'POST'],
     credentials: true
   })
3. express.json({ limit: '10kb' })
4. morgan('dev') — logging di development

Routes:
- GET /health → response: { status: 'ok', timestamp: new Date() }
- POST /api/predict/diabetes → diabetesRouter
- POST /api/predict/heart → heartRouter

Error handler global di bagian paling bawah:
- Catch semua error yang lolos dari route handler
- Response format: { success: false, message: string, errors?: any }
- Status 500 untuk server error

Listen pada PORT dan log pesan server running.
```

---

## Prompt 5.3 — Types & Validation Schemas

```
Buatkan file src/types/predict.types.ts:

Definisikan interface yang sama dengan frontend:
- DiabetesInput (semua field form diabetes)
- HeartInput (semua field form jantung)
- PredictionResult (skor, riskLevel, factors, recommendations, explanation)
- ApiResponse<T> (wrapper untuk semua response API)

---

Buatkan file src/middleware/validation.ts menggunakan express-validator:

1. validateDiabetesInput — array of validation rules:
   - age: isInt({ min: 1, max: 120 }), required
   - gender: isIn(['male', 'female']), required
   - weight: isFloat({ min: 20, max: 300 }), required
   - height: isFloat({ min: 50, max: 250 }), required
   - glucose: isFloat({ min: 0, max: 600 }), required
   - bloodPressure: isFloat({ min: 0, max: 200 }), required
   - insulin: isFloat({ min: 0, max: 1000 }), optional
   - pregnancies: isInt({ min: 0, max: 20 }), optional
   - familyHistory: isIn(['yes', 'no']), required
   - physicalActivity: isIn(['rarely', 'sometimes', 'often']), required

2. validateHeartInput — validation rules untuk:
   - age, gender, weight, height (sama)
   - cholesterol: isFloat({ min: 0, max: 600 })
   - systolicBP: isFloat({ min: 0, max: 300 })
   - maxHeartRate: isFloat({ min: 0, max: 300 })
   - fastingBS: isIn(['yes', 'no'])
   - chestPainType: isIn(['none', 'atypical', 'typical'])
   - smoking: isIn(['never', 'former', 'current'])
   - familyHistory: isIn(['yes', 'no'])

3. handleValidationErrors — middleware yang mengecek hasil validasi
   Jika ada error: return status 400 dengan list error
   Jika tidak ada: next()
```

---

## Prompt 5.4 — Service Layer (Rule-Based Sementara)

```
Buatkan file src/services/scoring.service.ts sebagai fallback rule-based scoring:

Ini adalah versi sementara yang akan digunakan jika Hugging Face API tidak tersedia.
Logika scoring sama persis dengan yang sudah dibuat di frontend (lib/scoring.ts).

Export dua fungsi:
- calculateDiabetesRisk(input: DiabetesInput): PredictionResult
- calculateHeartRisk(input: HeartInput): PredictionResult

Setiap fungsi harus return PredictionResult lengkap:
- score: 0-100
- riskLevel: "low" | "medium" | "high"
- factors: array faktor kontribusi dengan nama, nilai, dan warna
- recommendations: array 3-4 rekomendasi sesuai riskLevel dalam Bahasa Indonesia
- explanation: paragraf penjelasan dalam Bahasa Indonesia

Rekomendasi untuk diabetes riskLevel low:
- "Pertahankan pola makan sehat dengan mengurangi konsumsi gula dan karbohidrat sederhana"
- "Olahraga rutin minimal 30 menit per hari, 5 kali seminggu"
- "Lakukan pemeriksaan gula darah setahun sekali sebagai langkah preventif"

Rekomendasi diabetes riskLevel medium:
- "Segera konsultasikan ke dokter untuk pemeriksaan HbA1c"
- "Kurangi drastis konsumsi gula, nasi putih, dan makanan olahan"
- "Target penurunan berat badan jika BMI > 25"
- "Pantau gula darah secara rutin setiap bulan"

Rekomendasi diabetes riskLevel high:
- "Segera temui dokter atau spesialis penyakit dalam dalam waktu dekat"
- "Hentikan konsumsi gula dan karbohidrat tinggi sepenuhnya"
- "Pantau gula darah setiap hari dan catat hasilnya"
- "Diskusikan kemungkinan memulai pengobatan dengan dokter"

Buat rekomendasi serupa untuk heart disease sesuai riskLevel.
```

---

## Prompt 5.5 — Integrasi Hugging Face API

```
Buatkan file src/services/huggingface.service.ts untuk integrasi dengan Hugging Face Inference API:

import axios from 'axios'

const HF_API_URL = 'https://api-inference.huggingface.co/models'
const API_KEY = process.env.HUGGINGFACE_API_KEY

Fungsi utama:
async function queryModel(modelUrl: string, inputs: Record<string, number>): Promise<number>

Logika:
1. Kirim POST request ke modelUrl dengan Authorization header "Bearer {API_KEY}"
2. Body: { inputs: [array nilai numerik dari inputs object] }
3. Response berisi probability array, ambil probability untuk class 1 (positive)
4. Return nilai probability * 100 sebagai skor risiko
5. Jika request gagal atau timeout, throw error

---

Export dua fungsi utama:
async function getDiabetesPrediction(input: DiabetesInput): Promise<number>
async function getHeartPrediction(input: HeartInput): Promise<number>

Kedua fungsi:
1. Convert input object ke array numerik sesuai urutan fitur model
2. Panggil queryModel dengan URL model dari .env
3. Return skor 0-100

Catatan untuk urutan fitur diabetes (sesuai Pima Indians dataset):
[pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigree, age]
- skinThickness default ke 20 jika tidak ada
- diabetesPedigree default ke 0.5 jika tidak ada
- BMI hitung dari weight/height

Catatan urutan fitur jantung (sesuai UCI Heart Disease):
[age, sex, chestPain, restingBP, cholesterol, fastingBS, restECG, maxHR, exangina, oldpeak, slope, ca, thal]
- Default values untuk field yang tidak ada di form
```

---

## Prompt 5.6 — Controllers & Routes

```
Buatkan file src/controllers/predict.controller.ts:

import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getDiabetesPrediction, getHeartPrediction } from '../services/huggingface.service'
import { calculateDiabetesRisk, calculateHeartRisk } from '../services/scoring.service'

export async function predictDiabetes(req: Request, res: Response) {
  try:
  1. Ekstrak data dari req.body
  2. Coba panggil getDiabetesPrediction(data) dari Hugging Face
  3. Jika berhasil: gunakan skor dari HF, buat PredictionResult lengkap
  4. Jika gagal (error/offline): fallback ke calculateDiabetesRisk(data)
  5. Return response: { success: true, data: PredictionResult }
  
  Catch: return status 500 dengan pesan error

export async function predictHeart(req: Request, res: Response)
  Logika sama tapi untuk jantung

---

Buatkan file src/routes/predict.routes.ts:

import { Router } from 'express'
import { validateDiabetesInput, validateHeartInput, handleValidationErrors } from '../middleware/validation'
import { predictDiabetes, predictHeart } from '../controllers/predict.controller'

const router = Router()

router.post('/diabetes', validateDiabetesInput, handleValidationErrors, predictDiabetes)
router.post('/heart', validateHeartInput, handleValidationErrors, predictHeart)

export default router
```

---

## Prompt 5.7 — Koneksi Frontend ke Backend

```
Update frontend Next.js untuk memanggil backend Express:

1. Buat file .env.local di folder frontend dengan:
   NEXT_PUBLIC_API_URL=http://localhost:5000

2. Buatkan file lib/api.ts di frontend:

import axios from 'axios'
import { DiabetesFormData, HeartFormData, PredictionResult } from './types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

export async function fetchDiabetesPrediction(data: DiabetesFormData): Promise<PredictionResult>
export async function fetchHeartPrediction(data: HeartFormData): Promise<PredictionResult>

Kedua fungsi:
- POST ke /api/predict/diabetes atau /api/predict/heart
- Return response.data.data sebagai PredictionResult
- Jika error: throw dengan pesan yang user-friendly dalam Bahasa Indonesia

3. Update MultiStepForm.tsx:
   - Import fetchDiabetesPrediction dan fetchHeartPrediction
   - Ganti setTimeout + local scoring dengan API call
   - Tambahkan error state: jika API error, tampilkan pesan error di bawah form
   - isLoading tetap true sampai API response diterima
```

---

## Validasi Fase 5

**Test backend terlebih dahulu:**
```bash
cd healthpredict-api
npm run dev
```

Buka `http://localhost:5000/health` → harus return `{ status: 'ok' }`

**Test dengan Postman atau Thunder Client:**
```
POST http://localhost:5000/api/predict/diabetes
Content-Type: application/json

{
  "age": 45,
  "gender": "female",
  "weight": 70,
  "height": 160,
  "glucose": 130,
  "bloodPressure": 85,
  "familyHistory": "yes",
  "physicalActivity": "rarely"
}
```

Harus return response dengan format:
```json
{
  "success": true,
  "data": {
    "score": 65,
    "riskLevel": "medium",
    "factors": [...],
    "recommendations": [...],
    "explanation": "..."
  }
}
```

**Test integrasi frontend-backend:**
```bash
# Terminal 1: jalankan backend
cd healthpredict-api && npm run dev

# Terminal 2: jalankan frontend
cd healthpredict && npm run dev
```

Checklist:
- [ ] Backend berjalan di port 5000 tanpa error
- [ ] Endpoint /health merespons
- [ ] POST /api/predict/diabetes merespons dengan PredictionResult
- [ ] POST /api/predict/heart merespons dengan PredictionResult
- [ ] Validasi error bekerja (coba kirim data tidak valid)
- [ ] Frontend berhasil memanggil backend
- [ ] Hasil prediksi dari API muncul di ResultPanel
- [ ] Error handling bekerja jika backend mati

---

*Lanjut ke file `6-polish-dan-deploy.md` setelah fase ini selesai.*
