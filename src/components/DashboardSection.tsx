"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Activity, Shield, AlertCircle, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";

// Realistic event log data
const eventLog = [
  { id: "EVT-8821", time: "14:42:07", source: "192.168.1.44", type: "Phishing attempt", severity: "High", status: "Blocked" },
  { id: "EVT-8820", time: "14:41:33", source: "10.0.0.112", type: "Outbound anomaly", severity: "Medium", status: "Flagged" },
  { id: "EVT-8819", time: "14:40:58", source: "172.16.8.3", type: "Auth failure", severity: "Low", status: "Logged" },
  { id: "EVT-8818", time: "14:39:21", source: "10.0.0.88", type: "Policy violation", severity: "Medium", status: "Blocked" },
  { id: "EVT-8817", time: "14:38:09", source: "192.168.2.7", type: "Suspicious login", severity: "High", status: "Flagged" },
  { id: "EVT-8816", time: "14:36:54", source: "10.0.0.55", type: "Config change", severity: "Low", status: "Logged" },
];

const severityStyle: Record<string, string> = {
  High: "text-red-400",
  Medium: "text-amber-400",
  Low: "text-[#6a6a6a]",
};

const statusStyle: Record<string, string> = {
  Blocked: "bg-red-500/10 text-red-400 border-red-500/20",
  Flagged: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Logged: "bg-white/[0.04] text-[#6a6a6a] border-white/[0.07]",
};

// Sparkline chart data
const chartData = [18, 24, 16, 32, 28, 42, 35, 29, 48, 38, 52, 44, 39, 55, 47, 60, 51, 45, 58, 62, 50, 43, 56, 48];

function Sparkline({ data, containerRef }: { data: number[]; containerRef: React.RefObject<HTMLDivElement | null> }) {
  const isInView = useInView(containerRef, { once: true });
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 100 / (data.length - 1);

  const points = data
    .map((v, i) => `${i * w},${100 - ((v - min) / range) * 80 - 10}`)
    .join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(91,141,239,0.18)" />
          <stop offset="100%" stopColor="rgba(91,141,239,0)" />
        </linearGradient>
        <clipPath id="areaClip">
          <motion.rect
            x="0" y="0" width="100" height="100"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            style={{ transformOrigin: "0 0" }}
          />
        </clipPath>
      </defs>
      <polygon points={areaPoints} fill="url(#areaGrad)" clipPath="url(#areaClip)" />
      <motion.polyline
        points={points}
        fill="none"
        stroke="#5b8def"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
      />
    </svg>
  );
}

const kpis = [
  { label: "Events (24h)", value: "14,822", delta: "+312", up: true, icon: Activity },
  { label: "Threats Blocked", value: "1,247", delta: "+28", up: true, icon: Shield },
  { label: "Open Alerts", value: "3", delta: "-5", up: false, icon: AlertCircle },
  { label: "Systems Healthy", value: "99.8%", delta: "+0.1%", up: true, icon: CheckCircle2 },
];

