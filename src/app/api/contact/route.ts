import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
  /** Honeypot — real visitors never fill this. */
  company?: string;
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill every field; pretend it worked and drop it.
  if (payload.company) return NextResponse.json({ ok: true });

  const name = (payload.name ?? "").trim().slice(0, 120);
  const email = (payload.email ?? "").trim().slice(0, 200);
  const message = (payload.message ?? "").trim().slice(0, 5000);

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email isn't configured on this deployment yet." },
      { status: 503 },
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "info@milapmagar.com.np"],
      reply_to: email,
      subject: `Call request — ${name}`,
      text: [
        `New "book a free call" request from milapmagar.com.np`,
        ``,
        `Name:  ${name}`,
        `Email: ${email}`,
        ``,
        `Message:`,
        message,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", res.status, await res.text());
    return NextResponse.json(
      { error: "Couldn't send your message right now." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
