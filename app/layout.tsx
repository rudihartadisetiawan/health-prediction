import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/contexts/ThemeContext";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "HealthPredict.id — Prediksi Risiko Diabetes & Jantung",
  description: "Deteksi dini risiko diabetes dan penyakit jantung berbasis AI untuk masyarakat Indonesia",
  openGraph: {
    title: "HealthPredict.id — Prediksi Risiko Diabetes & Jantung",
    description: "Deteksi dini risiko diabetes dan penyakit jantung berbasis AI untuk masyarakat Indonesia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${syne.variable} ${dmSans.variable} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
