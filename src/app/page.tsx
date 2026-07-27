import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TheSplit from "@/components/TheSplit";
import TheStandard from "@/components/TheStandard";
import TheNumbers from "@/components/TheNumbers";
import ProductsShowcase from "@/components/ProductsShowcase";
import TheCrew from "@/components/TheCrew";
import ClosingStatement from "@/components/ClosingStatement";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <HeroSection />
      <TheSplit />
      <TheStandard />
      <TheNumbers />
      <ProductsShowcase />
      <TheCrew />
      <ClosingStatement />
      <Suspense fallback={null}>
        <DemoSection />
      </Suspense>
      <Footer />
    </main>
  );
}
