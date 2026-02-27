import { DiabetesFormData, HeartFormData, PredictionResult, RiskLevel } from './types'

export function calculateBMI(weight: number, height: number): number {
  // height dalam cm, weight dalam kg
  const heightM = height / 100
  return Math.round((weight / (heightM * heightM)) * 10) / 10
}

function getRiskLevel(score: number): RiskLevel {
  if (score < 30) return 'low'
  if (score <= 60) return 'medium'
  return 'high'
}

function getBMIColor(bmi: number): string {
  if (bmi < 18.5) return '#60A5FA' // Kurus - biru
  if (bmi < 25) return '#10B981' // Normal - hijau
  if (bmi < 30) return '#F59E0B' // Gemuk - amber
  return '#EF4444' // Obesitas - merah
}

export function predictDiabetes(data: DiabetesFormData): PredictionResult {
  let score = 0
  const factors: Array<{ name: string; value: number; color: string }> = []

  // Glukosa: > 126 = +30, 100-126 = +15, normal = +0
  let glucoseScore = 0
  if (data.glucose > 126) glucoseScore = 30
  else if (data.glucose >= 100) glucoseScore = 15
  factors.push({ name: 'Kadar Glukosa', value: glucoseScore, color: '#3B82F6' })
  score += glucoseScore

  // BMI: > 30 = +20, 25-30 = +10, normal = +0
  const bmi = calculateBMI(data.weight, data.height)
  let bmiScore = 0
  if (bmi > 30) bmiScore = 20
  else if (bmi >= 25) bmiScore = 10
  factors.push({ name: 'BMI', value: bmiScore, color: getBMIColor(bmi) })
  score += bmiScore

  // Usia: > 50 = +15, 35-50 = +8, < 35 = +0
  let ageScore = 0
  if (data.age > 50) ageScore = 15
  else if (data.age >= 35) ageScore = 8
  factors.push({ name: 'Usia', value: ageScore, color: '#8B5CF6' })
  score += ageScore

  // Tekanan darah diastolik: > 90 = +15, 80-90 = +5
  let bpScore = 0
  if (data.bloodPressure > 90) bpScore = 15
  else if (data.bloodPressure >= 80) bpScore = 5
  factors.push({ name: 'Tekanan Darah', value: bpScore, color: '#EC4899' })
  score += bpScore

  // Insulin: > 200 = +10
  let insulinScore = 0
  if (data.insulin && data.insulin > 200) insulinScore = 10
  factors.push({ name: 'Kadar Insulin', value: insulinScore, color: '#14B8A6' })
  score += insulinScore

  // Riwayat keluarga: yes = +15
  let familyScore = 0
  if (data.familyHistory === 'yes') familyScore = 15
  factors.push({ name: 'Riwayat Keluarga', value: familyScore, color: '#F97316' })
  score += familyScore

  // Kehamilan > 5: +5
  let pregnancyScore = 0
  if (data.pregnancies && data.pregnancies > 5) pregnancyScore = 5
  if (pregnancyScore > 0) {
    factors.push({ name: 'Kehamilan', value: pregnancyScore, color: '#EC4899' })
    score += pregnancyScore
  }

  // Aktivitas fisik: rarely = +5, sometimes = +2, often = +0
  let activityScore = 0
  if (data.physicalActivity === 'rarely') activityScore = 5
  else if (data.physicalActivity === 'sometimes') activityScore = 2
  if (activityScore > 0) {
    factors.push({ name: 'Aktivitas Fisik', value: activityScore, color: '#84CC16' })
    score += activityScore
  }

  // Clamp score antara 0-95
  score = Math.min(95, Math.max(0, score))
  const riskLevel = getRiskLevel(score)

  // Generate recommendations berdasarkan riskLevel
  const recommendations: string[] = []
  if (riskLevel === 'low') {
    recommendations.push(
      'Pertahankan pola makan sehat dengan gizi seimbang',
      'Rutin berolahraga minimal 30 menit, 3-5 kali seminggu',
      'Lakukan pemeriksaan kesehatan rutin setiap tahun'
    )
  } else if (riskLevel === 'medium') {
    recommendations.push(
      'Kurangi konsumsi makanan manis dan karbohidrat sederhana',
      'Tingkatkan aktivitas fisik menjadi minimal 150 menit per minggu',
      'Monitor kadar glukosa darah secara berkala',
      'Konsultasikan dengan dokter untuk pencegahan lebih lanjut'
    )
  } else {
    recommendations.push(
      'Segera konsultasikan dengan dokter untuk evaluasi lebih lanjut',
      'Lakukan perubahan pola makan drastis: rendah gula dan karbohidrat',
      'Monitor glukosa darah setiap hari',
      'Pertimbangkan program manajemen diabetes intensif'
    )
  }

  const explanation = `Berdasarkan data yang Anda masukkan, tingkat risiko diabetes Anda adalah ${riskLevel === 'low' ? 'rendah' : riskLevel === 'medium' ? 'sedang' : 'tinggi'}. ` +
    `Skor risiko ${score}% dihitung dari berbagai faktor termasuk kadar glukosa ${data.glucose} mg/dL, BMI ${bmi}, ` +
    `usia ${data.age} tahun, dan faktor risiko lainnya. ` +
    `${riskLevel === 'high' ? 'Disarankan untuk segera berkonsultasi dengan dokter.' : riskLevel === 'medium' ? 'Perhatikan pola hidup Anda untuk mencegah peningkatan risiko.' : 'Terus pertahankan gaya hidup sehat Anda.'}`

  return { score, riskLevel, factors, recommendations, explanation }
}

