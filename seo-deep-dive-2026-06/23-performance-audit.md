# Performance / Core Web Vitals Audit — theclaireai.com

**Date:** 2026-06-22/23
**Method & honest disclosure:** Live **PageSpeed Insights API quota was exhausted** (keyless daily limit, burned by earlier audit attempts), so lab/field numbers from PSI were unavailable this run. This assessment is built from **(a) static analysis of the `out/` build**, **(b) functional header probes against production**, and **(c) the thresholds/levers in `12-cloudflare-enterprise-best-practice-2026.md` and `11-ai-citation-mechanics-2026.md`**. **Action for user:** the cheapest authoritative measurement is **Cloudflare Observatory** (free, in dashboard — schedule a daily mobile test on `/`, `/product`, `/pricing`) plus the **auto-injected RUM/Web Analytics** for real P75 LCP/INP/CLS. Use INP (FID is retired).

## Static build profile
| Asset class | Measure |
|---|---|
| JS | 19 files, **784 KB uncompressed** (~210–240 KB over Brotli est.). Largest chunk **224 KB** (`f2f58a7e…js`), then 122/119/113 KB. |
| CSS | 1 file, **78 KB** (Tailwind) — single render-blocking stylesheet, acceptable. |
| Fonts | **6 × woff2** (good format); 1 preloaded in `<head>`. |
| Images | **0 local images** — 100% **Cloudinary** (`res.cloudinary.com`), served `f_auto,q_auto` (AVIF/WebP auto-negotiated). 101 Cloudinary refs on the homepage. |

## What's already right ✅
- **LCP image is preloaded** with `fetchpriority="high"` and Cloudinary `f_auto,q_auto` — textbook.
- Full **static prerender** (content in HTML, no client fetch for first paint).
- Single render-blocking CSS; fonts in woff2; `loading="lazy"` on 32 below-fold images.
- **HTTP/3** advertised; **Brotli** served; **HSTS** on.

## Issues & levers (ranked by impact)

1. **🔴 Hashed assets `max-age=0, must-revalidate`** (confirmed live on `/_next/static/chunks/*.js`). Every repeat view revalidates each JS/CSS/font → wasted RTTs, worse repeat-view LCP/INP. **Fix (Cloudflare/_headers):**
   ```
   /_next/static/*
     Cache-Control: public, max-age=31536000, immutable
   ```
2. **🟠 No `preconnect` to `res.cloudinary.com`.** The LCP hero and *all* imagery are on Cloudinary, but there is no early connection hint → DNS+TCP+TLS to the image origin happens late, delaying LCP. **Fix:** add to `<head>` (or `_headers` as a `Link` early-hint):
   ```
   <link rel="preconnect" href="https://res.cloudinary.com" crossorigin>
   ```
3. **🟠 Over-preloading (~9 images).** The homepage preloads the hero **plus** 4 integration logos and 3+ secondary images. Preloading many images dilutes the hero's priority and competes for bandwidth → can *raise* LCP. **Fix:** preload **only** the LCP hero (+ critical font); let the rest lazy-load. Net LCP win.
4. **🟢 zstd not enabled** (br is served to real browsers; only zstd-only clients fall back to uncompressed). Add a Compression Rule for zstd if desired — marginal.
5. **🟢 Largest JS chunk 224 KB** — investigate whether a heavy dependency can be code-split/deferred; low priority for a static marketing site, but worth a `@next/bundle-analyzer` pass.

## Expected CWV posture (unverified — confirm via Observatory/RUM)
Given full prerender, a preloaded `f_auto` LCP image, one small CSS file, and mostly-static interactivity, **LCP and CLS are likely "Good" and INP low-risk**. The two things most likely to hold back the *measured* score are the **late Cloudinary connection (LCP)** and **repeat-view asset revalidation** — both fixed by levers #1–#3 above. Validate with real numbers before/after.
