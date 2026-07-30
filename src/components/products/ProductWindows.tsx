"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, TriangleAlert } from "lucide-react";
import {
  SEATS_MIN,
  SEATS_MAX,
  SEATS_DEFAULT,
  computeScenario,
  formatCurrency,
} from "@/lib/simulynPricing";
import { mailJourneys } from "@/lib/mailShieldJourneys";
import BrowserWindow from "@/components/instruments/BrowserWindow";

// Shared, real, windowed product instruments — light-mode software interfaces
// floating over the dark page, reused on the homepage and on /products so
// every page runs the identical interactive software instead of a
// page-specific screenshot of it.

const SEATS_PER_PIXEL = (SEATS_MAX - SEATS_MIN) / 480;

function SimulynChart({ seats }: { seats: number }) {
  const points = useMemo(() => {
    const samples = 40;
    return Array.from({ length: samples + 1 }, (_, i) => {
      const s = SEATS_MIN + ((SEATS_MAX - SEATS_MIN) * i) / samples;
      const scenario = computeScenario(s);
      return { s, revenue: scenario.revenue };
    });
  }, []);

  const maxRevenue = Math.max(...points.map((p) => p.revenue));
  const toX = (s: number) => ((s - SEATS_MIN) / (SEATS_MAX - SEATS_MIN)) * 400;
  const toY = (r: number) => 120 - (r / maxRevenue) * 108;

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.s).toFixed(1)} ${toY(p.revenue).toFixed(1)}`).join(" ");
  const current = computeScenario(seats);
  const cx = toX(current.seats);
  const cy = toY(current.revenue);
  const areaPath = `${path} L ${toX(SEATS_MAX)} 120 L ${toX(SEATS_MIN)} 120 Z`;

  return (
    <svg viewBox="0 0 400 130" className="w-full h-[110px]" fill="none" aria-hidden>
      <defs>
        <linearGradient id="simulyn-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--lw-accent)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--lw-accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1="0" y1="120" x2="400" y2="120" stroke="var(--lw-border)" strokeWidth="1" />
      <path d={areaPath} fill="url(#simulyn-area)" stroke="none" />
      <path d={path} stroke="var(--lw-accent)" strokeWidth="1.75" />
      <line x1={cx} y1="8" x2={cx} y2="120" stroke="var(--lw-border-strong)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={cx} cy={cy} r="4" fill="var(--lw-accent)" />
    </svg>
  );
}

export function SimulynWindow({
  className = "",
  chrome = "browser",
}: { className?: string; chrome?: "browser" | "app" } = {}) {
  const [seats, setSeats] = useState(SEATS_DEFAULT);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; seats: number } | null>(null);
  const scenario = useMemo(() => computeScenario(seats), [seats]);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => {
      if (!dragStart.current) return;
      const delta = e.clientX - dragStart.current.x;
      const next = dragStart.current.seats + delta * SEATS_PER_PIXEL;
      setSeats(Math.round(Math.min(SEATS_MAX, Math.max(SEATS_MIN, next))));
    };
    const up = () => setDragging(false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [dragging]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 25 : 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSeats((s) => Math.max(SEATS_MIN, s - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSeats((s) => Math.min(SEATS_MAX, s + step));
    }
  };

  const body = (
    <>
      <div className="flex-1 flex flex-col p-6 lg:p-7">
        <div className="flex flex-wrap items-end gap-x-3 gap-y-1 mb-5">
          <span
            role="slider"
            tabIndex={0}
            aria-label="Number of seats"
            aria-valuemin={SEATS_MIN}
            aria-valuemax={SEATS_MAX}
            aria-valuenow={seats}
            onKeyDown={handleKeyDown}
            onPointerDown={(e) => {
              setDragging(true);
              dragStart.current = { x: e.clientX, seats };
            }}
            className="relative inline-flex items-center gap-2 cursor-ew-resize touch-none select-none focus-visible:outline-2 focus-visible:outline-[var(--lw-accent)] rounded-sm"
          >
            <span className="font-mono text-[44px] lg:text-[52px] leading-none tracking-tight text-[var(--lw-text-1)] tabular-nums">
              {seats}
            </span>
          </span>
          <span className="font-mono text-[13px] text-[var(--lw-text-3)] mb-1.5">seats — drag to adjust</span>
        </div>

        <SimulynChart seats={seats} />

        <div className="grid grid-cols-3 gap-4 mt-auto pt-5 border-t border-[var(--lw-border)]">
          <div>
            <p className="font-mono text-[17px] font-medium tabular-nums" style={{ color: "var(--lw-accent)" }}>
              {formatCurrency(scenario.revenue)}
            </p>
            <p className="text-[10.5px] text-[var(--lw-text-3)] mt-1">Est. revenue / mo</p>
          </div>
          <div>
            <p className="font-mono text-[17px] text-[var(--lw-text-1)] tabular-nums">{scenario.marginPct.toFixed(0)}%</p>
            <p className="text-[10.5px] text-[var(--lw-text-3)] mt-1">Margin</p>
          </div>
          <div>
            <p className="font-mono text-[17px] text-[var(--lw-text-1)] tabular-nums">
              {Number.isFinite(scenario.breakEvenMonths) ? `Mo. ${scenario.breakEvenMonths}` : "—"}
            </p>
            <p className="text-[10.5px] text-[var(--lw-text-3)] mt-1">Break-even</p>
          </div>
        </div>
      </div>
    </>
  );

  if (chrome === "app") {
    return (
      <BrowserWindow variant="app" title="Simulyn · Pricing Simulator" status="Draft" className={className}>
        {body}
      </BrowserWindow>
    );
  }

  return (
    <BrowserWindow url="app.inframiq.com/simulyn" className={className}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--lw-border)]">
        <span className="text-[13px] font-semibold text-[var(--lw-text-1)]">Simulyn — Pricing Model</span>
        <span className="font-mono text-[10px] text-[var(--lw-text-3)] uppercase tracking-wide">Draft</span>
      </div>
      {body}
    </BrowserWindow>
  );
}

const statusIcon: Record<string, React.ReactNode> = {
  pass: <Check size={10} strokeWidth={3} />,
  fail: <X size={10} strokeWidth={3} />,
  flag: <TriangleAlert size={10} strokeWidth={2.5} />,
  pending: null,
};
const statusColor: Record<string, string> = {
  pass: "var(--lw-success)",
  fail: "var(--lw-danger)",
  flag: "var(--lw-warning)",
  pending: "var(--lw-border-strong)",
};
const verdictColor: Record<string, string> = {
  Clean: "var(--lw-success)",
  Phishing: "var(--lw-danger)",
  Spoofing: "var(--lw-warning)",
  Suspicious: "var(--lw-warning)",
};
const verdictDim: Record<string, string> = {
  Clean: "var(--lw-success-dim)",
  Phishing: "var(--lw-danger-dim)",
  Spoofing: "var(--lw-warning-dim)",
  Suspicious: "var(--lw-warning-dim)",
};

export function MailShieldWindow({
  className = "",
  chrome = "browser",
}: { className?: string; chrome?: "browser" | "app" } = {}) {
  const [selectedId, setSelectedId] = useState(mailJourneys[0].id);
  const journey = mailJourneys.find((j) => j.id === selectedId)!;

  const body = (
    <div className="flex-1 min-h-0 min-w-0 grid sm:grid-cols-[190px_1fr]">
        <div className="min-w-0 border-r border-[var(--lw-border)] divide-y divide-[var(--lw-border)] h-full overflow-y-auto">
          {mailJourneys.map((j) => {
            const isActive = selectedId === j.id;
            return (
              <button
                key={j.id}
                type="button"
                onClick={() => setSelectedId(j.id)}
                className="relative w-full text-left px-3 py-2.5"
              >
                {isActive && (
                  <motion.span
                    layoutId="mailshield-row-highlight"
                    className="absolute inset-0"
                    style={{ backgroundColor: "var(--lw-surface-2)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  />
                )}
                <p className="relative z-10 font-mono text-[10px] text-[var(--lw-text-3)] truncate mb-0.5">{j.from}</p>
                <p className="relative z-10 text-[11px] text-[var(--lw-text-2)] truncate">{j.subject}</p>
              </button>
            );
          })}
        </div>

        <div className="min-w-0 h-full flex flex-col p-5">
          <p className="font-mono text-[10px] text-[var(--lw-text-3)] mb-1">{journey.from}</p>
          <p className="text-[13px] text-[var(--lw-text-1)] mb-5">{journey.subject}</p>

          <div className="flex items-start gap-1.5 mb-4">
            {journey.checkpoints.map((cp, i) => {
              const status: keyof typeof statusIcon =
                i > journey.stoppedAt
                  ? "pending"
                  : i === journey.stoppedAt && journey.verdict !== "Clean"
                    ? cp.detail.toLowerCase().includes("flag")
                      ? "flag"
                      : "fail"
                    : "pass";
              return (
                <div key={cp.key} className="flex-1 min-w-0">
                  <div className="h-1.5 rounded-full mb-1.5 transition-colors duration-300" style={{ backgroundColor: statusColor[status] }} />
                  <span
                    className="flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-[0.02em]"
                    style={{ color: status === "pending" ? "var(--lw-text-3)" : "var(--lw-text-2)" }}
                  >
                    <span style={{ color: statusColor[status] }}>{statusIcon[status]}</span>
                    <span className="truncate">{cp.label}</span>
                  </span>
                </div>
              );
            })}
          </div>

          <div
            className="flex items-center gap-2 mt-auto pt-4 border-t border-[var(--lw-border)]"
          >
            <span
              className="font-mono text-[10.5px] px-2 py-1 rounded"
              style={{ color: verdictColor[journey.verdict], backgroundColor: verdictDim[journey.verdict] }}
            >
              {journey.verdict}
            </span>
            <span className="text-[11px] text-[var(--lw-text-3)]">{journey.verdictDetail}</span>
          </div>
        </div>
      </div>
  );

  if (chrome === "app") {
    return (
      <BrowserWindow variant="app" title="Mail Shield · Opened in Gmail" status="Live" statusColor="var(--lw-success)" className={className}>
        {body}
      </BrowserWindow>
    );
  }

  return (
    <BrowserWindow url="app.inframiq.com/mail-shield" className={className}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--lw-border)]">
        <span className="text-[13px] font-semibold text-[var(--lw-text-1)]">Mail Shield — Opened in Gmail</span>
        <span className="font-mono text-[10px] text-[var(--lw-success)] uppercase tracking-wide">Live</span>
      </div>
      {body}
    </BrowserWindow>
  );
}
