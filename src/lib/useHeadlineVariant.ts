"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { headlineGroups, type HeadlineGroupKey } from "@/lib/headlineVariants";
import { trackEvent } from "@/lib/posthog";

// Resolves which headline variant a visitor sees (?<group>=<id> in the URL,
// falling back to the control variant) and fires a single "which variant did
// this visitor see" event per mount — guarded by a ref so re-renders (e.g.
// from unrelated search param changes) don't re-fire it.
export function useHeadlineVariant(groupKey: HeadlineGroupKey) {
  const group = headlineGroups[groupKey];
  const searchParams = useSearchParams();
  const requested = searchParams.get(group.param);
  const variant = group.variants.find((v) => v.id === requested) ?? group.variants[0];

  const firedRef = useRef<string | null>(null);
  useEffect(() => {
    const fireKey = `${groupKey}:${variant.id}`;
    if (firedRef.current === fireKey) return;
    firedRef.current = fireKey;
    trackEvent("headline_variant_seen", {
      group: groupKey,
      variant: variant.id,
      angle: variant.angle,
      headline: variant.headline,
    });
  }, [groupKey, variant.id, variant.angle, variant.headline]);

  return variant;
}
