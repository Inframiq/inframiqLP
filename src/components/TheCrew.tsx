"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { team } from "@/lib/team";

// Deterministic 6-digit badge code from a name, so each entry looks like a
// real issued ID rather than a randomly-reshuffled number on every render.
function badgeCode(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return String((hash % 900000) + 100000);
}

// Portrait/credential-driven section — the badge is a floating physical
// object with a tilt-on-hover response, not a window in an app chrome, so
// this section reads differently from the interface-driven ones around it.
function CredentialBadge({ name, role }: { name: string; role: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  };

  return (
    <div style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative w-full max-w-[300px] rounded-xl overflow-hidden mx-auto"
        style={{
          background: "linear-gradient(160deg, var(--accent-dim), var(--surface))",
          border: "1px solid var(--border)",
          boxShadow: "0 40px 80px -28px rgba(47,111,237,0.22)",
        }}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-8">
            <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-[0.08em]">
              ID · {badgeCode(name)}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 rounded-full status-pulse" style={{ backgroundColor: "var(--success)" }} />
                <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
              </span>
              <span className="font-mono text-[8.5px] text-[var(--text-3)] uppercase">active</span>
            </span>
          </div>

          <div
            className="w-14 h-14 rounded-lg flex items-center justify-center font-brand font-semibold text-[20px] text-white mb-5"
            style={{ background: "linear-gradient(160deg, var(--accent), var(--accent-strong))" }}
          >
            {name[0]}
          </div>

          <p className="text-[16px] text-[var(--text-1)] mb-1">{name}</p>
          <p className="font-mono text-[11px] text-[var(--accent-strong)] uppercase tracking-[0.02em]">{role}</p>
        </div>
        <div className="h-px w-full bg-[var(--border)]" />
        <div className="px-6 py-3 flex items-center justify-between">
          <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wide">Inframiq</span>
          <span className="font-mono text-[9px] text-[var(--text-3)]">clearance: full</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function TheCrew() {
  const [selected, setSelected] = useState(0);
  const active = team[selected];

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-xl"
        >
          <p className="font-mono text-[11px] tracking-[0.08em] text-[var(--text-3)] uppercase mb-4">Team</p>
          <h2 className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            The people behind Inframiq.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-center">
          <motion.div
            key={active.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <CredentialBadge name={active.name} role={active.role} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-xl border border-[var(--border)] divide-y divide-[var(--border)] overflow-hidden max-h-[380px] overflow-y-auto"
            style={{ boxShadow: "0 20px 48px -30px rgba(15,23,42,0.2)" }}
          >
            {team.map((member, i) => (
              <button
                key={member.name}
                type="button"
                onClick={() => setSelected(i)}
                className={`w-full text-left px-5 py-3.5 transition-colors duration-150 ${
                  selected === i ? "bg-[var(--surface-2)]" : "bg-[var(--surface)] hover:bg-[var(--surface-2)]/60"
                }`}
              >
                <p className="text-[13px] text-[var(--text-1)] truncate">{member.name}</p>
                <p className="font-mono text-[10.5px] text-[var(--text-3)] truncate mt-0.5">{member.role}</p>
              </button>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[13px] text-[var(--text-3)] mt-8"
        >
          Backed by a growing team of 10+ engineers, designers, and specialists.
        </motion.p>
      </div>
    </section>
  );
}
