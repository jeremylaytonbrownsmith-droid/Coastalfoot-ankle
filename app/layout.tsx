import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { getSiteConfig } from "@/lib/site-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalScrollReset from "@/components/GlobalScrollReset";
import "./globals.css";

const config = getSiteConfig();

/**
 * Self-hosted via next/font (zero runtime request to Google, no layout
 * shift). Playfair Display carries the "premium medical" heading feel the
 * brand wants; Inter is chosen specifically for legibility at large sizes,
 * which matters for the 60+ patient audience. Bold-only weights avoid the
 * thin-font readability issue the original brief called out.
 */
const heading = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
        <noscript>
          {/* Scroll-reveal animations require JS — show everything without it. */}
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <GlobalScrollReset />
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
