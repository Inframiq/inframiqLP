// Pain-point cards per product — each one traces back to a claim already
// made elsewhere in the codebase (ProductCatalog's description/features,
// or a concrete example from mailShieldJourneys.ts), reworded into the
// customer's own voice rather than invented from scratch. See the audit.

export interface PainPointCard {
  id: string;
  /** The pain point, in the customer's own words. */
  pain: string;
  /** One-line cost of that pain. */
  cost: string;
  /** One-line fix, tied to this specific product. */
  fix: string;
}

export const painPoints: Record<"mail-shield" | "simulyn", PainPointCard[]> = {
  "mail-shield": [
    {
      id: "lookalike-domain",
      // Mirrors the "acmecorp" lookalike-domain / payroll-change journey in mailShieldJourneys.ts.
      pain: "“Someone on our team almost changed a vendor's payroll details because the email looked exactly right.”",
      cost: "One successful lookalike-domain email can redirect a real payment straight to an attacker.",
      fix: "Mail Shield flags lookalike domains and payroll-change language automatically, the moment the email is opened.",
    },
    {
      id: "detect-after-click",
      // From the tagline/description's open-time analysis of links, attachments, content.
      pain: "“We usually don't find out an email was malicious until after someone's clicked the link or opened the attachment.”",
      cost: "By the time IT gets involved, the credential theft or malware is already in motion.",
      fix: "Mail Shield scans every link, attachment, and piece of content the instant the email is opened — before a click can do harm.",
    },
    {
      id: "alert-fatigue",
      // From "ML-powered phishing and spoofing detection" + "without the noise of traditional rule-based filters".
      pain: "“Our current filters flag so much that people have started ignoring the warnings.”",
      cost: "Alert fatigue means a real phishing email gets treated the same as every false alarm — and gets opened anyway.",
      fix: "ML-powered detection targets real phishing and spoofing patterns specifically, without the noise of traditional rule-based filters.",
    },
  ],
  simulyn: [
    {
      id: "price-then-discover",
      // From the description: "understand margin, break-even, and growth scenarios before committing to a price."
      pain: "“We set a price, then spend weeks in spreadsheets figuring out if it actually makes money at scale.”",
      cost: "By the time the numbers are clear, the price is already live — and changing it means renegotiating with customers.",
      fix: "Simulyn models margin, break-even, and growth scenarios before you commit to a price, not after.",
    },
    {
      id: "sales-finance-mismatch",
      // From the "side-by-side scenario comparison for sales and finance" feature.
      pain: "“Every time sales wants to offer a discount, finance and sales end up working off two different numbers.”",
      cost: "Deals get delayed — or approved on a number nobody actually verified.",
      fix: "Side-by-side scenario comparison means sales and finance are looking at the exact same model.",
    },
    {
      id: "one-persons-spreadsheet",
      // From the "shareable, exportable reports for stakeholders" feature.
      pain: "“The pricing model lives in one person's spreadsheet, and nobody else can see how the numbers were built.”",
      cost: "Stakeholders either trust the number blindly or wait on that one person for every update.",
      fix: "Every scenario in Simulyn is shareable and exportable, so stakeholders can see exactly how the numbers were built.",
    },
  ],
};
