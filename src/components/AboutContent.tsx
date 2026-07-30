"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, Target } from "lucide-react";
import { values } from "@/lib/values";
import TheCrew from "@/components/TheCrew";
import AuroraGrain from "@/components/AuroraGrain";
import KineticText from "@/components/animations/KineticText";
import { useEntryRevealed } from "@/components/EntryLoaderProvider";

const timeline = [
  { hash: "a3f1c2", label: "Founded", event: "Inframiq established with a focus on building intelligent, well-engineered products." },
  { hash: "9b7e04", label: "First product", event: "Mail Shield in active development — addressing phishing and domain impersonation at scale." },
  { hash: "HEAD", label: "Today", event: "Expanding into a growing portfolio of products — spanning enterprise security to everyday life — engineered with the same uncompromising rigor." },
];

const docs = [
  {
    key: "vision",
    icon: Eye,
    title: "vision.md",
    body: "To become a globally trusted technology and business operations partner, empowering organizations through innovative digital products, intelligent customer support, and reliable operational excellence that drives long-term business growth.",
  },
  {
    key: "mission",
    icon: Target,
    title: "mission.md",
    body: "Our mission is to build innovative digital products while helping businesses deliver exceptional customer experiences through reliable voice and chat support solutions. We partner with organizations to simplify operations, enhance customer satisfaction, and enable sustainable growth through technology, skilled professionals, and operational excellence.",
  },
];

