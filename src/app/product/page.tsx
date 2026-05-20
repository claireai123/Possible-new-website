import type { Metadata } from "next";
import Link from "next/link";

const PUBLISHED = "2026-05-18";
const LAST_UPDATED = "2026-05-18";
const BASE_URL = "https://theclaireai.com/product";

export const metadata: Metadata = {
  title: "AI Receptionist for Law Firms — ClaireAI Product Overview",
  description:
    "ClaireAI is the autonomous AI receptionist built for U.S. law firms. Every inbound call answered, qualified, booked, graded A–D, and dispatched with a one-page brief — 24/7, in English and Spanish, with 60+ CRM integrations.",
  keywords: [
    "AI receptionist for law firms",
    "AI legal intake",
    "AI legal receptionist",
    "automated legal intake",
    "AI lead qualification law firm",
    "law firm answering service",
    "24/7 legal answering service",
    "personal injury intake automation",
    "Clio integration AI receptionist",
  ],
  alternates: { canonical: "/product" },
  openGraph: {
    title: "AI Receptionist for Law Firms — ClaireAI Product Overview",
    description:
      "Autonomous AI intake, qualification, booking, and retainer dispatch for U.S. law firms.",
    url: BASE_URL,
    type: "article",
    publishedTime: PUBLISHED,
    modifiedTime: LAST_UPDATED,
  },
};

const STAGE_1_ANSWER = `ClaireAI picks up on the first ring — no IVR, no hold music — and runs your firm's qualifying flow in natural conversation. PI captures mechanism and statute timing; criminal handles in-custody escalation; family law handles UCCJEA and protective-order urgency. English and Spanish out of the box, ten more languages on request.`;

const STAGE_2_ANSWER = `Claire reads your attorneys' calendars in real time through Google Workspace, Microsoft 365, or Calendly and books the consult before hang-up. Lead IQ grades the prospect A through D and dispatches a one-page Claire's Brief to SMS, Slack, Teams, email, or your CRM within seconds.`;

const STAGE_3_ANSWER = `For grade-A leads pre-cleared by your firm, Claire e-sends a DocuSign retainer overnight. Contacts, matters, and briefs sync automatically into Clio, MyCase, Filevine, Lawmatics, PracticePanther, Smokeball, CASEpeer, CloudLex, HubSpot, and 60+ other tools. Drip campaigns trigger per grade. Runs on SOC 2 Type II and HIPAA-aligned infrastructure.`;

