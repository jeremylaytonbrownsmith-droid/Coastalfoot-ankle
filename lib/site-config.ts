/**
 * Site config loader.
 *
 * Every brand-specific value on this site (names, colors, copy, photos,
 * phone numbers, services, products) lives in a config file under /configs.
 * Components never hardcode branding — they read from the object returned
 * by getSiteConfig().
 *
 * To add a second practice later:
 *   1. Copy configs/coastal-foot-ankle.config.ts to configs/<new-site>.config.ts
 *   2. Edit its contents (see CLONE.md for the full checklist)
 *   3. Import it below and add it to the registry
 *   4. Build with SITE_CONFIG=<new-site>
 */
import coastalFootAnkle from "@/configs/coastal-foot-ankle.config";

export interface NavItem {
  label: string;
  href: string;
}

export interface BrandColors {
  /** Primary brand accent — used for links, icons, highlights. */
  primary: string;
  /** Darker shade of primary — used for button backgrounds so white text passes contrast. */
  primaryDark: string;
  /** Darkest shade — button hover states. */
  primaryDarker: string;
  /** Secondary accent — icons, dividers, hover tints. */
  secondary: string;
  /** Light tint of secondary for soft backgrounds. */
  secondaryLight: string;
  /** Main body text color (near-black). */
  text: string;
  /** Muted text — captions, subtext. Keep ≥ 4.5:1 contrast on cream. */
  textMuted: string;
  /** Warm off-white used for alternating section backgrounds. */
  cream: string;
  /** Pure-ish white for cards on cream backgrounds. */
  white: string;
}

export interface Doctor {
  name: string;
  credentials: string;
  /** Path under /public. Missing files fall back to an initials avatar automatically. */
  photo: string;
  bio: string;
  specialties: string[];
  /** Shown as badges next to the name. */
  boardCertifications: string[];
  /** Doctors render before support staff and get slightly larger cards. */
  role: "doctor" | "support";
  /** Support staff job title, e.g. "Medical Assistant". */
  title?: string;
}

export interface Service {
  title: string;
  description: string;
  /** Name of an icon in components/ServiceIcon.tsx. */
  icon: string;
  /** If set, the card links to this page. */
  href?: string;
  /** Show on the home page overview (keep to 3–5). */
  featuredOnHome?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** A dedicated service page (e.g. Red Light Therapy) rendered at /services/<slug>. */
export interface FeaturedServicePage {
  slug: string;
  title: string;
  heroTagline: string;
  whatItIs: string[];
  whatASessionIsLike: string[];
  whoItHelps: string[];
  /** Leave null to hide pricing until the practice confirms it. */
  pricing: { label: string; price: string; note?: string }[] | null;
  faq: FaqItem[];
  seoDescription: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "Diabetic foot care patient" — keep vague for privacy. */
  context?: string;
  rating: number;
}

export interface Product {
  name: string;
  price: string;
  description: string;
  /** Path under /public; missing files fall back to a placeholder graphic. */
  photo: string;
  /**
   * Phase 1 has no online checkout. "call" renders a tap-to-call button;
   * "buy" renders a Buy button wired to buyUrl (Stripe Payment Link /
   * Shopify Buy Button URL) when that's ready.
   */
  purchaseMode: "call" | "buy";
  buyUrl?: string;
}

export interface SiteConfig {
  /** Key used by the SITE_CONFIG env var and asset namespacing. */
  key: string;
  practiceName: string;
  /** Short name for tight spaces (page titles, footer copyright). */
  shortName: string;
  tagline: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  /** Home page hero photo, shown beside the headline on desktop and below it on mobile. */
  heroImage: {
    src: string;
    alt: string;
  };
  colors: BrandColors;
  contact: {
    /** Digits only, for tel: links. */
    phone: string;
    /** Human-formatted, e.g. "(910) 555-0123". */
    phoneDisplay: string;
    email: string;
    /**
     * Street address. LEAVE null UNTIL THE PRACTICE CONFIRMS IT MAY BE SHOWN.
     * While null, the Contact page shows city + service area only and the map
     * stays city-level with no pin. Filling this in automatically enables the
     * full address block, the map pin, and the address in JSON-LD.
     */
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    } | null;
    city: string;
    state: string;
    serviceArea: string;
    hours: { days: string; hours: string }[];
  };
  /** The AI receptionist that answers the practice phone 24/7. */
  aiReceptionist: {
    name: string;
    /** One-line explanation shown near the phone number. */
    blurb: string;
    /** Short FAQ addressing "wait, am I talking to a robot?" — shown on the Request Appointment page. */
    faq: FaqItem[];
  };
  trust: {
    yearsExperience: string;
    boardCertifications: string;
    googleReviewCount: string;
  };
  nav: NavItem[];
  doctors: Doctor[];
  services: Service[];
  featuredServicePages: FeaturedServicePage[];
  testimonials: Testimonial[];
  googleReviews: {
    rating: number;
    count: string;
    /**
     * "Leave us a review" destination — the practice's Google review link.
     * Leave null until the real link exists; the button on the reviews
     * page only renders when this is set, so there's never a dead link.
     */
    reviewUrl: string | null;
  };
  products: Product[];
  callbackForm: {
    reasonsForVisit: string[];
    confirmationMessage: string;
    hipaaNote: string;
  };
  insurance: {
    intro: string;
    acceptedPlans: string[];
    note: string;
  };
  /**
   * Downloadable new-patient intake form (PDF) so patients can fill it out
   * before arriving. Set to null to hide the download link if the practice
   * doesn't have one yet.
   */
  newPatientForm: { src: string; label: string } | null;
  seo: {
    /** Production URL, no trailing slash. Used for sitemap + Open Graph. */
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
  };
}

const registry: Record<string, SiteConfig> = {
  "coastal-foot-ankle": coastalFootAnkle,
  // Site #2 goes here, e.g.:
  // "dyal-podiatry": dyalPodiatry,
};

const activeKey = process.env.SITE_CONFIG ?? "coastal-foot-ankle";

export function getSiteConfig(): SiteConfig {
  const config = registry[activeKey];
  if (!config) {
    throw new Error(
      `Unknown SITE_CONFIG "${activeKey}". Available: ${Object.keys(registry).join(", ")}`
    );
  }
  return config;
}
