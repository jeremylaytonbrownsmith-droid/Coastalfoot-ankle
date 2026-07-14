import { getSiteConfig } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";
import Stars from "@/components/Stars";

export default function TrustBar() {
  const { trust } = getSiteConfig();
  const items = [
    { icon: "clock", text: trust.yearsExperience },
    { icon: "check", text: trust.boardCertifications },
    { icon: "star", text: trust.googleReviewCount },
  ];
  return (
    <section aria-label="Why patients trust us" className="border-y border-secondary-light bg-card">
      <ul className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:gap-8 sm:px-6">
        {items.map((item) => (
          <li key={item.text} className="flex items-center gap-3 text-lg font-medium">
            {item.icon === "star" ? (
              <Stars className="h-5 w-5" />
            ) : (
              <span className="text-secondary">
                <ServiceIcon name={item.icon} className="h-7 w-7" />
              </span>
            )}
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
