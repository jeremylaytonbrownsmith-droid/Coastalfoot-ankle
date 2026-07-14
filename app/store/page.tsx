import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import ProductCard from "@/components/ProductCard";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import PageHeader from "@/components/PageHeader";

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
      </section>

      <CTASection
        heading="Questions about a product?"
        subtext="We're happy to help you pick what's right for your feet."
      />
    </>
  );
}
