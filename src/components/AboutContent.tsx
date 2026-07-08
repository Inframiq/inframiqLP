"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const values = [
  {
    title: "Security-first engineering",
    description:
      "Every architectural decision begins with the question: how does this behave under adversarial conditions? Security is not a feature layer — it is a design constraint.",
  },
  {
    title: "Transparency with clients",
    description:
      "We tell clients what we know, what we don't know, and where their exposure lies. No marketing language, no obscured risk. Honest assessments, clear recommendations.",
  },
  {
    title: "Minimal attack surface",
    description:
      "We build lean systems. Fewer dependencies, fewer integrations, fewer trust boundaries. Every additional component is a liability we consciously choose to accept or decline.",
  },
  {
    title: "Long-term thinking",
    description:
      "The organizations that need us most are the ones that cannot afford to switch vendors every three years. We build for longevity, not acquisition.",
  },
];

const timeline = [
  { year: "Founded", event: "Inframiq established with a focus on enterprise email security infrastructure." },
  { year: "First Product", event: "Mail Shield launched — addressing phishing and domain impersonation at scale." },
  { year: "Today", event: "Expanding platform to cover the full enterprise security stack." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-[110px] pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-grid pointer-events-none opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 70% 50% at 50% 0%, transparent 30%, #0c0c0c 100%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8 text-[12px] text-[#454545]">
              <Link href="/" className="hover:text-[#8a8a8a] transition-colors">
                Inframiq
              </Link>
              <span>/</span>
              <span className="text-[#8a8a8a]">About</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-5">
              <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">About Inframiq</span>
            </div>

            <h1 className="text-[42px] lg:text-[52px] font-semibold tracking-[-0.03em] leading-[1.08] text-[#f0f0f0] mb-6 max-w-2xl">
              Built for organizations
              <br />
              <span className="text-[#5a5a5a]">that cannot afford to fail.</span>
            </h1>

            <p className="text-[16px] text-[#6a6a6a] leading-[1.8] max-w-xl">
              Inframiq is a cybersecurity and digital infrastructure company focused
              on proactive protection systems and secure communication technologies
              for enterprises that operate in high-stakes environments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-5">
                <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
                <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Our mission</span>
              </div>
              <h2 className="text-[30px] font-semibold tracking-[-0.02em] text-[#e8e8e8] mb-5 leading-tight">
                Make serious security
                accessible to every enterprise.
              </h2>
              <p className="text-[14px] text-[#626262] leading-[1.8] mb-5">
                For too long, enterprise-grade security has been the exclusive domain
                of organizations with nine-figure security budgets and in-house research
                teams. We believe that should change.
              </p>
              <p className="text-[14px] text-[#626262] leading-[1.8]">
                Inframiq packages the same depth of protection that governments and
                large financial institutions rely on — into products that mid-market
                and enterprise organizations can deploy, operate, and trust.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-5">
                <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
                <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">What we build</span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    label: "Email Security",
                    desc: "Phishing prevention, domain impersonation detection, and secure communication infrastructure.",
                  },
                  {
                    label: "Threat Intelligence",
                    desc: "Proactive monitoring and classification of threats specific to your industry and infrastructure profile.",
                  },
                  {
                    label: "Infrastructure Resilience",
                    desc: "Systems designed to remain operational and defensible under active attack or failure conditions.",
                  },
                  {
                    label: "Compliance Tooling",
                    desc: "Audit trails, data residency controls, and reporting for regulated industries.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex gap-4 py-3.5 border-b border-white/[0.05] last:border-0"
                  >
                    <div className="w-1 h-1 rounded-full bg-[#5b8def] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-[13.5px] font-medium text-[#c0c0c0] mb-1">{item.label}</p>
                      <p className="text-[13px] text-[#575757] leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
              <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">How we work</span>
            </div>
            <h2 className="text-[30px] font-semibold tracking-[-0.02em] text-[#e8e8e8]">
              Our operating principles
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05]">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                className="bg-[#0c0c0c] p-7 hover:bg-[#0f0f0f] transition-colors duration-200"
              >
                <h3 className="text-[14px] font-medium text-[#d0d0d0] mb-2.5">{value.title}</h3>
                <p className="text-[13.5px] text-[#5a5a5a] leading-[1.75]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
                <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
                <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Company</span>
              </div>
              <h2 className="text-[30px] font-semibold tracking-[-0.02em] text-[#e8e8e8] mb-5">
                Where we are today
              </h2>
              <p className="text-[14px] text-[#626262] leading-[1.8]">
                Inframiq is an early-stage company with a clear and focused product roadmap.
                We are building deliberately — one product, properly, before the next.
                Our first product, Mail Shield, addresses one of the most prevalent enterprise
                attack vectors: email-based intrusion.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-0 divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-[#0f0f0f] overflow-hidden"
            >
              {timeline.map((item, i) => (
                <div key={i} className="flex gap-5 px-6 py-5">
                  <div className="w-[80px] flex-shrink-0">
                    <span className="text-[11px] font-medium text-[#5b8def] uppercase tracking-wider">
                      {item.year}
                    </span>
                  </div>
                  <p className="text-[13.5px] text-[#666] leading-relaxed">{item.event}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team placeholder */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-10 lg:p-14"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
              <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Team</span>
            </div>
            <h2 className="text-[26px] font-semibold tracking-[-0.02em] text-[#e0e0e0] mb-3">
              Team profiles coming soon.
            </h2>
            <p className="text-[14px] text-[#555] max-w-lg leading-relaxed mb-8">
              We are a small team of security engineers, infrastructure architects, and
              enterprise software specialists. Detailed team profiles will be published
              as the company grows.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:support@inframiq.com"
                className="inline-flex items-center gap-1.5 h-9 px-5 rounded-md border border-white/[0.1] text-[#909090] text-[13px] font-medium hover:border-white/[0.18] hover:text-white transition-all duration-150"
              >
                support@inframiq.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
