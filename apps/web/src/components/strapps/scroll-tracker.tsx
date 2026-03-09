"use client";

import { useEffect } from "react";
import { fbqTrackCustom } from "@/lib/meta-pixel";

export function ScrollTracker({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fbqTrackCustom("ScrollProductSection");
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

  return null;
}
