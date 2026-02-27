"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import HowItWorks from "@/components/sections/HowItWorks";
import Education from "@/components/sections/Education";
import About from "@/components/sections/About";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Stats />
      <HowItWorks />
      <Education />
      <About />
      <CTA />
    </main>
  );
}
