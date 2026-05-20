import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import {
  HELP_CATEGORIES,
  HELP_ARTICLES,
  getArticlesByCategory,
  getSearchIndex,
} from "@/data/help-articles";
import { HelpSearch } from "@/components/help/help-search";

const BASE_URL = "https://theclaireai.com";

const HELP_DESCRIPTION =
  "Setup guides, integration walkthroughs, billing FAQs, and troubleshooting for ClaireAI — the AI receptionist for U.S. law firms.";

export const metadata: Metadata = {
  title: "Help Center — Setup guides and documentation",
  description: HELP_DESCRIPTION,
  alternates: { canonical: `${BASE_URL}/help` },
  openGraph: {
    title: "Help Center — ClaireAI",
    description: HELP_DESCRIPTION,
    url: `${BASE_URL}/help`,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Help Center — ClaireAI", description: HELP_DESCRIPTION },
};

// Popular articles = curated by hand, fall back to first article per category.
const POPULAR_SLUGS = [
  "activate-your-claireai-number",
  "connect-clio-grow",
  "warm-transfer-setup",
  "edit-intake-script",
  "after-hours-routing",
  "request-hipaa-baa",
];

export default function HelpCenterPage() {
  const index = getSearchIndex();
  const popular = POPULAR_SLUGS.map((s) =>
    HELP_ARTICLES.find((a) => a.slug === s)
  ).filter((a): a is NonNullable<typeof a> => !!a);

  // ─── Structured data ─────────────────────────────────────────────────
  // CollectionPage describes the help center as a corpus of HowTo + FAQ docs.
  // Each article also emits its own Article schema on its detail page.
  // We additionally emit a SiteNavigationElement so AI crawlers can identify the
  // help center's category structure without having to render JS.
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE_URL}/help#collection`,
    name: "ClaireAI Help Center",
    url: `${BASE_URL}/help`,
    description:
      "Setup guides, integration walkthroughs, billing FAQs, security and compliance answers, and troubleshooting for ClaireAI.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    inLanguage: "en-US",
    breadcrumb: { "@id": `${BASE_URL}/help#breadcrumb` },
    // hasPart wires the CollectionPage to each child TechArticle by @id.
    // This makes the entity graph explicit for AI crawlers (Perplexity, Bing
    // Chat, ChatGPT) that follow schema relationships to find the canonical
    // answer surface for a query.
    hasPart: HELP_ARTICLES.map((a) => ({
      "@type": "TechArticle",
      "@id": `${BASE_URL}/help/${a.slug}#article`,
      url: `${BASE_URL}/help/${a.slug}`,
      headline: a.title,
    })),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: HELP_ARTICLES.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/help/${a.slug}`,
        name: a.title,
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${BASE_URL}/help#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Help Center", item: `${BASE_URL}/help` },
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "ClaireAI",
    url: BASE_URL,
    sameAs: [
      "https://www.linkedin.com/company/claireai",
      "https://x.com/claireai",
    ],
  };

  return (
    <main className="bg-white text-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />

      {/* ─────────── Hero ─────────── */}
      <section className="px-6 pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45">
            <Link href="/" className="hover:text-[#0a0a0a]">ClaireAI</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <span className="text-[#0a0a0a]/75">Help Center</span>
          </nav>

          <h1
            className="mt-6 font-serif"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 64px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            How can we help?
          </h1>
          <p className="mt-6 max-w-[60ch] text-[18px] leading-[1.55] text-[#0a0a0a]/65">
            Setup guides, integration walkthroughs, and answers to the questions law firms ask us most. Search the full library, or browse by category. Our team replies to every ticket within one business day.
          </p>

          <div className="mt-10">
            <Suspense fallback={<div className="h-[52px] max-w-[640px] rounded-md border border-[#0a0a0a]/12 bg-white" />}>
              <HelpSearch index={index} />
            </Suspense>
          </div>

          <p className="mt-4 text-[12px] text-[#0a0a0a]/40">
            Press <kbd className="rounded border border-[#0a0a0a]/15 px-1 py-px text-[10px] font-mono">/</kbd> from anywhere on this page to focus search.
          </p>
        </div>
      </section>

      {/* ─────────── Categories grid ─────────── */}
      <section className="px-6 pb-20 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-8">Browse by category</p>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {HELP_CATEGORIES.map((c) => {
              const count = getArticlesByCategory(c.slug).length;
              return (
                <Link
                  key={c.slug}
                  href={`/help#${c.slug}`}
                  className="group block border-t border-[#0a0a0a]/[0.08] pt-6"
                  aria-label={`${c.name} — ${count} articles`}
                >
                  <h2
                    className="text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                    style={{ fontSize: "20px", lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: 450 }}
                  >
                    {c.name}
                  </h2>
                  <p className="mt-2 text-[14px] leading-[1.5] text-[#0a0a0a]/55">{c.desc}</p>
                  <p className="mt-4 text-[12px] text-[#0a0a0a]/40">
                    {count} article{count === 1 ? "" : "s"}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── Popular articles ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-8">Popular articles</p>
          <ul className="divide-y divide-[#0a0a0a]/[0.08] border-y border-[#0a0a0a]/[0.08]">
            {popular.map((a) => {
              const cat = HELP_CATEGORIES.find((c) => c.slug === a.category);
              return (
                <li key={a.slug}>
                  <Link
                    href={`/help/${a.slug}`}
                    className="group flex items-center justify-between gap-6 py-5"
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/40">{cat?.name ?? ""}</p>
                      <p
                        className="mt-1 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                        style={{ fontSize: "18px", lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: 450 }}
                      >
                        {a.title}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      <span className="text-[12px] text-[#0a0a0a]/40">{a.readingTime}</span>
                      <span className="text-[#0a0a0a]/30 group-hover:text-[#0a0a0a]/60 transition-colors">→</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ─────────── All articles by category (anchor targets for the nav cards above) ─────────── */}
      <section className="px-6 pb-24 border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16 space-y-16">
          {HELP_CATEGORIES.map((c) => {
            const arts = getArticlesByCategory(c.slug);
            if (arts.length === 0) return null;
            return (
              <div key={c.slug} id={c.slug} className="scroll-mt-28">
                <div className="flex items-baseline justify-between gap-6">
                  <h2
                    className="text-[#0a0a0a]"
                    style={{ fontSize: "24px", lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: 450 }}
                  >
                    {c.name}
                  </h2>
                  <p className="text-[12px] text-[#0a0a0a]/40">
                    {arts.length} article{arts.length === 1 ? "" : "s"}
                  </p>
                </div>
                <p className="mt-2 text-[14px] text-[#0a0a0a]/55">{c.desc}</p>
                <ul className="mt-6 divide-y divide-[#0a0a0a]/[0.06] border-y border-[#0a0a0a]/[0.06]">
                  {arts.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/help/${a.slug}`}
                        className="group flex items-start justify-between gap-6 py-4"
                      >
                        <div className="min-w-0">
                          <p
                            className="text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                            style={{ fontSize: "17px", lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: 450 }}
                          >
                            {a.title}
                          </p>
                          <p className="mt-1 line-clamp-1 text-[13px] text-[#0a0a0a]/50 leading-[1.45]">
                            {a.lead}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-4">
                          <span className="text-[12px] text-[#0a0a0a]/40">{a.readingTime}</span>
                          <span className="text-[#0a0a0a]/30 group-hover:text-[#0a0a0a]/60 transition-colors">→</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────── Final CTA (sage radial — matches site-wide pattern) ─────────── */}
      <section
        className="px-6 py-[120px]"
        style={{
          backgroundColor: "#8c9c82",
          backgroundImage: `
            url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.22 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"),
            radial-gradient(120% 90% at 20% 10%, #a9b8a0 0%, #8c9c82 45%, #7a8a72 100%)
          `,
          backgroundSize: "280px 280px, 100% 100%",
          backgroundRepeat: "repeat, no-repeat",
        }}
      >
        <div className="mx-auto max-w-[1680px]">
          <h2
            className="font-serif text-[#0a0a0a] max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Still stuck? Talk to a human.
          </h2>
          <p className="mt-6 max-w-[55ch] text-[18px] leading-[1.55] text-[#0a0a0a]/75">
            Our team replies to every support ticket within one business day. For active calls or live incidents, your account manager has a dedicated escalation line.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded bg-[#0a0a0a] px-5 py-3 text-[14px] font-normal text-white hover:bg-[#0a0a0a]/85"
            >
              Contact support
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded border border-[#0a0a0a]/20 bg-white/10 px-5 py-3 text-[14px] font-normal text-[#0a0a0a] hover:bg-white/20"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
