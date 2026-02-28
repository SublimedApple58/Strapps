import { type ReactNode } from "react";
import { LegalPageShell } from "@/components/strapps/legal-page-shell";

function ReturnSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-azeret text-[12px] font-black tracking-[-0.333px]">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export default function ResiRimborsiETagliePage() {
  return (
    <LegalPageShell title="RESI RIMBORSI E TAGLIE">
      <p>Ultimo aggiornamento: 01/03</p>

      <ReturnSection title="1. Modello di vendita su produzione richiesta">
        <p>
          I prodotti STRAPPS sono realizzati esclusivamente su produzione richiesta e in quantita limitata
          all&apos;interno di drop numerati.
        </p>
        <p>
          Ogni ordine contribuisce direttamente alla pianificazione produttiva e riserva una quota di produzione
          che non puo essere riassegnata ad altri clienti.
        </p>
        <p>
          Il cliente riconosce che sta acquistando un prodotto realizzato su richiesta e non proveniente da
          magazzino standard.
        </p>
        <p>
          Per questa ragione il diritto di recesso e limitato ai casi previsti dalla presente politica.
        </p>
      </ReturnSection>

      <ReturnSection title="2. Ticket di accesso (1 euro) ed estensione del prezzo (49 euro)">
        <p>
          Il ticket di accesso e l&apos;eventuale estensione del prezzo bloccato costituiscono servizi di prenotazione
          immediatamente eseguiti.
        </p>
        <p>
          Tali importi:
          <br />
          riservano una posizione nel lotto limitato
          <br />
          impegnano capacita produttiva
          <br />
          impediscono la vendita ad altri utenti
        </p>
        <p>Per loro natura rappresentano servizi digitali e di prenotazione gia erogati.</p>
        <p>Il ticket di accesso e l&apos;estensione del prezzo sono pertanto non rimborsabili in nessun caso.</p>
      </ReturnSection>

      <ReturnSection title="3. Diritto di recesso sul prodotto fisico">
        <p>Trattandosi di prodotto realizzato su richiesta, il diritto di recesso non si applica salvo difetti di produzione.</p>
        <p>Il cliente ha diritto a segnalare eventuali difetti entro 14 giorni dalla ricezione del prodotto.</p>
        <p>Non sono accettati resi per ripensamento, gusto personale o utilizzo del prodotto.</p>
      </ReturnSection>

      <ReturnSection title="4. Cambio taglia">
        <p>STRAPPS consente il cambio taglia come forma di sostituzione, non come rimborso.</p>
        <p>
          Il cambio taglia:
          <br />
          e soggetto a disponibilita
          <br />
          e possibile solo fino a esaurimento scorte
          <br />
          non e garantito per tutte le taglie
          <br />
          dipende dalla disponibilita del prodotto sostitutivo
        </p>
        <p>La spedizione del reso e della sostituzione e a carico del cliente.</p>
        <p>Se la taglia richiesta non e disponibile, la sostituzione non potra essere effettuata.</p>
        <p>In tal caso non e previsto rimborso, trattandosi di produzione limitata su richiesta.</p>
      </ReturnSection>

      <ReturnSection title="5. Difetti di produzione">
        <p>In caso di difetto comprovato, il cliente ha diritto alla sostituzione del prodotto.</p>
        <p>
          La sostituzione:
          <br />
          avviene solo se disponibile
          <br />
          e limitata alle scorte residue del drop
          <br />
          non e garantita per tutte le varianti
        </p>
        <p>
          Se la sostituzione non e possibile per esaurimento scorte, verra emesso rimborso del solo prodotto
          difettoso.
        </p>
        <p>Ticket di accesso e estensioni restano esclusi dal rimborso.</p>
      </ReturnSection>

      <ReturnSection title="6. Condizioni del reso">
        <p>
          Per essere accettato, il prodotto deve:
          <br />
          essere inutilizzato
          <br />
          non presentare segni di usura
          <br />
          essere integro
          <br />
          essere restituito nella confezione originale
        </p>
        <p>Resi che non rispettano queste condizioni verranno rifiutati.</p>
      </ReturnSection>

      <ReturnSection title="7. Procedura di richiesta">
        <p>
          Per richiedere reso o sostituzione e necessario scrivere a:
          <br />
          info@strapps.it
        </p>
        <p>
          Indicare:
          <br />
          numero ordine
          <br />
          descrizione del problema
          <br />
          fotografie del prodotto (in caso di difetto)
        </p>
        <p>Le richieste oltre i 14 giorni dalla consegna non verranno accettate.</p>
      </ReturnSection>
    </LegalPageShell>
  );
}
