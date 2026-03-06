import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("[stripe] STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2025-02-24.acacia",
});

// ── Payment types ──────────────────────────────────────────────────────────

export type StripePaymentType = "accesso" | "acquisto" | "estendi";

export interface AccessoSessionParams {
  type: "accesso";
  tier: "first" | "early" | "last";
  email: string;
  cancelPath: string;
}

export interface AcquistoSessionParams {
  type: "acquisto";
  tier: "first" | "early" | "last";
  email: string;
  scarpa: string;
  strappo: string;
  taglia: string;
  cancelPath: string;
}

export interface EstendiSessionParams {
  type: "estendi";
  tier: "first" | "early" | "last";
  email: string;
  cancelPath: string;
}

export type SessionParams = AccessoSessionParams | AcquistoSessionParams | EstendiSessionParams;

// ── Price map (in cents) ───────────────────────────────────────────────────

const ACCESSO_PRICE = 100; // 1,00€

const ACQUISTO_PRICE: Record<string, number> = {
  first: 18999,  // 189,99€
  early: 21999,  // 219,99€
  last: 23999,   // 239,99€
};

const ESTENDI_PRICE = 4900; // 49,00€

// ── Tier labels ────────────────────────────────────────────────────────────

const TIER_LABEL: Record<string, string> = {
  first: "FIRST 60",
  early: "EARLY 140",
  last: "LAST 90",
};

// ── Create checkout session ────────────────────────────────────────────────

export async function createCheckoutSession(params: SessionParams): Promise<string> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.strapps.it";

  let lineItem: Stripe.Checkout.SessionCreateParams.LineItem;
  let metadata: Record<string, string>;

  if (params.type === "accesso") {
    lineItem = {
      price_data: {
        currency: "eur",
        unit_amount: ACCESSO_PRICE,
        product_data: {
          name: `Accesso Drop ${TIER_LABEL[params.tier]}`,
          description: `Ticket ${TIER_LABEL[params.tier]} — STRAPPS`,
        },
      },
      quantity: 1,
    };
    metadata = {
      type: "accesso",
      tier: params.tier,
      email: params.email,
    };
  } else if (params.type === "acquisto") {
    lineItem = {
      price_data: {
        currency: "eur",
        unit_amount: ACQUISTO_PRICE[params.tier] ?? 18999,
        product_data: {
          name: "STRAPPS V1",
          description: `${TIER_LABEL[params.tier]} — Scarpa: ${params.scarpa}, Strappo: ${params.strappo}, Taglia: ${params.taglia}`,
        },
      },
      quantity: 1,
    };
    metadata = {
      type: "acquisto",
      tier: params.tier,
      email: params.email,
      scarpa: params.scarpa,
      strappo: params.strappo,
      taglia: params.taglia,
    };
  } else {
    lineItem = {
      price_data: {
        currency: "eur",
        unit_amount: ESTENDI_PRICE,
        product_data: {
          name: `Estendi Accesso ${TIER_LABEL[params.tier]}`,
          description: `Estende l'accesso al drop ${TIER_LABEL[params.tier]} di 30 giorni — scalato dal saldo finale`,
        },
      },
      quantity: 1,
    };
    metadata = {
      type: "estendi",
      tier: params.tier,
      email: params.email,
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: params.email,
    line_items: [lineItem],
    metadata,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}${params.cancelPath}`,
  });

  return session.url!;
}
