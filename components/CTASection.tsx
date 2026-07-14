import { getSiteConfig } from "@/lib/site-config";
import { AppointmentButton, PhoneButton } from "@/components/Buttons";
import Stars from "@/components/Stars";

/**
 * Reusable end-of-page call to action. The phone number and the form get
 * equal visual weight — calling is the primary booking path.
 */
export default function CTASection({
  heading,
  subtext,
}: {
  heading?: string;
  subtext?: string;
}) {
  const config = getSiteConfig();
  return (
    <section className="bg-secondary-light">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
        <h2 className="text-3xl sm:text-4xl">{heading ?? "Ready to feel better on your feet?"}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-muted">
          {subtext ?? config.aiReceptionist.blurb}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PhoneButton />
          <AppointmentButton label="Request a Callback" />
        </div>
        <p className="mt-6 flex items-center justify-center gap-2 text-lg text-muted">
          <Stars rating={config.googleReviews.rating} className="h-5 w-5" />
          {config.googleReviews.rating} stars · {config.trust.googleReviewCount}
        </p>
      </div>
    </section>
  );
}
