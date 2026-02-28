import { type ReactNode } from "react";
import { LegalPageShell } from "@/components/strapps/legal-page-shell";

function CookieSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-azeret text-[12px] font-black tracking-[-0.333px]">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

export default function CookiePolicyPage() {
  return (
    <LegalPageShell title="COOKIE POLICY">
      <p>
        Il sito www.strapps.it utilizza cookie per garantire il corretto funzionamento e migliorare l&apos;esperienza
        dell&apos;utente.
      </p>

      <CookieSection title="Tipologie di cookie utilizzati">
        <ul className="list-disc space-y-1 pl-5">
          <li>Cookie tecnici (necessari)</li>
          <li>Cookie analitici (Google Analytics / GA4)</li>
          <li>Cookie di marketing e remarketing (Meta Pixel, Google Ads)</li>
          <li>Cookie di terze parti (Wix, Stripe, PayPal)</li>
        </ul>
      </CookieSection>

      <CookieSection title="Gestione del consenso">
        <p>Al primo accesso l&apos;utente puo:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>accettare tutti i cookie</li>
          <li>rifiutare i cookie non necessari</li>
          <li>personalizzare le preferenze</li>
        </ul>
        <p>Il consenso puo essere modificato in qualsiasi momento tramite il banner cookie.</p>
      </CookieSection>

      <section className="space-y-3">
        <h2 className="font-azeret text-[12px] font-black tracking-[-0.333px]">Link utili</h2>
        <p>
          Sito:{" "}
          <a href="https://www.strapps.it" className="underline decoration-white/60">
            www.strapps.it
          </a>
        </p>
      </section>
    </LegalPageShell>
  );
}
