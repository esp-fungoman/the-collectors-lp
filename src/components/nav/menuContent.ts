export const menuAssets = {
  bg: "/images/menu-bg.png",
  logo: "/images/logo-big.svg",
  close: "/images/menu-close.svg",
} as const;

export const menuLinks = [
  { label: "Tổng quan dự án", href: "#hero" },
  { label: "Vị trí", href: "#ecosystem" },
  { label: "Đặc quyền", href: "#value" },
  { label: "Concept", href: "#space" },
  { label: "Thông tin liên hệ", href: "#contact" },
] as const;

/** Figma Menu 2:348 artboard 1440×768 — absolute layout for golden-ratio logo placement */
export const menuLayout = {
  artboardW: 1440,
  artboardH: 768,
  /** Logo sits in the spiral twist: x=188 y=212.5 w=305 h=343 */
  logo: {
    leftPct: (188 / 1440) * 100,
    topPct: (212.5 / 768) * 100,
    widthPct: (305 / 1440) * 100,
    aspect: "305 / 343",
  },
  /** Nav block: x=901 y=215.5 w=459 — right-aligned items */
  nav: {
    leftPct: (901 / 1440) * 100,
    topPct: (215.5 / 768) * 100,
    widthPct: (459 / 1440) * 100,
  },
} as const;

export const menuTokens = {
  padX: "5rem",
  padXMobile: "1.25rem",
  listGap: "2.5rem",
  logoW: "19.0625rem",
  logoH: "21.4375rem",
  logoMobileW: "12rem",
  closeIcon: "2.5rem",
  closeHit: "3.5rem",
  activeSize: "3rem",
  activeSizeMobile: "2.5rem",
  itemSize: "1.75rem",
  lineHeight: 1.1,
} as const;
