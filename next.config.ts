import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import path from "node:path";

const nextConfig: NextConfig = {
  // Cloudflare Pages serves prebuilt static HTML. `output: "export"` tells
  // Next.js to emit fully-static pages into ./out/ at build time. All 98
  // routes prerender (verified) so no runtime Node server is needed.
  output: "export",

  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Trailing-slash policy: keep it OFF (matches existing canonicals in every
  // page's metadata). Cloudflare Pages serves /foo.html for /foo without a
  // trailing slash by default — no change needed.

  turbopack: {
    root: path.resolve(__dirname),
  },

  images: {
    // Static export disables the built-in Image Optimization API. We use
    // plain <img> tags with Cloudinary transforms anyway, so `unoptimized`
    // is the correct setting — Cloudinary handles all resize/format work.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },

  // `headers()` and `redirects()` only run in the Next.js Node runtime, which
  // does not exist under `output: "export"`. Both are now served by Cloudflare
  // Pages via public/_headers and public/_redirects (Netlify-style format,
  // which Cloudflare Pages reads natively).
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
