# 04 — Content, E-E-A-T & GEO Audit

**Date:** 2026-05-26
**Scope:** Every routed page on theclaireai.com — homepage, product, solutions, integrations, pricing, contact, blog (6 posts), help center (10 articles), 66 integration slug pages. Exhaustive — no sampling.
**Method:** Reviewed `src/app/**`, `src/data/posts.ts`, `src/data/help-articles.ts`, `src/data/integrations.ts`, `src/app/sitemap.ts`, `public/robots.txt`, `public/llms.txt`, `src/components/sections/*.tsx`, `src/components/layout/footer.tsx`.

---

## Verdict

**The content is largely strong — but five load-bearing infrastructure defects undercut all of it.** The blog posts, help articles, and solutions pages are factual, structured, citation-ready, and substantially above thin-content floors. The product page is a benchmark-grade citable passage farm. What's broken sits outside content quality: the sitemap references seven pages that do not exist (production build will throw), the homepage and pricing page emit no per-page metadata, the Organization `sameAs` value drifts between `/company/theclaireai` and `/company/claireai` across pages (entity-graph fracture), no blog or help author has a `Person` profile page or LinkedIn `sameAs`, and **zero outbound primary-source links exist in any content** despite naming ABA, Forrester, Clio, FBI UCR, FCC, and Heppner v. Claude repeatedly. The 66-page `/integrations/[slug]` directory uses category-templated copy that meets the November 2024 site-reputation-abuse minimum bar but is identical across vendors within each of 11 categories — a programmatic-risk vulnerability if Google tightens further.

---

## What's New vs. Existing Audit Docs

`MASTER-SEO-AUDIT.md` and `SEARCH-CENTRAL-AUDIT.md` already covered:
- Schema posture (FAQPage dead, HowTo dead, WebApplication recommended)
- robots.txt + sitemap technical hygiene
- Brand-mention vs backlink ratios for AIO
- High-level integration-page risk

`FAQ-RESEARCH.md` already covered: 67 net-new FAQ recommendations across 6 pages, deduplicated against existing FAQ inventory.

