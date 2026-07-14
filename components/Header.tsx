"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSiteConfig, type NavItem } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";
import Stars from "@/components/Stars";

/*
 * Header rules for a 60+ audience:
 *  - Full nav is always visible on desktop (no hamburger).
 *  - The phone number is large, clickable, and on every page.
 *  - Mobile gets a plainly-labeled "Menu" button (with the word, not just
 *    an icon) that opens a simple stacked list with 48px+ tap targets.
 *
 * All content comes in as props from the layout so this component stays
 * brand-agnostic for site #2.
 */
export default function Header({
  nav,
  logo,
  practiceName,
  phone,
  phoneDisplay,
}: {
  nav: NavItem[];
  logo: { src: string; alt: string; width: number; height: number };
  practiceName: string;
  phone: string;
  phoneDisplay: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { contact, googleReviews, trust } = getSiteConfig();

  const linkClasses = (href: string) =>
    `whitespace-nowrap rounded-md px-3 py-2 text-lg font-medium no-underline transition-colors hover:bg-secondary-light hover:text-primary-darker ${
      pathname === href ? "text-primary-darker underline decoration-secondary decoration-2 underline-offset-8" : "text-body"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-secondary-light bg-card/95 shadow-sm backdrop-blur-sm">
      {/* Utility bar: quick trust signal + every contact channel, not just the phone.
          A gradient (instead of a flat fill) and a soft accent line underneath give
          it real depth rather than reading as a single flat color block. Desktop
          only — on a narrow screen, three items wrapped onto three lines and ate
          up the top of the viewport before any real content appeared. Mobile
          already has a dedicated, larger tap-to-call button in the nav row below. */}
      <div className="relative hidden overflow-hidden bg-gradient-to-r from-primary-darker via-primary-dark to-primary-darker px-4 py-2 text-white sm:block">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-1 text-center">
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90">
            <Stars rating={googleReviews.rating} className="h-4 w-4" />
            {googleReviews.rating} ({trust.googleReviewCount})
          </span>
          <a href={`tel:${contact.phone}`} className="inline-flex items-center gap-1.5 text-lg font-medium no-underline">
            <ServiceIcon name="phone" className="h-4 w-4" />
            Call:{" "}
            <span className="font-bold underline underline-offset-4">{phoneDisplay}</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 no-underline underline-offset-4 hover:underline"
          >
            <ServiceIcon name="mail" className="h-4 w-4" />
            {contact.email}
          </a>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary-light/70 to-transparent" />
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center no-underline" aria-label={`${practiceName} — home`}>
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            unoptimized
            className="h-11 w-auto max-w-[38vw] object-contain object-left sm:h-16 sm:max-w-none"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClasses(item.href)}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/request-appointment"
            className="ml-3 inline-flex min-h-[52px] items-center rounded-lg bg-primary-dark px-6 py-2.5 text-lg font-semibold text-white no-underline transition-colors hover:bg-primary-darker"
          >
            Request an Appointment
          </Link>
        </nav>

        {/* Mobile: tap-to-call + a clearly labeled Menu button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${phone}`}
            className="inline-flex min-h-[52px] min-w-[52px] items-center justify-center rounded-lg bg-primary-dark px-3 text-white"
            aria-label={`Call ${phoneDisplay}`}
          >
            <ServiceIcon name="phone" className="h-7 w-7" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex min-h-[52px] items-center gap-1.5 rounded-lg border-2 border-primary-dark px-3 text-lg font-semibold text-primary-darker"
          >
            {open ? "Close" : "Menu"}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main navigation" className="border-t border-secondary-light bg-card px-4 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-4 text-xl font-medium text-body no-underline hover:bg-secondary-light"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-3">
              <Link
                href="/request-appointment"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-primary-dark px-6 py-4 text-center text-xl font-semibold text-white no-underline"
              >
                Request an Appointment
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
