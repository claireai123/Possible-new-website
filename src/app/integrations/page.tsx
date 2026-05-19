import type { Metadata } from "next";
import Link from "next/link";
import {
  CATEGORIES,
  FEATURED_INTEGRATIONS,
  INTEGRATIONS,
  STATUS_LABEL,
  type Integration,
  type IntegrationCategory,
} from "@/data/integrations";

export const metadata: Metadata = {
  title: "Integrations — ClaireAI plugs into the stack you already run",
  description:
    "ClaireAI connects to Clio, MyCase, Filevine, DocuSign, LawPay, RingCentral, Calendly, Google Calendar, Outlook, Zapier, and 50+ more — the tools law firms already use.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "ClaireAI Integrations",
    description:
      "Plugs into the practice management, calendar, e-sign, payments, VoIP, and workflow tools 50,000+ U.S. law firms already use.",
    url: "https://theclaireai.com/integrations",
    type: "website",
  },
};

const liveCount = INTEGRATIONS.filter((i) => i.status === "LIVE").length;
const totalCount = INTEGRATIONS.length;

const integrationItemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: INTEGRATIONS.map((i, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `https://theclaireai.com/integrations/${i.id}`,
    name: i.name,
  })),
};

const FAQS: { question: string; answer: string }[] = [
  {
    question: "How do I connect ClaireAI to Clio? Do I need to be a Clio admin?",
    answer:
      "Connect Clio from Settings → Integrations → Clio. We use Clio's OAuth 2.0 flow, so you click \"Connect Clio,\" authorize ClaireAI against your Clio Manage or Clio Grow account, and you're done — no API keys to copy, no manual webhook URLs. You need to be a Clio user with permission to install third-party apps (typically firm admin or someone with \"Manage firm settings\"). We request the smallest scope set needed to create contacts and matters and read calendars; you can revoke access anytime from Clio's Connected Apps screen, which instantly invalidates our refresh token.",
  },
  {
    question: "Which Claire fields map to which Clio fields — and can I change the mapping?",
    answer:
      "By default we map caller name to Clio Contact first_name + last_name, caller phone to primary_phone, email to primary_email, practice-area tag to Clio's practice_area, and the call summary to a Matter description on a newly created Matter. Custom field mapping is supported via the integration's Field Mapping screen — any Clio custom field (Date of Incident, Referring Attorney, Case Value) can be wired to a question Claire asks on the call. Mapping is per-tenant and survives Claire prompt changes.",
  },
  {
    question: "Does ClaireAI work with MyCase? How is intake created?",
    answer:
      "Yes. MyCase released a public API in 2023, available on their Advanced tier, and Claire uses it natively. When a call ends, we POST the lead via the REST API: a new Contact is created (or matched on phone number), a Lead pipeline record is added with the call summary, and the caller is placed in the stage you choose during setup (default: \"New Lead — Intake Complete\"). If your MyCase plan doesn't include API access, we fall back to Zapier or webhook delivery so nothing is lost.",
  },
  {
    question: "Can Claire populate Filevine custom fields like Date of Incident or Case Value?",
    answer:
      "Yes. Filevine custom fields use the custom.<selector> convention (e.g., custom.dateOfIncident), and ClaireAI's Filevine mapper supports every selector type Filevine exposes — text, currency, date, dropdown, multi-select. You point Claire at a section (Project, Contact, or a custom tab), pick the selector, and tell Claire which intake question fills it. Currency fields can only map to currency answers and dates to date answers — same constraint Filevine itself enforces — so Claire validates the shape on the call.",
  },
  {
    question: "Can ClaireAI write to both Clio and HubSpot on the same call?",
    answer:
      "Yes — Claire is designed for dual-stack firms. A single call can fan out to multiple destinations: contact + matter into Clio Grow for the legal pipeline, contact + deal into HubSpot for marketing attribution, and a notification into Slack for the intake team. Each destination has its own field map, and we don't rely on Clio's native HubSpot connector (which is largely one-way HubSpot → Clio). Latency is sub-second per destination on call end; failures retry independently so a HubSpot outage won't block Clio.",
  },
  {
    question: "Does Claire respect attorney working hours, time zones, and buffers when booking?",
    answer:
      "Yes. Claire reads each attorney's Google Workspace or Microsoft 365 working-hours setting, honors their primary time zone (callers are auto-converted), and enforces firm-wide booking rules: minimum notice (e.g., no consults inside 2 hours), buffer time before/after (e.g., 15 minutes for conflicts check), max consults per day, and blackouts for court dates. For multi-attorney firms, Claire supports round-robin, weighted round-robin (load-balanced by case count), and practice-area routing (PI calls only to PI attorneys).",
  },
  {
    question: "When does the DocuSign retainer trigger fire, and can I brand the template?",
    answer:
      "DocuSign fires when Claire reaches the \"send retainer\" step in the call flow — typically right after the caller confirms their name, email, and engagement scope. Claire uses your firm's DocuSign template (Standard plan or higher, since templates require it), pre-populates client name, address, matter description, and fee structure as DocuSign tabs, and sends the envelope. The template is fully firm-branded — your logo, your letterhead, your fee schedule — Claire never injects ClaireAI branding. Signing reminders fire on DocuSign's schedule, and the signed PDF auto-files back to the matching Clio/MyCase/Filevine matter.",
  },
  {
    question: "My tool isn't on the directory. Can I wire Claire up with Zapier or a webhook?",
    answer:
      "Yes. Every Claire account ships with a generic webhook destination and a Zapier app. On call end, Claire POSTs the full payload (transcript, structured intake fields, recording URL, custom-field answers, booked-meeting details) to any URL you supply, with HMAC signing so you can verify it. For no-code teams, our Zapier app exposes \"New Call Completed\" and \"New Lead Qualified\" triggers that work with 8,000+ Zapier apps — handy for tools we don't natively support yet. We always prefer native when it exists (lower latency, richer field mapping, no Zapier task cost); use Zapier or webhooks as the escape hatch.",
  },
  {
    question: "How fast does a contact actually land in my CRM after a call ends?",
    answer:
      "Native integrations (Clio, MyCase, Filevine, Lawmatics, HubSpot, Salesforce) post within 1–3 seconds of call end — the contact, matter, and call summary are all visible by the time your intake team's screen refreshes. Zapier-routed deliveries add 5–30 seconds depending on Zapier's task queue. Calendar bookings happen during the call (not after), so the consult slot is locked the moment the caller confirms the time. If a downstream system is down, we retry with exponential backoff for 24 hours and surface the failure in your Claire dashboard.",
  },
  {
    question: "What OAuth scopes does Claire request, and where does my data live?",
    answer:
      "We request the minimum scopes per integration — e.g., Clio: read/write contacts, matters, calendars, communications; Google Workspace: calendar.events only (no Gmail unless you enable the email-followup add-on). Tokens are stored encrypted at rest with AES-256 and scoped per tenant; we don't co-mingle tokens across firms. Data residency follows your Claire plan — U.S. firms stay in US-East AWS; we honor Clio's regional rule (U.S. Clio account → U.S. ClaireAI tenant). Disconnect from Settings → Integrations and we revoke the refresh token within seconds; audit logs of every token use are retained for 12 months.",
  },
  {
    question: "We're switching from Clio to Filevine mid-year. Will Claire still work, and do I lose history?",
    answer:
      "Yes — you can run both integrations in parallel during the cutover. Configure Claire to dual-write to Clio AND Filevine for the migration window (typically 2–4 weeks), then disable the Clio writer when your case-management team has fully moved. Historical ClaireAI calls aren't migrated to the new CRM automatically — we don't backfill, since field mappings are rarely retroactive — but every call recording, transcript, and structured intake field is permanently stored in your Claire vault and exportable as CSV or JSON for one-shot import into Filevine.",
  },
  {
    question: "Can Claire tag matters by practice area and route the call to the right pipeline?",
    answer:
      "Yes. Claire asks a practice-area qualifier question on every call (\"Is this about a car accident, a family law matter, or something else?\") and tags the resulting Matter or Lead with your firm's own taxonomy. In Clio, that populates the Matter's practice_area field; in Lawmatics, it routes to the corresponding Intake Pipeline (PI, Family, Criminal); in Filevine, it picks the right Project Type Template. Practice-area-specific custom fields only show up in Claire's intake script for matching calls — so a PI caller is asked about insurance carriers, a family-law caller never is.",
  },
];

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

