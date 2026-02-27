"use client";

import React from "react";

interface AnimationWrapperProps {
  children: React.ReactNode;
  type: "diabetes" | "heart";
}

export default function AnimationWrapper({
  children,
  type,
}: AnimationWrapperProps) {
  const glowColor =
    type === "diabetes"
      ? "rgba(59, 130, 246, 0.15)"
      : "rgba(239, 68, 68, 0.15)";

  const glowColorStrong =
    type === "diabetes"
      ? "rgba(6, 182, 212, 0.1)"
      : "rgba(239, 68, 68, 0.1)";

  return (
    <div
      className="relative flex items-center justify-center w-full h-full"
      style={{
        borderRadius: "24px",
        overflow: "visible",
      }}
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          boxShadow: `0 0 80px 20px ${glowColor}, 0 0 140px 40px ${glowColorStrong}`,
        }}
      />

      {/* Content */}
      <div className="relative w-full h-full">{children}</div>
    </div>
  );
}