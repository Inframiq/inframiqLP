import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AudienceSelector from "@/components/AudienceSelector";
import WhySection from "@/components/WhySection";
import OperationsSection from "@/components/OperationsSection";
import TrustSection from "@/components/TrustSection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <Navbar />
      <HeroSection />
      <AudienceSelector />
      <WhySection />
      <OperationsSection />
      <TrustSection />
      <Suspense fallback={null}>
        <DemoSection />
      </Suspense>
      <Footer />
    </main>
  );
}
