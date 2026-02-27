"use client";

import React from "react";

type BadgeVariant = "cyan" | "red" | "green" | "amber";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  cyan: "bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/30",
  red: "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30",
  green: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30",
  amber: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
};

const dotColors: Record<BadgeVariant, string> = {
  cyan: "bg-[#06B6D4]",
  red: "bg-[#EF4444]",
  green: "bg-[#10B981]",
  amber: "bg-[#F59E0B]",
};

export default function Badge({
  variant = "cyan",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-2 px-4 py-1.5
        rounded-full border text-xs font-medium
        tracking-wide
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <span
        className={`
          w-1.5 h-1.5 rounded-full
          ${dotColors[variant]}
          animate-pulse
          shadow-[0_0_8px_currentColor]
        `}
      />
      {children}
    </span>
  );
}
