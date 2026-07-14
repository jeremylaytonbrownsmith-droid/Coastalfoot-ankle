import Link from "next/link";
import Image from "next/image";
import { getSiteConfig } from "@/lib/site-config";
import { AppointmentButton, PhoneButton } from "@/components/Buttons";
import TrustBar from "@/components/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import TeamPhoto from "@/components/TeamPhoto";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";

/**
 * Floating rating card — the one piece of proof-of-trust every visitor
 * sees before they've scrolled at all. Positioned to overlap the seam
 * between the text column and the hero photo on desktop so it reads as a
 * physical object sitting on top of the page, not another line of text.
 */
function HeroTrustBadge({ rating, count, years }: { rating: number; count: string; years: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-secondary-light bg-card px-5 py-4 shadow-xl shadow-black/10">
      <div className="flex shrink-0 flex-col items-center gap-1 border-r border-secondary-light pr-4">
        <span className="text-2xl font-bold leading-none text-primary-darker">{rating}</span>
        <Stars rating={rating} className="h-4 w-4" />
      </div>
      <div>
        <p className="text-base font-semibold leading-tight text-body">{count} five-star reviews</p>
        <p className="text-sm leading-tight text-muted">{years}</p>
      </div>
    </div>
  );
}

/** Soft, brand-colored glow behind the hero text — decoration only. */
function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 -top-40 h-[28rem] w-[28rem] rounded-full bg-secondary-light opacity-60 blur-3xl" />
    </div>
  );
}

/**
 * Full-bleed hero photo panel (desktop only) — reaches the actual browser
 * edge, not just the content container, which is what makes a split hero
 * read as premium rather than a floating card. A soft gradient fades the
 * photo's left edge into the page background so the seam feels intentional
 * even where it passes near/behind the headline text.
 */
function HeroPhotoPanel({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block">
      <div className="relative h-full w-full">
        <Image src={src} alt={alt} fill priority sizes="52vw" className="object-cover" />
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cream to-transparent" />
      </div>
    </div>
  );
}

export default function HomePage() {
  const config = getSiteConfig();
  const featuredServices = config.services.filter((s) => s.featuredOnHome).slice(0, 5);
  const featuredTestimonials = config.testimonials.slice(0, 3);
  const doctors = config.doctors.filter((d) => d.role === "doctor");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream to-secondary-light">
        <HeroBackdrop />
        <HeroPhotoPanel src={config.heroImage.src} alt={config.heroImage.alt} />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="relative lg:max-w-xl">
            <span className="animate-fade-up inline-flex items-center rounded-full border border-secondary bg-card/80 px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-primary-darker shadow-sm">
              {config.practiceName}
            </span>
            <h1 className="animate-fade-up mt-4 text-4xl [animation-delay:80ms] sm:text-5xl lg:text-[3.4rem]">
              Expert foot &amp; ankle care in {config.contact.city}, {config.contact.state}
            </h1>
            <span aria-hidden="true" className="animate-fade-up mt-4 block h-1.5 w-20 rounded-full bg-secondary [animation-delay:120ms]" />
            <p className="animate-fade-up mt-6 text-xl text-muted [animation-delay:160ms] sm:text-2xl">
              {config.tagline}. From everyday foot pain to diabetic foot care and
              red light therapy, our doctors take the time to listen — and to help.
            </p>
            <div className="animate-fade-up mt-9 flex flex-col gap-4 [animation-delay:240ms] sm:flex-row">
              <AppointmentButton />
              <PhoneButton variant="outline" />
            </div>
            <p className="animate-fade-up mt-5 text-lg text-muted [animation-delay:320ms]">
              {config.aiReceptionist.blurb}
            </p>
            <div className="animate-fade-up mt-8 inline-block [animation-delay:400ms] lg:absolute lg:-right-6 lg:top-full lg:z-10 lg:mt-5 lg:translate-x-1/2">
              <HeroTrustBadge
                rating={config.googleReviews.rating}
                count={config.googleReviews.count}
                years={config.trust.yearsExperience}
              />
            </div>
          </div>

          {/* Contained card version for mobile/tablet, where a full-bleed
              panel doesn't read as cleanly on a narrow screen. */}
          <div className="animate-fade-up relative mt-10 [animation-delay:120ms] lg:hidden">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              <Image
                src={config.heroImage.src}
                alt={config.heroImage.alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl">How we can help</h2>
            <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-secondary" />
            <p className="mt-4 text-xl text-muted">
              Simple, honest care for the most common foot and ankle problems.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 90}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8">
            <Link href="/services" className="text-xl font-semibold text-primary-darker underline underline-offset-4">
              See all of our services →
            </Link>
          </p>
        </Reveal>
      </section>

      {/* Testimonials */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl">What our patients say</h2>
            <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-secondary" />
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredTestimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 110} className="h-full">
                <TestimonialCard testimonial={t} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8">
              <Link href="/testimonials" className="text-xl font-semibold text-primary-darker underline underline-offset-4">
                Read more reviews →
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Meet the doctors teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Reveal>
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl">Meet your doctors</h2>
            <span aria-hidden="true" className="mt-4 block h-1 w-16 rounded-full bg-secondary" />
            <p className="mt-4 text-xl text-muted">
              Board-certified podiatrists who treat you like a neighbor, because you are one.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {doctors.map((doctor, i) => (
            <Reveal key={doctor.name} delay={i * 90}>
              <Link href="/team" className="group block text-center no-underline">
                <div className="overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-1">
                  <TeamPhoto src={doctor.photo} name={doctor.name} />
                </div>
                <p className="mt-3 text-xl font-semibold text-body transition-colors group-hover:text-primary-darker">
                  {doctor.name}
                  {doctor.credentials && `, ${doctor.credentials}`}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-8 text-center">
            <Link href="/team" className="text-xl font-semibold text-primary-darker underline underline-offset-4">
              Get to know the whole team →
            </Link>
          </p>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
