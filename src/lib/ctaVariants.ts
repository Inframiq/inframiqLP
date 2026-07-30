// CTA copy variants, per group. Every group's *destination* stays exactly
// what it is today — the demo/consultation form is the only conversion path
// anywhere in this codebase (no self-serve signup, checkout, or free trial
// exists) — so only the label's commitment-level framing varies, never the
// underlying claim. "Start free" / "Sign up" style copy is deliberately
// excluded for that reason: it would imply a self-serve flow that doesn't
// exist yet.

export interface CtaVariant {
  id: "a" | "b" | "c" | "d";
  commitment: "low" | "medium" | "high";
  label: string;
}

export interface CtaGroup {
  key: string;
  /** Query param that selects a variant for this group, e.g. ?cta-main=b */
  param: string;
  href: string;
  variants: readonly CtaVariant[];
}

export const ctaGroups = {
  main: {
    key: "main",
    param: "cta-main",
    href: "/#demo",
    variants: [
      { id: "a", commitment: "medium", label: "Request a Demo" }, // control
      { id: "b", commitment: "high", label: "Talk to Sales" },
      { id: "c", commitment: "medium", label: "Get a Quote" },
      { id: "d", commitment: "low", label: "See How It Works" },
    ],
  },
  "mail-shield": {
    key: "mail-shield",
    param: "cta-mail-shield",
    href: "/?product=Mail%20Shield#demo",
    variants: [
      { id: "a", commitment: "medium", label: "Request a Demo" }, // control
      { id: "b", commitment: "high", label: "Talk to Sales" },
      { id: "c", commitment: "medium", label: "Get a Quote" },
      { id: "d", commitment: "low", label: "See It in Action" },
    ],
  },
  simulyn: {
    key: "simulyn",
    param: "cta-simulyn",
    href: "/?product=Simulyn#demo",
    variants: [
      { id: "a", commitment: "medium", label: "Request a Demo" }, // control
      { id: "b", commitment: "high", label: "Talk to Sales" },
      { id: "c", commitment: "medium", label: "Get a Quote" },
      // Grounded in something actually true: the pricing simulator on this
      // page is already live and interactive, no signup required.
      { id: "d", commitment: "low", label: "Explore the Simulator" },
    ],
  },
  services: {
    key: "services",
    param: "cta-services",
    href: "/#demo",
    variants: [
      { id: "a", commitment: "medium", label: "Get in Touch" }, // control
      { id: "b", commitment: "high", label: "Talk to Sales" },
      { id: "c", commitment: "medium", label: "Get a Quote" },
      // Pulled from this section's own copy: "we'll tell you honestly what
      // coverage you need and whether we're the right fit."
      { id: "d", commitment: "low", label: "See If We're a Fit" },
    ],
  },
} as const satisfies Record<string, CtaGroup>;

export type CtaGroupKey = keyof typeof ctaGroups;
