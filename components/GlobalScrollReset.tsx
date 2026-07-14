"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Forces every page-to-page navigation to the top of the document.
 * Next's built-in scroll-to-top on route change isn't reliable on every
 * real device (iOS Safari in particular can leave the previous scroll
 * position in place after a client-side navigation), which left new
 * pages rendering scrolled down, with the heading hidden under the
 * sticky header. Mounted once in the root layout so it covers every
 * route, not just the pages that happened to get reported.
 */
export default function GlobalScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
