import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${config.seo.siteUrl}/sitemap.xml`,
  };
}
