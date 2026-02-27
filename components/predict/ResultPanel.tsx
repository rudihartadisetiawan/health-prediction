'use client'

import { motion } from 'framer-motion'
import { PredictType, PredictionResult } from '@/lib/types'
import { RISK_CONFIG } from '@/lib/constants'

interface ResultPanelProps {
  result: PredictionResult
  type: PredictType
  onReset: () => void
}

export default function ResultPanel({ result, type, onReset }: ResultPanelProps) {
  const riskConfig = RISK_CONFIG[result.riskLevel]
  const accentColor = type === 'diabetes' ? '#3B82F6' : '#EF4444'

  const panelVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, delay: 0.3 }
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* Risk Header */}
      <motion.div
        className="rounded-2xl p-6 mb-6 border"
        style={{
          backgroundColor: riskConfig.bg,
          borderColor: riskConfig.color,
        }}
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{riskConfig.icon}</span>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-1">
              {riskConfig.label}
            </h3>
            <p className="text-sm" style={{ color: riskConfig.color }}>
              Skor Risiko: {result.score}%
            </p>
          </div>
          <div className="text-5xl font-bold" style={{ color: riskConfig.color }}>
            {result.score}%
          </div>
        </div>
      </motion.div>

      {/* Gauge Bar */}
      <motion.div variants={itemVariants} className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">
          Tingkat Risiko
        </p>
        <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: riskConfig.color }}
            initial={{ width: '0%' }}
            animate={{ width: `${result.score}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Rendah</span>
          <span>Sedang</span>
          <span>Tinggi</span>
        </div>
      </motion.div>

      {/* Faktor Kontribusi */}
      <motion.div variants={itemVariants} className="mb-8">
        <h4 className="text-lg font-bold text-white mb-4">
          Faktor yang Mempengaruhi
        </h4>
        <div className="space-y-3">
          {result.factors.map((factor, index) => (
            <motion.div
              key={factor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-sm text-gray-300 w-40 truncate">{factor.name}</span>
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: factor.color }}
                  initial={{ width: '0%' }}
                  animate={{ width: `${factor.value}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                />
              </div>
              <span className="text-sm font-medium text-gray-400 w-12 text-right">
                {factor.value}%
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Penjelasan */}
      <motion.div variants={itemVariants} className="mb-8">
        <h4 className="text-lg font-bold text-white mb-4">
          Penjelasan Hasil
        </h4>
        <div className="bg-[#1A2236] rounded-xl p-5 border border-gray-700">
          <p className="text-gray-300 leading-relaxed">
            {result.explanation}
          </p>
        </div>
      </motion.div>

      {/* Rekomendasi */}
      <motion.div variants={itemVariants} className="mb-8">
        <h4 className="text-lg font-bold text-white mb-4">
          Rekomendasi Tindakan
        </h4>
        <div className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div
                className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                style={{ backgroundColor: riskConfig.color }}
              />
              <p className="text-gray-300">{rec}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <button
          onClick={onReset}
          className="flex-1 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-medium transition-all"
        >
          Coba Lagi
        </button>
        <a
          href="https://www.google.com/maps/search/dokter+terdekat"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-6 py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          style={{
            backgroundColor: riskConfig.color,
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Konsultasi ke Dokter
        </a>
      </motion.div>
    </motion.div>
  )
}
