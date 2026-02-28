"use client";

import React, { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import HowItWorks from "@/components/sections/HowItWorks";
import Education from "@/components/sections/Education";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";

export default function Home() {
  // Handle scroll to hash on initial page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <HowItWorks />
      <Education />
      <CTA />
      <About />
    </main>
  );
}
