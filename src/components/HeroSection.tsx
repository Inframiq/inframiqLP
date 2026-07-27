"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Radio } from "lucide-react";

// The hero's live instrument: the visitor's own local time, computed
// in-browser. It is the 24/7 claim proven rather than stated — different for
// every visitor, impossible to fake. Renders a placeholder until mounted so
// server and client markup always match.
function useLocalClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString(undefined, {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// The signature interaction: a coordinate readout that tracks the cursor
// inside the schematic panel, the way a CAD tool or a technical drawing
// reports position — proof this is a measured instrument, not a picture of
// one. Disabled for touch/reduced-motion so it never becomes a tax on those
// visitors.
function subscribeToPointerCapability(callback: () => void) {
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", callback);
  reduced.addEventListener("change", callback);
  return () => {
    fine.removeEventListener("change", callback);
    reduced.removeEventListener("change", callback);
  };
}

function getPointerCapability() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useCoordinateReadout() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const enabled = useSyncExternalStore(subscribeToPointerCapability, getPointerCapability, () => false);

  const handleMove = useCallback((e: React.PointerEvent) => {
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 999);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 999);
    setCoords({ x: Math.min(999, Math.max(0, x)), y: Math.min(999, Math.max(0, y)) });
  }, []);

  return { panelRef, coords: enabled ? coords : null, handleMove: enabled ? handleMove : undefined, onLeave: () => setCoords(null) };
}

