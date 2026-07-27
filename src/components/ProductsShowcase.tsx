"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SimulynWindow, MailShieldWindow } from "@/components/products/ProductWindows";
import { revealContainer, revealItem } from "@/lib/motionVariants";

export default function ProductsShowcase() {
  return (
    <section id="products" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 ambient-glow pointer-events-none" style={{ "--glow-x": "20%", "--glow-y": "0%" } as React.CSSProperties} />
      <div className="absolute inset-0 ambient-glow pointer-events-none opacity-70" style={{ "--glow-x": "85%", "--glow-y": "100%" } as React.CSSProperties} />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer}
          className="mb-12 max-w-xl"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--trace)] uppercase mb-4">
            System 02 — Engineering
          </motion.p>
          <motion.h2 variants={revealItem} className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            Two products. Run them yourself.
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="h-full flex flex-col"
          >
            <SimulynWindow className="flex-1" />
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-[12.5px] text-[var(--text-3)]">Know your numbers before you set your price.</p>
              <Link
                href="/?product=Simulyn#demo"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--text-1)] hover:text-[var(--accent-strong)] transition-colors duration-150 flex-shrink-0"
              >
                Demo <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="h-full flex flex-col"
          >
            <MailShieldWindow className="flex-1" />
            <div className="flex items-center justify-between mt-4 px-1">
              <p className="text-[12.5px] text-[var(--text-3)]">Stops phishing and spoofing before delivery.</p>
              <Link
                href="/?product=Mail%20Shield#demo"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] text-[var(--text-1)] hover:text-[var(--accent-strong)] transition-colors duration-150 flex-shrink-0"
              >
                Demo <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>

        <p className="text-center mt-10 text-[12.5px] text-[var(--text-3)]">
          Both in active development —{" "}
          <Link href="/products" className="text-[var(--text-2)] hover:text-[var(--text-1)] underline underline-offset-2">
            view the full product suite
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
