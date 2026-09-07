/**
 * Lead shape and validation shared by the form (client) and the API route
 * (server). One set of rules, so a lead the browser accepts is a lead the
 * server accepts.
 */

import { form, serviceOptions } from "@/content/home";

export const LEAD_FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "email",
  "location",
  "service",
  "datetime",
  "source",
] as const;

export type LeadField = (typeof LEAD_FIELDS)[number];
export type Lead = Record<LeadField, string>;
export type LeadErrors = Partial<Record<LeadField, string>>;

/** AU mobile and landline, with or without spaces, optional +61. */
const AU_PHONE = /^(?:\+?61|0)[2-478][\d\s-]{7,12}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const SERVICE_LABELS = serviceOptions.map((o) => o.label);
export const LOCATION_LABELS = form.locationOptions;
export const SOURCE_LABELS = form.sourceOptions;

export function validateField(field: LeadField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "firstName":
      if (!value) return "Enter your first name.";
      if (value.length > 60) return "Keep it under 60 characters.";
      return undefined;
    case "lastName":
      if (!value) return "Enter your last name.";
      if (value.length > 60) return "Keep it under 60 characters.";
      return undefined;
    case "phone":
      if (!value) return "Enter a phone number.";
      if (!AU_PHONE.test(value)) return "Enter an Australian number, like 0400 000 000.";
      return undefined;
    case "email":
      if (!value) return "Enter an email address.";
      if (!EMAIL.test(value)) return "Enter a valid email, like jane@email.com.";
      return undefined;
    case "location":
      if (!LOCATION_LABELS.includes(value)) return "Choose a location.";
      return undefined;
    case "service":
      if (!SERVICE_LABELS.includes(value)) return "Choose a service, or \"Not sure\".";
      return undefined;
    case "datetime":
      // Optional: someone with no date in mind should not be stopped here.
      if (!value) return undefined;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Choose a date from the calendar.";
      {
        const chosen = dayNumber(value);
        if (chosen === undefined) return "Choose a date from the calendar.";
        const today = dayNumber(todayISO())!;
        // A day of slack, so a lead sent either side of midnight or from a
        // different timezone to the server is never rejected as stale.
        if (chosen < today - 1) return "Choose a date from today onwards.";
        if (chosen > today + 366) return "Choose a date within the next year.";
      }
      return undefined;
    case "source":
      if (value && !SOURCE_LABELS.includes(value)) return "Choose an option.";
      return undefined;
  }
}

export function validateLead(lead: Lead): LeadErrors {
  const errors: LeadErrors = {};
  for (const field of LEAD_FIELDS) {
    const message = validateField(field, lead[field] ?? "");
    if (message) errors[field] = message;
  }
  return errors;
}

/** Location the confirmation text names. "Either" falls back to the brand. */
export function locationForCopy(value: string): string {
  if (value.startsWith("Smithfield")) return "Smithfield";
  if (value.startsWith("Clemton")) return "Clemton Park";
  return "Salon BBK";
}

/** Local calendar date as YYYY-MM-DD, which is what a date input reads and writes. */
function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function todayISO(): string {
  return toISODate(new Date());
}

/** Whole days since the epoch, so two dates compare without any time in play. */
function dayNumber(iso: string): number | undefined {
  const [y, m, d] = iso.split("-").map(Number);
  const stamp = Date.UTC(y, m - 1, d);
  if (Number.isNaN(stamp)) return undefined;
  // Reject dates the calendar would have rolled over, like 2026-02-31.
  const back = new Date(stamp);
  if (back.getUTCMonth() !== m - 1 || back.getUTCDate() !== d) return undefined;
  return Math.floor(stamp / 86400000);
}

/**
 * Range the preferred-date calendar offers: today through a year out. Computed
 * in the browser rather than at build time, since the page is prerendered and
 * a baked-in "today" would go stale the next morning.
 */
export function calendarBounds(): { min: string; max: string } {
  const today = new Date();
  const max = new Date(today);
  max.setFullYear(max.getFullYear() + 1);
  return { min: toISODate(today), max: toISODate(max) };
}

/** "Sat 14 Mar 2026" for the confirmation email. Falls back to the raw value. */
export function formatLeadDate(iso: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
