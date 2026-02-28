'use client'

import { motion } from 'framer-motion'
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form'
import { calculateBMI } from '@/lib/scoring'

interface StepBasicDataProps {
  register: any
  errors: FieldErrors<any>
  watch: UseFormWatch<any>
}

export default function StepBasicData({ register, errors, watch }: StepBasicDataProps) {
  const weight = watch('weight')
  const height = watch('height')
  
  const bmi = weight && height ? calculateBMI(weight, height) : null
  
  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Kurus'
    if (bmi < 25) return 'Normal'
    if (bmi < 30) return 'Gemuk'
    return 'Obesitas'
  }

  const getBMICategoryColor = (bmi: number): string => {
    if (bmi < 18.5) return 'text-blue-400'
    if (bmi < 25) return 'text-green-400'
    if (bmi < 30) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Usia */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Usia
          </label>
          <input
            type="number"
            min={1}
            max={120}
            {...register('age', {
              required: 'Usia wajib diisi',
              min: { value: 1, message: 'Usia minimal 1 tahun' },
              max: { value: 120, message: 'Usia maksimal 120 tahun' },
            })}
            className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all"
            placeholder="Contoh: 35"
          />
          {errors.age && (
            <p className="mt-1 text-xs text-red-400">{String(errors.age.message)}</p>
          )}
        </div>

        {/* Jenis Kelamin */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Jenis Kelamin
          </label>
          <div className="flex gap-4">
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                value="male"
                {...register('gender', { required: 'Jenis kelamin wajib dipilih' })}
                className="sr-only peer"
              />
              <div className="px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl text-center text-white peer-checked:bg-blue-600 peer-checked:border-blue-500 peer-checked:text-white transition-all hover:bg-[#1F2940]">
                <span className="text-sm font-medium">Laki-laki</span>
              </div>
            </label>
            <label className="flex-1 cursor-pointer">
              <input
                type="radio"
                value="female"
                {...register('gender', { required: 'Jenis kelamin wajib dipilih' })}
                className="sr-only peer"
              />
              <div className="px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl text-center text-white peer-checked:bg-pink-600 peer-checked:border-pink-500 peer-checked:text-white transition-all hover:bg-[#1F2940]">
                <span className="text-sm font-medium">Perempuan</span>
              </div>
            </label>
          </div>
          {errors.gender && (
            <p className="mt-1 text-xs text-red-400">{String(errors.gender.message)}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Berat Badan */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Berat Badan
          </label>
          <div className="relative">
            <input
              type="number"
              min={20}
              max={300}
              {...register('weight', {
                required: 'Berat badan wajib diisi',
                min: { value: 20, message: 'Berat badan minimal 20 kg' },
                max: { value: 300, message: 'Berat badan maksimal 300 kg' },
              })}
              className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-12"
              placeholder="Contoh: 70"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
              kg
            </span>
          </div>
          {errors.weight && (
            <p className="mt-1 text-xs text-red-400">{String(errors.weight.message)}</p>
          )}
        </div>

        {/* Tinggi Badan */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
            Tinggi Badan
          </label>
          <div className="relative">
            <input
              type="number"
              min={50}
              max={250}
              {...register('height', {
                required: 'Tinggi badan wajib diisi',
                min: { value: 50, message: 'Tinggi badan minimal 50 cm' },
                max: { value: 250, message: 'Tinggi badan maksimal 250 cm' },
              })}
              className="w-full px-4 py-3 bg-[#1A2236] border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 transition-all pr-12"
              placeholder="Contoh: 165"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
              cm
            </span>
          </div>
          {errors.height && (
            <p className="mt-1 text-xs text-red-400">{String(errors.height.message)}</p>
          )}
        </div>
      </div>

      {/* BMI Auto-calculated */}
      {bmi !== null && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1A2236] border border-gray-700 rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Body Mass Index (BMI)
              </p>
              <p className="text-2xl font-bold text-white mt-1">{bmi}</p>
            </div>
            <div className={`text-right ${getBMICategoryColor(bmi)}`}>
              <p className="text-sm font-medium">{getBMICategory(bmi)}</p>
              <p className="text-xs text-gray-500 mt-1">
                {bmi < 18.5 ? '< 18.5' : bmi < 25 ? '18.5 - 24.9' : bmi < 30 ? '25 - 29.9' : '≥ 30'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
