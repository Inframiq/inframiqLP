"use client";

import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ctaGroups, type CtaGroupKey } from "@/lib/ctaVariants";
import { useCtaVariant } from "@/lib/useCtaVariant";

interface CtaLinkProps {
  group: CtaGroupKey;
  className?: string;
  icon?: ReactNode;
}

function Inner({ group, className, icon }: Required<Pick<CtaLinkProps, "group">> & Pick<CtaLinkProps, "className" | "icon">) {
  const { variant, href, trackSeen, trackClick } = useCtaVariant(group);
  return (
    <motion.span className="inline-block" onViewportEnter={trackSeen} viewport={{ once: true, amount: 0.8 }}>
      <Link href={href} className={className} onClick={trackClick}>
        {variant.label}
        {icon}
      </Link>
    </motion.span>
  );
}

// Same fallback pattern as HeadlineVariant — the control variant renders
// immediately (matching what SSR/first paint already shows), only swapping
// once useSearchParams resolves a non-control ?<param>= on the client.
export default function CtaLink({ group, className = "", icon }: CtaLinkProps) {
  const fallback = ctaGroups[group].variants[0];
  return (
    <Suspense
      fallback={
        <Link href={ctaGroups[group].href} className={className}>
          {fallback.label}
          {icon}
        </Link>
      }
    >
      <Inner group={group} className={className} icon={icon} />
    </Suspense>
  );
}
