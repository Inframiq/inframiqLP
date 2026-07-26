"use client";

import { motion } from "framer-motion";
import { Headset, Sparkles, LifeBuoy } from "lucide-react";

// tag: a short category code, not a step number — these three run in
// parallel, not in sequence, so the marker names what each one is rather
// than implying an order that isn't there.
const pillars = [
  {
    icon: Headset,
    tag: "comms",
    title: "Communications",
    description: "We manage your customer-facing communications directly, as an extension of your own team.",
  },
  {
    icon: Sparkles,
    tag: "software",
    title: "Intelligent solutions",
    description: "Enterprise software built for how your business actually operates, not a generic template.",
  },
  {
    icon: LifeBuoy,
    tag: "support",
    title: "Dedicated support",
    description: "A consistent team behind the work, available around the clock — not a rotating queue.",
  },
];

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export default function OperationsSection() {
  return (
    <section className="section-raised py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-20"
        >
          <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">
            always on
          </p>

          <h2 className="font-brand text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-1)] mb-5">
            Running your operations
            <br />
            <span className="text-[var(--text-3)]">around the clock.</span>
          </h2>

          <p className="text-[15px] text-[var(--text-2)] leading-[1.8] max-w-lg">
            Inframiq handles your customer service operations 24/7 while
            building enterprise software products designed for your
            business. We manage your communications, deliver intelligent
            solutions, and provide dedicated support — seamlessly
            integrated into your operations.
          </p>
        </motion.div>

        {/* Alternating rows — each pillar gets its own full-width moment
            instead of sharing a single boxed list */}
        <div className="space-y-16 lg:space-y-24">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            const flip = i % 2 === 1;
            return (
              <div
                key={pillar.title}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-last" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: EASE_SMOOTH }}
                >
                  <span className="block font-mono text-[13px] text-[var(--accent)] mb-4">
                    {pillar.tag}
                  </span>
                  <h3 className="text-[24px] font-semibold text-[var(--text-1)] tracking-[-0.02em] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] text-[var(--text-2)] leading-[1.75] max-w-sm">
                    {pillar.description}
                  </p>
                </motion.div>

                {/* The tag itself, oversized and faint, stands in for a
                    boxed icon panel — no border, no card, no shadow. */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: 0.08, ease: EASE_SMOOTH }}
                  className="relative h-[200px] lg:h-[240px] flex items-center justify-center overflow-hidden"
                >
                  <span
                    aria-hidden
                    className="absolute font-mono text-[56px] tracking-tight leading-none text-[var(--border-strong)] select-none"
                  >
                    {pillar.tag}
                  </span>
                  <Icon size={44} className="relative text-[var(--accent)]" strokeWidth={1.25} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
