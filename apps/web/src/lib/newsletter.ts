import { Resend } from "resend";
import { buildNewsletterConfirmationTemplate } from "@/lib/newsletter-email-template";

export type NewsletterSubscribeStatus = "subscribed" | "already_subscribed";

export type NewsletterSubscribeResult = {
  status: NewsletterSubscribeStatus;
  displayName: string;
};

export class NewsletterConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NewsletterConfigError";
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new NewsletterConfigError(`Missing environment variable: ${name}`);
  }
  return value;
}

export function normalizeNewsletterEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function deriveStrapperName(email: string): string {
  const [localPart = ""] = email.split("@");
  const base = localPart.split("+")[0] ?? "";
  const cleaned = base
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) {
    return "Strapper";
  }

  return cleaned
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function isAlreadySubscribedError(error: unknown): boolean {
  if (!error || typeof error !== "object") {
    return false;
  }

  const candidate = error as {
    message?: string;
    statusCode?: number;
    code?: string;
  };

  if (candidate.statusCode === 409) {
    return true;
  }

  const combined = `${candidate.message ?? ""} ${candidate.code ?? ""}`.toLowerCase();
  return combined.includes("already") && (combined.includes("exist") || combined.includes("subscrib"));
}

export async function subscribeToNewsletter(rawEmail: string): Promise<NewsletterSubscribeResult> {
  const resendApiKey = requiredEnv("RESEND_API_KEY");
  const audienceId = requiredEnv("RESEND_AUDIENCE_ID");
  const fromEmail = requiredEnv("NEWSLETTER_FROM_EMAIL");
  const fromName = requiredEnv("NEWSLETTER_FROM_NAME");
  const replyTo = requiredEnv("NEWSLETTER_REPLY_TO");

  const resend = new Resend(resendApiKey);
  const email = normalizeNewsletterEmail(rawEmail);
  const strapper = deriveStrapperName(email);

  const contactResult = await resend.contacts.create({
    audienceId,
    email,
    firstName: strapper,
  });

  if (contactResult.error) {
    if (isAlreadySubscribedError(contactResult.error)) {
      return { status: "already_subscribed", displayName: strapper };
    }

    throw new Error(contactResult.error.message || "Unable to subscribe contact");
  }

  const template = buildNewsletterConfirmationTemplate({ strapper });
  const emailResult = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: email,
    replyTo,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });

  if (emailResult.error) {
    throw new Error(emailResult.error.message || "Unable to send confirmation email");
  }

  return { status: "subscribed", displayName: strapper };
}
