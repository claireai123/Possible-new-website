# 21 — Content Quality, E-E-A-T & GEO (AI-Citation) Audit — ClaireAI

**Date:** 2026-06-23
**Auditor:** Content Quality specialist (Sept 2025 QRG framework + GEO/AI-citation lens)
**Method:** Exhaustive — every content page inspected. Source of truth = TypeScript data objects in `src/data/*` and page templates in `src/app/**`; rendered text verified against built `out/**` HTML/RSC payloads and word-counted from `out/**/*.txt`.

## Pages inspected: 102

| Surface | Count | How inspected |
|---|---|---|
| Blog posts | 8 | Full body text read from `src/data/posts.ts` (2,068 lines) |
| Help articles | 10 | Full body text read from `src/data/help-articles.ts` (841 lines) |
| Integration detail pages | 66 | Template (`src/app/integrations/[slug]/page.tsx`) + data (`src/data/integrations.ts`) + 8-gram duplication analysis on built output |
| Solutions (3 practice + 1 index) | 4 | PI page read in full; CR/FA STAGE_ANSWER + FAQ verified; index read in full |
| Product + Lead IQ | 2 | STAGE answers + FAQ counts verified from source |
| Pricing (+ FaqSection) | 1 | Source + 20-item FAQ component read |
| How-it-works | 1 | Answer-first + 27 FAQ verified |
| Index hubs (blog, help, integrations) | 3 | Source read |
| Careers | 1 | Full source read |
| Contact | 1 | Full source read |
| Team `/team/[slug]` | 2 | Full template + `src/data/team.ts` read |
| Homepage | 1 | RSC payload + section content read |
| **Total content pages** | **102** | (excludes privacy-policy, terms-of-service, 404 — legal/utility, scanned only) |

> The prior audit (`seo-deep-dive/04-content-eeat-geo-audit.md`) stated "blog (6 posts)." The blog has since grown to **8 posts** — the two May 28 additions (`claude-for-legal-personal-injury-2026`, `open-source-legal-intake-software-2026`) are the strongest assets on the entire site and were not in the prior scope.

---

## Per-page scored table

**Scoring:** AI-citation-readiness (0–100) weights answer-first structure, passage-level quotability, factual density, freshness, internal linking, and buyer-intent coverage. E-E-A-T scored A–F. WC = rendered visible word count.

### Blog (8 posts)

| Page | WC | AI-Cite | E-E-A-T | Notes |
|---|---|---|---|---|
| `/blog/claude-for-legal-personal-injury-2026` | 5,862 | **96** | A | Best asset on the site. First-hand ("I read all 565 files"), 30+ outbound primary-source links (GitHub, ABA 512, Fla. 24-1, Va. LEO 1901, NYC 2025-6), grep-table of zero-hit PI terms = uniquely quotable. Editorial disclosure present. Verifiable. Author = "Tiago Strammiello" (name-mismatch flaw, see systemic). |
| `/blog/open-source-legal-intake-software-2026` | 4,683 | **95** | A | Definitive "no production-grade OSS legal intake exists" answer-first claim. Sourced repo stars, ABA 512 pull-quote w/ page cite, Oregon 2026-208, honest economics table. Highly citable for "open source legal intake" cluster. |
| `/blog/2026-legal-intake-benchmark-report` | 2,439 | **92** | A− | Flagship original research (1,000 firms, stat-grid, methodology, "How to cite this report" block — engineered for citation). Weakness: self-cited stats ("VoiceCharm/CallJolt corroborated") are not externally verifiable; the $44B/35% figures are proprietary. |
| `/blog/legal-intake-question-bank` | 2,634 | **90** | A− | 85+ copy-paste questions by practice area = high passage-extractability. References dead slug `conflict-aware-intake-prevention`. |
| `/blog/outsource-legal-intake-guide` | 2,250 | **88** | A− | Strong cost tables, decision matrix, competitor links. References dead slug `switching-guide-legacy-to-claireai`. |
| `/blog/answering-service-pricing-comparison` | 2,003 | **87** | A− | Real Smith.ai/Ruby/AnsweringLegal price tables w/ outbound links = competitor-query magnet. Dead slug `switching-guide-legacy-to-claireai`. |
| `/blog/best-ai-receptionist-law-firms-2026` | 1,955 | **85** | B+ | FTC-compliant editorial disclosure (good). Self-ranked #1; competitor coverage thin vs the claude/OSS posts. Dead slug `switching-guide-legacy-to-claireai`. |
| `/blog/missed-call-revenue-loss-law-firms` | 1,937 | **84** | B+ | Strong stat-grid + per-call cost math. Heavy reuse of benchmark figures; author "Caleo Tsiapalis" = phantom (see systemic). |

