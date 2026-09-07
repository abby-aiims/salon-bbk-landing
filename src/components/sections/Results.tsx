import { Reveal } from "../Reveal";
import { BeforeAfter } from "./BeforeAfter";
import styles from "./Results.module.css";
import { results } from "@/content/home";
import { cta, site } from "@/content/site";

/**
 * "Real brows, real results". Built and styled, rendered only when
 * NEXT_PUBLIC_SHOW_RESULTS is true (open item 3). The pairs in content/home.ts
 * are campaign placeholders so the client can see exactly what to shoot.
 */
export function Results() {
  if (!site.showResults) return null;

  return (
    <section className="section" id="results">
      <div className="container">
        <Reveal className="head head--center">
          <p className="eyebrow eyebrow--rose">{results.eyebrow}</p>
          <h2 className="h2">{results.h2}</h2>
          <p className="lede">{results.intro}</p>
        </Reveal>

        <ul className={styles.grid}>
          {results.pairs.map((pair, index) => (
            <Reveal as="li" key={pair.caption} delay={index * 60}>
              <BeforeAfter before={pair.before} after={pair.after} caption={pair.caption} />
            </Reveal>
          ))}
        </ul>

        <Reveal className={styles.actions}>
          <a href="#finder" className="btn btn--secondary">
            {cta.finder}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
