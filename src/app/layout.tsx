import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/Navbar";
import EntryLoaderProvider from "@/components/EntryLoaderProvider";
import PostHogProvider from "@/components/PostHogProvider";
import { team } from "@/lib/team";
import "./globals.css";

// Typography runs on the platform system-font stack rather than a bundled
// webfont — -apple-system/BlinkMacSystemFont resolve to San Francisco on
// Apple devices (SF isn't licensed for arbitrary @font-face embedding, so
// this is the actual mechanism Apple's own web properties use), falling
// back to Segoe UI/Roboto elsewhere. One stack for body, display, and UI;
// the mono stack below is the equivalent system pairing (SF Mono locally,
// sane monospace fallbacks elsewhere) for data/status/timestamp text.

// www is the canonical host — the apex domain redirects to it at the DNS/
// Vercel level, so every URL emitted here (canonical, OG, schema, sitemap)
// needs to match or crawlers see a host mismatch between what's declared
// and what actually served the page.
const SITE_URL = "https://www.inframiq.com";
const SITE_NAME = "Inframiq";
// Kept under ~60 characters so it doesn't truncate in search results —
// the longer version used to live here, but it ran to 81 characters.
const SITE_TITLE = "Inframiq — Software & Support, Built Right";
// Kept within the ~150-160 char range search engines display before
// truncating — a longer, 216-character version used to live here.
const SITE_DESCRIPTION =
  "Inframiq deploys trained human agents for 24/7 voice, live chat, and technical support, alongside intelligent security and business software products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Inframiq",
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: "Inframiq" }],
  creator: "Inframiq",
  publisher: "Inframiq",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Every team member is surfaced here as a Person tied to the Organization
// (via founder/employee) so that a search for their name has a structured,
// crawlable signal connecting them to Inframiq — not just plain page text.
const founders = team.filter((member) => member.role.toLowerCase().includes("founder"));

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "support@inframiq.com",
  sameAs: ["https://www.linkedin.com/company/inframiqsolutions"],
  founder: founders.map((member) => ({ "@type": "Person", name: member.name })),
  employee: team.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.role,
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  })),
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "24/7 Voice Customer Support",
        serviceType: "BPO voice support",
        description: "Trained human agents handling inbound and outbound customer calls around the clock.",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "24/7 Live Chat Support",
        serviceType: "BPO chat support",
        description: "Human agents handling live chat and messaging support across web and app channels.",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Technical Support Outsourcing",
        serviceType: "Outsourced technical support",
        description: "Trained agents handling tier 1 and tier 2 technical troubleshooting for customers.",
        provider: { "@type": "Organization", name: SITE_NAME },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: "Mail Shield",
        applicationCategory: "SecurityApplication",
        description: "Enterprise email protection that integrates with Gmail and analyzes links, attachments, and content the moment an email is opened, stopping phishing and domain-impersonation threats before they can do harm.",
        url: `${SITE_URL}/products`,
        provider: { "@type": "Organization", name: SITE_NAME },
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "SoftwareApplication",
        name: "Simulyn",
        applicationCategory: "BusinessApplication",
        description: "Business pricing simulation software — know your numbers before you set your price.",
        url: `${SITE_URL}/products`,
        provider: { "@type": "Organization", name: SITE_NAME },
      },
    },
  ],
};

// Sets data-theme on <html> before first paint — reading the stored
// preference, defaulting to light for first-time visitors (not system
// preference) — so toggling never causes a flash of the wrong theme on
// load or on repeat visits.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("inframiq-theme");
    var theme = stored === "dark" || stored === "light" ? stored : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[var(--bg)]" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-[var(--bg)] pb-16 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <EntryLoaderProvider>
          {/* Rendered here (not per-page) so it never remounts or gets swept
              into the page-transition animation in template.tsx — it stays
              fixed while the page content underneath slides. */}
          <Navbar />
          {children}
        </EntryLoaderProvider>
        <Analytics />
        <SpeedInsights />
        <PostHogProvider />
      </body>
    </html>
  );
}
