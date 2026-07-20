/** Map / Ecosystem section — Figma px → rem (root 16). */

export const mapAssets = {
  map: "/images/map/map-1.svg",
  times: [
    "/images/map/time-1.webp",
    "/images/map/time-2.webp",
    "/images/map/time-3.webp",
  ] as const,
} as const;

export const mapCopy = {
  eyebrow: "hệ sinh thái",
  title: "quốc tế",
  cta: "Nhận hồ sơ vị trí & quy hoạch dự án",
  ctaHref: "#contact",
  timeAlts: [
    "05 - 20 phút — Giáo dục & y tế quốc tế",
    "05 - 20 phút — Thể thao & giải trí",
    "10 - 20 phút — Mua sắm & thương mại",
  ] as const,
} as const;

export const map = {
  /** title → map → times → CTA */
  sectionH: "54rem",
  titleLeft: "5rem",
  titleTop: "4.25rem",
  titleGap: "0.75rem",
  titleW: "19.0625rem",
  /** Mobile → desktop (lg). Fixed rem — no clamp. */
  eyebrowSize: "1rem",
  eyebrowSizeLg: "1.5rem",
  eyebrowTracking: "-0.03rem",
  titleSize: "2.5rem",
  titleSizeLg: "4rem",
  titleColor: "#6B3F24",
  /** 1272×633 */
  mapW: "79.5rem",
  mapH: "39.5625rem",
  mapLeft: "10.5rem",
  /** 300×88 time clusters */
  timeW: "18.75rem",
  timeH: "5.5rem",
  timeGap: "1.5rem",
  timeTop: "41rem",
  ctaTop: "49rem",
  ctaPadX: "1rem",
  ctaPadY: "0.75rem",
  ctaFontSize: "0.875rem",
  ctaFontSizeLg: "1rem",
  gradient: "linear-gradient(180deg, #E7CFB0 0%, #C6AB87 100%)",
} as const;
