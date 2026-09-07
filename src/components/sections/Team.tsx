import Image from "next/image";

import { Reveal } from "../Reveal";
import styles from "./Team.module.css";
import { team } from "@/content/home";
import { cta } from "@/content/site";

/** Founder portrait at card size, never full bleed: it is phone quality. */
export function Team() {
  return (
    <section className="section section--blush" id="team">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.media}>
          <Image
            src={team.image.src}
            alt={team.image.alt}
            width={team.image.width}
            height={team.image.height}
            sizes="(min-width: 900px) 40vw, 100vw"
            loading="lazy"
            className={styles.image}
          />
          <p className={`caption ${styles.caption}`}>{team.caption}</p>
        </Reveal>

        <Reveal className={styles.copy} delay={80}>
          <p className="eyebrow eyebrow--rose">{team.eyebrow}</p>
          <h2 className="h2">{team.h2}</h2>
          <p className={styles.body}>{team.body}</p>
          <a href="#book" className="btn btn--primary">
            {cta.header}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
