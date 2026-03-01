import { NextResponse } from "next/server";
import {
  NewsletterConfigError,
  normalizeNewsletterEmail,
  subscribeToNewsletter,
} from "@/lib/newsletter";

export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribePayload = {
  email?: unknown;
  consent?: unknown;
};

export async function POST(request: Request) {
  let payload: SubscribePayload;

  try {
    payload = (await request.json()) as SubscribePayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (payload.consent !== true) {
    return NextResponse.json({ error: "Consent is required" }, { status: 400 });
  }

  if (typeof payload.email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalizedEmail = normalizeNewsletterEmail(payload.email);
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const result = await subscribeToNewsletter(normalizedEmail);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    if (error instanceof NewsletterConfigError) {
      console.error("[newsletter] configuration error:", error.message);
      return NextResponse.json({ error: "Newsletter service is not configured" }, { status: 500 });
    }

    console.error("[newsletter] subscribe error:", error);
    return NextResponse.json({ error: "Temporary newsletter error" }, { status: 500 });
  }
}
