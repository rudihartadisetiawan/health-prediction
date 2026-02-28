export type RiskLevel = "low" | "medium" | "high";
export interface DiabetesInput {
    age: number;
    gender: "male" | "female";
    weight: number;
    height: number;
    bmi?: number;
    glucose: number;
    bloodPressure: number;
    insulin?: number;
    pregnancies?: number;
    familyHistory: "yes" | "no";
    physicalActivity: "rarely" | "sometimes" | "often";
}
export interface HeartInput {
    age: number;
    gender: "male" | "female";
    weight: number;
    height: number;
    bmi?: number;
    cholesterol: number;
    systolicBP: number;
    maxHeartRate: number;
    fastingBS: "yes" | "no";
    chestPainType: "none" | "atypical" | "typical";
    smoking: "never" | "former" | "current";
    familyHistory: "yes" | "no";
}
export interface Factor {
    name: string;
    value: number;
    color: string;
}
export interface PredictionResult {
    score: number;
    riskLevel: RiskLevel;
    factors: Factor[];
    recommendations: string[];
    explanation: string;
}
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    errors?: any;
}
//# sourceMappingURL=predict.types.d.ts.map