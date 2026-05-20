import type { Metadata } from "next";
import Link from "next/link";
import { MetricTicker } from "@/components/sections/metric-ticker";
import { TrustGrid } from "@/components/sections/trust-grid";

const PUBLISHED = "2026-05-18";
const LAST_UPDATED = "2026-05-18";
const BASE_URL = "https://theclaireai.com/solutions/personal-injury";

export const metadata: Metadata = {
  title: "Personal Injury Intake — AI Receptionist for PI Law Firms",
  description:
    "ClaireAI is the AI receptionist purpose-built for personal injury intake. Sub-1-second pickup, statute-of-limitations triage, police-report capture, bilingual English and Spanish, native sync into Clio, Filevine, CASEpeer, and Litify. Recover the 60% of PI calls firms miss today.",
  keywords: [
    "AI receptionist personal injury",
    "personal injury intake automation",
    "PI law firm answering service",
    "personal injury 24/7 answering",
    "Spanish personal injury intake",
    "CASEpeer integration",
    "Filevine intake",
    "Clio Grow integration personal injury",
    "personal injury lead qualification",
    "PI law firm AI",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Personal Injury Intake — AI Receptionist for PI Law Firms",
    description:
      "Sub-1-second pickup, statute triage, police-report capture, bilingual intake, A–D grading, DocuSign retainer dispatch. Built for personal injury.",
    url: BASE_URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_ANSWER = `ClaireAI is the AI receptionist purpose-built for personal injury intake. Claire picks up on the first ring — no IVR, no hold music — runs your firm's PI qualifying flow, captures mechanism of injury, police-report status, treatment status, fault, and every insurance layer (PIP, BI, UIM/UM), runs a statute-of-limitations triage by jurisdiction, books the consult, grades the lead A through D, and dispatches a one-page Claire's Brief to your intake team within seconds. Bilingual English and Spanish out of the box.`;

const METRICS: { value: string; label: string; source: string }[] = [
  {
    value: "60%",
    label: "of inbound legal calls go unanswered today.",
    source: "Clio Legal Trends Report",
  },
  {
    value: "$250K",
    label: "average annual revenue lost per PI firm to missed calls.",
    source: "VoiceCharm / CallJolt",
  },
  {
    value: "400%",
    label: "conversion lift when leads are contacted within five minutes.",
    source: "Forrester / InsideSales",
  },
];

const FEATURES: { headline: string; body: string; img?: string; imgAlt?: string }[] = [
  {
    headline: "Qualify a PI lead in under two minutes.",
    body: "Claire runs your firm's exact intake script — mechanism, fault, treatment, every insurance layer (PIP, BI, UIM/UM, MedPay), police report, prior counsel, conflict screen. Captured verbatim into your CRM before the caller hangs up.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779129517/ChatGPT_Image_May_18_2026_at_02_38_21_PM.jpg",
    imgAlt: "ClaireAI personal injury intake qualifying script — structured CRM record built live on the call",
  },
  {
    headline: "Statute-of-limitations triage by jurisdiction.",
    body: "Claire knows the SoL window for every state you practice in — 2 or 3 years for negligence, plus discovery-rule extensions, government-claim notice, and minor-tolling. Calls within 90 days of a deadline skip auto-rejection and route straight to a partner. A wrong-grade D never costs you a seven-figure case.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779132672/ChatGPT_Image_May_18_2026_at_03_30_41_PM.jpg",
    imgAlt: "ClaireAI statute-of-limitations triage panel — jurisdiction-aware SoL windows with 90-day partner-routing guard",
  },
  {
    headline: "Bilingual intake, accident-hour pickup.",
    body: "English and Spanish out of the box, detected on the first phrase. After-hours, weekend, and overnight calls — the highest-value PI moments — answered identically to business hours. No surcharge, no shift gaps, no voicemail dead-ends.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779133195/ChatGPT_Image_May_18_2026_at_03_39_39_PM.jpg",
    imgAlt: "ClaireAI bilingual English and Spanish PI intake — 24/7 accident-hour pickup with first-phrase language detection",
  },
];

const OTHER_PRACTICE_AREAS: { area: string; desc: string; href: string; img: string }[] = [
  {
    area: "Criminal Defense",
    desc: "Collect calls from jail accepted. Arraignment, bail-hearing, and grand-jury deadlines tracked. Charge and bond captured before any case fact.",
    href: "/solutions/criminal-defense",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_900,q_auto:eco,f_auto/v1774652618/kateryna-hliznitsova-8a1b7Ldia_w-unsplash.jpg",
  },
  {
    area: "Family Law",
    desc: "First-phrase DV detection. PFA, TPO, and emergency-custody filings flagged in the brief. Rule 1.18 screening covers paramours and prior counsel.",
    href: "/solutions/family-law",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_900,q_auto:eco,f_auto/v1774646534/dane-deaner-_-KLkj7on_c-unsplash_jgkqae.jpg",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Will Claire know to ask about UIM/UM coverage on a PI call?",
    answer:
      "Yes. Underinsured and uninsured motorist coverage is captured on every PI auto call alongside the at-fault carrier, the caller's own carrier, PIP/MedPay limits, and any umbrella policy in play. Claire is calibrated to ask the question even when the caller volunteers \"I have insurance\" without specifying — UIM/UM are the case-value drivers your firm cannot afford to miss.",
  },
  {
    question: "How does Claire handle statute of limitations on a PI intake call?",
    answer:
      "Claire runs jurisdiction-aware SoL triage on every call. Most states are 2 years for negligence-based PI, some are 3, government claims often require notice within 6 months, and minors toll until majority. Calls within 90 days of the deadline are hard-coded to bypass auto-rejection and route to a partner with the SoL math, fact pattern, and discovery-rule analysis already in the brief.",
  },
  {
    question: "Can Claire qualify a PI caller in Spanish from the first ring?",
    answer:
      "Yes. Language detection on the first phrase. The full PI intake — mechanism of injury, treatment status, insurance layers, fault, witnesses — runs in Spanish if the caller prefers, with mid-call English/Spanish switching for legal terms. Transcripts stored in English for attorney review.",
  },
  {
    question: "What if the caller is a distressed accident victim or family member?",
    answer:
      "PI prospects often call right after the ER, a crash, or a family member's arrest. Claire flags vocal urgency — raised pitch, \"the accident,\" \"my husband,\" \"surgery tomorrow\" — and warm-transfers to your on-call attorney within seconds, brief in hand. If no attorney's available, Claire stays on line, offers 911, and pages your escalation chain by SMS, push, and voice.",
  },
  {
    question: "How does Claire grade a PI lead A through D?",
    answer:
      "Lead IQ scores every call against your PI rubric in real time: liability clarity, treatment status (ER, ongoing PT, none), policy limits, comparative-negligence flags, prior counsel, statute timing, and conflict screen. A grades go to a partner within five minutes; B grades get a consult-booking SMS plus reminder; C grades enter PI nurture (treatment-status check-ins); D grades route to a referral partner. Your intake lead tunes the rubric weekly via override.",
  },
  {
    question: "Does Claire integrate with CASEpeer, Filevine, and Litify natively?",
    answer:
      "Yes — natively. PI-specific field mappings are pre-built: CASEpeer SoL alerts and case-value fields, Filevine custom selectors for treatment status and insurance carriers, Litify Salesforce-native matter creation with conflict-screen check. Claire writes contacts, PI matters, briefs, calendar entries, and audio recordings into your CRM during the call — no copy-paste, no manual entry, no Zapier middleware.",
  },
  {
    question: "Can Claire send a DocuSign retainer before the caller hangs up?",
    answer:
      "For pre-cleared grade-A PI leads, yes. Claire confirms the prospect's name, mailing address, and engagement scope on the call, then e-sends your firm's DocuSign retainer template (firm-branded, your fee schedule) within seconds. Most retainers are signed before morning. For grades B, C, and D the standard nurture flow runs instead.",
  },
  {
    question: "Does Claire run a conflict check before booking a PI consult?",
    answer:
      "Yes. Claire collects the caller's full name, the opposing party's name, every named insurance carrier, and any related entities on the call. Those names get a fuzzy-match conflict check against your CRM contacts and matters before any consult is booked. If a potential conflict is flagged, Claire politely declines to schedule, takes a message, and routes the lead to your conflict-clearance workflow per ABA Model Rule 1.6(c) and Rule 1.18 prospective-client confidentiality.",
  },
  {
    question: "How does Claire handle TV-ad spikes and mass-tort waves?",
    answer:
      "Unlimited concurrency. Whether you get 3 calls an hour or 300 in the ten minutes after a TV spot airs, every caller hits Claire instantly with no busy signal, no queue, no voicemail. This is the structural advantage over human receptionists (one call at a time) and traditional answering services (shift-staffing limits). PI firms running TV campaigns use this as their primary differentiator versus competitors on Smith.ai or Ruby.",
  },
  {
    question: "What does PI intake cost with ClaireAI?",
    answer:
      "PI firms running TV campaigns deploy Claire at $450/month with mass-tort overflow concurrency, MedPay capture, statute-of-limitations triage, and DocuSign retainer dispatch on grade-A leads. No per-call surcharge, no after-hours premium. Most PI firms replace a $3,000-$5,000/month answering service or a $4,000+ FTE receptionist with a $450-$1,800/month Claire plan.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://theclaireai.com/solutions" },
    { "@type": "ListItem", position: 3, name: "Personal Injury", item: BASE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${BASE_URL}#webapp`,
  inLanguage: "en-US",
  name: "ClaireAI — Personal Injury Intake",
  alternateName: "AI Receptionist for Personal Injury Law Firms",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Personal Injury Intake Automation",
  operatingSystem: "Web, iOS, Android",
  description: STAGE_ANSWER,
  url: BASE_URL,
  provider: { "@id": "https://theclaireai.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType: "U.S. personal injury law firms",
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
    "Sub-1-second pickup on every PI call, 24/7/365",
    "Mechanism, fault, treatment, and insurance capture (PIP, BI, UIM/UM, MedPay)",
    "Statute-of-limitations triage per jurisdiction",
    "Bilingual English and Spanish intake",
    "A–D lead grading with one-page Claire's Brief",
    "DocuSign retainer dispatch on pre-cleared grade-A leads",
    "Native sync with Clio, Filevine, CASEpeer, Litify, Lawmatics, CloudLex, MyCase, PracticePanther",
    "Conflict screening per Model Rule 1.18",
    "Unlimited concurrency for TV-ad and mass-tort spikes",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-US",
  headline: "Personal Injury Intake — AI Receptionist for PI Law Firms",
  description: STAGE_ANSWER,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: { "@id": "https://theclaireai.com/#organization" },
  publisher: { "@id": "https://theclaireai.com/#organization" },
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "Personal Injury Intake Automation" },
  keywords: [
    "AI receptionist personal injury",
    "PI intake automation",
    "Clio Filevine CASEpeer Litify integration",
    "personal injury answering service",
    "bilingual PI intake",
  ].join(", "),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "en-US",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function PersonalInjuryPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ─────────── Hero (Legora pattern — centered eyebrow + big serif + small CTA) ─────────── */}
      <section className="bg-white px-6 pt-28 md:pt-36 pb-16">
        <div className="mx-auto max-w-[1680px] text-center">
          <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
            <span className="text-[#0a0a0a]/40">SOLUTIONS</span>
            <span className="mx-3 text-[#0a0a0a]/25">·</span>
            <span className="text-[#0a0a0a]">Personal Injury</span>
          </p>
          <h1
            className="mt-8 text-[#0a0a0a] mx-auto"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 84px)",
              lineHeight: "1.04",
              letterSpacing: "-0.025em",
              fontWeight: 400,
              maxWidth: "20ch",
            }}
          >
            Never miss another personal injury lead.
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
          <div className="relative aspect-[16/9] max-h-[520px] overflow-hidden rounded-lg">
            <img
              src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779125994/ChatGPT_Image_May_18_2026_at_01_39_38_PM.jpg"
              alt="Personal injury law firm reception — ClaireAI handles every inbound PI call"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─────────── Metric strip (Legora — eyebrow left, 3 metrics right) ─────────── */}
      <section className="bg-white px-6 pt-4 md:pt-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 items-start">
            <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
              ClaireAI for personal injury
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
            <span className="text-[#0a0a0a]">Capture every PI call.</span>{" "}
            <span className="text-[#0a0a0a]/40">
              Claire answers, qualifies, and books — autonomously.
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
                className={`grid grid-cols-1 gap-6 lg:gap-8 items-stretch ${
                  textLeft ? "lg:grid-cols-[1fr_1.6fr]" : "lg:grid-cols-[1.6fr_1fr]"
                }`}
              >
                {/* Text block (small, top-aligned) */}
                <div
                  className={`flex flex-col justify-start lg:py-8 lg:pr-10 ${
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

                {/* Mockup — Cloudinary image when provided, soft-gray bento placeholder otherwise */}
                <div
                  className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl ${
                    textLeft ? "lg:order-2" : "lg:order-1"
                  }`}
                  style={{ backgroundColor: "#f5f4f1" }}
                >
                  {f.img ? (
                    <img
                      src={f.img}
                      alt={f.imgAlt ?? f.headline}
                      className="absolute inset-0 h-full w-full object-contain"
                      loading={idx === 0 ? "eager" : "lazy"}
                      fetchPriority={idx === 0 ? "high" : "auto"}
                    />
                  ) : (
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0a0a0a]/5">
                        <svg className="h-5 w-5 text-[#0a0a0a]/25" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-[13px] text-[#0a0a0a]/30">Feature mockup placeholder</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#0a0a0a]/20">16 : 10</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─────────── Security & privacy (4-card grid, PI-framed) ─────────── */}
      <TrustGrid variant="personal-injury" />

      {/* ─────────── Other practice areas (Legora image-overlay pattern) ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#0a0a0a]/[0.06]">
        <div className="mx-auto max-w-[1680px]">
          {/* Eyebrow above grid */}
          <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55 mb-12">
            Works with these practice areas
          </p>

          {/* 3-column image-overlay grid (Legora pattern) */}
          <div className="grid gap-6 sm:grid-cols-2">
            {OTHER_PRACTICE_AREAS.map((item) => (
              <Link
                key={item.area}
                href={item.href}
                className="group relative block aspect-[4/5] cursor-pointer overflow-hidden rounded-lg"
              >
                {/* Image */}
                <img
                  src={item.img}
                  alt={item.area}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Bottom gradient + text overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 pt-24 pb-7 px-7"
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
            PI intake, answered.
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
            className="text-[#0a0a0a] max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Catch every PI lead — including after hours.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire handling a live PI intake call calibrated to your jurisdiction and rubric.
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
