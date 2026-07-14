import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";
import { AppointmentButton, PhoneButton } from "@/components/Buttons";

const config = getSiteConfig();

export const metadata: Metadata = {
  title: "Contact & Location",
  description: `Contact ${config.practiceName} — serving ${config.contact.serviceArea}. Phone answered 24/7.`,
};

/**
 * The street address stays hidden until contact.address is set in the
 * config. While it's null, this page shows city + service area and a
 * city-level map with no pin; filling in the address automatically enables
 * the address block and a pinned map. (OpenStreetMap embed — no API key.)
 */
function AreaMap() {
  const { address, mapCenter, city, state } = config.contact;
  const delta = 0.5 / Math.pow(2, mapCenter.zoom - 8);
  const bbox = [
    mapCenter.lng - delta,
    mapCenter.lat - delta / 2,
    mapCenter.lng + delta,
    mapCenter.lat + delta / 2,
  ].join("%2C");
  const marker = address ? `&marker=${mapCenter.lat}%2C${mapCenter.lng}` : "";

  return (
    <iframe
      title={`Map of the ${city}, ${state} area`}
      src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}`}
      className="h-[400px] w-full rounded-xl border border-secondary-light"
      loading="lazy"
    />
  );
}

export default function ContactPage() {
  const { contact } = config;

  return (
    <>
      <section className="bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <h1 className="text-4xl sm:text-5xl">Contact us</h1>
          <p className="mt-5 max-w-2xl text-xl text-muted">
            Serving {contact.serviceArea}. The easiest way to reach us is by
            phone — we answer around the clock.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <PhoneButton />
            <AppointmentButton label="Request a Callback" />
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-secondary">
              <ServiceIcon name="phone" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl">Phone</h2>
              <a href={`tel:${contact.phone}`} className="mt-1 block text-2xl font-bold text-primary-darker no-underline hover:underline">
                {contact.phoneDisplay}
              </a>
              <p className="mt-1 text-muted">{config.aiReceptionist.blurb}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-secondary">
              <ServiceIcon name="mail" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl">Email</h2>
              <a href={`mailto:${contact.email}`} className="mt-1 block text-xl text-primary-darker underline underline-offset-4">
                {contact.email}
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-secondary">
              <ServiceIcon name="map" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl">Location</h2>
              {contact.address ? (
                <address className="mt-1 text-xl not-italic">
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.state} {contact.address.zip}
                </address>
              ) : (
                <p className="mt-1 text-xl">
                  Serving {contact.city}, {contact.state} and surrounding areas.
                  <span className="mt-1 block text-lg text-muted">
                    Call us for directions to the office.
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <span className="mt-1 shrink-0 text-secondary">
              <ServiceIcon name="clock" className="h-8 w-8" />
            </span>
            <div>
              <h2 className="text-2xl">Office hours</h2>
              <ul className="mt-2 space-y-1.5 text-xl">
                {contact.hours.map((h) => (
                  <li key={h.days}>
                    <span className="font-semibold">{h.days}:</span>{" "}
                    <span className="text-muted">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div>
          <AreaMap />
          <p className="mt-3 text-muted">
            {contact.address
              ? "We look forward to seeing you."
              : `We're located in the ${contact.city} area — call and we'll give you easy directions.`}
          </p>
        </div>
      </section>
    </>
  );
}
