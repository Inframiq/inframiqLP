"use client";

import { motion } from "framer-motion";
import { Headset, Sparkles, LifeBuoy } from "lucide-react";

const pillars = [
  {
    icon: Headset,
    title: "Communications",
    description: "We manage your customer-facing communications directly, as an extension of your own team.",
  },
  {
    icon: Sparkles,
    title: "Intelligent solutions",
    description: "Enterprise software built for how your business actually operates, not a generic template.",
  },
  {
    icon: LifeBuoy,
    title: "Dedicated support",
    description: "A consistent team behind the work, available around the clock — not a rotating queue.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function OperationsSection() {
  return (
    <section className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-5">
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">
                Always On
              </span>
            </div>

            <h2 className="text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f0f0f0] mb-5">
              Running your operations
              <br />
              <span className="text-[#606060]">around the clock.</span>
            </h2>

            <p className="text-[15px] text-[#7a7a7a] leading-[1.8] max-w-lg">
              Inframiq handles your customer service operations 24/7 while
              building enterprise software products designed for your
              business. We manage your communications, deliver intelligent
              solutions, and provide dedicated support — seamlessly
              integrated into your operations.
            </p>
          </motion.div>

          {/* Right: pillars */}
          <div className="space-y-0 divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-[#0f0f0f] overflow-hidden">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-4 px-6 py-6"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#5b8def]/[0.1] border border-[#5b8def]/25 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#5b8def]" strokeWidth={1.75} />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-[#d0d0d0] mb-1">{pillar.title}</p>
                    <p className="text-[13px] text-[#666] leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
