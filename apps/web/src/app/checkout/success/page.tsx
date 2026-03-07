import Link from "next/link";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import { SiteFooter } from "@/components/strapps/site-footer";
import { stripe } from "@/lib/stripe";
import { generateAccessToken, TTL_30_MIN } from "@/lib/access-token";
import { MetaPixelEvents } from "@/components/strapps/meta-pixel-events";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  let paymentType: string | null = null;
  let tierLabel: string | null = null;
  let tier: string | null = null;
  let amountTotal: number | null = null;
  let productUrl: string | null = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paymentType = session.metadata?.type ?? null;
      tier = session.metadata?.tier ?? "";
      amountTotal = session.amount_total ? session.amount_total / 100 : null;
      const email = (session.metadata?.email ?? session.customer_email ?? "").toLowerCase().trim();
      const TIER_LABEL: Record<string, string> = {
        first: "FIRST 60",
        early: "EARLY 140",
        last: "LAST 90",
      };
      tierLabel = TIER_LABEL[tier ?? ""] ?? null;

      if (paymentType === "accesso" && tier && email) {
        const token = generateAccessToken(email, tier as string, TTL_30_MIN);
        productUrl = `/prodotto/${tier}?t=${encodeURIComponent(token)}`;
      }
    } catch {
      // Sessione non trovata — mostra messaggio generico
    }
  }

  const messages: Record<string, { title: string; body: string }> = {
    accesso: {
      title: "ACCESSO CONFERMATO",
      body: `Hai sbloccato il drop ${tierLabel ?? ""}. Acquista ora al prezzo bloccato — hai 30 minuti. Clicca il pulsante per accedere alla pagina.`,
    },
    acquisto: {
      title: "ORDINE CONFERMATO",
      body: "Il tuo ordine è confermato. Riceverai una email con i dettagli e gli aggiornamenti sulla spedizione.",
    },
    estendi: {
      title: "ACCESSO ESTESO",
      body: `Il tuo accesso al drop ${tierLabel ?? ""} è stato esteso di 30 giorni. I 49,00€ verranno scalati dal prezzo finale della scarpa.`,
    },
  };

  const defaultMsg = {
    title: "PAGAMENTO CONFERMATO",
    body: "Grazie per il tuo acquisto. Ti abbiamo inviato una email di conferma.",
  };
  const msg = (paymentType ? messages[paymentType] : null) ?? defaultMsg;

  const ctaHref = productUrl ?? "/";
  const ctaLabel = productUrl ? "ACQUISTA ORA →" : "TORNA ALLA HOME";

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <MetaPixelEvents paymentType={paymentType} tier={tier} amountTotal={amountTotal} />
      <div className="mx-auto w-full max-w-[390px] flex-1 px-[28px] pb-20 pt-8">
        <SiteNavMenu />

        <div className="mt-[80px] flex flex-col items-center text-center">
          {/* Check icon */}
          <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#00ff1e]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16L13 23L26 10" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="font-impact mt-[28px] text-[24px] tracking-[-0.333px] text-[#f00707]">
            {msg.title}
          </h1>

          <p className="font-azeret mt-[20px] text-[13px] font-light leading-relaxed tracking-[-0.333px] text-white/80">
            {msg.body}
          </p>

          <Link
            href={ctaHref}
            className="font-impact mt-[48px] flex h-[42px] w-[200px] items-center justify-center rounded-[20px] bg-[#f00707] text-[15px] tracking-[-0.333px] text-white"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
