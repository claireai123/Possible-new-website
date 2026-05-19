import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, getRelatedPosts, type ArticleSection, type ParagraphSpan } from "@/data/posts";

const BASE_URL = "https://theclaireai.com";

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  const url = `${BASE_URL}/blog/${post.slug}`;
  return {
    title: `${post.title} | ClaireAI`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url,
      publishedTime: post.date,
      modifiedTime: post.lastUpdated ?? post.date,
      authors: [post.author.name],
    },
  };
}

// ───────────────────────────────────────────────────────────────
// Inline span renderer (supports text/link/bold/italic in paragraphs)
// ───────────────────────────────────────────────────────────────
function Span({ s }: { s: ParagraphSpan }) {
  if (s.kind === "text") return <>{s.text}</>;
  if (s.kind === "bold") return <strong className="font-medium text-[#0a0a0a]">{s.text}</strong>;
  if (s.kind === "italic") return <em className="italic">{s.text}</em>;
  if (s.kind === "link")
    return (
      <Link href={s.href} className="text-[#0a0a0a] underline decoration-[#0a0a0a]/25 underline-offset-[3px] hover:decoration-[#0a0a0a] transition-colors">
        {s.text}
      </Link>
    );
  return null;
}

function InlineContent({ content }: { content: string | ParagraphSpan[] }) {
  if (typeof content === "string") return <>{content}</>;
  return (
    <>
      {content.map((s, i) => (
        <Span key={i} s={s} />
      ))}
    </>
  );
}

