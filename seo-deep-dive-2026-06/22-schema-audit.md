# ClaireAI Structured-Data (JSON-LD) Audit — 2026-06-22

**Scope:** Every built HTML page in `out/`. **Pages inspected: 104 (100% of the build).**
**Method:** Extracted every `<script type="application/ld+json">` block from each file, JSON-parsed it, walked the entity graph, and validated each `@type` against schema.org + Google's current (mid-2026) structured-data docs.

## Headline result

- **All 104 pages ship valid, parseable JSON-LD.** Zero parse errors. Zero `http://` contexts. Zero relative URLs. Zero placeholder text. No fabricated `AggregateRating`/`Review`.
- **No deprecated / zero-value types** (`FAQPage`, `HowTo`, `Service`, `SpecialAnnouncement`, `Question`/`Answer`) are shipping — confirmed against the build. Prior posture verified: those are correctly absent.
- Correct SaaS modeling: the product is `WebApplication`/`SoftwareApplication`, **not** `Service` (right call — `Service` yields zero rich result and weaker entity signal).
- **The blocking problems are structural, not type-selection:** (1) the site-wide base graph hardcodes the *homepage* `WebPage`/`WebApplication` onto all 104 pages, and (2) author identity is fragmented across three name variants with no `@id` linkage. Both directly undercut the "keep JSON-LD for AI/semantic grounding" goal, because they feed contradictory entity facts to the parser.

## 2026 rich-result reality (the lens for all recommendations)

Most types here produce **no classic rich result** anymore (Article/BlogPosting lost the dedicated card; WebApplication/SoftwareApplication never had a general one; FAQ rich result is dead; HowTo dead since Sept 2023). **BreadcrumbList** and **product/Offer pricing** are among the few still rendering. We keep everything else **for AI/LLM semantic grounding and entity consolidation**, not for stars-and-snippets. That reframes every fix below as "make the entity graph internally consistent and correctly attributed," not "chase a SERP feature."

---

## Per-page summary table

Legend: `[graph: …]` = the shared site-wide base block (one `@graph` with Organization + WebSite + WebPage + WebApplication). All blocks below parse as valid JSON.

| Page (under `out/`) | #blocks | Types present |
|---|---|---|
| `404.html` | 1 | [graph: Organization, WebSite, WebPage, WebApplication] |
| `_not-found.html` | 1 | [graph: Organization, WebSite, WebPage, WebApplication] |
| `blog.html` | 2 | [graph …] / Blog (+ 8 BlogPosting) |
| `blog/2026-legal-intake-benchmark-report.html` | 2 | [graph …] / Article |
| `blog/answering-service-pricing-comparison.html` | 2 | [graph …] / Article |
| `blog/best-ai-receptionist-law-firms-2026.html` | 2 | [graph …] / Article |
| `blog/claude-for-legal-personal-injury-2026.html` | 2 | [graph …] / Article |
| `blog/legal-intake-question-bank.html` | 2 | [graph …] / Article |
| `blog/missed-call-revenue-loss-law-firms.html` | 2 | [graph …] / Article |
| `blog/open-source-legal-intake-software-2026.html` | 2 | [graph …] / Article |
| `blog/outsource-legal-intake-guide.html` | 2 | [graph …] / Article |
| `careers.html` | 2 | [graph …] / BreadcrumbList |
| `contact.html` | 1 | [graph …] |
| `help.html` | 4 | [graph …] / CollectionPage / BreadcrumbList / Organization (dup) |
| `help/*` (10 pages) | 4 each | [graph …] / TechArticle / BreadcrumbList / Organization (dup) |
| `how-it-works.html` | 3 | [graph …] / TechArticle / WebApplication |
| `index.html` | 1 | [graph: Organization, WebSite, WebPage, WebApplication] |
| `integrations.html` | 2 | [graph …] / ItemList (95 ListItems) |
| `integrations/*` (89 pages) | 4 each | [graph …] / SoftwareApplication / BreadcrumbList / TechArticle |
| `pricing.html` | 3 | [graph …] / WebApplication (AggregateOffer, 3 Offers) / BreadcrumbList |
| `privacy-policy.html` | 1 | [graph …] |
| `product.html` | 4 | [graph …] / WebApplication / TechArticle / BreadcrumbList |
| `product/lead-iq.html` | 4 | [graph …] / WebApplication / TechArticle / BreadcrumbList |
| `solutions.html` | 3 | [graph …] / CollectionPage / BreadcrumbList |
| `solutions/criminal-defense.html` | 4 | [graph …] / BreadcrumbList / WebApplication / WebPage |
| `solutions/family-law.html` | 4 | [graph …] / BreadcrumbList / WebApplication / WebPage |
| `solutions/personal-injury.html` | 4 | [graph …] / BreadcrumbList / WebApplication / WebPage |
| `team/cal-stein.html` | 3 | [graph …] / Person / BreadcrumbList |
| `team/tiago-stram.html` | 3 | [graph …] / Person / BreadcrumbList |
| `terms-of-service.html` | 1 | [graph …] |

