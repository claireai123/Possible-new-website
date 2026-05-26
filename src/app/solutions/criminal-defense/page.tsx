import type { Metadata } from "next";
import Link from "next/link";
import { MetricTicker } from "@/components/sections/metric-ticker";
import { TrustGrid } from "@/components/sections/trust-grid";

const PUBLISHED = "2026-05-19";
const LAST_UPDATED = "2026-05-19";
const BASE_URL = "https://theclaireai.com/solutions/criminal-defense";

export const metadata: Metadata = {
  title: "Criminal Defense Intake — AI Receptionist | ClaireAI",
  description:
    "AI receptionist for criminal defense. Arraignment-deadline triage, accepts collect calls from jail, Rule 1.18 conflict checks, bilingual.",
  keywords: [
    "AI receptionist criminal defense",
    "criminal defense intake automation",
    "DUI law firm answering service",
    "jail call intake AI",
    "arraignment deadline tracking",
    "Clio criminal defense integration",
    "MyCase criminal defense",
    "PracticePanther criminal intake",
    "criminal defense conflict screening",
    "federal defense intake",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Criminal Defense Intake — AI Receptionist for DUI, Drug, and Federal Defense Firms",
    description:
      "Arraignment urgency triaged in seconds. Collect calls from jail accepted. Bilingual intake, Rule 1.18 conflict screening, retainer dispatch. Built for criminal defense.",
    url: BASE_URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_ANSWER = `ClaireAI is the AI receptionist purpose-built for criminal defense intake. Claire picks up on the first ring — no IVR, no hold music — runs your firm's criminal-defense qualifying flow, accepts collect calls from detention facilities, captures the charge, jurisdiction, custody status, court date, and bond amount, runs jurisdiction-aware arraignment and bail-hearing deadline math, screens for co-defendant and prior-representation conflicts per Rule 1.18, pages on-call counsel by SMS for in-custody and pre-arraignment matters, books the consult, grades the lead A through D, and dispatches a one-page Claire's Brief to your defense team within seconds. Bilingual English and Spanish out of the box.`;

const METRICS: { value: string; label: string; source: string }[] = [
  {
    value: "70%",
    label: "of arrests happen outside business hours.",
    source: "FBI Uniform Crime Report",
  },
  {
    value: "48hr",
    label: "typical arraignment deadline in most jurisdictions.",
    source: "Federal Rule 5 / state law",
  },
  {
    value: "5×",
    label: "conversion lift when leads are contacted within five minutes.",
    source: "Forrester / InsideSales",
  },
];

const FEATURES: { headline: string; body: string; img?: string; imgAlt?: string }[] = [
  {
    headline: "Arraignment and bail-hearing urgency triaged in seconds.",
    body: "Arrests trigger a constitutional clock — 48 to 72 hours to arraignment. Claire knows the deadline math by jurisdiction. Calls inside the window skip auto-rejection and route to a partner with charge, bond, jurisdiction, and next court date already in the brief.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779204750/ChatGPT_Image_May_19_2026_at_11_32_15_AM.jpg",
    imgAlt: "ClaireAI criminal-defense arraignment and bail-hearing urgency dashboard — 48 to 72 hour constitutional clock tracked by jurisdiction with charge, bond, and next court date captured live",
  },
  {
    headline: "Collect calls from jail, answered like any other call.",
    body: "Detention-facility collect calls are the highest-value intake call in criminal defense — and the one most firms miss. Claire accepts the charges, runs a conflict screen, captures charge, bond, jurisdiction, and court date, and pages your on-call counsel before the inmate's call window expires. Bilingual on the first phrase.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779205499/ChatGPT_Image_May_19_2026_at_11_44_43_AM.jpg",
    imgAlt: "ClaireAI criminal-defense detention-facility collect call intake — Claire accepts the charges, captures charge, bond, jurisdiction, and court date, and pages on-call counsel before the inmate's call window expires",
  },
  {
    headline: "Conflict screening before any case fact — co-defendants included.",
    body: "Criminal defense has the trickiest conflict matrix — co-defendants, prior representation of alleged victims, witnesses, prior testimony. Claire collects caller, charge, co-defendants, alleged victim, and prior counsel, then fuzzy-matches against your CRM before any case fact. Rule 1.18 prospective-client confidentiality, enforced at the door.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779205248/ChatGPT_Image_May_19_2026_at_11_39_07_AM.jpg",
    imgAlt: "ClaireAI criminal-defense conflict-screening dashboard — fuzzy-match check across co-defendants, alleged victim, witnesses, and prior counsel before any case fact, enforcing ABA Model Rule 1.18 prospective-client confidentiality",
  },
];

const OTHER_PRACTICE_AREAS: { area: string; desc: string; href: string; img: string }[] = [
  {
    area: "Personal Injury",
    desc: "Accident-hour pickup, statute-of-limitations triage, full insurance-layer capture, grade-A retainer dispatch. Mass-tort overflow at unlimited concurrency.",
    href: "/solutions/personal-injury",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779125994/ChatGPT_Image_May_18_2026_at_01_39_38_PM.jpg",
  },
  {
    area: "Family Law",
    desc: "DV detection on the first phrase. PFA, TPO, and emergency-custody filings flagged. Rule 1.18 screening covers paramours and prior counsel.",
    href: "/solutions/family-law",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_900,q_auto:eco,f_auto/v1774646534/dane-deaner-_-KLkj7on_c-unsplash_jgkqae.jpg",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "Will Claire accept collect calls from jail or detention facilities?",
    answer:
      "Yes. Detention-facility collect calls are the highest-value criminal-defense intake call — and the one most firms miss because front desks decline charges or close at 5pm. Claire accepts the charges on your firm's behalf, runs a conflict screen, captures the charge, bond, jurisdiction, and next court date, and pages your on-call counsel before the inmate's call window expires. The caller never lands in voicemail.",
  },
  {
    question: "How does Claire handle arraignment-deadline urgency on a criminal-defense call?",
    answer:
      "Claire runs jurisdiction-aware deadline math on every call. Most states require arraignment within 48 to 72 hours of arrest (federal Rule 5 first-appearance is \"without unnecessary delay\"). Bail-hearing windows, preliminary-hearing dates, and grand-jury deadlines are tracked the same way. Calls inside any of these windows are hard-coded to bypass auto-rejection and route to a partner with the deadline math, the charge, the bond amount, and the court date already in the brief.",
  },
  {
    question: "Can Claire run a conflict check before taking any case fact?",
    answer:
      "Yes — and it runs before any privileged detail is shared. Claire collects the caller's full name, the charge, co-defendants (named and unnamed), the alleged victim's name, witnesses if known, and any prior counsel up front, then runs a fuzzy-match conflict check against your CRM contacts and matters in real time. If a potential conflict is flagged — most commonly co-defendant representation or prior representation of the alleged victim — Claire politely declines to schedule, takes a name and number only, and routes the lead to your conflict-clearance workflow per ABA Model Rule 1.18 prospective-client confidentiality.",
  },
  {
    question: "Can Claire qualify a criminal-defense caller in Spanish?",
    answer:
      "Yes. First-phrase detection. The criminal-defense intake — charge, custody status, court date, prior arrests, immigration consequences if relevant — runs in Spanish with mid-call English switching. Transcripts translated to English for attorney review; the original Spanish is stored alongside as evidence of the caller's statements.",
  },
  {
    question: "How does Claire handle co-defendant conflicts?",
    answer:
      "Co-defendant conflicts are flagged immediately. Claire asks for all co-defendants by name at the start of every call, runs a fuzzy-match conflict check against your CRM, and surfaces a flag if any co-defendant is already represented by your firm. The caller is politely told the firm cannot speak about case facts until conflict clearance is complete; only a name and number are retained until your conflict process resolves. This satisfies Rule 1.18 prospective-client confidentiality at the front door, before facts that would otherwise become privileged are shared.",
  },
  {
    question: "How does Claire grade a criminal-defense lead A through D?",
    answer:
      "Lead IQ scores every call against your criminal-defense rubric in real time: charge severity (DUI vs felony vs federal), custody status, retainer affordability, jurisdiction, prior counsel, conflict-screen status, and urgency (in-custody, pre-arraignment, post-arraignment, pre-trial). A grades reach a partner within minutes; B grades book a consult by SMS; C grades enter pre-trial nurture; D grades (court-appointed eligible, out-of-jurisdiction, conflicts) route to a referral. The rubric retrains weekly from your intake lead's overrides.",
  },
  {
    question: "Does Claire integrate with Clio, MyCase, PracticePanther, and Smokeball natively?",
    answer:
      "Yes — natively. Criminal-defense field mappings are pre-built: Clio Grow with charge, court date, bond amount, and conflict-screen fields; MyCase intake forms with case-type tagging and court-date reminders; PracticePanther custom case stages for in-custody, pre-arraignment, and pre-trial; Smokeball form automations. Claire writes contacts, matters, charge documents, briefs, court-date entries, and audio recordings into your CRM during the call — no copy-paste, no manual entry, no Zapier middleware.",
  },
  {
    question: "Can Claire send a retainer agreement on the call?",
    answer:
      "For pre-cleared grade-A criminal-defense leads where conflict screening is clean and the prospect can speak about retainer, yes. Claire confirms the prospect's name, mailing address, charge, and engagement scope on the call, then e-sends your firm's DocuSign retainer template (firm-branded, your fee schedule) within seconds. In-custody clients usually require a family member or guarantor signature; Claire routes the retainer to whichever contact you've configured. For B, C, and D leads the standard nurture flow runs instead.",
  },
  {
    question: "What if the inmate's family is calling about a recent arrest?",
    answer:
      "Family-member calls are common — and time-sensitive. Claire captures the inmate's name, jurisdiction, charge if known, arresting agency, booking location, and the family member's contact, then pages your on-call counsel by SMS within seconds. If counsel is unavailable, Claire stays on the line, provides the public booking-search URL for the jurisdiction if available, and pages your escalation chain by SMS, push, and voice simultaneously. The family member never lands in voicemail and never repeats their story.",
  },
  {
    question: "What does criminal-defense intake cost with ClaireAI?",
    answer:
      "Criminal-defense firms deploy Claire at $450/month with jail-collect-call acceptance, arraignment-deadline routing, co-defendant conflict screening, and DocuSign retainer dispatch (routed to a guarantor for in-custody clients). No per-call surcharge, no after-hours premium. Most firms replace a $2,500-$4,500/month answering service or $4,000+ FTE receptionist with a $450-$1,800/month Claire plan.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://theclaireai.com/solutions" },
    { "@type": "ListItem", position: 3, name: "Criminal Defense", item: BASE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${BASE_URL}#webapp`,
  inLanguage: "en-US",
  name: "ClaireAI — Criminal Defense Intake",
  alternateName: "AI Receptionist for Criminal Defense Firms",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Criminal Defense Intake Automation",
  operatingSystem: "Web, iOS, Android",
  description: STAGE_ANSWER,
  url: BASE_URL,
  provider: { "@id": "https://theclaireai.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType: "U.S. criminal defense law firms — DUI, drug, assault, white-collar, federal",
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
    "Sub-1-second pickup on every criminal-defense call, 24/7/365",
    "Collect-call acceptance from detention facilities and jails",
    "Arraignment, bail-hearing, and first-appearance deadline tracking by jurisdiction",
    "Conflict screening per ABA Rule 1.18 — co-defendants, alleged victims, prior counsel",
    "Bilingual English and Spanish intake",
    "A–D lead grading with one-page Claire's Brief",
    "DocuSign retainer dispatch on pre-cleared grade-A leads",
    "Native sync with Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex",
    "On-call counsel paging by SMS, push, and voice",
    "Unlimited concurrency for high-volume firms",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-US",
  headline: "Criminal Defense Intake — AI Receptionist for DUI, Drug, and Federal Defense Firms",
  description: STAGE_ANSWER,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: { "@id": "https://theclaireai.com/#organization" },
  publisher: { "@id": "https://theclaireai.com/#organization" },
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "Criminal Defense Intake Automation" },
  keywords: [
    "AI receptionist criminal defense",
    "criminal defense intake automation",
    "Clio MyCase PracticePanther integration",
    "jail call intake",
    "arraignment deadline tracking",
    "conflict screening Rule 1.18",
  ].join(", "),
};


export default function CriminalDefensePage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      {/* ─────────── Hero ─────────── */}
      <section className="bg-white px-6 pt-28 md:pt-36 pb-16">
        <div className="mx-auto max-w-[1680px] text-center">
          <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
            <span className="text-[#0a0a0a]/40">SOLUTIONS</span>
            <span className="mx-3 text-[#0a0a0a]/25">·</span>
            <span className="text-[#0a0a0a]">Criminal Defense</span>
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
            Never miss another arraignment, bail hearing, or jail call.
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779204128/ChatGPT_Image_May_19_2026_at_11_21_51_AM.jpg"
              alt="Criminal defense law firm reception — ClaireAI handles every arraignment, bail hearing, and jail call"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─────────── Metric strip ─────────── */}
      <section className="bg-white px-6 pt-4 md:pt-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-16 items-start">
            <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55">
              ClaireAI for criminal defense
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
            <span className="text-[#0a0a0a]">Built for criminal-defense intake.</span>{" "}
            <span className="text-[#0a0a0a]/40">
              Jail calls accepted, deadlines tracked, conflicts cleared up front.
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
                      alt={f.imgAlt ?? f.headline}
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
                        <p className="text-[13px] text-[#0a0a0a]/30">Feature mockup placeholder</p>
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

      {/* ─────────── Security & privacy (criminal-defense-framed) ─────────── */}
      <TrustGrid variant="criminal-defense" />

      {/* ─────────── Other practice areas ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#0a0a0a]/[0.06]">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55 mb-12">
            Works with these practice areas
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {OTHER_PRACTICE_AREAS.map((item) => (
              <Link
                key={item.area}
                href={item.href}
                className="group relative block aspect-[3/4] cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={item.img}
                  alt={item.area}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="lazy"
                />
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
            Criminal-defense intake, answered.
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
            Catch every arrest call — including 3am.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire handling a live criminal-defense intake call calibrated to your jurisdiction and rubric.
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
