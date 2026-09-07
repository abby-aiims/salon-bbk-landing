import styles from "./Logo.module.css";

/**
 * The Salon BBK lockup, set as live text rather than an image.
 *
 * The wordmark is Glorify at default tracking: measured against the supplied
 * artwork (05-assets/01-originals/logo), "SALON BBK" has a natural advance of
 * 5.456em against the artwork's 5.4527em, so the original was set with no
 * letter-spacing at all. Every other value in Logo.module.css is a ratio taken
 * off that same file, keyed to the wordmark cap height.
 *
 * Size is driven by font-size on the root, so a caller sets one value and the
 * tagline, gaps and tracking all follow.
 *
 * The artwork breaks the tagline over two lines. The client asked for one, so
 * the tracking is opened up to hold the same optical width under the wordmark.
 */
export function Logo({
  tone = "brand",
  className = "",
}: {
  /** "brand" on light grounds; "inherit" takes the parent colour, for dark grounds. */
  tone?: "brand" | "inherit";
  className?: string;
}) {
  return (
    <span className={`${styles.logo} ${tone === "inherit" ? styles.inherit : ""} ${className}`.trim()}>
      <span className={styles.word}>Salon BBK</span>
      <span className={styles.tagline}>Eyebrow specialists &amp; academy</span>
    </span>
  );
}
