"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";

/*
 * Phase-1 store card. The product data shape already carries everything a
 * real checkout needs (name, price, description, photo, buyUrl), so moving
 * to Stripe Payment Links or Shopify Buy Buttons later is just:
 *   1. set purchaseMode: "buy" and buyUrl on the product in the config
 *   2. done — the Buy button below opens that URL
 * No redesign or new components required.
 *
 * The non-"buy" CTA deliberately does NOT repeat the phone number — with
 * four-plus cards on a page, that read as spammy. It links to the callback
 * form instead; the phone number is already prominent in the header and
 * the page-level CTA, so it doesn't need restating on every card.
 */
export default function ProductCard({
  product,
  logo,
}: {
  product: Product;
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
    <article className="flex flex-col rounded-xl border border-secondary-light bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {imageFailed ? (
        <div
          aria-hidden="true"
          className="flex aspect-square w-full items-center justify-center rounded-lg bg-gradient-to-br from-cream to-secondary-light p-8"
        >
          {logo ? (
            <div className="relative h-full w-full">
              <Image src={logo.src} alt="" fill unoptimized className="object-contain" />
            </div>
          ) : (
            <ServiceIcon name="foot" className="h-16 w-16 text-secondary" />
          )}
        </div>
      ) : (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            ref={imgRef}
            src={product.photo}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, 45vw"
            onError={() => setImageFailed(true)}
            className="object-cover"
          />
        </div>
      )}
      {/* min-h keeps the price/description/button aligned across a row even
          when one card's title wraps to a second line and another's doesn't. */}
      <h3 className="mt-4 min-h-14 text-xl">{product.name}</h3>
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
        <Link
          href="/request-appointment"
          className="mt-5 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-lg border-2 border-primary-dark px-6 text-lg font-semibold text-primary-darker no-underline transition-colors hover:bg-secondary-light"
        >
          Ask About This
        </Link>
      )}
    </article>
  );
}
