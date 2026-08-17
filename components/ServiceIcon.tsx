import {
  Footprints,
  Droplet,
  Scissors,
  Zap,
  Bone,
  Bandage,
  SportShoe,
  Lightbulb,
  BedDouble,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  ClipboardList,
  Pill,
  type LucideIcon,
} from "lucide-react";

/**
 * Icons come from Lucide (lucide-react) — a professionally designed,
 * actively maintained icon set — rather than hand-drawn paths, so every
 * icon has consistent stroke weight, corner radius, and optical balance.
 * There's no literal "toenail" or "bunion" icon in any general icon
 * library (too niche), so a few of these are the closest clean,
 * professional match rather than a literal illustration:
 *   - Nail Concerns → Scissors (grooming/trimming)
 *   - Heel Pain → Zap (sharp/sudden pain — an earlier pulse-line icon read
 *     as a vitals monitor, not a foot symptom)
 *   - Bunions & Hammertoes → Bone (joint/toe deformity)
 *   - Ankle Sprains → Bandage (injury)
 */
const icons: Record<string, LucideIcon> = {
  foot: Footprints,
  droplet: Droplet,
  toenail: Scissors,
  heel: Zap,
  toes: Bone,
  ankle: Bandage,
  insole: SportShoe,
  light: Lightbulb,
  bed: BedDouble,
  phone: Phone,
  mail: Mail,
  map: MapPin,
  clock: Clock,
  check: Check,
  form: ClipboardList,
  pill: Pill,
};

export default function ServiceIcon({
  name,
  className = "h-8 w-8",
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name] ?? Footprints;
  return <Icon aria-hidden="true" strokeWidth={1.75} className={className} />;
}
