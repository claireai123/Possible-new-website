# Technical SEO / Crawlability / Indexability Audit — ClaireAI Marketing Site

**Audit date:** 2026-06-22
**Auditor:** Technical SEO agent (Fortune-50-grade, exhaustive — no cherry-picking)
**Build inspected:** `/Users/tiago/Possible-new-website/out` (Next.js 16 static export)
**Production:** https://theclaireai.com (Cloudflare Pages, project `claireaiwebsite`)
**Pages inspected:** **104 of 104** built `.html` files (every page, individually parsed for title/desc/canonical/robots/lang/charset/viewport/OG/Twitter/H1-hierarchy/JSON-LD/links). Production verified via live `curl` on headers, status codes, and the RSC payload surface.

**Technical score: 78 / 100.** The fundamentals are strong (clean canonicals, no broken internal links, full static prerender, no deprecated schema, sitemap/build parity, HSTS). Points lost to: site-wide wrong-domain login link, og:image dropped on 81 pages, wrong og:type on 78 pages, no immutable caching on hashed assets, publicly-served RSC `.txt` payloads, stale pricing in llms.txt, and systematic title-length problems.

---

## Verification of prior-audit claims

| Prior claim | Status against current build |
|---|---|
| FAQPage JSON-LD removed | **CONFIRMED — 0 occurrences** in all 104 files |
| HowTo JSON-LD removed | **CONFIRMED — 0 occurrences** |
| Outbound-link security pass (noopener/noreferrer on `target=_blank`) | **HELD for editorial/vendor links** — all 100+ external editorial links carry `rel="noopener noreferrer"`. **One exception:** the site-wide "Log in" link (see Critical C1) has no rel and points to the wrong domain. |
| Trailing-slash OFF, canonicals match | **CONFIRMED** — every canonical is absolute, self-referential, no trailing slash; homepage canonical = `https://theclaireai.com` matches sitemap `<loc>` exactly |
| Sitemap honesty / no orphans | **CONFIRMED** — sitemap = 102 URLs, build indexable = 102, perfect parity, zero missing, zero orphan |
| RFC 8288 Link headers in production | **CONFIRMED** — all 5 (api-catalog, service-doc, describedby, sitemap, agent-skills) present on live `curl` |
| Caching: max-age=0/must-revalidate on everything (memory concern) | **CONFIRMED AND IS A REAL PROBLEM** — hashed immutable assets get `max-age=0, must-revalidate` (see High H3) |

No deprecated schema types found anywhere. Full `@type` inventory across the build: Organization, Person, PostalAddress, ContactPoint, ListItem, SoftwareApplication, WebApplication, AggregateOffer, WebPage, WebSite, Place, Country, TechArticle, Thing, UnitPriceSpecification, Offer, BreadcrumbList, SpeakableSpecification, BlogPosting, Article, Audience, ItemList, CollectionPage, Blog, BusinessAudience. All current/valid.

---

# Issues by severity

## CRITICAL

### C1 — Site-wide "Log in" link points to a Vercel preview domain (`claire-ai-two.vercel.app`), no rel
- **Where:** `src/components/layout/header.tsx` lines 243 and 469 → renders on **all 104 pages** (104 occurrences in the build).
- **What:** Header "Log in" link is `href="https://claire-ai-two.vercel.app"`. This is a Vercel preview/staging URL, not the production app. It also has **no `rel`** while being a cross-origin link.
- **Impact:** Leaks a staging domain to every visitor and crawler; sends real users/login traffic off-brand; dilutes domain authority signals; the staging app may be unstable or get torn down (broken login site-wide). Memory `marketing-site-state-2026-05-26` notes the correct Log-in URL was confirmed — this is not it.
- **Fix:** Replace both occurrences with the real production app/login URL. Add `rel="noopener noreferrer"` (it is cross-origin). One-line data change → fixes 104 pages. **Quick win.**

