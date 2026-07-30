"use client";

import { useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { ctaGroups, type CtaGroupKey } from "@/lib/ctaVariants";
import { trackEvent } from "@/lib/posthog";

// Resolves which CTA copy variant a visitor sees (?<param>=<id> in the URL,
// falling back to the control variant) plus tracked callbacks for the two
// events that actually matter here: did they see this CTA, and did they
// click it. Comparing seen-vs-clicked per variant is what turns this into a
// real CTR test, not just a pageview count.
export function useCtaVariant(groupKey: CtaGroupKey) {
  const group = ctaGroups[groupKey];
  const searchParams = useSearchParams();
  const requested = searchParams.get(group.param);
  const variant = group.variants.find((v) => v.id === requested) ?? group.variants[0];

  const firedSeenRef = useRef<string | null>(null);
  const trackSeen = useCallback(() => {
    const fireKey = `${groupKey}:${variant.id}`;
    if (firedSeenRef.current === fireKey) return;
    firedSeenRef.current = fireKey;
    trackEvent("cta_variant_seen", {
      group: groupKey,
      variant: variant.id,
      label: variant.label,
      commitment: variant.commitment,
    });
  }, [groupKey, variant.id, variant.label, variant.commitment]);

  const trackClick = useCallback(() => {
    trackEvent("cta_variant_clicked", {
      group: groupKey,
      variant: variant.id,
      label: variant.label,
      commitment: variant.commitment,
    });
  }, [groupKey, variant.id, variant.label, variant.commitment]);

  return { variant, href: group.href, trackSeen, trackClick };
}
