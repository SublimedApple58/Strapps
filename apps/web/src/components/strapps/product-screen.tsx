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

const shoeColors: { id: ShoeColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

const strapColors: { id: StrapColor; label: string; bg: string }[] = [
  { id: "bianco", label: "Bianco", bg: "#d9d9d9" },
  { id: "nero", label: "Nero", bg: "#1e1e1e" },
];

const sizes = ["38", "39", "40", "41", "42", "43"];

export function ProductScreen({ variant, defaultEmail }: { variant: ProductVariant; defaultEmail?: string }) {
  const cfg = PRODUCT_CONFIGS[variant];

  const [shoeColor, setShoeColor] = useState<ShoeColor>("bianco");
  const [strapColor, setStrapColor] = useState<StrapColor>("bianco");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const images = PRODUCT_IMAGES[shoeColor][strapColor];

  const emailParam = defaultEmail ? `&email=${encodeURIComponent(defaultEmail)}` : "";
  const checkoutHref =
    `${cfg.checkoutHref}?scarpa=${shoeColor}&strappo=${strapColor}` +
    (selectedSize ? `&taglia=${selectedSize}` : "") +
    emailParam;

  return (
    <main className="min-h-screen bg-black pb-20 text-white">
      <div className="mx-auto w-full max-w-[390px] pt-8">

        <div className="px-[20px]">
          <SiteNavMenu />
        </div>

        {/* Timer */}
        <div className="mt-[37px] px-[20px] text-center">
          <p className="font-impact text-[20px] tracking-[-0.333px]">TEMPO RIMANENTE</p>
          <p className="font-impact text-[48px] tracking-[-0.333px] text-[#f00707]">30m 00s</p>
        </div>

        {/* Image slider — si aggiorna in base alla selezione colore */}
        <div className="relative left-1/2 mt-[19px] flex w-screen -translate-x-1/2 snap-x snap-mandatory overflow-x-auto hide-scrollbar">
          {images.map((src, i) => (
            <div key={src} className="relative aspect-square w-screen flex-none snap-start overflow-hidden">
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

        {/* Selezioni */}
        <div className="mt-[58px] px-[20px]">

          {/* CTA acquisto — sopra la selezione colori */}
          <div className="flex flex-col items-center gap-[16px]">
            <p className="font-impact text-[32px] tracking-[-0.5px]">{cfg.price}</p>
            <Link
              href={checkoutHref}
              className="font-impact flex h-[52px] w-[220px] items-center justify-center rounded-[26px] bg-[#f00707] text-[18px] tracking-[-0.333px] text-white"
            >
              ACQUISTA ORA
            </Link>
            <p className="font-azeret text-center text-[7px] tracking-[-0.333px]">
              Rimborso garantito entro 14 giorni dalla consegna*
            </p>
          </div>

          {/* Colori — due colonne centrate */}
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
                    onClick={() => setShoeColor(c.id)}
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
                    onClick={() => setStrapColor(c.id)}
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

          {/* Lock price card */}
          <div className="mt-[51px] w-full rounded-[28px] border border-white/15 bg-black px-6 py-5">
            <p className="font-impact text-[14px] leading-snug tracking-[-0.333px]">
              Blocca la tua scarpa a questo prezzo per 30 giorni
            </p>
            <p className="font-azeret mt-[6px] text-[5px] tracking-[-0.333px]">
              Scalati dal saldo finale*
            </p>
            <a
              href={`/checkout/estendi/${variant}?scarpa=${shoeColor}&strappo=${strapColor}`}
              className="font-impact mt-[16px] flex h-[34px] w-full items-center justify-center rounded-[20px] bg-[#f00707] text-[12px] tracking-[-0.333px] text-white"
            >
              ESTENDI&nbsp;&nbsp;49,00€
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