### C2 — React Server Component `.txt` payloads are publicly served and indexable
- **Where:** 812 `.txt` files in `out/` — e.g. `out/pricing.txt`, `out/index.txt`, `out/__next._tree.txt`, plus per-route `__next.<route>.txt`. Live-verified: `https://theclaireai.com/pricing.txt`, `/index.txt`, `/__next._tree.txt` all return **HTTP 200**.
- **What:** Next.js 16 emits RSC streaming payloads as `.txt` alongside HTML. They contain the full serialized page data (including the JSON-LD and content). `robots.txt` only disallows `/api/`, `/_next/`, `/admin/`, `/portal/` — it does **not** cover these root-level `.txt` files. `_headers` only `noindex`es `/llms.txt` and `/llms-full.txt`.
- **Impact:** Search engines can discover and index these as low-quality duplicate/garbage content (raw RSC dumps), creating duplicate-content and index-bloat risk and exposing internal payload structure.
- **Fix (pick one):**
  - Add `X-Robots-Tag: noindex` for `*.txt` in `public/_headers` while explicitly re-allowing indexing of `robots.txt`/`sitemap`/`llms` as desired, **or**
  - Add `Disallow: /*.txt$` to `robots.txt` (but keep llms.txt reachable for AI crawlers — they read it directly regardless of robots), **or**
  - Best: a Cloudflare rule returning 404/noindex for `__next*.txt` and the RSC `.txt` mirrors. Confirm llms.txt is preserved.
- **Note:** This is a Next-16-export side effect; treat as a deploy-config fix, not a content fix.

---

## HIGH

### H1 — `og:image` is missing on 81 of 104 pages
- **Where:** Every page that defines its own `openGraph` block without re-declaring `images` — all 66 integration pages, all solutions pages, product + product/lead-iq, how-it-works, blog index, help index, integrations index, contact, careers, pricing, solutions index, both team pages. (Blog *posts* and the homepage/privacy/terms keep an image.)
- **Root cause:** Next.js merges `openGraph` per-field; a child route that sets `openGraph: { title, description, url, type }` **without `images`** drops the parent layout's `images` array entirely. Confirmed in `src/app/integrations/[slug]/page.tsx` (lines 52-57) and the page-level metadata of each affected route. Verified in build: `out/integrations/clio.html` has og:title/description/url/type but **no og:image** (Twitter image survives because the child doesn't override `twitter`).
- **Impact:** Link previews on LinkedIn/Slack/iMessage/Facebook for 81 pages render with no image — major share-CTR and brand loss, especially for the 66 integration pages that are link-bait for partner co-marketing.
- **Fix:** Either (a) add a default `images` to each child `openGraph`, or (b) centralize OG image via a helper so child metadata spreads the parent images, or (c) generate per-page OG images. Lowest-effort: include the brand OG image in the shared metadata builder used by integration/solution/help templates. **Quick win at the template level (fixes ~78 pages in 3 files).**

