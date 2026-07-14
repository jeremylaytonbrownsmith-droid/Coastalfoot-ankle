import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import PageHeader from "@/components/PageHeader";
import ServiceIcon from "@/components/ServiceIcon";
import CTASection from "@/components/CTASection";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Insurance & Accepted Plans",
  description: `Insurance plans accepted at ${config.practiceName}. Not sure if yours is covered? Call any time and we'll check for you.`,
};

export default function InsurancePage() {
  const { insurance } = config;

  return (
    <>
      <PageHeader>
        <h1 className="text-4xl sm:text-5xl">Insurance &amp; accepted plans</h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">{insurance.intro}</p>
      </PageHeader>

      <section className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h2 className="text-3xl">Plans we accept</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {insurance.acceptedPlans.map((plan) => (
            <li
              key={plan}
              className="flex items-center gap-3 rounded-lg border border-secondary-light bg-card px-5 py-4 text-lg"
            >
              <span className="shrink-0 text-secondary">
                <ServiceIcon name="check" className="h-6 w-6" />
              </span>
              {plan}
            </li>
          ))}
        </ul>
        <p className="mt-8 rounded-xl bg-cream px-6 py-5 text-lg text-muted">
          {insurance.note}
        </p>
      </section>

      <CTASection
        heading="Not sure about your coverage?"
        subtext="Call us any time and we'll check your plan before your visit — no surprises."
      />
    </>
  );
}
