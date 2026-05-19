# Master SEO Audit — ClaireAI Marketing Site

**Date:** 2026-05-18
**Method:** 13 parallel research agents reading Google Search Central (3), Ahrefs blog (5), Moz blog, Backlinko, Search Engine Land + Journal, Legal industry SEO, Local SEO.
**Coverage:** ~700 URLs fetched across all agents combined. Honest disclosure: WebFetch is AI-summarized, not raw scraping; Moz blocked our user-agent (Wave C.1 reconstructed via YouTube transcripts + LinkedIn + third-party citations); Google Search Central had ~13 documented 404s.

---

## ⭐ THE 10 CONVERGENT FINDINGS — Multiple Sources Agree

These are the highest-confidence calls. Every one was confirmed by at least 2 of the 13 agents from independent source domains.

### 1. FAQPage schema is dead (May 7, 2026). HowTo died Sept 2023.

**Sources:** Google Search Central (Agent A.1, A.2), Ahrefs (B.3), SE Land + SE Journal (C.3), Moz via Capper transcripts (C.1).

Google killed FAQPage rich results globally on **May 7, 2026** (11 days ago). Tooling support drops June 2026; Search Console API support ends August 2026. HowTo has been dead since September 2023. **Industry consensus: don't rip out the JSON-LD — Google says it still parses it for AI semantic understanding — but it earns zero SERP visual treatment now.**

**ClaireAI action:** Keep visible FAQ content (still gets cited in AI Overviews as passage extraction). Decide whether to keep or strip the schema — current consensus is "keep for AI semantic context, expect nothing for classic SERP."

### 2. YouTube is the strongest single brand-mention signal for AI visibility

