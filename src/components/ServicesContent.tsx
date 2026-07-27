"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, Wrench, Headset, ArrowRight, PhoneCall } from "lucide-react";

const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

// ─── Hero visual anchor: a compact channel-status window, the services
// equivalent of the homepage's system-status panel — proof of the four
// channels rather than a claim about them. ─────────────────────────────────

const channels = [
  { tag: "voice", label: "Voice" },
  { tag: "chat", label: "Live chat" },
  { tag: "tech", label: "Technical" },
  { tag: "always-on", label: "24/7 desk" },
];

function ChannelStatusPanel() {
  return (
    <div className="window-chrome">
      <div className="window-chrome-bar">
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">channels.status</span>
      </div>
      <div className="divide-y divide-[var(--border)]">
        {channels.map((c, i) => (
          <motion.div
            key={c.tag}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="flex items-center justify-between px-5 py-4"
          >
            <span className="font-mono text-[12px] text-[var(--text-2)]">{c.label}</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "var(--success)" }}
                  animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.2, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                />
                <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
              </span>
              <span className="font-mono text-[9.5px] text-[var(--text-3)] uppercase">online</span>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Voice: a live call window ──────────────────────────────────────────────

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

const CALL_BARS = Array.from({ length: 22 }, (_, i) => 6 + Math.round(Math.abs(Math.sin(i * 0.9)) * 20));

function VoiceWindow() {
  const elapsed = useElapsed();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="window-chrome">
      <div className="window-chrome-bar">
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="ml-2 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-3)]">
          <Phone size={11} className="text-[var(--accent)]" />
          voice — active call
        </span>
      </div>
      <div className="p-6 flex flex-col items-center text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
          style={{ background: "linear-gradient(160deg, rgba(79,141,255,0.35), rgba(124,203,255,0.1))", border: "1px solid var(--glass-border)" }}
        >
          <PhoneCall size={20} className="text-[var(--text-1)]" />
        </div>
        <p className="text-[13.5px] text-[var(--text-1)] mb-1">Inbound — Customer Line</p>
        <p className="font-mono text-[11px] text-[var(--text-3)] mb-6">connected · {elapsed}</p>

        <div className="flex items-end gap-[3px] h-9 mb-2">
          {CALL_BARS.map((h, i) => {
            const active = (i + tick) % CALL_BARS.length;
            const height = CALL_BARS[active];
            return (
              <span
                key={i}
                className="w-[3px] rounded-full bg-[var(--trace)] transition-[height] duration-200"
                style={{ height: `${height}px`, opacity: 0.35 + (height / 26) * 0.65 }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Chat: a live chat window ───────────────────────────────────────────────

function ChatWindow() {
  const messages = [
    { from: "customer", text: "Hi, my order hasn't shipped yet — order #48213" },
    { from: "agent", text: "Let me pull that up — one moment." },
    { from: "agent", text: "Found it. It ships today, tracking goes out by 6pm." },
  ];
  return (
    <div className="window-chrome">
      <div className="window-chrome-bar">
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="ml-2 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-3)]">
          <MessageCircle size={11} className="text-[var(--accent)]" />
          live chat
        </span>
      </div>
      <div className="p-5 space-y-2.5">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={`flex ${m.from === "agent" ? "justify-end" : "justify-start"}`}
          >
            <span
              className="max-w-[80%] text-[12px] leading-snug rounded-lg px-3 py-2"
              style={
                m.from === "agent"
                  ? { background: "var(--accent-dim)", color: "var(--text-1)", border: "1px solid var(--glass-border)" }
                  : { background: "var(--surface-2)", color: "var(--text-2)" }
              }
            >
              {m.text}
            </span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1 pt-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[var(--text-3)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Technical: a ticket resolution window ──────────────────────────────────

function TicketWindow() {
  const steps = [
    { label: "Reported", detail: "Login fails after password reset", done: true },
    { label: "Diagnosed", detail: "Cached session token conflict", done: true },
    { label: "Resolved", detail: "Session cleared, access restored", done: true },
  ];
  return (
    <div className="window-chrome">
      <div className="window-chrome-bar">
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="ml-2 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-3)]">
          <Wrench size={11} className="text-[var(--accent)]" />
          ticket — TCH-2291
        </span>
      </div>
      <div className="p-5">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex items-start gap-3 pb-4 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <span className="w-2 h-2 rounded-full bg-[var(--success)]" />
              {i < steps.length - 1 && <span className="w-px flex-1 bg-[var(--border)] mt-1" style={{ minHeight: 24 }} />}
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--accent-strong)]">{step.label}</p>
              <p className="text-[12px] text-[var(--text-2)] mt-0.5">{step.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Always-on: three simultaneous timezone clocks ──────────────────────────

function WorldClockWindow() {
  const [times, setTimes] = useState<string[] | null>(null);
  const zones = [
    { label: "New York", tz: "America/New_York" },
    { label: "London", tz: "Europe/London" },
    { label: "Singapore", tz: "Asia/Singapore" },
  ];

  useEffect(() => {
    const update = () =>
      setTimes(
        zones.map((z) =>
          new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit", timeZone: z.tz })
        )
      );
    update();
    const id = setInterval(update, 15000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="window-chrome">
      <div className="window-chrome-bar">
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="window-chrome-dot" />
        <span className="ml-2 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-3)]">
          <Headset size={11} className="text-[var(--accent)]" />
          desk — simultaneous coverage
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-[var(--border)]">
        {zones.map((z, i) => (
          <div key={z.tz} className="px-4 py-6 text-center">
            <p className="font-mono text-[18px] text-[var(--text-1)] tabular-nums mb-1">{times ? times[i] : "--:--"}</p>
            <p className="text-[10px] text-[var(--text-3)]">{z.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Service {
  icon: LucideIconType;
  tag: string;
  title: string;
  description: string;
  points: string[];
  window: React.ReactNode;
}

type LucideIconType = typeof Phone;

const services: Service[] = [
  {
    icon: Phone,
    tag: "voice",
    title: "Voice support",
    description:
      "Real people answering real calls. Trained agents handle inbound and outbound voice for your business, 24/7, in your brand's voice.",
    points: ["Inbound customer enquiries", "Outbound follow-up & retention", "Call escalation & handoff"],
    window: <VoiceWindow />,
  },
  {
    icon: MessageCircle,
    tag: "chat",
    title: "Live chat support",
    description:
      "Human agents on chat and messaging, not a bot script. Fast, accurate responses across your website and support channels.",
    points: ["Website & in-app live chat", "Order & account enquiries", "Multi-channel messaging support"],
    window: <ChatWindow />,
  },
  {
    icon: Wrench,
    tag: "tech",
    title: "Technical support",
    description:
      "Trained agents who can actually troubleshoot — walking customers through issues instead of routing every ticket upward.",
    points: ["Tier 1 & tier 2 troubleshooting", "Product & account issue resolution", "Structured ticket escalation"],
    window: <TicketWindow />,
  },
  {
    icon: Headset,
    tag: "always-on",
    title: "24/7 dedicated teams",
    description:
      "A consistent team of agents assigned to your business, not a shared, rotating pool — covering every timezone your customers are in.",
    points: ["Dedicated, trained agent teams", "Round-the-clock coverage", "Direct oversight, not a call-center queue"],
    window: <WorldClockWindow />,
  },
];

export default function ServicesContent() {
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
                <span className="text-[var(--text-2)]">Services</span>
              </div>

              <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">human-staffed, 24/7</p>

              <h1 className="font-brand text-[38px] lg:text-[48px] font-semibold tracking-[-0.02em] leading-[1.1] text-[var(--text-1)] mb-6 max-w-2xl">
                Your customers, answered
                <br />
                <span className="text-[var(--text-3)]">by real people, around the clock.</span>
              </h1>

              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] max-w-xl">
                Inframiq operates as your customer service team — deploying trained
                agents for voice and chat support, staffed 24/7 to handle enquiries
                and technical issues as they come in.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
              <ChannelStatusPanel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services — alternating rows, each with a real interface window */}
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
      <section className="section-raised py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-5">how we work</p>
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
              className="window-chrome"
            >
              <div className="window-chrome-bar">
                <span className="window-chrome-dot" />
                <span className="window-chrome-dot" />
                <span className="window-chrome-dot" />
                <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">account.specs</span>
              </div>
              <div className="divide-y divide-[var(--border)]">
                {[
                  { label: "Coverage", value: "24 hours a day, every day" },
                  { label: "Channels", value: "Voice & live chat" },
                  { label: "Agents", value: "Trained, dedicated to your account" },
                  { label: "Handles", value: "Enquiries & technical support" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-5">
                    <span className="font-mono text-[11px] text-[var(--accent)] tracking-[0.02em]">{row.label.toLowerCase()}</span>
                    <span className="text-[13.5px] text-[var(--text-2)] text-right">{row.value}</span>
                  </div>
                ))}
              </div>
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
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md bg-[var(--accent)] text-[#050505] text-[13.5px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150 flex-shrink-0"
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
