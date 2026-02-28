'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface StepHistoryHeartProps {
  register: UseFormRegister<any>
  errors: FieldErrors
}

export default function StepHistoryHeart({ register, errors }: StepHistoryHeartProps) {
  return (
    <div className="space-y-6">
      {/* Riwayat Penyakit Jantung Keluarga */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Riwayat Keluarga Penyakit Jantung
          <span className="text-red-400 ml-1">*</span>
        </label>
        <select
          {...register('familyHistory', { 
            required: 'Riwayat keluarga wajib dipilih' 
          })}
          className={`w-full px-4 py-3 bg-[#1E293B] border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
            errors.familyHistory 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[#334155] focus:ring-red-500'
          }`}
        >
          <option value="">Pilih...</option>
          <option value="yes">Ya, Ada Riwayat</option>
          <option value="no">Tidak Ada</option>
        </select>
        {errors.familyHistory && (
          <p className="text-red-400 text-sm mt-1.5">
            {errors.familyHistory.message as string}
          </p>
        )}
      </div>

      {/* Status Merokok */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Status Merokok
          <span className="text-red-400 ml-1">*</span>
        </label>
        <select
          {...register('smoking', { 
            required: 'Status merokok wajib dipilih' 
          })}
          className={`w-full px-4 py-3 bg-[#1E293B] border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
            errors.smoking 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[#334155] focus:ring-red-500'
          }`}
        >
          <option value="">Pilih...</option>
          <option value="never">Tidak Pernah Merokok</option>
          <option value="former">Dulu Merokok (Sudah Berhenti)</option>
          <option value="current">Masih Merokok</option>
        </select>
        {errors.smoking && (
          <p className="text-red-400 text-sm mt-1.5">
            {errors.smoking.message as string}
          </p>
        )}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-blue-300">
            Informasi riwayat kesehatan membantu model AI memberikan prediksi yang lebih akurat untuk kondisi jantung Anda.
          </p>
        </div>
      </div>
    </div>
  )
}
