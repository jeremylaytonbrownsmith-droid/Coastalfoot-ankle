import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfig();
  const base = config.seo.siteUrl;

  const staticPaths = [
    "",
    "/request-appointment",
    "/services",
    "/team",
    "/store",
    "/testimonials",
    "/contact",
    "/insurance",
    "/forms",
    "/privacy",
  ];

  const servicePages = config.featuredServicePages.map((page) => `/services/${page.slug}`);

  return [...staticPaths, ...servicePages].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
