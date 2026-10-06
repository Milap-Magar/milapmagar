import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    /* Project screenshots ask for 90 so they stay crisp; everything else uses the default 75. */
    qualities: [75, 90],
  },
  /* The site is a single profile page now; keep old links landing somewhere. */
  async redirects() {
    return ["/work", "/about-me", "/case-study", "/blog"].map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
