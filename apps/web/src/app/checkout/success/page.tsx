import Link from "next/link";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import { SiteFooter } from "@/components/strapps/site-footer";
import { stripe } from "@/lib/stripe";

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function CheckoutSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id } = await searchParams;

  let paymentType: string | null = null;
  let tierLabel: string | null = null;

  if (session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paymentType = session.metadata?.type ?? null;
      const tier = session.metadata?.tier ?? "";
      const TIER_LABEL: Record<string, string> = {
        first: "FIRST 60",
        early: "EARLY 140",
        last: "LAST 90",
      };
      tierLabel = TIER_LABEL[tier] ?? null;
    } catch {
      // Sessione non trovata — mostra messaggio generico
    }
  }

  const messages: Record<string, { title: string; body: string }> = {
    accesso: {
      title: "ACCESSO CONFERMATO",
      body: `Hai sbloccato l'accesso al drop ${tierLabel ?? ""}. Ti abbiamo inviato una email di conferma. Torna qui quando il drop apre per completare l'acquisto.`,
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

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
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
            href="/"
            className="font-impact mt-[48px] flex h-[42px] w-[200px] items-center justify-center rounded-[20px] bg-[#f00707] text-[15px] tracking-[-0.333px] text-white"
          >
            TORNA ALLA HOME
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
