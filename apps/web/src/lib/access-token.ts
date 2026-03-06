import crypto from "crypto";

function getSecret(): string {
  return process.env.ACCESS_TOKEN_SECRET ?? "strapps-fallback-secret-change-in-prod";
}

/**
 * Genera un token HMAC-SHA256 auto-contenuto.
 * Formato: base64url(payload) + "." + base64url(firma_troncata)
 *
 * @param email     email dell'utente
 * @param tier      tier del drop
 * @param ttlMs     validità in millisecondi (es. 30 * 60 * 1000 per 30 min)
 */
export function generateAccessToken(
  email: string,
  tier: string,
  ttlMs: number,
): string {
  const expiresAt = Date.now() + ttlMs;
  const payload = `${email.toLowerCase()}|${tier}|${expiresAt}`;
  const payloadB64 = Buffer.from(payload).toString("base64url");
  const sig = crypto
    .createHmac("sha256", getSecret())
    .update(payloadB64)
    .digest("base64url")
    .slice(0, 16);
  return `${payloadB64}.${sig}`;
}

export type VerifiedToken = {
  email: string;
  tier: string;
  expiresAt: number;
};

/**
 * Verifica il token. Ritorna i dati se valido e non scaduto, null altrimenti.
 */
export function verifyAccessToken(token: string): VerifiedToken | null {
  try {
    const [payloadB64, sig] = token.split(".");
    if (!payloadB64 || !sig) return null;

    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(payloadB64)
      .digest("base64url")
      .slice(0, 16);

    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return null;
    }

    const payload = Buffer.from(payloadB64, "base64url").toString();
    const [email, tier, expiresAtStr] = payload.split("|");
    if (!email || !tier || !expiresAtStr) return null;

    const expiresAt = parseInt(expiresAtStr, 10);
    if (Date.now() > expiresAt) return null;

    return { email, tier, expiresAt };
  } catch {
    return null;
  }
}

export const TTL_30_MIN = 30 * 60 * 1000;
export const TTL_30_DAYS = 30 * 24 * 60 * 60 * 1000;
