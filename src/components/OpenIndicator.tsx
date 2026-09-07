"use client";

import { useEffect, useState } from "react";

import styles from "./OpenIndicator.module.css";
import { locations, site } from "@/content/site";
import { openState, type OpenState } from "@/lib/hours";

/**
 * Live open pill, computed in Sydney time so an interstate visitor sees
 * whether the salon is open, not whether it is business hours where they sit.
 * Renders a neutral line until mounted so server and client markup match.
 */
export function OpenIndicator({ className = "" }: { className?: string }) {
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const read = () => {
      try {
        setState(openState(locations, site.timezone));
      } catch {
        setState(null);
      }
    };
    read();
    const id = window.setInterval(read, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const text = !state
    ? "Smithfield & Clemton Park"
    : state.open
      ? `Open now · ${state.location} until ${state.until}`
      : `Next open ${state.next} · ${state.location}`;

  return (
    <p
      className={`${styles.pill} ${state?.open ? styles.open : ""} ${className}`.trim()}
      role="status"
      aria-live="polite"
    >
      <span className={styles.dot} aria-hidden="true" />
      {text}
    </p>
  );
}
