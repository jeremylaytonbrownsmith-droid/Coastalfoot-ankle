import Link from "next/link";
import type { Service } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";

export default function ServiceCard({ service }: { service: Service }) {
  const body = (
    <>
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary-light text-primary-darker">
        <ServiceIcon name={service.icon} className="h-8 w-8" />
      </span>
      <h3 className="mt-4 text-2xl">{service.title}</h3>
      <p className="mt-2 text-muted">{service.description}</p>
      {service.href && (
        <span className="mt-4 inline-block text-lg font-semibold text-primary-darker underline underline-offset-4">
          Learn more →
        </span>
      )}
    </>
  );

  const cardClasses =
    "block rounded-xl border border-secondary-light bg-card p-6 shadow-sm transition-shadow";

  if (service.href) {
    return (
      <Link href={service.href} className={`${cardClasses} no-underline hover:shadow-md hover:border-secondary`}>
        {body}
      </Link>
    );
  }
  return <div className={cardClasses}>{body}</div>;
}
