import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About — Inframiq",
  description:
    "Inframiq builds intelligent cybersecurity and digital infrastructure for enterprises that operate where failure is not an option.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <AboutContent />
      <Footer />
    </main>
  );
}
