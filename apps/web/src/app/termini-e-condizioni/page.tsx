import { type ReactNode } from "react";
import { LegalPageShell } from "@/components/strapps/legal-page-shell";

function TermsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-azeret text-[12px] font-black tracking-[-0.333px]">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export default function TerminiECondizioniPage() {
  return (
    <LegalPageShell title="TERMINI E CONDIZIONI">
      <TermsSection title="1. Informazioni sul venditore">
        <p>
          Il sito strapps.it e gestito da:
          <br />
          D290 di Andrea Cera
          <br />
          P.IVA 14594130966
          <br />
          Sede: Via Goito, Desio, Italia
          <br />
          Email: info@strapps.it
        </p>
      </TermsSection>

      <TermsSection title="2. Oggetto del contratto">
        <p>
          Attraverso il sito e possibile acquistare:
          <br />
          1. ticket digitale di accesso al drop
          <br />
          2. estensione del prezzo bloccato
          <br />
          3. prodotto fisico (calzature STRAPPS)
        </p>
        <p>Ogni acquisto costituisce accettazione integrale dei presenti termini.</p>
      </TermsSection>

      <TermsSection title="3. Ticket di accesso e blocco prezzo">
        <p>
          Il pagamento di 1 euro o di importi inferiori a 80 euro costituisce acquisto di:
          <br />
          servizio digitale immediatamente erogato
          <br />
          diritto di accesso al carrello riservato
          <br />
          diritto di estensione della prenotazione
          <br />
          mantenimento della priorita su un prodotto in edizione limitata
        </p>
        <p>
          Il prodotto oggetto della prenotazione e realizzato in quantita limitata e su produzione richiesta.
          Ogni prenotazione comporta l&apos;allocazione di una disponibilita che, una volta assegnata all&apos;utente, non
          puo essere destinata ad altri clienti. Il ticket e l&apos;estensione costituiscono quindi una prenotazione
          vincolante di disponibilita su un bene limitato che avrebbe potuto essere venduto ad altri acquirenti.
        </p>
        <p>
          Ai sensi dell&apos;art. 59 del Codice del Consumo, trattandosi di contenuto digitale eseguito immediatamente:
          <br />
          l&apos;utente rinuncia espressamente al diritto di recesso
          <br />
          tali importi non sono rimborsabili.
        </p>
      </TermsSection>

      <TermsSection title="4. Preordine e produzione">
        <p>
          Le calzature STRAPPS sono prodotte su richiesta.
          <br />
          quantita limitata
          <br />
          produzione a lotto unico
          <br />
          spedizione collettiva
        </p>
        <p>
          Data stimata di consegna: entro il 07/07.
          <br />
          La data e indicativa e puo subire variazioni per cause produttive o logistiche non imputabili al
          venditore.
          <br />
          L&apos;acquisto costituisce accettazione dei tempi di produzione.
        </p>
      </TermsSection>

      <TermsSection title="5. Spedizione">
        <p>
          spedizione gratuita
          <br />
          invio collettivo di tutti gli ordini
          <br />
          consegna stimata entro 4 mesi
        </p>
        <p>Il venditore non e responsabile per ritardi del corriere.</p>
      </TermsSection>

      <TermsSection title="6. Diritto di recesso (prodotto fisico)">
        <p>
          Per il prodotto fisico l&apos;utente ha diritto di recesso entro 14 giorni dalla consegna. Condizioni:
          <br />
          prodotto integro
          <br />
          non utilizzato
          <br />
          confezione originale
          <br />
          spese di reso a carico del cliente
        </p>
        <p>I ticket digitali e il blocco prezzo non sono rimborsabili.</p>
      </TermsSection>

      <TermsSection title="7. Prodotto difettoso">
        <p>
          In caso di difetto:
          <br />
          sostituzione se disponibile
          <br />
          rimborso in assenza di disponibilita
        </p>
        <p>Il difetto deve essere segnalato entro 48 ore dalla consegna.</p>
      </TermsSection>

      <TermsSection title="8. Limitazione di responsabilita">
        <p>
          D290 non risponde per:
          <br />
          ritardi logistici
          <br />
          uso improprio del prodotto
          <br />
          variazioni estetiche minori dovute alla produzione
        </p>
      </TermsSection>

      <TermsSection title="9. Legge applicabile">
        <p>
          Il contratto e regolato dalla legge italiana.
          <br />
          Foro competente: residenza del consumatore.
        </p>
      </TermsSection>
    </LegalPageShell>
  );
}
