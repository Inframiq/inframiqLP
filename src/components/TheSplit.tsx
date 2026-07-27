"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageCircle, Wrench, Headset } from "lucide-react";
import { revealContainer, revealItem } from "@/lib/motionVariants";

// ─── Diagram-driven ops visualization ────────────────────────────────────────
// Deliberately not another browser window: three real channels (voice, chat,
// technical) routed live into a dedicated desk, rendered as an actual signal
// diagram with flowing traffic, rather than a screenshot of a ticket table.

const channels = [
  { key: "voice", label: "Voice", icon: Phone, y: 44 },
  { key: "chat", label: "Chat", icon: MessageCircle, y: 130 },
  { key: "tech", label: "Technical", icon: Wrench, y: 216 },
] as const;

const DESK = { x: 320, y: 130 };
const SOURCE_X = 60;

// Cubic bezier point-at-t — used to sample the flowing dot's exact position
// along the same curve the connector path draws, instead of tweening cx/cy
// in a straight line between the two endpoints (which visibly cuts across
// the curve whenever a channel's y differs from the desk's).
function cubicBezierPoint(t: number, p0: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }, p3: { x: number; y: number }) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

const CHANNEL_SAMPLES = 24;

function useLiveCounter(seed: number, stepEverySec = 3) {
  const [count, setCount] = useState(seed);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setCount((c) => c + 1), stepEverySec * 1000);
    return () => clearInterval(id);
  }, [stepEverySec]);
  return count;
}

function SignalDiagram() {
  const resolved = useLiveCounter(1842, 4);

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 460 260" className="w-full h-auto" fill="none">
        {channels.map((c, i) => (
          <path
            key={c.key}
            d={`M ${SOURCE_X + 26} ${c.y} C ${SOURCE_X + 120} ${c.y}, ${DESK.x - 120} ${DESK.y}, ${DESK.x - 30} ${DESK.y}`}
            stroke="var(--border-strong)"
            strokeWidth="1.5"
            className="trace-path"
            style={{ "--trace-length": 320, animationDelay: `${i * 0.12}s` } as React.CSSProperties}
          />
        ))}

        {/* Live traffic — small dots looping continuously along each channel
            path, sampled from the exact same bezier curve the path draws. */}
        {channels.map((c, i) => {
          const p0 = { x: SOURCE_X + 26, y: c.y };
          const p1 = { x: SOURCE_X + 120, y: c.y };
          const p2 = { x: DESK.x - 120, y: DESK.y };
          const p3 = { x: DESK.x - 30, y: DESK.y };
          const samples = Array.from({ length: CHANNEL_SAMPLES + 1 }, (_, k) => cubicBezierPoint(k / CHANNEL_SAMPLES, p0, p1, p2, p3));
          return (
            <motion.circle
              key={`flow-${c.key}`}
              r="3"
              fill="var(--accent)"
              animate={{
                cx: samples.map((s) => s.x),
                cy: samples.map((s) => s.y),
                opacity: [0, 1, 1, 0],
              }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.6 + i * 0.7 }}
            />
          );
        })}

        {/* Desk → resolved */}
        <path
          d={`M ${DESK.x + 30} ${DESK.y} L 410 ${DESK.y}`}
          stroke="var(--border-strong)"
          strokeWidth="1.5"
          className="trace-path"
          style={{ "--trace-length": 90, animationDelay: "0.4s" } as React.CSSProperties}
        />
        <motion.circle
          r="3"
          fill="var(--success)"
          animate={{ cx: [DESK.x + 30, 410], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: 1.4 }}
          cy={DESK.y}
        />

        <circle cx={DESK.x} cy={DESK.y} r="34" fill="var(--surface)" stroke="var(--border-strong)" strokeWidth="1.5" />
      </svg>

      {/* Source nodes */}
      {channels.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.key}
            className="absolute -translate-y-1/2 flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] pl-2.5 pr-3.5 py-2 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.3)]"
            style={{ left: 0, top: `${(c.y / 260) * 100}%` }}
          >
            <span className="w-6 h-6 rounded-md flex items-center justify-center bg-[var(--accent-dim)]">
              <Icon size={12} className="text-[var(--accent)]" />
            </span>
            <span className="font-mono text-[11px] text-[var(--text-2)]">{c.label}</span>
          </div>
        );
      })}

      {/* Desk node label */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center"
        style={{ left: `${(DESK.x / 460) * 100}%`, top: `${(DESK.y / 260) * 100}%` }}
      >
        <Headset size={14} className="text-[var(--text-2)] mb-1" />
        <span className="font-mono text-[8.5px] uppercase tracking-[0.03em] text-[var(--text-3)]">desk</span>
      </div>

      {/* Resolved counter */}
      <div className="absolute -translate-y-1/2 text-right" style={{ right: 0, top: `${(DESK.y / 260) * 100}%` }}>
        <p className="font-mono text-[18px] text-[var(--text-1)] tabular-nums leading-none">{resolved.toLocaleString()}</p>
        <p className="font-mono text-[8.5px] uppercase tracking-wide text-[var(--text-3)] mt-1">resolved today</p>
      </div>
    </div>
  );
}

export default function TheSplit() {
  return (
    <section id="systems" className="relative border-t border-[var(--border)] py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 ambient-glow pointer-events-none opacity-80" style={{ "--glow-x": "90%", "--glow-y": "0%" } as React.CSSProperties} />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer}
          className="mb-12 max-w-xl"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--trace)] uppercase mb-4">
            System 01 — Operations
          </motion.p>
          <motion.h2 variants={revealItem} className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            Real people, running a real shift.
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center"
        >
          <div className="pl-4 sm:pl-0">
            <SignalDiagram />
          </div>

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
              className="inline-flex items-center gap-1.5 text-[14px] text-[var(--text-1)] hover:text-[var(--accent-strong)] transition-colors duration-150"
            >
              View services <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
