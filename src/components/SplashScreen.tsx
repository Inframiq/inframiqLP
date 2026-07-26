"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A brief, restrained entrance — a single blur-and-settle reveal of the
// wordmark, then a plain fade out. No scramble, no fly-to-logo choreography:
// both read as flashy, which is the opposite of the site's quiet register.
const HOLD = 1100;
const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const hideTimer = setTimeout(() => setVisible(false), HOLD);
    return () => clearTimeout(hideTimer);
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
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[var(--bg)]"
        >
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.96 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(6px)", scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE_SOFT }}
          >
            <span className="font-brand block text-[44px] sm:text-[56px] font-semibold tracking-[-0.01em] leading-none select-none text-[var(--text-1)]">
              infram<span className="font-mono text-[0.8em] text-[var(--accent)]">IQ</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
