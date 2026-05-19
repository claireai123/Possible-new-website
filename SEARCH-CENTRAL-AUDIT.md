# Google Search Central Audit — ClaireAI Marketing Site

**Date:** 2026-05-18
**Method:** Three parallel research agents reading every page in Search Central docs (Fundamentals + AI, Crawling + Indexing + Structured Data, Appearance + Best Practices + 2024–2026 blog).
**Output:** Consolidated, prioritized action list — what to delete, what to add, what we're doing right.

---

## 🔴 CRITICAL — Ship This Week

These four changes are pure technical debt removal. Google has officially deprecated this schema and will drop tooling support in June 2026.

### 1. Delete every FAQPage JSON-LD block

**The fact:** Google announced on the FAQPage docs page: *"FAQ rich results are no longer appearing in Google Search. We will be dropping the FAQ search appearance, rich result report, and support in the Rich results test in June 2026."* Before May 7, 2026, eligibility was already restricted to "well-known, authoritative" health and government sites only.

**What we ship today:** `FAQPage` JSON-LD on homepage, /product, /product/lead-iq, /how-it-works, /pricing, /integrations, /integrations/[slug] — all 7 page types.

**What to do:**
- Remove every `faqSchema` constant + every `<script type="application/ld+json">` emitting it
- **Keep the visible FAQ content** — H3 questions + paragraph answers still help AI Overview citation
- The brief on every page becomes "natural Q&A passages" rather than typed FAQPage

**Source:** developers.google.com/search/docs/appearance/structured-data/faqpage

### 2. Delete every HowTo JSON-LD block

**The fact:** Deprecated **September 2023**. Google's docs: *"Removed the How-to structured data documentation, as this rich result is no longer shown in search results, on both desktop and mobile devices."*

**What we ship today:** `HowTo` JSON-LD on /product and /how-it-works.

**What to do:**
- Remove `howToSchema` constants + script tags
- Keep the step-by-step Stage 1/2/3 visible content
- Replace with `WebPage` typing if a schema container is needed

**Source:** developers.google.com/search/docs/appearance/structured-data/how-to

### 3. Replace generic Service schema with WebApplication

**The fact:** `Service` is **not in Google's structured data search gallery** — no rich result, no SERP visual treatment. SaaS sites should use `WebApplication` (subtype of `SoftwareApplication`), which IS rich-result-eligible.

**What we ship today:** `serviceSchema` on /product and /product/lead-iq.

**What to do — emit on /product, /product/lead-iq, /pricing:**

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
    {
      "@type": "Offer",
      "name": "Starter",
      "price": "650",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "650",
        "priceCurrency": "USD",
        "unitText": "MONTH"
      }
    }
  ],
  "provider": { "@id": "https://theclaireai.com/#organization" }
}
```

**Source:** developers.google.com/search/docs/appearance/structured-data/software-app

### 4. Don't ever add `WebSite.potentialAction.SearchAction`

**The fact:** Sitelinks searchbox feature was killed November 2024. The `nositelinkssearchbox` meta tag was archived.

**What we ship today:** We don't currently emit it (good). Don't add it later.

**Source:** developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox

---

## 🟠 HIGH IMPACT — Ship This Sprint

### 5. Add the AI-Overview-friendly meta robots tag site-wide

```html
<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1">
```

- `max-snippet:-1` → Google chooses the optimal snippet length (best for AI Overview citation surface)
- `max-image-preview:large` → eligible for image rich results
- `max-video-preview:-1` → covered for any future video content

Set this in `app/layout.tsx` via Next.js `metadata.robots`.

**Source:** developers.google.com/search/docs/crawling-indexing/robots-meta-tag

### 6. Rewrite robots.txt with explicit AI crawler allowlist

```
# Google
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Google-Extended
Allow: /

# Microsoft
User-agent: Bingbot
Allow: /

# OpenAI — search-time (ChatGPT citations)
User-agent: OAI-SearchBot
Allow: /

# OpenAI — training
User-agent: GPTBot
Allow: /

# Anthropic
User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Common Crawl (powers many LLMs)
User-agent: CCBot
Allow: /

# Catch-all: allow indexing, block ops paths
User-agent: *
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Disallow: /portal/
Allow: /

