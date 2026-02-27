import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/figma/home-v2/hero.png";

const features = [
  {
    title: "DROP SU RICHIESTA",
    description:
      "Produciamo solo ciò che viene ordinato. Niente magazzino, niente overproduction.",
  },
  {
    title: "PRODUZIONE TRACCIATA",
    description:
      "Aggiornamenti via email durante ogni fase del drop. Sai sempre a che punto è la tua scarpa.",
  },
  {
    title: "PAGAMENTI VERIFICATI",
    description: "Pagamento sicuro, ricevuta immediata, contatti reali e assistenza diretta.",
  },
];

const tiers = [
  {
    name: "FIRST 60",
    price: "189,99€",
    details: ["Ticket valido 30 minuti", "Rimasti: 60"],
    href: "/prodotto/first",
    cta: "SBLOCCA 1€",
    active: true,
  },
  {
    name: "EARLY 140",
    price: "219,99€",
    details: ["Si attiva alla chiusura del livello precedente"],
    href: "/prodotto/early",
    cta: "SBLOCCA 1€",
  },
  {
    name: "LAST 90",
    price: "239,99€",
    details: ["Si attiva alla chiusura del livello precedente"],
    href: "/prodotto/last",
    cta: "VAI",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121317] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
        <section className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="font-azeret text-xs uppercase tracking-[0.2em] text-[#f00707]">No hype, solo prodotto</p>
            <h1 className="font-impact mt-3 text-4xl leading-tight text-white sm:text-5xl">
              Ridisegniamo il passato per chi se ne frega del futuro
            </h1>
            <p className="font-azeret mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              Ogni uscita è già piena di cose: non aggiungerci anche i lacci. STRAPPS ti dà controllo in un
              gesto: o ti allacci al passato, o tiri un altro strappo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/prodotto/first"
                className="font-azeret inline-flex rounded-full bg-[#f00707] px-5 py-3 text-sm font-black italic"
              >
                Accedi al drop
              </Link>
              <a
                href="#newsletter"
                className="font-azeret inline-flex rounded-full border border-white/30 px-5 py-3 text-sm font-black italic"
              >
                Avvisami al lancio
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-3">
            <Image
              src={HERO_IMAGE}
              alt="Sneakers STRAPPS"
              width={900}
              height={640}
              className="h-auto w-full rounded-2xl object-cover"
              priority
            />
          </div>
        </section>

        <section className="mt-14 border-y border-white/10 py-10">
          <h2 className="font-azeret text-center text-2xl font-black italic text-[#f00707]">COS&apos;È STRAPPS</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-azeret text-sm font-black italic">{feature.title}</h3>
                <p className="font-azeret mt-3 text-sm leading-relaxed text-white/80">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="newsletter" className="mt-14 rounded-3xl border border-[#f00707]/40 bg-black/40 p-6 sm:p-8">
          <p className="font-azeret text-center text-lg font-black italic text-[#f00707]">
            ISCRIVITI ALLA NEWSLETTER PER NON PERDERTI IL LANCIO
          </p>
          <form className="mx-auto mt-6 flex w-full max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="POSTA EMAIL"
              aria-label="Email newsletter"
              className="font-azeret h-12 flex-1 rounded-full border border-white/20 bg-white px-5 text-sm text-black placeholder:text-neutral-500 focus:outline-none"
            />
            <button
              type="submit"
              className="font-azeret h-12 rounded-full bg-[#f00707] px-6 text-sm font-black italic"
            >
              Avvisami
            </button>
          </form>
          <p className="font-rounded mt-4 text-center text-xs text-white/70">Chiude tra: 6g 23h 59m</p>
        </section>

        <section className="mt-14">
          <h2 className="font-impact text-center text-3xl text-[#f00707]">SCEGLI IL TUO ACCESSO</h2>
          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-2xl border p-5 backdrop-blur-sm"
                style={{
                  borderColor: tier.active ? "rgba(240, 7, 7, 0.7)" : "rgba(255, 255, 255, 0.15)",
                  backgroundColor: tier.active ? "rgba(240, 7, 7, 0.08)" : "rgba(255, 255, 255, 0.03)",
                }}
              >
                <h3 className="font-azeret text-sm font-black italic">{tier.name}</h3>
                <p className="font-azeret mt-2 text-lg font-bold">{tier.price}</p>
                <ul className="font-azeret mt-3 space-y-1 text-sm text-white/75">
                  {tier.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className="font-azeret mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black italic hover:bg-white/20"
                >
                  {tier.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
