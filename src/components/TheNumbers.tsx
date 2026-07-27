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
  { key: "coverage", node: <CoverageDial /> },
  { key: "systems", node: <SystemsIndicator /> },
  { key: "team", node: <TeamMeter /> },
];

// Illustration/instrument-driven section — three physical dials floating
// independently on the desk rather than boxed into one dashboard window, so
// each metric reads as its own honest instrument rather than a dashboard tile.
export default function TheNumbers() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-[var(--border)]">
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

        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {instruments.map((inst, i) => (
            <motion.div
              key={inst.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-elevated py-8 px-4"
            >
              <div className="relative z-10">{inst.node}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[13.5px] text-[var(--text-2)] max-w-[480px] mx-auto mb-14"
        >
          We&apos;d rather show you exactly where we are than round up.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-6 mt-14">
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
    </section>
  );
}
