"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
    "w-full h-10 bg-transparent border border-[var(--border-strong)] rounded-md px-3.5 text-[13.5px] text-[var(--text-1)] placeholder-[var(--text-3)] focus:border-[var(--accent)]/50 focus:bg-[var(--surface-2)] transition-all duration-150";

  return (
    <section id="demo" className="section-raised py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24, y: 12 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-[11px] tracking-[0.04em] text-[var(--accent-strong)] mb-4">get started</p>
            <h2 className="font-brand text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-1)] mb-5">
              Let&apos;s talk about
              <br />
              <span className="text-[var(--text-3)]">your support line.</span>
            </h2>
            <p className="text-[15px] text-[var(--text-2)] leading-[1.75] mb-10 max-w-sm">
              Whether you need a 24/7 voice and chat team staffed for your
              customers, or want to see one of our products in action — tell us
              what you&apos;re working with and we&apos;ll take it from there.
            </p>

            <div className="space-y-4">
              {[
                "Coverage & staffing plan for your support line",
                "Walkthrough with a senior team member",
                "Fit assessment for voice, chat, or product needs",
                "No obligation, no sales pressure",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-[var(--accent)] flex-shrink-0" />
                  <span className="text-[13.5px] text-[var(--text-2)]">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[var(--border)]">
              <p className="text-[12px] text-[var(--text-3)] mb-2">Prefer email?</p>
              <a
                href="mailto:support@inframiq.com"
                className="text-[13px] text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
              >
                support@inframiq.com
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-7 noise">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--accent-dim)] border border-[var(--accent)]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={18} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="text-[16px] font-medium text-[var(--text-1)] mb-2">
                    Request received
                  </h3>
                  <p className="text-[13px] text-[var(--text-2)] leading-relaxed">
                    We&apos;ll reach out within one business day to talk through
                    your support needs.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-medium text-[var(--text-2)] mb-1.5">
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
                    <label className="block text-[12px] font-medium text-[var(--text-2)] mb-1.5">
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
                    <label className="block text-[12px] font-medium text-[var(--text-2)] mb-1.5">
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
                    <label className="block text-[12px] font-medium text-[var(--text-2)] mb-1.5">
                      Message{" "}
                      <span className="text-[var(--text-3)] font-normal">(optional)</span>
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
                    className="w-full h-10 rounded-md bg-[var(--accent)] text-white text-[13.5px] font-medium hover:bg-[var(--accent-strong)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150 flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Submitting...
                      </span>
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
