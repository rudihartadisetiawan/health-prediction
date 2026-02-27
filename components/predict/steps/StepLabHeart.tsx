'use client'

import { UseFormRegister, FieldErrors } from 'react-hook-form'

interface StepLabHeartProps {
  register: any
  errors: FieldErrors<any>
}

export default function StepLabHeart({ register, errors }: StepLabHeartProps) {
  return (
    <div className="space-y-6">
      {/* Kolesterol Total */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Kolesterol Total
          </label>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Nilai normal: {'<'} 200 mg/dL
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            min={50}
            max={500}
            {...register('cholesterol', {
              required: 'Kolesterol wajib diisi',
              min: { value: 50, message: 'Nilai tidak valid' },
              max: { value: 500, message: 'Nilai tidak valid' },
            })}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-20"
            placeholder="0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            mg/dL
          </span>
        </div>
        {errors.cholesterol && (
          <p className="mt-1 text-xs text-red-400">{String(errors.cholesterol.message)}</p>
        )}
      </div>

      {/* Tekanan Darah Sistolik */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Tekanan Darah Sistolik
          </label>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Nilai normal: 90-120 mmHg
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            min={60}
            max={250}
            {...register('systolicBP', {
              required: 'Tekanan darah wajib diisi',
              min: { value: 60, message: 'Nilai tidak valid' },
              max: { value: 250, message: 'Nilai tidak valid' },
            })}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-16"
            placeholder="0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            mmHg
          </span>
        </div>
        {errors.systolicBP && (
          <p className="mt-1 text-xs text-red-400">{String(errors.systolicBP.message)}</p>
        )}
      </div>

      {/* Detak Jantung Maks */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Detak Jantung Maks
          </label>
          <div className="group relative">
            <svg className="w-4 h-4 text-gray-500 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Nilai normal saat istirahat: 60-100 bpm
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="number"
            min={30}
            max={250}
            {...register('maxHeartRate', {
              required: 'Detak jantung wajib diisi',
              min: { value: 30, message: 'Nilai tidak valid' },
              max: { value: 250, message: 'Nilai tidak valid' },
            })}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-16"
            placeholder="0"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
            bpm
          </span>
        </div>
        {errors.maxHeartRate && (
          <p className="mt-1 text-xs text-red-400">{String(errors.maxHeartRate.message)}</p>
        )}
      </div>

      {/* Gula Darah Puasa > 120 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Gula Darah Puasa {'>'} 120 mg/dL
          </label>
        </div>
        <select
          {...register('fastingBS', { required: 'Pilih salah satu' })}
          className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all"
        >
          <option value="">Pilih...</option>
          <option value="no">Tidak</option>
          <option value="yes">Ya</option>
        </select>
        {errors.fastingBS && (
          <p className="mt-1 text-xs text-red-400">{String(errors.fastingBS.message)}</p>
        )}
      </div>

      {/* Tipe Nyeri Dada */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
            Tipe Nyeri Dada
          </label>
        </div>
        <select
          {...register('chestPainType', { required: 'Pilih salah satu' })}
          className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white transition-all"
        >
          <option value="">Pilih...</option>
          <option value="none">Tidak ada</option>
          <option value="atypical">Atipikal</option>
          <option value="typical">Tipikal Angina</option>
        </select>
        {errors.chestPainType && (
          <p className="mt-1 text-xs text-red-400">{String(errors.chestPainType.message)}</p>
        )}
      </div>
    </div>
  )
}
