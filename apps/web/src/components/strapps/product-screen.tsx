import Image from "next/image";
import Link from "next/link";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";

export type ProductVariant = "first" | "early" | "last";

type ProductConfig = {
  tier: string;
  price: string;
  checkoutHref: string;
};

export const PRODUCT_CONFIGS: Record<ProductVariant, ProductConfig> = {
  first: {
    tier: "FIRST 60",
    price: "189,99€",
    checkoutHref: "/checkout/first",
  },
  early: {
    tier: "EARLY 140",
    price: "219,99€",
    checkoutHref: "/checkout/early",
  },
  last: {
    tier: "LAST 90",
    price: "239,99€",
    checkoutHref: "/checkout/last",
  },
};

const shoeColors = [
  { label: "Bianco", bg: "#d9d9d9" },
  { label: "Nero", bg: "#1e1e1e" },
];

const strapColors = [
  { label: "Bianco", bg: "#d9d9d9" },
  { label: "Nero", bg: "#1e1e1e" },
];

const sizes = ["38", "39", "40", "41", "42", "43"];

const productImages = ["/hero_image.png", "/hero_image.png"];

export function ProductScreen({ variant }: { variant: ProductVariant }) {
  const cfg = PRODUCT_CONFIGS[variant];

  return (
    <main className="min-h-screen bg-black pb-20 text-white">
      <div className="mx-auto w-full max-w-[390px] pt-8">

        {/* Nav */}
        <div className="px-[20px]">
          <SiteNavMenu />
        </div>

        {/* Timer */}
        <div className="mt-[37px] px-[20px] text-center">
          <p className="font-impact text-[20px] tracking-[-0.333px]">TEMPO RIMANENTE</p>
          <p className="font-impact text-[48px] tracking-[-0.333px] text-[#f00707]">30m 00s</p>
        </div>

        {/* Image slider — full bleed, swipe invisibile, niente frecce */}
        <div className="relative left-1/2 mt-[19px] flex w-screen -translate-x-1/2 snap-x snap-mandatory overflow-x-auto hide-scrollbar">
          {productImages.map((src, i) => (
            <div key={i} className="relative aspect-[333/313] w-screen flex-none snap-start overflow-hidden">
              <Image
                src={src}
                alt={`STRAPPS V1 - foto ${i + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        {/* Selezioni e CTA */}
        <div className="mt-[58px] px-[20px]">

          {/* Colore scarpa */}
          <p className="font-impact text-[15px] tracking-[-0.333px]">SCEGLI IL COLORE DELLA SCARPA</p>
          <div className="mt-[11px] flex gap-[10px]">
            {shoeColors.map((c) => (
              <button
                key={c.label}
                type="button"
                aria-label={c.label}
                className="h-[25px] w-[25px] rounded-[2px]"
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>

          {/* Colore strappo */}
          <p className="font-impact mt-[27px] text-[15px] tracking-[-0.333px]">SCEGLI IL COLORE DELLO STRAPPO</p>
          <div className="mt-[11px] flex gap-[10px]">
            {strapColors.map((c) => (
              <button
                key={c.label}
                type="button"
                aria-label={c.label}
                className="h-[25px] w-[25px] rounded-[2px]"
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>

          {/* Taglia */}
          <p className="font-impact mt-[26px] text-[15px] tracking-[-0.333px]">SELEZIONA LA TAGLIA</p>
          <p className="font-impact mt-[20px] text-[15px] tracking-[-0.333px]">{sizes.join(" - ")}</p>

          {/* CTA acquisto */}
          <div className="mt-[54px] flex flex-col items-center gap-[23px]">
            <Link
              href={cfg.checkoutHref}
              className="font-impact flex h-[42px] w-[200px] items-center justify-center rounded-[20px] bg-[#f00707] text-[15px] tracking-[-0.333px] text-white"
            >
              ACQUISTA {cfg.price}
            </Link>
            <p className="font-azeret text-center text-[7px] tracking-[-0.333px]">
              Rimborso garantito entro 14 giorni dalla consegna*
            </p>
          </div>

          {/* Lock price card */}
          <div className="mt-[51px] flex h-[102px] w-full items-center justify-center rounded-[52px] border border-white/15 bg-black">
            <div className="px-6 text-center">
              <p className="font-impact text-[14px] leading-snug tracking-[-0.333px]">
                Blocca la tua scarpa a questo prezzo per 30 giorni
              </p>
              <p className="font-azeret mt-[8px] text-[5px] tracking-[-0.333px]">
                Scalati dal saldo finale*
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
