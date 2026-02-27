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
