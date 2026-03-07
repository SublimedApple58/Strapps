// Template email pagamenti — stessa struttura grafica della newsletter:
// sfondo #f2f2f2, max-width 620px, H1 bold, HR 4px nero, testo grande.

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const BASE_STYLE = `background:#f2f2f2;padding:32px 20px;font-family:Arial,Helvetica,sans-serif;color:#000;`;
const INNER_STYLE = `max-width:620px;margin:0 auto;background:#f2f2f2;`;
const H1_STYLE = `margin:0 0 24px 0;text-align:center;font-size:56px;line-height:1;font-weight:700;`;
const HR_STYLE = `border:0;border-top:4px solid #000;margin:0 0 36px 0;`;
const BODY_STYLE = `margin:0 0 32px 0;font-size:44px;line-height:1.25;font-weight:400;`;
const SMALL_STYLE = `margin:0 0 32px 0;font-size:20px;line-height:1.5;font-weight:400;color:#333;`;
const BTN_STYLE = `display:inline-block;background:#f00707;color:#fff;text-decoration:none;font-size:20px;font-weight:700;padding:16px 40px;border-radius:40px;letter-spacing:-0.5px;`;

// ─────────────────────────────────────────────────────────────────────────────
// 1. Accesso confermato (pagamento 1€) — valido 30 minuti
// ─────────────────────────────────────────────────────────────────────────────

