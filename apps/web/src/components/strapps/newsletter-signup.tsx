"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent } from "react";
import { useState } from "react";

const NEWSLETTER_ARROW = "/figma/home-v2/arrow.svg";

type ApiSuccess = {
  status: "subscribed" | "already_subscribed";
  displayName: string;
};

type ModalState =
  | { type: "subscribed"; message: string }
  | { type: "already_subscribed"; message: string }
  | { type: "error"; message: string }
  | null;

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!consent) {
      setFormError("Devi accettare la Privacy Policy per iscriverti.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, consent }),
      });

      const payload = (await response.json()) as ApiSuccess | { error?: string };

      if (!response.ok) {
        setModal({
          type: "error",
          message: "Errore temporaneo, riprova tra poco.",
        });
        return;
      }

      if ("status" in payload && payload.status === "subscribed") {
        setEmail("");
        setConsent(false);
        setModal({
          type: "subscribed",
          message: `Ciao ${payload.displayName}! Iscrizione completata.`,
        });
        return;
      }

      if ("status" in payload && payload.status === "already_subscribed") {
        setModal({
          type: "already_subscribed",
          message: `Ciao ${payload.displayName}! Sei già iscritt* alla newsletter.`,
        });
        return;
      }

      setModal({
        type: "error",
        message: "Errore temporaneo, riprova tra poco.",
      });
    } catch {
      setModal({
        type: "error",
        message: "Errore temporaneo, riprova tra poco.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="relative mt-4" onSubmit={submit}>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="POSTA EMAIL"
          aria-label="Email newsletter"
          className="font-azeret h-[51px] w-full rounded-[26px] bg-[#d9d9d9] px-5 pr-[66px] text-[12px] text-black placeholder:text-[#5f5f5f] focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Invia email"
          className="absolute right-[4px] top-1/2 flex h-[44px] w-[44px] -translate-y-1/2 items-center justify-center rounded-full bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Image src={NEWSLETTER_ARROW} alt="" aria-hidden width={25} height={14} className="h-[14px] w-[25px]" />
        </button>
      </form>

      <div className="mt-3 flex items-start gap-2">
        <input
          id="newsletter-consent"
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-[3px] h-[14px] w-[14px] accent-[#f00707]"
        />
        <label htmlFor="newsletter-consent" className="font-azeret text-[10px] tracking-[-0.333px] text-white/90">
          Accetto la{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </label>
      </div>

      {formError ? <p className="font-azeret mt-2 text-[10px] text-[#f00707]">{formError}</p> : null}

      {modal ? (
        <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/65 p-6">
          <div className="w-full max-w-[360px] rounded-[20px] bg-[#f00707] p-6 text-white shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
            <p className="font-impact text-[20px] tracking-[-0.333px]">
              {modal.type === "error" ? "OPS" : "CONFERMA"}
            </p>
            <p className="font-azeret mt-4 text-[12px] tracking-[-0.333px]">{modal.message}</p>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="font-impact mt-6 flex h-[38px] w-full items-center justify-center rounded-[19px] bg-black text-[14px] tracking-[-0.333px] text-white"
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
