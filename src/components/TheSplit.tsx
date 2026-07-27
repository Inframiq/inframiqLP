"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle, Wrench } from "lucide-react";

// ─── Live ops console — a windowed application showing a shift in progress,
// not a paragraph describing "24/7 support". Ticket queue and waveform are
// deterministic (seeded), so the same visitor sees a stable, believable
// snapshot rather than random noise on every render. ───────────────────────

interface Ticket {
  id: string;
  channel: "voice" | "chat" | "tech";
  summary: string;
  agent: string;
  status: "active" | "queued" | "resolved";
}

const tickets: Ticket[] = [
  { id: "OPS-4471", channel: "voice", summary: "Billing enquiry — plan upgrade", agent: "R. Alvarez", status: "active" },
  { id: "OPS-4472", channel: "chat", summary: "Order status follow-up", agent: "T. Kim", status: "active" },
  { id: "OPS-4473", channel: "tech", summary: "Login failing after reset", agent: "—", status: "queued" },
  { id: "OPS-4470", channel: "voice", summary: "Account access restored", agent: "R. Alvarez", status: "resolved" },
  { id: "OPS-4469", channel: "chat", summary: "Shipping address correction", agent: "T. Kim", status: "resolved" },
];

const channelIcon = { voice: Phone, chat: MessageCircle, tech: Wrench };
const statusColor: Record<Ticket["status"], string> = {
  active: "var(--success)",
  queued: "var(--warning)",
  resolved: "var(--text-3)",
};

// A quiet, looping waveform standing in for a live call — 24 bars driven by
// a fixed sine table so it reads as audio without any randomness.
const WAVE_BARS = Array.from({ length: 28 }, (_, i) => 8 + Math.round(Math.abs(Math.sin(i * 0.7)) * 22));

function LiveWaveform() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 220);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-end gap-[3px] h-9">
      {WAVE_BARS.map((h, i) => {
        const active = (i + tick) % WAVE_BARS.length;
        const height = WAVE_BARS[active];
        return (
          <span
            key={i}
            className="w-[3px] rounded-full bg-[var(--trace)] transition-[height] duration-200"
            style={{ height: `${height}px`, opacity: 0.35 + (height / 30) * 0.65 }}
          />
        );
      })}
    </div>
  );
}

export default function TheSplit() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="systems" className="relative border-t border-[var(--border)] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 ambient-glow pointer-events-none opacity-80" style={{ "--glow-x": "90%", "--glow-y": "0%" } as React.CSSProperties} />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-xl"
        >
          <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--trace)] uppercase mb-4">
            System 01 — Operations
          </p>
          <h2 className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            Real people, running a real shift.
          </h2>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start"
        >
          {/* Console window */}
          <div className="window-chrome">
            <div className="window-chrome-bar">
              <span className="window-chrome-dot" />
              <span className="window-chrome-dot" />
              <span className="window-chrome-dot" />
              <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">ops-console — shift queue</span>
              <span className="ml-auto font-mono text-[9px] text-[var(--success)] uppercase tracking-wide">on shift</span>
            </div>

            <div className="grid grid-cols-[1fr_2fr_1fr_90px] gap-2 px-4 py-2.5 border-b border-[var(--border)]">
              {["Ticket", "Summary", "Agent", "Status"].map((h) => (
                <span key={h} className="text-[9px] font-medium text-[var(--text-3)] uppercase tracking-wider">
                  {h}
                </span>
              ))}
            </div>

            <div className="divide-y divide-[var(--border)]">
              {tickets.map((t, i) => {
                const Icon = channelIcon[t.channel];
                return (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="grid grid-cols-[1fr_2fr_1fr_90px] gap-2 px-4 py-2.5 items-center"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[10.5px] text-[var(--text-3)]">
                      <Icon size={11} className="text-[var(--trace)]" />
                      {t.id}
                    </span>
                    <span className="text-[11.5px] text-[var(--text-2)] truncate pr-2">{t.summary}</span>
                    <span className="font-mono text-[10.5px] text-[var(--text-3)] truncate">{t.agent}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: statusColor[t.status] }} />
                      <span className="font-mono text-[9.5px] text-[var(--text-3)] uppercase">{t.status}</span>
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
              <span className="font-mono text-[9px] text-[var(--text-3)]">2 active · 1 queued · 2 resolved</span>
              <LiveWaveform />
            </div>
          </div>

          {/* Description */}
          <div className="pt-1">
            <p className="text-[14px] text-[var(--text-2)] leading-[1.8] mb-6">
              Inframiq deploys trained agents for voice and live chat, staffed
              24/7 — handling enquiries and technical support as an extension
              of your own team, not a shared, anonymous queue.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Dedicated, trained agent teams",
                "Voice, chat, and tier 1–2 technical support",
                "Round-the-clock coverage, every timezone",
              ].map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[13px] text-[var(--text-2)]">
                  <span className="w-1 h-1 rounded-full bg-[var(--trace)] mt-1.5 flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 font-mono text-[13px] text-[var(--text-1)] hover:text-[var(--accent-strong)] transition-colors duration-150"
            >
              View services <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
