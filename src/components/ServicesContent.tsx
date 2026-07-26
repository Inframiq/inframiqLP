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
  tag: string;
  title: string;
  description: string;
  points: string[];
}

// tag: a short category code, not a step number — the four channels run
// in parallel, not in sequence.
const services: Service[] = [
  {
    icon: Phone,
    tag: "voice",
    title: "Voice support",
    description:
      "Real people answering real calls. Trained agents handle inbound and outbound voice for your business, 24/7, in your brand's voice.",
    points: ["Inbound customer enquiries", "Outbound follow-up & retention", "Call escalation & handoff"],
  },
  {
    icon: MessageCircle,
    tag: "chat",
    title: "Live chat support",
    description:
      "Human agents on chat and messaging, not a bot script. Fast, accurate responses across your website and support channels.",
    points: ["Website & in-app live chat", "Order & account enquiries", "Multi-channel messaging support"],
  },
  {
    icon: Wrench,
    tag: "tech",
    title: "Technical support",
    description:
      "Trained agents who can actually troubleshoot — walking customers through issues instead of routing every ticket upward.",
    points: ["Tier 1 & tier 2 troubleshooting", "Product & account issue resolution", "Structured ticket escalation"],
  },
  {
    icon: Headset,
    tag: "always-on",
    title: "24/7 dedicated teams",
    description:
      "A consistent team of agents assigned to your business, not a shared, rotating pool — covering every timezone your customers are in.",
    points: ["Dedicated, trained agent teams", "Round-the-clock coverage", "Direct oversight, not a call-center queue"],
  },
];

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

export default function ServicesContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--bg)] pt-[110px] pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, transparent 30%, var(--bg) 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-[12px] text-[var(--text-3)]">
              <Link href="/" className="hover:text-[var(--text-2)] transition-colors">
                Inframiq
              </Link>
              <span>/</span>
              <span className="text-[var(--text-2)]">Services</span>
            </div>

            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">
              human-staffed, 24/7
            </p>

            <h1 className="font-brand text-[42px] lg:text-[52px] font-semibold tracking-[-0.02em] leading-[1.08] text-[var(--text-1)] mb-6 max-w-2xl">
              Your customers, answered
              <br />
              <span className="text-[var(--text-3)]">by real people, around the clock.</span>
            </h1>

            <p className="text-[16px] text-[var(--text-2)] leading-[1.8] max-w-xl">
              Inframiq operates as your customer service team — deploying trained
              agents for voice and chat support, staffed 24/7 to handle enquiries
              and technical issues as they come in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services — alternating full-width rows, each with its own
          category tag and a distinct visual panel, instead of four
          uniform cards in a grid. */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {services.map((service, i) => {
              const Icon = service.icon;
              const flip = i % 2 === 1;
              return (
                <div
                  key={service.title}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-last" : ""}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: EASE_SMOOTH }}
                  >
                    <span className="block font-mono text-[13px] text-[var(--accent)] mb-4">
                      {service.tag}
                    </span>
                    <h3 className="text-[24px] font-semibold text-[var(--text-1)] tracking-[-0.02em] mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[14.5px] text-[var(--text-2)] leading-[1.75] mb-5 max-w-md">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[13px] text-[var(--text-2)]">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* The tag itself, oversized and faint, stands in for a
                      boxed icon panel — no border, no card, no shadow. */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.08, ease: EASE_SMOOTH }}
                    className="relative h-[200px] lg:h-[240px] flex items-center justify-center overflow-hidden"
                  >
                    <span
                      aria-hidden
                      className="absolute font-mono text-[56px] tracking-tight leading-none text-[var(--border-strong)] select-none"
                    >
                      {service.tag}
                    </span>
                    <Icon size={44} className="relative text-[var(--accent)]" strokeWidth={1.25} />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why human agents */}
      <section className="section-raised py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">
                how we work
              </p>
              <h2 className="font-brand text-[30px] font-semibold tracking-[-0.02em] text-[var(--text-1)] mb-5 leading-tight">
                People on the line,
                <br />
                not a script.
              </h2>
              <p className="text-[14px] text-[var(--text-2)] leading-[1.8]">
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
              className="space-y-0 divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            >
              {[
                { label: "Coverage", value: "24 hours a day, every day" },
                { label: "Channels", value: "Voice & live chat" },
                { label: "Agents", value: "Trained, dedicated to your account" },
                { label: "Handles", value: "Enquiries & technical support" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-5">
                  <span className="font-mono text-[11px] text-[var(--accent)] tracking-[0.02em]">
                    {row.label.toLowerCase()}
                  </span>
                  <span className="text-[13.5px] text-[var(--text-2)] text-right">{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
          >
            <div>
              <h2 className="font-brand text-[24px] font-semibold tracking-[-0.02em] text-[var(--text-1)] mb-2.5">
                Need a team behind your support line?
              </h2>
              <p className="text-[14px] text-[var(--text-2)] max-w-lg leading-relaxed">
                Tell us about your call and chat volume — we&apos;ll tell you honestly
                what coverage you need and whether we&apos;re the right fit.
              </p>
            </div>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md bg-[var(--accent)] text-white text-[13.5px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150 flex-shrink-0"
            >
              Get in touch
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
