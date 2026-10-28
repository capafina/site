import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

/**
 * Lets you open the dev server from a phone or tablet on the same Wi-Fi
 * (http://<laptop-ip>:3000). Next.js blocks its development scripts for any
 * address it doesn't recognise, which leaves the page visible but dead — the
 * menu button, form and other interactive parts stop working. This picks up
 * the laptop's current network address automatically, so it keeps working if
 * the router hands out a new one. Development only; no effect on the live site.
 */
const localNetworkAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((i) => i && !i.internal && (i.family === "IPv4" || (i.family as unknown) === 4))
  .map((i) => i!.address);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  allowedDevOrigins: localNetworkAddresses,
  redirects() {
    return [
      // Renamed for visitors: "regulated bridging" → "bridging for your home"
      { source: "/regulated-bridging", destination: "/bridging-for-your-home", permanent: true },
    ];
  },
};

export default nextConfig;
