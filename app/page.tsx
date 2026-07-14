import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import { AppointmentButton, PhoneButton } from "@/components/Buttons";
import TrustBar from "@/components/TrustBar";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import TeamPhoto from "@/components/TeamPhoto";
import CTASection from "@/components/CTASection";

export default function HomePage() {
  const config = getSiteConfig();
  const featuredServices = config.services.filter((s) => s.featuredOnHome).slice(0, 5);
  const featuredTestimonials = config.testimonials.slice(0, 3);
  const doctors = config.doctors.filter((d) => d.role === "doctor");

  return (
    <>
      {/* Hero */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem]">
              Expert foot &amp; ankle care in {config.contact.city}, {config.contact.state}
            </h1>
            <p className="mt-6 text-xl text-muted sm:text-2xl">
              {config.tagline}. From everyday foot pain to diabetic foot care and
              red light therapy, our doctors take the time to listen — and to help.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <AppointmentButton />
              <PhoneButton variant="outline" />
            </div>
            <p className="mt-5 text-lg text-muted">
              {config.aiReceptionist.blurb}
            </p>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Services overview */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">How we can help</h2>
          <p className="mt-3 text-xl text-muted">
            Simple, honest care for the most common foot and ankle problems.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/services" className="text-xl font-semibold text-primary-darker underline underline-offset-4">
            See all of our services →
          </Link>
        </p>
      </section>

      {/* Testimonials */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl sm:text-4xl">What our patients say</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredTestimonials.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
          <p className="mt-8">
            <Link href="/testimonials" className="text-xl font-semibold text-primary-darker underline underline-offset-4">
              Read more reviews →
            </Link>
          </p>
        </div>
      </section>

      {/* Meet the doctors teaser */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">Meet your doctors</h2>
          <p className="mt-3 text-xl text-muted">
            Board-certified podiatrists who treat you like a neighbor, because you are one.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Link
              key={doctor.name}
              href="/team"
              className="group text-center no-underline"
            >
              <TeamPhoto src={doctor.photo} name={doctor.name} />
              <p className="mt-3 text-xl font-semibold text-body group-hover:text-primary-darker">
                {doctor.name}
                {doctor.credentials && `, ${doctor.credentials}`}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link href="/team" className="text-xl font-semibold text-primary-darker underline underline-offset-4">
            Get to know the whole team →
          </Link>
        </p>
      </section>

      <CTASection />
    </>
  );
}
