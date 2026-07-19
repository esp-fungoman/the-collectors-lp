/** Concept landscape carousel — Figma `2:268`. Fixed rem, no clamp. */

export const conceptAssets = {
  arrow: "/images/masterpiece/arrow-right.webp",
} as const;

export const conceptCopy = {
  title: "concept",
  subtitle: "cảnh quan",
  cta: "Nhận ấn bản thiết kế 58 đại trạch",
  ctaHref: "#contact",
  conceptLabel: "*Concept Design",
} as const;

export const conceptSlides = Array.from({ length: 5 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/images/concept/${n}.webp`,
    alt: `Concept cảnh quan ${n}`,
  };
});

export const concept = {
  sectionH: "43.75rem",
  activeW: "57.9375rem",
  peekColW: "32.0625rem",
  peekH: "10.9375rem",
  titleColor: "#FEF5E2",
  titleSize: "2.5rem",
  titleSizeLg: "4rem",
  subtitleSize: "1rem",
  subtitleSizeLg: "1.5rem",
  subtitleTracking: "-0.03rem",
  footerPadX: "5rem",
  footerPadY: "2.5rem",
  gradientH: "10.625rem",
  arrowW: "6.25rem",
  arrowH: "3.5rem",
  arrowRight: "5rem",
  arrowBottom: "2.5rem",
  ctaPadX: "1rem",
  ctaPadY: "0.75rem",
  ctaFontSize: "1rem",
} as const;
