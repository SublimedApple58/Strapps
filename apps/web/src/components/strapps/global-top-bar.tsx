import Link from "next/link";

export function GlobalTopBar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <details className="group w-full rounded-[1.75rem] bg-[#f00707] text-white shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
          <summary
            className="relative flex h-16 cursor-pointer list-none items-center justify-center rounded-[1.75rem] px-6 outline-none"
            aria-label="Apri menu"
          >
            <span className="font-rounded absolute left-6 text-2xl font-bold tracking-wide">STRAPPS</span>
            <span className="sr-only">Apri menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-10 bg-white" />
              <span className="block h-0.5 w-10 bg-white" />
            </span>
          </summary>

          <nav className="font-azeret hidden px-6 pb-5 pt-1 text-center text-xs uppercase tracking-[0.16em] group-open:block">
            <div className="mx-auto h-px w-full max-w-[22rem] bg-white/35" />
            <Link href="/" className="mt-3 block rounded-md px-3 py-2 transition hover:bg-white/10">
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
