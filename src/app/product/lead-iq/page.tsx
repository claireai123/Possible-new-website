import type { Metadata } from "next";
import Link from "next/link";

const PUBLISHED = "2026-05-15";
const LAST_UPDATED = "2026-05-15";
const BASE_URL = "https://theclaireai.com/product/lead-iq";

export const metadata: Metadata = {
  title: "Lead IQ — AI Lead Scoring for Law Firms",
  description:
    "Claire's Lead IQ grades every inbound intake call A through D and ships a one-page brief to your team within seconds of hang-up. Cuts intake review time roughly in half.",
  alternates: { canonical: "/product/lead-iq" },
  openGraph: {
    title: "Lead IQ — AI Lead Scoring for Law Firms",
    description:
      "AI-graded leads, delivered to your intake team before the caller hangs up. A/B/C/D rubric calibrated to your firm's case criteria.",
    url: BASE_URL,
    type: "article",
  },
};

const DEFINITION = `Claire's Lead IQ is the AI lead scoring system built into ClaireAI's legal receptionist. After every inbound call — qualified or not — Claire's intake AI grades the prospect A through D against your firm's specific case criteria, then dispatches a one-page brief to your intake team within seconds of the caller hanging up. The brief carries the letter grade, a three-sentence summary of who called and why, and a full case-intelligence section that propagates data from similar prior calls — jurisdiction patterns, opposing counsel, statute-of-limitations status, conflict flags. Briefs ship to whatever messaging platform your team already lives in — SMS, Slack, Microsoft Teams, email, or your practice management CRM — and trigger AI-drafted drip campaigns scoped to the grade. U.S. law firms using Lead IQ cut intake review time roughly in half by replacing transcript-reading and recording-listening with a 30-second skim.`;

