// Standard template for outbound consultation/demo requests — the visitor's
// own mail client composes and sends it (mailto:), so the message always
// arrives from a real inbox rather than a transactional sender that spam
// filters distrust. Keep this in sync with support@inframiq.com being the
// one address every "request a demo" flow on the site converges on.
const SUPPORT_EMAIL = "support@inframiq.com";

interface ConsultationMailFields {
  name: string;
  company: string;
  email: string;
  message: string;
  product?: string | null;
}

export function buildConsultationMailto({ name, company, email, message, product }: ConsultationMailFields): string {
  const subject = `Consultation request — ${company}`;
  const body = [
    "Hi Inframiq team,",
    "",
    `I'd like to request a consultation${product ? ` about ${product}` : ""}.`,
    "",
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    "",
    "Message:",
    message || "(none)",
  ].join("\n");

  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
