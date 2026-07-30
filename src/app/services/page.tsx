import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ServicesContent from "@/components/ServicesContent";

const TITLE = "Services";
const DESCRIPTION =
  "Inframiq deploys trained human agents for voice and live chat customer service, 24/7 — handling customer enquiries and technical support for your business.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "BPO services",
    "24/7 customer support outsourcing",
    "voice customer support",
    "live chat support services",
    "outsourced technical support",
    "call center services",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    url: "/services",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <ServicesContent />
      <Footer />
    </main>
  );
}