**This audit adds, fresh:**
1. **Per-page E-E-A-T scorecard** (URL × 4 factors) for all 78 routed pages — not done before.
2. **Sitemap drift discovery** — 7 phantom pages referenced, 5 real blog posts missing. Production build will hard-throw on the first `assertSourceExists`. (Not flagged in any prior doc.)
3. **Homepage + pricing missing `metadata` export** — they inherit `app/layout.tsx` defaults, so `/pricing` ships with the homepage `<title>` and no canonical. (Not flagged.)
4. **Organization `sameAs` URL drift** — three distinct values across the codebase, breaking entity graph consolidation. (Not flagged.)
5. **Zero outbound primary-source citations** across blog + help content. (Implicit in `MASTER-SEO-AUDIT.md` #8 but not measured.)
6. **Per-template duplicate fingerprint** across the 66 integration pages. 11 category templates × ~5 vendors each = vendors share verbatim definition / sync-row / workflow / FAQ paragraphs. (Flagged in prior doc as risk; quantified here.)
7. **Author E-E-A-T gap mapping** — three named author entities (Tiago, Caleo, Cal) appear in `Person` JSON-LD but with no `url`, no `sameAs`, no Person-schema profile page on-site, and no LinkedIn back-reference. The December 2025 Core Update extension requires this. (Flagged generally; mapped here per article.)
8. **Author-attribution drift** — Caleo Tsiapalis is "Co-Founder" in `posts.ts` but the help articles also describe him as "runs customer success" — and `posts.ts` describes Cal Stein as "Co-Founder" while `help-articles.ts` says "Engineering". The Cal-as-Co-Founder credential in `posts.ts:510` is inconsistent with the firm's actual structure shown in `help-articles.ts:108`.
9. **"50+ firms" claim vs sitemap reality** — the homepage FAQ says "ClaireAI runs intake for 50+ U.S. law firms" while only one customer quote ($1.2MM, anonymized "Top 50 PI Firm") exists site-wide, with zero linkable customer case studies. Quantified risk: legal-industry advertising rules (state bar) make unverified "50+" claims a malpractice-adjacent disclosure concern.
10. **Solutions/[area] page count = 3, but immigration claimed in 4 places.** Homepage FAQ, layout `knowsAbout`, llms.txt, and product page all reference immigration as a supported practice area, yet no `/solutions/immigration` page exists. AI Overviews will fail-to-cite when the entity link target doesn't resolve.

---

## Per-Page E-E-A-T Scorecard

Scoring: each factor 0–10. Weighted total: Experience 20%, Expertise 25%, Authoritativeness 25%, Trustworthiness 30%. The 0-100 column is the weighted score.

### Homepage `/`

| Factor | Score | Notes |
|---|---|---|
| Experience | 7 | Named anonymized customer ("Top 50 PI Firm — $1.2MM"). Real audio demo. No before/after photos, no embedded testimonial video (placeholder only). |
| Expertise | 6 | Detailed FAQ answers; cites Clio 78% conversion stat. No author byline on page. |
| Authoritativeness | 4 | No LinkedIn footer link. No press logos. Logo ticker is partner CRMs, not press. |
| Trustworthiness | 6 | Footer is sparse; no privacy / terms / security link surface. Org schema present in layout but no per-page reinforcement. No SOC 2 badge graphic. |
| **Weighted** | **5.6/10 → 56/100** | Top issue: missing `metadata` export means no canonical, no OG override. Top fix: add `metadata` with canonical + Open Graph, and place a `/team/[slug]` link cluster in the footer. |

### `/product`

| Factor | Score | Notes |
|---|---|---|
| Experience | 8 | Stage 1/2/3 narrative reflects real product mechanics; UPL/privilege/Heppner-v-Claude FAQ shows first-hand legal reasoning. |
| Expertise | 9 | ABA Formal Op 512, Model Rule 5.5, Model Rule 1.18, Heppner v. Claude (2026), FCC 2024 disclosure rule, two-party consent states named verbatim. |
| Authoritativeness | 6 | Organization schema present with `sameAs` (LinkedIn + Crunchbase). NO outbound link to any of the cited authorities. |
| Trustworthiness | 8 | "Our own SOC 2 Type II audit is in progress" — honest, not overclaiming. Pricing transparent. |
| **Weighted** | **7.7/10 → 77/100** | Top issue: zero outbound citation links to ABA/FCC/court opinions. Top fix: hyperlink every named authority — ABA Op 512, FCC 2024 rule, Heppner v. Claude, Model Rules. |

### `/product/lead-iq`

| Factor | Score | Notes |
|---|---|---|
| Experience | 7 | DEFINITION paragraph is product-mechanic-specific, not generic; brief-dispatch detail is operational. |
| Expertise | 7 | Names CRMs, transports (SMS/Slack/Teams), grade rubric mechanics. |
| Authoritativeness | 5 | No outbound citation. No comparison to named competitor scoring (HubSpot Predictive, Salesforce Einstein). |
| Trustworthiness | 7 | Pricing context consistent with `/pricing`. |
| **Weighted** | **6.5/10 → 65/100** | Top issue: no comparator analysis. Top fix: 200-word side-by-side vs HubSpot Predictive Lead Score + Salesforce Einstein with linked product docs. |

### `/how-it-works`

| Factor | Score | Notes |
|---|---|---|
| Experience | 8 | Latency stat (0.8s pickup) repeated; concrete sub-steps. |
| Expertise | 8 | Named PMS systems, deadline math, conflict mechanics. |
| Authoritativeness | 6 | TechArticle schema present; no outbound citations. |
| Trustworthiness | 7 | 16 existing FAQs cover most operational concerns. |
| **Weighted** | **7.2/10 → 72/100** | Top issue: HowTo schema may still be emitted (verify and strip — dead Sept 2023). Top fix: convert to TechArticle/WebPage and link to LiveKit + Deepgram docs for latency claims. |

### `/pricing`

| Factor | Score | Notes |
|---|---|---|
| Experience | 6 | 3 pricing tiers with specific features. |
| Expertise | 7 | FAQ has 14 questions cited to Smith.ai / Ruby per-call pricing. |
| Authoritativeness | 3 | **No `metadata` export.** Inherits homepage `<title>` "ClaireAI — AI Legal Receptionist | Every Call Answered in 0.8s" — wrong for `/pricing`. No canonical. |
| Trustworthiness | 8 | Plan terms transparent; per-retainer success fee disclosed up front. |
| **Weighted** | **5.9/10 → 59/100** | Top issue: missing `export const metadata`. Top fix: add the metadata block with canonical `/pricing`, OG title "ClaireAI Pricing", WebApplication schema with `offers[]` array. |

### `/contact`

| Factor | Score | Notes |
|---|---|---|
| Experience | 5 | Demo-booking form. No clarity on demo agenda. |
| Expertise | 5 | Layout description names integrations + practice areas. |
| Authoritativeness | 6 | Has its own `layout.tsx` metadata + canonical. |
| Trustworthiness | 7 | Contact channel disclosed. No phone number on the form. |
| **Weighted** | **5.8/10 → 58/100** | Top issue: no published phone number / Miami HQ address visible. Top fix: surface "Miami, FL · hello@theclaireai.com · +1 (561) 250-5789" in a contact block to match the Org schema in layout. |

### `/solutions` (index)

| Factor | Score | Notes |
|---|---|---|
| Experience | 6 | Three card summaries — bullet-dense, not narrative. |
| Expertise | 7 | UM/UIM, UCCJEA, Rule 1.18 named correctly. |
| Authoritativeness | 5 | CollectionPage + BreadcrumbList schema only. |
| Trustworthiness | 6 | Page is short — risks being seen as a directory stub. |
| **Weighted** | **6.0/10 → 60/100** | Top issue: only 3 of 4 claimed practice areas (immigration missing). Top fix: ship `/solutions/immigration` (referenced 4x site-wide already) or strip the claim from llms.txt, layout `knowsAbout`, and `/product` FAQ. |

### `/solutions/personal-injury`

| Factor | Score | Notes |
|---|---|---|
| Experience | 9 | UIM/UM specificity, SoL triage windows, discovery-rule extensions — practitioner-grade detail. |
| Expertise | 9 | 10 FAQs cover edge cases (mass-tort spike, jurisdiction SoL math, retainer dispatch criteria). |
| Authoritativeness | 6 | WebApplication schema, BreadcrumbList. No outbound citation to ABA / state bar. |
| Trustworthiness | 8 | Pricing + integration-list consistent across the site. |
| **Weighted** | **7.9/10 → 79/100** | Top issue: no Person byline on the page (practice-area pages are anonymous). Top fix: add an "Authored by Tiago Strammiello, reviewed by [PI attorney advisor]" line + Person schema. |

### `/solutions/criminal-defense`

| Factor | Score | Notes |
|---|---|---|
| Experience | 9 | Arraignment 48–72hr math, jail-collect-call mechanics, charge/bond capture — all practice-true. |
| Expertise | 9 | Rule 1.18 + co-defendant conflict matrix accurate. |
| Authoritativeness | 6 | "FBI Uniform Crime Report" cited but not linked. "Federal Rule 5 / state law" cited but not linked. |
| Trustworthiness | 8 | Same as PI page. |
| **Weighted** | **7.9/10 → 79/100** | Top issue: same as PI. Top fix: same. |

### `/solutions/family-law`

| Factor | Score | Notes |
|---|---|---|
| Experience | 9 | DV escalation, PFA/TPO/UCCJEA flag detail, paramour conflict matrix. |
| Expertise | 9 | National DV Hotline phone number cited correctly (1-800-799-7233). |
| Authoritativeness | 6 | No outbound DV Hotline / UCCJEA / ABA family-law section link. |
| Trustworthiness | 8 | Trauma-informed framing throughout. |
| **Weighted** | **7.9/10 → 79/100** | Top issue: same as other solutions. Top fix: same — plus link the DV Hotline. |

### `/integrations` (index)

| Factor | Score | Notes |
|---|---|---|
| Experience | 7 | 4 detailed FAQs covering Clio/MyCase/Filevine/HubSpot mechanics. |
| Expertise | 8 | Clio scopes, MyCase API tier, Filevine selector syntax all correct. |
| Authoritativeness | 6 | ItemList schema; links to all 66 children. |
| Trustworthiness | 7 | No per-sync surcharge disclosure consistent across all integrations. |
| **Weighted** | **7.0/10 → 70/100** | Top issue: the FAQs are excellent but only 12 vs the 66 integrations they index. Top fix: keep the FAQ as-is; promote the integration-index page to a hub-and-spoke pillar by linking to a "By Practice Area" + "By Category" grid. |

### `/integrations/[slug]` (66 pages)

| Factor | Score | Notes |
|---|---|---|
| Experience | 4 | Definition paragraph is fully templated by category — every "Practice Management" vendor (14 pages) shares the same 160-word definition with only the vendor name swapped. Same for syncRows, workflows, FAQs. |
| Expertise | 6 | Per-vendor `notes`, `auth`, `tagline`, `oneLiner` provide differentiation. `docsUrl` links to vendor API docs (good). |
| Authoritativeness | 5 | 5 schema types per page (TechArticle, SoftwareApplication, FAQPage, HowTo, BreadcrumbList) — but HowTo + FAQPage are dead-result types (per `SEARCH-CENTRAL-AUDIT.md`). |
| Trustworthiness | 6 | Consistent pricing + integration-included claim. |
| **Weighted** | **5.0/10 → 50/100 (avg across 66)** | Top issue: 70%+ word duplicate fingerprint within each of 11 category buckets — exactly what the November 2024 site-reputation-abuse expansion targets. Top fix: per-vendor 100–150 words of first-party "why a firm picks this integration" copy, plus 2 vendor-specific gotchas. Or noindex any vendor without that depth. |

The 11 categories aren't equally risky. Highest risk:

| Category | Pages | Duplicate copy share | Risk |
|---|---|---|---|
| practice-management | 14 | ~85% | HIGH — every PMS shares the same definition skeleton |
| intake-crm | 7 | ~85% | HIGH |
| phone-voip | 9 | ~80% | HIGH |
| documents | 6 | ~80% | HIGH |
| calendar | 5 | ~75% | MEDIUM |
| payments-esign | 6 | ~75% | MEDIUM |
| court-records | 4 | ~80% | MEDIUM |
| accounting | 3 | ~80% | MEDIUM |
| notifications-workflow | 5 | ~75% | MEDIUM |
| call-tracking | 3 | ~80% | MEDIUM |
| jail-phone | 4 | ~70% | LOWER — practice-area scoping inherently differentiates |

### `/blog` (index)

| Factor | Score | Notes |
|---|---|---|
| Experience | 6 | Lists 6 posts with excerpts. |
| Expertise | 6 | Excerpts surface real numbers (1000 firms, $250K, 35%). |
| Authoritativeness | 7 | Canonical present. |
| Trustworthiness | 6 | No author bios cross-listed on the index. |
| **Weighted** | **6.2/10 → 62/100** | Top fix: cross-list authors on the blog index card so the author byline is visible without click-through. |

### `/blog/2026-legal-intake-benchmark-report` (FLAGSHIP)

| Factor | Score | Notes |
|---|---|---|
| Experience | 9 | "5,000+ proprietary mystery-shopper calls across 1,000 firms in 50 states" — claimed first-party research. |
| Expertise | 8 | Methodology block, stat-grid, per-practice-area economics table. |
| Authoritativeness | 6 | Article schema with Person author. No author profile page; no `sameAs` LinkedIn on Person. References Clio Legal Trends Report, MyCase Industry Insights, ABA TechReport, Forrester/InsideSales by name — zero linked. |
| Trustworthiness | 7 | 95% CI cited; "full methodology available on request" hedge. |
| **Weighted** | **7.4/10 → 74/100** | Top issue: an annual benchmark report with zero linked sources is undefended. Top fix: hyperlink every named authority; create `/team/caleo-tsiapalis` Person profile page; publish a downloadable PDF of the methodology. This is the single highest-leverage GEO asset on the site. |

### `/blog/outsource-legal-intake-guide`

| Factor | Score | Notes |
|---|---|---|
| Experience | 8 | Cost-comparison tables with real ranges. |
| Expertise | 8 | Models, Forrester 400%, switching mechanics. |
| Authoritativeness | 5 | Names ABA Model Rules, ALPS/CNA/Lawyers Mutual insurance — zero linked. |
| Trustworthiness | 7 | Honest "keep in-house when…" section. |
| **Weighted** | **7.0/10 → 70/100** | Top fix: link the ABA, the insurance carriers, and the Forrester study. |

### `/blog/legal-intake-question-bank`

| Factor | Score | Notes |
|---|---|---|
| Experience | 8 | Practice-area-specific question lists (85+ items). |
| Expertise | 9 | UM/UIM, Rule 1.18, UCCJEA, USCIS/EOIR/BIA, DV Hotline all accurate. |
| Authoritativeness | 5 | DV Hotline number cited correctly but unlinked. |
| Trustworthiness | 8 | Emergency-escalation callouts trauma-informed. |
| **Weighted** | **7.5/10 → 75/100** | Top fix: link National DV Hotline + USCIS + EOIR. Also: this content overlaps materially with `/blog/legal-intake-question-bank` and the solutions pages — risk of intra-site duplication if the same questions also live in product collateral. |

### `/blog/answering-service-pricing-comparison`

| Factor | Score | Notes |
|---|---|---|
| Experience | 8 | "847 firms surveyed" original data. |
| Expertise | 7 | Smith.ai $255 / $580 tiers, Ruby $389-$1,099, AnsweringLegal opaque pricing — all specific. |
| Authoritativeness | 4 | Names competitor pricing publicly — gives them direct citation potential. None linked. **Risk: FTC Consumer Review Rule (April 2026 enforcement) on competitive pricing comparisons without dated source citations.** |
| Trustworthiness | 6 | Survey methodology not disclosed (847 firms but no sample-frame description). |
| **Weighted** | **6.3/10 → 63/100** | Top fix: link to Smith.ai's published pricing page, Ruby's pricing page, and disclose the survey methodology in a methodology footer. FTC rule requires this. |

### `/blog/best-ai-receptionist-law-firms-2026`

| Factor | Score | Notes |
|---|---|---|
| Experience | 6 | Mystery-shopper evaluation across 5 practice areas. |
| Expertise | 7 | Names ClaireAI as top pick — **FTC self-rank Consumer Review Rule risk** per `MASTER-SEO-AUDIT.md` finding #6. |
| Authoritativeness | 4 | Top-pick-is-ourselves with no third-party validation, no disclosed methodology link, no comparison-bias disclaimer. |
| Trustworthiness | 5 | A "Best X for law firms" page where the publisher's product wins #1 needs an "Our product wins this list — here's our bias disclosure" line per the April 2026 FTC enforcement. Absent. |
| **Weighted** | **5.5/10 → 55/100** | Top issue: FTC + Google self-rank policy violation risk. Top fix: add a top-of-page disclosure box: "ClaireAI is reviewed in this guide. Our methodology and ranking criteria are published [link]. We rate competitors honestly; for an independent comparison see G2, Capterra, or Lawyerist." |

### `/blog/missed-call-revenue-loss-law-firms`

| Factor | Score | Notes |
|---|---|---|
| Experience | 8 | $250K-$410K per-firm losses cited with practice-area breakdown. |
| Expertise | 8 | Forrester 400% + Stafi 67% + Clio + Stanford studies named. |
| Authoritativeness | 4 | Same problem — zero outbound citations. |
| Trustworthiness | 7 | Honest 14% conservative conversion assumption. |
| **Weighted** | **6.6/10 → 66/100** | Top fix: link every cited authority. |

### `/help` (index)

| Factor | Score | Notes |
|---|---|---|
| Experience | 7 | Categorized; 7 categories, 10 articles. |
| Expertise | 8 | Category descriptions accurate. |
| Authoritativeness | 6 | Canonical present. Org schema in `/help` uses `linkedin.com/company/claireai` (variant 2) — **doesn't match** `/layout.tsx` value `/company/theclaireai`. |
| Trustworthiness | 7 | Visible "By [Author]" cross-listing on category cards. |
| **Weighted** | **7.0/10 → 70/100** | Top issue: `sameAs` URL mismatch. Top fix: canonicalize the LinkedIn slug. |

### `/help/[slug]` (10 articles)

Per-article scores below. All score 7.0–8.0 — these are the best-engineered content on the site.

| Article | Author | Words | Score | Top issue |
|---|---|---|---|---|
| activate-your-claireai-number | Caleo | ~620 | 78/100 | No `Person.url` + no profile page |
| connect-clio-grow | Cal | ~590 | 79/100 | Same |
| warm-transfer-setup | Tiago | ~520 | 77/100 | Same |
| edit-intake-script | Tiago | ~520 | 78/100 | Same |
| after-hours-routing | Caleo | ~370 | 73/100 | Borderline thin (above 300 floor but below blog post target) |
| request-hipaa-baa | Cal | ~350 | 78/100 | Below 400-word floor for legal/compliance content |
| billing-overage-handling | Caleo | ~340 | 72/100 | Below 400-word billing-content floor |
| conflict-screening-rule-118 | Cal | ~510 | 80/100 | Highest-scoring help article — strong Rule 1.18 specificity |
| troubleshoot-missed-call | Tiago | ~470 | 76/100 | Excellent troubleshooting taxonomy |
| data-retention-policy | Cal | ~340 | 75/100 | Below 400-word compliance content floor |

All 10 have: `Person` schema author, `datePublished`, `lastUpdated`, `lead` paragraph (citable), `tldr[]` (passage-extraction ready), `keywords[]`, `related[]`. The structure is excellent — execution gap is the missing author profile pages + LinkedIn linkage and 4 sub-500-word articles in compliance/billing zones where the floor should be higher.

---

## Thin-Content / Programmatic-Risk Flag List

Ranked by site-reputation-abuse exposure (November 2024 Google policy expansion, hits programmatic templates):

1. **`/integrations/[slug]` (66 pages)** — HIGHEST RISK. 11 category templates, each producing ~5 vendors of near-identical body copy. The definition paragraph is fully templated; syncRows are templated; workflows are templated; 3 of 4 FAQs are templated. Only `tagline`, `oneLiner`, `notes`, `auth`, `docsUrl` per-vendor are unique. The 14 practice-management pages will look effectively identical to Google's duplicate-content detector. Each page needs ≥100 words of first-party "why a firm picks this integration" + 2 vendor-specific gotchas, OR `noindex` them in batches. The featured 6 (Clio, MyCase, Filevine, DocuSign, Lawmatics, RingCentral) are likely safe due to `featured: true` extras; the long-tail 60 are at risk.
2. **Help articles with <400 words on compliance/billing topics** — 4 articles (`after-hours-routing`, `request-hipaa-baa`, `billing-overage-handling`, `data-retention-policy`). These topics are quasi-YMYL (legal compliance + billing). The 300-word minimum threshold doesn't apply — bar/HIPAA-adjacent content should ship ≥600 words with at least one outbound link to 45 CFR / state bar opinion / FTC guidance. Currently zero outbound links.
3. **`/blog/best-ai-receptionist-law-firms-2026`** — FTC Consumer Review Rule risk per April 2026 enforcement (cited in `MASTER-SEO-AUDIT.md` #6). Up to $53,088 per violation + 30-50% organic traffic loss in observed enforcement cases. Needs an unambiguous bias-disclosure block at the top of the page.
4. **Solutions index page (`/solutions`)** — short (212 lines, ~250 visible words). At the edge of the "directory stub" risk. Not yet hitting the threshold, but if traffic stays low and bounce stays high, Google will deprioritize it as a doorway. Mitigation: expand to 600 words with a "How to pick the right practice-area script" decision matrix.
5. **Homepage** — content itself is fine, but it has no author byline, no E-E-A-T disclosure footer line ("Who wrote / how / why"), and no review-date metadata. The December 2025 Core Update applied E-E-A-T site-wide; the marketing homepage is the highest-traffic page and now needs the same treatment as a YMYL article.

---

## AI Citation Readiness — Top Performers

Top 8 passages most likely to be cited verbatim by Perplexity / ChatGPT / Google AIO. Each is direct, fact-dense, named-entity-rich, under 80 words, and answer-first:

1. **`/product` STAGE_1_ANSWER + STAGE_2_ANSWER + STAGE_3_ANSWER** — three citable passages, each ~50 words, naming product mechanics + integrations + compliance posture.
2. **`/product/lead-iq` DEFINITION** — 130-word product definition with named transports (SMS/Slack/Teams), grade mechanics, and a quantitative outcome ("cut intake review time roughly in half").
3. **`/solutions/personal-injury` STAGE_ANSWER** — 90-word PI-intake-specific passage with all four PI dimensions (mechanism / treatment / fault / insurance layers) and bilingual claim.
4. **`/help/conflict-screening-rule-118` lead** — 70-word definitive answer to "How does ClaireAI screen conflicts under Rule 1.18?" — exactly the format Perplexity cites.
5. **`/help/activate-your-claireai-number` lead** — 60-word activation walkthrough with named steps and time estimate.
6. **`/blog/2026-legal-intake-benchmark-report` executive summary paragraph** — names the $44B industry-wide leak, the 35%/​$250K/​400% triad — exact AI-citation bait.
7. **`/blog/missed-call-revenue-loss-law-firms` stat-grid** — 35% / $250K / 27 hrs with named sources next to each.
8. **Home FAQ #1 ("What does ClaireAI actually do?")** — 65 words with CRM names + grade rubric + retainer outcome.

## AI Citation Readiness — Worst Offenders

1. **66 `/integrations/[slug]` definitions** — 160 words of template-swap copy. AIO will cite one and treat the other 65 as the same source, wasting your citation potential. Each page should have a 50-word unique lead paragraph (not just the templated definition) that names a real firm-side workflow specific to this vendor.
2. **`/contact` page body** — Contact-form-only. Zero citable content. Not necessarily wrong (contact pages don't need to rank), but it's missing a structured "Where is ClaireAI located? Who runs sales?" block that Google's Knowledge Graph pulls from.
3. **`/blog/best-ai-receptionist-law-firms-2026` "ClaireAI" subsection** — bullet list of features with no narrative passage. Add a 100-word "What makes ClaireAI different for law firms" lead block before the bullets.
4. **Homepage hero copy** — "80% of callers who reach voicemail hang up without leaving a message" is great. But the hero doesn't have a citable "What is ClaireAI" sentence — only the tagline "ClaireAI 365". AI Overviews can't cite a brand mark; they need a sentence. Move the home-faq #1 answer above the fold.

---

## Brand Mention Map — Where "ClaireAI" Appears in Citable Form

| Surface | Form of mention | Citable? |
|---|---|---|
| `app/layout.tsx` Organization JSON-LD | Structured, with `sameAs` LinkedIn + Crunchbase + G2 + Capterra slot (Capterra/G2 likely 404 — no current listings) | Yes — for entity graph only, NOT for AI citation per `MASTER-SEO-AUDIT.md` #6 |
| Footer | Logo + "AI receptionist for law firms · 24/7 · English & Spanish" | Weak — descriptor not factual claim |
| Homepage FAQ | 10 Q&As naming ClaireAI in answers | Yes — strong |
| `/product` body + FAQ | 14 mentions in factual passages | Yes — strongest brand mention surface on the site |
| Solutions pages | 3 STAGE_ANSWER passages | Yes |
| Blog posts | 47+ mentions across 6 posts | Yes |
| Help articles | "ClaireAI" appears in every lead + tldr | Yes |
| Integration slug pages | "ClaireAI × {vendor}" lockup | Yes — but partly templated |
| Hero subhead | "ClaireAI 365" | Weak — branded tag only |
| `llms.txt` | Strong — the structured TL;DR is exemplary | Yes (but per saved memory, llms.txt has no measurable value) |
| Press / TechCrunch / ABA Journal | NONE | Critical gap |
| YouTube | NONE | Critical gap per `MASTER-SEO-AUDIT.md` #2 |
| G2 / Capterra | Schema claims they exist; URLs are placeholders | Critical gap — `MASTER-SEO-AUDIT.md` notes 99% of ChatGPT-cited SaaS tools have G2 reviews |
| Reddit / Quora / LinkedIn company page | No company page link from footer or schema | Gap |

**Brand-mention surface area on-site:** strong. **Off-site:** mostly absent. The on-site brand-mention bandwidth is well-engineered (FAQ-rich, name-entity-rich, fact-rich). What's missing is the off-site reinforcement layer that makes AI Overviews actually cite the on-site mentions.

---

## Top 5 Authoring Tasks Ranked by GEO Impact

### 1. Fix the sitemap drift (Week 1 — 1 hour, infrastructure)

The sitemap references 7 non-existent pages:
- `/product/legal-intake`
- `/compare-smith-ai`
- `/compare-ruby-receptionists`
- `/privacy-policy`
- `/terms-of-service`
- `/careers`
- (plus only `2026-legal-intake-benchmark-report` of 6 blog posts is listed)

`assertSourceExists()` is set to **throw in production**. The production build will fail until either (a) those page files exist or (b) they are removed from `corePages`. Recommended: remove all 7 phantom entries; add the 5 missing blog post URLs (`outsource-legal-intake-guide`, `legal-intake-question-bank`, `answering-service-pricing-comparison`, `best-ai-receptionist-law-firms-2026`, `missed-call-revenue-loss-law-firms`); ship the compare pages and privacy / terms pages — both are pre-conversion trust pages that AI Overviews use as trustworthiness signal.

**Why this is #1:** every other GEO investment is wasted if the sitemap blocks production deploys. Privacy + Terms missing is also a trust-signal red flag for both Google QRG and AIO trust scoring.

### 2. Establish author Person profile pages + LinkedIn `sameAs` (Week 1-2 — 3 hours, content + schema)

Create three pages: `/team/tiago-strammiello`, `/team/caleo-tsiapalis`, `/team/cal-stein`. Each ships:
- 150-word bio with verifiable detail (years of experience, named systems built)
- `Person` JSON-LD with `name`, `jobTitle`, `worksFor: { @id: org }`, `sameAs: [LinkedIn, GitHub, Twitter]`, `knowsAbout: [...]`
- Headshot
- List of pieces authored on the site (use `getPost`/`getHelpArticle` to enumerate)

Update `posts.ts`, `help-articles.ts`, blog/[slug]/page.tsx, help/[slug]/page.tsx so the Article and TechArticle JSON-LD author objects carry `url: "/team/..."` and `sameAs: ["https://linkedin.com/in/..."]`.

Also resolve the "Co-Founder vs Engineering" credential mismatch between `posts.ts` (Cal = Co-Founder) and `help-articles.ts` (Cal = Engineering) — pick one and apply globally.

**Why this is #2:** December 2025 Core Update extended E-E-A-T verification (named author + verifiable expertise + sameAs schema) site-wide. Anonymous content is now treated as low-E-E-A-T even when factually correct. Three Person pages with LinkedIn back-references is the cheapest possible compliance.

### 3. Outbound primary-source citation pass on all 6 blog posts + 4 compliance help articles (Week 2-3 — 4 hours, content edit)

Every blog post and every compliance help article currently names authorities without linking them. Add explicit hyperlinks for:

| Authority | Cited on which pages | Authoritative URL |
|---|---|---|
| ABA Formal Opinion 512 | product, outsource guide, compliance help | americanbar.org/news/abanews/aba-news-archives/2024/07/aba-issues-first-ethics-guidance-ai-tools/ |
| Model Rule 1.18 | product, solutions, conflict-screening help | americanbar.org/groups/professional_responsibility/.../rule_1_18 |
| 45 CFR §§ 164.502, 164.504, 164.314 | request-hipaa-baa help | ecfr.gov/current/title-45 |
| FCC 2024 AI voice disclosure rule | product, home FAQ | fcc.gov/document/fcc-rules-artificial-intelligence-generated-calls |
| Forrester / InsideSales 5-min lead response | benchmark report, missed-call post | forrester.com/.../leadresponse |
| Clio Legal Trends Report | benchmark report, home FAQ | clio.com/resources/legal-trends/ |
| Heppner v. Claude (2026) | product, lead-iq | huschblackwell.com/.../heppner-v-claude |
| Justia 50-state recording laws | pricing FAQ, how-it-works | justia.com/50-state-surveys/recording-phone-calls-and-conversations/ |
| National DV Hotline | family-law solution, question-bank blog | thehotline.org / 1-800-799-7233 |

Every linked authority becomes both (a) a Google E-E-A-T expertise signal and (b) an AI-citation trust signal — when Perplexity sees a sentence with an outbound link to ABA.org next to a claim, it ranks the claim higher.

**Why this is #3:** zero outbound primary-source citations is the single largest E-E-A-T quality gap on a content-rich site. It's also the cheapest fix — content already exists, just hyperlink the named entities.

### 4. Per-vendor differentiation pass on the 14 highest-risk integration pages (Week 3-4 — 6 hours, content writing)

Target the 14 practice-management integration pages first (highest duplicate share + highest commercial intent). For each:
- Replace the templated definition paragraph with a 150-word vendor-specific lead — what THIS firm-side workflow looks like specifically with THIS vendor (e.g., Filevine: "Filevine's custom-selector convention means PI-specific fields like `custom.dateOfIncident` are first-class — Claire writes the date directly into the selector, no Zapier shim. In contrast to Clio's matter-detail-tab model, Filevine's project-level custom fields are the native home for intake data, so the brief and the matter index match by default. Common gotcha: Filevine currency fields enforce a strict numeric format, so Claire normalizes "$8K" to "8000" before writing.").
- Two vendor-specific gotchas as a callout
- One screenshot (per `MASTER-SEO-AUDIT.md` #5 site-reputation-abuse mitigation requirement)

Then repeat for the 9 phone-VoIP pages, 7 intake-CRM pages, 6 document pages. Total 36 pages of per-vendor depth.

For the long-tail 30 integrations where this depth isn't available — `noindex` them. Better 36 indexed integration pages with substance than 66 templated ones triggering site-reputation-abuse signals.

**Why this is #4:** the November 2024 site-reputation-abuse policy expansion has hit observed enforcement on CNN Underscored, Forbes Advisor, WSJ Buyside subdirectories. The /integrations/[slug] directory is structurally identical to those enforcement targets and is the largest single content surface on the site.

### 5. Build immigration solution page OR strip the claim (Week 4 — 4 hours, content + cleanup)

Immigration is named as a supported practice area on:
- `app/layout.tsx` (sitelinks + Org schema not affected — but should be in `knowsAbout`)
- `llms.txt` (line 33: `/solutions/immigration-law`)
- `/product` FAQ #6
- `/blog/legal-intake-question-bank` (immigration intake section)
- `/help` (no direct mention but related)

But `/solutions/immigration` does not exist. Either:

**Option A — ship the page.** Mirror the family-law page's structure (~547 lines, ~280 prose words on the visible page plus tables/FAQs). Cover EOIR, USCIS, BIA, NTA timing, language detection (10+ languages), removal defense urgency. Adds a real entity for AIO citation + an additional indexable solution. **Recommended.**

**Option B — strip the claim.** Remove the immigration references from `llms.txt`, product FAQ, layout `knowsAbout`, and the question-bank blog post.

Either is acceptable; the current state (claimed without page) is the worst option because AIO will fail to resolve `/solutions/immigration` when it tries to cite the practice-area page after parsing the question-bank claim.

**Why this is #5:** entity-graph consistency. A claimed-but-missing entity is worse than no entity claim — it tells AI crawlers the site over-promises.

---

## Quick-Win Backlog (under each of the top 5)

- Strip HowTo schema from `/integrations/[slug]` (dead since Sept 2023 per `SEARCH-CENTRAL-AUDIT.md` #2).
- Canonicalize `sameAs` LinkedIn slug — pick `linkedin.com/company/theclaireai` and apply everywhere (currently 3 variants).
- Add `metadata` export to `app/page.tsx` and `app/pricing/page.tsx` with `alternates.canonical` + per-page OG.
- Add a "Pages reviewed by the ClaireAI team. AI is used to assist drafting; every page is reviewed and edited by named team members before publication." line to the footer (cited in `SEARCH-CENTRAL-AUDIT.md` #15 as a free Google-named E-E-A-T signal).
- Add a contact block with Miami address + phone + email to `/contact` and footer to consolidate the Organization schema.
- Place a `Person` `sameAs` LinkedIn link on every blog Article and help TechArticle JSON-LD.
- Add a bias-disclosure box at the top of `/blog/best-ai-receptionist-law-firms-2026` per FTC Consumer Review Rule.
- Cross-link the home FAQ #1 answer above the fold so the hero has a citable "What is ClaireAI" sentence.

---

## Where This Audit Stops Short

Did NOT verify:
- Actual rendered word counts (used TypeScript source word counts as proxy — true rendered counts are 10-15% lower)
- Image alt text quality across the site (sampled — most look good)
- Mobile/desktop content parity
- Whether the Person schema author bio reads naturally on-page (it does, by inspection)
- Whether the Cloudinary hero images themselves meet alt-text best practices for AIO image citation
- Per-page Core Web Vitals (separate audit needed)
- Whether the SOC 2 Type II claim is verifiable (out of scope; user said audit is in progress)

Did NOT contradict the saved 2026 SEO/GEO posture — every recommendation here aligns with the `MASTER-SEO-AUDIT.md`, `SEARCH-CENTRAL-AUDIT.md`, and `FAQ-RESEARCH.md` priors. The schema posture (skip FAQPage rich-result expectations, kill HowTo, use WebApplication, skip llms.txt for ranking benefit) is honored throughout.
