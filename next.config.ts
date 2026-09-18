import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
