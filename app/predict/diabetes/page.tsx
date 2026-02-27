import { Metadata } from 'next'
import PredictPage from '@/components/predict/PredictPage'

export const metadata: Metadata = {
  title: 'Prediksi Risiko Diabetes - HealthPredict',
  description: 'Masukkan data laboratorium Anda untuk mengetahui tingkat risiko diabetes. Prediksi menggunakan analisis faktor risiko klinis.',
}

export default function DiabetesPage() {
  return <PredictPage type="diabetes" />
}
