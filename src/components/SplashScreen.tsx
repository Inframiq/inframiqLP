"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HOLD = 3000;
const FLY_DURATION = 0.95;
const EASE_FLY = [0.45, 0, 0.2, 1] as const;
const FLAT_FILL = "linear-gradient(90deg, #f0f0f0 0%, #f0f0f0 100%)";

interface FlyTarget {
  x: number;
  y: number;
  scale: number;
}

interface RingBox {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const [fly, setFly] = useState<FlyTarget>({ x: 0, y: 0, scale: 1 });
  const [ring, setRing] = useState<RingBox | null>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Size and center the ring from the wordmark's real, measured box (not a
    // CSS guess) — taken from the outer wrapper since it holds still
    // throughout the hold; only the inner wrapper carries the entrance
    // transform. Height is deliberately capped tighter than width so the
    // ring hugs the text vertically and never reaches down into the tagline.
    const measureRing = () => {
      const el = outerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRing({
        cx: r.left + r.width / 2,
        cy: r.top + r.height / 2,
        w: r.width + 150,
        h: Math.min(r.height + 70, r.height * 2.1),
      });
    };
    measureRing();
    window.addEventListener("resize", measureRing);

    const hideTimer = setTimeout(() => {
      const targetEl = document.getElementById("site-brand-mark");
      const wordEl = wordRef.current;

      if (targetEl && wordEl) {
        const t = targetEl.getBoundingClientRect();
        const s = wordEl.getBoundingClientRect();
        // Scale from actual font-size, not box height — the two elements have
        // different line-heights, so matching box heights alone overshoots
        // the real glyph size and leaves a visible pop once the clone lands.
        const wordTextEl = wordEl.querySelector("span") ?? wordEl;
        const targetFontSize = parseFloat(getComputedStyle(targetEl).fontSize);
        const wordFontSize = parseFloat(getComputedStyle(wordTextEl).fontSize);
        setFly({
          x: t.left - s.left,
          y: t.top - s.top,
          scale: targetFontSize / wordFontSize,
        });
      }
      // Commit the fly target on its own render before removing the element —
      // AnimatePresence captures exit props from the last render the element
      // was present in, so flipping `visible` in the same batch would exit
      // toward the stale default target instead.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(false));
      });
    }, HOLD);

    return () => {
      window.removeEventListener("resize", measureRing);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, delay: FLY_DURATION, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden"
        >
          <div className="absolute inset-0 noise opacity-[0.35] pointer-events-none" />

          {/* Ambient light source — soft drift, gives the scene depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 1],
              x: [-16, 16, -16],
              y: [-10, 10, -10],
            }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              x: { duration: 7, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
              y: { duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
            }}
            className="absolute inset-0 m-auto w-[620px] h-[620px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(91,141,239,0.14) 0%, rgba(91,141,239,0.03) 42%, transparent 70%)",
              filter: "blur(4px)",
            }}
          />

          {/* Ring — a glowing dot traced along an SVG ellipse path, sized and positioned from a
              real measurement of the wordmark. This mirrors the moving-packet technique in
              HeroSection's topology visual, which renders reliably; the earlier conic-gradient
              + radial-mask ring did not. */}
          {ring && (
            <svg
              className="pointer-events-none"
              style={{
                position: "fixed",
                left: ring.cx - ring.w / 2,
                top: ring.cy - ring.h / 2,
                width: ring.w,
                height: ring.h,
                overflow: "visible",
              }}
              viewBox={`0 0 ${ring.w} ${ring.h}`}
            >
              <motion.ellipse
                cx={ring.w / 2}
                cy={ring.h / 2}
                rx={ring.w / 2 - 1}
                ry={ring.h / 2 - 1}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="1"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                style={{ transformOrigin: "center" }}
              />
              <motion.circle
                r="3.5"
                fill="#5b8def"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1], offsetDistance: ["0%", "100%"] }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.5 },
                  offsetDistance: { duration: 3.6, ease: "linear", repeat: Infinity },
                }}
                style={{
                  offsetPath: `path("M ${ring.w - 1} ${ring.h / 2} A ${ring.w / 2 - 1} ${ring.h / 2 - 1} 0 1 1 1 ${ring.h / 2} A ${ring.w / 2 - 1} ${ring.h / 2 - 1} 0 1 1 ${ring.w - 1} ${ring.h / 2}")`,
                  filter: "drop-shadow(0 0 6px rgba(91,141,239,0.9))",
                }}
              />
            </svg>
          )}

          <div className="relative flex flex-col items-center" style={{ perspective: 900 }}>
            {/* Outer: handles the fly-to-corner exit, anchored top-left so it shrinks toward the header logo */}
            <motion.div
              ref={outerRef}
              initial={{ x: 0, y: 0, scale: 1 }}
              animate={{ x: 0, y: 0, scale: 1 }}
              exit={{
                x: fly.x,
                y: fly.y,
                scale: fly.scale,
                transition: { duration: FLY_DURATION, ease: EASE_FLY },
              }}
              style={{ transformOrigin: "top left" }}
              className="relative"
            >
              {/* Inner: weighted spring settle with a slight 3D tilt correction */}
              <motion.div
                ref={wordRef}
                initial={{ opacity: 0, y: 26, scale: 0.9, rotateX: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, filter: "blur(0px)" }}
                exit={{ opacity: 1, transition: { duration: 0.001 } }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 1 }}
                className="relative"
              >
                <motion.span
                  className="font-brand block text-[52px] sm:text-[68px] font-semibold tracking-tight leading-none select-none bg-clip-text text-transparent"
                  animate={{ backgroundPositionX: ["0%", "160%"] }}
                  exit={{ backgroundImage: FLAT_FILL, transition: { duration: 0.001 } }}
                  transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, repeatType: "mirror", delay: 1 }}
                  style={{
                    backgroundImage:
                      "linear-gradient(100deg, #9a9a9a 0%, #f5f5f5 22%, #ffffff 32%, #f5f5f5 42%, #9a9a9a 60%, #9a9a9a 100%)",
                    backgroundSize: "260% 100%",
                  }}
                >
                  infram<span style={{ WebkitTextFillColor: "#5b8def", color: "#5b8def" }}>IQ</span>
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
              className="mt-8 h-px w-[48px] origin-center"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(91,141,239,0.85), transparent)",
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="mt-5 text-[10.5px] tracking-[0.34em] uppercase text-[#5f5f5f]"
            >
              Products &amp; Services, Precision-Built
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
