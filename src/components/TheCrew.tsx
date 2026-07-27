"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { team } from "@/lib/team";
import { revealContainer, revealItem } from "@/lib/motionVariants";

// Deterministic 6-digit badge code from a name, so each entry looks like a
// real issued ID rather than a randomly-reshuffled number on every render.
function badgeCode(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return String((hash % 900000) + 100000);
}

// Portrait/credential-driven card — a floating physical object with a
// tilt-on-hover response, sized to sit as one card in the horizontal
// scroller rather than a single centered badge.
function CredentialBadge({ name, role }: { name: string; role: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 10 });
  };

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative w-full rounded-xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, var(--accent-dim), var(--surface))",
          border: "1px solid var(--border)",
          boxShadow: "0 30px 60px -28px rgba(47,111,237,0.22)",
        }}
      >
        <div className="p-5">
          <div className="flex items-start justify-between mb-6">
            <span className="font-mono text-[8.5px] text-[var(--text-3)] uppercase tracking-[0.08em]">
              ID · {badgeCode(name)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full status-pulse" style={{ backgroundColor: "var(--success)" }} />
                <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
              </span>
              <span className="font-mono text-[8px] text-[var(--text-3)] uppercase">active</span>
            </span>
          </div>

          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center font-brand font-semibold text-[18px] text-white mb-4"
            style={{ background: "linear-gradient(160deg, var(--accent), var(--accent-strong))" }}
          >
            {name[0]}
          </div>

          <p className="text-[15px] text-[var(--text-1)] mb-1 truncate">{name}</p>
          <p className="font-mono text-[10px] text-[var(--accent-strong)] uppercase tracking-[0.02em] truncate">{role}</p>
        </div>
        <div className="h-px w-full bg-[var(--border)]" />
        <div className="px-5 py-2.5 flex items-center justify-between">
          <span className="font-mono text-[8px] text-[var(--text-3)] uppercase tracking-wide">Inframiq</span>
          <span className="font-mono text-[8px] text-[var(--text-3)]">full access</span>
        </div>
      </motion.div>
    </div>
  );
}

const CARD_WIDTH = 220;
const CARD_GAP = 16;
const STEP = CARD_WIDTH + CARD_GAP;

export default function TheCrew() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pageCount, setPageCount] = useState(team.length);

  // Dots represent actual reachable stopping points, not one per person —
  // with several cards visible at once, the number of distinct scroll
  // positions is far smaller than team.length. Recomputed on resize since
  // how many cards fit (and therefore how many stops exist) is responsive.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const measure = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const pages = maxScroll <= 0 ? 1 : Math.round(maxScroll / STEP) + 1;
      setPageCount(Math.min(team.length, Math.max(1, pages)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // A hand-driven tween instead of native scrollTo({behavior:"smooth"}) —
  // browser-native smooth scroll uses whatever easing/duration that browser
  // ships with (inconsistent, and never quite Apple's signature slow-settle
  // deceleration). Animating scrollLeft directly with the same ease curve
  // used for every other transition on the site keeps this one consistent
  // with the rest, on every browser.
  const scrollToIndex = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(pageCount - 1, i));
    const target = clamped * STEP;
    // scroll-snap-type fights a manual scrollLeft tween — the browser
    // "corrects" every intermediate frame straight to the nearest snap
    // point, collapsing the animation into an instant jump. Suspend it for
    // the duration of the tween, then restore it for drag/swipe.
    el.style.scrollSnapType = "none";
    animate(el.scrollLeft, target, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        el.scrollLeft = value;
      },
      onComplete: () => {
        el.style.scrollSnapType = "x mandatory";
      },
    });
  }, [pageCount]);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / STEP);
    setActiveIndex(Math.max(0, Math.min(pageCount - 1, idx)));
  };

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer}
          className="mb-12 max-w-xl"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--text-3)] uppercase mb-4">Team</motion.p>
          <motion.h2 variants={revealItem} className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            The people behind Inframiq.
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Horizontal scroll carousel — drag/swipe to browse, or use the
              dots/arrow below. Scroll-snap keeps each card settling flush
              instead of stopping mid-card. */}
          <div
            ref={scrollerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                className="flex-shrink-0"
                style={{ width: CARD_WIDTH, scrollSnapAlign: "start" }}
              >
                <CredentialBadge name={member.name} role={member.role} />
              </div>
            ))}
          </div>

          {/* Apple-style pagination — dots morph into a pill for the current
              card, plus a circular button to advance. */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: pageCount }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={activeIndex === i}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: activeIndex === i ? 20 : 6,
                  backgroundColor: activeIndex === i ? "var(--text-1)" : "var(--border-strong)",
                }}
              />
            ))}
            <button
              type="button"
              onClick={() => scrollToIndex(activeIndex + 1)}
              disabled={activeIndex >= pageCount - 1}
              aria-label="Next team member"
              className="ml-3 flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] hover:bg-[var(--surface-2)] disabled:opacity-30 disabled:pointer-events-none transition-colors duration-200"
            >
              <ChevronRight size={14} className="text-[var(--text-1)]" />
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[13px] text-[var(--text-3)] mt-8 text-center"
        >
          Backed by a growing team of 10+ engineers, designers, and specialists.
        </motion.p>
      </div>
    </section>
  );
}
