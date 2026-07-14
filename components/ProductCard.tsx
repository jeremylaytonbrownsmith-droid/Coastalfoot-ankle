"use client";

import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";

/*
 * Phase-1 store card. The product data shape already carries everything a
 * real checkout needs (name, price, description, photo, buyUrl), so moving
 * to Stripe Payment Links or Shopify Buy Buttons later is just:
 *   1. set purchaseMode: "buy" and buyUrl on the product in the config
 *   2. done — the Buy button below opens that URL
 * No redesign or new components required.
 */
export default function ProductCard({
  product,
  phone,
  phoneDisplay,
}: {
  product: Product;
  phone?: string;
  phoneDisplay?: string;
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
    <article className="flex flex-col rounded-xl border border-secondary-light bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {imageFailed ? (
        <div
          aria-hidden="true"
          className="flex aspect-square w-full items-center justify-center rounded-lg bg-cream text-secondary"
        >
          <ServiceIcon name="foot" className="h-16 w-16" />
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- graceful fallback for photos not yet provided
        <img
          ref={imgRef}
          src={product.photo}
          alt={product.name}
          onError={() => setImageFailed(true)}
          className="aspect-square w-full rounded-lg object-cover"
        />
      )}
      <h3 className="mt-4 text-xl">{product.name}</h3>
      <p className="mt-1 text-2xl font-bold text-primary-darker">{product.price}</p>
      <p className="mt-2 grow text-muted">{product.description}</p>
      {product.purchaseMode === "buy" && product.buyUrl ? (
        <a
          href={product.buyUrl}
          className="mt-5 inline-flex min-h-[52px] items-center justify-center rounded-lg bg-primary-dark px-6 text-lg font-semibold text-white no-underline transition-colors hover:bg-primary-darker"
        >
          Buy
        </a>
      ) : (
        <a
          href={`tel:${phone ?? ""}`}
          className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-2 border-primary-dark px-6 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light"
        >
          <ServiceIcon name="phone" className="h-5 w-5" />
          Call to purchase{phoneDisplay ? ` · ${phoneDisplay}` : ""}
        </a>
      )}
    </article>
  );
}
