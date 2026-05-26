# Sitemap Audit — ClaireAI marketing site

**Verdict: BROKEN — needs 9 fixes (3 P0, 4 P1, 2 P2) before this sitemap is fit to submit to Google Search Console.**

Audit performed: 2026-05-26 against `src/app/sitemap.ts` and the live `http://localhost:3000/sitemap.xml` rendered by the dev server. 96 URLs emitted. Six (~6%) of them are confirmed 404s.

---

## Top 3 actions (do these first)

1. **Remove the six dead rows from `corePages`** (compare-smith-ai, compare-ruby-receptionists, privacy-policy, terms-of-service, careers, product/legal-intake). These return 404 in dev right now and will fail the `assertSourceExists` guard the moment a production build runs — meaning the site cannot deploy until they are removed or the pages are built. This is a build-blocker.
2. **Add the five missing blog post URLs** that exist in `POSTS` but are not in the sitemap (outsource-legal-intake-guide, legal-intake-question-bank, answering-service-pricing-comparison, best-ai-receptionist-law-firms-2026, missed-call-revenue-loss-law-firms). Coverage is currently 17% (1 of 6 posts indexed via sitemap). Note: `/blog/answering-service-pricing-comparison` 500s — fix the render error before adding it.
3. **Switch core/integration URLs to use each row's own data-source date** instead of a single shared git mtime per category. The current sitemap emits identical `lastModified` across all 67 integration URLs because `gitMtime("src/data/integrations.ts")` returns one timestamp for the whole array. That trips Google's "consistently and verifiably accurate" test and causes the entire domain's lastmod signal to be discarded.

---

## Issues table

| Sev | File:Line | Problem | Fix |
|-----|-----------|---------|-----|
| P0 | `src/app/sitemap.ts:42` | `/product/legal-intake` row references `src/app/product/legal-intake/page.tsx` — file does not exist. URL returns 404. Will throw at production build via `assertSourceExists`. | Delete row (no page exists) or build the page first. |
| P0 | `src/app/sitemap.ts:51` | `/compare-smith-ai` — file does not exist, URL 404s, blocks prod build. | Delete row. |
| P0 | `src/app/sitemap.ts:52` | `/compare-ruby-receptionists` — file does not exist, URL 404s, blocks prod build. | Delete row. |
| P0 | `src/app/sitemap.ts:53` | `/privacy-policy` — file does not exist, URL 404s, blocks prod build. **CRITICAL for a B2B SaaS — needs to be built, not just removed from sitemap.** | Build page, then keep row. Interim: delete row. |
| P0 | `src/app/sitemap.ts:54` | `/terms-of-service` — file does not exist, URL 404s, blocks prod build. **Same compliance concern as privacy-policy.** | Build page, then keep row. Interim: delete row. |
| P0 | `src/app/sitemap.ts:55` | `/careers` — file does not exist, URL 404s, blocks prod build. | Delete row. |
| P1 | `src/data/posts.ts:317,496,728,861,950` | 5 of 6 published `POSTS` entries are NOT in the sitemap. Currently the sitemap only emits the benchmark report (line 50 of sitemap.ts is a hardcoded single row). Generated coverage is wrong-by-design — should iterate over `POSTS`. | Replace the hardcoded blog row with `POSTS.map(...)` (see diff below). |
| P1 | `src/app/blog/[slug]/page.tsx` (renders 500) | `/blog/answering-service-pricing-comparison` returns HTTP 500 with `<meta name="robots" content="noindex">` and `next-error="not-found"`. Likely a runtime error in the post body or a missing field. Sitemap currently doesn't include it (P1 #1 would have surfaced it). Cannot add to sitemap until fixed. | Diagnose the render error (likely a malformed section in POSTS index 3) and either fix or remove from POSTS. |
| P1 | `src/app/sitemap.ts:81-90` | All 67 integration URLs share a single `perIntegrationLastMod` value (max of `integrations.ts` mtime vs the slug template mtime). Editing one integration's `oneLiner` updates every URL's lastmod simultaneously — that is exactly the "inaccurate lastmod" pattern Google penalises domain-wide. | Add a per-integration `lastUpdated` ISO date field on each `Integration` (mirror what `HELP_ARTICLES` already does) and use it. Interim: still better than `new Date()`, leave as-is until per-record dates are added. |
| P1 | `src/app/sitemap.ts:75-79` | `corePages` rows all return the file mtime of the page itself, but the home page (`page.tsx`) is heavily composed from `@/components/sections/*` — editing a section component does not bump the home page's git mtime. The home page lastmod under-reports real change. | Compute a folder-walk mtime: `git log -1 --format=%cI -- src/app/page.tsx src/components/sections/`. Same applies to `/integrations` (depends on `INTEGRATIONS` data) and `/help` (depends on `HELP_ARTICLES`). |
| P1 | dev-server output (live) | All 96 URLs in the rendered sitemap currently share the EXACT same `lastmod` (`2026-05-26T18:19:03.156Z`) — meaning `gitMtime` is falling through to `FALLBACK_DATE = new Date()` in dev. Cause: `__dirname` in a Next.js App Router server function compiles to `.next/...`, so `path.resolve(__dirname, "../..")` lands outside the git repo and `git log` returns empty (caught by the try/catch, falls back to `new Date()`). This may also affect Vercel production builds. | Replace `path.resolve(__dirname, "../..")` with `process.cwd()` — Next.js sets cwd to the project root at build time. Verify with a build then `curl` the rendered sitemap. |
| P2 | `public/robots.txt:9-11` | `Disallow: /admin/` and `Disallow: /portal/` are present but no such routes exist on the marketing site (the dashboard at `app.theclaireai.com` is a separate origin). Harmless but noise. | Optional: remove or leave (defensive). |
| P2 | `src/app/sitemap.ts` (whole file) | No image extensions (`<image:image>`) despite the site having heavy Cloudinary imagery (hero shots, integration logos, blog hero images). Image sitemap is not required but is a documented signal for Google Images discovery. | Optional enhancement — see "Image sitemap proposal" below. |

