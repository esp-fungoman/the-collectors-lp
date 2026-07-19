import { type ButtonHTMLAttributes, type ReactNode } from "react";

const variants = {
  primary:
    "border border-gold-border bg-gradient-to-r from-gold via-gold-mid via-[45%] to-gold-end text-ink hover:brightness-105",
  outline:
    "border border-gold-border bg-transparent text-cream hover:bg-gold/10",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-4 py-3 transition duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
