"use client";

import { useState } from "react";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";

export type EstendiTier = "first" | "early" | "last";

const TIER_LABEL: Record<EstendiTier, string> = {
  first: "FIRST 60",
  early: "EARLY 140",
  last: "LAST 90",
};

const PRICE = "49,00€";

type EstendiCheckoutScreenProps = {
  tier: EstendiTier;
  scarpa?: string;
  strappo?: string;
};

async function redirectToStripe(tier: EstendiTier, email: string): Promise<void> {
  const res = await fetch("/api/stripe/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "estendi",
      tier,
      email: email.trim().toLowerCase(),
      cancelPath: `/checkout/estendi/${tier}`,
    }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? "Errore nel creare la sessione di pagamento");
  }

  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

export function EstendiCheckoutScreen({ tier, scarpa, strappo }: EstendiCheckoutScreenProps) {
  const tierLabel = TIER_LABEL[tier];

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Inserisci un indirizzo email valido.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await redirectToStripe(tier, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto. Riprova.");
      setLoading(false);
    }
  }

  async function handleQuickPay() {
    if (!EMAIL_REGEX.test(email.trim())) {
      setError("Inserisci prima la tua email.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      await redirectToStripe(tier, email);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore imprevisto. Riprova.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-[390px] px-[28px] pb-20 pt-8">

        <SiteNavMenu />

        {/* Page header */}
        <p className="font-azeret mt-[37px] text-[15px] tracking-[-0.333px]">
          <span className="font-black italic text-[#f00707]">STRAPPS </span>
          <span className="font-light">CHECKOUT</span>
        </p>

        {/* Order summary */}
        <section className="mt-[42px]">
          <p className="font-azeret text-[12px] tracking-[-0.333px]">
            <span className="font-black">Riepilogo dell&apos;ordine</span>
            <span className="font-light"> (1 articolo)</span>
          </p>

          <div className="mt-[24px] flex items-start justify-between">
            <div>
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">
                ESTENSIONE 30 GG — {tierLabel}
              </p>
              <p className="font-azeret mt-[6px] text-[10px] font-light tracking-[-0.333px] text-white/60">
                Blocca il prezzo del drop per altri 30 giorni
              </p>
              {scarpa && strappo && (
                <p className="font-azeret mt-[4px] text-[10px] font-light tracking-[-0.333px] text-white/40">
                  Scarpa: {scarpa} / Strappo: {strappo}
                </p>
              )}
            </div>
            <p className="font-impact text-[15px] tracking-[-0.333px]">{PRICE}</p>
          </div>

          <div className="mt-[28px] space-y-[16px]">
            <div className="flex items-center justify-between">
              <p className="font-azeret text-[12px] tracking-[-0.333px]">Subtotale</p>
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">{PRICE}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">Totale</p>
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">{PRICE}</p>
            </div>
          </div>

          <p className="font-azeret mt-[16px] text-[10px] font-light tracking-[-0.333px] text-white/40">
            * I 49,00€ verranno scalati dal prezzo finale della scarpa al completamento dell&apos;acquisto.
          </p>
        </section>

        {/* Full-width separator */}
        <div className="relative left-1/2 mt-[40px] h-px w-screen -translate-x-1/2 bg-white/20" />

        {/* Email — sempre richiesta */}
        <section className="mt-[41px]">
          <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">
            Email* <span className="text-white/40">(richiesta per tutti i metodi di pagamento)</span>
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="la.tua@email.it"
            autoComplete="email"
            className="mt-[14px] block h-[40px] w-full rounded-[20px] border border-[#f00707] bg-transparent px-4 text-[12px] font-light tracking-[-0.333px] text-white placeholder:text-white/30 outline-none"
          />
          {error && (
            <p className="font-azeret mt-[8px] text-[11px] tracking-[-0.333px] text-[#f00707]">{error}</p>
          )}
        </section>

        {/* Checkout rapido */}
        <section className="mt-[32px]">
          <p className="font-azeret text-center text-[15px] font-black italic tracking-[-0.333px]">
            Checkout rapido
          </p>

          <div className="mt-[28px] flex flex-col items-center gap-[18px]">
            <button
              type="button"
              onClick={handleQuickPay}
              disabled={loading}
              className="font-azeret h-[40px] w-[247px] rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic text-black disabled:opacity-50"
            >
              APPLE PAY
            </button>
            <button
              type="button"
              onClick={handleQuickPay}
              disabled={loading}
              className="font-azeret h-[40px] w-[247px] rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic text-black disabled:opacity-50"
            >
              GOOGLE PAY
            </button>
          </div>

          <div className="mt-[43px] flex items-center gap-[12px]">
            <div className="h-px flex-1 bg-[#f00707]" />
            <span className="font-rounded text-[12px] italic">oppure</span>
            <div className="h-px flex-1 bg-[#f00707]" />
          </div>
        </section>

        {/* Form */}
        <form onSubmit={handlePay} className="mt-[76px]">
          <p className="font-rounded text-[16px]">Dettagli cliente</p>
          <div className="mt-[40px] flex flex-col gap-[24px]">
            {[
              { label: "Nome*", type: "text", name: "nome" },
              { label: "Cognome*", type: "text", name: "cognome" },
              { label: "N. telefono*", type: "tel", name: "telefono" },
            ].map((field) => (
              <div key={field.name}>
                <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">{field.label}</p>
                <input
                  type={field.type}
                  name={field.name}
                  className="mt-[20px] block h-[40px] w-full rounded-[20px] border border-[#f00707] bg-transparent px-4 text-[12px] font-light tracking-[-0.333px] text-white outline-none"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="font-azeret mt-[41px] h-[40px] w-full rounded-[20px] bg-[#f00707] text-[15px] font-extrabold tracking-[-0.333px] text-white disabled:opacity-50"
          >
            {loading ? "Attendere..." : `Paga ${PRICE}`}
          </button>
        </form>

      </div>
    </main>
  );
}
