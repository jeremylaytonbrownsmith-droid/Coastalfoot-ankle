import type { Metadata } from "next";
import Image from "next/image";
import { getSiteConfig } from "@/lib/site-config";
import { PhoneButton } from "@/components/Buttons";
import TeamPhoto from "@/components/TeamPhoto";
import MobileVisitRequestForm from "@/components/MobileVisitRequestForm";
import ServiceIcon from "@/components/ServiceIcon";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Coastal Mobile Podiatry — House Calls",
  description: config.mobilePodiatry
    ? config.mobilePodiatry.intro
    : "House-call foot and ankle care.",
};

export default function MobilePodiatryPage() {
  const { mobilePodiatry, contact } = config;

  if (!mobilePodiatry) {
    return (
      <PageHeader align="center">
        <h1 className="text-4xl sm:text-5xl">Coastal Mobile Podiatry</h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-muted">
          This service isn&apos;t available right now. Call us at {contact.phoneDisplay} for the latest.
        </p>
      </PageHeader>
    );
  }

  const doctor = config.doctors.find((d) => d.name.includes(mobilePodiatry.doctorName));

  return (
    <>
      <PageHeader align="center">
        <Image
          src={config.logo.src}
          alt={config.logo.alt}
          width={config.logo.width}
          height={config.logo.height}
          priority
          unoptimized
          className="mx-auto h-16 w-auto object-contain sm:h-20"
        />
        <span className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary-dark px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-white">
          <ServiceIcon name="foot" className="h-4 w-4" />
          House Calls
        </span>
        <h1 className="mt-4 text-4xl sm:text-5xl">Coastal Mobile Podiatry</h1>
        <p className="mx-auto mt-5 max-w-2xl text-xl text-muted">{mobilePodiatry.heroTagline}</p>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-muted">{mobilePodiatry.intro}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PhoneButton />
          <a
            href="#mobile-request-form"
            className="inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-primary-dark px-7 py-3 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light"
          >
            Request a Home Visit
          </a>
        </div>
      </PageHeader>

      {/* What to expect */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <Reveal>
          <h2 className="text-3xl">What to expect</h2>
          <ul className="mt-6 space-y-4">
            {mobilePodiatry.whatToExpect.map((item) => (
              <li key={item} className="flex items-start gap-3 text-xl">
                <span className="mt-1 shrink-0 text-primary-darker">
                  <ServiceIcon name="check" className="h-6 w-6" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Meet the doctor */}
      {doctor && (
        <section className="bg-cream">
          <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
            <Reveal>
              <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                <div className="w-40 shrink-0">
                  <TeamPhoto src={doctor.photo} name={doctor.name} />
                </div>
                <div>
                  <h2 className="text-3xl">
                    Your doctor: {doctor.name}
                    {doctor.credentials && `, ${doctor.credentials}`}
                  </h2>
                  <p className="mt-3 text-xl text-muted">{mobilePodiatry.doctorBlurb}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Eligibility / Medicare vs self-pay */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <Reveal>
          <h2 className="text-3xl">Is a home visit right for you?</h2>
          <p className="mt-4 text-xl text-muted">{mobilePodiatry.eligibilityIntro}</p>
          <p className="mt-4 rounded-lg bg-secondary-light px-5 py-4 text-lg">{mobilePodiatry.selfPayNote}</p>
          <p className="mt-6 text-lg text-muted">
            Currently serving {contact.serviceArea}. Not sure if you&apos;re in range? Just ask — we&apos;ll
            let you know when we call.
          </p>
        </Reveal>
      </section>

      {/* Request form */}
      <section id="mobile-request-form" className="scroll-mt-24 bg-cream">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <h2 className="text-3xl">Request a home visit</h2>
          <p className="mt-3 text-xl text-muted">
            Fill out this short form and our team will call you back within one business day. Prefer to
            talk now? Call us at{" "}
            <a href={`tel:${contact.phone}`} className="font-semibold text-primary-darker underline underline-offset-4">
              {contact.phoneDisplay}
            </a>
            .
          </p>
          <div className="mt-8">
            <MobileVisitRequestForm eligibilityOptions={mobilePodiatry.eligibilityOptions} />
          </div>
        </div>
      </section>
    </>
  );
}
