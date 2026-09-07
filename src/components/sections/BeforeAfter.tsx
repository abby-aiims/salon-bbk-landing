"use client";

import Image from "next/image";
import { useId, useState } from "react";

import styles from "./BeforeAfter.module.css";

type Pic = { src: string; width: number; height: number; alt: string };

/**
 * Draggable comparison. A native range input drives the reveal, so it is
 * keyboard operable and works with touch without any pointer maths.
 */
export function BeforeAfter({ before, after, caption }: { before: Pic; after: Pic; caption: string }) {
  const [value, setValue] = useState(50);
  const id = useId();

  return (
    <figure className={styles.figure}>
      <div className={styles.frame} style={{ "--split": `${value}%` } as React.CSSProperties}>
        <Image
          src={after.src}
          alt={after.alt}
          width={after.width}
          height={after.height}
          sizes="(min-width: 700px) 33vw, 100vw"
          loading="lazy"
          className={styles.image}
        />
        <div className={styles.beforeWrap}>
          <Image
            src={before.src}
            alt={before.alt}
            width={before.width}
            height={before.height}
            sizes="(min-width: 700px) 33vw, 100vw"
            loading="lazy"
            className={styles.image}
          />
        </div>
        <span className={`badge ${styles.labelBefore}`}>Before</span>
        <span className={`badge ${styles.labelAfter}`}>After</span>
        <div className={styles.handle} aria-hidden="true">
          <span className={styles.knob} />
        </div>
        <input
          id={id}
          className={styles.range}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          aria-label={`Compare before and after: ${caption}`}
        />
      </div>
      <figcaption className="caption">{caption}</figcaption>
    </figure>
  );
}
