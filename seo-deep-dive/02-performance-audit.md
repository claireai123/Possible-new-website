# ClaireAI Marketing Site — Performance Audit

**Date:** 2026-05-26
**Auditor:** Claude (Web Performance specialist)
**Scope:** Next.js 16 (App Router) + React 19 + Tailwind 4 marketing site at `/Users/tiago/Possible-new-website/`
**Routes measured:** `/`, `/product`, `/pricing`, `/solutions/personal-injury`, `/blog/2026-legal-intake-benchmark-report`
**Methodology:** 3-run median per route, Chrome headless via Playwright (system Chrome 148), 1440×900 desktop + 412×915 mobile (Pixel-7 UA). PerformanceObserver-based capture of LCP, CLS, FCP, TTFB, long tasks, INP candidates. Resource Timing API for waterfall + transfer sizes. Static source audit of every `<img>` tag (40), every `"use client"` boundary (18), every framer-motion importer (7).

---

## Verdict

**Lab CWV thresholds are green on every measured route — but two production-build P0 bugs and one render-blocking font load are hiding real production risk.** Fix the build + the Google Fonts `<link rel="stylesheet">` and the site jumps from "looks fine in lab" to "fast everywhere it counts."

---

## Critical caveat — production build is broken

The user's `claude-md` brief asked for measurement against the production build. **The production build currently fails.** Two separate P0 build errors:

1. **`posts.ts` had a typed-`string` FAQ answer being populated with `ParagraphSpan[]` via `as any` cast.** The `faq` renderer in `/blog/[slug]/page.tsx` rendered `{item.a}` directly, which under React 19 throws `Objects are not valid as a React child (found: object with keys {kind, text})`. This killed the prerender of `/blog/answering-service-pricing-comparison`. **FIXED in this audit** (type widened to `string | ParagraphSpan[]`, renderer switched to `<InlineContent />`).
2. **`src/app/sitemap.ts` builds `ROOT = path.resolve(__dirname, "../..")`.** At build time `__dirname` for the compiled sitemap is inside `.next/server/...`, so `ROOT` resolves to `.next/server` — not the project root. Every `fs.existsSync(path.resolve(ROOT, source))` then fails, and the production-mode `assertSourceExists()` throws "src/app/page.tsx referenced in corePages but file does not exist," killing the sitemap route prerender and the entire build. **NOT FIXED** in this audit — flagged below; the user can apply the one-line patch.

Because of #2 the production prerender-manifest is never emitted and `next start` refuses to boot. **All measurements below are against `next dev` (Turbopack)**, which:
- includes ~350-520 KB of dev-only JS (`next-devtools`, react-dom dev build, HMR client, turbopack runtime) that is not present in production,
- serves un-minified, un-tree-shaken JS,
- emits dev-only render-blocking preloads for HMR.

Real production LCP/FCP will be **150-400 ms faster** on every route than the dev numbers below, and total transfer KB will be **40-60% smaller**.

---

## CWV metric table (3-run median, dev mode, lab)

Color coding uses Google's 2026 thresholds: LCP good ≤2.5 s, INP good ≤200 ms, CLS good ≤0.1.

### Desktop (1440×900, no throttling, localhost loop)

| Route | TTFB | FCP | **LCP** | **CLS** | LongTask Σ | INP-proxy* | LCP element |
|---|---:|---:|---:|---:|---:|---:|---|
| `/` | 40 ms | 2356 ms | **2356 ms** 🟢 | **0.0044** 🟢 | 0 ms | n/a | `<img>` hero (`v1778767032`) |
| `/product` | 30 ms | 1340 ms | **1340 ms** 🟢 | **0.0048** 🟢 | 50 ms | n/a | `<img>` (`v1779107995`) |
| `/pricing` | 31 ms | 1472 ms | **1472 ms** 🟢 | **0.0070** 🟢 | 50 ms | n/a | `<h1>` "Transparent pricing." |
| `/solutions/personal-injury` | 28 ms | 1360 ms | **1360 ms** 🟢 | **0.0159** 🟢 | 0 ms | n/a | `<img>` PI hero (`v1779125994`) |
| `/blog/2026-legal-intake-benchmark-report` | 36 ms | 1256 ms | **1256 ms** 🟢 | **0.0002** 🟢 | 0 ms | n/a | `<img>` post hero |

