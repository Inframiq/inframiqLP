"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "99.9%", label: "Platform uptime SLA", sub: "Guaranteed availability" },
  { value: "1.2M+", label: "Threats blocked monthly", sub: "Across all clients" },
  { value: "<5 min", label: "Mean time to detect", sub: "Industry avg: 24 hrs" },
  { value: "500+", label: "Enterprise deployments", sub: "Across 40 countries" },
];

const certifications = [
  { name: "SOC 2 Type II", description: "Annual third-party audit" },
  { name: "ISO 27001", description: "Information security standard" },
  { name: "GDPR Compliant", description: "EU data protection" },
  { name: "FedRAMP Ready", description: "US federal cloud standard" },
  { name: "HIPAA", description: "Healthcare data security" },
  { name: "PCI DSS", description: "Payment card security" },
];

const clientTypes = [
  "Financial Services",
  "Healthcare",
  "Government & Defense",
  "Critical Infrastructure",
  "Technology",
  "Legal & Professional Services",
];

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, delay: i * 0.06 },
  }),
};

export default function TrustSection() {
  return (
    <section id="about" className="py-28 border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-xl"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
            <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
            <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Trust, By Design</span>
          </div>
          <h2 className="text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f0f0f0] mb-5">
            Trust that scales
            <br />
            <span className="text-[#606060]">from enterprise to everyday.</span>
          </h2>
          <p className="text-[15px] text-[#7a7a7a] leading-[1.75]">
            Whether it&apos;s an enterprise security platform or a tool someone
            reaches for every day, Inframiq engineers with the same discipline —
            reliable, secure, and held to a standard regulated industries depend on.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05] rounded-xl overflow-hidden border border-white/[0.05] mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-[#0c0c0c] px-7 py-8"
            >
              <p className="text-[34px] font-semibold tracking-tight leading-none mb-2 bg-gradient-to-b from-[#ffffff] to-[#7a7a7a] bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-[13px] text-[#909090] mb-1">{stat.label}</p>
              <p className="text-[12px] text-[#454545]">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Two columns: Certs + Client types */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-6"
          >
            <p className="text-[12px] font-medium text-[#505050] uppercase tracking-[0.12em] mb-5">
              Compliance &amp; Certifications
            </p>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-start gap-2.5 p-3 rounded-lg border border-white/[0.05] bg-white/[0.015]"
                >
                  <div className="w-1 h-1 rounded-full bg-[#5b8def] mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-[12.5px] font-medium text-[#c8c8c8]">{cert.name}</p>
                    <p className="text-[11px] text-[#505050]">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Industries served */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-white/[0.06] bg-[#0f0f0f] p-6"
          >
            <p className="text-[12px] font-medium text-[#505050] uppercase tracking-[0.12em] mb-5">
              Industries We Serve
            </p>
            <div className="space-y-2.5">
              {clientTypes.map((type, i) => (
                <motion.div
                  key={type}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="flex items-center gap-3 py-2.5 border-b border-white/[0.04] last:border-0"
                >
                  <div className="w-5 h-5 rounded bg-white/[0.04] border border-white/[0.06] flex-shrink-0" />
                  <span className="text-[13.5px] text-[#888]">{type}</span>
                </motion.div>
              ))}
            </div>

            {/* Placeholder for client logos */}
            <div className="mt-5 pt-5 border-t border-white/[0.05]">
              <p className="text-[11px] text-[#404040] mb-3">Our clients</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-7 w-20 rounded border border-white/[0.05] bg-white/[0.02] flex items-center justify-center"
                  >
                    <span className="text-[9px] text-[#333] font-medium uppercase tracking-wider">
                      Client
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
