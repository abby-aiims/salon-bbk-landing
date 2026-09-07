"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { Icon } from "./Icon";
import { Logo } from "./Logo";
import styles from "./Header.module.css";
import { cta, nav, primaryLocation, site, telHref } from "@/content/site";

/**
 * Transparent over the hero photograph, solid white once scrolled past it.
 *
 * Below 1100px the links and the CTA move into a panel behind a menu button.
 * The header forces its solid state while the panel is open, otherwise the
 * white menu bars would sit on the white panel and disappear.
 */
export function Header() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    // Stop the page scrolling behind the panel.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const links = nav.filter((item) => !("flag" in item) || site.showResults);
  const solid = stuck || open;

  return (
    <header
      className={`${styles.header} ${solid ? styles.stuck : styles.overlay} ${open ? styles.pinned : ""}`}
    >
      {/* The bar's fill and blur live on their own layer. A backdrop-filter on
          the header itself would make it the containing block for the fixed
          panel below, which would then be clipped to the height of the bar. */}
      <span className={styles.bg} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          <Logo tone={solid ? "brand" : "inherit"} className={styles.logoMark} />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {links.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            href={telHref(primaryLocation.phone)}
            className={styles.phone}
            data-call="header"
            aria-label={`Call ${primaryLocation.phone}`}
          >
            <Icon name="call" className={`${styles.phoneIcon} icon--sm`} />
            <span className={styles.phoneLabel}>Call {primaryLocation.phone}</span>
          </a>

          <a href="/#book" className={`btn ${stuck ? "btn--primary" : "btn--light"} ${styles.cta}`}>
            {cta.header}
          </a>

          <button
            className={styles.toggle}
            type="button"
            ref={toggleRef}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Menu"}</span>
            <span className={`${styles.bars} ${open ? styles.barsOpen : ""}`} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`${styles.panel} ${open ? styles.panelOpen : ""}`} id="menu" ref={panelRef} hidden={!open}>
        <nav className={styles.panelNav} aria-label="Primary, mobile">
          {links.map((item) => (
            <a key={item.href} href={item.href} className={styles.panelLink} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.panelFoot}>
          <a
            href={telHref(primaryLocation.phone)}
            className={styles.panelPhone}
            data-call="menu"
            onClick={() => setOpen(false)}
          >
            <Icon name="call" className="icon--sm" />
            Call {primaryLocation.phone}
          </a>
          <a href="/#book" className="btn btn--primary btn--block" onClick={() => setOpen(false)}>
            {cta.primary}
          </a>
        </div>
      </div>
    </header>
  );
}
