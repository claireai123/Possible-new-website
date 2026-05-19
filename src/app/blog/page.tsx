import type { Metadata } from "next";
import Link from "next/link";

const BASE_URL = "https://theclaireai.com/blog";

export const metadata: Metadata = {
  title: "Blog — Research, guides, and insights for legal intake | ClaireAI",
  description:
    "Research, guides, and insights on legal intake, AI receptionists, missed-call recovery, and law firm operations from the ClaireAI team.",
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Blog — Research, guides, and insights for legal intake | ClaireAI",
    description:
      "Original research, practical guides, and operational insights for personal injury, criminal defense, and family law firms.",
    url: BASE_URL,
    type: "website",
  },
};

type Post = {
  date: string;
  title: string;
  excerpt: string;
  href: string;
  category?: string;
};

const FEATURED: Post = {
  category: "Research",
  date: "Feb 14, 2026",
  title: "Measuring the impact of AI on 1,000 law firms",
  excerpt:
    "Three months. 1,000 law firms surveyed. The largest-ever benchmark of intake conversion, response time, and revenue recovery — and where AI receptionists have the largest measurable effect.",
  href: "/blog/2026-legal-intake-benchmark-report",
};

const CATEGORIES = [
  "All",
  "Reports & research",
  "Guides",
  "Product",
  "Industry",
  "Switching",
];

const GRID_POSTS: Post[] = [
  {
    date: "Feb 12, 2026",
    title: "How to outsource legal intake: the 2026 complete guide",
    excerpt:
      "Cost breakdowns and implementation steps from 200+ firms — outsourced legal intake, vendor selection, and CRM integration paths.",
    href: "/blog/outsource-legal-intake-guide",
  },
  {
    date: "Jan 28, 2026",
    title: "Legal intake question bank: 85+ questions by practice area",
    excerpt:
      "Copy-paste intake scripts for personal injury, criminal defense, family law, and immigration. Calibrated by practitioners.",
    href: "/blog/legal-intake-question-bank",
  },
  {
    date: "Feb 4, 2026",
    title: "Answering service pricing comparison 2026: what law firms actually pay",
    excerpt:
      "Real pricing data from 847 law firms comparing Smith.ai, Ruby, AnsweringLegal, and AI receptionists across volume tiers.",
    href: "/blog/answering-service-pricing-comparison",
  },
  {
    date: "Jan 22, 2026",
    title: "Best AI receptionist for law firms in 2026",
    excerpt:
      "Comparative analysis of major AI receptionist platforms — features, integrations, pricing, and the practice areas they each handle.",
    href: "/blog/best-ai-receptionist-law-firms-2026",
  },
  {
    date: "Jan 18, 2026",
    title: "The $100,000 missed-call problem at PI law firms",
    excerpt:
      "Analysis of inbound call data showing how PI firms recover up to 1,200% ROI by closing the missed-call gap on first contact.",
    href: "/blog/missed-call-revenue-loss-law-firms",
  },
  {
    date: "Jan 14, 2026",
    title: "From legacy to logic: switching from Ruby or Smith.ai",
    excerpt:
      "A practical roadmap for transitioning from a legacy answering service to AI-driven intake — without dropping a single live caller.",
    href: "/blog/switching-guide-legacy-to-claireai",
  },
];

const LIST_POSTS: Post[] = [
  {
    date: "Feb 8, 2026",
    title: "openClaw and legal AI: what law firms need to know in 2026",
    excerpt:
      "A deep dive into open-source AI agents reshaping legal workflows — and what to evaluate before deploying one in your intake stack.",
    href: "/blog/openclaw-legal-ai-automation",
  },
  {
    date: "Feb 5, 2026",
    title: "After-hours answering service for law firms: what actually works",
    excerpt:
      "42% of inbound law-firm calls happen after hours. The data behind which after-hours patterns convert into retained matters.",
    href: "/blog/after-hours-answering-service-law-firms",
  },
  {
    date: "Jan 30, 2026",
    title: "Priority intelligence: urgency-based routing for critical cases",
    excerpt:
      "How Claire detects DV, arraignment, statute-of-limitations, and emergency-custody urgency on the live call and routes to on-call counsel.",
    href: "/blog/urgency-based-smart-routing",
  },
  {
    date: "Jan 24, 2026",
    title: "Ethical by design: AI-powered conflict detection per Rule 1.18",
    excerpt:
      "Fuzzy-match conflict screening at the door — caller, opposing party, co-defendants, paramours, prior counsel — before any privileged fact lands.",
    href: "/blog/conflict-aware-intake-prevention",
  },
  {
    date: "Jan 16, 2026",
    title: "Context is king: why your law firm outgrew scripted answering services",
    excerpt:
      "Real intelligence means understanding context. Where the script-based answering model fails — and what replaces it.",
    href: "/blog/scripted-receptionist-end",
  },
  {
    date: "Jan 10, 2026",
    title: "How AI phone intake reduces malpractice risk at law firms",
    excerpt:
      "22% of malpractice claims trace back to intake errors — missed conflicts, missed deadlines, mis-routed urgency. A risk-management framework.",
    href: "/blog/ai-intake-reduces-malpractice-risk",
  },
];

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${BASE_URL}#blog`,
  url: BASE_URL,
  name: "ClaireAI Blog",
  description:
    "Research, guides, and insights on legal intake, AI receptionists, and law firm operations.",
  publisher: { "@id": "https://theclaireai.com/#organization" },
  blogPost: [FEATURED, ...GRID_POSTS, ...LIST_POSTS].map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    url: `https://theclaireai.com${p.href}`,
    datePublished: p.date,
  })),
};