const CALIBRATION_STEPS: string[] = [
  "Kickoff call with your intake lead. We define what an A lead looks like for your firm — case type, jurisdiction, economics, statute timing, conflict criteria, ideal-customer fit.",
  "Calibration against your last 30 days of intake. We replay recent calls through the rubric and tune until your team would grade them the same way Claire does.",
  "Go-live with continuous tuning. Lead IQ learns from your team's overrides — every time you regrade a lead, the model updates. No quarterly recalibration meeting required.",
  "Quarterly review (optional). We share scoring distribution, conversion rates by grade, and recommended rubric adjustments — you decide what changes.",
];

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How does Lead IQ learn what an A lead looks like for our firm?",
    answer:
      "During the kickoff call we capture your firm's intake priorities directly from your intake lead — case type, jurisdiction, severity bands, conflict rules, and the economic threshold below which you wouldn't take a matter. Those criteria become the rubric Claire grades against. We then calibrate by replaying your last 30 days of intake calls through the rubric until your team agrees with the grades. Tuning continues from there: every time your coordinator overrides a grade, the model updates.",
  },
  {
    question: "What messaging platforms can Lead IQ ship the brief to?",
    answer:
      "Briefs ship to SMS, Slack, Microsoft Teams, email, and directly into your practice management CRM (Clio, MyCase, Filevine, Lawmatics, PracticePanther, HubSpot, and 60+ others). You can route different grades to different channels — A leads SMS the on-call attorney, all four grades land in the CRM as a structured record.",
  },
  {
    question: "What's actually in the AI drip campaigns?",
    answer:
      "Each grade triggers a different cadence drafted in your firm's voice. A leads get attorney-callback prompts and retainer dispatch where pre-cleared. B leads get a consult-booking SMS, 24-hour reminder, and 72-hour second attempt. C leads get a single nurture message and CRM-only tracking. D leads get a polite referral or decline. Your intake lead approves the templates during onboarding; copy can be updated anytime.",
  },
  {
    question: "Is Lead IQ secure and compliant?",
    answer:
      "Yes. ClaireAI runs on SOC 2 Type II infrastructure with HIPAA-aligned controls (our own SOC 2 Type II audit is in progress). Lead IQ data is encrypted with 256-bit AES at rest and in transit, stored in an isolated tenant per firm, and never used to train cross-customer models. Call recordings and transcripts are retained per your firm's retention policy.",
  },
  {
    question: "Does Lead IQ work for criminal defense and family law, not just PI?",
    answer:
      "Yes. The A/B/C/D rubric is firm-specific by design — a criminal defense firm calibrates around charge severity, jurisdiction, in-custody status, and prior counsel; a family law firm calibrates around custody factors, UCCJEA flags, and protective-order urgency. The same Lead IQ engine runs all three practice areas because the criteria layer is yours, not ours.",
  },
  {
    question: "How is Lead IQ different from generic CRM lead scoring?",
    answer:
      "Traditional CRM lead scoring runs after the lead is written, based on form fields and behavioral data. Lead IQ runs on the call audio in real time — Claire grades the prospect from the conversation itself, not from a form. The brief includes case intelligence from similar prior calls, which is something generic CRM scoring can't produce because it has no access to call content.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most firms are live in under a week: kickoff call (60 minutes), criteria definition (24-hour turnaround on our end), calibration against your recent calls (2-3 days), then go-live. The integration is included on every ClaireAI plan with no per-grade or per-brief surcharge.",
  },
  {
    question: "What happens if Lead IQ grades a case wrong? Can attorneys override the grade?",
    answer:
      "Every grade is a recommendation, not a verdict. Partners and intake managers can override any A–D grade in one click from the brief — your override becomes a training signal, and Lead IQ recalibrates against your firm's rubric within the next intake batch. Statute-of-limitations edge cases (incident within 90 days of the SoL, discovery-rule jurisdictions, government claim deadlines) are hardcoded to bypass auto-rejection and route to human review regardless of score, so a wrong \"D\" never costs you a seven-figure case.",
  },
  {
    question: "Can we audit every grade Lead IQ assigns? Is there a paper trail if a referral source asks why their lead got a C?",
    answer:
      "Yes. Every brief stores the full decision trail — the rubric criteria that fired, the call transcript moments that triggered them, the score weight per criterion, and any human override. Export the audit log to PDF, CSV, or push it into your matter file in Filevine, Litify, or Lawmatics. When a chiropractor referral source pushes back on a low grade, you can show them exactly what the intake said in 30 seconds.",
  },
  {
    question: "Does AI lead grading actually move sign rates, or are we just sorting the same leads faster?",
    answer:
      "Industry average lead-to-client conversion is 25–35%; elite firms push 55%+. Lead IQ lifts sign rates two ways: by routing A-grade calls to a live attorney within 5 minutes (which Forrester/InsideSales data shows lifts conversion roughly 300%), and by keeping B and C leads warm through grade-specific drips instead of letting them die in voicemail purgatory. Firms running Lead IQ for 90 days typically see sign-rate improvements of 8–15 percentage points on the same lead volume.",
  },
  {
    question: "Are the SMS drip campaigns TCPA-compliant? What about 10DLC and quiet-hours?",
    answer:
      "Yes. Lead IQ collects express written consent during the intake call (\"Is it OK if we follow up by text?\"), logs the timestamp and recording for proof, honors STOP and UNSUBSCRIBE within seconds, and enforces 8 a.m.–9 p.m. local quiet hours per CTIA rules. All campaign numbers are pre-registered under 10DLC with carrier-approved use cases. Opt-out, consent-revocation, and the FCC's new 10-day revocation rule are all built in — your firm never has to wonder if a $500–$1,500-per-message TCPA exposure is sitting in your drip queue.",
  },
  {
    question: "Can we customize what's in Claire's Brief? Different partners want different things.",
    answer:
      "Yes. Each practice group can define its own brief template — PI partners typically want injury severity, treatment status, liability facts, insurance limits, and prior-attorney flag; family-law partners want asset indicators, conflict level, custody complexity, and protective-order overlap; criminal-defense wants charge severity, custody status, prior record, and bond posture. Rubric criteria and brief fields are configured in the same place, so your \"A lead\" definition and your brief structure stay in sync.",
  },
  {
    question: "Is the brief privileged? What if it's discoverable in litigation?",
    answer:
      "Briefs generated during pre-engagement intake live in a gray zone — they're typically not protected by attorney-client privilege until representation begins, and AI-generated summaries have been held discoverable in cases like US v. Heppner (2026). Lead IQ defaults to storing briefs inside your matter management system (Filevine, Litify, Lawmatics) under attorney direction, which is the configuration NYC Bar Formal Opinion 2025-6 endorses for work-product protection. We never train shared models on your call data, and briefs are encrypted at rest in your dedicated tenant.",
  },
  {
    question: "Can the rubric pull from our matter types in Filevine or Lawmatics? We don't want two definitions of \"good case.\"",
    answer:
      "Yes. Lead IQ syncs bi-directionally with Filevine, Litify, Lawmatics (QualifyAI fields), CallRail tags, and any system with a public API or Zapier connection. Your matter-type taxonomy, case-value fields, and historical settlement data feed the rubric, and signed and declined outcomes flow back as training signals. When you adjust your case acceptance criteria in Filevine, the rubric inherits the change at next sync — no parallel spreadsheet to maintain.",
  },
  {
    question: "How is the brief different from a call recording or transcript? My intake manager already reviews calls.",
    answer:
      "A 12-minute call recording takes 12 minutes (or 4 minutes at 3x) to review; Claire's Brief takes 30 seconds. The brief is structured — injury, liability, damages, red flags, recommended action — not a wall of text. It also extracts what a human reviewer typically misses on a fast listen: missing fact-pattern elements, inconsistent statements, statute-of-limitations math, and prior-counsel disclosures. Recording is for compliance and disputes; the brief is for triage. You get both.",
  },
  {
    question: "What's the false-reject rate, and how do you measure it?",
    answer:
      "Lead IQ tracks every \"D\"-graded lead for 180 days post-intake and flags any that the firm later signs as a \"false reject.\" Our published target is under 2% false-reject rate against firms' own historical decisions, measured monthly and visible in your admin dashboard. If false-rejects spike, the rubric is auto-flagged for review and we'll schedule a calibration session before the next billing cycle.",
  },
  {
    question: "Do the drip campaigns sound like our firm or like generic legal spam?",
    answer:
      "Every campaign is voice-tuned to your firm — we ingest your existing email and SMS templates, your website copy, attorney bios, and three sample sent messages, then generate drips that match your tone (folksy plaintiff vs. white-shoe defense vs. boutique family). Partners review and approve the first batch before anything sends. Open rates on tuned legal SMS campaigns typically run 95%+, and email open rates beat the 22–25% legal-industry average because grade-segmented messages are relevant to where the lead is.",
  },
  {
    question: "What about edge cases — multi-defendant criminal, parental kidnapping, complex multi-party divorce?",
    answer:
      "Multi-defendant criminal cases (co-defendant conflicts, severance issues), parental kidnapping or domestic-violence overlap in family law, mass-tort plaintiffs, and class-eligible cases all trigger a \"complex\" flag that overrides single-grade output and routes the brief straight to a partner with the complexity reasoning shown. We don't try to grade \"is this a multi-defendant murder-1 with a snitch problem\" on an A–D scale — that's a partner conversation, and Lead IQ knows it.",
  },
  {
    question: "How often does the rubric retrain, and can we A/B test rubric changes before rollout?",
    answer:
      "Lead IQ auto-retrains every 14 days against your signed and declined outcomes — the same cadence Microsoft Dynamics 365 uses for its predictive lead score model, the established industry standard. You can also run rubric changes as A/B experiments: split incoming calls 50/50 between current and proposed rubrics, watch sign-rate and revenue-per-lead diverge for two weeks, then commit the winner. No \"set it and forget it\" — and no flying blind on changes.",
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
  name: "Claire's Lead IQ",
  alternateName: "ClaireAI Lead IQ — AI Lead Scoring for Law Firms",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "AI Lead Scoring for Law Firms",
  operatingSystem: "Web, iOS, Android",
  description: DEFINITION,
  url: BASE_URL,
  provider: { "@id": "https://theclaireai.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType: "U.S. law firms — personal injury, criminal defense, family law",
  },
  offers: {
    "@type": "Offer",
    url: "https://theclaireai.com/pricing",
    price: "450",
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: "450",
      priceCurrency: "USD",
      unitText: "MONTH",
      name: "ClaireAI Starter — includes Lead IQ",
    },
  },
  featureList: [
    "A–D lead grading on every inbound call",
    "One-page Claire's Brief dispatched in seconds",
    "Brief delivery to SMS, Slack, Microsoft Teams, email, or CRM",
    "Grade-specific drip campaigns",
    "Audit trail per grade with override support",
  ],
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

