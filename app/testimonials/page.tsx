import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import TestimonialCard from "@/components/TestimonialCard";
import Stars from "@/components/Stars";
import CTASection from "@/components/CTASection";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Reviews & Testimonials",
  description: `See what patients say about ${config.practiceName} — ${config.googleReviews.rating} stars from ${config.googleReviews.count} Google reviews.`,
};

export default function TestimonialsPage() {
  const { googleReviews } = config;

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <h1 className="text-4xl sm:text-5xl">What our patients say</h1>
          <div className="mt-6 inline-flex flex-col items-center gap-2 rounded-xl border border-secondary-light bg-card px-8 py-6 shadow-sm">
            <Stars rating={googleReviews.rating} className="h-8 w-8" />
            <p className="text-2xl font-bold">{googleReviews.rating} out of 5</p>
            <p className="text-lg text-muted">Based on {googleReviews.count} Google reviews</p>
          </div>
        </div>
      </section>

      {/*
        Google Reviews section. These snippets come from the config for now;
        the block is structured so a Google Places API widget or a
        third-party embed (e.g. Elfsight) can replace the grid below without
        touching the rest of the page.
      */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {config.testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-secondary-light px-6 py-10 text-center">
          <h2 className="text-3xl">Had a good visit?</h2>
          <p className="mx-auto mt-3 max-w-xl text-xl text-muted">
            Reviews from patients like you help your neighbors find good foot care.
            It only takes a minute.
          </p>
          <a
            href={googleReviews.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary-dark px-8 py-3 text-lg font-semibold text-white no-underline transition-colors hover:bg-primary-darker"
          >
            Leave us a review on Google
          </a>
        </div>
      </section>

      <CTASection />
    </>
  );
}
