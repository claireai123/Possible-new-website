import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  HELP_ARTICLES,
  HELP_CATEGORIES,
  getHelpArticle,
  getCategory,
  getRelatedHelpArticles,
  shortDescription,
  type HelpInlineSpan,
  type HelpSection,
} from "@/data/help-articles";

const DEFAULT_OG_IMAGE = "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_1.91:1,q_auto,f_auto/v1779214207/ChatGPT_Image_May_19_2026_at_02_09_40_PM.jpg";

const BASE_URL = "https://theclaireai.com";

export async function generateStaticParams() {
  return HELP_ARTICLES.map((a) => ({ slug: a.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) return { title: "Article not found" };
  const url = `${BASE_URL}/help/${article.slug}`;
  const description = shortDescription(article.lead);
  return {
    title: `${article.title} — Help Center`,
    description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description,
      url,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.lastUpdated,
      authors: [article.author.name],
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

function renderInline(spans: HelpInlineSpan[]): React.ReactNode {
  return spans.map((s, i) => {
    if (s.kind === "bold") return <strong key={i} className="font-medium text-[#0a0a0a]">{s.text}</strong>;
    if (s.kind === "code") return <code key={i} className="rounded bg-[#f4f3ef] px-1.5 py-0.5 font-mono text-[0.9em] text-[#0a0a0a]">{s.text}</code>;
    if (s.kind === "link") return <Link key={i} href={s.href} className="text-[#0a0a0a] underline underline-offset-2 decoration-[#0a0a0a]/30 hover:decoration-[#0a0a0a]">{s.text}</Link>;
    return <span key={i}>{s.text}</span>;
  });
}

function Section({ s }: { s: HelpSection }) {
  switch (s.type) {
    case "h2":
      return (
        <h2
          id={s.id}
          className="mt-14 scroll-mt-28 text-[#0a0a0a]"
          style={{ fontSize: "26px", lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: 500 }}
        >
          {s.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={s.id}
          className="mt-10 scroll-mt-28 text-[#0a0a0a]"
          style={{ fontSize: "19px", lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: 500 }}
        >
          {s.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-5 text-[16.5px] leading-[1.7] text-[#0a0a0a]/85">
          {renderInline(s.spans)}
        </p>
      );
    case "ol":
      return (
        <ol className="mt-5 list-decimal pl-6 space-y-2 text-[16.5px] leading-[1.65] text-[#0a0a0a]/85 marker:text-[#0a0a0a]/40">
          {s.items.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ol>
      );
    case "ul":
      return (
        <ul className="mt-5 list-disc pl-6 space-y-2 text-[16.5px] leading-[1.65] text-[#0a0a0a]/85 marker:text-[#0a0a0a]/40">
          {s.items.map((i, idx) => (
            <li key={idx}>{i}</li>
          ))}
        </ul>
      );
    case "callout": {
      const tone =
        s.tone === "warning"
          ? "border-[#c08a3e]/40 bg-[#fdf6ec]"
          : s.tone === "success"
          ? "border-[#5a7a4e]/30 bg-[#f1f5ee]"
          : "border-[#0a0a0a]/12 bg-[#fafaf9]";
      return (
        <aside className={`mt-8 rounded-md border ${tone} px-5 py-4`}>
          <p className="text-[12px] uppercase tracking-[0.12em] text-[#0a0a0a]/55">{s.title}</p>
          <p className="mt-2 text-[15px] leading-[1.6] text-[#0a0a0a]/85">{s.body}</p>
        </aside>
      );
    }
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-md border border-[#0a0a0a]/10 bg-[#0a0a0a] px-4 py-4 text-[13px] leading-[1.6] text-white">
          <code>{s.text}</code>
        </pre>
      );
  }
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getHelpArticle(slug);
  if (!article) notFound();

  const category = getCategory(article.category);
  const related = getRelatedHelpArticles(article.related);
  const tocItems = article.sections.filter((s): s is Extract<HelpSection, { type: "h2" }> => s.type === "h2");
  const url = `${BASE_URL}/help/${article.slug}`;

  // ─── Structured data ────────────────────────────────────────────────
  // 1. TechArticle is the closest schema.org type for technical help content.
  //    LLMs treat TechArticle as authoritative for product documentation.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: article.title,
    description: shortDescription(article.lead),
    abstract: article.tldr.join(" "),
    image: [DEFAULT_OG_IMAGE],
    datePublished: article.datePublished,
    dateModified: article.lastUpdated,
    inLanguage: "en-US",
    mainEntityOfPage: url,
    url,
    author: {
      "@type": "Person",
      name: article.author.name,
      description: article.author.credentials,
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
    publisher: { "@id": `${BASE_URL}/#organization` },
    articleSection: category?.name,
    keywords: article.keywords.join(", "),
    proficiencyLevel: "Beginner",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".help-article-lead", ".help-article-tldr li"],
    },
  };

  // 2. BreadcrumbList — Home → Help Center → Category → Article.
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Help Center", item: `${BASE_URL}/help` },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.name ?? "",
        item: `${BASE_URL}/help#${article.category}`,
      },
      { "@type": "ListItem", position: 4, name: article.title, item: url },
    ],
  };

  // 3. Organization — single source of truth, referenced by @id elsewhere.
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "ClaireAI",
    url: BASE_URL,
    description: "AI receptionist purpose-built for U.S. law firms.",
    sameAs: [
      "https://www.linkedin.com/company/theclaireai",
      "https://x.com/claireai",
    ],
  };

  return (
    <main className="min-h-screen bg-white text-[#0a0a0a] selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      {/* ─────────── Header / breadcrumb ─────────── */}
      <section className="px-6 pt-20 pb-6">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45">
            <Link href="/" className="hover:text-[#0a0a0a]">ClaireAI</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <Link href="/help" className="hover:text-[#0a0a0a]">Help Center</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <Link href={`/help#${article.category}`} className="hover:text-[#0a0a0a]">{category?.name}</Link>
          </nav>
        </div>
      </section>

      {/* ─────────── Title + lead ─────────── */}
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <h1
            className="text-[#0a0a0a] max-w-[24ch]"
            style={{ fontSize: "clamp(2rem, 4vw, 48px)", lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: 500 }}
          >
            {article.title}
          </h1>

          {/* The lead is the citable passage. We surface it visually with quote-like
              styling so it reads as the canonical answer at a glance.
              The `help-article-lead` class is the cssSelector target of the
              SpeakableSpecification in JSON-LD — voice search will read this. */}
          <p
            className="help-article-lead mt-6 max-w-[68ch] text-[18.5px] leading-[1.55] text-[#0a0a0a]/85"
            style={{ letterSpacing: "-0.005em" }}
          >
            {article.lead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] text-[#0a0a0a]/55">
            <span>
              By <span className="text-[#0a0a0a]">{article.author.name}</span>, {article.author.credentials}
            </span>
            <span>Updated <time dateTime={article.lastUpdated}>{formatDate(article.lastUpdated)}</time></span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </section>

      {/* ─────────── TL;DR ─────────── */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="rounded-md border border-[#0a0a0a]/10 bg-[#fafaf9] px-6 py-6">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55">TL;DR</p>
            <ul className="help-article-tldr mt-4 list-disc pl-5 space-y-2 text-[15px] leading-[1.55] text-[#0a0a0a]/85 marker:text-[#0a0a0a]/40">
              {article.tldr.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─────────── Two-column layout: TOC + body ─────────── */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55">On this page</p>
              <ul className="mt-4 space-y-2 text-[13.5px] leading-[1.45]">
                {tocItems.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-[#0a0a0a]/65 hover:text-[#0a0a0a]">
                      {h.text}
                    </a>
                  </li>
                ))}
                {article.faq && article.faq.length > 0 && (
                  <li>
                    <a href="#faq" className="text-[#0a0a0a]/65 hover:text-[#0a0a0a]">FAQ</a>
                  </li>
                )}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <article className="max-w-[680px]">
            {article.sections.map((s, i) => (
              <Section key={i} s={s} />
            ))}

            {/* ─────────── FAQ ─────────── */}
            {article.faq && article.faq.length > 0 && (
              <div id="faq" className="mt-16 scroll-mt-28">
                <h2
                  className="text-[#0a0a0a]"
                  style={{ fontSize: "26px", lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: 500 }}
                >
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-[#0a0a0a]/[0.08] border-y border-[#0a0a0a]/[0.08]">
                  {article.faq.map((f, i) => (
                    <details key={i} className="group py-5 [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex cursor-pointer items-start justify-between gap-6">
                        <p
                          className="text-[#0a0a0a]"
                          style={{ fontSize: "17px", lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: 450 }}
                        >
                          {f.q}
                        </p>
                        <span className="mt-1 shrink-0 text-[#0a0a0a]/40 transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-[15.5px] leading-[1.65] text-[#0a0a0a]/85">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* ─────────── Author bio ─────────── */}
            <div className="mt-16 rounded-md border border-[#0a0a0a]/10 bg-[#fafaf9] px-6 py-6">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55">Author</p>
              <p
                className="mt-3 text-[#0a0a0a]"
                style={{ fontSize: "17px", lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: 500 }}
              >
                {article.author.name}
              </p>
              <p className="mt-1 text-[13px] text-[#0a0a0a]/55">{article.author.credentials}</p>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-[#0a0a0a]/85">{article.author.bio}</p>
            </div>
          </article>
        </div>
      </section>

      {/* ─────────── Related articles ─────────── */}
      {related.length > 0 && (
        <section className="px-6 pb-20 border-t border-[#0a0a0a]/[0.08]">
          <div className="mx-auto max-w-[1100px] pt-16">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-8">Related articles</p>
            <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const rcat = HELP_CATEGORIES.find((c) => c.slug === r.category);
                return (
                  <li key={r.slug}>
                    <Link href={`/help/${r.slug}`} className="group block border-t border-[#0a0a0a]/[0.08] pt-5">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/40">{rcat?.name}</p>
                      <p
                        className="mt-2 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                        style={{ fontSize: "16.5px", lineHeight: "1.25", letterSpacing: "-0.005em", fontWeight: 450 }}
                      >
                        {r.title}
                      </p>
                      <p className="mt-2 line-clamp-2 text-[13px] text-[#0a0a0a]/55 leading-[1.5]">{r.lead}</p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      {/* ─────────── CTA ─────────── */}
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
            Need a second pair of eyes?
          </h2>
          <p className="mt-6 max-w-[55ch] text-[18px] leading-[1.55] text-[#0a0a0a]/75">
            If this article didn&apos;t fully answer your question, our team will. We reply within one business day to every ticket.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded bg-[#0a0a0a] px-5 py-3 text-[14px] font-normal text-white hover:bg-[#0a0a0a]/85"
            >
              Contact support
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center rounded border border-[#0a0a0a]/20 bg-white/10 px-5 py-3 text-[14px] font-normal text-[#0a0a0a] hover:bg-white/20"
            >
              Back to Help Center
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
