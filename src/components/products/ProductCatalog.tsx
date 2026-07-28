"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, Calculator, type LucideIcon } from "lucide-react";
import { SimulynWindow, MailShieldWindow } from "@/components/products/ProductWindows";
import AuroraGrain from "@/components/AuroraGrain";
import KineticText from "@/components/animations/KineticText";
import { useEntryRevealed } from "@/components/EntryLoaderProvider";

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
    window: <MailShieldWindow chrome="app" />,
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
    window: <SimulynWindow chrome="app" />,
  },
  // Future products can be added here.
];

// ─── Header visual — a portfolio diagram, not a screenshot. Every product's
// actual, fully interactive window already appears once in its own row below;
// reusing that same window (or a stack of them) up here just shows it twice.
// This shows the *shape of the catalog* instead — how each product relates
// to Inframiq as a core — which is information the rows themselves don't
// carry. ──────────────────────────────────────────────────────────────────

const DIAGRAM_CORE = { x: 200, y: 150 };
const DIAGRAM_NODES = [
  { x: 65, y: 150 },
  { x: 335, y: 150 },
];

function ProductsConstellation() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-[4/3]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" fill="none">
        {products.map((p, i) => (
          <path
            key={p.slug}
            d={`M ${DIAGRAM_CORE.x} ${DIAGRAM_CORE.y} L ${DIAGRAM_NODES[i].x} ${DIAGRAM_NODES[i].y}`}
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            className="trace-path"
            style={{ "--trace-length": 170, animationDelay: `${i * 0.15}s` } as React.CSSProperties}
          />
        ))}
        {products.map((p, i) => {
          const length = Math.hypot(DIAGRAM_NODES[i].x - DIAGRAM_CORE.x, DIAGRAM_NODES[i].y - DIAGRAM_CORE.y);
          const dot = 10;
          return (
            <motion.path
              key={`flow-${p.slug}`}
              d={`M ${DIAGRAM_CORE.x} ${DIAGRAM_CORE.y} L ${DIAGRAM_NODES[i].x} ${DIAGRAM_NODES[i].y}`}
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${dot} ${length - dot}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -length }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
            />
          );
        })}
        <motion.circle
          cx={DIAGRAM_CORE.x}
          cy={DIAGRAM_CORE.y}
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          animate={{ r: [32, 34, 32] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{ left: `${(DIAGRAM_CORE.x / 400) * 100}%`, top: `${(DIAGRAM_CORE.y / 300) * 100}%`, transform: "translate(-50%, -50%)" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.04em] text-[var(--text-3)]">inframiq</span>
      </div>

      {products.map((p, i) => {
        const Icon = p.categoryIcon;
        return (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="absolute w-[160px] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(DIAGRAM_NODES[i].x / 400) * 100}%`, top: `${(DIAGRAM_NODES[i].y / 300) * 100}%` }}
          >
            <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-3 text-center">
              <Icon size={16} className="text-[var(--accent)] mx-auto mb-1.5" />
              <p className="font-mono text-[11px] text-[var(--text-1)]">{p.name}</p>
              <p className="text-[9.5px] text-[var(--text-3)] mt-0.5">{p.category}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Product row ─────────────────────────────────────────────────────────────

const statusPillStyle: Record<string, { bg: string; fg: string }> = {
  Available: { bg: "var(--bg-raised)", fg: "var(--success)" },
  Beta: { bg: "var(--bg-raised)", fg: "var(--warning)" },
  "Coming Soon": { bg: "var(--bg-raised)", fg: "var(--text-3)" },
};

function ProductRow({ product, index }: { product: Product; index: number }) {
  const visualLeft = index % 2 === 0;
  const tilt = visualLeft ? "rotate-2" : "-rotate-2";

  const content = (
    <div className="flex flex-col justify-center">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <product.categoryIcon size={12} className="text-[var(--accent)]" />
          <span className="font-mono text-[11px] text-[var(--accent-strong)] uppercase tracking-[0.06em]">
            {product.category}
          </span>
        </div>
        <span
          className="flex-shrink-0 font-mono text-[10.5px] px-2.5 py-1 rounded-full"
          style={{ backgroundColor: statusPillStyle[product.status].bg, color: statusPillStyle[product.status].fg }}
        >
          {product.status}
        </span>
      </div>

      <h2 className="font-brand text-[30px] lg:text-[34px] font-semibold text-[var(--text-1)] tracking-[-0.02em] leading-tight mb-4">
        {product.name}
      </h2>
      <p className="text-[13.5px] text-[var(--text-2)] leading-[1.75] mb-7 max-w-md">{product.description}</p>

      <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
        {product.features.slice(0, 6).map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-[6px] flex-shrink-0" />
            <span className="text-[13px] text-[var(--text-2)] leading-snug">{f}</span>
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
          className="inline-flex items-center gap-2 h-10 px-5 rounded-md bg-[var(--accent)] text-white text-[13.5px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150"
        >
          Request a Demo
        </Link>
      </div>
    </div>
  );

  const visual = (
    <div className={`relative transition-transform duration-300 hover:rotate-0 ${tilt}`}>
      {product.window}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 lg:p-12 overflow-hidden"
      >
        <div className={`relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${!visualLeft ? "lg:[&>*:first-child]:order-last" : ""}`}>
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
      </motion.div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ProductCatalog() {
  const revealed = useEntryRevealed();
  return (
    <>
      {/* Page header */}
      <section className="relative bg-[var(--bg)] pt-[110px] pb-16 overflow-hidden">
        <AuroraGrain />

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

              <p className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] mb-5">product suite</p>

              <h1 className="font-brand text-[38px] lg:text-[48px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text-1)] mb-4">
                <KineticText as="span" text="Every problem," play={revealed} />
                <br />
                <KineticText as="span" text="engineered to an exacting standard." className="text-[var(--text-3)]" play={revealed} />
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
              <ProductsConstellation />
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
