import { Metadata } from 'next'
import HeartPageClient from './HeartPageClient'

export const metadata: Metadata = {
  title: 'Prediksi Risiko Penyakit Jantung - HealthPredict',
  description: 'Masukkan data laboratorium Anda untuk mengetahui tingkat risiko penyakit jantung. Prediksi menggunakan analisis faktor risiko kardiovaskular.',
}

export default function HeartPage() {
  return <HeartPageClient />
}
