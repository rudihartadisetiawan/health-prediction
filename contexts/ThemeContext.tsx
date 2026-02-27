"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ActiveTab = "diabetes" | "heart";

interface ThemeContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("diabetes");

  return (
    <ThemeContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
