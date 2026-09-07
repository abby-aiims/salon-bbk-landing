/**
 * Every word on the page, transcribed from 03-copy/copy-deck.md in final
 * section order. Components render this; they do not carry prose. Phone
 * placeholders resolve through content/site.ts.
 */

export const meta = {
  title: "Brow Specialists Smithfield & Clemton Park | Free Brow Consultation | Salon BBK",
  description:
    "Personalised consultation and signature brow mapping, free for new clients (normally $20). HD Brows, lamination, ombre brows and Korean lash lifts by Sydney's brow specialists. Book at Smithfield or Clemton Park.",
  ogTitle: "Personalised Consultation + Signature Brow Mapping | Salon BBK",
  ogDescription:
    "Sydney's specialist brow salon. Free consultation and brow mapping for new clients. 5.0 on Google across 314 reviews.",
};

export const announcement =
  "Free personalised consultation + signature brow mapping, normally $20 · Afterpay available · Smithfield & Clemton Park";

export const hero = {
  eyebrow: "Brow specialists · Smithfield & Clemton Park",
  h1: "Personalised Consultation + Signature Brow Mapping",
  /** The same headline, broken where it should break on desktop. The parts are
      rendered space-joined, so the text still reads as one line to search
      engines and screen readers. */
  h1Lines: ["Personalised Consultation", "+ Signature Brow Mapping"],
  subline:
    "Not a quick brow appointment. A 15 minute consultation, a mapped and measured shape for your face, and a treatment plan built around your brows. Free for new clients, normally $20.",
  proof: ["5.0 on Google", "314 reviews", "Over 5,000 clients", "9+ years"],
  secondaryLink: "View our services",
  image: {
    src: "/images/hero-signature-brow-mapping.webp",
    width: 1920,
    height: 1280,
    alt: "Model brushing a mapped and sculpted brow with a spoolie during a signature brow mapping at Salon BBK",
  },
};

/**
 * Trust strip, as four numbered cards. The copy deck carries these as four
 * one-line labels; the card layout needs a title and a supporting line, so the
 * label became the supporting line and the title is new. Flagged for the deck.
 */
export const trustLabel = "The Salon BBK standard";

export const trust = [
  {
    icon: "face_retouching_natural",
    title: "Brow specialists",
    body: "A specialist brow salon, not a brow bar. Brows are the whole job here.",
  },
  {
    icon: "straighten",
    title: "Signature mapping",
    body: "Every brow service starts with your shape measured and mapped to your face.",
  },
  {
    icon: "local_parking",
    title: "Two Sydney salons",
    body: "Smithfield and Clemton Park, both with parking on site and walk-ins welcome.",
  },
  {
    icon: "credit_card",
    /* Afterpay's own mark, supplied by the client. Partner trademarks are used
       as issued: black, unaltered, so the page's no-pure-black rule does not
       apply to it. */
    logo: { src: "/images/afterpay-icon.png", width: 161, height: 161 },
    title: "Afterpay available",
    body: "Split any service across four instalments, at either salon.",
  },
];

export type ServiceKey = "hd" | "lamination" | "hybrid" | "ombre" | "lash";

export const serviceOptions: { key: ServiceKey | "unsure"; label: string }[] = [
  { key: "hd", label: "HD Brows / Signature Brow Mapping" },
  { key: "lamination", label: "Brow Lamination" },
  { key: "hybrid", label: "Hybrid Brows" },
  { key: "ombre", label: "Ombre Brows / Cosmetic Tattoo" },
  { key: "lash", label: "Korean Lash Lift" },
  { key: "unsure", label: "Not sure, help me choose" },
];

