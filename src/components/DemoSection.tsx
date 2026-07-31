"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Inbox } from "lucide-react";
import BrowserWindow from "@/components/instruments/BrowserWindow";
import SectionAurora from "@/components/SectionAurora";
import FeedbackSurvey from "@/components/FeedbackSurvey";
import { revealContainer, revealItem } from "@/lib/motionVariants";
import { buildConsultationMailto } from "@/lib/mailTemplates";

const queueContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};
const queueItem = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
};

const checklist = [
  "Coverage & staffing plan",
  "Walkthrough with a senior team member",
  "Fit assessment for voice, chat, or product needs",
  "No obligation, no sales pressure",
];

// PLACEHOLDER — illustrative only, not real customer data. These names/
// statuses exist purely to show what the "Request Management" dashboard
// looks like with entries in it, sitting deliberately next to the real form
// below. Do not treat as proof/testimonials, and don't add real customer
// names here without their consent.
const recentRequests = [
  { company: "Northwind Retail", need: "Voice support", status: "Scheduled" },
  { company: "Arclight Labs", need: "Mail Shield demo", status: "Reviewed" },
  { company: "Halden & Co.", need: "Simulyn demo", status: "New" },
];
const requestStatusStyle: Record<string, { bg: string; fg: string }> = {
  Scheduled: { bg: "var(--lw-success-dim)", fg: "var(--lw-success)" },
  Reviewed: { bg: "var(--lw-accent-dim)", fg: "var(--lw-accent)" },
  New: { bg: "var(--lw-surface-2)", fg: "var(--lw-text-3)" },
};

interface DemoSectionProps {
  /** Homepage embeds this mid-page after ClosingStatement, so it wants the
   *  full border-t + generous py-28/36 for section separation. Standalone
   *  pages sit it directly under the navbar instead, where that same
   *  padding just reads as dead space. */
  standalone?: boolean;
}

export default function DemoSection({ standalone = false }: DemoSectionProps) {
  const searchParams = useSearchParams();
  const product = searchParams.get("product");
  const [submitted, setSubmitted] = useState(false);
  // Arriving from a product's "Request a Demo" button — pre-fill the message
  // so the requester doesn't have to retype which product they're asking about.
  const [form, setForm] = useState(() => ({
    name: "",
    company: "",
    email: "",
    message: product ? `Interested in a demo of ${product}.` : "",
  }));

  // No backend round-trip: the visitor's own mail client composes and sends
  // the message, pre-filled from our standard template, so it arrives at
  // support@inframiq.com from a real inbox instead of a transactional
  // sender spam filters distrust. Navigating the current window (rather
  // than window.open, which browsers can silently pop-up-block for a
  // non-http scheme) is what reliably hands off to the mail app.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = buildConsultationMailto({ ...form, product });
    setSubmitted(true);
  };

  const inputClass =
    "w-full h-10 bg-[var(--lw-surface)] border border-[var(--lw-border-strong)] rounded-md px-3 text-[13.5px] text-[var(--lw-text-1)] placeholder-[var(--lw-text-3)] focus:border-[var(--lw-accent)]/60 transition-all duration-150";

  return (
    <section
      id="demo"
      className={
        standalone
          ? "relative overflow-hidden pt-12 pb-28 lg:pb-36"
          : "relative overflow-hidden py-28 lg:py-36 border-t border-[var(--border)]"
      }
    >
      <SectionAurora />
      <div className="relative max-w-[880px] mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer}
          className="text-center mb-10"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--text-3)] uppercase mb-4">Get started</motion.p>
          <motion.h2 variants={revealItem} className="font-brand text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)] mb-6">
            Let&apos;s talk about <span className="italic text-[var(--accent-strong)]">your support line.</span>
          </motion.h2>
          <motion.div variants={revealItem} className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {checklist.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[12px] text-[var(--text-2)]">
                <CheckCircle2 size={12} className="text-[var(--accent)]" />
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <BrowserWindow url="app.inframiq.com/requests">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--lw-border)]">
              <span className="flex items-center gap-2 text-[13px] font-semibold text-[var(--lw-text-1)]">
                <Inbox size={13} style={{ color: "var(--lw-accent)" }} />
                Request Management
              </span>
              <span className="font-mono text-[10px] text-[var(--lw-text-3)] uppercase tracking-wide">3 requests</span>
            </div>

            <div className="grid md:grid-cols-[220px_1fr]">
              {/* Request queue — the dashboard half */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={queueContainer}
                className="border-r border-[var(--lw-border)] divide-y divide-[var(--lw-border)] hidden md:block"
              >
                {recentRequests.map((r) => (
                  <motion.div key={r.company} variants={queueItem} className="px-4 py-3">
                    <p className="text-[11.5px] text-[var(--lw-text-1)] truncate mb-0.5">{r.company}</p>
                    <p className="text-[10px] text-[var(--lw-text-3)] truncate mb-1.5">{r.need}</p>
                    <span
                      className="relative inline-block font-mono text-[9px] px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: requestStatusStyle[r.status].bg, color: requestStatusStyle[r.status].fg }}
                    >
                      {r.status === "New" && (
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: requestStatusStyle[r.status].fg }}
                          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.4, 1] }}
                          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        />
                      )}
                      <span className="relative">{r.status}</span>
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* New request — the real, functional form */}
              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="py-8 text-center"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ backgroundColor: "var(--lw-accent-dim)" }}
                    >
                      <CheckCircle2 size={18} style={{ color: "var(--lw-accent)" }} />
                    </div>
                    <h3 className="text-[15px] text-[var(--lw-text-1)] mb-2">Almost there</h3>
                    <p className="text-[12.5px] text-[var(--lw-text-2)] leading-relaxed">
                      Your email app should now be open with the request pre-filled — just hit send and
                      we&apos;ll reach out within one business day.
                    </p>
                    <FeedbackSurvey context={product || "general"} email={form.email} />
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--lw-text-3)] mb-1">New request</p>
                    <div className="grid sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] text-[var(--lw-text-2)] mb-1.5">Full name</label>
                        <input
                          required
                          type="text"
                          placeholder="Alex Morgan"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[var(--lw-text-2)] mb-1.5">Company</label>
                        <input
                          required
                          type="text"
                          placeholder="Acme Corp"
                          value={form.company}
                          onChange={(e) => setForm({ ...form, company: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[var(--lw-text-2)] mb-1.5">Work email</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@acme.io"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[var(--lw-text-2)] mb-1.5">
                        Message <span className="text-[var(--lw-text-3)]">(optional)</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe your support needs or current challenges..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className={`${inputClass} h-auto resize-none py-2`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full h-10 rounded-md text-white text-[13.5px] font-medium active:scale-[0.98] transition-all duration-150 flex items-center justify-center gap-2 mt-1"
                      style={{ backgroundColor: "var(--lw-accent)" }}
                    >
                      Submit Request
                      <ArrowRight size={13} />
                    </button>

                    <p className="text-[10.5px] text-[var(--lw-text-3)] text-center">
                      No credit card required. We respect your privacy.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </BrowserWindow>

          <p className="text-center mt-6 font-mono text-[12px] text-[var(--text-3)]">
            Prefer email?{" "}
            <a href="mailto:support@inframiq.com" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
              support@inframiq.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
