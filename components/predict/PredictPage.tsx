'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PredictType, PredictionResult } from '@/lib/types'
import { PREDICT_CONFIG } from '@/lib/constants'
import MultiStepForm from './MultiStepForm'
import ResultPanel from './ResultPanel'

interface PredictPageProps {
  type: PredictType
}

export default function PredictPage({ type }: PredictPageProps) {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const config = PREDICT_CONFIG[type]

  const handleSubmit = (predictionResult: PredictionResult) => {
    setResult(predictionResult)
    // Scroll ke panel hasil
    setTimeout(() => {
      document.getElementById('result-panel')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }, 100)
  }

  const handleReset = () => {
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Info - 40% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className="sticky top-8 space-y-6">
              {/* Header Card */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl">{config.icon}</span>
                  <h1 className="text-2xl font-bold text-white">
                    {config.title}
                  </h1>
                </div>
                <p className="text-gray-400 leading-relaxed">
                  {config.description}
                </p>
              </div>

              {/* Parameter Card */}
              <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                  Parameter yang Dibutuhkan
                </h3>
                <ul className="space-y-3">
                  {config.parameters.map((param, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: config.color.primary }}
                      />
                      <span className="text-gray-300">{param}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips Card */}
              <div className="bg-[#1A2236] rounded-2xl p-6 border border-gray-700">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
                  💡 Tips
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Untuk hasil yang akurat, pastikan Anda memasukkan data laboratorium 
                  terbaru dari hasil pemeriksaan medis. Data yang tidak akurat dapat 
                  mempengaruhi hasil prediksi.
                </p>
              </div>

              {/* Disclaimer */}
              <div className="bg-[#1A2236] rounded-xl p-4 border border-amber-900/50">
                <div className="flex items-start gap-3">
                  <span className="text-xl">⚠️</span>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <strong className="text-amber-500">Disclaimer:</strong> Hasil 
                    prediksi ini hanya untuk tujuan informasi dan edukasi. Tidak 
                    menggantikan diagnosis medis profesional. Selalu konsultasikan 
                    dengan dokter untuk diagnosis dan pengobatan yang tepat.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content - 60% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <div className="bg-[#0B0F19] rounded-2xl">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MultiStepForm type={type} onSubmit={handleSubmit} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    id="result-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ResultPanel
                      result={result}
                      type={type}
                      onReset={handleReset}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
