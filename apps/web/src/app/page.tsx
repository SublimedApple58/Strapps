import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE = "/hero_image.png";
const HERO_MENU_ICON = "/figma/home-v2/menu.svg";

const features = [
  {
    title: "DROP SU RICHIESTA",
    description:
      "Produciamo solo cio che viene ordinato. Niente magazzino, niente overproduction.",
  },
  {
    title: "PRODUZIONE TRACCIATA",
    description:
      "Aggiornamenti via email durante ogni fase del drop. Sai sempre a che punto e la tua scarpa.",
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
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="mx-auto w-full max-w-[390px] overflow-hidden">
          <div className="relative flex h-[42px] items-center rounded-[18px] bg-[#f00707] px-4">
            <p className="font-rounded text-[13px] tracking-[-0.333px] text-white">STRAPPS</p>
            <Image
              src={HERO_MENU_ICON}
              alt=""
              width={24}
              height={6}
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[6px] w-[24px] -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <h1 className="font-azeret mt-12 text-[20px] leading-[1.2] tracking-[-0.333px] text-white">
            IN THE STRAPPS ERA
          </h1>
          <p className="font-azeret mt-4 text-[12px] leading-none tracking-[-0.333px] text-[#f00707]">
            E IL MOMENTO DEGLI STRAPPI.
          </p>

          <div className="relative mt-6 h-[700px] overflow-hidden">
            <Image
              src={HERO_IMAGE}
              alt="Sneaker STRAPPS bianca e nera"
              fill
              sizes="(max-width: 640px) 100vw, 390px"
              className="object-cover object-center scale-[1.35]"
              priority
            />
          </div>

          <p className="font-impact mt-8 text-center text-[20px] tracking-[-0.333px] text-white">STRAPPS V1</p>
          <p className="font-azeret mt-5 text-center text-[12px] tracking-[-0.333px] text-white">SOLO SU ISCRIZIONE</p>
          <Link
            href="/prodotto/first"
            className="font-impact mx-auto mt-8 flex h-[42px] w-[200px] items-center justify-center rounded-[40px] bg-[#f00707] text-[15px] tracking-[-0.333px] text-white"
          >
            ISCRIVITI AL DROP
          </Link>

          <div className="mt-24 px-2">
            <p className="font-azeret text-[12px] leading-[1.25] tracking-[-0.333px] text-white">
              STIAMO RIDISEGNANDO IL PASSATO PER CHI SE NE FREGA DEL FUTURO
            </p>
            <p className="font-azeret mt-10 text-[12px] leading-[1.25] tracking-[-0.333px] text-white">
              Ogni uscita e gia piena di cose:
              <br />
              non aggiungerci anche i lacci.
              <br />
              <br />
              STRAPPS ti da controllo in 1 gesto:
              <br />O ti allacci al passato o tiri un altro strappo
            </p>
          </div>
        </section>

        <section className="mt-14 border-y border-white/10 py-10">
          <h2 className="font-azeret text-center text-2xl font-black italic text-[#f00707]">COS&apos;E STRAPPS</h2>
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
