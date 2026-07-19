import { type CSSProperties, type ReactNode } from "react";
import { Reveal } from "./Reveal";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  reveal?: boolean;
  style?: CSSProperties;
};

export function Section({
  id,
  children,
  className = "",
  reveal = true,
  style,
}: SectionProps) {
  const content = reveal ? <Reveal>{children}</Reveal> : children;

  return (
    <section
      id={id}
      className={`relative w-full ${className}`.trim()}
      style={style}
    >
      {content}
    </section>
  );
}
