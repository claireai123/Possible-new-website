# Cloudflare Enterprise Best Practice (mid-2026)

**Scope:** Statically-exported Next.js site served via **Cloudflare Pages** on a **custom domain** (`theclaireai.com`) behind an **Enterprise** zone. Goal: (a) maximum site **speed** and (b) maximum **AI crawlability / citation** (ChatGPT, Claude, Perplexity, Google AI Overviews).
**Date:** 2026-06-22. Sources prefer `developers.cloudflare.com` and `blog.cloudflare.com`.

---

## 0. Framing facts that govern everything below

1. **A Pages custom domain runs inside the zone request pipeline.** Zone-level features (Polish, Transform Rules, Snippets, Cache Rules, Web Analytics auto-inject, Transformations, bot controls) **do** apply to it. They do **NOT** apply to the default `*.pages.dev` hostname. The DNS for a Pages custom domain is proxied (orange-cloud) automatically. — https://developers.cloudflare.com/rules/origin-rules/tutorials/point-to-pages-with-custom-domain/
2. **Pages static assets are already served from Tiered Cache** and remain cached on Cloudflare's CDN until the next deploy. — https://developers.cloudflare.com/pages/configuration/serving-pages/
3. **Pages does NOT edge-cache HTML/JSON by default** (only images/CSS/JS are cacheable by default), and by default sets `Cache-Control: public, max-age=0, must-revalidate` on assets (browser revalidates every request). — https://developers.cloudflare.com/cache/concepts/default-cache-behavior/
4. **Two deny-by-default AI traps exist on new zones** (covered in Part B): the **"Block AI bots"** toggle (default-on for new domains since 2025-07-01) and **managed robots.txt / Content Signals** (`ai-train=no`). Both must be verified OFF for a citation-seeking site.

---

# PART A — SPEED

## A1. Argo Smart Routing
- **What:** Routes origin requests over Cloudflare's fastest/least-congested private paths; ~30% faster on average for dynamic/origin-bound traffic; includes tiered caching. — https://developers.cloudflare.com/argo-smart-routing/ , https://www.cloudflare.com/application-services/products/argo-smart-routing/
- **Helps a static site?** Marginal. Argo accelerates **edge-to-origin** trips. A static Pages export is served **from the edge** with no origin round-trip on cache hits, so Argo has little to optimize. It does help only the cold-cache/first-fetch path.
- **Recommended:** **Skip.** Costs $5/domain/mo + $0.10/GB; not worth it for static-edge content.
- **Gotcha:** Billed by data transferred through Argo; the value proposition assumes a real origin.
- **Plan:** Paid add-on, all tiers.

