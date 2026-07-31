"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { revealContainer, revealItem } from "@/lib/motionVariants";

export interface FaqItem {
  question: string;
  answer: string;
}

// FAQPage schema — mirrors the visible Q&A below exactly (same questions,
// same answers) rather than a separate hidden copy, so there's one source
// of truth an AI/search crawler and a human visitor both see identically.
function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function FaqRow({ item, defaultOpen }: { item: FaqItem; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[var(--border)]">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <h3 className="text-[15px] font-medium text-[var(--text-1)]">{item.question}</h3>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-[var(--text-3)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {/* Always mounted (never conditionally rendered) so the answer text is
          present in the server-rendered HTML for every question, not just
          the one open by default — search/AI crawlers read static markup,
          not post-hydration accordion state. */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="text-[13.5px] text-[var(--text-2)] leading-[1.75] pb-5 max-w-2xl">{item.answer}</p>
      </motion.div>
    </div>
  );
}

interface FaqSectionProps {
  items: FaqItem[];
  eyebrow?: string;
  heading?: string;
}

export default function FaqSection({ items, eyebrow = "FAQ", heading = "Frequently asked questions" }: FaqSectionProps) {
  return (
    <section className="py-20 border-t border-[var(--border)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }} />
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={revealContainer}
          className="mb-10"
        >
          <motion.p variants={revealItem} className="font-brand text-[13px] font-bold tracking-[0.04em] text-[var(--accent-strong)] uppercase mb-4">
            {eyebrow}
          </motion.p>
          <motion.h2 variants={revealItem} className="font-brand text-[28px] lg:text-[32px] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
            {heading}
          </motion.h2>
        </motion.div>

        <div>
          {items.map((item, i) => (
            <FaqRow key={item.question} item={item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