Sitemap: https://theclaireai.com/sitemap.xml
```

Reasoning: The product is sold on expertise positioning where AI Overview / ChatGPT / Perplexity citations are the top-of-funnel. Explicit allows tell each vendor we want their bot's traffic.

**Source:** developers.google.com/search/docs/crawling-indexing/overview-google-crawlers

### 7. Fix sitemap.ts — drop changefreq/priority, real per-URL lastmod

**The fact:** Google **ignores** `changefreq` and `priority` entirely. Worse: when `lastmod` is inaccurate (e.g., `new Date()` on every URL on every build), Google **stops trusting lastmod entirely**, which hurts crawl scheduling for our 60+ integration pages.

**What we ship today (src/app/sitemap.ts):**
```ts
{ url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
```

**What to ship:**
```ts
{ url: baseUrl, lastModified: getGitMtime("src/app/page.tsx") },
```

Implementation: use `execSync("git log -1 --format=%cI src/app/page.tsx")` at build time per file, or cache per-integration `updatedAt` in `INTEGRATIONS` data.

**Source:** developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

### 8. Add an image sitemap inline

For Cloudinary-hosted images (cross-domain), Google only reliably discovers them via image sitemap entries. Add `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` and per-URL `<image:image><image:loc>...</image:loc></image:image>`.

Especially load-bearing on /integrations/[slug] (vendor logos hosted on Cloudinary) and /product (Stage 1/2/3 screenshots).

**Source:** developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps

### 9. Audit /integrations/[slug] pages against scaled-content + site reputation abuse

**The fact:** November 19, 2024 Google **widened** the site reputation abuse policy — it now applies *even when the host site has editorial oversight* if the *purpose* of the page is to exploit host rankings. Programmatic templated pages are the textbook trigger.

**What's at risk:** 60+ /integrations/[slug] pages built from the same template with vendor name swapped.

**What each page MUST have to stay safe:**
- ≥ 300 words of integration-specific content (not "ClaireAI integrates with X" boilerplate)
- Real auth/setup steps unique to that vendor
- Specific field mappings (e.g., for Clio: "caller name → Contact.first_name + last_name")
- Different `<title>` and meta description formulas per page
- At least one unique paragraph of first-party voice (workflow value-prop, common gotcha, why a firm picks this integration)

**If any pages can't meet this bar:** `noindex` them. Better to have 15 indexed integration pages with substance than 60 thin templated ones.

**Source:** developers.google.com/search/blog/2024/11/site-reputation-abuse

### 10. Add Organization entity-disambiguation properties

Currently our Organization schema has `name`, `legalName`, `url`, `logo`, `sameAs`. Google explicitly uses these properties for entity graph + knowledge panel:

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
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "sales",
    "email": "hello@theclaireai.com",
    "areaServed": "US"
  },
  "sameAs": [
    "https://linkedin.com/company/theclaireai",
    "https://www.crunchbase.com/organization/claireai"
  ],
  "naics": "541512"
}
```

Place once in `app/layout.tsx`, reference via `@id` from every page (`provider`, `publisher`, etc.).

**Source:** developers.google.com/search/docs/appearance/structured-data/organization

### 11. Self-referential canonical on every page

Next.js App Router doesn't auto-emit `<link rel="canonical">`. Each `page.tsx` should export:

```ts
export const metadata = {
  alternates: { canonical: "https://theclaireai.com/<path>" },
  // ...
};
```

Especially critical on /integrations/[slug] to prevent Google picking a similar slug as canonical of another.

**Source:** developers.google.com/search/docs/crawling-indexing/canonicalization

---

## 🟡 MEDIUM IMPACT — Worth Doing

### 12. INP ≤ 200ms on homepage audio demo

INP replaced FID as a Core Web Vital on March 12, 2024. Threshold: ≤ 200ms = good, 200–500ms = needs improvement, > 500ms = poor.

The "Hear Claire" homepage audio button + waveform animation could spike INP. Mitigations:
- Defer Web Audio init until after click using `scheduler.yield()` or `requestIdleCallback`
- Use React 19 `useTransition` for waveform state updates
- Lazy-load audio file (don't preload)

**Source:** web.dev/articles/inp

### 13. Author bylines + Person schema (E-E-A-T gap)

Legal industry is YMYL-adjacent. Google's Quality Rater Guidelines explicitly weight named expert signals. We have zero bylines anywhere.

When we add bylines (e.g., on a future /blog or on /how-it-works):
- Use `Person` schema, not a string
- Include `url` (links to a profile page on our site) AND `sameAs` (LinkedIn)
- Example:
```json
{
  "author": {
    "@type": "Person",
    "name": "Jane Smith",
    "url": "https://theclaireai.com/team/jane-smith",
    "sameAs": ["https://linkedin.com/in/janesmith"]
  }
}
```

**Source:** developers.google.com/search/docs/appearance/structured-data/article

### 14. Original first-party data on every page

Google's Helpful Content System explicitly rewards "original information, reporting, research, or analysis." It also penalizes content that "could easily be produced by a generative AI model" (Google's exact phrase from the AI optimization guide).

We have actual production numbers — call volumes handled, average pickup latency, conversion lifts on real clients. Surface anonymized stats:

- "47,000 PI intake calls handled in Q1 2026 across 12 firms"
- "Average pickup: 0.7 seconds"
- "Sign-rate lift: median +11.4 points after 90 days"

This is "original research" by Google's definition AND prime AI-Overview citation bait (specific stats with attribution).

**Source:** developers.google.com/search/docs/fundamentals/creating-helpful-content

### 15. Add "Who/How/Why" transparency disclosure

Google's "Who created the content, How was it created, Why was it created" framework explicitly asks: *"Is the use of automation, including AI-generation, self-evident to visitors through disclosures or in other ways?"*

Add a one-liner in footer or About page:
> *"Pages reviewed by the ClaireAI team. AI is used to assist drafting; every page is reviewed and edited by named team members before publication."*

Cheap signal that closes a Google-named gap.

**Source:** developers.google.com/search/docs/fundamentals/using-gen-ai-content

### 16. Speakable schema for homepage audio (optional, beta, low ceiling)

Beta feature, US English only, plays on Google Home / Assistant. Modest upside but free to add:

```json
{
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".hero-tagline"]
  }
}
```

**Source:** developers.google.com/search/docs/appearance/structured-data/speakable

### 17. Don't create llms.txt

John Mueller (Google) publicly stated in June + July 2025: "No AI system currently uses llms.txt" and "using noindex for it could make sense." Compared by Google to the abandoned keywords meta tag.

Don't add one. If we ever did, `noindex` it.

**Source:** Mueller statements June/July 2025 (cited in Search Central guidance)

---

## ✅ THINGS WE'RE DOING RIGHT — Validation

- **JSON-LD as structured data format** (Google's preferred format)
- **Next.js 16 App Router with SSR** — clears the JavaScript SEO bar; Googlebot sees what users see
- **HTTPS, mobile-responsive, semantic HTML with `<section>`/`<h1>`/`<h3>`** — page experience signals met
- **Descriptive URLs** (`/integrations/clio`, `/product/lead-iq`) per SEO Starter Guide
- **Topical directory grouping** (`/product/*`, `/integrations/*`) helps crawl scheduling
- **Single-purpose pages** (homepage vs /product vs /pricing) avoids doorway risk
- **Visible FAQ content** still helps AI Overview passage extraction even though the schema is dead
- **Existing Organization + BreadcrumbList schema** is still rich-result-eligible
- **Cloudinary CDN with q_auto, f_auto** is allowed; just add to image sitemap for discovery
- **Tailwind responsive design** is Google's recommended approach over m-dot sites
- **Detailed FAQ + Stage content with named entities** (Clio, MyCase, Filevine, DocuSign) is exactly the entity-dense passage format AI Overviews cite

---

## 🚫 CONFIRMED NON-ISSUES — Don't Waste Time

- **llms.txt** — Google doesn't use it (Mueller)
- **AI-specific markup or markdown duplicates** — explicitly denied in AI Optimization Guide: *"You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in generative AI search"*
- **Hreflang** — US-only product, not needed unless we expand internationally
- **AggregateRating / Review** — if we don't have third-party reviews, do NOT emit (self-serving review rule, 2019)
- **LocalBusiness schema** — no physical storefront; would require fake `address`. Use `Organization` only.
- **Product schema** — SaaS subscriptions aren't retail Products with `gtin`/`mpn`. Use `WebApplication`.
- **DiscussionForumPosting, QAPage** — require user-generated content; not applicable
- **VideoObject for audio demo** — no Google-supported AudioObject rich result; skip

---

## 📊 Schema Status Summary

| Schema Type | Current Status (2026) | Action |
|---|---|---|
| FAQPage | ❌ DEAD May 7 2026, tooling drops June 2026 | **Remove** |
| HowTo | ❌ DEAD since Sept 2023 | **Remove** |
| Service | ⚠️ Metadata only, no rich result | **Replace with WebApplication** |
| TechArticle | ⚠️ No rich result without real author + dates | Keep on /how-it-works only with bylines + dates |
| ItemList (standalone) | ⚠️ No rich result alone (needs Recipe/Movie/etc. nesting) | Keep as entity hint |
| SoftwareApplication / WebApplication | ✅ Rich result eligible | **Add** to /product, /pricing |
| Organization | ✅ Knowledge panel signal | **Expand** per #10 |
| BreadcrumbList | ✅ Visual SERP treatment | Already good, verify per-page |
| Article (with author + dates) | ✅ Rich result eligible | Add when blog launches |
| Speakable | ✅ Beta, US-only | Optional add |
| WebPage | ✅ Container | Add as fallback |

---

## ⏰ Recommended Ship Order

**Wave 1 (this week — pure cleanup, ~2 hours):**
- Delete FAQPage schema from all 7 page types (keep visible FAQ content)
- Delete HowTo schema from /product and /how-it-works
- Add `max-snippet:-1, max-image-preview:large` meta robots site-wide
- Rewrite robots.txt with explicit AI crawler allowlist

**Wave 2 (next sprint — additive schema, ~4 hours):**
- Add WebApplication schema to /product, /pricing
- Expand Organization schema with founder, address, contactPoint, alternateName
- Add `@id` cross-references everywhere
- Drop `changefreq` + `priority` from sitemap.ts
- Self-referential canonical on every page

**Wave 3 (within month — content + measurement, larger lift):**
- Audit /integrations/[slug] for substantive originality, noindex thin ones
- Per-URL `lastmod` from real edit times in sitemap.ts
- Add image sitemap entries for Cloudinary images
- Surface real first-party stats (call volumes, pickup latency, sign-rate lift)
- Add Who/How/Why transparency line in footer
- INP audit on homepage audio demo

---

## Sources

All three research agents read the full breadth of Search Central docs + 2024–2026 blog. Combined: 80+ unique pages fetched. Full source URL list available in the agent transcripts. Key citations referenced inline above.
