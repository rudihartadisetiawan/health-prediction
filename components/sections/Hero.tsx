"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "../ui/Button";
import { useTheme } from "@/contexts/ThemeContext";

const DiabetesAnimation = dynamic(
  () => import("@/components/animations/DiabetesAnimation"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-[24px] bg-[#1A2236] animate-pulse" />
    ),
  }
);

const HeartAnimation = dynamic(
  () => import("@/components/animations/HeartAnimation"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full rounded-[24px] bg-[#1A2236] animate-pulse" />
    ),
  }
);

// Badge Component
interface BadgeProps {
  variant: "cyan" | "red";
  children: React.ReactNode;
}

function Badge({ variant, children }: BadgeProps) {
  const bgColor = variant === "cyan" 
    ? "rgba(6, 182, 212, 0.1)" 
    : "rgba(239, 68, 68, 0.1)";
  const borderColor = variant === "cyan"
    ? "rgba(6, 182, 212, 0.25)"
    : "rgba(239, 68, 68, 0.25)";
  const dotColor = variant === "cyan" ? "#06B6D4" : "#EF4444";

  return (
    <div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
      style={{
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
      }}
    >
      <span
        className="w-2 h-2 rounded-full animate-pulse"
        style={{ backgroundColor: dotColor }}
      />
      <span
        className="text-[11px] font-semibold uppercase tracking-[1.5px]"
        style={{ color: dotColor }}
      >
        {children}
      </span>
    </div>
  );
}

