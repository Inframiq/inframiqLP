// Every headline below is reworded from copy that already exists elsewhere
// in this codebase (see the audit) — no new claims, stats, or angles are
// invented here. `angle` is the pain point/value angle each variant is
// anchored to, sent as an analytics property so results can be read back
// as "which angle won," not just "which string won."

export interface HeadlineVariant {
  id: "a" | "b" | "c" | "d";
  angle: string;
  headline: string;
}

export interface HeadlineGroup {
  key: string;
  /** Query param that selects a variant for this group, e.g. ?main=b */
  param: string;
  variants: readonly HeadlineVariant[];
}

export const headlineGroups = {
  main: {
    key: "main",
    param: "main",
    variants: [
      // Control — current live copy (Hero H1).
      { id: "a", angle: "product-transparency", headline: "We don't describe our software. We open it." },
      // Pulled from TheSplit's "Real people, running a real shift." + TheStandard's "Every product, built to the same standard."
      { id: "b", angle: "human-plus-engineering", headline: "Real people, running a real shift. Software built to the same standard." },
      // Pulled from the Hero subheadline itself.
      { id: "c", angle: "support-and-software-duality", headline: "24/7 support, built by the same team that engineers your security software." },
      // Verbatim from TheNumbers's heading.
      { id: "d", angle: "early-stage-credibility", headline: "An early-stage company built like it isn't." },
    ],
  },
  "mail-shield": {
    key: "mail-shield",
    param: "mail-shield",
    variants: [
      // Control — current live tagline.
      { id: "a", angle: "open-time-scanning", headline: "Scans links, attachments, and content the instant you open an email — inside Gmail." },
      // From the "ML-powered phishing and spoofing detection" feature.
      { id: "b", angle: "phishing-detection", headline: "Stop phishing and domain spoofing before they reach your team." },
      // From the "Immutable audit log for compliance" feature.
      { id: "c", angle: "compliance-audit-trail", headline: "Enterprise email security with an audit trail your compliance team will thank you for." },
      // From the "Native integration with Gmail and Google Workspace" feature.
      { id: "d", angle: "frictionless-integration", headline: "Email protection that installs into Gmail — no migration, no new inbox." },
    ],
  },
  simulyn: {
    key: "simulyn",
    param: "simulyn",
    variants: [
      // Control — current live tagline.
      { id: "a", angle: "pricing-confidence", headline: "Know your numbers before you set your price." },
      // From the product description's "margin, break-even, and growth scenarios" framing.
      { id: "b", angle: "margin-clarity", headline: "See your margin and break-even before you commit to a price." },
      // From the "no spreadsheet required" feature.
      { id: "c", angle: "speed-vs-spreadsheets", headline: "Pricing scenarios, modeled instantly — no spreadsheet required." },
      // From the "side-by-side scenario comparison for sales and finance" feature.
      { id: "d", angle: "sales-finance-alignment", headline: "Get finance and sales looking at the same pricing numbers." },
    ],
  },
  services: {
    key: "services",
    param: "services",
    variants: [
      // Control — current live H1.
      { id: "a", angle: "human-staffed-247", headline: "Your customers, answered by real people, around the clock." },
      // From "not a bot script" (live chat description).
      { id: "b", angle: "not-a-bot", headline: "Real agents. Not a bot script." },
      // From "not a shared, rotating pool" (24/7 dedicated teams description).
      { id: "c", angle: "dedicated-team", headline: "A dedicated team for your support line — not a shared, rotating pool." },
      // From "every timezone your customers are in" (24/7 dedicated teams description).
      { id: "d", angle: "timezone-coverage", headline: "24/7 coverage, every timezone your customers are in." },
    ],
  },
} as const satisfies Record<string, HeadlineGroup>;

export type HeadlineGroupKey = keyof typeof headlineGroups;
