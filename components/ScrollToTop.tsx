"use client";

import { useEffect } from "react";

/**
 * Forces the page to the top on mount. Needed on pages reached via a link
 * that only changes search params (e.g. /request-appointment?product=X →
 * ?product=Y) — Next's built-in scroll-to-top on navigation isn't reliable
 * for same-pathname, params-only transitions, which left the heading
 * rendering half-hidden under the sticky header. `trigger` re-runs the
 * effect when navigating between two different query values on the same
 * route (not just a fresh page load).
 */
export default function ScrollToTop({ trigger }: { trigger?: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [trigger]);

  return null;
}
