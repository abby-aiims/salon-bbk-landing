import { GoogleMark } from "./GoogleMark";
import styles from "./Footer.module.css";
import { footer } from "@/content/home";
import { locations, nav, site, telHref } from "@/content/site";

/**
 * Light footer: blurb and place, the two salons, the link column, and a
 * booking prompt where the reference puts its newsletter. The wordmark then
 * runs the full width of the container as the closing mark, set in Glorify at
 * the size that spans it exactly (the face measures 5.456em for "SALON BBK").
 */
export function Footer() {
  const year = new Date().getFullYear();
  const anchors = nav.filter((item) => !("flag" in item) || site.showResults);

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <p className={styles.blurb}>{footer.blurb}</p>
          <p className={styles.place}>{footer.place}</p>
          <p className={styles.meta}>
            <a href={site.instagram} target="_blank" rel="noreferrer noopener">
              Instagram {site.instagramHandle}
            </a>
          </p>
          <p className={`${styles.meta} ${styles.rating}`}>
            <GoogleMark />
            {site.rating} on Google · {site.reviewCount} reviews
          </p>
        </div>

        {locations.map((location) => (
          <div key={location.slug} className={styles.col}>
            <h3 className={styles.colTitle}>{location.shortName}</h3>
            <address className={styles.address}>{location.addressLine}</address>
            <p className={styles.meta}>
              <a href={telHref(location.phone)} data-call={`footer-${location.slug}`}>
                {location.phone}
              </a>
            </p>
            <ul className={styles.hours}>
              {location.hoursDisplay.map((row) => (
                <li key={row.day}>
                  <span>{row.day}</span>
                  <span>{row.time}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.col}>
          <h3 className={styles.colTitle}>On this page</h3>
          <ul className={styles.links}>
            {anchors.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            {footer.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.cta}>
          <h3 className={styles.colTitle}>{footer.ctaLabel}</h3>
          <p className={styles.ctaBody}>{footer.ctaBody}</p>
          <a href="/#book" className="btn btn--primary">
            {footer.ctaLabel}
          </a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.name}
          {site.abn ? ` · ABN ${site.abn}` : ""} · Afterpay available
        </p>
        <p className={styles.policy}>{footer.policy}</p>
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        Salon BBK
      </p>
    </footer>
  );
}
