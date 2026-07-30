import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import TheSplit from "@/components/TheSplit";
import TheStandard from "@/components/TheStandard";
import ProductsShowcase from "@/components/ProductsShowcase";
import PainPointSection from "@/components/PainPointSection";
import TheNumbers from "@/components/TheNumbers";
import TheCrew from "@/components/TheCrew";
import ClosingStatement from "@/components/ClosingStatement";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <HeroSection />
      <TheSplit />
      <TheStandard />
      <ProductsShowcase />
      <PainPointSection />
      <TheNumbers />
      <TheCrew />
      <ClosingStatement />
      <Suspense fallback={null}>
        <DemoSection />
      </Suspense>
      <Footer />
    </main>
  );
}
