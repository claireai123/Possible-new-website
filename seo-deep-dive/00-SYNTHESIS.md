# SEO/Performance Deep-Dive — Synthesis & Action Plan
**Audit run:** 2026-05-26
**Branch state:** repo HEAD differs from live production — **nothing in this audit takes effect until the repo deploys.**

---

## Headline numbers
| Score | Source |
|------|--------|
| Repo technical SEO | 72/100 |
| Live production SEO | 34/100 (running stale codebase) |
| CWV (lab, home `/`) | LCP 2356ms desktop · 1552ms mobile · CLS 0.004 — 🟢 |
| Sitemap | Broken — build will fail |
| Content quality | Strong (1,000–2,100 word posts, real legal authorities) |

---

## P0 — Production-blocking / immediate

| # | Fix | File(s) | Source agent |
|---|-----|---------|--------------|
| P0.1 | `gitMtime` resolves to `.next/` not repo — every URL ships the same lastmod | `src/app/sitemap.ts:9` | sitemap, performance |
| P0.2 | Six dead URLs in `corePages` will throw `assertSourceExists` and **fail prod build** | `src/app/sitemap.ts:42-55` | sitemap, technical |
| P0.3 | 5 of 6 blog posts invisible to Google (only `benchmark-report` hardcoded) | `src/app/sitemap.ts` | sitemap, content |
| P0.4 | `/pricing` ships with no metadata, no canonical, no schema | `src/app/pricing/page.tsx` | technical |
| P0.5 | `/contact` links to non-existent `/privacy-policy` → 404 | `src/app/contact/page.tsx:264` | technical |
| P0.6 | Production runs an entirely different/old site | n/a — deploy gate | technical |

## P1 — High value, ship soon

| # | Fix | Impact | Source |
|---|-----|--------|--------|
| P1.1 | Drop unused Fraunces; self-host Manrope via `next/font` | LCP −400–1100ms every route | performance |
| P1.2 | Hero img `fetchPriority="high"` + `loading="eager"` | LCP `/` −400–700ms | performance, technical |
| P1.3 | Remove 13 `FAQPage` JSON-LDs (dead 2026-05-07) | Clean schema, zero risk | technical (user memory) |
| P1.4 | Remove `HowTo` JSON-LD × 66 integration pages (dead 2023-09) | Clean schema | technical (user memory) |
| P1.5 | Fix LinkedIn `sameAs` drift (`/company/theclaireai` vs `/company/claireai`) | Entity graph integrity for LLMs | content |
| P1.6 | Add `founders` array + `telephone` to Organization schema | Knowledge panel hygiene | technical |
| P1.7 | Trim 8 over-length meta descriptions (>160) + 3 over-length titles (>60) | SERP truncation | technical |
| P1.8 | Convert blog `post.date` to ISO 8601 in `posts.ts` | Schema.org compliance | technical |
| P1.9 | 66 integration pages site-rep-abuse risk — noindex 40 long-tails OR add unique copy | Avoid Google demotion | technical, content |
| P1.10 | FTC bias disclosure on `/blog/best-ai-receptionist-law-firms-2026` | ~$53K/violation enforcement risk | content |
| P1.11 | Footer missing Blog/Help/Legal/Privacy/Terms columns | Crawl + trust signals | technical |
| P1.12 | `Log in` header link points to `#` | UX + Google noisy-link signal | technical |

## P2 — Should-do this quarter

- Build privacy-policy + terms-of-service pages (legal compliance)
- Build /careers page (founder letter alternative)
- Add `viewport` export to layout.tsx
- TechArticle help pages: add `image`
- BlogPosting items: add image/author/publisher
- `/contact` page needs SSR header (currently client-only)
- Add outbound primary-source citations to all blog posts (ABA Op 512, FCC, Forrester, *Heppner v. Claude*) — top 3 E-E-A-T win
- Person profile pages for Tiago + Cal per Dec 2025 core update
- Lazy-load 32-clone logo marquee
- Decide fate of `public/llms.txt` (delete per user posture, or keep with noindex)
- Internal cross-linking among 66 integrations + 10 help articles

---

## GA4 install (Agent 5)
Architecture: **GTM + GA4 + Vercel Web Analytics in parallel.** Consent Mode v2 + Cookiebot.
5 Key Events: `contact_form_submit`, `cal_booking_complete`, `click_book_demo`, `cal_modal_open`, `blog_read_complete`.
Runbook: `05-ga4-implementation-plan.md` (637 lines, ready to execute on user go).

