import type { Metadata } from "next";
import Link from "next/link";
import { MetricTicker } from "@/components/sections/metric-ticker";
import { TrustGrid } from "@/components/sections/trust-grid";

const PUBLISHED = "2026-05-18";
const LAST_UPDATED = "2026-05-18";
const BASE_URL = "https://theclaireai.com/solutions/family-law";

export const metadata: Metadata = {
  title: "Family Law Intake — AI Receptionist | ClaireAI",
  description:
    "AI receptionist for family law. Empathetic pacing, DV escalation, Rule 1.18 conflict checks, deadline tracking, bilingual intake.",
  keywords: [
    "AI receptionist family law",
    "family law intake automation",
    "divorce law firm answering service",
    "custody intake 24/7",
    "domestic violence intake AI",
    "Clio family law integration",
    "MyCase intake family law",
    "Smokeball family law AI",
    "family law lead qualification",
    "family law conflict check",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Family Law Intake — AI Receptionist for Divorce, Custody, and DV Firms",
    description:
      "Empathetic pacing, DV escalation, conflict screening, deadline tracking, bilingual intake, retainer dispatch. Built for family law.",
    url: BASE_URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_ANSWER = `ClaireAI is the AI receptionist purpose-built for family law intake. Claire picks up on the first ring — no IVR, no hold music — runs your firm's family-law qualifying flow with empathetic pacing, captures the case type (divorce, legal separation, custody, support, modification, DV/PFA), screens for conflicts under Rule 1.18 before any privileged detail is shared, flags emergency signals (domestic violence, child abduction risk, financial waste, court-ordered deadlines), books the consult, grades the lead A through D, and dispatches a one-page Claire's Brief to your intake team within seconds. Bilingual English and Spanish out of the box.`;

const METRICS: { value: string; label: string; source: string }[] = [
  {
    value: "35%",
    label: "of inbound legal calls go unanswered today.",
    source: "ClaireAI 2026 Legal Intake Benchmark (1,000 firms)",
  },
  {
    value: "30 days",
    label: "typical response deadline to a divorce or custody petition.",
    source: "State rules of civil procedure",
  },
  {
    value: "5×",
    label: "conversion lift when leads are contacted within five minutes.",
    source: "Forrester / InsideSales",
  },
];

const FEATURES: { headline: string; body: string; img?: string; imgAlt?: string }[] = [
  {
    headline: "Empathetic intake calibrated for family-law callers.",
    body: "Family-law prospects often call at the worst moment — separation, custody dispute, DV, served papers. Claire validates, slows the pace, and captures case type, opposing party, children, prior orders, and jurisdiction in your CRM without re-traumatizing the caller.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779201988/ChatGPT_Image_May_19_2026_at_10_46_10_AM.jpg",
    imgAlt: "ClaireAI empathetic family-law intake — distressed-caller pacing with structured CRM record built live on the call",
  },
  {
    headline: "DV and emergency-signal escalation, on the line.",
    body: "Claire detects domestic violence, child abduction risk, financial waste, and ex-parte urgency in real time. Emergencies warm-transfer to on-call counsel with a pre-briefed handoff. If unavailable, Claire offers 911 and the National DV Hotline (1-800-799-7233) and pages your escalation chain by SMS, push, and voice.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779202513/ChatGPT_Image_May_19_2026_at_10_54_57_AM.jpg",
    imgAlt: "ClaireAI family-law DV and emergency-signal escalation — domestic violence, child abduction risk, and ex-parte urgency detected and warm-transferred to on-call attorney",
  },
  {
    headline: "Conflict screening before a single privileged detail.",
    body: "Family law has the highest conflict-rate of any practice — spouses, paramours, in-laws, prior counsel. Claire collects caller, opposing party's full legal name, prior counsel, and related parties up front, then runs a fuzzy-match conflict check against your CRM before any case facts. Rule 1.18 prospective-client confidentiality, enforced at the door.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779202793/ChatGPT_Image_May_19_2026_at_10_59_38_AM.jpg",
    imgAlt: "ClaireAI family-law conflict screening — fuzzy-match check against caller, opposing party, prior counsel, and related parties before any privileged detail is taken (Rule 1.18 prospective-client confidentiality)",
  },
];

const OTHER_PRACTICE_AREAS: { area: string; desc: string; href: string; img: string }[] = [
  {
    area: "Personal Injury",
    desc: "Sub-1-second pickup. Statute-of-limitations triage, full insurance-layer capture (PIP, BI, UIM/UM, MedPay), DocuSign retainer dispatch on grade-A leads.",
    href: "/solutions/personal-injury",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1779125994/ChatGPT_Image_May_18_2026_at_01_39_38_PM.jpg",
  },
  {
    area: "Criminal Defense",
    desc: "Collect calls from detention facilities accepted. Arraignment, bail-hearing, and grand-jury deadlines tracked; on-call counsel paged by SMS for in-custody matters.",
    href: "/solutions/criminal-defense",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1774652618/kateryna-hliznitsova-8a1b7Ldia_w-unsplash.jpg",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How does Claire handle a domestic violence caller?",
    answer:
      "Claire is calibrated to detect DV markers — present-danger language, mentions of a current incident, fear of the other party, children present, a recent ER visit — and warm-transfers to your on-call attorney within seconds with a pre-briefed handoff so the caller does not repeat their story. If no attorney is available, Claire stays on the line, offers 911 and the National Domestic Violence Hotline (1-800-799-7233), and pages your escalation chain by SMS, push, and voice simultaneously. PFA, TPO, and emergency-custody filings are flagged in the brief.",
  },
  {
    question: "Will Claire run a conflict check before taking case facts?",
    answer:
      "Yes — at the door, before any privileged fact lands in your file. Claire takes the caller's legal name, the opposing party's legal name, every paramour named, prior counsel, and any related parties, then runs a fuzzy-match check against your CRM in real time. Flagged conflicts get a name-and-number-only retention and route to your conflict-clearance workflow — Rule 1.18 prospective-client confidentiality enforced at intake.",
  },
  {
    question: "Can Claire qualify a family-law caller in Spanish?",
    answer:
      "Yes. First-phrase language detection. Claire runs the family-law intake in Spanish — case type, opposing party, children, prior orders, urgency — and supports mid-call switching when callers default to English for legal terminology. Transcripts translated to English for attorney review, with the original Spanish stored alongside.",
  },
  {
    question: "How does Claire handle court-deadline urgency on a family-law call?",
    answer:
      "Claire is jurisdiction-aware on response deadlines (most states are 20 or 30 days from service), ex-parte and TRO hearings, PFA return dates, and emergency-custody filings. Calls within the deadline window are hard-coded to skip auto-rejection and route to a partner with the deadline math, the case type, and the urgency context already in the brief. A 19-day-out response deadline never gets parked in a queue.",
  },
  {
    question: "How does Claire grade a family-law lead A through D?",
    answer:
      "Lead IQ scores every call against your family-law rubric in real time: case type, asset complexity, custody contest, jurisdiction, prior counsel, urgency, ability to pay the retainer, and conflict-screen status. A grades reach a partner within minutes; B grades book a consult by SMS; C grades enter a softer family-law nurture sequence; D grades (pro-se, out-of-jurisdiction, conflicts) route to a referral. The rubric retrains weekly from your intake lead's overrides.",
  },
  {
    question: "Does Claire integrate with Clio, MyCase, Smokeball, and PracticePanther?",
    answer:
      "Yes — natively. Family-law field mappings are pre-built: Clio Grow with custom matter types and conflict-screen fields, MyCase intake forms with party roles and child information, Smokeball form automations, PracticePanther custom case stages. Claire writes contacts, matters, party records, briefs, and calendar entries into your CRM during the call — no copy-paste, no manual data entry, no Zapier middleware.",
  },
  {
    question: "Can Claire send a retainer agreement on the call?",
    answer:
      "For pre-cleared grade-A leads where conflict screening is clean, yes. Claire confirms the prospect's name, mailing address, and engagement scope on the call, then e-sends your firm's DocuSign retainer template (firm-branded, your fee schedule) within seconds. Family law commonly requires a higher-touch consultation before retainer, and the rubric can be set to consult-first if that's your firm's preference. For B, C, and D leads the standard nurture flow runs instead.",
  },
  {
    question: "What if the caller is distressed, crying, or in active crisis?",
    answer:
      "Family-law callers in crisis show different markers than other practices — \"served,\" \"my kids,\" fear of the other party, present-danger language. Claire warm-transfers to your on-call attorney within seconds with a pre-briefed handoff. If no attorney is available, Claire stays on line, offers 911 and the National DV Hotline (1-800-799-7233), and pages your escalation chain by SMS, push, and voice.",
  },
  {
    question: "How does Claire handle high-asset divorce intake?",
    answer:
      "Claire's rubric flags high-asset markers — business ownership, real-estate portfolio, retirement-plan complexity, equity compensation, premarital assets, suspected hidden assets — and routes those leads to a partner within minutes. The brief surfaces the asset profile so the partner walks into the consult already calibrated on case value. Lead grading prioritizes asset complexity and contested-custody flags above call volume.",
  },
  {
    question: "What does family-law intake cost with ClaireAI?",
    answer:
      "Family-law firms deploy Claire at $450/month with DV-escalation protocols, Rule 1.18 conflict screening (including paramour matching), PFA/TPO deadline tracking, and DocuSign retainer dispatch on cleared leads. No per-call surcharge, no after-hours premium. Most firms replace a $2,500-$4,500/month answering service or $4,000+ FTE receptionist with a $450-$1,800/month Claire plan.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://theclaireai.com/solutions" },
    { "@type": "ListItem", position: 3, name: "Family Law", item: BASE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${BASE_URL}#webapp`,
  inLanguage: "en-US",
  name: "ClaireAI — Family Law Intake",
  alternateName: "AI Receptionist for Family Law Firms",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Family Law Intake Automation",
  operatingSystem: "Web, iOS, Android",
  description: STAGE_ANSWER,
  url: BASE_URL,
  provider: { "@id": "https://theclaireai.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType: "U.S. family law firms — divorce, custody, support, domestic violence",
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
    "Sub-1-second pickup on every family-law call, 24/7/365",
    "Empathetic intake pacing calibrated for distressed callers",
    "Domestic violence and emergency-signal escalation",
    "Conflict screening per ABA Rule 1.18 before any privileged detail",
    "Response-deadline and ex-parte hearing tracking by jurisdiction",
    "Bilingual English and Spanish intake",
    "A–D lead grading with one-page Claire's Brief",
    "DocuSign retainer dispatch on pre-cleared grade-A leads",
    "Native sync with Clio, MyCase, Smokeball, PracticePanther, CosmoLex, Lawmatics",
    "Unlimited concurrency for high-volume firms",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-US",
  headline: "Family Law Intake — AI Receptionist for Divorce, Custody, and DV Firms",
  description: STAGE_ANSWER,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: { "@id": "https://theclaireai.com/#organization" },
  publisher: { "@id": "https://theclaireai.com/#organization" },
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "Family Law Intake Automation" },
  keywords: [
    "AI receptionist family law",
    "family law intake automation",
    "Clio MyCase Smokeball integration",
    "family law answering service",
    "domestic violence intake",
    "conflict screening Rule 1.18",
  ].join(", "),
};


export default function FamilyLawPage() {
  return (
    <main className="min-h-[100dvh] bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      {/* ─────────── Hero (Legora pattern — centered eyebrow + big serif + small CTA) ─────────── */}
      <section className="bg-white px-6 pt-20 sm:pt-28 md:pt-36 pb-16">
        <div className="mx-auto max-w-[1680px] text-center">
          <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
            <span className="text-[#0a0a0a]/40">SOLUTIONS</span>
            <span className="mx-3 text-[#0a0a0a]/25">·</span>
            <span className="text-[#0a0a0a]">Family Law</span>
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
            Never miss another divorce, custody, or DV lead.
          </h1>
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
              alt="Modern law-firm reception area with green accent wall"
              className="h-full w-full object-cover"
              width="1920"
              height="1080"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* ─────────── Metric strip (Legora — eyebrow left, 3 metrics right) ─────────── */}
      <section className="bg-white px-6 pt-4 md:pt-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12 lg:gap-16 items-start">
            <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
              ClaireAI for family law
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
            Use cases
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
            <span className="text-[#0a0a0a]">Built for family-law intake.</span>{" "}
            <span className="text-[#0a0a0a]/60">
              Empathetic pacing, conflict-clean, emergency-aware.
            </span>
          </h2>
        </div>
      </section>

      {/* ─────────── Three feature subsections — Legora alternating bento ─────────── */}
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
                      alt=""
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

      {/* ─────────── Security & privacy (4-card grid, family-law-framed) ─────────── */}
      <TrustGrid variant="family-law" />

      {/* ─────────── Other practice areas (Legora image-overlay pattern) ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#0a0a0a]/[0.06]">
        <div className="mx-auto max-w-[1680px]">
          {/* Eyebrow above grid */}
          <h2 className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55 mb-12 font-normal">
            Works with these practice areas
          </h2>

          {/* 3-column image-overlay grid (Legora pattern) */}
          <div className="grid gap-6 sm:grid-cols-2">
            {OTHER_PRACTICE_AREAS.map((item) => (
              <Link
                key={item.area}
                href={item.href}
                className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-lg"
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Bottom gradient + text overlay */}
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
            Family-law intake, answered.
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

      {/* ─────────── Final CTA (sage radial — matches site pattern) ─────────── */}
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
            Catch every family-law call — with the care it deserves.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire handling a live family-law intake call calibrated to your jurisdiction and rubric.
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
