/**
 * Site-wide configuration. Phones read from env so call tracking numbers can be
 * swapped in without a code change (open item 1). Everything here is fact from
 * 01-brief/existing-site-audit.md; nothing is invented.
 */

export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Hours in decimal 24h, per day index (0 = Sunday). A missing day is closed. */
export type HoursTable = Partial<Record<DayIndex, [open: number, close: number]>>;

export type Location = {
  slug: "smithfield" | "clemton-park";
  name: string;
  shortName: string;
  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  addressLine: string;
  phone: string;
  hours: HoursTable;
  hoursDisplay: { day: string; time: string }[];
  parking: string;
  directions: string;
  googleReviews: number;
  googleUrl: string;
  mapsCid?: string;
};

const phoneSmithfield = process.env.NEXT_PUBLIC_PHONE_SMITHFIELD || "0403 321 181";
const phoneClemton = process.env.NEXT_PUBLIC_PHONE_CLEMTON || "0488 659 237";

export const site = {
  name: "Salon BBK",
  legalName: "Salon BBK",
  tagline: "Eyebrow specialists & academy",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.salonbbk.com.au",
  locale: "en-AU",
  timezone: "Australia/Sydney",
  email: "info@salonbbk.com.au",
  instagram: "https://www.instagram.com/salonbbk_/",
  instagramHandle: "@salonbbk_",
  timely: "https://bookings.gettimely.com/browsbyklaire/bb/book",
  fullMenu: "https://www.salonbbk.com.au/services",
  academy: "https://www.salonbbk.com.au/the-academy",
  bookingPolicy: "https://www.salonbbk.com.au/important-info",
  abn: process.env.NEXT_PUBLIC_ABN || "",
  /** Combined proof across both Google profiles. Open item 11. */
  rating: "5.0",
  reviewCount: 314,
  clients: "5,000+",
  years: "9+",
  since: "2017",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  showResults: process.env.NEXT_PUBLIC_SHOW_RESULTS === "true",
} as const;

export const cta = {
  primary: "Book Your Brow Consultation",
  /** The hero button is full width on a phone, where the long label wraps. */
  primaryShort: "Book Your Consult",
  header: "Book Now",
  mapping: "Book Your Signature Brow Mapping",
  finder: "Find Your Perfect Brow",
  services: "View Our Services",
  submit: "Book My Appointment",
  finderResult: "Book This For Me",
} as const;

/** Root-relative so the anchors also work from /thank-you and the legal pages. */
export const nav = [
  { label: "Services", href: "/#services" },
  { label: "Why BBK", href: "/#why-bbk" },
  { label: "Results", href: "/#results", flag: "results" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Locations", href: "/#locations" },
] as const;

export const locations: Location[] = [
  {
    slug: "smithfield",
    name: "Salon BBK Smithfield",
    shortName: "Smithfield",
    streetAddress: "691A The Horsley Drive",
    suburb: "Smithfield",
    state: "NSW",
    postcode: "2164",
    addressLine: "691A The Horsley Drive, Smithfield NSW 2164",
    phone: phoneSmithfield,
    // Site hours. Google adds Tue 9 to 5 and Sat to 5; open item 10.
    hours: { 3: [9, 21], 4: [10, 21], 5: [8.5, 17], 6: [8, 16] },
    hoursDisplay: [
      { day: "Wed", time: "9am to 9pm" },
      { day: "Thu", time: "10am to 9pm" },
      { day: "Fri", time: "8:30am to 5pm" },
      { day: "Sat", time: "8am to 4pm" },
    ],
    parking: "Parking on site",
    directions: "https://www.google.com/maps/dir/?api=1&destination=691A+The+Horsley+Drive+Smithfield+NSW+2164",
    googleReviews: 203,
    googleUrl: "https://maps.google.com/?cid=9669487741183859883",
    mapsCid: "9669487741183859883",
  },
  {
    slug: "clemton-park",
    name: "Salon BBK Clemton Park",
    shortName: "Clemton Park",
    streetAddress: "Shop T4A, Clemton Park Shopping Village, 60 Charlotte Street",
    suburb: "Campsie",
    state: "NSW",
    postcode: "2194",
    addressLine: "Shop T4A, Clemton Park Shopping Village, 60 Charlotte Street, Campsie NSW 2194",
    phone: phoneClemton,
    hours: { 2: [9, 17.5], 3: [9, 17.5], 4: [10, 21], 5: [9, 17.5], 6: [9, 17] },
    hoursDisplay: [
      { day: "Mon", time: "By appointment" },
      { day: "Tue", time: "9am to 5:30pm" },
      { day: "Wed", time: "9am to 5:30pm" },
      { day: "Thu", time: "10am to 9pm" },
      { day: "Fri", time: "9am to 5:30pm" },
      { day: "Sat", time: "9am to 5pm" },
    ],
    parking: "Centre parking",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Clemton+Park+Shopping+Village+60+Charlotte+Street+Campsie+NSW+2194",
    googleReviews: 111,
    googleUrl: "https://www.google.com/maps/search/?api=1&query=Salon+BBK+Clemton+Park+Campsie",
  },
];

export const primaryLocation = locations[0];

/** tel: href from a display number. Keeps the +61 form for dialers. */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("61")) return "tel:+" + digits;
  if (digits.startsWith("0")) return "tel:+61" + digits.slice(1);
  return "tel:" + digits;
}
