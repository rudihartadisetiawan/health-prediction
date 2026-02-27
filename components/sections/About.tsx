"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Card from "../ui/Card";

const accuracyStats = [
  { label: "Akurasi", value: "89%" },
  { label: "Precision", value: "87%" },
  { label: "Recall", value: "91%" },
  { label: "AUC-ROC", value: "0.94" },
];

const datasets = [
  { name: "Pima Indians Diabetes", disease: "Diabetes", records: "768 records" },
  { name: "UCI Heart Disease", disease: "Jantung", records: "303 records" },
  { name: "Framingham Heart Study", disease: "Jantung", records: "4,240 records" },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-[#0A0F1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-syne font-bold text-3xl md:text-4xl text-white mb-4">
            Tentang HealthPredict.id
          </h2>
        </div>

        {/* Sub-section 1: Tentang Proyek + Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div>
            <h3 className="font-syne font-semibold text-2xl text-white mb-4">
              Misi Kami
            </h3>
            <p className="text-[#94A3B8] text-base font-dm-sans leading-relaxed mb-6">
              HealthPredict.id hadir untuk meningkatkan kesadaran akan pentingnya deteksi dini
              penyakit tidak menular di Indonesia. Dengan memanfaatkan teknologi machine learning,
              kami berkomitmen untuk membuat akses terhadap prediksi risiko kesehatan menjadi lebih
              mudah, cepat, dan terjangkau bagi seluruh masyarakat Indonesia.
            </p>
            <p className="text-[#94A3B8] text-base font-dm-sans leading-relaxed">
              Platform ini dirancang khusus untuk membantu Anda memahami risiko kesehatan sejak dini,
              sehingga dapat mengambil langkah pencegahan yang tepat sebelum kondisi menjadi lebih serius.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {accuracyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#111827] border border-white/[0.07] rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-syne font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#94A3B8] font-dm-sans">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sub-section 2: Metodologi & Dataset */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          {/* Metodologi */}
          <Card>
            <h3 className="font-syne font-semibold text-xl text-white mb-6">
              Metodologi Model
            </h3>
            
            {/* Flow Diagram */}
            <div className="flex items-center justify-between mb-6 py-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-[#1A2236] flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">📥</span>
                </div>
                <span className="text-xs text-[#94A3B8]">Data Input</span>
              </div>
              <span className="text-[#3B82F6] text-xl">→</span>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-[#1A2236] flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">⚙️</span>
                </div>
                <span className="text-xs text-[#94A3B8]">Preprocessing</span>
              </div>
              <span className="text-[#3B82F6] text-xl">→</span>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">🤖</span>
                </div>
                <span className="text-xs text-[#94A3B8]">ML Model</span>
              </div>
              <span className="text-[#3B82F6] text-xl">→</span>
              <div className="text-center">
                <div className="w-12 h-12 rounded-lg bg-[#1A2236] flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl">📊</span>
                </div>
                <span className="text-xs text-[#94A3B8]">Output</span>
              </div>
            </div>

            <p className="text-[#94A3B8] text-sm font-dm-sans leading-relaxed">
              Model kami menggunakan ensemble <strong className="text-white">Random Forest + XGBoost</strong> yang 
              dikombinasikan untuk menghasilkan prediksi yang lebih akurat dan robust. 
              Teknik preprocessing data yang canggih memastikan kualitas input yang optimal.
            </p>
          </Card>

          {/* Dataset */}
          <Card>
            <h3 className="font-syne font-semibold text-xl text-white mb-6">
              Dataset yang Digunakan
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.07]">
                    <th className="text-left py-3 text-[#94A3B8] font-dm-sans font-medium">Nama Dataset</th>
                    <th className="text-left py-3 text-[#94A3B8] font-dm-sans font-medium">Penyakit</th>
                    <th className="text-left py-3 text-[#94A3B8] font-dm-sans font-medium">Jumlah Data</th>
                  </tr>
                </thead>
                <tbody>
                  {datasets.map((dataset, index) => (
                    <tr
                      key={dataset.name}
                      className={`border-b border-white/[0.05] ${
                        index === datasets.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="py-3 text-white font-dm-sans">{dataset.name}</td>
                      <td className="py-3 text-[#94A3B8] font-dm-sans">{dataset.disease}</td>
                      <td className="py-3 text-[#94A3B8] font-dm-sans">{dataset.records}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Sub-section 3: Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-[rgba(245,158,11,0.05)] border-l-4 border-[#F59E0B] rounded-r-xl p-6 flex gap-4">
            <span className="text-3xl flex-shrink-0">⚕️</span>
            <div>
              <h4 className="font-syne font-semibold text-white mb-2">
                Disclaimer Medis
              </h4>
              <p className="text-[#94A3B8] text-sm font-dm-sans leading-relaxed">
                Hasil prediksi yang disediakan oleh HealthPredict.id bersifat <strong>informatif</strong> dan{" "}
                <strong>bukan merupakan diagnosis medis</strong>. Platform ini dirancang sebagai alat bantu 
                untuk meningkatkan kesadaran akan risiko kesehatan, namun tidak menggantikan konsultasi 
                dengan tenaga medis profesional. Selalu konsultasikan hasil prediksi Anda dengan dokter 
                atau tenaga kesehatan yang berkualifikasi untuk diagnosis dan pengobatan yang tepat.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
