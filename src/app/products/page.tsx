import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/products/ProductCatalog";

const TITLE = "Products";
const DESCRIPTION =
  "Inframiq's product suite - Career Copilot for AI resume tailoring, ATS scoring, and interview prep (live now), Mail Shield for phishing and domain-impersonation defense, and Simulyn for business pricing simulation.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/products" },
  openGraph: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    url: "/products",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <ProductCatalog />
      <Footer />
    </main>
  );
}
