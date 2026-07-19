/** Masterpiece coverflow — Figma `2:153` / track `2:158`. Fixed rem, no clamp. */

export const masterpieceAssets = {
  bg: "/images/masterpiece/masterpiece-bg.png",
  arrow: "/images/masterpiece/arrow-right.png",
} as const;

export const masterpieceCopy = {
  title: "tuyệt tác",
  subtitle: "không gian",
  cta: "Chiêm ngưỡng tuyệt tác cảnh quan",
  ctaHref: "#contact",
  conceptLabel: "*Concept Design",
} as const;

export const masterpieceSlides = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1;
  return {
    src: `/images/masterpiece/${n}.jpg`,
    alt: `Tuyệt tác không gian ${n}`,
  };
});

/** Mobile base → lg overrides via CSS vars. */
export const masterpiece = {
  titleColor: "#FEF5E2",
  titleSize: "2.5rem",
  titleSizeLg: "4rem",
  subtitleSize: "1rem",
  subtitleSizeLg: "1.5rem",
  subtitleTracking: "-0.03rem",
  blockGap: "2rem",
  blockGapLg: "3rem",
  /** Active slide */
  activeW: "100%",
  activeWLg: "52.875rem",
  activeH: "14rem",
  activeHLg: "26.4375rem",
  /** Side peeks */
  sideW: "0rem",
  sideWLg: "37.5rem",
  sideH: "0rem",
  sideHLg: "18.75rem",
  gap: "0.75rem",
  gapLg: "1.25rem",
  arrowW: "4rem",
  arrowWLg: "6.25rem",
  arrowH: "2.25rem",
  arrowHLg: "3.5rem",
  ctaPadX: "1rem",
  ctaPadY: "0.75rem",
  ctaFontSize: "0.875rem",
  ctaFontSizeLg: "1rem",
  /** Pin clearance from ValueProps */
  spacePadTop: "2rem",
  spacePadTopLg: "11rem",
} as const;
