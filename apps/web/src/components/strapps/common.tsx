import Link from "next/link";

const imgBarDots = "/figma/home-v2/menu.svg";
const imgInfoLine = "/figma/shop/line-info.svg";

export function StrappsTopBar({ top = 63, left = 16 }: { top?: number; left?: number }) {
  return (
    <div className="absolute" style={{ left: `${left}px`, top: `${top}px` }}>
      <div className="h-[32px] w-[340px] rounded-[10px] bg-[#f00707]" />
      <img
        src={imgBarDots}
        alt=""
        aria-hidden
        className="absolute left-[158px] top-[13px] h-[6px] w-[24px]"
      />
      <Link
        href="/"
        className="font-rounded absolute left-[10px] top-[8px] text-[13px] tracking-[-0.333px] text-white"
      >
        STRAPPS
      </Link>
    </div>
  );
}

type InfoFooterProps = {
  cardTop: number;
  contentTop: number;
  cardLeft?: number;
  contentLeft?: number;
};

export function InfoFooterCard({
  cardTop,
  contentTop,
  cardLeft = 24,
  contentLeft = 36,
}: InfoFooterProps) {
  return (
    <>
      <div
        className="absolute h-[468px] w-[327px] rounded-[25px] bg-[#f00707] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        style={{ left: `${cardLeft}px`, top: `${cardTop}px` }}
      />
      <div className="absolute w-[296px] text-white" style={{ left: `${contentLeft}px`, top: `${contentTop}px` }}>
        <p className="font-impact text-[20px] tracking-[-0.333px]">STRAPPS</p>
        <p className="font-azeret mt-[14px] text-[12px] tracking-[-0.333px]">info@strapps.it</p>

        <p className="font-azeret mt-[34px] text-[15px] tracking-[-0.333px]">I nostri social</p>
        <p className="font-azeret text-[12px] tracking-[-0.333px]">Instagram</p>
        <p className="font-azeret text-[12px] tracking-[-0.333px]">Tiktok</p>

        <img src={imgInfoLine} alt="" aria-hidden className="mt-[28px] h-px w-[296px]" />

        <div className="font-azeret mt-[16px] text-[12px] tracking-[-0.333px]">
          <p>Pricavy &amp; Policy</p>
          <p>Cookie e Condizioni</p>
          <p>Termini e Condizioni</p>
          <p>Resi, Rimborsi e Taglie</p>
        </div>
      </div>
    </>
  );
}
