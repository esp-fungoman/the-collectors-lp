import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leads/schema";
import { appendLeadRow } from "@/lib/leads/sheets";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, phone, message, buttonName } = parsed.data;
  const sheetPhone = phone.startsWith("0") ? `'${phone}` : phone;

  try {
    await appendLeadRow([
      name,
      email,
      sheetPhone,
      message ?? "",
      buttonName ?? "Footer form",
    ]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const messageText =
      error instanceof Error ? error.message : "Failed to save lead";
    console.error("[leads]", messageText);
    return NextResponse.json(
      {
        ok: false,
        error:
          messageText.startsWith("Missing environment variable")
            ? "Lead storage is not configured"
            : "Failed to save lead",
      },
      { status: 500 },
    );
  }
}
