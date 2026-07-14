import type { SiteConfig } from "@/lib/site-config";

/**
 * ============================================================
 *  COASTAL FOOT & ANKLE CENTER — site configuration
 * ============================================================
 *
 * This file controls EVERYTHING brand-specific on the site.
 * To launch site #2 (e.g. Dr. Dyal's practice), copy this file,
 * rename it, edit the values, register it in lib/site-config.ts,
 * and build with SITE_CONFIG=<new-key>. See CLONE.md.
 *
 * Values still wrapped in [BRACKETS] are placeholders waiting on
 * the practice — search this file for "[" before launch.
 */
const config: SiteConfig = {
  key: "coastal-foot-ankle",
  practiceName: "Coastal Foot & Ankle Center",
  shortName: "Coastal Foot & Ankle",
  tagline: "Caring, expert foot care for every step of your life",

  // The current logo is a placeholder recreated from the photo provided.
  // When the real vector logo arrives, drop it at public/logo/logo.svg
  // (or .png) and update src/width/height here — nothing else changes.
  logo: {
    src: "/logo/logo.svg",
    alt: "Coastal Foot & Ankle Center logo",
    width: 268,
    height: 72,
  },

  /**
   * Brand palette — sampled from the actual logo photo.
   * Deliberately soft and spa-like (mauve + sage + warm gray).
   * primaryDark/primaryDarker are deepened versions of the mauve so
   * white button text passes WCAG contrast; regenerate them if you
   * change primary (aim for ≥ 7:1 against white).
   */
  colors: {
    primary: "#8B7D95", // dusty mauve — wordmark & foot icon
    primaryDark: "#665A72", // buttons (white text ≈ 7:1)
    primaryDarker: "#544A5E", // button hover
    secondary: "#96AC9F", // sage/seafoam — the swoosh
    secondaryLight: "#E6EDE8", // soft sage tint for backgrounds
    text: "#3D3A40", // near-black body text
    textMuted: "#5A5A5A", // warm charcoal — subtext
    cream: "#F7F5F0", // warm section backgrounds (matches logo bg)
    white: "#FFFFFF",
  },

  contact: {
    // [PLACEHOLDER] — swap for the practice's real number.
    phone: "9105550123",
    phoneDisplay: "(910) 555-0123",
    // [PLACEHOLDER] — swap for the practice's real email.
    email: "hello@coastalfootankle.com",
    /**
     * IMPORTANT: leave address null until the practice confirms the street
     * address may be published. Setting it automatically turns on the full
     * address block, map pin, and JSON-LD street address across the site:
     *
     * address: { street: "123 Main St, Suite 4", city: "Wilmington", state: "NC", zip: "28401" },
     */
    address: null,
    // [PLACEHOLDER CITY] — used in "Serving <city> and surrounding areas".
    city: "Wilmington",
    state: "NC",
    serviceArea: "Wilmington and the surrounding coastal communities",
    hours: [
      { days: "Monday – Thursday", hours: "8:00 AM – 5:00 PM" },
      { days: "Friday", hours: "8:00 AM – 12:00 PM" },
      { days: "Saturday – Sunday", hours: "Closed (phone answered 24/7)" },
    ],
    // City-level map center — no pin is shown while address is null.
    // [PLACEHOLDER] — set to the practice's actual city center.
    mapCenter: { lat: 34.2257, lng: -77.9447, zoom: 12 },
  },

  aiReceptionist: {
    name: "Halo",
    blurb:
      "Our phone is answered 24 hours a day, 7 days a week — even nights and weekends. Call any time and we can schedule your appointment on the spot.",
  },

  // Numbers shown in the trust bar on the home page. [PLACEHOLDERS]
  trust: {
    yearsExperience: "20+ years of experience",
    boardCertifications: "Board-certified podiatrists",
    googleReviewCount: "150+ five-star Google reviews",
  },

  // Keep to 6 items max — the audience is 60+, navigation must stay shallow.
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our Team", href: "/team" },
    { label: "Store", href: "/store" },
    { label: "Reviews", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],

  /**
   * Team members. Doctors (role: "doctor") appear first with larger cards;
   * support staff (role: "support") follow. Photos live under /public/team.
   * A missing photo file automatically shows an initials avatar, so you can
   * fill these in as headshots arrive. All photos are cropped to the same
   * square aspect ratio on the page.
   */
  doctors: [
    {
      name: "Dr. Lauren Thornberry",
      credentials: "DPM",
      // Real headshot — drop the provided photo at public/team/lauren-thornberry.jpg
      photo: "/team/lauren-thornberry.jpg",
      bio: "Dr. Thornberry has cared for feet and ankles for more than 15 years. She believes good foot care starts with listening, and she takes the time to explain every option in plain language. Her patients know her for her warmth, her steady hands, and her honest advice.",
      specialties: ["General podiatry", "Diabetic foot care", "Red light therapy"],
      boardCertifications: ["Board Certified, ABFAS"],
      role: "doctor",
    },
    {
      // [PLACEHOLDER DOCTOR — replace name, bio, photo when provided]
      name: "Dr. [Second Doctor]",
      credentials: "DPM",
      photo: "/team/doctor-2.jpg",
      bio: "[One-paragraph bio goes here. Keep it warm and plain-spoken: how long they've practiced, what they focus on, and one personal touch patients will remember.]",
      specialties: ["Sports injuries", "Heel pain"],
      boardCertifications: ["Board Certified, ABFAS"],
      role: "doctor",
    },
    {
      // [PLACEHOLDER DOCTOR]
      name: "Dr. [Third Doctor]",
      credentials: "DPM",
      photo: "/team/doctor-3.jpg",
      bio: "[One-paragraph bio goes here.]",
      specialties: ["Wound care", "Diabetic foot care"],
      boardCertifications: ["Board Certified, ABPM"],
      role: "doctor",
    },
    {
      // [PLACEHOLDER DOCTOR]
      name: "Dr. [Fourth Doctor]",
      credentials: "DPM",
      photo: "/team/doctor-4.jpg",
      bio: "[One-paragraph bio goes here.]",
      specialties: ["Nail care", "Custom orthotics"],
      boardCertifications: ["Board Certified, ABFAS"],
      role: "doctor",
    },
    {
      // [PLACEHOLDER SUPPORT STAFF]
      name: "[Team Member]",
      credentials: "",
      title: "Medical Assistant",
      photo: "/team/staff-1.jpg",
      bio: "[Short bio for a supporting medical professional.]",
      specialties: [],
      boardCertifications: [],
      role: "support",
    },
    {
      // [PLACEHOLDER SUPPORT STAFF]
      name: "[Team Member]",
      credentials: "",
      title: "Patient Care Coordinator",
      photo: "/team/staff-2.jpg",
      bio: "[Short bio for a supporting medical professional.]",
      specialties: [],
      boardCertifications: [],
      role: "support",
    },
  ],

  /**
   * Services grid. Cards with featuredOnHome: true also appear on the home
   * page (keep that set to 3–5). Cards with an href link to a dedicated page.
   */
  services: [
    {
      title: "General Podiatry",
      description:
        "From aches and sprains to everyday foot pain, we find the cause and treat it. Most visits start with a simple exam and an honest conversation about what will help.",
      icon: "foot",
      featuredOnHome: true,
    },
    {
      title: "Diabetic Foot Care",
      description:
        "Diabetes calls for regular, careful foot checks. We watch for small problems before they become big ones and help you keep your feet healthy for the long run.",
      icon: "heart",
      featuredOnHome: true,
    },
    {
      title: "Nail Concerns",
      description:
        "Thick, ingrown, or discolored nails are common — and very treatable. We handle nail problems gently and get you back on your feet comfortably.",
      icon: "nail",
      featuredOnHome: true,
    },
    {
      title: "Heel Pain",
      description:
        "Heel pain that greets you first thing in the morning usually has a clear cause. We'll find yours and build a simple plan to ease it.",
      icon: "heel",
    },
    {
      title: "Custom Orthotics",
      description:
        "Shoe inserts made for your feet — not off a shelf. Good orthotics can ease pain in your feet, knees, and back with every step.",
      icon: "insole",
    },
    {
      title: "Red Light Therapy",
      description:
        "A gentle, painless treatment that uses light to ease pain and help your body heal. No needles, no downtime.",
      icon: "light",
      href: "/services/red-light-therapy",
      featuredOnHome: true,
    },
    {
      title: "Red Light Bed",
      description:
        "Full-body red light sessions in a relaxing, lie-down bed. Many patients use it for overall wellness, muscle recovery, and joint comfort.",
      icon: "bed",
      href: "/services/red-light-bed",
      featuredOnHome: true,
    },
  ],

  /**
   * Dedicated service pages rendered at /services/<slug>.
   * Each gets a hero, plain-language sections, optional pricing, and an FAQ.
   * Set pricing to null to hide the pricing section until confirmed.
   */
  featuredServicePages: [
    {
      slug: "red-light-therapy",
      title: "Red Light Therapy",
      heroTagline: "A gentle, painless way to ease pain and help your body heal.",
      whatItIs: [
        "Red light therapy shines warm, low-level red light on the skin. The light reaches the cells underneath and helps them work better — a bit like sunlight helping a plant, but without any harmful UV rays.",
        "It is painless, quiet, and relaxing. There are no needles, no medication, and no recovery time. You simply sit or lie comfortably while the light does its work.",
      ],
      whatASessionIsLike: [
        "A session usually takes about 10 to 20 minutes. You'll relax in a comfortable chair while the light panel is placed near the area we're treating.",
        "Most people feel a gentle warmth — many say it's the most relaxing part of their day. Afterward, you can drive, walk, and go about your day as normal.",
      ],
      whoItHelps: [
        "Patients with joint or muscle pain in the feet and ankles",
        "People with slow-healing skin or nail concerns",
        "Anyone with arthritis-related aches who wants a drug-free option",
        "Patients recovering from an injury who want to support healing",
      ],
      // [PRICING PLACEHOLDER] — set real prices, or null to hide the section.
      pricing: [
        { label: "Single session", price: "$[XX]" },
        { label: "Package of 6 sessions", price: "$[XXX]", note: "Our most popular option" },
        { label: "Monthly unlimited", price: "$[XXX]/month" },
      ],
      faq: [
        {
          question: "Does red light therapy hurt?",
          answer:
            "Not at all. Most people feel a mild, pleasant warmth. There are no needles and nothing touches your skin except light.",
        },
        {
          question: "How many sessions will I need?",
          answer:
            "It varies by person, but most patients notice a difference after 4 to 6 sessions. We'll give you an honest recommendation at your first visit.",
        },
        {
          question: "Is it safe?",
          answer:
            "Yes. Red light therapy uses no UV rays and is considered very safe. We'll review your health history first to make sure it's right for you.",
        },
        {
          question: "Is it covered by insurance?",
          answer:
            "Most insurance plans don't cover red light therapy yet, so we keep our pricing simple and affordable. Call us and we'll walk you through it.",
        },
      ],
      seoDescription:
        "Red light therapy at Coastal Foot & Ankle Center — a gentle, drug-free treatment for foot and ankle pain. Learn what it is, what a session is like, and who it helps.",
    },
    {
      slug: "red-light-bed",
      title: "Red Light Bed",
      heroTagline: "Full-body red light in a comfortable, lie-down bed.",
      whatItIs: [
        "Our red light bed looks a little like a tanning bed — but instead of UV rays, it surrounds your whole body with gentle red light. It's a way to give every part of you the same benefits as targeted red light therapy, all at once.",
        "People use it for overall wellness, muscle recovery, joint comfort, and healthier-feeling skin.",
      ],
      whatASessionIsLike: [
        "You'll lie down comfortably in a private room for about 15 to 20 minutes. The bed is warm, quiet, and relaxing — many patients close their eyes and simply rest.",
        "When your session ends, you're free to go right back to your day. There's no downtime at all.",
      ],
      whoItHelps: [
        "People with general aches, stiffness, or arthritis discomfort",
        "Active adults who want faster muscle recovery",
        "Anyone looking for a relaxing, drug-free wellness routine",
        "Patients already doing targeted red light therapy who want whole-body benefits",
      ],
      // [PRICING PLACEHOLDER]
      pricing: [
        { label: "Single session", price: "$[XX]" },
        { label: "Package of 10 sessions", price: "$[XXX]", note: "Best value" },
        { label: "Monthly membership", price: "$[XXX]/month" },
      ],
      faq: [
        {
          question: "Is this like a tanning bed?",
          answer:
            "It looks similar, but it's completely different. There are no UV rays, so it won't tan or burn your skin. It's gentle red light only.",
        },
        {
          question: "What should I wear?",
          answer:
            "The more skin the light reaches, the better — but you should wear whatever you're comfortable in. The room is completely private.",
        },
        {
          question: "How often should I come?",
          answer:
            "Many patients come 2 to 3 times a week to start. We'll help you find a rhythm that fits your goals and your schedule.",
        },
        {
          question: "Can I combine it with my other treatments?",
          answer:
            "Usually, yes. Tell us what you're being treated for and we'll make sure the bed is a good fit alongside your other care.",
        },
      ],
      seoDescription:
        "Full-body red light bed sessions at Coastal Foot & Ankle Center. Relaxing, drug-free support for muscle recovery, joint comfort, and overall wellness.",
    },
  ],

  // [PLACEHOLDER TESTIMONIALS] — replace with real patient reviews (with permission).
  testimonials: [
    {
      quote:
        "Dr. Thornberry took the time to actually listen to me. My heel pain is gone and I'm back to my morning walks.",
      name: "Margaret S.",
      context: "Heel pain patient",
      rating: 5,
    },
    {
      quote:
        "As a diabetic, I don't take chances with my feet. The whole team here is careful, kind, and thorough every single visit.",
      name: "Robert D.",
      context: "Diabetic foot care patient",
      rating: 5,
    },
    {
      quote:
        "I was skeptical about red light therapy, but after six sessions my ankle feels better than it has in years.",
      name: "Linda K.",
      context: "Red light therapy patient",
      rating: 5,
    },
    {
      quote:
        "I called at 9 o'clock at night expecting to leave a message, and my appointment was booked before I hung up. Wonderful practice.",
      name: "James P.",
      context: "New patient",
      rating: 5,
    },
  ],

  googleReviews: {
    rating: 4.9,
    count: "150+", // [PLACEHOLDER]
    // [PLACEHOLDER] — replace with the practice's real Google review link.
    reviewUrl: "https://g.page/r/REPLACE_WITH_GOOGLE_REVIEW_LINK/review",
  },

  /**
   * Store products — phase 1 is a simple grid with "Call to purchase".
   * The data shape (name/price/photo/description/buyUrl) is ready for
   * Stripe Payment Links or Shopify Buy Buttons later: set purchaseMode
   * to "buy" and fill buyUrl — no redesign needed.
   */
  products: [
    {
      name: "Red Light Therapy — 6-Session Package",
      price: "$[XXX]",
      description:
        "Six targeted red light sessions for foot and ankle pain. Our most popular way to start.",
      photo: "/store/red-light-package.jpg",
      purchaseMode: "call",
    },
    {
      name: "Red Light Bed — 10-Session Package",
      price: "$[XXX]",
      description:
        "Ten full-body red light bed sessions. Relax, recover, and feel the difference.",
      photo: "/store/red-light-bed-package.jpg",
      purchaseMode: "call",
    },
    {
      name: "Diabetic Comfort Socks",
      price: "$[XX]",
      description:
        "Soft, seam-free socks that protect sensitive feet and keep circulation happy.",
      photo: "/store/diabetic-socks.jpg",
      purchaseMode: "call",
    },
    {
      name: "Daily Foot Care Cream",
      price: "$[XX]",
      description:
        "A rich, doctor-recommended cream for dry, cracked heels and everyday softness.",
      photo: "/store/foot-cream.jpg",
      purchaseMode: "call",
    },
  ],

  callbackForm: {
    reasonsForVisit: [
      "General foot pain",
      "Diabetic foot care",
      "Nail concerns",
      "Red light therapy",
      "Other",
    ],
    confirmationMessage:
      "Thanks — our team will call you back within one business day to confirm.",
    hipaaNote:
      "Please don't include detailed medical information in this form. We'll talk through everything on the phone.",
  },

  seo: {
    // [PLACEHOLDER] — set the real production domain before launch.
    siteUrl: "https://www.coastalfootankle.com",
    defaultTitle: "Coastal Foot & Ankle Center | Podiatrists in Wilmington, NC",
    defaultDescription:
      "Caring, expert podiatry in Wilmington, NC. General foot care, diabetic foot care, nail concerns, and red light therapy. Call any time — our phone is answered 24/7.",
  },
};

export default config;
