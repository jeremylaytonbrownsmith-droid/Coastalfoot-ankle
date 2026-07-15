import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import PageHeader from "@/components/PageHeader";
import ServiceIcon from "@/components/ServiceIcon";
import CTASection from "@/components/CTASection";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Patient Forms",
  description: `Paperwork for ${config.practiceName}, fillable online ahead of your visit.`,
};

export default function FormsPage() {
  const { patientForms } = config;

  return (
    <>
      <PageHeader>
        <h1 className="text-4xl sm:text-5xl">Patient forms</h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">
          Fill these out online before your visit — no printing or scanning needed.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {patientForms.length > 0 ? (
          <ul className="space-y-4">
            {patientForms.map((form) => (
              <li
                key={form.url}
                className="flex flex-col items-start gap-3 rounded-xl border-2 border-secondary-light bg-card px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex gap-4">
                  <span className="mt-1 shrink-0 text-secondary">
                    <ServiceIcon name="form" className="h-8 w-8" />
                  </span>
                  <div>
                    <p className="text-xl font-semibold">{form.label}</p>
                    <p className="mt-1 text-lg text-muted">{form.description}</p>
                  </div>
                </div>
                <a
                  href={form.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[52px] w-full shrink-0 items-center justify-center rounded-lg border-2 border-primary-dark px-6 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light sm:w-auto"
                >
                  Fill Out
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xl text-muted">
            We don&apos;t have any forms to share online yet — call us and we&apos;ll get you set up.
          </p>
        )}
      </section>

      <CTASection
        heading="Questions about your paperwork?"
        subtext="Call us during office hours and we'll walk you through it."
      />
    </>
  );
}