(The `help/*` and `integrations/*` rows are collapsed — every page in each group is byte-identical in structure; per-page content differs but the block layout and the issues are uniform across all of them.)

Global node histogram (all nested nodes, 104 pages): Person 436, Organization 422, PostalAddress 416, ContactPoint 416, ListItem 345, WebApplication 215, AggregateOffer 214, WebPage 212, WebSite 208, SoftwareApplication 132, TechArticle 89, BreadcrumbList 87, Thing 71, Offer 70, UnitPriceSpecification 68, SpeakableSpecification 10, BlogPosting 8, Article 8, ItemList 3, CollectionPage 2, Blog 1.

---

## Validation findings — issues by severity

### CRITICAL — affects all 104 pages

**C1. The base-graph `WebPage` and `WebApplication` are hardcoded to the homepage on every page.**
Across all 104 pages the base block emits an identical:
```json
{ "@type": "WebPage", "@id": "https://theclaireai.com/#webpage",
  "url": "https://theclaireai.com", "name": "ClaireAI — AI Legal Receptionist", ... }
```
and `{ "@type": "WebApplication", "@id": "https://theclaireai.com/#webapp", "url": "https://theclaireai.com", ... }`.
Distinct base-graph WebPage tuples across all 104 pages = **1**. So `/pricing`, `/blog/…`, `/integrations/clio`, `/team/cal-stein`, etc. each tell the parser "this page is the homepage, located at the root URL." This is the single most damaging signal in the build: every page-specific entity (Article, SoftwareApplication, Person) sits *next to* a `WebPage` that claims to be a different URL, so the page-level entity binding (`isPartOf` / `mainEntityOfPage` / "what page am I on") is wrong everywhere except `index.html`.
**Fix:** template the base `WebPage` per route — unique `@id` (`{url}#webpage`), `url`, `name`, `description`, plus `isPartOf → #website`, `breadcrumb → {url}#breadcrumb`, and `primaryImageOfPage`. The base `WebApplication` (the product entity) should stay homepage-scoped but should be promoted to a stable product `@id` reused everywhere (see C2) rather than re-emitted as a page entity on every route.

**C2. `WebApplication` product entity is duplicated with conflicting scope.**
The product is described as `WebApplication` in the base graph (`#webapp`, homepage URL, AggregateOffer 450–1800) AND again as standalone `WebApplication` blocks on `/product`, `/product/lead-iq`, `/how-it-works`, `/pricing`, and all three `/solutions/*` — each with a different `name`, `url`, `offers`, and (mostly) **no `@id`**. There are 215 `WebApplication` nodes total for one product. Without shared `@id`s these read as many different products.
**Fix:** Define ONE canonical product node `https://theclaireai.com/#product` (type `SoftwareApplication`) in the base graph; on sub-pages reference it by `@id` and add only the page-specific `WebApplication` variant as an `isVariantOf`/`isPartOf` child, or drop the per-page WebApplication and use a `WebPage` that `about`s the product `@id`.

### HIGH

**H1. Author identity is fragmented across three names, none linked by `@id`.**
- Org `founders`: **"Tiago Stram"**, **"Cal Stein"**.
- Team Person entities: **"Tiago Stram"** (`/team/tiago-stram#person`), **"Cal Stein"** (`/team/cal-stein#person`) — these are good (have `@id`, `url`, `jobTitle`, `worksFor → #organization`).
- Blog `Article.author`: **"Tiago Strammiello"**, **"Cal Stein"**, **"Caleo Tsiapalis"**.
- Help `TechArticle.author`: **"Caleo Tsiapalis"**, **"Cal Stein"**, **"Tiago Strammiello"**.
All 18 blog/help authors are **inline `Person` objects with `@id: null`** — never referencing the existing `/team/*#person` entities, and the names don't even match ("Caleo Tsiapalis" and "Tiago Strammiello" are not the team Persons "Cal Stein" / "Tiago Stram"). For E-E-A-T and AI author grounding this is the highest-value content fix: pick one canonical name per human and link every authored piece to the team Person `@id`.

