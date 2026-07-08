"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function InfrastructureVisual() {
  // Subtle, abstract infrastructure topology — restrained and professional
  const nodes = [
    { cx: 80, cy: 80, r: 3.5, label: "Core" },
    { cx: 220, cy: 50, r: 2.5, label: "" },
    { cx: 320, cy: 120, r: 2.5, label: "" },
    { cx: 160, cy: 170, r: 2.5, label: "" },
    { cx: 280, cy: 200, r: 3, label: "" },
    { cx: 60, cy: 200, r: 2, label: "" },
    { cx: 380, cy: 70, r: 2, label: "" },
    { cx: 400, cy: 180, r: 2.5, label: "" },
    { cx: 200, cy: 260, r: 2, label: "" },
    { cx: 340, cy: 280, r: 2, label: "" },
  ];

  const edges = [
    [0, 1], [0, 3], [0, 5],
    [1, 2], [1, 6],
    [2, 4], [2, 7],
    [3, 4], [3, 5],
    [4, 7], [4, 8], [4, 9],
    [6, 7],
    [8, 9],
  ];

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 460 320"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(91,141,239,0.4)" />
            <stop offset="100%" stopColor="rgba(91,141,239,0)" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].cx}
            y1={nodes[a].cy}
            x2={nodes[b].cx}
            y2={nodes[b].cy}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 + i * 0.06, ease: "easeOut" }}
          />
        ))}

        {/* Nodes */}
        {nodes.map((node, i) => (
          <motion.g key={i}>
            {/* Glow behind primary nodes */}
            {node.r > 3 && (
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r * 5}
                fill="url(#nodeGlow)"
                opacity={0.6}
              />
            )}
            <motion.circle
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill={node.r > 3 ? "#5b8def" : "rgba(255,255,255,0.25)"}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.07, ease: "backOut" }}
              style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
            />
          </motion.g>
        ))}

        {/* Animated data packet on one edge */}
        <motion.circle
          r="2"
          fill="#5b8def"
          opacity={0.8}
          animate={{
            offsetDistance: ["0%", "100%"],
            opacity: [0, 0.8, 0],
          }}
          style={{
            offsetPath: `path("M 80 80 L 220 50 L 320 120 L 280 200")`,
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.circle
          r="1.5"
          fill="rgba(255,255,255,0.5)"
          animate={{
            offsetDistance: ["0%", "100%"],
            opacity: [0, 0.6, 0],
          }}
          style={{
            offsetPath: `path("M 280 200 L 160 170 L 80 80")`,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />
      </svg>

      {/* Status overlay card — top right of visual */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="absolute top-4 right-0 bg-[#111111] border border-white/[0.07] rounded-lg px-4 py-3 min-w-[160px]"
      >
        <div className="flex items-center gap-2 mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
          <span className="text-[11px] text-[#6a6a6a] font-medium tracking-wide uppercase">
            Product Status
          </span>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "Mail Shield", status: "Active" },
            { label: "Simulyn", status: "Active" },
            { label: "Platform Core", status: "Active" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#6a6a6a]">{item.label}</span>
              <span className="text-[11px] text-emerald-400">{item.status}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Bottom left metric */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7, duration: 0.5 }}
        className="absolute bottom-6 left-0 bg-[#111111] border border-white/[0.07] rounded-lg px-4 py-3"
      >
        <p className="text-[11px] text-[#555] mb-1">Products Shipped</p>
        <p className="text-[22px] font-semibold text-white tracking-tight leading-none">
          2 live · 1 in build
        </p>
        <p className="text-[11px] text-emerald-400 mt-1">↑ more in development</p>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-[60px] overflow-hidden noise">
      {/* Background — subtle dot grid */}
      <div className="absolute inset-0 dot-grid opacity-100 pointer-events-none" />

      {/* Radial vignette to darken edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #0c0c0c 100%)",
        }}
      />

      {/* Mesh blob — primary, top-left */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-12%",
          width: "68%",
          height: "95%",
          background: "radial-gradient(ellipse at 42% 42%, rgba(91,141,239,0.11) 0%, rgba(91,141,239,0.03) 42%, transparent 68%)",
          filter: "blur(52px)",
        }}
      />
      {/* Mesh blob — secondary, bottom-right */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "0%",
          right: "-5%",
          width: "48%",
          height: "55%",
          background: "radial-gradient(ellipse at 58% 58%, rgba(91,141,239,0.055) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-[1] max-w-6xl mx-auto px-6 lg:px-8 w-full py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07]">
                <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
                <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">
                  Engineered End to End
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="text-[42px] sm:text-[52px] lg:text-[56px] font-semibold leading-[1.08] tracking-[-0.03em] text-[#f0f0f0] mb-6"
            >
              Intelligent products
              <br />
              for security, business,
              <br />
              <span className="text-[#7a7a7a]">and everyday life.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="text-[16px] text-[#7a7a7a] leading-[1.7] max-w-[440px] mb-10"
            >
              Inframiq engineers and delivers products directly to the people
              who rely on them — from enterprise-grade security infrastructure
              to precision-built tools for businesses and individuals alike.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md border border-white/[0.1] text-[#b0b0b0] text-[13.5px] font-medium hover:border-white/[0.18] hover:text-white transition-all duration-150"
              >
                View Products
                <ArrowRight size={13} className="opacity-60" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="hidden lg:block relative h-[380px]"
          >
            <InfrastructureVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