function FeaturedTile({ integration }: { integration: Integration }) {
  const hasLogo = !!integration.logoUrl;
  // Tiles with a logo go on white so the logo can dominate; wordmark tiles keep brand color
  const tileBg = hasLogo ? "#fafaf9" : integration.brand?.bg ?? "#1a1a1a";
  const ink = hasLogo
    ? "text-[#0a0a0a]"
    : integration.brand?.ink === "dark"
    ? "text-[#0a0a0a]"
    : "text-white";
  const inkDim = hasLogo
    ? "text-[#0a0a0a]/55"
    : integration.brand?.ink === "dark"
    ? "text-[#0a0a0a]/65"
    : "text-white/65";

  return (
    <Link
      href={`/integrations/${integration.id}`}
      className="group relative flex aspect-[3/4] flex-col justify-between overflow-hidden p-7 md:p-9 transition-transform duration-300 ease-out hover:-translate-y-1"
      style={{ backgroundColor: tileBg }}
    >
      {/* Top: status + access pill */}
      <div className="flex items-start justify-between">
        <span className={`text-[10px] uppercase tracking-[0.18em] ${inkDim}`}>
          {STATUS_LABEL[integration.status]}
        </span>
        {integration.access ? (
          <span className={`text-[10px] uppercase tracking-[0.18em] ${inkDim}`}>
            {integration.access === "OPEN" ? "Open API" : integration.access === "PARTNER" ? "Partner" : "Tier required"}
          </span>
        ) : null}
      </div>

      {/* Center: partner logo at full scale — or wordmark fallback */}
      <div className="flex flex-1 items-center justify-center">
        {hasLogo ? (
          <img
            src={integration.logoUrl}
            alt={`${integration.name} logo`}
            className="w-[88%] h-[88%] object-contain"
            loading="lazy"
          />
        ) : (
          <span
            className={`${ink} font-sans text-center`}
            style={{
              fontSize: "clamp(1.75rem, 3.4vw, 44px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "1.05",
            }}
          >
            {integration.name}
          </span>
        )}
      </div>

      {/* Bottom: name + explore arrow */}
      <div>
        <p
          className={`${ink} font-sans`}
          style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          {integration.name}
        </p>
        <p
          className={`mt-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ${inkDim} group-hover:translate-x-1 transition-transform`}
        >
          Explore
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}

function DirectoryRow({ integration }: { integration: Integration }) {
  return (
    <Link
      href={`/integrations/${integration.id}`}
      className="group flex items-center justify-between border-b border-[#e4e4e7] py-5 transition-colors hover:bg-[#fafafa] px-3 -mx-3"
    >
      <div className="flex items-baseline gap-6">
        <span
          className="font-sans text-[#0a0a0a]"
          style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "-0.01em" }}
        >
          {integration.name}
        </span>
        <span className="text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/40">
          {CATEGORIES[integration.category].short}
        </span>
      </div>
      <div className="flex items-center gap-6">
        <span
          className="text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/55"
        >
          {STATUS_LABEL[integration.status]}
        </span>
        <span className="text-[#0a0a0a]/30 group-hover:text-[#0a0a0a] transition-colors" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}

