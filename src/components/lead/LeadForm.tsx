"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { footerCopy } from "@/components/sections/footerContent";
import {
  LEAD_CTA_CHANGE_EVENT,
  clearLeadCtaSource,
  getLeadCtaSource,
  resolveLeadCtaSource,
} from "@/lib/leads/ctaSource";
import { ctaNames } from "@/lib/leads/ctaNames";
import { isLeadFormReady, leadSchema } from "@/lib/leads/schema";

type Status = "idle" | "loading" | "success" | "error";

type LeadFormProps = {
  className?: string;
  variant?: "footer" | "modal";
  /** Locked source when form is opened from a known entry (e.g. float modal). */
  ctaName?: string;
  onSuccess?: () => void;
};

const baseFieldClass =
  "lead-field w-full border-0 border-b border-[#C6AA84] bg-transparent px-0 py-[0.75rem] font-sans text-[1rem] font-normal leading-[1.4] text-white outline-none placeholder:text-white/50 focus:border-[#FDD598]";

export function LeadForm({
  className = "",
  variant = "footer",
  ctaName,
  onSuccess,
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [buttonName, setButtonName] = useState(() =>
    resolveLeadCtaSource(ctaName),
  );
  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const canSubmit = isLeadFormReady(values) && status !== "loading";
  const fieldClass =
    variant === "modal"
      ? `${baseFieldClass} lead-field--modal`
      : baseFieldClass;

  useEffect(() => {
    if (ctaName) {
      setButtonName(resolveLeadCtaSource(ctaName));
      return;
    }

    const sync = () => setButtonName(resolveLeadCtaSource());
    sync();
    window.addEventListener(LEAD_CTA_CHANGE_EVENT, sync);
    window.addEventListener("hashchange", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener(LEAD_CTA_CHANGE_EVENT, sync);
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("focus", sync);
    };
  }, [ctaName]);

  useEffect(() => {
    return () => {
      if (successTimer.current) clearTimeout(successTimer.current);
    };
  }, []);

  function updateField(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (status === "error") {
      setStatus("idle");
      setError(null);
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Modal: locked prop. Footer: always re-read sessionStorage (never trust stale state).
    const resolvedButton =
      ctaName?.trim() ||
      getLeadCtaSource()?.trim() ||
      buttonName.trim() ||
      ctaNames.footerForm;

    const parsed = leadSchema.safeParse({
      ...values,
      buttonName: resolvedButton,
    });
    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Thông tin không hợp lệ");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Gửi không thành công");
      }
      setStatus("success");
      setValues({ name: "", email: "", phone: "", message: "" });
      clearLeadCtaSource();
      setButtonName(resolveLeadCtaSource(ctaName));
      if (onSuccess) {
        successTimer.current = setTimeout(() => onSuccess(), 1500);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full flex-col gap-[0.5rem] ${className}`.trim()}
      noValidate
    >
      <input type="hidden" name="buttonName" value={buttonName} readOnly />
      <input
        name="name"
        required
        autoComplete="name"
        placeholder={footerCopy.fields.name}
        aria-label={footerCopy.fields.name}
        value={values.name}
        onChange={(e) => updateField("name", e.target.value)}
        className={fieldClass}
      />
      <input
        name="email"
        type="email"
        autoComplete="email"
        placeholder={footerCopy.fields.email}
        aria-label={footerCopy.fields.email}
        value={values.email}
        onChange={(e) => updateField("email", e.target.value)}
        className={fieldClass}
      />
      <input
        name="phone"
        type="tel"
        autoComplete="tel"
        placeholder={footerCopy.fields.phone}
        aria-label={footerCopy.fields.phone}
        value={values.phone}
        onChange={(e) => updateField("phone", e.target.value)}
        className={fieldClass}
      />
      <input
        name="message"
        placeholder={footerCopy.fields.message}
        aria-label={footerCopy.fields.message}
        value={values.message}
        onChange={(e) => updateField("message", e.target.value)}
        className={fieldClass}
      />

      <div className="mt-[1.5rem] flex justify-center">
        <Button
          type="submit"
          disabled={!canSubmit}
          className="min-w-[12rem] px-[1.5rem] py-[0.75rem] font-sans text-[1rem] font-semibold uppercase tracking-[0.08em] text-[#1B1B1B]"
        >
          {status === "loading" ? footerCopy.submitting : footerCopy.submit}
        </Button>
      </div>

      {status === "success" ? (
        <p
          className="text-center font-sans text-[0.875rem] text-[#FDD598]"
          role="status"
        >
          {footerCopy.success}
        </p>
      ) : null}
      {status === "error" && error ? (
        <p
          className="text-center font-sans text-[0.875rem] text-red-300"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </form>
  );
}
