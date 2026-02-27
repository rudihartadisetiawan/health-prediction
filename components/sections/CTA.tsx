"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 50%, #1A2236 0%, #0A0F1E 100%),
          radial-gradient(circle at 0% 0%, rgba(59,130,246,0.03) 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, rgba(6,182,212,0.03) 0%, transparent 50%)
        `,
      }}
    >
      {/* Dot Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Badge variant="cyan">Mulai Sekarang</Badge>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-syne font-bold text-3xl md:text-5xl text-white leading-tight"
          >
            Sudah Siap Cek Risiko{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]">
              Kesehatan Anda?
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="text-[#94A3B8] text-lg max-w-xl mx-auto"
          >
            Gratis, cepat, dan mudah. Hanya butuh data lab rutin.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button variant="primary-diabetes" size="lg" href="/predict/diabetes">
              🩸 Cek Diabetes
            </Button>
            <Button variant="primary-heart" size="lg" href="/predict/heart">
              ❤️ Cek Jantung
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
