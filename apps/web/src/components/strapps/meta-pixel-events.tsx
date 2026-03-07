"use client";

import { useEffect } from "react";
import { fbqTrack, fbqTrackCustom } from "@/lib/meta-pixel";

type Props = {
  paymentType: string | null;
  tier: string | null;
  amountTotal: number | null; // in euro
};

export function MetaPixelEvents({ paymentType, tier, amountTotal }: Props) {
  useEffect(() => {
    if (!paymentType) return;

    if (paymentType === "accesso") {
      fbqTrack("Lead", {
        value: 1,
        currency: "EUR",
        checkout_type: "access_fee",
        content_ids: ["access_1eur"],
        content_type: "product",
      });
    } else if (paymentType === "acquisto") {
      fbqTrack("Purchase", {
        value: amountTotal ?? 0,
        currency: "EUR",
        checkout_type: "shoe",
        list_level: tier ?? "",
        content_ids: ["strapps_v1"],
        content_type: "product",
      });
    } else if (paymentType === "estendi") {
      fbqTrackCustom("PurchaseExtend", {
        value: 49,
        currency: "EUR",
        checkout_type: "extend",
        content_ids: ["price_lock_30d"],
        content_type: "product",
        event_id: crypto.randomUUID(),
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