export function predictHeart(data: HeartFormData): PredictionResult {
  let score = 0
  const factors: Array<{ name: string; value: number; color: string }> = []

  // Kolesterol: > 240 = +25, 200-240 = +12
  let cholesterolScore = 0
  if (data.cholesterol > 240) cholesterolScore = 25
  else if (data.cholesterol >= 200) cholesterolScore = 12
  factors.push({ name: 'Kolesterol', value: cholesterolScore, color: '#EF4444' })
  score += cholesterolScore

  // Usia: > 60 = +20, 45-60 = +10
  let ageScore = 0
  if (data.age > 60) ageScore = 20
  else if (data.age >= 45) ageScore = 10
  factors.push({ name: 'Usia', value: ageScore, color: '#8B5CF6' })
  score += ageScore

  // Tekanan darah sistolik: > 140 = +20, 120-140 = +8
  let bpScore = 0
  if (data.systolicBP > 140) bpScore = 20
  else if (data.systolicBP >= 120) bpScore = 8
  factors.push({ name: 'Tekanan Darah', value: bpScore, color: '#EC4899' })
  score += bpScore

  // Max HR rendah (< 120): +15
  let hrScore = 0
  if (data.maxHeartRate < 120) hrScore = 15
  factors.push({ name: 'Detak Jantung Maks', value: hrScore, color: '#F59E0B' })
  score += hrScore

  // Nyeri dada tipikal: +15, atipikal: +8
  let chestPainScore = 0
  if (data.chestPainType === 'typical') chestPainScore = 15
  else if (data.chestPainType === 'atypical') chestPainScore = 8
  if (chestPainScore > 0) {
    factors.push({ name: 'Nyeri Dada', value: chestPainScore, color: '#DC2626' })
    score += chestPainScore
  }

  // Merokok: current = +10, former = +5
  let smokingScore = 0
  if (data.smoking === 'current') smokingScore = 10
  else if (data.smoking === 'former') smokingScore = 5
  if (smokingScore > 0) {
    factors.push({ name: 'Status Merokok', value: smokingScore, color: '#6B7280' })
    score += smokingScore
  }

  // Gula darah tinggi (fasting BS > 120): +10
  let fastingScore = 0
  if (data.fastingBS === 'yes') fastingScore = 10
  if (fastingScore > 0) {
    factors.push({ name: 'Gula Darah Puasa', value: fastingScore, color: '#3B82F6' })
    score += fastingScore
  }

  // Riwayat keluarga: +10
  let familyScore = 0
  if (data.familyHistory === 'yes') familyScore = 10
  factors.push({ name: 'Riwayat Keluarga', value: familyScore, color: '#F97316' })
  score += familyScore

  // BMI: > 30 = +8, 25-30 = +4
  const bmi = calculateBMI(data.weight, data.height)
  let bmiScore = 0
  if (bmi > 30) bmiScore = 8
  else if (bmi >= 25) bmiScore = 4
  if (bmiScore > 0) {
    factors.push({ name: 'BMI', value: bmiScore, color: getBMIColor(bmi) })
    score += bmiScore
  }

  // Clamp score antara 0-95
  score = Math.min(95, Math.max(0, score))
  const riskLevel = getRiskLevel(score)

  // Generate recommendations berdasarkan riskLevel
  const recommendations: string[] = []
  if (riskLevel === 'low') {
    recommendations.push(
      'Pertahankan pola makan sehat untuk jantung',
      'Rutin berolahraga kardio minimal 150 menit per minggu',
      'Hindari merokok dan batasi konsumsi alkohol',
      'Lakukan pemeriksaan kesehatan rutin setiap tahun'
    )
  } else if (riskLevel === 'medium') {
    recommendations.push(
      'Kurangi makanan tinggi kolesterol dan lemak jenuh',
      'Tingkatkan aktivitas fisik aerobik',
      'Monitor tekanan darah dan kolesterol secara berkala',
      'Konsultasikan dengan dokter untuk pencegahan lebih lanjut'
    )
  } else {
    recommendations.push(
      'Segera konsultasikan dengan dokter spesialis jantung',
      'Lakukan perubahan pola makan drastis: rendah lemak dan garam',
      'Hentikan kebiasaan merokok jika ada',
      'Pertimbangkan program rehabilitasi jantung'
    )
  }

  const explanation = `Berdasarkan data yang Anda masukkan, tingkat risiko penyakit jantung Anda adalah ${riskLevel === 'low' ? 'rendah' : riskLevel === 'medium' ? 'sedang' : 'tinggi'}. ` +
    `Skor risiko ${score}% dihitung dari berbagai faktor termasuk kolesterol ${data.cholesterol} mg/dL, ` +
    `tekanan darah sistolik ${data.systolicBP} mmHg, usia ${data.age} tahun, dan faktor risiko lainnya. ` +
    `${riskLevel === 'high' ? 'Disarankan untuk segera berkonsultasi dengan dokter spesialis jantung.' : riskLevel === 'medium' ? 'Perhatikan pola hidup Anda untuk mencegah peningkatan risiko.' : 'Terus pertahankan gaya hidup sehat untuk jantung Anda.'}`

  return { score, riskLevel, factors, recommendations, explanation }
}
