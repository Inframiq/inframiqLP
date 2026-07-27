"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, MousePointerClick } from "lucide-react";
import { MailShieldWindow, SimulynWindow } from "@/components/products/ProductWindows";

// A compact preview of the ops console — the same "workspace" the visitor
// lands in fully expanded further down the page (TheSplit). Small here on
// purpose: it's a window glimpsed on the desk, not a competing centerpiece.
function OpsPreviewWindow() {
  const rows = [
    { icon: Phone, text: "Billing enquiry — plan upgrade", tag: "voice" },
    { icon: MessageCircle, text: "Order status follow-up", tag: "chat" },
  ];
  return (
    <div className="browser-chrome w-full">
      <div className="browser-chrome-bar">
        <span className="browser-chrome-dot" style={{ backgroundColor: "#ff5f57" }} />
        <span className="browser-chrome-dot" style={{ backgroundColor: "#febc2e" }} />
        <span className="browser-chrome-dot" style={{ backgroundColor: "#28c840" }} />
        <div className="browser-chrome-url">
          <span className="truncate">ops.inframiq.com/live</span>
        </div>
      </div>
      <div className="bg-[var(--lw-bg)] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[12px] font-semibold text-[var(--lw-text-1)]">Ops Desk</span>
          <span className="font-mono text-[9px] text-[var(--lw-success)] uppercase tracking-wide">on shift</span>
        </div>
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.text} className="flex items-center gap-2 rounded-md px-2.5 py-2" style={{ backgroundColor: "var(--lw-surface)" }}>
              <r.icon size={11} className="text-[var(--lw-accent)] flex-shrink-0" />
              <span className="text-[10.5px] text-[var(--lw-text-2)] truncate">{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type WindowId = "mail" | "simulyn" | "ops";

interface DeskWindow {
  id: WindowId;
  label: string;
  width: number;
  node: React.ReactNode;
}

// Depth recipe — index 0 is the focused/front window. Each step back sits
// further away, slightly rotated, softly blurred and dimmed, so the stack
// reads as real physical depth rather than a flat carousel.
const DEPTH = [
  { x: 0, y: 0, rotate: 0, scale: 1, blur: 0, opacity: 1, z: 30 },
  { x: 86, y: -46, rotate: 5, scale: 0.92, blur: 1, opacity: 0.92, z: 20 },
  { x: -70, y: 34, rotate: -6, scale: 0.88, blur: 1.5, opacity: 0.85, z: 10 },
];

export default function HeroSection() {
  const windows = useMemo<DeskWindow[]>(
    () => [
      { id: "mail", label: "Mail Shield", width: 460, node: <MailShieldWindow /> },
      { id: "simulyn", label: "Simulyn", width: 400, node: <SimulynWindow /> },
      { id: "ops", label: "Ops Desk", width: 320, node: <OpsPreviewWindow /> },
    ],
    []
  );

  const [order, setOrder] = useState<WindowId[]>(["mail", "simulyn", "ops"]);
  const bringToFront = useCallback((id: WindowId) => {
    setOrder((prev) => [id, ...prev.filter((w) => w !== id)]);
  }, []);

  const sectionRef = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--cursor-x", `${px * 100}%`);
    el.style.setProperty("--cursor-y", `${py * 100}%`);
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 10 });
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[var(--bg)]"
    >
      {/* Environmental atmosphere — the desk this hero opens on. Never empty
          white: layered light blooms, a faint blueprint grid, and slow
          drifting motes give the surface depth before any window loads. */}
      <div className="absolute inset-0 desk-surface" />
      <div className="absolute inset-0 schematic-grid pointer-events-none opacity-60" />
      <div className="absolute inset-0 cursor-light" />
      {[
        { top: "18%", left: "8%", size: 6, dur: 11, dx: 14, dy: -18 },
        { top: "68%", left: "14%", size: 4, dur: 9, dx: -10, dy: 12 },
        { top: "30%", left: "92%", size: 5, dur: 13, dx: -16, dy: 10 },
        { top: "78%", left: "88%", size: 4, dur: 10, dx: 12, dy: -14 },
      ].map((m, i) => (
        <span
          key={i}
          className="ambient-float absolute rounded-full pointer-events-none"
          style={{
            top: m.top,
            left: m.left,
            width: m.size,
            height: m.size,
            backgroundColor: "var(--accent)",
            opacity: 0.18,
            filter: "blur(1px)",
            "--float-duration": `${m.dur}s`,
            "--float-x": `${m.dx}px`,
            "--float-y": `${m.dy}px`,
          } as React.CSSProperties}
        />
      ))}

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[0.78fr_1.22fr] gap-14 lg:gap-10 items-center">
          {/* Thesis — smaller than the visual, on purpose */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-7"
            >
              <span className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--text-3)] uppercase">
                A live desk — click to explore
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-brand font-semibold text-[34px] sm:text-[44px] lg:text-[48px] leading-[1.1] tracking-[-0.02em] text-[var(--text-1)] mb-7"
            >
              We don&apos;t describe
              <br />
              our software. <span className="text-[var(--accent-strong)]">We open it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-[15.5px] text-[var(--text-2)] leading-[1.7] max-w-[420px] mb-8"
            >
              Inframiq runs 24/7 voice and chat operations for your customers,
              and engineers the security and business software your company
              depends on. Every window on the right is real, live, and yours
              to click through.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-wrap items-center gap-8"
            >
              <Link
                href="/#demo"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-md bg-[var(--accent)] text-white text-[14px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] transition-all duration-150"
              >
                Request a Demo
                <ArrowRight size={14} />
              </Link>
              <a
                href="#systems"
                className="inline-flex items-center gap-1.5 font-mono text-[13px] tracking-[0.02em] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors duration-150 underline decoration-[var(--border-strong)] underline-offset-4 hover:decoration-[var(--accent)]"
              >
                see the operations desk
              </a>
            </motion.div>
          </div>

          {/* The window stack — hero centerpiece and signature interaction:
              click any tile to bring it forward, like real window management. */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[420px] sm:h-[460px] lg:h-[480px]"
            style={{ perspective: 1400 }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {windows.map((w) => {
                const depth = order.indexOf(w.id);
                const d = DEPTH[depth];
                const isFront = depth === 0;
                return (
                  <motion.div
                    key={w.id}
                    className="absolute left-1/2 top-1/2"
                    style={{ width: w.width, zIndex: d.z, filter: `blur(${d.blur}px)` }}
                    initial={false}
                    animate={{
                      x: `calc(-50% + ${d.x}px)`,
                      y: `calc(-50% + ${d.y}px)`,
                      rotate: d.rotate,
                      scale: d.scale,
                      opacity: d.opacity,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                  >
                    <div
                      className="rounded-xl"
                      style={{
                        boxShadow: isFront
                          ? "0 60px 120px -32px rgba(15,23,42,0.32)"
                          : "0 30px 60px -24px rgba(15,23,42,0.22)",
                      }}
                    >
                      <div style={{ pointerEvents: isFront ? "auto" : "none" }}>{w.node}</div>
                    </div>

                    {!isFront && (
                      <button
                        type="button"
                        onClick={() => bringToFront(w.id)}
                        aria-label={`Bring ${w.label} to front`}
                        className="absolute inset-0 rounded-xl cursor-pointer group focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                      >
                        <span className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
                        <span className="absolute bottom-2 right-2.5 flex items-center gap-1 font-mono text-[9px] text-[var(--text-3)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <MousePointerClick size={10} />
                          bring forward
                        </span>
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
