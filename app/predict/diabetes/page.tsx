import { Metadata } from 'next'
import DiabetesPageClient from './DiabetesPageClient'

export const metadata: Metadata = {
  title: 'Prediksi Risiko Diabetes - HealthPredict',
  description: 'Masukkan data laboratorium Anda untuk mengetahui tingkat risiko diabetes. Prediksi menggunakan analisis faktor risiko klinis.',
}

export default function DiabetesPage() {
  return <DiabetesPageClient />
}
