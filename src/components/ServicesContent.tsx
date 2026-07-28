"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, Wrench, Headset, ArrowRight, PhoneCall, CheckCircle2 } from "lucide-react";
import BrowserWindow from "@/components/instruments/BrowserWindow";
import AuroraGrain from "@/components/AuroraGrain";
import KineticText from "@/components/animations/KineticText";
import { useEntryRevealed } from "@/components/EntryLoaderProvider";

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

// ─── Shared light-dashboard building blocks ─────────────────────────────────

function KpiRow({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-3 divide-x divide-[var(--lw-border)] border-b border-[var(--lw-border)]">
      {items.map((kpi) => (
        <div key={kpi.label} className="px-4 py-3">
          <p className="text-[18px] font-semibold text-[var(--lw-text-1)] tabular-nums">{kpi.value}</p>
          <p className="text-[10.5px] text-[var(--lw-text-3)] mt-0.5">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}

function Sparkline({ points, color = "var(--lw-accent)" }: { points: number[]; color?: string }) {
  const max = Math.max(...points);
  const w = 100;
  const h = 32;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${(i * step).toFixed(1)} ${(h - (p / max) * h).toFixed(1)}`)
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-8" preserveAspectRatio="none">
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// ─── Voice: a live call in progress, framed inside a real ops dashboard ────

function useElapsed() {
  const [seconds, setSeconds] = useState(74);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const CALL_VOLUME = [12, 18, 15, 22, 30, 26, 34, 29, 38, 33];

function VoiceDashboard() {
  const elapsed = useElapsed();
  return (
    <BrowserWindow
      variant="app"
      title="Voice Desk"
      icon={<Phone size={13} style={{ color: "var(--lw-accent)" }} />}
      status="Live"
      statusColor="var(--lw-success)"
    >
      <KpiRow items={[{ label: "Active calls", value: "6" }, { label: "Avg handle", value: "3m 40s" }, { label: "Calls today", value: "212" }]} />
      <div className="p-4">
        <p className="text-[10px] text-[var(--lw-text-3)] uppercase tracking-wide mb-1.5">Call volume — today</p>
        <Sparkline points={CALL_VOLUME} />
      </div>
      <div className="mx-4 mb-4 rounded-lg p-3 flex items-center gap-3" style={{ backgroundColor: "var(--lw-surface-2)" }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--lw-accent-dim)" }}>
          <PhoneCall size={14} style={{ color: "var(--lw-accent)" }} />
        </div>
        <div className="min-w-0">
          <p className="text-[12px] text-[var(--lw-text-1)] truncate">Inbound — Customer Line</p>
          <p className="font-mono text-[10.5px] text-[var(--lw-text-3)]">connected · {elapsed}</p>
        </div>
      </div>
    </BrowserWindow>
  );
}

// ─── Chat: live conversation dashboard ──────────────────────────────────────

const CHAT_VOLUME = [8, 14, 11, 17, 15, 20, 18, 24, 21, 27];

function ChatDashboard() {
  const messages = [
    { from: "customer", text: "Hi, my order hasn't shipped yet — order #48213" },
    { from: "agent", text: "Found it — ships today, tracking by 6pm." },
  ];
  return (
    <BrowserWindow
      variant="app"
      title="Chat Desk"
      icon={<MessageCircle size={13} style={{ color: "var(--lw-accent)" }} />}
      status="Live"
      statusColor="var(--lw-success)"
    >
      <KpiRow items={[{ label: "Open chats", value: "14" }, { label: "First response", value: "22s" }, { label: "CSAT", value: "97%" }]} />
      <div className="p-4">
        <p className="text-[10px] text-[var(--lw-text-3)] uppercase tracking-wide mb-1.5">Conversations — today</p>
        <Sparkline points={CHAT_VOLUME} color="var(--lw-success)" />
      </div>
      <div className="px-4 pb-4 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}>
            <span
              className="max-w-[85%] text-[11px] leading-snug rounded-lg px-2.5 py-1.5"
              style={
                m.from === "agent"
                  ? { backgroundColor: "var(--lw-accent-dim)", color: "var(--lw-text-1)" }
                  : { backgroundColor: "var(--lw-surface-2)", color: "var(--lw-text-2)" }
              }
            >
              {m.text}
            </span>
          </div>
        ))}
      </div>
    </BrowserWindow>
  );
}

// ─── Technical: ticketing dashboard ─────────────────────────────────────────

const tickets = [
  { id: "TCH-2291", issue: "Login fails after reset", status: "Resolved" },
  { id: "TCH-2292", issue: "Payment declined at checkout", status: "In progress" },
  { id: "TCH-2293", issue: "App crashes on upload", status: "Queued" },
];
const statusStyle: Record<string, { bg: string; fg: string }> = {
  Resolved: { bg: "var(--lw-success-dim)", fg: "var(--lw-success)" },
  "In progress": { bg: "var(--lw-accent-dim)", fg: "var(--lw-accent)" },
  Queued: { bg: "var(--lw-surface-2)", fg: "var(--lw-text-3)" },
};

function TicketingDashboard() {
  return (
    <BrowserWindow
      variant="app"
      title="Technical Desk"
      icon={<Wrench size={13} style={{ color: "var(--lw-accent)" }} />}
      status="Live"
      statusColor="var(--lw-success)"
    >
      <KpiRow items={[{ label: "Open", value: "31" }, { label: "Resolved today", value: "48" }, { label: "SLA met", value: "99%" }]} />
      <div className="divide-y divide-[var(--lw-border)]">
        {tickets.map((t) => (
          <div key={t.id} className="flex items-center justify-between px-4 py-3">
            <div className="min-w-0">
              <p className="font-mono text-[10px] text-[var(--lw-text-3)]">{t.id}</p>
              <p className="text-[11.5px] text-[var(--lw-text-1)] truncate">{t.issue}</p>
            </div>
            <span
              className="font-mono text-[9.5px] px-2 py-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: statusStyle[t.status].bg, color: statusStyle[t.status].fg }}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>
    </BrowserWindow>
  );
}

// ─── Always-on: simultaneous timezone coverage ──────────────────────────────

function CoverageDashboard() {
  const [times, setTimes] = useState<string[] | null>(null);
  const zones = [
    { label: "New York", tz: "America/New_York" },
    { label: "London", tz: "Europe/London" },
    { label: "Singapore", tz: "Asia/Singapore" },
  ];

  useEffect(() => {
    const update = () =>
      setTimes(zones.map((z) => new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", timeZone: z.tz })));
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserWindow
      variant="app"
      title="Desk Coverage"
      icon={<Headset size={13} style={{ color: "var(--lw-accent)" }} />}
      status="24/7"
      statusColor="var(--lw-success)"
    >
      <div className="grid grid-cols-3 divide-x divide-[var(--lw-border)]">
        {zones.map((z, i) => (
          <div key={z.tz} className="px-4 py-6 text-center">
            <p className="text-[18px] font-semibold text-[var(--lw-text-1)] tabular-nums mb-1">{times ? times[i] : "--:--"}</p>
            <p className="text-[10px] text-[var(--lw-text-3)]">{z.label}</p>
          </div>
        ))}
      </div>
    </BrowserWindow>
  );
}

interface Service {
  icon: typeof Phone;
  tag: string;
  title: string;
  description: string;
  points: string[];
  window: React.ReactNode;
}

const services: Service[] = [
  {
    icon: Phone,
    tag: "voice",
    title: "Voice support",
    description: "Real people answering real calls. Trained agents handle inbound and outbound voice for your business, 24/7, in your brand's voice.",
    points: ["Inbound customer enquiries", "Outbound follow-up & retention", "Call escalation & handoff"],
    window: <VoiceDashboard />,
  },
  {
    icon: MessageCircle,
    tag: "chat",
    title: "Live chat support",
    description: "Human agents on chat and messaging, not a bot script. Fast, accurate responses across your website and support channels.",
    points: ["Website & in-app live chat", "Order & account enquiries", "Multi-channel messaging support"],
    window: <ChatDashboard />,
  },
  {
    icon: Wrench,
    tag: "tech",
    title: "Technical support",
    description: "Trained agents who can actually troubleshoot — walking customers through issues instead of routing every ticket upward.",
    points: ["Tier 1 & tier 2 troubleshooting", "Product & account issue resolution", "Structured ticket escalation"],
    window: <TicketingDashboard />,
  },
  {
    icon: Headset,
    tag: "always-on",
    title: "24/7 dedicated teams",
    description: "A consistent team of agents assigned to your business, not a shared, rotating pool — covering every timezone your customers are in.",
    points: ["Dedicated, trained agent teams", "Round-the-clock coverage", "Direct oversight, not a call-center queue"],
    window: <CoverageDashboard />,
  },
];

// ─── Hero visual — a services diagram, not a dashboard screenshot. Voice
// support already gets its own real, fully interactive dashboard in the list
// below; reusing that same window up here would just show it twice. This
// shows how the four service lines relate to Inframiq as a core instead. ───

const SERVICES_CORE = { x: 200, y: 160 };
const SERVICES_NODES = [
  { x: 70, y: 60 },
  { x: 330, y: 60 },
  { x: 70, y: 260 },
  { x: 330, y: 260 },
];

function ServicesConstellation() {
  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-[5/4]">
      <svg viewBox="0 0 400 320" className="absolute inset-0 w-full h-full" fill="none">
        {services.map((s, i) => (
          <path
            key={s.tag}
            d={`M ${SERVICES_CORE.x} ${SERVICES_CORE.y} L ${SERVICES_NODES[i].x} ${SERVICES_NODES[i].y}`}
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            className="trace-path"
            style={{ "--trace-length": 200 } as React.CSSProperties}
          />
        ))}
        {services.map((s, i) => {
          const length = Math.hypot(SERVICES_NODES[i].x - SERVICES_CORE.x, SERVICES_NODES[i].y - SERVICES_CORE.y);
          const dot = 10;
          return (
            <motion.path
              key={`flow-${s.tag}`}
              d={`M ${SERVICES_CORE.x} ${SERVICES_CORE.y} L ${SERVICES_NODES[i].x} ${SERVICES_NODES[i].y}`}
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
          cx={SERVICES_CORE.x}
          cy={SERVICES_CORE.y}
          fill="var(--surface)"
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          animate={{ r: [28, 30, 28] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{ left: `${(SERVICES_CORE.x / 400) * 100}%`, top: `${(SERVICES_CORE.y / 320) * 100}%`, transform: "translate(-50%, -50%)" }}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.04em] text-[var(--text-3)]">inframiq</span>
      </div>

      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            className="absolute w-[140px] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(SERVICES_NODES[i].x / 400) * 100}%`, top: `${(SERVICES_NODES[i].y / 320) * 100}%` }}
          >
            <div className="rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2.5 text-center">
              <Icon size={14} className="text-[var(--accent)] mx-auto mb-1.5" />
              <p className="font-mono text-[10px] text-[var(--text-1)]">{s.title}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ServicesContent() {
  const revealed = useEntryRevealed();
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--bg)] pt-[110px] pb-16 overflow-hidden">
        <AuroraGrain />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="flex items-center gap-2 mb-8 text-[12px] text-[var(--text-3)]">
                <Link href="/" className="hover:text-[var(--text-2)] transition-colors">Inframiq</Link>
                <span>/</span>
                <span className="text-[var(--text-2)]">Services</span>
              </div>

              <p className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] mb-5">human-staffed, 24/7</p>

              <h1 className="font-brand text-[36px] lg:text-[44px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text-1)] mb-6 max-w-2xl">
                <KineticText as="span" text="Your customers, answered" play={revealed} />
                <br />
                <KineticText as="span" text="by real people, around the clock." className="text-[var(--text-3)]" play={revealed} />
              </h1>

              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] max-w-xl">
                Inframiq operates as your customer service team — deploying trained
                agents for voice and chat support, staffed 24/7 to handle enquiries
                and technical issues as they come in.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <ServicesConstellation />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services — each with a real light dashboard window */}
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
                    <span className="flex items-center gap-2 font-mono text-[13px] text-[var(--accent)] mb-4">
                      <Icon size={14} />
                      {service.tag}
                    </span>
                    <h3 className="text-[24px] font-semibold text-[var(--text-1)] tracking-[-0.02em] mb-3">{service.title}</h3>
                    <p className="text-[14.5px] text-[var(--text-2)] leading-[1.75] mb-5 max-w-md">{service.description}</p>
                    <ul className="space-y-2">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-[13px] text-[var(--text-2)]">
                          <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.08, ease: EASE_SMOOTH }}
                  >
                    {service.window}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why human agents */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] mb-5">how we work</p>
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
            >
              <BrowserWindow
                variant="app"
                title="Account Specs"
                icon={<CheckCircle2 size={13} style={{ color: "var(--lw-accent)" }} />}
              >
                <div className="divide-y divide-[var(--lw-border)]">
                  {[
                    { label: "Coverage", value: "24 hours a day, every day" },
                    { label: "Channels", value: "Voice & live chat" },
                    { label: "Agents", value: "Trained, dedicated to your account" },
                    { label: "Handles", value: "Enquiries & technical support" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <span className="font-mono text-[10.5px] text-[var(--lw-accent)] tracking-[0.02em] uppercase">{row.label}</span>
                      <span className="text-[12.5px] text-[var(--lw-text-2)] text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </BrowserWindow>
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
            className="window-chrome p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
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
