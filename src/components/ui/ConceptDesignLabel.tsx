/** Fixed “*Concept Design” watermark on carousel media. */
export function ConceptDesignLabel({
  className = "",
  label = "*Concept Design",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <p
      className={`pointer-events-none absolute bottom-2 right-4 z-10 text-center font-sans text-[12px] font-medium not-italic leading-[140%] text-white ${className}`.trim()}
      style={{ opacity: 0.2 }}
    >
      {label}
    </p>
  );
}
