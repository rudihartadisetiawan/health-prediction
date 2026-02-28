import { Request, Response } from 'express'
import { DiabetesInput, HeartInput, PredictionResult } from '../types/predict.types'
import { getDiabetesPrediction, getHeartPrediction } from '../services/ml.service'
import { calculateDiabetesRisk, calculateHeartRisk } from '../services/scoring.service'

export async function predictDiabetes(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body as DiabetesInput

    let result: PredictionResult

    try {
      result = await getDiabetesPrediction(data)
    } catch (error) {
      console.log('ML service unavailable, using fallback:', (error as Error).message)
      result = calculateDiabetesRisk(data)
    }

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Prediction error:', error)
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses prediksi',
    })
  }
}

export async function predictHeart(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body as HeartInput

    let result: PredictionResult

    try {
      result = await getHeartPrediction(data)
    } catch (error) {
      console.log('ML service unavailable, using fallback:', (error as Error).message)
      result = calculateHeartRisk(data)
    }

    res.json({ success: true, data: result })
  } catch (error) {
    console.error('Prediction error:', error)
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat memproses prediksi',
    })
  }
}
