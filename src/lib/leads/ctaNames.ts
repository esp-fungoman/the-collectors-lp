/** Locked CTA names written to Sheets column “Tên nút”. */
export const ctaNames = {
  heroBanner: "Đặt lịch tư vấn 1:1",
  ecosystem: "Nhận hồ sơ vị trí & quy hoạch dự án",
  masterpiece: "Chiêm ngưỡng tuyệt tác cảnh quan",
  concept: "Nhận ấn bản thiết kế 58 đại trạch",
  navContact: "Thông tin liên hệ",
  floatForm: "Float form tư vấn",
  footerForm: "Footer form",
} as const;

export type CtaName = (typeof ctaNames)[keyof typeof ctaNames];
