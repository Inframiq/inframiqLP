import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";

const TITLE = "About";
const DESCRIPTION =
  "Inframiq is an early-stage company building intelligent products and services — security systems, business tools, and everyday software — with the same uncompromising engineering standard across every product.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["about Inframiq", "Inframiq team", "Inframiq founders", "Inframiq company"],
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    url: "/about",
  },
  twitter: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
  },
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
