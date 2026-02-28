import axios from 'axios'
import { DiabetesInput, HeartInput } from '../types/predict.types'

const API_KEY = process.env.HUGGINGFACE_API_KEY

async function queryModel(modelUrl: string, inputs: number[]): Promise<number> {
  try {
    const response = await axios.post(
      modelUrl,
      { inputs },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    )
    
    const data = response.data
    if (Array.isArray(data) && data.length > 0) {
      const probabilities = data[0]
      if (Array.isArray(probabilities) && probabilities.length > 1) {
        return probabilities[1] * 100
      }
    }
    throw new Error('Invalid response format from Hugging Face API')
  } catch (error: any) {
    if (error.code === 'ECONNABORTED' || error.response?.status === 503) {
      throw new Error('Model is loading, please try again later')
    }
    throw new Error(error.response?.data?.error || error.message || 'Failed to query model')
  }
}

export async function getDiabetesPrediction(input: DiabetesInput): Promise<number> {
  const modelUrl = process.env.MODEL_DIABETES_URL || 'https://api-inference.huggingface.co/models/'

  const bmi = input.weight / Math.pow(input.height / 100, 2)
  
  const features = [
    input.pregnancies || 0,
    input.glucose,
    input.bloodPressure,
    20,
    input.insulin || 0,
    bmi,
    0.5,
    input.age,
  ]

  return await queryModel(modelUrl, features)
}

export async function getHeartPrediction(input: HeartInput): Promise<number> {
  const modelUrl = process.env.MODEL_HEART_URL || 'https://api-inference.huggingface.co/models/'

  const sex = input.gender === 'male' ? 1 : 0
  const chestPain = input.chestPainType === 'typical' ? 1 : input.chestPainType === 'atypical' ? 2 : 0
  const fastingBS = input.fastingBS === 'yes' ? 1 : 0

  const features = [
    input.age,
    sex,
    chestPain,
    input.systolicBP,
    input.cholesterol,
    fastingBS,
    0,
    input.maxHeartRate,
    0,
    0,
    0,
    0,
    0,
  ]

  return await queryModel(modelUrl, features)
}