const COMPARISON_ROWS: { feature: string; claire: string; human: string; service: string }[] = [
  { feature: "Coverage", claire: "24/7/365, first-ring", human: "Business hours", service: "24/7 with handoffs" },
  { feature: "Monthly cost", claire: "$450+", human: "$3,000–$5,000 all-in", service: "$250–$1,500" },
  { feature: "Intake quality", claire: "Qualified A–D + brief", human: "Variable, person-dependent", service: "Message-take only" },
  { feature: "Languages", claire: "EN + ES, 10+ on request", human: "Typically English", service: "English only" },
  { feature: "Lead grading", claire: "A–D rubric, firm-specific", human: "None", service: "None" },
  { feature: "Retainer dispatch", claire: "DocuSign auto-send", human: "Manual", service: "Not offered" },
  { feature: "CRM sync", claire: "66 native integrations", human: "Manual data entry", service: "Limited or none" },
  { feature: "Setup time", claire: "Under 2 weeks", human: "4–8 weeks (hire + train)", service: "1–2 weeks" },
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "What is an AI receptionist for a law firm?",
    answer:
      "An AI receptionist for a law firm is a voice agent that answers every inbound call on the first ring, runs your firm's qualifying questions in real conversation, books the consult into the right attorney's calendar before hang-up, grades the lead, and dispatches a one-page brief to your intake team within seconds. ClaireAI is purpose-built for U.S. law firms — personal injury, criminal defense, family law, and immigration — and operates 24/7/365 in English and Spanish out of the box.",
  },
  {
    question: "How is ClaireAI different from Smith.ai or Ruby Receptionists?",
    answer:
      "Smith.ai and Ruby Receptionists are human-staffed answering services priced at $250–$1,500 per month that primarily take messages or warm-transfer calls. ClaireAI runs the full intake conversation end-to-end — qualifying, calendar-aware booking, A–D lead grading, brief dispatch, and DocuSign retainer send — at $450+/month, with 66 native CRM integrations including Clio, MyCase, Filevine, Lawmatics, and HubSpot. See the side-by-side comparison pages for detailed feature and pricing breakdowns.",
  },
  {
    question: "How much does an AI legal receptionist cost?",
    answer:
      "ClaireAI plans start at $450 per month and include Lead IQ grading, retainer dispatch, and full integration access on every tier. Call-volume bands scale based on monthly inbound minutes. For comparison, a full-time legal receptionist costs $3,000–$5,000 per month fully loaded (salary, benefits, training, PTO coverage), and human answering services run $250–$1,500 per month for messages-only coverage.",
  },
  {
    question: "Is ClaireAI built on HIPAA and SOC 2 infrastructure?",
    answer:
      "Yes. ClaireAI runs on SOC 2 Type II infrastructure with HIPAA-aligned controls. All call audio, transcripts, and intake data are encrypted at rest with 256-bit AES and in transit with TLS 1.3, stored in per-tenant isolated infrastructure, and never used to train cross-customer models. Call recordings are retained per your firm's retention policy and accessible through your portal at any time. Our own SOC 2 Type II audit is in progress.",
  },
  {
    question: "Will ClaireAI replace my human receptionist?",
    answer:
      "Most firms use ClaireAI to absorb overflow, after-hours, and weekend traffic without losing leads, then expand to primary intake once they trust the qualifying flow. Some firms run it as their full-time receptionist from day one. Either way, your team is freed from message-taking and routing so they can focus on signed cases — ClaireAI handles the volume and tedium that drives receptionist burnout.",
  },
  {
    question: "Which practice areas does ClaireAI support?",
    answer:
      "Personal injury, criminal defense, and family law are supported out of the box, with general civil intake for boutique firms. Each practice area uses a calibrated intake flow: PI captures police reports, treatment status, and statute timing; criminal handles in-custody escalation 24/7 with jail-collect-call acceptance; family law handles UCCJEA flags, DV markers, and protective-order urgency. The rubric and intake script are tuned to your firm during onboarding.",
  },
  {
    question: "Does ClaireAI integrate with Clio, MyCase, or Filevine?",
    answer:
      "Yes. ClaireAI has 66 native integrations including Clio, MyCase, Filevine, Lawmatics, PracticePanther, Smokeball, CASEpeer, CloudLex, HubSpot, DocuSign, Calendly, Google Workspace, Microsoft 365, Microsoft Teams, and Slack. Contacts, matters, calendar entries, and briefs are created automatically — no copy-paste, no manual data entry. See the integrations directory for setup guides per platform.",
  },
  {
    question: "Can ClaireAI take calls in Spanish?",
    answer:
      "Yes — English and Spanish are supported out of the box with no quality drop between languages. An additional ten languages — Mandarin, Vietnamese, Tagalog, Korean, Arabic, Russian, Haitian Creole, Portuguese, French, and Polish — can be enabled per tenant on request. Claire auto-detects the caller's preferred language and adapts the qualifying script.",
  },
  {
    question: "How quickly can my firm go live with ClaireAI?",
    answer:
      "Most firms are live in under two weeks. Onboarding includes a 60-minute kickoff to capture your firm's intake criteria and case rubric, a calibration pass against your recent calls, CRM and calendar integration setup, and a soft-launch window where Claire handles overflow before going primary on inbound traffic.",
  },
  {
    question: "Does ClaireAI offer a free trial?",
    answer:
      "Yes — ClaireAI offers a 7-day free trial on all pricing tiers. Onboarding for the trial is a 30-minute kickoff call to capture your intake script and connect your calendar. You can route a subset of inbound calls or after-hours overflow during the trial before going primary.",
  },
  {
    question: "Can callers tell they're talking to an AI?",
    answer:
      "Most callers don't notice in the first 30 seconds. Claire runs on a sub-1.4-second cascaded voice pipeline so turn-taking feels natural, with no robotic pauses or \"I am an AI assistant\" tells. If a caller asks directly whether they're speaking with a person, Claire confirms she's an AI — that disclosure is legally required in California, Florida, Illinois, Massachusetts, Michigan, Pennsylvania, and other two-party-consent states, and it builds trust rather than breaking it.",
  },
  {
    question: "Is ClaireAI considered the unauthorized practice of law?",
    answer:
      "No. Claire is scoped to intake only — she gathers facts, runs conflict-of-interest collection, grades the matter A through D, and dispatches a brief to your attorneys. She does not interpret statutes, predict case outcomes, or offer strategy. The ABA's July 2024 Formal Opinion 512 and Model Rule 5.5 are clear that intake conducted under attorney supervision is not UPL, the same way a human paralegal taking initial calls isn't UPL. Every disposition Claire makes is an attorney-reviewable recommendation, not a legal decision.",
  },
  {
    question: "Does attorney-client privilege attach to what a caller tells ClaireAI?",
    answer:
      "Yes. Claire operates as your supervised intake agent, which under Model Rule 1.18 means everything a prospective client shares is treated as confidential to the same standard as a human paralegal taking the call. Recordings and transcripts are encrypted in transit and at rest, stored in your tenant only, and never used to train any model. This is the opposite of pasting client facts into a consumer LLM — which the Heppner v. Claude ruling (2026) confirmed is not privileged because consumer LLMs' terms permit training on inputs.",
  },
  {
    question: "How does ClaireAI handle conflict-of-interest screening on the first call?",
    answer:
      "Claire collects every party name on the call — caller, opposing party, co-defendants, spouses, employers, related entities — before any case-fact discussion goes deep. Those names get logged into your conflict system (Clio, MyCase, Filevine) and tagged with Rule 1.18 \"prospective client\" status so they surface on every future conflict run. If Claire detects a name already in your active matter list, she politely ends intake and dispatches a flagged brief rather than continuing.",
  },
  {
    question: "What happens when a caller is in distress, crying, or describing an emergency?",
    answer:
      "Claire is tuned to detect emotional markers — raised pitch, distress vocabulary, mentions of \"right now,\" \"scared,\" \"ER,\" domestic-violence keywords — and warm-transfers to your on-call attorney within seconds, with a pre-briefed handoff so the caller doesn't repeat their story. If no attorney is available, Claire stays on the line, offers 911 or DV-hotline information where appropriate, and pages your escalation chain by SMS, push, and voice simultaneously.",
  },
  {
    question: "Will ClaireAI work for elderly callers, regional accents, or low-bandwidth phone lines?",
    answer:
      "Yes. Claire uses an English speech-recognition model trained on broader demographic data than the 18–34 General-American skew of most consumer ASR. In production grading, accuracy holds above 96% on callers 65+ and across Southern, Appalachian, and Gulf-Coast accents. If transcription confidence drops below threshold mid-call (heavy accent, bad cell signal, hearing-impaired caller), Claire automatically slows pace, repeats back the key fact, and offers a human callback rather than guessing.",
  },
  {
    question: "Does ClaireAI disclose that it's recording the call?",
    answer:
      "Yes, on every call, every time. Claire's opening line includes a recording-and-AI disclosure that satisfies all 13 two-party-consent states (California, Connecticut, Delaware, Florida, Illinois, Maryland, Massachusetts, Michigan, Montana, Nevada, New Hampshire, Pennsylvania, Washington) by default — there's no jurisdiction-detection gamble. Recordings are stored encrypted in your tenant, never sent to model training, and auto-purged on the schedule you set (default 90 days). You also get a downloadable consent clip with timestamp and script version on every recorded call for audit purposes.",
  },
  {
    question: "What if ClaireAI mis-grades a call — gives an A to a junk lead or a D to a real case?",
    answer:
      "Every grade is a recommendation, never a routing decision. Every brief — A through D — lands in your inbox and CRM with the full transcript, signal flags, and Claire's reasoning trail, so a human always reviews the disposition before retainer or rejection. We tune Claire to prefer false positives over false negatives (closer to \"yes, escalate\" than \"no, drop\") because turning away a real case is the worse failure mode. Firms can adjust grading criteria per practice area in the portal and Claire re-tunes within the week.",
  },
  {
    question: "Does my malpractice carrier cover claims involving an AI intake agent?",
    answer:
      "Most legal professional liability policies (ALPS, CNA, Lawyers Mutual) cover AI-assisted intake as long as a licensed attorney supervises and reviews. Some carriers have started adding AI exclusion endorsements specifically for unsupervised generative-AI use — Claire's intake-only scope plus attorney-reviewed dispositions sits well inside the covered side of that line. We provide a one-page carrier letter on request describing Claire's supervision model, audit logs, and data-residency posture; most firms forward it to their broker and get explicit confirmation in writing.",
  },
  {
    question: "What if a caller refuses to talk to an AI and asks for a human?",
    answer:
      "Claire transfers immediately — no negotiation, no looping. If you have on-call coverage configured, she warm-transfers with the caller's name, number, and the reason they asked for a human pre-briefed to the receiver. If no human is available (overnight, weekend), Claire offers a guaranteed callback window, captures the matter type, and dispatches a high-priority brief flagged \"human-requested\" so the next available attorney prioritizes it. Roughly 4% of inbound calls request a human; the other 96% complete intake with Claire.",
  },
  {
    question: "What if ClaireAI doesn't recognize a specific charge, statute, or case type?",
    answer:
      "Claire is built to ask, not guess. If a caller mentions an unfamiliar statute code (\"12.42(d) habitual,\" \"Marchman Act,\" \"I-589 withholding\"), Claire repeats it back, captures it verbatim in the brief, and routes by the practice-area cues she did catch (criminal defense, civil commitment, immigration). She never invents legal context — hallucinated charges and fake citations are the most documented AI legal failure mode, and Claire's intake scope is explicitly designed to not be in that failure mode.",
  },
  {
    question: "Can ClaireAI handle multiple calls at the same time, or will callers get a busy signal during a TV-ad spike?",
    answer:
      "Unlimited concurrency. Whether you get 3 calls an hour or 300 calls in the ten minutes after a TV spot airs, every caller hits Claire instantly with no busy signal, no queue, no voicemail. This is the structural advantage over human receptionists (one call at a time) and traditional services (shift-staffing limits). Mass-tort firms running TV campaigns and PI firms with viral social moments use this as their primary differentiator versus competitors still on Smith.ai or Ruby.",
  },
];

