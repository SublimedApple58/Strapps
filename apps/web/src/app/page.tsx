import Image from "next/image";
import Link from "next/link";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import { getActiveTier } from "@/components/strapps/access-tier-schedule";
import { ScrollCta } from "@/components/strapps/scroll-cta";

const HERO_IMAGE = "/home/hero_new.jpg";
const DARK_IMAGE = "/home/dark_editorial.jpg";

export const revalidate = 60;

export default async function Home() {
  const activeTier = getActiveTier(Date.now());

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-[390px] px-0 pb-0 pt-8">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[390px] px-[10px]">
          <SiteNavMenu />

          <h1 className="font-azeret relative z-20 mt-[44px] text-center text-[22px] leading-[1.2] tracking-[0.1px] text-white">
            <span className="font-medium">CONTROLLO</span>
            <span className="font-bold"> IN 1 GESTO</span>
          </h1>

          <div className="-mt-[18px] overflow-hidden rounded-[12px]">
            <Image
              src={HERO_IMAGE}
              alt="Sneaker STRAPPS bianca e nera"
              width={374}
              height={374}
              sizes="calc(100vw - 20px)"
              className="w-full h-auto"
              priority
            />
          </div>

          <div className="relative z-10 mt-[16px]">
            <p className="font-alumni text-center text-[33.5px] font-extrabold leading-none tracking-[-0.1px] text-white">
              STRAPPS V1
            </p>
            <p className="font-azeret mt-[3px] text-center text-[11px] font-medium tracking-[0.5px] text-white">
              290 SCARPE NUMERATE
            </p>
            <div className="mt-[2px] flex justify-center">
              <ScrollCta targetId="cos-e-strapps" />
            </div>
            <div className="mt-[10px] flex items-center justify-center gap-[5px]">
              <span className="h-[5px] w-[5px] rounded-full bg-[#00ff1e]" />
              <p className="font-azeret text-[5px] font-medium tracking-[0.5px] text-[#00ff1e] opacity-80">
                LISTE APERTE ORA
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────── */}
      <div className="mx-auto mt-[46px] w-[calc(100vw-52px)] max-w-[660px]">
        <div className="h-[3px] w-full rounded-full bg-[#f00707]" />
      </div>

      {/* ── COS'È STRAPPS ─────────────────────────────────────────── */}
      <section
        id="cos-e-strapps"
        className="mx-auto mt-[46px] w-full max-w-[390px] scroll-mt-10 pb-[48px] px-[22px]"
      >
          <h2 className="font-alumni text-center text-[28px] font-black italic tracking-[-0.333px] text-[#f00707]">
            COS&apos;È&nbsp;&nbsp;STRAPPS
          </h2>

          {/* 2 colonne */}
          <div className="mt-[36px] flex gap-[18px]">
            {/* Colonna sinistra */}
            <div className="flex-1">
              <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px] text-white">
                BORN IN 2026
              </h3>
              <p className="font-azeret mt-[12px] text-[11px] font-light leading-[1.4] tracking-[-0.333px] text-white">
                Nasciamo nel 2026 con una missione chiara e semplice: dare la
                possibilità alle persone di rinunciare alle stringhe senza
                rinunciare allo stile
              </p>
            </div>

            {/* Colonna destra */}
            <div className="flex-1 text-right">
              <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px] text-white">
                DROP LIMITATI
              </h3>
              <p className="font-azeret mt-[12px] text-[12px] font-light leading-[1.4] tracking-[-0.333px] text-white">
                Produciamo solo 290 scarpe, per perseguire la massima efficienza
                produttiva evitando over-production
              </p>
            </div>
          </div>

          {/* PAGAMENTI VERIFICATI */}
          <div className="mt-[48px] text-center">
            <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px] text-white">
              PAGAMENTI VERIFICATI + CONSEGNA RAPIDA
            </h3>
            <p className="font-azeret mt-[12px] text-[12px] font-light leading-[1.4] tracking-[-0.333px] text-white">
              Pagamento sicuro + ricevuta immediata.
              <br />
              Contatti reali e assistenza diretta.
              <br />
              Consegna in 5 giorni dal nostro magazzino
            </p>
          </div>
      </section>

      {/* ── DARK IMAGE + VAI AL DROP ──────────────────────────────── */}
      <div className="relative w-full overflow-hidden">
        <Image
          src={DARK_IMAGE}
          alt="STRAPPS V1 drop"
          width={375}
          height={313}
          sizes="100vw"
          className="w-full h-auto"
        />
        {activeTier && (
          <div className="absolute inset-0 flex items-end justify-center pb-[32px]">
            <Link
              href={`/prodotto/${activeTier}`}
              className="font-alumni inline-flex h-[42px] items-center gap-[8px] rounded-[40px] bg-[#f00707] pl-5 pr-3 text-[20px] font-black leading-none tracking-[-0.333px] text-white"
            >
              VAI AL DROP
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-black/30">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path
                    d="M3 11L11 3M11 3H5.5M11 3V8.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        )}
      </div>

      {/* ── DIVIDER ───────────────────────────────────────────────── */}
      <div className="mx-auto mt-[12px] mb-[48px] w-[calc(100vw-52px)] max-w-[660px]">
        <div className="h-[3px] w-full rounded-full bg-[#f00707]" />
      </div>
    </main>
  );
}
