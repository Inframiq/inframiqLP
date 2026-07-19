"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Wrench,
  Headset,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

const services: Service[] = [
  {
    icon: Phone,
    title: "Voice support",
    description:
      "Real people answering real calls. Trained agents handle inbound and outbound voice for your business, 24/7, in your brand's voice.",
    points: ["Inbound customer enquiries", "Outbound follow-up & retention", "Call escalation & handoff"],
  },
  {
    icon: MessageCircle,
    title: "Live chat support",
    description:
      "Human agents on chat and messaging, not a bot script. Fast, accurate responses across your website and support channels.",
    points: ["Website & in-app live chat", "Order & account enquiries", "Multi-channel messaging support"],
  },
  {
    icon: Wrench,
    title: "Technical support",
    description:
      "Trained agents who can actually troubleshoot — walking customers through issues instead of routing every ticket upward.",
    points: ["Tier 1 & tier 2 troubleshooting", "Product & account issue resolution", "Structured ticket escalation"],
  },
  {
    icon: Headset,
    title: "24/7 dedicated teams",
    description:
      "A consistent team of agents assigned to your business, not a shared, rotating pool — covering every timezone your customers are in.",
    points: ["Dedicated, trained agent teams", "Round-the-clock coverage", "Direct oversight, not a call-center queue"],
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

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-[110px] pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, transparent 30%, #0c0c0c 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-[12px] text-[#454545]">
              <Link href="/" className="hover:text-[#8a8a8a] transition-colors">
                Inframiq
              </Link>
              <span>/</span>
              <span className="text-[#8a8a8a]">Services</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-5">
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">
                Human-Staffed, 24/7
              </span>
            </div>

            <h1 className="text-[42px] lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#f0f0f0] mb-6 max-w-2xl">
              Your customers, answered
              <br />
              <span className="text-[#5a5a5a]">by real people, around the clock.</span>
            </h1>

            <p className="text-[16px] text-[#6a6a6a] leading-[1.8] max-w-xl">
              Inframiq operates as your customer service team — deploying trained
              agents for voice and chat support, staffed 24/7 to handle enquiries
              and technical issues as they come in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  className="bg-[#0c0c0c] p-8 hover:bg-[#0f0f0f] transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#5b8def]/[0.1] border border-[#5b8def]/25 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-[#5b8def]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[16px] font-medium text-[#e0e0e0] mb-2.5">{service.title}</h3>
                  <p className="text-[13.5px] text-[#5a5a5a] leading-[1.75] mb-5">{service.description}</p>
                  <ul className="space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[12.5px] text-[#707070]">
                        <span className="w-1 h-1 rounded-full bg-[#5b8def] mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why human agents */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-5">
                <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">
                  How we work
                </span>
              </div>
              <h2 className="text-[30px] font-semibold tracking-[-0.02em] text-[#e8e8e8] mb-5 leading-tight">
                People on the line,
                <br />
                not a script.
              </h2>
              <p className="text-[14px] text-[#626262] leading-[1.8]">
                Every call and chat is handled by a trained agent who understands
                your business, not an automated flow that reads back a knowledge
                base. Agents are dedicated to your account, so customers get
                consistency instead of a different stranger every time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-0 divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-[#0f0f0f] overflow-hidden"
            >
              {[
                { label: "Coverage", value: "24 hours a day, every day" },
                { label: "Channels", value: "Voice & live chat" },
                { label: "Agents", value: "Trained, dedicated to your account" },
                { label: "Handles", value: "Enquiries & technical support" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-5">
                  <span className="text-[11px] font-medium text-[#5b8def] uppercase tracking-wider">
                    {row.label}
                  </span>
                  <span className="text-[13.5px] text-[#999] text-right">{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.06] bg-[#0f0f0f] p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div>
              <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-[#e8e8e8] mb-2.5">
                Need a team behind your support line?
              </h2>
              <p className="text-[14px] text-[#666] max-w-lg leading-relaxed">
                Tell us about your call and chat volume — we'll tell you honestly
                what coverage you need and whether we're the right fit.
              </p>
            </div>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md border border-white/[0.1] text-[#b0b0b0] text-[13.5px] font-medium hover:border-white/[0.18] hover:text-white transition-all duration-150 flex-shrink-0"
            >
              Get in touch
              <ArrowRight size={13} className="opacity-60" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
