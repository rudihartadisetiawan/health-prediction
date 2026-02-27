"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Logo & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_12px_#06B6D4]" />
              <span className="font-syne font-bold text-xl text-white">
                HealthPredict
              </span>
              <span className="font-syne font-bold text-xl text-[#06B6D4]">
                .id
              </span>
            </div>
            <p className="text-sm text-white/60 font-dm-sans">
              Deteksi dini untuk hidup lebih sehat
            </p>
            <p className="text-xs text-white/40 font-dm-sans">
              © 2025 HealthPredict.id
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-dm-sans">
              Navigasi
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-white/60 hover:text-white transition-colors font-dm-sans"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/predict/diabetes"
                  className="text-sm text-white/60 hover:text-white transition-colors font-dm-sans"
                >
                  Prediksi Diabetes
                </Link>
              </li>
              <li>
                <Link
                  href="/predict/heart"
                  className="text-sm text-white/60 hover:text-white transition-colors font-dm-sans"
                >
                  Prediksi Jantung
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-sm text-white/60 hover:text-white transition-colors font-dm-sans"
                >
                  Tentang
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Medical Disclaimer */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-dm-sans">
              Disclaimer Medis
            </h3>
            <p className="text-xs text-[#64748B] font-dm-sans leading-relaxed">
              Hasil prediksi yang disediakan oleh HealthPredict.id bersifat
              informatif dan bukan merupakan diagnosis medis. Selalu konsultasikan
              dengan tenaga medis profesional untuk diagnosis dan pengobatan yang
              tepat.
            </p>
          </div>

          {/* Column 4 - Technology */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 font-dm-sans">
              Dibangun dengan
            </h3>
            <ul className="space-y-2">
              <li className="text-sm text-white/60 font-dm-sans">Next.js</li>
              <li className="text-sm text-white/60 font-dm-sans">Express.js</li>
              <li className="text-sm text-white/60 font-dm-sans">
                Machine Learning
              </li>
              <li className="text-sm text-white/60 font-dm-sans">Claude AI</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
