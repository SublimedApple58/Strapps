import Image from "next/image";
import { AccessTierCta } from "@/components/strapps/access-tier-cta";
import { AccessTierCountdown } from "@/components/strapps/access-tier-countdown";
import { NewsletterCountdown } from "@/components/strapps/newsletter-countdown";
import { NewsletterSignup } from "@/components/strapps/newsletter-signup";
import { ScrollToNewsletterButton } from "@/components/strapps/scroll-to-newsletter-button";
import { SiteNavMenu } from "@/components/strapps/site-nav-menu";

const HERO_IMAGE = "/hero_image.png";

const accessOptions = [
  {
    id: "first" as const,
    name: "FIRST 60",
    price: "189.99€",
    originalPrice: "239.99€",
    lines: ["Tiket valido 30 minuti", "rimasti: 60"],
    href: "/prodotto/first",
    cta: "SBLOCCA 1€",
  },
  {
    id: "early" as const,
    name: "EARLY 140",
    price: "219.99€",
    originalPrice: "239.99€",
    lines: ["Si attiva alla chiusura del livello", "precedente"],
    href: "/prodotto/early",
    cta: "SBLOCCA 1€",
  },
  {
    id: "last" as const,
    name: "LAST 90",
    price: "239.99€",
    lines: ["Si attiva alla chiusura del livello", "precedente."],
    href: "/prodotto/last",
    cta: "VAI",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pt-12">
        <section className="mx-auto w-full max-w-[390px]">
          <SiteNavMenu />

          <h1 className="font-azeret relative z-20 mt-[21px] text-[20px] leading-[1.2] tracking-[-0.333px] text-white">
            IN UN MONDO DI NODI
          </h1>
          <p className="font-azeret relative z-20 mt-4 text-[12px] leading-none tracking-[-0.333px] text-[#f00707]">
            È IL MOMENTO DELLO STRAPPO
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

          <div className="relative z-10 -mt-[96px]">
            <p className="font-impact text-center text-[20px] tracking-[-0.333px] text-white">STRAPPS V1</p>
            <p className="font-azeret mt-[23px] text-center text-[12px] tracking-[-0.333px] text-white">
              SOLO SU ISCRIZIONE
            </p>
            <ScrollToNewsletterButton
              className="font-impact mx-auto mt-[13px] flex h-[42px] w-[200px] items-center justify-center rounded-[40px] bg-[#f00707] text-[15px] tracking-[-0.333px] text-white"
              label="ISCRIVITI AL DROP"
            />
          </div>

          <div className="mt-[61px] mx-auto w-[calc(100vw-68px)] max-w-[322px]">
            <p className="font-azeret text-[12px] leading-[1.25] tracking-[-0.333px] text-white">
              STIAMO RIDISEGNANDO IL PASSATO PER CHI SE NE FREGA DEL FUTURO
            </p>
            <p className="font-azeret mt-10 text-[12px] leading-[1.25] tracking-[-0.333px] text-white">
              Ogni uscita e già piena di cose:
              <br />
              non aggiungerci anche i lacci.
              <br />
              <br />
              STRAPPS ti da controllo in 1 gesto:
              <br />O ti allacci al passato o tiri un altro strappo
            </p>
          </div>
        </section>

        <section id="scegli-il-tuo-accesso" className="mt-14">
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
                  Sai sempre a che punto è la tua scarpa.
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
            <p
              id="newsletter-title"
              className="font-azeret text-center text-[15px] font-black italic leading-[1.2] tracking-[-0.333px] text-[#f00707]"
            >
              ISCRIVITI ALLA NEWSLETTER PER NON
              <br />
              PERDERTI IL LANCIO
            </p>

            <p className="font-azeret mt-[46px] text-[15px] font-black italic tracking-[-0.333px] text-white">
              FATTI AVVISARE*
            </p>

            <NewsletterSignup />

            <NewsletterCountdown className="font-rounded mt-4 text-center text-[12px] font-bold tracking-[-0.333px] text-white" />

            <div className="mt-[46px] h-[3px] w-full rounded-full bg-[#f00707]" />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-impact text-center text-[20px] font-normal tracking-[-0.333px] text-[#f00707]">
            SCEGLI IL TUO ACCESSO
          </h2>

          <div className="mt-[58px]">
            {accessOptions.map((option, index) => (
              <div key={option.id}>
                <article
                  className={`mx-auto w-[calc(100vw-68px)] max-w-[660px] ${index > 0 ? "mt-[58px]" : ""}`}
                >
                  <h3 className="font-azeret text-[13px] font-black italic tracking-[-0.333px]">{option.name}</h3>
                  <div className="font-azeret mt-[15px] text-[12px] font-light leading-[1.24] tracking-[-0.333px] text-white">
                    <p className="flex items-baseline gap-2">
                      <span>{option.price}</span>
                      {option.originalPrice ? (
                        <span className="text-white/55 line-through decoration-white/60">{option.originalPrice}</span>
                      ) : null}
                    </p>
                    {option.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </div>

                  <AccessTierCta
                    tier={option.id}
                    href={option.href}
                    label={option.cta}
                    className="font-azeret mx-auto mt-[31px] flex h-[35px] w-[150px] items-center justify-center rounded-[20px] border border-white/30 bg-[linear-gradient(180deg,rgba(28,31,44,0.55)_0%,rgba(10,10,14,0.72)_100%)] text-[13px] font-black italic tracking-[-0.333px] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_10px_16px_rgba(0,0,0,0.35)] backdrop-blur-[6px]"
                  />

                  <AccessTierCountdown
                    tier={option.id}
                    className="font-rounded mt-[8px] text-center text-[12px] font-bold tracking-[-0.333px] text-white"
                  />
                </article>

                {index < accessOptions.length - 1 && (
                  <div className="relative left-1/2 mt-10 h-px w-screen -translate-x-1/2 bg-white" />
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
