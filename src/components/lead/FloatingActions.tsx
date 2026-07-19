"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { LeadModal } from "@/components/lead/LeadModal";
import { floatActions, floatAssets } from "@/components/lead/floatContent";
import { ctaNames } from "@/lib/leads/ctaNames";
import { setLeadCtaSource } from "@/lib/leads/ctaSource";

const iconBtnClass =
  "relative block size-[4rem] shrink-0 overflow-hidden transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDD598]";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);

  function openForm() {
    setLeadCtaSource(ctaNames.floatForm);
    setOpen(true);
  }

  return (
    <>
      <div className="fixed right-[0.75rem] bottom-[5.5rem] z-40 flex flex-col lg:right-[1.25rem] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
        <a
          href={floatActions.phoneHref}
          aria-label={floatActions.phoneLabel}
          className={iconBtnClass}
        >
          <Image
            src={floatAssets.phone}
            alt=""
            width={64}
            height={64}
            className="size-full object-contain"
          />
        </a>
        <a
          href={floatActions.messageHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={floatActions.messageLabel}
          className={iconBtnClass}
        >
          <Image
            src={floatAssets.message}
            alt=""
            width={64}
            height={64}
            className="size-full object-contain"
          />
        </a>
        <button
          type="button"
          aria-label={floatActions.formLabel}
          className={iconBtnClass}
          onClick={openForm}
        >
          <Image
            src={floatAssets.form}
            alt=""
            width={64}
            height={64}
            className="size-full object-contain"
          />
        </button>
      </div>

      <LeadModal open={open} onClose={onClose} />
    </>
  );
}