export const services = {
  eyebrow: "Signature services",
  h2: "Brows first. Always.",
  intro:
    "Five treatments our clients book most, every one starting with a consultation and our signature mapping so the shape is yours, not a template.",
  cards: [
    {
      key: "hd" as ServiceKey,
      badge: "Most loved",
      name: "HD Brows + Signature Mapping",
      promise:
        "Mapped, measured and sculpted to your face, then a hybrid dye that colours skin and hair for a fuller, cleaner, defined brow.",
      price: "From $65",
      lasts: "Lasts up to 6 weeks",
      link: "Book HD Brows",
      image: {
        src: "/images/service-hd-brows.webp",
        width: 533,
        height: 800,
        alt: "Model with defined HD brows after signature brow mapping at Salon BBK",
      },
    },
    {
      key: "lamination" as ServiceKey,
      badge: "Specialist",
      name: "Brow Lamination",
      promise:
        "Brow hairs lifted and set into a fluffy or sleek shape, then mapped and sculpted with a pop of highlight.",
      price: "From $110",
      lasts: "Lasts 6 to 8 weeks",
      link: "Book Lamination",
      image: {
        src: "/images/service-brow-lamination.webp",
        width: 533,
        height: 800,
        alt: "Model with brushed-up fluffy brows after brow lamination at Salon BBK",
      },
    },
    {
      key: "hybrid" as ServiceKey,
      badge: "New client fave",
      name: "Hybrid Brows (HD Lamination)",
      promise:
        "Lamination for shape and fullness, hybrid dye for definition. The full brow in one appointment.",
      price: "From $130",
      lasts: "Lasts 6 to 8 weeks",
      link: "Book Hybrid Brows",
      image: {
        src: "/images/service-hybrid-brows.webp",
        width: 533,
        height: 800,
        alt: "Model with bold laminated and tinted hybrid brows at Salon BBK",
      },
    },
    {
      key: "ombre" as ServiceKey,
      badge: "Semi-permanent",
      name: "Ombre Brows + Cosmetic Tattoo",
      promise:
        "Soft, powdered, machine-applied colour that is darkest through the tail and lightest at the front. Wake up with your brows done.",
      price: "From $850",
      lasts: "Refresh at 12 to 18 months",
      link: "Book a Tattoo Consult",
      image: {
        src: "/images/service-ombre-brows.webp",
        width: 533,
        height: 800,
        alt: "Close-up of soft powdered ombre brows on a model at Salon BBK",
        position: "50% 12%",
      },
    },
    {
      key: "lash" as ServiceKey,
      badge: "Lashes",
      name: "Korean Lash Lift",
      promise:
        "A gentle, no-harsh-chemical lift that opens the eye and looks after lash health, with dye for a mascara finish.",
      price: "From $150",
      lasts: "Lasts 8 to 10 weeks",
      link: "Book a Lash Lift",
      image: {
        src: "/images/service-korean-lash-lift.webp",
        width: 533,
        height: 800,
        alt: "Model with lifted, tinted lashes after a Korean lash lift at Salon BBK",
        position: "78% 30%",
      },
    },
  ],
  also: "Also available: microblading, combination brows, lip blush, lash botox, dermaplaning and facial waxing.",
  menuLink: "See the full menu",
};

export const form = {
  eyebrow: "Free for new clients",
  h2: "Book Your Personalised Brow Consultation",
  subline:
    "Consultation, signature brow mapping and a customised treatment plan, normally $20, free when you book through this page.",
  labels: {
    firstName: "First name",
    lastName: "Last name",
    phone: "Phone number",
    email: "Email address",
    location: "Preferred location",
    service: "Preferred service",
    datetime: "Preferred appointment date",
    source: "How did you hear about us?",
  },
  locationOptions: ["Smithfield", "Clemton Park (Campsie)", "Either, whichever is sooner"],
  sourceOptions: ["Instagram", "Google", "Friend or family", "Walked past the salon", "Other"],
  reassurance: ["No payment needed to enquire", "We confirm by text within business hours"],
  timelyPrompt: "Prefer to book instantly?",
  timelyLabel: "Book online with Timely",
  errorSummary: "Please check the highlighted fields.",
  successTitle: (name: string) => `Thanks ${name}, you're in.`,
  successBody: (location: string) =>
    `One of the team will text you within business hours to lock in your consultation at ${location}. Save the number in the meantime.`,
};

/**
 * The booking modal every "Book now" opens. Two steps: what the appointment
 * is, then who it is for. The wording stays short because the panel is read
 * on a phone with the page still behind it.
 */
export const booking = {
  title: "Book Your Free Consultation",
  steps: ["Your appointment", "Your details"],
  dateHint: "Pick a day that suits. We confirm the exact time by text.",
  next: "Continue",
  back: "Back",
};

