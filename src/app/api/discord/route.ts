import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, message } = body;

    // 2. Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Validate email format
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 4. Format data into a single string for Discord
    const discordContent = [
      `📥 **New Contact Submission**`,
      `• **Name:** ${name}`,
      `• **Email:** ${email}`,
      `• **Message:** ${message}`,
    ].join("\n");

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: discordContent,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to send Discord message" },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}