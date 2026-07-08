"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function DemoSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const inputClass =
    "w-full h-10 bg-transparent border border-white/[0.09] rounded-md px-3.5 text-[13.5px] text-[#d8d8d8] placeholder-[#404040] focus:border-white/[0.2] focus:bg-white/[0.02] transition-all duration-150";

  return (
    <section id="demo" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
              <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Request a Demo</span>
            </div>
            <h2 className="text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f0f0f0] mb-5">
              See Inframiq
              <br />
              <span className="text-[#606060]">in your environment.</span>
            </h2>
            <p className="text-[15px] text-[#7a7a7a] leading-[1.75] mb-10 max-w-sm">
              Our team will walk you through the platform with a live deployment
              tailored to your infrastructure, threat model, and compliance requirements.
            </p>

            <div className="space-y-4">
              {[
                "45-minute technical walkthrough",
                "Architecture review with a senior engineer",
                "Custom threat model analysis",
                "No obligation, no sales pressure",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-[#5b8def] flex-shrink-0" />
                  <span className="text-[13.5px] text-[#7a7a7a]">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-white/[0.05]">
              <p className="text-[12px] text-[#404040] mb-2">Prefer email?</p>
              <a
                href="mailto:support@inframiq.com"
                className="text-[13px] text-[#7a7a7a] hover:text-white transition-colors"
              >
                support@inframiq.com
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className="rounded-xl border border-white/[0.07] bg-[#0f0f0f] p-7 noise">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-8 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#5b8def]/10 border border-[#5b8def]/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={18} className="text-[#5b8def]" />
                  </div>
                  <h3 className="text-[16px] font-medium text-[#e8e8e8] mb-2">
                    Request received
                  </h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    We&apos;ll reach out within one business day to schedule your
                    demo session.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[12px] font-medium text-[#5a5a5a] mb-1.5">
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
                    <label className="block text-[12px] font-medium text-[#5a5a5a] mb-1.5">
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
                    <label className="block text-[12px] font-medium text-[#5a5a5a] mb-1.5">
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
                    <label className="block text-[12px] font-medium text-[#5a5a5a] mb-1.5">
                      Message{" "}
                      <span className="text-[#3a3a3a] font-normal">(optional)</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe your security needs or current challenges..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} h-auto resize-none py-2.5`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 rounded-md bg-white text-[#0c0c0c] text-[13.5px] font-medium hover:bg-[#e8e8e8] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center gap-2 mt-2 shadow-[0_0_22px_rgba(255,255,255,0.07)]"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin w-3.5 h-3.5 text-[#555]"
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
                        Request a Demo
                        <ArrowRight size={13} />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-[#404040] text-center">
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
