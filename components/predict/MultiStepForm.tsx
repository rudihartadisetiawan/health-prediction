'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { PredictType, PredictionResult, DiabetesFormData, HeartFormData } from '@/lib/types'
import { fetchDiabetesPrediction, fetchHeartPrediction } from '@/lib/api'
import { calculateBMI } from '@/lib/scoring'
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

interface CommonFormData {
  age: number
  gender: 'male' | 'female'
  weight: number
  height: number
  bmi?: number
  familyHistory: 'yes' | 'no'
  physicalActivity?: 'rarely' | 'sometimes' | 'often'
  glucose?: number
  bloodPressure?: number
  insulin?: number
  pregnancies?: number
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
  const [error, setError] = useState<string | null>(null)

  const methods = useForm<CommonFormData>({
    mode: 'onBlur',
    defaultValues: {
      gender: 'male',
    },
  })

  const { register, handleSubmit, watch, getValues, formState: { errors }, trigger } = methods

  // Validation fields per step
  const getStepFields = (step: number): (keyof CommonFormData)[] => {
    if (step === 1) {
      return ['age', 'gender', 'weight', 'height']
    }
    
    if (step === 2) {
      if (type === 'diabetes') {
        return ['glucose', 'bloodPressure']
      }
      return ['cholesterol', 'systolicBP', 'maxHeartRate', 'fastingBS', 'chestPainType']
    }
    
    if (step === 3) {
      if (type === 'diabetes') {
        return ['familyHistory', 'physicalActivity']
      }
      return ['familyHistory', 'smoking']
    }
    
    return []
  }

  const handleNext = async () => {
    const fieldsToValidate = getStepFields(currentStep)
    const isStepValid = await trigger(fieldsToValidate)
    
    if (isStepValid && currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3)
      setError(null)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3)
      setError(null)
    }
  }

  const onFormSubmit = async (data: CommonFormData) => {
    // Prevent double submission
    if (isLoading) return

    // Explicit validation for step 3 fields BEFORE submitting
    if (type === 'heart') {
      if (!data.familyHistory || !data.smoking) {
        console.log('Step 3 fields missing, triggering validation...')
        trigger(['familyHistory', 'smoking'])
        return
      }
    }
    
    if (type === 'diabetes') {
      if (!data.familyHistory || !data.physicalActivity) {
        console.log('Step 3 fields missing, triggering validation...')
        trigger(['familyHistory', 'physicalActivity'])
        return
      }
    }

    setError(null)
    setIsLoading(true)

    try {
      const bmi = calculateBMI(Number(data.weight), Number(data.height))

      // Base payload common to both types
      const basePayload = {
        age: Number(data.age),
        gender: data.gender,
        weight: Number(data.weight),
        height: Number(data.height),
        bmi,
        familyHistory: data.familyHistory,
      }

      let result: PredictionResult

      if (type === 'diabetes') {
        const diabetesPayload: DiabetesFormData = {
          ...basePayload,
          glucose: Number(data.glucose),
          bloodPressure: Number(data.bloodPressure),
          physicalActivity: data.physicalActivity!,
          ...(data.insulin && { insulin: Number(data.insulin) }),
          ...(data.pregnancies && { pregnancies: Number(data.pregnancies) }),
        }

        result = await fetchDiabetesPrediction(diabetesPayload)
      } else {
        const heartPayload: HeartFormData = {
          ...basePayload,
          cholesterol: Number(data.cholesterol),
          systolicBP: Number(data.systolicBP),
          maxHeartRate: Number(data.maxHeartRate),
          fastingBS: data.fastingBS!,
          chestPainType: data.chestPainType!,
          smoking: data.smoking!,
        }

        result = await fetchHeartPrediction(heartPayload)
      }

      onSubmit(result)
    } catch (err: any) {
      // Specific error handling
      if (err.response?.status === 422) {
        setError('Data tidak valid. Silakan periksa kembali input Anda.')
      } else if (err.response?.status === 500) {
        setError('Server sedang bermasalah. Silakan coba lagi nanti.')
      } else if (err.code === 'ECONNABORTED' || err.code === 'ERR_NETWORK') {
        setError('Koneksi terputus. Periksa koneksi internet Anda.')
      } else {
        setError(err.message || 'Terjadi kesalahan saat memproses prediksi.')
      }

      console.error('Prediction error:', err)
    } finally {
      setIsLoading(false)
    }
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
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full"
        onKeyDown={(e) => {
          // Prevent Enter key only on input fields, allow on textarea
          if (e.key === 'Enter' && (e.target as HTMLElement).tagName === 'INPUT') {
            e.preventDefault()
          }
        }}
      >
        <ProgressBar
          currentStep={currentStep}
          totalSteps={3}
          steps={steps}
          type={type}
        />

        <div className="bg-[#111827] rounded-2xl p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <h3 className="text-xl font-bold text-white mb-1">
                {steps[currentStep - 1].label}
              </h3>
              <p className="text-[#94A3B8] text-sm mb-6">
                Langkah {currentStep} dari 3
              </p>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-3"
          >
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </motion.div>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1 || isLoading}
            className={`px-6 py-3 rounded-xl border border-[#1E3A5F] text-sm font-medium transition-all ${
              currentStep === 1 || isLoading
                ? 'text-[#94A3B8] opacity-50 cursor-not-allowed'
                : 'text-white hover:bg-[#1E293B]'
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
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
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
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      fill="none" 
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" 
                    />
                  </svg>
                  <span>Memproses...</span>
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