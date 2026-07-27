"use client";

import { motion } from "framer-motion";
import { StatusPanel } from "@/components/instruments/Gauges";

const timeline = [
  { label: "Founded", detail: "Inframiq established with a focus on building intelligent, well-engineered products." },
  { label: "First product", detail: "Mail Shield launched — addressing phishing and domain impersonation at scale." },
  { label: "Today", detail: "Expanding into a growing portfolio spanning enterprise security to everyday life." },
];

export default function TheNumbers() {
  return (
    <section id="about" className="py-24 lg:py-32 border-t border-[var(--border)]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)] uppercase mb-4">
            An early-stage company
          </p>
          <h2 className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            Built like it isn&apos;t.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <StatusPanel />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-[13.5px] text-[var(--text-2)] max-w-[480px] mx-auto mb-14"
        >
          We&apos;d rather show you exactly where we are than round up.
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-10 text-left border-t border-[var(--border)] pt-10">
          {timeline.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="font-mono text-[11px] tracking-[0.06em] text-[var(--accent)] uppercase mb-2">
                {item.label}
              </p>
              <p className="text-[13.5px] text-[var(--text-2)] leading-[1.7]">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
