"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Lock, Layers, Eye, Sparkles } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Security-grade engineering",
    description:
      "Whether it's a phishing email or an everyday app, every product is built with the same rigor: proactive, tested, and hardened against failure.",
  },
  {
    icon: Activity,
    title: "Built for reliability",
    description:
      "Redundant, self-healing systems designed to stay online and perform — from enterprise security infrastructure to tools people use every day.",
  },
  {
    icon: Lock,
    title: "Privacy by design",
    description:
      "No implicit trust, no unnecessary data collection. Every product respects the people using it, not just the businesses buying it.",
  },
  {
    icon: Layers,
    title: "Scales with you",
    description:
      "From individual users and students to global enterprises. Our products are built to grow without architectural compromise.",
  },
  {
    icon: Eye,
    title: "Thoughtful by default",
    description:
      "Intelligent systems paired with careful, considered design — products that get smarter and simpler the more you use them.",
  },
  {
    icon: Sparkles,
    title: "AI built in, not bolted on",
    description:
      "Intelligence is part of the architecture, not a chatbot dropped on top. Every product uses AI where it genuinely makes the experience faster and smarter.",
  },
];

// Cards ease in from the direction they sit in the 3-column grid — left
// column drifts in from the left, right column from the right, middle
// column stays a plain vertical fade. Single-axis motion with an expo-out
// curve — no combined x+y — keeps it a clean glide instead of a jittery
// diagonal.
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: (i: number) => ({
    opacity: 0,
    x: i % 3 === 0 ? -18 : i % 3 === 2 ? 18 : 0,
    y: i % 3 === 1 ? 14 : 0,
  }),
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: EASE_SMOOTH },
  }),
};

export default function WhySection() {
  return (
    <section id="solutions" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -24, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Why Inframiq</span>
            </div>
            <h2 className="text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f0f0f0]">
              Every product,
              <br />
              <span className="text-[#606060]">built to the same standard.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col justify-end"
          >
            <p className="text-[15px] text-[#7a7a7a] leading-[1.75]">
              Most companies ship first and refine later. Inframiq builds with
              intent — whether the problem is a phishing email, a pricing
              decision, or an everyday workflow, we engineer intelligent systems
              that understand it deeply and get it right the first time.
            </p>
          </motion.div>
        </div>

        {/* Pillars — 6 items fills 2×3 grid cleanly */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#111111] to-[#0c0c0c] p-7 overflow-hidden hover:border-[#5b8def]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(91,141,239,0.35)]"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(160px 100px at 15% 0%, rgba(91,141,239,0.1), transparent 70%)",
                  }}
                />
                <div className="relative w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-5 group-hover:border-[#5b8def]/25 group-hover:bg-[#5b8def]/[0.06] transition-colors duration-200">
                  <Icon
                    size={15}
                    className="text-[#7a7a7a] group-hover:text-[#5b8def] transition-colors duration-200"
                  />
                </div>
                <h3 className="relative text-[14.5px] font-medium text-[#d8d8d8] mb-2.5 leading-snug">
                  {pillar.title}
                </h3>
                <p className="relative text-[13.5px] text-[#606060] leading-[1.7]">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 pt-6 border-t border-white/[0.05]"
        >
          <p className="text-[13px] text-[#505050]">
            Trusted by security teams, business leaders, and everyday users across
            financial services, healthcare, education, and government.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
