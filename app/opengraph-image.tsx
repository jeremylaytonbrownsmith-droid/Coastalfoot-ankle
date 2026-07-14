import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time (Next.js's built-in next/og convention) so link
 * previews (texts, emails, Slack) show a branded card instead of a blank
 * or default preview. Uses the same config colors as the live site, so a
 * second practice's clone gets its own OG image automatically.
 */
export default async function OpengraphImage() {
  const config = getSiteConfig();
  const { colors } = config;

  // Embed the real, verified icon mark (app/icon.svg) rather than
  // reconstructing path data by hand — satori (next/og's renderer) needs
  // a resolvable image source, so read the file and inline it as a data URI.
  const iconSvg = readFileSync(join(process.cwd(), "app/icon.svg"), "utf8");
  const iconDataUri = `data:image/svg+xml;base64,${Buffer.from(iconSvg).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${colors.cream} 0%, ${colors.cream} 55%, ${colors.secondaryLight} 100%)`,
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          {/* satori (next/og's renderer) requires a plain <img>, not next/image */}
          <img src={iconDataUri} width={120} height={211} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 76,
                fontWeight: 700,
                color: colors.primary,
                letterSpacing: 2,
              }}
            >
              COASTAL
            </div>
            <div
              style={{
                fontSize: 26,
                color: colors.textMuted,
                letterSpacing: 6,
                marginTop: 4,
              }}
            >
              FOOT &amp; ANKLE CENTER
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 30,
            color: colors.text,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {config.tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 24,
            color: colors.primaryDark,
            fontFamily: "Arial, sans-serif",
          }}
        >
          {config.contact.city}, {config.contact.state} · {config.contact.phoneDisplay}
        </div>
      </div>
    ),
    { ...size }
  );
}
