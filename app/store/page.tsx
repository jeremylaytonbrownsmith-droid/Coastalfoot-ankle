import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";
import ServiceIcon from "@/components/ServiceIcon";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Store",
  description: `Red light therapy packages and doctor-recommended foot care products from ${config.practiceName}.`,
};

export default function StorePage() {
  return (
    <>
      <PageHeader>
        <h1 className="text-4xl sm:text-5xl">Our store</h1>
        <p className="mt-5 max-w-2xl text-xl text-muted">
          Red light therapy packages and foot-care products our doctors
          actually recommend. Tap any item to ask about it, or shop in
          person at your next visit.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {config.products.map((product, i) => (
            <Reveal key={product.name} delay={(i % 4) * 80} className="h-full">
              <ProductCard product={product} logo={{ src: config.logo.src, alt: config.logo.alt }} />
            </Reveal>
          ))}
        </div>
        <p className="mt-10 rounded-xl bg-secondary-light px-6 py-5 text-center text-lg">
          Prefer to shop in person? Everything here is available at the office too.
        </p>

        {config.ebmMedical.products.length > 0 && (
          <Link
            href="/store/ebm-medical"
            className="mt-6 flex flex-col items-start gap-4 rounded-xl border-2 border-secondary-light bg-card p-6 no-underline transition-colors hover:border-secondary sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <span className="mt-1 shrink-0 text-primary-darker">
                <ServiceIcon name="pill" className="h-8 w-8" />
              </span>
              <div>
                <p className="text-xl font-semibold text-body">Looking for EBM Medical products?</p>
                <p className="mt-1 text-lg text-muted">
                  Prescription-only items like IontoPatch™ and the EB-N series — request info or a
                  prescription from your doctor.
                </p>
              </div>
            </div>
            <span className="shrink-0 self-start whitespace-nowrap rounded-lg border-2 border-primary-dark px-6 py-3 text-lg font-semibold text-primary-darker sm:self-center">
              View EBM Products →
            </span>
          </Link>
        )}
      </section>

      <CTASection
        heading="Questions about a product?"
        subtext="We're happy to help you pick what's right for your feet."
      />
    </>
  );
}
