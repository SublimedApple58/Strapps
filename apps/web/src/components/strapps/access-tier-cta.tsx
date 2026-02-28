"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { isTierActive, type TierId } from "@/components/strapps/access-tier-schedule";

type AccessTierCtaProps = {
  tier: TierId;
  href: string;
  label: string;
  className: string;
};

export function AccessTierCta({ tier, href, label, className }: AccessTierCtaProps) {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const enabled = useMemo(() => isTierActive(tier, now), [tier, now]);

  if (!enabled) {
    return (
      <span
        aria-disabled="true"
        className={`${className} cursor-not-allowed opacity-55 pointer-events-none select-none`}
      >
        {label}
      </span>
    );
  }

  return <Link href={href} className={className}>{label}</Link>;
}
