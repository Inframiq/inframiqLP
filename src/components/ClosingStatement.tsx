"use client";

import { motion } from "framer-motion";

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

  return (
    <section className="py-24 lg:py-32 border-t border-[var(--border)]">
      <div className="max-w-[640px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="window-chrome"
        >
          <div className="window-chrome-bar">
            <span className="window-chrome-dot" />
            <span className="window-chrome-dot" />
            <span className="window-chrome-dot" />
            <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">where this is going</span>
          </div>
          <div className="p-6 lg:p-8 font-mono text-[13px] leading-[1.9]">
            {lines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.25 }}
                className={i === 0 ? "text-[var(--text-3)]" : "text-[var(--text-2)]"}
              >
                <span className="text-[var(--trace)] mr-2">{line.prefix}</span>
                {line.text}
              </motion.p>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex items-center gap-2 mt-4"
            >
              <span className="text-[var(--trace)]">$</span>
              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "var(--success)" }}
                  animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.2, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
              </span>
              <span className="text-[var(--text-3)] text-[11px]">Still online. Still true.</span>
              <motion.span
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
                className="inline-block w-[6px] h-[13px] bg-[var(--text-3)] ml-1"
                aria-hidden
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