// ───────────────────────────────────────────────────────────────
// Section renderer — one component per ArticleSection variant
// ───────────────────────────────────────────────────────────────
function Section({ s }: { s: ArticleSection }) {
  switch (s.type) {
    case "h2":
      return (
        <h2
          id={s.id}
          className="mt-16 mb-6 text-[#0a0a0a]"
          style={{
            fontSize: "30px",
            lineHeight: "1.15",
            letterSpacing: "-0.018em",
            fontWeight: 400,
          }}
        >
          {s.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={s.id}
          className="mt-10 mb-4 text-[#0a0a0a]"
          style={{
            fontSize: "20px",
            lineHeight: "1.25",
            letterSpacing: "-0.01em",
            fontWeight: 500,
          }}
        >
          {s.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-5 text-[17px] leading-[1.65] text-[#0a0a0a]/80">
          <InlineContent content={s.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-2 pl-5 text-[17px] leading-[1.65] text-[#0a0a0a]/80 list-disc marker:text-[#0a0a0a]/40">
          {s.items.map((item, i) => (
            <li key={i} className="pl-1">
              <InlineContent content={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-3 pl-5 text-[17px] leading-[1.65] text-[#0a0a0a]/80 list-decimal marker:text-[#0a0a0a]/40">
          {s.items.map((item, i) => (
            <li key={i} className="pl-1">
              <InlineContent content={item} />
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-2 border-[#0a0a0a] pl-6">
          <p
            className="text-[#0a0a0a]"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "24px",
              lineHeight: "1.35",
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;{s.text}&rdquo;
          </p>
          {s.source && (
            <footer className="mt-4 text-[13px] text-[#0a0a0a]/55">— {s.source}</footer>
          )}
        </blockquote>
      );
    case "table":
      return (
        <div className="my-10 overflow-x-auto border-y border-[#0a0a0a]/[0.08]">
          <table className="w-full text-[14.5px]">
            <thead>
              <tr className="border-b border-[#0a0a0a]/[0.08]">
                {s.headers.map((h, i) => (
                  <th
                    key={i}
                    className="px-4 py-4 text-left text-[12px] uppercase tracking-[0.1em] font-medium text-[#0a0a0a]/55"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#0a0a0a]/[0.04] last:border-b-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-4 align-top text-[#0a0a0a]/85">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {s.caption && (
            <p className="px-4 py-3 text-[13px] leading-[1.5] text-[#0a0a0a]/50">{s.caption}</p>
          )}
        </div>
      );
    case "stat-grid":
      return (
        <div className="my-10 grid grid-cols-1 gap-8 border-y border-[#0a0a0a]/[0.08] py-10 md:grid-cols-3">
          {s.stats.map((stat, i) => (
            <div key={i}>
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontSize: "44px",
                  lineHeight: "1.0",
                  letterSpacing: "-0.025em",
                  fontWeight: 300,
                }}
              >
                {stat.value}
              </p>
              <p className="mt-3 text-[14px] leading-[1.45] text-[#0a0a0a]/65">{stat.label}</p>
              {stat.source && (
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/40">
                  {stat.source}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    case "image":
      return (
        <figure className="my-10">
          <div className={`relative ${s.ratio ?? "aspect-[16/9]"} overflow-hidden rounded-md`}>
            <img
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {s.caption && (
            <figcaption className="mt-3 text-[13px] leading-[1.5] text-[#0a0a0a]/50">
              {s.caption}
            </figcaption>
          )}
        </figure>
      );
    case "image-placeholder":
      return (
        <figure className="my-10">
          <div
            className={`relative ${s.ratio ?? "aspect-[16/9]"} flex items-center justify-center overflow-hidden rounded-md bg-[#ecebe7]`}
          >
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0a0a]/5">
                <svg className="h-4 w-4 text-[#0a0a0a]/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[11px] text-[#0a0a0a]/30">Inline image</p>
            </div>
          </div>
          {s.caption && (
            <figcaption className="mt-3 text-[13px] leading-[1.5] text-[#0a0a0a]/50">{s.caption}</figcaption>
          )}
        </figure>
      );
    case "callout":
      const accent =
        s.kind === "warn"
          ? "border-l-2 border-[#c4913c] bg-[#f5e9d4]/30"
          : s.kind === "highlight"
          ? "border-l-2 border-[#0a0a0a] bg-[#0a0a0a]/[0.03]"
          : "border-l-2 border-[#0a0a0a]/40 bg-[#0a0a0a]/[0.025]";
      return (
        <aside className={`my-8 ${accent} px-6 py-5`}>
          {s.title && (
            <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55 font-medium">
              {s.title}
            </p>
          )}
          <p className="text-[15px] leading-[1.55] text-[#0a0a0a]/80">
            <InlineContent content={s.text} />
          </p>
        </aside>
      );
    case "faq":
      return (
        <div className="mt-8 border-t border-[#0a0a0a]/[0.08]">
          {s.items.map((item, i) => (
            <details
              key={i}
              className="group border-b border-[#0a0a0a]/[0.08] [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[#0a0a0a] hover:text-[#0a0a0a]/70 transition-colors">
                <span className="text-[16px] md:text-[17px] leading-[1.35] font-medium">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#0a0a0a]/15 text-[#0a0a0a]/55 transition-transform duration-200 group-open:rotate-45"
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="pb-6 pr-12 text-[15px] leading-[1.6] text-[#0a0a0a]/70">{item.a}</p>
            </details>
          ))}
        </div>
      );
    default:
      return null;
  }
}

// ───────────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────────
export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.related);

  // JSON-LD Article schema for SEO + AI engines
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.hero.img ? [post.hero.img] : undefined,
    datePublished: post.date,
    dateModified: post.lastUpdated ?? post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.credentials,
    },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#0a0a0a] selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* ─────────── Hero — full width title block ─────────── */}
      <section className="bg-[#fafaf9] px-6 pt-24 md:pt-28 pb-12">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[12px] text-[#0a0a0a]/65">{post.category}</p>
          <h1
            className="mt-6 text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2.25rem, 4.6vw, 56px)",
              lineHeight: "1.04",
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: "20ch",
            }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* ─────────── Hero image ─────────── */}
      <section className="bg-[#fafaf9] px-6 pb-14">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-[#ecebe7]">
            {post.hero.img ? (
              <img src={post.hero.img} alt={post.hero.imgAlt ?? post.title} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a]/5">
                    <svg className="h-5 w-5 text-[#0a0a0a]/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/25">Hero image · 16:9</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────── Article body — sidebar + content (Legora pattern) ─────────── */}
      <section className="bg-[#fafaf9] px-6 pb-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[140px_1fr] lg:gap-16">
            {/* Sidebar — sticky metadata */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-6">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">Category</p>
                  <p className="mt-1 text-[13px] text-[#0a0a0a]/85">{post.category}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">Published</p>
                  <p className="mt-1 text-[13px] text-[#0a0a0a]/85">{post.date}</p>
                </div>
                {post.lastUpdated && post.lastUpdated !== post.date && (
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">Updated</p>
                    <p className="mt-1 text-[13px] text-[#0a0a0a]/85">{post.lastUpdated}</p>
                  </div>
                )}
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">Reading time</p>
                  <p className="mt-1 text-[13px] text-[#0a0a0a]/85">{post.readingTime}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">Author</p>
                  <p className="mt-1 text-[13px] text-[#0a0a0a]/85">{post.author.name}</p>
                  {post.author.credentials && (
                    <p className="mt-1 text-[12px] leading-[1.45] text-[#0a0a0a]/55">{post.author.credentials}</p>
                  )}
                </div>
              </div>
            </aside>

            {/* Main column */}
            <article className="max-w-[720px]">
              {/* TL;DR */}
              <div className="mb-12 rounded-md border border-[#0a0a0a]/[0.08] bg-white px-7 py-7">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/55 font-medium">
                  Key takeaways
                </p>
                <ul className="mt-4 space-y-3 text-[15.5px] leading-[1.55] text-[#0a0a0a]/85">
                  {post.tldr.map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[10px] inline-block h-1 w-1 shrink-0 rounded-full bg-[#0a0a0a]/40" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body */}
              <div className="prose-article">
                {post.body.map((s, i) => (
                  <Section key={i} s={s} />
                ))}
              </div>

              {/* Author bio */}
              {post.author.bio && (
                <div className="mt-20 border-t border-[#0a0a0a]/[0.1] pt-8">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/55 font-medium">
                    About the author
                  </p>
                  <p className="mt-3 text-[#0a0a0a]" style={{ fontSize: "18px", fontWeight: 500 }}>
                    {post.author.name}
                  </p>
                  {post.author.credentials && (
                    <p className="mt-1 text-[14px] text-[#0a0a0a]/65">{post.author.credentials}</p>
                  )}
                  <p className="mt-4 text-[15px] leading-[1.6] text-[#0a0a0a]/75">{post.author.bio}</p>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* ─────────── Related posts ─────────── */}
      {related.length > 0 && (
        <section className="bg-[#fafaf9] px-6 py-20 border-t border-[#0a0a0a]/[0.08]">
          <div className="mx-auto max-w-[1680px]">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55 mb-10">
              Related reading
            </p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#ecebe7]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-[11px] text-[#0a0a0a]/25">Article image</p>
                    </div>
                  </div>
                  <p className="mt-5 text-[12px] text-[#0a0a0a]/55">{r.date}</p>
                  <h3
                    className="mt-2 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                    style={{ fontSize: "22px", lineHeight: "1.15", letterSpacing: "-0.012em", fontWeight: 400 }}
                  >
                    {r.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.5] text-[#0a0a0a]/55 max-w-[40ch]">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Final CTA — sage radial (site pattern) ─────────── */}
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
            See ClaireAI close the gap on a live call.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire handling a live intake call calibrated to your firm&apos;s practice area and rubric.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-9 py-5 text-[17px] text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
