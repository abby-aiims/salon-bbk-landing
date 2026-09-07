import styles from "./AnnouncementBar.module.css";
import { announcement } from "@/content/home";

/**
 * 36px plum bar. Static centred on desktop; on mobile a single-line marquee
 * built from four copies so it can translate by 50% and loop seamlessly.
 * Only the first copy is announced.
 */
export function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <span className={styles.item}>{announcement}</span>
        <span className={styles.item} aria-hidden="true">
          {announcement}
        </span>
        <span className={styles.item} aria-hidden="true">
          {announcement}
        </span>
        <span className={styles.item} aria-hidden="true">
          {announcement}
        </span>
      </div>
    </div>
  );
}
