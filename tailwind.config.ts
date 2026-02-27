import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A0F1E",
        surface: "#111827",
        surface2: "#1A2236",
        "accent-blue": "#3B82F6",
        "accent-cyan": "#06B6D4",
        "accent-red": "#EF4444",
        "accent-amber": "#F59E0B",
        "risk-low": "#10B981",
        "risk-medium": "#F59E0B",
        "risk-high": "#EF4444",
      },
      fontFamily: {
        syne: ["var(--font-syne)"],
        "dm-sans": ["var(--font-dm-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
