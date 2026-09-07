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
      // Optional. Free text is fine: "Saturday morning" is a usable preference.
      if (value.length > 120) return "Keep it under 120 characters.";
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
