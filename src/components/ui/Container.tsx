import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "header" | "footer" | "main";
};

export function Container({
  children,
  className = "",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[var(--layout-max)] px-5 md:px-[var(--layout-pad)] ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
