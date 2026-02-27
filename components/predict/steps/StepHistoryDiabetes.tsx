'use client'

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'

interface StepHistoryDiabetesProps {
  register: any
  errors: FieldErrors<any>
  watch: UseFormWatch<any>
}

export default function StepHistoryDiabetes({ register, errors, watch }: StepHistoryDiabetesProps) {
  const gender = watch('gender')

  return (
    <div className="space-y-6">
      {/* Riwayat Diabetes Keluarga */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          Riwayat Diabetes Keluarga
        </label>
        <select
          {...register('familyHistory', { required: 'Pilih salah satu' })}
          className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white transition-all"
        >
          <option value="">Pilih...</option>
          <option value="no">Tidak ada</option>
          <option value="yes">Ada - orang tua</option>
          <option value="yes-sibling">Ada - saudara kandung</option>
        </select>
        {errors.familyHistory && (
          <p className="mt-1 text-xs text-red-400">{String(errors.familyHistory.message)}</p>
        )}
      </div>

      {/* Jumlah Kehamilan - hanya untuk perempuan */}
      {gender === 'female' && (
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Jumlah Kehamilan
          </label>
          <input
            type="number"
            min={0}
            max={20}
            {...register('pregnancies', {
              min: { value: 0, message: 'Nilai minimal 0' },
              max: { value: 20, message: 'Nilai tidak valid' },
            })}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
            placeholder="0"
          />
          {errors.pregnancies && (
            <p className="mt-1 text-xs text-red-400">{String(errors.pregnancies.message)}</p>
          )}
        </div>
      )}

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
              className="w-5 h-5 text-blue-600 bg-[#1A2236] border-gray-700 focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-blue-400 transition-colors">
              Jarang {'<'} 1x seminggu
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="sometimes"
              {...register('physicalActivity', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-blue-600 bg-[#1A2236] border-gray-700 focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-blue-400 transition-colors">
              Kadang 1-3x seminggu
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              value="often"
              {...register('physicalActivity', { required: 'Pilih salah satu' })}
              className="w-5 h-5 text-blue-600 bg-[#1A2236] border-gray-700 focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-white text-sm group-hover:text-blue-400 transition-colors">
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
