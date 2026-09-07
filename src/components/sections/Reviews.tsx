"use client";

import { useEffect, useRef, useState } from "react";

import { GoogleMark } from "../GoogleMark";
import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./Reviews.module.css";
import { reviews } from "@/content/home";
import { primaryLocation } from "@/content/site";

/**
 * Six real Google reviews as hairline-divided columns, three to a view, paged
 * by the arrows. The track is a native scroll-snap region, so swipe and
 * keyboard scrolling work whether or not the buttons are used; the arrows only
 * add a pointer affordance and hide themselves when everything already fits.
 */
export function Reviews() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pageable, setPageable] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const read = () => {
      const overflow = track.scrollWidth - track.clientWidth;
      setPageable(overflow > 8);
      setAtStart(track.scrollLeft <= 8);
      setAtEnd(track.scrollLeft >= overflow - 8);
    };

    read();
    track.addEventListener("scroll", read, { passive: true });
    window.addEventListener("resize", read);
    return () => {
      track.removeEventListener("scroll", read);
      window.removeEventListener("resize", read);
    };
  }, []);

  /** One view at a time, so a page of three steps to the next three. */
  const page = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="section" id="reviews">
      <div className="container">
        <Reveal className={styles.head}>
          <div className={styles.headText}>
            <p className="eyebrow eyebrow--rose">{reviews.eyebrow}</p>
            <h2 className="h2">{reviews.h2}</h2>
          </div>
          <p className={styles.summary}>{reviews.summaryLine}</p>
        </Reveal>

        <div className={styles.frame}>
          <ul className={styles.track} ref={trackRef} tabIndex={0} aria-label="Google reviews">
            {reviews.items.map((review) => (
              <li key={review.name} className={styles.item}>
                <span className={styles.mark} aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote className={styles.quote}>
                  <p>{review.quote}</p>
                </blockquote>
                <footer className={styles.who}>
                  <p className={styles.name}>{review.name}</p>
                  <p className={styles.tag}>
                    <GoogleMark />
                    Google review · {review.tag}
                  </p>
                </footer>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.foot}>
          <a href={primaryLocation.googleUrl} className="link" target="_blank" rel="noreferrer noopener">
            {reviews.link}
            <Icon name="arrow_forward" className="icon--ink" />
          </a>

          {pageable && (
            <div className={styles.nav}>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => page(-1)}
                disabled={atStart}
                aria-label="Previous reviews"
              >
                <Icon name="arrow_forward" className={`${styles.flip} icon--ink`} />
              </button>
              <button
                type="button"
                className={styles.arrow}
                onClick={() => page(1)}
                disabled={atEnd}
                aria-label="More reviews"
              >
                <Icon name="arrow_forward" className="icon--ink" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
