import type { Metadata } from "next";
import Link from "next/link";
import { MetricTicker } from "@/components/sections/metric-ticker";
import { TrustGrid } from "@/components/sections/trust-grid";

const PUBLISHED = "2026-06-25";
const LAST_UPDATED = "2026-06-25";
const BASE_URL = "https://theclaireai.com/solutions/legal-answering-service";

export const metadata: Metadata = {
  title: "Legal Answering Service — AI, 24/7",
  description:
    "AI legal answering service for law firms. Answers every call 24/7, qualifies the caller, runs conflict checks, books the consult, and dispatches a brief. Bilingual.",
  keywords: [
    "legal answering service",
    "attorney answering service",
    "law firm answering service",
    "answering service for lawyers",
    "lawyer answering service",
    "answering service for law firms",
    "24/7 legal answering service",
    "AI answering service for law firms",
    "after hours answering service law firm",
    "phone answering service for lawyers",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Legal Answering Service — AI Answering Service for Law Firms, 24/7",
    description:
      "Every call answered on the first ring, qualified, conflict-screened, and booked — 24/7/365. The AI legal answering service that does intake, not just message-taking. Bilingual.",
    url: BASE_URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_ANSWER = `ClaireAI is an AI legal answering service built for law firms. Unlike a traditional answering service that takes a message and hangs up, Claire picks up on the first ring 24/7/365 — no IVR, no hold music — runs your firm's intake script, captures the caller's matter, jurisdiction, and urgency, screens for conflicts under ABA Rule 1.18, grades the lead A through D, books the consult on your calendar, and dispatches a one-page brief to the right attorney within seconds. It works as an answering service for attorneys across every practice area, handles after-hours and overflow calls, syncs natively to Clio, MyCase, and PracticePanther, and is bilingual in English and Spanish out of the box. Firms typically replace a $2,500–$4,500/month human answering service with ClaireAI starting at $450/month.`;

const METRICS: { value: string; label: string; source: string }[] = [
  {
    value: "62%",
    label: "of callers who reach a law firm's voicemail hang up without leaving a message.",
    source: "Industry call-tracking benchmarks",
  },
  {
    value: "5×",
    label: "conversion lift when a new lead is contacted within five minutes.",
    source: "Forrester / InsideSales",
  },
  {
    value: "24/7",
    label: "first-ring pickup — nights, weekends, holidays, and call overflow.",
    source: "ClaireAI uptime SLA",
  },
];

const FEATURES: { headline: string; body: string; img?: string; imgAlt?: string }[] = [
  {
    headline: "Every call answered on the first ring — not sent to voicemail.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779129517/ChatGPT_Image_May_18_2026_at_02_38_21_PM.jpg",
    imgAlt: "ClaireAI capturing an inbound call into a structured client record live as it is answered — every caller logged, none sent to voicemail.",
    body: "A traditional answering service queues callers and reads from a generic script; a missed call is a missed client. Claire answers instantly, 24/7/365, with no IVR tree and no hold music. After-hours, lunch-hour, and overflow calls are picked up the same way your best receptionist would — except Claire never goes home and handles unlimited calls at once.",
  },
  {
    headline: "Intake, not message-taking — the caller is qualified before they hang up.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779201988/ChatGPT_Image_May_19_2026_at_10_46_10_AM.jpg",
    imgAlt: "ClaireAI running a firm's intake flow on the call and building a structured, qualified record before the caller hangs up.",
    body: "Most answering services for lawyers just collect a name and number. Claire runs your firm's qualifying flow on the call: matter type, jurisdiction, urgency, opposing party, and fee posture. It screens for conflicts under Rule 1.18, grades the lead A–D, books the consult, and writes the matter into your CRM — so your team wakes up to booked consults, not a stack of pink slips.",
  },
  {
    headline: "Bilingual, brand-accurate, and tuned to your practice areas.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779133195/ChatGPT_Image_May_18_2026_at_03_39_39_PM.jpg",
    imgAlt: "ClaireAI detecting the caller's language on the first phrase and running bilingual intake tuned to the firm's practice areas.",
    body: "Claire detects Spanish on the first phrase and runs the entire intake bilingually, with transcripts translated for attorney review. The script is calibrated to how your firm actually talks — your intake questions, your conflict rules, your fee schedule — so callers can't tell it from your front desk. One answering service, every practice area you run.",
  },
];

const RELATED: { area: string; desc: string; href: string; img: string }[] = [
  {
    area: "Virtual Receptionist for Law Firms",
    desc: "First-ring pickup, calendar booking, call routing, and warm transfers — a 24/7 virtual receptionist tuned for legal callers.",
    href: "/solutions/virtual-receptionist",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1779125994/ChatGPT_Image_May_18_2026_at_01_39_38_PM.jpg",
  },
  {
    area: "Legal Intake Service",
    desc: "Full new-client intake: qualifying script, conflict screening, lead grading, retainer dispatch, and CRM write-back on every call.",
    href: "/solutions/legal-intake",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1774646534/dane-deaner-_-KLkj7on_c-unsplash_jgkqae.jpg",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is a legal answering service, and how is ClaireAI different?",
    answer:
      "A legal answering service answers a law firm's inbound calls when the firm can't — after hours, during overflow, or around the clock. A traditional service is a human call center that takes a message and forwards it. ClaireAI is an AI legal answering service: Claire answers on the first ring 24/7, runs your firm's intake script, qualifies the caller, screens for conflicts, books the consult, and writes the matter into your CRM during the call. You get booked consults and structured matters instead of message slips.",
  },
  {
    question: "Does ClaireAI work as an answering service for attorneys and law firms of any size?",
    answer:
      "Yes. ClaireAI works as an answering service for solo attorneys, boutique firms, and high-volume multi-office practices alike. Because Claire handles unlimited concurrent calls, it never gives a busy signal during a spike — every caller is answered on the first ring, qualified, and routed. Intake scripts ship pre-calibrated for personal injury, criminal defense, and family law, and are fully customizable to your firm's matters and rules.",
  },
  {
    question: "Is ClaireAI a 24/7 answering service, including nights, weekends, and holidays?",
    answer:
      "Yes — Claire answers 24/7/365 with first-ring pickup on nights, weekends, holidays, and lunch hours. It also handles daytime overflow: when your front desk is on another line, the call rolls to Claire instead of voicemail. Roughly two-thirds of callers sent to voicemail hang up without leaving a message, so after-hours and overflow coverage is where a legal answering service recovers the most clients.",
  },
  {
    question: "How is an AI answering service better than a human call center for lawyers?",
    answer:
      "A human answering service for lawyers is limited by staffing, queue times, and per-minute or per-call billing, and it usually can't do more than take a message. ClaireAI answers instantly, never queues, handles unlimited calls at once, and actually qualifies the caller — conflict screening, lead grading, consult booking, and CRM write-back — at a flat monthly rate with no per-call surcharge. It also doesn't have turnover, sick days, or off-script calls.",
  },
  {
    question: "Does ClaireAI just take messages, or does it actually do intake?",
    answer:
      "It does full intake. Claire runs your firm's qualifying flow on the call, captures the matter and jurisdiction, screens for conflicts under ABA Rule 1.18, grades the lead A–D with Lead IQ, books the consult, and dispatches a one-page brief to the right attorney — then writes the contact, matter, and recording into your CRM. See the dedicated legal intake service for how the full new-client intake flow works.",
  },
  {
    question: "Can ClaireAI answer law firm calls in Spanish?",
    answer:
      "Yes. Claire detects Spanish on the first phrase and runs the entire intake bilingually, with mid-call English switching and transcripts translated for attorney review. Firms with significant Spanish-speaking caller volume can run a dedicated bilingual answering service configuration so no qualified caller is lost at hello.",
  },
  {
    question: "Does ClaireAI integrate with Clio, MyCase, and PracticePanther?",
    answer:
      "Yes — natively. Claire writes contacts, matters, intake notes, briefs, and call recordings into Clio Grow, MyCase, PracticePanther, Smokeball, Rocket Matter, and CosmoLex during the call. No copy-paste, no Zapier middleware, no manual data entry after the fact.",
  },
  {
    question: "What does a legal answering service cost with ClaireAI?",
    answer:
      "ClaireAI starts at $450/month with 24/7 first-ring answering, intake, conflict screening, consult booking, and CRM sync — no per-call or per-minute surcharge and no after-hours premium. Most firms replace a $2,500–$4,500/month human answering service or a $4,000+/month FTE receptionist. See the answering service pricing comparison for a side-by-side, or the pricing page for current plans.",
  },
  {
    question: "How fast can ClaireAI go live as our answering service?",
    answer:
      "Most firms are live within days. We calibrate Claire to your intake script, conflict rules, calendar, and CRM, run test calls against your rubric, then point your after-hours and overflow forwarding to Claire. You can start with after-hours and overflow only, then expand to 24/7 primary answering once you've watched the transcripts.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://theclaireai.com/solutions" },
    { "@type": "ListItem", position: 3, name: "Legal Answering Service", item: BASE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${BASE_URL}#webapp`,
  inLanguage: "en-US",
  name: "ClaireAI — Legal Answering Service",
  alternateName: "AI Answering Service for Law Firms",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Legal Answering Service",
  operatingSystem: "Web, iOS, Android",
  description: STAGE_ANSWER,
  url: BASE_URL,
  provider: { "@id": "https://theclaireai.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType: "U.S. law firms — solo, boutique, and multi-office practices across all practice areas",
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
    "First-ring pickup on every call, 24/7/365 — nights, weekends, holidays, overflow",
    "Unlimited concurrent calls — never a busy signal",
    "Full legal intake: qualifying script, matter and jurisdiction capture",
    "Conflict screening per ABA Rule 1.18",
    "A–D lead grading with one-page brief",
    "Consult booking on your calendar",
    "Bilingual English and Spanish intake",
    "Native sync with Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex",
    "Flat monthly pricing — no per-call or after-hours surcharge",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-US",
  headline: "Legal Answering Service — AI Answering Service for Law Firms, 24/7",
  description: STAGE_ANSWER,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: { "@id": "https://theclaireai.com/#organization" },
  publisher: { "@id": "https://theclaireai.com/#organization" },
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "Legal Answering Service" },
  keywords: [
    "legal answering service",
    "attorney answering service",
    "law firm answering service",
    "answering service for lawyers",
    "24/7 legal answering service",
    "AI answering service for law firms",
  ].join(", "),
};

export default function LegalAnsweringServicePage() {
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
            <span className="text-[#0a0a0a]">Legal Answering Service</span>
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
            The legal answering service that does intake, not message-taking.
          </h1>
          <p className="mx-auto mt-7 max-w-[52ch] text-[16px] md:text-[17px] leading-[1.55] text-[#0a0a0a]/60">
            ClaireAI answers every call on the first ring, 24/7 — qualifies the caller, screens for conflicts, books the consult, and briefs the right attorney. The AI answering service built for law firms.
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
              src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779204128/ChatGPT_Image_May_19_2026_at_11_21_51_AM.jpg"
              alt="Modern law-firm reception desk — ClaireAI answers every inbound call 24/7"
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
              ClaireAI as your answering service
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
            <span className="text-[#0a0a0a]">An answering service for lawyers that qualifies the caller.</span>{" "}
            <span className="text-[#0a0a0a]/60">
              Every call answered, screened, booked, and briefed — 24/7.
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
            Legal answering service, answered.
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
            Stop sending callers to voicemail.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire answering a live legal intake call calibrated to your firm&apos;s script, conflict rules, and CRM.
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
