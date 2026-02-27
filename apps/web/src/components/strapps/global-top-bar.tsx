import Link from "next/link";

export function GlobalTopBar() {
  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center rounded-[1.75rem] bg-[#f00707] text-white shadow-[0_14px_40px_rgba(0,0,0,0.45)]">
          <Link href="/" className="font-rounded absolute left-6 text-2xl font-bold tracking-wide">
            STRAPPS
          </Link>

          <details className="group relative">
            <summary
              className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full outline-none transition hover:bg-white/15"
              aria-label="Apri menu"
            >
              <span className="sr-only">Apri menu</span>
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-10 bg-white" />
                <span className="block h-0.5 w-10 bg-white" />
              </span>
            </summary>

            <nav className="font-azeret absolute left-1/2 top-[calc(100%+0.85rem)] hidden w-44 -translate-x-1/2 rounded-2xl border border-white/20 bg-[#be0606] p-2 text-center text-xs uppercase tracking-[0.16em] shadow-xl group-open:block">
              <Link href="/" className="block rounded-md px-3 py-2 transition hover:bg-white/10">
                Home page
              </Link>
              <a href="mailto:info@strapps.it" className="mt-1 block rounded-md px-3 py-2 transition hover:bg-white/10">
                Contacts
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
