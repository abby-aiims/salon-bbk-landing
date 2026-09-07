import Image from "next/image";

import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./Services.module.css";
import { services } from "@/content/home";
import { site } from "@/content/site";

/**
 * Five treatments: three across the top row, two centred beneath. Each card is
 * a photograph carrying its own name, with the badge and the price as chips
 * over the image and the detail set below it.
 *
 * The whole card is one link to the form, and the click sets Preferred service
 * through data-service. The visible "Book" link repeats it for keyboard users
 * who want the affordance named.
 */
export function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <Reveal className="head head--center">
          <p className="eyebrow eyebrow--rose">{services.eyebrow}</p>
          <h2 className="h2">{services.h2}</h2>
          <p className="lede">{services.intro}</p>
        </Reveal>
      </div>

      <div className={styles.scroller}>
        <ul className={`container ${styles.grid}`}>
          {services.cards.map((card, index) => (
            <Reveal as="li" key={card.key} delay={index * 60} className={styles.card}>
              <a href="#book" data-service={card.key} className={styles.media}>
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  sizes="(min-width: 1000px) 33vw, (min-width: 700px) 45vw, 78vw"
                  loading="lazy"
                  className={styles.image}
                  style={card.image.position ? { objectPosition: card.image.position } : undefined}
                />
                <span className={styles.mediaScrim} aria-hidden="true" />
                <span className={`badge ${styles.badge}`}>{card.badge}</span>
                <span className={`chip ${styles.price}`}>{card.price}</span>
                <h3 className={styles.name}>{card.name}</h3>
              </a>

              <div className={styles.body}>
                <p className={styles.promise}>{card.promise}</p>
                <p className={styles.meta}>{card.lasts}</p>
                <a href="#book" data-service={card.key} className={`link ${styles.link}`}>
                  {card.link}
                  <Icon name="arrow_forward" className="icon--ink" />
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className={`container ${styles.also}`}>
        <p className="caption">
          {services.also}{" "}
          <a href={site.fullMenu} className="link" target="_blank" rel="noreferrer noopener">
            {services.menuLink}
          </a>
        </p>
      </div>
    </section>
  );
}
