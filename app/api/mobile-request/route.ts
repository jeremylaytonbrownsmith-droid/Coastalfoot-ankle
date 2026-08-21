import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/site-config";

/**
 * Coastal Mobile Podiatry home-visit request handler. Separate from
 * /api/callback because the fields differ (service-area location, an
 * eligibility checklist) and because these requests need to stand out to
 * staff as "figure out Medicare vs. self-pay" rather than a normal
 * callback. Same Resend-or-log delivery pattern as the other routes.
 */
export async function POST(request: Request) {
  const config = getSiteConfig();

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const phone = (body.phone ?? "").toString().trim().slice(0, 50);
  const location = (body.location ?? "").toString().trim().slice(0, 100);

  if (!name || !phone || !location) {
    return NextResponse.json(
      { error: "Name, phone, and location are required" },
      { status: 400 }
    );
  }

  const eligibility = Array.isArray(body.eligibility)
    ? body.eligibility.map((e) => e?.toString().slice(0, 200)).slice(0, 20)
    : [];

  const details = {
    name,
    phone,
    location,
    email: (body.email ?? "").toString().trim().slice(0, 200),
    patientType: (body.patientType ?? "").toString() === "returning" ? "Returning patient" : "New patient",
    eligibility,
    note: (body.note ?? "").toString().trim().slice(0, 1000),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL;

  if (apiKey && staffEmail) {
    const text = [
      `New Coastal Mobile Podiatry home visit request from the ${config.practiceName} website:`,
      "",
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Email: ${details.email || "(not provided)"}`,
      `City/ZIP: ${details.location}`,
      `Patient type: ${details.patientType}`,
      `Possible eligibility factors selected: ${details.eligibility.length ? details.eligibility.join("; ") : "(none selected — may be self-pay, or discuss on the call)"}`,
      details.note ? `Note: ${details.note}` : "",
      "",
      "Please review and call this patient back within one business day to confirm Medicare eligibility or self-pay pricing.",
    ]
      .filter(Boolean)
      .join("\n");

    const subject = `Mobile visit request: ${details.name} (${details.patientType})`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.NOTIFICATION_FROM_EMAIL ?? "onboarding@resend.dev",
        to: [staffEmail],
        subject,
        text,
      }),
    });

    if (!res.ok) {
      console.error("Resend email failed:", res.status, await res.text());
      return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
    }
  } else {
    // No email provider configured yet — log so requests aren't lost in dev.
    console.log("Mobile visit request (no RESEND_API_KEY configured):", details);
  }

  return NextResponse.json({ ok: true });
}
