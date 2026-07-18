import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/products/ProductCatalog";

const TITLE = "Products";
const DESCRIPTION =
  "Inframiq's product suite — Mail Shield for phishing and domain-impersonation defense, Simulyn for business pricing simulation, and more in active development.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Mail Shield phishing protection",
    "domain impersonation detection",
    "Simulyn pricing simulator",
    "enterprise security products",
    "business software products",
  ],
  alternates: { canonical: "/products" },
  openGraph: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    url: "/products",
  },
  twitter: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
  },
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#0c0c0c]">
      <Navbar />
      <ProductCatalog />
      <Footer />
    </main>
  );
}
