import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    /* Project screenshots ask for 90 so they stay crisp; everything else uses the default 75. */
    qualities: [75, 90],
  },
  /* Old URLs from the previous site keep landing somewhere sensible. */
  async redirects() {
    return [
      /* One host only: www serves the same pages, so send it to the canonical origin. */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.milapmagar.com.np" }],
        destination: "https://milapmagar.com.np/:path*",
        permanent: true,
      },
      { source: "/work", destination: "/projects", permanent: true },
      { source: "/case-study", destination: "/projects", permanent: true },
      { source: "/case-study/:slug", destination: "/projects", permanent: true },
      { source: "/about-me", destination: "/experience", permanent: true },
      { source: "/about", destination: "/experience", permanent: true },
    ];
  },
};

export default nextConfig;
