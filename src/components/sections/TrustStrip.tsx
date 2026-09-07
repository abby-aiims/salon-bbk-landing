import Image from "next/image";

import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./TrustStrip.module.css";
import { trust, trustLabel } from "@/content/home";

/**
 * Four cards on a blush ground: index top left, icon top right, the claim
 * centred, and a shared footer label under a hairline.
 */
export function TrustStrip() {
  const total = String(trust.length).padStart(2, "0");

  return (
    <section className={styles.strip}>
      <h2 className="visually-hidden">{trustLabel}</h2>
      <ul className={`container ${styles.list}`}>
        {trust.map((item, index) => (
          <Reveal as="li" key={item.icon} delay={index * 60} className={styles.card}>
            <p className={styles.index}>
              {String(index + 1).padStart(2, "0")} / {total}
            </p>
            {"logo" in item && item.logo ? (
              <Image
                src={item.logo.src}
                alt=""
                width={item.logo.width}
                height={item.logo.height}
                className={styles.logo}
              />
            ) : (
              <Icon name={item.icon} className={styles.icon} />
            )}
            <div className={styles.body}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.body}</p>
            </div>
            <p className={styles.footnote}>{trustLabel}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
