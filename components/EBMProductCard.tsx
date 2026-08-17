"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { EBMProduct } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";

/**
 * Card for a prescription-only EBM Medical product. Unlike ProductCard
 * (plain retail items with a price and a Buy/Ask button), these have no
 * price and no direct purchase path — every one requires a doctor's order,
 * so the only action is scrolling down to the request form.
 */
export default function EBMProductCard({
  product,
  logo,
}: {
  product: EBMProduct;
  /** Falls back to the practice logo (not a generic icon) when no product photo exists yet. */
  logo?: { src: string; alt: string };
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Missing photos can error before hydration, so onError alone can miss —
  // also check the already-settled state after mount.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setImageFailed(true);
  }, []);

  return (
    <article className="flex flex-col rounded-xl border border-secondary-light bg-card p-5 shadow-sm">
      {imageFailed ? (
        <div
          aria-hidden="true"
          className="flex aspect-[3/2] w-full items-center justify-center rounded-lg bg-gradient-to-br from-cream to-secondary-light p-8"
        >
          {logo ? (
            <div className="relative h-full w-full">
              <Image src={logo.src} alt="" fill unoptimized className="object-contain" />
            </div>
          ) : (
            <ServiceIcon name="pill" className="h-16 w-16 text-secondary" />
          )}
        </div>
      ) : (
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg">
          <Image
            ref={imgRef}
            src={product.photo}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 33vw, 90vw"
            onError={() => setImageFailed(true)}
            className="object-cover"
          />
        </div>
      )}
      <span className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-secondary-light px-3 py-1 text-sm font-semibold uppercase tracking-wide text-primary-darker">
        <ServiceIcon name="pill" className="h-4 w-4" />
        Rx only · {product.category}
      </span>
      <h3 className="mt-3 text-xl">{product.name}</h3>
      <p className="mt-2 grow text-muted">{product.description}</p>
      <a
        href="#ebm-request-form"
        className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-lg border-2 border-primary-dark px-6 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light"
      >
        Request Info or a Prescription
      </a>
    </article>
  );
}
