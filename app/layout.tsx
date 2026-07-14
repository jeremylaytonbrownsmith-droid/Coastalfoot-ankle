import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/site-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const config = getSiteConfig();

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.siteUrl),
  title: {
    default: config.seo.defaultTitle,
    template: `%s | ${config.shortName}`,
  },
  description: config.seo.defaultDescription,
  openGraph: {
    siteName: config.practiceName,
    type: "website",
    locale: "en_US",
  },
};

/**
 * LocalBusiness/Physician structured data for search engines.
 * The street address is only included once contact.address is filled in —
 * until then only city/state appear, matching the visible site.
 */
function structuredData() {
  const { contact } = config;
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "Physician"],
    name: config.practiceName,
    description: config.seo.defaultDescription,
    url: config.seo.siteUrl,
    telephone: `+1-${config.contact.phone}`,
    email: contact.email,
    medicalSpecialty: "Podiatric",
    address: {
      "@type": "PostalAddress",
      ...(contact.address && {
        streetAddress: contact.address.street,
        postalCode: contact.address.zip,
      }),
      addressLocality: contact.address?.city ?? contact.city,
      addressRegion: contact.address?.state ?? contact.state,
      addressCountry: "US",
    },
    areaServed: contact.serviceArea,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: config.googleReviews.rating,
      bestRating: 5,
      ratingCount: parseInt(config.googleReviews.count) || 100,
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { colors } = config;
  // Brand palette flows from the config into CSS variables here; Tailwind
  // utilities (bg-primary, text-muted, …) resolve to these via globals.css.
  const cssVars = `:root{--site-primary:${colors.primary};--site-primary-dark:${colors.primaryDark};--site-primary-darker:${colors.primaryDarker};--site-secondary:${colors.secondary};--site-secondary-light:${colors.secondaryLight};--site-text:${colors.text};--site-text-muted:${colors.textMuted};--site-cream:${colors.cream};--site-white:${colors.white};}`;

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-dark focus:px-6 focus:py-3 focus:text-lg focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Header
          nav={config.nav}
          logo={config.logo}
          practiceName={config.practiceName}
          phone={config.contact.phone}
          phoneDisplay={config.contact.phoneDisplay}
        />
        <main id="main-content" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
