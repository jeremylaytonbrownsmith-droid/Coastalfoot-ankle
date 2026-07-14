import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${config.practiceName} handles information you share through this website.`,
};

/**
 * [PLACEHOLDER POLICY] — plain-language starter text. Have the practice's
 * compliance advisor review and finalize before launch.
 */
export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-4xl">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-lg">
        <p>
          {config.practiceName} respects your privacy. This page explains, in
          plain language, what happens to information you share through this
          website.
        </p>
        <h2 className="text-2xl">What we collect</h2>
        <p>
          If you fill out our callback request form, we collect your name, phone
          number, email (if you provide it), and the general reason for your
          visit. We use it for one thing: calling you back to schedule your
          appointment.
        </p>
        <h2 className="text-2xl">What we don&apos;t do</h2>
        <p>
          We don&apos;t sell your information. We don&apos;t share it with advertisers.
          We ask you not to include detailed medical information in website
          forms — those details belong in a phone call or an office visit,
          where they&apos;re properly protected.
        </p>
        <h2 className="text-2xl">Your medical records</h2>
        <p>
          Your medical records are protected under HIPAA and are handled through
          our practice&apos;s medical record systems — never through this website.
        </p>
        <h2 className="text-2xl">Questions?</h2>
        <p>
          Call us at {config.contact.phoneDisplay} or email{" "}
          {config.contact.email}. We&apos;re happy to explain anything on this page.
        </p>
      </div>
    </section>
  );
}