const organization = {
  "@type": "Organization",
  "@id": "https://theclaireai.com/#organization",
  name: "ClaireAI",
  legalName: "ClaireAI, Inc.",
  url: "https://theclaireai.com",
  logo: "https://res.cloudinary.com/dwzsqumf6/image/upload/e_colorize:100,co_rgb:0a0a0a/v1772837716/Claire_AI_White-removebg-preview.png",
  sameAs: [
    "https://linkedin.com/company/theclaireai",
    "https://www.crunchbase.com/organization/claireai",
  ],
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  inLanguage: "en-US",
  name: "ClaireAI",
  alternateName: "ClaireAI — AI Receptionist for Law Firms",
  description:
    "Autonomous AI receptionist that answers, qualifies, books, grades A–D, and dispatches a one-page brief and retainer for every inbound call.",
  url: BASE_URL,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "AI Receptionist for Law Firms",
  operatingSystem: "Web, iOS, Android",
  provider: { "@id": "https://theclaireai.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType: "U.S. law firms — personal injury, criminal defense, family law, immigration",
  },
  offers: {
    "@type": "AggregateOffer",
    url: "https://theclaireai.com/pricing",
    lowPrice: "450",
    highPrice: "1800",
    priceCurrency: "USD",
    offerCount: 3,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "450",
      priceCurrency: "USD",
      unitText: "MONTH",
      name: "ClaireAI Starter",
    },
  },
  featureList: [
    "First-ring pickup in under one second",
    "Bilingual intake (English and Spanish, 10+ languages on request)",
    "Lead IQ grading A through D",
    "One-page Claire's Brief dispatched to SMS, Slack, Teams, email, or CRM",
    "Calendar-aware consult booking (Google Workspace, Microsoft 365, Calendly)",
    "DocuSign retainer dispatch",
    "Native CRM sync — Clio, MyCase, Filevine, Lawmatics, PracticePanther, Smokeball, CASEpeer, CloudLex, HubSpot",
  ],
};