export function buildAccessoConfirmationTemplate(params: {
  tier: string;       // es. "FIRST 60"
  price: string;      // es. "189,99€"
  productUrl: string; // link firmato alla pagina prodotto
  expiresAt: Date;    // scadenza del link (30 min)
}): { subject: string; html: string; text: string } {
  const { tier, price, productUrl, expiresAt } = params;
  const safeTier = escapeHtml(tier);
  const safePrice = escapeHtml(price);
  const expireTime = expiresAt.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" });

  return {
    subject: `✅ Accesso confermato — Drop ${tier}`,
    html: `
      <div style="${BASE_STYLE}">
        <div style="${INNER_STYLE}">
          <h1 style="${H1_STYLE}">ACCESSO CONFERMATO</h1>
          <hr style="${HR_STYLE}" />
          <p style="${BODY_STYLE}">Hai sbloccato il drop ${safeTier} al prezzo di ${safePrice}</p>
          <p style="${SMALL_STYLE}">
            Hai <strong>30 minuti</strong> per completare l'acquisto al prezzo bloccato.
            Il link qui sotto scade alle <strong>${expireTime}</strong>.
            Clicca qui se hai chiuso la pagina per errore.
          </p>
          <p style="${SMALL_STYLE}">
            I <strong>1,00€</strong> che hai appena pagato verranno scalati dal prezzo finale della scarpa.
          </p>
          <p style="margin:0;text-align:center;">
            <a href="${productUrl}" style="${BTN_STYLE}">ACQUISTA ORA →</a>
          </p>
        </div>
      </div>
    `.trim(),
    text: `ACCESSO CONFERMATO\n\nHai sbloccato il drop ${tier} al prezzo di ${price}.\n\nHai 30 minuti (fino alle ${expireTime}) per completare l'acquisto.\n\nAcquista qui: ${productUrl}\n\nI 1,00€ verranno scalati dal prezzo finale.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Accesso esteso (pagamento 49€) — link valido 30 giorni
// ─────────────────────────────────────────────────────────────────────────────

export function buildEstendiConfirmationTemplate(params: {
  tier: string;
  price: string;       // prezzo della scarpa, es. "189,99€"
  productUrl: string;  // link firmato alla pagina prodotto (30 gg)
  expiresAt: Date;     // scadenza del link (30 giorni)
}): { subject: string; html: string; text: string } {
  const { tier, price, productUrl, expiresAt } = params;
  const safeTier = escapeHtml(tier);
  const safePrice = escapeHtml(price);
  const expireDate = formatDate(expiresAt);

  return {
    subject: `✅ Accesso esteso — Drop ${tier}`,
    html: `
      <div style="${BASE_STYLE}">
        <div style="${INNER_STYLE}">
          <h1 style="${H1_STYLE}">ACCESSO ESTESO</h1>
          <hr style="${HR_STYLE}" />
          <p style="${BODY_STYLE}">Il tuo accesso al drop ${safeTier} è stato esteso di 30 giorni</p>
          <p style="${SMALL_STYLE}">
            Puoi acquistare STRAPPS V1 al prezzo bloccato di <strong>${safePrice}</strong>
            entro il <strong>${expireDate}</strong>.
            Il link qui sotto è valido fino a quella data.
          </p>
          <p style="${SMALL_STYLE}">
            I <strong>49,00€</strong> che hai appena pagato verranno scalati dal prezzo finale della scarpa.
          </p>
          <p style="margin:0;text-align:center;">
            <a href="${productUrl}" style="${BTN_STYLE}">ACQUISTA ENTRO IL ${expireDate} →</a>
          </p>
        </div>
      </div>
    `.trim(),
    text: `ACCESSO ESTESO\n\nIl tuo accesso al drop ${tier} è stato esteso di 30 giorni.\n\nPuoi acquistare al prezzo di ${price} entro il ${expireDate}.\n\nAcquista qui: ${productUrl}\n\nI 49,00€ verranno scalati dal prezzo finale.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Acquisto confermato (acquisto scarpa)
// ─────────────────────────────────────────────────────────────────────────────

export function buildAcquistoConfirmationTemplate(params: {
  tier: string;
  price: string;
  scarpa: string;
  strappo: string;
  taglia: string;
}): { subject: string; html: string; text: string } {
  const { tier, price, scarpa, strappo, taglia } = params;
  const safeTier = escapeHtml(tier);
  const safePrice = escapeHtml(price);

  const details = [
    `<tr><td style="padding:8px 0;font-size:18px;font-weight:700;">Prodotto</td><td style="padding:8px 0;font-size:18px;">STRAPPS V1</td></tr>`,
    `<tr><td style="padding:8px 0;font-size:18px;font-weight:700;">Drop</td><td style="padding:8px 0;font-size:18px;">${safeTier}</td></tr>`,
    `<tr><td style="padding:8px 0;font-size:18px;font-weight:700;">Scarpa</td><td style="padding:8px 0;font-size:18px;">${escapeHtml(scarpa)}</td></tr>`,
    `<tr><td style="padding:8px 0;font-size:18px;font-weight:700;">Strappo</td><td style="padding:8px 0;font-size:18px;">${escapeHtml(strappo)}</td></tr>`,
    `<tr><td style="padding:8px 0;font-size:18px;font-weight:700;">Taglia</td><td style="padding:8px 0;font-size:18px;">${escapeHtml(taglia)}</td></tr>`,
    `<tr><td style="padding:8px 0;font-size:18px;font-weight:700;">Totale</td><td style="padding:8px 0;font-size:18px;color:#f00707;">${safePrice}</td></tr>`,
  ].join("");

  return {
    subject: `✅ Ordine confermato — STRAPPS V1`,
    html: `
      <div style="${BASE_STYLE}">
        <div style="${INNER_STYLE}">
          <h1 style="${H1_STYLE}">ORDINE CONFERMATO</h1>
          <hr style="${HR_STYLE}" />
          <p style="${BODY_STYLE}">Grazie! Il tuo ordine è stato ricevuto</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:32px;">${details}</table>
          <p style="${SMALL_STYLE}">Riceverai aggiornamenti sulla spedizione a questo indirizzo email.</p>
        </div>
      </div>
    `.trim(),
    text: `ORDINE CONFERMATO\n\nProdotto: STRAPPS V1\nDrop: ${tier}\nScarpa: ${scarpa}\nStrappo: ${strappo}\nTaglia: ${taglia}\nTotale: ${price}\n\nRiceverai aggiornamenti sulla spedizione a questo indirizzo email.`,
  };
}
