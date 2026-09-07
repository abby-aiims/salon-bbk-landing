"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./SocialStrip.module.css";
import { social } from "@/content/home";
import { site } from "@/content/site";

/**
 * A marquee of the salon's reels, running continuously and looping seamlessly,
 * each tile playing its own clip on loop.
 *
 * Three things about the tiles are worth knowing before changing them.
 *
 * A self-hosted MP4 is the only way a tile can play by itself: muted, inline
 * and looping is what browsers allow to autoplay. Instagram's embed cannot, so
 * a tile whose `video` is empty falls back to that reel's own embed instead.
 *
 * The media is only mounted once the strip is close to the viewport, so the
 * section costs nothing above the fold. That matters most for the embed
 * fallback, roughly 600KB of markup each, but it keeps the MP4s off the
 * critical path too.
 *
 * The track carries two passes of the six, so twelve elements exist but only
 * the handful actually on screen are left playing. Phones cap how many video
 * streams they will decode at once, and a tile scrolled past the edge of the
 * strip is worth nothing to anyone.
 */
export function SocialStrip() {
  const ref = useRef<HTMLElement>(null);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setMount(true);
          observer.disconnect();
        }
      },
      // Start loading a screen early so the tiles are ready on arrival.
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Built on first use rather than in an effect, because the tiles' refs are
  // attached before effects run and would otherwise have nothing to register
  // with. Torn down when the section unmounts.
  const playback = useRef<IntersectionObserver | null>(null);

  const watchPlayback = useCallback((video: HTMLVideoElement) => {
    if (typeof IntersectionObserver === "undefined") return;

    playback.current ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const tile = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            // Rejects if the tile leaves again before playback starts, which
            // is exactly the case we would ignore anyway.
            void tile.play().catch(() => {});
          } else {
            tile.pause();
          }
        }
      },
      // A tile just off the edge is about to be read, so let it get going.
      { rootMargin: "100px 200px" },
    );

    const observer = playback.current;
    observer.observe(video);
    return () => observer.unobserve(video);
  }, []);

  useEffect(() => () => playback.current?.disconnect(), []);

  // Two passes of the same six, so the track can translate by half its width
  // and start over without a seam. The clones are hidden from assistive tech.
  const passes = [false, true];

  return (
    <section className={styles.section} id="instagram" ref={ref}>
      <div className="container">
        <Reveal className={styles.head}>
          <div className={styles.headText}>
            <p className="eyebrow eyebrow--rose">{social.eyebrow}</p>
            <h2 className="h2">{social.h2}</h2>
            <p className={styles.intro}>{social.intro}</p>
          </div>
          <a href={site.instagram} className="link" target="_blank" rel="noreferrer noopener">
            {social.link}
            <Icon name="arrow_forward" className="icon--ink" />
          </a>
        </Reveal>
      </div>

      <div className={styles.marquee}>
        <ul className={styles.track}>
          {passes.map((clone) =>
            social.reels.map((reel, index) => (
              <li
                className={reel.video ? styles.tile : `${styles.tile} ${styles.tileEmbed}`}
                key={`${clone ? "clone" : "reel"}-${reel.id}`}
                aria-hidden={clone || undefined}
              >
                {!mount ? (
                  <span className={styles.placeholder} aria-hidden="true" />
                ) : reel.video ? (
                  <video
                    className={styles.video}
                    ref={watchPlayback}
                    src={reel.video}
                    poster={reel.poster || undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    tabIndex={-1}
                  />
                ) : (
                  <iframe
                    className={styles.embed}
                    src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                    title={`Salon BBK reel ${index + 1} on Instagram`}
                    loading="lazy"
                    scrolling="no"
                    allowFullScreen
                    tabIndex={clone ? -1 : undefined}
                  />
                )}
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
