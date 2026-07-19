"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { setLeadCtaSource } from "@/lib/leads/ctaSource";

type ContactCtaLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  ctaName: string;
  href?: string;
};

export function ContactCtaLink({
  ctaName,
  href = "#contact",
  onClick,
  children,
  ...props
}: ContactCtaLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    setLeadCtaSource(ctaName);
    onClick?.(event);
  }

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
