"use client";

import { useState } from "react";

import { Icon } from "../Icon";
import { Reveal } from "../Reveal";
import styles from "./BrowFinder.module.css";
import { finder, type ServiceKey } from "@/content/home";
import { cta } from "@/content/site";

type Answers = { now?: string; look?: string; last?: string };
type ResultKey = Exclude<ServiceKey, "lash">;

/**
 * Fenty's "find your shade" as Find Your Perfect Brow. Three radio-card
 * questions, client state only. Mapping per the build prompt: a year-plus,
 * powdered or sparse leans Ombre; fluffy leans Lamination; clean and defined
 * leans HD; needs both shape and colour leans Hybrid.
 */
function recommend({ now, look, last }: Required<Answers>): ResultKey {
  if (last === "year") return "ombre";
  if (look === "powdered") return "ombre";
  if (look === "fluffy") return now === "sparse" || now === "fine" ? "hybrid" : "lamination";
  if (look === "defined") return now === "unruly" ? "hybrid" : "hd";
  // Natural, just tidied
  if (now === "sparse" && last === "months") return "hybrid";
  return "hd";
}

export function BrowFinder() {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const complete = Boolean(answers.now && answers.look && answers.last);
  const result = complete ? recommend(answers as Required<Answers>) : null;
  const question = finder.questions[step];

  const choose = (id: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (step < finder.questions.length - 1) setStep(step + 1);
  };

  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  const prefill = () => {
    if (result) window.dispatchEvent(new CustomEvent("bbk:prefill", { detail: result }));
  };

  return (
    <section className={`section ${styles.section}`} id="finder">
      <div className="container">
        <Reveal className="head head--center">
          <p className="eyebrow eyebrow--rose">{finder.eyebrow}</p>
          <h2 className="h2">{finder.h2}</h2>
          <p className="lede">{finder.intro}</p>
        </Reveal>

        <Reveal className={styles.panel}>
          {!result ? (
            <fieldset className={styles.step} key={question.id}>
              <legend className={styles.legend}>
                <span className={styles.progress} role="img" aria-label={`Question ${step + 1} of ${finder.questions.length}`}>
                  {finder.questions.map((q, index) => (
                    <span
                      key={q.id}
                      className={`${styles.dot} ${index <= step ? styles.dotActive : ""}`}
                      aria-hidden="true"
                    />
                  ))}
                </span>
                <span className={`h3 ${styles.question}`}>{question.label}</span>
              </legend>

              <div className={styles.options}>
                {question.options.map((option) => {
                  const checked = answers[question.id as keyof Answers] === option.value;
                  return (
                    <label key={option.value} className={`${styles.option} ${checked ? styles.optionChecked : ""}`}>
                      <input
                        className="visually-hidden"
                        type="radio"
                        name={`finder-${question.id}`}
                        value={option.value}
                        checked={checked}
                        onChange={() => choose(question.id, option.value)}
                      />
                      <span>{option.label}</span>
                      {checked && <Icon name="check" className="icon--sm" />}
                    </label>
                  );
                })}
              </div>

              {step > 0 && (
                <button type="button" className={`link ${styles.back}`} onClick={() => setStep(step - 1)}>
                  Back
                </button>
              )}
            </fieldset>
          ) : (
            <div className={styles.result} role="status" aria-live="polite">
              <p className="eyebrow eyebrow--rose">{finder.resultLabel}</p>
              <h3 className={`h2 ${styles.resultName}`}>{finder.results[result].name}</h3>
              <p className={styles.reason}>{finder.results[result].reason}</p>
              <div className={styles.resultActions}>
                <a href="#book" className="btn btn--primary" data-service={result} onClick={prefill}>
                  {cta.finderResult}
                </a>
                <button type="button" className={`link ${styles.back}`} onClick={reset}>
                  Start again
                </button>
              </div>
            </div>
          )}
        </Reveal>

        <p className={`caption ${styles.fallback}`}>{finder.fallback}</p>
      </div>
    </section>
  );
}
