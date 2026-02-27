'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface StepHistoryHeartProps {
  register: any
  errors: FieldErrors<any>
}

export default function StepHistoryHeart({ register, errors }: StepHistoryHeartProps) {
  return (
    <div className="space-y-6">
      {/* Status Merokok */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Status Merokok
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="never"
              {...register('smoking', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-red-600 bg-[#1A2236] border-gray-700 focus:ring-red-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-red-400 transition-colors">
              Tidak pernah
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="former"
              {...register('smoking', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-red-600 bg-[#1A2236] border-gray-700 focus:ring-red-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-red-400 transition-colors">
              Pernah, sudah berhenti
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="current"
              {...register('smoking', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-red-600 bg-[#1A2236] border-gray-700 focus:ring-red-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-red-400 transition-colors">
              Masih merokok
            </span>
          </label>
        </div>
        {errors.smoking && (
          <p className="mt-1 text-xs text-red-400">{String(errors.smoking.message)}</p>
        )}
      </div>

      {/* Riwayat Penyakit Jantung Keluarga */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Riwayat Penyakit Jantung Keluarga
        </label>
        <select
          {...register('familyHistory', { required: 'Pilih salah satu' })}
          className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all"
        >
          <option value="">Pilih...</option>
          <option value="no">Tidak ada</option>
          <option value="yes">Ada</option>
        </select>
        {errors.familyHistory && (
          <p className="mt-1 text-xs text-red-400">{String(errors.familyHistory.message)}</p>
        )}
      </div>

      {/* Aktivitas Fisik */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Aktivitas Fisik
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="rarely"
              {...register('physicalActivity', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-red-600 bg-[#1A2236] border-gray-700 focus:ring-red-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-red-400 transition-colors">
              Jarang {'<'} 1x seminggu
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="sometimes"
              {...register('physicalActivity', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-red-600 bg-[#1A2236] border-gray-700 focus:ring-red-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-red-400 transition-colors">
              Kadang 1-3x seminggu
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="often"
              {...register('physicalActivity', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-red-600 bg-[#1A2236] border-gray-700 focus:ring-red-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-red-400 transition-colors">
              Sering {'>'} 3x seminggu
            </span>
          </label>
        </div>
        {errors.physicalActivity && (
          <p className="mt-1 text-xs text-red-400">{String(errors.physicalActivity.message)}</p>
        )}
      </div>
    </div>
  )
}