export default function HeroSection() {
  const time = useLocalClock();
  const { panelRef, coords, handleMove, onLeave } = useCoordinateReadout();

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0 schematic-grid pointer-events-none opacity-70" />
      <div className="absolute inset-0 ambient-glow pointer-events-none" style={{ "--glow-x": "80%", "--glow-y": "10%" } as React.CSSProperties} />
      <div className="absolute inset-0 ambient-glow pointer-events-none opacity-60" style={{ "--glow-x": "10%", "--glow-y": "90%" } as React.CSSProperties} />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-14 lg:gap-10 items-center">
          {/* Thesis */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-7"
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)] uppercase">
                Fig. 01 — Inframiq system overview
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-brand font-semibold text-[40px] sm:text-[54px] lg:text-[64px] leading-[1.06] tracking-[-0.02em] text-[var(--text-1)] mb-8"
            >
              One company.
              <br />
              Two systems, <span className="text-[var(--accent-strong)]">built to the same tolerance.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-[16.5px] text-[var(--text-2)] leading-[1.7] max-w-[480px] mb-10"
            >
              Inframiq runs 24/7 voice and chat operations for your customers,
              and engineers the security and business software your company
              depends on. Different disciplines, one measured standard.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-wrap items-center gap-8"
            >
              <Link
                href="/#demo"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-md bg-[var(--accent)] text-[#050505] text-[14px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150"
              >
                Request a Demo
                <ArrowRight size={14} />
              </Link>
              <a
                href="#systems"
                className="inline-flex items-center gap-1.5 font-mono text-[13px] tracking-[0.02em] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150 underline decoration-[var(--border-strong)] underline-offset-4 hover:decoration-[var(--accent)]"
              >
                inspect the systems
              </a>
            </motion.div>
          </div>

          {/* The schematic panel — the hero's one visual anchor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              ref={panelRef}
              onPointerMove={handleMove}
              onPointerLeave={onLeave}
              className="window-chrome relative"
            >
              <div className="window-chrome-bar">
                <span className="window-chrome-dot" />
                <span className="window-chrome-dot" />
                <span className="window-chrome-dot" />
                <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">
                  system-map.svg — read only
                </span>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wide">
                  <Radio size={10} className="text-[var(--success)]" />
                  live
                </span>
              </div>

              <div className="relative h-[400px] sm:h-[440px] p-6 sm:p-8">
                {/* Coordinate readout */}
                {coords && (
                  <div className="absolute top-3 right-4 font-mono text-[10px] text-[var(--trace)] tabular-nums pointer-events-none">
                    X{String(coords.x).padStart(3, "0")} · Y{String(coords.y).padStart(3, "0")}
                  </div>
                )}

                <svg viewBox="0 0 400 380" className="w-full h-full" fill="none">
                  {/* Leader lines from center to each node */}
                  {(
                    [
                      ["M 200 190 L 90 100", "var(--trace)"],
                      ["M 200 190 L 310 100", "var(--trace)"],
                      ["M 200 190 L 90 290", "var(--accent)"],
                      ["M 200 190 L 310 290", "var(--accent)"],
                    ] as const
                  ).map(([d, stroke]) => (
                    <path
                      key={d}
                      d={d}
                      stroke={stroke}
                      strokeWidth="1"
                      className="trace-path"
                      style={{ "--trace-length": 220 } as React.CSSProperties}
                    />
                  ))}

                  {/* Center node */}
                  <circle cx="200" cy="190" r="5" fill="var(--text-1)" />
                  <circle cx="200" cy="190" r="11" stroke="var(--border-strong)" strokeWidth="1" />

                  {/* Corner tick marks — drafting convention */}
                  <path d="M 12 12 L 12 28 M 12 12 L 28 12" stroke="var(--border-strong)" strokeWidth="1" />
                  <path d="M 388 12 L 388 28 M 388 12 L 372 12" stroke="var(--border-strong)" strokeWidth="1" />
                  <path d="M 12 368 L 12 352 M 12 368 L 28 368" stroke="var(--border-strong)" strokeWidth="1" />
                  <path d="M 388 368 L 388 352 M 388 368 L 372 368" stroke="var(--border-strong)" strokeWidth="1" />
                </svg>

                {/* Node: Operations (top-left) */}
                <div className="absolute left-[10%] top-[10%] w-[150px]">
                  <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: "var(--success)" }}
                          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.2, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
                      </span>
                      <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[var(--trace)]">
                        01 — Operations
                      </span>
                    </div>
                    <p className="font-mono text-[20px] leading-none text-[var(--text-1)] tabular-nums mb-1.5">
                      {time ?? "--:--:--"}
                    </p>
                    <p className="text-[10.5px] text-[var(--text-3)]">Agent on shift, your time</p>
                  </div>
                </div>

                {/* Node: Engineering (top-right) */}
                <div className="absolute right-[10%] top-[10%] w-[150px]">
                  <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[var(--trace)] block mb-1.5">
                      02 — Engineering
                    </span>
                    <p className="font-mono text-[20px] leading-none text-[var(--text-1)] tabular-nums mb-1.5">2</p>
                    <p className="text-[10.5px] text-[var(--text-3)]">Systems in production</p>
                  </div>
                </div>

                {/* Node: Coverage (bottom-left) */}
                <div className="absolute left-[8%] bottom-[6%] w-[150px]">
                  <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[var(--accent-strong)] block mb-1.5">
                      03 — Coverage
                    </span>
                    <p className="font-mono text-[20px] leading-none text-[var(--text-1)] mb-1.5">24/7</p>
                    <p className="text-[10.5px] text-[var(--text-3)]">Voice, chat, technical</p>
                  </div>
                </div>

                {/* Node: Team (bottom-right) */}
                <div className="absolute right-[8%] bottom-[6%] w-[150px]">
                  <div className="rounded-md border border-[var(--border-strong)] bg-[var(--surface-2)] px-3.5 py-3">
                    <span className="font-mono text-[9.5px] uppercase tracking-[0.06em] text-[var(--accent-strong)] block mb-1.5">
                      04 — Team
                    </span>
                    <p className="font-mono text-[20px] leading-none text-[var(--text-1)] tabular-nums mb-1.5">10+</p>
                    <p className="text-[10.5px] text-[var(--text-3)]">Engineers &amp; specialists</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ambient glow behind the panel */}
            <div className="absolute inset-0 -z-10 rounded-xl bg-[var(--trace)]/[0.04] blur-3xl scale-105 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
