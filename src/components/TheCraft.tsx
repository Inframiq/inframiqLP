"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

// ─── The signature interaction ───────────────────────────────────────────────
// A draggable X-ray slider over a miniature recreation of this very page:
// drag left to see the finished design, drag right and the same layout
// peels back into the engineering underneath it — grid, component
// boundaries, and real build metrics. It's the one moment on the site built
// purely to demonstrate craft rather than explain a product, and it proves
// the "if their own site looks like this" pitch directly, on the site the
// visitor is already standing on.

const annotations = [
  { top: "9%", left: "6%", label: "Navbar", detail: "52px · sticky" },
  { top: "24%", left: "6%", label: "Hero.tsx", detail: "client component" },
  { top: "24%", right: "6%", label: "WindowStack", detail: "spring, 3-layer" },
  { top: "58%", left: "6%", label: "Button", detail: "focus-visible · AA" },
  { top: "72%", left: "38%", label: "grid-cols-[0.78fr_1.22fr]", detail: "8px scale" },
];

const metrics = [
  { label: "LCP", value: "1.1s" },
  { label: "CLS", value: "0.01" },
  { label: "TypeScript", value: "strict" },
  { label: "A11y", value: "AA" },
];

export default function TheCraft() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(38);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPercent(Math.min(96, Math.max(4, pct)));
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(e.clientX);
    };
    const up = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [updateFromClientX]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 15 : 5;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPercent((p) => Math.max(4, p - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPercent((p) => Math.min(96, p + step));
    }
  };

  return (
    <section id="craft" className="relative py-24 lg:py-32 border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-xl"
        >
          <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--accent-strong)] uppercase mb-4">
            The craft, exposed
          </p>
          <h2 className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            This page is the pitch. Drag to see how it&apos;s built.
          </h2>
          <p className="text-[14px] text-[var(--text-2)] leading-[1.75] mt-4 max-w-lg">
            The window below is a live recreation of the section you just scrolled past —
            same layout, same components. Pull the divider to see the engineering
            underneath the design: the grid, the component boundaries, the real numbers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          ref={containerRef}
          className="relative w-full aspect-[16/9] sm:aspect-[16/8] rounded-xl overflow-hidden select-none touch-none"
          style={{
            border: "1px solid rgba(15,23,42,0.06)",
            boxShadow: "0 60px 120px -36px rgba(15,23,42,0.3)",
          }}
        >
          {/* ── Design layer (bottom, full width) ─────────────────────── */}
          <div className="absolute inset-0 bg-[var(--lw-bg)]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--lw-border)] bg-white">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#febc2e" }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
              <span className="ml-2 font-mono text-[10px] text-[var(--lw-text-3)]">inframiq.com</span>
            </div>
            <div className="p-6 sm:p-10 h-full">
              <div className="flex items-center justify-between mb-8 sm:mb-14">
                <span className="font-mono text-[11px] text-[var(--lw-text-1)]">inframiq</span>
                <div className="hidden sm:flex gap-4 font-mono text-[10px] text-[var(--lw-text-3)]">
                  <span>products</span><span>services</span><span>about</span>
                </div>
              </div>
              <h3 className="font-brand font-semibold text-[20px] sm:text-[28px] leading-tight text-[var(--lw-text-1)] max-w-[70%] sm:max-w-[50%] mb-4">
                We don&apos;t describe our software. We open it.
              </h3>
              <div
                className="inline-flex h-8 sm:h-9 px-4 sm:px-5 items-center rounded-md text-white text-[11px] sm:text-[12.5px] font-medium"
                style={{ backgroundColor: "var(--lw-accent)" }}
              >
                Request a Demo
              </div>
              <div
                className="hidden sm:block absolute right-10 top-1/2 -translate-y-1/2 w-[220px] h-[140px] rounded-lg"
                style={{ background: "linear-gradient(155deg, rgba(47,111,237,0.14), rgba(124,58,237,0.06))", border: "1px solid var(--lw-border)" }}
              />
            </div>
          </div>

          {/* ── Engineering layer (clipped by drag position) ──────────── */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 0 0 ${percent}%)`, backgroundColor: "#0e1420" }}
          >
            <div
              className="absolute inset-0 opacity-[0.5]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
              <span className="font-mono text-[10px] text-white/50">engineering view — component tree</span>
            </div>

            {annotations.map((a) => (
              <div
                key={a.label}
                className="absolute font-mono text-[9.5px] sm:text-[10px]"
                style={{ top: a.top, left: a.left, right: a.right }}
              >
                <div className="px-1.5 py-1 rounded border border-[var(--accent-strong)]/50 bg-[rgba(47,111,237,0.12)] text-[var(--accent-strong)] whitespace-nowrap">
                  {a.label}
                </div>
                <div className="mt-0.5 text-white/40 whitespace-nowrap">{a.detail}</div>
              </div>
            ))}

            <div className="absolute bottom-3 right-3 sm:bottom-5 sm:right-5 flex gap-2 sm:gap-3">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-md border border-white/10 bg-white/5 px-2 sm:px-3 py-1.5 sm:py-2 text-center">
                  <p className="font-mono text-[11px] sm:text-[13px] text-white tabular-nums">{m.value}</p>
                  <p className="font-mono text-[7.5px] sm:text-[8.5px] text-white/40 uppercase tracking-wide">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Drag handle ────────────────────────────────────────────── */}
          <div
            className="absolute inset-y-0 w-px bg-white/70"
            style={{ left: `${percent}%`, boxShadow: "0 0 0 1px rgba(15,23,42,0.15)" }}
          />
          <button
            type="button"
            role="slider"
            aria-label="Reveal engineering view"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(percent)}
            onKeyDown={handleKeyDown}
            onPointerDown={(e) => {
              dragging.current = true;
              updateFromClientX(e.clientX);
            }}
            className="absolute top-1/2 flex items-center justify-center w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white cursor-ew-resize focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            style={{ left: `${percent}%`, boxShadow: "0 8px 24px -6px rgba(15,23,42,0.4)" }}
          >
            <ArrowLeftRight size={14} className="text-[var(--text-1)]" />
          </button>

          <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-wide text-[var(--lw-text-3)]">design</span>
          <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-wide text-white/50">engineering</span>
        </motion.div>
      </div>
    </section>
  );
}