**H2. `blog.html` BlogPosting dates are not ISO 8601.**
The `Blog.blogPost[]` summaries on `blog.html` use `"datePublished": "Feb 14, 2026"`, `"May 28, 2026"`, `"Jan 28, 2026"`, etc. — human-format, **not** ISO 8601. (The individual blog post pages use correct ISO dates like `2026-02-14`, so this is isolated to the blog-index Blog block.) Convert to `YYYY-MM-DD`. Also add `dateModified`, `author` (`@id` ref), and `image` to each `blogPost[]` entry, or better, reference each post by `@id` to its full Article node.

**H3. Conflicting duplicate `Organization` with the same `@id` on all 11 help pages.**
`help.html` and all 10 `help/*` pages emit a 3rd block re-declaring:
```json
{ "@type": "Organization", "@id": "https://theclaireai.com/#organization",
  "sameAs": ["https://www.linkedin.com/company/theclaireai", "https://x.com/claireai"] }
```
Same `@id` as the canonical Organization, but a **different, shorter `sameAs`** — and it introduces `https://x.com/claireai`, which is absent from the canonical Organization's `sameAs` (LinkedIn, Crunchbase, G2, Capterra). Two definitions of the same `@id` with divergent properties fragment the entity. **Fix:** delete the help-page Organization stub and reconcile `sameAs` — decide whether the X/Twitter handle belongs in the one canonical Organization (if the account is real, add it there; if not, drop it).

### MEDIUM

**M1. Integration pages carry both `SoftwareApplication` and `TechArticle` for identical content.** Both blocks repeat the full marketing description verbatim, neither is in the `@graph`, and neither references the page's `WebPage`/`BreadcrumbList`. The `TechArticle` is really marketing copy (not a how-to/technical doc) — its semantic value is low and it duplicates the SoftwareApplication. Keep the `SoftwareApplication` (the correct entity for an integration), drop or slim the `TechArticle`, and bind the SoftwareApplication to the page via `@id` + `mainEntityOfPage`.

**M2. Inline Organization re-declarations with a non-canonical logo.** Integration `provider`/`author`/`publisher` re-embed the Organization inline (with `@id: #organization`) but use a *colorized* logo URL variant that differs from the canonical Organization `logo`. Reference `{ "@id": "https://theclaireai.com/#organization" }` only; don't re-state divergent properties.

**M3. `careers.html` has no `JobPosting`.** If roles are open, each should be a `JobPosting` (one of the few types with a live rich result via Google Jobs). Currently only base graph + BreadcrumbList.

**M4. `contact.html` has no page-level contact entity.** Contact data lives only in the base Org `contactPoint`. Consider a `ContactPage` `WebPage` subtype (low value, but cheap and consistent).

**M5. Team pages aren't wrapped as `ProfilePage`.** `Person` is correct and well-formed; wrapping the page `WebPage` as `ProfilePage` with `mainEntity → #person` improves person-entity grounding. Optional.

### LOW / BENIGN (no action required)

- `foundingDate: "2024"` site-wide — **valid** ISO 8601 (a bare year is a legal ISO 8601 value). Could be tightened to `2024-01` but not an error.
- Offers carry no `availability` / `priceValidUntil` — not required for SaaS without Google Merchant listings; harmless.
- `speakable` (SpeakableSpecification) on help TechArticles — fine, low-risk.

---

## Recommended additions / removals (ready-to-use JSON-LD)

### R1 — Canonical entity graph (replace the homepage-hardcoded base block; template per page)

