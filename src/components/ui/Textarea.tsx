import { type TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function Textarea({
  label,
  className = "",
  id,
  rows = 4,
  ...props
}: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <label className="flex w-full flex-col gap-2">
      {label ? (
        <span className="font-sans text-sm font-medium uppercase tracking-wide text-cream/80">
          {label}
        </span>
      ) : null}
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full resize-y border border-gold-border/40 bg-forest-deep/80 px-4 py-3 font-sans text-base text-cream outline-none transition placeholder:text-cream/40 focus:border-gold-border ${className}`.trim()}
        {...props}
      />
    </label>
  );
}
