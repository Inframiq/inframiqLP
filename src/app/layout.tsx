import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono, Space_Grotesk } from "next/font/google";
import SplashScreen from "@/components/SplashScreen";
import "./globals.css";

const geistSans = Instrument_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Used only for the "inframIQ" wordmark — a tighter, more geometric display
// face than the body font, so the logotype reads as a considered brand mark
// rather than body text set larger.
const brandFont = Space_Grotesk({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://inframiq.com";
const SITE_NAME = "Inframiq";
const SITE_TITLE = "Inframiq — 24/7 Voice & Chat Customer Support, Plus Intelligent Software Products";
const SITE_DESCRIPTION =
  "Inframiq is a BPO that deploys trained human agents for 24/7 voice and live chat customer service — handling enquiries and technical support — alongside intelligent security, business, and everyday software products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — Inframiq",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Inframiq",
    "BPO services",
    "24/7 customer support outsourcing",
    "voice customer support",
    "live chat support services",
    "outsourced technical support",
    "call center services",
    "enterprise cybersecurity",
    "email security software",
    "phishing prevention",
    "custom enterprise software",
    "business pricing simulation software",
  ],
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
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "support@inframiq.com",
  sameAs: [],
  founder: [
    { "@type": "Person", name: "Bhargav.U" },
    { "@type": "Person", name: "Bharath.K" },
  ],
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
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${brandFont.variable} bg-[#0c0c0c]`}
    >
      <body className="bg-[#0c0c0c] pb-16 md:pb-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
