"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { team } from "@/lib/team";

// Deterministic 6-digit badge code from a name, so each entry looks like a
// real issued ID rather than a randomly-reshuffled number on every render.
function badgeCode(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return String((hash % 900000) + 100000);
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

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="window-chrome"
        >
          <div className="window-chrome-bar">
            <span className="window-chrome-dot" />
            <span className="window-chrome-dot" />
            <span className="window-chrome-dot" />
            <span className="ml-2 flex items-center gap-1.5 text-[10px] font-mono text-[var(--text-3)]">
              <Users size={11} className="text-[var(--accent)]" />
              directory — {team.length} active credentials
            </span>
          </div>

          <div className="grid sm:grid-cols-[220px_1fr]">
            {/* Roster list */}
            <div className="border-r border-[var(--border)] divide-y divide-[var(--border)] max-h-[380px] overflow-y-auto">
              {team.map((member, i) => (
                <button
                  key={member.name}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3 transition-colors duration-150 ${
                    selected === i ? "bg-[var(--surface-2)]" : "hover:bg-[var(--surface-2)]/40"
                  }`}
                >
                  <p className="text-[12.5px] text-[var(--text-1)] truncate">{member.name}</p>
                  <p className="font-mono text-[10px] text-[var(--text-3)] truncate mt-0.5">{member.role}</p>
                </button>
              ))}
            </div>

            {/* Credential detail — the visual centerpiece: a glass ID badge
                rendered from real roster data, not a photo. */}
            <div className="p-8 lg:p-10 flex items-center justify-center">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full max-w-[300px] rounded-xl overflow-hidden"
                style={{
                  background: "linear-gradient(160deg, rgba(79,141,255,0.14), rgba(255,255,255,0.02))",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "0 30px 60px -28px rgba(79,141,255,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-[0.08em]">
                      ID · {badgeCode(active.name)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <motion.span
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: "var(--success)" }}
                          animate={{ opacity: [0.6, 0, 0.6], scale: [1, 2.2, 1] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <span className="relative h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--success)" }} />
                      </span>
                      <span className="font-mono text-[8.5px] text-[var(--text-3)] uppercase">active</span>
                    </span>
                  </div>

                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center font-brand font-semibold text-[20px] text-[var(--text-1)] mb-5"
                    style={{
                      background: "linear-gradient(160deg, rgba(79,141,255,0.35), rgba(124,203,255,0.12))",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    {active.name[0]}
                  </div>

                  <p className="text-[16px] text-[var(--text-1)] mb-1">{active.name}</p>
                  <p className="font-mono text-[11px] text-[var(--accent-strong)] uppercase tracking-[0.02em]">
                    {active.role}
                  </p>
                </div>
                <div className="h-px w-full bg-[var(--glass-border)]" />
                <div className="px-6 py-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wide">Inframiq</span>
                  <span className="font-mono text-[9px] text-[var(--text-3)]">clearance: full</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[13px] text-[var(--text-3)] mt-6"
        >
          Backed by a growing team of 10+ engineers, designers, and specialists.
        </motion.p>
      </div>
    </section>
  );
}
