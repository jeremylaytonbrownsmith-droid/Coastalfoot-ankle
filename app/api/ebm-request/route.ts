import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/site-config";

/**
 * EBM Medical product request handler — info or prescription requests for
 * the practice's EBM Medical prescription line. Separate from
 * /api/callback because the required fields differ (first/last name, date
 * of birth, cell-vs-home phone) and this data is more sensitive, so it
 * gets its own validation and email formatting rather than overloading the
 * general callback shape.
 *
 * Same delivery pattern as /api/callback: emails via Resend's REST API
 * when RESEND_API_KEY/STAFF_NOTIFICATION_EMAIL/NOTIFICATION_FROM_EMAIL are
 * set; otherwise logs server-side so the form still works in development.
 */
export async function POST(request: Request) {
  const config = getSiteConfig();

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const firstName = (body.firstName ?? "").toString().trim().slice(0, 100);
  const lastName = (body.lastName ?? "").toString().trim().slice(0, 100);
  const phone = (body.phone ?? "").toString().trim().slice(0, 50);
  const dob = (body.dob ?? "").toString().trim().slice(0, 20);
  const phoneType = (body.phoneType ?? "").toString().trim().slice(0, 10);

  if (!firstName || !lastName || !phone || !dob) {
    return NextResponse.json(
      { error: "First name, last name, phone, and date of birth are required" },
      { status: 400 }
    );
  }

  const details = {
    firstName,
    lastName,
    phone,
    phoneType: phoneType === "home" ? "Home (call)" : "Cell (OK to text)",
    dob,
    email: (body.email ?? "").toString().trim().slice(0, 200),
    requestType: (body.requestType ?? "").toString() === "prescription" ? "A prescription" : "More information",
    product: (body.product ?? "").toString().trim().slice(0, 200),
    note: (body.note ?? "").toString().trim().slice(0, 1000),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL;

  if (apiKey && staffEmail) {
    const text = [
      `New EBM Medical product request from the ${config.practiceName} website:`,
      "",
      `Name: ${details.firstName} ${details.lastName}`,
      `Date of birth: ${details.dob}`,
      `Phone: ${details.phone} — ${details.phoneType}`,
      `Email: ${details.email || "(not provided)"}`,
      `Requesting: ${details.requestType}`,
      `Product: ${details.product || "(not specified)"}`,
      details.note ? `Note: ${details.note}` : "",
      "",
      "Please review and call this patient back within one business day.",
    ]
      .filter(Boolean)
      .join("\n");

    const subject = `EBM request (${details.requestType}): ${details.firstName} ${details.lastName} — ${details.product || "unspecified product"}`;

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
    console.log("EBM product request (no RESEND_API_KEY configured):", details);
  }

  return NextResponse.json({ ok: true });
}
