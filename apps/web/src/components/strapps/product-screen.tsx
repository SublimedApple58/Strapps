import Image from "next/image";
import Link from "next/link";
import { InfoFooterCard, StrappsTopBar } from "./common";

const VARIANT_IMAGE = {
  first: "/figma/shop/shoe-black.png",
  salda: "/figma/shop/shoe-white.png",
  early: "/figma/shop/shoe-white.png",
  last: "/figma/shop/shoe-black.png",
} as const;

export type ProductVariant = "first" | "salda" | "early" | "last";

type ProductConfig = {
  title: string;
  subtitle: string;
  timer: string;
  price: string;
  checkoutHref: string;
  locked: boolean;
  lockLabel?: string;
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
  },
  salda: {
    title: "SALDA 140",
    subtitle: "Estendi il tuo blocco e finalizza in anticipo il drop successivo.",
    timer: "30G 24H 59M",
    price: "140,99€",
    checkoutHref: "/checkout/early",
    locked: false,
  },
  early: {
    title: "EARLY 140",
    subtitle: "Seconda finestra disponibile dopo il completamento del primo lotto.",
    timer: "30G 24H 59M",
    price: "219,99€",
    checkoutHref: "/checkout/early",
    locked: false,
  },
  last: {
    title: "LAST 90",
    subtitle: "Ultimo batch del drop: quantità limitata e priorità spedizione.",
    timer: "30m 00s",
    price: "239,99€",
    checkoutHref: "/checkout/last",
    locked: true,
    lockLabel: "Estendi il blocco ora: +49,00€",
  },
};

const sizes = ["38", "39", "40", "41", "42", "43"];

type ProductScreenProps = {
  variant: ProductVariant;
};

export function ProductScreen({ variant }: ProductScreenProps) {
  const cfg = PRODUCT_CONFIGS[variant];

  return (
    <main className="min-h-screen bg-[#121317] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <StrappsTopBar />

        <section className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="font-azeret text-xs uppercase tracking-[0.2em] text-[#f00707]">{cfg.title}</p>
            <h1 className="font-impact mt-3 text-4xl leading-tight sm:text-5xl">STRAPPS V1</h1>
            <p className="font-azeret mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{cfg.subtitle}</p>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="font-impact text-sm tracking-wide text-white/80">TEMPO RIMANENTE</p>
              <p className="font-impact mt-1 text-4xl text-[#f00707]">{cfg.timer}</p>
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
                    <button
                      key={size}
                      type="button"
                      className="font-azeret rounded-full border border-white/30 px-3 py-1 text-xs"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href={cfg.checkoutHref}
                className="font-azeret inline-flex rounded-full bg-[#f00707] px-6 py-3 text-sm font-black italic"
              >
                Acquista {cfg.price}
              </Link>
              {cfg.locked && cfg.lockLabel ? (
                <button
                  type="button"
                  className="font-azeret rounded-full border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wide"
                >
                  {cfg.lockLabel}
                </button>
              ) : null}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-3">
            <Image
              src={VARIANT_IMAGE[variant]}
              alt="Sneaker STRAPPS"
              width={900}
              height={640}
              className="h-auto w-full rounded-2xl object-cover"
              priority
            />
            <p className="font-azeret mt-3 text-center text-xs uppercase tracking-[0.16em] text-white/70">
              Prototipo prodotto - {cfg.title}
            </p>
          </div>
        </section>

        <InfoFooterCard />
      </div>
    </main>
  );
}
