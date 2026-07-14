/**
 * Simple inline icon set so no icon library is needed. Icons are keyed by
 * name from the config (services[].icon). Add new icons here as sites need
 * them. All inherit currentColor so they follow the brand palette.
 */
const paths: Record<string, React.ReactNode> = {
  foot: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 3c3 0 5 2.5 5 6 0 2.5-1 4-1 6.5 0 2 .5 3-.5 4.5s-3.5 1.5-4.5 0-.5-2.5-.5-4.5C10.5 13 7 12 7 8.5 7 5.5 9 3 12 3z"
    />
  ),
  heart: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 20.5l-7.5-7.8a4.6 4.6 0 010-6.4 4.3 4.3 0 016.2 0L12 7.6l1.3-1.3a4.3 4.3 0 016.2 0 4.6 4.6 0 010 6.4L12 20.5z"
    />
  ),
  nail: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 3h6v10a3 3 0 01-3 3 3 3 0 01-3-3V3zM12 16v5M8 21h8"
    />
  ),
  heel: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 4v9a7 7 0 007 7h5v-3a4 4 0 00-4-4h-1a3 3 0 01-3-3V4H6z"
    />
  ),
  insole: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 3c2.8 0 4.5 2 4.5 5s-1.5 4.5-1.5 7 .8 3.5 0 5-3.2 1.5-4 0-.5-3-.5-5C8.5 12 6 10.5 6 7.5 6 4.7 7.5 3 10 3zM17 5c1.5 1.5 2 4 1.5 6"
    />
  ),
  light: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 2v3M4.9 4.9l2.1 2.1M2 12h3M19 12h3M17 7l2.1-2.1M12 8a4 4 0 014 4c0 1.5-.8 2.5-1.5 3.5S13.5 18 13.5 19h-3c0-1-.3-2.5-1-3.5S8 13.5 8 12a4 4 0 014-4zM10.5 22h3"
    />
  ),
  bed: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7v10M3 15h18M21 15v-3a3 3 0 00-3-3h-7v6M6 11.5a1.5 1.5 0 100-.01M3 19v-2M21 19v-2"
    />
  ),
  phone: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 5c0-1.1.9-2 2-2h2.2c.5 0 .9.3 1 .8l1 3.4c.1.4 0 .9-.4 1.1l-1.5 1.2a12.5 12.5 0 005.2 5.2l1.2-1.5c.2-.4.7-.5 1.1-.4l3.4 1c.5.1.8.5.8 1V17c0 1.1-.9 2-2 2h-1C9.7 19 4 13.3 4 6V5z"
    />
  ),
  clock: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 8v4l2.5 2.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  mail: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 7l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z"
    />
  ),
  map: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 21s-6.5-5.5-6.5-10.5a6.5 6.5 0 0113 0C18.5 15.5 12 21 12 21zM12 12.5a2 2 0 100-4 2 2 0 000 4z"
    />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  ),
};

export default function ServiceIcon({
  name,
  className = "h-8 w-8",
}: {
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
      className={className}
    >
      {paths[name] ?? paths.foot}
    </svg>
  );
}
