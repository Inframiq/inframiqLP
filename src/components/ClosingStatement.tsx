"use client";

import { motion } from "framer-motion";
import SectionAurora from "@/components/SectionAurora";

// Reveals `text` one character at a time — each char is its own motion.span
// with its own viewport-triggered delay, so the line "types" itself out
// once the terminal scrolls into view, rather than fading in as one block.
function TypedText({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: startDelay + i * 0.014, duration: 0.01 }}
        >
          {ch}
        </motion.span>
      ))}
    </>
  );
}

// The emotional exhale before the ask, staged as a terminal log rather than
// a centered pull-quote — consistent with the instrument register the rest
// of the page is built from. The blinking cursor and status line are the
// same "still true" proof as the hero clock, placed right before the CTA.
export default function ClosingStatement() {
  const lines = [
    { prefix: "$", text: "inframiq --status" },
    { prefix: ">", text: "2 systems in production. 1 operations desk, staffed 24/7." },
    { prefix: ">", text: "Every product after Mail Shield and Simulyn gets built exactly this carefully — or it doesn't get built." },
  ];

  // Each line's typing starts only once the previous one has finished (plus
  // a short pause) — a fixed per-line stagger would start line 2 typing
  // while line 1 was still mid-character, which reads as garbled rather
  // than sequential.
  const CHAR_STEP = 0.014;
  const LINE_PAUSE = 0.35;
  let cursor = 0.15;
  const lineDelays = lines.map((line) => {
    const delay = cursor;
    cursor += line.text.length * CHAR_STEP + LINE_PAUSE;
    return delay;
  });
  const statusRowDelay = cursor + 0.2;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 border-t border-[var(--border)] bg-[var(--bg-raised)]">
      <SectionAurora />
      <div className="relative max-w-[640px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="terminal-chrome"
        >
          <div className="terminal-chrome-bar">
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="w-2 h-2 rounded-full bg-white/15" />
            <span className="ml-2 text-[11px] font-mono tracking-[0.03em] text-white/55">where this is going</span>
          </div>
          <div className="p-6 lg:p-8 font-mono text-[13px] leading-[1.9]">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: lineDelays[i], duration: 0.01 }}
                className={i === 0 ? "text-white/40" : "text-white/70"}
              >
                <span className="text-[var(--accent-strong)] mr-2">{line.prefix}</span>
                <TypedText text={line.text} startDelay={lineDelays[i] + 0.03} />
              </motion.p>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: statusRowDelay }}
              className="flex items-center gap-2 mt-4"
            >
              <span className="text-[var(--accent-strong)]">$</span>
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "var(--success)" }}
                  animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.2, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
              </span>
              <span className="text-white/40 text-[11px]">Still online. Still true.</span>
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                className="inline-block w-[6px] h-[13px] bg-white/40 ml-1"
                aria-hidden
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
