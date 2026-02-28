"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDiabetesRisk = calculateDiabetesRisk;
exports.calculateHeartRisk = calculateHeartRisk;
function calculateBMI(weight, height) {
    const heightM = height / 100;
    return Math.round((weight / (heightM * heightM)) * 10) / 10;
}
function getRiskLevel(score) {
    if (score < 30)
        return 'low';
    if (score <= 60)
        return 'medium';
    return 'high';
}
function getBMIColor(bmi) {
    if (bmi < 18.5)
        return '#60A5FA';
    if (bmi < 25)
        return '#10B981';
    if (bmi < 30)
        return '#F59E0B';
    return '#EF4444';
}
function calculateDiabetesRisk(input) {
    let score = 0;
    const factors = [];
    let glucoseScore = 0;
    if (input.glucose > 126)
        glucoseScore = 30;
    else if (input.glucose >= 100)
        glucoseScore = 15;
    factors.push({ name: 'Kadar Glukosa', value: glucoseScore, color: '#3B82F6' });
    score += glucoseScore;
    const bmi = calculateBMI(input.weight, input.height);
    let bmiScore = 0;
    if (bmi > 30)
        bmiScore = 20;
    else if (bmi >= 25)
        bmiScore = 10;
    factors.push({ name: 'BMI', value: bmiScore, color: getBMIColor(bmi) });
    score += bmiScore;
    let ageScore = 0;
    if (input.age > 50)
        ageScore = 15;
    else if (input.age >= 35)
        ageScore = 8;
    factors.push({ name: 'Usia', value: ageScore, color: '#8B5CF6' });
    score += ageScore;
    let bpScore = 0;
    if (input.bloodPressure > 90)
        bpScore = 15;
    else if (input.bloodPressure >= 80)
        bpScore = 5;
    factors.push({ name: 'Tekanan Darah', value: bpScore, color: '#EC4899' });
    score += bpScore;
    let insulinScore = 0;
    if (input.insulin && input.insulin > 200)
        insulinScore = 10;
    factors.push({ name: 'Kadar Insulin', value: insulinScore, color: '#14B8A6' });
    score += insulinScore;
    let familyScore = 0;
    if (input.familyHistory === 'yes')
        familyScore = 15;
    factors.push({ name: 'Riwayat Keluarga', value: familyScore, color: '#F97316' });
    score += familyScore;
    let pregnancyScore = 0;
    if (input.pregnancies && input.pregnancies > 5)
        pregnancyScore = 5;
    if (pregnancyScore > 0) {
        factors.push({ name: 'Kehamilan', value: pregnancyScore, color: '#EC4899' });
        score += pregnancyScore;
    }
    let activityScore = 0;
    if (input.physicalActivity === 'rarely')
        activityScore = 5;
    else if (input.physicalActivity === 'sometimes')
        activityScore = 2;
    if (activityScore > 0) {
        factors.push({ name: 'Aktivitas Fisik', value: activityScore, color: '#84CC16' });
        score += activityScore;
    }
    score = Math.min(95, Math.max(0, score));
    const riskLevel = getRiskLevel(score);
    const recommendations = [];
    if (riskLevel === 'low') {
        recommendations.push('Pertahankan pola makan sehat dengan gizi seimbang', 'Rutin berolahraga minimal 30 menit, 3-5 kali seminggu', 'Lakukan pemeriksaan kesehatan rutin setiap tahun');
    }
    else if (riskLevel === 'medium') {
        recommendations.push('Kurangi konsumsi makanan manis dan karbohidrat sederhana', 'Tingkatkan aktivitas fisik menjadi minimal 150 menit per minggu', 'Monitor kadar glukosa darah secara berkala', 'Konsultasikan dengan dokter untuk pencegahan lebih lanjut');
    }
    else {
        recommendations.push('Segera konsultasikan dengan dokter untuk evaluasi lebih lanjut', 'Lakukan perubahan pola makan drastis: rendah gula dan karbohidrat', 'Monitor glukosa darah setiap hari', 'Pertimbangkan program manajemen diabetes intensif');
    }
    const explanation = `Berdasarkan data yang Anda masukkan, tingkat risiko diabetes Anda adalah ${riskLevel === 'low' ? 'rendah' : riskLevel === 'medium' ? 'sedang' : 'tinggi'}. ` +
        `Skor risiko ${score}% dihitung dari berbagai faktor termasuk kadar glukosa ${input.glucose} mg/dL, BMI ${bmi}, ` +
        `usia ${input.age} tahun, dan faktor risiko lainnya. ` +
        `${riskLevel === 'high' ? 'Disarankan untuk segera berkonsultasi dengan dokter.' : riskLevel === 'medium' ? 'Perhatikan pola hidup Anda untuk mencegah peningkatan risiko.' : 'Terus pertahankan gaya hidup sehat Anda.'}`;
    return { score, riskLevel, factors, recommendations, explanation };
}
function calculateHeartRisk(input) {
    let score = 0;
    const factors = [];
    let cholesterolScore = 0;
    if (input.cholesterol > 240)
        cholesterolScore = 25;
    else if (input.cholesterol >= 200)
        cholesterolScore = 12;
    factors.push({ name: 'Kolesterol', value: cholesterolScore, color: '#EF4444' });
    score += cholesterolScore;
    let ageScore = 0;
    if (input.age > 60)
        ageScore = 20;
    else if (input.age >= 45)
        ageScore = 10;
    factors.push({ name: 'Usia', value: ageScore, color: '#8B5CF6' });
    score += ageScore;
    let bpScore = 0;
    if (input.systolicBP > 140)
        bpScore = 20;
    else if (input.systolicBP >= 120)
        bpScore = 8;
    factors.push({ name: 'Tekanan Darah', value: bpScore, color: '#EC4899' });
    score += bpScore;
    let hrScore = 0;
    if (input.maxHeartRate < 120)
        hrScore = 15;
    factors.push({ name: 'Detak Jantung Maks', value: hrScore, color: '#F59E0B' });
    score += hrScore;
    let chestPainScore = 0;
    if (input.chestPainType === 'typical')
        chestPainScore = 15;
    else if (input.chestPainType === 'atypical')
        chestPainScore = 8;
    if (chestPainScore > 0) {
        factors.push({ name: 'Nyeri Dada', value: chestPainScore, color: '#DC2626' });
        score += chestPainScore;
    }
    let smokingScore = 0;
    if (input.smoking === 'current')
        smokingScore = 10;
    else if (input.smoking === 'former')
        smokingScore = 5;
    if (smokingScore > 0) {
        factors.push({ name: 'Status Merokok', value: smokingScore, color: '#6B7280' });
        score += smokingScore;
    }
    let fastingScore = 0;
    if (input.fastingBS === 'yes')
        fastingScore = 10;
    if (fastingScore > 0) {
        factors.push({ name: 'Gula Darah Puasa', value: fastingScore, color: '#3B82F6' });
        score += fastingScore;
    }
    let familyScore = 0;
    if (input.familyHistory === 'yes')
        familyScore = 10;
    factors.push({ name: 'Riwayat Keluarga', value: familyScore, color: '#F97316' });
    score += familyScore;
    const bmi = calculateBMI(input.weight, input.height);
    let bmiScore = 0;
    if (bmi > 30)
        bmiScore = 8;
    else if (bmi >= 25)
        bmiScore = 4;
    if (bmiScore > 0) {
        factors.push({ name: 'BMI', value: bmiScore, color: getBMIColor(bmi) });
        score += bmiScore;
    }
    score = Math.min(95, Math.max(0, score));
    const riskLevel = getRiskLevel(score);
    const recommendations = [];
    if (riskLevel === 'low') {
        recommendations.push('Pertahankan pola makan sehat untuk jantung', 'Rutin berolahraga kardio minimal 150 menit per minggu', 'Hindari merokok dan batasi konsumsi alkohol', 'Lakukan pemeriksaan kesehatan rutin setiap tahun');
    }
    else if (riskLevel === 'medium') {
        recommendations.push('Kurangi makanan tinggi kolesterol dan lemak jenuh', 'Tingkatkan aktivitas fisik aerobik', 'Monitor tekanan darah dan kolesterol secara berkala', 'Konsultasikan dengan dokter untuk pencegahan lebih lanjut');
    }
    else {
        recommendations.push('Segera konsultasikan dengan dokter spesialis jantung', 'Lakukan perubahan pola makan drastis: rendah lemak dan garam', 'Hentikan kebiasaan merokok jika ada', 'Pertimbangkan program rehabilitasi jantung');
    }
    const explanation = `Berdasarkan data yang Anda masukkan, tingkat risiko penyakit jantung Anda adalah ${riskLevel === 'low' ? 'rendah' : riskLevel === 'medium' ? 'sedang' : 'tinggi'}. ` +
        `Skor risiko ${score}% dihitung dari berbagai faktor termasuk kolesterol ${input.cholesterol} mg/dL, ` +
        `tekanan darah sistolik ${input.systolicBP} mmHg, usia ${input.age} tahun, dan faktor risiko lainnya. ` +
        `${riskLevel === 'high' ? 'Disarankan untuk segera berkonsultasi dengan dokter spesialis jantung.' : riskLevel === 'medium' ? 'Perhatikan pola hidup Anda untuk mencegah peningkatan risiko.' : 'Terus pertahankan gaya hidup sehat untuk jantung Anda.'}`;
    return { score, riskLevel, factors, recommendations, explanation };
}
//# sourceMappingURL=scoring.service.js.map