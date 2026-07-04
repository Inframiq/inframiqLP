"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, CheckCircle2 } from "lucide-react";

// ─── Product data ────────────────────────────────────────────────────────────
// Add future products to this array. Each entry renders its own catalog row.

interface Product {
  slug: string;
  name: string;
  category: string;
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
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
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

// ─── Products list ─────────────────────────────────────────────────────────

const products: Product[] = [
  {
    slug: "mail-shield",
    name: "Mail Shield",
    category: "Email Security",
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
  // Alternate visual side: even = left, odd = right
  const visualLeft = index % 2 === 0;

  const statusColor: Record<string, string> = {
    Available: "bg-emerald-500/[0.08] text-emerald-400 border-emerald-500/[0.18]",
    Beta: "bg-blue-500/[0.08] text-blue-400 border-blue-500/[0.18]",
    "Coming Soon": "bg-white/[0.05] text-[#606060] border-white/[0.08]",
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="flex flex-col justify-center"
    >
      {/* Category + status */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="flex items-center gap-1.5">
          <Mail size={12} className="text-[#5b8def]" />
          <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.1em] uppercase">
            {product.category}
          </span>
        </div>
        <span className="text-[#303030]">·</span>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusColor[product.status]}`}>
          {product.status}
        </span>
      </div>

      {/* Name */}
      <h2 className="text-[30px] lg:text-[34px] font-semibold text-[#f0f0f0] tracking-[-0.025em] leading-tight mb-3">
        {product.name}
      </h2>

      {/* Tagline */}
      <p className="text-[15px] text-[#9a9a9a] font-medium mb-4 leading-snug">
        {product.tagline}
      </p>

      {/* Description */}
      <p className="text-[13.5px] text-[#626262] leading-[1.75] mb-7 max-w-md">
        {product.description}
      </p>

      {/* Features */}
      <ul className="space-y-2 mb-8">
        {product.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <CheckCircle2 size={13} className="text-[#5b8def] flex-shrink-0 mt-[2px]" />
            <span className="text-[13px] text-[#6a6a6a]">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div>
        <div className="flex items-center gap-3">
          {product.hasPage && (
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 h-9 px-5 rounded-md border border-white/[0.12] text-[13px] font-medium text-[#c0c0c0] hover:border-white/[0.22] hover:text-white hover:bg-white/[0.03] transition-all duration-150 group"
            >
              Visit Product
              <ArrowRight size={12} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150" />
            </Link>
          )}
          <a
            href={`mailto:inframiqsolutions@gmail.com?subject=Demo Request — ${product.name}`}
            className="inline-flex items-center gap-2 h-9 px-5 rounded-md bg-white text-[#0c0c0c] text-[13px] font-medium hover:bg-[#e8e8e8] transition-all duration-150 shadow-[0_0_22px_rgba(255,255,255,0.07)]"
          >
            Request a Demo
          </a>
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
      {/* Visual container */}
      <div
        className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0f0f0f]"
        style={{
          aspectRatio: "4/3",
          boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
        }}
      >
        <div className="w-full h-full p-4">{product.visual}</div>
      </div>

      {/* Subtle glow behind card */}
      <div className="absolute inset-0 -z-10 rounded-xl bg-[#5b8def]/[0.03] blur-2xl scale-110 pointer-events-none" />
    </motion.div>
  );

  return (
    <div className="py-16 border-t border-white/[0.05] first:border-t-0">
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
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ProductCatalog() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-[110px] pb-14 overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, transparent 30%, #0c0c0c 100%)",
          }}
        />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-[12px] text-[#454545]">
              <Link href="/" className="hover:text-[#8a8a8a] transition-colors">
                Inframiq
              </Link>
              <span>/</span>
              <span className="text-[#8a8a8a]">Products</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-5">
              <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Product Suite</span>
            </div>

            <h1 className="text-[42px] lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#f0f0f0] mb-4">
              Intelligent security,
              <br />
              <span className="text-[#5a5a5a]">product by product.</span>
            </h1>
            <p className="text-[15px] text-[#666] max-w-xl leading-[1.75]">
              Inframiq is building a suite of purpose-built security and infrastructure
              products for modern enterprises. Each product addresses a specific attack
              surface — designed to work independently or as a unified platform.
            </p>
          </motion.div>

          {/* Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex items-center gap-3"
          >
            <span className="text-[12px] text-[#3a3a3a] font-mono">
              {products.length} product{products.length !== 1 ? "s" : ""} available
            </span>
            <span className="h-px flex-1 max-w-[60px] bg-white/[0.06]" />
            <span className="text-[12px] text-[#3a3a3a] font-mono">more in development</span>
          </motion.div>
        </div>
      </section>

      {/* Product catalog */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {products.map((product, index) => (
            <ProductRow key={product.slug} product={product} index={index} />
          ))}
        </div>
      </section>

    </>
  );
}
