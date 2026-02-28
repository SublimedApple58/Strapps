"use client";

import { useEffect } from "react";

type ScrollToNewsletterButtonProps = {
  className: string;
  label: string;
};

export function ScrollToNewsletterButton({ className, label }: ScrollToNewsletterButtonProps) {
  useEffect(() => {
    if (window.location.hash === "#newsletter-title") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    }
  }, []);

  const handleClick = () => {
    const target = document.getElementById("newsletter-title");
    if (!target) {
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  return (
    <button type="button" onClick={handleClick} className={className}>
      {label}
    </button>
  );
}