### Help center (10 articles) — all by Tiago/Caleo/Cal

| Page | WC | AI-Cite | E-E-A-T | Notes |
|---|---|---|---|---|
| `/help/conflict-screening-rule-118` | 1,491 | **89** | A− | Definitive Rule 1.18 lead sentence; 0.85 threshold detail; verbatim decline script = quotable. |
| `/help/activate-your-claireai-number` | 1,728 | **87** | B+ | Lead = perfect AI-Overview answer. Carrier `*72`/`*73` codes = concrete. |
| `/help/connect-clio-grow` | 1,722 | **86** | B+ | OAuth steps, 2–4s sync latency, outage behavior — concrete. By Cal Stein. |
| `/help/data-retention-policy` | 1,303 | **86** | A− | 90-day/AES-256/TLS 1.3 specifics; citable for "ClaireAI data retention". |
| `/help/request-hipaa-baa` | 1,315 | **85** | A− | Cites 45 CFR sections, subprocessor list. Strong Trust signal. |
| `/help/warm-transfer-setup` | 1,641 | **84** | B+ | Warm-vs-cold definition quotable; 5-destination chain. |
| `/help/edit-intake-script` | 1,582 | **83** | B+ | Skip-logic + sub-practice templates; concrete. |
| `/help/troubleshoot-missed-call` | 1,423 | **82** | B+ | "99% trace to forwarding" lead = quotable diagnostic. |
| `/help/after-hours-routing` | 1,302 | **81** | B | Solid; no FAQ block (others have FAQ). |
| `/help/billing-overage-handling` | 1,202 | **80** | B | Defers price to pricing page (good — avoids stale prices). No FAQ. |

> **Systemic help-center flaw:** ZERO internal links from any help article to `/solutions`, `/product`, `/pricing`, or blog posts (`href:"/..."` count = 0 across the file). Help center is an SEO island — strong content with no equity flow to money pages.

### Solutions

| Page | WC | AI-Cite | E-E-A-T | Notes |
|---|---|---|---|---|
| `/solutions/personal-injury` | 2,654 | **93** | A | STAGE_ANSWER answer-first block; 10 PI-specific FAQs (UIM/UM, SOL triage, mass-tort concurrency); sourced metric ticker; WebApplication schema. |
| `/solutions/criminal-defense` | 2,849 | **92** | A | Jail collect-call + arraignment-deadline FAQs; unique STAGE_ANSWER. |
| `/solutions/family-law` | 2,748 | **92** | A | DV-escalation + paramour-conflict FAQs; empathetic-pacing angle. |
| `/solutions` (index) | 865 | **62** | B | Thin hub — 3 cards, no answer-first "what practice areas does ClaireAI serve" passage, no FAQ. Citation opportunity missed. |

### Product / conversion pages