## A2. Tiered Cache (Generic / Smart / Custom topology) + Regional Tiered Cache
- **What:** Adds upper-tier data centers between the edge and origin so a cache MISS at one PoP can be filled from another PoP instead of the origin, raising hit ratio. **Smart Topology** auto-picks the single best upper tier; **Generic Global** uses all PoPs as upper tiers; **Custom Topology** is account-team-tuned; **Regional Tiered Cache** adds a regional hub layer for globally distributed traffic. — https://developers.cloudflare.com/cache/how-to/tiered-cache/ , https://blog.cloudflare.com/tiered-cache-smart-topology/ , https://blog.cloudflare.com/introducing-regional-tiered-cache/
- **Helps a static site?** Yes, modestly — fewer origin (build-bucket) fetches and better hit ratios across regions. **Pages already serves assets through Tiered Cache automatically** (framing fact #2), so much of this is on by default.
- **Recommended:** **Enable Smart Tiered Cache** (free, zero-config, all plans). **Regional Tiered Cache** only if you see meaningful global traffic and far-tier misses — it's Enterprise-only and you have it, so it's a free "on" for a global audience.
- **Gotcha:** For a small static site the origin is just the Pages asset store; the win is real but small.
- **Plan:** **Tiered Cache + Smart Topology = all plans.** **Generic Global, Regional Tiered Cache, Custom Topology = Enterprise-only.** — https://developers.cloudflare.com/cache/plans/ (NB: 2026 reorg — these now also documented under "Smart Shield": https://developers.cloudflare.com/smart-shield/configuration/regional-tiered-cache/)

## A3. Cache Reserve
- **What:** A persistent, R2-backed "ultimate upper-tier" cache that holds assets far longer than the normal edge cache, eliminating origin pulls on long-tail/eviction. — https://developers.cloudflare.com/cache/advanced-configuration/cache-reserve/
- **Helps a static site?** Low value. Pages assets are small, change on deploy, and are already widely cached. Cache Reserve shines for large media libraries with expensive origins.
- **Recommended:** **Skip.** Eligibility requires cacheable assets with ≥10h freshness TTL and a `Content-Length` header; it's a metered add-on (R2 storage + ops). Not worth it here.
- **Gotcha:** Costs scale with stored bytes + operations; Enterprise must engage account team to configure.
- **Plan:** Paid add-on across tiers. — https://developers.cloudflare.com/cache/plans/

## A4. Cache Rules (modern replacement for Page Rules)
- **What:** The current rules engine for cache behavior, matching on request attributes (path, extension, hostname). Replaces legacy **Page Rules**. — https://developers.cloudflare.com/cache/how-to/cache-rules/settings/
- **Page Rules status (2026):** **Legacy/deprecated.** New zones on the **Free plan lost Page Rules from 2024-07-01**; remaining settings migrated to the Rules suite through 2025. **Use Cache Rules / Configuration Rules / Redirect Rules instead.** If both a Page Rule and a Cache Rule match the same path, **Cache Rules win.** — https://developers.cloudflare.com/rules/reference/page-rules-migration/ , https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/
- **How to aggressively cache a static export / "cache everything" for HTML:**
  - Set **Cache eligibility = "Eligible for cache"** to make HTML (normally bypassed, framing fact #3) cacheable at the edge. — https://developers.cloudflare.com/cache/how-to/cache-rules/settings/
  - **Edge TTL:** choose **"Override origin"** to force a long edge TTL (e.g. assets, fingerprinted JS/CSS), or **"Respect origin"** to honor your `Cache-Control`. Edge TTL can also be set per status-code range (Enterprise).
  - **Browser TTL:** **Override origin** to push a long client cache for immutable assets, or **Respect origin** for HTML you update often.
  - **Match by file extension:** `http.request.uri.path.extension` (e.g. `in {"js" "css" "woff2" "png" "webp" "avif" "svg"}`) → long edge+browser TTL + immutable. — https://developers.cloudflare.com/cache/how-to/cache-rules/settings/
- **Recommended for our case:**
  - **Static assets (hashed filenames):** Cache Rule → Eligible for cache, Edge TTL override ~1 year, Browser TTL override ~1 year, immutable.
  - **HTML:** Be conservative. Because this is a **frequently-updated marketing site**, do **NOT** set a long edge TTL on HTML unless you pair it with deploy-time purge. Prefer **Respect origin** and let the Pages `_headers` file set a short HTML `Cache-Control` (e.g. `max-age=0, must-revalidate` or a short `s-maxage` with revalidation). Over-aggressive HTML caching = stale pages after a deploy. (Pages auto-invalidates its own asset cache on deploy, but a manual "cache everything HTML" Cache Rule with a long Edge TTL is NOT auto-purged on deploy — that's the trap.)
- **Plan:** **Cache Rules = all plans** (rule count 10/Pro 25/Business 50/Enterprise 300). Cache-key customization (query string/headers/cookie/host) and cache-by-status-code = **Enterprise-only**. — https://developers.cloudflare.com/cache/plans/

## A5. Speed Brain / prefetching / Early Hints (103)
- **Speed Brain:** Adds a `Speculation-Rules` header pointing at a Cloudflare-hosted Speculation Rules config so the browser **prefetches the user's likely next navigation** — speeds up *subsequent* page loads, not the first. — https://developers.cloudflare.com/speed/optimization/content/speed-brain/ , https://blog.cloudflare.com/introducing-speed-brain/
  - **Status (2026):** **GA, all plans, free.** **Default-ON for Free domains; must be manually turned ON for Pro/Business/Enterprise.** Roadmap: prerendering + more liberal eagerness. — search-confirmed via developers.cloudflare.com/speed/optimization/content/speed-brain/
  - **Recommended:** **Turn it ON** (Enterprise zones don't get it by default). Big win for multi-page marketing-site navigation. Gotcha: only browsers supporting the Speculation Rules API benefit (Chromium); conservative eagerness by default.
- **Early Hints (HTTP 103):** Cloudflare caches `Link: rel=preload/preconnect` headers and sends them as a **103** before the origin's final response, letting the browser fetch critical assets early. Only over HTTP/2 & HTTP/3; cache keyed by URI (ignores query string). — https://developers.cloudflare.com/cache/advanced-configuration/early-hints/
  - **Pages interaction (important):** Early Hints is **auto-enabled on all `pages.dev` and custom domains.** Pages **auto-generates** `Link` headers from your HTML `<link rel="preload|preconnect|modulepreload">` elements, OR you can declare them explicitly in the **`_headers`** file. Adding `fetchpriority`/`crossorigin`/custom attrs to a `<link>` suppresses auto-generation for that element (your explicit hint is preserved). Disable with `/* ! Link` in `_headers`. — https://developers.cloudflare.com/pages/configuration/early-hints/
  - **Recommended:** **Leave Early Hints on** and add `Link: rel=preload` for the LCP image/hero font + `rel=preconnect` to any third-party origins, via `_headers`. Strong LCP win.

## A6. HTTP/3, 0-RTT, HTTP/2 prioritization
- **HTTP/3 (QUIC):** Enable — faster connection setup, better on lossy/mobile networks. All plans. — https://developers.cloudflare.com/speed/optimization/protocol/http2/
- **0-RTT Connection Resumption:** Speeds repeat visits by letting returning clients send data on the first TLS flight. Enable; it's safe for idempotent GETs of a static site. All plans.
- **HTTP/2 prioritization ("Enhanced HTTP/2 Prioritization"):** **NOT deprecated** (HTTP/2 *Server Push* was the thing removed). Lets Cloudflare override browser resource ordering for optimal delivery. — https://developers.cloudflare.com/speed/optimization/protocol/enhanced-http2-prioritization/
  - **Gotcha:** Can **hurt Safari/iOS** in some cases. — https://developers.cloudflare.com/speed/optimization/protocol/troubleshooting/enhanced-http2-prioritization-ios-safari/
  - **Recommended:** Optional. Test with/without via Observatory; if iOS regressions appear, turn off. Pro+ feature.

## A7. Compression — Brotli & Zstandard (2026)
- **What:** Cloudflare supports **Gzip, Brotli, and Zstandard (zstd)** for delivery, negotiated by the client's `Accept-Encoding`, with fallback. — https://developers.cloudflare.com/speed/optimization/content/compression/
- **2026 status:** **zstd is GA and available to all plans via Compression Rules.** Default behavior differs by plan (Free auto-uses zstd; Pro/Business default Brotli; Enterprise default Gzip) — so **explicitly add a Compression Rule** to guarantee zstd/Brotli. zstd ≈ 42% faster than Brotli at similar ratios, ~11% smaller than gzip. — https://developers.cloudflare.com/rules/compression-rules/examples/enable-zstandard/ , https://blog.cloudflare.com/new-standards/
- **Recommended:** Add a **Compression Rule enabling Zstandard** for text content types (HTML/CSS/JS/JSON/SVG), with Brotli/Gzip fallback automatic. (Static asset bytes are already compressed by Cloudflare; this just guarantees the best codec.) **Gotcha:** older Safari historically lacked zstd — fallback to Brotli handles it automatically.
- **Plan:** Compression Rules + zstd = **all plans.**

## A8. Images — Polish, Mirage, Transformations/Image Resizing, AVIF
- **Polish:** One-click recompression + metadata strip. Modes: **Lossless** (~21%), **Lossy** (~48%, can do PNG→JPEG), plus a **WebP** toggle (serves WebP when browser supports it and it's smaller). — https://developers.cloudflare.com/images/polish/compression/
  - **AVIF:** **Polish does NOT output AVIF** (2026 docs list only WebP). For AVIF use Transformations (below).
  - **Recommended:** **Polish = Lossy + WebP** on the custom domain. Zero-code win for hero/marketing imagery.
  - **Plan:** **Pro/Business/Enterprise (NOT Free).** — https://developers.cloudflare.com/images/polish/
- **Mirage:** **DEPRECATED — removed 2025-09-15; settings API sunset Jan 2026.** Do not use. Replacements: native `loading="lazy"`, `srcset`/`<picture>`, Polish, Transformations. — https://developers.cloudflare.com/speed/optimization/images/mirage/ , https://developers.cloudflare.com/fundamentals/api/reference/deprecations/ (Confirms existing memory `marketing-site-state-2026-05-26`: "Mirage is dead.")
- **Transformations / Cloudflare Images (formerly "Image Resizing"):** On-the-fly resize/convert/crop by URL: `/cdn-cgi/image/<OPTIONS>/<SOURCE>`. **Supports AVIF** via `format=avif` or `format=auto` (auto serves AVIF/WebP per browser). Works on the Pages custom domain to transform your static images. — https://developers.cloudflare.com/images/transform-images/ , https://developers.cloudflare.com/images/transform-images/transform-via-url/
  - **Recommended:** Enable Transformations (dashboard toggle required) and serve `format=auto` for AVIF + responsive widths. Point the Next.js image loader at `/cdn-cgi/image/...`.
  - **Plan/pricing:** **5,000 unique transformations/month free on all plans**; beyond that **$0.50 per 1,000**. Transform-only (images hosted in your Pages export) is billed under "Images Transformed" — stored/delivered billing doesn't apply. — https://developers.cloudflare.com/images/pricing/
  - **Gotcha:** Each distinct width/format combo = one unique transformation; many permutations can add up. Toggle must be enabled first. Works on the proxied custom domain, not `*.pages.dev`.

## A9. Rocket Loader — leave OFF (confirmed harmful for React/Next)
- **What:** Defers and asynchronously loads all JavaScript through a Cloudflare loader to speed first paint on script-heavy legacy pages. — https://developers.cloudflare.com/speed/optimization/content/rocket-loader/
- **Why it HURTS modern React/Next bundles:** It rewrites/defers script execution order and wraps scripts, which **breaks or delays hydration**, can reorder module execution, conflicts with bundlers/code-splitting, and frequently causes blank/broken interactivity or worse CWV (delayed TBT/INP) on framework apps. Modern bundlers already defer and split optimally, so Rocket Loader adds overhead and breakage with no benefit.
- **Recommended:** **OFF.** (Verify it's off — it can be enabled inadvertently.)
- **Plan:** All plans (but should be off for us).

## A10. Zaraz — third-party script loading (GA4)
- **What:** Loads third-party tags (analytics, pixels) from Cloudflare's edge/Worker instead of the browser, reducing main-thread cost and improving privacy/perf. — https://developers.cloudflare.com/zaraz/
- **Relevance:** Can load **GA4** server-side/edge-side, removing the gtag bundle from the client critical path → better INP/TBT.
- **Recommended:** **Optional.** If GA4 is the only third-party tag, Zaraz is a nice INP win, but for a single tag the gain is modest and adds a config surface. Consider it if you accumulate multiple tags. Watch consent/region rules.
- **Plan:** Free tier of Zaraz exists with monthly event limits; paid beyond. Confirm current event allowance in dashboard before relying on it.

## A11. Observatory + RUM (measuring CWV)
- **Observatory (synthetic):** Runs **Lighthouse at Cloudflare's edge** for lab CWV + scores; supports scheduled (daily/weekly) tests, mobile/desktop emulation. GA. Quotas scale by plan (Free: ~30 one-off + 1 weekly recurring, single region; Pro+: more recurring/daily/regions; Enterprise: highest). — https://developers.cloudflare.com/speed/observatory/ , https://developers.cloudflare.com/speed/observatory/run-speed-test/
  - **Recommended:** Schedule a **daily browser test on top 1-3 landing pages** to catch CWV regressions on deploys. All plans.
- **RUM / Web Analytics (field):** Privacy-first JS beacon collecting **real-user LCP, INP, CLS** (P75), no cookies. **INP replaced FID.** **Auto-injected on proxied custom domains** (no code needed); free domains have Web Analytics on by default since 2025-10-15. — https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/ , https://developers.cloudflare.com/speed/observatory/rum-beacon/
  - **Difference:** Observatory = lab/synthetic; RUM = real visitors. Use both. Observatory's dashboard also surfaces RUM data.
  - **Recommended:** Rely on **auto-injected RUM** for field CWV. If you ship a strict CSP, allowlist `static.cloudflareinsights.com`. **Free, all plans.** — https://blog.cloudflare.com/free-privacy-first-analytics-for-a-better-web/

## A12. Snippets vs Workers vs Transform Rules vs `_headers` — injecting/overriding headers
| Mechanism | Sets Link / Cache-Control? | Plans | Quota (2026) | Cost | Best for |
|---|---|---|---|---|---|
| **`_headers` (Pages)** | Yes, declarative, ships with build | Pages, any | 100 rules; 2,000 char/line | Free | Static header rules co-located with the site |
| **Response Header Transform Rules** | Yes (static or expression-driven; 30 headers/rule) | **All plans** | Active Transform Rules: Free 10 / Pro 25 / Business 50 / **Ent 300** (shared); regex match = Business/Ent | Free w/ plan | Edge override/centralization without redeploy |
| **Snippets** | Yes, via JS (add/replace/delete) | **Pro/Business/Ent (NOT Free)** | Pro 25 / Business 50 / Ent 300; 5ms CPU, 2MB mem, 32KB pkg | Free, no per-req fee | Conditional/logic-driven headers |
| **Workers** | Yes, full control | Free & Paid | Free 100k/day; Paid $5/mo + usage | Per-request billing on Paid | Overkill for plain headers |

Sources: https://developers.cloudflare.com/pages/configuration/headers/ , https://developers.cloudflare.com/rules/transform/response-header-modification/ , https://developers.cloudflare.com/rules/snippets/ , https://blog.cloudflare.com/snippets/ , https://developers.cloudflare.com/rules/transform/
- **Snippets status:** **GA since 2025-04-09, free (no usage fees) on Pro/Business/Enterprise.**
- **Recommendation:** **First choice = `_headers`** (free, all plans, version-controlled, applies to every static asset — perfect for `Link` preload/preconnect + per-path `Cache-Control`). **Edge overrides = Response Header Transform Rules** (free, 300 on Enterprise, no redeploy). **Conditional logic = Snippets.** **Avoid Workers** for plain header injection.

## A13. How Pages caching actually works + `_headers` / `_redirects` limits
- **Defaults:** Pages caches each deployed asset on the CDN until the next deploy; **HTML/JSON not edge-cached by default**; assets get `Cache-Control: public, max-age=0, must-revalidate` (browser revalidates each request). Static assets served via Tiered Cache. — https://developers.cloudflare.com/cache/concepts/default-cache-behavior/ , https://developers.cloudflare.com/pages/configuration/serving-pages/
- **`_headers` file:** Plain-text file in the output dir; parsed by Pages to add/override/remove response headers on **static asset responses**. **Limits: ≤100 rules; 2,000 chars/line.** Can set custom headers incl. `Link` and `Cache-Control`. — https://developers.cloudflare.com/pages/configuration/headers/
  - **Key limit:** `_headers` does **NOT** apply to responses from **Pages Functions / SSR / `_worker.js`** — irrelevant for a **pure static export** (it covers all static assets), but if you ever add Functions, set headers in code.
  - **Edge vs browser:** `_headers` `Cache-Control` is honored by Cloudflare's cache when Browser Cache TTL is "Respect existing headers" (default), but for guaranteed edge behavior on HTML you still want a **Cache Rule** (since HTML isn't edge-cached by default). Treat `_headers` primarily as the **browser/asset** layer + the **Link/early-hints** source; use **Cache Rules** for edge-cache control.
  - **`_redirects` file:** Declarative redirects/rewrites shipped with the deploy (subject to its own count/precedence limits; SPA-style `200` rewrites supported). Use it for vanity/legacy redirects; for complex/regex logic use Redirect Rules at the zone.
- **Works on custom domain:** Yes — `_headers`/`_redirects` apply on both `pages.dev` and the custom domain.

---

# PART B — AI CRAWLABILITY / CONTROL

**Bottom line:** Cloudflare ships **four levers** that can silently block or discourage AI crawlers, several **deny-by-default on new zones**. For a citation-seeking site, all must be set to "allow."

## B1. AI Crawl Control (formerly "AI Audit")
- **What:** Dashboard to monitor + control AI access. Tabs: **Crawlers** (per-crawler allow/block/charge + request activity), **Analyze AI traffic**, **Track robots.txt** (violations: crawler name, disallowed path, directive, request count), **Pay per crawl**. **Renamed from "AI Audit"; GA 2025-08-28.** — https://developers.cloudflare.com/ai-crawl-control/ , https://blog.cloudflare.com/introducing-ai-crawl-control/
- **How to confirm AI crawlers are visiting & allowed:** Open **Crawlers tab** → verify GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Googlebot show **request activity** with **Action = Allow** (not block/charge). Check **Track robots.txt** shows no violations on paths you want crawled. — https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/ , https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/
- **Recommended:** Use as your **verification dashboard**; set every desired crawler to **Allow**.
- **Gotcha:** Per-crawler **Block** here is implemented as a **WAF custom rule** under the hood. Free plan = basic UA-string detection only; custom 402 responses are paid.
- **Plan:** **All plans** (richer features paid/Enterprise). — https://developers.cloudflare.com/ai-crawl-control/

## B2. "Block AI bots" toggle — ⚠️ THE #1 SILENT KILLER
- **What:** One toggle, three modes: **"Only block on hostnames with ads"**, **"Block on all pages"**, **"Do not block (off)"**. — https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/
- **Default-on:** Per Cloudflare's **2025-07-01** policy, **every NEW domain is set to deny AI crawlers by default** (permission-based; existing domains keep prior settings). — https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/
- **⚠️ Critical override:** This setting **blocks even VERIFIED AI crawlers** and **takes precedence over all Super Bot Fight Mode rules** — *"if you have enabled Block AI bots and Allow verified bots, verified AI bots will still be blocked."* You cannot allowlist around it; you must turn it off. — https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/ , https://developers.cloudflare.com/bots/concepts/bot/
- **Recommended:** **"Do not block (off)."** Path: **Security → Settings → (Bot traffic) → Block AI bots → Do not block → Save.** **Verify on the production zone even though it's Enterprise** — a newly-provisioned domain may be deny-by-default.
- **Plan:** All plans.

## B3. Pay per crawl
- **What:** Charge AI crawlers per request; non-payers get **HTTP 402**. **Private/closed beta** in 2026; Enterprise-oriented (apply / contact AE). — https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/ , https://blog.cloudflare.com/introducing-pay-per-crawl/
- **If you DON'T enable it:** Nothing changes — opt-in, does nothing by default.
- **If you DO enable it:** Any crawler set to "charge" gets 402'd unless it pays → **fewer/no free citations.** (Also: a WAF/Bot block **overrides** pay-per-crawl's "charge.")
- **Recommended:** **Leave OFF.** A site wanting free AI citations must never gate crawlers behind payment.
- **Plan:** Enterprise + closed beta.

## B4. Managed robots.txt — ⚠️ injects AI-blocking directives
- **What:** Auto-generates/maintains a robots.txt that adds `Disallow: /` for named AI bots (ClaudeBot, GPTBot, Google-Extended, Applebot-Extended, Amazonbot, ByteSpider, CCBot, meta-externalagent) **plus** a universal Content-Signal line. — https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/
- **Helps/hurts:** **Hurts.** Reputable AI crawlers honor robots.txt and will **skip your site** if these `Disallow` lines are present — a direct citation killer for compliant crawlers (it's advisory, so it won't stop bad actors, but it *does* deter the exact engines you want).
- **Recommended:** **Keep managed robots.txt OFF**, or ensure your served robots.txt has **no `Disallow: /` for AI bots** and is permissive for the paths you want crawled.
- **Plan:** All plans.

## B5. Content Signals Policy — ⚠️ `ai-train=no` discourages AI use
- **What:** Machine-readable robots.txt signals for content **use after access**: **search** (index/links/excerpts), **ai-input** (RAG/grounding for real-time AI answers — *this governs citations*), **ai-train** (training/fine-tuning). Launched **2025-09-24**. — https://blog.cloudflare.com/content-signals-policy/
- **Default:** Cloudflare's ~3.8M managed-robots.txt customers get **auto-injected** `Content-Signal: search=yes, ai-train=no` (**ai-input left unspecified** — neutral). Free customers can disable it via **Security Settings / Overview**. — https://blog.cloudflare.com/content-signals-policy/ , https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/
- **Why it hurts:** `ai-train=no` tells compliant vendors "don't use my content for training," and Cloudflare frames signals as carrying **contractual/legal weight**, making reputable vendors *more* likely to honor a "no." If anyone ever sets **`ai-input=no`**, that directly tells RAG/grounding systems (ChatGPT search, Perplexity, AI Overviews) not to cite you.
- **Recommended:** **Disable Content Signals**, OR publish an explicitly permissive policy **`search=yes, ai-train=yes, ai-input=yes`.** Do **not** ship the default `ai-train=no`.
- **Plan:** All plans.

## B6. Verified-bot handling + Super Bot Fight Mode / WAF interaction
- **AI crawlers in Cloudflare's reference (verified):** OpenAI **GPTBot, ChatGPT-User, OAI-SearchBot**; Anthropic **ClaudeBot, Claude-SearchBot, Claude-User**; Perplexity **PerplexityBot, Perplexity-User**; Google **Googlebot, Google-CloudVertexBot** (**Google-Extended** = robots.txt opt-out token for Gemini training, not a fetching bot); plus Bingbot, CCBot, Bytespider, Meta-ExternalAgent, Applebot, Amazonbot, DuckAssistBot, MistralAI-User. — https://developers.cloudflare.com/ai-crawl-control/reference/bots/ , https://developers.cloudflare.com/bots/concepts/bot/verified-bots/
  - **Note on legacy strings you asked about:** `anthropic-ai` and `Claude-Web` are **older/deprecated** UAs and are **not** in Cloudflare's current reference table; the canonical Anthropic crawlers are ClaudeBot / Claude-SearchBot / Claude-User.
- **Interaction:**
  - **Bot Fight Mode (basic):** **excludes verified bots by default** when blocking "definite bots" — so plain BFM does NOT catch verified AI crawlers. — https://developers.cloudflare.com/bots/concepts/bot/verified-bots/
  - **Super Bot Fight Mode / Bot Management:** you choose allow/block for "Verified bots" and "AI bots/scrapers." Set both to **Allow.**
  - **⚠️ The override:** **"Block AI bots" (B2) beats "Allow verified bots."** The verified-bot allowlist will NOT save AI crawlers if the AI toggle is on.
  - **WAF custom rules** can block by UA/ASN regardless of verified status — audit them.
- **Recommended:** **Verified bots → Allow; AI bots/scrapers → Allow; Block AI bots → OFF; audit WAF** for any UA/ASN rule hitting GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot/Googlebot. Confirm crawlers via AI Crawl Control Crawlers tab + Radar Bots Directory.
- **Plan:** Verified-bots concept platform-wide; allow/block toggle needs Super Bot Fight Mode (Pro/Business) or Enterprise Bot Management; basic BFM auto-excludes but gives no toggle.

### ⚠️ AI-crawlability pre-flight checklist (verify on the PRODUCTION zone)
1. **Block AI bots → "Do not block (off)"** (overrides verified-bot allowlist; #1 silent killer).
2. **Managed robots.txt → OFF** (or no `Disallow: /` for AI bots).
3. **Content Signals → disabled** OR `search=yes, ai-train=yes, ai-input=yes` (never default `ai-train=no`).
4. **Pay per crawl → OFF.**
5. **SBFM: Verified bots = Allow, AI bots/scrapers = Allow**; audit WAF custom rules.
6. **AI Crawl Control per-crawler actions = Allow** for all desired crawlers.
7. Confirm in **AI Crawl Control → Crawlers** that GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot/Googlebot show activity = Allow, and **Track robots.txt** shows no violations.

---

# PART C — Enterprise-only knobs to consciously SKIP (overkill for a static site)

A static Pages site already gets, free/cheap, the only things it needs: global CDN, Universal SSL, free unmetered L3/L4/L7 DDoS, Bot Fight Mode, basic firewall rules, very high practical availability. The following are real Enterprise (or paid add-on) surface to consciously decline:

- **Custom WAF / Managed Rulesets / Advanced Rate Limiting** — Advanced Rate Limiting (keyed on JSON body/API key/JA3/JA4) + account-level rulesets are **Enterprise-only**. **Skip:** a static site has no login/forms/API/DB to protect or rate-limit. — https://developers.cloudflare.com/waf/rate-limiting-rules/
- **Prioritized/dedicated support + negotiated SLA** (100% uptime, 25x credit, named AM, P1 phone) — **Enterprise.** **Skip operationally:** marketing-site downtime is low-stakes; it's a procurement artifact here. — https://www.cloudflare.com/enterprise-support-sla/
- **Advanced Certificate Manager / custom certs / Keyless SSL** — Keyless SSL = Enterprise; custom cert upload = Business+; ACM = paid add-on across tiers. **Skip:** free auto-renewing Universal SSL covers `theclaireai.com` + `www`. **Correction:** **HSTS is NOT Enterprise-gated — it's free on all plans; turn it ON** (plus Always Use HTTPS). — https://developers.cloudflare.com/ssl/keyless-ssl/ , https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/
- **Orange-to-Orange (O2O)** — layering your Cloudflare policy over a SaaS vendor that's also on Cloudflare. **Skip:** irrelevant — Pages is first-party, same account; no second provider zone. — https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/
- **Load Balancing** — health-checked multi-origin failover/steering (paid add-on). **Skip:** a Pages site has no multi-origin to balance; the edge is already redundant. — https://developers.cloudflare.com/load-balancing/
- **Others to know-exist-and-skip:** **Spectrum** (arbitrary TCP/UDP proxy, Ent) — site is plain HTTPS; **Magic Transit** (L3 BGP DDoS for IP ranges, Ent) — no network to protect; **China Network** (in-China PoPs/ICP, Ent add-on) — unless targeting mainland China; **BYOIP** (Ent) — no owned IP space; **Custom/vanity nameservers** (Business via support/Ent) — pure vanity; **full Bot Management ML tier** (per-request bot scores, Ent add-on) — SBFM/BFM suffices; **mTLS** (client-cert auth, Ent) — opposite of a public site; **Access/Zero Trust gating** — a marketing site must stay public (only useful to password-protect a staging/preview deploy). Sources: https://www.cloudflare.com/application-services/products/cloudflare-spectrum/ , https://developers.cloudflare.com/magic-transit/ , https://developers.cloudflare.com/china-network/ , https://developers.cloudflare.com/byoip/ , https://developers.cloudflare.com/dns/nameservers/custom-nameservers/ , https://developers.cloudflare.com/bots/plans/bm-subscription/ , https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/

**Corrections to common assumptions:** (1) HSTS is **free on all plans** — configure it, don't "skip for cost." (2) ACM and Load Balancing are **paid add-ons available across tiers**, not strictly Enterprise (still skippable here). Keyless SSL, custom certs (Business+), Advanced Rate Limiting, Spectrum, Magic Transit, China Network, BYOIP, full Bot Management, mTLS, and the negotiated SLA/support **are** genuinely Enterprise-tier.

---

# RECOMMENDED CONFIG (ranked by impact)

**Do (highest impact first):**
1. **AI crawlability pre-flight (Part B checklist)** — the single biggest lever for the stated goal. Block AI bots OFF, managed robots.txt OFF, Content Signals permissive/off, Pay-per-crawl OFF, SBFM allow verified+AI, audit WAF. Verify in AI Crawl Control.
2. **Rocket Loader OFF** — prevents broken/slow hydration on Next.js.
3. **Compression Rule → Zstandard** (Brotli/Gzip fallback) for text types.
4. **HTTP/3 + 0-RTT ON**; HTTP/2 prioritization optional (test for Safari regressions).
5. **Speed Brain ON** (Enterprise zones don't get it by default).
6. **Early Hints ON** (auto on Pages) + add `Link: rel=preload` (LCP image/font) & `rel=preconnect` via `_headers`.
7. **Polish = Lossy + WebP**; enable **Transformations** with `format=auto` for AVIF + responsive sizing.
8. **Cache Rules:** long edge+browser TTL + immutable for hashed static assets (by extension); **HTML conservative** (respect origin / short TTL).
9. **Smart Tiered Cache ON** (free); **Regional Tiered Cache** if global audience (free on Enterprise).
10. **RUM/Web Analytics** (auto, free) for field CWV; **Observatory** daily scheduled test on top pages.
11. **HSTS + Always Use HTTPS ON** (free).

**Skip:** Argo, Cache Reserve, Mirage (dead), Workers-for-headers, and all Part C Enterprise security/perf knobs. Zaraz optional (worth it only with multiple third-party tags).

**Could backfire (watch list):**
- **Rocket Loader ON** → breaks React/Next hydration. Keep OFF.
- **Blocking AI bots** (the toggle, managed robots.txt `Disallow`, Content Signals `ai-train=no`/`ai-input=no`, pay-per-crawl) → silently destroys AI citations. **Default-deny on new zones — verify.**
- **Over-aggressive HTML caching** ("cache everything" + long Edge TTL on a frequently-updated marketing site) → serves stale pages after deploy, because a manual HTML Cache Rule is **not** auto-purged on Pages deploy. Keep HTML TTL short or wire deploy-time purge.
- **Enhanced HTTP/2 Prioritization** → occasional Safari/iOS regressions; test.

---

## APPENDIX — URLs FETCHED vs FAILED

**Fetched successfully (WebFetch):**
- https://blog.cloudflare.com/content-signals-policy/
- https://developers.cloudflare.com/bots/additional-configurations/block-ai-bots/
- https://developers.cloudflare.com/pages/configuration/headers/
- https://blog.cloudflare.com/introducing-ai-crawl-control/
- https://developers.cloudflare.com/cache/how-to/cache-rules/settings/
- https://developers.cloudflare.com/pages/configuration/early-hints/
- https://developers.cloudflare.com/cache/plans/
- https://developers.cloudflare.com/ai-crawl-control/
- https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/what-is-pay-per-crawl/
- https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/
- https://developers.cloudflare.com/bots/concepts/bot/verified-bots/
- https://developers.cloudflare.com/ai-crawl-control/features/track-robots-txt/
- https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/
- https://developers.cloudflare.com/ai-crawl-control/reference/bots/
- https://developers.cloudflare.com/bots/concepts/bot/ (#super-bot-fight-mode)
- https://www.cloudflare.com/press/press-releases/2025/cloudflare-just-changed-how-ai-crawlers-scrape-the-internet-at-large/
- https://developers.cloudflare.com/speed/optimization/images/mirage/
- https://developers.cloudflare.com/images/polish/
- https://developers.cloudflare.com/images/polish/compression/
- https://developers.cloudflare.com/images/transform-images/
- https://developers.cloudflare.com/images/transform-images/transform-via-url/
- https://developers.cloudflare.com/speed/observatory/
- https://developers.cloudflare.com/speed/speed-test/
- https://developers.cloudflare.com/rules/snippets/
- https://developers.cloudflare.com/rules/transform/
- https://developers.cloudflare.com/rules/transform/response-header-modification/
- https://blog.cloudflare.com/snippets/
- https://www.cloudflare.com/enterprise-support-sla/
- https://developers.cloudflare.com/waf/rate-limiting-rules/
- https://developers.cloudflare.com/ssl/reference/all-features/
- https://developers.cloudflare.com/ssl/edge-certificates/additional-options/http-strict-transport-security/
- https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/how-it-works/
- https://developers.cloudflare.com/load-balancing/
- https://www.cloudflare.com/business-sla/

**Verified via WebSearch (read-only; result snippets from developers.cloudflare.com / blog.cloudflare.com):**
- Content Signals defaults / managed robots.txt defaults
- Block AI bots default-on for new domains (2025-07-01)
- Speed Brain GA / all-plans / default-on-Free
- Zstandard GA / all-plans / per-plan default codec
- HTTP/2 prioritization NOT deprecated (Server Push removed)
- Pay per crawl private beta status (2026)
- AI Crawl Control GA (2025-08-28)
- Tiered Cache topology plan matrix (Smart=all, Generic/Regional/Custom=Enterprise)
- Argo Smart Routing pricing/behavior
- Cache Reserve eligibility (≥10h TTL, Content-Length) + R2 backing
- Page Rules deprecation (legacy; Free new-zone loss 2024-07-01; migrate to Cache Rules)
- Early Hints over HTTP/2-3, URI-keyed; Pages auto-enable
- Pages default cache behavior (HTML/JSON not edge-cached; assets max-age=0 must-revalidate)

**Failed / partial:**
- https://developers.cloudflare.com/speed/observatory/tests/ — HTTP 404
- https://developers.cloudflare.com/pages/configuration/serving-pages/ — fetched but thin on the asked topic (only Tiered Cache note)
- https://developers.cloudflare.com/pages/configuration/headers/ — one early WebFetch attempt errored (classifier temporarily unavailable); content obtained on retry + via search
- O2O / Load Balancing docs landing pages — loaded but did not print an explicit plan-tier line; tier confirmed via search snippets + mechanics
- Two background research sub-agents (one AI-crawl-control run, one images/observability run) hit transient Cloudflare-side rate limits mid-task; the AI-crawl run was re-dispatched and completed, and all image/observability claims were independently re-verified against the sources above.

**Method note:** Research was fanned out across parallel sub-agents on non-overlapping clusters (caching/routing, speed/protocols/compression, images/observability/headers, AI crawl control, Enterprise-only knobs), with the most citation-critical facts (Content Signals default, AI-bot default-block, Speed Brain, zstd, HTTP/2 prioritization, pay-per-crawl, AI Crawl Control GA, Pages caching) verified directly by the lead before synthesis.
