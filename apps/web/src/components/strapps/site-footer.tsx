import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="pb-8">
      <div className="mx-auto w-[calc(100vw-52px)] max-w-[760px] rounded-[44px] bg-[#f00707] px-[34px] py-12 text-white">
        <p className="font-impact text-[20px] font-normal tracking-[-0.333px]">STRAPPS</p>
        <p className="font-azeret mt-12 text-[12px] font-normal tracking-[-0.333px]">info@strapps.it</p>

        <p className="font-azeret mt-16 text-[15px] font-normal tracking-[-0.333px]">I nostri social</p>
        <div className="font-azeret mt-3 space-y-2 text-[12px] font-normal tracking-[-0.333px]">
          <a href="https://www.instagram.com/siamostrapps?igsh=MTN5dG52bjdkb2RrdA==" target="_blank" rel="noreferrer" className="block">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@siamostrapps_?_r=1&_t=ZN-94RYXKyPLjH" target="_blank" rel="noreferrer" className="block">
            Tiktok
          </a>
        </div>

        <div className="mt-14 h-px w-full bg-white" />

        <div className="font-azeret mt-10 space-y-4 text-[12px] font-normal tracking-[-0.333px]">
          <Link href="/privacy-policy" className="block">
            Privacy &amp; Policy
          </Link>
          <Link href="/cookie-policy" className="block">
            Cookie e Condizioni
          </Link>
          <Link href="/termini-e-condizioni" className="block">
            Termini e Condizioni
          </Link>
          <Link href="/resi-rimborsi-e-taglie" className="block">
            Resi, Rimborsi e Taglie
          </Link>
        </div>
      </div>
    </footer>
  );
}
