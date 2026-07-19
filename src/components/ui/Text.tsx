import { type ElementType, type ReactNode } from "react";

const variantClass = {
  display:
    "font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,4rem)] leading-[1.4] uppercase text-cream",
  title:
    "font-[family-name:var(--font-display)] text-[clamp(1.75rem,3vw,2rem)] leading-[1.4] uppercase text-cream",
  body: "font-sans text-[1.125rem] md:text-[1.375rem] font-medium leading-[1.5] tracking-[-0.02em] text-cream",
  label:
    "font-sans text-sm md:text-base font-medium leading-[1.5] tracking-[-0.02em] uppercase text-cream/90",
  cta: "font-sans text-base font-bold leading-[1.4] uppercase tracking-wide",
} as const;

export type TextVariant = keyof typeof variantClass;

type TextProps = {
  as?: ElementType;
  variant?: TextVariant;
  className?: string;
  children: ReactNode;
};

export function Text({
  as: Tag = "p",
  variant = "body",
  className = "",
  children,
}: TextProps) {
  return (
    <Tag className={`${variantClass[variant]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
