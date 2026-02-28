import { type ReactNode } from "react";
import { LegalPageShell } from "@/components/strapps/legal-page-shell";

function PrivacySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-azeret text-[12px] font-black tracking-[-0.333px]">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageShell title="PRIVACY POLICY">
      <p>Ultimo aggiornamento: 12/02/2026</p>

      <PrivacySection title="1. Titolare del trattamento">
        <p>
          Il titolare del trattamento dei dati e:
          <br />
          D290 di Andrea Cera
          <br />
          P. IVA 14594130966
          <br />
          Via Goito, Desio MB, Italia
          <br />
          Email: info@strapps.it
        </p>
      </PrivacySection>

      <PrivacySection title="2. Tipologia di dati raccolti">
        <p>
          Il sito raccoglie, direttamente o tramite terze parti:
          <br />
          dati anagrafici (nome, cognome)
          <br />
          indirizzo email
          <br />
          indirizzo di spedizione
          <br />
          dati di pagamento (gestiti da provider esterni)
          <br />
          dati di navigazione
          <br />
          dati di utilizzo del sito
          <br />
          cookie e identificatori online
        </p>
        <p>
          I dati sono forniti volontariamente dall&apos;utente durante acquisto, registrazione o iscrizione
          newsletter.
        </p>
      </PrivacySection>

      <PrivacySection title="3. Finalita del trattamento">
        <p>
          I dati sono trattati per:
          <br />
          gestione ordini e spedizioni
          <br />
          gestione pagamenti
          <br />
          assistenza clienti
          <br />
          invio comunicazioni operative
          <br />
          newsletter e marketing (previo consenso)
          <br />
          analisi statistiche del traffico
          <br />
          miglioramento dei servizi
          <br />
          prevenzione frodi
          <br />
          obblighi legali e fiscali
        </p>
      </PrivacySection>

      <PrivacySection title="4. Base giuridica">
        <p>
          Il trattamento avviene su base:
          <br />
          contrattuale (acquisto prodotti)
          <br />
          consenso (newsletter / marketing)
          <br />
          obblighi legali
          <br />
          legittimo interesse del titolare
        </p>
      </PrivacySection>

      <PrivacySection title="5. Hosting e infrastruttura tecnica">
        <p>Il sito e sviluppato su infrastruttura tecnica personalizzata.</p>
        <p>
          L&apos;hosting e l&apos;archiviazione dei dati sono affidati a provider terzi che garantiscono adeguati standard
          di sicurezza e conformita al Regolamento UE 2016/679 GDPR. I dati possono essere trattati su server
          situati all&apos;interno o al di fuori dell&apos;Unione Europea nel rispetto delle clausole contrattuali standard
          previste dalla normativa vigente.
        </p>
        <p>
          Eventuali sviluppatori o fornitori tecnici operano quali responsabili del trattamento ai sensi
          dell&apos;art. 28 GDPR.
        </p>
      </PrivacySection>

      <PrivacySection title="6. Pagamenti">
        <p>
          I pagamenti sono gestiti tramite:
          <br />
          Stripe
          <br />
          PayPal
        </p>
        <p>
          D290 non conserva dati completi di carte di credito.
          <br />
          I dati di pagamento sono trattati direttamente dai provider.
        </p>
      </PrivacySection>

      <PrivacySection title="7. Analytics e tracciamento">
        <p>
          Il sito utilizza:
          <br />
          Google Analytics
          <br />
          Pixel Meta
        </p>
        <p>
          Per analisi statistiche e marketing.
          <br />
          Questi strumenti possono raccogliere dati anonimizzati di navigazione.
          <br />
          L&apos;utente puo disabilitare i cookie tramite impostazioni browser.
        </p>
      </PrivacySection>

      <PrivacySection title="8. Newsletter">
        <p>
          L&apos;utente puo iscriversi alla newsletter per ricevere comunicazioni commerciali.
          <br />
          Puo disiscriversi in qualsiasi momento tramite link presente nelle email.
        </p>
      </PrivacySection>

      <PrivacySection title="9. Conservazione dei dati">
        <p>
          I dati sono conservati:
          <br />
          per il tempo necessario all&apos;erogazione del servizio
          <br />
          per obblighi fiscali e legali
          <br />
          fino a revoca del consenso per marketing
        </p>
      </PrivacySection>

      <PrivacySection title="10. Diritti dell&apos;utente">
        <p>
          L&apos;utente ha diritto a:
          <br />
          accesso ai dati
          <br />
          rettifica
          <br />
          cancellazione
          <br />
          limitazione
          <br />
          opposizione
          <br />
          portabilita
          <br />
          reclamo al Garante Privacy
        </p>
        <p>Richieste: info@strapps.it</p>
      </PrivacySection>

      <PrivacySection title="11. Sicurezza">
        <p>
          I dati sono trattati con misure tecniche e organizzative adeguate per prevenire accessi non
          autorizzati.
        </p>
      </PrivacySection>

      <PrivacySection title="12. Modifiche">
        <p>
          La presente privacy policy puo essere aggiornata.
          <br />
          Le modifiche saranno pubblicate su questa pagina.
        </p>
      </PrivacySection>
    </LegalPageShell>
  );
}
