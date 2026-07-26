"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Calculator, CheckCircle2, type LucideIcon } from "lucide-react";

// ─── Product data ────────────────────────────────────────────────────────────
// Add future products to this array. Each entry renders its own catalog row.

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
  visual: React.ReactNode;
}

// ─── Mail Shield visual preview ──────────────────────────────────────────────

function MailShieldPreview() {
  const rows = [
    { from: "billing@fakebank-alerts.co", subject: "Verify your account now", verdict: "Phishing", badge: "bg-red-500/10 text-red-400 border-red-500/20" },
    { from: "quarterly@partner.io", subject: "Q4 summary — Finance team", verdict: "Clean", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { from: "payroll@acmecorp.cc", subject: "Updated direct deposit info", verdict: "Spoofing", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    { from: "it-support@yourco.com.ru", subject: "Urgent: password reset", verdict: "Phishing", badge: "bg-red-500/10 text-red-400 border-red-500/20" },
    { from: "no-reply@docusign-verify.net", subject: "Sign document by today", verdict: "Suspicious", badge: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  ];

  return (
    <div className="w-full h-full flex flex-col rounded-lg border border-white/[0.07] bg-[#0d0d0d] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.05] bg-[#0b0b0b] flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
        <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
        <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
        <span className="ml-2 text-[10px] font-mono text-[#3a3a3a]">Mail Shield — Inbound Queue</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[9px] text-[#3a3a3a] uppercase tracking-wide">Live</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_1fr_72px] px-3.5 py-1.5 border-b border-white/[0.04] flex-shrink-0">
        {["From", "Subject", "Verdict"].map((h) => (
          <span key={h} className="text-[9px] font-medium text-[#383838] uppercase tracking-wider">{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div className="flex-1 divide-y divide-white/[0.03] overflow-hidden">
        {rows.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.07 }}
            className="grid grid-cols-[1fr_1fr_72px] px-3.5 py-2 items-center"
          >
            <span className="text-[10px] font-mono text-[#505050] truncate pr-2">{row.from}</span>
            <span className="text-[10.5px] text-[#6a6a6a] truncate pr-2">{row.subject}</span>
            <span className={`inline-flex text-[9px] font-medium px-1.5 py-0.5 rounded border w-fit ${row.badge}`}>
              {row.verdict}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3.5 py-2 border-t border-white/[0.04] flex-shrink-0">
        <span className="text-[9px] font-mono text-[#303030]">2 blocked · 2 quarantined · 1 delivered</span>
      </div>
    </div>
  );
}

// ─── Simulyn visual preview ──────────────────────────────────────────────────

function SimulynPreview() {
  const scenarios = [
    { plan: "Starter", seats: "25 seats", price: "$1,250/mo" },
    { plan: "Growth", seats: "100 seats", price: "$4,800/mo" },
    { plan: "Scale", seats: "500 seats", price: "$21,000/mo" },
  ];

  return (
    <div className="w-full h-full flex flex-col rounded-lg border border-white/[0.07] bg-[#0d0d0d] overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-white/[0.05] bg-[#0b0b0b] flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
        <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
        <div className="w-2 h-2 rounded-full bg-white/[0.07]" />
        <span className="ml-2 text-[10px] font-mono text-[#3a3a3a]">Simulyn — Pricing Model</span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="text-[9px] text-[#3a3a3a] uppercase tracking-wide">Live</span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[1fr_1fr_1fr] px-3.5 py-1.5 border-b border-white/[0.04] flex-shrink-0">
        {["Plan", "Volume", "Est. Revenue"].map((h) => (
          <span key={h} className="text-[9px] font-medium text-[#383838] uppercase tracking-wider">{h}</span>
        ))}
      </div>

      {/* Rows */}
      <div className="flex-1 divide-y divide-white/[0.03] overflow-hidden">
        {scenarios.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.09 }}
            className="grid grid-cols-[1fr_1fr_1fr] px-3.5 py-2.5 items-center"
          >
            <span className="text-[11px] text-[#8a8a8a] font-medium truncate pr-2">{row.plan}</span>
            <span className="text-[10.5px] font-mono text-[#6a6a6a] truncate pr-2">{row.seats}</span>
            <span className="text-[10.5px] font-mono text-[#2b6172]">{row.price}</span>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-3.5 py-2 border-t border-white/[0.04] flex-shrink-0">
        <span className="text-[9px] font-mono text-[#303030]">Margin 68% · Break-even Month 4</span>
      </div>
    </div>
  );
}

// ─── Products list ─────────────────────────────────────────────────────────

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
    visual: <MailShieldPreview />,
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
    visual: <SimulynPreview />,
  },
  // Future products can be added here:
  // {
  //   slug: "endpoint-guard",
  //   name: "Endpoint Guard",
  //   category: "Endpoint Security",
  //   ...
  // },
];

// ─── Product row ─────────────────────────────────────────────────────────────

function ProductRow({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  // Alternate visual side row by row; the background shifts a few percent
  // rather than flipping light/dark, so rows read as one continuous list
  // instead of a stack of alternating panels.
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
      {/* Category + status — a status dot rather than a colored pill,
          consistent with the console signature in the hero. */}
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

      {/* Name */}
      <h2 className="font-brand text-[30px] lg:text-[34px] font-semibold text-[var(--text-1)] tracking-[-0.02em] leading-tight mb-3">
        {product.name}
      </h2>

      {/* Tagline */}
      <p className="text-[15px] text-[var(--text-2)] font-medium mb-4 leading-snug">
        {product.tagline}
      </p>

      {/* Description */}
      <p className="text-[13.5px] text-[var(--text-2)] leading-[1.75] mb-7 max-w-md">
        {product.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-8">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle2 size={14} className="text-[var(--accent)] flex-shrink-0 mt-[2px]" />
            <span className="text-[13px] text-[var(--text-2)]">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div>
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
            className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-[var(--accent)] text-white text-[13.5px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150"
          >
            Request a Demo
          </Link>
        </div>
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
      {/* Visual container — kept as dark "device chrome" regardless of the
          row's background, the way a real app screenshot looks framed on
          a light marketing page. */}
      <div
        className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0f0f0f]"
        style={{
          aspectRatio: "4/3",
          boxShadow: "0 20px 48px -12px rgba(15,15,17,0.22)",
        }}
      >
        <div className="w-full h-full p-4">{product.visual}</div>
      </div>

      {/* Subtle glow behind card */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-[var(--accent)]/[0.05] blur-2xl scale-110 pointer-events-none" />
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
      <section className="relative bg-[var(--bg)] pt-[110px] pb-14 overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, transparent 30%, var(--bg) 100%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-[12px] text-[var(--text-3)]">
              <Link href="/" className="hover:text-[var(--text-2)] transition-colors">
                Inframiq
              </Link>
              <span>/</span>
              <span className="text-[var(--text-2)]">Products</span>
            </div>

            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">product suite</p>

            <h1 className="font-brand text-[42px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.08] text-[var(--text-1)] mb-4">
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

          {/* Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-center gap-3"
          >
            <span className="text-[12px] text-[var(--text-3)] font-mono">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-[var(--border)]" />
            <span className="text-[12px] text-[var(--text-3)] font-mono">more in development</span>
          </motion.div>
        </div>
      </section>

      {/* Product catalog — each row manages its own full-bleed background */}
      {products.map((product, index) => (
        <ProductRow key={product.slug} product={product} index={index} />
      ))}
    </>
  );
}
