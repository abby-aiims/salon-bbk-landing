"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import styles from "./LeadForm.module.css";
import { form, serviceOptions } from "@/content/home";
import { cta, primaryLocation, site, telHref } from "@/content/site";
import {
  LEAD_FIELDS,
  locationForCopy,
  validateField,
  validateLead,
  type Lead,
  type LeadErrors,
  type LeadField,
} from "@/lib/lead";

const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * The primary conversion. A plain HTML form that POSTs to /api/lead, so it
 * works with JavaScript off (the route redirects to /thank-you). With
 * JavaScript on it validates inline, submits with fetch, fires the GTM event
 * and routes to the thank-you page without a reload.
 *
 * Prefill: any click on an element carrying data-service="<key>" (service
 * cards, the brow finder) sets Preferred service; the finder also dispatches a
 * "bbk:prefill" event so the select updates before the scroll lands.
 */
export function LeadForm({ id, sourcePage = "/" }: { id: string; sourcePage?: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const [service, setService] = useState("");
  const [mountedAt, setMountedAt] = useState<number | null>(null);
  const [tracking, setTracking] = useState<Record<string, string>>({});

  useEffect(() => {
    setMountedAt(Date.now());

    const params = new URLSearchParams(window.location.search);
    const found: Record<string, string> = {};
    for (const key of TRACKING_KEYS) {
      let stored: string | null = null;
      try {
        stored = window.sessionStorage.getItem("bbk:" + key);
      } catch {
        // Private mode: attribution is best effort.
      }
      const value = params.get(key) ?? stored;
      if (value) {
        found[key] = value;
        try {
          window.sessionStorage.setItem("bbk:" + key, value);
        } catch {
          // Ignore.
        }
      }
    }
    setTracking(found);

    const applyService = (key: string) => {
      const option = serviceOptions.find((o) => o.key === key);
      if (option) setService(option.label);
    };

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-service]");
      if (!target) return;
      const key = target.dataset.service;
      if (key) applyService(key);
    };

    const onPrefill = (event: Event) => {
      const key = (event as CustomEvent<string>).detail;
      if (key) applyService(key);
    };

    document.addEventListener("click", onClick);
    window.addEventListener("bbk:prefill", onPrefill);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("bbk:prefill", onPrefill);
    };
  }, []);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = event.target.name as LeadField;
    if (!LEAD_FIELDS.includes(field)) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, event.target.value) }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lead = Object.fromEntries(LEAD_FIELDS.map((f) => [f, String(data.get(f) ?? "")])) as Lead;

    const next = validateLead(lead);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...lead,
          website: data.get("website"),
          startedAt: mountedAt,
          sourcePage,
          formId: id,
          ...tracking,
        }),
      });
      if (!response.ok) throw new Error("Lead failed: " + response.status);

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "lead_form_submit",
        form_id: id,
        location: lead.location,
        service: lead.service,
      });

      const query = new URLSearchParams({
        name: lead.firstName.trim(),
        location: locationForCopy(lead.location),
      });
      router.push("/thank-you?" + query.toString());
    } catch {
      setStatus("failed");
    }
  };

  const f = (name: LeadField) => `${id}-${name}`;
  const invalid = (name: LeadField) => (errors[name] ? ` ${styles.invalid}` : "");

  return (
    <form
      ref={formRef}
      className={styles.form}
      method="post"
      action="/api/lead"
      onSubmit={handleSubmit}
      noValidate
    >
      {status === "failed" && (
        <p className={styles.formError} role="alert">
          Something went wrong sending that. Your details are still here, so try again, or call{" "}
          <a href={telHref(primaryLocation.phone)}>{primaryLocation.phone}</a> and we will book you in.
        </p>
      )}
      {Object.keys(errors).length > 0 && (
        <p className={styles.formError} role="alert">
          {form.errorSummary}
        </p>
      )}

      <div className={styles.row}>
        <Field id={f("firstName")} label={form.labels.firstName} error={errors.firstName}>
          <input
            className={styles.input + invalid("firstName")}
            id={f("firstName")}
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? f("firstName") + "-error" : undefined}
            onBlur={handleBlur}
          />
        </Field>
        <Field id={f("lastName")} label={form.labels.lastName} error={errors.lastName}>
          <input
            className={styles.input + invalid("lastName")}
            id={f("lastName")}
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? f("lastName") + "-error" : undefined}
            onBlur={handleBlur}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field id={f("phone")} label={form.labels.phone} error={errors.phone}>
          <input
            className={styles.input + invalid("phone")}
            id={f("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="0400 000 000"
            required
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? f("phone") + "-error" : undefined}
            onBlur={handleBlur}
          />
        </Field>
        <Field id={f("email")} label={form.labels.email} error={errors.email}>
          <input
            className={styles.input + invalid("email")}
            id={f("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? f("email") + "-error" : undefined}
            onBlur={handleBlur}
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field id={f("location")} label={form.labels.location} error={errors.location}>
          <select
            className={styles.select + invalid("location")}
            id={f("location")}
            name="location"
            required
            defaultValue=""
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? f("location") + "-error" : undefined}
            onBlur={handleBlur}
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
        <Field id={f("service")} label={form.labels.service} error={errors.service}>
          <select
            className={styles.select + invalid("service")}
            id={f("service")}
            name="service"
            required
            value={service}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? f("service") + "-error" : undefined}
            onChange={(event) => setService(event.target.value)}
            onBlur={handleBlur}
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
      </div>

      <div className={styles.row}>
        <Field id={f("datetime")} label={form.labels.datetime} optional error={errors.datetime}>
          <input
            className={styles.input + invalid("datetime")}
            id={f("datetime")}
            name="datetime"
            type="text"
            placeholder="e.g. Saturday morning, or Thu after 6pm"
            aria-invalid={Boolean(errors.datetime)}
            aria-describedby={errors.datetime ? f("datetime") + "-error" : undefined}
            onBlur={handleBlur}
          />
        </Field>
        <Field id={f("source")} label={form.labels.source} optional error={errors.source}>
          <select
            className={styles.select + invalid("source")}
            id={f("source")}
            name="source"
            defaultValue=""
            aria-invalid={Boolean(errors.source)}
            onBlur={handleBlur}
          >
            <option value="">Choose one</option>
            {form.sourceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Honeypot. People never see it; anything typed here is a bot. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={f("website" as LeadField)}>Website</label>
        <input id={f("website" as LeadField)} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="startedAt" value={mountedAt ?? ""} />
      <input type="hidden" name="sourcePage" value={sourcePage} />
      <input type="hidden" name="formId" value={id} />

      <button className={`btn btn--primary btn--block ${styles.submit}`} type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending" : cta.submit}
      </button>

      <p className={styles.afterpay}>
        <Image
          src="/images/afterpay-logo.png"
          alt="Afterpay"
          width={739}
          height={161}
          className={styles.afterpayLogo}
        />
        available on every service
      </p>

      <p className={styles.reassure}>
        {form.reassurance.join(" · ")}
        <br />
        {form.timelyPrompt}{" "}
        <a href={site.timely} target="_blank" rel="noreferrer noopener" data-timely>
          {form.timelyLabel}
        </a>
      </p>
    </form>
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
