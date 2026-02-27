import Link from "next/link";
import { InfoFooterCard, StrappsPageShell } from "./common";

export type ProductVariant = "first" | "salda" | "early" | "last";

type ProductConfig = {
  title: string;
  subtitle: string;
  timer: string;
  price: string;
  checkoutHref: string;
  locked: boolean;
  lockLabel?: string;
  highlight: string;
};

export const PRODUCT_CONFIGS: Record<ProductVariant, ProductConfig> = {
  first: {
    title: "FIRST 60",
    subtitle: "Accesso iniziale al drop con ticket attivo per 30 minuti.",
    timer: "30m 00s",
    price: "189,99€",
    checkoutHref: "/checkout/first",
    locked: true,
    lockLabel: "Blocca il prezzo per 30 giorni: +49,00€",
    highlight: "Finestra rapida con priorità checkout.",
  },
  salda: {
    title: "SALDA 140",
    subtitle: "Estendi il tuo blocco e finalizza in anticipo il drop successivo.",
    timer: "30G 24H 59M",
    price: "140,99€",
    checkoutHref: "/checkout/early",
    locked: false,
    highlight: "Ideale per chi vuole pianificare l'acquisto.",
  },
  early: {
    title: "EARLY 140",
    subtitle: "Seconda finestra disponibile dopo il completamento del primo lotto.",
    timer: "30G 24H 59M",
    price: "219,99€",
    checkoutHref: "/checkout/early",
    locked: false,
    highlight: "Secondo batch con disponibilità controllata.",
  },
  last: {
    title: "LAST 90",
    subtitle: "Ultimo batch del drop: quantità limitata e priorità spedizione.",
    timer: "30m 00s",
    price: "239,99€",
    checkoutHref: "/checkout/last",
    locked: true,
    lockLabel: "Estendi il blocco ora: +49,00€",
    highlight: "Ultima release del drop con urgenza massima.",
  },
};

const sizes = ["38", "39", "40", "41", "42", "43"];

export function ProductScreen({ variant }: { variant: ProductVariant }) {
  const cfg = PRODUCT_CONFIGS[variant];

  return (
    <StrappsPageShell>
      <section className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="font-azeret text-xs uppercase tracking-[0.2em] text-[#f00707]">{cfg.title}</p>
          <h1 className="font-impact mt-3 text-4xl leading-tight sm:text-5xl">STRAPPS V1</h1>
          <p className="font-azeret mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{cfg.subtitle}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-impact text-sm tracking-wide text-white/80">TEMPO RIMANENTE</p>
              <p className="font-impact mt-1 text-4xl text-[#f00707]">{cfg.timer}</p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-impact text-sm tracking-wide text-white/80">PREZZO DROP</p>
              <p className="font-impact mt-1 text-4xl text-[#f00707]">{cfg.price}</p>
            </article>
          </div>

          <div className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:grid-cols-2">
            <div>
              <p className="font-azeret text-xs uppercase tracking-[0.16em] text-white/70">Colore scarpa</p>
              <div className="mt-2 flex gap-3">
                <button type="button" className="h-8 w-8 rounded-full border border-white/60 bg-white" aria-label="Bianco" />
                <button type="button" className="h-8 w-8 rounded-full border border-white/30 bg-black" aria-label="Nero" />
              </div>
            </div>
            <div>
              <p className="font-azeret text-xs uppercase tracking-[0.16em] text-white/70">Taglia</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button key={size} type="button" className="font-azeret rounded-full border border-white/30 px-3 py-1 text-xs">
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={cfg.checkoutHref} className="font-azeret inline-flex rounded-full bg-[#f00707] px-6 py-3 text-sm font-black italic">
              Acquista {cfg.price}
            </Link>
            {cfg.locked && cfg.lockLabel ? (
              <button type="button" className="font-azeret rounded-full border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wide">
                {cfg.lockLabel}
              </button>
            ) : null}
          </div>
        </div>

        <article className="rounded-3xl border border-[#f00707]/30 bg-gradient-to-b from-[#2a0b0b] to-black/70 p-6 sm:p-8">
          <p className="font-azeret text-xs uppercase tracking-[0.2em] text-[#f00707]">Product notes</p>
          <h2 className="font-impact mt-3 text-3xl">Esperienza coerente alla Home</h2>
          <p className="font-azeret mt-4 text-sm leading-relaxed text-white/80">{cfg.highlight}</p>
          <ul className="font-azeret mt-6 space-y-2 text-sm text-white/80">
            <li>• Layout pulito, senza immagini fragili o mancanti.</li>
            <li>• CTA chiara verso checkout con pricing sempre visibile.</li>
            <li>• Stesso linguaggio visivo dark + rosso della landing.</li>
          </ul>
        </article>
      </section>

      <InfoFooterCard />
    </StrappsPageShell>
  );
}