Emit ONE `@graph` per page with **per-route** `WebPage` and a **shared** Organization / WebSite / product. Pseudo-fields in `{braces}` are templated per route.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://theclaireai.com/#organization",
      "name": "ClaireAI",
      "legalName": "ClaireAI, Inc.",
      "url": "https://theclaireai.com",
      "logo": "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1772837716/Claire_AI_White-removebg-preview.png",
      "sameAs": [
        "https://www.linkedin.com/company/theclaireai",
        "https://www.crunchbase.com/organization/claireai",
        "https://www.g2.com/products/claireai",
        "https://www.capterra.com/p/claireai"
      ],
      "contactPoint": [
        { "@type": "ContactPoint", "contactType": "sales", "telephone": "+1-561-250-5789", "availableLanguage": ["English","Spanish"], "url": "https://theclaireai.com/contact" }
      ],
      "founder": [
        { "@id": "https://theclaireai.com/team/tiago-stram#person" },
        { "@id": "https://theclaireai.com/team/cal-stein#person" }
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://theclaireai.com/#website",
      "url": "https://theclaireai.com",
      "name": "ClaireAI",
      "publisher": { "@id": "https://theclaireai.com/#organization" },
      "inLanguage": "en-US"
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://theclaireai.com/#product",
      "name": "ClaireAI 365",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "AI Receptionist for Law Firms",
      "operatingSystem": "Web, iOS, Android",
      "url": "https://theclaireai.com/product",
      "provider": { "@id": "https://theclaireai.com/#organization" },
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "450", "highPrice": "1800", "priceCurrency": "USD",
        "offerCount": 3, "url": "https://theclaireai.com/pricing"
      }
    },
    {
      "@type": "WebPage",
      "@id": "{url}#webpage",
      "url": "{url}",
      "name": "{pageTitle}",
      "description": "{metaDescription}",
      "isPartOf": { "@id": "https://theclaireai.com/#website" },
      "about": { "@id": "https://theclaireai.com/#product" },
      "breadcrumb": { "@id": "{url}#breadcrumb" },
      "primaryImageOfPage": "{ogImage}",
      "inLanguage": "en-US"
    }
  ]
}
```
Note: `founders` (plural, free text) on the current Org is replaced here by `founder` referencing the team Person `@id`s — this is the consolidation move that ties the humans together.

### R2 — Blog Article: link author to team Person `@id` (fixes H1)

Replace the inline `author` on every blog post with an `@id` reference, and (one-time) reconcile the human's canonical name. Example for `blog/best-ai-receptionist-law-firms-2026.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://theclaireai.com/blog/best-ai-receptionist-law-firms-2026#article",
  "isPartOf": { "@id": "https://theclaireai.com/blog/best-ai-receptionist-law-firms-2026#webpage" },
  "mainEntityOfPage": { "@id": "https://theclaireai.com/blog/best-ai-receptionist-law-firms-2026#webpage" },
  "headline": "Best AI receptionist for law firms in 2026",
  "image": ["https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1779302723/ChatGPT_Image_May_20_2026_at_02_45_06_PM.jpg"],
  "datePublished": "2026-01-22",
  "dateModified": "2026-05-19",
  "author": { "@id": "https://theclaireai.com/team/tiago-stram#person" },
  "publisher": { "@id": "https://theclaireai.com/#organization" },
  "articleSection": "Guide"
}
```
Apply the same `author → @id` pattern to all help `TechArticle`s. **Decision needed:** map "Tiago Strammiello" → `tiago-stram#person`, "Cal Stein"/"Caleo Tsiapalis" → which `@id`? "Caleo Tsiapalis" matches no team page — either create that Person/team page or retire the byline.

### R3 — `blog.html` Blog block: ISO dates + `@id` references (fixes H2)

```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://theclaireai.com/blog#blog",
  "url": "https://theclaireai.com/blog",
  "name": "ClaireAI Blog",
  "publisher": { "@id": "https://theclaireai.com/#organization" },
  "blogPost": [
    {
      "@type": "BlogPosting",
      "@id": "https://theclaireai.com/blog/2026-legal-intake-benchmark-report#article",
      "headline": "Measuring the impact of AI on 1,000 law firms",
      "url": "https://theclaireai.com/blog/2026-legal-intake-benchmark-report",
      "datePublished": "2026-02-14",
      "dateModified": "2026-05-19",
      "author": { "@id": "https://theclaireai.com/team/cal-stein#person" }
    }
  ]
}
```
(Replace every `"datePublished": "Feb 14, 2026"`-style value with `YYYY-MM-DD`.)

### R4 — `careers.html`: add `JobPosting` per open role (live rich result)

```json
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "{Role Title}",
  "description": "{HTML job description}",
  "datePosted": "2026-06-01",
  "validThrough": "2026-08-01",
  "employmentType": "FULL_TIME",
  "hiringOrganization": { "@id": "https://theclaireai.com/#organization" },
  "jobLocationType": "TELECOMMUTE",
  "applicantLocationRequirements": { "@type": "Country", "name": "United States" }
}
```
Only ship for roles that actually exist (Google penalizes stale/expired JobPostings).

### Removals

- **Delete** the duplicate `Organization` stub on all 11 help pages (H3) — keep one canonical Organization, reconcile `sameAs`.
- **Drop or slim** the `TechArticle` on the 89 integration pages (M1); keep `SoftwareApplication`.
- **Stop re-emitting** the homepage `WebPage`/`WebApplication` on non-home routes (C1/C2).

---

## What to keep doing (already correct)

- JSON-LD only; `https://schema.org`; absolute URLs; ISO dates (except H2); no FAQPage/HowTo/Service; no fake ratings.
- Proper SaaS type choice (`WebApplication`/`SoftwareApplication`).
- BreadcrumbList on all deep pages (87 nodes) — one of the few still-live rich results.
- Real `@id` graph for Organization ↔ WebSite and well-formed Person entities on team pages — extend this discipline to WebPage, the product, and authors.
