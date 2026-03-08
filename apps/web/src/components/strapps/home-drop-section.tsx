"use client";

import { useState } from "react";
import Image from "next/image";
import { PRODUCT_IMAGES, type ShoeColor, type StrapColor } from "@/components/strapps/product-config";
import { AccessTierCta } from "@/components/strapps/access-tier-cta";
import { AccessTierCountdown } from "@/components/strapps/access-tier-countdown";
import type { TierId } from "@/components/strapps/access-tier-schedule";

const shoeColors: { id: ShoeColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

const strapColors: { id: StrapColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

type TierData = {
  id: TierId;
  name: string;
  price: string;
  originalPrice?: string;
  rimasti?: number;
};

export function HomeDropSection({
  tiers,
  delivery,
}: {
  tiers: TierData[];
  delivery: string;
}) {
  const [shoeColor, setShoeColor] = useState<ShoeColor>("bianco");
  const [strapColor, setStrapColor] = useState<StrapColor>("bianco");
  const [slideIndex, setSlideIndex] = useState(0);

  const images = PRODUCT_IMAGES[shoeColor][strapColor];
  const total = images.length;

  const prev = () => setSlideIndex((i) => (i - 1 + total) % total);
  const next = () => setSlideIndex((i) => (i + 1) % total);

  return (
    <div>
      {/* Delivery */}
      <p className="font-azeret mt-6 text-center text-[11px] font-light leading-[1.2] tracking-[-0.333px] text-white">
        {delivery}
      </p>

      {/* Carosello scarpa */}
      <div className="relative left-1/2 mt-[28px] w-screen -translate-x-1/2">
        <div className="relative aspect-square w-full overflow-hidden bg-black">
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

      {/* Selettori colore */}
      <div className="mx-auto mt-[28px] flex w-[calc(100vw-68px)] max-w-[660px] justify-center gap-[48px]">
        {/* SCARPA */}
        <div>
          <p className="font-impact text-[11px] tracking-[-0.333px] text-white/60">SCARPA</p>
          <div className="mt-[8px] flex gap-[6px]">
            {shoeColors.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={c.label}
                onClick={() => {
                  setShoeColor(c.id);
                  setSlideIndex(0);
                }}
                className={`h-[28px] w-[28px] rounded-[5px] transition-all ${
                  shoeColor === c.id
                    ? "ring-2 ring-[#f00707] ring-offset-1 ring-offset-black"
                    : ""
                }`}
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>
        </div>

        {/* STRAPPO */}
        <div>
          <p className="font-impact text-[11px] tracking-[-0.333px] text-white/60">STRAPPO</p>
          <div className="mt-[8px] flex gap-[6px]">
            {strapColors.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={c.label}
                onClick={() => {
                  setStrapColor(c.id);
                  setSlideIndex(0);
                }}
                className={`h-[28px] w-[28px] rounded-[5px] transition-all ${
                  strapColor === c.id
                    ? "ring-2 ring-[#f00707] ring-offset-1 ring-offset-black"
                    : ""
                }`}
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lista tier */}
      <div className="mt-[58px]">
        {tiers.map((tier, index) => (
          <div key={tier.id}>
            <article
              className={`mx-auto w-[calc(100vw-68px)] max-w-[660px] ${index > 0 ? "mt-[58px]" : ""}`}
            >
              <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">
                {tier.name}
              </h3>
              <div className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                <p className="flex items-baseline gap-2">
                  <span>{tier.price}</span>
                  {tier.originalPrice ? (
                    <span className="text-white/55 line-through decoration-white/60">
                      {tier.originalPrice}
                    </span>
                  ) : null}
                </p>
                {tier.rimasti !== undefined ? (
                  <span className="block">
                    rimasti: <span className="text-green-400">{tier.rimasti}</span>
                  </span>
                ) : null}
              </div>

              <AccessTierCta
                tier={tier.id}
                href={`/prodotto/${tier.id}`}
                label="ENTRA"
                className="font-azeret mx-auto mt-[31px] flex h-[35px] w-[100px] items-center justify-center rounded-[20px] bg-[#f00707] text-[13px] font-black italic tracking-[-0.333px] text-white"
              />
              <AccessTierCountdown
                tier={tier.id}
                className="font-azeret mt-[12px] text-center text-[11px] font-light tracking-[-0.333px] text-white/60"
              />
            </article>

            {index < tiers.length - 1 && (
              <div className="relative left-1/2 mt-10 h-px w-screen -translate-x-1/2 bg-white" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
