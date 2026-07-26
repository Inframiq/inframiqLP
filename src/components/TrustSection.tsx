"use client";

import { motion } from "framer-motion";
import { values } from "@/lib/values";

// Every number here is one we can actually stand behind — no fabricated
// enterprise metrics. Reused from what's already true and already stated
// on /about and /services rather than invented for this section.
const stats = [
  { value: "2", label: "Products in active development", sub: "Mail Shield, Simulyn — more underway" },
  { value: "10+", label: "Team members", sub: "Engineers, designers, and specialists" },
  { value: "24/7", label: "Support coverage", sub: "Voice, chat, and technical support" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, delay: i * 0.06 },
  }),
};

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export default function TrustSection() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-xl"
        >
          <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">trust, by design</p>
          <h2 className="font-brand text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-1)] mb-5">
            An early-stage company,
            <br />
            <span className="text-[var(--text-3)]">built like it isn&apos;t.</span>
          </h2>
          <p className="text-[15px] text-[var(--text-2)] leading-[1.75]">
            Inframiq is an early-stage company with a clear and deliberate roadmap.
            We build with precision — one product, perfected, before the next —
            and we&apos;d rather tell you exactly where we are than round up.
          </p>
        </motion.div>

        {/* Stats — a plain divided row of real numbers, no card chrome,
            so it reads as a distinct banner rather than another grid of
            boxes. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)] border-y border-[var(--border)] mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_SMOOTH }}
              className="px-6 py-10 lg:py-12"
            >
              <p className="font-mono text-[36px] lg:text-[44px] font-medium tracking-tight leading-none mb-3 text-[var(--text-1)]">
                {stat.value}
              </p>
              <p className="text-[13px] text-[var(--text-2)] mb-1">{stat.label}</p>
              <p className="text-[12px] text-[var(--text-3)]">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* How we work — the same operating principles stated on /about,
            reused rather than duplicated content: this is what we're
            actually asking to be trusted on, not a certifications list
            we can't back up. Set as flowing text with a left rule, not
            boxed cards — a different device from WhySection's numbered
            list so the two sections don't read as the same component
            reused twice. */}
        <div>
          <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--text-3)] mb-6">
            how we work
          </p>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="border-l-2 border-[var(--accent)]/25 pl-5"
              >
                <p className="text-[14.5px] leading-[1.7]">
                  <span className="font-medium text-[var(--text-1)]">{value.title}. </span>
                  <span className="text-[var(--text-2)]">{value.description}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
