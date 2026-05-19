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

// Inline span renderer — supports text/link/bold/italic inside paragraphs
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

/**
 * Legora-style body typography:
 *   - 15px Manrope, weight 400, line-height 1.45
 *   - Pure prose. No bordered cards, no stat boxes, no callout panels,
 *     no FAQ accordions. All section variants render as quiet editorial elements.
 *   - Pull quote = Fraunces italic (the one ornamental flourish Legora uses).
 */
function Section({ s }: { s: ArticleSection }) {
  switch (s.type) {
    case "h2":
      return (
        <h2
          id={s.id}
          className="mt-14 mb-4 text-[#0a0a0a]"
          style={{
            fontSize: "22px",
            lineHeight: "1.2",
            letterSpacing: "-0.012em",
            fontWeight: 500,
          }}
        >
          {s.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={s.id}
          className="mt-8 mb-3 text-[#0a0a0a]"
          style={{
            fontSize: "16px",
            lineHeight: "1.3",
            letterSpacing: "-0.008em",
            fontWeight: 600,
          }}
        >
          {s.text}
        </h3>
      );
    case "p":
      return (
        <p className="mt-4 text-[15px] leading-[1.5] text-[#0a0a0a]/85">
          <InlineContent content={s.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2 pl-5 text-[15px] leading-[1.5] text-[#0a0a0a]/85 list-disc marker:text-[#0a0a0a]/35">
          {s.items.map((item, i) => (
            <li key={i} className="pl-1">
              <InlineContent content={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-4 space-y-2 pl-5 text-[15px] leading-[1.5] text-[#0a0a0a]/85 list-decimal marker:text-[#0a0a0a]/35">
          {s.items.map((item, i) => (
            <li key={i} className="pl-1">
              <InlineContent content={item} />
            </li>
          ))}
        </ol>
      );
    case "quote":
      // The one ornamental element Legora uses. Fraunces italic.
      return (
        <blockquote className="my-10">
          <p
            className="text-[#0a0a0a]"
            style={{
              fontFamily: "'Fraunces', serif",
              fontStyle: "italic",
              fontSize: "22px",
              lineHeight: "1.35",
              fontWeight: 400,
              letterSpacing: "-0.005em",
            }}
          >
            &ldquo;{s.text}&rdquo;
          </p>
          {s.source && (
            <footer className="mt-3 text-[12px] text-[#0a0a0a]/55">— {s.source}</footer>
          )}
        </blockquote>
      );
    case "table":
      // Quiet hairline table — no zebra, no heavy borders.
      return (
        <div className="my-10 overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="border-b border-[#0a0a0a]/[0.15]">
                {s.headers.map((h, i) => (
                  <th
                    key={i}
                    className="py-3 pr-6 text-left text-[12px] font-medium text-[#0a0a0a]/60"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {s.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#0a0a0a]/[0.06] last:border-b-0">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-3 pr-6 align-top text-[#0a0a0a]/85">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {s.caption && (
            <p className="mt-3 text-[12px] leading-[1.5] text-[#0a0a0a]/50 italic">{s.caption}</p>
          )}
        </div>
      );
    case "stat-grid":
      // Inline editorial — three stats as a single horizontal hairline strip, no boxes.
      return (
        <div className="my-10 grid grid-cols-1 gap-y-6 md:grid-cols-3 md:gap-x-10 border-y border-[#0a0a0a]/[0.1] py-8">
          {s.stats.map((stat, i) => (
            <div key={i}>
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontSize: "30px",
                  lineHeight: "1.0",
                  letterSpacing: "-0.02em",
                  fontWeight: 400,
                }}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-[13px] leading-[1.4] text-[#0a0a0a]/65">{stat.label}</p>
              {stat.source && (
                <p className="mt-1 text-[11px] text-[#0a0a0a]/40">{stat.source}</p>
              )}
            </div>
          ))}
        </div>
      );
    case "image":
      return (
        <figure className="my-10">
          <div className={`relative ${s.ratio ?? "aspect-[16/9]"} overflow-hidden rounded-sm`}>
            <img
              src={s.src}
              alt={s.alt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          {s.caption && (
            <figcaption className="mt-3 text-[12px] leading-[1.5] text-[#0a0a0a]/55 italic">
              {s.caption}
            </figcaption>
          )}
        </figure>
      );
    case "image-placeholder":
      return (
        <figure className="my-10">
          <div
            className={`relative ${s.ratio ?? "aspect-[16/9]"} flex items-center justify-center overflow-hidden rounded-sm bg-[#ecebe7]`}
          >
            <p className="text-[11px] text-[#0a0a0a]/30">Image</p>
          </div>
          {s.caption && (
            <figcaption className="mt-3 text-[12px] leading-[1.5] text-[#0a0a0a]/55 italic">{s.caption}</figcaption>
          )}
        </figure>
      );
    case "callout":
      // Render as a small italic editor's note — no panel, no box.
      return (
        <p className="my-6 border-l border-[#0a0a0a]/30 pl-5 text-[14px] leading-[1.5] italic text-[#0a0a0a]/70">
          {s.title && <strong className="not-italic font-medium text-[#0a0a0a] mr-1">{s.title}.</strong>}
          <InlineContent content={s.text} />
        </p>
      );
    case "faq":
      // Render as Q&A prose — bold question + paragraph answer. No accordion.
      return (
        <div className="mt-6 space-y-7">
          {s.items.map((item, i) => (
            <div key={i}>
              <p className="text-[15px] leading-[1.5] font-medium text-[#0a0a0a]">{item.q}</p>
              <p className="mt-2 text-[15px] leading-[1.5] text-[#0a0a0a]/80">{item.a}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.related);

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

      {/* ─────────── Hero — left-aligned title, no centering, no eyebrow card ─────────── */}
      <section className="bg-[#fafaf9] px-6 pt-24 md:pt-28 pb-10">
        <div className="mx-auto max-w-[1100px]">
          <h1
            className="text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 48px)",
              lineHeight: "1.04",
              letterSpacing: "-0.03em",
              fontWeight: 400,
              maxWidth: "22ch",
            }}
          >
            {post.title}
          </h1>
        </div>
      </section>

      {/* ─────────── Hero image — full content width ─────────── */}
      <section className="bg-[#fafaf9] px-6 pb-12">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-[#ecebe7]">
            {post.hero.img ? (
              <img src={post.hero.img} alt={post.hero.imgAlt ?? post.title} className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[11px] text-[#0a0a0a]/25">Hero image</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─────────── Body — sidebar (left) + prose column (right) ─────────── */}
      <section className="bg-[#fafaf9] px-6 pb-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[100px_1fr] lg:gap-20">
            {/* Sidebar — minimal metadata */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="space-y-5 text-[12px]">
                <div>
                  <p className="uppercase tracking-[0.12em] text-[#0a0a0a]/45 text-[10px] mb-1">Category</p>
                  <p className="text-[#0a0a0a]/80">{post.category}</p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.12em] text-[#0a0a0a]/45 text-[10px] mb-1">Published</p>
                  <p className="text-[#0a0a0a]/80">{post.date}</p>
                </div>
                {post.lastUpdated && post.lastUpdated !== post.date && (
                  <div>
                    <p className="uppercase tracking-[0.12em] text-[#0a0a0a]/45 text-[10px] mb-1">Updated</p>
                    <p className="text-[#0a0a0a]/80">{post.lastUpdated}</p>
                  </div>
                )}
                <div>
                  <p className="uppercase tracking-[0.12em] text-[#0a0a0a]/45 text-[10px] mb-1">Reading time</p>
                  <p className="text-[#0a0a0a]/80">{post.readingTime}</p>
                </div>
              </div>
            </aside>

            {/* Main column — prose-first, 720px max */}
            <article className="max-w-[720px]">
              {/* Author byline as small lead — Legora pattern */}
              <p className="text-[13px] text-[#0a0a0a]/65 mb-8">
                By {post.author.name}
                {post.author.credentials ? `, ${post.author.credentials}` : ""}
              </p>

              {/* TL;DR — subtle "In brief" section, no card, no border */}
              <div className="mb-12">
                <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55 mb-3">In brief</p>
                <ul className="space-y-2 text-[15px] leading-[1.5] text-[#0a0a0a]/85">
                  {post.tldr.map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-[10px] inline-block h-[3px] w-[3px] shrink-0 rounded-full bg-[#0a0a0a]/45" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body */}
              <div>
                {post.body.map((s, i) => (
                  <Section key={i} s={s} />
                ))}
              </div>

              {/* Author bio at bottom — small italic note */}
              {post.author.bio && (
                <div className="mt-16 border-t border-[#0a0a0a]/[0.08] pt-6">
                  <p className="text-[13px] leading-[1.5] text-[#0a0a0a]/65 italic">
                    <strong className="not-italic font-medium text-[#0a0a0a]">{post.author.name}</strong>
                    {post.author.credentials ? `, ${post.author.credentials}. ` : ". "}
                    {post.author.bio}
                  </p>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>

      {/* ─────────── Related posts — sparse Legora-style grid ─────────── */}
      {related.length > 0 && (
        <section className="bg-[#fafaf9] px-6 py-16 border-t border-[#0a0a0a]/[0.08]">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/55 mb-8">Related reading</p>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-[#ecebe7]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-[10px] text-[#0a0a0a]/25">Article image</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[12px] text-[#0a0a0a]/55">{r.date}</p>
                  <h3
                    className="mt-2 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                    style={{ fontSize: "18px", lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: 400 }}
                  >
                    {r.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─────────── Final CTA (kept minimal — Legora-clean) ─────────── */}
      <section className="bg-[#0a0a0a] text-white px-6 py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 40px)",
              lineHeight: "1.1",
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: "22ch",
            }}
          >
            See ClaireAI handle a live intake call.
          </h2>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center bg-white px-6 py-3 text-[13px] uppercase tracking-[0.1em] text-[#0a0a0a] transition-colors hover:bg-white/85"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
