/** ValueProps section — Figma `2:116` + pins `2:125`…`2:146`. Fixed rem, no clamp. */

export const valueAssets = {
  bg: "/images/value/value-bg.webp",
  cardBg: "/images/hero/card-icons/cardbg.webp",
} as const;

export const valueCopy = {
  title: "Vị trí giá trị nhất",
  subtitle: "Khu Đông Tăng Long",
} as const;

export const valueItems = [
  {
    icon: "/images/value/icon-1.webp",
    title: ["58 đại trạch", "58 dấu ấn riêng"] as const,
    body: "Mỗi dinh thự được kiến tạo như một chữ ký độc bản",
  },
  {
    icon: "/images/value/icon-2.webp",
    title: ["Tầm nhìn khoáng đạt", "Ôm trọn mảng xanh"] as const,
    body: "Kề cận 7ha mặt hồ và 12 ha công viên hồ Hạc Cầm",
  },
  {
    icon: "/images/value/icon-3.webp",
    title: ["Không gian sống", "Là ưu tiên hàng đầu"] as const,
    body: "Mật độ sân vườn và cảnh quan lên đến 68%",
  },
  {
    icon: "/images/value/icon-4.webp",
    title: ["Cảnh quan theo", "Sở thích gia chủ"] as const,
    body: "Tặng gói thiết kế & thi công cảnh quan giá trị đến 2 tỷ đồng",
  },
] as const;

/** Mobile base → override at lg via CSS vars on the section. */
export const value = {
  sectionMinH: "28.0625rem",
  padX: "1.25rem",
  padXLg: "5rem",
  titleGap: "0.75rem",
  titleColor: "#FEF5E2",
  titleMt: "0rem",
  titleMtLg: "6.25rem",
  titleSize: "2.5rem",
  titleSizeLg: "4rem",
  subtitleSize: "1rem",
  subtitleSizeLg: "1.5rem",
  subtitleTracking: "-0.03rem",
  pinSize: "14rem",
  pinSizeLg: "19.0625rem",
  pinGap: "1rem",
  pinGapLg: "1.25rem",
  pinOverlap: "0rem",
  pinOverlapLg: "-9.5625rem",
  iconSize: "3.5rem",
  iconSizeLg: "5rem",
  iconTop: "1.25rem",
  iconTopLg: "1.75rem",
  itemFont: "0.9375rem",
  itemFontLg: "1.125rem",
  itemTracking: "-0.0225rem",
  itemTitleColor: "#F7DBA3",
  itemBodyColor: "#FEF5E2",
  itemTextGap: "0.75rem",
  itemPadX: "1.25rem",
  itemPadXLg: "1.75rem",
  /** SpaceCarousel top pad so title clears protruding pins */
  spacePadTop: "2rem",
  spacePadTopLg: "11rem",
} as const;
