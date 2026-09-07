import { Icon } from "./Icon";
import styles from "./ProofBar.module.css";
import { hero } from "@/content/home";

/**
 * The hero's proof line, moved out to a second bar under the announcement on
 * phones. The hero drops it at the same breakpoint, so it appears once.
 *
 * Deeper ground than the bar above it, otherwise two pale strips stack into
 * one indistinct block.
 */
export function ProofBar() {
  return (
    <div className={styles.bar}>
      <p className={styles.inner}>
        <span className={styles.stars} role="img" aria-label="5 out of 5 stars">
          {[0, 1, 2, 3, 4].map((i) => (
            <Icon key={i} name="star" className={styles.star} />
          ))}
        </span>
        {hero.proof.map((item, index) => (
          <span key={item} className={styles.item}>
            {index > 0 && (
              <span className={styles.sep} aria-hidden="true">
                ·
              </span>
            )}
            {item}
          </span>
        ))}
      </p>
    </div>
  );
}
