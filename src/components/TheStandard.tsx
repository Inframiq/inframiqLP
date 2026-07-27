"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { revealContainer, revealItem } from "@/lib/motionVariants";

const pillars = [
  { tag: "security", title: "Security-first", description: "Every product is built with the same rigor: proactive, tested, and hardened against failure — whether it's a phishing email or an everyday app." },
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

        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-16 items-center">
          {/* Vertical stepper — a plain connector rail behind a column of dots,
              never colinear with any label, so there's no line-through-text
              collision the way a radial layout has at its top/bottom points. */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute left-[7px] top-3 bottom-3 w-px bg-[var(--border)]" aria-hidden />
            <div>
              {pillars.map((p, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={p.tag}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(i)}
                    className="relative flex items-center gap-4 w-full text-left py-3 group"
                  >
                    <span
                      className="relative z-10 flex-shrink-0 h-3.5 w-3.5 rounded-full border-2 transition-all duration-200"
                      style={{
                        backgroundColor: isActive ? "var(--accent)" : "var(--surface)",
                        borderColor: isActive ? "var(--accent)" : "var(--border-strong)",
                        boxShadow: isActive ? "0 0 0 4px var(--accent-dim)" : "none",
                      }}
                    />
                    <span
                      className={`font-mono text-[12px] uppercase tracking-[0.04em] transition-colors duration-200 ${
                        isActive ? "text-[var(--text-1)]" : "text-[var(--text-3)] group-hover:text-[var(--text-2)]"
                      }`}
                    >
                      0{i + 1} — {p.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Active pillar detail */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 lg:p-10"
          >
            <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--accent)] uppercase">
              0{active + 1} / 06 — {pillars[active].tag}
            </span>
            <h3 className="font-brand font-semibold text-[24px] lg:text-[28px] text-[var(--text-1)] mt-3 mb-4">
              {pillars[active].title}
            </h3>
            <p className="text-[14.5px] text-[var(--text-2)] leading-[1.8] max-w-md">
              {pillars[active].description}
            </p>

            <div className="flex flex-wrap gap-1.5 mt-8">
              {pillars.map((p, i) => (
                <button
                  key={p.tag}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`font-mono text-[10.5px] px-2.5 py-1 rounded border transition-colors duration-150 ${
                    active === i
                      ? "border-[var(--accent)]/50 text-[var(--text-1)] bg-[var(--accent-dim)]"
                      : "border-[var(--border)] text-[var(--text-3)] hover:text-[var(--text-2)]"
                  }`}
                >
                  {p.tag}
                </button>
              ))}
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
