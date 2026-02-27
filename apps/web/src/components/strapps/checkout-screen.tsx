import { InfoFooterCard, StrappsPageShell, StrappsTopBar } from "./common";

export type CheckoutVariant = "first" | "early" | "last";

type CheckoutConfig = {
  sku: string;
  price: string;
  tier: string;
  shippingEta: string;
};

const CHECKOUT_CONFIGS: Record<CheckoutVariant, CheckoutConfig> = {
  first: { sku: "111333444", price: "189,99€", tier: "FIRST 60", shippingEta: "Spedizione entro 72h" },
  early: { sku: "222333444", price: "219,99€", tier: "EARLY 140", shippingEta: "Spedizione entro 5 giorni" },
  last: { sku: "333333444", price: "239,99€", tier: "LAST 90", shippingEta: "Spedizione prioritaria" },
};

const customerFields = ["Email*", "Nome*", "Cognome*", "N. telefono*"];
const deliveryFields = ["Paese/Regione*", "Indirizzo*", "Città*", "Regione*", "CAP*"];

export function CheckoutScreen({ variant }: { variant: CheckoutVariant }) {
  const cfg = CHECKOUT_CONFIGS[variant];

  return (
    <StrappsPageShell>
      <StrappsTopBar />

      <section className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="font-azeret text-xs uppercase tracking-[0.2em] text-[#f00707]">Checkout</p>
          <h1 className="font-impact mt-3 text-3xl">Riepilogo ordine</h1>

          <div className="mt-6 rounded-2xl border border-[#f00707]/35 bg-black/40 p-4">
            <p className="font-azeret text-sm font-bold">STRAPPS V1 - {cfg.tier}</p>
            <p className="font-azeret mt-1 text-xs text-white/70">SKU: {cfg.sku}</p>
            <p className="font-impact mt-3 text-2xl text-[#f00707]">{cfg.price}</p>
            <p className="font-azeret mt-2 text-xs uppercase tracking-[0.16em] text-white/75">{cfg.shippingEta}</p>
          </div>

          <dl className="font-azeret mt-6 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <dt>Subtotale</dt>
              <dd>{cfg.price}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Consegna</dt>
              <dd className="text-[#00ff1e]">Gratis</dd>
            </div>
            <div className="flex items-center justify-between border-t border-white/15 pt-3 text-base font-bold">
              <dt>Totale</dt>
              <dd>{cfg.price}</dd>
            </div>
          </dl>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" className="font-azeret rounded-full bg-[#d9d9d9] px-5 py-3 text-sm font-black italic text-black">
              APPLE PAY
            </button>
            <button type="button" className="font-azeret rounded-full bg-[#d9d9d9] px-5 py-3 text-sm font-black italic text-black">
              GOOGLE PAY
            </button>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="font-rounded text-xl">Dettagli cliente e consegna</h2>
          <p className="font-azeret mt-2 text-xs uppercase tracking-[0.16em] text-white/70">
            Form semplificato e coerente con il visual della home.
          </p>

          <div className="mt-5 grid gap-3">
            {customerFields.map((label) => (
              <label key={label} className="font-azeret text-xs text-white/80">
                {label}
                <input
                  type={label.includes("Email") ? "email" : "text"}
                  className="mt-1 block h-11 w-full rounded-full border border-[#f00707]/70 bg-transparent px-4 text-sm outline-none"
                />
              </label>
            ))}
          </div>

          <h3 className="font-rounded mt-7 text-lg">Indirizzo di spedizione</h3>
          <div className="mt-4 grid gap-3">
            {deliveryFields.map((label) => (
              <label key={label} className="font-azeret text-xs text-white/80">
                {label}
                <input className="mt-1 block h-11 w-full rounded-full border border-[#f00707]/70 bg-transparent px-4 text-sm outline-none" />
              </label>
            ))}
          </div>

          <button type="button" className="font-azeret mt-6 w-full rounded-full bg-[#f00707] px-6 py-3 text-sm font-extrabold">
            Continua
          </button>
        </article>
      </section>

      <InfoFooterCard />
    </StrappsPageShell>
  );
}
