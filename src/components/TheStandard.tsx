"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const pillars = [
  { tag: "security", title: "Security-first", description: "Every product is built with the same rigor: proactive, tested, and hardened against failure — whether it's a phishing email or an everyday app." },
  { tag: "uptime", title: "Redundant", description: "Self-healing systems designed to stay online and perform — from enterprise security infrastructure to tools people use every day." },
  { tag: "privacy", title: "Private by default", description: "No implicit trust, no unnecessary data collection. Every product respects the people using it, not just the businesses buying it." },
  { tag: "scale", title: "Built to scale", description: "From individual users and students to global enterprises — our products grow without architectural compromise." },
  { tag: "design", title: "Considered design", description: "Intelligent systems paired with careful design — products that get smarter and simpler the more you use them." },
  { tag: "ai", title: "Intelligence, applied", description: "Intelligence is part of the architecture, not a chatbot dropped on top — used only where it genuinely makes things faster." },
] as const;

const RADIUS = 148;
const CENTER = 200;

function pointOn(index: number) {
  const angle = (-90 + index * 60) * (Math.PI / 180);
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function TheStandard() {
  const [active, setActive] = useState(0);

  return (
    <section id="solutions" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 max-w-xl"
        >
          <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)] uppercase mb-4">Why Inframiq</p>
          <h2 className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            Every product, built to the same standard.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-center">
          {/* Radial diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto w-full max-w-[380px] aspect-square"
          >
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" fill="none">
              <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="var(--border)" strokeWidth="1" strokeDasharray="2 5" />
              {pillars.map((p, i) => {
                const pt = pointOn(i);
                return (
                  <line
                    key={p.tag}
                    x1={CENTER}
                    y1={CENTER}
                    x2={pt.x}
                    y2={pt.y}
                    stroke={active === i ? "var(--accent)" : "var(--border-strong)"}
                    strokeWidth="1"
                    className="transition-colors duration-300"
                  />
                );
              })}
              <circle cx={CENTER} cy={CENTER} r="34" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
            </svg>

            <div
              className="absolute flex items-center justify-center text-center font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--text-3)]"
              style={{ left: CENTER - 34, top: CENTER - 34, width: 68, height: 68 }}
            >
              core
            </div>

            {pillars.map((p, i) => {
              const pt = pointOn(i);
              const isActive = active === i;
              return (
                <button
                  key={p.tag}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(i)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group"
                  style={{ left: `${(pt.x / 400) * 100}%`, top: `${(pt.y / 400) * 100}%` }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full border transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? "var(--accent)" : "var(--surface-2)",
                      borderColor: isActive ? "var(--accent)" : "var(--border-strong)",
                    }}
                  />
                  <span
                    className={`font-mono text-[10.5px] uppercase tracking-[0.03em] whitespace-nowrap transition-colors duration-200 ${
                      isActive ? "text-[var(--text-1)]" : "text-[var(--text-3)] group-hover:text-[var(--text-2)]"
                    }`}
                  >
                    {p.tag}
                  </span>
                </button>
              );
            })}
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
