import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import CallbackForm from "@/components/CallbackForm";
import ServiceIcon from "@/components/ServiceIcon";
import PageHeader from "@/components/PageHeader";
import ScrollToTop from "@/components/ScrollToTop";
import FAQAccordion from "@/components/FAQAccordion";

const config = getSiteConfig();

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}): Promise<Metadata> {
  const { product } = await searchParams;
  return product
    ? {
        title: `Ask about ${product}`,
        description: `Have a question about ${product} from ${config.practiceName}? Call any time or request a callback.`,
      }
    : {
        title: "Request an Appointment",
        description: `Call ${config.practiceName} any time — our phone is answered 24/7 — or request a callback and we'll reach out within one business day.`,
      };
}

export default async function RequestAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { contact, aiReceptionist } = config;
  const { product } = await searchParams;

  return (
    <>
      <ScrollToTop trigger={product} />
      {/* The phone IS the primary booking channel — it leads the page. */}
      <PageHeader align="center">
        <h1 className="text-4xl sm:text-5xl">
          {product ? `Ask about ${product}` : "Request an appointment"}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-muted">
          {product
            ? "Have a question about this product? Call us any time, or fill out the form below and we'll follow up with details."
            : `The fastest way to book is to call. ${aiReceptionist.blurb}`}
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
      </PageHeader>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl">Prefer we call you?</h2>
        <p className="mt-3 text-xl text-muted">
          {product
            ? "Fill out this short form and our team will call you back within one business day with details on this product."
            : "Fill out this short form and our team will call you back within one business day to find a time that works."}
        </p>
        <div className="mt-8">
          <CallbackForm
            reasonsForVisit={config.callbackForm.reasonsForVisit}
            confirmationMessage={config.callbackForm.confirmationMessage}
            hipaaNote={config.callbackForm.hipaaNote}
            productContext={product}
          />
        </div>

        {config.newPatientForm && (
          <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border-2 border-secondary-light bg-cream px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xl font-semibold">New patient?</p>
              <p className="mt-1 text-lg text-muted">
                Fill it out online ahead of time — no printing or scanning needed — and save a few minutes at check-in.
              </p>
            </div>
            <a
              href={config.newPatientForm.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2 rounded-lg border-2 border-primary-dark px-6 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light"
            >
              Fill Out {config.newPatientForm.label}
            </a>
          </div>
        )}
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl">Wondering about {config.aiReceptionist.name}?</h2>
          <p className="mt-3 text-xl text-muted">
            Our phone is answered by a friendly AI receptionist — here&apos;s what to expect.
          </p>
          <div className="mt-8">
            <FAQAccordion items={config.aiReceptionist.faq} />
          </div>
        </div>
      </section>
    </>
  );
}