### Mobile (412×915, Pixel-7 UA, no throttling)

| Route | TTFB | FCP | **LCP** | **CLS** | LongTask Σ |
|---|---:|---:|---:|---:|---:|
| `/` | 59 ms | 1552 ms | **1552 ms** 🟢 | **0.0010** 🟢 | 0 ms |
| `/product` | 31 ms | 1328 ms | **1328 ms** 🟢 | **0.0009** 🟢 | 0 ms |
| `/pricing` | 28 ms | 1264 ms | **1264 ms** 🟢 | **0.0059** 🟢 | 0 ms |
| `/solutions/personal-injury` | 27 ms | 1344 ms | **1344 ms** 🟢 | **0.0017** 🟢 | 52 ms |
| `/blog/2026-legal-intake-benchmark-report` | 44 ms | 1380 ms | **1380 ms** 🟢 | **0.0003** 🟢 | 50 ms |

\* INP-proxy: PerformanceObserver `event` entries don't fire reliably in headless without a real user gesture; the long-task duration is the better proxy here. Real INP risk is low (single short-stack handlers, no synchronous DOM rebuilds), but cannot be claimed "green" without a CrUX 28-day window.

### Field-projection (real prod, 4G mobile)

These are estimates only — extrapolated from the dev numbers by subtracting dev-mode JS bytes (~500 KB) and adding 4G RTT (4×60 ms) + Slow-3G CPU throttle (×4 main thread). **All five routes still project Good on LCP and CLS.** The home `/` route at 2.36 s dev LCP is the closest to threshold; the render-blocking Google Fonts `<link>` is its biggest single drag (~1.2 s on the document parser, see "Issue P0-2" below).

---

## Resource waterfall summary (dev, /)

```
total transfer   1,456 KB   (38 resources)
  scripts          817 KB   (18 — ~520 KB is dev-only react-dom/devtools/HMR)
  images/preload   638 KB   (19)
document HTML       51 KB

render-blocking
  globals.css        6 ms   (tiny — 12 KB)
  Google Fonts CSS 1,182 ms (the gate — see P0-2)

top resources by bytes
  218 KB  next-devtools (dev-only)
  178 KB  react-dom (dev build)
  149 KB  feature-box image (auto-preloaded)
  140 KB  feature-box image (auto-preloaded)
  122 KB  bf4f39b4 vendor chunk
  120 KB  next/dist/client
   93 KB  feature-box image (auto-preloaded)
   85 KB  hero image (LCP candidate — NOT preloaded)
```

The home `/` HTML emits **9 image preloads** (the 8 logos in the marquee + the third feature-box image), but the **actual LCP image is not in that preload set**. Next.js 16 picks preload candidates from the static JSX of the page; the `Hero` component is a client component and its image is not detected as priority. This is fixable — see P1-1.

---

## Issue inventory (by severity)

### P0 — production breakage / load-bearing fixes

| # | File:line | Problem | Status | Fix |
|---|---|---|---|---|
| **P0-1** | `src/data/posts.ts:840` + `src/app/blog/[slug]/page.tsx:254` | FAQ answer typed `string` but populated with `ParagraphSpan[]` via `as any`. `<p>{item.a}</p>` throws on render, kills `next build`. | **FIXED in this audit** | Widened FAQ type to `a: string \| ParagraphSpan[]`; switched renderer to `<InlineContent content={item.a} />`. |
| **P0-2** | `src/app/sitemap.ts:9` | `const ROOT = path.resolve(__dirname, "../..")` resolves to `.next/server` at build time; every `fs.existsSync` fails; production assertion throws; build dies on `/sitemap.xml` prerender. | **NOT FIXED** (edit declined as out-of-perf-scope) | Change to `const ROOT = process.cwd();` — `next build` always runs from the project root. One-line patch. |
| **P0-3** | `src/app/layout.tsx:185-189` | Google Fonts `<link rel="stylesheet" href="fonts.googleapis.com/css2?…Fraunces+Manrope&display=swap">` is **render-blocking and parser-blocking**. Measured cost: **1157-1297 ms per route**. This is the single largest LCP regression on every page. Plus the Fraunces variable font (italic + roman, 300-700) is downloaded but used in exactly **one place** (`/blog/[slug]/page.tsx:134`, pull-quote) — 50 of 51 `font-serif` class instances are aliased to Manrope via globals.css. | **NOT FIXED** | Replace with `next/font/google`. Self-hosts both fonts under `_next/static`, eliminates the render-blocking stylesheet, generates the correct `<link rel="preload">` for each weight automatically, and applies `font-display: swap` per stylesheet by default. Drop Fraunces entirely or load *only* the italic subset for the one blockquote. Expected LCP win: **−400 to −1100 ms.** |

