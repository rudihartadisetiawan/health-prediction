"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Card from "../ui/Card";
import { useTheme } from "@/contexts/ThemeContext";

const diabetesContent = [
  {
    icon: "🩸",
    title: "Apa itu Diabetes?",
    content:
      "Diabetes adalah penyakit kronis yang terjadi ketika pankreas tidak menghasilkan cukup insulin atau tubuh tidak dapat menggunakan insulin yang dihasilkan secara efektif. Terdapat tiga jenis utama: Diabetes Tipe 1 (kondisi autoimun), Diabetes Tipe 2 (resistensi insulin), dan Diabetes Gestasional (terjadi selama kehamilan).",
    accent: "cyan",
  },
  {
    icon: "⚠️",
    title: "Faktor Risiko",
    content:
      "Faktor risiko utama diabetes meliputi obesitas atau berat badan berlebih, gaya hidup sedentari (kurang aktivitas fisik), faktor genetik atau riwayat keluarga, usia di atas 45 tahun, tekanan darah tinggi, dan kadar kolesterol abnormal.",
    accent: "amber",
  },
  {
    icon: "🔍",
    title: "Gejala Umum",
    content:
      "Gejala umum diabetes termasuk sering merasa haus dan lapar, sering buang air kecil terutama di malam hari, luka yang lambat sembuh, penglihatan kabur, kelelahan berkepanjangan, dan kesemutan atau mati rasa pada tangan dan kaki.",
    accent: "blue",
  },
  {
    icon: "✅",
    title: "Cara Mencegah",
    content:
      "Pencegahan diabetes dapat dilakukan dengan menjaga pola makan sehat dan seimbang, rutin berolahraga minimal 150 menit per minggu, menjaga berat badan ideal, menghindari rokok dan alkohol, serta melakukan pemeriksaan kesehatan rutin secara berkala.",
    accent: "green",
  },
];

const heartContent = [
  {
    icon: "❤️",
    title: "Apa itu Peny. Jantung?",
    content:
      "Penyakit jantung adalah kondisi yang mempengaruhi struktur dan fungsi jantung. Jenis yang paling umum adalah penyakit jantung koroner (penyumbatan arteri koroner), aritmia (gangguan irama jantung), dan gagal jantung. Penyakit ini dapat menyebabkan serangan jantung jika tidak ditangani.",
    accent: "red",
  },
  {
    icon: "⚠️",
    title: "Faktor Risiko",
    content:
      "Faktor risiko penyakit jantung meliputi hipertensi (tekanan darah tinggi), kolesterol tinggi, merokok, diabetes, obesitas, stres kronis, kurang aktivitas fisik, konsumsi alkohol berlebihan, dan riwayat keluarga dengan penyakit jantung.",
    accent: "amber",
  },
  {
    icon: "🚨",
    title: "Tanda Bahaya",
    content:
      "Tanda bahaya penyakit jantung termasuk nyeri dada atau dada terasa tertekan, sesak napas saat beraktivitas atau istirahat, jantung berdebar-debar, pusing atau nyeri kepala mendadak, kaki dan pergelangan kaki bengkak, serta kelelahan ekstrem.",
    accent: "red",
  },
  {
    icon: "✅",
    title: "Gaya Hidup Sehat",
    content:
      "Menerapkan gaya hidup sehat untuk jantung meliputi diet DASH (kaya buah, sayur, biji-bijian), olahraga aerobik 150 menit per minggu, berhenti merokok, mengelola stres dengan meditasi atau yoga, menjaga berat badan ideal, dan tidur cukup 7-8 jam per hari.",
    accent: "green",
  },
];

const accentBgColors: Record<string, string> = {
  cyan: "rgba(6,182,212,0.1)",
  red: "rgba(239,68,68,0.1)",
  amber: "rgba(245,158,11,0.1)",
  blue: "rgba(59,130,246,0.1)",
  green: "rgba(16,185,129,0.1)",
};

const accentTextColors: Record<string, string> = {
  cyan: "#06B6D4",
  red: "#EF4444",
  amber: "#F59E0B",
  blue: "#3B82F6",
  green: "#10B981",
};

export default function Education() {
  const { activeTab } = useTheme();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const content = activeTab === "diabetes" ? diabetesContent : heartContent;
  const title =
    activeTab === "diabetes"
      ? "Kenali Lebih Dalam Tentang Diabetes"
      : "Kenali Lebih Dalam Tentang Penyakit Jantung";

  return (
    <section id="edukasi" className="py-20 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-4">
            {title}
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {content.map((item, index) => (
              <motion.div
                key={activeTab + item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <EducationCard item={item} index={index} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  item,
  index,
}: {
  item: typeof diabetesContent[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Card
      className="group cursor-pointer h-full"
    >
      <div ref={ref} className="flex gap-4">
        {/* Icon Box */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: accentBgColors[item.accent] }}
        >
          {item.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3
            className="font-syne font-semibold text-lg text-white mb-2"
            style={{ color: accentTextColors[item.accent] }}
          >
            {item.title}
          </h3>
          <p className="text-[#94A3B8] text-sm font-dm-sans leading-relaxed">
            {item.content}
          </p>
        </div>
      </div>
    </Card>
  );
}
