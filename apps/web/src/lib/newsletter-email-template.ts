export type NewsletterConfirmationTemplateInput = {
  strapper: string;
};

export type NewsletterConfirmationTemplate = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildNewsletterConfirmationTemplate({
  strapper,
}: NewsletterConfirmationTemplateInput): NewsletterConfirmationTemplate {
  const safeName = escapeHtml(strapper);

  return {
    subject: "Conferma iscrizione newsletter STRAPPS",
    html: `
      <div style="background:#f2f2f2;padding:32px 20px;font-family:Arial,Helvetica,sans-serif;color:#000;">
        <div style="max-width:620px;margin:0 auto;background:#f2f2f2;">
          <h1 style="margin:0 0 24px 0;text-align:center;font-size:56px;line-height:1;font-weight:700;">SEI ISCRITTO</h1>
          <hr style="border:0;border-top:4px solid #000;margin:0 0 36px 0;" />
          <p style="margin:0;font-size:44px;line-height:1.25;font-weight:400;">
            Ciao ${safeName}! Ti sei iscritto alla nostra newsletter
          </p>
        </div>
      </div>
    `.trim(),
    text: `SEI ISCRITTO\n\nCiao ${strapper}! Ti sei iscritto alla nostra newsletter`,
  };
}
