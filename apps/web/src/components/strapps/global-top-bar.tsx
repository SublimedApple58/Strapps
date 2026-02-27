import Link from "next/link";

export function GlobalTopBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#f00707] text-white">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-rounded absolute left-4 text-sm tracking-wide sm:left-6 lg:left-8">
          STRAPPS
        </Link>

        <details className="group relative">
          <summary
            className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-full border border-white/50 outline-none transition hover:bg-white/15"
            aria-label="Apri menu"
          >
            <span className="sr-only">Apri menu</span>
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-5 bg-white" />
              <span className="block h-0.5 w-5 bg-white" />
            </span>
          </summary>

          <nav className="font-azeret absolute hidden group-open:block left-1/2 top-12 w-44 -translate-x-1/2 rounded-xl border border-white/25 bg-[#b40404] p-2 text-center text-xs uppercase tracking-[0.16em] shadow-lg">
            <Link href="/" className="block rounded-md px-3 py-2 transition hover:bg-white/10">
              Home page
            </Link>
            <a href="mailto:info@strapps.it" className="mt-1 block rounded-md px-3 py-2 transition hover:bg-white/10">
              Contacts
            </a>
          </nav>
        </details>
      </div>
    </header>
  );
}
