import axios from 'axios'
import { DiabetesInput, HeartInput, PredictionResult } from '../types/predict.types'

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000'

export async function getDiabetesPrediction(input: DiabetesInput): Promise<PredictionResult> {
  const payload = {
    Pregnancies: input.pregnancies ?? 0,
    Glucose: input.glucose,
    BloodPressure: input.bloodPressure,
    SkinThickness: 20,
    Insulin: input.insulin ?? 80,
    BMI: input.bmi,
    DiabetesPedigreeFunction: input.familyHistory === 'yes' ? 0.6 : 0.2,
    Age: input.age
  }

  const response = await axios.post(`${ML_URL}/predict/diabetes`, payload)
  const { score, riskLevel } = response.data

  return buildResult(score, riskLevel, 'diabetes', input)
}

export async function getHeartPrediction(input: HeartInput): Promise<PredictionResult> {
  const cpMap: Record<string, number> = {
    'none': 0, 'atypical': 1, 'typical': 2
  }

  const payload = {
    age: input.age,
    sex: input.gender === 'male' ? 1 : 0,
    cp: cpMap[input.chestPainType] ?? 0,
    trestbps: input.systolicBP,
    chol: input.cholesterol,
    fbs: input.fastingBS === 'yes' ? 1 : 0,
    restecg: 0,
    thalach: input.maxHeartRate,
    exang: 0,
    oldpeak: 1.0,
    slope: 1,
    ca: 0,
    thal: input.smoking === 'current' ? 3 : input.smoking === 'former' ? 2 : 1
  }

  const response = await axios.post(`${ML_URL}/predict/heart`, payload)
  const { score, riskLevel } = response.data

  return buildResult(score, riskLevel, 'heart', input)
}

function buildResult(
  score: number,
  riskLevel: string,
  type: 'diabetes' | 'heart',
  input: any
): PredictionResult {
  const factors = type === 'diabetes'
    ? [
        { name: 'Kadar Glukosa',    value: Math.round(Math.min((input.glucose / 200) * 100, 100)),      color: '#3B82F6' },
        { name: 'BMI',              value: Math.round(Math.min((input.bmi / 40) * 100, 100)),            color: '#06B6D4' },
        { name: 'Usia',             value: Math.round(Math.min((input.age / 80) * 100, 100)),            color: '#8B5CF6' },
        { name: 'Tekanan Darah',    value: Math.round(Math.min((input.bloodPressure / 120) * 100, 100)), color: '#F59E0B' },
        { name: 'Riwayat Keluarga', value: input.familyHistory === 'yes' ? 80 : 20,                      color: '#EF4444' },
      ]
    : [
        { name: 'Kolesterol',       value: Math.round(Math.min((input.cholesterol / 300) * 100, 100)),  color: '#EF4444' },
        { name: 'Tekanan Darah',    value: Math.round(Math.min((input.systolicBP / 180) * 100, 100)),   color: '#F59E0B' },
        { name: 'Usia',             value: Math.round(Math.min((input.age / 80) * 100, 100)),            color: '#8B5CF6' },
        { name: 'Detak Jantung',    value: Math.round(Math.min((input.maxHeartRate / 200) * 100, 100)), color: '#06B6D4' },
        { name: 'Riwayat Keluarga', value: input.familyHistory === 'yes' ? 80 : 20,                     color: '#3B82F6' },
      ]

  const recommendations = getRecommendations(riskLevel, type)
  const explanation = getExplanation(score, riskLevel, type)

  return {
    score: Math.round(score * 10) / 10,
    riskLevel: riskLevel as 'low' | 'medium' | 'high',
    factors,
    recommendations,
    explanation
  }
}

function getRecommendations(riskLevel: string, type: string): string[] {
  if (type === 'diabetes') {
    if (riskLevel === 'low') return [
      'Pertahankan pola makan sehat dengan mengurangi gula dan karbohidrat sederhana',
      'Olahraga rutin minimal 30 menit per hari, 5 kali seminggu',
      'Lakukan pemeriksaan gula darah setahun sekali sebagai langkah preventif',
    ]
    if (riskLevel === 'medium') return [
      'Segera konsultasikan ke dokter untuk pemeriksaan HbA1c lebih lanjut',
      'Kurangi drastis konsumsi gula, nasi putih, dan makanan olahan',
      'Target penurunan berat badan jika BMI di atas 25',
      'Pantau kadar gula darah secara rutin setiap bulan',
    ]
    return [
      'Segera temui dokter atau spesialis penyakit dalam dalam waktu dekat',
      'Hentikan konsumsi gula dan karbohidrat tinggi sepenuhnya',
      'Pantau gula darah setiap hari dan catat hasilnya',
      'Diskusikan kemungkinan memulai pengobatan dengan dokter Anda',
    ]
  } else {
    if (riskLevel === 'low') return [
      'Pertahankan gaya hidup aktif dengan olahraga aerobik rutin',
      'Jaga pola makan rendah lemak jenuh dan kolesterol',
      'Hindari rokok dan batasi konsumsi alkohol',
    ]
    if (riskLevel === 'medium') return [
      'Konsultasikan ke dokter untuk pemeriksaan EKG dan lipid panel',
      'Kurangi konsumsi makanan tinggi lemak dan garam',
      'Mulai program olahraga terstruktur minimal 150 menit per minggu',
      'Kelola stres dengan meditasi atau yoga',
    ]
    return [
      'Segera konsultasikan ke dokter spesialis jantung (kardiolog)',
      'Lakukan pemeriksaan EKG, echocardiogram, dan stress test',
      'Ikuti diet DASH secara ketat untuk menurunkan tekanan darah',
      'Hentikan merokok segera jika masih merokok',
    ]
  }
}

function getExplanation(score: number, riskLevel: string, type: string): string {
  const typeLabel = type === 'diabetes' ? 'diabetes' : 'penyakit jantung'
  const risk = riskLevel === 'low' ? 'rendah' : riskLevel === 'medium' ? 'sedang' : 'tinggi'
  return `Berdasarkan analisis data kesehatan Anda menggunakan model Random Forest, 
tingkat risiko ${typeLabel} Anda berada pada kategori ${risk} dengan skor ${Math.round(score)}%. 
Model ini telah dilatih menggunakan dataset medis tervalidasi dan memiliki akurasi yang baik. 
Hasil ini bersifat informatif dan bukan pengganti diagnosis dokter profesional.`
}