const techArticle = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  inLanguage: "en-US",
  headline: "Lead IQ — AI Lead Scoring for Law Firms",
  description: DEFINITION,
  url: BASE_URL,
  datePublished: PUBLISHED,
  dateModified: LAST_UPDATED,
  author: organization,
  publisher: organization,
  mainEntityOfPage: BASE_URL,
  about: { "@type": "Thing", name: "AI Lead Scoring for Law Firms" },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
    { "@type": "ListItem", position: 2, name: "Product", item: "https://theclaireai.com/product" },
    { "@type": "ListItem", position: 3, name: "Lead IQ", item: BASE_URL },
  ],
};

export default function LeadIQPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* ─────────── Hero ─────────── */}
      <section className="px-6 pt-24 md:pt-28 pb-16 md:pb-20 bg-white">
        <div className="mx-auto max-w-[1680px]">
          {/* Breadcrumb */}
          <p className="text-[14px] text-[#0a0a0a]/55">
            <Link href="/product" className="hover:text-[#0a0a0a] transition-colors">
              Product Overview
            </Link>
            <span className="mx-2 text-[#0a0a0a]/30">/</span>
            <span className="text-[#0a0a0a]">Lead IQ</span>
          </p>

          {/* Headline + right column */}
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
              Grade Every<br />
              Lead Before<br />
              Hang-Up
            </h1>

            <div className="lg:pt-6">
              <p className="max-w-[44ch] text-[17px] md:text-[18px] leading-[1.5] text-[#0a0a0a]/70">
                AI-graded intake calls with a one-page brief delivered to your team within seconds of hang-up — into whatever messaging platform you already use.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center justify-center rounded bg-[#0a0a0a] px-7 py-4 text-[15px] text-white transition-colors hover:bg-[#0a0a0a]/85"
              >
                Request a Demo
              </Link>
            </div>
          </div>

          {/* Hero visual */}
          <div className="mt-16 md:mt-20">
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1778869168/ChatGPT_Image_May_15_2026_at_02_19_12_PM.jpg"
                alt="Claire's Brief intake call — Grade A preview, placeholder mockup"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Definition — Harvey-style two-tone lede ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-10">
            What is Lead IQ?
          </p>
          <h2
            className="font-serif max-w-[32ch]"
            style={{
              fontSize: "clamp(2rem, 3.6vw, 52px)",
              lineHeight: "1.15",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            <span className="text-[#0a0a0a]">Graded before hang-up.</span>{" "}
            <span className="text-[#0a0a0a]/40">
              Every inbound intake call gets an A through D grade and a one-page Claire&apos;s Brief — written into SMS, Slack, Teams, email, or your CRM within seconds.
            </span>
          </h2>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Three Harvey-style feature blocks
          ═══════════════════════════════════════════════════════ */}

      {/* ─────────── Block 1: Real-time scoring ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-start">
            <h2
              className="font-serif text-[#0a0a0a] max-w-[18ch]"
              style={{
                fontSize: "clamp(2rem, 4vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Score every call in real time
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.5] text-[#0a0a0a]/55 lg:pt-3">
              Every qualifying call is evaluated against your firm&apos;s A/B/C/D rubric before the caller hangs up.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Mockup */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779132672/ChatGPT_Image_May_18_2026_at_03_30_41_PM.jpg"
                alt="Lead IQ live grading panel scoring an inbound auto collision call against the firm's A/B/C/D rubric in real time"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Sub-items */}
            <div>
              {[
                { title: "Real-time grading", desc: "Every qualifying call is scored before hang-up using audio in flight, not a post-call transcript pass." },
                { title: "Firm-specific rubric", desc: "A/B/C/D criteria you define — case type, jurisdiction, severity, conflict flags, and economic threshold." },
                { title: "Continuous tuning", desc: "Lead IQ learns from your team&rsquo;s overrides. No quarterly recalibration meeting required." },
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
        </div>
      </section>

      {/* ─────────── Block 2: Brief delivery ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-start">
            <h2
              className="font-serif text-[#0a0a0a] max-w-[20ch]"
              style={{
                fontSize: "clamp(2rem, 4vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Ship Claire&apos;s Brief anywhere your team works
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.5] text-[#0a0a0a]/55 lg:pt-3">
              One-page brief delivered within seconds of hang-up — into whatever messaging platform your intake team already lives in.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Mockup */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779132815/ChatGPT_Image_May_18_2026_at_03_33_20_PM.jpg"
                alt="Claire's Brief delivered to Slack, SMS, and Clio within seconds of hang-up"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Sub-items */}
            <div>
              {[
                { title: "SMS, Slack, Teams", desc: "Route different grades to different channels. A leads SMS the on-call attorney, B leads land in the team Slack." },
                { title: "Email & CRM drop-in", desc: "Briefs write directly into Clio, MyCase, Filevine, Lawmatics, PracticePanther, HubSpot, and 60+ other integrations." },
                { title: "30-second skim format", desc: "Letter grade, three-sentence summary, full intake answers, and case intelligence — designed to act on without opening the recording." },
              ].map((item, i) => (
                <div key={i} className="border-t border-[#0a0a0a]/10 py-6 last:border-b">
                  <h3 className="text-[18px] md:text-[20px] font-medium text-[#0a0a0a] mb-2" style={{ letterSpacing: "-0.01em" }}>
                    {item.title}
                  </h3>
                  <p className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/55">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Block 3: AI drip campaigns by grade ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24 border-t border-[#0a0a0a]/10">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-16 items-start">
            <h2
              className="font-serif text-[#0a0a0a] max-w-[20ch]"
              style={{
                fontSize: "clamp(2rem, 4vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              Trigger AI drip campaigns by grade
            </h2>
            <p className="text-[16px] md:text-[17px] leading-[1.5] text-[#0a0a0a]/55 lg:pt-3">
              Every grade kicks off a different cadence, drafted in your firm&apos;s voice and approved by your intake lead during onboarding.
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
            {/* Mockup */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto,f_auto/v1779114642/ChatGPT_Image_May_18_2026_at_10_29_25_AM.jpg"
                alt="Grade-A lead cadence timeline — attorney SMS at T+0:00, caller confirmation at T+0:30, retainer pre-fill at T+1 day, post-consult e-sign at T+2 days"
                className="absolute inset-0 h-full w-full object-contain"
                loading="lazy"
              />
            </div>

            {/* Sub-items */}
            <div>
              {[
                { title: "A leads — attorney touch", desc: "Callback prompt to the on-call attorney within 30 minutes. Retainer dispatch where pre-cleared by your firm." },
                { title: "B leads — consult sequence", desc: "Consult-booking SMS, 24-hour reminder, and 72-hour second attempt if the caller doesn&apos;t book." },
                { title: "C & D leads — nurture or decline", desc: "C leads get a single nurture message and CRM-only tracking. D leads get a polite referral or decline drafted in your firm&apos;s voice." },
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
        </div>
      </section>

      {/* ─────────── Stat band ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24 border-t border-[#e4e4e7]">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            <div>
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 72px)",
                  lineHeight: "1.0",
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                }}
              >
                ~50%
              </p>
              <p className="mt-4 text-[15.5px] md:text-[16px] leading-[1.5] text-[#0a0a0a]/65 max-w-[40ch]">
                less time spent reviewing each intake call. Coordinators read a 30-second brief instead of a 15-minute transcript.
              </p>
            </div>
            <div>
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 72px)",
                  lineHeight: "1.0",
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                }}
              >
                A–D
              </p>
              <p className="mt-4 text-[15.5px] md:text-[16px] leading-[1.5] text-[#0a0a0a]/65 max-w-[40ch]">
                grades calibrated to your firm&apos;s case criteria. Every call is graded; every grade gets its own follow-up cadence.
              </p>
            </div>
            <div>
              <p
                className="text-[#0a0a0a]"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 72px)",
                  lineHeight: "1.0",
                  letterSpacing: "-0.025em",
                  fontWeight: 500,
                }}
              >
                60+
              </p>
              <p className="mt-4 text-[15.5px] md:text-[16px] leading-[1.5] text-[#0a0a0a]/65 max-w-[40ch]">
                integrations push the brief into the tools your team already runs. Placeholder for firm-count once we have a confirmed number.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Calibration ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#e4e4e7]">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
            <div>
              <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
                Calibration
              </p>
              <h2
                className="text-[#0a0a0a] max-w-[20ch]"
                style={{
                  fontSize: "clamp(2rem, 4vw, 56px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                How do we tune Lead IQ to your firm?
              </h2>
              <p className="mt-6 text-[16px] leading-[1.55] text-[#0a0a0a]/65 max-w-[40ch]">
                The rubric is yours, not ours. We sit with your intake lead to define what an A lead looks like — then calibrate against real recent calls before going live.
              </p>
            </div>
            <ol className="space-y-10">
              {CALIBRATION_STEPS.map((step, idx) => (
                <li key={idx} className="flex gap-6 border-b border-[#e4e4e7] pb-10 last:border-0 last:pb-0">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 flex-shrink-0 w-12 pt-1">
                    0{idx + 1}
                  </span>
                  <p className="text-[16px] md:text-[17px] leading-[1.5] text-[#0a0a0a]/75 max-w-[60ch]">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
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
            className="text-[#0a0a0a] max-w-[28ch] mb-16"
            style={{
              fontSize: "clamp(2rem, 4vw, 56px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Lead IQ questions, answered.
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
            className="font-sans text-[#0a0a0a] max-w-[18ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Calibrate Lead IQ to your firm.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 60-minute kickoff call. We&apos;ll capture your intake criteria and show you graded examples from real recent calls.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-9 py-5 text-[17px] text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Book a calibration call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
