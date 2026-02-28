import { Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

export const validateDiabetesInput = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Usia harus antara 1-120 tahun'),
  body('gender').isIn(['male', 'female']).withMessage('Gender harus male atau female'),
  body('weight').isFloat({ min: 20, max: 300 }).withMessage('Berat harus antara 20-300 kg'),
  body('height').isFloat({ min: 50, max: 250 }).withMessage('Tinggi harus antara 50-250 cm'),
  body('glucose').isFloat({ min: 0, max: 600 }).withMessage('Glukosa harus antara 0-600 mg/dL'),
  body('bloodPressure').isFloat({ min: 0, max: 200 }).withMessage('Tekanan darah harus antara 0-200 mmHg'),
  body('insulin').optional().isFloat({ min: 0, max: 1000 }).withMessage('Insulin harus antara 0-1000 µU/mL'),
  body('pregnancies').optional().isInt({ min: 0, max: 20 }).withMessage('Kehamilan harus antara 0-20'),
  body('familyHistory').isIn(['yes', 'no']).withMessage('Riwayat keluarga harus yes atau no'),
  body('physicalActivity').isIn(['rarely', 'sometimes', 'often']).withMessage('Aktivitas fisik harus rarely, sometimes, atau often'),
]

export const validateHeartInput = [
  body('age').isInt({ min: 1, max: 120 }).withMessage('Usia harus antara 1-120 tahun'),
  body('gender').isIn(['male', 'female']).withMessage('Gender harus male atau female'),
  body('weight').isFloat({ min: 20, max: 300 }).withMessage('Berat harus antara 20-300 kg'),
  body('height').isFloat({ min: 50, max: 250 }).withMessage('Tinggi harus antara 50-250 cm'),
  body('cholesterol').isFloat({ min: 0, max: 600 }).withMessage('Kolesterol harus antara 0-600 mg/dL'),
  body('systolicBP').isFloat({ min: 0, max: 300 }).withMessage('Tekanan darah sistolik harus antara 0-300 mmHg'),
  body('maxHeartRate').isFloat({ min: 0, max: 300 }).withMessage('Detak jantung maksimal harus antara 0-300 bpm'),
  body('fastingBS').isIn(['yes', 'no']).withMessage('Gula darah puasa harus yes atau no'),
  body('chestPainType').isIn(['none', 'atypical', 'typical']).withMessage('Jenis nyeri dada harus none, atypical, atau typical'),
  body('smoking').isIn(['never', 'former', 'current']).withMessage('Status merokok harus never, former, atau current'),
  body('familyHistory').isIn(['yes', 'no']).withMessage('Riwayat keluarga harus yes atau no'),
]

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validasi gagal',
      errors: errors.array(),
    })
    return
  }
  next()
}
