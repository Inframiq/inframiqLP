"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldAlert, Paperclip, Reply, Forward, MoreHorizontal } from "lucide-react";
import BrowserWindow from "@/components/instruments/BrowserWindow";
import { mailJourneys } from "@/lib/mailShieldJourneys";

// The hero's visual centerpiece: a real browser window running Mail Shield,
// analyzing an actual phishing email from the product's own sample set —
// proof of the security claim rather than a description of it. The scan
// plays once on scroll-into-view, then settles on the verdict.
function MailShieldHero() {
  const journey = mailJourneys[0]; // billing@fakebank-alerts.co — the phishing sample
  const [scanned, setScanned] = useState(false);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scanRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = setTimeout(() => setScanned(true), reduced ? 0 : 1400);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <BrowserWindow url="app.inframiq.com/mail-shield" className="w-full">
      {/* App header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--lw-border)]">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: "var(--lw-accent)" }}>
            <ShieldAlert size={12} className="text-white" />
          </div>
          <span className="text-[13px] font-semibold text-[var(--lw-text-1)]">Mail Shield</span>
        </div>
        <span className="font-mono text-[10px] text-[var(--lw-text-3)] uppercase tracking-wide">Inbound queue</span>
      </div>

      <div className="grid sm:grid-cols-[180px_1fr]">
        {/* Inbox list */}
        <div className="border-r border-[var(--lw-border)] divide-y divide-[var(--lw-border)] hidden sm:block">
          {mailJourneys.map((j, i) => (
            <div key={j.id} className={`px-3.5 py-3 ${i === 0 ? "bg-[var(--lw-accent-dim)]" : ""}`}>
              <p className="text-[11px] text-[var(--lw-text-1)] truncate">{j.from.split("@")[1]}</p>
              <p className="text-[10.5px] text-[var(--lw-text-3)] truncate mt-0.5">{j.subject}</p>
            </div>
          ))}
        </div>

        {/* Opened message + live analysis */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[13.5px] text-[var(--lw-text-1)] font-medium mb-1">{journey.subject}</p>
              <p className="font-mono text-[11px] text-[var(--lw-text-3)]">{journey.from}</p>
            </div>
            <div className="flex items-center gap-2 text-[var(--lw-text-3)] flex-shrink-0">
              <Reply size={13} />
              <Forward size={13} />
              <MoreHorizontal size={13} />
            </div>
          </div>

          <div className="text-[12px] text-[var(--lw-text-2)] leading-relaxed mb-5 pb-5 border-b border-[var(--lw-border)]">
            <p>Your account requires immediate verification. Click below within 24 hours to avoid suspension.</p>
            <p className="mt-2 inline-flex items-center gap-1.5">
              <Paperclip size={11} />
              <span className="underline decoration-dotted">verify-account.fakebank-alerts.co/confirm</span>
            </p>
          </div>

          {/* Scan bar */}
          <div ref={scanRef}>
            {!scanned && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[var(--lw-text-3)] uppercase tracking-wide">Scanning message…</span>
                </div>
                <div className="h-1.5 rounded-full bg-[var(--lw-surface-2)] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: "var(--lw-accent)" }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.3, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}
          </div>

          {scanned && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div
                className="flex items-center gap-2 rounded-lg px-3.5 py-2.5 mb-3"
                style={{ backgroundColor: "var(--lw-danger-dim)", border: "1px solid rgba(220,38,38,0.2)" }}
              >
                <ShieldAlert size={14} style={{ color: "var(--lw-danger)" }} />
                <span className="text-[12.5px] font-medium" style={{ color: "var(--lw-danger)" }}>
                  Phishing — blocked before delivery
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {journey.checkpoints.slice(0, 2).map((cp) => (
                  <span
                    key={cp.key}
                    className="font-mono text-[9.5px] px-2 py-1 rounded"
                    style={{ backgroundColor: "var(--lw-surface-2)", color: "var(--lw-text-2)" }}
                  >
                    {cp.label}: fail
                  </span>
                ))}
                <span className="font-mono text-[9.5px] px-2 py-1 rounded" style={{ backgroundColor: "var(--lw-surface-2)", color: "var(--lw-text-2)" }}>
                  domain: lookalike
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </BrowserWindow>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[var(--bg)]">
      <div className="absolute inset-0 schematic-grid pointer-events-none opacity-70" />
      <div className="absolute inset-0 ambient-glow pointer-events-none" style={{ "--glow-x": "80%", "--glow-y": "10%" } as React.CSSProperties} />
      <div className="absolute inset-0 ambient-glow pointer-events-none opacity-60" style={{ "--glow-x": "10%", "--glow-y": "90%" } as React.CSSProperties} />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-14 lg:gap-12 items-center">
          {/* Thesis */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 mb-7"
            >
              <span className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)] uppercase">
                Fig. 01 — Mail Shield, live
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="font-brand font-semibold text-[38px] sm:text-[50px] lg:text-[58px] leading-[1.08] tracking-[-0.02em] text-[var(--text-1)] mb-8"
            >
              We don&apos;t describe security software.
              <br />
              <span className="text-[var(--accent-strong)]">We show it working.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="text-[16.5px] text-[var(--text-2)] leading-[1.7] max-w-[440px] mb-10"
            >
              Inframiq runs 24/7 voice and chat operations for your customers,
              and engineers the security and business software your company
              depends on — like Mail Shield, blocking the phishing email on
              the right, live, right now.
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
                see the operations desk
              </a>
            </motion.div>
          </div>

          {/* The browser window — the hero's visual centerpiece */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <MailShieldHero />
            <div className="absolute inset-0 -z-10 rounded-xl bg-[var(--glow)] opacity-[0.15] blur-3xl scale-105 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
