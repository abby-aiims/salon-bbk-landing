# Salon BBK landing page: build

Next.js 15 (App Router) + TypeScript, CSS modules on a global token sheet, no UI or animation libraries. Same shape as the Pure Reformer build: all copy in `src/content/`, one component per section in copy-deck order, tokens transcribed from `02-design/design-system-spec.md`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Copy `.env.example` to `.env.local` to set phones, GTM, Resend and the results flag. Every value has a safe default.

Do not run `npm run build` while `npm run dev` is running: both write to `.next` and the dev server will start throwing missing-module errors. Stop dev first, or delete `.next` and restart it. The same applies to `next start` on a second port: it reads the same `.next`, so a rebuild underneath a running server leaves it serving HTML that points at chunks which no longer exist.

## Fonts

Display face is Glorify (Letterhend Studio), the client-supplied file in `05-assets/Glorifydemo-BW3J3.otf`, converted to `src/fonts/Glorify-Regular.woff2` (8KB) and loaded through `next/font/local` in `src/app/layout.tsx`. The supplied cut is the demo: basic Latin only, no curly quotes or accented characters, and the name table reads "Glorify DEMO". Swap in the licensed retail woff2 at the same path before launch. Body and UI stay on Jost via `next/font/google`.

## Deploying to Vercel

This app lives in `06-build/`. Set Root Directory to `06-build` in the Vercel project. `robots: { index: false }` is set in `src/app/layout.tsx` until the domain is confirmed (open item 2).

## Layout

| Path | Holds |
|---|---|
| `src/app/globals.css` | Every token and shared primitive (buttons, badges, type scale, icons, reveal). |
| `src/content/site.ts` | Locations, hours, phones (env), links, proof figures. Facts only. |
| `src/content/home.ts` | Every word on the page from `03-copy/copy-deck.md`. |
| `src/lib/hours.ts` | Open-now logic in Australia/Sydney time. |
| `src/lib/lead.ts` | Lead shape and validation shared by the form and the API route. |
| `src/components/sections/` | One component per section. `BookingBand` renders the form twice. |
| `src/app/api/lead/route.ts` | Accepts JSON (JS on) or form-encoded (JS off), validates, honeypot and three second check, emails via Resend, redirects to `/thank-you`. |
| `public/images/` | WebP from `05-assets/02-web`, renamed by section use. |

## Prefill

Any element with `data-service="hd|lamination|hybrid|ombre|lash"` sets Preferred service on click. The brow finder also dispatches `bbk:prefill`. All CTAs anchor to `#book`.

## Tracking hooks

`data-call` on every tel link, `data-timely` on Timely links, and a `lead_form_submit` dataLayer event (form_id, location, service) on success. GTM injects only when `NEXT_PUBLIC_GTM_ID` is set.

## Before go-live

See `00-planning/open-items.md`. Blocking: tracking numbers, domain, Resend key and sending domain, GTM ID, ABN, consent for campaign imagery, offer wording sign-off. The results section renders only with `NEXT_PUBLIC_SHOW_RESULTS=true` and currently uses campaign placeholders, not real pairs.

## Layout, after the reference redesign

Six sections were rebuilt against a client-supplied reference (a Framer beauty site), replacing what `02-design/design-system-spec.md` describes. Where the two disagree, this build is current and the spec needs updating.

| Section | Now |
|---|---|
| Instagram strip | Marquee of six reels, looping seamlessly, paused on hover and focus. Built for self-hosted MP4s, falling back to each reel's embed. See below. |
| Proof bar | The hero's rating line, moved to a second bar under the announcement on phones only. |
| Afterpay | The client's supplied marks: the icon on trust card 04, the wordmark under the form's submit. Partner trademarks are used as issued, black and unaltered, so the page's no-pure-black rule does not apply to them. |
| Announcement bar | Pale blush strip, dark sentence-case text, marquee on mobile. Was plum with white uppercase. |
| Header | Transparent over the hero with white type, turning solid white past 80px of scroll. The blur sits on its own layer inside the header: a `backdrop-filter` on the header itself makes it the containing block for the fixed menu panel, which then gets clipped to the height of the bar. Below 1100px the links and the CTA move into a menu panel. |
| Hero | Full-bleed image the height of the viewport, copy anchored bottom left, white type over a two-part scrim. On phones the open pill, the supporting line and the secondary link are hidden, leaving eyebrow, headline, one button and the proof line. |
| Trust strip | Four white cards on blush: index, icon, centred claim, shared footer label. Card titles are new copy; the deck's four labels became the supporting lines. |
| Services | Three across the top, two centred beneath, on a six column grid. Name set over the foot of each photograph, badge and price as chips. Mobile keeps the snap carousel. |
| How it works | Sticky heading column beside four step cards, each a photograph with a step chip and copy over the image. |
| Reviews | Hairline-divided columns, three to a view, paged by arrows over a native scroll-snap track. The summary tile moved into the section header. |
| Footer | Light blush ground, four columns plus a booking prompt, and the wordmark spanning the container as the closing mark. Was a dark plum footer. |

