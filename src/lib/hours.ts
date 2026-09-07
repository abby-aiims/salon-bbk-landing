import type { DayIndex, HoursTable, Location } from "@/content/site";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type OpenState =
  | { open: true; location: string; until: string }
  | { open: false; location: string; next: string };

/** Current day index and decimal hour in a given IANA timezone. */
export function nowIn(timezone: string, at: Date = new Date()): { day: DayIndex; hour: number } {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: timezone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(at);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const day = Math.max(0, DAY_NAMES.findIndex((d) => weekday.startsWith(d))) as DayIndex;

  return { day, hour: hour + minute / 60 };
}

/** 9 -> "9am", 17.5 -> "5:30pm", 21 -> "9pm". */
export function formatHour(value: number): string {
  const whole = Math.floor(value);
  const minutes = Math.round((value - whole) * 60);
  const suffix = whole >= 12 ? "pm" : "am";
  const twelve = whole % 12 === 0 ? 12 : whole % 12;
  return minutes ? `${twelve}:${String(minutes).padStart(2, "0")}${suffix}` : `${twelve}${suffix}`;
}

function isOpenAt(hours: HoursTable, day: DayIndex, hour: number): [number, number] | null {
  const slot = hours[day];
  if (!slot) return null;
  return hour >= slot[0] && hour < slot[1] ? slot : null;
}

/** Next opening after (day, hour), searching up to a week ahead. */
function nextOpening(hours: HoursTable, day: DayIndex, hour: number): { day: DayIndex; open: number } | null {
  for (let offset = 0; offset < 7; offset++) {
    const d = ((day + offset) % 7) as DayIndex;
    const slot = hours[d];
    if (!slot) continue;
    if (offset === 0 && hour >= slot[0]) continue;
    return { day: d, open: slot[0] };
  }
  return null;
}

/**
 * Open state across the salons: whichever is open now wins (Smithfield first
 * as the primary), otherwise the soonest to open.
 */
export function openState(locations: Location[], timezone: string, at: Date = new Date()): OpenState {
  const { day, hour } = nowIn(timezone, at);

  for (const location of locations) {
    const slot = isOpenAt(location.hours, day, hour);
    if (slot) {
      return { open: true, location: location.shortName, until: formatHour(slot[1]) };
    }
  }

  let best: { location: Location; day: DayIndex; open: number; distance: number } | null = null;
  for (const location of locations) {
    const next = nextOpening(location.hours, day, hour);
    if (!next) continue;
    const dayDistance = (next.day - day + 7) % 7;
    const distance = dayDistance * 24 + next.open - (dayDistance === 0 ? hour : 0);
    if (!best || distance < best.distance) best = { location, ...next, distance };
  }

  if (!best) return { open: false, location: locations[0].shortName, next: "soon" };

  const label = best.day === day ? "today" : DAY_NAMES[best.day];
  return {
    open: false,
    location: best.location.shortName,
    next: `${label} ${formatHour(best.open)}`,
  };
}
