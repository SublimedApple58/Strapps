"use client";

import { useEffect, useMemo, useState } from "react";
import { getCountdownView, getRemainingTime, type TierId } from "@/components/strapps/access-tier-schedule";

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

  const remaining = getRemainingTime(view.target, now);
  if (!remaining) {
    return null;
  }

  return (
    <p className={className}>
      {view.label}: {remaining.days}g {remaining.hours}h {remaining.minutes}m
    </p>
  );
}
