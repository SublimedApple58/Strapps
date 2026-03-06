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

export function ProductScreen({ variant }: { variant: ProductVariant }) {
  const cfg = PRODUCT_CONFIGS[variant];

  const [shoeColor, setShoeColor] = useState<ShoeColor>("bianco");
  const [strapColor, setStrapColor] = useState<StrapColor>("bianco");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const images = PRODUCT_IMAGES[shoeColor][strapColor];

  const checkoutHref =
    `${cfg.checkoutHref}?scarpa=${shoeColor}&strappo=${strapColor}` +
    (selectedSize ? `&taglia=${selectedSize}` : "");

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

          {/* Colore scarpa */}
          <p className="font-impact text-[15px] tracking-[-0.333px]">SCEGLI IL COLORE DELLA SCARPA</p>
          <div className="mt-[11px] flex gap-[10px]">
            {shoeColors.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={c.label}
                onClick={() => setShoeColor(c.id)}
                className={`h-[25px] w-[25px] rounded-[2px] transition-all ${
                  shoeColor === c.id
                    ? "ring-2 ring-[#f00707] ring-offset-2 ring-offset-black"
                    : "opacity-60"
                }`}
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>

          {/* Colore strappo */}
          <p className="font-impact mt-[27px] text-[15px] tracking-[-0.333px]">SCEGLI IL COLORE DELLO STRAPPO</p>
          <div className="mt-[11px] flex gap-[10px]">
            {strapColors.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-label={c.label}
                onClick={() => setStrapColor(c.id)}
                className={`h-[25px] w-[25px] rounded-[2px] transition-all ${
                  strapColor === c.id
                    ? "ring-2 ring-[#f00707] ring-offset-2 ring-offset-black"
                    : "opacity-60"
                }`}
                style={{ backgroundColor: c.bg }}
              />
            ))}
          </div>

          {/* Taglia */}
          <p className="font-impact mt-[26px] text-[15px] tracking-[-0.333px]">SELEZIONA LA TAGLIA</p>
          <div className="mt-[14px] flex flex-wrap gap-[8px]">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`font-impact h-[32px] min-w-[40px] rounded-full border px-3 text-[13px] tracking-[-0.333px] transition-all ${
                  selectedSize === size
                    ? "border-[#f00707] bg-[#f00707] text-white"
                    : "border-white/30 text-white/60"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* CTA acquisto */}
          <div className="mt-[54px] flex flex-col items-center gap-[23px]">
            <Link
              href={checkoutHref}
              className="font-impact flex h-[42px] w-[200px] items-center justify-center rounded-[20px] bg-[#f00707] text-[15px] tracking-[-0.333px] text-white"
            >
              ACQUISTA {cfg.price}
            </Link>
            <p className="font-azeret text-center text-[7px] tracking-[-0.333px]">
              Rimborso garantito entro 14 giorni dalla consegna*
            </p>
          </div>

          {/* Lock price card */}
          <div className="mt-[51px] flex h-[102px] w-full items-center justify-between rounded-[52px] border border-white/15 bg-black px-6">
            <div>
              <p className="font-impact text-[14px] leading-snug tracking-[-0.333px]">
                Blocca la tua scarpa a questo prezzo per 30 giorni
              </p>
              <p className="font-azeret mt-[8px] text-[5px] tracking-[-0.333px]">
                Scalati dal saldo finale*
              </p>
            </div>
            <a
              href={`/checkout/estendi/${variant}?scarpa=${shoeColor}&strappo=${strapColor}`}
              className="font-impact flex h-[27px] w-[129px] flex-none items-center justify-center rounded-[20px] bg-[#f00707] text-[10px] tracking-[-0.333px] text-white"
            >
              ESTENDI&nbsp;&nbsp;49,00€
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
