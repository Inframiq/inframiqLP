"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORD = "inframiQ";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(timer);
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
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0c0c0c] overflow-hidden"
        >
          {/* ambient glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-[520px] h-[520px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(91,141,239,0.16) 0%, rgba(91,141,239,0.05) 45%, transparent 70%)",
            }}
          />

          {/* dot grid backdrop */}
          <div className="absolute inset-0 dot-grid opacity-40" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex"
            >
              {WORD.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 * i,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-[56px] sm:text-[72px] font-semibold tracking-tight select-none ${
                    char === "Q" ? "text-[#5b8def]" : "text-[#f0f0f0]"
                  }`}
                  style={{
                    textShadow:
                      char === "Q"
                        ? "0 0 24px rgba(91,141,239,0.45)"
                        : "0 0 24px rgba(255,255,255,0.08)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* animated underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 h-[1.5px] w-[120px] origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(91,141,239,0.9), transparent)",
              }}
            />

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