function ManifestoWindow() {
  const [active, setActive] = useState(0);
  const doc = docs[active];
  const Icon = doc.icon;

  return (
    <div className="window-chrome max-w-2xl mx-auto">
      <div className="window-chrome-bar !p-1.5 gap-1">
        {docs.map((d, i) => {
          const isActive = active === i;
          return (
            <button
              key={d.key}
              type="button"
              onClick={() => setActive(i)}
              className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[12.5px] font-brand font-semibold"
            >
              {isActive && (
                <motion.span
                  layoutId="manifesto-tab-highlight"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-strong))",
                    boxShadow: "0 6px 16px -6px color-mix(in srgb, var(--accent) 55%, transparent)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
              <span className={`relative z-10 transition-colors duration-200 ${isActive ? "text-white" : "text-[var(--text-3)] hover:text-[var(--text-2)]"}`}>
                {d.title}
              </span>
            </button>
          );
        })}
      </div>
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={doc.key}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 lg:p-10"
          >
            <div className="flex items-center gap-2 mb-5">
              <Icon size={15} className="text-[var(--accent)]" strokeWidth={1.75} />
              <span className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] uppercase">{doc.key}</span>
            </div>
            <p className="text-[14.5px] text-[var(--text-2)] leading-[1.8]">{doc.body}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PrinciplesDiagram() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid lg:grid-cols-[260px_1fr] gap-10 lg:gap-14 items-center">
      {/* Vertical stepper — a plain connector rail behind a column of dots,
          never colinear with any label, unlike a radial layout's top/bottom
          points. */}
      <motion.div
        initial={{ opacity: 0, x: -14 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="relative rounded-2xl bg-[var(--surface-2)] p-1.5"
      >
        {values.map((v, i) => {
          const isActive = active === i;
          return (
            <button
              key={v.tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              className="relative flex items-center gap-3 w-full text-left px-3.5 py-2.5 rounded-xl group"
            >
              {isActive && (
                <motion.span
                  layoutId="principles-step-highlight"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: "linear-gradient(135deg, var(--accent), var(--accent-strong))",
                    boxShadow: "0 10px 24px -10px color-mix(in srgb, var(--accent) 55%, transparent)",
                  }}
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                />
              )}
              <span
                className="relative z-10 flex-shrink-0 h-2 w-2 rounded-full"
                style={{
                  backgroundColor: isActive ? "#ffffff" : "var(--border-strong)",
                  transition: "background-color 250ms",
                }}
              />
              <span
                className={`relative z-10 text-[13.5px] transition-colors duration-200 ${
                  isActive ? "font-medium text-white" : "text-[var(--text-2)] group-hover:text-[var(--text-1)]"
                }`}
              >
                {v.title}
              </span>
            </button>
          );
        })}
      </motion.div>

      <div className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 lg:p-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--accent)] uppercase">
              0{active + 1} / 0{values.length} — {values[active].tag}
            </span>
            <h3 className="font-brand font-semibold text-[22px] lg:text-[26px] text-[var(--text-1)] mt-3 mb-4">
              {values[active].title}
            </h3>
            <p className="text-[14px] text-[var(--text-2)] leading-[1.8] max-w-md">{values[active].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// The hero's visual centerpiece: an animated system-architecture diagram —
// four real subsystems wired into one core, with data visibly flowing along
// each connector, rather than a status readout standing in for the company.
const archNodes = [
  { key: "ops", label: "Operations Desk", sub: "24/7 voice & chat", x: 70, y: 60 },
  { key: "mail", label: "Mail Shield", sub: "Email security", x: 330, y: 60 },
  { key: "sim", label: "Simulyn", sub: "Pricing intelligence", x: 70, y: 260 },
  { key: "eng", label: "Engineering", sub: "10+ specialists", x: 330, y: 260 },
] as const;
const ARCH_CENTER = { x: 200, y: 160 };

function ArchitectureDiagram() {
  return (
    <div className="relative w-full aspect-[4/3]">
      <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full" fill="none">
        {archNodes.map((n) => (
          <path
            key={n.key}
            d={`M ${ARCH_CENTER.x} ${ARCH_CENTER.y} L ${n.x} ${n.y}`}
            stroke="var(--border-strong)"
            strokeWidth="1"
            className="trace-path"
            style={{ "--trace-length": 200 } as React.CSSProperties}
          />
        ))}
        {archNodes.map((n, i) => {
          const length = Math.hypot(n.x - ARCH_CENTER.x, n.y - ARCH_CENTER.y);
          const dot = 10;
          return (
            <motion.path
              key={`flow-${n.key}`}
              d={`M ${ARCH_CENTER.x} ${ARCH_CENTER.y} L ${n.x} ${n.y}`}
              stroke="var(--accent-strong)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${dot} ${length - dot}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -length }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear", delay: i * 0.35 }}
            />
          );
        })}
        <motion.circle
          cx={ARCH_CENTER.x}
          cy={ARCH_CENTER.y}
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth="1"
          animate={{ r: [26, 28, 26] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{ left: `${(ARCH_CENTER.x / 400) * 100}%`, top: `${(ARCH_CENTER.y / 320) * 100}%`, transform: "translate(-50%, -50%)" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.04em] text-[var(--text-3)]">core</span>
      </div>

      {archNodes.map((n, i) => (
        <motion.div
          key={n.key}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          className="absolute w-[130px] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(n.x / 400) * 100}%`, top: `${(n.y / 320) * 100}%` }}
        >
          <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3 py-2.5 text-center">
            <p className="font-mono text-[10px] text-[var(--accent-strong)] mb-1">{n.label}</p>
            <p className="text-[9.5px] text-[var(--text-3)]">{n.sub}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function AboutContent() {
  const revealed = useEntryRevealed();
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--bg)] pt-[110px] pb-16 overflow-hidden">
        <AuroraGrain />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-8 text-[12px] text-[var(--text-3)]">
                <Link href="/" className="hover:text-[var(--text-2)] transition-colors">Inframiq</Link>
                <span>/</span>
                <span className="text-[var(--text-2)]">About</span>
              </div>

              <p className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] mb-5">about inframiq</p>

              <h1 className="font-brand text-[38px] lg:text-[48px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text-1)] mb-6 max-w-2xl">
                <KineticText as="span" text="Built for people" play={revealed} />
                <br />
                <KineticText as="span" text="who expect things to just work." className="text-[var(--text-1)]" play={revealed} />
              </h1>

              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] max-w-xl">
                Inframiq engineers intelligent software with uncompromising
                precision — from enterprise-grade security infrastructure to
                the refined, everyday tools businesses and individuals rely on.
                Different products. One exacting standard.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <ArchitectureDiagram />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ManifestoWindow />
          </motion.div>
        </div>
      </section>

      {/* Values — radial diagram */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mb-14"
          >
            <p className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] mb-4">how we work</p>
            <h2 className="font-brand text-[30px] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
              Our operating principles
            </h2>
          </motion.div>

          <PrinciplesDiagram />
        </div>
      </section>

      {/* Timeline — rendered as a changelog window */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] mb-4">company</p>
              <h2 className="font-brand text-[30px] font-semibold tracking-[-0.02em] text-[var(--text-1)] mb-5">
                Where we are today
              </h2>
              <p className="text-[14px] text-[var(--text-2)] leading-[1.8]">
                Inframiq is an early-stage company with a clear and deliberate roadmap.
                We build with precision — one product, perfected, before the next.
                Mail Shield addresses one of the most prevalent enterprise attack vectors,
                and Simulyn is next, bringing the same rigor to business pricing decisions.
                Several more products, spanning security, business, and everyday life, are
                already in active development.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="window-chrome"
            >
              <div className="window-chrome-bar">
                <span className="window-chrome-dot" />
                <span className="window-chrome-dot" />
                <span className="window-chrome-dot" />
                <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">changelog.log</span>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {timeline.map((item) => (
                  <div key={item.hash} className="flex gap-4 px-6 py-5">
                    <span className="font-mono text-[11px] text-[var(--trace)] flex-shrink-0 pt-[1px]">{item.hash}</span>
                    <div>
                      <p className="font-mono text-[11px] text-[var(--accent-strong)] mb-1">{item.label.toLowerCase()}</p>
                      <p className="text-[13px] text-[var(--text-2)] leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team — the same live directory used on the homepage */}
      <div>
        <TheCrew />
        <div className="max-w-5xl mx-auto px-6 lg:px-10 pb-16 -mt-4">
          <a
            href="mailto:support@inframiq.com"
            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md border border-[var(--border-strong)] text-[var(--text-2)] text-[13.5px] font-medium hover:border-[var(--accent)]/40 hover:text-[var(--text-1)] active:scale-[0.98] transition-all duration-150"
          >
            support@inframiq.com
          </a>
        </div>
      </div>
    </>
  );
}
