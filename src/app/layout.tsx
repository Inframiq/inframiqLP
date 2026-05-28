import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inframiq — Intelligent Security Infrastructure",
  description:
    "Inframiq builds intelligent cybersecurity and digital infrastructure solutions for modern enterprises. Proactive protection, zero-trust architecture, and resilient systems at scale.",
  keywords: ["cybersecurity", "enterprise infrastructure", "email security", "zero trust", "threat intelligence"],
  openGraph: {
    title: "Inframiq — Intelligent Security Infrastructure",
    description: "Enterprise cybersecurity and digital infrastructure for organizations that cannot afford to be vulnerable.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
