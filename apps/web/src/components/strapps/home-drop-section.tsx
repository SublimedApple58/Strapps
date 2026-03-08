"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT_IMAGES, type ShoeColor, type StrapColor } from "@/components/strapps/product-config";
import {
  getActiveTier,
  getCountdownView,
  getRemainingTime,
} from "@/components/strapps/access-tier-schedule";
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
  rimasti: number;
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
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const activeTier = useMemo(() => (now !== null ? getActiveTier(now) : null), [now]);
  const countdownView = useMemo(() => (now !== null ? getCountdownView(now) : null), [now]);
  const countdownRemaining = useMemo(
    () => (countdownView && now !== null ? getRemainingTime(countdownView.target, now) : null),
    [countdownView, now],
  );

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

      {/* Carosello — immagine contenuta, frecce ai bordi dello schermo */}
      <div className="relative mt-[28px] w-full">
        {/* Immagine */}
        <div className="mx-auto w-[85%] max-w-[330px]">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] bg-black">
            <Image
              src={images[slideIndex]}
              alt={`STRAPPS V1 - angolo ${slideIndex + 1}`}
              fill
              unoptimized
              sizes="85vw"
              className="object-cover"
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

        {/* Freccia sinistra — bordo schermo */}
        <button
          onClick={prev}
          aria-label="Foto precedente"
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L3 6L8 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Freccia destra — bordo schermo */}
        <button
          onClick={next}
          aria-label="Foto successiva"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 2L9 6L4 10" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Selettori colore + ENTRA — allineati in basso */}
      <div className="mx-auto mt-[24px] flex w-[calc(100vw-68px)] max-w-[360px] items-end justify-between">
        <div className="flex gap-[24px]">
          {/* SCARPA */}
          <div>
            <p className="font-impact text-[10px] tracking-[-0.333px] text-white/60">SCARPA</p>
            <div className="mt-[6px] flex gap-[5px]">
              {shoeColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.label}
                  onClick={() => { setShoeColor(c.id); setSlideIndex(0); }}
                  className={`h-[26px] w-[26px] rounded-[4px] transition-all ${
                    shoeColor === c.id ? "ring-2 ring-[#f00707] ring-offset-1 ring-offset-black" : ""
                  }`}
                  style={{ backgroundColor: c.bg }}
                />
              ))}
            </div>
          </div>

          {/* STRAPPO */}
          <div>
            <p className="font-impact text-[10px] tracking-[-0.333px] text-white/60">STRAPPO</p>
            <div className="mt-[6px] flex gap-[5px]">
              {strapColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  aria-label={c.label}
                  onClick={() => { setStrapColor(c.id); setSlideIndex(0); }}
                  className={`h-[26px] w-[26px] rounded-[4px] transition-all ${
                    strapColor === c.id ? "ring-2 ring-[#f00707] ring-offset-1 ring-offset-black" : ""
                  }`}
                  style={{ backgroundColor: c.bg }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ENTRA */}
        {activeTier ? (
          <Link
            href={`/prodotto/${activeTier}`}
            className="font-azeret flex h-[38px] w-[86px] items-center justify-center rounded-[20px] bg-[#f00707] text-[13px] font-black italic tracking-[-0.333px] text-white"
          >
            ENTRA
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="font-azeret flex h-[38px] w-[86px] cursor-not-allowed select-none items-center justify-center rounded-[20px] bg-[#f00707] text-[13px] font-black italic tracking-[-0.333px] text-white opacity-40"
          >
            ENTRA
          </span>
        )}
      </div>

      {/* Tutti i tier in griglia 3 colonne, senza divider */}
      <div className="mx-auto mt-[36px] w-[calc(100vw-68px)] max-w-[360px]">
        <div className="grid grid-cols-3 gap-x-[8px]">
          {tiers.map((tier) => {
            const isActive = now !== null && tier.id === activeTier;
            const isDimmed = now !== null && activeTier !== null && !isActive;

            return (
              <div
                key={tier.id}
                className={`transition-opacity duration-300 ${isDimmed ? "opacity-60" : ""}`}
              >
                <h3 className="font-azeret text-[11px] font-black italic tracking-[-0.333px] text-white">
                  {tier.name}
                </h3>
                <div className="font-azeret mt-[10px] text-[11px] font-light leading-[1.4] tracking-[-0.333px] text-white">
                  <p>{tier.price}</p>
                  <p>
                    rimasti:{" "}
                    <span className={isActive ? "text-green-400" : "text-white/60"}>
                      {tier.rimasti}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Countdown unico */}
        {countdownView && countdownRemaining && (
          <p className="font-azeret mt-[20px] text-[11px] font-light tracking-[-0.333px] text-white/60">
            {countdownView.label}:{" "}
            {countdownRemaining.days}g&nbsp;&nbsp;
            {countdownRemaining.hours}h&nbsp;&nbsp;
            {countdownRemaining.minutes}m
          </p>
        )}
      </div>
    </div>
  );
}
