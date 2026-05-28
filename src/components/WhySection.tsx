"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Activity, Lock, Layers, Eye, FileCheck, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Proactive threat prevention",
    description:
      "Our systems identify and neutralize threats before they reach critical infrastructure — not after the fact.",
  },
  {
    icon: Activity,
    title: "Infrastructure resilience",
    description:
      "Designed for organizations where downtime has real consequences. Redundant, self-healing architectures built to endure.",
  },
  {
    icon: Lock,
    title: "Zero-trust by design",
    description:
      "No implicit trust at any layer. Every request is authenticated and authorized, continuously. Built on the NIST framework.",
  },
  {
    icon: Layers,
    title: "Scalable enterprise systems",
    description:
      "From mid-market to global enterprise. Inframiq scales without architectural compromise or performance degradation.",
  },
  {
    icon: Eye,
    title: "Intelligent monitoring",
    description:
      "Persistent visibility across your entire environment — cloud, on-premise, and hybrid — with machine learning anomaly detection.",
  },
  {
    icon: FileCheck,
    title: "Compliance by default",
    description:
      "Audit trails, data residency controls, and compliance reporting built into every product layer — not added later. SOC 2, HIPAA, GDPR, and more.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07 },
  }),
};

export default function WhySection() {
  return (
    <section id="solutions" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
              <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Why Inframiq</span>
            </div>
            <h2 className="text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f0f0f0]">
              Security that works
              <br />
              <span className="text-[#606060]">before the breach.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col justify-end"
          >
            <p className="text-[15px] text-[#7a7a7a] leading-[1.75]">
              Most security vendors react to threats. Inframiq is built to prevent
              them — with intelligent systems that understand your infrastructure,
              learn your patterns, and adapt continuously to an evolving threat
              landscape.
            </p>
          </motion.div>
        </div>

        {/* Pillars — 6 items fills 2×3 grid cleanly */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
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
                className="bg-[#0c0c0c] p-7 group hover:bg-[#101010] transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-md bg-white/[0.04] border border-white/[0.07] flex items-center justify-center mb-5 group-hover:border-[#5b8def]/25 group-hover:bg-[#5b8def]/[0.06] transition-colors duration-200">
                  <Icon
                    size={15}
                    className="text-[#7a7a7a] group-hover:text-[#5b8def] transition-colors duration-200"
                  />
                </div>
                <h3 className="text-[14.5px] font-medium text-[#d8d8d8] mb-2.5 leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-[13.5px] text-[#606060] leading-[1.7]">
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
          className="mt-8 flex items-center justify-between pt-6 border-t border-white/[0.05]"
        >
          <p className="text-[13px] text-[#505050]">
            Trusted by security teams across financial services, healthcare, and government.
          </p>
          <a
            href="#demo"
            className="flex items-center gap-1.5 text-[13px] text-[#8a8a8a] hover:text-white transition-colors duration-150 group"
          >
            Talk to our team
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
