/**
 * Shared header band for every page except home (which has its own full
 * hero). Matches the home hero's gradient + soft glow treatment instead of
 * the flat, plain cream block these pages used to have. Pages keep full
 * control of their own title/copy/buttons via children — this is just the
 * shell.
 */
export default function PageHeader({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-cream to-secondary-light">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-24 -top-32 h-72 w-72 rounded-full bg-secondary-light opacity-60 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-primary opacity-[0.07] blur-3xl" />
      </div>
      <div
        className={`relative mx-auto max-w-4xl px-4 py-14 sm:px-6 ${align === "center" ? "text-center" : ""}`}
      >
        {children}
      </div>
    </section>
  );
}
