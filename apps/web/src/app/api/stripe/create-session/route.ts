import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createCheckoutSession, type SessionParams } from "@/lib/stripe";
import { sendCAPIEvent, sha256 } from "@/lib/meta-capi";

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

    // ── Meta CAPI — InitiateCheckout ─────────────────────────────────────
    const reqHeaders = await headers();
    const ip = reqHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const userAgent = reqHeaders.get("user-agent") ?? "";
    const eventId = `checkout_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    await sendCAPIEvent([{
      event_name: "InitiateCheckout",
      event_id: eventId,
      event_time: Math.floor(Date.now() / 1000),
      action_source: "website",
      user_data: {
        em: sha256(params.email),
        client_ip_address: ip || undefined,
        client_user_agent: userAgent || undefined,
      },
    }]);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[stripe] create-session error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
