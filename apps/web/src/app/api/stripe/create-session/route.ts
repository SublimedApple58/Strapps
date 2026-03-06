import { NextResponse } from "next/server";
import { createCheckoutSession, type SessionParams } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const params = body as SessionParams;

  if (!params.type || !params.email || !params.tier) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!EMAIL_REGEX.test(params.email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const url = await createCheckoutSession(params);
    return NextResponse.json({ url });
  } catch (error) {
    console.error("[stripe] create-session error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
