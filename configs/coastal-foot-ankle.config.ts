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

  // Real vector logo (provided by the client). A black & white variant is
  // also available at /logo/logo-bw.svg for future print/social use.
  logo: {
    src: "/logo/logo.svg",
    alt: "Coastal Foot & Ankle Center logo",
    width: 480,
    height: 203,
  },

  heroImage: {
    src: "/hero/cover-photo.png",
    alt: "A bare foot in the sand next to a footprint drawn with sea glass and shells",
  },
  heroVideo: "/hero/hero-loop.mp4",

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
    phone: "8435550123",
    phoneDisplay: "(843) 555-0123",
    // [PLACEHOLDER] — swap for the practice's real email.
    email: "hello@coastalfootankle.com",
    /**
     * IMPORTANT: leave address null until the practice confirms the street
     * address may be published. Setting it automatically turns on the full
     * address block, map pin, and JSON-LD street address across the site:
     *
     * address: { street: "123 Main St, Suite 4", city: "Hardeeville", state: "SC", zip: "29927" },
     */
    address: null,
    city: "Hardeeville",
    state: "SC",
    serviceArea:
      "Hardeeville, Bluffton, Sun City, Okatie, and the greater Hilton Head area",
    hours: [
      { days: "Monday – Thursday", hours: "8:00 AM – 5:00 PM" },
      { days: "Friday", hours: "8:00 AM – 12:00 PM" },
      { days: "Saturday – Sunday", hours: "Closed" },
    ],
  },

  aiReceptionist: {
    name: "Halo",
    blurb:
      "Call during office hours and we can usually schedule your appointment on the spot.",
    faq: [
      {
        question: "Wait — am I talking to a robot?",
        answer:
          "Sort of, but not like you might think. Halo is a friendly AI receptionist that answers our phone during office hours. It talks and listens just like a person, and it can schedule your appointment right there on the call. If anything comes up that Halo can't handle, our staff follows up personally.",
      },
      {
        question: "Can Halo actually book my appointment?",
        answer:
          "Yes. Halo can find a time that works and get you on the schedule during the same call — no waiting for a callback if you don't want to.",
      },
      {
        question: "What if I'd rather talk to a real person?",
        answer:
          "That's always fine. Just let Halo know, or call during regular office hours and our front desk team will help you directly.",
      },
      {
        question: "Is it safe to share my information with Halo?",
        answer:
          "Yes. Halo only collects what's needed to schedule your visit — your name, phone number, and reason for the call. Please save any detailed medical information for your actual appointment.",
      },
    ],
    website: "https://halohealth.app",
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
      // Real headshot — drop the photo at public/team/lauren-thornberry.webp
      // (a copy lives in Dropbox at /Website Assets/lauren-thornberry.webp).
      photo: "/team/lauren-thornberry.webp",
      bio: "Dr. Thornberry is a retired United States Navy officer who proudly followed both her mother and father into military service before dedicating her career to foot and ankle care. She earned her Doctor of Podiatric Medicine degree from the Kent State University College of Podiatric Medicine and completed her surgical residency at the Baltimore VA Medical Center, with additional training at Walter Reed and the Rubin Institute for Advanced Orthopedics.\n\nKnown for her warm smile and approachable style, Dr. Thornberry takes time to listen, explain every option in plain language, and partner with each patient to build a treatment plan that gets them back to the activities they love. Around Bluffton, you can almost always spot her by her signature headband — a small but unmistakable part of her everyday charm.\n\nWhen she's not caring for patients, Dr. Thornberry loves spending time with her three children, her parents, and her husband, often boating together through the creeks and rivers of the Lowcountry she calls home.",
      specialties: [
        "Bunions & hammertoes",
        "Ankle sprains",
        "Diabetic foot care",
        "Plantar fasciitis & heel spurs",
        "Custom orthotics & diabetic shoes",
      ],
      boardCertifications: [
        "Board Certified, ABPM",
        "Fellow, ACFAS",
        "U.S. Navy Veteran",
      ],
      role: "doctor",
    },
    {
      // Illustrative placeholder doctor — swap in a real hire + headshot
      // when available. Photo intentionally left unset: no real headshot
      // exists yet, so the page shows a clean initials avatar rather than
      // a stock photo of a real, unaffiliated person.
      name: "Dr. Michael Ramirez",
      credentials: "DPM",
      photo: "/team/doctor-2.jpg",
      bio: "Dr. Ramirez has spent more than a decade helping active adults get back on their feet. A former college athlete himself, he has a special interest in sports-related injuries and stress fractures, and he's quick to combine hands-on treatment with practical, real-world advice. Patients appreciate that he explains the 'why' behind every recommendation, not just the 'what.'",
      specialties: ["Sports injuries", "Heel pain", "Stress fractures"],
      boardCertifications: ["Board Certified, ABFAS"],
      role: "doctor",
    },
    {
      // Illustrative placeholder doctor — see note above.
      name: "Dr. Angela Chen",
      credentials: "DPM",
      photo: "/team/doctor-3.jpg",
      bio: "Dr. Chen focuses on the most vulnerable part of podiatry: wound care and diabetic foot health. She works closely with patients' primary care doctors to catch small problems early, and she's known for her calm, thorough approach with patients who feel anxious about their feet. Outside the office, she volunteers with a local diabetes education program.",
      specialties: ["Wound care", "Diabetic foot care", "Circulation concerns"],
      boardCertifications: ["Board Certified, ABPM"],
      role: "doctor",
    },
    {
      // Illustrative placeholder doctor — see note above.
      name: "Dr. James Whitfield",
      credentials: "DPM",
      photo: "/team/doctor-4.jpg",
      bio: "Dr. Whitfield has been part of the Lowcountry medical community for over two decades, and many of his patients have been with him since he first opened his doors. He has a gentle touch with nail and skin concerns and takes pride in fitting custom orthotics that actually get worn, not left in a drawer. He and his wife spend most weekends on the water.",
      specialties: ["Nail care", "Custom orthotics", "General podiatry"],
      boardCertifications: ["Board Certified, ABFAS"],
      role: "doctor",
    },
    {
      // Illustrative placeholder staff member.
      name: "Sarah Boone",
      credentials: "",
      title: "Medical Assistant",
      photo: "/team/staff-1.jpg",
      bio: "Sarah keeps every visit running smoothly, from checking you in to prepping the room before the doctor sees you. Patients often say she remembers little details about their lives between visits — she just has a knack for it.",
      specialties: [],
      boardCertifications: [],
      role: "support",
    },
    {
      // Illustrative placeholder staff member.
      name: "Patricia Nguyen",
      credentials: "",
      title: "Patient Care Coordinator",
      photo: "/team/staff-2.jpg",
      bio: "Patricia is usually the friendly voice patients talk to first, whether by phone or at the front desk. She helps coordinate appointments, insurance questions, and callback requests, and takes genuine pride in making sure no one falls through the cracks.",
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
      icon: "droplet",
      featuredOnHome: true,
    },
    {
      title: "Nail Concerns",
      description:
        "Thick, ingrown, or discolored nails are common — and very treatable. We handle nail problems gently and get you back on your feet comfortably.",
      icon: "toenail",
      featuredOnHome: true,
    },
    {
      title: "Heel Pain & Plantar Fasciitis",
      description:
        "Heel pain that greets you first thing in the morning usually has a clear cause. We'll find yours and build a simple plan to ease it.",
      icon: "heel",
    },
    {
      title: "Bunions & Hammertoes",
      description:
        "Sore, crooked, or rubbing toes don't have to be part of getting older. From better shoes to surgery when it's truly needed, we'll walk you through every option.",
      icon: "toes",
    },
    {
      title: "Ankle Sprains & Injuries",
      description:
        "A twisted ankle deserves more than ice and hope. We check how bad it really is and get you healing the right way, the first time.",
      icon: "ankle",
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
      // Real Class IV laser therapy program pricing from the practice's
      // Summus-based laser program. Set to null to hide.
      pricing: [
        {
          label: "Initial evaluation",
          price: "$150",
          note: "Assessment, movement analysis, and a personalized care plan",
        },
        { label: "Jumpstart — 3 weeks, 2x/week (6 sessions)", price: "$595", note: "$99 per session" },
        { label: "Jumpstart — 3 weeks, 3x/week (9 sessions)", price: "$849", note: "$94 per session" },
        { label: "Core Recovery — 6 weeks, 2x/week (12 sessions)", price: "$1,095", note: "$91 per session" },
        { label: "Core Recovery — 6 weeks, 3x/week (18 sessions)", price: "$1,495", note: "$83 per session" },
        { label: "Extended — 6–12 weeks, 2x/week (24 sessions)", price: "$1,895", note: "$79 per session" },
        { label: "Extended — 6–12 weeks, 3x/week (36 sessions)", price: "$2,495", note: "$69 per session" },
        { label: "Neuropathy program", price: "$2,995", note: "Our advanced program for diabetic and peripheral neuropathy" },
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
      // Real red light bed package pricing from the practice's RLT program.
      // Set to null to hide.
      pricing: [
        { label: "10 sessions", price: "$1,250" },
        { label: "20 sessions", price: "$1,699" },
        { label: "30 sessions", price: "$2,370" },
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
    // [PLACEHOLDER] — set the practice's real Google review link. Left null
    // on purpose: a fake link would 404 if clicked, so the button stays
    // hidden until this is real.
    reviewUrl: null,
  },

  /**
   * Store products — phase 1 is a simple grid with "Call to purchase".
   * The data shape (name/price/photo/description/buyUrl) is ready for
   * Stripe Payment Links or Shopify Buy Buttons later: set purchaseMode
   * to "buy" and fill buyUrl — no redesign needed. Prices below are
   * illustrative market-rate estimates — confirm with the practice before
   * launch. No product photos yet, so cards fall back to the practice
   * logo (see components/ProductCard.tsx) rather than a generic icon.
   */
  products: [
    {
      name: "Class IV Laser Therapy — 3-Week Jumpstart",
      price: "From $595",
      description:
        "Targeted laser therapy for foot and ankle pain, 2x a week for 3 weeks (6 sessions). Longer programs and a neuropathy program are also available — ask us for full pricing.",
      photo: "/store/red-light-package.jpg",
      purchaseMode: "call",
    },
    {
      name: "Red Light Bed — 10-Session Package",
      price: "From $1,250",
      description:
        "Ten full-body red light bed sessions. Relax, recover, and feel the difference. 20- and 30-session packages also available.",
      photo: "/store/red-light-bed-package.jpg",
      purchaseMode: "call",
    },
    {
      name: "Diabetic Comfort Socks (3-Pack)",
      price: "$24",
      description:
        "A 3-pack of soft, seam-free socks that protect sensitive feet and keep circulation happy.",
      photo: "/store/diabetic-socks.jpg",
      purchaseMode: "call",
    },
    {
      name: "Daily Foot Care Cream",
      price: "$19",
      description:
        "A rich, doctor-recommended cream for dry, cracked heels and everyday softness.",
      photo: "/store/foot-cream.jpg",
      purchaseMode: "call",
    },
  ],

  // Real photos not on file yet for these two — swap in once available;
  // ProductCard-style fallback graphics cover the gap until then.
  ebmMedical: {
    intro:
      "Some patients benefit from specialty prescription products supplied through EBM Medical. These aren't over-the-counter items — a doctor here reviews your case and orders the specific product and strength that's right for you. Request more information below, or ask about one at your next visit.",
    products: [
      {
        name: "IontoPatch™",
        category: "Topical pain relief",
        description:
          "A wireless, wearable patch that delivers anti-inflammatory medication directly to a painful joint or soft-tissue area — no needles. Formulated and customized to your doctor's exact order.",
        photo: "/store/ebm/iontopatch.jpg",
        infoSheetUrl: "/ebm/iontopatch-patient-information.pdf",
      },
      {
        name: "EB-N3® / EB-N5® / EB-N6®",
        category: "Nerve & vascular support",
        description:
          "A physician-prescribed medical food that helps manage the metabolic deficiencies behind nerve and blood vessel damage, including peripheral neuropathy — taken daily alongside your regular care.",
        photo: "/store/ebm/eb-n-series.jpg",
        infoSheetUrl: "/ebm/eb-n-series-patient-information.pdf",
      },
    ],
  },

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

  // [PLACEHOLDER LIST] — confirm the practice's real accepted plans before launch.
  insurance: {
    intro:
      "We're in-network with most major insurance plans. Not sure if yours is accepted? Call us — we're happy to check for you before your visit.",
    acceptedPlans: [
      "Medicare",
      "Blue Cross Blue Shield of South Carolina",
      "Aetna",
      "Cigna",
      "UnitedHealthcare",
      "Humana",
      "TRICARE",
    ],
    note:
      "Don't see your plan listed? Many plans we accept aren't shown here yet — call us and we'll confirm your coverage before your appointment.",
  },

  patientForms: [
    {
      label: "New Patient Registration Form",
      description:
        "Fill this out before your first visit — no printing or scanning needed.",
      url: "https://web4u.forms-db.com/view.php?id=1732046",
    },
  ],

  seo: {
    // [PLACEHOLDER] — set the real production domain before launch.
    siteUrl: "https://www.coastalfootankle.com",
    defaultTitle: "Coastal Foot & Ankle Center | Podiatrist in Hardeeville, SC",
    defaultDescription:
      "Caring, expert podiatry in Hardeeville, SC — serving Bluffton, Sun City, Okatie, and the Hilton Head area. Diabetic foot care, bunions, heel pain, and red light therapy. Call to schedule your appointment today.",
  },
};

export default config;
