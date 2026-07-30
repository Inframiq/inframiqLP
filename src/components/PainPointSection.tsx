"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Calculator } from "lucide-react";
import { painPoints, type PainPointCard } from "@/lib/painPoints";
import { revealContainer, revealItem } from "@/lib/motionVariants";
import { trackEvent } from "@/lib/posthog";

const HOVER_DWELL_MS = 400;

const groups = [
  { product: "mail-shield" as const, name: "Mail Shield", icon: Mail },
  { product: "simulyn" as const, name: "Simulyn", icon: Calculator },
];

function Card({ product, card, position }: { product: string; card: PainPointCard; position: number }) {
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasFiredHover = useRef(false);
  const hasFiredView = useRef(false);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      if (hasFiredHover.current) return;
      hasFiredHover.current = true;
      trackEvent("pain_point_card_hovered", { product, card: card.id, position });
    }, HOVER_DWELL_MS);
  };
  const handleMouseLeave = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };
  const handleClick = () => {
    trackEvent("pain_point_card_clicked", { product, card: card.id, position });
  };
  const handleViewportEnter = () => {
    if (hasFiredView.current) return;
    hasFiredView.current = true;
    trackEvent("pain_point_card_viewed", { product, card: card.id, position });
  };

  return (
    <motion.div
      variants={revealItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, amount: 0.6 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 cursor-default transition-colors duration-150 hover:border-[var(--accent)]/40"
    >
      <p className="text-[13.5px] text-[var(--text-1)] leading-[1.6] italic mb-4">{card.pain}</p>
      <div className="space-y-2.5 pt-4 border-t border-[var(--border)]">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--text-3)]">The cost</span>
          <p className="text-[12.5px] text-[var(--text-2)] leading-[1.6] mt-1">{card.cost}</p>
        </div>
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[var(--accent-strong)]">The fix</span>
          <p className="text-[12.5px] text-[var(--text-2)] leading-[1.6] mt-1">{card.fix}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function PainPointSection() {
  return (
    <section id="pain-points" className="relative py-24 lg:py-32 border-t border-[var(--border)]">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={revealContainer}
          className="mb-14 max-w-xl"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.08em] text-[var(--trace)] uppercase mb-4">
            Before / after
          </motion.p>
          <motion.h2 variants={revealItem} className="font-brand font-semibold text-[30px] lg:text-[36px] leading-[1.15] text-[var(--text-1)]">
            What these products actually solve.
          </motion.h2>
        </motion.div>

        <div className="space-y-14">
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.product}>
                <div className="flex items-center gap-2 mb-5">
                  <Icon size={13} className="text-[var(--accent)]" />
                  <span className="font-mono text-[11px] text-[var(--accent-strong)] uppercase tracking-[0.06em]">{group.name}</span>
                </div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  variants={revealContainer}
                  className="grid sm:grid-cols-3 gap-4"
                >
                  {painPoints[group.product].map((card, i) => (
                    <Card key={card.id} product={group.product} card={card} position={i} />
                  ))}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
