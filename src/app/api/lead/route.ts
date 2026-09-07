import { NextResponse, type NextRequest } from "next/server";

import { site } from "@/content/site";
import { LEAD_FIELDS, locationForCopy, validateLead, type Lead } from "@/lib/lead";

export const runtime = "nodejs";

const MIN_FILL_MS = 3000;
const TRACKING_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

type Payload = Record<string, string>;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);
}

async function readPayload(request: NextRequest): Promise<{ payload: Payload; wantsJson: boolean }> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    const body = (await request.json()) as Record<string, unknown>;
    const payload: Payload = {};
    for (const [key, value] of Object.entries(body)) {
      if (value === null || value === undefined) continue;
      payload[key] = String(value);
    }
    return { payload, wantsJson: true };
  }
  const data = await request.formData();
  const payload: Payload = {};
  data.forEach((value, key) => {
    payload[key] = String(value);
  });
  const wantsJson = (request.headers.get("accept") ?? "").includes("application/json");
  return { payload, wantsJson };
}

/**
 * Delivers the lead by email through Resend's REST API (no SDK). Without a
 * key the lead is logged so the page still redirects in development.
 * Open item 7 covers the key, the verified domain and extra recipients.
 */
async function deliver(lead: Lead, extras: Payload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_TO_EMAIL || site.email;
  const from = process.env.LEAD_FROM_EMAIL || `Salon BBK Website <onboarding@resend.dev>`;

  const rows = [
    ["Name", `${lead.firstName} ${lead.lastName}`],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Preferred location", lead.location],
    ["Preferred service", lead.service],
    ["Preferred date and time", lead.datetime || "Not given"],
    ["How they heard about us", lead.source || "Not given"],
    ...Object.entries(extras).map(([key, value]) => [key, value]),
  ];

  const subject = `New brow consultation enquiry: ${lead.firstName} ${lead.lastName} (${locationForCopy(lead.location)})`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<h2 style="font-family:sans-serif">New brow consultation enquiry</h2>` +
    `<table style="font-family:sans-serif;font-size:15px;border-collapse:collapse">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px 6px 0;color:#5c4a4c">${escapeHtml(k)}</td><td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
      )
      .join("") +
    `</table>`;

  if (!apiKey) {
    console.info("[lead] RESEND_API_KEY not set. Lead logged only.\n" + text);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: lead.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}: ${await response.text()}`);
  }
}

export async function POST(request: NextRequest) {
  const { payload, wantsJson } = await readPayload(request);

  // Spam: honeypot filled, or submitted under three seconds after mount (only
  // enforceable when JavaScript stamped the mount time).
  const honeypot = (payload.website ?? "").trim();
  const startedAt = Number(payload.startedAt);
  const tooFast = Number.isFinite(startedAt) && startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    // Pretend it worked. A bot learns nothing; a person never hits this path.
    return finish(request, wantsJson, payload, true);
  }

  const lead = Object.fromEntries(LEAD_FIELDS.map((f) => [f, (payload[f] ?? "").trim()])) as Lead;
  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) {
    if (wantsJson) return NextResponse.json({ ok: false, errors }, { status: 400 });
    // No-JavaScript path: back to the form with a flag. Typed values are lost,
    // which is acceptable for the rare case the browser's own required checks
    // did not already catch it.
    return NextResponse.redirect(new URL("/?error=1#book", request.url), 303);
  }

  const extras: Payload = {};
  for (const key of [...TRACKING_KEYS, "sourcePage", "formId"]) {
    if (payload[key]) extras[key] = payload[key];
  }

  try {
    await deliver(lead, extras);
  } catch (error) {
    console.error("[lead] delivery failed", error);
    if (wantsJson) return NextResponse.json({ ok: false }, { status: 502 });
    return NextResponse.redirect(new URL("/?error=send#book", request.url), 303);
  }

  return finish(request, wantsJson, lead, false);
}

function finish(request: NextRequest, wantsJson: boolean, data: Payload, silent: boolean) {
  const query = new URLSearchParams({
    name: silent ? "" : (data.firstName ?? "").trim(),
    location: locationForCopy(data.location ?? ""),
  });
  const redirect = "/thank-you?" + query.toString();
  if (wantsJson) return NextResponse.json({ ok: true, redirect });
  return NextResponse.redirect(new URL(redirect, request.url), 303);
}
