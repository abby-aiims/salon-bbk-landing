/**
 * Google Material Symbols Outlined, the only icon source on the page. The
 * font is subset to the names used, in app/layout.tsx; add a name there
 * before using it here.
 */
export function Icon({
  name,
  className = "",
  label,
}: {
  name: string;
  className?: string;
  /** Provide only when the icon carries meaning on its own. */
  label?: string;
}) {
  return (
    <span
      className={`icon ${className}`.trim()}
      aria-hidden={label ? undefined : "true"}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {name}
    </span>
  );
}
