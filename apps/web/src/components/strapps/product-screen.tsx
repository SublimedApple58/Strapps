"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import {
  type ProductVariant,
  type ShoeColor,
  type StrapColor,
  PRODUCT_CONFIGS,
  PRODUCT_PAGE_IMAGES,
} from "@/components/strapps/product-config";
import { fbqTrack } from "@/lib/meta-pixel";

const shoeColors: { id: ShoeColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

const strapColors: { id: StrapColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

const sizes = ["38", "39", "40", "41", "42", "43", "44"];

const TIER_ORDER: ProductVariant[] = ["first", "early", "last"];

export function ProductScreen({
  variant,
  rimasti,
  chiudeTra,
  allRimasti = {},
}: {
  variant: ProductVariant;
  rimasti?: number;
  chiudeTra?: string;
  allRimasti?: Partial<Record<ProductVariant, number>>;
}) {
  const cfg = PRODUCT_CONFIGS[variant];

  const [shoeColor, setShoeColor] = useState<ShoeColor>("bianco");
  const [strapColor, setStrapColor] = useState<StrapColor>("bianco");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    fbqTrack("ViewContent", {
      content_name: "STRAPPS V1",
      content_type: "product",
    });
  }, []);

  const images: string[] = PRODUCT_PAGE_IMAGES[shoeColor][strapColor];
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

        {/* Carosello con frecce ai bordi */}
        <div className="relative mt-[28px] w-full">
          <div className="mx-auto w-[80%] max-w-[312px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-black">
              <Image
                src={images[slideIndex]}
                alt={`STRAPPS V1 - angolo ${slideIndex + 1}`}
                fill
                unoptimized
                sizes="80vw"
                className="object-contain"
                priority={slideIndex === 0}
              />
              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-[5px]">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    aria-label={`Foto ${i + 1}`}
                    className={`h-[4px] rounded-full transition-all duration-200 ${
                      i === slideIndex ? "w-[14px] bg-white" : "w-[4px] bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Freccia sinistra */}
          <button
            onClick={prev}
            aria-label="Foto precedente"
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L3 6L8 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Freccia destra */}
          <button
            onClick={next}
            aria-label="Foto successiva"
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2L9 6L4 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Selezioni + CTA */}
        <div className="mt-[40px] px-[20px]">

          {/* 1. Colori */}
          <div className="flex justify-center gap-[48px]">
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
                      shoeColor === c.id ? "ring-2 ring-[#f00707] ring-offset-2 ring-offset-black" : ""
                    }`}
                    style={{ backgroundColor: c.bg }}
                  />
                ))}
              </div>
            </div>
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
                      strapColor === c.id ? "ring-2 ring-[#f00707] ring-offset-2 ring-offset-black" : ""
                    }`}
                    style={{ backgroundColor: c.bg }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 2. Taglia */}
          <p className="font-impact mt-[28px] text-center text-[13px] tracking-[-0.333px]">
            SELEZIONA LA TAGLIA
          </p>
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

          {/* Link guida taglie */}
          <div className="mt-[10px] flex justify-center">
            <Link
              href="/guida-taglie"
              className="font-azeret text-[10px] tracking-[-0.333px] text-white/50 underline underline-offset-2"
            >
              Visualizza guida alle taglie
            </Link>
          </div>

          {/* rimasti + chiude tra */}
          {(rimasti !== undefined || chiudeTra) && (
            <div className="mt-[16px] flex flex-wrap items-center justify-center gap-x-[14px] gap-y-[4px]">
              {rimasti !== undefined && (
                <p className="font-azeret text-[11px] font-medium tracking-[-0.333px]">
                  <span className="animate-pulse text-[#f00707]">● {rimasti}</span>
                  <span className="text-white"> rimasti</span>
                </p>
              )}
              {chiudeTra && (
                <p className="font-azeret text-[11px] tracking-[-0.333px]">
                  <span className="font-bold text-white">Chiude tra: </span>
                  <span className="font-light text-[#f00707]">{chiudeTra}</span>
                </p>
              )}
            </div>
          )}

          {/* 3. CTA acquisto */}
          <div className="mt-[16px] flex flex-col items-center gap-[8px]">
            <Link
              href={checkoutHref}
              onClick={() => fbqTrack("InitiateCheckout")}
              className="font-impact flex h-[52px] w-[260px] items-center justify-center rounded-[15px] bg-[#f00707] text-[18px] tracking-[-0.333px] text-white"
            >
              ACQUISTA&nbsp;&nbsp;{cfg.price}
            </Link>
            <p className="font-azeret text-center text-[6px] tracking-[-0.333px] text-white/50">
              Consegna in 5 giorni, reso entro 14 giorni dalla consegna
            </p>
          </div>

          {/* Drop tiers */}
          <div className="mt-[28px] flex items-start justify-between px-[4px]">
            {TIER_ORDER.map((t, idx) => {
              const tierCfg = PRODUCT_CONFIGS[t];
              const activeIdx = TIER_ORDER.indexOf(variant);
              const isActive = t === variant;
              const isPast = idx < activeIdx;
              const tierRimasti = isPast ? 0 : (allRimasti[t] ?? (isActive ? rimasti : undefined));
              return (
                <div key={t} className="flex items-start gap-[6px]">
                  <div className={isActive ? "opacity-100" : "opacity-40"}>
                    <p className="font-azeret text-[11px] font-black italic tracking-[-0.333px] text-white">
                      {tierCfg.tier}
                    </p>
                    <p className="font-azeret mt-[4px] text-[12px] font-light tracking-[-0.333px] text-white">
                      {tierCfg.price}
                    </p>
                    {tierRimasti !== undefined && (
                      <p className="font-azeret text-[11px] font-light tracking-[-0.333px] text-white">
                        rimasti:{" "}
                        {isActive ? (
                          <span className="animate-pulse text-[#f00707]">{tierRimasti}</span>
                        ) : isPast ? (
                          <span className="text-[#f00707]">0</span>
                        ) : (
                          <span className="text-white">{tierRimasti}</span>
                        )}
                      </p>
                    )}
                  </div>
                  {/* Freccia → tra i tier */}
                  {idx < 2 && (
                    <div className="mt-[3px] shrink-0">
                      <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                        <path d="M1 4H15M15 4L11 1M15 4L11 7" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 4. Card estensione */}
          <div className="mt-[36px] mx-auto w-fit rounded-[52px] bg-[#111111] px-8 pb-3 pt-4 flex flex-col items-center">
            <p className="font-impact text-center text-[12px] leading-snug tracking-[-0.333px] text-white">
              Blocca questo prezzo per 30 giorni
            </p>
            <a
              href={`/checkout/estendi/${variant}?scarpa=${shoeColor}&strappo=${strapColor}`}
              onClick={() => fbqTrack("InitiateCheckout")}
              className="font-impact mt-[12px] flex h-[27px] w-[129px] items-center justify-center rounded-[15px] bg-[#f00707] text-[10px] tracking-[-0.333px] text-white"
            >
              ESTENDI&nbsp;&nbsp;49,99€
            </a>
            <p className="font-averia mt-[6px] text-center text-[7px] font-normal tracking-[-0.333px] text-white/50">
              Scalati dal saldo finale*
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}
