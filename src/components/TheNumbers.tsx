"use client";

import { motion } from "framer-motion";
import { CoverageDial, SystemsIndicator, TeamMeter } from "@/components/instruments/Gauges";
import { revealContainer, revealItem } from "@/lib/motionVariants";

const timeline = [
  { label: "Founded", detail: "Inframiq established with a focus on building intelligent, well-engineered products." },
  { label: "First product", detail: "Mail Shield launched — addressing phishing and domain impersonation at scale." },
  { label: "Today", detail: "Expanding into a growing portfolio spanning enterprise security to everyday life." },
];

const instruments = [
  { key: "coverage", node: <CoverageDial />, tint: "instrument-porthole--blue" },
  { key: "systems", node: <SystemsIndicator />, tint: "instrument-porthole--violet" },
  { key: "team", node: <TeamMeter />, tint: "instrument-porthole--pink" },
];

// Illustration/instrument-driven section — the three dials sit recessed into
// one physical control-panel housing (an "earned" dark exception, same
// license as the terminal chrome elsewhere) rather than three plain white
// cards, and the timeline below reads as a live signal rail instead of a
// static row of tiles.
export default function TheNumbers() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer}
          className="mb-14"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--text-3)] uppercase mb-4">
            An early-stage company
          </motion.p>
          <motion.h2 variants={revealItem} className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            Built like it isn&apos;t.
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="instrument-console mb-14 text-left"
        >
          {/* Sweeping light — plays once on scroll-in, then loops slowly so
              the panel keeps reading as brushed metal, not a flat gradient. */}
          <motion.span
            className="instrument-console-sheen"
            initial={{ x: "-60%" }}
            whileInView={{ x: "60%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 5 }}
          />
          {[
            { top: 10, left: 10 },
            { top: 10, right: 10 },
            { bottom: 10, left: 10 },
            { bottom: 10, right: 10 },
          ].map((pos, i) => (
            <span key={i} className="instrument-console-rivet" style={pos} />
          ))}

          <div className="instrument-console-bar">
            <span className="instrument-console-led" />
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--text-2)]">
              system status — live
            </span>
            <span className="ml-auto font-mono text-[9px] text-[var(--text-3)]">panel 01 / rev.3</span>
          </div>

          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
            {instruments.map((inst, i) => (
              <motion.div
                key={inst.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`instrument-porthole ${inst.tint} py-9 px-4 m-3 sm:m-4`}
              >
                <div className="relative z-10">{inst.node}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[13.5px] text-[var(--text-2)] max-w-[480px] mx-auto mb-16"
        >
          We&apos;d rather show you exactly where we are than round up.
        </motion.p>

        <div className="mt-14">
          {/* Signal rail — nodes live inside the same 3-col grid as the
              cards below, so each one is guaranteed to sit centered above
              its own card (grid alignment, not a guessed percentage) rather
              than floating disconnected above the row. */}
          <div className="hidden sm:grid sm:grid-cols-3 relative h-6 mb-4">
            <div className="absolute top-1/2 left-[16.66%] right-[16.66%] h-px -translate-y-1/2" style={{ backgroundColor: "var(--border-strong)" }}>
              <motion.span
                className="absolute top-1/2 w-2 h-2 rounded-full -translate-y-1/2"
                style={{ backgroundColor: "var(--accent)", boxShadow: "0 0 10px var(--accent)" }}
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: "linear" }}
              />
            </div>
            {timeline.map((item, i) => (
              <div key={item.label} className="relative z-10 h-full flex items-center justify-center">
                <motion.span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: "var(--accent)" }}
                  animate={{ boxShadow: ["0 0 0 0 var(--accent-dim)", "0 0 0 6px transparent"] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay: i * 1.2 }}
                />
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-elevated p-6 text-left"
              >
                <div className="relative z-10">
                  <p className="font-brand text-[12px] font-bold tracking-[0.05em] text-[var(--accent-strong)] uppercase mb-2.5">
                    {item.label}
                  </p>
                  <p className="text-[13.5px] text-[var(--text-2)] leading-[1.7]">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
