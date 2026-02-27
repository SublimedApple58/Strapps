"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const imgHero = "/figma/home-v2/hero.png";
const imgBarDots = "/figma/home-v2/menu.svg";
const imgDivider = "/figma/home-v2/line-main.svg";
const imgSoftDivider = "/figma/home-v2/line-soft.svg";
const imgTierDivider = "/figma/home-v2/line-tier.svg";
const imgCurveLeft = "/figma/home-v2/curve-left.svg";
const imgCurveRight = "/figma/home-v2/curve-right.svg";
const imgCircleButton = "/figma/home-v2/circle.svg";
const imgArrow = "/figma/home-v2/arrow.svg";
const imgHugeCurve = "/figma/home-v2/curve-bottom.svg";

const DESIGN_WIDTH = 375;
const CANVAS_HEIGHT = 2910;
const STATUS_BAR_HEIGHT = 44;
const DESIGN_HEIGHT = CANVAS_HEIGHT - STATUS_BAR_HEIGHT;
const MAX_SCALE = 1.42;

export default function Home() {
  const frameHostRef = useRef<HTMLDivElement>(null);
  const [frameWidth, setFrameWidth] = useState(DESIGN_WIDTH);

  useEffect(() => {
    const host = frameHostRef.current;
    if (!host) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      setFrameWidth(entry.contentRect.width);
    });

    resizeObserver.observe(host);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const scale = Math.min(frameWidth / DESIGN_WIDTH, MAX_SCALE);
  const viewportHeight = Math.round(DESIGN_HEIGHT * scale);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#1f2024] px-2 py-6 sm:px-6 sm:py-10">
      <div ref={frameHostRef} className="mx-auto w-full max-w-[760px]">
        <div className="relative w-full overflow-hidden bg-black" style={{ height: `${viewportHeight}px` }}>
          <main
            className="absolute left-1/2 top-0"
            style={{
              width: `${DESIGN_WIDTH}px`,
              height: `${DESIGN_HEIGHT}px`,
              transform: `translateX(-50%) scale(${scale})`,
              transformOrigin: "top center",
            }}
          >
            <div className="relative h-[2910px] w-[375px] -translate-y-[44px] overflow-hidden bg-black text-white">
              <div className="absolute inset-0 bg-black" />

              <div className="absolute left-0 top-[95px] h-[491px] w-[375px] overflow-hidden">
                <img
                  src={imgHero}
                  alt="Sneakers STRAPPS"
                  className="absolute left-[-19.2%] top-[-0.03%] h-[100.05%] w-[137.33%] max-w-none"
                />
              </div>

              <div className="absolute left-[16px] top-[63px]">
                <div className="h-[32px] w-[340px] rounded-[10px] bg-[#f00707]" />
                <img
                  src={imgBarDots}
                  alt=""
                  aria-hidden
                  className="absolute left-[158px] top-[13px] h-[6px] w-[24px]"
                />
                <p className="font-rounded absolute left-[10px] top-[8px] text-[13px] tracking-[-0.333px] text-white">
                  STRAPPS
                </p>
              </div>

              <p className="font-azeret absolute left-[34px] top-[673px] w-[308px] text-[12px] leading-normal tracking-[-0.333px] text-white">
                STIAMO RIDISEGNANDO IL PASSATO PER CHI SE NE FREGA DEL FUTURO
              </p>

              <div className="font-azeret absolute left-[33px] top-[725px] w-[309px] text-[10px] leading-normal tracking-[-0.333px] text-white">
                <p>Ogni uscita e gia piena di cose:</p>
                <p>non aggiungerci anche i lacci.</p>
                <br />
                <p>STRAPPS ti da controllo in 1 gesto:</p>
                <p>O ti allacci al passato o tiri un altro strappo</p>
              </div>

              <div className="absolute left-[26px] top-[863px] flex h-px w-[325px] items-center justify-center">
                <div className="h-0 w-[325.002px] rotate-[0.18deg]">
                  <img src={imgSoftDivider} alt="" aria-hidden className="w-full" />
                </div>
              </div>

              <p className="font-azeret absolute left-[99px] top-[910px] text-[20px] font-black italic tracking-[-0.333px] text-[#f00707]">
                COS&apos;E STRAPPS
              </p>

              <section className="absolute left-[34px] top-[973px] w-[309px]">
                <h2 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">
                  DROP SU RICHIESTA
                </h2>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-normal tracking-[-0.333px]">
                  Produciamo solo cio che viene ordinato.
                  <br />
                  Niente magazzino, niente overproduction.
                </p>
              </section>

              <section className="absolute left-[34px] top-[1082px] w-[309px]">
                <h2 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">
                  PRODUZIONE TRACCIATA
                </h2>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-normal tracking-[-0.333px]">
                  Aggiornamenti via email durante ogni fase del drop.
                  <br />
                  Sai sempre a che punto e la tua scarpa.
                </p>
              </section>

              <section className="absolute left-[33px] top-[1191px] w-[309px]">
                <h2 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">
                  PAGAMENTI VERIFICATI
                </h2>
                <p className="font-azeret mt-[14px] text-[12px] font-light leading-normal tracking-[-0.333px]">
                  Pagamento sicuro + ricevuta immediata.
                  <br />
                  Contatti reali e assistenza diretta.
                </p>
              </section>

              <div className="absolute left-[26px] top-[1312px] flex h-[0.984px] w-[325px] items-center justify-center">
                <div className="h-0 w-[325.001px] rotate-[0.17deg]">
                  <img src={imgDivider} alt="" aria-hidden className="w-full" />
                </div>
              </div>

              <div className="absolute left-[25px] top-[1597px] flex h-[0.984px] w-[325px] items-center justify-center">
                <div className="h-0 w-[325.001px] rotate-[0.17deg]">
                  <img src={imgDivider} alt="" aria-hidden className="w-full" />
                </div>
              </div>

              <img
                src={imgCurveLeft}
                alt=""
                aria-hidden
                className="absolute left-[-264px] top-[598px] h-[754px] w-[378px]"
              />
              <div className="absolute left-[243px] top-[341px] h-[1448px] w-[545px] -rotate-[69.37deg] origin-top-left">
                <img src={imgCurveRight} alt="" aria-hidden className="h-full w-full" />
              </div>

              <p className="font-azeret absolute left-[31px] top-[1374px] w-[313px] text-center text-[15px] font-black italic leading-normal tracking-[-0.333px] text-[#f00707]">
                ISCRIVITI ALLA NEWSLETTER PER NON PERDERTI IL LANCIO
              </p>

              <p className="font-azeret absolute left-[33px] top-[1455px] text-[13px] font-black italic tracking-[-0.333px]">
                FATTI AVVISARE*
              </p>

              <div className="absolute left-[25px] top-[1477px] h-[50px] w-[317px] rounded-[20px] bg-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
                <input
                  type="email"
                  placeholder="POSTA EMAIL"
                  aria-label="Email newsletter"
                  className="font-azeret h-full w-[260px] bg-transparent pl-[18px] text-[12px] text-black placeholder:text-[#616161] focus:outline-none"
                />
              </div>

              <img
                src={imgCircleButton}
                alt=""
                aria-hidden
                className="absolute left-[294px] top-[1480px] h-[44px] w-[44px]"
              />
              <img
                src={imgArrow}
                alt=""
                aria-hidden
                className="absolute left-[304px] top-[1494px] h-[14px] w-[25px]"
              />

              <p className="font-rounded absolute left-1/2 top-[1534px] -translate-x-1/2 text-center text-[12px] tracking-[-0.333px]">
                Chiude tra: 6g 23h 59m
              </p>

              <p className="font-impact absolute left-1/2 top-[1623px] -translate-x-1/2 text-center text-[20px] tracking-[-0.333px] text-[#f00707]">
                SCEGLI IL TUO ACCESSO
              </p>

              <section className="absolute left-[32px] top-[1697px] w-[309px]">
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">
                  FIRST 60
                </h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-normal tracking-[-0.333px]">
                  189.99€
                  <br />
                  Ticket valido 30 minuti
                  <br />
                  Rimasti: 60
                </p>
                <Link
                  href="/prodotto/first"
                  className="font-azeret mt-[34px] ml-[80px] flex h-[35px] w-[149px] items-center justify-center rounded-[20px] bg-[rgba(82,78,78,0.2)] text-[13px] font-black italic tracking-[-0.333px]"
                >
                  SBLOCCA 1€
                </Link>
              </section>

              <div className="absolute left-0 top-[1877px] flex h-px w-[375px] items-center justify-center">
                <div className="h-0 w-[375.001px] rotate-[0.15deg]">
                  <img src={imgTierDivider} alt="" aria-hidden className="w-full" />
                </div>
              </div>

              <p className="font-rounded absolute left-1/2 top-[1843px] -translate-x-1/2 text-center text-[12px] tracking-[-0.333px]">
                Apre tra: 6g 23h 59m
              </p>

              <section className="absolute left-[33px] top-[1936px] w-[309px]">
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">
                  EARLY 140
                </h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-normal tracking-[-0.333px]">
                  219.99€
                  <br />
                  Si attiva alla chiusura del livello precedente
                </p>
                <Link
                  href="/prodotto/early"
                  className="font-azeret mt-[34px] ml-[79px] flex h-[35px] w-[149px] items-center justify-center rounded-[20px] bg-[rgba(82,78,78,0.2)] text-[13px] font-black italic tracking-[-0.333px]"
                >
                  SBLOCCA 1€
                </Link>
              </section>

              <div className="absolute left-0 top-[2127px] flex h-px w-[375px] items-center justify-center">
                <div className="h-0 w-[375.001px] rotate-[0.15deg]">
                  <img src={imgTierDivider} alt="" aria-hidden className="w-full" />
                </div>
              </div>

              <section className="absolute left-[33px] top-[2184px] w-[309px]">
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">
                  LAST 90
                </h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-normal tracking-[-0.333px]">
                  239.99€
                  <br />
                  Si attiva alla chiusura del livello precedente.
                </p>
                <Link
                  href="/prodotto/last"
                  className="font-azeret mt-[34px] ml-[88px] flex h-[35px] w-[149px] items-center justify-center rounded-[20px] bg-[rgba(82,78,78,0.2)] text-[13px] font-black italic tracking-[-0.333px]"
                >
                  VAI
                </Link>
              </section>

              <div className="absolute left-[243px] top-[1889px] flex h-[2173px] w-[1222.8px] items-center justify-center">
                <div className="h-[609.13px] w-[2086.856px] rotate-[72.04deg]">
                  <img src={imgHugeCurve} alt="" aria-hidden className="h-full w-full" />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