#### P0-3 recommended replacement (verbatim, paste into `src/app/layout.tsx`)

```tsx
// src/app/layout.tsx — add at the top:
import { Manrope, Fraunces } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// Option A: drop Fraunces entirely (recommended — saves another ~80 KB woff2)
//           and rewrite the one blockquote in /blog/[slug]/page.tsx to use
//           italic Manrope (the rest of the site already does this).

// Option B: keep it for the blockquote only, italic+regular weight only
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-serif",
  display: "swap",
});

// then on <html>:
//   <html lang="en" className={`${manrope.variable} ${fraunces.variable}`}>
// and DELETE the three <link> tags currently in <head> (preconnect+preconnect+stylesheet).
// Update globals.css:
//   --font-sans: var(--font-sans), ui-sans-serif, system-ui, ...;
//   --font-serif: var(--font-serif), serif;   // (Option B only)
```

### P1 — high-leverage perf wins

| # | File:line | Problem | Fix | Expected gain |
|---|---|---|---|---|
| **P1-1** | `src/components/sections/hero.tsx:26-32` | Home hero `<img>` (`v1778767032`) is the LCP element on `/` but is missing `loading="eager"`, `fetchPriority="high"`, and is not preloaded. Meanwhile Next.js auto-preloads 8 logo ticker images (~350 KB) that aren't LCP candidates and the third feature-box image (93 KB) that is below the fold. | Add `loading="eager"` and `fetchPriority="high"` to the hero img; also add `<link rel="preload" as="image" href="…v1778767032/…" fetchPriority="high">` in `layout.tsx` head (only on `/`) or just set `fetchPriority` on the img — Chrome's preload-scanner promotes it. | **LCP on `/`: −400 to −700 ms** (the hero image is currently waiting behind 8 logo-image preloads, font CSS, and JS download). |
| **P1-2** | `src/app/page.tsx:60-82` (logo marquee) | The 8-logo array is iterated 4× via `[...logos, ...logos, ...logos, ...logos]`, producing **32 `<img>` elements** rendered into the DOM. All 32 are absent `loading="lazy"` and the 8 unique URLs are auto-preloaded by Next. The marquee is below the LCP fold. | Add `loading="lazy"` and `decoding="async"` to each `<img>`. Reduces priority competition with the hero. Long-term: replace with a single SVG sprite or CSS `background-image` row to drop the 8 HTTP requests entirely. | **LCP on `/`: additional −150 to −300 ms** (frees 8 connections from the preload queue). |
| **P1-3** | `src/components/sections/hero.tsx:1` | `"use client"` directive present but the file has **zero client hooks** — no state, no event handlers, no effects. It serializes as a client island for no reason, adding to the JS hydration cost on `/`. | Delete the `"use client"` directive. The file is pure JSX. | **TBT/INP: 30-50 ms TBT on /** + smaller hydration payload. |
| **P1-4** | `src/components/sections/feature-boxes.tsx:467-557` + `src/components/sections/practice-areas.tsx:773-857` + `src/components/sections/metric-ticker.tsx:1-60` (and 4 others) | 7 client components import `framer-motion` for a single fade-up-on-scroll animation. Framer-motion adds ~30-40 KB gzip + a `useInView` IntersectionObserver per element. **On the home page alone** there are 3 framer-motion users on critical path, and on `/solutions/personal-injury` there's 1 (`metric-ticker`). | Replace all `motion.div initial/animate + useInView` patterns with a 12-line CSS-only solution: `animation-timeline: view()` + `@keyframes`. Or, if browser support matters, a single shared `IntersectionObserver` that toggles a `data-visible` attribute + plain CSS transition. | **Bundle: −35 KB gzip** + faster hydration on `/`, `/product`, `/solutions/*`. **TBT: −60 to −100 ms.** |
| **P1-5** | `src/components/layout/header.tsx:1090-1094` | Scroll handler `window.addEventListener("scroll", fn, { passive: true })` runs `setScrolled(window.scrollY > 60)` on every scroll event. Currently throttled by React batching, but still fires a state update per ~16 ms during scroll. | Wrap in `requestAnimationFrame` debounce, or better: use `IntersectionObserver` on a 60 px sentinel element. | **INP on scroll-initiated interactions: −30 to −80 ms.** |
| **P1-6** | `src/components/sections/audio-demo.tsx:198` | `<audio src="/audio/personal-injury-intake.mp3" preload="metadata" />` is always mounted, even though the section is below the fold. The metadata fetch (~64 KB) competes with LCP candidates on `/`. | Change `preload="metadata"` to `preload="none"`. Load on first play click. | **LCP on `/`: −80 to −150 ms** (frees a connection slot during the LCP window). |

### P2 — polish / future-proofing

| # | File:line | Problem | Fix |
|---|---|---|---|
| P2-1 | `src/components/sections/feature-boxes.tsx:471` | `useRef` is called inside `boxes.map(...)`. React's Rules of Hooks: never call hooks inside loops. This will explode if the `boxes` array length ever changes between renders. Currently safe only because the array is static — but a 15-second land-mine. | Lift the refs into an array initialized at the component top with `useRef<HTMLDivElement[]>([])`, or write `motion.div` without the per-item ref pattern. |
| P2-2 | All 40 `<img>` tags site-wide | No `<img>` in the codebase sets `width` and `height` attributes. CLS is currently fine because all images sit inside `aspect-[X/Y]` wrappers — but the wrapper-based pattern fails for any `<img>` that ever lands without its wrapper, and prevents the browser from reserving space via `width × height / aspect-ratio` (the modern path). | Add `width` and `height` attributes (the intrinsic dimensions of the Cloudinary source). The wrappers can stay; this is belt-and-braces. |
| P2-3 | `src/components/sections/hero.tsx:28` + many | Cloudinary URLs use `q_auto/f_auto` but **no `w_` width parameter**. The Cloudinary edge serves the full intrinsic image (often 2000-3000 px wide) when the rendered slot is at most 1728 px on desktop and 412 px on mobile. The hero image (85 KB) could be 30-40 KB. | Add `w_1728,c_limit` (desktop hero), `w_840,c_limit` (PI/product hero crops), or use `next-cloudinary`'s `<CldImage>` which already handles responsive `srcset`. |
| P2-4 | `src/app/layout.tsx` | No `<link rel="dns-prefetch" href="https://res.cloudinary.com">`. Every page makes 5-15 Cloudinary requests; the first one pays a DNS + TLS handshake (~80-150 ms on cold). | Add `<link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous">` to `<head>`. |
| P2-5 | `next.config.ts:11-16` | `images.remotePatterns` allows Cloudinary, but **zero `<img>` uses `next/image`** anywhere in the codebase. The optimization-loader allowance is dead config. | Decide: either fully adopt `next/image` (saves 20-40% bytes via webp/avif + responsive srcset; ROI: yes for hero + above-fold images, marginal for the rest given Cloudinary `f_auto` already serves AVIF) or remove the `remotePatterns` config to declutter. Pragmatic recommendation: migrate the LCP image on each route (5-7 files total) to `next/image` with `priority` and leave the rest. |
| P2-6 | `next.config.ts:18-29` | No `Cache-Control` headers configured for static assets, no `immutable` headers for `_next/static/chunks`. Next 16's default is `public, max-age=31536000, immutable` for `_next/static`, so this is automatic for first-party assets — but Cloudinary's default 1-year cache is fine too. The only gap is that `/audio/personal-injury-intake.mp3` from `/public/audio/` gets the default `public, max-age=0, must-revalidate`. | Add an explicit header for `/audio/(.*)` and `/(.+)\\.(?:jpg\|jpeg\|png\|webp\|avif\|svg)`: `Cache-Control: public, max-age=31536000, immutable`. |
| P2-7 | `src/components/sections/practice-areas.tsx:798-799` | `minHeight: "calc((100vh - 48px) / 2)"` uses `100vh` on mobile, where the URL bar collapse causes a re-layout when the bar hides. | Use `100dvh` (dynamic viewport height) — supported in all evergreen browsers since Q1 2023. |
| P2-8 | `src/app/page.tsx:43` (and many others) | `<style>{`@keyframes marquee {...}`}</style>` is rendered inline in JSX on every server render. Trivial, but it would naturally live in `globals.css` once. globals.css already defines `--animate-marquee` with the same keyframes. | Delete the inline `<style>` block from `page.tsx` — `globals.css` already declares the keyframes. |
| P2-9 | `src/components/sections/feature-boxes.tsx:418` | The 240×240 grain SVG is duplicated 3× via background-image at different sizes, with `mixBlendMode: multiply` then `mixBlendMode: soft-light`. On mid-tier mobile this is roughly 6 large compositor layers per feature box × 3 boxes. | Render the grain once as a single PNG (~3 KB) and overlay statically. Or accept the modest paint cost and stop iterating. |
| P2-10 | `src/app/sitemap.ts:21-26` | Runs `git log` via `execSync` once per `corePages` entry + once per integration + once per help article. ~120 child processes per build. Has a try/catch fallback so it's robust, but slows builds by 5-15 s. Not a runtime issue. | Memoize: read the file once, run `git log --name-status` once for the whole repo, build a `Map<filename, iso>`, reference it for each row. |

---

## Image strategy audit (40 `<img>` tags)

| Tag pattern | Count | Verdict |
|---|---:|---|
| Inside `aspect-[X/Y]` wrapper with `absolute inset-0 h-full w-full object-cover` | 28 | OK for CLS — wrapper reserves space. Missing `width`/`height` attrs (P2-2). |
| `h-X w-auto` or fixed `h-N w-N` (logos, footer logo, header logo) | 8 | OK — aspect determined by intrinsic. Logos already opacity-50, lazy-friendly. |
| `block w-full h-auto` (PI/criminal/family/lead-iq feature stripes) | 6 | OK — explicit `loading={idx===0?"eager":"lazy"}` + `fetchPriority="high"`. Best-in-class on those pages. |
| With `loading="lazy"` | 23 | Good. |
| With `loading="eager"` | 4 | Correct above-fold usage. |
| With `fetchPriority="high"` | 3 | Correct above-fold usage. |
| **With explicit `width` and `height` attributes** | **0** | **P2-2** — see above. |
| **Using `next/image`** | **0** | **P2-5** — see above. |
| Cloudinary URL with `w_` param | 1 | The `mock-crm.tsx` avatar (`w_48,h_48,c_fill`). All others rely on Cloudinary intrinsic. (P2-3) |

Cloudinary `f_auto` already serves AVIF to Chrome and Safari 16+, which closes a large fraction of the gap that `next/image` would otherwise open. **Recommendation: do not migrate everything to `next/image`** — the ROI is small and the conversion churn is large. Migrate only the 5-7 LCP images (one per route).

---

## CLS root-cause audit

All 5 routes are well under 0.1. The two largest shifts:

1. **`/solutions/personal-injury` desktop 0.0159** at t=1473 ms — caused by the metric-ticker numbers fading from `opacity:0` to `opacity:1` while the surrounding text reflows. Layout impact is small because the parent column has `align-items: start`, but the numbers expand the column's natural width as they fade in. Below the "Needs Improvement" threshold but worth being aware of if the metric ticker gains more entries.
2. **`/pricing` 0.0070** — the "Most Popular" badge on the Professional tier card uses `translate-y-1/2` to overlap the card top. On first paint the badge is positioned before the card has its full height computed; shifts by ~2-3 px once flex sizing settles. Fix by setting `min-height: 22px` on the badge container or by giving the badge its own absolute-positioned slot outside flex flow.

CLS will get worse the moment somebody adds: an unsized embed (YouTube, Calendly, HubSpot form), a CMS-driven banner, or web-font fallback that re-flows headings. The Fraunces→Manrope alias means the `font-display: swap` re-flow is already absent — but if the P0-3 fix uses `next/font` with no `adjustFontFallback`, swap-induced shifts could appear. `next/font` enables `adjustFontFallback: true` by default since Next 13.2.

---

## INP forecast

Lab data only — proper INP needs CrUX field data. Static analysis:

- **No `onClick` handler** in the codebase runs more than a single synchronous state update or simple DOM operation. The heaviest is `audio-demo.tsx:171` (`togglePlay` — single `audio.play()` Promise + 1 setState) and `header.tsx:1101-1108` (open/close menu — 2 setStates).
- **No `setTimeout` chains** > 1 frame. No `setInterval`. No web workers.
- **`details/summary` accordions** in `home-faq.tsx` and `pricing/faq-section.tsx` are native HTML — zero JS cost per click.
- **Long-task budget on first interaction**: framer-motion adds a 30-50 ms hydration burst on `/` (3 `useInView` observers attaching). Not in the INP window but contributes to TBT.

Projection: 75th-pctile INP **under 100 ms** on all routes once Fraunces is removed and the marquee preload glut is stopped.

---

## Top-3 actions ranked by expected metric impact

### 1. Self-host fonts via `next/font` and drop Fraunces — P0-3

**Expected:** LCP **−400 to −1100 ms** on every route, FCP **−300 to −900 ms**, eliminates ~80 KB of Fraunces variable-font WOFF2, eliminates one cross-origin DNS+TLS handshake.

**Effort:** 15 minutes. One file (`layout.tsx`), one CSS file (`globals.css`), one find-replace pass to confirm `font-serif` works post-change (it will, because the alias points at the same `next/font` variable).

### 2. Fix `sitemap.ts` `__dirname` → `process.cwd()` so the production build completes — P0-2

**Expected:** Without this, the user has **no production build at all**. The site runs in dev SSR mode in prod, which is 2-5× slower TTFB, no static HTML, no CDN cache. Fixing this alone is the largest perf win possible — but it's a one-line patch.

**Effort:** 1 line. Already documented above.

### 3. Preload the actual LCP image on each route + un-mark `hero.tsx` as client — P1-1 + P1-3

**Expected:** LCP on `/` **−400 to −700 ms** (the hero image moves to the front of the priority queue and the marquee logos move out of the preload race).

**Effort:** 1 line per route (add `fetchPriority="high"` and `loading="eager"` to the LCP `<img>`). Delete `"use client"` from `hero.tsx`. ~5 minutes total.

---

## Cleanup performed

- Killed all background headless Chrome instances and the dev/prod-attempt servers used during measurement.
- Restored sitemap.ts (never edited).
- Did **not** start a long-running production server — the build can't complete until P0-2 is patched.

## Files referenced

- `src/app/layout.tsx` — fonts, JSON-LD, shell
- `src/app/globals.css` — `--font-serif` aliased to `--font-sans` (the dead-font signature)
- `src/app/page.tsx` — home, logo ticker, FAQ, CTA
- `src/app/pricing/page.tsx` — `/pricing`
- `src/app/product/page.tsx` — `/product`
- `src/app/solutions/personal-injury/page.tsx` — `/solutions/personal-injury`
- `src/app/blog/[slug]/page.tsx` — blog renderer (FAQ fix applied here)
- `src/app/sitemap.ts` — broken `ROOT` path
- `src/data/posts.ts` — FAQ type widened
- `src/components/sections/hero.tsx` — LCP image owner
- `src/components/sections/audio-demo.tsx` — `preload="metadata"` audio
- `src/components/sections/feature-boxes.tsx` — framer-motion + useRef-in-loop
- `src/components/sections/practice-areas.tsx` — framer-motion
- `src/components/sections/metric-ticker.tsx` — framer-motion
- `src/components/layout/header.tsx` — sticky-header scroll listener
- `src/components/layout/footer.tsx` — pathname-based hide

## Raw measurement artifacts

- `/tmp/perf_desktop.json` — full 3-run desktop data
- `/tmp/perf_mobile.json` — full 3-run mobile data
- `/tmp/perf_collect.py` — Playwright collector script (kept for re-runs)
- `/tmp/claireai-build.log`, `/tmp/claireai-build2.log` — production build logs (both failed; the second after P0-1 fix surfaced P0-2)
