"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: 1,
    icon: "📋",
    title: "Input Data Lab",
    description:
      "Masukkan data dari hasil pemeriksaan laboratorium rutin Anda seperti kadar glukosa, kolesterol, dan tekanan darah",
    color: "from-[#3B82F6] to-[#06B6D4]",
    bgGlow: "rgba(59,130,246,0.15)",
  },
  {
    number: 2,
    icon: "🤖",
    title: "AI Menganalisis",
    description:
      "Model machine learning kami memproses data Anda dan menghitung skor risiko berdasarkan ribuan data medis",
    color: "from-[#06B6D4] to-[#14B8A6]",
    bgGlow: "rgba(6,182,212,0.15)",
  },
  {
    number: 3,
    icon: "📊",
    title: "Lihat Hasil",
    description:
      "Dapatkan skor risiko lengkap, faktor kontribusi, dan rekomendasi tindakan yang personal untuk Anda",
    color: "from-[#14B8A6] to-[#10B981]",
    bgGlow: "rgba(20,184,166,0.15)",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-[#0A0F1E] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-4">
            Bagaimana Cara Kerjanya?
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Tiga langkah mudah untuk mengetahui risiko kesehatan Anda
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <StepCard step={step} index={index} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="group relative bg-[#111827] border border-white/[0.07] rounded-[20px] p-8 hover:border-[#3B82F6]/50 transition-colors overflow-hidden"
      whileHover={{ y: -5 }}
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${step.bgGlow} 0%, transparent 70%)`,
        }}
      />
      
      {/* Number Circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.1 }}
        className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
      >
        <span className="font-syne font-bold text-2xl text-white">
          {step.number}
        </span>
      </motion.div>

      {/* Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.2 + 0.2, type: "spring" }}
        className="text-4xl mb-4"
      >
        {step.icon}
      </motion.div>

      {/* Title */}
      <h3 className="font-syne font-semibold text-xl text-white mb-3">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-[#94A3B8] text-sm font-dm-sans leading-relaxed">
        {step.description}
      </p>

      {/* Progress Bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} origin-left`}
      />
    </motion.div>
  );
}

function ArrowConnector({ index }: { index: number }) {
  return (
    <div className="hidden lg:flex items-center justify-center">
      <svg
        width="80"
        height="40"
        viewBox="0 0 80 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id={`arrowGradient${index}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 20 L70 20 M70 20 L60 10 M70 20 L60 30"
          stroke={`url(#arrowGradient${index})`}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.6 }}
          style={{
            strokeDasharray: "8 4",
          }}
        />
      </svg>
    </div>
  );
}
