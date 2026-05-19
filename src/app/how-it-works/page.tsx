import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion, type FaqItem } from "@/components/how-it-works/faq-accordion";

export const metadata: Metadata = {
  title: "How ClaireAI Works — AI Legal Intake for Personal Injury, Criminal Defense & Family Law",
  description:
    "ClaireAI answers every law firm call in 0.8 seconds, qualifies the matter with a practice-area intake script, books the consultation, and dispatches the retainer.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How ClaireAI Works",
    description:
      "From the first ring to a signed retainer. AI legal intake for personal injury, criminal defense, and family law firms.",
    url: "https://theclaireai.com/how-it-works",
    type: "article",
  },
};

const SERIF_DISPLAY = {
  fontFamily: "var(--font-serif)",
  letterSpacing: "-0.02em",
  lineHeight: "0.95",
  fontFeatureSettings: '"liga" 0',
  fontWeight: 400,
  fontVariationSettings: '"opsz" 144',
} as const;

const steps: {
  n: string;
  title: string;
  headline: string;
  line: string;
  image?: string;
  imageAlt?: string;
}[] = [
  {
    n: "01",
    title: "Answer",
    headline: "How Claire answers",
    line: "Every inbound call answered on the first ring in 0.8 seconds, 24/7. A practice-area intake script — not a chatbot — captures the matter, grades the lead, books the consult, and dispatches the DocuSign retainer mid-call. Bilingual English/Spanish.",
    image:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778769561/ChatGPT_Image_May_14_2026_at_09_46_13_AM.jpg",
    imageAlt:
      "ClaireAI live call view showing an inbound personal injury call answered in 0.8 seconds with transcript and qualification grade.",
  },
  {
    n: "02",
    title: "Qualify",
    headline: "How Claire qualifies",
    line: "Every lead graded A through D in real time — case strength, liability, treatment status, statute of limitations, custody status, UCCJEA flags. Strong matters route to the attorney on call; weak ones are referred out.",
    image:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778772714/ChatGPT_Image_May_14_2026_at_11_31_25_AM.jpg",
    imageAlt:
      "ClaireAI lead qualification view showing real-time A-D grading, case strength signals, and routing decisions for a personal injury intake call.",
  },
  {
    n: "03",
    title: "Book",
    headline: "Consultation on the calendar before hang-up",
    line: "Qualified leads land on Google Calendar, Outlook, or Calendly with SMS and email confirmation sent before the caller hangs up. No callback gap.",
    image:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778774204/ChatGPT_Image_May_14_2026_at_11_56_28_AM.jpg",
    imageAlt:
      "ClaireAI booking view showing a consultation placed on Google Calendar with SMS and email confirmation sent to the caller before hang-up.",
  },
];

const crmLogos = [
  {
    name: "Clio",
    src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854428/6408debf8f29905e63913c85_5b4669b0bc344ee8d46ce80a_clio-logomark-4-2.png",
  },
  {
    name: "MyCase",
    src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854431/6408dec5a5cfb4a7395b71ee_62a7d11f5d414a83c151f860_mycase-1650999637-logo.png",
  },
  {
    name: "Lawmatics",
    src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854433/6408dec417d27f45a610910f_5cb51e3743310512688df15c_lawmatics-sq.png",
  },
  {
    name: "PracticePanther",
    src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854434/6408dec626e7bf014bc33cc5_5b46709c2605270d92f54f21_practice-panther-logomark-4.png",
  },
  {
    name: "Salesforce",
    src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854426/64af0428643cdbaa096eab86_Salesforce.com_logo.svg.png",
  },
  {
    name: "HubSpot",
    src: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854439/6408dec3a5cfb436515b7177_5b466ff95de4cb8a3e25d9de_hubspot-logomark-4.png",
  },
];

const practiceAreas = [
  {
    name: "Personal Injury",
    desc: "Mechanism of injury, treatment status, liability, and insurance — all captured before the caller dials the next firm.",
    image:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778776633/ChatGPT_Image_May_14_2026_at_12_34_04_PM.jpg",
    imageAlt:
      "ClaireAI personal injury intake — capturing mechanism of injury, treatment status, liability, and insurance details on a live call.",
  },
  {
    name: "Family Law",
    desc: "Softer pacing with emergency-signal escalation. Domestic violence, child abduction risk, and financial waste flagged within the hour.",
    image:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778776631/ChatGPT_Image_May_14_2026_at_12_36_46_PM.jpg",
    imageAlt:
      "ClaireAI family law intake — softer pacing with UCCJEA flags and emergency-signal escalation for domestic violence and abduction risk.",
  },
  {
    name: "Criminal Defense",
    desc: "In-custody matters paged to the on-call attorney by SMS within seconds. Routine matters book a consult on the spot.",
    image:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778776630/ChatGPT_Image_May_14_2026_at_12_36_50_PM.jpg",
    imageAlt:
      "ClaireAI criminal defense intake — capturing charges, custody status, court date, and bond information for in-custody and out-of-custody matters.",
  },
];

