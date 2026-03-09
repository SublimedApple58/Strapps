"use client";

import { useEffect } from "react";
import { fbqTrack } from "@/lib/meta-pixel";

type Props = {
  paymentType: string | null;
  amountTotal: number | null;
  sessionId: string | null;
};

export function MetaPixelEvents({ paymentType, amountTotal, sessionId }: Props) {
  useEffect(() => {
    if (paymentType !== "acquisto" && paymentType !== "accesso" && paymentType !== "estendi") return;

    const value = amountTotal ?? 0;
    const eventID = sessionId ?? undefined;

    fbqTrack(
      "Purchase",
      { value, currency: "EUR" },
      eventID ? { eventID } : undefined,
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