### H2 — Wrong `og:type` on 78 non-article pages
- **Where:** og:type=`article` on all 66 integration pages, 3 solutions detail pages, product + product/lead-iq, how-it-works, and (debatably) 10 help articles.
- **What:** Integration, solution, product, and how-it-works pages are evergreen product/marketing pages, not articles. `og:type=article` mislabels them (and `article` expects `article:published_time`/`author`, which are absent).
- **Impact:** Misclassification for social/AI scrapers; loses the correct `website`/`product` semantics. Help articles as `article` is acceptable; the integration/solution/product/how-it-works ones are wrong.
- **Fix:** Set `og:type: "website"` (or omit to inherit the layout's `website`) for integration/solution/product/how-it-works pages. In `integrations/[slug]/page.tsx` change line 56 `type: "article"` → `"website"`. **Quick win.**

### H3 — Hashed immutable static assets are NOT cached (max-age=0)
- **Where:** `public/_headers` has **no rule** for `/_next/static/*`. Live-verified: `https://theclaireai.com/_next/static/chunks/424c0bbc38637cae.js` returns `cache-control: public, max-age=0, must-revalidate`.
- **What:** Content-hashed JS/CSS/font assets (filenames change on every content change) should be `max-age=31536000, immutable`. Right now every repeat visit revalidates ~784 KB of JS + 78 KB CSS + fonts.
- **Impact:** Slower repeat-view load; unnecessary 304 round-trips; worse LCP/TTFB on return visits; wasted Cloudflare edge requests. This is the memory-flagged caching problem, confirmed real.
- **Fix:** Add to `public/_headers`:
  ```
  /_next/static/*
    Cache-Control: public, max-age=31536000, immutable
  /_next/static/media/*
    Cache-Control: public, max-age=31536000, immutable
  ```
  HTML pages should stay `max-age=0, must-revalidate` (they are, correctly). **Quick win — config-only.**

### H4 — Pricing is inconsistent across surfaces; llms.txt is wrong
- **Where & values:**
  - `pricing.html` (canonical source): **$450 / $850 / $1,800** (Starter/Growth/Enterprise)
  - `layout.tsx` JSON-LD AggregateOffer: lowPrice **450**, highPrice **1800**; meta description "From $450/mo" — consistent with pricing page
  - `integrations/[slug]/page.tsx` featured FAQ: **$450 / $850 / $1,800** — consistent
  - `public/llms.txt`: **Starter $650 / Growth $1,299 / Enterprise $2,999** — **STALE / WRONG**
- **Impact:** llms.txt is the file AI crawlers (ChatGPT, Claude, Perplexity) read as the authoritative machine-readable pricing. It currently advertises prices ~45-65% higher than the live site. AI answers will quote wrong pricing; also an internal trust/consistency red flag.
- **Fix:** Update `public/llms.txt` pricing block to match the pricing page ($450/$850/$1,800), and the call-count tiers if those changed too. Also update the agent-skills `sha256` if llms.txt content changes (see M5). **Quick win.**

### H5 — llms.txt links to 3 pages that do not exist (404 for AI crawlers)
- **Where:** `public/llms.txt` references `https://theclaireai.com/solutions/immigration-law`, `/compare-smith-ai`, and `/compare-ruby-receptionists`. None of these are built (verified: no such files in `out/`, and they are absent from the sitemap).
- **Impact:** AI crawlers following llms.txt hit 404s; the "Immigration Law" practice area is advertised in llms.txt but has no page (the other 3 practice areas do). Erodes the credibility of the machine-readable surface.
- **Fix:** Either build the 3 pages or remove the dangling links/practice-area entry from llms.txt. **Quick win (removal).**

### H6 — `contact.html` has zero `<h1>` (heading hierarchy violation)
- **Where:** `out/contact.html` — main heading "Book a demo" renders as `<h2>` (two H2s, no H1). Source: `src/app/contact/page.tsx` uses `<h2>` for the page title; `src/app/contact/layout.tsx` only sets metadata.
- **Impact:** Every other page has exactly one H1; contact is the only page missing it. Weakens topical signal and accessibility on a key conversion page.
- **Fix:** Promote the primary "Book a demo" heading to `<h1>`. **Quick win.**

---

## MEDIUM

### M1 — Double brand suffix in 11 titles (`… | ClaireAI | ClaireAI`)
- **Root cause:** `layout.tsx` sets `title.template = "%s | ClaireAI"`, but these pages hardcode `… | ClaireAI` in their own `title`, so the template appends a second suffix.
- **Affected:** `blog.html`; all 8 blog posts (via `blog/[slug]/page.tsx` line 30 `${post.title} | ClaireAI`); `solutions/criminal-defense` (line 11); `solutions/family-law`.
- **Fix:** Remove the hardcoded `| ClaireAI` from these page titles (and from the blog `[slug]` template — use bare `post.title`) and let the layout template add it once. **Quick win.**

### M2 — Title too long (>60 chars) on ~85 pages
- **Where:** Almost all integration pages use template `ClaireAI × {Vendor} Integration — AI Legal Receptionist | ClaireAI` (61-81 chars). Most blog/help/solutions titles also exceed 60.
- **Impact:** Google truncates in SERPs (~580-600px ≈ 60 chars). The integration suffix "— AI Legal Receptionist | ClaireAI" is the wasted tail on 66 near-identical titles.
- **Fix:** Shorten the integration template to e.g. `{Vendor} Integration | ClaireAI` (the layout already adds the brand). Trim blog/help/solutions titles to ≤60. Largest single win is the integration template in `integrations/[slug]/page.tsx` line 44.

### M3 — Meta description too long (>160 chars) on ~58 pages
- **Where:** `contact.html` 304 chars (worst), `callrail` 234, `smartadvocate` 238, `simplyconvert` 225, `litify` 219, plus most integration `oneLiner` descriptions and several blog/team descriptions.
- **Impact:** Google truncates descriptions (~155-160 chars); the tail is wasted. Not ranking-critical but hurts SERP CTR.
- **Fix:** Trim integration `oneLiner`s in `src/data/integrations.ts` to ≤160; fix the contact description in `contact/layout.tsx`.

### M4 — Blog posts lack `BreadcrumbList`
- **Where:** Blog post pages have `Article` but no `BreadcrumbList`. Integration, solution, help, product, team pages all have breadcrumbs. Blog is the inconsistent set.
- **Impact:** Loses breadcrumb rich-result eligibility on 8 content pages that are prime SERP candidates.
- **Fix:** Add a `BreadcrumbList` (Home → Blog → Post) to `blog/[slug]/page.tsx`.

### M5 — agent-skills `sha256` will drift if llms.txt changes
- **Where:** `public/.well-known/agent-skills/index.json` pins `sha256: aabaae4e…` for `llms.txt`. If H4/H5 edits land, this hash becomes invalid.
- **Fix:** Recompute and update the sha256 after editing llms.txt, or automate it in the build.

---

## LOW

### L1 — Empty orphan directory `/.well-known/mcp/`
- `out/.well-known/mcp/` ships empty and is referenced nowhere (`_headers`, source, robots). Either populate it (MCP manifest) or remove it from `public/.well-known/`.

### L2 — `_headers` references `/llms-full.txt` which does not exist
- `public/_headers` sets `X-Robots-Tag: noindex` for `/llms-full.txt`, but that file is absent (404 confirmed in production). Harmless orphan rule; remove or create the file.

### L3 — Two 404 pages canonicalize to the homepage
- `404.html` and `_not-found.html` both emit `canonical=https://theclaireai.com` and have identical title/description. They are correctly `noindex`, so impact is nil, but the self-pointing-to-home canonical on a noindex page is slightly unusual. Acceptable; leave as-is or self-canonical.

### L4 — `access-control-allow-origin: *` on the main HTML document
- Production returns `access-control-allow-origin: *` on the HTML page itself (likely a broad CF/_headers rule). Not harmful for a public marketing site, but CORS wildcard is normally scoped to the discovery JSON files only, not HTML. Verify the `/*` block isn't unintentionally widening CORS.

### L5 — No CSP / X-Frame-Options / Permissions-Policy
- Production has HSTS (preload), `x-content-type-options: nosniff`, `referrer-policy: strict-origin-when-cross-origin` — good. Missing: `Content-Security-Policy`, `X-Frame-Options`/`frame-ancestors`, `Permissions-Policy`. Not SEO-ranking factors, but standard hardening for a Fortune-50-grade posture; add via `_headers`.

### L6 — 126 `<img>` tags have no `loading` attribute
- 506 total images: all have `alt` (excellent — 0 missing), 15 decorative empty-alt (correct), 92 eager, 288 lazy, 126 with no `loading` attr (browser default = eager). Below-fold images without `loading="lazy"` are a minor LCP/bandwidth cost. Audit the 126 and lazy-load below-fold ones.

### L7 — Many preload hints on the homepage (LCP contention risk)
- Homepage preloads the LCP hero (`fetchPriority="high"` — correct) plus 7+ additional images and a low-priority script. Over-preloading can contend with the true LCP element. Keep only the single LCP image at high priority; consider demoting the logo-strip preloads.

---

# Category scorecard

| Category | Status | Notes |
|---|---|---|
| 1. Crawlability (robots, sitemap, noindex) | **PASS w/ caveats** | robots.txt valid + rich AI allowlist + Content-Signal; sitemap 102 URLs, perfect build parity, honest per-file lastmod; **BUT** RSC `.txt` payloads unprotected (C2) |
| 2. Indexability (canonicals, duplicates, thin content) | **PASS** | All canonicals absolute/self-ref/no-trailing-slash; only 1 dup title (the two 404s, both noindex); only 3 thin pages (2×404 + 1 team, expected); full static prerender |
| 3. Security (HTTPS, headers) | **PARTIAL** | HTTPS + HSTS preload + nosniff + referrer-policy good; missing CSP/XFO/Permissions-Policy (L5); CORS wildcard on HTML (L4) |
| 4. URL structure / redirects | **PASS** | Clean URLs, no trailing slash, `/about → / (301)` correct, 0 broken internal links across 104 pages |
| 5. Mobile (viewport, touch) | **PASS** | All 104 pages have viewport + responsive Tailwind; lang=en + charset on all |
| 6. Core Web Vitals potential | **PARTIAL** | LCP hero has fetchPriority=high + preload (good), fonts preloaded, ~784KB JS (reasonable); **BUT** no immutable caching on hashed assets (H3) hurts repeat-view; over-preloading (L7); 126 imgs no loading attr (L6). INP risk low (mostly static + `<details>`). *(INP is the sole interactivity metric; FID is fully retired.)* |
| 7. Structured data | **PASS** | No deprecated FAQPage/HowTo (0); valid Organization/WebApplication/SoftwareApplication/TechArticle/Article/BreadcrumbList/Person/Blog/ItemList graph; blog lacks breadcrumb (M4) |
| 8. JavaScript rendering | **PASS** | Full SSG static export — all meaningful content present in HTML body without JS (101/104 pages >1000 body chars; the 3 under are 2×404 + 1 short team bio) |

---

# Per-page table (all 104 pages)

Legend: **bold** = flagged. Title len flagged if >60 or <30. Desc len flagged if >160 or <70. "OG img NO" = og:image dropped. og:type `article` on non-blog = wrong (H2). H1 flagged if ≠1.

| # | Page | Title len | Desc len | Canonical OK | OG img | OG type | H1 | JSON-LD types |
|---|------|-----------|----------|--------------|--------|---------|----|--------------|
| 1 | `/404.html` | **25** | **50** | ->home | yes | website | 1 | Organization,WebSite,WebPage,WebApplication |
| 2 | `/_not-found.html` | **25** | **50** | ->home | yes | website | 1 | Organization,WebSite,WebPage,WebApplication |
| 3 | `/blog.html` | **76** | 135 | yes | **NO** | website | 1 | Organization,WebSite,WebPage,WebApplication,Blog |
| 4 | `/blog/2026-legal-intake-benchmark-report.html` | **67** | **200** | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 5 | `/blog/answering-service-pricing-comparison.html` | **92** | 155 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 6 | `/blog/best-ai-receptionist-law-firms-2026.html` | **64** | **181** | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 7 | `/blog/claude-for-legal-personal-injury-2026.html` | **79** | 157 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 8 | `/blog/legal-intake-question-bank.html` | **80** | **169** | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 9 | `/blog/missed-call-revenue-loss-law-firms.html` | **72** | 155 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 10 | `/blog/open-source-legal-intake-software-2026.html` | **93** | **170** | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 11 | `/blog/outsource-legal-intake-guide.html` | **76** | **162** | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,Article |
| 12 | `/careers.html` | 60 | 127 | yes | **NO** | website | 1 | Organization,WebSite,WebPage,WebApplication,Breadcru... |
| 13 | `/contact.html` | 55 | **304** | yes | **NO** | website | **0** | Organization,WebSite,WebPage,WebApplication |
| 14 | `/help.html` | 55 | 128 | yes | **NO** | website | 1 | Organization,WebSite,WebPage,WebApplication,Collecti... |
| 15 | `/help/activate-your-claireai-number.html` | 60 | 153 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 16 | `/help/after-hours-routing.html` | **66** | 149 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 17 | `/help/billing-overage-handling.html` | **65** | 151 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 18 | `/help/conflict-screening-rule-118.html` | **71** | 154 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 19 | `/help/connect-clio-grow.html` | 54 | 153 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 20 | `/help/data-retention-policy.html` | **70** | 154 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 21 | `/help/edit-intake-script.html` | **65** | 146 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 22 | `/help/request-hipaa-baa.html` | **75** | 145 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 23 | `/help/troubleshoot-missed-call.html` | **64** | 148 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 24 | `/help/warm-transfer-setup.html` | **66** | 154 | yes | yes | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 25 | `/how-it-works.html` | 55 | 153 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArticle |
| 26 | `/index.html` | 56 | 139 | yes | yes | website | 1 | Organization,WebSite,WebPage,WebApplication |
| 27 | `/integrations.html` | **71** | **167** | yes | **NO** | website | 1 | Organization,WebSite,WebPage,WebApplication,ItemList |
| 28 | `/integrations/8x8.html` | **61** | **167** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 29 | `/integrations/actionstep.html` | **68** | 153 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 30 | `/integrations/acuity.html` | **75** | **188** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 31 | `/integrations/adobe-sign.html` | **68** | **201** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 32 | `/integrations/affinipay.html` | **67** | **178** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 33 | `/integrations/box.html` | **61** | 153 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 34 | `/integrations/calendly.html` | **66** | 142 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 35 | `/integrations/callrail.html` | **66** | **234** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 36 | `/integrations/captorra.html` | **66** | **205** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 37 | `/integrations/caret-legal.html` | **69** | **179** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 38 | `/integrations/casepeer.html` | **66** | **192** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 39 | `/integrations/clio-grow.html` | **67** | **205** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 40 | `/integrations/clio.html` | **69** | 146 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 41 | `/integrations/cloudlex.html` | **66** | **196** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 42 | `/integrations/cosmolex.html` | **66** | **181** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 43 | `/integrations/courtlistener.html` | **71** | **194** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 44 | `/integrations/ctm.html` | **77** | **193** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 45 | `/integrations/dialpad.html` | **65** | **189** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 46 | `/integrations/docket-alarm.html` | **70** | 157 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 47 | `/integrations/docusign.html` | **66** | 141 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 48 | `/integrations/dropbox.html` | **65** | **173** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 49 | `/integrations/filevine.html` | **66** | 143 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 50 | `/integrations/google-drive.html` | **70** | **165** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 51 | `/integrations/google-workspace.html` | **74** | 149 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 52 | `/integrations/gravity-legal.html` | **71** | **184** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 53 | `/integrations/hubspot.html` | **65** | **192** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 54 | `/integrations/ic-solutions.html` | **70** | **190** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 55 | `/integrations/imanage.html` | **65** | **193** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 56 | `/integrations/law-ruler.html` | **67** | **211** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 57 | `/integrations/lawmatics.html` | **67** | 144 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 58 | `/integrations/lawpay.html` | **64** | 155 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 59 | `/integrations/lawtoolbox.html` | **68** | **181** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 60 | `/integrations/lead-docket.html` | **69** | **212** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 61 | `/integrations/leanlaw.html` | **65** | 136 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 62 | `/integrations/litify.html` | **64** | **219** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 63 | `/integrations/make.html` | **62** | 150 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 64 | `/integrations/ms-bookings.html` | **76** | **203** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 65 | `/integrations/ms-teams-phone.html` | **79** | **170** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 66 | `/integrations/ms-teams.html` | **73** | **182** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 67 | `/integrations/ms365.html` | **81** | 159 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 68 | `/integrations/mycase.html` | **64** | 133 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 69 | `/integrations/n8n.html` | **61** | 135 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 70 | `/integrations/neos.html` | **73** | **193** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 71 | `/integrations/netdocuments.html` | **70** | **200** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 72 | `/integrations/nextiva.html` | **65** | **184** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 73 | `/integrations/openphone.html` | **67** | **193** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 74 | `/integrations/pacer.html` | **63** | **205** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 75 | `/integrations/practicepanther.html` | **73** | **176** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 76 | `/integrations/quickbooks.html` | **75** | **163** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 77 | `/integrations/ringcentral.html` | **69** | 139 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 78 | `/integrations/rocket-matter.html` | **71** | **172** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 79 | `/integrations/securus.html` | **65** | 156 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 80 | `/integrations/sharepoint.html` | **79** | **178** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 81 | `/integrations/simplyconvert.html` | **71** | **225** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 82 | `/integrations/slack.html` | **63** | **193** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 83 | `/integrations/smart-comms.html` | **78** | **196** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 84 | `/integrations/smartadvocate.html` | **71** | **238** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 85 | `/integrations/smokeball.html` | **67** | **201** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 86 | `/integrations/telnyx.html` | **64** | **187** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 87 | `/integrations/viapath.html` | **71** | **188** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 88 | `/integrations/vinesign.html` | **66** | **176** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 89 | `/integrations/vonage.html` | **64** | **168** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 90 | `/integrations/whatconverts.html` | **70** | **205** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 91 | `/integrations/xero.html` | **62** | **164** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 92 | `/integrations/zapier.html` | **64** | 134 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 93 | `/integrations/zoom-phone.html` | **68** | **175** | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Software... |
| 94 | `/pricing.html` | 53 | 127 | yes | **NO** | website | 1 | Organization,WebSite,WebPage,WebApplication,Breadcru... |
| 95 | `/privacy-policy.html` | **25** | 128 | yes | yes | website | 1 | Organization,WebSite,WebPage,WebApplication |
| 96 | `/product.html` | **68** | 142 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 97 | `/product/lead-iq.html` | 50 | 111 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,TechArti... |
| 98 | `/solutions.html` | **66** | **176** | yes | **NO** | website | 1 | Organization,WebSite,WebPage,WebApplication,Collecti... |
| 99 | `/solutions/criminal-defense.html` | **63** | 137 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Breadcru... |
| 100 | `/solutions/family-law.html` | 57 | 129 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Breadcru... |
| 101 | `/solutions/personal-injury.html` | **68** | 135 | yes | **NO** | article | 1 | Organization,WebSite,WebPage,WebApplication,Breadcru... |
| 102 | `/team/cal-stein.html` | 39 | **182** | yes | **NO** | profile | 1 | Organization,WebSite,WebPage,WebApplication,Person,B... |
| 103 | `/team/tiago-stram.html` | 41 | **184** | yes | **NO** | profile | 1 | Organization,WebSite,WebPage,WebApplication,Person,B... |
| 104 | `/terms-of-service.html` | **27** | 107 | yes | yes | website | 1 | Organization,WebSite,WebPage,WebApplication |



---

# Quick-win checklist (highest ROI, lowest effort)

1. **C1** — Fix the site-wide "Log in" link → production app URL + `rel="noopener noreferrer"` (1 data change in `header.tsx`, fixes 104 pages).
2. **H4** — Correct pricing in `public/llms.txt` to $450/$850/$1,800 (+ update agent-skills sha256, M5).
3. **H2** — Change integration `og:type` from `article` → `website` (1 line, `integrations/[slug]/page.tsx:56`; fixes 66 pages).
4. **H3** — Add `/_next/static/*` immutable cache rule to `public/_headers` (config-only).
5. **H1** — Add default OG image to the integration/solution/help metadata builders (~3 files, fixes ~78 pages).
6. **M1** — Strip the duplicate `| ClaireAI` suffix from the 11 hardcoded titles.
7. **H5** — Remove the 3 dangling links (immigration-law / compare-smith-ai / compare-ruby) from llms.txt, or build the pages.
8. **H6** — Promote contact page heading to `<h1>`.
9. **C2** — Add `noindex`/disallow for RSC `.txt` payloads at the Cloudflare/_headers layer (preserve llms.txt).

**Pages inspected: 104 / 104.** Every built HTML file was individually parsed; production headers, status codes, and the RSC `.txt` surface were verified live via curl.
