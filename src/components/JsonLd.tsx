import { locations, site } from "@/content/site";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function clock(value: number): string {
  const h = Math.floor(value);
  const m = Math.round((value - h) * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/**
 * Two BeautySalon nodes, one per location, each with its own Google review
 * count. The combined 314 figure stays in copy only (open item 11).
 */
export function JsonLd() {
  const nodes = locations.map((location) => ({
    "@type": "BeautySalon",
    "@id": `${site.url}/#${location.slug}`,
    name: location.name,
    alternateName: location.slug === "smithfield" ? "Brows by Klaire" : undefined,
    url: site.url,
    telephone: location.phone.replace(/\s/g, ""),
    email: site.email,
    image: `${site.url}/images/og-hero.jpg`,
    priceRange: "$$",
    paymentAccepted: "Cash, Credit Card, Afterpay",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.streetAddress,
      addressLocality: location.suburb,
      addressRegion: location.state,
      postalCode: location.postcode,
      addressCountry: "AU",
    },
    openingHoursSpecification: Object.entries(location.hours).map(([day, slot]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS[Number(day)],
      opens: clock(slot[0]),
      closes: clock(slot[1]),
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating,
      reviewCount: location.googleReviews,
      bestRating: "5",
    },
    sameAs: [site.instagram, location.googleUrl],
    makesOffer: {
      "@type": "Offer",
      name: "Free personalised consultation + signature brow mapping",
      description: "Consultation, signature brow mapping and a customised treatment plan, normally $20, free for new clients who book through this page.",
      price: "0",
      priceCurrency: "AUD",
    },
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": nodes,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