## Instagram strip

`src/content/home.ts` holds six reels from @salonbbk_. Each has a `video` field, and that is the source the section is built for: a muted, inline, looping MP4 is the only thing a browser will play by itself.

Instagram cannot do that. Its embed renders a cover with a play button, will not autoplay and will not loop, and there is no supported way to reach the file behind a reel (the media loads client side, so the embed page carries no poster or video URL). While `video` is empty each tile renders the reel's own embed instead and opens Instagram when tapped.

To switch the strip to real looping video, put the six files in `public/videos` and fill in `video`. The tile aspect ratio in `SocialStrip.module.css` should go to `9 / 16` at the same time.

The embeds are heavy, roughly 600KB of markup each before their own media, so they are only mounted once the section is within a screen of the viewport. They still cost: Lighthouse mobile performance is 87 with them and 95 without, mostly in blocking time from Instagram's own scripts. Supplying the MP4s removes that cost entirely.

The hero scrim is measured, not eyeballed: sampling the image through the header band gives a peak luminance of 0.44 behind the logo, so the top gradient holds ink at 0.62 alpha to keep white type at 4.6:1 there.

## Verification, 7 September 2026

Checked against the build checklist in `00-planning/master-plan.md` on the production build (`next build` then `next start`), Lighthouse 13.4 mobile preset, Chrome headless.

| Check | Result |
|---|---|
| Lighthouse mobile | Performance 88, Accessibility 100, Best practices 100, SEO 66 (the only SEO failure is the deliberate noindex until the domain is confirmed). Performance was 95 before the Instagram strip; see below. |
| Core metrics | FCP 1.7s, LCP 3.2s, TBT 150ms, CLS 0 |
| Above the fold at 375 by 812 | Open indicator, H1, subline, primary CTA and proof line all visible; sticky bar carries Call and Book Now |
| Primary CTA count | Ten anchors to the form across hero, header, sticky bar, why band, steps, team and finder |
| Form | Both placements post to `/api/lead`. Verified: no-JavaScript form post redirects 303 to `/thank-you`; JSON path returns ok and the page routes to `/thank-you?name=&location=`; invalid fields return 400 with messages; honeypot and sub-three-second submits are swallowed silently; `lead_form_submit` pushed to dataLayer |
| Brow finder | Three questions, result panel, "Book This For Me" prefills Preferred service on both forms |
| Open indicator | Australia/Sydney time from the hours table; verified "Next open Tue 9am · Clemton Park" on a Monday |
| Copy rules | No em or en dashes, no emoji, no pure black anywhere in `src` |
| Images | Every image has width, height and descriptive alt; hero preloaded with high fetch priority; everything below the fold lazy |
| Icons | Material Symbols Outlined only, 13KB self-hosted subset, filled star axis included |
| Mobile menu | Opens and closes, locks and restores page scroll, closes on Escape, moves focus into the panel |
| Hero headline | Two fixed lines on desktop from 1100px, space-joined in the DOM so it still reads as one sentence. Sized at 3.45vw so the longer line (12.23em in Glorify) stays inside the half-width column |
| Hero copy column | Half the container's content box, which lands on the hero's horizontal midpoint at every width because the container is centred |
| Text links | One continuous rule under label and arrow. A text-decoration underline stops at the text run, because decorations do not propagate to flex items, so `.link` uses a border instead |
| Layout | Content column 1700px at 1920, scaling as 88.5vw below; header 112px desktop with the logo at 72px, footer logo 320px |
| JSON-LD | Two BeautySalon nodes with addresses, phones, hours, per-location review counts and the free consultation offer |

Not verified here: email delivery (no Resend key), GTM (no container ID), the results section with real pairs (flag off, campaign placeholders only).
