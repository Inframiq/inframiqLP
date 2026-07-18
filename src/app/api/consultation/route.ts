import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "support@inframiq.com";
// Resend requires the "from" address to be on a domain you've verified with them.
// Until inframiq.com is verified in the Resend dashboard, this falls back to
// their shared sandbox sender, which only delivers to the account owner's email.
const FROM_EMAIL = "Inframiq Website <onboarding@resend.dev>";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — consultation request could not be sent.");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !company || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New consultation request — ${company}`,
    text: [
      `Name: ${name}`,
      `Company: ${company}`,
      `Email: ${email}`,
      "",
      "Message:",
      message || "(none)",
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
