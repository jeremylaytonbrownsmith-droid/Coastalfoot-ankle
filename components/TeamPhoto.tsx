"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Team headshot with a graceful fallback: if the photo file hasn't been
 * added to /public/team yet, an initials avatar in brand colors renders
 * instead. Drop the real photo at the configured path and it appears —
 * no code change needed. Uses next/image for automatic AVIF/WebP
 * conversion and responsive sizing on photos that do exist.
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
    <div className="relative aspect-square w-full overflow-hidden rounded-xl">
      <Image
        ref={imgRef}
        src={src}
        alt={`Portrait of ${name}`}
        fill
        sizes="(min-width: 1024px) 220px, 45vw"
        onError={() => setFailed(true)}
        className="object-cover object-top"
      />
    </div>
  );
}