export default function Hero() {
  const { activeTab, setActiveTab } = useTheme();
  const scrollPosRef = React.useRef(0);
  const [scrollPos, setScrollPos] = React.useState(0);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      // Update ref immediately for latest value
      scrollPosRef.current = window.scrollY;
      
      // Use requestAnimationFrame for smooth updates
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setScrollPos(scrollPosRef.current);
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Parallax calculations
  const backgroundY = Math.min(scrollPos * 0.2, 200);
  const contentY = Math.max(scrollPos * -0.125, -100);
  const contentOpacity = Math.max(1 - scrollPos / 600, 0);
  const particlesY = Math.max(scrollPos * -0.3, -300);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleEdukasiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const edukasiSection = document.getElementById("edukasi");
    if (edukasiSection) {
      edukasiSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as any },
    },
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as any },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as any },
    },
  };

  return (
    <section
      id="beranda"
      className="relative min-h-screen pt-40 pb-20 overflow-hidden px-6 md:px-20"
      style={{
        background:
          activeTab === "diabetes"
            ? "radial-gradient(circle at 30% 20%, #1e3a5f 0%, #0A0F1E 60%)"
            : "radial-gradient(circle at 70% 20%, #3b1010 0%, #0A0F1E 60%)",
      }}
    >
      {/* Background Decorations */}
      <div
        style={{ transform: `translateY(${backgroundY}px)` }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-[#06B6D4]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-[#3B82F6]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
        {activeTab === "heart" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-[#EF4444]/5 to-transparent rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-tr from-[#F59E0B]/5 to-transparent rounded-full blur-3xl animate-pulse-glow" />
          </>
        )}
        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              transform: `translateY(${particlesY}px)`,
              top: `${20 + i * 15}%`,
              left: `${10 + (i % 3) * 25}%`,
            }}
            className={`absolute w-2 h-2 rounded-full animate-float ${
              activeTab === "diabetes"
                ? i % 2 === 0 ? "bg-[#06B6D4]/30" : "bg-[#3B82F6]/30"
                : i % 2 === 0 ? "bg-[#EF4444]/30" : "bg-[#F59E0B]/30"
            }`}
          />
        ))}
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      {/* Content */}
      <div
        style={{
          transform: `translateY(${contentY}px)`,
          opacity: contentOpacity,
        }}
        className="max-w-7xl mx-auto relative z-10 h-full"
      >
        <AnimatePresence mode="wait">
          {activeTab === "diabetes" ? (
            <motion.div
              key="diabetes"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]"
            >
              {/* Left Column - Animation (480x420px) */}
              <motion.div
                key="diabetes-anim"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="order-1 lg:order-1 flex items-center justify-center"
              >
                <div
                  className="relative"
                  style={{
                    width: "480px",
                    height: "420px",
                    maxWidth: "100%",
                  }}
                >
                  <DiabetesAnimation />
                </div>
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                key="diabetes-content"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
                className="order-2 lg:order-2"
              >
                <Badge variant="cyan">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse" />
                  Deteksi Dini Berbasis Data Lab
                </Badge>

                <motion.h1
                  variants={textItemVariants}
                  className="font-syne font-bold text-white leading-tight mb-6"
                  style={{
                    fontSize: "clamp(32px, 4vw, 48px)",
                    letterSpacing: "-1.5px",
                    lineHeight: 1.1,
                  }}
                >
                  Kenali Risiko{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#14B8A6] animate-gradient bg-300%">
                    Diabetes
                  </span>{" "}
                  Anda Sebelum Terlambat
                </motion.h1>

                <motion.p
                  variants={textItemVariants}
                  className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                >
                  Gunakan kecerdasan buatan untuk mendeteksi risiko diabetes
                  sejak dini. Cukup masukkan data laboratorium rutin Anda dan
                  dapatkan analisis risiko yang akurat dalam hitungan menit.
                </motion.p>

                <motion.div variants={textItemVariants} className="flex gap-4 mb-6">
                  <Button
                    variant="primary-diabetes"
                    size="lg"
                    href="/predict/diabetes"
                  >
                    Cek Risiko Diabetes →
                  </Button>
                </motion.div>

                <motion.div variants={textItemVariants}>
                  <button
                    onClick={handleEdukasiClick}
                    className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    Pelajari lebih lanjut{" "}
                    <motion.span
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="group-hover:text-[#06B6D4] transition-colors"
                    >
                      ↓
                    </motion.span>
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="heart"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[600px]"
            >
              {/* Left Column - Content */}
              <motion.div
                key="heart-content"
                variants={textContainerVariants}
                initial="hidden"
                animate="visible"
                className="order-1 lg:order-1"
              >
                <Badge variant="red">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                  Deteksi Dini Penyakit Jantung
                </Badge>

                <motion.h1
                  variants={textItemVariants}
                  className="font-syne font-bold text-white leading-tight mb-6"
                  style={{
                    fontSize: "clamp(32px, 4vw, 48px)",
                    letterSpacing: "-1.5px",
                    lineHeight: 1.1,
                  }}
                >
                  Jaga Jantung Anda,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] via-[#F59E0B] to-[#F97316] animate-gradient bg-300%">
                    Deteksi Risiko
                  </span>{" "}
                  Sejak Dini
                </motion.h1>

                <motion.p
                  variants={textItemVariants}
                  className="text-[#94A3B8] text-base md:text-lg leading-relaxed mb-8 max-w-lg"
                >
                  Analisis risiko penyakit jantung menggunakan AI canggih.
                  Masukkan data kesehatan Anda dan dapatkan prediksi risiko
                  beserta rekomendasi pencegahan yang personal.
                </motion.p>

                <motion.div variants={textItemVariants} className="flex gap-4 mb-6">
                  <Button
                    variant="primary-heart"
                    size="lg"
                    href="/predict/heart"
                  >
                    Cek Risiko Jantung →
                  </Button>
                </motion.div>

                <motion.div variants={textItemVariants}>
                  <button
                    onClick={handleEdukasiClick}
                    className="text-[#94A3B8] hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    Pelajari lebih lanjut{" "}
                    <motion.span
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="group-hover:text-[#EF4444] transition-colors"
                    >
                      ↓
                    </motion.span>
                  </button>
                </motion.div>
              </motion.div>

              {/* Right Column - Animation (480x420px) */}
              <motion.div
                key="heart-anim"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="order-2 lg:order-2 flex items-center justify-center"
              >
                <div
                  className="relative"
                  style={{
                    width: "480px",
                    height: "420px",
                    maxWidth: "100%",
                  }}
                >
                  <HeartAnimation />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding-top: 32px !important;
            padding-bottom: 40px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          
          .grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .order-1 {
            order: 1 !important;
          }
          
          .order-2 {
            order: 2 !important;
          }
          
          [style*="width: \"480px\""] {
            width: 100% !important;
            max-width: 320px !important;
            height: 260px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </section>
  );
}
