"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const checklist = [
  "Coverage & staffing plan",
  "Walkthrough with a senior team member",
  "Fit assessment for voice, chat, or product needs",
  "No obligation, no sales pressure",
];

export default function DemoSection() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // Arriving from a product's "Request a Demo" button — pre-fill the message
  // so the requester doesn't have to retype which product they're asking about.
  const [form, setForm] = useState(() => {
    const product = searchParams.get("product");
    return {
      name: "",
      company: "",
      email: "",
      message: product ? `Interested in a demo of ${product}.` : "",
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 bg-transparent border border-[var(--border-strong)] rounded-md px-3.5 text-[14px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:border-[var(--accent)]/50 focus:bg-[var(--surface-2)] transition-all duration-150";

  return (
    <section id="demo" className="py-28 lg:py-36 border-t border-[var(--border)]">
      <div className="max-w-[560px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)] uppercase mb-4">
            Get started
          </p>
          <h2 className="font-brand text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)] mb-6">
            Let&apos;s talk about <span className="italic text-[var(--accent-strong)]">your support line.</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {checklist.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[12px] text-[var(--text-2)]">
                <CheckCircle2 size={12} className="text-[var(--accent)]" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="window-chrome">
            <div className="window-chrome-bar">
              <span className="window-chrome-dot" />
              <span className="window-chrome-dot" />
              <span className="window-chrome-dot" />
              <span className="ml-2 text-[10px] font-mono text-[var(--text-3)]">consultation-request.form</span>
            </div>
            <div className="p-7 lg:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="py-8 text-center"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--accent-dim)] border border-[var(--accent)]/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={18} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-[16px] text-[var(--text-1)] mb-2">Request received</h3>
                <p className="text-[13px] text-[var(--text-2)] leading-relaxed">
                  We&apos;ll reach out within one business day to talk through your support needs.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-3)] mb-1.5">
                    Full name
                  </label>
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
                  <label className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-3)] mb-1.5">
                    Company
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-3)] mb-1.5">
                    Work email
                  </label>
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
                  <label className="block font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-3)] mb-1.5">
                    Message <span className="normal-case text-[var(--text-3)]">(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Briefly describe your support needs or current challenges..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} h-auto resize-none py-2.5`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-md bg-[var(--accent)] text-[#050505] text-[14px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150 flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <span className="font-mono">Submitting…</span>
                  ) : (
                    <>
                      Request a Consultation
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>

                {error && (
                  <p className="text-[11.5px] text-center" style={{ color: "var(--error)" }}>
                    Something went wrong sending your request — please try again, or email{" "}
                    <a href="mailto:support@inframiq.com" className="underline">
                      support@inframiq.com
                    </a>{" "}
                    directly.
                  </p>
                )}

                <p className="text-[11px] text-[var(--text-3)] text-center">
                  No credit card required. We respect your privacy.
                </p>
              </form>
            )}
            </div>
          </div>

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
