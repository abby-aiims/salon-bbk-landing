"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./BookingModal.module.css";
import { Icon } from "./Icon";
import { booking, form, serviceOptions } from "@/content/home";
import { cta, primaryLocation, telHref } from "@/content/site";
import {
  calendarBounds,
  validateField,
  validateLead,
  type Lead,
  type LeadErrors,
  type LeadField,
} from "@/lib/lead";
import { useLeadSubmit } from "@/lib/useLeadSubmit";

const EMPTY: Lead = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  location: "",
  service: "",
  datetime: "",
  source: "",
};

/**
 * Split so the first step is the easy half. Choosing a salon, a service and a
 * date is the part someone already knows the answer to, and having answered it
 * they are far likelier to hand over a phone number on the second.
 */
const STEP_ONE: LeadField[] = ["location", "service", "datetime"];

/**
 * The booking form as a modal, in two steps.
 *
 * Mounted once for the whole page. Rather than every CTA having to know about
 * it, this listens for clicks on the anchors that already point at #book and
 * opens instead of letting the page jump. That keeps the buttons working as
 * plain links with JavaScript off, where scrolling to the form on the page is
 * still the right behaviour, and means a new CTA needs nothing but the same
 * href. A CTA carrying data-service (the service cards, the brow finder)
 * preselects that service on the way in.
 */
