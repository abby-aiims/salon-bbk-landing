import Image from "next/image";

import { Reveal } from "../Reveal";
import { LeadForm } from "./LeadForm";
import styles from "./BookingBand.module.css";
import { finalCta, form } from "@/content/home";

/**
 * The form band, used twice: first directly after services (id "book", the
 * anchor every CTA targets) and again as the final band with the three-model
 * landscape as a left column on desktop.
 */
export function BookingBand({ variant }: { variant: "first" | "final" }) {
  const isFinal = variant === "final";
  const copy = isFinal
    ? { eyebrow: finalCta.eyebrow, h2: finalCta.h2, subline: finalCta.subline }
    : { eyebrow: form.eyebrow, h2: form.h2, subline: form.subline };

  return (
    <section
      className={`section section--blush ${styles.band} ${isFinal ? styles.final : ""}`}
      id={isFinal ? "book-final" : "book"}
      data-form-band
    >
      <div className={`container ${styles.grid}`}>
        {isFinal && (
          <Reveal className={styles.media}>
            <Image
              src={finalCta.image.src}
              alt={finalCta.image.alt}
              width={finalCta.image.width}
              height={finalCta.image.height}
              sizes="(min-width: 1000px) 40vw, 100vw"
              loading="lazy"
              className={styles.image}
            />
          </Reveal>
        )}

        <Reveal className={styles.card}>
          <div className={styles.cardHead}>
            <p className="eyebrow eyebrow--rose">{copy.eyebrow}</p>
            <h2 className={`h2 ${styles.h2}`}>{copy.h2}</h2>
            <p className={styles.subline}>{copy.subline}</p>
          </div>
          <LeadForm id={isFinal ? "book-final" : "book"} sourcePage="/" />
        </Reveal>
      </div>
    </section>
  );
}
