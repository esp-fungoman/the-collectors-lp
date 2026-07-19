export const heroAssets = {
  bg: "/images/hero-bg.svg",
  logo: "/images/logo.png",
  hamburger: "/images/hero/hamburger-icon.png",
  bannerBg: "/images/hero/banner-bg.png",
  bannerDivider: "/images/hero/banner-hero-divider.png",
  cardBg: "/images/hero/card-icons/cardbg.png",
} as const;

export const heroTitle = {
  line1: [
    { text: "Đại Trạch", tone: "display" as const },
    { text: "Nội đô", tone: "sans" as const },
  ],
  line2: [
    { text: "Sưu tầm", tone: "display" as const },
    { text: "tinh hiếm", tone: "sans" as const },
  ],
} as const;

export const networkIntro = {
  eyebrow: "nằm giữa",
  title: "mạng lưới kết nối",
} as const;

export const networkItems = [
  {
    lines: ["Vành", "đai 3"] as const,
    icon: "/images/hero/network-icons/icon-vanhdai.png",
  },
  {
    lines: ["Liên", "phường"] as const,
    icon: "/images/hero/network-icons/icon-lienphuong.png",
  },
  {
    lines: ["Cao tốc", "Long Thành"] as const,
    icon: "/images/hero/network-icons/icon-caotoc.png",
  },
  {
    lines: ["Thủ", "Thiêm"] as const,
    icon: "/images/hero/network-icons/icon-thuthiem.png",
  },
  {
    lines: ["Sân bay", "Long Thành"] as const,
    icon: "/images/hero/network-icons/icon-sanbay.png",
  },
] as const;

export const bannerStats = [
  {
    eyebrow: "pháp lý đã có",
    lines: ["sổ hồng riêng", "từng căn"] as const,
  },
  {
    eyebrow: "không có giai đoạn 2",
    lines: ["58 dinh thự", "độc bản"] as const,
  },
  {
    eyebrow: null,
    lines: ["hơn 900m²", "sàn xây dựng"] as const,
  },
] as const;

export const bannerCta = "Đặt lịch tư vấn 1:1";

export const heroCards = [
  {
    title: "vị trí",
    icon: "/images/hero/card-icons/icon-vitri.png",
    body: "Khu Đô thị Đông Tăng Long, Phường Long Phước, TP. Hồ Chí Minh. 100m đến đường Liên Phường - liền kề Vành đai 3. 10ph đến Trung tâm Hành chính mới Thủ Thiêm.",
  },
  {
    title: "quy mô",
    icon: "/images/hero/card-icons/icon-quymo.png",
    body: "Giới hạn 58 đại trạch tinh hiếm. Diện tích đất sở hữu 600 -1.000m2 diện tích sàn xây dựng 900 -1.200m2.",
  },
  {
    title: "tiện ích",
    icon: "/images/hero/card-icons/icon-tienich.png",
    body: "100% dinh thự sở hữu riêng hồ bơi tư gia 50m2 mặt nước và sân vườn riêng từ 300 - 600m2. Tầm nhìn xanh vĩnh viễn công viên và mặt nước hồ Hạc Cầm gần 20ha.",
  },
  {
    title: "bàn giao",
    icon: "/images/hero/card-icons/icon-bangiao.png",
    body: "Dinh thự xây thô hoàn thiện mặt ngoài. Pháp lý theo từng lô bàn giao khi hoàn công, sở hữu vĩnh viễn với người Việt Nam.",
  },
] as const;
