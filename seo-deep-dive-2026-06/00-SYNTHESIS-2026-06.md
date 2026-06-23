# ClaireAI — Speed + AI-Citability Deep Dive: The Charted Path

**Date:** 2026-06-22/23 · **Method:** 8 non-overlapping specialist audits (every one of 102–104 pages inspected; live Cloudflare zone probed functionally; ~80 primary sources cited). Artifacts `10`–`24` in this folder.

---

## EXECUTIVE VERDICT

ClaireAI's foundation is **already strong** — the May-2026 cleanup held, the citation crawlers can all reach the site, and the two newest blog posts are genuinely citation-grade. The gains now are **infrastructure correctness** (a broken `www`, mis-cached assets) and **trust/coherence signals** (one entity, one set of facts) that decide whether AI engines *trust* ClaireAI enough to cite it. There is **one obvious path**, below. Nothing here requires a strategic choice from you — only execution.

**Health snapshot (per-domain):**
| Domain | State |
|---|---|
| AI crawler access | ✅ **Excellent** — every citation bot (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot) gets HTTP 200; none blocked |
| Technical SEO | 🟢 78/100 — strong; a few template-level og/title fixes |
| Schema/entity graph | 🔴 **Broken** — homepage entity hardcoded on all 104 pages; product duplicated 215×; author identity fragmented |
| Content / E-E-A-T / GEO | 🟢 Strong core (blog 95–96), 🔴 fragmented author identity + a self-contradicting stat |
| Performance | 🟢 Likely good; 2 clean LCP wins + a repeat-view caching bug |
| Infra (DNS/cache) | 🔴 `www` returns 526; hashed assets `max-age=0` |
| Sitemap/discovery | ✅ Clean (102=102, 0 orphans); thin internal linking |

---

## CONFIRMED TRUTHS (resolved — do not re-debate; full citations in `11-…md`)
1. **Schema produces ~0 AI-citation lift** (Ahrefs controlled test: −4.6%/+2.2%/+2.4%, all ≈0; 5-engine live test: only visible HTML is read). → Keep schema for *entity grounding*, not citations.
2. **No production AI engine consumes llms.txt** (97% of domains got zero llms.txt requests in May 2026). → Keep it accurate, invest nothing more.
3. **Brand mentions correlate ~3× backlinks; YouTube is the #1-cited domain (r≈0.74); G2 dominates B2B-SaaS citations.** → Off-site mentions > link-building.
4. **Citation gatekeepers are the SEARCH-index bots** (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot). Blocking *training* crawlers is citation-neutral.
5. **Freshness is decisive** — ChatGPT: 76% of cited pages updated <30 days; pages stale >3 months are 3× more likely to lose citations.
6. **The GEO levers that work** (Princeton, +30–41%): answer-first, **statistics + cited sources**, expert quotes, authoritative voice, Q&A structure, named-author E-E-A-T.

---

## THE PATH — phased & prioritized

### PHASE 0 — Critical correctness (do first; mostly repo + 1 dashboard)
| # | Fix | Where | Severity |
|---|---|---|---|
| 0.1 | **`www` returns 526** → add `www` as a custom domain on the `claireaiwebsite` Pages project **and** 301 `www → apex` | Cloudflare dashboard + DNS | 🔴 |
| 0.2 | **Hashed assets `max-age=0`** → `max-age=31536000, immutable` for `/_next/static/*` | `public/_headers` | 🔴 |
| 0.3 | **Self-contradicting stat** "60% unanswered" vs "35%" (same metric) → standardize on the **cited benchmark figure** sitewide; verify its source | content data files | 🔴 (AI-trust killer) |
| 0.4 | **Entity graph broken** — per-route `WebPage`, single canonical `#product` node, fix homepage-hardcoded-on-104-pages | base JSON-LD component | 🔴 |
| 0.5 | **Author identity** — unify "Tiago Strammiello"/"Tiago Stram"; resolve phantom "Caleo Tsiapalis" co-founder; link every byline `Person` to a `/team/#person` `@id`; fill `sameAs` (LinkedIn) | team + blog data | 🔴 (E-E-A-T) |

### PHASE 1 — Cloudflare config (mostly dashboard; a few repo)
**Dashboard pre-flight (verify — token couldn't read these; see `10-…md`):**
- [ ] Security → **Block AI bots = OFF** (functionally off, but confirm — it overrides allowlists)
- [ ] Speed → **Rocket Loader = OFF** (breaks Next hydration)
- [ ] **Pay-per-crawl = OFF**; SBFM verified+AI bots = **Allow**
- [ ] **Speed Brain = ON**, **Smart Tiered Cache = ON** (free Enterprise wins)

**Repo:**
- [ ] `0.2` asset caching (above) + **preconnect to `res.cloudinary.com`** (LCP win) + **trim homepage preloads to the hero only** (`10`/`23`)
- [ ] **robots.txt:** `ai-train=no → yes` (brand mindshare, citation-neutral); add `Disallow: /*.txt$` (RSC payload bloat)
- [ ] **llms.txt:** fix stale pricing ($650/1299/2999 → $450/850/1800) + remove 3 dead links
- [ ] **og fixes** (`20-…md`): restore `og:image` on 81 pages; `og:type=article` → `website` on 78 non-articles; fix the staging "Log in" URL (`claire-ai-two.vercel.app`)

### PHASE 2 — AI-citation levers (on-site + off-site)
**On-site:** add visible **"Last updated"** dates + meaningful `dateModified` (freshness); inject **stats-with-citations** and answer-first definitional blocks on solutions/product/integration hubs; **cross-link** the 66 integration pages + wire help → money pages (kills the 61 weak-link pages); add **`JobPosting`** on `/careers` (one of the few live rich results).
**Off-site (highest leverage per research — your real citation engine):** claim/optimize **G2 + Capterra**; launch a **YouTube** channel (demos + "how AI legal intake works"); authentic **Reddit** presence (r/Lawyertalk, r/LawFirm); **Bing Webmaster Tools + IndexNow** (feeds Copilot *and* ChatGPT, and the 2026 AI Performance report is your cheapest citation *measurement*).

### PHASE 3 — Two new blog posts (next working session)
Both **fill dead `related` slugs already wired into the site** and target confirmed gaps:
1. **Conflict-of-interest screening for AI intake (ABA Rule 1.18 / 1.7 / 1.10)** — owns the #1 partner objection; a YMYL ethics gap with no authoritative web resource; interlinks the conflict help article + criminal/family solutions.
2. **Switching from Smith.ai / Ruby / AnsweringLegal to AI intake — 14-day migration guide** — high commercial-intent competitor-name queries; already double-referenced by the pricing-comparison post; gives the help center its first inbound links.
Both must ship **answer-first, stat-rich, source-cited, named-author** (Phase-2 freshness/E-E-A-T rules).

---

## DO NOT SPEND CYCLES ON (consciously skipped, with reasons)
- **Schema expansion *for AI citations*** (≈0 lift) — fix the entity graph for *grounding* only.
- **More llms.txt / .well-known / DNS-AID work** (no engine consumes it for citation).
- **Argo, Cache Reserve, Polish/Transformations** (static-edge content; images are off-domain Cloudinary).
- **Enterprise security knobs** (WAF/rate-limit/LB/Spectrum/mTLS) — nothing to protect on a static marketing site.

## MEASUREMENT (close the loop)
Cloudflare **Observatory** (daily lab) + auto-injected **RUM** (real INP/LCP/CLS); **Bing Webmaster AI Performance** (per-URL AI citations); Search Console (index/snippet eligibility — the AIO prerequisite).
