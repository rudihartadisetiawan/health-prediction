import axios from 'axios'
import { DiabetesFormData, HeartFormData, PredictionResult } from './types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor untuk logging
api.interceptors.request.use(config => {
  console.log('>>> API REQUEST:', config.url)
  console.log('>>> Request data:', config.data)
  console.log('>>> Request data (stringified):', JSON.stringify(config.data, null, 2))
  return config
})

// Response interceptor untuk logging
api.interceptors.response.use(
  response => {
    console.log('<<< API RESPONSE:', response.status, response.config.url)
    return response
  },
  error => {
    console.error('<<< API ERROR:', error.response?.status, error.response?.data, error.config?.url)
    return Promise.reject(error)
  }
)

export async function fetchDiabetesPrediction(data: DiabetesFormData): Promise<PredictionResult> {
  try {
    const response = await api.post('/api/predict/diabetes', data)
    if (response.data.success) {
      return response.data.data
    }
    throw new Error(response.data.message || 'Gagal melakukan prediksi')
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Terjadi kesalahan pada server')
      } else if (error.request) {
        throw new Error('Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.')
      }
    }
    throw new Error(error.message || 'Terjadi kesalahan yang tidak terduga')
  }
}

export async function fetchHeartPrediction(data: HeartFormData): Promise<PredictionResult> {
  try {
    const response = await api.post('/api/predict/heart', data)
    if (response.data.success) {
      return response.data.data
    }
    throw new Error(response.data.message || 'Gagal melakukan prediksi')
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Terjadi kesalahan pada server')
      } else if (error.request) {
        throw new Error('Tidak dapat terhubung ke server. Pastikan backend sedang berjalan.')
      }
    }
    throw new Error(error.message || 'Terjadi kesalahan yang tidak terduga')
  }
}
