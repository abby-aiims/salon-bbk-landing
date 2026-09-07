import Image from "next/image";

import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./WhyBBK.module.css";
import { why } from "@/content/home";
import { cta } from "@/content/site";

/**
 * Fenty's editorial band as the specialist-versus-brow-bar argument. Image
 * full bleed to the viewport edge on one side, copy padded on the other.
 */
export function WhyBBK() {
  return (
    <section className={styles.split} id="why-bbk">
      <div className={styles.media}>
        <Image
          src={why.image.src}
          alt={why.image.alt}
          width={why.image.width}
          height={why.image.height}
          sizes="(min-width: 900px) 50vw, 100vw"
          loading="lazy"
          className={styles.image}
        />
      </div>

      <Reveal className={styles.copy}>
        <p className="eyebrow eyebrow--rose">{why.eyebrow}</p>
        <h2 className="h2">{why.h2}</h2>
        <p className={styles.body}>{why.body}</p>

        <blockquote className={styles.quote}>
          <p className="quote">&quot;{why.quote}&quot;</p>
          <footer className="caption">{why.quoteBy}</footer>
        </blockquote>

        <ul className={styles.points}>
          {why.points.map((point) => (
            <li key={point.icon} className={styles.point}>
              <Icon name={point.icon} />
              <span>{point.label}</span>
            </li>
          ))}
        </ul>

        <a href="#book" className={`btn btn--primary ${styles.cta}`}>
          {cta.mapping}
        </a>
      </Reveal>
    </section>
  );
}
