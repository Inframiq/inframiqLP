import { NextResponse } from "next/server";
import { Resend } from "resend";

// Reuses the same Resend → inbox pipe as /api/consultation, rather than
// standing up a new destination (no CRM/webhook exists anywhere in this
// codebase — see the audit) — just a different subject/body so the two
// stay distinguishable in the inbox.
const TO_EMAIL = "support@inframiq.com";
const FROM_EMAIL = "Inframiq Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — feedback could not be sent.");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const context = typeof body?.context === "string" ? body.context.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const attention = typeof body?.attention === "string" ? body.attention.trim() : "";
  const confusion = typeof body?.confusion === "string" ? body.confusion.trim() : "";
  const intent = typeof body?.intent === "string" ? body.intent.trim() : "";
  const missing = typeof body?.missing === "string" ? body.missing.trim() : "";

  // Skippable and every question is optional — the only thing that would
  // make this submission pointless is if every field came back empty.
  if (!attention && !confusion && !intent && !missing) {
    return NextResponse.json({ error: "Empty feedback." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    ...(email ? { replyTo: email } : {}),
    subject: `Site feedback${context ? ` — ${context}` : ""}`,
    text: [
      context ? `Context: ${context}` : null,
      email ? `Email: ${email}` : null,
      "",
      `What caught your attention?\n${attention || "(skipped)"}`,
      "",
      `What confused you, if anything?\n${confusion || "(skipped)"}`,
      "",
      `Would you sign up / request a demo? Why or why not?\n${intent || "(skipped)"}`,
      "",
      `What's missing from what we offer?\n${missing || "(skipped)"}`,
    ]
      .filter((line) => line !== null)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
