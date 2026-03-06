import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { Resend } from "resend";

export const runtime = "nodejs";

const TIER_LABEL: Record<string, string> = {
  first: "FIRST 60",
  early: "EARLY 140",
  last: "LAST 90",
};

async function sendPaymentConfirmationEmail(
  email: string,
  subject: string,
  bodyHtml: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: `STRAPPS <support@strapps.it>`,
    to: email,
    subject,
    html: bodyHtml,
  });
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
    console.error("[stripe webhook] signature verification failed:", message);
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const meta = session.metadata ?? {};
    const email = (meta.email ?? session.customer_email ?? "").toLowerCase();
    const type = meta.type as "accesso" | "acquisto" | "estendi" | undefined;
    const tier = meta.tier ?? "";
    const tierLabel = TIER_LABEL[tier] ?? tier.toUpperCase();

    if (!email || !type) {
      console.warn("[stripe webhook] missing email or type in metadata", meta);
      return NextResponse.json({ received: true });
    }

    // ── Registra il cliente su Stripe con metadata di accesso ──────────────
    try {
      const existingCustomers = await stripe.customers.search({
        query: `email:"${email}"`,
        limit: 1,
      });

      if (type === "accesso") {
        const accessoMeta = {
          [`accesso_${tier}_paid_at`]: new Date().toISOString(),
          [`accesso_${tier}_session_id`]: session.id,
        };

        if (existingCustomers.data.length > 0) {
          await stripe.customers.update(existingCustomers.data[0].id, {
            metadata: accessoMeta,
          });
        } else {
          await stripe.customers.create({ email, metadata: accessoMeta });
        }

        await sendPaymentConfirmationEmail(
          email,
          `✅ Accesso confermato — Drop ${tierLabel}`,
          `
            <div style="font-family:monospace;background:#000;color:#fff;padding:32px;max-width:480px">
              <p style="color:#f00707;font-weight:bold;font-size:18px">STRAPPS</p>
              <p>Ciao! Il tuo accesso al drop <strong>${tierLabel}</strong> è confermato.</p>
              <p>Hai pagato <strong>1,00€</strong> che verrà scalato dal prezzo finale della scarpa.</p>
              <p>Torna su <a href="https://www.strapps.it" style="color:#f00707">strapps.it</a> per completare l'acquisto.</p>
            </div>
          `,
        );

      } else if (type === "acquisto") {
        const acquistaMeta = {
          [`acquisto_${tier}_paid_at`]: new Date().toISOString(),
          [`acquisto_${tier}_scarpa`]: meta.scarpa ?? "",
          [`acquisto_${tier}_strappo`]: meta.strappo ?? "",
          [`acquisto_${tier}_taglia`]: meta.taglia ?? "",
          [`acquisto_${tier}_session_id`]: session.id,
        };

        if (existingCustomers.data.length > 0) {
          await stripe.customers.update(existingCustomers.data[0].id, {
            metadata: acquistaMeta,
          });
        } else {
          await stripe.customers.create({ email, metadata: acquistaMeta });
        }

        await sendPaymentConfirmationEmail(
          email,
          `✅ Ordine confermato — STRAPPS V1`,
          `
            <div style="font-family:monospace;background:#000;color:#fff;padding:32px;max-width:480px">
              <p style="color:#f00707;font-weight:bold;font-size:18px">STRAPPS</p>
              <p>Il tuo ordine è confermato!</p>
              <ul>
                <li>Prodotto: <strong>STRAPPS V1</strong></li>
                <li>Drop: <strong>${tierLabel}</strong></li>
                <li>Scarpa: <strong>${meta.scarpa}</strong></li>
                <li>Strappo: <strong>${meta.strappo}</strong></li>
                <li>Taglia: <strong>${meta.taglia}</strong></li>
              </ul>
              <p>Riceverai aggiornamenti sulla spedizione all'indirizzo fornito.</p>
            </div>
          `,
        );

      } else if (type === "estendi") {
        const extendUntil = new Date();
        extendUntil.setDate(extendUntil.getDate() + 30);

        const estendiMeta = {
          [`estendi_${tier}_paid_at`]: new Date().toISOString(),
          [`estendi_${tier}_until`]: extendUntil.toISOString(),
          [`estendi_${tier}_session_id`]: session.id,
        };

        if (existingCustomers.data.length > 0) {
          await stripe.customers.update(existingCustomers.data[0].id, {
            metadata: estendiMeta,
          });
        } else {
          await stripe.customers.create({ email, metadata: estendiMeta });
        }

        await sendPaymentConfirmationEmail(
          email,
          `✅ Accesso esteso — Drop ${tierLabel}`,
          `
            <div style="font-family:monospace;background:#000;color:#fff;padding:32px;max-width:480px">
              <p style="color:#f00707;font-weight:bold;font-size:18px">STRAPPS</p>
              <p>Il tuo accesso al drop <strong>${tierLabel}</strong> è stato esteso di 30 giorni.</p>
              <p>Hai pagato <strong>49,00€</strong> che verranno scalati dal prezzo finale della scarpa.</p>
              <p>Valido fino al: <strong>${extendUntil.toLocaleDateString("it-IT")}</strong></p>
            </div>
          `,
        );
      }
    } catch (err) {
      console.error("[stripe webhook] customer update error:", err);
      // Non bloccare la risposta — Stripe riprova automaticamente
    }
  }

  return NextResponse.json({ received: true });
}
