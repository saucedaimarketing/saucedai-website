import { NextResponse } from "next/server";
import { Resend } from "resend";

const APPLY_EMAIL = "saucedaimarketing@gmail.com";
const SENDER = "Sauced <hello@saucedai.io>";

function welcomeEmailText(name: string, restaurant: string): string {
  const firstName = name.trim().split(/\s+/)[0] || name;
  return [
    `Hi ${firstName},`,
    "",
    `Thanks for telling us about ${restaurant} — we're excited to take a look.`,
    "",
    "Quick recap of what Sauced actually does: we research your restaurant, your market, and your customers, then hand you a full month of shoot-ready video scripts, a posting calendar, and a paid-ads plan — built specifically for your food, not a generic template.",
    "",
    "Next step is a quick call over Zoom, about 20-30 minutes. On that call we'll walk you through:",
    "- What we actually build for you, using a real example",
    "- How pricing works, month to month",
    "- Exactly what you'd get in your first month",
    "",
    "No pressure, no pitch deck — just a straight look at whether this is a fit.",
    "",
    "Reply to this email with a couple times that work for you this week, and we'll send a Zoom link.",
    "",
    "Talk soon,",
    "Sauced",
  ].join("\n");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { restaurant, name, email, phone, about } = body as {
    restaurant?: string;
    name?: string;
    email?: string;
    phone?: string;
    about?: string;
  };

  if (!restaurant || !name || !email || !about) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  // Team notification — the actual lead capture. If this fails, the
  // application itself has failed, so this error is not swallowed.
  const { error } = await resend.emails.send({
    from: "Sauced Apply Form <onboarding@resend.dev>",
    to: APPLY_EMAIL,
    replyTo: email,
    subject: `Sauced application — ${restaurant}`,
    text: [
      `Restaurant name: ${restaurant}`,
      `Your name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "—"}`,
      "",
      "About the restaurant:",
      about,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend send failed:", error);
    return NextResponse.json(
      { error: "Failed to send application." },
      { status: 502 }
    );
  }

  // Applicant-facing welcome email — best effort. A failure here means the
  // owner doesn't get the welcome note yet, but the application itself was
  // already captured above, so this shouldn't fail the whole request.
  try {
    const { error: welcomeError } = await resend.emails.send({
      from: SENDER,
      to: email,
      replyTo: APPLY_EMAIL,
      subject: "Thanks for applying to Sauced — let's find time to talk",
      text: welcomeEmailText(name, restaurant),
    });
    if (welcomeError) {
      console.error("Welcome email failed:", welcomeError);
    }
  } catch (e) {
    console.error("Welcome email threw:", e);
  }

  return NextResponse.json({ ok: true });
}
