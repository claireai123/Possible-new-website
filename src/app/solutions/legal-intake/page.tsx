import type { Metadata } from "next";
import Link from "next/link";
import { MetricTicker } from "@/components/sections/metric-ticker";
import { TrustGrid } from "@/components/sections/trust-grid";

const PUBLISHED = "2026-06-25";
const LAST_UPDATED = "2026-06-25";
const BASE_URL = "https://theclaireai.com/solutions/legal-intake";

export const metadata: Metadata = {
  title: "Legal Intake Service — AI New-Client Intake for Law Firms",
  description:
    "AI legal intake service. Claire runs your qualifying script on every call, screens conflicts, grades the lead, books the consult, and dispatches the retainer. 24/7, bilingual.",
  keywords: [
    "legal intake service",
    "legal intake services",
    "legal intake call center",
    "law firm intake service",
    "intake service for law firms",
    "legal intake answering service",
    "client intake for law firms",
    "new client intake service",
    "attorney intake service",
    "legal intake automation",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Legal Intake Service — AI New-Client Intake for Law Firms",
    description:
      "The AI legal intake service for law firms. Claire runs your qualifying script on every call, screens conflicts under Rule 1.18, grades the lead, books the consult, and dispatches the retainer. 24/7, bilingual.",
    url: BASE_URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_ANSWER = `ClaireAI is an AI legal intake service for law firms. On every inbound call — 24/7/365 — Claire runs your firm's new-client intake script, captures the matter, jurisdiction, and urgency, screens for conflicts under ABA Rule 1.18, grades the lead A through D with Lead IQ, books the consult on your calendar, and dispatches a DocuSign retainer to pre-cleared grade-A leads. Every contact, matter, intake note, and recording is written into Clio, MyCase, or PracticePanther during the call, so your team gets structured, qualified matters instead of message slips. It replaces an outsourced intake call center or a human intake coordinator, handles unlimited concurrent calls, and runs bilingually in English and Spanish. Starts at $450/month.`;

const METRICS: { value: string; label: string; source: string }[] = [
  {
    value: "5×",
    label: "conversion lift when a new lead is contacted within five minutes.",
    source: "Forrester / InsideSales",
  },
  {
    value: "62%",
    label: "of callers who reach a law firm's voicemail hang up without leaving a message.",
    source: "Industry call-tracking benchmarks",
  },
  {
    value: "24/7",
    label: "intake coverage with unlimited concurrent calls — every new client captured.",
    source: "ClaireAI uptime SLA",
  },
];

const FEATURES: { headline: string; body: string; img?: string; imgAlt?: string }[] = [
  {
    headline: "Your qualifying script, run perfectly on every call.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779129517/ChatGPT_Image_May_18_2026_at_02_38_21_PM.jpg",
    imgAlt: "ClaireAI running a firm's qualifying script live and building a structured intake record on the call.",
    body: "Claire runs your firm's intake flow exactly as written — matter type, jurisdiction, key dates, opposing party, and fee posture — on every call, with no skipped questions and no off-script improvisation. It captures the facts that decide whether a caller is a fit before a human ever picks up, so your team spends time on qualified matters, not triage.",
  },
  {
    headline: "Conflict screening and A–D lead grading before the lead reaches you.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779205248/ChatGPT_Image_May_19_2026_at_11_39_07_AM.jpg",
    imgAlt: "ClaireAI conflict-screening a prospective client against the CRM and grading the lead before it reaches the attorney.",
    body: "Claire screens every prospective client for conflicts under ABA Rule 1.18 against your CRM, then grades the lead A through D with Lead IQ against your rubric — matter value, urgency, jurisdiction, and fee fit. A-grade leads reach an attorney in minutes; lower grades enter the right nurture or referral path. Read how Lead IQ scores and routes a call.",
  },
  {
    headline: "Consult booked, retainer dispatched, CRM updated — on the call.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779204750/ChatGPT_Image_May_19_2026_at_11_32_15_AM.jpg",
    imgAlt: "Example ClaireAI brief produced on the call — matter, score, and next steps written back to the CRM.",
    body: "For qualified callers, Claire books the consult on your calendar and, for pre-cleared grade-A leads, e-sends your DocuSign retainer before the call ends. Every contact, matter, intake note, and recording is written into Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, or CosmoLex live — no copy-paste, no after-the-fact data entry.",
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
    question: "What is a legal intake service, and how does ClaireAI's work?",
    answer:
      "A legal intake service handles a law firm's new-client intake — qualifying callers, capturing the matter, screening for conflicts, and getting promising leads booked and signed. ClaireAI is an AI legal intake service: on every call, Claire runs your qualifying script, screens conflicts under ABA Rule 1.18, grades the lead A–D with Lead IQ, books the consult, dispatches the retainer to pre-cleared grade-A leads, and writes everything into your CRM. Your team receives structured, qualified matters instead of voicemail slips, 24/7.",
  },
  {
    question: "Is ClaireAI a replacement for an outsourced legal intake call center?",
    answer:
      "Yes. A traditional legal intake call center staffs human agents who follow a script and bill per call or per minute, with quality that varies by agent and shift. ClaireAI runs your intake flow identically on every call, screens conflicts, grades leads, books consults, and updates your CRM — at a flat monthly rate, with unlimited concurrency and no after-hours gaps. For a deeper comparison, see our guide on whether to outsource legal intake.",
  },
  {
    question: "Does the intake service work for solo attorneys and small law firms?",
    answer:
      "Yes — it's a force multiplier for solo and small firms that can't staff a dedicated intake coordinator. Claire captures and qualifies every new client around the clock, so a solo attorney in court or with a client never loses a lead to voicemail. You get the intake operation of a large firm without the headcount.",
  },
  {
    question: "How does Claire qualify and grade a legal intake lead?",
    answer:
      "Claire runs your firm's qualifying rubric on the call and grades each lead A through D with Lead IQ, weighing matter type and value, urgency, jurisdiction, conflict-screen status, and fee fit. A grades route to an attorney within minutes; B grades book a consult; C grades enter nurture; D grades (out of jurisdiction, conflicts, non-fit) route to referral. The rubric is tuned to your firm and improves from your intake team's overrides.",
  },
  {
    question: "Does the intake service screen for conflicts of interest?",
    answer:
      "Yes — before any privileged case fact is shared. Claire collects the caller, the matter, and the relevant parties up front, runs a fuzzy-match conflict check against your CRM contacts and matters in real time, and, if a conflict surfaces, takes only a name and number and routes the lead to your conflict-clearance workflow. This satisfies ABA Model Rule 1.18 prospective-client confidentiality at the front door.",
  },
  {
    question: "Can Claire send a retainer agreement during the intake call?",
    answer:
      "For pre-cleared grade-A leads with a clean conflict screen, yes. Claire confirms the prospect's name, contact details, and engagement scope on the call, then e-sends your firm's DocuSign retainer (firm-branded, your fee schedule) within seconds. Lower-grade leads enter your standard nurture flow instead.",
  },
  {
    question: "Does the intake service integrate with Clio, MyCase, and PracticePanther?",
    answer:
      "Yes — natively. Claire writes contacts, matters, intake notes, lead grades, briefs, and call recordings into Clio Grow, MyCase, PracticePanther, Smokeball, Rocket Matter, and CosmoLex during the call. No copy-paste, no Zapier middleware, no manual entry after the fact.",
  },
  {
    question: "What does a legal intake service cost with ClaireAI?",
    answer:
      "ClaireAI starts at $450/month with 24/7 intake, conflict screening, Lead IQ grading, consult booking, retainer dispatch, and CRM sync — no per-call or per-lead surcharge. Most firms replace an outsourced intake call center or a $4,000+/month intake coordinator. See the pricing page for current plans.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://theclaireai.com/solutions" },
    { "@type": "ListItem", position: 3, name: "Legal Intake", item: BASE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${BASE_URL}#webapp`,
  inLanguage: "en-US",
  name: "ClaireAI — Legal Intake Service",
  alternateName: "AI New-Client Intake for Law Firms",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Legal Intake Service",
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
    "Your new-client qualifying script run on every call, 24/7/365",
    "Conflict screening per ABA Rule 1.18 before any case fact",
    "A–D lead grading with Lead IQ",
    "Consult booking on your calendar",
    "DocuSign retainer dispatch to pre-cleared grade-A leads",
    "Live CRM write-back of contacts, matters, notes, and recordings",
    "Unlimited concurrent calls — no missed new clients",
    "Bilingual English and Spanish intake",
    "Flat monthly pricing — no per-call or per-lead surcharge",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-US",
  headline: "Legal Intake Service — AI New-Client Intake for Law Firms",
  description: STAGE_ANSWER,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: { "@id": "https://theclaireai.com/#organization" },
  publisher: { "@id": "https://theclaireai.com/#organization" },
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "Legal Intake Service" },
  keywords: [
    "legal intake service",
    "legal intake services",
    "legal intake call center",
    "law firm intake service",
    "client intake for law firms",
  ].join(", "),
};

export default function LegalIntakePage() {
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
            <span className="text-[#0a0a0a]">Legal Intake</span>
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
            Legal intake that qualifies, books, and signs — on the first call.
          </h1>
          <p className="mx-auto mt-7 max-w-[52ch] text-[16px] md:text-[17px] leading-[1.55] text-[#0a0a0a]/60">
            ClaireAI runs your new-client intake on every call, 24/7 — screens conflicts, grades the lead, books the consult, dispatches the retainer, and updates your CRM. Bilingual.
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
              src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779136334/ChatGPT_Image_May_18_2026_at_04_31_59_PM.jpg"
              alt="Law-firm building entrance — ClaireAI runs new-client intake on every call, 24/7"
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
              ClaireAI for new-client intake
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
            <span className="text-[#0a0a0a]">Intake that qualifies the lead, not just records it.</span>{" "}
            <span className="text-[#0a0a0a]/60">
              Screened, graded, booked, and signed — on the first call.
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

      {/* ─────────── Intake resources (topic cluster cross-links) ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/[0.06]">
        <div className="mx-auto max-w-[1680px]">
          <h2 className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55 mb-8 font-normal">
            Legal intake resources
          </h2>
          <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2 text-[16px] md:text-[17px] leading-[1.5]">
            <li>
              <Link href="/blog/2026-legal-intake-benchmark-report" className="text-[#0a0a0a]/75 underline decoration-[#0a0a0a]/20 underline-offset-4 hover:text-[#0a0a0a]">
                2026 Legal Intake Benchmark Report
              </Link>
            </li>
            <li>
              <Link href="/blog/outsource-legal-intake-guide" className="text-[#0a0a0a]/75 underline decoration-[#0a0a0a]/20 underline-offset-4 hover:text-[#0a0a0a]">
                Should you outsource legal intake?
              </Link>
            </li>
            <li>
              <Link href="/blog/legal-intake-question-bank" className="text-[#0a0a0a]/75 underline decoration-[#0a0a0a]/20 underline-offset-4 hover:text-[#0a0a0a]">
                The legal intake question bank
              </Link>
            </li>
            <li>
              <Link href="/blog/open-source-legal-intake-software-2026" className="text-[#0a0a0a]/75 underline decoration-[#0a0a0a]/20 underline-offset-4 hover:text-[#0a0a0a]">
                Open-source legal intake software in 2026
              </Link>
            </li>
          </ul>
        </div>
      </section>

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
            Legal intake, answered.
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
            Turn every call into a qualified matter.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire running a live new-client intake calibrated to your firm&apos;s qualifying rubric, conflict rules, and CRM.
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
