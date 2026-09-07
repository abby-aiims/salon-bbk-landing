"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { locationForCopy, type Lead } from "./lead";

/** Attribution carried from the landing URL through to the lead. */
const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type LeadStatus = "idle" | "sending" | "failed";

/**
 * What the two forms on the page share: attribution capture, the POST to
 * /api/lead, the GTM event and the hand-off to /thank-you.
 *
 * The inline section form and the booking modal differ only in how they lay
 * their fields out, so the half that talks to the server lives here instead of
 * being written twice and drifting apart.
 */
export function useLeadSubmit(id: string, sourcePage: string) {
  const router = useRouter();
  const [status, setStatus] = useState<LeadStatus>("idle");
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
  }, []);

  /** Resolves false when the send failed, so the caller can stay where it is. */
  const send = async (lead: Lead, website: FormDataEntryValue | null) => {
    setStatus("sending");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...lead,
          website,
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
      return true;
    } catch {
      setStatus("failed");
      return false;
    }
  };

  return { status, setStatus, mountedAt, send };
}
