import Link from "next/link";
import { FrameViewport } from "./frame-viewport";
import { InfoFooterCard, StrappsTopBar } from "./common";

const imgShoeBlack = "/figma/shop/shoe-black.png";
const imgShoeWhite = "/figma/shop/shoe-white.png";

const imgLine18 = "/figma/shop/line-18.svg";
const imgLine28 = "/figma/shop/line-28.svg";
const imgLine33 = "/figma/shop/line-33.svg";
const imgLine34 = "/figma/shop/line-34.svg";
const imgLine36 = "/figma/shop/line-36.svg";
const imgLine40 = "/figma/shop/line-40.svg";
const imgVector2 = "/figma/shop/vector-2.svg";

export type ProductVariant = "first" | "salda" | "early" | "last";

type ProductConfig = {
  frameHeight: number;
  timer: string;
  ctaText: string;
  checkoutHref: string;
  selectorTop: number;
  ctaTop: number;
  ctaLeft: number;
  infoCardTop: number;
  infoContentTop: number;
  infoCardLeft?: number;
  infoContentLeft?: number;
  showHeroShoes: boolean;
  showStrapSwatches: boolean;
  showLockPanel: boolean;
  showExtendButton: boolean;
};

export const PRODUCT_CONFIGS: Record<ProductVariant, ProductConfig> = {
  first: {
    frameHeight: 1898,
    timer: "30m 00s",
    ctaText: "ACQUISTA 189,99€",
    checkoutHref: "/checkout/first",
    selectorTop: 611,
    ctaTop: 870,
    ctaLeft: 86,
    infoCardTop: 1223,
    infoContentTop: 1246,
    showHeroShoes: false,
    showStrapSwatches: false,
    showLockPanel: true,
    showExtendButton: false,
  },
  salda: {
    frameHeight: 1491,
    timer: "30G 24H 59M",
    ctaText: "SALDA 140,99€",
    checkoutHref: "/checkout/early",
    selectorTop: 614,
    ctaTop: 883,
    ctaLeft: 85,
    infoCardTop: 986,
    infoContentTop: 1009,
    infoCardLeft: 26,
    infoContentLeft: 38,
    showHeroShoes: true,
    showStrapSwatches: true,
    showLockPanel: false,
    showExtendButton: false,
  },
  early: {
    frameHeight: 1549,
    timer: "30G 24H 59M",
    ctaText: "SALDA 140,99€",
    checkoutHref: "/checkout/early",
    selectorTop: 630,
    ctaTop: 906,
    ctaLeft: 88,
    infoCardTop: 1040,
    infoContentTop: 1063,
    showHeroShoes: true,
    showStrapSwatches: true,
    showLockPanel: false,
    showExtendButton: false,
  },
  last: {
    frameHeight: 1662,
    timer: "30m 00s",
    ctaText: "ACQUISTA 239,99€",
    checkoutHref: "/checkout/last",
    selectorTop: 622,
    ctaTop: 881,
    ctaLeft: 80,
    infoCardTop: 1151,
    infoContentTop: 1174,
    showHeroShoes: true,
    showStrapSwatches: true,
    showLockPanel: true,
    showExtendButton: true,
  },
};

type ProductScreenProps = {
  variant: ProductVariant;
};

