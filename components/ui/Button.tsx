"use client";

import React from "react";
import Link from "next/link";

type Variant = "primary-diabetes" | "primary-heart" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  href?: string;
  disabled?: boolean;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<Variant, string> = {
  "primary-diabetes":
    "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white border-none",
  "primary-heart":
    "bg-gradient-to-r from-[#EF4444] to-[#F59E0B] text-white border-none",
  outline:
    "border border-white/20 bg-transparent text-white hover:border-white/40",
  ghost: "border-none bg-transparent text-white hover:bg-white/5",
};

const hoverEffects: Record<Variant, string> = {
  "primary-diabetes":
    "hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-0.5",
  "primary-heart":
    "hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:-translate-y-0.5",
  outline: "hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:-translate-y-0.5",
  ghost: "",
};

export default function Button({
  variant = "outline",
  size = "md",
  children,
  href,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    rounded-full transition-all duration-250 ease
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${hoverEffects[variant]}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