export const finder = {
  eyebrow: "Not sure what to book?",
  h2: "Find Your Perfect Brow",
  intro:
    "Three quick questions and we'll point you to the right first appointment. You'll still get the full consultation on the day.",
  questions: [
    {
      id: "now",
      label: "My brows right now are:",
      options: [
        { value: "sparse", label: "Sparse or patchy" },
        { value: "unruly", label: "Full but unruly" },
        { value: "uneven", label: "Uneven or over-plucked" },
        { value: "fine", label: "Fine but I want more" },
      ],
    },
    {
      id: "look",
      label: "The look I'm after is:",
      options: [
        { value: "defined", label: "Clean and defined" },
        { value: "fluffy", label: "Fluffy and brushed up" },
        { value: "powdered", label: "Soft and powdered" },
        { value: "natural", label: "Natural, just tidied" },
      ],
    },
    {
      id: "last",
      label: "I want it to last:",
      options: [
        { value: "weeks", label: "A few weeks" },
        { value: "months", label: "A couple of months" },
        { value: "year", label: "A year or more" },
      ],
    },
  ],
  results: {
    hd: {
      name: "HD Brows + Signature Mapping",
      reason:
        "Definition and colour on skin and hair with a shape mapped to your face. The right first appointment for most new clients.",
    },
    lamination: {
      name: "Brow Lamination",
      reason:
        "Your own hairs, lifted and set. The fluffy, editorial brow that holds its shape for up to eight weeks.",
    },
    hybrid: {
      name: "Hybrid Brows",
      reason:
        "Lamination for fullness plus hybrid dye for definition. For brows that need both shape and colour.",
    },
    ombre: {
      name: "Ombre Brows",
      reason:
        "Semi-permanent powdered colour for sparse or over-plucked brows that want a done look every morning. Starts with a tattoo consultation.",
    },
  },
  resultLabel: "We'd start you with",
  fallback: "Still not sure? Choose \"Not sure, help me choose\" on the form and we'll decide together.",
};

export const why = {
  eyebrow: "Why Salon BBK",
  h2: "This is not a quick brow appointment.",
  body: "Most places wax, tint and send you on your way in fifteen minutes. At Salon BBK your appointment starts with a conversation about your face, your brow history and what you actually want. Then we map and measure: brow start, arch and tail, matched to your bone structure and natural growth so both sides sit right. Only then do we sculpt, colour or laminate. It is why our clients stop getting \"brows done\" and start getting their brows done.",
  quote: "It's not just a brow wax. The girls explain everything as they help you achieve your brow goals.",
  quoteBy: "Sutari Martinez, Google review",
  points: [
    { icon: "workspace_premium", label: "Specialist brow salon since 2017" },
    { icon: "school", label: "Every artist trained in the BBK signature mapping method" },
    { icon: "storefront", label: "A real salon: parking, walk-ins welcome, Afterpay" },
  ],
  image: {
    src: "/images/why-bbk-two-models.webp",
    width: 1280,
    height: 1920,
    alt: "Two Salon BBK models cheek to cheek with mapped, sculpted brows",
  },
};

export const steps = {
  eyebrow: "What to expect",
  h2: "Four steps to your best brows",
  intro: "Every appointment runs the same way, whichever treatment you book.",
  items: [
    {
      title: "Consult",
      body: "Fifteen minutes on your brow goals, skin type and history. In salon or by phone.",
      image: {
        src: "/images/why-bbk-two-models.webp",
        width: 1280,
        height: 1920,
        alt: "Salon BBK artist and client talking through brow goals before treatment",
        position: "50% 30%",
      },
    },
    {
      title: "Map",
      body: "We measure and mark your ideal start, arch and tail against your facial structure.",
      image: {
        src: "/images/hero-signature-brow-mapping.webp",
        width: 1920,
        height: 1280,
        alt: "Brow being measured and mapped with a spoolie at Salon BBK",
        position: "60% 35%",
      },
    },
    {
      title: "Treat",
      body: "HD, lamination, hybrid or tattoo, delivered to the mapped shape and finished with highlight.",
      image: {
        src: "/images/service-hd-brows.webp",
        width: 533,
        height: 800,
        alt: "Defined HD brows immediately after treatment at Salon BBK",
        position: "50% 25%",
      },
    },
    {
      title: "Maintain",
      body: "A personalised plan for touch ups so your brows stay this good between visits.",
      image: {
        src: "/images/service-brow-lamination.webp",
        width: 533,
        height: 800,
        alt: "Brushed up laminated brows holding their shape between appointments",
        position: "50% 25%",
      },
    },
  ],
};

