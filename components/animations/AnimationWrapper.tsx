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
  return (
    <div
      className="
        relative
        w-full
        h-[500px]
        md:h-[550px]
        flex items-center justify-center
        overflow-visible
      "
    >
      {children}
    </div>
  );
}
