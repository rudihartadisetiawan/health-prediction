"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const { activeTab, setActiveTab } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [prediksiOpen, setPrediksiOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Beranda");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active nav based on scroll position
      if (pathname !== "/") {
        setActiveNav("Prediksi");
        return;
      }
      
      const edukasiSection = document.getElementById("edukasi");
      const aboutSection = document.getElementById("about");
      
      if (aboutSection && window.scrollY >= aboutSection.offsetTop - 300) {
        setActiveNav("Tentang");
      } else if (edukasiSection && window.scrollY >= edukasiSection.offsetTop - 200) {
        setActiveNav("Edukasi");
      } else {
        setActiveNav("Beranda");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleAboutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleEdukasiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      window.location.href = "/#edukasi";
    } else {
      const edukasiSection = document.getElementById("edukasi");
      if (edukasiSection) {
        edukasiSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const handleTabChange = (tab: "diabetes" | "heart") => {
    if (setActiveTab) {
      setActiveTab(tab);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Edukasi", href: "/#edukasi" },
  ];

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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setActiveNav(link.name);
                  if (link.name === "Beranda") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="relative inline-block text-sm font-medium transition-colors"
              >
                <span className={activeNav === link.name ? "text-white" : "text-white/80 hover:text-white"}>
                  {link.name}
                </span>
                {activeNav === link.name && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#06B6D4]"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}

            {/* Prediksi Dropdown */}
            <div className="relative inline-block">
              <button
                onMouseEnter={() => setPrediksiOpen(true)}
                onMouseLeave={() => setPrediksiOpen(false)}
                onClick={() => setActiveNav("Prediksi")}
                className="relative text-sm font-medium transition-colors"
              >
                <span className={activeNav === "Prediksi" ? "text-white" : "text-white/80 hover:text-white"}>
                  Prediksi
                </span>
                {activeNav === "Prediksi" && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#06B6D4]"
                    transition={{ duration: 0.2 }}
                  />
                )}
              </button>
              <AnimatePresence>
                {prediksiOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-[#111827] border border-white/[0.07] rounded-xl overflow-hidden shadow-2xl"
                  >
                    <Link
                      href="/predict/diabetes"
                      onClick={() => setActiveNav("Prediksi")}
                      className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
                      🩸 Prediksi Diabetes
                    </Link>
                    <Link
                      href="/predict/heart"
                      onClick={() => setActiveNav("Prediksi")}
                      className="block px-4 py-3 text-sm text-white/80 hover:text-white hover:bg-white/[0.05] transition-colors"
                    >
                      ❤️ Prediksi Jantung
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tentang */}
            <Link
              href="#about"
              onClick={(e) => {
                handleAboutClick(e);
                setActiveNav("Tentang");
              }}
              className="relative inline-block text-sm font-medium transition-colors"
            >
              <span className={activeNav === "Tentang" ? "text-white" : "text-white/80 hover:text-white"}>
                Tentang
              </span>
              {activeNav === "Tentang" && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#06B6D4]"
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          </div>

          {/* CTA Buttons - Right Corner */}
          <div className="hidden md:flex items-center gap-3">
            <div className="inline-flex p-1 bg-[#1A2236] rounded-full border border-white/[0.07]">
              <motion.button
                onClick={() => handleTabChange("diabetes")}
                className={`
                  relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${activeTab === "diabetes" ? "text-white" : "text-white/60"}
                `}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {activeTab === "diabetes" && (
                  <motion.div
                    layoutId="tab-bg-navbar"
                    className="absolute inset-0 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">🩸 Diabetes</span>
              </motion.button>
              <motion.button
                onClick={() => handleTabChange("heart")}
                className={`
                  relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors
                  ${activeTab === "heart" ? "text-white" : "text-white/60"}
                `}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {activeTab === "heart" && (
                  <motion.div
                    layoutId="tab-bg-navbar"
                    className="absolute inset-0 bg-gradient-to-r from-[#EF4444] to-[#F59E0B] rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">❤️ Jantung</span>
              </motion.button>
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
            className="md:hidden bg-[#0A0F1E] border-b border-white/[0.07]"
          >
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-sm font-medium text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                href="/#edukasi"
                className="block text-sm font-medium text-white/80 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Edukasi
              </Link>
              <div className="pt-2 border-t border-white/[0.07]">
                <p className="text-xs text-white/50 mb-2">Prediksi</p>
                <Link
                  href="/predict/diabetes"
                  className="block py-2 text-sm text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🩸 Prediksi Diabetes
                </Link>
                <Link
                  href="/predict/heart"
                  className="block py-2 text-sm text-white/80 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ❤️ Prediksi Jantung
                </Link>
              </div>
              <Link
                href="#about"
                onClick={handleAboutClick}
                className="block text-sm font-medium text-white/80 hover:text-white"
              >
                Tentang
              </Link>
              <div className="pt-4 border-t border-white/[0.07] flex flex-col gap-2">
                <Button
                  variant="primary-diabetes"
                  size="md"
                  href="/predict/diabetes"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  🩸 Prediksi Diabetes
                </Button>
                <Button
                  variant="primary-heart"
                  size="md"
                  href="/predict/heart"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ❤️ Prediksi Jantung
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
