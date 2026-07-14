import type { FaqItem } from "@/lib/site-config";

/**
 * FAQ accordion built on native <details>/<summary> — keyboard accessible
 * with zero JavaScript, and the whole question row is a large tap target.
 */
export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-secondary-light rounded-xl border border-secondary-light bg-card">
      {items.map((item) => (
        <details key={item.question} className="group px-6">
          <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-xl font-semibold marker:hidden [&::-webkit-details-marker]:hidden">
            {item.question}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              aria-hidden="true"
              className="h-7 w-7 shrink-0 text-primary-dark transition-transform group-open:rotate-180"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <p className="pb-6 text-lg text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