export default function IntegrationsPage() {
  // Group by category for the directory table
  const grouped = (Object.keys(CATEGORIES) as IntegrationCategory[]).map((cat) => ({
    category: cat,
    integrations: INTEGRATIONS.filter((i) => i.category === cat),
  }));

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(integrationItemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ─────────── Hero — Legora pattern: just the title in the top-left ─────────── */}
      <section className="bg-white px-6 pt-32 md:pt-40 pb-8">
        <div className="mx-auto max-w-[1680px]">
          <h1
            className="text-[#0a0a0a]"
            style={{
              fontSize: "48px",
              lineHeight: "1.0",
              letterSpacing: "-0.02em",
              fontWeight: 400,
            }}
          >
            Integrations
          </h1>
        </div>
      </section>

      {/* ─────────── Featured grid — Legora-style boxes, jumps straight in ─────────── */}
      <section className="bg-white px-6 pb-24 md:pb-32">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {FEATURED_INTEGRATIONS.map((i) => (
              <FeaturedTile key={i.id} integration={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Full directory (browse by category) ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#e4e4e7]">
        <div className="mx-auto max-w-[1680px]">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-6">
            <div>
              <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
                The full directory
              </p>
              <h2
                className="text-[#0a0a0a] max-w-[28ch]"
                style={{
                  fontSize: "clamp(2rem, 4vw, 56px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                Every connection, grouped by category.
              </h2>
            </div>
            <p className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/55 max-w-[40ch]">
              Tap any row for the integration page.
            </p>
          </div>

          <div className="space-y-20">
            {grouped.map((group) => (
              <div key={group.category}>
                <div className="flex items-baseline justify-between border-b border-[#0a0a0a]/15 pb-5 mb-2">
                  <h3
                    className="text-[#0a0a0a]"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 32px)",
                      lineHeight: "1.1",
                      letterSpacing: "-0.02em",
                      fontWeight: 500,
                    }}
                  >
                    {CATEGORIES[group.category].label}
                  </h3>
                  <span className="text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/40">
                    {group.integrations.length} {group.integrations.length === 1 ? "integration" : "integrations"}
                  </span>
                </div>
                {group.integrations.map((i) => (
                  <DirectoryRow key={i.id} integration={i} />
                ))}
              </div>
            ))}
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
            className="font-serif text-[#0a0a0a] max-w-[30ch] mb-16"
            style={{
              fontSize: "clamp(2rem, 4vw, 56px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Setup, mapping, and migration.
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
            className="text-[#0a0a0a] font-sans max-w-[18ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            Don&apos;t see your tool? Tell us and we&apos;ll build it.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Every integration on this page started with a firm telling us their stack. If we&apos;re missing yours, the roadmap moves.
            </p>
            <Link
              href="/contact"
              className="inline-flex h-fit items-center justify-center rounded bg-[#0a0a0a] px-9 py-5 text-[17px] text-white transition-colors hover:bg-[#0a0a0a]/85"
            >
              Request an integration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
