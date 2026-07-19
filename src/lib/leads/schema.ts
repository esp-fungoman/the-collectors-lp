import { z } from "zod";

const phoneRegex = /^[0-9+\s()-]+$/;

export const leadSchema = z
  .object({
    name: z.string().trim().min(1, "Vui lòng nhập họ tên").max(120),
    email: z
      .string()
      .trim()
      .max(160)
      .refine((v) => v === "" || z.string().email().safeParse(v).success, {
        message: "Email không hợp lệ",
      }),
    phone: z
      .string()
      .trim()
      .max(20)
      .refine((v) => v === "" || (v.length >= 8 && phoneRegex.test(v)), {
        message: "Số điện thoại không hợp lệ",
      }),
    message: z.string().trim().max(2000).optional().default(""),
    buttonName: z
      .string()
      .trim()
      .max(200)
      .optional()
      .default("Footer form"),
  })
  .refine((data) => data.email.length > 0 || data.phone.length > 0, {
    message: "Vui lòng nhập email hoặc số điện thoại",
    path: ["email"],
  });

export type LeadInput = z.infer<typeof leadSchema>;

/** Client-side: name + (valid email OR valid phone). */
export function isLeadFormReady(values: {
  name: string;
  email: string;
  phone: string;
}): boolean {
  const nameOk = values.name.trim().length > 0;
  const email = values.email.trim();
  const phone = values.phone.trim();
  const emailOk = email.length > 0 && z.string().email().safeParse(email).success;
  const phoneOk = phone.length >= 8 && phoneRegex.test(phone);
  return nameOk && (emailOk || phoneOk);
}
