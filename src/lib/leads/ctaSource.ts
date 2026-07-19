import { ctaNames } from "@/lib/leads/ctaNames";

const LEAD_CTA_KEY = "leadCta";

export function setLeadCtaSource(name: string) {
  try {
    sessionStorage.setItem(LEAD_CTA_KEY, name);
  } catch {
    // ignore quota / private mode
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
}

export function resolveLeadCtaSource(explicit?: string): string {
  return explicit?.trim() || getLeadCtaSource() || ctaNames.footerForm;
}
