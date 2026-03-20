export type TierId = "first" | "early" | "last";

export type CountdownView = {
  tier: TierId;
  label: "Apre tra" | "Chiude tra";
  target: number;
};

export type RemainingTime = {
  days: number;
  hours: number;
  minutes: number;
};

const FIRST_OPEN = new Date("2026-03-20T12:00:00+01:00").getTime();
const SECOND_OPEN = new Date("2026-03-31T12:00:00+01:00").getTime();
const THIRD_OPEN = new Date("2026-04-07T12:00:00+01:00").getTime();
const LAST_CLOSE = new Date("2026-04-11T12:00:00+01:00").getTime();

export function getActiveTier(now: number): TierId | null {
  if (now >= FIRST_OPEN && now < SECOND_OPEN) {
    return "first";
  }
  if (now >= SECOND_OPEN && now < THIRD_OPEN) {
    return "early";
  }
  if (now >= THIRD_OPEN && now < LAST_CLOSE) {
    return "last";
  }
  return null;
}

export function isTierActive(tier: TierId, now: number): boolean {
  return getActiveTier(now) === tier;
}

/** Tier da linkare nel bottone: "first" se il drop non è ancora aperto, null se è finito tutto. */
export function getDropLinkTier(now: number): TierId | null {
  if (now >= LAST_CLOSE) return null;
  return getActiveTier(now) ?? "first";
}

export function getCountdownView(now: number): CountdownView | null {
  if (now < FIRST_OPEN) {
    return { tier: "first", label: "Apre tra", target: FIRST_OPEN };
  }
  if (now < SECOND_OPEN) {
    return { tier: "first", label: "Chiude tra", target: SECOND_OPEN };
  }
  if (now < THIRD_OPEN) {
    return { tier: "early", label: "Chiude tra", target: THIRD_OPEN };
  }
  if (now < LAST_CLOSE) {
    return { tier: "last", label: "Chiude tra", target: LAST_CLOSE };
  }
  return null;
}

export function getRemainingTime(target: number, now: number): RemainingTime | null {
  const diff = target - now;
  if (diff <= 0) {
    return null;
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
}
