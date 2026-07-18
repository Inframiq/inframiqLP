"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Target } from "lucide-react";

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
    title: "Minimal, focused products",
    description:
      "We build lean, focused products — one problem, solved well. Every additional feature or dependency is a liability we consciously choose to accept or decline.",
  },
  {
    title: "Long-term thinking",
    description:
      "The organizations that need us most are the ones that cannot afford to switch vendors every three years. We build for longevity, not acquisition.",
  },
];

const team = [
  { name: "Bhargav.U", role: "Founder" },
  { name: "Bharath.K", role: "Co-Founder" },
  { name: "Jaswanth Kongara", role: "Global Client Management Lead" },
  { name: "Kundrapu Tanishq", role: "Technical Head" },
];

const timeline = [
  { year: "Founded", event: "Inframiq established with a focus on building intelligent, well-engineered products." },
  { year: "First Product", event: "Mail Shield launched — addressing phishing and domain impersonation at scale." },
  { year: "Today", event: "Expanding into a growing portfolio of products — spanning enterprise security to everyday life — engineered with the same uncompromising rigor." },
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
              Built for people
              <br />
              <span className="text-[#5a5a5a]">who expect things to just work.</span>
            </h1>

            <p className="text-[16px] text-[#6a6a6a] leading-[1.8] max-w-xl">
              Inframiq engineers intelligent software with uncompromising
              precision — from enterprise-grade security infrastructure to the
              refined, everyday tools businesses and individuals rely on.
              Different products. One exacting standard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                eyebrow: "Vision",
                icon: Eye,
                text: "To become a globally trusted technology and business operations partner, empowering organizations through innovative digital products, intelligent customer support, and reliable operational excellence that drives long-term business growth.",
              },
              {
                eyebrow: "Mission",
                icon: Target,
                text: "Our mission is to build innovative digital products while helping businesses deliver exceptional customer experiences through reliable voice and chat support solutions. We partner with organizations to simplify operations, enhance customer satisfaction, and enable sustainable growth through technology, skilled professionals, and operational excellence.",
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.eyebrow}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  variants={fadeUp}
                  className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#111111] to-[#0c0c0c] p-8 lg:p-10 overflow-hidden hover:border-[#5b8def]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(91,141,239,0.35)]"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: "radial-gradient(160px 100px at 15% 0%, rgba(91,141,239,0.1), transparent 70%)",
                    }}
                  />
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#5b8def]/20 to-[#5b8def]/5 border border-[#5b8def]/25 flex items-center justify-center mb-6">
                    <Icon size={18} className="text-[#5b8def]" strokeWidth={1.75} />
                  </div>
                  <p className="relative text-[11px] text-[#5b8def] font-medium tracking-[0.14em] uppercase mb-4">
                    {card.eyebrow}
                  </p>
                  <p className="relative text-[14.5px] text-[#8a8a8a] leading-[1.85]">{card.text}</p>
                </motion.div>
              );
            })}
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
                Inframiq is an early-stage company with a clear and deliberate roadmap.
                We build with precision — one product, perfected, before the next.
                Mail Shield addresses one of the most prevalent enterprise attack vectors,
                and Simulyn is next, bringing the same rigor to business pricing decisions.
                Several more products, spanning security, business, and everyday life, are
                already in active development.
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

      {/* Team */}
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
              <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Team</span>
            </div>
            <h2 className="text-[30px] font-semibold tracking-[-0.02em] text-[#e8e8e8] mb-3">
              The people behind Inframiq
            </h2>
            <p className="text-[14px] text-[#626262] leading-[1.8] max-w-xl">
              The leadership guiding Inframiq's product and engineering direction.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-[#111111] to-[#0c0c0c] p-7 overflow-hidden hover:border-[#5b8def]/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(91,141,239,0.35)]"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: "radial-gradient(120px 80px at 20% 0%, rgba(91,141,239,0.1), transparent 70%)",
                  }}
                />
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#5b8def]/20 to-[#5b8def]/5 border border-[#5b8def]/25 flex items-center justify-center mb-5">
                  <span className="text-[15px] font-semibold text-[#8fb2f4]">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="relative text-[15.5px] font-medium text-[#e8e8e8] mb-1.5 tracking-[-0.01em]">
                  {member.name}
                </h3>
                <p className="relative text-[12.5px] text-[#5b8def]/80 font-medium tracking-[0.02em] uppercase">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 rounded-2xl border border-white/[0.06] bg-[#0f0f0f] px-7 py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex -space-x-3 flex-shrink-0">
              {["#5b8def", "#8a5bef", "#5bef9e", "#efb85b"].map((color, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-[#0f0f0f]"
                  style={{ backgroundColor: `${color}26` }}
                />
              ))}
              <div className="w-9 h-9 rounded-full border-2 border-[#0f0f0f] bg-white/[0.06] flex items-center justify-center">
                <span className="text-[10.5px] font-semibold text-[#a0a0a0]">10+</span>
              </div>
            </div>
            <p className="text-[13.5px] text-[#727272] leading-relaxed">
              Backed by a growing team of <span className="text-[#c0c0c0] font-medium">10+ engineers, designers, and specialists</span> working
              across our product portfolio.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href="mailto:support@inframiq.com"
              className="inline-flex items-center gap-1.5 h-9 px-5 rounded-md border border-white/[0.1] text-[#909090] text-[13px] font-medium hover:border-white/[0.18] hover:text-white transition-all duration-150"
            >
              support@inframiq.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
