import { Inter } from "next/font/google";
import "./globals.css";
import type React from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SwasthaAI",
  keywords: [
    "AI",
    "Health",
    "Healthcare",
    "Symptom Checker",
    "Risk Prediction",
    "Clinical Notes",
    "Doctor Booking",
  ],
  authors: [
    { name: "NullPointers", url: "https://github.com/SuhasKanwar/SwasthaAI" },
    { name: "Suhas Kanwar", url: "https://github.com/SuhasKanwar" },
    { name: "Pratyaksh Saluja", url: "https://github.com/PratyakshSaluja" },
  ],
  description:
    "SwasthaAI is an AI-driven healthcare platform offering smart symptom checks, risk prediction, clinical note automation, and doctor booking. Powered by NLP, ML, and voice tech, it delivers faster, more accurate, and personalized care for both patients and providers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-x-hidden`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        visibleToasts={4}
      />
    </html>
  );
}