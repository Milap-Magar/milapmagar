import type { CaseStudy } from "@/types";

export const caseStudies: CaseStudy[] = [
  {
    slug: "chatblix",
    index: "01",
    title: "Chatblix",
    subtitle:
      "One inbox for WhatsApp, Instagram, Messenger, Telegram & TikTok — with AI that replies in your voice.",
    year: "2025",
    role: "Design · Full-stack build",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    url: "https://chatblix.com",
    image: "/Project-Showcase/chatblix.png",
    live: true,
    stats: [
      { value: 5, suffix: "", label: "Platforms unified" },
      { value: 1, suffix: "", label: "Shared inbox" },
      { value: 100, suffix: "%", label: "Owned, design to deploy" },
    ],
    chapters: [
      {
        label: "Problem",
        heading: "Five inboxes, zero overview",
        body: [
          "Small businesses live inside their DMs. A boutique in Kathmandu might sell through Instagram, confirm orders on WhatsApp, and field questions on Messenger, Telegram, and TikTok — five apps, five notification streams, and no single place to see who is still waiting for a reply.",
          "Messages slipped through the cracks, response times crept up, and every missed conversation was a missed sale. The brief I set myself: collapse all of it into one inbox that a non-technical shop owner could run from a single tab.",
        ],
      },
      {
        label: "Approach",
        heading: "Design the conversation, not the channel",
        body: [
          "I started in Figma with the thing users actually care about — the conversation thread — and made the source platform a small badge instead of a separate world. Every flow was designed around triage: unread first, oldest waiting on top, one keyboard shortcut from reply to done.",
          "The AI assistant came later in the design process, on purpose. Instead of a generic chatbot, it drafts replies in the owner's own tone, learned from their past messages — the human always sends, the AI just removes the blank-page moment.",
        ],
      },
      {
        label: "Build",
        heading: "One schema to hold five platforms",
        body: [
          "The hard engineering problem was normalisation: five platforms with different message shapes, media types, webhooks, and rate limits, flattened into one PostgreSQL schema so the inbox renders every thread the same way. A Node.js worker layer handles each platform's webhooks and keeps delivery states in sync.",
          "The front end is Next.js with TypeScript end to end — server components for the heavy inbox lists, optimistic updates for replies so the UI never waits on a third-party API to feel fast.",
        ],
      },
      {
        label: "Outcome",
        heading: "A single tab instead of five apps",
        body: [
          "Chatblix shipped as a production SaaS at chatblix.com. Businesses answer every channel from one screen, with AI drafts cutting the time-to-first-reply dramatically — and because I owned design and build, the product kept one consistent voice from landing page to inbox.",
        ],
      },
    ],
    pullQuote:
      "The inbox is the product. Everything else — platforms, webhooks, AI — exists to keep one list short.",
  },
  {
    slug: "shreejana-dry-fruits",
    index: "02",
    title: "Shreejana Dry Fruits",
    subtitle:
      "Taking a family-run home-packing udhyog in Nepal from word-of-mouth to a full e-commerce storefront.",
    year: "2024",
    role: "Design · Frontend · Backend",
    stack: ["React", "Nest.js", "MongoDB", "Tailwind", "Zoho"],
    url: "https://shreejanadryfruits.com",
    image: "/Project-Showcase/shreejana.png",
    live: true,
    stats: [
      { value: 24, suffix: "/7", label: "Storefront, up from zero" },
      { value: 1, suffix: "", label: "Family business online" },
      { value: 3, suffix: "", label: "Systems integrated" },
    ],
    chapters: [
      {
        label: "Problem",
        heading: "A great product with no shelf",
        body: [
          "Shreejana Dry Fruits is a home-packing udhyog — a small family operation with loyal repeat customers and no way to reach anyone beyond them. Orders arrived over phone calls and Facebook messages, stock lived in a notebook, and every sale depended on someone being awake to answer.",
          "They didn't need a tech startup; they needed a shelf that never closes and a checkout their customers' parents could use.",
        ],
      },
      {
        label: "Approach",
        heading: "E-commerce that feels like a neighbourhood shop",
        body: [
          "The design leans warm and simple: big product photography, prices up front, no account required to buy. Every screen was tested against one question — could a first-time internet shopper finish this order without calling for help?",
          "Behind the counter, the family needed the same simplicity. Order management had to fit how they already worked, so the admin flows mirror their notebook: today's orders, what's packed, what's shipped.",
        ],
      },
      {
        label: "Build",
        heading: "React storefront, Nest.js counter",
        body: [
          "The storefront is React with Tailwind; the back office is a Nest.js API over MongoDB, handling catalogue, stock, and order state. Zoho handles the business side — invoices and mail — so the family gets professional paperwork without me rebuilding accounting.",
          "Performance mattered more than usual: much of the audience shops on mid-range phones over patchy connections, so images are aggressively optimised and the checkout works even when the network stutters.",
        ],
      },
      {
        label: "Outcome",
        heading: "Open around the clock",
        body: [
          "shreejanadryfruits.com is live and taking orders. The family runs the whole operation themselves — catalogue, stock, and fulfilment — and the business now exists for customers who have never heard of it through word-of-mouth. It remains my favourite kind of project: real people, real shelf, real sales.",
        ],
      },
    ],
    pullQuote:
      "Could a first-time internet shopper finish this order without calling for help? Every screen had to pass that test.",
  },
];