export function ProductScreen({ variant }: ProductScreenProps) {
  const cfg = PRODUCT_CONFIGS[variant];
  const designHeight = cfg.frameHeight - 44;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#1f2024] px-2 py-6 sm:px-6 sm:py-10">
      <FrameViewport designHeight={designHeight}>
        <div
          className="relative w-[375px] -translate-y-[44px] overflow-hidden bg-black text-white"
          style={{ height: `${cfg.frameHeight}px` }}
        >
          <StrappsTopBar />

          <p className="font-impact absolute left-1/2 top-[143px] -translate-x-1/2 text-[20px] tracking-[-0.333px]">
            TEMPO RIMANENTE
          </p>
          <p className="font-impact absolute left-1/2 top-[173px] -translate-x-1/2 text-[48px] tracking-[-0.333px] text-[#f00707]">
            {cfg.timer}
          </p>

          {cfg.showHeroShoes && (
            <>
              <div className="absolute left-[84px] top-[257px] h-[313px] w-[333px] overflow-hidden">
                <img src={imgShoeBlack} alt="Sneaker nera" className="h-full w-full object-cover" />
              </div>
              <div className="absolute left-[323px] top-[257px] h-[313px] w-[333px] overflow-hidden">
                <img src={imgShoeWhite} alt="Sneaker bianca" className="h-full w-full object-cover" />
              </div>
            </>
          )}

          <section className="absolute left-[30px] w-[190px]" style={{ top: `${cfg.selectorTop}px` }}>
            <p className="font-impact text-[15px] tracking-[-0.333px]">SCEGLI IL COLORE DELLA SCARPA</p>
            <div className="mt-[8px] flex gap-[14px]">
              <div className="h-[25px] w-[25px] bg-[#d9d9d9]" />
              <div className="h-[25px] w-[25px] bg-[#1e1e1e]" />
            </div>

            <p className="font-impact mt-[18px] text-[15px] tracking-[-0.333px]">SCEGLI IL COLORE DELLO STRAPPO</p>
            {cfg.showStrapSwatches && (
              <div className="mt-[8px] flex gap-[14px]">
                <div className="h-[25px] w-[25px] bg-[#d9d9d9]" />
                <div className="h-[25px] w-[25px] bg-[#1e1e1e]" />
              </div>
            )}

            <p className="font-impact mt-[18px] text-[15px] tracking-[-0.333px]">SELEZIONA LA TAGLIA</p>
            <p className="font-impact mt-[6px] text-[15px] tracking-[-0.333px]">38 -39 -40 -41 -42 -43</p>
          </section>

          <Link
            href={cfg.checkoutHref}
            className="font-impact absolute flex h-[42px] w-[200px] items-center justify-center rounded-[20px] bg-[#f00707] text-[15px] tracking-[-0.333px]"
            style={{ left: `${cfg.ctaLeft}px`, top: `${cfg.ctaTop}px` }}
          >
            {cfg.ctaText}
          </Link>

          {cfg.showLockPanel && (
            <div
              className="absolute left-[20px] h-[102px] w-[335px] rounded-[52px] border border-[#272727] bg-black"
              style={{ top: variant === "last" ? "974px" : "957px" }}
            >
              <p className="font-impact absolute left-1/2 top-[31px] w-[280px] -translate-x-1/2 text-center text-[14px] tracking-[-0.333px]">
                Blocca la tua scarpa a questo prezzo per 30 giorni
              </p>

              {cfg.showExtendButton ? (
                <Link
                  href="/prodotto/salda"
                  className="font-impact absolute left-[99px] top-[56px] flex h-[27px] w-[129px] items-center justify-center rounded-[20px] bg-[#f00707] text-[10px] tracking-[-0.333px]"
                >
                  ESTENDI 49,00€
                </Link>
              ) : (
                <p className="font-azeret absolute left-1/2 top-[88px] -translate-x-1/2 text-[5px] tracking-[-0.333px] text-white/80">
                  Scalati dal saldo finale*
                </p>
              )}
            </div>
          )}

          <InfoFooterCard
            cardTop={cfg.infoCardTop}
            contentTop={cfg.infoContentTop}
            cardLeft={cfg.infoCardLeft}
            contentLeft={cfg.infoContentLeft}
          />

          {variant === "first" && (
            <>
              <div className="absolute left-[244px] top-[1027px] h-[994px] w-[897px]">
                <img src={imgVector2} alt="" aria-hidden className="h-full w-full" />
              </div>
              <div className="absolute left-[281px] top-[775px] h-[113px] w-[836px] -rotate-[7.7deg] origin-top-left">
                <img src={imgLine28} alt="" aria-hidden className="h-full w-full" />
              </div>
              <div className="absolute left-[274px] top-[1788px] h-[59px] w-[193px] rotate-[17deg] origin-top-left">
                <img src={imgLine18} alt="" aria-hidden className="h-full w-full" />
              </div>
            </>
          )}

          {variant === "salda" && (
            <div className="absolute left-[262px] top-[751px] h-[153px] w-[302px] -rotate-[26.87deg] origin-top-left">
              <img src={imgLine40} alt="" aria-hidden className="h-full w-full" />
            </div>
          )}

          {variant === "early" && (
            <div className="absolute left-[251px] top-[736px] h-[175px] w-[465px] -rotate-[20.62deg] origin-top-left">
              <img src={imgLine36} alt="" aria-hidden className="h-full w-full" />
            </div>
          )}

          {variant === "last" && (
            <>
              <div className="absolute left-[-1728px] top-[-95px] h-[881px] w-[1819px] -rotate-[154.16deg] origin-top-left">
                <img src={imgLine33} alt="" aria-hidden className="h-full w-full" />
              </div>
              <div className="absolute left-[-818px] top-[1017px] h-[869px] w-[818px] rotate-[133.27deg] origin-top-left">
                <img src={imgLine34} alt="" aria-hidden className="h-full w-full" />
              </div>
            </>
          )}

          <div className="absolute bottom-[12px] left-1/2 h-[5px] w-[135px] -translate-x-1/2 rounded-[10px] bg-[#dadada]" />
        </div>
      </FrameViewport>
    </div>
  );
}
