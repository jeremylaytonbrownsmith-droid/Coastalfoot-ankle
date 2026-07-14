import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import CallbackForm from "@/components/CallbackForm";
import ServiceIcon from "@/components/ServiceIcon";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Request an Appointment",
  description: `Call ${config.practiceName} any time — our phone is answered 24/7 — or request a callback and we'll reach out within one business day.`,
};

export default function RequestAppointmentPage() {
  const { contact, aiReceptionist } = config;

  return (
    <>
      {/* The phone IS the primary booking channel — it leads the page. */}
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h1 className="text-4xl sm:text-5xl">Request an appointment</h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl text-muted">
            The fastest way to book is to call. {aiReceptionist.blurb}
          </p>
          <a
            href={`tel:${contact.phone}`}
            className="mt-8 inline-flex min-h-[72px] items-center gap-3 rounded-xl bg-primary-dark px-10 py-4 text-2xl font-bold text-white no-underline transition-colors hover:bg-primary-darker sm:text-3xl"
          >
            <ServiceIcon name="phone" className="h-9 w-9" />
            {contact.phoneDisplay}
          </a>
          <p className="mt-4 text-lg text-muted">
            Tap to call from your phone — day or night, weekends included.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl">Prefer we call you?</h2>
        <p className="mt-3 text-xl text-muted">
          Fill out this short form and our team will call you back within one
          business day to find a time that works.
        </p>
        <div className="mt-8">
          <CallbackForm
            reasonsForVisit={config.callbackForm.reasonsForVisit}
            confirmationMessage={config.callbackForm.confirmationMessage}
            hipaaNote={config.callbackForm.hipaaNote}
          />
        </div>
      </section>
    </>
  );
}
