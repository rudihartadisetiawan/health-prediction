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
