import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import ServiceCard from "@/components/ServiceCard";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Services",
  description: `Foot and ankle care at ${config.practiceName}: general podiatry, diabetic foot care, nail concerns, heel pain, custom orthotics, and red light therapy.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader>
        <h1 className="text-4xl sm:text-5xl">Our services</h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">
          Plain-language care, no medical jargon. If you don&apos;t see what you
          need here, call us — chances are we can help.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 90} className="h-full">
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection heading="Not sure which service you need?" subtext="That's what the first visit is for. Call us and we'll point you in the right direction." />
    </>
  );
}
