"use client";

import { useEffect } from "react";
import Image from "next/image";
import { LeadForm } from "@/components/lead/LeadForm";
import { floatActions, floatAssets } from "@/components/lead/floatContent";
import { ctaNames } from "@/lib/leads/ctaNames";

type LeadModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LeadModal({ open, onClose }: LeadModalProps) {
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-[1.25rem]">
      <button
        type="button"
        aria-label={floatActions.closeLabel}
        className="absolute inset-0 bg-[#C6AA85]/50"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={floatActions.formLabel}
        className="relative z-[1] flex w-full max-w-[32.625rem] flex-col border border-[#FDD598] bg-[rgba(20,7,0,0.95)] px-[1.5rem] pb-[2rem] pt-[2.1875rem] sm:h-[36.25rem] sm:px-[2.5rem] sm:pb-[2.5rem]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={floatActions.closeLabel}
          className="absolute top-[0.25rem] right-[0.25rem] flex size-[3.5rem] items-center justify-center text-[#FEF5E2] transition hover:opacity-80"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M32.1344 30.3656C32.2505 30.4818 32.3426 30.6196 32.4055 30.7714C32.4683 30.9231 32.5007 31.0858 32.5007 31.25C32.5007 31.4142 32.4683 31.5769 32.4055 31.7286C32.3426 31.8804 32.2505 32.0182 32.1344 32.1344C32.0182 32.2505 31.8804 32.3426 31.7286 32.4055C31.5769 32.4683 31.4142 32.5007 31.25 32.5007C31.0858 32.5007 30.9231 32.4683 30.7714 32.4055C30.6196 32.3426 30.4818 32.2505 30.3656 32.1344L20 21.7672L9.63438 32.1344C9.39982 32.3689 9.08171 32.5007 8.75 32.5007C8.4183 32.5007 8.10018 32.3689 7.86563 32.1344C7.63107 31.8998 7.49931 31.5817 7.49931 31.25C7.49931 30.9183 7.63107 30.6002 7.86563 30.3656L18.2328 20L7.86563 9.63438C7.63107 9.39982 7.49931 9.08171 7.49931 8.75C7.49931 8.4183 7.63107 8.10018 7.86563 7.86563C8.10018 7.63107 8.4183 7.49931 8.75 7.49931C9.08171 7.49931 9.39982 7.63107 9.63438 7.86563L20 18.2328L30.3656 7.86563C30.6002 7.63107 30.9183 7.49931 31.25 7.49931C31.5817 7.49931 31.8998 7.63107 32.1344 7.86563C32.3689 8.10018 32.5007 8.4183 32.5007 8.75C32.5007 9.08171 32.3689 9.39982 32.1344 9.63438L21.7672 20L32.1344 30.3656Z"
              fill="currentColor"
            />
          </svg>
        </button>

        <div className="mx-auto mb-[2rem] w-[min(16.625rem,100%)]">
          <Image
            src={floatAssets.title}
            alt="Khám phá bộ sưu tập 58 dinh thự tinh hiếm"
            width={266}
            height={156}
            className="h-auto w-full"
          />
        </div>

        <LeadForm
          variant="modal"
          ctaName={ctaNames.floatForm}
          onSuccess={onClose}
          className="flex-1"
        />
      </div>
    </div>
  );
}