export const results = {
  eyebrow: "Results",
  h2: "Discover your perfect brow shape",
  intro: "Every pair below started with the same consultation and mapping you'll get. Drag to compare.",
  /**
   * Placeholder pairs from the campaign set so the client can see the
   * component. Replace with real straight-on pairs (open item 3) and flip
   * NEXT_PUBLIC_SHOW_RESULTS to true.
   */
  pairs: [
    {
      caption: "HD Brows + Lamination · Smithfield",
      before: { src: "/images/service-ombre-brows.webp", width: 533, height: 800, alt: "Before HD Brows and lamination" },
      after: { src: "/images/service-hd-brows.webp", width: 533, height: 800, alt: "After HD Brows and lamination" },
    },
    {
      caption: "Brow Lamination · Clemton Park",
      before: { src: "/images/service-korean-lash-lift.webp", width: 533, height: 800, alt: "Before brow lamination" },
      after: { src: "/images/service-brow-lamination.webp", width: 533, height: 800, alt: "After brow lamination" },
    },
    {
      caption: "Hybrid Brows · Smithfield",
      before: { src: "/images/service-hd-brows.webp", width: 533, height: 800, alt: "Before hybrid brows" },
      after: { src: "/images/service-hybrid-brows.webp", width: 533, height: 800, alt: "After hybrid brows" },
    },
  ],
};

export const reviews = {
  eyebrow: "Google reviews",
  h2: "5.0 stars. 314 reviews. Two salons.",
  summaryLine: "5.0 out of 5 across 314 Google reviews, 203 at Smithfield and 111 at Clemton Park.",
  link: "Read all reviews on Google",
  /** Verbatim from 01-brief/testimonials.md, names as on Google. */
  items: [
    {
      name: "Amelia Lam",
      tag: "HD Brows",
      quote:
        "Had HD brows done with Danielle once and Maria most recently, and I'm obsessed! My brows have never been so bold and perfectly shaped. I keep getting compliments, and they last so well. Can't recommend them enough!",
    },
    {
      name: "Melina Di Bella",
      tag: "Brow Lamination",
      quote:
        "Maria did brow lamination & sculpt for me on the 5th of Feb. I'm a new client and had never had lamination done before, but she made the whole experience so comfortable. She was friendly and approachable, answered all my questions and explained the process/after care clearly. She did such a beautiful job. Love the results. I've booked in for a touch up soon & can't wait!!",
    },
    {
      name: "Nava Yazdan Parast",
      tag: "Consultation",
      quote:
        "I always have such a great experience here! Mel does my brows and she's amazing, she really takes the time to understand how I want them shaped and checks with me throughout to make sure I'm happy. The results are always perfect. Highly recommend!!!",
    },
    {
      name: "Sutari Martinez",
      tag: "Brow Sculpt",
      quote:
        "I love the girls at Salon BBK! It's not just a brow wax, the girls explain everything as they help you achieve your brow goals. They care and it shows in every appointment!",
    },
    {
      name: "Ramina Youkhanis",
      tag: "Brow Sculpt",
      quote:
        "I have been getting my eyebrows done with Melanie for months and never have they been so full and perfectly shaped. The girls are all so professional and I never have had to wait past my appointment time unlike many other places. Definitely recommend if you want a perfectly shaped eyebrow wax every time.",
    },
    {
      name: "Rawand Zaidan",
      tag: "Lamination + Lash Lift",
      quote:
        "Amazing service from Maria-Sophia! I've had brow sculpting, brow lamination and a lash lift. She explains the process clearly, is very honest and always makes sure I'm comfortable and confident with the results. She takes her time and pays attention to every detail. Highly recommend!",
    },
  ],
};

/**
 * Instagram strip. Six reels from @salonbbk_, supplied by the client.
 *
 * `video` is the source this section is built for: a self-hosted MP4 plays
 * muted, inline and on loop, which is the only way a tile can actually play by
 * itself. Instagram's embed cannot do that. It renders a cover with a play
 * button, will not autoplay, and will not loop, so if `video` is ever emptied
 * that tile falls back to the reel's own embed and opens Instagram when tapped.
 *
 * The six MP4s are the client's originals re-encoded for the web: audio
 * dropped, since the tiles play muted, and CRF 28 at the source 720x1280,
 * which halves the weight without a visible difference at tile size. `poster`
 * is each clip's own first frame, so nothing jumps when it starts.
 *
 * To replace a reel, drop the new file in public/videos under the same name
 * and re-run the poster step. Nothing here changes.
 */
