import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCatalog from "@/components/products/ProductCatalog";

export const metadata: Metadata = {
  title: "Products — Inframiq",
  description:
    "Inframiq's product suite. Purpose-built cybersecurity and infrastructure tools for modern enterprises.",
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
