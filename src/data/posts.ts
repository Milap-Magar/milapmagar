import type { Post } from "@/types";

export const posts: Post[] = [
  {
    slug: "figma-to-production",
    title: "From Figma to production without losing the design",
    date: "2026-06-14",
    readTime: "6 min",
    tags: ["Design systems", "React", "Process"],
    featured: true,
    excerpt:
      "The gap between a polished Figma file and the shipped product is where most designs die. Here's the handoff process I use on my own projects — where the designer and the developer are the same person, and the design still tries to escape.",
    body: [
      "Every designer knows the feeling: the Figma file is perfect, the build is 'done', and somehow the product feels 10% worse. Spacing drifted. The type scale collapsed into three sizes. The hover states never made it. Nobody decided to lose the design — it leaked out one small compromise at a time.",
      "My fix is boring and it works: tokens before components. Before I write a single component, every colour, size, radius, and shadow in the Figma file becomes a CSS custom property with the same name the design file uses. When the code and the canvas share a vocabulary, 'close enough' stops being invisible — a wrong value looks wrong in the diff, not just on the screen.",
      "The second rule: motion is part of the design, not a garnish. I spec easing and duration in the design phase — this site runs almost everything on one cubic-bezier curve — so animation ships with the component instead of being sprinkled on at the end. One curve, used everywhere, reads as personality. Five curves read as noise.",
      "Last: review the build inside the design tool's frame. I screenshot the shipped page, drop it next to the mock, and look at them at the same zoom. It takes five minutes and it catches the drift that a code review never will. The design survives when someone keeps looking at it after the code exists.",
    ],
  },
  {
    slug: "framer-motion-patterns",
    title: "Framer Motion patterns I reuse on every project",
    date: "2026-04-02",
    readTime: "5 min",
    tags: ["Framer Motion", "React", "Animation"],
    excerpt:
      "After animating a dozen products I use the same four patterns everywhere: the staggered entrance, the scroll reveal, the layout-aware expand, and the spring that follows the cursor.",
    body: [
      "Animation libraries make it easy to do too much. The discipline that stuck for me is a small set of patterns, reused until they feel like the product's accent rather than a demo reel.",
      "Pattern one: the staggered entrance. A parent variant with staggerChildren and a single fade-up child variant covers 90% of page loads. The trick is restraint — 60 to 90 milliseconds between siblings, one ease curve, and never more than ~6 items staggering at once.",
      "Pattern two: the scroll reveal. whileInView with viewport={{ once: true }} and a negative margin so elements start animating just before they're fully visible. 'Once' matters: content that re-animates every time you scroll past it stops feeling alive and starts feeling broken.",
      "Pattern three: the layout-aware expand. Animating height to 'auto' inside AnimatePresence is the cleanest way to open cards, accordions, and read-in-place articles. Wrap the inner content in a div with overflow hidden and let Motion measure it — no hard-coded max-heights that break the moment copy changes.",
      "Pattern four: the cursor spring. useMotionValue for the raw pointer position, useSpring to smooth it, and a fixed element that trails the mouse. It's the cheapest way to make a page feel physical — and it degrades to nothing on touch screens, which is exactly what it should do.",
    ],
  },
  {
    slug: "chatblix-lessons",
    title: "Building a unified inbox: lessons from Chatblix",
    date: "2026-02-18",
    readTime: "7 min",
    tags: ["Product", "Node.js", "PostgreSQL"],
    excerpt:
      "Five messaging platforms, five webhook formats, five ideas of what a 'message' even is. What I learned normalising all of them into one inbox people actually triage.",
    body: [
      "Chatblix connects WhatsApp, Instagram, Messenger, Telegram, and TikTok into one inbox. The pitch is simple; the engineering lesson was that the hard part is never the integration — it's the abstraction you force the integrations into.",
      "My first schema was too faithful. It preserved every platform's quirks, which meant the inbox UI needed five rendering paths and every new feature cost five implementations. The rewrite went the other way: one aggressive, opinionated Message shape, and each platform adapter is responsible for squeezing into it. Anything that doesn't fit the shape doesn't ship until it earns a place in the core model.",
      "Webhooks taught me humility about delivery. Platforms retry, duplicate, and reorder events, and one of them (I won't say which) occasionally delivers a message's 'read' event before the message itself. Everything is idempotent now — every event handler can run twice safely — and the sync layer treats platform state as a rumour to verify, not a fact to trust.",
      "The product lesson was the best one: users didn't ask for more AI, more channels, or more dashboards. They asked for the unread list to be trustworthy. When the count says three, there must be exactly three. Infrastructure that keeps a small promise beats features that make big ones.",
    ],
  },
  {
    slug: "tokens-that-survive-themes",
    title: "Design tokens that survive a theme toggle",
    date: "2025-12-05",
    readTime: "4 min",
    tags: ["CSS", "Design systems", "Dark mode"],
    excerpt:
      "Dark mode isn't inverted light mode. The token structure that made this site's toggle painless: semantic names, values swapped per theme, and components that never know which theme they're in.",
    body: [
      "This site has a dark theme, a light theme, a device preference, and a manual toggle that overrides it. The reason that isn't a maintenance nightmare is one rule: components reference token names, never colours, and only the token values change per theme.",
      "Name tokens by role, not by appearance. --ink is the page ground and --white is the primary text — and yes, in light mode '--ink' resolves to white and '--white' to near-black. That feels wrong for about a day, and then it becomes the whole point: the component says 'page ground' and 'primary text', and the theme decides what those mean.",
      "Resolution order does the heavy lifting: base dark values on the root class, a prefers-color-scheme media query for device-light, and data-theme attributes set by the toggle that beat both. The anti-flash script sets the attribute before first paint, so nobody ever sees the wrong theme for a frame.",
      "The last piece is designing the second theme instead of generating it. Glows that look electric on charcoal look like smudges on white, so the dark theme gets green glow shadows and the light theme gets soft elevation instead. Same tokens, different values — different design, one system.",
    ],
  },
  {
    slug: "shipping-for-family-business",
    title: "Shipping e-commerce for a family business in Nepal",
    date: "2025-10-21",
    readTime: "5 min",
    tags: ["E-commerce", "Nepal", "Product"],
    excerpt:
      "Shreejana Dry Fruits taught me more about product design than any SaaS project — because the users were a family with a notebook, and the notebook was better than most admin dashboards.",
    body: [
      "When I built shreejanadryfruits.com, the family's existing system was a notebook: today's orders on one page, packed orders ticked off, shipped orders crossed out. My job was not to replace that system. It was to put it online without breaking what already worked.",
      "That reframing changed every design decision. The admin panel isn't a dashboard with charts — it's the notebook: a list of today's orders with two checkboxes each. The storefront doesn't require accounts, because their customers don't want relationships with software; they want half a kilo of cashews.",
      "The technical constraints were real-world in the best way. Customers shop on mid-range Android phones over inconsistent connections, so every image is compressed to the edge of visible quality and the checkout tolerates a network that disappears mid-request. 'Works on 3G in a load-shedding schedule' is a better performance budget than any Lighthouse score.",
      "It's still my favourite kind of shipped: a real family, selling real products, running the whole thing themselves. Software that quietly disappears into someone's livelihood is the highest compliment the craft gets.",
    ],
  },
];
