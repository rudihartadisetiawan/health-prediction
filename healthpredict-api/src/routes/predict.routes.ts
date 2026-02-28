import { Router } from 'express'
import { validateDiabetesInput, validateHeartInput, handleValidationErrors } from '../middleware/validation'
import { predictDiabetes, predictHeart } from '../controllers/predict.controller'

const router = Router()

router.post('/diabetes', validateDiabetesInput, handleValidationErrors, predictDiabetes)
router.post('/heart', validateHeartInput, handleValidationErrors, predictHeart)

export default router
