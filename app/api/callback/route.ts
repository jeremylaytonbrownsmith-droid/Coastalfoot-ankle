import { NextResponse } from "next/server";
import { getSiteConfig } from "@/lib/site-config";

/**
 * Callback-request handler.
 *
 * Email delivery uses Resend's REST API when RESEND_API_KEY is set
 * (https://resend.com — free tier is fine for this volume). Set these in
 * .env.local / your host's env settings:
 *
 *   RESEND_API_KEY=re_xxx
 *   STAFF_NOTIFICATION_EMAIL=frontdesk@practice.com
 *   NOTIFICATION_FROM_EMAIL=website@yourdomain.com   (a Resend-verified sender)
 *
 * Without a key, submissions are logged server-side so the form still
 * works in development. Swapping to Formspree instead: point the form's
 * fetch() at your Formspree endpoint and delete this route.
 */
export async function POST(request: Request) {
  const config = getSiteConfig();

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 200);
  const phone = (body.phone ?? "").toString().trim().slice(0, 50);
  if (!name || !phone) {
    return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
  }

  const details = {
    name,
    phone,
    email: (body.email ?? "").toString().trim().slice(0, 200),
    preferredDay: (body.preferredDay ?? "").toString().slice(0, 50),
    preferredTime: (body.preferredTime ?? "").toString().slice(0, 50),
    reason: (body.reason ?? "").toString().slice(0, 100),
    patientType: (body.patientType ?? "").toString().slice(0, 50),
    // Set when this came from a store product's "Ask About This" link
    // rather than the general appointment form.
    productContext: (body.productContext ?? "").toString().trim().slice(0, 200),
  };

  /*
   * ── FUTURE HALO INTAKE WEBHOOK ────────────────────────────────────────
   * If Halo Health ever provides an intake webhook, forward the callback
   * request here so it lands in the same queue as phone bookings, e.g.:
   *
   *   if (process.env.HALO_INTAKE_WEBHOOK_URL) {
   *     await fetch(process.env.HALO_INTAKE_WEBHOOK_URL, {
   *       method: "POST",
   *       headers: { "Content-Type": "application/json" },
   *       body: JSON.stringify(details),
   *     });
   *   }
   *
   * Not built or assumed today — email/logging below is the live path.
   * ──────────────────────────────────────────────────────────────────────
   */

  const apiKey = process.env.RESEND_API_KEY;
  const staffEmail = process.env.STAFF_NOTIFICATION_EMAIL;

  if (apiKey && staffEmail) {
    const text = [
      `New ${details.productContext ? "product question" : "callback request"} from the ${config.practiceName} website:`,
      "",
      `Name: ${details.name}`,
      `Phone: ${details.phone}`,
      `Email: ${details.email || "(not provided)"}`,
      `Best day to call: ${details.preferredDay}`,
      `Best time: ${details.preferredTime}`,
      details.productContext
        ? `Asking about: ${details.productContext}`
        : `Reason for visit: ${details.reason}`,
      `Patient type: ${details.patientType}`,
      "",
      "Please call this patient back within one business day.",
    ].join("\n");

    const subject = details.productContext
      ? `Product question: ${details.name} — ${details.productContext}`
      : `Callback request: ${details.name} (${details.reason})`;

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
    console.log("Callback request (no RESEND_API_KEY configured):", details);
  }

  return NextResponse.json({ ok: true });
}
