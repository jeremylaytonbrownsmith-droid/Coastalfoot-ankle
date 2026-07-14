import type { Testimonial } from "@/lib/site-config";
import Stars from "@/components/Stars";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-secondary-light bg-card p-6 shadow-sm">
      <Stars rating={testimonial.rating} className="h-5 w-5" />
      <blockquote className="mt-4 grow text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 font-semibold">
        {testimonial.name}
        {testimonial.context && (
          <span className="block text-base font-normal text-muted">{testimonial.context}</span>
        )}
      </figcaption>
    </figure>
  );
}
