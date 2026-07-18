import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import OperationsSection from "@/components/OperationsSection";
import TrustSection from "@/components/TrustSection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <HeroSection />
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
