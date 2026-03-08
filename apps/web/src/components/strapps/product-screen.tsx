"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import {
  type ProductVariant,
  type ShoeColor,
  type StrapColor,
  PRODUCT_CONFIGS,
  PRODUCT_IMAGES,
} from "@/components/strapps/product-config";
import { fbqTrack } from "@/lib/meta-pixel";

const TIER_PRICE_NUM: Record<ProductVariant, number> = {
  first: 189.99,
  early: 219.99,
  last: 239.99,
};

const shoeColors: { id: ShoeColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

const strapColors: { id: StrapColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

const sizes = ["38", "39", "40", "41", "42", "43", "44"];

export function ProductScreen({ variant }: { variant: ProductVariant }) {
  const cfg = PRODUCT_CONFIGS[variant];

  const [shoeColor, setShoeColor] = useState<ShoeColor>("bianco");
  const [strapColor, setStrapColor] = useState<StrapColor>("bianco");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const images = PRODUCT_IMAGES[shoeColor][strapColor];
  const total = images.length;

  const prev = () => setSlideIndex((i) => (i - 1 + total) % total);
  const next = () => setSlideIndex((i) => (i + 1) % total);

  const checkoutHref =
    `${cfg.checkoutHref}?scarpa=${shoeColor}&strappo=${strapColor}` +
    (selectedSize ? `&taglia=${selectedSize}` : "");

  return (
    <main className="min-h-screen bg-black pb-20 text-white">
      <div className="mx-auto w-full max-w-[390px] pt-8">

        <div className="px-[20px]">
          <SiteNavMenu />
        </div>

        {/* Carosello con frecce */}
        <div className="mx-auto mt-[28px] w-[80%] max-w-[312px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-black">
            <Image
              src={images[slideIndex]}
              alt={`STRAPPS V1 - angolo ${slideIndex + 1}`}
              fill
              unoptimized
              sizes="100vw"
              className="object-cover"
              priority={slideIndex === 0}
            />

            {/* Freccia sinistra */}
            <button
              onClick={prev}
              aria-label="Foto precedente"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Freccia destra */}
            <button
              onClick={next}
              aria-label="Foto successiva"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-[6px]">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`h-[5px] rounded-full transition-all duration-200 ${
                    i === slideIndex ? "w-[16px] bg-white" : "w-[5px] bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Selezioni */}
        <div className="mt-[58px] px-[20px]">

          {/* CTA acquisto */}
          <div className="flex flex-col items-center gap-[16px]">
            <p className="font-impact text-[32px] tracking-[-0.5px]">{cfg.price}</p>
            <Link
              href={checkoutHref}
              onClick={() => fbqTrack("InitiateCheckout", {
                value: TIER_PRICE_NUM[variant],
                currency: "EUR",
                checkout_type: "shoe",
                list_level: variant,
                content_ids: ["strapps_v1"],
                content_type: "product",
              })}
              className="font-impact flex h-[52px] w-[220px] items-center justify-center rounded-[26px] bg-[#f00707] text-[18px] tracking-[-0.333px] text-white"
            >
              ACQUISTA ORA
            </Link>
            <p className="font-azeret text-center text-[7px] tracking-[-0.333px]">
              Rimborso garantito entro 14 giorni dalla consegna*
            </p>
          </div>

          {/* Colori */}
          <div className="mt-[44px] flex justify-center gap-[48px]">
            {/* Scarpa */}
            <div>
              <p className="font-impact text-[13px] tracking-[-0.333px]">SCARPA</p>
              <div className="mt-[10px] flex gap-[8px]">
                {shoeColors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.label}
                    onClick={() => { setShoeColor(c.id); setSlideIndex(0); }}
                    className={`h-[44px] w-[44px] rounded-[6px] transition-all ${
                      shoeColor === c.id
                        ? "ring-2 ring-[#f00707] ring-offset-2 ring-offset-black"
                        : ""
                    }`}
                    style={{ backgroundColor: c.bg }}
                  />
                ))}
              </div>
            </div>

            {/* Strappo */}
            <div>
              <p className="font-impact text-[13px] tracking-[-0.333px]">STRAPPO</p>
              <div className="mt-[10px] flex gap-[8px]">
                {strapColors.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={c.label}
                    onClick={() => { setStrapColor(c.id); setSlideIndex(0); }}
                    className={`h-[44px] w-[44px] rounded-[6px] transition-all ${
                      strapColor === c.id
                        ? "ring-2 ring-[#f00707] ring-offset-2 ring-offset-black"
                        : ""
                    }`}
                    style={{ backgroundColor: c.bg }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Taglia */}
          <p className="font-impact mt-[28px] text-center text-[13px] tracking-[-0.333px]">SELEZIONA LA TAGLIA</p>
          <div className="mt-[14px] flex flex-wrap justify-center gap-[8px]">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`font-impact flex h-[40px] w-[40px] items-center justify-center rounded-full border text-[13px] tracking-[-0.333px] transition-all ${
                  selectedSize === size
                    ? "border-[#f00707] bg-black text-[#f00707]"
                    : "border-white/20 bg-white/5 text-white/70"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
