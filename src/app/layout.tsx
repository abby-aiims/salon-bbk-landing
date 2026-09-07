import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

import { meta } from "@/content/home";
import { site } from "@/content/site";

import "./globals.css";

/**
 * Display: Glorify (Letterhend Studio), supplied by the client in 05-assets and
 * converted to woff2 with fontTools. Headlines, pull quotes and numerals only.
 *
 * The supplied file is the DEMO cut (name table reads "Glorify DEMO", basic
 * Latin only, no curly quotes or accents). A licensed retail file should
 * replace src/fonts/Glorify-Regular.woff2 before launch; nothing else changes.
 */
const display = localFont({
  src: [{ path: "../fonts/Glorify-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  fallback: ["Cormorant Garamond", "Georgia", "Times New Roman", "serif"],
});

/** Sans: geometric like Fenty's Brown. Body, UI, labels, buttons, h3 down. */
const sans = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

/**
 * Icons: a 14KB Material Symbols Outlined subset, self-hosted from
 * public/fonts and declared in globals.css, covering only the glyphs the page
 * uses at FILL 0 to 1 and wght 300 to 400.
 *
 * To add an icon, refetch the subset with the new name appended and replace
 * public/fonts/material-symbols-subset.woff2. The current set is:
 *
 *   arrow_forward, calendar_month, call, check, close, credit_card,
 *   directions, expand_more, face_retouching_natural, local_parking,
 *   schedule, school, star, storefront, straighten, workspace_premium
 *
 * https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined
 *   :opsz,wght,FILL,GRAD@20..24,300..400,0..1,0&icon_names=<names>&display=block
 */
const ICON_FONT = "/fonts/material-symbols-subset.woff2";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: site.name,
    url: site.url,
    title: meta.ogTitle,
    description: meta.ogDescription,
    images: [{ url: "/images/og-hero.jpg", width: 1920, height: 1280, alt: meta.ogTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.ogTitle,
    description: meta.ogDescription,
    images: ["/images/og-hero.jpg"],
  },
  // A paid landing page. Keep it out of organic search until the domain is confirmed (open item 2).
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.locale} className={`${display.variable} ${sans.variable}`}>
      <head>
        <link rel="preload" href={ICON_FONT} as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {site.gtmId && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${site.gtmId}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
