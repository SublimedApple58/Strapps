"use client";

import { useEffect, useMemo, useState } from "react";

const FIRST_OPEN = new Date("2026-03-07T00:00:00+01:00").getTime();
const SECOND_OPEN = new Date("2026-03-14T00:00:00+01:00").getTime();
const THIRD_OPEN = new Date("2026-03-21T00:00:00+01:00").getTime();
const LAST_CLOSE = new Date("2026-03-25T00:00:00+01:00").getTime();

type TierId = "first" | "early" | "last";
type CountdownView = {
  tier: TierId;
  label: "Apre tra" | "Chiude tra";
  target: number;
};

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
};

function getCountdownView(now: number): CountdownView | null {
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

function getRemaining(target: number, now: number): Remaining | null {
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

type AccessTierCountdownProps = {
  tier: TierId;
  className?: string;
};

export function AccessTierCountdown({ tier, className = "" }: AccessTierCountdownProps) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const view = useMemo(() => getCountdownView(now), [now]);
  if (!view || view.tier !== tier) {
    return null;
  }

  const remaining = getRemaining(view.target, now);
  if (!remaining) {
    return null;
  }

  return (
    <p className={className}>
      {view.label}: {remaining.days}g {remaining.hours}h {remaining.minutes}m
    </p>
  );
}
