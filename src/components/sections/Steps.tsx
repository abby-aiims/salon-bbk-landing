import Image from "next/image";

import { Reveal } from "../Reveal";
import styles from "./Steps.module.css";
import { steps } from "@/content/home";
import { cta } from "@/content/site";

/**
 * The heading column sticks while the four step cards scroll past it. Each
 * card is a photograph with the step number as a chip and the copy set over
 * the foot of the image.
 *
 * On narrow screens the sticky behaviour is dropped: there is no second column
 * to scroll against, so the heading simply sits above the cards.
 */
export function Steps() {
  return (
    <section className="section section--blush" id="how-it-works">
      <div className={`container ${styles.grid}`}>
        <div className={styles.aside}>
          <Reveal className={styles.asideInner}>
            <p className="eyebrow eyebrow--rose">{steps.eyebrow}</p>
            <h2 className="h2">{steps.h2}</h2>
            <p className={styles.intro}>{steps.intro}</p>
            <a href="#book" className={`btn btn--primary ${cta ? styles.cta : ""}`}>
              {cta.primary}
            </a>
          </Reveal>
        </div>

        <ol className={styles.list}>
          {steps.items.map((item, index) => (
            <Reveal as="li" key={item.title} className={styles.step}>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(min-width: 900px) 55vw, 100vw"
                loading="lazy"
                className={styles.image}
                style={{ objectPosition: item.image.position }}
              />
              <span className={styles.scrim} aria-hidden="true" />
              <div className={styles.copy}>
                <span className={`chip ${styles.chip}`}>Step {String(index + 1).padStart(2, "0")}</span>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.body}>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
