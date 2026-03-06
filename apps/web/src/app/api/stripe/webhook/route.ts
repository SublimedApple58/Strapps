import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
import { generateAccessToken, TTL_30_MIN, TTL_30_DAYS } from "@/lib/access-token";
import {
  buildAccessoConfirmationTemplate,
  buildEstendiConfirmationTemplate,
  buildAcquistoConfirmationTemplate,
} from "@/lib/payment-email-templates";

export const runtime = "nodejs";

const TIER_LABEL: Record<string, string> = {
  first: "FIRST 60",
  early: "EARLY 140",
  last: "LAST 90",
};

const TIER_PRICE: Record<string, string> = {
  first: "189,99€",
  early: "219,99€",
  last: "239,99€",
};

async function sendEmail(
  email: string,
  subject: string,
  html: string,
  text: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[webhook] RESEND_API_KEY non configurata, email non inviata");
    return;
  }
  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: "STRAPPS <support@strapps.it>",
    to: email,
    subject,
    html,
    text,
  });
  if (result.error) {
    console.error("[webhook] errore invio email:", result.error);
  }
}

function productUrl(baseUrl: string, tier: string, email: string, ttlMs: number): string {
  const token = generateAccessToken(email, tier, ttlMs);
  return `${baseUrl}/prodotto/${tier}?t=${encodeURIComponent(token)}`;
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[webhook] firma non valida:", message);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;
  const meta = session.metadata ?? {};
  const email = (meta.email ?? session.customer_email ?? "").toLowerCase().trim();
  const type = meta.type as "accesso" | "acquisto" | "estendi" | undefined;
  const tier = meta.tier ?? "";
  const tierLabel = TIER_LABEL[tier] ?? tier.toUpperCase();
  const tierPrice = TIER_PRICE[tier] ?? "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.strapps.it";

  if (!email || !type || !tier) {
    console.warn("[webhook] metadata incompleta:", meta);
    return NextResponse.json({ received: true });
  }

  // ── Metadata comune per reportistica backoffice ──────────────────────────
  const commonMeta: Record<string, string> = {
    [`${type}_${tier}_paid_at`]: new Date().toISOString(),
    [`${type}_${tier}_session_id`]: session.id,
    [`${type}_${tier}_amount_cents`]: String(session.amount_total ?? 0),
  };

  try {
    const existing = await stripe.customers.search({
      query: `email:"${email}"`,
      limit: 1,
    });

    let specificMeta: Record<string, string> = { ...commonMeta };

    if (type === "acquisto") {
      specificMeta = {
        ...specificMeta,
        [`acquisto_${tier}_scarpa`]: meta.scarpa ?? "",
        [`acquisto_${tier}_strappo`]: meta.strappo ?? "",
        [`acquisto_${tier}_taglia`]: meta.taglia ?? "",
      };
    } else if (type === "estendi") {
      const until = new Date(Date.now() + TTL_30_DAYS);
      specificMeta = {
        ...specificMeta,
        [`estendi_${tier}_until`]: until.toISOString(),
      };
    }

    if (existing.data.length > 0) {
      await stripe.customers.update(existing.data[0].id, { metadata: specificMeta });
    } else {
      await stripe.customers.create({ email, metadata: specificMeta });
    }

    // ── Email contestuale ──────────────────────────────────────────────────
    if (type === "accesso") {
      const expiresAt = new Date(Date.now() + TTL_30_MIN);
      const url = productUrl(baseUrl, tier, email, TTL_30_MIN);
      const tpl = buildAccessoConfirmationTemplate({
        tier: tierLabel,
        price: tierPrice,
        productUrl: url,
        expiresAt,
      });
      await sendEmail(email, tpl.subject, tpl.html, tpl.text);

    } else if (type === "acquisto") {
      const tpl = buildAcquistoConfirmationTemplate({
        tier: tierLabel,
        price: tierPrice,
        scarpa: meta.scarpa ?? "",
        strappo: meta.strappo ?? "",
        taglia: meta.taglia ?? "",
      });
      await sendEmail(email, tpl.subject, tpl.html, tpl.text);

    } else if (type === "estendi") {
      const expiresAt = new Date(Date.now() + TTL_30_DAYS);
      const url = productUrl(baseUrl, tier, email, TTL_30_DAYS);
      const tpl = buildEstendiConfirmationTemplate({
        tier: tierLabel,
        price: tierPrice,
        productUrl: url,
        expiresAt,
      });
      await sendEmail(email, tpl.subject, tpl.html, tpl.text);
    }
  } catch (err) {
    console.error("[webhook] errore elaborazione:", err);
  }

  return NextResponse.json({ received: true });
}