---

## Completed (this session)

| # | Fix | Files touched | Verification |
|---|-----|---------------|--------------|
| ✅ P0.1 | gitMtime now resolves to repo root via `process.cwd()` | `src/app/sitemap.ts` | Sitemap now ships 19 distinct lastmod values (was 1) |
| ✅ P0.2 | Removed 6 dead URLs from `corePages` | `src/app/sitemap.ts` | Production build no longer trips `assertSourceExists` |
| ✅ P0.3 | Added every blog post to sitemap via `POSTS.map(...)` | `src/app/sitemap.ts` | 95 URLs total (was 96 with 6 ghosts; now real 95) |
| ✅ P0.4 | Added `metadata` + `WebApplication`+`AggregateOffer` JSON-LD + `BreadcrumbList` to `/pricing` | `src/app/pricing/page.tsx` | Route 200; canonical present |
| ✅ P1.2 | Hero `<img>` gets `fetchPriority="high"` + `loading="eager"` + `decoding="async"` | `src/components/sections/hero.tsx:26` | LCP expected −400-700ms |
| ✅ P1.3 | Removed every `FAQPage` JSON-LD (11 files, ~80 instances at runtime when long-tail routes are counted) | 11 components/pages | 0 FAQPage refs in served HTML across 7 sampled routes |
| ✅ P1.4 | Removed `HowTo` JSON-LD on every integration page | `src/app/integrations/[slug]/page.tsx` | Single const removed + destructure trimmed |
| ✅ P1.5 | Canonicalized every LinkedIn `sameAs` to `https://www.linkedin.com/company/theclaireai` | 6 files | Entity graph no longer fractures |
| ✅ P1.6 | Added `founders` array (Tiago + Cal) + `telephone +1-561-250-5789` on both ContactPoints to `Organization` schema | `src/app/layout.tsx` | Knowledge-panel ready |
| ✅ P1.7 | Trimmed 9 over-length titles + descriptions; standardized homepage to "ClaireAI 365" branding | layout, how-it-works, product, product/lead-iq, 3 solutions pages | All ≤60 chars title, ≤155 chars description |
| ✅ P1.8 | Article schema dates now ISO 8601 via `toISO()` helper | `src/app/blog/[slug]/page.tsx` | `2026-02-14` format |

## Still TODO (needs user decision OR larger scope)

| # | Item | Why deferred |
|---|------|--------------|
| P0.5 | `/contact` links to non-existent `/privacy-policy` | Need real privacy policy copy (legal review) — fake stub is worse than broken link |
| P0.6 | Production runs OLD codebase | Deploy gate; user controls Vercel deploy trigger |
| P1.1 | Self-host fonts via `next/font`, drop unused Fraunces | Bigger refactor; explicit go-ahead needed (LCP −400-1100ms when shipped) |
| P1.9 | 66 integration pages site-rep-abuse risk | Business decision: noindex 40 long-tails vs invest in unique copy |
| P1.10 | FTC bias disclosure on `/blog/best-ai-receptionist-law-firms-2026` | Copy decision; ~$53K/violation enforcement risk |
| P1.11 | Footer missing Blog/Help/Legal columns | Design + copy decision |
| P1.12 | `Log in` header link → `#` | Need the real Control Room URL |
| P2 | Build `/privacy-policy`, `/terms-of-service`, `/careers` | Content work, legal review |
| P2 | Person profile pages `/team/[slug]` for founders | Per Dec 2025 E-E-A-T core update — content authoring |
| P2 | Outbound citations on blog/help to ABA Op 512, FCC, Forrester, *Heppner v. Claude* | Authoring pass |
| GA4 | Install per `05-ga4-implementation-plan.md` | Awaiting go |

## What needs a user decision before I touch it
- Build privacy-policy / terms-of-service / careers / compare-* / product/legal-intake (content work)
- 66 integration pages — noindex long-tail OR invest in unique copy
- Self-host fonts via `next/font` (bigger refactor — explicit go please)
- Add `/team/[slug]` Person profile pages (content work)
- FTC bias disclosure rewrite on best-AI-receptionist blog (copy decision)
- GA4 install go-ahead

Detailed reports:
- `01-sitemap-audit.md`
- `02-performance-audit.md`
- `03-technical-seo-audit.md`
- `04-content-eeat-geo-audit.md`
- `05-ga4-implementation-plan.md`
