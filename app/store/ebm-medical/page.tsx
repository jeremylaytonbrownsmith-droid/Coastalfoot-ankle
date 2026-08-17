import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import EBMProductCard from "@/components/EBMProductCard";
import EBMRequestForm from "@/components/EBMRequestForm";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "EBM Medical Products",
  description: `Prescription-only EBM Medical products used at ${config.practiceName} — request more information or ask about a prescription.`,
};

export default function EBMMedicalPage() {
  const { ebmMedical } = config;

  return (
    <>
      <PageHeader>
        <h1 className="text-4xl sm:text-5xl">EBM Medical products</h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">{ebmMedical.intro}</p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {ebmMedical.products.map((product, i) => (
            <Reveal key={product.name} delay={(i % 4) * 80} className="h-full">
              <EBMProductCard product={product} logo={{ src: config.logo.src, alt: config.logo.alt }} />
            </Reveal>
          ))}
        </div>
      </section>

      <section id="ebm-request-form" className="scroll-mt-24 bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl">Request info or a prescription</h2>
          <p className="mt-3 text-xl text-muted">
            Fill out this short form and our team will call you back within one business day. Prefer to
            talk now? Call us at{" "}
            <a href={`tel:${config.contact.phone}`} className="font-semibold text-primary-darker underline underline-offset-4">
              {config.contact.phoneDisplay}
            </a>
            .
          </p>
          <div className="mt-8">
            <EBMRequestForm products={ebmMedical.products} />
          </div>
        </div>
      </section>

      <CTASection
        heading="Have a general foot or ankle question?"
        subtext="For anything outside EBM Medical products, we're happy to help — call, email, or request a callback."
      />
    </>
  );
}
