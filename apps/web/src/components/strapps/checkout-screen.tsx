"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import {
  type ShoeColor,
  type StrapColor,
  PRODUCT_IMAGES,
} from "@/components/strapps/product-config";

export type CheckoutVariant = "first" | "early" | "last";

type CheckoutConfig = {
  price: string;
  sku: string;
};

const CHECKOUT_CONFIGS: Record<CheckoutVariant, CheckoutConfig> = {
  first: { price: "189,99€", sku: "111222" },
  early: { price: "219,99€", sku: "222333" },
  last: { price: "239,99€", sku: "333444" },
};

const validShoeColors: ShoeColor[] = ["bianco", "nero"];
const validStrapColors: StrapColor[] = ["bianco", "nero"];

type CheckoutScreenProps = {
  variant: CheckoutVariant;
  scarpa?: string;
  strappo?: string;
  taglia?: string;
  defaultEmail?: string;
};

async function redirectToStripe(
  variant: CheckoutVariant,
  email: string,
  scarpa: string,
  strappo: string,
  taglia: string,
): Promise<void> {
  const res = await fetch("/api/stripe/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "acquisto",
      tier: variant,
      email: email.trim().toLowerCase(),
      scarpa,
      strappo,
      taglia,
      cancelPath: `/checkout/${variant}?scarpa=${scarpa}&strappo=${strappo}${taglia ? `&taglia=${taglia}` : ""}`,
    }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? "Errore nel creare la sessione di pagamento");
  }

  const { url } = (await res.json()) as { url: string };
  window.location.href = url;
}

export function CheckoutScreen({ variant, scarpa, strappo, taglia, defaultEmail }: CheckoutScreenProps) {
  const cfg = CHECKOUT_CONFIGS[variant];

  const shoeColor: ShoeColor = validShoeColors.includes(scarpa as ShoeColor)
    ? (scarpa as ShoeColor)
    : "bianco";
  const strapColor: StrapColor = validStrapColors.includes(strappo as StrapColor)
    ? (strappo as StrapColor)
    : "bianco";

  const thumbnailSrc = PRODUCT_IMAGES[shoeColor][strapColor][0];
  const shoeLabel = shoeColor === "bianco" ? "Bianco" : "Nero";
  const strapLabel = strapColor === "bianco" ? "Bianco" : "Nero";

  const [email, setEmail] = useState(defaultEmail ?? "");
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
      await redirectToStripe(variant, email, shoeColor, strapColor, taglia ?? "");
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
      await redirectToStripe(variant, email, shoeColor, strapColor, taglia ?? "");
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

          <div className="mt-[24px] flex items-start gap-[14px]">
            <div className="relative h-[63px] w-[55px] flex-none overflow-hidden rounded-[4px]">
              <Image src={thumbnailSrc} alt="STRAPPS V1" fill sizes="55px" className="object-cover" />
            </div>
            <div className="flex flex-1 items-start justify-between">
              <div>
                <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">STRAPPS V1</p>
                <div className="font-azeret mt-[6px] space-y-[3px] text-[10px] font-light tracking-[-0.333px] text-white/70">
                  <p>Scarpa: {shoeLabel}</p>
                  <p>Strappo: {strapLabel}</p>
                  {taglia && <p>Taglia: {taglia}</p>}
                </div>
                <p className="font-azeret mt-[6px] text-[10px] font-light tracking-[-0.333px] text-white/40">SKU: {cfg.sku}</p>
              </div>
              <p className="font-impact text-[15px] tracking-[-0.333px]">{cfg.price}</p>
            </div>
          </div>

          <div className="mt-[28px] space-y-[16px]">
            <div className="flex items-center justify-between">
              <p className="font-azeret text-[12px] tracking-[-0.333px]">Subtotale</p>
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">{cfg.price}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-azeret text-[12px] tracking-[-0.333px]">Consegna</p>
              <p className="font-azeret text-[12px] tracking-[-0.333px] text-[#00ff1e]">Gratis</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">Totale</p>
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">{cfg.price}</p>
            </div>
          </div>
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

          <p className="font-rounded mt-[48px] text-[16px]">Dettagli di consegna</p>
          <div className="mt-[24px] flex flex-col gap-[24px]">
            {[
              { label: "Paese/Regione*", type: "text", name: "paese" },
              { label: "Indirizzo*", type: "text", name: "indirizzo" },
              { label: "Città*", type: "text", name: "citta" },
              { label: "Regione*", type: "text", name: "regione" },
              { label: "CAP*", type: "text", name: "cap" },
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
            {loading ? "Attendere..." : `Paga ${cfg.price}`}
          </button>
        </form>

      </div>
    </main>
  );
}
