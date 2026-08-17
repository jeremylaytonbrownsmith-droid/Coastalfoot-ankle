import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";

export default function Footer() {
  const config = getSiteConfig();
  const { contact } = config;

  return (
    <footer className="bg-cream">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-secondary via-primary to-secondary" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl font-bold">{config.practiceName}</p>
          <p className="mt-2 max-w-xs text-muted">{config.tagline}</p>
          <p className="mt-4 text-muted">
            Serving {contact.serviceArea}.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">Get in touch</h2>
          <p className="mt-3">
            <a href={`tel:${contact.phone}`} className="text-2xl font-bold text-primary-darker no-underline hover:underline">
              {contact.phoneDisplay}
            </a>
          </p>
          <p className="mt-3">
            <a href={`mailto:${contact.email}`} className="text-lg text-primary-darker underline underline-offset-4">
              {contact.email}
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold">Office hours</h2>
          <ul className="mt-3 space-y-1.5">
            {contact.hours.map((h) => (
              <li key={h.days} className="flex flex-wrap justify-between gap-x-4">
                <span className="font-medium">{h.days}</span>
                <span className="text-muted">{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-secondary-light">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-muted sm:px-6">
          <p>
            © {new Date().getFullYear()} {config.practiceName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/forms" className="underline underline-offset-4 hover:text-primary-darker">
              Patient Forms
            </Link>
            {config.ebmMedical.products.length > 0 && (
              <Link href="/store/ebm-medical" className="underline underline-offset-4 hover:text-primary-darker">
                EBM Medical Products
              </Link>
            )}
            <Link href="/insurance" className="underline underline-offset-4 hover:text-primary-darker">
              Insurance &amp; Accepted Plans
            </Link>
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary-darker">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
