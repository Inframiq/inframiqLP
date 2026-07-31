import type { Metadata } from "next";
import Footer from "@/components/Footer";
import AboutContent from "@/components/AboutContent";
import { team } from "@/lib/team";

const SITE_URL = "https://www.inframiq.com";
const TITLE = "About";
const DESCRIPTION =
  "Inframiq is an early-stage company building intelligent products and services — security systems, business tools, and everyday software — with the same uncompromising engineering standard across every product.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    url: "/about",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} — Inframiq`,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

// ItemList of Person entries — a dedicated, page-scoped structured-data
// block (on top of the site-wide Organization/employee data in layout.tsx)
// so a search engine indexing this specific page has the strongest possible
// signal tying each name to Inframiq.
const teamJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: team.map((member, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      worksFor: { "@type": "Organization", name: "Inframiq", url: SITE_URL },
      url: `${SITE_URL}/about`,
    },
  })),
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamJsonLd) }}
      />
      <AboutContent />
      <Footer />
    </main>
  );
}
