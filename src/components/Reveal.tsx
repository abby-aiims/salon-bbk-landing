"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fade-up 16px on section enter, once. Reduced motion is handled in CSS: the
 * element starts visible and the class toggle is a no-op.
 *
 * The element starts at opacity 0, so every path out of this effect must end
 * with it shown. Carried over from the Pure Reformer build, where a hidden tab
 * once left an entire page invisible.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    let delivered = false;
    const observer = new IntersectionObserver(
      (entries) => {
        delivered = true;
        for (const entry of entries) {
          if (entry.isIntersecting || entry.boundingClientRect.top <= 0) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);

    const failsafe = window.setTimeout(() => {
      if (!delivered) {
        setShown(true);
        observer.disconnect();
      }
    }, 1500);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
