import { NextResponse } from "next/server";
import { Resend } from "resend";

const APPLY_EMAIL = "saucedaimarketing@gmail.com";

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

  return NextResponse.json({ ok: true });
}
