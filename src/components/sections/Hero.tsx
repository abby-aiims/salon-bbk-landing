import Image from "next/image";
import { Fragment } from "react";

import { OpenIndicator } from "../OpenIndicator";
import { Icon } from "../Icon";
import styles from "./Hero.module.css";
import { hero } from "@/content/home";
import { cta } from "@/content/site";

/**
 * Full-bleed campaign image running the height of the viewport, with the
 * header sitting over it and the copy anchored bottom left. Two scrims are
 * baked into one background: a soft one at the top so the white header stays
 * legible, and a heavier one at the bottom carrying the headline block.
 */
export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.media}>
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          width={hero.image.width}
          height={hero.image.height}
          priority
          fetchPriority="high"
          sizes="100vw"
          className={styles.image}
        />
        <div className={styles.scrim} aria-hidden="true" />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <OpenIndicator className={styles.open} />
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={`display ${styles.h1}`}>
            {hero.h1Lines.map((line, index) => (
              <Fragment key={line}>
                {index > 0 && " "}
                <span className={styles.h1Line}>{line}</span>
              </Fragment>
            ))}
          </h1>
        </div>

        {/* Supporting line and the call to action. Stacked under the headline
            on a phone, moved to the bottom right corner on desktop. */}
        <div className={styles.aside}>
          <p className={styles.subline}>{hero.subline}</p>

          <div className={styles.actions}>
            <a href="#book" className="btn btn--light">
              <span className={styles.ctaFull}>{cta.primary}</span>
              <span className={styles.ctaShort}>{cta.primaryShort}</span>
            </a>
            <a href="#services" className={`link link--onImage ${styles.secondary}`}>
              {hero.secondaryLink}
            </a>
          </div>
        </div>

        <div className={styles.proofWrap}>
          <p className={styles.proof}>
            <span className={styles.stars} role="img" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((i) => (
                <Icon key={i} name="star" className={styles.star} />
              ))}
            </span>
            {hero.proof.map((item, index) => (
              <span key={item} className={styles.proofItem}>
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
      </div>
    </section>
  );
}
