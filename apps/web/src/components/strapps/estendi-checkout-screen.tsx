"use client";

import { useState } from "react";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import { fbqTrack } from "@/lib/meta-pixel";

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

interface CustomerFields {
  email: string;
  nome: string;
  cognome: string;
  telefono: string;
}

async function redirectToStripe(tier: EstendiTier, fields: CustomerFields): Promise<void> {
  const res = await fetch("/api/stripe/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "estendi",
      tier,
      email: fields.email.trim().toLowerCase(),
      nome: fields.nome.trim(),
      cognome: fields.cognome.trim(),
      telefono: fields.telefono.trim(),
      cancelPath: `/checkout/estendi/${tier}`,
    }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { error?: string };
    throw new Error(data.error ?? "Errore nel creare la sessione di pagamento");
  }

  const { url } = (await res.json()) as { url: string };
  fbqTrack("InitiateCheckout", {
    value: 49,
    currency: "EUR",
    checkout_type: "extend",
    content_ids: ["price_lock_30d"],
    content_type: "product",
  });
  window.location.href = url;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function inputClass(hasError?: boolean) {
  return `mt-[10px] block h-[40px] w-full rounded-[20px] border ${
    hasError ? "border-[#f00707]" : "border-white/30"
  } bg-transparent px-4 text-[12px] font-light tracking-[-0.333px] text-white placeholder:text-white/30 outline-none focus:border-[#f00707] transition-colors`;
}

export function EstendiCheckoutScreen({ tier, scarpa, strappo }: EstendiCheckoutScreenProps) {
  const tierLabel = TIER_LABEL[tier];

  const [fields, setFields] = useState<CustomerFields>({
    email: "",
    nome: "",
    cognome: "",
    telefono: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFields, string>>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function set(key: keyof CustomerFields) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CustomerFields, string>> = {};

    if (!EMAIL_REGEX.test(fields.email.trim())) newErrors.email = "Email non valida";
    if (!fields.nome.trim()) newErrors.nome = "Campo obbligatorio";
    if (!fields.cognome.trim()) newErrors.cognome = "Campo obbligatorio";
    if (!fields.telefono.trim()) newErrors.telefono = "Campo obbligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handlePay() {
    if (!validate()) return;
    setGlobalError(null);
    setLoading(true);
    try {
      await redirectToStripe(tier, fields);
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Errore imprevisto. Riprova.");
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handlePay();
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

        {/* Form — info first */}
        <form onSubmit={handleSubmit} className="mt-[40px]">

          {/* Dati personali */}
          <p className="font-impact text-[13px] tracking-[-0.333px] text-white/60">
            DATI PERSONALI
          </p>

          <div className="mt-[20px] flex flex-col gap-[20px]">

            {/* Email */}
            <div>
              <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">Email*</p>
              <input
                type="email"
                value={fields.email}
                onChange={set("email")}
                placeholder="la.tua@email.it"
                autoComplete="email"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.email}</p>
              )}
            </div>

            {/* Nome + Cognome affiancati */}
            <div className="flex gap-[12px]">
              <div className="flex-1">
                <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">Nome*</p>
                <input
                  type="text"
                  value={fields.nome}
                  onChange={set("nome")}
                  placeholder="Mario"
                  autoComplete="given-name"
                  className={inputClass(!!errors.nome)}
                />
                {errors.nome && (
                  <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.nome}</p>
                )}
              </div>
              <div className="flex-1">
                <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">Cognome*</p>
                <input
                  type="text"
                  value={fields.cognome}
                  onChange={set("cognome")}
                  placeholder="Rossi"
                  autoComplete="family-name"
                  className={inputClass(!!errors.cognome)}
                />
                {errors.cognome && (
                  <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.cognome}</p>
                )}
              </div>
            </div>

            {/* Telefono */}
            <div>
              <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">N. telefono*</p>
              <input
                type="tel"
                value={fields.telefono}
                onChange={set("telefono")}
                placeholder="+39 320 000 0000"
                autoComplete="tel"
                className={inputClass(!!errors.telefono)}
              />
              {errors.telefono && (
                <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.telefono}</p>
              )}
            </div>
          </div>

          {/* Pagamento */}
          <p className="font-impact mt-[36px] text-[13px] tracking-[-0.333px] text-white/60">
            PAGAMENTO
          </p>

          <div className="mt-[20px] flex flex-col gap-[12px]">

            {/* Paga con carta — CTA primaria */}
            <button
              type="submit"
              disabled={loading}
              className="font-azeret h-[40px] w-full rounded-[20px] bg-[#f00707] text-[15px] font-black tracking-[-0.333px] text-white disabled:opacity-50"
            >
              {loading ? "Attendere..." : `Paga ${PRICE} — carta`}
            </button>

            {/* Oppure */}
            <div className="flex items-center gap-[12px] py-[4px]">
              <div className="h-px flex-1 bg-white/20" />
              <span className="font-azeret text-[11px] font-light italic text-white/40">oppure</span>
              <div className="h-px flex-1 bg-white/20" />
            </div>

            {/* Apple Pay */}
            <button
              type="button"
              onClick={handlePay}
              disabled={loading}
              className="font-azeret h-[40px] w-full rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic text-black disabled:opacity-50"
            >
              APPLE PAY
            </button>

            {/* Google Pay */}
            <button
              type="button"
              onClick={handlePay}
              disabled={loading}
              className="font-azeret h-[40px] w-full rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic text-black disabled:opacity-50"
            >
              GOOGLE PAY
            </button>
          </div>

          {globalError && (
            <p className="font-azeret mt-[12px] text-center text-[11px] tracking-[-0.333px] text-[#f00707]">{globalError}</p>
          )}

          <p className="font-azeret mt-[16px] text-center text-[9px] font-light tracking-[-0.333px] text-white/30">
            Pagamento sicuro · I 49€ verranno scalati dall&apos;acquisto finale*
          </p>

        </form>

      </div>
    </main>
  );
}