function CardImagePlaceholder({ ratio = "aspect-[4/3]" }: { ratio?: string }) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-md bg-[#ecebe7]`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#0a0a0a]/5">
            <svg className="h-4 w-4 text-[#0a0a0a]/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-[11px] text-[#0a0a0a]/30">Article image</p>
        </div>
      </div>
    </div>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      {/* ─────────── Hero (full-width heading, Legora pattern) ─────────── */}
      <section className="bg-[#fafaf9] px-6 pt-24 md:pt-28">
        <div className="mx-auto max-w-[1680px]">
          <h1
            className="text-[#0a0a0a]"
            style={{
              fontSize: "48px",
              lineHeight: "1.0",
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            The latest from ClaireAI
          </h1>
        </div>
      </section>

      {/* ─────────── Featured article (text-left, image-right) ─────────── */}
      <section className="bg-[#fafaf9] px-6 pt-12 md:pt-14 pb-16 md:pb-20">
        <div className="mx-auto max-w-[1680px]">
          <Link href={FEATURED.href} className="group block">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-start">
              {/* Text left */}
              <div className="flex flex-col">
                <p className="text-[12px] text-[#0a0a0a]/70">Featured</p>
                <p className="mt-1 text-[12px] text-[#0a0a0a]/55">{FEATURED.date}</p>
                <h2
                  className="mt-8 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors max-w-[16ch]"
                  style={{
                    fontSize: "32px",
                    lineHeight: "1.1",
                    letterSpacing: "-0.01em",
                    fontWeight: 400,
                  }}
                >
                  {FEATURED.title}
                </h2>
                <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.55] text-[#0a0a0a]/55">
                  {FEATURED.excerpt}
                </p>
              </div>

              {/* Image right (landscape) */}
              <div>
                <CardImagePlaceholder ratio="aspect-[16/10]" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ─────────── Category filter (Legora flat pills) ─────────── */}
      <section className="bg-[#fafaf9] px-6 pb-10">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-wrap items-center gap-1">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                type="button"
                className={`rounded px-3 py-2 text-[12px] font-normal transition-colors ${
                  i === 0
                    ? "bg-[#0a0a0a] text-white"
                    : "bg-transparent text-[#0a0a0a]/85 hover:bg-[#0a0a0a]/[0.04]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 3-column grid of cards ─────────── */}
      <section className="bg-[#fafaf9] px-6 pb-20">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {GRID_POSTS.map((p) => (
              <Link key={p.href} href={p.href} className="group block">
                <CardImagePlaceholder ratio="aspect-[4/3]" />
                <div className="mt-5">
                  <p className="text-[12px] text-[#0a0a0a]/55">{p.date}</p>
                  <h3
                    className="mt-2 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors"
                    style={{
                      fontSize: "24px",
                      lineHeight: "1.1",
                      letterSpacing: "-0.012em",
                      fontWeight: 400,
                    }}
                  >
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.5] text-[#0a0a0a]/55 max-w-[44ch]">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── More stories (horizontal list, image right) ─────────── */}
      <section className="bg-[#fafaf9] px-6 pt-12 pb-20 md:pb-28">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55 mb-2">
            More stories
          </p>
          <div className="divide-y divide-[#0a0a0a]/[0.08]">
            {LIST_POSTS.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="group block py-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-16 items-start">
                  {/* Text left */}
                  <div className="lg:py-2">
                    <p className="text-[12px] text-[#0a0a0a]/55">{p.date}</p>
                    <h3
                      className="mt-2 text-[#0a0a0a] group-hover:text-[#0a0a0a]/70 transition-colors max-w-[32ch]"
                      style={{
                        fontSize: "24px",
                        lineHeight: "1.1",
                        letterSpacing: "-0.012em",
                        fontWeight: 400,
                      }}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.5] text-[#0a0a0a]/55 max-w-[56ch]">
                      {p.excerpt}
                    </p>
                  </div>
                  {/* Thumb right */}
                  <div>
                    <CardImagePlaceholder ratio="aspect-[16/10]" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Final CTA (sage radial — matches site pattern) ─────────── */}
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
            See what ClaireAI does on a live call.
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