export const social = {
  eyebrow: "On Instagram",
  h2: "Brows we finished this week",
  intro: "Real appointments, filmed in the chair at Smithfield and Clemton Park.",
  link: "Follow @salonbbk_",
  reels: [
    { id: "Dc9qpvUy6WX", video: "/videos/reel-1.mp4", poster: "/videos/reel-1.webp" },
    { id: "Dc26FQstwoS", video: "/videos/reel-2.mp4", poster: "/videos/reel-2.webp" },
    { id: "Dc18S1dzoG3", video: "/videos/reel-3.mp4", poster: "/videos/reel-3.webp" },
    { id: "DcsoEbEyAhj", video: "/videos/reel-4.mp4", poster: "/videos/reel-4.webp" },
    { id: "Dck5sxdywul", video: "/videos/reel-5.mp4", poster: "/videos/reel-5.webp" },
    { id: "DcS4JMOydJS", video: "/videos/reel-6.mp4", poster: "/videos/reel-6.webp" },
  ],
};

export const team = {
  eyebrow: "The artists",
  h2: "Trained by Klaire. Booked by name.",
  body: "Salon BBK was founded by Klaire, who has spent nine years perfecting a mapping and sculpting method she now teaches through BBK Academy to artists across Sydney. Every artist in our chairs, Danielle, Maria-Sophia and Melanie among them, works to that same method, which is why clients ask for them by name in their reviews.",
  caption: "Klaire, founder and principal artist",
  image: {
    src: "/images/team-klaire-founder.webp",
    width: 800,
    height: 756,
    alt: "Klaire, founder and principal artist at Salon BBK, seated on a cream sofa",
  },
};

export const locationsCopy = {
  eyebrow: "Two Sydney salons",
  h2: "Smithfield and Clemton Park",
  serving:
    "Serving Smithfield, Fairfield, Wetherill Park, Cabramatta, Campsie, Clemton Park, Kingsgrove, Belmore, Bankstown and surrounds.",
  directions: "Get directions",
};

export const faq = {
  h2: "Questions, answered",
  items: [
    {
      q: "What happens in the free consultation?",
      a: "Fifteen minutes with one of our artists, in salon or by phone. We talk through your brow goals, look at your skin and natural growth, map your shape and recommend the treatment and timing that suits you. It is normally $20; free when booked through this page.",
    },
    {
      q: "I've never had my brows mapped. Will it look too different?",
      a: "Mapping is about balance, not a dramatic new brow. We work with your natural shape and growth so the result looks like your brows on their best day.",
    },
    {
      q: "How long do results last?",
      a: "HD Brows up to three weeks on skin and six on hair. Lamination and hybrid brows six to eight weeks. Korean lash lifts eight to ten weeks. Ombre brows twelve to eighteen months before a refresh.",
    },
    {
      q: "Do I need to pay a deposit?",
      a: "Enquiring through this page is free. Appointments are secured with a non-refundable deposit that transfers to a new time with 48 hours notice.",
    },
    {
      q: "Can I walk in?",
      a: "Yes at both salons when an artist is free, though brow mapping appointments are best booked so we can give you the full consultation time.",
    },
    {
      q: "Do you offer Afterpay?",
      a: "Yes, on all services at both locations.",
    },
  ],
  closing: "Anything else?",
};

export const finalCta = {
  eyebrow: "Ready when you are",
  h2: "Book Your Signature Brow Mapping",
  subline:
    "Free consultation, mapping and treatment plan for new clients, normally $20. Smithfield or Clemton Park.",
  image: {
    src: "/images/final-cta-three-models.webp",
    width: 1920,
    height: 1280,
    alt: "Three Salon BBK models with mapped, sculpted brows on a warm backdrop",
  },
};

export const footer = {
  blurb: "Eyebrow specialists and academy. Sydney's brow-first salon since 2017.",
  place: "Smithfield and Clemton Park, Sydney",
  ctaLabel: "Book a consultation",
  ctaBody: "Free personalised consultation and signature brow mapping for new clients, normally $20.",
  links: [
    { label: "Full service menu", href: "https://www.salonbbk.com.au/services" },
    { label: "BBK Academy", href: "https://www.salonbbk.com.au/the-academy" },
    { label: "Booking policy", href: "https://www.salonbbk.com.au/important-info" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  policy: "Deposits are non-refundable and transfer to a new time with 48 hours notice.",
};

export const thankYou = {
  h1: (name: string) => `You're booked in for a consultation, ${name}.`,
  body: (location: string) =>
    `We'll text you within business hours to confirm a time at ${location}. If you'd rather lock it in now, book directly online with Timely.`,
  button: "Book Online Now",
  secondary: "Follow @salonbbk_ for brow inspo while you wait.",
};
