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

type PaymentMethod = "carta" | "apple" | "google";

interface CustomerFields {
  email: string;
  nome: string;
  cognome: string;
  telefono: string;
  indirizzo: string;
  citta: string;
  regione: string;
  cap: string;
  paese: string;
}

async function redirectToStripe(
  variant: CheckoutVariant,
  fields: CustomerFields,
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
      email: fields.email.trim().toLowerCase(),
      scarpa,
      strappo,
      taglia,
      nome: fields.nome.trim(),
      cognome: fields.cognome.trim(),
      telefono: fields.telefono.trim(),
      indirizzo: fields.indirizzo.trim(),
      citta: fields.citta.trim(),
      regione: fields.regione.trim(),
      cap: fields.cap.trim(),
      paese: fields.paese.trim(),
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function inputClass(hasError?: boolean) {
  return `mt-[10px] block h-[40px] w-full rounded-[20px] border ${
    hasError ? "border-[#f00707]" : "border-white/30"
  } bg-transparent px-4 text-[12px] font-light tracking-[-0.333px] text-white placeholder:text-white/30 outline-none focus:border-[#f00707] transition-colors`;
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

  const [fields, setFields] = useState<CustomerFields>({
    email: defaultEmail ?? "",
    nome: "",
    cognome: "",
    telefono: "",
    indirizzo: "",
    citta: "",
    regione: "",
    cap: "",
    paese: "Italia",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("carta");
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
    if (!fields.indirizzo.trim()) newErrors.indirizzo = "Campo obbligatorio";
    if (!fields.citta.trim()) newErrors.citta = "Campo obbligatorio";
    if (!fields.cap.trim()) newErrors.cap = "Campo obbligatorio";
    if (!fields.paese.trim()) newErrors.paese = "Campo obbligatorio";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setGlobalError(null);
    setLoading(true);
    try {
      await redirectToStripe(variant, fields, shoeColor, strapColor, taglia ?? "");
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Errore imprevisto. Riprova.");
      setLoading(false);
    }
  }

  const PAYMENT_METHODS: { id: PaymentMethod; label: string }[] = [
    { id: "carta", label: "Carta" },
    { id: "apple", label: "Apple Pay" },
    { id: "google", label: "Google Pay" },
  ];

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
            <div className="relative h-[63px] w-[55px] flex-none overflow-hidden rounded-[4px] bg-[#1a1a1a]">
              <Image src={thumbnailSrc} alt="STRAPPS V1" fill sizes="55px" unoptimized className="object-contain" />
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-[40px]">

          {/* ── DATI PERSONALI ── */}
          <p className="font-impact text-[13px] tracking-[-0.333px] text-white/60">
            DATI PERSONALI
          </p>

          <div className="mt-[20px] flex flex-col gap-[20px]">

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

          {/* ── INDIRIZZO DI CONSEGNA ── */}
          <p className="font-impact mt-[36px] text-[13px] tracking-[-0.333px] text-white/60">
            INDIRIZZO DI CONSEGNA
          </p>

          <div className="mt-[20px] flex flex-col gap-[20px]">

            <div>
              <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">Indirizzo*</p>
              <input
                type="text"
                value={fields.indirizzo}
                onChange={set("indirizzo")}
                placeholder="Via Roma 1"
                autoComplete="street-address"
                className={inputClass(!!errors.indirizzo)}
              />
              {errors.indirizzo && (
                <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.indirizzo}</p>
              )}
            </div>

            <div className="flex gap-[12px]">
              <div className="flex-[2]">
                <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">Città*</p>
                <input
                  type="text"
                  value={fields.citta}
                  onChange={set("citta")}
                  placeholder="Milano"
                  autoComplete="address-level2"
                  className={inputClass(!!errors.citta)}
                />
                {errors.citta && (
                  <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.citta}</p>
                )}
              </div>
              <div className="flex-1">
                <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">CAP*</p>
                <input
                  type="text"
                  value={fields.cap}
                  onChange={set("cap")}
                  placeholder="20100"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  maxLength={5}
                  className={inputClass(!!errors.cap)}
                />
                {errors.cap && (
                  <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.cap}</p>
                )}
              </div>
            </div>

            <div className="flex gap-[12px]">
              <div className="flex-1">
                <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">Regione</p>
                <input
                  type="text"
                  value={fields.regione}
                  onChange={set("regione")}
                  placeholder="Lombardia"
                  autoComplete="address-level1"
                  className={inputClass()}
                />
              </div>
              <div className="flex-1">
                <p className="font-azeret text-[12px] font-light tracking-[-0.333px]">Paese*</p>
                <input
                  type="text"
                  value={fields.paese}
                  onChange={set("paese")}
                  placeholder="Italia"
                  autoComplete="country-name"
                  className={inputClass(!!errors.paese)}
                />
                {errors.paese && (
                  <p className="font-azeret mt-[5px] text-[10px] tracking-[-0.333px] text-[#f00707]">{errors.paese}</p>
                )}
              </div>
            </div>
          </div>

          {/* ── METODO DI PAGAMENTO ── */}
          <p className="font-impact mt-[36px] text-[13px] tracking-[-0.333px] text-white/60">
            METODO DI PAGAMENTO
          </p>

          {/* Selector a pillole */}
          <div className="mt-[16px] flex gap-[8px]">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setPaymentMethod(m.id)}
                className={`font-azeret flex-1 rounded-[20px] border py-[10px] text-[11px] font-light tracking-[-0.333px] transition-colors ${
                  paymentMethod === m.id
                    ? "border-[#f00707] bg-[#f00707] text-white"
                    : "border-white/20 bg-transparent text-white/60"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* CTA unica */}
          <button
            type="submit"
            disabled={loading}
            className="font-azeret mt-[20px] h-[48px] w-full rounded-[24px] bg-[#f00707] text-[15px] font-black tracking-[-0.333px] text-white disabled:opacity-50"
          >
            {loading ? "Attendere..." : `Paga ${cfg.price}`}
          </button>

          {globalError && (
            <p className="font-azeret mt-[10px] text-center text-[11px] tracking-[-0.333px] text-[#f00707]">{globalError}</p>
          )}

          <p className="font-azeret mt-[14px] text-center text-[9px] font-light tracking-[-0.333px] text-white/30">
            Pagamento sicuro · Rimborso garantito entro 14 giorni dalla consegna*
          </p>

        </form>
      </div>
    </main>
  );
}