export default function DashboardSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [tick, setTick] = useState(0);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 border-t border-white/[0.05]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#5b8def]/25 bg-[#5b8def]/[0.07] mb-4">
            <span className="w-1 h-1 rounded-full bg-[#5b8def]" />
            <span className="text-[11px] text-[#5b8def] font-medium tracking-[0.12em] uppercase">Platform</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <h2 className="text-[36px] lg:text-[42px] font-semibold leading-[1.1] tracking-[-0.025em] text-[#f0f0f0]">
              Security operations,
              <br />
              <span className="text-[#606060]">in a single pane of glass.</span>
            </h2>
            <p className="text-[15px] text-[#7a7a7a] leading-[1.75] max-w-lg">
              The Inframiq Command Center gives your security team unified visibility
              into threats, infrastructure health, and policy enforcement — without
              the noise of traditional SIEM tools.
            </p>
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="rounded-xl border border-white/[0.07] bg-[#0f0f0f] overflow-hidden noise"
          style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-[#0d0d0d]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            </div>
            <div className="flex items-center gap-2 bg-white/[0.04] rounded px-3 py-1 min-w-0 mx-3">
              <span className="text-[11px] font-mono text-[#4a4a4a] truncate">
                <span className="hidden sm:inline">command.inframiq.io — </span>Security Operations
              </span>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
              <span className="text-[10px] text-[#4a4a4a] font-medium uppercase tracking-wide">Live</span>
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Left: KPI cards + chart */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              {/* KPI grid */}
              <div className="grid grid-cols-2 gap-2">
                {kpis.map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <motion.div
                      key={kpi.label}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="bg-[#0d0d0d] border border-white/[0.05] rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-[#555] font-medium uppercase tracking-wider">
                          {kpi.label}
                        </span>
                        <Icon size={11} className="text-[#444]" />
                      </div>
                      <p className="text-[18px] font-semibold text-[#e8e8e8] leading-none tracking-tight mb-1">
                        {kpi.value}
                      </p>
                      <div className="flex items-center gap-0.5">
                        {kpi.up ? (
                          <ChevronUp size={10} className="text-emerald-400" />
                        ) : (
                          <ChevronDown size={10} className="text-emerald-400" />
                        )}
                        <span className="text-[10px] text-emerald-400">{kpi.delta}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Threat volume chart */}
              <div className="bg-[#0d0d0d] border border-white/[0.05] rounded-lg p-3 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-[#555] font-medium">Event volume — 24h</span>
                  <span className="text-[10px] text-[#444] font-mono">per hour</span>
                </div>
                <div ref={chartRef} className="h-24">
                  <Sparkline data={chartData} containerRef={chartRef} />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-[#404040] font-mono">00:00</span>
                  <span className="text-[9px] text-[#404040] font-mono">12:00</span>
                  <span className="text-[9px] text-[#404040] font-mono">Now</span>
                </div>
              </div>
            </div>

            {/* Right: Event log table */}
            <div className="lg:col-span-2 bg-[#0d0d0d] border border-white/[0.05] rounded-lg overflow-hidden">
              {/* Table header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.05]">
                <span className="text-[11px] font-medium text-[#6a6a6a] uppercase tracking-wider">
                  Security Event Log
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#444] font-mono">AUTO-REFRESH</span>
                  <span className="w-1 h-1 rounded-full bg-emerald-400 status-pulse" />
                </div>
              </div>

              {/* Desktop table — hidden on mobile */}
              <div className="hidden lg:block">
                <div className="grid grid-cols-[80px_100px_110px_1fr_70px_72px] px-4 py-2 border-b border-white/[0.04]">
                  {["Event ID", "Time", "Source IP", "Type", "Severity", "Status"].map((h) => (
                    <span key={h} className="text-[10px] font-medium text-[#444] uppercase tracking-wider">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="divide-y divide-white/[0.03]">
                  {eventLog.map((evt, i) => (
                    <motion.div
                      key={evt.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.07 }}
                      className="grid grid-cols-[80px_100px_110px_1fr_70px_72px] px-4 py-2.5 hover:bg-white/[0.015] transition-colors duration-100"
                    >
                      <span className="text-[11px] font-mono text-[#555]">{evt.id}</span>
                      <span className="text-[11px] font-mono text-[#555]">{evt.time}</span>
                      <span className="text-[11px] font-mono text-[#666]">{evt.source}</span>
                      <span className="text-[11px] text-[#8a8a8a] pr-2 truncate">{evt.type}</span>
                      <span className={`text-[11px] font-medium ${severityStyle[evt.severity]}`}>{evt.severity}</span>
                      <span>
                        <span className={`inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded border ${statusStyle[evt.status]}`}>
                          {evt.status}
                        </span>
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Mobile event list — hidden on desktop */}
              <div className="lg:hidden divide-y divide-white/[0.03]">
                {eventLog.map((evt, i) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.07 }}
                    className="px-4 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-[12px] text-[#8a8a8a] truncate">{evt.type}</p>
                      <p className="text-[10px] font-mono text-[#505050] mt-0.5">{evt.source} · {evt.time}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[10px] font-medium ${severityStyle[evt.severity]}`}>{evt.severity}</span>
                      <span className={`inline-flex text-[10px] font-medium px-1.5 py-0.5 rounded border ${statusStyle[evt.status]}`}>
                        {evt.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2.5 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-[10px] text-[#404040] font-mono">
                  Showing 6 of 14,822 events today
                </span>
                <button className="text-[10px] text-[#5b8def] hover:text-[#7aaaf7] transition-colors">
                  View all events →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
