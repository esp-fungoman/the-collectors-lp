import { ctaNames } from "@/lib/leads/ctaNames";

const LEAD_CTA_KEY = "leadCta";
export const LEAD_CTA_CHANGE_EVENT = "lead-cta-change";

export function setLeadCtaSource(name: string) {
  try {
    sessionStorage.setItem(LEAD_CTA_KEY, name);
  } catch {
    // ignore quota / private mode
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(LEAD_CTA_CHANGE_EVENT, { detail: name }),
    );
  }
}

export function getLeadCtaSource(): string | null {
  try {
    return sessionStorage.getItem(LEAD_CTA_KEY);
  } catch {
    return null;
  }
}

export function clearLeadCtaSource() {
  try {
    sessionStorage.removeItem(LEAD_CTA_KEY);
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(LEAD_CTA_CHANGE_EVENT, { detail: null }),
    );
  }
}

/**
 * Prefer: explicit prop (modal) → sessionStorage (CTA click) → footer default.
 * Do not pass stale form state as "explicit" — that masked CTA sources.
 */
export function resolveLeadCtaSource(explicit?: string): string {
  const fromProp = explicit?.trim();
  if (fromProp) return fromProp;
  return getLeadCtaSource()?.trim() || ctaNames.footerForm;
}
