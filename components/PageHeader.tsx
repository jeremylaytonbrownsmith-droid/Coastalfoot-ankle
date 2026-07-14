/**
 * Shared header band for every page except home (which has its own full
 * hero). The gradient runs FROM the sage tone (not a barely-there hint of
 * it) so it reads as a distinct designed banner, not the same flat cream
 * block repeated on every page — plus a brand-colored top accent rule for
 * a clear visual signature. Pages keep full control of their own title/
 * copy/buttons via children — this is just the shell.
 */
export default function PageHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary-light via-cream to-cream">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-secondary via-primary to-secondary" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full bg-primary opacity-[0.1] blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-secondary opacity-25 blur-3xl" />
      </div>
      <div
        className={`relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 ${align === "center" ? "text-center" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}