const securityPillars = [
  {
    title: "SOC 2 Type II infrastructure",
    desc: "Runs on Tier-1 cloud infrastructure independently certified to SOC 2 Type II, ISO 27001, and HIPAA standards.",
  },
  {
    title: "HIPAA-ready with a BAA",
    desc: "Personal injury firms handling medical records can execute a Business Associate Agreement on Professional and Enterprise plans.",
  },
  {
    title: "AES-256 at rest, TLS 1.3 in transit",
    desc: "All recordings, transcripts, and case notes are encrypted before they touch disk. Every connection moves over TLS 1.3.",
  },
  {
    title: "We don't train on your calls",
    desc: "Your calls, transcripts, and case notes are never used to train or fine-tune any model — ours, OpenAI's, or anyone else's. Each firm runs in its own encrypted tenant.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What is ClaireAI?",
    answer:
      "ClaireAI is an AI legal receptionist built specifically for law firms. It answers inbound calls in under one second, runs practice-area intake scripts for personal injury, criminal defense, family law, and immigration matters, books consultations on the firm's calendar, syncs the lead into the firm's CRM, and can dispatch a DocuSign retainer directly from the call. Claire is fully bilingual in English and Spanish, and runs 24/7/365.",
  },
  {
    question: "How does ClaireAI qualify a personal injury call?",
    answer:
      "Claire follows a structured personal injury intake script that mirrors what a trained paralegal would ask: mechanism of injury, date and location, statute-of-limitations triage, treatment status, liability facts, all insurance involved (including UIM/UM), police report details, witnesses, lost wages, and prior representation. Each call is graded A–D based on case strength and routed accordingly.",
  },
  {
    question: "Does ClaireAI work for criminal defense intake?",
    answer:
      "Yes. For criminal defense matters, Claire captures the charges filed, custody status (in or out), next court date and jurisdiction, prior record, bond information, witness or co-defendant overlap, retained-vs-appointed status, and urgency flags such as upcoming arraignments or detention hearings. Time-critical matters are escalated by SMS to the attorney on call.",
  },
  {
    question: "How does ClaireAI handle family law intake?",
    answer:
      "For family law calls — divorce, custody, support, protective orders — Claire captures jurisdiction, length of marriage, presence and ages of children, whether emergency relief is needed (DV, kidnapping risk, financial waste), existing orders, current employment, and disposition. Sensitive callers are handled with a softer, slower script and offered a same-day callback.",
  },
  {
    question: "Which CRMs does ClaireAI integrate with?",
    answer:
      "ClaireAI pushes qualified leads directly into Clio, MyCase, Filevine, Lawmatics, PracticePanther, Salesforce, HubSpot, and any system with a webhook or Zapier endpoint. Calendar booking works with Google Calendar, Outlook, and Calendly. Custom field mapping is handled during a one-time onboarding step.",
  },
  {
    question: "How long does it take to deploy ClaireAI?",
    answer:
      "Most firms are live within 3–5 business days. Onboarding includes mirroring the firm's existing intake script, training Claire on practice areas and routing rules, wiring CRM and calendar integrations, and porting the firm's main number. Every plan includes a 7-day free trial — Claire goes live on real calls from day one.",
  },
  {
    question: "Is ClaireAI HIPAA and SOC 2 compliant?",
    answer:
      "ClaireAI runs on SOC 2 Type II infrastructure with HIPAA-aligned controls — end-to-end encryption (AES-256 at rest, TLS 1.3 in transit) for calls, transcripts, and PII. Our own SOC 2 Type II audit is in progress. For firms handling medical records in personal injury matters, a Business Associate Agreement (BAA) is available on the Professional and Enterprise tiers. Every firm runs in its own isolated tenant — no cross-firm data sharing, no shared model fine-tuning, no transcript reuse.",
  },
  {
    question: "Will callers know they're speaking to an AI?",
    answer:
      "Claire opens every call by identifying herself as the firm's AI assistant. Most callers don't notice the difference past the first sentence — Claire interrupts, handles cross-talk, asks clarifying follow-ups, and adapts to a softer tone for emotionally heavy matters like family law or wrongful death. Firms can also configure Claire to introduce herself as the firm's automated receptionist by name. Transparency is a product choice, not a workaround: callers who explicitly ask for a human are routed to your on-call attorney by warm transfer.",
  },
  {
    question: "What happens if a caller asks for a human or Claire can't answer?",
    answer:
      "Claire warm-transfers to the firm's on-call attorney any time the caller explicitly asks for a person, or when the matter falls outside Claire's intake script. The transfer carries the live transcript and qualification grade so the attorney picks up with full context — no asking the caller to repeat themselves. After hours, the caller is given a guaranteed callback window and the matter is paged to the on-call attorney by SMS.",
  },
  {
    question: "How does ClaireAI compare to a service like Smith.ai or Ruby Receptionists?",
    answer:
      "Smith.ai and Ruby use live human receptionists priced per minute or per call, which means after-hours costs scale unpredictably and intake quality varies by who picks up. ClaireAI runs on a flat monthly subscription with a per-signed-retainer success fee, answers in 0.8 seconds 24/7/365 on a consistent script, and dispatches the engagement letter directly from the call. Firms typically replace a $2,000–$4,000/month answering service spend with a $450–$1,800/month Claire plan while also recovering after-hours leads that previously hit voicemail.",
  },
  {
    question: "How does Claire handle spam, robocalls, and solicitations?",
    answer:
      "Spam numbers, debt collectors, and known robocaller patterns are filtered before they touch the intake script — firms aren't charged for blocked calls. Solicitations and sales calls (\"We can rank your firm on Google\") are politely declined and logged in the Control Room. Time is preserved for real prospects only.",
  },
  {
    question: "Can Claire make outbound calls?",
    answer:
      "Yes. Claire can place callback confirmations to qualified leads, follow-up calls when a retainer hasn't been signed, and bilingual reminders before a scheduled consultation. Outbound is opt-in per plan and never used for cold outreach — only for callers who originated the contact or signed an engagement letter.",
  },
  {
    question: "Does Claire have to cover all calls, or can we use it for overflow and after-hours?",
    answer:
      "Both. Most firms run Claire as their primary line — every call answered, every lead qualified. Some firms route only after-hours and overflow calls to Claire while their daytime receptionist handles business-hours traffic. Time-of-day routing, ring-then-handoff, and language-based routing are all configured during onboarding.",
  },
  {
    question: "Where can I review call recordings and transcripts?",
    answer:
      "Every call is recorded, transcribed, and summarized inside the Control Room dashboard. Recordings are searchable by practice area, qualification grade, caller name, and date. Transcripts are pushed to the CRM lead record alongside the call summary. Firms can also receive a daily email digest and per-call SMS notifications for high-grade leads.",
  },
  {
    question: "What does Claire do if the caller speaks Spanish?",
    answer:
      "Claire detects the caller's language on the first phrase and conducts the entire intake — qualification questions, calendar booking, retainer dispatch — in Spanish. Mid-call language switching is supported (callers often start in Spanish and revert to English for legal terms). All Spanish-language transcripts are also stored in English for attorney review.",
  },
  {
    question: "Can the intake script be customized per practice area or per attorney?",
    answer:
      "Yes. Every Claire deployment is configured against the firm's actual intake protocols. Practice-area branching (PI vs criminal vs family), attorney-specific routing (Attorney X handles DUIs only), jurisdiction-specific compliance language (statute of limitations warnings, fee-agreement disclosures), and matter-type carve-outs (no class action, no workers' comp) are all customizable. Onboarding includes a one-time script mirroring step where Claire is trained on your existing intake playbook.",
  },
  {
    question: "How fast does Claire respond, and can she be interrupted mid-sentence?",
    answer:
      "Claire targets sub-1-second time-to-first-word on pickup and roughly 1.2–1.5 seconds end-to-end turn latency, which sits inside the 800 ms–2 s window humans perceive as natural conversation. Callers can interrupt her at any point — Claire uses streaming speech-to-text and a turn-detection model that distinguishes a real barge-in from a filler word like \"um,\" so she yields the floor without cutting people off or stepping on them.",
  },
  {
    question: "What happens if Claire goes down or the AI is unreachable?",
    answer:
      "Every ClaireAI deployment ships with a forwarding fallback: if our voice infrastructure is unhealthy or the underlying model is unreachable for more than a few seconds, the call automatically routes to your configured backup number (typically a partner attorney's cell, a paralegal, or your existing answering service). We also offer an always-on voicemail-to-transcript fallback so no caller hits a dead line. Our platform runs on LiveKit Cloud with multi-region failover and posts live status at status.theclaireai.com.",
  },
  {
    question: "Do we have to port our phone number, or can we keep our existing line?",
    answer:
      "You don't have to port anything. Most firms simply forward their existing main line to the ClaireAI number — full-time, after-hours only, or as overflow when your front desk doesn't pick up in 3–4 rings. Setup takes about 5 minutes via your carrier's call-forwarding settings (or *72 on most landlines). If you'd rather Claire own the number outright, we can port it on a 1–4 business-day timeline at no extra cost.",
  },
  {
    question: "How does Claire handle two-party-consent recording states?",
    answer:
      "Claire opens every call with a recording disclosure tuned to your jurisdiction — in two-party-consent states (CA, FL, IL, MD, MA, PA, WA, and six more) she captures explicit verbal consent before continuing intake, and the consent clip is saved alongside the recording. If a caller declines, Claire continues the call without recording (transcripts are still generated from in-memory audio that isn't persisted). For multi-state firms, we default to the stricter rule when the caller's area code crosses a consent-state line.",
  },
  {
    question: "How does Claire transfer a call to an attorney — warm or blind?",
    answer:
      "Claire does warm transfers by default. When a caller qualifies for immediate attorney contact (emergency keywords like \"arrested,\" \"bail,\" or a flagged practice area), Claire dials the attorney on a consult line, briefs them in 2–3 sentences with the caller's name, matter type, and key facts, and then bridges the caller in. The attorney can accept, decline, or send to voicemail without the caller ever hearing the consult. Blind transfer is available as a config option for firms that prefer it.",
  },
  {
    question: "Can Claire run a conflict-of-interest check at first contact?",
    answer:
      "Yes. Claire collects the caller's full name plus the opposing party's name (when applicable) during intake and runs a fuzzy-match conflict check against your CRM's contacts and matters before the call ends. If a potential conflict is flagged, Claire politely declines to schedule a consult, takes a message, and routes the lead to your conflict-clearance workflow for manual review instead of booking the appointment. Audit trails are preserved per ABA Model Rule 1.6(c).",
  },
  {
    question: "Will Claire recognize a returning client by their phone number?",
    answer:
      "Yes. On every inbound call, Claire matches the caller ID against your CRM. If she finds an existing client or active matter, she greets them by name, skips the new-lead qualification flow, and routes them straight to their assigned paralegal or attorney (or takes a message if that person is unavailable). New numbers go through the full intake script. Caller-ID spoofing is rare, but Claire will verify identity if a returning caller's voice or context doesn't match the record on file.",
  },
  {
    question: "When does the transcript, summary, and CRM record actually appear after a call?",
    answer:
      "Transcripts are generated in real time and finalized within about 10 seconds of hang-up. The structured CRM record (caller name, matter type, qualifying answers, booked consult time, retainer status) is written to your CRM within 30–60 seconds. The attorney brief (Claire's plain-English summary plus call recording link) is delivered via email and SMS within 1–2 minutes. DocuSign retainer and SMS notification fire immediately on qualified calls — usually before the caller has even hung up.",
  },
  {
    question: "How does Claire decide which attorney to book a consult with at a multi-attorney firm?",
    answer:
      "Claire follows your firm's routing rules in priority order: (1) practice-area + jurisdiction match (PI cases to your PI attorney, family law to family attorneys), (2) existing-client or matter assignment if the caller is returning, (3) round-robin across the qualified pool when multiple attorneys match, weighted by current consult load and your configured availability windows. You can override any rule per practice area or designate specific attorneys for emergency keywords.",
  },
  {
    question: "How long does Claire keep call recordings, and how are they protected?",
    answer:
      "Default retention is 90 days for audio and 7 years for transcripts and structured intake data (aligned with most state-bar document-retention rules); both windows are configurable per firm. Recordings are encrypted at rest (AES-256) and in transit (TLS 1.3), stored in SOC 2-compliant infrastructure, and access-controlled to named users on your account. You can request bulk deletion or per-call deletion through your dashboard, and any caller can request deletion of their own recording under CCPA or state privacy laws — Claire honors those requests within 30 days.",
  },
  {
    question: "Can a caller leave a voicemail or request a callback if they don't want to talk to Claire?",
    answer:
      "Yes. If a caller asks for voicemail, says \"just have someone call me back,\" or seems hesitant, Claire offers three options: take a written message and notify the on-call attorney immediately, schedule a callback at a specific time the caller picks, or transfer to a human if one is available. There's no hold music and no IVR tree — Claire just asks what works best. Voicemails are transcribed and routed identically to live calls.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "How ClaireAI Works",
  description:
    "Walkthrough of how ClaireAI handles personal injury, criminal defense, and family law intake calls.",
  about: [
    "AI legal receptionist",
    "Legal intake automation",
    "Personal injury intake",
    "Criminal defense intake",
    "Family law intake",
  ],
  inLanguage: "en-US",
  url: "https://theclaireai.com/how-it-works",
  publisher: {
    "@type": "Organization",
    name: "ClaireAI",
    url: "https://theclaireai.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://theclaireai.com/how-it-works",
  },
  datePublished: "2026-05-12",
  dateModified: "2026-05-12",
};

const CrmLogoBar = () => (
  <section className="bg-white px-6 py-16 md:py-20">
    <div className="mx-auto max-w-[1680px]">
      <div className="grid grid-cols-3 md:grid-cols-6 items-center gap-y-12 gap-x-10">
        {crmLogos.map((logo) => (
          <div key={logo.name} className="flex items-center justify-center">
            <img
              src={logo.src}
              alt={`${logo.name} — native ClaireAI integration`}
              className="h-14 md:h-16 w-auto grayscale opacity-75 hover:opacity-100 transition"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SecurityStrip = () => (
  <section className="border-t border-[#e4e4e7] bg-white px-6 py-24">
    <div className="w-full max-w-[1680px] mx-auto">
      <div className="mb-16 border-b border-[#0a0a0a]/15 pb-6">
        <h2
          className="font-serif text-[#0a0a0a]"
          style={{
            fontSize: "clamp(2.25rem, 4vw, 56px)",
            lineHeight: "1",
            letterSpacing: "-0.01em",
            fontWeight: 400,
            fontVariationSettings: '"opsz" 144',
            fontFeatureSettings: '"liga" 0',
          }}
        >
          Core Security
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full border-t border-l border-[#e4e4e7]">
        {securityPillars.map((p, i) => (
          <div
            key={p.title}
            className="bg-white p-10 md:p-14 flex flex-col justify-start border-r border-b border-[#e4e4e7] hover:bg-[#fafafa] transition-colors h-full min-h-[500px]"
          >
            <h3
              className="text-[#0a0a0a] mb-8 leading-[1.25]"
              style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              <span className="opacity-40 text-[10px] block mb-3 uppercase tracking-[0.14em] font-medium">
                {String(i + 1).padStart(2, "0")} //
              </span>
              {p.title}
            </h3>
            <p className="text-[#0a0a0a]/60 text-base md:text-lg leading-relaxed font-sans">
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ClaireAI",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "AI Receptionist for Law Firms",
  operatingSystem: "Web, iOS, Android",
  description:
    "AI-powered virtual receptionist for law firms. Sub-1-second pickup, practice-area intake scripts, retainer automation. Bilingual (English / Spanish), 24/7.",
  url: "https://theclaireai.com/how-it-works",
  provider: { "@id": "https://theclaireai.com/#organization" },
  inLanguage: ["en", "es"],
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Law firms — personal injury, criminal defense, family law, immigration",
  },
  offers: {
    "@type": "AggregateOffer",
    url: "https://theclaireai.com/pricing",
    lowPrice: "450",
    highPrice: "1800",
    priceCurrency: "USD",
    offerCount: 3,
  },
};

const HERO_IMAGE =
  "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778767032/ChatGPT_Image_May_14_2026_at_09_54_21_AM.jpg";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─────────── Hero ─────────── */}
      <section className="pt-2 pb-12 md:pt-3 md:pb-16 px-6">
        <div className="mx-auto max-w-[1680px] grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-[10px] items-stretch lg:min-h-[820px]">
          {/* Left column — eyebrow + H1 + paragraph at top, CTAs anchored at bottom */}
          <div className="lg:max-w-[560px] lg:pt-[180px] lg:pb-10 flex flex-col h-full">
            <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-7 leading-[1.55]">
              How it works
            </p>
            <h1
              className="text-[#0a0a0a] font-sans"
              style={{
                fontSize: "clamp(2.25rem, 3.5vw, 52px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              From the first ring to a signed retainer.
            </h1>
            <p className="mt-7 max-w-[440px] text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/55">
              AI legal intake, from first ring to signed retainer. In English or Spanish, 24/7.
            </p>
            <div className="mt-10 lg:mt-auto lg:pt-10 flex gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-[#0a0a0a] px-6 py-3 text-[14px] text-white transition-colors hover:bg-[#0a0a0a]/85"
              >
                Book a demo
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center border border-[#0a0a0a]/15 px-6 py-3 text-[14px] text-[#0a0a0a] transition-colors hover:border-[#0a0a0a]/50"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Right column — full-cover hero image */}
          <div className="overflow-hidden bg-[#f6f7f4] min-h-[640px] lg:min-h-[820px]">
            <img
              src={HERO_IMAGE}
              alt="ClaireAI in action — a live AI legal intake call answered in 0.8 seconds, with practice-area qualification and CRM sync visible on screen."
              className="w-full h-full object-cover block"
            />
          </div>
        </div>
      </section>

      {/* ─────────── CRM integration logo bar ─────────── */}
      <CrmLogoBar />

      {/* ─────────── The flow — Legora bento pattern, white bg, 120px gap between cards ─────────── */}
      <section className="bg-white px-6 py-16 md:py-20">
        <div className="mx-auto max-w-[1680px] space-y-[60px] md:space-y-[120px]">
          {steps.map((step, i) => {
            const reverse = i % 2 === 1;
            return (
              <article key={step.n}>
                <div
                  className={`flex flex-col lg:flex-row items-start gap-8 lg:gap-12 ${
                    reverse ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image column — 66%, image at natural aspect (text aligns to image top, no crop) */}
                  <div className="lg:basis-[66%] lg:flex-shrink-0 w-full overflow-hidden">
                    {step.image ? (
                      <img
                        src={step.image}
                        alt={step.imageAlt ?? `ClaireAI ${step.title.toLowerCase()} step illustration`}
                        className="w-full h-auto block"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full aspect-[3/2] flex items-center justify-center bg-[#f6f7f4]">
                        <p className="text-[11px] tracking-[0.18em] uppercase text-[#0a0a0a]/30">
                          {step.title} visual coming soon
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Text column — 30%, top-aligned with image top, matches hero paragraph spec */}
                  <div className="lg:basis-[30%] lg:flex-shrink-0 lg:max-w-[414px]">
                    <p className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]">
                      {step.headline}
                    </p>
                    <p className="mt-1 text-[15.5px] md:text-[16px] leading-[1.55] text-[#6b6b6b]">
                      {step.line}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ─────────── Works with these practice areas — three vertical cards ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/55 mb-10 md:mb-12">
            Works with these practice areas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {practiceAreas.map((area) => (
              <article
                key={area.name}
                className="relative aspect-[3/4] overflow-hidden bg-[#f6f7f4]"
              >
                {/* Full-bleed background image — shifted right to crop the leftmost edge artifact */}
                <img
                  src={area.image}
                  alt={area.imageAlt}
                  className="absolute inset-0 w-full h-full object-cover block"
                  style={{ objectPosition: "75% center" }}
                  loading="lazy"
                />
                {/* Gradient scrim for caption legibility — tighter, sits under the caption only */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0) 100%)",
                  }}
                />
                {/* Bottom-left caption — tighter padding */}
                <div className="absolute left-0 right-0 bottom-0 p-5 md:p-6 lg:p-7">
                  <p className="text-[15.5px] md:text-[16px] leading-[1.55] text-white">
                    {area.name}
                  </p>
                  <p className="mt-1 text-[15.5px] md:text-[16px] leading-[1.55] text-white/80 max-w-[36ch]">
                    {area.desc}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Security & compliance ─────────── */}
      <SecurityStrip />

      {/* ─────────── FAQ (matches pricing FAQ layout) ─────────── */}
      <section className="border-t border-[#e4e4e7] bg-white px-6">
        <div className="w-full max-w-[1680px] mx-auto mt-40 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-[56px] text-[#0a0a0a] font-serif mb-6 tracking-[-0.02em]">
              Frequently Asked Questions
            </h2>
            <p className="text-[#0a0a0a]/60 text-lg md:text-xl">
              Everything you need to know about how ClaireAI handles a law firm intake call.
            </p>
          </div>
          <FaqAccordion faqs={faqs} />
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
            className="text-[#0a0a0a] font-sans"
            style={{
              fontSize: "clamp(2.75rem, 6vw, 84px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            See Claire handle<br />
            a live call.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-md text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a twenty-minute demo. We'll run a personal injury, criminal defense, or family law intake against your existing script — live, with a real call.
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
