import Image from "next/image";
import Link from "next/link";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";
import { getSaleCount, initSalesTable } from "@/lib/sales-counter";
import { HomeDropSection } from "@/components/strapps/home-drop-section";
import { getActiveTier } from "@/components/strapps/access-tier-schedule";

const HERO_IMAGE = "/hero_image.png";

const TIER_CAPACITY: Record<string, number> = {
  first: 60,
  early: 140,
  last: 90,
};

export const revalidate = 60; // rilegge i contatori ogni 60 secondi

export default async function Home() {
  let firstSold = 0;
  try {
    await initSalesTable();
    firstSold = await getSaleCount("acquisto", "first");
  } catch {
    // se il DB non è disponibile, mostra il fallback
  }
  const firstRimasti = Math.min(49, Math.max(0, TIER_CAPACITY.first - firstSold));
  const activeTier = getActiveTier(Date.now());

  const tiers = [
    {
      id: "first" as const,
      name: "FIRST 60",
      price: "189.99€",
      originalPrice: "239.99€",
      rimasti: firstRimasti,
    },
    {
      id: "early" as const,
      name: "EARLY 140",
      price: "219.99€",
      originalPrice: "239.99€",
      rimasti: TIER_CAPACITY.early,
    },
    {
      id: "last" as const,
      name: "LAST 90",
      price: "239.99€",
      rimasti: TIER_CAPACITY.last,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-12">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[390px]">
          <SiteNavMenu />

          <h1 className="font-azeret relative z-20 mt-[21px] text-center text-[22px] font-black leading-[1.2] tracking-[-0.333px] text-white">
            CONTROLLO IN 1 GESTO
          </h1>

          <div className="relative left-1/2 -mt-[12px] aspect-[375/490] w-screen -translate-x-1/2 overflow-hidden sm:w-full">
            <Image
              src={HERO_IMAGE}
              alt="Sneaker STRAPPS bianca e nera"
              fill
              sizes="(max-width: 640px) 100vw, 390px"
              className="object-cover object-center scale-[1.12]"
              priority
            />
          </div>

          <div className="relative z-10 -mt-[120px]">
            <p className="font-impact text-center text-[20px] tracking-[-0.333px] text-white">STRAPPS V1</p>
            <p className="font-azeret mt-[6px] text-center text-[11px] font-normal tracking-[-0.333px] text-white">
              290 SCARPE NUMERATE
            </p>
            <a
              href="#scegli-il-tuo-accesso"
              className="font-alumni mx-auto mt-[13px] flex h-[42px] w-[170px] items-center justify-center gap-[6px] rounded-[40px] bg-[#f00707] text-[20px] font-black leading-none tracking-[-0.333px] text-white"
            >
              SCOPRI IL DROP
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M6.5 2v9M2 7l4.5 4.5L11 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <p className="font-azeret mt-[12px] text-center text-[8px] font-medium tracking-[-0.333px] text-white/80">
              LISTE APERTE ORA
            </p>
          </div>
        </section>

        {/* ── SCEGLI IL TUO ACCESSO ────────────────────────────────── */}
        <section id="scegli-il-tuo-accesso" className="mt-14 scroll-mt-10">
          <h2 className="font-impact text-center text-[20px] font-normal tracking-[-0.333px] text-[#f00707]">
            SCEGLI IL TUO ACCESSO
          </h2>

          <HomeDropSection tiers={tiers} delivery="Consegna garantita entro il 07/07" />
        </section>

        {/* ── COS'È STRAPPS ────────────────────────────────────────── */}
        <section className="mt-14">
          <div className="mx-auto w-[calc(100vw-52px)] max-w-[660px]">
            <div className="h-[3px] w-full rounded-full bg-[#f00707]" />

            <h2 className="font-azeret mt-[46px] text-center text-[20px] font-black italic tracking-[-0.333px] text-[#f00707]">
              COS&apos;È STRAPPS
            </h2>

            <div className="mt-[46px] space-y-[62px]">
              <article>
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">DROP SU RICHIESTA</h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                  Produciamo solo ciò che viene ordinato.
                  <br />
                  Niente magazzino, niente overproduction.
                </p>
              </article>

              <article>
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">PRODUZIONE TRACCIATA</h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                  Aggiornamenti via email durante ogni fase del drop.
                  <br />
                  Sai sempre a che punto è la tua scarpa.
                </p>
              </article>

              <article>
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">PAGAMENTI VERIFICATI</h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                  Pagamento sicuro + ricevuta immediata.
                  <br />
                  Contatti reali e assistenza diretta.
                </p>
              </article>
            </div>

            {/* Bottone VAI AL DROP — solo se c'è un tier attivo */}
            {activeTier && (
              <div className="mt-[36px] flex justify-center">
                <Link
                  href={`/prodotto/${activeTier}`}
                  className="font-impact inline-flex h-[52px] items-center gap-3 rounded-full bg-[#f00707] pl-6 pr-3 text-[15px] tracking-[-0.333px] text-white"
                >
                  VAI AL DROP
                  <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-black/30">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
}
