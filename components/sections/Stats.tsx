"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const statsData = [
  {
    icon: "🩸",
    value: 19500000,
    formatted: "19,5 Juta",
    label: "Penderita Diabetes",
    accent: "cyan",
    suffix: "",
  },
  {
    icon: "❤️",
    value: 2700000,
    formatted: "2,7 Juta",
    label: "Kasus Jantung/Tahun",
    accent: "red",
    suffix: "",
  },
  {
    icon: "⚠️",
    value: 50,
    formatted: "50%",
    label: "Tidak Terdiagnosis",
    accent: "amber",
    suffix: "%",
    source: "IDF & Kemenkes 2023",
  },
  {
    icon: "⚡",
    value: 5,
    formatted: "<5 Menit",
    label: "Waktu Prediksi",
    accent: "green",
    suffix: "",
  },
];

const accentColors: Record<string, string> = {
  cyan: "#06B6D4",
  red: "#EF4444",
  amber: "#F59E0B",
  green: "#10B981",
};

export default function Stats() {
  return (
    <section className="py-20 bg-[#0D1526]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-4">
            Mengapa Deteksi Dini Itu Penting?
          </h2>
          <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto">
            Data prevalensi penyakit tidak menular di Indonesia
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: typeof statsData[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative bg-[#111827] border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.15] transition-colors"
    >
      {/* Icon */}
      <div className="text-5xl mb-6">{stat.icon}</div>

      {/* Number */}
      <div className="mb-2">
        <span className="font-syne font-bold text-4xl text-white">
          {isInView ? (
            stat.suffix === "%" ? (
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                enableScrollSpy={false}
                suffix={stat.suffix}
                easingFn={(t: number) => Math.max(0, Math.min(1, 3 * t * t - 2 * t * t * t))}
              />
            ) : (
              <CountUp
                start={0}
                end={stat.value}
                duration={2.5}
                enableScrollSpy={false}
                formattingFn={(value: number) => stat.formatted}
                easingFn={(t: number) => Math.max(0, Math.min(1, 3 * t * t - 2 * t * t * t))}
              />
            )
          ) : (
            stat.formatted
          )}
        </span>
      </div>

      {/* Accent Line */}
      <div
        className="w-12 h-1 rounded-full mb-4"
        style={{ backgroundColor: accentColors[stat.accent] }}
      />

      {/* Label */}
      <p className="text-[#94A3B8] text-sm font-dm-sans">{stat.label}</p>
      
      {/* Source */}
      {stat.source && (
        <p className="text-xs text-[#64748B] mt-1 font-dm-sans">{stat.source}</p>
      )}
    </motion.div>
  );
}
