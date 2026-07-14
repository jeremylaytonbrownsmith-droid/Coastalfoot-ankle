import Link from "next/link";
import type { Service } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServiceCard({ service }: { service: Service }) {
  const body = (
    <>
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary-light text-primary-darker">
        <ServiceIcon name={service.icon} className="h-8 w-8" />
      </span>
      {/* min-h keeps descriptions starting at the same point across a row
          even when one card's title wraps to a second line and another's
          doesn't. */}
      <h3 className="mt-4 min-h-16 text-2xl">{service.title}</h3>
      <p className="mt-2 grow text-muted">{service.description}</p>
      {service.href && (
        <span className="mt-4 inline-block text-lg font-semibold text-primary-darker underline underline-offset-4">
          Learn more →
        </span>
      )}
    </>
  );

  // flex + h-full fills the row height Reveal's wrapper already stretches
  // to (CSS grid default); without it, each card's border only wrapped its
  // own content, so shorter cards' borders ended above their taller
  // siblings' in the same row.
  const cardClasses =
    "flex h-full flex-col rounded-xl border border-secondary-light bg-card p-6 shadow-sm transition-all duration-300";

  if (service.href) {
    return (
      <Link
        href={service.href}
        className={`${cardClasses} no-underline hover:-translate-y-1 hover:border-secondary hover:shadow-lg`}
      >
        {body}
      </Link>
    );
  }
  return <div className={`${cardClasses} hover:-translate-y-1 hover:shadow-md`}>{body}</div>;
}
