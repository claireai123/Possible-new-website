# Sitemap, Robots, Discovery & Internal-Link-Graph Audit — theclaireai.com

**Date:** 2026-06-22/23
**Method:** Parsed `out/sitemap.xml`, cross-checked every URL against built HTML; built the internal link graph from all 102 `out/**/*.html`; reviewed served `robots.txt`, `public/llms.txt`, and the `.well-known` discovery surfaces.

## Sitemap — CLEAN ✅
- **102 sitemap URLs == 102 built pages.** Exact parity.
- **0** URLs in sitemap but not built (no broken/unpublished entries).
- **0** built pages missing from sitemap.
- **Rumored issue RESOLVED:** the "2 unpublished blog posts in the sitemap" flagged in May is gone — both newest posts (`claude-for-legal-personal-injury-2026`, `open-source-legal-intake-software-2026`) are now **published, built, and in the sitemap**.

## robots.txt — GOOD, one flag
- Served file is the repo's hand-authored one (not Cloudflare-managed). Sitemap referenced. All citation crawlers explicitly **allowed** (Googlebot, Google-Extended, Bingbot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot).
- `Disallow: /api/ /_next/ /admin/ /portal/` — fine for a static export (content is in HTML, not JS).
- **Content-Signal:** `search=yes, ai-input=yes, ai-train=no`. `ai-input=yes` (citation) is correct. **`ai-train=no` is the flag** — recommend `ai-train=yes` for brand mindshare (citation-neutral; see `11-…md` Q-D).

## llms.txt — STALE (low stakes, but inaccurate) 🟠
- **Pricing wrong:** lists `$650 / $1,299 / $2,999`; live site + JSON-LD say **$450 / $850 / $1,800**.
- **3 dead links:** references `immigration-law`, `compare-smith-ai`, `compare-ruby` — none exist (404 for any agent that follows them).
- Per `11-…md` (Q-B), **no production AI engine consumes llms.txt** — so this is harmless to citations, but a stale/contradictory file is worse than none. **Fix the pricing + dead links** (cheap) and don't invest further.

## .well-known discovery surfaces — present, ~zero citation value
- `api-catalog` (RFC 9727), `agent-skills/index.json`, DNS-AID HTTPS/SVCB + TXT records all present and valid. These are **agentic-interop** bets, **not** citation-selection inputs (no AI search engine reads them to decide citations as of mid-2026). Keep; do not count toward AI-citation goals.

## RSC `.txt` exposure 🟠
- Next 16 RSC payloads are **publicly served** (`/pricing.txt`, `/index.txt` → HTTP 200) and not covered by `Disallow: /_next/`. Duplicate-content / index-bloat risk. **Fix:** add `Disallow: /*.txt$` to robots.txt or an `X-Robots-Tag: noindex` header for `*.txt` via `_headers`.

## Internal link graph
- **0 orphan pages** — every page has ≥1 inbound internal link. ✅
- **61 "weak" pages with only 1–2 inbound links** — the structural weakness:
  - **66 integration pages** are each reachable **only from the `/integrations` hub** (1 inbound). No cross-linking between related integrations, and money/solutions pages don't link to relevant integrations.
  - The **2 newest blog posts** have 1 inbound link each (blog index only).
  - The **help center has zero links to money pages** and 2 dead `related` slugs (per `21-…md`).
- **Fixes (crawl depth + AI passage discovery):**
  1. Cross-link integrations by category ("related integrations" block) and from solutions/product pages.
  2. Link the 2 new blog posts from relevant solutions/product/help pages.
  3. Wire help articles to money pages and fix the 2 dead `related` slugs (the 2 recommended new blog posts fill them — see synthesis).
