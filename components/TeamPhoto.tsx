"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Team headshot with a graceful fallback: if the photo file hasn't been
 * added to /public/team yet, an initials avatar in brand colors renders
 * instead. Drop the real photo at the configured path and it appears —
 * no code change needed. All photos crop to the same square ratio so
 * real headshots and placeholders sit side by side cleanly.
 */
export default function TeamPhoto({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A missing file can error before React hydrates, so onError alone would
  // never fire — also check the already-settled state after mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  const initials = name
    .replace(/\[|\]|Dr\.\s*/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className="flex aspect-square w-full items-center justify-center rounded-xl bg-secondary-light font-serif text-6xl font-bold text-primary-dark"
      >
        {initials || "?"}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- needs onError fallback for not-yet-provided headshots
    <img
      ref={imgRef}
      src={src}
      alt={`Portrait of ${name}`}
      onError={() => setFailed(true)}
      className="aspect-square w-full rounded-xl object-cover object-top"
    />
  );
}
