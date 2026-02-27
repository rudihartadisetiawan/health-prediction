"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = "", onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[#111827]
        border border-white/[0.07]
        rounded-[16px]
        p-6
        transition-all duration-250 ease
        hover:-translate-y-1
        hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
