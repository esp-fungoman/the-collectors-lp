/** Curatorial Practice — Figma tabs `2:174` + slides `2:166`. Fixed rem, no clamp. */

export const culturalAssets = {
  arrow: "/images/masterpiece/arrow-right.png",
} as const;

export const culturalCopy = {
  title: "nghệ thuật giám tuyển",
  subtitle: "tùy biến theo từng gu chủ nhân",
} as const;

export type CulturalTab = {
  id: string;
  name: string;
  tagline: string;
  images: readonly string[];
};

function mansionImages(folder: string, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return `/images/cultural/${folder}/${n}.jpg`;
  });
}

export const culturalTabs: readonly CulturalTab[] = [
  {
    id: "prive",
    name: "Privé Mansion",
    tagline: "Kỷ nhân thầm lặng",
    images: mansionImages("prive-mansion", 6),
  },
  {
    id: "oasis",
    name: "Oasis Mansion",
    tagline: "Hiền triết thiên nhiên",
    images: mansionImages("oasis-mansion", 6),
  },
  {
    id: "regency",
    name: "Regency Mansion",
    tagline: "Trưởng dòng tổ trạch",
    images: [],
  },
  {
    id: "galleria",
    name: "Galleria Mansion",
    tagline: "Tinh hoa mỹ học",
    images: [],
  },
  {
    id: "riviera",
    name: "Riviera Mansion",
    tagline: "Tạo nhân phong vị",
    images: [],
  },
] as const;

export const cultural = {
  titleColor: "#FEF5E2",
  titleSize: "2.5rem",
  titleSizeLg: "4rem",
  subtitleSize: "1rem",
  subtitleSizeLg: "1.5rem",
  subtitleTracking: "-0.03rem",
  tabW: "16.9375rem",
  tabGap: "2.25rem",
  tabNameSize: "1.75rem",
  tabNameSizeLg: "2rem",
  tabTagSize: "0.875rem",
  tabTagSizeLg: "1rem",
  tabTagTracking: "-0.02rem",
  slideW: "100%",
  slideWLg: "52.9375rem",
  slideH: "16rem",
  slideHLg: "42.0625rem",
  peekW: "0rem",
  peekWLg: "12rem",
  slideGap: "1.25rem",
  badgeBg: "#C6AA84",
  badgePadX: "1rem",
  badgePadY: "0.75rem",
  badgeSize: "1.5rem",
  arrowW: "6.25rem",
  arrowH: "3.5rem",
  padX: "1.25rem",
  padXLg: "5rem",
  sectionGap: "3rem",
} as const;
