import type { Metadata } from "next";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import DemoSection from "@/components/DemoSection";

const TITLE = "Contact";
const DESCRIPTION =
  "Talk to Inframiq about your support line — coverage and staffing plans, a walkthrough with a senior team member, and a fit assessment for voice, chat, or product needs.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    url: "/contact",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] pt-[90px]">
      <Suspense fallback={null}>
        <DemoSection standalone />
      </Suspense>
      <Footer />
    </main>
  );
}
