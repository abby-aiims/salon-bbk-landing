"use client";

import { useEffect, useState } from "react";

import { Icon } from "./Icon";
import styles from "./StickyBar.module.css";
import { cta, primaryLocation, telHref } from "@/content/site";

/**
 * Fixed bottom bar on mobile: Call and Book Now. On a phone this is where most
 * conversions come from. Hidden while either form band is in view, so it never
 * covers the submit button.
 */
export function StickyBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const bands = Array.from(document.querySelectorAll<HTMLElement>("[data-form-band]"));
    if (bands.length === 0 || typeof IntersectionObserver === "undefined") return;

    const visible = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0.15 },
    );
    bands.forEach((band) => observer.observe(band));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.bar} ${hidden ? styles.hidden : ""}`} aria-hidden={hidden}>
      <a href={telHref(primaryLocation.phone)} className="btn btn--secondary" data-call="sticky">
        <Icon name="call" className="icon--sm icon--ink" />
        Call
      </a>
      <a href="#book" className="btn btn--primary">
        <Icon name="calendar_month" className="icon--sm icon--ink" />
        {cta.header}
      </a>
    </div>
  );
}