| Page | WC | AI-Cite | E-E-A-T | Notes |
|---|---|---|---|---|
| `/product` | 4,388 | **94** | A | 3-stage answer-first blocks + 23 FAQs. "Citable passage farm" (prior audit's term, accurate). |
| `/product/lead-iq` | 4,050 | **91** | A | 20 FAQs; A–D grading explained concretely. Uses 35% stat (conflicts w/ solutions' 60% — see systemic). |
| `/how-it-works` | 3,531 | **90** | A | 0.8s answer-first; 27 FAQs; WebPage schema; dated 2026-05-12. |
| `/pricing` | 1,475 | **83** | B+ | Correct live prices ($450/$850/$1,800); 20 buyer-intent FAQs in `FaqSection`. No FAQPage/Offer issues. Note: FAQ rich result deprecated May 2026 — FAQ still valuable for AI extraction. |
| `/` (homepage) | 2,478 | **85** | A− | Citable stat ("80% of voicemail callers hang up"), security grid, per-practice cards, 8-item FAQ, full Organization/WebApplication graph. |

### Index hubs & low-priority pages

| Page | WC | AI-Cite | E-E-A-T | Notes |
|---|---|---|---|---|
| `/integrations` (index) | 4,698 | **70** | B | 66-tile directory + 13 FAQs. No answer-first "how many integrations / what does ClaireAI integrate with" citable block. |
| `/blog` (index) | 1,373 | **68** | B | Blog + BlogPosting schema; clean hub. |
| `/help` (index) | 6,544 | **66** | B | 7-category hub w/ client search index. Functional, not a citation target. |
| `/careers` | 716 | **48** | C | Appropriately thin (4 job listings). **No JobPosting schema** — misses "is ClaireAI hiring" AI answers + Google Jobs. |
| `/contact` | 632 | **42** | C− | Form only. **No phone, no address in visible content** (org schema has both). Weakest Trust page. Uses `hello@` (4th distinct email). |
| `/team/tiago-stram` | 762 | **55** | C+ | Person schema + knowsAbout, but **`sameAs:[]` empty** — no LinkedIn/X verification. Name = "Tiago Stram" ≠ blog byline "Tiago Strammiello". |
| `/team/cal-stein` | 695 | **55** | C+ | Same: empty `sameAs`. Title drift (CTO / Co-Founder / Engineering across surfaces). |

### Integration detail pages (66) — category-templated

All 66 score in a tight band because they share one of 11 category templates. Representative scores:

| Page (category) | WC | AI-Cite | Notes |
|---|---|---|---|
| `/integrations/clio` (PM, featured) | 2,592 | **74** | Featured = +4 extra FAQs + vendor `oneLiner`/`tagline`. Strongest of the set. |
| `/integrations/filevine`, `litify`, `casepeer`, `smartadvocate`, `mycase` (PM, featured) | 2,470–2,518 | **72–74** | Custom `oneLiner` adds genuine differentiation. |
| `/integrations/docusign` ↔ `/integrations/adobe-sign` (payments) | ~1,990 | **58** | **87.3% 8-gram overlap** — near-identical except vendor name. |
| `/integrations/calendly` ↔ `/integrations/acuity` (calendar) | ~2,035 | **58** | **86.1% overlap.** |
| `/integrations/slack` ↔ `/integrations/n8n` (workflow) | ~2,025 | **57** | **86.8% overlap.** |
| Non-featured PM (e.g. `caret-legal`, `neos`, `rocket-matter`) | 2,470–2,577 | **60** | No `oneLiner` override → 81%+ overlap with siblings. |

> **Measured intra-category duplication (raw 8-gram overlap, vendor name NOT normalized):** clio↔mycase 81.2%, docusign↔adobe-sign 87.3%, calendly↔acuity 86.1%, slack↔n8n 86.8%. Cross-category is lower (clio↔lawpay 70.4%), confirming the 11 templates do differentiate by category but NOT within category. This is the primary scaled-content / site-reputation-abuse exposure (see SEO posture memo 2026-05-18: programmatic pages now in scope).

---

## SYSTEMIC ISSUES (ranked by AI-citation/E-E-A-T impact)

### S1 — Author entity graph is broken (highest E-E-A-T impact)
- **Three names for one founder:** "Tiago Strammiello" (6 blog/help bylines) vs "Tiago Stram" (team page slug `tiago-stram` + Organization `founders` schema). An AI engine cannot resolve the author to the founder.
- **Phantom co-founder:** "Caleo Tsiapalis" authors 3 posts (incl. the flagship benchmark + missed-call) with credential **"Co-Founder, ClaireAI"** — but the Organization schema lists only **2 founders** (Tiago Stram, Cal Stein) and **there is no `/team/caleo-tsiapalis` page**. A claimed co-founder with no author page and no founder-schema entry is a verifiability contradiction.
- **Title drift for Cal Stein:** "Co-Founder, ClaireAI" (posts) / "Engineering, ClaireAI" (help) / "Co-founder & CTO" (team page). Three titles.
- **Blog Article schema author is a bare inline Person** (`name` + `description` only) — no `@id` linking to `/team/[slug]#person`, no `url`, no `sameAs`. The byline is plain text, not a link to the team page. Author authority is completely disconnected from the entity graph.
- **Both team pages have `sameAs: []`** (intentionally, per code comment, until personal LinkedIn/X verified). Zero external real-person verification — the single weakest Authoritativeness signal for a legal-adjacent SaaS.

### S2 — Conflicting headline statistic across the site
- "**60%** of inbound legal calls go unanswered" (sourced to Clio Legal Trends) appears on `/solutions/personal-injury`, `/solutions/family-law`, `/how-it-works`.
- "**35% / 35.4%**" (ClaireAI's own benchmark) appears in `/blog/2026-legal-intake-benchmark-report` and `/product/lead-iq`.
- Same metric ("% of calls unanswered"), two numbers, two sources. An AI engine citing ClaireAI would surface contradictory facts. Pick one (recommend the 35% benchmark figure since it's ClaireAI's defensible original research) and reconcile.

### S3 — Stale pricing in `llms.txt` (confirmed known issue, no other instances)
- `out/llms.txt` still states **$650 / $1,299 / $2,999** for Starter/Growth/Enterprise.
- Every live surface (pricing page, all schema, integration templates, solutions FAQs, product page) correctly uses **$450 / $850 / $1,800**. The `$650`/`$1,500` hits found elsewhere are all legitimate (competitor ranges, "$195–$650 band", Casetext's $650M acquisition, human-service "$250–$1,500" ranges) — NOT stale ClaireAI prices.
- **Fix is isolated to `llms.txt`.** (Caveat per SEO posture memo: skip llms.txt as a strategy — but a *wrong* price file is worse than none. Either delete it or correct it.)

### S4 — Programmatic integration duplication (scaled-content risk)
- 81–87% intra-category 8-gram overlap across 66 pages (S4 measured above). Featured pages with custom `oneLiner` are safe; the ~60 non-featured pages are the exposure. Remediation: give each integration 2–3 sentences of genuinely vendor-specific content (real field mappings, a named-customer use case, vendor-specific gotchas) — the way `filevine`/`casepeer` already do via `oneLiner`.

### S5 — Internal-linking gaps
- Help articles: **0 links** to solutions/product/pricing/blog (island).
- 2 **dead `related` slugs** referenced but never defined: `conflict-aware-intake-prevention`, `switching-guide-legacy-to-claireai` (these double as a leaked content roadmap — see blog ideas below).
- Solutions index + integrations index lack answer-first citable blocks.

### S6 — Trust/NAP fragmentation (lower impact)
- **4 distinct contact emails**: `hello@` (contact page), `info@` (privacy/terms), `support@` + `legal@` (help). No single canonical.
- Contact page exposes no phone/address despite org schema carrying Miami, FL + +1-561-250-5789. Add visible NAP to the contact page (strongest, cheapest Trust win).
- Careers has no JobPosting schema.

---

## The 2 highest-opportunity NEW blog posts (content-gap analysis)

The dead `related` slugs reveal the team already intended these two — and the gap analysis confirms they are the two highest-value AI-citable targets not yet covered.

### Blog idea #1 — "Conflict-of-interest screening for AI legal intake: Rule 1.18, 1.7, and 1.10 in practice"
- **Target query cluster:** "AI intake conflict check," "Rule 1.18 prospective client AI," "conflict screening law firm intake," "imputed conflict AI receptionist," "does an AI receptionist create a conflict of interest," "prospective client confidentiality chatbot."
- **Why it's AI-citable for legal-intake queries:** This is the #1 partner objection to AI intake and currently has NO authoritative answer-first resource on the web. ClaireAI can own it the way it already owns "open source legal intake" and "claude for legal PI." It's a YMYL ethics topic where Google/Perplexity actively prefer sources that cite primary authority — and ClaireAI already cites ABA Model Rules 1.6/1.18, Fla. 24-1, Oregon 2026-208 in existing posts. Pull-quote the rules verbatim with page cites (the proven pattern from the OSS/claude posts), add a "when does Rule 1.18 attach in an AI conversation" decision table, and a "how AI avoids imputed disqualification under 1.10" section. Fills the existing dead slug `conflict-aware-intake-prevention`.
- **Interlinks with:** `/help/conflict-screening-rule-118` (the how-to companion), `/blog/legal-intake-question-bank` (fixes its dead `related` ref), `/solutions/criminal-defense` + `/solutions/family-law` (highest conflict-matrix practices), `/blog/open-source-legal-intake-software-2026` (already discusses 1.18 attachment).

### Blog idea #2 — "Switching from a human answering service (Smith.ai / Ruby / AnsweringLegal) to AI intake: the 14-day migration guide"
- **Target query cluster:** "switch from Smith.ai," "Ruby alternative law firm," "AnsweringLegal alternative," "replace answering service with AI," "Smith.ai vs AI receptionist switching," "how to migrate legal answering service," "cancel Ruby receptionists."
- **Why it's AI-citable for legal-intake queries:** Bottom-of-funnel, high-commercial-intent, competitor-name queries that AI engines answer with comparison/migration content. ClaireAI's `answering-service-pricing-comparison` post already ranks for the adjacent pricing queries and links to this (currently-dead) slug twice. A concrete day-by-day migration runbook (port-vs-forward, CRM remap, parallel-run week, cancellation timing) is exactly the structured, step-numbered content models extract. Fills the dead slug `switching-guide-legacy-to-claireai`.
- **Interlinks with:** `/blog/answering-service-pricing-comparison` (fixes 2 dead `related` refs), `/blog/best-ai-receptionist-law-firms-2026` (fixes its dead ref), `/help/activate-your-claireai-number` + `/help/troubleshoot-missed-call` (the migration mechanics — and gives the help center its first inbound links), `/pricing`.

---

## Prioritized fix list

| # | Fix | Effort | Impact |
|---|---|---|---|
| 1 | **Reconcile author identity:** pick "Tiago Stram" everywhere (or Strammiello everywhere); add a `/team/caleo-tsiapalis` page + add Caleo to Organization `founders` (or downgrade his credential from "Co-Founder"); standardize Cal Stein's title. | M | Critical E-E-A-T |
| 2 | **Wire blog/help Article author → Person `@id`** at `/team/[slug]#person`; make the byline a link to the team page. | S | Critical E-E-A-T |
| 3 | **Add real `sameAs`** (LinkedIn/X) to both founders; add founder photos. | S | High (Authoritativeness) |
| 4 | **Fix the 60% vs 35% stat conflict** — single number, single source, sitewide. | S | High (citation integrity) |
| 5 | **Correct or delete `llms.txt`** prices ($650/$1,299/$2,999 → $450/$850/$1,800). | XS | High (factual accuracy) |
| 6 | **Write blog #1 (conflict screening)** — fills dead slug + owns the top partner objection. | L | High (new citations) |
| 7 | **Write blog #2 (switching guide)** — fills 3 dead `related` refs + competitor-query capture. | L | High (commercial-intent) |
| 8 | **De-duplicate ~60 non-featured integration pages** — add 2–3 vendor-specific sentences each (real field mappings / named use case). | L | Medium (scaled-content risk) |
| 9 | **Add help-center internal links** to /solutions, /product, /pricing, relevant blog posts. | M | Medium (link equity) |
| 10 | **Add visible NAP to /contact** (phone + Miami address) + consolidate to one canonical email. | S | Medium (Trust) |
| 11 | **Add answer-first citable blocks** to /solutions and /integrations index ("how many integrations," "what practice areas"). | S | Medium (GEO) |
| 12 | **Add JobPosting schema** to /careers. | S | Low |