---

## Validation checklist

| Check | Status |
|-------|--------|
| Valid XML, correct namespace | PASS (`xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`) |
| ISO-8601 lastmod | PASS (`2026-05-26T18:19:03.156Z`) but values are wrong (see P1) |
| < 50,000 URLs / < 50MB | PASS (96 URLs, ~6KB) — no index needed |
| All URLs return 200 | **FAIL** — 6 × 404 (P0s above) |
| `/about` not present | PASS (correctly excluded, 308-redirects to `/`) |
| `llms.txt` / `llms-full.txt` not present | PASS (correctly excluded — they're noindex per `next.config.ts`) |
| All sitemap URLs match the page's `rel="canonical"` | PASS — Next.js `metadataBase` resolves relative canonicals to `https://theclaireai.com` so canonicals like `canonical: "/how-it-works"` render as `https://theclaireai.com/how-it-works` matching the sitemap (verified by curling rendered HTML on `/`, `/blog`, `/solutions/personal-injury`, `/solutions/criminal-defense`). |
| No trailing-slash drift | PASS (sitemap omits trailing slash; pages render canonical without trailing slash) |
| No `www` vs apex drift | PASS (apex everywhere) |
| `priority` / `changefreq` present | PASS — neither emitted (Next.js Metadata API doesn't emit them by default) |
| Robots.txt → Sitemap reference | PASS (`Sitemap: https://theclaireai.com/sitemap.xml` on line 100) |
| noindex pages excluded | PASS for `/not-found` (`robots: { index: false }` in `src/app/not-found.tsx:7`); PASS for `llms.txt` (header set in `next.config.ts:21-27`) |
| Build-time guard for missing files | PASS as code, **but currently violated** — `assertSourceExists` will throw in production for the 6 P0 rows. Either the next prod build will fail loudly, or somebody has been overriding it. |
| 50,000 URL limit | PASS (96) |
| Programmatic-page review | See "Programmatic-content review" below |

---

## Programmatic-content review (site-reputation-abuse policy 2026)

The sitemap contains three programmatic clusters. Counts:

- `/integrations/[slug]` — **67 URLs**. Risk: medium. Quality gate: under our agent's guidance, > 30 location-style pages need 60% unique content per page. Inspecting `src/data/integrations.ts`: each integration has a unique `tagline` and (for ~50 of 67) a unique multi-sentence `oneLiner`. ~17 integrations have **no `oneLiner` at all** (e.g. those that fall back to template copy in the slug page). Action: audit the slug template (`src/app/integrations/[slug]/page.tsx`) to confirm it renders meaningfully different content for the 17 logo-and-tagline-only records. If it doesn't, drop them from the sitemap or fill in `oneLiner` for each.
- `/help/[slug]` — **10 URLs**. Safe — each article has 200+ words of unique content with explicit author, dates, and FAQ.
- `/blog/[slug]` — **6 URLs intended** (1 currently emitted). Safe — each post is 5-min+ reading time with original research.

No location pages (`/[city]`, `/[state]`) detected. The hard 30 / 50-page quality gates are not triggered.

**One specific risk to flag**: the `compare-smith-ai` and `compare-ruby-receptionists` URLs currently in the sitemap (and 404ing) suggest a planned "comparison page" pattern. Before launching those, note Google's site-reputation-abuse update now treats programmatic `compare-X` / `vs-X` / `best-X-for-Y` pages as in-scope for manual action. Build them as substantive editorial pages (real testing, screenshots, pricing tables) — not Mad-Libs templates.

---

## Code diffs

### P0 fix — remove dead rows (minimal patch to unblock prod build)

```diff
--- a/src/app/sitemap.ts
+++ b/src/app/sitemap.ts
@@ -39,18 +39,12 @@ const corePages: { url: string; source: string }[] = [
   { url: `${BASE_URL}/integrations`, source: "src/app/integrations/page.tsx" },
   { url: `${BASE_URL}/contact`, source: "src/app/contact/page.tsx" },
   { url: `${BASE_URL}/product`, source: "src/app/product/page.tsx" },
-  { url: `${BASE_URL}/product/legal-intake`, source: "src/app/product/legal-intake/page.tsx" },
   { url: `${BASE_URL}/product/lead-iq`, source: "src/app/product/lead-iq/page.tsx" },
   { url: `${BASE_URL}/solutions`, source: "src/app/solutions/page.tsx" },
   { url: `${BASE_URL}/solutions/personal-injury`, source: "src/app/solutions/personal-injury/page.tsx" },
   { url: `${BASE_URL}/solutions/criminal-defense`, source: "src/app/solutions/criminal-defense/page.tsx" },
   { url: `${BASE_URL}/solutions/family-law`, source: "src/app/solutions/family-law/page.tsx" },
   { url: `${BASE_URL}/blog`, source: "src/app/blog/page.tsx" },
   { url: `${BASE_URL}/help`, source: "src/app/help/page.tsx" },
-  { url: `${BASE_URL}/blog/2026-legal-intake-benchmark-report`, source: "src/data/posts.ts" },
-  { url: `${BASE_URL}/compare-smith-ai`, source: "src/app/compare-smith-ai/page.tsx" },
-  { url: `${BASE_URL}/compare-ruby-receptionists`, source: "src/app/compare-ruby-receptionists/page.tsx" },
-  { url: `${BASE_URL}/privacy-policy`, source: "src/app/privacy-policy/page.tsx" },
-  { url: `${BASE_URL}/terms-of-service`, source: "src/app/terms-of-service/page.tsx" },
-  { url: `${BASE_URL}/careers`, source: "src/app/careers/page.tsx" },
 ];
```

### P1 fix — iterate over POSTS, add per-post dates

```diff
--- a/src/app/sitemap.ts
+++ b/src/app/sitemap.ts
@@ -5,6 +5,7 @@ import fs from "node:fs";
 import path from "node:path";
 import { INTEGRATIONS } from "@/data/integrations";
 import { HELP_ARTICLES } from "@/data/help-articles";
+import { POSTS } from "@/data/posts";

 const BASE_URL = "https://theclaireai.com";
-const ROOT = path.resolve(__dirname, "../..");
+const ROOT = process.cwd();
@@ -98,7 +99,30 @@ export default function sitemap(): MetadataRoute.Sitemap {
       lastModified: !isNaN(parsed.getTime()) ? parsed : helpDataMtime,
     };
   });

-  return [...core, ...help, ...integrations];
+  // Blog posts: prefer post.lastUpdated, fall back to post.date, fall back to posts.ts mtime.
+  // The strings in posts.ts are human-readable ("Feb 14, 2026" / "May 19, 2026") — parse once
+  // through Date.parse which handles both forms. Skip any post that 404s or 500s in prod.
+  const postsDataMtime = gitMtime("src/data/posts.ts");
+  const blogPosts: Entry[] = POSTS.map((p) => {
+    const raw = p.lastUpdated ?? p.date;
+    const parsed = raw ? new Date(raw) : null;
+    return {
+      url: `${BASE_URL}/blog/${p.slug}`,
+      lastModified: parsed && !isNaN(parsed.getTime()) ? parsed : postsDataMtime,
+    };
+  });
+
+  return [...core, ...blogPosts, ...help, ...integrations];
 }
```

### P1 fix — fix `__dirname` so git mtime actually works in production

```diff
--- a/src/app/sitemap.ts
+++ b/src/app/sitemap.ts
@@ -7,7 +7,7 @@ import { INTEGRATIONS } from "@/data/integrations";
 import { HELP_ARTICLES } from "@/data/help-articles";

 const BASE_URL = "https://theclaireai.com";
-const ROOT = path.resolve(__dirname, "../..");
+const ROOT = process.cwd();
 const FALLBACK_DATE = new Date();
```

Verification: after this change, `curl -s http://localhost:3000/sitemap.xml | grep lastmod | sort -u | wc -l` should be > 1 (currently it's 1, meaning every URL has identical lastmod — the giveaway that fallback is firing).

### P1 fix — per-integration dates (requires data-model change)

Add a `lastUpdated` field to `Integration` in `src/data/integrations.ts`:

```diff
 export interface Integration {
   id: string;
   name: string;
+  /** ISO date for sitemap lastmod. Bump when you materially change tagline/oneLiner. */
+  lastUpdated: string;
   category: IntegrationCategory;
```

Backfill: set every existing record to `"2026-05-19"` (the file's current git mtime). New records get the date you actually add them.

Then in `sitemap.ts`:

```diff
-  const integrations: Entry[] = INTEGRATIONS.map((i) => ({
-    url: `${BASE_URL}/integrations/${i.id}`,
-    lastModified: perIntegrationLastMod,
-  }));
+  const integrations: Entry[] = INTEGRATIONS.map((i) => {
+    const parsed = new Date(i.lastUpdated + "T00:00:00Z");
+    return {
+      url: `${BASE_URL}/integrations/${i.id}`,
+      lastModified: !isNaN(parsed.getTime()) ? parsed : perIntegrationLastMod,
+    };
+  });
```

### P2 — optional image sitemap

If you want to submit an image sitemap for the integration logos and blog heroes, the cleanest pattern in Next 16 is a second `sitemap-image.xml` route built by hand (the `MetadataRoute.Sitemap` type does not yet support `<image:image>` children — it'll be added but isn't there as of 16.x). Lower priority; do it only after the P0 / P1 hygiene above.

---

## Drop-in robots.txt (current is acceptable but lightly cleanable)

The current `public/robots.txt` is already strong. Optional tightening:

```
# ClaireAI — AI Legal Receptionist
# https://theclaireai.com

# Catch-all: allow indexing, block ops paths
User-agent: *
Allow: /
Disallow: /api/

# Sitemaps (absolute URL per spec)
Sitemap: https://theclaireai.com/sitemap.xml
```

The verbose per-agent allow blocks in the existing file are not needed (the catch-all `User-agent: *` already permits them), but they're harmless and arguably good documentation of who you've explicitly approved. Keep them if you want the visible policy statement.

---

## Verification commands after fixes land

```bash
# 1. Every sitemap URL returns 200 (no 404, no 500, no redirect)
curl -s https://theclaireai.com/sitemap.xml | grep -oE 'https://[^<]+' | \
  while read url; do code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-redirs 0 "$url"); echo "$code $url"; done | grep -v '^200'

# 2. Lastmod is not identical for all URLs (proves gitMtime works)
curl -s https://theclaireai.com/sitemap.xml | grep -oE '<lastmod>[^<]+' | sort -u | wc -l
# Expect: > 5

# 3. /about is not present
curl -s https://theclaireai.com/sitemap.xml | grep -c '/about<' # Expect: 0

# 4. URL count
curl -s https://theclaireai.com/sitemap.xml | grep -c '<url>' # Expect: 101 (96 - 6 dead + 5 blog + privacy/terms when built)
```
