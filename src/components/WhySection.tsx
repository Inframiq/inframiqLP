"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Lock, Layers, Eye, Sparkles } from "lucide-react";

// tag: a short category code, not a step number — these six run in
// parallel, not in sequence.
const pillars = [
  {
    icon: ShieldCheck,
    tag: "security",
    title: "Security-grade engineering",
    description:
      "Whether it's a phishing email or an everyday app, every product is built with the same rigor: proactive, tested, and hardened against failure.",
  },
  {
    icon: Activity,
    tag: "uptime",
    title: "Built for reliability",
    description:
      "Redundant, self-healing systems designed to stay online and perform — from enterprise security infrastructure to tools people use every day.",
  },
  {
    icon: Lock,
    tag: "privacy",
    title: "Privacy by design",
    description:
      "No implicit trust, no unnecessary data collection. Every product respects the people using it, not just the businesses buying it.",
  },
  {
    icon: Layers,
    tag: "scale",
    title: "Scales with you",
    description:
      "From individual users and students to global enterprises. Our products are built to grow without architectural compromise.",
  },
  {
    icon: Eye,
    tag: "design",
    title: "Thoughtful by default",
    description:
      "Intelligent systems paired with careful, considered design — products that get smarter and simpler the more you use them.",
  },
  {
    icon: Sparkles,
    tag: "ai",
    title: "AI built in, not bolted on",
    description:
      "Intelligence is part of the architecture, not a chatbot dropped on top. Every product uses AI where it genuinely makes the experience faster and smarter.",
  },
];

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.05, ease: EASE_SMOOTH },
  }),
};

export default function WhySection() {
  return (
    <section id="solutions" className="py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">why inframiq</p>
            <h2 className="font-brand text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-1)]">
              Every product,
              <br />
              <span className="text-[var(--text-3)]">built to the same standard.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col justify-end"
          >
            <p className="text-[15px] text-[var(--text-2)] leading-[1.75]">
              Most companies ship first and refine later. Inframiq builds with
              intent — whether the problem is a phishing email, a pricing
              decision, or an everyday workflow, we engineer intelligent systems
              that understand it deeply and get it right the first time.
            </p>
          </motion.div>
        </div>

        {/* Pillars — a plain list, no card chrome. All six carry equal
            typographic weight; a hairline top border and the category tag
            do the separating, not boxes. */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
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
                className="border-t border-[var(--border)] pt-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[13px] text-[var(--accent)]">
                    {pillar.tag}
                  </span>
                  <Icon size={15} className="text-[var(--text-3)]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-medium text-[var(--text-1)] mb-2.5 tracking-[-0.01em]">
                  {pillar.title}
                </h3>
                <p className="text-[13.5px] text-[var(--text-2)] leading-[1.7] max-w-sm">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-[13px] text-[var(--text-3)]"
        >
          Trusted by security teams, business leaders, and everyday users across
          financial services, healthcare, education, and government.
        </motion.p>
      </div>
    </section>
  );
}
