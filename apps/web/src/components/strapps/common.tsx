import Link from "next/link";

export function StrappsTopBar() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-[#f00707] px-4 py-3 sm:px-6">
      <Link href="/" className="font-rounded text-sm tracking-wide">
        STRAPPS
      </Link>
      <p className="font-azeret text-xs uppercase tracking-[0.16em] text-white/80">Drop 01</p>
    </header>
  );
}

export function InfoFooterCard() {
  return (
    <footer className="mt-14 rounded-3xl border border-[#f00707]/60 bg-[#f00707] p-6 text-white sm:p-8">
      <p className="font-impact text-2xl">STRAPPS</p>
      <p className="font-azeret mt-3 text-sm">info@strapps.it</p>

      <div className="font-azeret mt-8 grid gap-6 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/80">I nostri social</p>
          <p>Instagram</p>
          <p>TikTok</p>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/80">Info legali</p>
          <p>Privacy Policy</p>
          <p>Cookie e Condizioni</p>
          <p>Termini e Condizioni</p>
          <p>Resi, Rimborsi e Taglie</p>
        </div>
      </div>
    </footer>
  );
}
