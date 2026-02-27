'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { PredictType, PredictionResult, DiabetesFormData, HeartFormData } from '@/lib/types'
import { predictDiabetes, predictHeart, calculateBMI } from '@/lib/scoring'
import ProgressBar from './ProgressBar'
import StepBasicData from './steps/StepBasicData'
import StepLabDiabetes from './steps/StepLabDiabetes'
import StepLabHeart from './steps/StepLabHeart'
import StepHistoryDiabetes from './steps/StepHistoryDiabetes'
import StepHistoryHeart from './steps/StepHistoryHeart'

interface MultiStepFormProps {
  type: PredictType
  onSubmit: (result: PredictionResult) => void
}

const steps = [
  { label: 'Data Dasar' },
  { label: 'Data Lab' },
  { label: 'Riwayat' },
]

// Common fields untuk kedua tipe
interface CommonFormData {
  age: number
  gender: 'male' | 'female'
  weight: number
  height: number
  bmi?: number
  familyHistory: 'yes' | 'no'
  physicalActivity: 'rarely' | 'sometimes' | 'often'
  // Diabetes specific (optional)
  glucose?: number
  bloodPressure?: number
  insulin?: number
  pregnancies?: number
  // Heart specific (optional)
  cholesterol?: number
  systolicBP?: number
  maxHeartRate?: number
  fastingBS?: 'yes' | 'no'
  chestPainType?: 'none' | 'atypical' | 'typical'
  smoking?: 'never' | 'former' | 'current'
}

export default function MultiStepForm({ type, onSubmit }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)
  const [isLoading, setIsLoading] = useState(false)

  const methods = useForm<CommonFormData>({
    mode: 'onChange',
    defaultValues: {
      gender: 'male',
      familyHistory: 'no',
      physicalActivity: 'sometimes',
    },
  })

  const { register, handleSubmit, watch, formState: { errors }, trigger } = methods

  const getAccentColor = () => {
    return type === 'diabetes' ? 'blue' : 'red'
  }

  const handleNext = async () => {
    const isStepValid = await trigger()
    if (isStepValid) {
      if (currentStep < 3) {
        setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)
      }
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)
    }
  }

  const onFormSubmit = async (data: CommonFormData) => {
    setIsLoading(true)

    // Simulasi loading 1.5 detik
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Hitung BMI dan tambahkan ke data
    const bmi = calculateBMI(data.weight, data.height)
    const dataWithBMI = { ...data, bmi }

    // Panggil fungsi prediksi
    let result: PredictionResult
    if (type === 'diabetes') {
      result = predictDiabetes(dataWithBMI as unknown as DiabetesFormData)
    } else {
      result = predictHeart(dataWithBMI as unknown as HeartFormData)
    }

    setIsLoading(false)
    onSubmit(result)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasicData register={register} errors={errors} watch={watch} />
      case 2:
        return type === 'diabetes' 
          ? <StepLabDiabetes register={register} errors={errors} />
          : <StepLabHeart register={register} errors={errors} />
      case 3:
        return type === 'diabetes'
          ? <StepHistoryDiabetes register={register} errors={errors} watch={watch} />
          : <StepHistoryHeart register={register} errors={errors} />
      default:
        return null
    }
  }

  const slideVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full">
        {/* Progress Bar */}
        <ProgressBar
          currentStep={currentStep}
          totalSteps={3}
          steps={steps}
          type={type}
        />

        {/* Step Content */}
        <div className="bg-[#111827] rounded-2xl p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                {steps[currentStep - 1].label}
              </h3>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1 || isLoading}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentStep === 1 || isLoading
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            Kembali
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className={`px-8 py-3 rounded-xl font-medium transition-all ${
                type === 'diabetes'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Lanjut
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={`px-8 py-3 rounded-xl font-medium transition-all flex items-center gap-2 ${
                type === 'diabetes'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  <span>Prediksi Sekarang</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}
