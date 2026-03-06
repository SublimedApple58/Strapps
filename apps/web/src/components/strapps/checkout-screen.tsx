import Image from "next/image";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";

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

export function CheckoutScreen({ variant }: { variant: CheckoutVariant }) {
  const cfg = CHECKOUT_CONFIGS[variant];

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

          {/* Product row */}
          <div className="mt-[24px] flex items-start gap-[14px]">
            <div className="relative h-[63px] w-[55px] flex-none overflow-hidden rounded-[4px]">
              <Image
                src="/hero_image.png"
                alt="STRAPPS V1"
                fill
                sizes="55px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 items-start justify-between">
              <div>
                <p className="font-azeret text-[12px] font-black tracking-[-0.333px]">STRAPPS V1</p>
                <p className="font-azeret mt-[8px] text-[12px] font-light tracking-[-0.333px]">SKU: {cfg.sku}</p>
              </div>
              <p className="font-impact text-[15px] tracking-[-0.333px]">{cfg.price}</p>
            </div>
          </div>

          {/* Subtotale / Consegna / Totale */}
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
            <div className="h-px flex-1 bg-[#f00707]" />
            <span className="font-rounded text-[12px] italic">oppure</span>
            <div className="h-px flex-1 bg-[#f00707]" />
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
  );
}
