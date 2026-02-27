import { type ReactNode } from "react";

type StrappsPageShellProps = {
  children: ReactNode;
};

export function StrappsPageShell({ children }: StrappsPageShellProps) {
  return (
    <main className="min-h-screen bg-[#121317] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">{children}</div>
    </main>
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