const techArticle = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  inLanguage: "en-US",
  headline: "AI Receptionist for Law Firms — ClaireAI Product Overview",
  description:
    "End-to-end AI receptionist for U.S. law firms: real-conversation intake, A–D lead grading, calendar booking, retainer dispatch, and CRM sync.",
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: organization,
  publisher: organization,
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "AI Receptionist for Law Firms" },
  keywords: [
    "AI receptionist",
    "AI legal intake",
    "law firm AI",
    "legal answering service",
    "Lead IQ",
    "Clio integration",
    "DocuSign retainer",
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

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Product Overview", item: BASE_URL },
  ],
};

export default function ProductOverviewPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* ─────────── Hero ─────────── */}
      <section className="px-6 pt-24 md:pt-28 pb-16 md:pb-20 bg-white">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[14px] text-[#0a0a0a]/55">
            <Link href="/" className="hover:text-[#0a0a0a] transition-colors">
              ClaireAI
            </Link>
            <span className="mx-2 text-[#0a0a0a]/30">/</span>
            <span className="text-[#0a0a0a]">Product Overview</span>
          </p>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
            <h1
              className="font-serif text-[#0a0a0a]"
              style={{
                fontSize: "clamp(3rem, 7.5vw, 112px)",
                lineHeight: "1.02",
                letterSpacing: "-0.025em",
                fontWeight: 400,
              }}
            >
              The AI Receptionist<br />
              for Law Firms
            </h1>

            <div className="lg:pt-6">
              <p className="max-w-[44ch] text-[17px] md:text-[18px] leading-[1.5] text-[#0a0a0a]/70">
                Every inbound call answered, qualified, booked, and briefed to your team — autonomously, in under two minutes.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded bg-[#0a0a0a] px-7 py-4 text-[15px] text-white transition-colors hover:bg-[#0a0a0a]/85"
              >
                Request a Demo
              </Link>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779107995/ChatGPT_Image_May_18_2026_at_08_39_31_AM.jpg"
                alt="ClaireAI AI receptionist for law firms — product overview preview"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Definition lede ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-10">
            What is ClaireAI?
          </p>
          <h2
            className="font-serif max-w-[30ch]"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 52px)",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            <span className="text-[#0a0a0a]">One receptionist. Every capability.</span>{" "}
            <span className="text-[#0a0a0a]/40">
              Claire answers, qualifies, books, and briefs your team — autonomously.
            </span>
          </h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Call lifecycle — three stages
          ═══════════════════════════════════════════════════════ */}

      {/* ─────────── Stage 1: First ring ─────────── */}
      <section id="stage-1" className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[12.5px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 mb-6">
            Stage 1 · First ring
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-start">
            <h2
              className="font-serif text-[#0a0a0a] max-w-[22ch]"
              style={{
                fontSize: "clamp(2rem, 4vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              What happens when an intake call comes in?
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.5] text-[#0a0a0a]/55 max-w-[56ch] lg:pt-3">
              Claire picks up on the first ring — no IVR, no hold music — and walks the caller through your firm&apos;s qualifying questions in real conversation.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779113892/ChatGPT_Image_May_18_2026_at_10_17_59_AM.jpg"
                alt="ClaireAI live call transcript — Stage 1 intake preview"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              {[
                { title: "Real conversation, never a menu", desc: "Sub-second response, natural turn-taking, full interruption handling. Callers don&rsquo;t know they&rsquo;re talking to AI until you tell them." },
                { title: "Calibrated to your practice area", desc: "PI captures statute timing and treatment status. Criminal handles in-custody escalation. Family handles UCCJEA and protective orders. Immigration runs in 10+ languages." },
                { title: "English, Spanish, 10+ on request", desc: "Bilingual by default with no quality drop. Additional languages — Mandarin, Vietnamese, Tagalog, Korean, Arabic, Russian, Haitian Creole, Portuguese, French, Polish — enabled per tenant." },
              ].map((item, i) => (
                <div key={i} className="border-t border-[#0a0a0a]/10 py-6 last:border-b">
                  <h3 className="text-[18px] md:text-[20px] font-medium text-[#0a0a0a] mb-2" style={{ letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p
                    className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/55"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Citable answer passage */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16">
            <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#0a0a0a]/70">
              {STAGE_1_ANSWER}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── Stage 2: Qualify, book, brief ─────────── */}
      <section id="stage-2" className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[12.5px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 mb-6">
            Stage 2 · Qualify, book, brief
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-start">
            <h2
              className="font-serif text-[#0a0a0a] max-w-[24ch]"
              style={{
                fontSize: "clamp(2rem, 4vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              How does Claire qualify and book during the call?
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.5] text-[#0a0a0a]/55 max-w-[56ch] lg:pt-3">
              Consults land on the right attorney&apos;s calendar before the call ends. The graded one-page Claire&apos;s Brief lands with your intake team within seconds of hang-up.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779114642/ChatGPT_Image_May_18_2026_at_10_29_25_AM.jpg"
                alt="ClaireAI calendar — Stage 2 booking and brief preview"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              {[
                { title: "Calendar-aware booking", desc: "Claire reads your attorneys&rsquo; availability in real time — Google Workspace, Microsoft 365, Calendly — and books directly into the right calendar." },
                { title: "Lead IQ grading A through D", desc: "Every call is scored against your firm&rsquo;s rubric. Case type, jurisdiction, severity, statute timing, and conflict flags all evaluated before hang-up." },
                { title: "Brief dispatched in seconds", desc: "Letter grade, three-sentence summary, full intake answers, and case intelligence — delivered to SMS, Slack, Teams, email, or your CRM." },
              ].map((item, i) => (
                <div key={i} className="border-t border-[#0a0a0a]/10 py-6 last:border-b">
                  <h3 className="text-[18px] md:text-[20px] font-medium text-[#0a0a0a] mb-2" style={{ letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p
                    className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/55"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              ))}
              <Link
                href="/product/lead-iq"
                className="mt-8 inline-flex items-center gap-2 text-[15px] text-[#0a0a0a] hover:text-[#c4913c] transition-colors"
              >
                See Lead IQ in detail
                <span className="text-[14px]">→</span>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16">
            <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#0a0a0a]/70">
              {STAGE_2_ANSWER}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── Stage 3: Retainer & sync ─────────── */}
      <section id="stage-3" className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[12.5px] uppercase tracking-[0.2em] text-[#0a0a0a]/40 mb-6">
            Stage 3 · Retainer & sync
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-start">
            <h2
              className="font-serif text-[#0a0a0a] max-w-[22ch]"
              style={{
                fontSize: "clamp(2rem, 4vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              What happens after the caller hangs up?
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.5] text-[#0a0a0a]/55 max-w-[56ch] lg:pt-3">
              Retainers e-sent through DocuSign overnight. Every contact, matter, and brief synced into your CRM — no copy-paste, no manual data entry.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
            <div className="relative aspect-[10/7] overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779115691/ChatGPT_Image_May_18_2026_at_10_47_51_AM.jpg"
                alt="ClaireAI integrations — Clio, MyCase, Filevine, Lawmatics, HubSpot, DocuSign, Slack, Teams, Calendly"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              {[
                { title: "DocuSign retainer dispatch", desc: "On grade-A leads pre-cleared by your firm, Claire drafts and e-sends the retainer with the prospect&rsquo;s data populated. Most retainers are signed before morning." },
                { title: "Automatic CRM sync", desc: "Contacts, matters, calendar entries, and briefs land in Clio, MyCase, Filevine, Lawmatics, PracticePanther, Smokeball, CASEpeer, CloudLex, HubSpot, and 60+ more — automatically." },
                { title: "Drip campaigns by grade", desc: "A leads get attorney callbacks. B leads get consult-booking SMS + 24-hour reminders. C leads get nurture. D leads get polite referral or decline copy in your firm&rsquo;s voice." },
              ].map((item, i) => (
                <div key={i} className="border-t border-[#0a0a0a]/10 py-6 last:border-b">
                  <h3 className="text-[18px] md:text-[20px] font-medium text-[#0a0a0a] mb-2" style={{ letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p
                    className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/55"
                    dangerouslySetInnerHTML={{ __html: item.desc }}
                  />
                </div>
              ))}
              <Link
                href="/integrations"
                className="mt-8 inline-flex items-center gap-2 text-[15px] text-[#0a0a0a] hover:text-[#c4913c] transition-colors"
              >
                Explore all 66 integrations
                <span className="text-[14px]">→</span>
              </Link>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16">
            <p className="text-[15.5px] md:text-[16px] leading-[1.65] text-[#0a0a0a]/70">
              {STAGE_3_ANSWER}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── Comparison table ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
            Comparison
          </p>
          <h2
            className="font-serif text-[#0a0a0a] max-w-[30ch] mb-10"
            style={{
              fontSize: "clamp(2rem, 4vw, 56px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            How does ClaireAI compare to a receptionist or answering service?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-t border-[#0a0a0a]/10">
              <thead>
                <tr className="border-b border-[#0a0a0a]/10">
                  <th className="py-4 px-4 text-left text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 font-normal w-1/4">
                    &nbsp;
                  </th>
                  <th className="py-4 px-4 text-left text-[13px] font-medium text-[#0a0a0a] w-1/4">
                    ClaireAI
                  </th>
                  <th className="py-4 px-4 text-left text-[13px] font-medium text-[#0a0a0a]/55 w-1/4">
                    Human receptionist
                  </th>
                  <th className="py-4 px-4 text-left text-[13px] font-medium text-[#0a0a0a]/55 w-1/4">
                    Answering service
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, i) => (
                  <tr key={i} className="border-b border-[#0a0a0a]/10">
                    <td className="py-4 px-4 text-[13px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">
                      {row.feature}
                    </td>
                    <td className="py-4 px-4 text-[14px] md:text-[15px] text-[#0a0a0a] font-medium">
                      {row.claire}
                    </td>
                    <td className="py-4 px-4 text-[14px] md:text-[15px] text-[#0a0a0a]/55">
                      {row.human}
                    </td>
                    <td className="py-4 px-4 text-[14px] md:text-[15px] text-[#0a0a0a]/55">
                      {row.service}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#e4e4e7]">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
            FAQ
          </p>
          <h2
            className="font-serif text-[#0a0a0a] max-w-[28ch] mb-16"
            style={{
              fontSize: "clamp(2rem, 4vw, 56px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            ClaireAI questions, answered.
          </h2>
          <div className="border-t border-[#e4e4e7]">
            {FAQS.map((f, idx) => (
              <details
                key={idx}
                className="group border-b border-[#e4e4e7] [&_summary::-webkit-details-marker]:hidden"
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
            className="font-serif text-[#0a0a0a] max-w-[20ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            See ClaireAI on a real intake call.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 30-minute walk-through. We&apos;ll show Claire answering a live call calibrated to your practice area, then route the brief and retainer into your stack.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-9 py-5 text-[17px] text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
