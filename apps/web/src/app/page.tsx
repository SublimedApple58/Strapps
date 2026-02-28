import Image from "next/image";
import Link from "next/link";
import { NewsletterCountdown } from "@/components/strapps/newsletter-countdown";

const HERO_IMAGE = "/hero_image.png";
const HERO_MENU_ICON = "/figma/home-v2/menu.svg";
const NEWSLETTER_ARROW = "/figma/home-v2/arrow.svg";

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
        <section className="mx-auto w-full max-w-[390px]">
          <details className="hero-menu group relative">
            <summary
              className="relative flex h-[42px] cursor-pointer list-none items-center rounded-[10px] bg-[#f00707] px-4 [&::-webkit-details-marker]:hidden"
              aria-label="Apri menu"
            >
              <p className="font-rounded text-[13px] tracking-[-0.333px] text-white">STRAPPS</p>
              <Image
                src={HERO_MENU_ICON}
                alt=""
                width={24}
                height={6}
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[6px] w-[24px] -translate-x-1/2 -translate-y-1/2"
              />
            </summary>
            <nav className="hero-menu-panel font-azeret absolute left-0 right-0 top-[46px] z-20 rounded-[10px] border border-white/20 bg-black/95 p-2 text-[12px] tracking-[-0.333px] text-white">
              <Link href="/" className="block rounded-[8px] px-3 py-2 hover:bg-white/10">
                Home
              </Link>
              <Link href="/prodotto/first" className="block rounded-[8px] px-3 py-2 hover:bg-white/10">
                Prodotto
              </Link>
              <Link href="/checkout/first" className="block rounded-[8px] px-3 py-2 hover:bg-white/10">
                Checkout
              </Link>
            </nav>
          </details>

          <h1 className="font-azeret relative z-10 mt-[21px] text-[20px] leading-[1.2] tracking-[-0.333px] text-white">
            IN THE STRAPPS ERA
          </h1>
          <p className="font-azeret relative z-10 mt-4 text-[12px] leading-none tracking-[-0.333px] text-[#f00707]">
            E IL MOMENTO DEGLI STRAPPI.
          </p>

          <div className="relative left-1/2 -mt-[12px] aspect-[375/490] w-screen -translate-x-1/2 overflow-hidden sm:w-full">
            <Image
              src={HERO_IMAGE}
              alt="Sneaker STRAPPS bianca e nera"
              fill
              sizes="(max-width: 640px) 100vw, 390px"
              className="object-cover object-center scale-[1.12]"
              priority
            />
          </div>

          <div className="relative z-10 -mt-[72px]">
            <p className="font-impact text-center text-[20px] tracking-[-0.333px] text-white">STRAPPS V1</p>
            <p className="font-azeret mt-[23px] text-center text-[12px] tracking-[-0.333px] text-white">
              SOLO SU ISCRIZIONE
            </p>
            <Link
              href="/prodotto/first"
              className="font-impact mx-auto mt-[13px] flex h-[42px] w-[200px] items-center justify-center rounded-[40px] bg-[#f00707] text-[15px] tracking-[-0.333px] text-white"
            >
              ISCRIVITI AL DROP
            </Link>
          </div>

          <div className="mt-[61px] mx-auto w-[calc(100vw-68px)] max-w-[322px]">
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

        <section className="mt-14">
          <div className="mx-auto w-[calc(100vw-52px)] max-w-[660px]">
            <div className="h-[3px] w-full rounded-full bg-[#f00707]" />

            <h2 className="font-azeret mt-[46px] text-center text-[20px] font-black italic tracking-[-0.333px] text-[#f00707]">
              COS&apos;E STRAPPS
            </h2>

            <div className="mt-[46px] space-y-[62px]">
              <article>
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">DROP SU RICHIESTA</h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                  Produciamo solo cio che viene ordinato.
                  <br />
                  Niente magazzino, niente overproduction.
                </p>
              </article>

              <article>
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">PRODUZIONE TRACCIATA</h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                  Aggiornamenti via email durante ogni fase del drop.
                  <br />
                  Sai sempre a che punto e la tua scarpa.
                </p>
              </article>

              <article>
                <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">PAGAMENTI VERIFICATI</h3>
                <p className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                  Pagamento sicuro + ricevuta immediata.
                  <br />
                  Contatti reali e assistenza diretta.
                </p>
              </article>
            </div>

            <div className="mt-[46px] h-[3px] w-full rounded-full bg-[#f00707]" />
          </div>
        </section>

        <section id="newsletter" className="mt-14">
          <div className="mx-auto w-[calc(100vw-52px)] max-w-[660px]">
            <div className="h-[3px] w-full rounded-full bg-[#f00707]" />

            <p className="font-azeret mt-[46px] text-center text-[15px] font-black italic leading-[1.2] tracking-[-0.333px] text-[#f00707]">
              ISCRIVITI ALLA NEWSLETTER PER NON
              <br />
              PERDERTI IL LANCIO
            </p>

            <p className="font-azeret mt-[46px] text-[15px] font-black italic tracking-[-0.333px] text-white">
              FATTI AVVISARE*
            </p>

            <form className="relative mt-4">
              <input
                type="email"
                required
                placeholder="POSTA EMAIL"
                aria-label="Email newsletter"
                className="font-azeret h-[51px] w-full rounded-[26px] bg-[#d9d9d9] px-5 pr-[66px] text-[12px] text-black placeholder:text-[#5f5f5f] focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Invia email"
                className="absolute right-[4px] top-1/2 flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black"
              >
                <Image src={NEWSLETTER_ARROW} alt="" aria-hidden width={25} height={14} className="h-[14px] w-[25px]" />
              </button>
            </form>

            <NewsletterCountdown className="font-rounded mt-4 text-center text-[12px] font-bold tracking-[-0.333px] text-white" />

            <div className="mt-[46px] h-[3px] w-full rounded-full bg-[#f00707]" />
          </div>
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
