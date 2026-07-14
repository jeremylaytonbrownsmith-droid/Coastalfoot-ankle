import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import ServiceIcon from "@/components/ServiceIcon";

/*
 * Shared CTA buttons. Everything is sized for older hands: minimum 52px
 * tall, large text, obvious color. The phone button is never styled as
 * less important than the form button — calling is the primary booking
 * path (the phone is answered during office hours by the practice's AI
 * receptionist).
 */

const base =
  "inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-lg px-7 py-3 text-lg font-semibold no-underline shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0";

export function AppointmentButton({ label }: { label?: string }) {
  return (
    <Link
      href="/request-appointment"
      className={`${base} bg-primary-dark text-white hover:bg-primary-darker`}
    >
      {label ?? "Request an Appointment"}
    </Link>
  );
}

export function PhoneButton({
  label,
  variant = "solid",
}: {
  label?: string;
  variant?: "solid" | "outline";
}) {
  const { contact } = getSiteConfig();
  const styles =
    variant === "solid"
      ? "bg-primary-dark text-white hover:bg-primary-darker"
      : "border-2 border-primary-dark bg-card text-primary-darker hover:bg-secondary-light";
  return (
    <a href={`tel:${contact.phone}`} className={`${base} ${styles}`}>
      <ServiceIcon name="phone" className="h-6 w-6" />
      {label ?? `Call ${contact.phoneDisplay}`}
    </a>
  );
}
