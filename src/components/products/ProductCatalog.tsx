"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Calculator, CheckCircle2, type LucideIcon } from "lucide-react";
import { SimulynWindow, MailShieldWindow } from "@/components/products/ProductWindows";
import { StatusPanel } from "@/components/instruments/Gauges";

// ─── Product data ────────────────────────────────────────────────────────────

interface Product {
  slug: string;
  name: string;
  category: string;
  categoryIcon: LucideIcon;
  tagline: string;
  description: string;
  features: string[];
  status: "Available" | "Beta" | "Coming Soon";
  hasPage: boolean;
  window: React.ReactNode;
}

const products: Product[] = [
  {
    slug: "mail-shield",
    name: "Mail Shield",
    category: "Email Security",
    categoryIcon: Mail,
    tagline: "Enterprise email protection that stops threats before delivery.",
    description:
      "Mail Shield is an enterprise-grade email security platform designed for organizations where a single phishing email can compromise an entire network. Intelligent filtering, domain impersonation detection, and real-time threat analysis — without the noise of traditional rule-based filters.",
    features: [
      "ML-powered phishing and spoofing detection",
      "Real-time content inspection before delivery",
      "DMARC, DKIM, and SPF enforcement",
      "Immutable audit log for compliance",
      "Native integration with Microsoft 365 and Google Workspace",
    ],
    status: "Coming Soon",
    hasPage: false,
    window: <MailShieldWindow />,
  },
  {
    slug: "simulyn",
    name: "Simulyn",
    category: "Pricing & Business Tools",
    categoryIcon: Calculator,
    tagline: "Know your numbers before you set your price.",
    description:
      "Simulyn is a pricing simulation tool built for founders, finance teams, and sales leaders who need to understand margin, break-even, and growth scenarios before committing to a price. Model plans, seats, and discounts — see the outcome instantly, no spreadsheet required.",
    features: [
      "Real-time pricing and revenue scenario modeling",
      "Break-even and margin analysis built in",
      "Side-by-side scenario comparison for sales and finance",
      "Shareable, exportable reports for stakeholders",
      "Works for subscription, seat-based, and usage pricing",
    ],
    status: "Coming Soon",
    hasPage: false,
    window: <SimulynWindow />,
  },
  // Future products can be added here.
];

// ─── Product row ─────────────────────────────────────────────────────────────

function ProductRow({ product, index }: { product: Product; index: number }) {
  const visualLeft = index % 2 === 0;
  const raised = index % 2 === 1;

  const statusDot: Record<string, string> = {
    Available: "var(--success)",
    Beta: "var(--warning)",
    "Coming Soon": "var(--text-3)",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="flex flex-col justify-center"
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex items-center gap-1.5">
          <product.categoryIcon size={12} className="text-[var(--accent)]" />
          <span className="font-mono text-[11px] text-[var(--accent-strong)] tracking-[0.02em]">
            {product.category.toLowerCase()}
          </span>
        </div>
        <span className="text-[var(--border-strong)]">·</span>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--text-3)]">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusDot[product.status] }} />
          {product.status.toLowerCase()}
        </span>
      </div>

      <h2 className="font-brand text-[30px] lg:text-[34px] font-semibold text-[var(--text-1)] tracking-[-0.02em] leading-tight mb-3">
        {product.name}
      </h2>
      <p className="text-[15px] text-[var(--text-2)] font-medium mb-4 leading-snug">{product.tagline}</p>
      <p className="text-[13.5px] text-[var(--text-2)] leading-[1.75] mb-7 max-w-md">{product.description}</p>

      <ul className="space-y-2 mb-8">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle2 size={14} className="text-[var(--accent)] flex-shrink-0 mt-[2px]" />
            <span className="text-[13px] text-[var(--text-2)]">{f}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {product.hasPage && (
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-md border border-[var(--border-strong)] text-[13.5px] font-medium text-[var(--text-2)] hover:border-[var(--accent)]/40 hover:text-[var(--text-1)] active:scale-[0.98] transition-all duration-150 group"
          >
            Visit Product
            <ArrowRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
          </Link>
        )}
        <Link
          href={`/?product=${encodeURIComponent(product.name)}#demo`}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-[var(--accent)] text-[#050505] text-[13.5px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150"
        >
          Request a Demo
        </Link>
      </div>
    </motion.div>
  );

  const visual = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      {product.window}
      <div className="absolute inset-0 -z-10 rounded-xl bg-[var(--glow)] opacity-[0.06] blur-3xl scale-110 pointer-events-none" />
    </motion.div>
  );

  return (
    <div className={raised ? "section-raised" : ""}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!visualLeft ? "lg:[&>*:first-child]:order-last" : ""}`}>
          {visualLeft ? (
            <>
              {visual}
              {content}
            </>
          ) : (
            <>
              {content}
              {visual}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ProductCatalog() {
  return (
    <>
      {/* Page header */}
      <section className="relative bg-[var(--bg)] pt-[110px] pb-16 overflow-hidden">
        <div className="absolute inset-0 schematic-grid pointer-events-none opacity-70" />
        <div className="absolute inset-0 ambient-glow pointer-events-none" style={{ "--glow-x": "85%", "--glow-y": "0%" } as React.CSSProperties} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-8 text-[12px] text-[var(--text-3)]">
                <Link href="/" className="hover:text-[var(--text-2)] transition-colors">
                  Inframiq
                </Link>
                <span>/</span>
                <span className="text-[var(--text-2)]">Products</span>
              </div>

              <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">product suite</p>

              <h1 className="font-brand text-[38px] lg:text-[48px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text-1)] mb-4">
                Every problem,
                <br />
                <span className="text-[var(--text-3)]">engineered to an exacting standard.</span>
              </h1>
              <p className="text-[15px] text-[var(--text-2)] max-w-xl leading-[1.75]">
                Inframiq is building a portfolio of purpose-built products — enterprise
                security infrastructure, precision pricing intelligence, and refined
                everyday software. Distinct in purpose, uncompromising in craft.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <StatusPanel title="product-suite.status" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product catalog — each row manages its own full-bleed background */}
      {products.map((product, index) => (
        <ProductRow key={product.slug} product={product} index={index} />
      ))}
    </>
  );
}