export function BookingModal({ sourcePage = "/" }: { sourcePage?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const websiteRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<Lead>(EMPTY);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [bounds, setBounds] = useState<{ min?: string; max?: string }>({});

  const { status, setStatus, mountedAt, send } = useLeadSubmit("booking-modal", sourcePage);

  // Today moves and the page is prerendered, so the range is read in the
  // browser rather than baked into the HTML.
  useEffect(() => setBounds(calendarBounds()), []);

  const openModal = useCallback(
    (service?: string) => {
      setStep(1);
      setErrors({});
      setStatus("idle");
      if (service) setValues((prev) => ({ ...prev, service }));
      setOpen(true);
    },
    [setStatus],
  );

  // Opening and closing go through the dialog element itself, so the browser
  // gives us the focus trap, the backdrop and Escape without any of it here.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // "close" does not bubble, so React's onClose never reaches this component
  // and the state would stay open after Escape or the backdrop. Listening on
  // the element directly is what actually catches it, and it covers "cancel"
  // too since Escape fires that first and then closes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  // The page behind a modal should not scroll under it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const labelFor = (key: string) => serviceOptions.find((option) => option.key === key)?.label;

    const onClick = (event: MouseEvent) => {
      // Leave modified clicks alone: they mean open in a new tab, and these
      // are still links.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const link = (event.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href$='#book']");
      if (!link) return;

      event.preventDefault();
      const key = link.dataset.service ?? link.closest<HTMLElement>("[data-service]")?.dataset.service;
      openModal(key ? labelFor(key) : undefined);
    };

    const onPrefill = (event: Event) => {
      const key = (event as CustomEvent<string>).detail;
      const label = key ? labelFor(key) : undefined;
      if (label) setValues((prev) => ({ ...prev, service: label }));
    };

    document.addEventListener("click", onClick);
    window.addEventListener("bbk:prefill", onPrefill);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("bbk:prefill", onPrefill);
    };
  }, [openModal]);

  // Each step lands focus on its first field, so a keyboard and a screen
  // reader both start where the new questions are.
  useEffect(() => {
    if (!open) return;
    bodyRef.current?.querySelector<HTMLElement>("select, input")?.focus();
  }, [open, step]);

  const set = (field: LeadField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear an error the moment it stops being true, not on the next submit.
    setErrors((prev) => (prev[field] ? { ...prev, [field]: validateField(field, value) } : prev));
  };

  const showErrors = (next: LeadErrors) => {
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      requestAnimationFrame(() => {
        bodyRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      });
    }
  };

  const onContinue = () => {
    const next: LeadErrors = {};
    for (const field of STEP_ONE) {
      const message = validateField(field, values[field]);
      if (message) next[field] = message;
    }
    if (Object.keys(next).length > 0) {
      showErrors(next);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validateLead(values);
    if (Object.keys(next).length > 0) {
      // A problem left behind on the first step has to be shown on that step.
      if (STEP_ONE.some((field) => next[field])) setStep(1);
      showErrors(next);
      return;
    }
    await send(values, websiteRef.current?.value ?? "");
  };

  const fieldId = (name: LeadField) => `booking-${name}`;
  const describedBy = (name: LeadField) => (errors[name] ? `${fieldId(name)}-error` : undefined);
  const cls = (base: string, name: LeadField) => `${base}${errors[name] ? ` ${styles.invalid}` : ""}`;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="booking-title"
      onClick={(event) => {
        // A click landing on the dialog itself is a click on the backdrop:
        // everything else sits inside the panel below.
        if (event.target === dialogRef.current) setOpen(false);
      }}
    >
      <div className={styles.panel}>
        <header className={styles.head}>
          <div>
            <p className={styles.stepCount}>
              Step {step} of 2 · {booking.steps[step - 1]}
            </p>
            <h2 className={styles.title} id="booking-title">
              {booking.title}
            </h2>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close booking form"
          >
            <Icon name="close" className="icon--ink" />
          </button>
        </header>

        <div className={styles.progress}>
          <span className={styles.progressFill} data-step={step} />
        </div>

        <form className={styles.form} onSubmit={onSubmit} noValidate>
          {status === "failed" && (
            <p className={styles.formError} role="alert">
              Something went wrong sending that. Your details are still here, so try again, or call{" "}
              <a href={telHref(primaryLocation.phone)}>{primaryLocation.phone}</a> and we will book you in.
            </p>
          )}

          <div className={styles.body} ref={bodyRef}>
            {step === 1 ? (
              <>
                <Field id={fieldId("location")} label={form.labels.location} error={errors.location}>
                  <select
                    className={cls(styles.select, "location")}
                    id={fieldId("location")}
                    name="location"
                    value={values.location}
                    aria-invalid={Boolean(errors.location)}
                    aria-describedby={describedBy("location")}
                    onChange={(event) => set("location", event.target.value)}
                  >
                    <option value="" disabled>
                      Choose a salon
                    </option>
                    {form.locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id={fieldId("service")} label={form.labels.service} error={errors.service}>
                  <select
                    className={cls(styles.select, "service")}
                    id={fieldId("service")}
                    name="service"
                    value={values.service}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={describedBy("service")}
                    onChange={(event) => set("service", event.target.value)}
                  >
                    <option value="" disabled>
                      Choose a service
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option.key} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field id={fieldId("datetime")} label={form.labels.datetime} optional error={errors.datetime}>
                  <input
                    className={cls(styles.input, "datetime")}
                    id={fieldId("datetime")}
                    name="datetime"
                    type="date"
                    min={bounds.min}
                    max={bounds.max}
                    value={values.datetime}
                    aria-invalid={Boolean(errors.datetime)}
                    aria-describedby={describedBy("datetime")}
                    onChange={(event) => set("datetime", event.target.value)}
                  />
                  <p className={styles.hint}>{booking.dateHint}</p>
                </Field>
              </>
            ) : (
              <>
                <div className={styles.row}>
                  <Field id={fieldId("firstName")} label={form.labels.firstName} error={errors.firstName}>
                    <input
                      className={cls(styles.input, "firstName")}
                      id={fieldId("firstName")}
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={values.firstName}
                      aria-invalid={Boolean(errors.firstName)}
                      aria-describedby={describedBy("firstName")}
                      onChange={(event) => set("firstName", event.target.value)}
                    />
                  </Field>
                  <Field id={fieldId("lastName")} label={form.labels.lastName} error={errors.lastName}>
                    <input
                      className={cls(styles.input, "lastName")}
                      id={fieldId("lastName")}
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={values.lastName}
                      aria-invalid={Boolean(errors.lastName)}
                      aria-describedby={describedBy("lastName")}
                      onChange={(event) => set("lastName", event.target.value)}
                    />
                  </Field>
                </div>

                <Field id={fieldId("phone")} label={form.labels.phone} error={errors.phone}>
                  <input
                    className={cls(styles.input, "phone")}
                    id={fieldId("phone")}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0400 000 000"
                    value={values.phone}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={describedBy("phone")}
                    onChange={(event) => set("phone", event.target.value)}
                  />
                </Field>

                <Field id={fieldId("email")} label={form.labels.email} error={errors.email}>
                  <input
                    className={cls(styles.input, "email")}
                    id={fieldId("email")}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@email.com"
                    value={values.email}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy("email")}
                    onChange={(event) => set("email", event.target.value)}
                  />
                </Field>

                <Field id={fieldId("source")} label={form.labels.source} optional error={errors.source}>
                  <select
                    className={cls(styles.select, "source")}
                    id={fieldId("source")}
                    name="source"
                    value={values.source}
                    aria-invalid={Boolean(errors.source)}
                    aria-describedby={describedBy("source")}
                    onChange={(event) => set("source", event.target.value)}
                  >
                    <option value="">Choose one</option>
                    {form.sourceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </Field>
              </>
            )}
          </div>

          {/* Honeypot. People never see it; anything typed here is a bot. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="booking-website">Website</label>
            <input
              id="booking-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              ref={websiteRef}
            />
          </div>

          <footer className={styles.foot}>
            {step === 1 ? (
              <button type="button" className="btn btn--primary btn--block" onClick={onContinue}>
                {booking.next}
              </button>
            ) : (
              <>
                <button type="button" className={styles.back} onClick={() => setStep(1)}>
                  <Icon name="arrow_forward" className={`${styles.flip} icon--ink`} />
                  {booking.back}
                </button>
                <button type="submit" className={`btn btn--primary ${styles.submit}`} disabled={status === "sending"}>
                  {status === "sending" ? "Sending" : cta.submit}
                </button>
              </>
            )}
          </footer>

          <p className={styles.reassure}>{form.reassurance.join(" · ")}</p>
        </form>
      </div>
    </dialog>
  );
}

function Field({
  id,
  label,
  optional = false,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {children}
      {error && (
        <p className={styles.error} id={id + "-error"}>
          {error}
        </p>
      )}
    </div>
  );
}
