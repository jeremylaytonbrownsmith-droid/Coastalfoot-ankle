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
        description: `Have a question about ${product} from ${config.practiceName}? Call during office hours or request a callback.`,
      }
    : {
        title: "Request an Appointment",
        description: `Call ${config.practiceName} during office hours, or request a callback and we'll reach out within one business day.`,
      };
}

export default async function RequestAppointmentPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { contact } = config;
  const { product } = await searchParams;

  return (
    <>
      <ScrollToTop trigger={product} />
      {/* Three equal, parallel contact options — no channel is framed as the fallback. */}
      <PageHeader align="center">
        <h1 className="text-4xl sm:text-5xl">
          {product ? `Ask about ${product}` : "Request an appointment"}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-muted">
          {product
            ? "Have a question about this product? Reach us however's easiest — call, email, or fill out the form below."
            : "Reach us however's easiest for you — call, email, or fill out a short form and we'll call you back."}
        </p>
      </PageHeader>

      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
          <div className="flex flex-col items-center rounded-xl border-2 border-secondary-light bg-card p-5 text-center sm:p-7">
            <span className="text-secondary">
              <ServiceIcon name="phone" className="h-7 w-7 sm:h-9 sm:w-9" />
            </span>
            <h2 className="mt-2 text-xl sm:mt-4 sm:text-2xl">Call</h2>
            <p className="mt-1 text-base text-muted sm:mt-2 sm:grow sm:text-lg">{config.aiReceptionist.blurb}</p>
            <a
              href={`tel:${contact.phone}`}
              className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-lg bg-primary-dark px-6 text-lg font-semibold text-white no-underline transition-colors hover:bg-primary-darker sm:mt-6"
            >
              {contact.phoneDisplay}
            </a>
          </div>

          <div className="flex flex-col items-center rounded-xl border-2 border-secondary-light bg-card p-5 text-center sm:p-7">
            <span className="text-secondary">
              <ServiceIcon name="mail" className="h-7 w-7 sm:h-9 sm:w-9" />
            </span>
            <h2 className="mt-2 text-xl sm:mt-4 sm:text-2xl">Email</h2>
            <p className="mt-1 text-base text-muted sm:mt-2 sm:grow sm:text-lg">
              Send us a message any time and we&apos;ll reply within one business day.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-lg border-2 border-primary-dark px-6 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light sm:mt-6"
            >
              {contact.email}
            </a>
          </div>

          <div className="flex flex-col items-center rounded-xl border-2 border-secondary-light bg-card p-5 text-center sm:p-7">
            <span className="text-secondary">
              <ServiceIcon name="form" className="h-7 w-7 sm:h-9 sm:w-9" />
            </span>
            <h2 className="mt-2 text-xl sm:mt-4 sm:text-2xl">Request a Callback</h2>
            <p className="mt-1 text-base text-muted sm:mt-2 sm:grow sm:text-lg">
              Fill out a short form and our team will call you back within one business day.
            </p>
            <a
              href="#callback-form"
              className="mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-lg border-2 border-primary-dark px-6 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light sm:mt-6"
            >
              Fill Out the Form
            </a>
          </div>
        </div>
      </section>

      <section id="callback-form" className="mx-auto max-w-3xl scroll-mt-36 px-4 py-14 sm:px-6">
        <h2 className="text-3xl">Request a callback</h2>
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
