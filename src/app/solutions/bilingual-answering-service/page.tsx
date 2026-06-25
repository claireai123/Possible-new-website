import type { Metadata } from "next";
import Link from "next/link";
import { MetricTicker } from "@/components/sections/metric-ticker";
import { TrustGrid } from "@/components/sections/trust-grid";

const PUBLISHED = "2026-06-25";
const LAST_UPDATED = "2026-06-25";
const BASE_URL = "https://theclaireai.com/solutions/bilingual-answering-service";

export const metadata: Metadata = {
  title: "Bilingual Answering Service for Law Firms — Spanish, 24/7",
  description:
    "Spanish answering service for attorneys. Claire detects Spanish on the first phrase, runs full intake in Spanish, and translates transcripts for review. Bilingual, 24/7.",
  keywords: [
    "spanish answering service for attorneys",
    "bilingual law firm answering service",
    "bilingual answering service",
    "spanish answering service for lawyers",
    "spanish speaking answering service",
    "spanish legal intake",
    "bilingual virtual receptionist",
    "spanish virtual receptionist for lawyers",
    "spanish legal answering service",
    "bilingual answering service for law firms",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Bilingual Answering Service for Law Firms — Spanish and English, 24/7",
    description:
      "The bilingual answering service built for law firms. Claire detects Spanish on the first phrase, runs full intake in Spanish, translates transcripts for attorney review, and works 24/7.",
    url: BASE_URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_ANSWER = `ClaireAI is a bilingual answering service built for law firms. Claire detects Spanish on the caller's first phrase and runs your firm's entire intake in Spanish — capturing the matter, jurisdiction, and urgency, screening for conflicts under ABA Rule 1.18, grading the lead, and booking the consult — with seamless mid-call switching between Spanish and English. Every transcript is translated to English for attorney review, with the original Spanish stored alongside as a record of the caller's statements. It answers 24/7/365 with unlimited concurrent calls and writes every contact and matter into Clio, MyCase, or PracticePanther during the call. For firms serving Spanish-speaking communities, no qualified caller is lost at hello. Starts at $450/month.`;

const METRICS: { value: string; label: string; source: string }[] = [
  {
    value: "42M",
    label: "U.S. residents speak Spanish at home — the largest non-English language by far.",
    source: "U.S. Census Bureau",
  },
  {
    value: "5×",
    label: "conversion lift when a new lead is contacted within five minutes.",
    source: "Forrester / InsideSales",
  },
  {
    value: "24/7",
    label: "bilingual coverage — first-ring pickup in Spanish or English.",
    source: "ClaireAI uptime SLA",
  },
];

const FEATURES: { headline: string; body: string; img?: string; imgAlt?: string }[] = [
  {
    headline: "Spanish detected on the first phrase — not after a transfer.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779133195/ChatGPT_Image_May_18_2026_at_03_39_39_PM.jpg",
    imgAlt: "ClaireAI detecting Spanish on the caller's first phrase and continuing the call in Spanish — no hold, no transfer.",
    body: "Traditional bilingual answering services put Spanish-speaking callers on hold while they find a bilingual agent, or route them to voicemail after hours. Claire detects Spanish on the caller's very first words and continues the entire conversation in Spanish — no hold, no transfer, no \"please wait.\" English-speaking callers are handled the same way, instantly.",
  },
  {
    headline: "Full legal intake in Spanish — not just message-taking.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779201988/ChatGPT_Image_May_19_2026_at_10_46_10_AM.jpg",
    imgAlt: "ClaireAI running full legal intake and building a structured record from a Spanish-language call.",
    body: "Claire runs your complete qualifying flow in Spanish: matter type, jurisdiction, urgency, opposing party, and conflict screening under Rule 1.18. It grades the lead, books the consult, and dispatches a brief — the same depth of intake a Spanish-speaking caller would get from your best bilingual receptionist, on every call, around the clock.",
  },
  {
    headline: "Transcripts translated for your team — the original Spanish preserved.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779202793/ChatGPT_Image_May_19_2026_at_10_59_38_AM.jpg",
    imgAlt: "ClaireAI structuring the call details with the transcript captured for translated attorney review.",
    body: "Your attorneys don't need to speak Spanish to use the intake. Every Spanish call is transcribed and translated to English for review, with the original Spanish stored alongside as an accurate record of what the caller said. Mid-call English switching handles mixed-language households without missing a detail.",
  },
];

const RELATED: { area: string; desc: string; href: string; img: string }[] = [
  {
    area: "Legal Answering Service",
    desc: "24/7 first-ring answering, after-hours and overflow coverage, full intake and conflict screening — the AI answering service for law firms.",
    href: "/solutions/legal-answering-service",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1779204128/ChatGPT_Image_May_19_2026_at_11_21_51_AM.jpg",
  },
  {
    area: "Virtual Receptionist for Law Firms",
    desc: "First-ring pickup, calendar booking, call routing, and warm transfers — a 24/7 virtual receptionist tuned for legal callers.",
    href: "/solutions/virtual-receptionist",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1779125994/ChatGPT_Image_May_18_2026_at_01_39_38_PM.jpg",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is a bilingual answering service for a law firm?",
    answer:
      "A bilingual answering service answers a law firm's calls in both English and Spanish, so Spanish-speaking callers can be greeted, qualified, and helped without a language barrier. ClaireAI is an AI bilingual answering service: Claire detects Spanish on the caller's first phrase and runs your firm's entire intake in Spanish — capturing the matter, screening conflicts, grading the lead, and booking the consult — then translates the transcript to English for your team. It works 24/7 with no hold time and no transfer to a separate Spanish line.",
  },
  {
    question: "Is ClaireAI a Spanish answering service for attorneys specifically?",
    answer:
      "Yes. ClaireAI works as a Spanish answering service for attorneys and law firms across every practice area. Because so many high-value legal matters — personal injury, criminal defense, immigration-adjacent family law — disproportionately reach Spanish-speaking callers, capturing them in Spanish on the first call is often the difference between signing the client and losing them to the next firm. Claire qualifies the Spanish-speaking caller to the same depth as an English one.",
  },
  {
    question: "Does the caller get put on hold to wait for a Spanish speaker?",
    answer:
      "No. That hold-and-transfer step is exactly where most bilingual answering services lose Spanish-speaking callers. Claire detects Spanish on the first phrase and continues the entire conversation in Spanish immediately — no hold music, no \"un momento,\" no transfer to a separate line. It also handles mid-call switching for mixed-language households.",
  },
  {
    question: "Can my attorneys review Spanish calls if they don't speak Spanish?",
    answer:
      "Yes. Every Spanish call is transcribed and translated to English for attorney review, with the original Spanish stored alongside as an accurate record of the caller's statements. Your team gets a clear English brief — matter, jurisdiction, urgency, conflict-screen status, and lead grade — without needing to speak Spanish.",
  },
  {
    question: "Does the bilingual service work 24/7, including after hours?",
    answer:
      "Yes. Claire answers in Spanish or English 24/7/365 — including nights, weekends, and holidays — with unlimited concurrent calls. After-hours coverage matters most for Spanish-speaking callers, who are even less likely to leave a voicemail when they reach a recording in a language other than their own.",
  },
  {
    question: "Does Claire integrate with Clio, MyCase, and PracticePanther for Spanish intake?",
    answer:
      "Yes — natively. Claire writes contacts, matters, intake notes, briefs, and call recordings into Clio Grow, MyCase, PracticePanther, Smokeball, Rocket Matter, and CosmoLex during the call, with the translated English transcript and the original Spanish both attached. No copy-paste, no Zapier middleware.",
  },
  {
    question: "What does a bilingual answering service cost with ClaireAI?",
    answer:
      "ClaireAI starts at $450/month with 24/7 bilingual answering, full Spanish-language intake, conflict screening, consult booking, transcript translation, and CRM sync — no per-call surcharge and no premium for Spanish-language calls. Most firms replace a human bilingual answering service that bills per minute. See the pricing page for current plans.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://theclaireai.com/solutions" },
    { "@type": "ListItem", position: 3, name: "Bilingual Answering Service", item: BASE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${BASE_URL}#webapp`,
  inLanguage: "en-US",
  name: "ClaireAI — Bilingual Answering Service for Law Firms",
  alternateName: "Spanish Answering Service for Attorneys",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Bilingual Legal Answering Service",
  operatingSystem: "Web, iOS, Android",
  description: STAGE_ANSWER,
  url: BASE_URL,
  provider: { "@id": "https://theclaireai.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType: "U.S. law firms serving Spanish-speaking clients across all practice areas",
  },
  offers: {
    "@type": "AggregateOffer",
    url: "https://theclaireai.com/pricing",
    lowPrice: "450",
    highPrice: "1800",
    priceCurrency: "USD",
    offerCount: 3,
  },
  featureList: [
    "Spanish detection on the caller's first phrase — no hold, no transfer",
    "Full legal intake conducted in Spanish",
    "Seamless mid-call switching between Spanish and English",
    "Transcripts translated to English with original Spanish preserved",
    "Conflict screening per ABA Rule 1.18",
    "24/7/365 bilingual coverage with unlimited concurrent calls",
    "A–D lead grading and consult booking",
    "Native sync with Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex",
    "Flat monthly pricing — no per-call or Spanish-language premium",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-US",
  headline: "Bilingual Answering Service for Law Firms — Spanish and English, 24/7",
  description: STAGE_ANSWER,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: { "@id": "https://theclaireai.com/#organization" },
  publisher: { "@id": "https://theclaireai.com/#organization" },
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "Bilingual Legal Answering Service" },
  keywords: [
    "spanish answering service for attorneys",
    "bilingual law firm answering service",
    "bilingual answering service",
    "spanish legal intake",
    "bilingual virtual receptionist",
  ].join(", "),
};

export default function BilingualAnsweringServicePage() {
  return (
    <main className="min-h-[100dvh] bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      {/* ─────────── Hero ─────────── */}
      <section className="bg-white px-6 pt-20 sm:pt-28 md:pt-36 pb-16">
        <div className="mx-auto max-w-[1680px] text-center">
          <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
            <span className="text-[#0a0a0a]/40">SOLUTIONS</span>
            <span className="mx-3 text-[#0a0a0a]/25">·</span>
            <span className="text-[#0a0a0a]">Bilingual Answering Service</span>
          </p>
          <h1
            className="mt-8 text-[#0a0a0a] mx-auto"
            style={{
              fontSize: "clamp(2.25rem, 6vw, 84px)",
              lineHeight: "1.04",
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: "min(20ch, 100%)",
            }}
          >
            No Spanish-speaking caller lost at hello.
          </h1>
          <p className="mx-auto mt-7 max-w-[52ch] text-[16px] md:text-[17px] leading-[1.55] text-[#0a0a0a]/60">
            ClaireAI detects Spanish on the first phrase, runs your full intake in Spanish, and translates every transcript for your team — bilingual, 24/7, no hold and no transfer.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#e8e6e1] px-6 py-3 text-[14.5px] text-[#0a0a0a] transition-colors hover:bg-[#0a0a0a] hover:text-white"
            >
              Book a demo
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── Hero image (full-width wide) ─────────── */}
      <section className="bg-white px-6 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1680px]">
          <div className="relative aspect-[5/4] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src="https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_16:9,w_1920,q_auto,f_auto/v1774646534/dane-deaner-_-KLkj7on_c-unsplash_jgkqae.jpg"
              alt="Law-firm conference room with a city view — ClaireAI answers Spanish-speaking callers on the first ring"
              className="h-full w-full object-cover"
              width="1920"
              height="1080"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* ─────────── Metric strip ─────────── */}
      <section className="bg-white px-6 pt-4 md:pt-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16 items-start">
            <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
              ClaireAI in Spanish and English
            </p>
            {METRICS.map((m, i) => (
              <div key={i}>
                <p
                  className="text-[#0a0a0a] font-sans"
                  style={{
                    fontSize: "clamp(3rem, 5.5vw, 96px)",
                    lineHeight: "1.0",
                    letterSpacing: "-0.025em",
                    fontWeight: 300,
                  }}
                >
                  <MetricTicker value={m.value} delay={i * 0.18} />
                </p>
                <p className="mt-6 text-[15px] md:text-[16px] leading-[1.45] text-[#0a0a0a]/55 max-w-[28ch]">
                  {m.label}
                </p>
                <p className="mt-3 text-[12px] uppercase tracking-[0.16em] text-[#0a0a0a]/35">
                  {m.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Section lead ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/[0.06]">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55 mb-8">
            Why ClaireAI
          </p>
          <h2
            className="text-[#0a0a0a] max-w-[24ch]"
            style={{
              fontSize: "clamp(1.5rem, 2.8vw, 40px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            <span className="text-[#0a0a0a]">Real bilingual intake — not a transfer to a Spanish line.</span>{" "}
            <span className="text-[#0a0a0a]/60">
              Detected, qualified, and translated for your team — 24/7.
            </span>
          </h2>
        </div>
      </section>

      {/* ─────────── Three feature subsections — alternating bento ─────────── */}
      {FEATURES.map((f, idx) => {
        const textLeft = idx % 2 === 0;
        const firstClasses = idx === 0 ? "pt-4 md:pt-6" : "";
        return (
          <section key={idx} className={`bg-white px-6 pb-10 md:pb-16 ${firstClasses}`}>
            <div className="mx-auto max-w-[1680px]">
              <div
                className={`grid grid-cols-1 gap-6 lg:gap-8 items-start ${
                  textLeft ? "lg:grid-cols-[1fr_1.6fr]" : "lg:grid-cols-[1.6fr_1fr]"
                }`}
              >
                <div
                  className={`flex flex-col justify-start lg:pr-10 ${
                    textLeft ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <h3
                    className="text-[#0a0a0a]"
                    style={{
                      fontSize: "17px",
                      lineHeight: "1.3",
                      letterSpacing: "-0.01em",
                      fontWeight: 600,
                    }}
                  >
                    {f.headline}
                  </h3>
                  <p className="mt-4 text-[15px] md:text-[15.5px] leading-[1.55] text-[#0a0a0a]/60">
                    {f.body}
                  </p>
                </div>

                <div className={textLeft ? "lg:order-2" : "lg:order-1"}>
                  {f.img ? (
                    <img
                      src={f.img}
                      alt={f.imgAlt ?? ""}
                      className="block w-full h-auto rounded-2xl"
                      loading={idx === 0 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : "auto"}
                    />
                  ) : (
                    <div
                      className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl"
                      style={{ backgroundColor: "#f5f4f1" }}
                    >
                      <div className="text-center">
                        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a]/5">
                          <svg className="h-5 w-5 text-[#0a0a0a]/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-[13px] text-[#0a0a0a]/60">Feature mockup placeholder</p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/20">16 : 10</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─────────── Security & privacy ─────────── */}
      <TrustGrid variant="default" />

      {/* ─────────── Related solutions ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#0a0a0a]/[0.06]">
        <div className="mx-auto max-w-[1680px]">
          <h2 className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55 mb-12 font-normal">
            Related solutions
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {RELATED.map((item) => (
              <Link
                key={item.area}
                href={item.href}
                className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={item.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div
                  className="absolute inset-x-0 bottom-0 pt-16 sm:pt-24 pb-7 px-7"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 45%, rgba(0,0,0,0) 100%)",
                  }}
                >
                  <h3
                    className="text-white font-sans"
                    style={{
                      fontSize: "18px",
                      lineHeight: "1.25",
                      letterSpacing: "-0.01em",
                      fontWeight: 500,
                    }}
                  >
                    {item.area}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.45] text-white/80 max-w-[32ch]">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#0a0a0a]/[0.06]">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
            FAQ
          </p>
          <h2
            className="text-[#0a0a0a] max-w-[28ch] mb-16"
            style={{
              fontSize: "clamp(2rem, 4vw, 56px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Bilingual intake, answered.
          </h2>
          <div className="border-t border-[#0a0a0a]/[0.06]">
            {FAQS.map((f, idx) => (
              <details
                key={idx}
                className="group border-b border-[#0a0a0a]/[0.06] [&_summary::-webkit-details-marker]:hidden"
              >
                <summary
                  className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 text-[#0a0a0a] hover:text-[#0a0a0a]/70 transition-colors"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  <span className="text-[18px] md:text-[20px] leading-[1.3] font-medium">
                    {f.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#0a0a0a]/15 text-[#0a0a0a]/55 transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-8 text-[15.5px] md:text-[16px] leading-[1.6] text-[#0a0a0a]/65 max-w-[120ch]">
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Final CTA ─────────── */}
      <section
        className="px-6 py-20 md:py-[120px]"
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
            className="text-[#0a0a0a] max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Answer every caller in their language.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire running a live Spanish-language intake call calibrated to your firm&apos;s script and CRM.
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
    </main>
  );
}
