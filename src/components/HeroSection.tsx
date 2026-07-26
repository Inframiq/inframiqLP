"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The signature element: a status console, not a fake dashboard screenshot.
// Inframiq's two businesses — 24/7 human support, and security/business
// software still in development — share one real trait: uninterrupted
// monitoring. This reads honestly: "online" only appears where it's true
// today (support), everything else says what it actually is.
const ROWS = [
  { label: "support", status: "online", live: true },
  { label: "mail shield", status: "in development", live: false },
  { label: "simulyn", status: "in development", live: false },
];

function StatusConsole() {
  return (
    <div className="w-full max-w-[300px] rounded-lg border border-[var(--border)] bg-[var(--surface)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--bg-raised)]">
        <span className="font-mono text-[10.5px] tracking-[0.04em] text-[var(--text-3)]">
          inframiq // status
        </span>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {ROWS.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
            className="flex items-center justify-between px-4 py-3"
          >
            <span className="font-mono text-[13px] text-[var(--text-1)]">{row.label}</span>
            <span className="flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                {row.live && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: "var(--success)" }}
                    animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.1, 1] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  />
                )}
                <span
                  className="relative h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: row.live ? "var(--success)" : "var(--text-3)" }}
                />
              </span>
              <span className="font-mono text-[11px] text-[var(--text-3)]">{row.status}</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative pt-[140px] pb-24 overflow-hidden noise bg-[var(--bg)]">
      {/* Background — subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      {/* Soft edge fade — a gentle gradient into the base tone rather than a
          hard vignette, so the corners stay part of the same layered
          surface instead of reading as a void. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 20% 20%, transparent 35%, var(--bg) 100%)",
        }}
      />

      <div className="relative z-[1] max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Copy — three-fifths width, left-aligned, not centered */}
          <div className="lg:col-span-3">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-6 font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)]"
            >
              engineered end to end
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-brand text-[40px] sm:text-[54px] lg:text-[64px] font-semibold leading-[1.06] tracking-[-0.02em] text-[var(--text-1)] mb-7"
            >
              Intelligent products
              <br />
              and services, built for
              <br />
              <span className="italic">business and everyday life.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-[16px] text-[var(--text-2)] leading-[1.7] max-w-[480px] mb-10"
            >
              Inframiq handles your customer service operations 24/7
              while building enterprise software products designed for your business.
              We manage your communications, deliver intelligent solutions,
              and provide dedicated support — seamlessly integrated into your operations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/#demo"
                className="inline-flex items-center gap-1.5 h-11 px-6 rounded-md bg-[var(--accent)] text-white text-[14px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150"
              >
                Request a Demo
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 h-11 px-6 rounded-md border border-[var(--border-strong)] text-[var(--text-2)] text-[14px] font-medium hover:border-[var(--text-2)] hover:text-[var(--text-1)] active:scale-[0.98] transition-all duration-150"
              >
                View Products
              </Link>
            </motion.div>
          </div>

          {/* Signature — the status console, two-fifths width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 flex lg:justify-end"
          >
            <StatusConsole />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
