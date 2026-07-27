"use client";

import { motion } from "framer-motion";

// Shared status instruments used across the homepage, /about, and /products
// — kept in one place so every page's "status panel" reads as the same
// physical instrument rather than a page-specific recreation of it.

// A circular dial, fully lit, standing in for "always on" — the sweep is
// decorative confirmation of a true, un-embellished fact (24/7), not a fake
// percentage.
export function CoverageDial() {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="relative w-[132px] h-[132px] mx-auto">
      <svg viewBox="0 0 132 132" className="w-full h-full -rotate-90">
        <circle cx="66" cy="66" r={r} stroke="var(--border)" strokeWidth="2" fill="none" />
        <motion.circle
          cx="66"
          cy="66"
          r={r}
          stroke="var(--accent)"
          strokeWidth="2"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-[22px] text-[var(--text-1)] leading-none">24/7</span>
        <span className="font-mono text-[8.5px] text-[var(--text-3)] uppercase tracking-wide mt-1">coverage</span>
      </div>
    </div>
  );
}

// A ten-cell level meter — headcount as an honest tally, not a projected
// percentage of some invented ceiling.
export function TeamMeter() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-end gap-[3px] h-[70px] mb-4">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${28 + i * 4.5}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.04 }}
            className="w-[7px] rounded-sm bg-[var(--accent)]"
            style={{ opacity: 0.55 + i * 0.045 }}
          />
        ))}
      </div>
      <span className="font-mono text-[22px] text-[var(--text-1)] leading-none">10+</span>
      <span className="font-mono text-[8.5px] text-[var(--text-3)] uppercase tracking-wide mt-1">team members</span>
    </div>
  );
}

// A three-slot indicator: two systems lit and in production, one dim slot
// reserved for what's already in active development.
export function SystemsIndicator() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-3 h-[70px]">
        {[true, true, false].map((lit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="w-4 h-4 rounded-full border"
            style={{
              backgroundColor: lit ? "var(--accent)" : "transparent",
              borderColor: lit ? "var(--accent)" : "var(--border-strong)",
              boxShadow: lit ? "0 0 12px var(--accent-dim)" : "none",
            }}
          />
        ))}
      </div>
      <span className="font-mono text-[22px] text-[var(--text-1)] leading-none mt-3">2</span>
      <span className="font-mono text-[8.5px] text-[var(--text-3)] uppercase tracking-wide mt-1">systems live</span>
    </div>
  );
}

// A compact status window combining all three instruments — the visual
// anchor reused on any hero that needs to open with "proof, not a claim".
export function StatusPanel({ title = "status-panel — read only" }: { title?: string }) {
  return (
    <div className="window-chrome text-left">
      <div className="window-chrome-bar">
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">{title}</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-[var(--border)] py-8">
        <CoverageDial />
        <SystemsIndicator />
        <TeamMeter />
      </div>
    </div>
  );
}
