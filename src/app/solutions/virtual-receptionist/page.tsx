import type { Metadata } from "next";
import Link from "next/link";
import { MetricTicker } from "@/components/sections/metric-ticker";
import { TrustGrid } from "@/components/sections/trust-grid";

const PUBLISHED = "2026-06-25";
const LAST_UPDATED = "2026-06-26";
const BASE_URL = "https://theclaireai.com/solutions/virtual-receptionist";

export const metadata: Metadata = {
  title: "Virtual Receptionist for Law Firms — AI, 24/7",
  description:
    "AI virtual receptionist for lawyers. Answers in 0.8s, greets and routes every call, books consults on your calendar, warm-transfers, and syncs to your CRM. Bilingual, 24/7.",
  keywords: [
    "virtual receptionist for lawyers",
    "legal virtual receptionist",
    "law firm virtual receptionist",
    "virtual receptionist law firm",
    "best virtual receptionist for law firms",
    "AI virtual receptionist",
    "24/7 virtual receptionist",
    "virtual receptionist for attorneys",
    "automated receptionist law firm",
    "remote receptionist for lawyers",
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: "Virtual Receptionist for Law Firms — AI Receptionist, 24/7",
    description:
      "The AI virtual receptionist built for law firms. Answers in 0.8s, routes and books every caller, warm-transfers to your team, and writes to your CRM. Bilingual, around the clock.",
    url: BASE_URL,
    images: [
      {
        url: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_1.91:1,w_1200,h_630,q_auto,f_jpg/v1779125994/ChatGPT_Image_May_18_2026_at_01_39_38_PM.jpg",
        width: 1200,
        height: 630,
        alt: "ClaireAI — AI virtual receptionist for law firms, answering and routing every call 24/7",
      },
    ],
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_ANSWER = `ClaireAI is an AI virtual receptionist built for law firms. Claire answers every inbound call in about 0.8 seconds — no IVR, no hold music — greets the caller in your firm's voice, routes them to the right attorney or practice group, books consults directly on your calendar, warm-transfers live callers when someone is available, and takes a structured message when they are not. It runs your intake script, screens for conflicts under ABA Rule 1.18, writes the contact and matter into Clio, MyCase, or PracticePanther during the call, and works 24/7/365 with unlimited concurrent calls. Bilingual in English and Spanish out of the box. Firms typically replace a human virtual receptionist service or a $4,000+/month front-desk hire with ClaireAI starting at $450/month.`;

const METRICS: { value: string; label: string; source: string }[] = [
  {
    value: "0.8s",
    label: "average pickup — every caller greeted on the first ring.",
    source: "ClaireAI median answer time",
  },
  {
    value: "5×",
    label: "conversion lift when a new lead is contacted within five minutes.",
    source: "Forrester / InsideSales",
  },
  {
    value: "24/7",
    label: "front-desk coverage with unlimited concurrent calls — never a busy signal.",
    source: "ClaireAI uptime SLA",
  },
];

const FEATURES: { headline: string; body: string; img?: string; imgAlt?: string }[] = [
  {
    headline: "Greets and routes every call like your best front-desk receptionist.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779204750/ChatGPT_Image_May_19_2026_at_11_32_15_AM.jpg",
    imgAlt: "Example ClaireAI call brief — caller, matter, and priority actions captured and routed to the right attorney.",
    body: "Claire answers in your firm's voice, identifies why the caller is reaching out, and routes them to the right attorney, practice group, or queue — existing clients to their matter, new callers into intake. No phone tree, no \"press 1.\" Unlimited concurrent calls means a spike in volume never produces a busy signal.",
  },
  {
    headline: "Books consults straight onto your calendar — no phone tag.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779202793/ChatGPT_Image_May_19_2026_at_10_59_38_AM.jpg",
    imgAlt: "ClaireAI structuring the caller's details and matter on the call before booking the consult.",
    body: "For qualified callers, Claire offers your real availability and books the consult on the spot, syncing to your calendar and sending confirmations and reminders. Existing clients get scheduling, billing hand-offs, and message routing. The result is a front desk that turns calls into booked appointments instead of callbacks.",
  },
  {
    headline: "Warm transfers when a human is needed — structured messages when not.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779205248/ChatGPT_Image_May_19_2026_at_11_39_07_AM.jpg",
    imgAlt: "ClaireAI capturing a structured brief to hand off on a warm transfer or leave as a message for the team.",
    body: "When an attorney is available, Claire announces the caller and warm-transfers the live call. When no one is free, it captures a structured message — name, matter, urgency, callback window — and notifies your team by SMS and email, then writes it to your CRM. Bilingual on the first phrase, with transcripts translated for review.",
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
    area: "Legal Intake Service",
    desc: "Full new-client intake: qualifying script, conflict screening, lead grading, retainer dispatch, and CRM write-back on every call.",
    href: "/solutions/legal-intake",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1774646534/dane-deaner-_-KLkj7on_c-unsplash_jgkqae.jpg",
  },
  {
    area: "Bilingual Answering Service",
    desc: "End-to-end intake in Spanish and English — Claire detects the caller’s language on the first phrase, so no Spanish-speaking client is lost at hello.",
    href: "/solutions/bilingual-answering-service",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,g_auto,ar_3:4,w_1200,q_auto:good,dpr_auto,f_auto/v1779133195/ChatGPT_Image_May_18_2026_at_03_39_39_PM.jpg",
  },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is a virtual receptionist for a law firm, and how is ClaireAI's different?",
    answer:
      "A virtual receptionist answers and handles a law firm's calls remotely — greeting callers, routing them, booking appointments, transferring live calls, and taking messages. Traditional services are staffed by human agents who read from a script and bill per minute or per call. ClaireAI is an AI virtual receptionist: Claire answers in about 0.8 seconds, handles unlimited calls at once, books consults on your calendar, warm-transfers when an attorney is free, and writes every contact and matter into your CRM — at a flat monthly rate with no per-call surcharge.",
  },
  {
    question: "Is ClaireAI a good virtual receptionist for solo attorneys and small law firms?",
    answer:
      "Yes — it's especially strong for solo and small firms. A solo attorney can't answer the phone while in court or with a client, and a missed call is often a lost client. Claire is the always-on front desk: it answers every call in your firm's name, qualifies and books new clients, routes existing ones, and never needs coverage for lunch, vacation, or turnover. You get enterprise-grade reception at a fraction of a full-time hire.",
  },
  {
    question: "Does the virtual receptionist work 24/7, including nights and weekends?",
    answer:
      "Yes. Claire answers 24/7/365 — including nights, weekends, holidays, and lunch hours — and also catches daytime overflow when your front desk is on another line. Because it handles unlimited concurrent calls, callers are never queued or sent to a busy signal. After-hours coverage is where a legal virtual receptionist recovers the most new clients, since most callers won't leave a voicemail.",
  },
  {
    question: "How is an AI virtual receptionist better than a human virtual receptionist service?",
    answer:
      "A human virtual receptionist service is limited by staffing, hold times, per-minute billing, and turnover, and usually can't do legal intake beyond taking a message. ClaireAI answers instantly, scales to unlimited simultaneous calls, runs your full qualifying and conflict-screening flow, books consults, and syncs to your CRM — consistently, every call, at a flat rate. There are no off-script agents, no sick days, and no after-hours premium.",
  },
  {
    question: "Can Claire transfer calls to my team and book appointments?",
    answer:
      "Yes to both. When an attorney or staff member is available, Claire announces the caller and warm-transfers the live call. For scheduling, Claire offers your real calendar availability and books the consult on the spot, sending confirmations and reminders. When no one is free, it captures a structured message and notifies your team by SMS and email, writing the details into your CRM.",
  },
  {
    question: "Can the virtual receptionist answer calls in Spanish?",
    answer:
      "Yes. Claire detects Spanish on the first phrase and runs the entire call bilingually, with mid-call English switching and transcripts translated for review. Firms with significant Spanish-speaking caller volume can run a dedicated bilingual configuration so no caller is lost at hello.",
  },
  {
    question: "Does the virtual receptionist integrate with Clio, MyCase, and PracticePanther?",
    answer:
      "Yes — natively. Claire writes contacts, matters, intake notes, appointments, messages, and call recordings into Clio Grow, MyCase, PracticePanther, Smokeball, Rocket Matter, and CosmoLex during the call. No copy-paste, no Zapier middleware, no after-the-fact data entry.",
  },
  {
    question: "What does a virtual receptionist for a law firm cost with ClaireAI?",
    answer:
      "ClaireAI starts at $450/month with 24/7 answering, routing, calendar booking, warm transfers, intake, and CRM sync — no per-call or per-minute surcharge and no after-hours premium. Most firms replace a human virtual receptionist service or a $4,000+/month front-desk hire. See the pricing page for current plans.",
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Solutions", item: "https://theclaireai.com/solutions" },
    { "@type": "ListItem", position: 3, name: "Virtual Receptionist", item: BASE_URL },
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "@id": `${BASE_URL}#webapp`,
  inLanguage: "en-US",
  name: "ClaireAI — Virtual Receptionist for Law Firms",
  alternateName: "AI Virtual Receptionist for Lawyers",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Virtual Receptionist",
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
    "0.8-second average pickup on every call, 24/7/365",
    "Unlimited concurrent calls — never a busy signal",
    "Call greeting, routing, and warm transfer to your team",
    "Consult booking on your calendar with confirmations and reminders",
    "Legal intake and conflict screening per ABA Rule 1.18",
    "Structured message capture with SMS and email notification",
    "Bilingual English and Spanish",
    "Native sync with Clio, MyCase, PracticePanther, Smokeball, Rocket Matter, CosmoLex",
    "Flat monthly pricing — no per-call or after-hours surcharge",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  inLanguage: "en-US",
  headline: "Virtual Receptionist for Law Firms — AI Receptionist, 24/7",
  description: STAGE_ANSWER,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: { "@id": "https://theclaireai.com/#organization" },
  publisher: { "@id": "https://theclaireai.com/#organization" },
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "Virtual Receptionist for Law Firms" },
  keywords: [
    "virtual receptionist for lawyers",
    "legal virtual receptionist",
    "law firm virtual receptionist",
    "AI virtual receptionist",
    "24/7 virtual receptionist",
    "best virtual receptionist for law firms",
  ].join(", "),
};

export default function VirtualReceptionistPage() {
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
            <span className="text-[#0a0a0a]">Virtual Receptionist</span>
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
            The AI virtual receptionist for lawyers you never have to staff.
          </h1>
          <p className="mx-auto mt-7 max-w-[52ch] text-[16px] md:text-[17px] leading-[1.55] text-[#0a0a0a]/60">
            ClaireAI answers in 0.8 seconds, greets and routes every caller, books consults on your calendar, and warm-transfers to your team — 24/7, in English and Spanish.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-3 text-[14.5px] text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Start your 7-day free trial
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/contact"
              className="text-[14.5px] text-[#0a0a0a]/70 underline-offset-4 transition-colors hover:text-[#0a0a0a] hover:underline"
            >
              or book a demo
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────── Hero image (full-width wide) ─────────── */}
      <section className="bg-white px-6 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1680px]">
          <div className="relative aspect-[5/4] sm:aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779125994/ChatGPT_Image_May_18_2026_at_01_39_38_PM.jpg"
              alt="Modern open-plan law office — ClaireAI greets and routes every caller in 0.8 seconds"
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
              ClaireAI as your front desk
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
            <span className="text-[#0a0a0a]">A law-firm virtual receptionist that books clients, not just messages.</span>{" "}
            <span className="text-[#0a0a0a]/60">
              Answered, routed, transferred, and on the calendar — 24/7.
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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            Virtual reception, answered.
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
            Your front desk, answered in 0.8 seconds.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire greeting, routing, and booking a live caller calibrated to your firm&apos;s intake script and calendar.
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-9 py-5 text-[17px] text-white transition-colors hover:bg-[#0a0a0a]/85"
              >
                Book a demo
              </Link>
              <Link
                href="/contact"
                className="text-[15px] text-[#0a0a0a]/75 underline-offset-4 transition-colors hover:text-[#0a0a0a] hover:underline"
              >
                or start a 7-day free trial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
