import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./Faq.module.css";
import { faq } from "@/content/home";
import { primaryLocation, site, telHref } from "@/content/site";

/** Native details/summary: works without JavaScript and is keyboard operable. */
export function Faq() {
  return (
    <section className="section section--blush" id="faq">
      <div className={`container ${styles.inner}`}>
        <Reveal className="head head--center">
          <h2 className="h2">{faq.h2}</h2>
        </Reveal>

        <div className={styles.list}>
          {faq.items.map((item, index) => (
            <Reveal as="div" key={item.q} delay={index * 40}>
              <details className={styles.item} open={index === 0}>
                <summary className={styles.summary}>
                  <span>{item.q}</span>
                  <Icon name="expand_more" className={`${styles.chevron} icon--ink`} />
                </summary>
                <p className={styles.answer}>{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className={styles.closing}>
            {faq.closing} Call{" "}
            <a href={telHref(primaryLocation.phone)} data-call="faq">
              {primaryLocation.phone}
            </a>{" "}
            or email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
