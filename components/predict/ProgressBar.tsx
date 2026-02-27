'use client'

import { motion } from 'framer-motion'
import { PredictType } from '@/lib/types'

interface Step {
  label: string
}

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: Step[]
  type: PredictType
}

export default function ProgressBar({ currentStep, totalSteps, steps, type }: ProgressBarProps) {
  const getAccentColor = () => {
    return type === 'diabetes' ? '#3B82F6' : '#EF4444'
  }

  const accentColor = getAccentColor()

  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between items-center">
        {/* Garis penghubung background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-700 -translate-y-1/2 rounded-full" />
        
        {/* Garis penghubung progress - dianimasikan */}
        <div className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full overflow-hidden">
          <motion.div
            className="h-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: '0%' }}
            animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        </div>

        {/* Step circles */}
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isActive = stepNumber === currentStep
          const isPending = stepNumber > currentStep

          return (
            <div key={step.label} className="relative flex flex-col items-center z-10">
              {/* Circle */}
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300"
                style={{
                  backgroundColor: isCompleted ? accentColor : isPending ? '#1F2937' : '#111827',
                  border: isActive ? `3px solid ${accentColor}` : isCompleted ? `3px solid ${accentColor}` : '3px solid #374151',
                  color: isCompleted ? '#FFFFFF' : isPending ? '#6B7280' : accentColor,
                }}
                animate={isActive ? {
                  scale: [0.8, 1.1, 1],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </motion.div>

              {/* Label */}
              <span
                className="mt-3 text-xs font-medium uppercase tracking-wider"
                style={{ color: isActive ? accentColor : isCompleted ? accentColor : '#6B7280' }}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
