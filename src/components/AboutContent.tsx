"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Target } from "lucide-react";
import { values } from "@/lib/values";
import { StatusPanel } from "@/components/instruments/Gauges";
import TheCrew from "@/components/TheCrew";

const timeline = [
  { hash: "a3f1c2", label: "Founded", event: "Inframiq established with a focus on building intelligent, well-engineered products." },
  { hash: "9b7e04", label: "First product", event: "Mail Shield launched — addressing phishing and domain impersonation at scale." },
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
      <div className="window-chrome-bar !p-0">
        {docs.map((d, i) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setActive(i)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-mono border-r border-[var(--border)] transition-colors duration-150 ${
              active === i ? "bg-[var(--surface-2)] text-[var(--text-1)]" : "text-[var(--text-3)] hover:text-[var(--text-2)]"
            }`}
          >
            {d.title}
          </button>
        ))}
      </div>
      <motion.div key={doc.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="p-8 lg:p-10">
        <div className="flex items-center gap-2 mb-5">
          <Icon size={15} className="text-[var(--accent)]" strokeWidth={1.75} />
          <span className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] uppercase">{doc.key}</span>
        </div>
        <p className="text-[14.5px] text-[var(--text-2)] leading-[1.8]">{doc.body}</p>
      </motion.div>
    </div>
  );
}

// Four-point radial diagram for the operating principles — the same
// structural device the homepage uses for the six engineering pillars,
// scaled down to the four values that actually apply here.
const RADIUS = 118;
const CENTER = 160;
function pointOn(index: number, total: number) {
  const angle = (-90 + index * (360 / total)) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

function PrinciplesDiagram() {
  const [active, setActive] = useState(0);
  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto w-full max-w-[320px] aspect-square"
      >
        <svg viewBox="0 0 320 320" className="absolute inset-0 w-full h-full" fill="none">
          <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="var(--border)" strokeWidth="1" strokeDasharray="2 5" />
          {values.map((v, i) => {
            const pt = pointOn(i, values.length);
            return (
              <line
                key={v.tag}
                x1={CENTER}
                y1={CENTER}
                x2={pt.x}
                y2={pt.y}
                stroke={active === i ? "var(--accent)" : "var(--border-strong)"}
                strokeWidth="1"
                className="transition-colors duration-300"
              />
            );
          })}
          <circle cx={CENTER} cy={CENTER} r="30" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1" />
        </svg>
        <div
          className="absolute flex items-center justify-center text-center font-mono text-[9.5px] uppercase tracking-[0.04em] text-[var(--text-3)]"
          style={{ left: CENTER - 30, top: CENTER - 30, width: 60, height: 60 }}
        >
          principles
        </div>
        {values.map((v, i) => {
          const pt = pointOn(i, values.length);
          const isActive = active === i;
          return (
            <button
              key={v.tag}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(i)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5 group"
              style={{ left: `${(pt.x / 320) * 100}%`, top: `${(pt.y / 320) * 100}%` }}
            >
              <span
                className="h-2.5 w-2.5 rounded-full border transition-all duration-200"
                style={{
                  backgroundColor: isActive ? "var(--accent)" : "var(--surface-2)",
                  borderColor: isActive ? "var(--accent)" : "var(--border-strong)",
                }}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.03em] whitespace-nowrap transition-colors duration-200 ${
                  isActive ? "text-[var(--text-1)]" : "text-[var(--text-3)] group-hover:text-[var(--text-2)]"
                }`}
              >
                {v.tag}
              </span>
            </button>
          );
        })}
      </motion.div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 lg:p-10"
      >
        <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--accent)] uppercase">
          0{active + 1} / 0{values.length} — {values[active].tag}
        </span>
        <h3 className="font-brand font-semibold text-[22px] lg:text-[26px] text-[var(--text-1)] mt-3 mb-4">
          {values[active].title}
        </h3>
        <p className="text-[14px] text-[var(--text-2)] leading-[1.8] max-w-md">{values[active].description}</p>
      </motion.div>
    </div>
  );
}

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--bg)] pt-[110px] pb-16 overflow-hidden">
        <div className="absolute inset-0 schematic-grid pointer-events-none opacity-70" />
        <div className="absolute inset-0 ambient-glow pointer-events-none" style={{ "--glow-x": "85%", "--glow-y": "0%" } as React.CSSProperties} />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-8 text-[12px] text-[var(--text-3)]">
                <Link href="/" className="hover:text-[var(--text-2)] transition-colors">Inframiq</Link>
                <span>/</span>
                <span className="text-[var(--text-2)]">About</span>
              </div>

              <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">about inframiq</p>

              <h1 className="font-brand text-[38px] lg:text-[48px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text-1)] mb-6 max-w-2xl">
                Built for people
                <br />
                <span className="text-[var(--text-3)]">who expect things to just work.</span>
              </h1>

              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] max-w-xl">
                Inframiq engineers intelligent software with uncompromising
                precision — from enterprise-grade security infrastructure to
                the refined, everyday tools businesses and individuals rely on.
                Different products. One exacting standard.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <StatusPanel title="company.status" />
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
      <section className="section-raised py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mb-14"
          >
            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">how we work</p>
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
              <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">company</p>
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
      <div className="section-raised">
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
