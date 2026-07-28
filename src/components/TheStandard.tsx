"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { revealContainer, revealItem } from "@/lib/motionVariants";

const pillContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const pillItem = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

const pillars = [
  { tag: "security", title: "Security-first", description: "Every product is tested and hardened against failure — whether it's a phishing email or an everyday app." },
  { tag: "uptime", title: "Redundant", description: "Self-healing systems designed to stay online and perform — from enterprise security infrastructure to tools people use every day." },
  { tag: "privacy", title: "Private by default", description: "No implicit trust, no unnecessary data collection. Every product respects the people using it, not just the businesses buying it." },
  { tag: "scale", title: "Built to scale", description: "From individual users and students to global enterprises — our products grow without architectural compromise." },
  { tag: "design", title: "Considered design", description: "Intelligent systems paired with careful design — products that get smarter and simpler the more you use them." },
  { tag: "ai", title: "Intelligence, applied", description: "Intelligence is part of the architecture, not a chatbot dropped on top — used only where it genuinely makes things faster." },
] as const;

// Scroll distance the pinned track occupies per pillar, desktop only —
// kept short and eased so the walk feels like a light nudge per card
// rather than a heavy, effortful scroll.
const VH_PER_STEP = 46;
const AUTOPLAY_INTERVAL = 1200;

export default function TheStandard() {
  const [active, setActive] = useState(0);
  const [pinEnabled, setPinEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setPinEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Softens the raw scroll fraction before it's turned into a step index —
  // the card swap lands a beat after the scroll itself, so it reads as a
  // smooth glide instead of snapping in lockstep with the wheel.
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    if (!pinEnabled || isPlaying) return;
    const step = Math.min(pillars.length - 1, Math.floor(progress * pillars.length));
    setActive(step);
  });

  // Apple-style play control: auto-advances through the pillars on a timer
  // instead of requiring the visitor to scroll through each one.
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % pillars.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [isPlaying]);

  const handlePillClick = (i: number) => {
    setIsPlaying(false);
    setActive(i);
  };

  return (
    <section id="solutions" className="py-24 lg:pt-16 lg:pb-0">
      {/* Tall scroll track, desktop-with-a-mouse only (pinEnabled). Header
          and card are pinned together as one unit — as the user scrolls
          through the track, the card below cycles through all 6 pillars
          one at a time before the page releases into the next section.
          Elsewhere (touch, no hover) this collapses back to plain flow: no
          extra height, no sticky, cards are just browsed via the pills. */}
      <div
        ref={trackRef}
        className="relative"
        style={pinEnabled ? { height: `${VH_PER_STEP * pillars.length}vh` } : undefined}
      >
        <div className={pinEnabled ? "sticky top-0 h-screen flex items-center" : undefined}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10 w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={revealContainer}
              className="mb-14 max-w-xl"
            >
              <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--accent-strong)] mb-4">Why InframIQ?</motion.p>
              <motion.h2 variants={revealItem} className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
                Every product, built to the same standard.
              </motion.h2>
            </motion.div>

            <div className="max-w-3xl">
              {/* Active pillar detail — the pill row beneath does the switching,
                  so there's no separate selector competing for space next to it. */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-10 lg:p-14 overflow-hidden"
              >
                <div className="pillar-glow" aria-hidden>
                  <span className="pillar-glow-blob pillar-glow-blob-1" />
                  <span className="pillar-glow-blob pillar-glow-blob-2" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <span className="font-mono text-[11px] tracking-[0.06em] text-[var(--accent)] uppercase">
                      0{active + 1} / 06 — {pillars[active].tag}
                    </span>
                    <h3 className="font-brand font-semibold text-[26px] lg:text-[30px] text-[var(--text-1)] mt-3 mb-4">
                      {pillars[active].title}
                    </h3>
                    <p className="text-[15px] text-[var(--text-2)] leading-[1.8] max-w-lg">
                      {pillars[active].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="flex items-center gap-3 mt-6">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={pillContainer}
                  className="inline-flex flex-wrap gap-1 rounded-full bg-[var(--surface-2)] p-1"
                >
                  {pillars.map((p, i) => {
                    const isActive = active === i;
                    const label = p.tag.charAt(0).toUpperCase() + p.tag.slice(1);
                    return (
                      <motion.button
                        key={p.tag}
                        variants={pillItem}
                        type="button"
                        onClick={() => handlePillClick(i)}
                        whileHover={{ scale: isActive ? 1 : 1.06 }}
                        whileTap={{ scale: 0.96 }}
                        className="relative inline-flex items-center justify-center text-[12.5px] leading-none px-3.5 py-2 rounded-full"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="standard-pill-highlight"
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: "linear-gradient(135deg, var(--accent), var(--accent-strong))",
                              boxShadow: "0 8px 18px -8px color-mix(in srgb, var(--accent) 55%, transparent)",
                            }}
                            transition={{ type: "spring", stiffness: 420, damping: 38 }}
                          />
                        )}
                        <span
                          className={`relative z-10 transition-colors duration-200 ${
                            isActive ? "font-medium text-white" : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                          }`}
                        >
                          {label}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>

                <button
                  type="button"
                  onClick={() => setIsPlaying((p) => !p)}
                  aria-label={isPlaying ? "Pause pillar autoplay" : "Play through all pillars"}
                  aria-pressed={isPlaying}
                  className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border)] bg-[var(--surface-2)] text-[var(--text-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all duration-150"
                >
                  {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="ml-0.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
