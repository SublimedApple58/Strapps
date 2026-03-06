import Image from "next/image";
import { GlobalTopBar } from "@/components/strapps/global-top-bar";

export type AccessoTier = "first" | "early" | "last";

type TierConfig = {
  dropLabel: string;
  ticketLabel: string;
  sku: string;
};

const TIER_CONFIGS: Record<AccessoTier, TierConfig> = {
  first: { dropLabel: "ACCESSO DROP FIRST60", ticketLabel: "TICKET FIRST60", sku: "111" },
  early: { dropLabel: "ACCESSO DROP EARLY140", ticketLabel: "TICKET EARLY140", sku: "222" },
  last: { dropLabel: "ACCESSO DROP LAST90", ticketLabel: "TICKET LAST90", sku: "333" },
};

const PRICE = "1,00€";

const customerFields = [
  { label: "Email*", type: "email", name: "email" },
  { label: "Nome*", type: "text", name: "nome" },
  { label: "Cognome*", type: "text", name: "cognome" },
  { label: "N. telefono*", type: "tel", name: "telefono" },
];

const deliveryFields = [
  { label: "Paese/Regione*", type: "text", name: "paese" },
  { label: "Indirizzo*", type: "text", name: "indirizzo" },
  { label: "Città*", type: "text", name: "citta" },
  { label: "Regione*", type: "text", name: "regione" },
  { label: "CAP*", type: "text", name: "cap" },
];

export function AccessoCheckoutScreen({ tier }: { tier: AccessoTier }) {
  const cfg = TIER_CONFIGS[tier];

  return (
    <>
      <GlobalTopBar />
      <main className="min-h-screen bg-black text-white">
        <div className="mx-auto w-full max-w-[390px] px-[28px] pb-20 pt-[118px]">

          {/* Page header */}
          <p className="font-azeret text-[15px] tracking-[-0.333px]">
            <span className="font-black italic text-[#f00707]">STRAPPS </span>
            <span className="font-light">CHECKOUT</span>
          </p>

          {/* Main title */}
          <h1 className="font-azeret mt-[47px] text-center text-[16px] font-black italic tracking-[-0.333px]">
            {cfg.dropLabel}
          </h1>

          {/* Order summary */}
          <section className="mt-[42px]">
            <p className="font-azeret text-[12px] tracking-[-0.333px]">
              <span className="font-black">Riepilogo dell&apos;ordine</span>
              <span className="font-light"> (1 articolo)</span>
            </p>

            {/* Product row */}
            <div className="mt-[24px] flex items-start gap-[14px]">
              <div className="relative h-[48px] w-[48px] flex-none overflow-hidden rounded-[4px]">
                <Image
                  src="/hero_image.png"
                  alt="STRAPPS V1"
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 items-start justify-between">
                <div>
                  <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">{cfg.ticketLabel}</p>
                  <p className="font-azeret mt-[8px] text-[12px] font-light tracking-[-0.333px]">SKU: {cfg.sku}</p>
                </div>
                <p className="font-impact text-[15px] tracking-[-0.333px]">{PRICE}</p>
              </div>
            </div>

            {/* Subtotale */}
            <div className="mt-[28px] h-px w-full bg-white/20" />
            <div className="mt-[16px] flex items-center justify-between">
              <p className="font-azeret text-[12px] tracking-[-0.333px]">Subtotale</p>
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">{PRICE}</p>
            </div>

            {/* Totale */}
            <div className="mt-[24px] h-px w-full bg-white/20" />
            <div className="mt-[16px] flex items-center justify-between">
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">Totale</p>
              <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">{PRICE}</p>
            </div>
          </section>

          {/* Full-width separator */}
          <div className="relative left-1/2 mt-[40px] h-px w-screen -translate-x-1/2 bg-white/20" />

          {/* Checkout rapido */}
          <section className="mt-[41px]">
            <p className="font-azeret text-center text-[15px] font-black italic tracking-[-0.333px]">
              Checkout rapido
            </p>

            <div className="mt-[55px] flex flex-col items-center gap-[18px]">
              <button
                type="button"
                className="font-azeret h-[40px] w-[247px] rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic text-black"
              >
                APPLE PAY
              </button>
              <button
                type="button"
                className="font-azeret h-[40px] w-[247px] rounded-[20px] bg-[#d9d9d9] text-[15px] font-black italic text-black"
              >
                GOOGLE PAY
              </button>
            </div>

            {/* oppure separator */}
            <div className="mt-[43px] flex items-center gap-[12px]">
              <div className="h-px flex-1 bg-white/30" />
              <span className="font-rounded text-[12px] italic">oppure</span>
              <div className="h-px flex-1 bg-white/30" />
            </div>
          </section>

          {/* Form */}
          <form className="mt-[76px]">

            {/* Dettagli cliente */}
            <p className="font-rounded text-[16px]">Dettagli cliente</p>
            <div className="mt-[40px] flex flex-col gap-[24px]">
              {customerFields.map((field) => (
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

            {/* Dettagli di consegna */}
            <p className="font-rounded mt-[48px] text-[16px]">Dettagli di consegna</p>
            <div className="mt-[24px] flex flex-col gap-[24px]">
              {deliveryFields.map((field) => (
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

            {/* Continua */}
            <button
              type="button"
              className="font-azeret mt-[41px] h-[40px] w-full rounded-[20px] bg-[#f00707] text-[15px] font-extrabold tracking-[-0.333px] text-white"
            >
              Continua
            </button>
          </form>

        </div>
      </main>
    </>
  );
}
