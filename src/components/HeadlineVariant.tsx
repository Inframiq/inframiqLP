"use client";

import { Suspense } from "react";
import KineticText from "@/components/animations/KineticText";
import { headlineGroups, type HeadlineGroupKey } from "@/lib/headlineVariants";
import { useHeadlineVariant } from "@/lib/useHeadlineVariant";

interface HeadlineVariantProps {
  group: HeadlineGroupKey;
  as?: "h1" | "h2" | "h3" | "span";
  className?: string;
  play?: boolean;
}

function Inner({ group, as, className, play }: Required<HeadlineVariantProps>) {
  const variant = useHeadlineVariant(group);
  return <KineticText as={as} text={variant.headline} className={className} play={play} />;
}

// The fallback renders the control (variant "a") copy — identical to what
// Inner would render for a visitor with no ?<group>= param — so there's no
// blank flash while useSearchParams resolves after hydration, only a swap
// on the rare request that asks for a non-control variant.
export default function HeadlineVariant({ group, as = "span", className = "", play = true }: HeadlineVariantProps) {
  const fallbackText = headlineGroups[group].variants[0].headline;
  return (
    <Suspense fallback={<KineticText as={as} text={fallbackText} className={className} play={play} />}>
      <Inner group={group} as={as} className={className} play={play} />
    </Suspense>
  );
}
