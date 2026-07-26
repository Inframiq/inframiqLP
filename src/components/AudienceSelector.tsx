"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Headset, Mail, Calculator, ArrowRight, type LucideIcon } from "lucide-react";

// Every string below is reused verbatim from copy that already exists
// elsewhere on the site (ServicesContent's hero + service list, and
// ProductCatalog's Mail Shield / Simulyn entries) — this component's job
// is routing a visitor to the right existing page, not introducing new
// claims about the product.
interface Path {
  key: string;
  tabLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  headline: string;
  description: string;
  points: string[];
  ctaLabel: string;
  href: string;
}

const paths: Path[] = [
  {
    key: "support",
    tabLabel: "Support",
    icon: Headset,
    eyebrow: "Human-Staffed, 24/7",
    headline: "Your customers, answered by real people, around the clock.",
    description:
      "Inframiq operates as your customer service team — deploying trained agents for voice and chat support, staffed 24/7 to handle enquiries and technical issues as they come in.",
    points: ["Voice support", "Live chat support", "Technical support", "24/7 dedicated teams"],
    ctaLabel: "Get in touch",
    href: "/services",
  },
  {
    key: "mail-shield",
    tabLabel: "Mail Shield",
    icon: Mail,
    eyebrow: "Email Security",
    headline: "Enterprise email protection that stops threats before delivery.",
    description:
      "Mail Shield is an enterprise-grade email security platform designed for organizations where a single phishing email can compromise an entire network. Intelligent filtering, domain impersonation detection, and real-time threat analysis — without the noise of traditional rule-based filters.",
    points: [
      "ML-powered phishing and spoofing detection",
      "Real-time content inspection before delivery",
      "DMARC, DKIM, and SPF enforcement",
    ],
    ctaLabel: "View Products",
    href: "/products",
  },
  {
    key: "simulyn",
    tabLabel: "Simulyn",
    icon: Calculator,
    eyebrow: "Pricing & Business Tools",
    headline: "Know your numbers before you set your price.",
    description:
      "Simulyn is a pricing simulation tool built for founders, finance teams, and sales leaders who need to understand margin, break-even, and growth scenarios before committing to a price. Model plans, seats, and discounts — see the outcome instantly, no spreadsheet required.",
    points: [
      "Real-time pricing and revenue scenario modeling",
      "Break-even and margin analysis built in",
      "Side-by-side scenario comparison for sales and finance",
    ],
    ctaLabel: "View Products",
    href: "/products",
  },
];

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export default function AudienceSelector() {
  const [active, setActive] = useState(0);
  const current = paths[active];
  const Icon = current.icon;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActive((i) => (i + 1) % paths.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((i) => (i - 1 + paths.length) % paths.length);
    }
  };

  return (
    <section className="py-24 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-10"
        >
          <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">
            where to start
          </p>
          <h2 className="font-brand text-[30px] lg:text-[36px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text-1)]">
            Two things, built the same way.
          </h2>
        </motion.div>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Choose a path"
          onKeyDown={handleKeyDown}
          className="flex items-center gap-1 border-b border-[var(--border)] mb-10"
        >
          {paths.map((path, i) => (
            <button
              key={path.key}
              role="tab"
              type="button"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              className={`relative px-4 py-3 font-mono text-[13px] transition-colors duration-150 ${
                active === i ? "text-[var(--text-1)]" : "text-[var(--text-3)] hover:text-[var(--text-2)]"
              }`}
            >
              {path.tabLabel.toLowerCase()}
              {active === i && (
                <motion.span
                  layoutId="audienceTabUnderline"
                  className="absolute left-0 right-0 -bottom-px h-[2px] bg-[var(--accent)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: EASE_SMOOTH }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.02em] text-[var(--accent-strong)] mb-4">
                {current.eyebrow.toLowerCase()}
              </p>
              <h3 className="text-[22px] font-semibold text-[var(--text-1)] tracking-[-0.02em] leading-tight mb-4">
                {current.headline}
              </h3>
              <p className="text-[14.5px] text-[var(--text-2)] leading-[1.75] mb-6 max-w-md">
                {current.description}
              </p>
              <ul className="space-y-2 mb-7">
                {current.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-[13px] text-[var(--text-2)]">
                    <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href={current.href}
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md bg-[var(--accent)] text-white text-[13.5px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150"
              >
                {current.ctaLabel}
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* The tab's own key, oversized and faint, stands in for a
                boxed icon panel — no border, no card, no shadow. */}
            <div className="relative h-[200px] lg:h-[240px] flex items-center justify-center overflow-hidden">
              <span
                aria-hidden
                className="absolute font-mono text-[46px] tracking-tight leading-none text-[var(--border-strong)] select-none whitespace-nowrap"
              >
                {current.key}
              </span>
              <Icon size={44} className="relative text-[var(--accent)]" strokeWidth={1.25} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