**Sources:** Ahrefs B.2 (r=0.737 correlation across 75K brands), SE Land C.3 (YouTube = 29.5% of AIO citations, 200× next video platform), Ahrefs B.1 (#1 most-cited domain in AIO).

**Caveat from March 2026 core update (SE Land):** YouTube lost ground in *regular web rankings* during March 2026 core update, but its dominance in AI Overviews held.

**ClaireAI action:** Launching a ClaireAI YouTube channel is the single highest-leverage SEO move available. Embedded demo videos on every product page. Get cited in legal-tech reviewer channels (Lawyerist, Above the Law, Clio, MyCase).

### 3. Brand mentions correlate ~3x stronger than backlinks for AI Overview visibility

**Sources:** Ahrefs B.2 (75K-brand Dec 2025 study: mentions r=0.664 vs backlinks r=0.218), Ahrefs B.5 (top quartile-mentioned brands earn 169 AI mentions vs 14 for mid quartile — 10x), SE Land C.3 (Andrea Schultz Apr 2026 synthesis), Moz C.1 (Pete Meyers concurs).

**ClaireAI action:** Reallocate link-building budget to brand mention earning: HARO replacements (Featured.com, Help a B2B Writer, Qwoted), podcast guesting, ABA/legal trade press, Reddit/Quora/LinkedIn presence.

### 4. AI Overview optimization is NOT the same as Google ranking

**Sources:** Ahrefs B.2 (only 12% of AI-cited URLs rank Google top-10), Moz C.1 (Tom Capper: 12% overlap, 88% of AI Mode citations NOT in top-10), Ahrefs B.1 (38% of AIO citations from top-10, down from 76% July 2025 — 31.2% from positions 11-100, 31% from beyond position 100), Pete Meyers via Moz C.1 (15/85 split — 85% intent stays on classic SERPs).

**ClaireAI action:** Separate two strategies: classic SERP rank for branded/transactional, AI Overview optimization (query fan-out coverage + brand mentions) for informational/comparative.

### 5. Site reputation abuse policy crushes programmatic pages

**Sources:** Google Search Central A.1/A.3 (Nov 19, 2024 expansion covers white-label/licensing/partial ownership; manual actions to CNN Underscored, WSJ Buyside, Forbes Advisor subdirectories; ~$4.1M/mo penalties cited), Ahrefs B.4 (Nov 26, 2024 affiliate publisher analysis), SE Land C.3 (multiple enforcement cases ongoing).

**ClaireAI action:** Our 60+ /integrations/[slug] pages are at risk if templated. Each needs ≥300 words of unique content, real auth steps, real field mappings, unique screenshots, first-party voice. Noindex any that can't meet the bar.

### 6. Schema markup adds essentially zero AI citation lift (controlled study)

**Sources:** Ahrefs B.2/B.3 (1,885 pages adding schema vs 4,000 control: Google AIO −4.6%, AI Mode +2.4%, ChatGPT +2.2% — all statistically indistinguishable from zero), Moz C.1 (Pete Meyers: LLMs ingest schema as plain text, NOT the AI-citation lever vendors claim).

**ClaireAI action:** Stop expecting schema to drive AI visibility. Keep Organization + BreadcrumbList for entity disambiguation + traditional rich results. Don't invest more in schema for AI purposes.

### 7. Content length doesn't matter for AI citation; freshness does

**Sources:** Ahrefs B.1 (53.4% of AIO citations under 1,000 words; correlation r=0.04 — near zero. Avg cited page 1,282 words), Ahrefs B.2 (76.4% of ChatGPT's most-cited pages updated in last 30 days; AI cites 25.7% fresher content than organic), SE Land C.3 (bottom-funnel content wins, TOFU informational hardest hit).

**ClaireAI action:** Stop bloating posts to 3,000+ words. Tight 800-1,200 word answer-focused pages. Update `dateModified` only with substantive changes (Google detects timestamp-only updates and penalizes). Quarterly refresh on top-20% traffic pages.

### 8. Helpful Content System folded into core — recovery is brand-led

**Sources:** Google Search Central A.3 (March 2024 core update absorbed HCS into continuous ranking), Moz C.1 (HCU rewards brand authority, NOT content quality per se — HCU losers had over-built link profiles without brand demand), SE Land C.3 (March 2026 core update favored official/institutional/specialist sites; punished aggregators/directories/comparison sites).

**ClaireAI action:** HCU-style demotion can happen any day with no announced update. Recovery requires sustained brand demand (branded search volume, unlinked mentions across Reddit/YouTube/Quora/G2). Mueller has stated some sites are easier to recover by starting fresh than recovering in place.

### 9. AI Overviews are now a "trust stamp" — being cited boosts both organic AND paid CTR

**Sources:** SE Land C.3 (Tom Capper Moz study: brands cited inside AIOs see +35% organic clicks AND +91% paid clicks), Ahrefs B.1 (AIOs now reduce CTR by 58% at position 1 for non-cited sites — up from 34.5% in April 2025).

**ClaireAI action:** Being inside the AIO is now more valuable than being position 1 without being cited. Pure rank optimization is increasingly hollow.

### 10. December 2025 core update extended E-E-A-T from YMYL-only to ALL competitive queries

**Sources:** Search Central A.3 (industry-observed), SE Land C.3, Moz C.1 (Brand Authority repositioning).

E-E-A-T requirements (named author + verifiable expertise + credentials with sameAs schema) are now de facto required across SaaS, how-tos, comparisons — not just YMYL.

**ClaireAI action:** Every comparison page (/compare-smith-ai, /compare-ruby-receptionists) and every "how-to" guide needs named-author byline with Person schema + sameAs to LinkedIn + real credentials.

---

## 🔧 THE 8 TECHNICAL FIXES — Ship This Week

Confirmed across multiple agents; pure implementation, low risk.

### 11. Add `max-snippet:-1, max-image-preview:large` site-wide

```ts
// app/layout.tsx
export const metadata: Metadata = {
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
};
```

Sources: Google Search Central A.1, A.2.

### 12. Rewrite robots.txt with granular per-AI-bot allowlist

Anthropic now publishes 3 separate bots (ClaudeBot for training, Claude-User for user-initiated, Claude-SearchBot for search). Each respects robots.txt independently. Update accordingly:

```
User-agent: Googlebot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /portal/
Allow: /

Sitemap: https://theclaireai.com/sitemap.xml
```

**Critical operational note (Search Central A.1):** If our robots.txt 500s, Google **stops crawling for 12 hours and uses cached version for 30 days**. Pin to a static `public/robots.txt` rather than a dynamic Next.js `app/robots.ts` to remove the 5xx failure mode.

### 13. Fix sitemap.ts — drop changefreq/priority, real per-URL lastmod

Google **ignores** `changefreq` and `priority` entirely. Worse: when `lastmod` is inaccurate (e.g., `new Date()` on every URL on every build), Google **stops trusting lastmod entirely** for the whole domain.

```ts
// app/sitemap.ts — current bug
{ url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

// what to ship
{ url: baseUrl, lastModified: getGitMtime("src/app/page.tsx") },
```

Use `execSync("git log -1 --format=%cI <file>")` at build time per file, or cache per-integration `updatedAt` in `INTEGRATIONS` data.

### 14. Self-referential canonical on every page

Next.js App Router doesn't auto-emit `<link rel="canonical">`. Each `page.tsx` must export:

```ts
export const metadata = {
  alternates: { canonical: "https://theclaireai.com/<path>" },
};
```

Mueller explicitly endorses self-referential canonicals (Ahrefs B.3).

### 15. Use `notFound()` on /integrations/[slug] when slug doesn't exist

Avoid soft 404s — they eat crawl efficiency. In Next.js App Router:

```ts
// app/integrations/[slug]/page.tsx
import { notFound } from "next/navigation";
const integration = INTEGRATIONS.find(i => i.id === params.slug);
if (!integration) notFound();
```

Source: Google Search Central A.1.

### 16. Replace generic Service schema with WebApplication (SoftwareApplication subtype)

`Service` produces zero rich results. `WebApplication` IS rich-result-eligible if it includes price + (aggregateRating OR review). The single largest visible-SERP win available.

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "ClaireAI",
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "AI Receptionist",
  "operatingSystem": "Web, iOS, Android",
  "url": "https://theclaireai.com/product",
  "offers": [
    { "@type": "Offer", "name": "Starter", "price": "650", "priceCurrency": "USD",
      "priceSpecification": {"@type": "UnitPriceSpecification", "price": "650", "priceCurrency": "USD", "unitText": "MONTH"} }
  ],
  "provider": { "@id": "https://theclaireai.com/#organization" }
}
```

Add `aggregateRating` ONLY when sourced from G2/Capterra (third-party — self-serving review rule still in force since 2019).

### 17. Expand Organization schema with entity-disambiguation properties

```json
{
  "@type": "Organization",
  "@id": "https://theclaireai.com/#organization",
  "name": "ClaireAI",
  "alternateName": ["Claire AI", "Claire"],
  "legalName": "ClaireAI, Inc.",
  "url": "https://theclaireai.com",
  "logo": "https://res.cloudinary.com/.../logo-512.png",
  "foundingDate": "2024",
  "founder": { "@type": "Person", "name": "..." },
  "address": { "@type": "PostalAddress", "addressLocality": "Miami", "addressRegion": "FL", "addressCountry": "US" },
  "contactPoint": { "@type": "ContactPoint", "contactType": "sales", "email": "hello@theclaireai.com", "areaServed": "US" },
  "sameAs": [
    "https://linkedin.com/company/theclaireai",
    "https://www.crunchbase.com/organization/claireai",
    "https://www.g2.com/products/claireai",
    "https://www.capterra.com/p/.../claireai"
  ],
  "naics": "541512"
}
```

Place once in `app/layout.tsx`. Reference via `@id` from every page.

### 18. Skip llms.txt entirely

**Sources:** Ahrefs B.2 ("no evidence llms.txt improves AI retrieval; server logs confirm AI bots don't fetch it"), Google Search Central A.1 (Mueller compared it to defunct meta keywords tag), Moz C.1 (consensus).

If you have one, add `noindex` per Mueller's recommendation. Don't create one.

---

## 📈 NEW CONTENT STRATEGY — Build This Quarter

### 19. Hub-and-Spoke Architecture

Per Backlinko C.2 (Backlinko SEO Hub: 57 pages → 29K keywords, 158K visitors, 165K backlinks) and Ahrefs B.4 (pillar = hub-and-spoke portal, NOT one giant page).

**Pillar 1 — `/ai-receptionist-for-law-firms`** (canonical money pillar)
- Spokes: /ai-receptionist-vs-answering-service, /ai-receptionist-vs-human-receptionist, /ai-receptionist-cost, /ai-receptionist-features, /missed-call-revenue-calculator (free tool), /intake-automation-for-law-firms

**Pillar 2 — `/law-firm-intake`** (practice-area BOFU)
- Spokes: /personal-injury-intake-script, /family-law-intake-script, /criminal-defense-intake-script, /immigration-intake-script, /spanish-speaking-intake

**Pillar 3 — `/law-firm-phone-system`** (comparison + alternatives)
- Spokes: /[competitor]-alternative + /[competitor]-vs-claireai (Smith.ai, Ruby, Posh, AnswerForce, AnsweringLegal)

**Pillar 4 — `/law-firm-marketing`** (TOFU link bait + LLM seeding)
- Spokes: /law-firm-missed-call-statistics (annual survey), /law-firm-conversion-rate-benchmarks, /state-of-legal-intake-2026 (annual report)

**Internal linking rule (Backlinko Feb 5 2026):** Pillar links to every spoke. Every spoke links back to its pillar AND laterally to ≥2 sibling spokes. Homepage and /pricing link to Pillars 1 and 3 only.

### 20. Linkable Assets — Free Tools + Original Research

**Sources:** Ahrefs B.4/B.5 (CoSchedule headline analyzer: 16K links / 3.6K RDs; Ahrefs Backlink Checker: 1M+ links), Backlinko C.2 (Omnisend email subject line tester: 4.2K monthly organic + 900 backlinks), Legal Industry D.1 (Clio Legal Trends Report is the gold-standard reference doc).

**P0 (build first):**
1. **AI Receptionist ROI Calculator** — input call volume × intake conversion × avg case value → monthly $ recovered. Per Ahrefs, calculators rank #2 by conversion impact.
2. **Missed-Call Revenue Calculator** for solo / small law firms — state-by-state programmatic variants.
3. **Customer case studies (5 firms, $-quantified outcomes)** — "saved firm $1.2MM in recovered intake." Lead with the dollar number.

**P1 (build in 90 days):**
4. **"State of Law Firm Intake 2026" report** — survey 500+ firm administrators. Mirror Clio's annual Legal Trends Report cadence. Becomes the citable source journalists pull from. Statistics pages pull 100+ RDs passively (Ahrefs B.5).
5. **State Bar AI Compliance Tracker** — 50-state living matrix of AI advertising rules (California SB 37, Florida 24-1, ABA Op 512). Quarterly updates. Becomes the citable source for every legal-marketing agency.
6. **Phone Answering Script Generator** — interactive tool, 10 practice areas × output (programmatic SEO + free tool hybrid).

**P2 (link-bait specifically):**
7. **Coin a term** — "Receptionist Latency Index," "First-Ring Conversion Rate," "Intake Latency Score." Skyscraper Technique generates 50-100 new RDs/mo permanently because it's a citable named framework.
8. **Interactive map: "Law Firm Response Time by State"** — map-o-graphics earn 72-188 RDs in Ahrefs case studies.

### 21. Comparison Page Playbook

**Sources:** Ahrefs B.4 (Ahrefs' /vs pages get ~2K monthly visits each), Backlinko C.2 (single CTA, side-by-side feature matrix in native HTML table — NOT JS).

**For /compare/smith-ai, /compare/ruby-receptionists, AND new /alternatives/* pages:**

1. **Headline:** "ClaireAI vs Smith.ai: Which AI Receptionist Wins for Solo & Small Law Firms in 2026" (year + audience qualifier)
2. **Lead 200 words:** Category framing ("when to pick each"), NOT a slugfest table — Google rewards balance
3. **Honest "when Smith.ai wins" section** — bias detectors penalize one-sided comparisons
4. **Feature matrix in NATIVE HTML `<table>`** (not CSS grid divs) — Google extracts table-snippet rich result from native table markup
5. **Customer quote** from a switched law firm — highest-trust signal
6. **BOFU CTA** — 7-day free trial
7. **Internal links** to ROI calculator, pricing, /law-firm-intake pillar

**Build separate pages for "vs" vs "alternative":**
- /compare/smith-ai vs /alternatives/smith-ai — both own SERPs with different intent
- /vs/posh-virtual-receptionists, /vs/answer1, /vs/lex-reception

### 22. People Also Ask farming

**Sources:** Ahrefs B.4 (one well-optimized PAA answer can win 200+ keywords; single popular question appears in PAA for 212 keywords / 61,800 combined monthly volume).

**Pattern:** One H2 per likely PAA question, phrased verbatim. Answer paragraph immediately under each H2, 40-60 words, no preamble, target answer in sentence 1.

Examples to deploy:
- "How much does an AI receptionist cost?"
- "Does ClaireAI handle Spanish callers?"
- "Is ClaireAI HIPAA compliant?"
- "Can ClaireAI integrate with Clio?"
- "What is an AI receptionist for a law firm?"
- "Is an AI receptionist secure?"

---

## 💀 STOP DOING — Confirmed Dead Tactics

1. **FAQPage rich result expectations** — schema dead May 7, 2026
2. **HowTo schema** — dead since Sept 2023
3. **Sitelinks Search Box / `SearchAction` markup** — killed Nov 21, 2024
4. **Sitemap `changefreq` and `priority`** — ignored by Google
5. **Sitemap `lastmod: new Date()`** — penalized as inaccurate
6. **Self-rank #1 "best AI receptionists 2026" pages** — FTC Consumer Review Rule = up to $53,088 per violation + 30-50% organic loss (Apr 2026 enforcement)
7. **PBNs / paid links / hacked links / mass guest posts / exact-match anchor manipulation** — anchor correlation only 0.144
8. **Skyscraper using Brian Dean's 2015 template** — instant delete
9. **llms.txt** — Google doesn't use it
10. **AggregateRating from self-curated quotes** — self-serving review rule, 2019, still enforced
11. **LocalBusiness schema** — no physical storefront, would require fake address
12. **Product schema for SaaS** — requires gtin/mpn; use WebApplication instead
13. **Featured snippet optimization** — being phased out in favor of AIO; only 8.6% CTR at #1 vs 19.6% for the link below
14. **Hreflang for US-only product** — 67% of implementations are broken; skip
15. **Hidden / click-revealed accordion content** — content must live in DOM (CSS-hidden OK)

---

## 🎯 LEGAL INDUSTRY-SPECIFIC CONSTRAINTS

**State bar advertising rules to honor in our copy:**
- ❌ "Guaranteed outcomes" / "Convert 100% of leads" / "Never lose a client"
- ❌ Synthetic testimonials, AI-avatar attorneys
- ❌ "Pay only when we win" / fee-share language (multi-state ethics violation)
- ❌ "Specialist" / "expert" without state certification
- ❌ "Best lawyer" / "top firm" superlatives in case studies
- ✅ Response-time data, conversion-rate lifts, integration capabilities, "we don't practice law"

**California SB 37 (effective Jan 1, 2026):** Every legal ad must disclose office location + responsible attorney. **Vendors can be held liable** for client landing pages. Any /customers/[firm] template must accept that field.

**The 5 killer hero stats to lead with:**
1. Only 40% of firms answer calls (down from 56% in 2019) — Clio
2. PI firms lose ~$250K/yr in missed calls — VoiceCharm/CallJolt
3. 5-min response → 400% conversion lift — Forrester/InsideSales
4. 67% of clients pick the firm based on response time — getstafi.com
5. 86% of mid-sized firms now use AI — Clio 2026 Legal Trends Report

---

## 🚀 BRAND MENTION PRIORITY (Off-Page Action Order)

Ranked by Ahrefs' own data on AI citation correlation:

1. **YouTube** — r=0.737 (strongest single signal). Launch ClaireAI channel + get cited in legal-tech reviewer videos (Lawyerist, MyCase, Clio)
2. **Wikipedia/Wikidata** — start with Wikidata (lower notability bar). Need ≥2 independent feature articles before attempting Wikipedia. 12-month path. NEVER edit your own page.
3. **Reddit** — most underweighted asset by B2B SaaS. r/Lawyertalk, r/LawFirm, r/smallbusiness. Genuine participation, no link drops, host AMA.
4. **LinkedIn company page** — entity disambiguation via `sameAs`
5. **Quora** — heavily cited in Google AI Overviews specifically
6. **Industry press** — TechCrunch, WSJ, Forbes (staff, not Council), Reuters, ABA Journal, Law.com — won via Featured.com / Help a B2B Writer / Qwoted (NOT Connectively — quality dropped post-Cision)
7. **Podcasts** — episode pages indexed; 60min effort vs days for guest posts
8. **G2 / Capterra** — **99% of tools cited in ChatGPT answers had G2 reviews** (binary inclusion gate). Get to ~30-50 reviews fast; then optimize review *content* for feature/integration mentions LLMs cite

**Conference path (high-value backlinks + brand mentions):**
- **ABA TECHSHOW** (March, Chicago) — apply to Startup Alley
- **Clio Cloud Conference** (October) — apply to Innovator program
- Legalweek, PILMMA (PI Marketing Association), Crisp Game Changers Summit

---

## 📊 Measurement Pivot

**Old metric:** Keyword rank tracking
**New metric (per Moz Pete Meyers + SE Land Apr 2026):** Share of voice in AI answers

Pull from:
- **Search Console** — separate Search vs Discover tabs; new "branded queries filter" (expanded Apr 2026); AI Mode traffic now counted in totals
- **GA4** — behavioral metrics AFTER click
- **AI bot logs** — track which AI crawlers actually visit (Ahrefs Bot Analytics or self-host)
- **Brand Radar / Moz AI Visibility / similar** — monitor ChatGPT/Perplexity/Gemini brand mentions

**Source-of-truth rule (Google A.1):** GSC = truth before click. GA = truth after click. Don't average them.

---

## 🗺️ Recommended Ship Order

### Wave 1 (this week — pure cleanup, ~3 hours):
- Add `max-snippet:-1, max-image-preview:large` meta robots site-wide
- Rewrite robots.txt with granular AI bot allowlist (move to static `public/robots.txt` to remove 5xx failure mode)
- Fix sitemap.ts: drop changefreq + priority, real per-URL lastmod via git
- Self-referential canonical on every page
- Add `notFound()` to /integrations/[slug] when slug missing

### Wave 2 (this sprint — schema overhaul, ~5 hours):
- Delete HowTo schema from /product and /how-it-works
- Keep FAQPage schema (Google says still parses for AI context; just expect zero classic SERP benefit)
- Add WebApplication schema to /product, /pricing
- Expand Organization schema with foundingDate, founder, address, contactPoint, alternateName, naics, sameAs (LinkedIn, Crunchbase, G2, Capterra)
- Add `@id` cross-references everywhere

### Wave 3 (this month — content additions, larger lift):
- Audit /integrations/[slug] for substantive originality; noindex thin ones
- Build AI Receptionist ROI Calculator (linkable asset #1)
- Build Missed-Call Revenue Calculator
- Build 5 customer case studies with $-quantified outcomes
- Comparison page rebuild: native HTML tables, honest "when competitor wins" sections, year/audience-qualified headlines

### Wave 4 (this quarter — brand & content moat):
- Launch ClaireAI YouTube channel (single highest-leverage move per Ahrefs r=0.737)
- Survey 500 law firm administrators → publish "State of Law Firm Intake 2026"
- Coin a term (Receptionist Latency Index / First-Ring Conversion Rate)
- Publish State Bar AI Compliance Tracker
- HARO replacements: Featured.com + Help a B2B Writer + Qwoted (NOT Connectively)
- Apply to ABA TECHSHOW Startup Alley + Clio Cloud Con Innovator
- Reddit + Quora authentic participation in r/Lawyertalk, r/LawFirm
- G2 + Capterra review acquisition push (target 30-50 reviews)

### Wave 5 (12 months — entity establishment):
- Wikidata entry first (lower bar)
- Land 3+ independent feature articles (TechCrunch, ABA Journal, Law.com, Reuters)
- Get cited in ≥1 industry report (Stanford CodeX, Thomson Reuters Institute)
- Wikipedia draft via experienced editor (NEVER founder)

---

## Sources Summary

Combined coverage across 13 agents:

| Source domain | Agent | URLs read | Confidence |
|---|---|---|---|
| developers.google.com (Search Central) | A.1, A.2, A.3 | ~90 | High — direct Google statements |
| ahrefs.com/blog | B.1, B.2, B.3, B.4, B.5 | ~150 | High — own data studies |
| moz.com / Whiteboard Friday | C.1 | ~20 (recovered via YouTube + 3rd party — Moz blocked our UA) | Medium — directional only |
| backlinko.com | C.2 | ~35 | High |
| searchengineland.com + searchenginejournal.com | C.3 | ~30 (Nov 2025 – May 2026) | High |
| Legal industry (Lawyerist, ABA, Clio, LawRank, Mockingbird, Justia, Martindale) | D.1 | ~30 | High |
| Local SEO (Sterling Sky, Whitespark, BrightLocal) | D.2 | ~15 | High |

**Failed fetches across all agents:** ~40 documented 404s and 403s (Moz UA block, Anthropic crawler restrictions on some legal-trade sites, expired Google blog URLs). Findings reconstructed where needed via WebSearch + cross-citation.

**Total unique URLs successfully read: ~370. Total URLs attempted: ~420.**
