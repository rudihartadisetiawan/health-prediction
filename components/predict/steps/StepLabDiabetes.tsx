'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface StepLabDiabetesProps {
  register: any
  errors: FieldErrors<any>
}

export default function StepLabDiabetes({ register, errors }: StepLabDiabetesProps) {
  return (
    <div className="space-y-6">
      {/* Kadar Glukosa Puasa */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Kadar Glukosa Puasa
          </label>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Nilai normal: 70-99 mg/dL
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            min={30}
            max={500}
            {...register('glucose', {
              required: 'Kadar glukosa wajib diisi',
              min: { value: 30, message: 'Nilai tidak valid' },
              max: { value: 500, message: 'Nilai tidak valid' },
            })}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-20"
            placeholder="0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            mg/dL
          </span>
        </div>
        {errors.glucose && (
          <p className="mt-1 text-xs text-red-400">{String(errors.glucose.message)}</p>
        )}
      </div>

      {/* Tekanan Darah Diastolik */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Tekanan Darah Diastolik
          </label>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Nilai normal: 60-80 mmHg
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            min={40}
            max={200}
            {...register('bloodPressure', {
              required: 'Tekanan darah wajib diisi',
              min: { value: 40, message: 'Nilai tidak valid' },
              max: { value: 200, message: 'Nilai tidak valid' },
            })}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-16"
            placeholder="0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            mmHg
          </span>
        </div>
        {errors.bloodPressure && (
          <p className="mt-1 text-xs text-red-400">{String(errors.bloodPressure.message)}</p>
        )}
      </div>

      {/* Kadar Insulin (Optional) */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Kadar Insulin <span className="text-gray-500 font-normal">(Opsional)</span>
          </label>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Opsional jika tersedia
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            min={0}
            max={500}
            {...register('insulin')}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-20"
            placeholder="0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            μU/mL
          </span>
        </div>
        {errors.insulin && (
          <p className="mt-1 text-xs text-red-400">{String(errors.insulin.message)}</p>
        )}
      </div>
    </div>
  )
}
