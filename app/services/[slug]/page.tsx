import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteConfig } from "@/lib/site-config";
import { AppointmentButton, PhoneButton } from "@/components/Buttons";
import FAQAccordion from "@/components/FAQAccordion";
import ServiceIcon from "@/components/ServiceIcon";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

/**
 * Dedicated service pages (Red Light Therapy, Red Light Bed, …) are fully
 * config-driven: add an entry to featuredServicePages in the site config
 * and a page appears at /services/<slug> — no code changes.
 */
const config = getSiteConfig();

export function generateStaticParams() {
  return config.featuredServicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = config.featuredServicePages.find((p) => p.slug === slug);
  if (!page) return {};
  return { title: page.title, description: page.seoDescription };
}

export default async function FeaturedServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = config.featuredServicePages.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl sm:text-5xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl text-2xl text-muted">{page.heroTagline}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <AppointmentButton label={`Book ${page.title}`} />
            <PhoneButton variant="outline" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-14 px-4 py-14 sm:px-6">
        <Reveal>
        <section aria-labelledby={`what-it-is-${page.slug}`}>
          <h2 id={`what-it-is-${page.slug}`} className="text-3xl">
            What it is
          </h2>
          {page.whatItIs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-xl">
              {paragraph}
            </p>
          ))}
        </section>
        </Reveal>

        <Reveal>
        <section aria-labelledby={`session-${page.slug}`}>
          <h2 id={`session-${page.slug}`} className="text-3xl">
            What a session is like
          </h2>
          {page.whatASessionIsLike.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 text-xl">
              {paragraph}
            </p>
          ))}
        </section>
        </Reveal>

        <Reveal>
        <section aria-labelledby={`who-${page.slug}`}>
          <h2 id={`who-${page.slug}`} className="text-3xl">
            Who it helps
          </h2>
          <ul className="mt-5 space-y-3">
            {page.whoItHelps.map((item) => (
              <li key={item} className="flex items-start gap-3 text-xl">
                <span className="mt-1 shrink-0 text-secondary">
                  <ServiceIcon name="check" className="h-7 w-7" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
        </Reveal>

        {page.pricing && (
          <Reveal>
          <section aria-labelledby={`pricing-${page.slug}`}>
            <h2 id={`pricing-${page.slug}`} className="text-3xl">
              Pricing
            </h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-secondary-light">
              {page.pricing.map((tier, i) => (
                <div
                  key={tier.label}
                  className={`flex flex-wrap items-baseline justify-between gap-2 px-6 py-5 ${i % 2 ? "bg-cream" : "bg-card"}`}
                >
                  <div>
                    <p className="text-xl font-semibold">{tier.label}</p>
                    {tier.note && <p className="text-muted">{tier.note}</p>}
                  </div>
                  <p className="text-2xl font-bold text-primary-darker">{tier.price}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-lg text-muted">
              Questions about pricing or packages? Just call — we&apos;ll walk you through it.
            </p>
          </section>
          </Reveal>
        )}

        <Reveal>
        <section aria-labelledby={`faq-${page.slug}`}>
          <h2 id={`faq-${page.slug}`} className="text-3xl">
            Common questions
          </h2>
          <div className="mt-6">
            <FAQAccordion items={page.faq} />
          </div>
        </section>
        </Reveal>
      </div>

      <CTASection
        heading={`Ready to try ${page.title.toLowerCase()}?`}
        subtext="Call us any time or request a callback — we'll answer your questions and find a time that suits you."
      />
    </>
  );
}
