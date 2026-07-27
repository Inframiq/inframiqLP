// Sample inbound emails and their exact path through Mail Shield's
// authentication and inspection pipeline — the same five samples already
// quoted in the product catalog, given a real stage-by-stage journey instead
// of a static verdict column, so the product's actual claims (DMARC/DKIM/SPF
// enforcement, real-time content inspection, domain-reputation detection)
// are each demonstrated at the exact stage that earns them.

export type CheckpointStatus = "pass" | "fail" | "flag" | "pending";

export interface Checkpoint {
  key: string;
  label: string;
  status: CheckpointStatus;
  detail: string;
}

export interface MailJourney {
  id: string;
  from: string;
  subject: string;
  verdict: "Clean" | "Phishing" | "Spoofing" | "Suspicious";
  verdictDetail: string;
  stoppedAt: number; // index into checkpoints where the journey ends; last index if delivered
  checkpoints: Omit<Checkpoint, "status">[];
}

const STAGE_LABELS = ["SPF", "DKIM", "DMARC", "Content Inspection", "Domain Reputation"];

export const mailJourneys: MailJourney[] = [
  {
    id: "fakebank",
    from: "billing@fakebank-alerts.co",
    subject: "Verify your account now",
    verdict: "Phishing",
    verdictDetail: "Blocked before delivery — sender not authorized to send as this domain.",
    stoppedAt: 0,
    checkpoints: [
      { key: "spf", label: STAGE_LABELS[0], detail: "No valid SPF record for fakebank-alerts.co — sender not authorized." },
      { key: "dkim", label: STAGE_LABELS[1], detail: "Not evaluated — message already rejected." },
      { key: "dmarc", label: STAGE_LABELS[2], detail: "Not evaluated — message already rejected." },
      { key: "content", label: STAGE_LABELS[3], detail: "Not evaluated — message already rejected." },
      { key: "reputation", label: STAGE_LABELS[4], detail: "Not evaluated — message already rejected." },
    ],
  },
  {
    id: "partner",
    from: "quarterly@partner.io",
    subject: "Q4 summary — Finance team",
    verdict: "Clean",
    verdictDetail: "Delivered — passed every authentication and inspection stage.",
    stoppedAt: 4,
    checkpoints: [
      { key: "spf", label: STAGE_LABELS[0], detail: "Sender authorized for partner.io." },
      { key: "dkim", label: STAGE_LABELS[1], detail: "Signature valid, matches sending domain." },
      { key: "dmarc", label: STAGE_LABELS[2], detail: "Alignment passed — policy satisfied." },
      { key: "content", label: STAGE_LABELS[3], detail: "No suspicious links, patterns, or urgency language detected." },
      { key: "reputation", label: STAGE_LABELS[4], detail: "Established sender, clean history." },
    ],
  },
  {
    id: "acmecorp",
    from: "payroll@acmecorp.cc",
    subject: "Updated direct deposit info",
    verdict: "Spoofing",
    verdictDetail: "Quarantined — domain closely mimics a known partner domain.",
    stoppedAt: 4,
    checkpoints: [
      { key: "spf", label: STAGE_LABELS[0], detail: "Sender authorized for acmecorp.cc." },
      { key: "dkim", label: STAGE_LABELS[1], detail: "Signature valid for acmecorp.cc." },
      { key: "dmarc", label: STAGE_LABELS[2], detail: "Alignment passed for acmecorp.cc." },
      { key: "content", label: STAGE_LABELS[3], detail: "Payroll-change request flagged for elevated review." },
      { key: "reputation", label: STAGE_LABELS[4], detail: "acmecorp.cc closely mimics acmecorp.com — lookalike domain flagged." },
    ],
  },
  {
    id: "yourco",
    from: "it-support@yourco.com.ru",
    subject: "Urgent: password reset",
    verdict: "Phishing",
    verdictDetail: "Blocked before delivery — signature failed validation.",
    stoppedAt: 1,
    checkpoints: [
      { key: "spf", label: STAGE_LABELS[0], detail: "Sender authorized for yourco.com.ru." },
      { key: "dkim", label: STAGE_LABELS[1], detail: "Signature invalid — does not match sending domain." },
      { key: "dmarc", label: STAGE_LABELS[2], detail: "Not evaluated — message already rejected." },
      { key: "content", label: STAGE_LABELS[3], detail: "Not evaluated — message already rejected." },
      { key: "reputation", label: STAGE_LABELS[4], detail: "Not evaluated — message already rejected." },
    ],
  },
  {
    id: "docusign",
    from: "no-reply@docusign-verify.net",
    subject: "Sign document by today",
    verdict: "Suspicious",
    verdictDetail: "Quarantined for review — urgency pattern detected in content.",
    stoppedAt: 3,
    checkpoints: [
      { key: "spf", label: STAGE_LABELS[0], detail: "Sender authorized for docusign-verify.net." },
      { key: "dkim", label: STAGE_LABELS[1], detail: "Signature valid for docusign-verify.net." },
      { key: "dmarc", label: STAGE_LABELS[2], detail: "Alignment passed for docusign-verify.net." },
      { key: "content", label: STAGE_LABELS[3], detail: "Time-pressure language and lookalike branding flagged." },
      { key: "reputation", label: STAGE_LABELS[4], detail: "Not evaluated — held for review at content stage." },
    ],
  },
];
