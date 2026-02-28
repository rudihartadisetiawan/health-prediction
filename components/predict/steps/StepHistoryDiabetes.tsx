'use client'

import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'

interface StepHistoryDiabetesProps {
  register: UseFormRegister<any>
  errors: FieldErrors
  watch: UseFormWatch<any>
}

export default function StepHistoryDiabetes({ register, errors, watch }: StepHistoryDiabetesProps) {
  const gender = watch('gender')

  return (
    <div className="space-y-6">
      {/* Riwayat Diabetes Keluarga */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Riwayat Keluarga Diabetes
          <span className="text-red-400 ml-1">*</span>
        </label>
        <select
          {...register('familyHistory', { 
            required: 'Riwayat keluarga wajib dipilih' 
          })}
          className={`w-full px-4 py-3 bg-[#1E293B] border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
            errors.familyHistory 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[#334155] focus:ring-blue-500'
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

      {/* Aktivitas Fisik */}
      <div>
        <label className="block text-sm font-medium text-white mb-2">
          Aktivitas Fisik
          <span className="text-red-400 ml-1">*</span>
        </label>
        <select
          {...register('physicalActivity', { 
            required: 'Tingkat aktivitas fisik wajib dipilih' 
          })}
          className={`w-full px-4 py-3 bg-[#1E293B] border rounded-xl text-white focus:outline-none focus:ring-2 transition-all ${
            errors.physicalActivity 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-[#334155] focus:ring-blue-500'
          }`}
        >
          <option value="">Pilih...</option>
          <option value="rarely">Jarang (&lt;1x/minggu)</option>
          <option value="sometimes">Kadang-kadang (1-3x/minggu)</option>
          <option value="often">Sering (&gt;3x/minggu)</option>
        </select>
        {errors.physicalActivity && (
          <p className="text-red-400 text-sm mt-1.5">
            {errors.physicalActivity.message as string}
          </p>
        )}
      </div>

      {/* Jumlah Kehamilan - hanya untuk perempuan */}
      {gender === 'female' && (
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Riwayat Kehamilan
          </label>
          <input
            type="number"
            {...register('pregnancies', {
              min: { value: 0, message: 'Tidak boleh negatif' },
              max: { value: 20, message: 'Nilai terlalu besar' }
            })}
            placeholder="Jumlah kehamilan (opsional)"
            className={`w-full px-4 py-3 bg-[#1E293B] border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
              errors.pregnancies 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-[#334155] focus:ring-blue-500'
            }`}
          />
          {errors.pregnancies && (
            <p className="text-red-400 text-sm mt-1.5">
              {errors.pregnancies.message as string}
            </p>
          )}
        </div>
      )}

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 mt-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p className="text-sm text-blue-300">
            Aktivitas fisik teratur dapat mengurangi risiko diabetes hingga 50%. Riwayat keluarga juga faktor penting dalam prediksi.
          </p>
        </div>
      </div>
    </div>
  )
}
