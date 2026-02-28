"use client";

import { useEffect, useState } from "react";

const TARGET_TIME = new Date("2026-03-07T00:00:00+01:00").getTime();

type Remaining = {
  days: number;
  hours: number;
  minutes: number;
};

function getRemainingTime(): Remaining | null {
  const now = Date.now();
  const diff = TARGET_TIME - now;

  if (diff <= 0) {
    return null;
  }

  const totalMinutes = Math.floor(diff / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return { days, hours, minutes };
}

type NewsletterCountdownProps = {
  className?: string;
};

export function NewsletterCountdown({ className = "" }: NewsletterCountdownProps) {
  const [remaining, setRemaining] = useState<Remaining | null>(getRemainingTime);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getRemainingTime());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  if (!remaining) {
    return null;
  }

  return (
    <p className={className}>
      Chiude tra: {remaining.days}g {remaining.hours}h {remaining.minutes}m
    </p>
  );
}
