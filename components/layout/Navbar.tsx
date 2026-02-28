"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { activeTab, setActiveTab } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const pathname = usePathname();
  const router = useRouter();

  // Track active section using scroll position (more accurate than IntersectionObserver)
  useEffect(() => {
    if (pathname !== '/') return;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const sectionIds = ['beranda', 'edukasi', 'cta', 'about'];
      
      let currentSection = 'beranda';
      let minDistance = Infinity;

      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
        // Section is in viewport (top is at or above 50% of viewport)
        if (rect.top <= windowHeight * 0.5 && distance < minDistance) {
          minDistance = distance;
          currentSection = id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation for Beranda, Edukasi, Tentang
  const handleNavClick = (sectionId: string) => {
    if (pathname === "/") {
      // Already on home page - just scroll
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home page with hash
      router.push(`/#${sectionId}`);
    }
  };

  // Handle Diabetes/Jantung button clicks
  const handleTabClick = (tab: "diabetes" | "heart") => {
    setActiveTab(tab);
    if (pathname.startsWith("/predict")) {
      router.push(`/predict/${tab}`);
    }
    // If on home page, just setActiveTab (no navigation needed)
  };

  // Handle Prediksi button click
  const handlePrediksiClick = () => {
    if (pathname.startsWith('/predict')) {
      // Already on prediction page - scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (pathname === '/') {
      // On home page - scroll to CTA section
      document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // On other page - navigate to home page then to CTA
      router.push('/#cta');
    }
  };

  // Check if a nav menu should be active
  const isNavActive = (name: string) => {
    if (name === "Prediksi") {
      return pathname.startsWith("/predict") || activeSection === "cta";
    }
    if (pathname === "/") {
      if (name === "Beranda") return activeSection === "beranda";
      if (name === "Edukasi") return activeSection === "edukasi";
      if (name === "Tentang") return activeSection === "about";
    }
    return false;
  };

  const isPrediksiActive = pathname.startsWith("/predict") || activeSection === "cta";

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 ease
        ${
          scrolled
            ? "bg-[#0A0F1E]/80 backdrop-blur-md border-b border-white/[0.07]"
            : "bg-transparent border-b border-transparent"
        }
      `}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Left Corner */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4] shadow-[0_0_12px_#06B6D4]" />
            <span className="font-syne font-bold text-xl text-white">
              HealthPredict
            </span>
            <span className="font-syne font-bold text-xl text-[#06B6D4]">
              .id
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
            {/* Beranda */}
            <button
              onClick={() => handleNavClick("beranda")}
              className="relative inline-block text-sm font-medium transition-colors"
            >
              <span className={isNavActive("Beranda") ? "text-white" : "text-[#94A3B8] hover:text-white"}>
                Beranda
              </span>
              {isNavActive("Beranda") && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3B82F6] rounded-full transition-opacity duration-150"
                />
              )}
            </button>

            {/* Edukasi */}
            <button
              onClick={() => handleNavClick("edukasi")}
              className="relative inline-block text-sm font-medium transition-colors"
            >
              <span className={isNavActive("Edukasi") ? "text-white" : "text-[#94A3B8] hover:text-white"}>
                Edukasi
              </span>
              {isNavActive("Edukasi") && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3B82F6] rounded-full transition-opacity duration-150"
                />
              )}
            </button>

            {/* Prediksi - Direct navigate, no dropdown */}
            <button
              onClick={handlePrediksiClick}
              className="relative inline-block text-sm font-medium transition-colors"
            >
              <span className={isPrediksiActive ? "text-white" : "text-[#94A3B8] hover:text-white"}>
                Prediksi
              </span>
              {isPrediksiActive && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3B82F6] rounded-full transition-opacity duration-150"
                />
              )}
            </button>

            {/* Tentang */}
            <button
              onClick={() => handleNavClick("about")}
              className="relative inline-block text-sm font-medium transition-colors"
            >
              <span className={isNavActive("Tentang") ? "text-white" : "text-[#94A3B8] hover:text-white"}>
                Tentang
              </span>
              {isNavActive("Tentang") && (
                <span
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#3B82F6] rounded-full transition-opacity duration-150"
                />
              )}
            </button>
          </div>

          {/* CTA Buttons - Right Corner (Diabetes/Jantung) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="inline-flex p-1 bg-[#1A2236] rounded-full border border-white/[0.07]">
              <button
                onClick={() => handleTabClick("diabetes")}
                className={`
                  relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${activeTab === "diabetes" ? "text-white" : "text-white/60"}
                `}
              >
                <span
                  className={`
                    absolute inset-0 rounded-full transition-all duration-150
                    ${activeTab === "diabetes" 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-95"
                    }
                  `}
                  style={{ 
                    background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                    transformOrigin: 'center'
                  }}
                />
                <span className="relative z-10">🩸 Diabetes</span>
              </button>
              <button
                onClick={() => handleTabClick("heart")}
                className={`
                  relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${activeTab === "heart" ? "text-white" : "text-white/60"}
                `}
              >
                <span
                  className={`
                    absolute inset-0 rounded-full transition-all duration-150
                    ${activeTab === "heart" 
                      ? "opacity-100 scale-100" 
                      : "opacity-0 scale-95"
                    }
                  `}
                  style={{ 
                    background: 'linear-gradient(135deg, #EF4444, #F59E0B)',
                    transformOrigin: 'center'
                  }}
                />
                <span className="relative z-10">❤️ Jantung</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden bg-[#0A0F1E] border-b border-white/[0.07] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <button
                onClick={() => {
                  handleNavClick("beranda");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium text-white/80 hover:text-white"
              >
                Beranda
              </button>
              <button
                onClick={() => {
                  handleNavClick("edukasi");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium text-white/80 hover:text-white"
              >
                Edukasi
              </button>
              <button
                onClick={() => {
                  handlePrediksiClick();
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium text-white/80 hover:text-white"
              >
                Prediksi
              </button>
              <button
                onClick={() => {
                  handleNavClick("about");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-sm font-medium text-white/80 hover:text-white"
              >
                Tentang
              </button>
              <div className="pt-4 border-t border-white/[0.07] flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleTabClick("diabetes");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white text-sm font-medium"
                >
                  🩸 Prediksi Diabetes
                </button>
                <button
                  onClick={() => {
                    handleTabClick("heart");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white text-sm font-medium"
                >
                  ❤️ Prediksi Jantung
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
