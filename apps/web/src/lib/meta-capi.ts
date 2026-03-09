import { createHash } from "crypto";

const PIXEL_ID = "1966122067585580";
const CAPI_URL = `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`;

export function sha256(value: string): string {
  return createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

type UserData = {
  em?: string;
  ph?: string;
  client_ip_address?: string;
  client_user_agent?: string;
};

type CustomData = {
  currency?: string;
  value?: number;
  [key: string]: unknown;
};

type CAPIEvent = {
  event_name: string;
  event_id?: string;
  event_time: number;
  action_source: "website";
  user_data: UserData;
  custom_data?: CustomData;
};

export async function sendCAPIEvent(events: CAPIEvent[]): Promise<void> {
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("[CAPI] META_CAPI_ACCESS_TOKEN non configurato, evento saltato");
    return;
  }
  try {
    const res = await fetch(`${CAPI_URL}?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: events }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[CAPI] errore:", text);
    }
  } catch (err) {
    console.error("[CAPI] fetch error:", err);
  }
}
