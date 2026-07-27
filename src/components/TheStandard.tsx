"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motionVariants";

const pillars = [
  { tag: "security", title: "Security-first", description: "Every product is tested and hardened against failure — whether it's a phishing email or an everyday app." },
  { tag: "uptime", title: "Redundant", description: "Self-healing systems designed to stay online and perform — from enterprise security infrastructure to tools people use every day." },
  { tag: "privacy", title: "Private by default", description: "No implicit trust, no unnecessary data collection. Every product respects the people using it, not just the businesses buying it." },
  { tag: "scale", title: "Built to scale", description: "From individual users and students to global enterprises — our products grow without architectural compromise." },
  { tag: "design", title: "Considered design", description: "Intelligent systems paired with careful design — products that get smarter and simpler the more you use them." },
  { tag: "ai", title: "Intelligence, applied", description: "Intelligence is part of the architecture, not a chatbot dropped on top — used only where it genuinely makes things faster." },
] as const;

export default function TheStandard() {
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer}
          className="mb-14 max-w-xl"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--accent-strong)] mb-4">Why InframIQ?</motion.p>
          <motion.h2 variants={revealItem} className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            Every product, built to the same standard.
          </motion.h2>
        </motion.div>

        <div className="max-w-3xl">
          {/* Active pillar detail — the pill row beneath does the switching,
              so there's no separate selector competing for space next to it. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 lg:p-14 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--accent)] uppercase">
                  0{active + 1} / 06 — {pillars[active].tag}
                </span>
                <h3 className="font-brand font-semibold text-[26px] lg:text-[30px] text-[var(--text-1)] mt-3 mb-4">
                  {pillars[active].title}
                </h3>
                <p className="text-[15px] text-[var(--text-2)] leading-[1.8] max-w-lg">
                  {pillars[active].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="inline-flex flex-wrap gap-1 rounded-full bg-[var(--surface-2)] p-1 mt-8">
              {pillars.map((p, i) => {
                const isActive = active === i;
                const label = p.tag.charAt(0).toUpperCase() + p.tag.slice(1);
                return (
                  <button
                    key={p.tag}
                    type="button"
                    onClick={() => setActive(i)}
                    className="relative inline-flex items-center justify-center text-[12.5px] leading-none px-3.5 py-2 rounded-full"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="standard-pill-highlight"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background: "linear-gradient(135deg, var(--accent), var(--accent-strong))",
                          boxShadow: "0 8px 18px -8px color-mix(in srgb, var(--accent) 55%, transparent)",
                        }}
                        transition={{ type: "spring", stiffness: 420, damping: 38 }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-colors duration-200 ${
                        isActive ? "font-medium text-white" : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                      }`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 text-[13px] text-[var(--text-3)] text-center"
        >
          Trusted across financial services, healthcare, education, and government.
        </motion.p>
      </div>
    </section>
  );
}
