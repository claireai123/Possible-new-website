import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  INTEGRATIONS,
  PRACTICE_AREA_LABEL,
  STATUS_LABEL,
  findIntegration,
  type Integration,
  type IntegrationCategory,
} from "@/data/integrations";

export const dynamicParams = false;

const CLAIRE_LOGO =
  "https://res.cloudinary.com/dwzsqumf6/image/upload/e_colorize:100,co_rgb:0a0a0a/v1772837716/Claire_AI_White-removebg-preview.png";

// Icon-only crop (leftmost glyph) — used in the paired-logo lockup so the
// "ClaireAI" wordmark doesn't duplicate the H1 text below.
const CLAIRE_ICON =
  "https://res.cloudinary.com/dwzsqumf6/image/upload/c_crop,w_95,h_116,g_west/e_colorize:100,co_rgb:0a0a0a/v1772837716/Claire_AI_White-removebg-preview.png";

const PUBLISHED = "2026-01-15";
const LAST_UPDATED = "2026-05-15";

const CLAIRE_SAMEAS = [
  "https://linkedin.com/company/theclaireai",
  "https://www.crunchbase.com/organization/claireai",
];

export function generateStaticParams() {
  return INTEGRATIONS.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const i = findIntegration(slug);
  if (!i) return {};
  const title = `ClaireAI × ${i.name} Integration — AI Legal Receptionist`;
  const description =
    i.oneLiner ??
    `ClaireAI integrates with ${i.name} to push every qualified intake call into ${i.name} as a new ${TEMPLATES[i.category].primaryNoun} — full transcript, lead grade, and intake fields included. Setup in under an hour.`;
  return {
    title,
    description,
    alternates: { canonical: `/integrations/${i.id}` },
    openGraph: {
      title,
      description,
      url: `https://theclaireai.com/integrations/${i.id}`,
      type: "article",
    },
  };
}

// ─── Category-aware copy templates ──────────────────────────────────
// Eliminates duplicate-content risk: each of the 11 categories gets its
// own definition paragraph, sync table, workflows, and FAQs. Per-vendor
// `tagline` / `oneLiner` overrides still apply at render time.

type SyncRow = { left: string; right: string };
type Workflow = { title: string; body: string };
type FAQ = { question: string; answer: string };

interface CategoryTemplate {
  primaryNoun: string;
  definition: (i: Integration) => string;
  syncRows: (i: Integration) => SyncRow[];
  workflows: (i: Integration) => Workflow[];
  faqs: (i: Integration) => FAQ[];
}

const practiceAreaList = (i: Integration) =>
  i.practiceAreas.length === 3
    ? "personal injury, criminal defense, and family law"
    : i.practiceAreas.map((p) => PRACTICE_AREA_LABEL[p].toLowerCase()).join(", ");

const accessClause = (i: Integration) =>
  i.access === "OPEN"
    ? "the official public API"
    : i.access === "PARTNER"
    ? "the official partner API program"
    : "a tier-locked API";

const sharedSetupFAQ = (i: Integration): FAQ => ({
  question: `How long does ${i.name} integration setup take?`,
  answer: `Most firms are live with ${i.name} inside an hour: OAuth or API-key connection (under 5 minutes), field mapping with our team (20–30 minutes), test calls (15 minutes), then go-live on real traffic. No IT involvement required on the firm side.`,
});

const TEMPLATES: Record<IntegrationCategory, CategoryTemplate> = {
  "practice-management": {
    primaryNoun: "matter",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration is a two-way sync between the ClaireAI AI legal receptionist and ${i.name}, the legal practice management system used by ${practiceAreaList(i)} firms. When Claire answers an inbound call — in 0.8 seconds, 24/7 — every qualified lead is written to ${i.name} as a new matter with the full call transcript, lead grade (A through D), captured intake fields, and practice-area tags pushed into matching ${i.name} custom fields. Round-trip status updates (consult booked, retainer signed, declined) flow back from ${i.name} into Claire's outbound follow-up engine, so callbacks, retainer links, and referral handoffs adjust automatically. Connection runs over ${accessClause(i)}${i.auth ? ` using ${i.auth}` : ""}. Setup is a 5-minute connection plus a 20-minute field-mapping session. Most U.S. law firms running ${i.name} are live on real calls within an hour of kickoff. Personal-injury, criminal-defense, and family-law intake presets ship out of the box, and the integration is included on every ClaireAI plan with no per-sync surcharge or setup fee.`,
    syncRows: (i) => [
      { left: "New contact", right: `Created in ${i.name}` },
      { left: "New matter / case", right: "Created with practice-area tag" },
      { left: "Call transcript", right: "Attached as note" },
      { left: "Intake custom fields", right: "Mapped 1:1" },
      { left: "Lead grade (A–D)", right: "Written to custom field" },
      { left: "Matter status updates", right: `Read back from ${i.name}` },
    ],
    workflows: (i) => [
      {
        title: `Inbound call becomes a ${i.name} matter`,
        body: `Claire answers in 0.8 seconds, runs the practice-area intake script, grades the lead A–D, then creates a new matter in ${i.name} with the full transcript attached as a note — before the caller hangs up.`,
      },
      {
        title: "Custom fields mapped to your intake",
        body: `Mechanism of injury, custody status, UCCJEA flags, treatment status, jurisdiction, statute-of-limitations triage — Claire writes each captured field into the matching ${i.name} custom field. Zero copy-paste from the call summary.`,
      },
      {
        title: "Round-trip status sync",
        body: `When a matter changes status in ${i.name} (consult booked, retainer signed, declined), Claire's outbound follow-up adjusts: callback reminder, retainer link, or referral handoff — no orphaned leads.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI integrate with ${i.name}?`,
        answer: `Claire connects to ${i.name} over ${accessClause(i)}${i.auth ? ` using ${i.auth}` : ""}. Every qualified intake call writes a new matter, contact, and transcript note into ${i.name} on call completion — typically within 5 seconds of hang-up. Matter status changes read back into Claire's outbound follow-up on a 60-second poll plus webhooks where ${i.name} exposes them.`,
      },
      {
        question: `Does ClaireAI support two-way sync with ${i.name}?`,
        answer: `Yes. Claire both writes to ${i.name} (matters, contacts, custom fields, transcripts) and reads from ${i.name} (matter status, retainer signed flags) so outbound follow-up stays aligned with what your team has already actioned.`,
      },
      {
        question: `Which ${i.name} plan do we need?`,
        answer: i.notes
          ? `${i.notes}. Other Claire features (call answering, qualification, calendar booking) work on any ${i.name} plan.`
          : `Any ${i.name} tier with API access. Most firms are already on a plan that supports the integration; we confirm during the 5-minute setup call.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  "intake-crm": {
    primaryNoun: "lead",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration pushes every qualified intake call into ${i.name}, the legal intake CRM, so your existing automations, lead-scoring rules, and assignment logic run from the moment Claire hangs up. New contacts are created with practice-area tags, lead grade (A through D), the full call transcript, and every captured intake field mapped 1:1 to ${i.name} custom fields. Disposition codes and consult-booking status flow back to Claire's outbound follow-up engine, so reminders, retainer links, and callback cadences stay synchronized with what your intake coordinator has already actioned. Connection runs over ${accessClause(i)}${i.auth ? ` using ${i.auth}` : ""}. Setup is a 5-minute OAuth flow plus a 20-minute mapping pass with our team. New leads land in ${i.name} within 5 seconds of call completion — fast enough that your intake coordinator sees the lead before the prospect closes the landing page. Source attribution, lead grade, and full transcript are populated on the first write, so your existing ${i.name} automations trigger correctly.`,
    syncRows: (i) => [
      { left: "New lead / contact", right: `Created in ${i.name}` },
      { left: "Lead source", right: `Tagged "ClaireAI Voice"` },
      { left: "Lead grade (A–D)", right: "Written to custom field" },
      { left: "Call transcript", right: "Attached to lead record" },
      { left: "Practice area", right: "Tagged and routed" },
      { left: "Disposition / booking status", right: `Read back from ${i.name}` },
    ],
    workflows: (i) => [
      {
        title: `Every call becomes a ${i.name} lead`,
        body: `Claire answers in 0.8 seconds, qualifies the prospect, grades the lead A–D, then creates a new ${i.name} lead with the full transcript and practice-area tag — your existing assignment rules trigger immediately.`,
      },
      {
        title: "Disposition triggers Claire's follow-up",
        body: `When your intake team changes a lead's status in ${i.name} (consult booked, no-show, retained), Claire reads it on the next poll and adjusts outbound SMS, reminder calls, and retainer dispatch automatically.`,
      },
      {
        title: "Source attribution out of the box",
        body: `Every ${i.name} lead Claire creates is tagged with source "ClaireAI Voice", inbound number, ring time, and qualification path — so your marketing dashboard reports true cost-per-signed-case from voice.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI integrate with ${i.name}?`,
        answer: `Claire connects to ${i.name} via ${i.auth ?? "the official API"}. Every call writes a new lead with transcript, intake fields, and source attribution; disposition codes read back into Claire's outbound follow-up so reminders and retainer dispatch stay synchronized.`,
      },
      {
        question: `Will ClaireAI break our existing ${i.name} automations?`,
        answer: `No. Claire writes new leads exactly the way a human intake coordinator would — source, tags, custom fields, and assignment fields are all populated, so your existing ${i.name} workflows trigger on the new lead automatically.`,
      },
      {
        question: `Can ClaireAI use our existing ${i.name} qualification rules?`,
        answer: `Yes. During setup we mirror your ${i.name} qualification criteria into Claire's intake script — same questions, same scoring, same disqualification logic, run on the call before the lead is written.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  "payments-esign": {
    primaryNoun: "retainer",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration sends retainer agreements or payment links to qualified callers directly from the live call, while they are still on the line. For pre-cleared matter types (defined by your firm — typically PI, traffic, simple criminal, family-law consults), Claire confirms client identity, runs the conflict check, then dispatches a ${i.name} envelope or payment link over SMS before the caller hangs up. ${i.name} signed-status and payment-completed events stream back into Claire's outbound engine, so reminder SMS, second-attempt calls, and matter-creation in your practice management system trigger automatically once the retainer is executed. Connection runs over ${accessClause(i)}${i.auth ? ` using ${i.auth}` : ""}. Setup typically takes 30–45 minutes including template upload, signature-block configuration, and live test sends. Most firms route only their pre-cleared matter types through the in-call retainer flow at first — typically traffic, simple criminal, and family-law consults — then expand as confidence builds. The integration is included on every ClaireAI plan with no per-envelope surcharge.`,
    syncRows: (i) => [
      { left: "Retainer dispatch trigger", right: "On live call qualification" },
      { left: "Template selection", right: "By practice area" },
      { left: "Recipient delivery", right: "SMS + email link" },
      { left: "Signed event", right: `Webhook → Claire follow-up` },
      { left: "Payment / trust routing", right: "Practice-area aware" },
      { left: "Audit trail", right: "Stored on matter record" },
    ],
    workflows: (i) => [
      {
        title: "Retainer dispatched mid-call",
        body: `For matter types your firm pre-clears, Claire generates the ${i.name} envelope on the call and texts the link before hang-up. Most clients sign before they reach the next firm on Google.`,
      },
      {
        title: "Signed status drives follow-up",
        body: `${i.name} webhooks fire on signature and payment events; Claire's outbound engine consumes them in real time — no more "did they sign yet?" Slack threads or daily report exports.`,
      },
      {
        title: "Trust-account routing where applicable",
        body: `Funds route to the correct trust or operating account based on matter type and your firm's accounting setup — no manual reclassification at month-end.`,
      },
    ],
    faqs: (i) => [
      {
        question: `Can ClaireAI actually send retainers during the call?`,
        answer: `Yes — for matter types your firm pre-approves. Claire confirms identity, runs the conflict check against your practice management system, then dispatches the ${i.name} envelope over SMS while the caller is still on the line.`,
      },
      {
        question: `What stops Claire from sending retainers for the wrong case type?`,
        answer: `Your firm controls the matter-type allowlist. Anything outside it is routed to a human attorney for review — Claire never dispatches a ${i.name} envelope for an unapproved case category.`,
      },
      {
        question: `Does ${i.name} signed-status flow back into our CRM?`,
        answer: `Yes. ${i.name} webhook events fire on signature and payment completion; Claire reads them in real time and updates the corresponding matter or lead in your practice management system or intake CRM.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  "phone-voip": {
    primaryNoun: "call",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration routes inbound calls from your ${i.name} phone system to the ClaireAI AI legal receptionist, so every ring is answered in 0.8 seconds — including after-hours, weekend, and overflow calls your front desk currently misses. Claire qualifies the caller, books consults into your calendar, sends retainers where pre-approved, and writes the lead into your practice management system or intake CRM before the call ends. Live transfers route back into ${i.name} for any caller who asks for a human, with the call transcript already loaded so the attorney picks up mid-conversation. Setup is a SIP forwarding rule on your existing ${i.name} number to Claire's LiveKit endpoint — typically 15 minutes with our team, no IT ticket required. Most firms cut over a single number first (overflow or after-hours only), verify the flow on real traffic for a week, then expand to full-time answering across all firm lines. The integration is included on every ClaireAI plan with no per-call surcharge.`,
    syncRows: () => [
      { left: "Inbound ring", right: "Answered in 0.8 seconds" },
      { left: "After-hours / overflow", right: "Routed automatically" },
      { left: "Human transfer", right: "Warm handoff with transcript" },
      { left: "Call recording", right: "Stored in Claire portal" },
      { left: "Caller-ID forwarding", right: "Preserved through Claire" },
      { left: "Voicemail fallback", right: "Eliminated" },
    ],
    workflows: (i) => [
      {
        title: `${i.name} numbers forwarded to Claire`,
        body: `A SIP forwarding rule on your ${i.name} numbers routes inbound calls to Claire's LiveKit endpoint. After-hours, overflow, or every call — your choice. Caller-ID is preserved.`,
      },
      {
        title: "Warm transfer back to attorney",
        body: `If a caller asks for a human or qualifies as urgent, Claire warm-transfers back into ${i.name} (or to a mobile number) and reads the transcript into the receiving attorney's ear before connecting the caller.`,
      },
      {
        title: "Zero missed calls, full call audit",
        body: `Every call — answered, transferred, qualified, or declined — is logged with transcript, recording, and disposition. Pulled into your CRM the moment the call ends.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI work with ${i.name}?`,
        answer: `Claire receives calls forwarded from your ${i.name} numbers via SIP. You control which numbers, which hours, and which scenarios route to Claire. The rest stays with your existing ${i.name} setup.`,
      },
      {
        question: `Can Claire transfer calls back to a human attorney?`,
        answer: `Yes. Warm transfers route back into ${i.name} (or to any mobile / external number). The attorney hears the transcript before the caller is connected, so the handoff feels seamless.`,
      },
      {
        question: `Do we keep our existing ${i.name} numbers?`,
        answer: `Yes. No porting required. You add a forwarding rule on the ${i.name} side; your numbers stay where they are.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  "jail-phone": {
    primaryNoun: "inmate call",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration handles inbound calls from inmates using the ${i.name} inmate phone system — a critical lifeline for criminal defense firms where the prospect cannot leave a voicemail, cannot call back from a personal device, and cannot wait on hold past the facility's short call timer. Claire accepts the collect or pre-paid call on the first ring, confirms the caller is in custody at a recognized facility, runs the criminal-defense intake script (charge, jurisdiction, court date, custody status, prior representation, family contact), then books an urgent attorney callback into the inmate's available phone window or schedules an in-person jail visit before the ${i.name} call timer expires. Every call is logged with full transcript so the on-call defense attorney has the facts loaded before they pick up the return call. Routing setup runs through ${i.name}'s approved-number registration process — typically a 1–2 business-day vendor approval window followed by a 15-minute Claire configuration session.`,
    syncRows: () => [
      { left: "Inmate call", right: "Accepted on first ring" },
      { left: "Custody confirmation", right: "Verified in script" },
      { left: "Charge / jurisdiction", right: "Captured to intake" },
      { left: "Attorney callback", right: "Booked or paged" },
      { left: "Jail visit", right: "Scheduled where applicable" },
      { left: "Call recording", right: "Compliant retention" },
    ],
    workflows: (i) => [
      {
        title: `${i.name} call accepted in real time`,
        body: `Claire accepts the collect or pre-paid call from ${i.name} on the first ring, confirms the caller is in custody, and starts the criminal-defense intake script before the call timer runs out.`,
      },
      {
        title: "Urgent callback or jail visit scheduled",
        body: `Claire books the on-call defense attorney for an urgent callback to the inmate's available phone window, or schedules an in-person jail visit if requested — both routed to the attorney's calendar with location and call window pre-filled.`,
      },
      {
        title: "Full transcript ready for the return call",
        body: `When the attorney returns the call, the transcript is already loaded with charge, jurisdiction, prior counsel status, and family contact information — no re-asking the basics through ${i.name}'s 15-minute window.`,
      },
    ],
    faqs: (i) => [
      {
        question: `Can ClaireAI accept calls through ${i.name}?`,
        answer: `Yes. Once your firm's Claire number is registered with ${i.name} as an approved attorney destination, inbound inmate calls are accepted on the first ring and handled by Claire's criminal-defense intake script.`,
      },
      {
        question: `How does ${i.name} approval work?`,
        answer: `${i.name} requires the destination number to be registered as an attorney line. Our team handles the registration paperwork with ${i.name} on your behalf during onboarding — typical approval window is 1–2 business days.`,
      },
      {
        question: `What happens if the inmate's call time runs out?`,
        answer: `Claire records the partial transcript and schedules an urgent attorney callback to the inmate's next available phone window — so the matter isn't lost when the ${i.name} timer expires.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  calendar: {
    primaryNoun: "appointment",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration books consultations from inbound intake calls directly into your firm's ${i.name} calendars — checking real-time availability per attorney, respecting buffer rules, and creating the appointment before the caller hangs up. Conflict avoidance, round-robin assignment, time-zone normalization, and per-attorney availability windows are honored from your existing ${i.name} setup. Confirmation SMS, reminder cadences, and reschedule links fire automatically from Claire's outbound engine, with the appointment record carrying full call transcript and qualification notes so the attorney walks into the meeting ready. Setup runs over ${i.name}'s standard ${i.auth ?? "OAuth"} flow per attorney mailbox; most firms are live within 20 minutes of kickoff. Free/busy reads occur in real time during the call (typical latency under 400ms), and the appointment is written to ${i.name} on call completion with full intake notes attached. The integration honors your existing working-hours, recurring blocks, and round-robin assignment rules, and is included on every ClaireAI plan at no extra cost.`,
    syncRows: (i) => [
      { left: "Real-time availability", right: `Read from ${i.name}` },
      { left: "Appointment creation", right: `Written to ${i.name}` },
      { left: "Round-robin assignment", right: "By practice area + load" },
      { left: "Time-zone normalization", right: "Auto-detected from caller area code" },
      { left: "Buffer / lead time rules", right: "Honored from your setup" },
      { left: "Confirmation + reminder SMS", right: "Sent by Claire" },
    ],
    workflows: (i) => [
      {
        title: `Consult booked into ${i.name} on the call`,
        body: `Claire pulls real-time availability from ${i.name}, offers the caller two or three time slots, and writes the appointment into the attorney's ${i.name} calendar before the call ends.`,
      },
      {
        title: "Round-robin assignment by practice area",
        body: `Claire honors your existing ${i.name} availability rules and round-robin logic — appointments go to the right attorney based on practice area, geography, and current load.`,
      },
      {
        title: "Confirmations and reminders, fully automated",
        body: `SMS confirmation fires on booking. Reminder sequences run 24 hours and 1 hour before the appointment. Reschedule and cancel links are included — no human in the loop.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI integrate with ${i.name}?`,
        answer: `Claire connects per attorney calendar via ${i.auth ?? "OAuth"}. Free/busy is read in real time during the call; appointments are written to the attorney's ${i.name} calendar on confirmation.`,
      },
      {
        question: `Will Claire double-book or ignore my ${i.name} availability rules?`,
        answer: `No. Claire reads real-time free/busy and honors your existing ${i.name} buffer rules, working-hours, and recurring blocks. The same logic your attorneys use when self-scheduling.`,
      },
      {
        question: `What if the caller is in a different time zone?`,
        answer: `Claire auto-detects the caller's time zone from their area code (or asks if it's unclear), then converts to the attorney's ${i.name} time zone before offering slots — no AM/PM mixups.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  documents: {
    primaryNoun: "matter folder",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration creates a per-matter document folder in ${i.name} for every qualified intake call — pre-loaded with the call transcript, recording, intake form PDF, and any retainer or engagement letter Claire dispatches. Folder structure follows your firm's existing ${i.name} naming convention; permissions inherit from the parent practice area or attorney workspace. When clients upload documents through Claire's intake portal (police reports, medical records, MVA photos), they land directly in the ${i.name} matter folder — no manual filing, no double upload. Round-trip sync means documents added to the ${i.name} folder by your team are visible to Claire's outbound follow-up logic, so the engine knows when requested records have been received and stops chasing them. Setup uses ${i.auth ?? "OAuth"} per workspace and typically takes 20 minutes including folder-template mapping. The integration is included on every ClaireAI plan with no per-file surcharge.`,
    syncRows: (i) => [
      { left: "Matter folder", right: `Created in ${i.name}` },
      { left: "Call transcript + recording", right: "Auto-deposited" },
      { left: "Client uploads", right: `Routed to matter folder` },
      { left: "Permissions", right: "Inherit from workspace" },
      { left: "Signed retainer PDF", right: "Stored on matter" },
      { left: "Document arrival events", right: `Read back from ${i.name}` },
    ],
    workflows: (i) => [
      {
        title: `Matter folder created in ${i.name}`,
        body: `Claire creates a per-matter folder in ${i.name} the moment the call qualifies — pre-loaded with transcript, recording, intake form PDF, and any retainer dispatched during the call.`,
      },
      {
        title: "Client uploads land in the right folder",
        body: `Documents the client uploads through Claire's intake portal (police reports, medical records, photos) route directly to the ${i.name} matter folder. No manual filing, no double upload.`,
      },
      {
        title: "Document arrival drives follow-up",
        body: `When records you've requested land in the ${i.name} folder, Claire reads the event and stops the chase: no more reminder SMS asking for documents that already arrived.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI integrate with ${i.name}?`,
        answer: `Claire connects to ${i.name} via ${i.auth ?? "OAuth"}. Per-matter folders are created on call qualification; transcripts, recordings, and client uploads route into the folder automatically.`,
      },
      {
        question: `Does Claire respect our existing ${i.name} permissions?`,
        answer: `Yes. New matter folders inherit permissions from the parent practice-area or attorney workspace. Claire does not grant access — your existing ${i.name} access controls remain authoritative.`,
      },
      {
        question: `Can we use our existing ${i.name} naming convention?`,
        answer: `Yes. Folder naming follows your firm's template (matter number, client name, practice area, date — any format). We capture it during onboarding and Claire applies it consistently.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  "court-records": {
    primaryNoun: "case lookup",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration runs court-records lookups against ${i.name} from the live intake call — confirming case numbers, court jurisdiction, opposing counsel, hearing dates, and prior representation while the caller is still on the line. Claire uses the results to qualify the matter, surface scheduling conflicts, flag statute-of-limitations risk, and populate the intake record with verified court data instead of caller recollection. Lookups run on each qualifying call and the results are written to the matter or lead record in your practice management system or intake CRM. The integration uses ${i.name}'s ${i.auth ?? "official API"} where available, with rate-limit handling and result caching built in to protect against per-jurisdiction throttling. Setup is a 10-minute API-key entry plus optional jurisdiction filters; most firms see results on the first test call. Verified case data replaces caller-recollection in the matter record, reducing intake errors and missed conflicts, and the integration is included on every ClaireAI plan with no per-lookup surcharge.`,
    syncRows: (i) => [
      { left: "Case-number lookup", right: `Run against ${i.name}` },
      { left: "Hearing dates", right: "Pulled into intake record" },
      { left: "Opposing counsel", right: "Identified" },
      { left: "Statute of limitations", right: "Flagged from filing dates" },
      { left: "Prior representation", right: "Detected" },
      { left: "Verified court data", right: "Replaces caller recollection" },
    ],
    workflows: (i) => [
      {
        title: `Live ${i.name} lookup mid-call`,
        body: `Claire queries ${i.name} during the call to confirm case number, court, hearing date, and opposing counsel — verifying the matter against authoritative court data before qualification completes.`,
      },
      {
        title: "Statute and conflict triage",
        body: `Filing dates pulled from ${i.name} flag statute-of-limitations risk; case parties surface conflicts against your existing client database before the consult is booked.`,
      },
      {
        title: "Verified data on every matter",
        body: `The intake record carries court-verified case numbers and dates from ${i.name} — your team never starts a matter on caller-recollection alone.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI integrate with ${i.name}?`,
        answer: `Claire queries ${i.name} via ${i.auth ?? "the official API"} during qualifying calls. Results write to the intake record in your practice management system or intake CRM with full audit trail.`,
      },
      {
        question: `What does ClaireAI do with the ${i.name} lookup results?`,
        answer: `Verified case numbers, hearing dates, opposing counsel, and prior representation are written to the matter record. Claire uses them to flag conflicts, statute-of-limitations risk, and scheduling clashes before the consult books.`,
      },
      {
        question: `Will frequent ${i.name} lookups hit rate limits?`,
        answer: `Claire caches results per case and respects ${i.name}'s rate limits. For high-volume firms we throttle or pre-cache common jurisdictions; we have not yet hit a customer-facing limit in production.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  accounting: {
    primaryNoun: "trust transaction",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration routes retainer payments and trust deposits captured on intake calls directly into ${i.name}, your firm's accounting system, with matter-aware classification so funds land in the correct trust or operating account on the first try — no end-of-month reclassification cycle. When Claire collects a retainer over a connected payment gateway (LawPay, AffiniPay, or your preferred processor), the transaction is written to ${i.name} with matter number, practice area, client identifier, fee structure (flat / hourly / contingency), and IOLTA designation already mapped from your firm's chart of accounts. Month-end reconciliation effort drops sharply because there is no human reclassification step on Claire-originated transactions. Voided retainers and partial refunds flow through to ${i.name} as offsetting entries with full audit trail back to the originating call. Connection runs over ${accessClause(i)}${i.auth ? ` using ${i.auth}` : ""}; setup is typically a 30-minute pairing session with your bookkeeper.`,
    syncRows: (i) => [
      { left: "Trust deposit", right: `Posted to ${i.name}` },
      { left: "Operating account credit", right: `Posted to ${i.name}` },
      { left: "Matter / client linkage", right: "Pre-mapped" },
      { left: "Refund / void", right: "Offsetting entry written" },
      { left: "IOLTA designation", right: "By matter type" },
      { left: "Audit trail", right: "Stored with transaction" },
    ],
    workflows: (i) => [
      {
        title: `Retainer payment posts to ${i.name}`,
        body: `When Claire collects a retainer on the call, the transaction routes to ${i.name} with matter number, client identifier, and trust/operating designation pre-mapped — no manual reclassification.`,
      },
      {
        title: "Month-end reconciliation, without the cleanup",
        body: `Because every Claire-originated transaction lands in the right ${i.name} account on day one, your bookkeeper's month-end work shrinks to exception handling instead of full reclassification.`,
      },
      {
        title: "Refunds and voids handled cleanly",
        body: `Voided retainers and partial refunds flow through to ${i.name} as offsetting entries with full audit trail back to the originating intake call.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI integrate with ${i.name}?`,
        answer: `Claire posts retainer transactions, refunds, and voids to ${i.name} via ${i.auth ?? "the official API"}, with matter and client linkage already mapped. Your bookkeeper sees transactions land in the correct account on the first pass.`,
      },
      {
        question: `Will trust funds land in the wrong account?`,
        answer: `No. IOLTA designation is set per matter type during onboarding. Claire-originated transactions carry the designation through to ${i.name}, so trust funds route to trust accounts and earned fees to operating — every time.`,
      },
      {
        question: `What happens at month-end?`,
        answer: `Reconciliation effort drops sharply because there is no Claire-originated reclassification work. Your bookkeeper sees a clean ledger in ${i.name} ready for normal close procedures.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  "call-tracking": {
    primaryNoun: "tracked call",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration preserves your existing call-tracking attribution — Google Ads, SEO landing pages, paid social, Local Services Ads, GMB calls — end-to-end through to the intake record and conversion event. Every call routed through a ${i.name} tracking number lands at Claire still wearing the originating source, campaign, keyword, landing-page ID, and visitor session; those fields write to your practice management system or intake CRM as part of the lead record so reporting is attribution-accurate by source. When the call qualifies (or the retainer signs), ${i.name} fires the conversion event back to Google Ads, Meta, or your preferred ad platform with accurate cost-per-qualified-lead and cost-per-signed-case attribution — eliminating the "we paid for a missed call" gap that plagues traditional voicemail-and-callback firms and inflates apparent ad cost. Setup is a forwarding rule on your existing ${i.name} numbers; existing tracking remains the source of truth and no number porting is required.`,
    syncRows: () => [
      { left: "Source / campaign", right: "Preserved through Claire" },
      { left: "Keyword / landing-page ID", right: "Preserved" },
      { left: "Call qualification event", right: "Fired back to the tracking platform" },
      { left: "Cost-per-qualified-lead", right: "Accurate by source" },
      { left: "Signed-case conversion", right: "Attributed correctly" },
      { left: "Missed-call gap", right: "Eliminated" },
    ],
    workflows: (i) => [
      {
        title: `${i.name} source preserved through Claire`,
        body: `Calls forwarded from ${i.name} tracking numbers arrive at Claire with source, campaign, keyword, and landing-page ID intact. Those fields write to the intake record in your CRM.`,
      },
      {
        title: "Conversion events fire on qualification",
        body: `When Claire qualifies a lead (or it signs), ${i.name} fires the conversion event back to Google Ads, Meta, or your preferred platform — with the right cost attribution.`,
      },
      {
        title: "True cost-per-signed-case reporting",
        body: `Because every Claire-handled call is logged with qualification outcome and full ${i.name} attribution, your marketing dashboard reports actual cost-per-signed-case by source — not just cost-per-call.`,
      },
    ],
    faqs: (i) => [
      {
        question: `Does ClaireAI break our ${i.name} attribution?`,
        answer: `No. Claire receives calls forwarded from ${i.name} tracking numbers with source, campaign, and keyword intact. Those fields flow into the intake record so attribution is preserved end-to-end.`,
      },
      {
        question: `Will conversion events fire correctly?`,
        answer: `Yes. Claire signals lead qualification (and retainer-signed events where applicable) back to ${i.name}, which forwards the conversion to your ad platforms — restoring the connection traditional missed-call setups break.`,
      },
      {
        question: `Do we keep our existing ${i.name} numbers?`,
        answer: `Yes. No porting required. You add a forwarding rule from ${i.name} to Claire's number; your tracking numbers, sources, and dashboards stay exactly as configured.`,
      },
      sharedSetupFAQ(i),
    ],
  },

  "notifications-workflow": {
    primaryNoun: "workflow event",
    definition: (i) =>
      `The ClaireAI × ${i.name} integration emits call lifecycle events into ${i.name} — call answered, qualified, transferred, retainer dispatched, retainer signed, no-show — so your firm's internal notifications, escalation paths, and workflow automations fire automatically. Slack channels get the relevant lead the moment it qualifies; on-call attorneys page on urgent criminal-defense calls; intake coordinators see new matters land in a dashboard, not a daily report. ${i.name} acts as the routing hub, which means your existing alerting rules, channels, and team escalation logic don't change. Connection runs over signed webhooks with HMAC verification; setup is a 5-minute webhook-URL paste plus your existing ${i.name} workflow rules — no custom code required. Most firms use the integration to replace email-based intake handoff inside the first week, then expand into on-call paging and dashboard reporting as the team builds workflows around Claire's event stream. The integration is included on every ClaireAI plan with no per-event surcharge.`,
    syncRows: (i) => [
      { left: "Call answered", right: `Event fired to ${i.name}` },
      { left: "Lead qualified", right: `Event fired to ${i.name}` },
      { left: "Retainer dispatched / signed", right: `Event fired to ${i.name}` },
      { left: "Warm transfer requested", right: `Event fired to ${i.name}` },
      { left: "No-show / declined", right: `Event fired to ${i.name}` },
      { left: "Existing alert rules", right: "Run unchanged" },
    ],
    workflows: (i) => [
      {
        title: `Call lifecycle events flow into ${i.name}`,
        body: `Claire fires structured events into ${i.name} on every call milestone — answered, qualified, transferred, retainer dispatched, signed, no-show. Your existing alert rules and channel routing trigger automatically.`,
      },
      {
        title: "On-call escalation, no manual paging",
        body: `Urgent criminal-defense or after-hours intake calls fire the priority event into ${i.name}, which pages the on-call attorney through whatever channel your firm already uses (PagerDuty, Slack, SMS).`,
      },
      {
        title: "Replace email-based handoff",
        body: `Intake coordinators see new leads land in a real-time dashboard or channel — not a once-a-day email export. ${i.name} carries the payload (transcript, grade, practice area) directly to where the team works.`,
      },
    ],
    faqs: (i) => [
      {
        question: `How does ClaireAI integrate with ${i.name}?`,
        answer: `Claire emits structured webhook events to ${i.name} on every call milestone. ${i.name} routes the event through your existing rules — Slack channels, email lists, PagerDuty escalations, dashboards — all unchanged from how they work today.`,
      },
      {
        question: `Can we customize which events fire?`,
        answer: `Yes. Every event type is opt-in per firm, and payload fields can be filtered or remapped during setup. Most firms turn on five core events: qualified, transferred, retainer dispatched, retainer signed, declined.`,
      },
      {
        question: `Will this generate too many ${i.name} notifications?`,
        answer: `No — that's why event types are scoped per firm. Most teams subscribe one Slack channel to the "qualified" event and use ${i.name} workflow rules to filter further (practice area, grade, time of day) before paging anyone.`,
      },
      sharedSetupFAQ(i),
    ],
  },
};

// ─── Featured-tier FAQ extension ────────────────────────────────────
// Featured integrations get 4 additional vendor-agnostic FAQs that
// match high-volume search queries (pricing, security, support, etc.)

const featuredExtraFaqs = (i: Integration): FAQ[] => [
  {
    question: `How much does the ClaireAI ${i.name} integration cost?`,
    answer: `The integration itself is included on every ClaireAI plan (Starter $450/month, Growth $850/month, Enterprise $1,800/month). No per-sync fees, no per-call surcharge, no setup charge. Your ${i.name} subscription pricing is set by ${i.name} directly.`,
  },
  {
    question: `Is the ClaireAI ${i.name} integration secure?`,
    answer: `Yes. ClaireAI runs on SOC 2 Type II infrastructure with HIPAA-aligned controls and uses 256-bit AES encryption for all data in transit and at rest. Credentials for ${i.name} are stored in an isolated secrets vault per tenant; no cross-customer access is possible.`,
  },
  {
    question: `Can we try the ${i.name} integration before signing up?`,
    answer: `Yes. ClaireAI offers a 7-day free trial on every plan — including the ${i.name} integration. You can connect ${i.name}, run real test calls, and verify the field mappings work for your firm before any charge.`,
  },
  {
    question: `What happens to our ${i.name} data if we cancel?`,
    answer: `Cancellation revokes Claire's ${i.name} access immediately. Data already written to ${i.name} (matters, leads, transcripts) stays in your ${i.name} account — Claire never holds your client data hostage. Export tools are available throughout the trial and subscription.`,
  },
];

// ─── Setup steps (mostly stable across categories) ──────────────────

function defaultSetupSteps(i: Integration): string[] {
  const accessNote =
    i.access === "PARTNER"
      ? `Approve the ClaireAI partner app inside your ${i.name} admin console.`
      : i.access === "TIER"
      ? `Confirm you're on a ${i.name} plan that includes API access${i.notes ? ` (${i.notes.toLowerCase()})` : ""}.`
      : `Sign in to ${i.name} with an admin account and approve the OAuth scope ClaireAI requests.`;
  return [
    accessNote,
    `In the ClaireAI Control Room, open Settings → Integrations → ${i.name}. Paste your ${i.name} account name and click Connect.`,
    `Map your ${i.name} ${i.category === "calendar" ? "attorney calendars" : i.category === "documents" ? "workspace folders" : i.category === "accounting" ? "chart of accounts" : "custom fields"} to Claire's intake schema. Most firms accept the defaults; personal-injury, criminal, and family-law presets ship out of the box.`,
    `Run a test call. New ${TEMPLATES[i.category].primaryNoun}s land in ${i.name} within 5 seconds of hang-up. You're live.`,
  ];
}

// ─── Schemas ────────────────────────────────────────────────────────

function buildSchemas(i: Integration) {
  const baseUrl = `https://theclaireai.com/integrations/${i.id}`;
  const template = TEMPLATES[i.category];
  const definition = template.definition(i);
  const faqs = template.faqs(i);
  const allFaqs = i.featured ? [...faqs, ...featuredExtraFaqs(i)] : faqs;

  const organization = {
    "@type": "Organization",
    "@id": "https://theclaireai.com/#organization",
    name: "ClaireAI",
    legalName: "ClaireAI, Inc.",
    url: "https://theclaireai.com",
    logo: CLAIRE_LOGO,
    sameAs: CLAIRE_SAMEAS,
  };

  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    inLanguage: "en-US",
    name: `Connect ClaireAI to ${i.name}`,
    description: `How a U.S. law firm connects the ClaireAI AI legal receptionist to ${i.name}.`,
    totalTime: "PT60M",
    step: defaultSetupSteps(i).map((text, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "en-US",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    inLanguage: "en-US",
    name: `ClaireAI × ${i.name} Integration`,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "LegalService",
    description: definition,
    url: baseUrl,
    operatingSystem: "Cloud",
    provider: organization,
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
        name: "ClaireAI Starter plan — includes all integrations",
      },
    },
    relatedApplication: {
      "@type": "SoftwareApplication",
      name: i.name,
      applicationCategory: "BusinessApplication",
    },
    datePublished: PUBLISHED,
    dateModified: LAST_UPDATED,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://theclaireai.com" },
      { "@type": "ListItem", position: 2, name: "Integrations", item: "https://theclaireai.com/integrations" },
      { "@type": "ListItem", position: 3, name: i.name, item: baseUrl },
    ],
  };

  const techArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    inLanguage: "en-US",
    headline: `ClaireAI × ${i.name} Integration`,
    description: definition,
    url: baseUrl,
    datePublished: PUBLISHED,
    dateModified: LAST_UPDATED,
    author: organization,
    publisher: organization,
    mainEntityOfPage: baseUrl,
    about: {
      "@type": "Thing",
      name: i.name,
    },
    articleSection: CATEGORIES[i.category].label,
  };

  return { howTo, faqSchema, softwareSchema, breadcrumb, techArticle };
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const integration = findIntegration(slug);
  if (!integration) notFound();

  const template = TEMPLATES[integration.category];
  const definition = template.definition(integration);
  const syncRows = template.syncRows(integration);
  const workflows = template.workflows(integration);
  const baseFaqs = template.faqs(integration);
  const faqs = integration.featured ? [...baseFaqs, ...featuredExtraFaqs(integration)] : baseFaqs;
  const setupSteps = defaultSetupSteps(integration);
  const { howTo, faqSchema, softwareSchema, breadcrumb, techArticle } = buildSchemas(integration);

  const related = INTEGRATIONS.filter(
    (x) => x.id !== integration.id && x.category === integration.category && !!x.logoUrl,
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a] font-sans selection:bg-[#0a0a0a]/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }} />

      {/* ─────────── Hero — paired-logo lockup + definition paragraph ─────────── */}
      <section className="px-6 pt-24 md:pt-32 pb-20 md:pb-24 bg-white">
        <div className="mx-auto max-w-[1680px]">
          <Link
            href="/integrations"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors"
          >
            <span aria-hidden="true">←</span>
            All integrations
          </Link>

          {/* Paired-logo lockup — ClaireAI shows icon-only (the H1 already
              renders the "ClaireAI × {Vendor}" lockup as text). Vendor side
              shows whichever logo file the vendor publishes. */}
          <div className="mt-14 flex items-center gap-8 md:gap-10">
            <div className="flex items-center justify-center h-16 md:h-20 w-16 md:w-20">
              <img
                src={CLAIRE_ICON}
                alt="ClaireAI icon"
                className="max-h-full max-w-full object-contain"
                loading="eager"
              />
            </div>
            <span
              aria-hidden="true"
              className="text-[32px] md:text-[40px] text-[#0a0a0a]/30"
              style={{ fontWeight: 300 }}
            >
              ×
            </span>
            {integration.logoUrl ? (
              <div className="flex items-center justify-center h-16 md:h-20 w-[180px] md:w-[220px]">
                <img
                  src={integration.logoUrl}
                  alt={`${integration.name} logo`}
                  className="max-h-full max-w-full object-contain"
                  loading="eager"
                />
              </div>
            ) : (
              <span
                className="text-[#0a0a0a]"
                style={{
                  fontSize: "clamp(1.5rem, 2.4vw, 28px)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                {integration.name}
              </span>
            )}
          </div>

          <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/55 mb-8">
                {CATEGORIES[integration.category].label} &nbsp;·&nbsp; {STATUS_LABEL[integration.status]} &nbsp;·&nbsp; Updated {LAST_UPDATED}
              </p>
              <h1
                className="font-sans text-[#0a0a0a]"
                style={{
                  fontSize: "clamp(2.25rem, 4.8vw, 64px)",
                  lineHeight: "1.05",
                  letterSpacing: "-0.02em",
                  fontWeight: 500,
                }}
              >
                ClaireAI &nbsp;×&nbsp; {integration.name}
              </h1>
              {integration.tagline ? (
                <p className="mt-8 max-w-[56ch] text-[17px] md:text-[18px] leading-[1.55] text-[#0a0a0a]">
                  {integration.tagline}
                </p>
              ) : null}
            </div>

            {/* Right column — metadata */}
            <div className="text-[15px] leading-[1.55] text-[#0a0a0a]/55 space-y-3 lg:pt-14">
              <div className="flex justify-between border-b border-[#0a0a0a]/10 pb-3">
                <span className="uppercase tracking-[0.18em] text-[11px]">Status</span>
                <span className="text-[#0a0a0a]">{STATUS_LABEL[integration.status]}</span>
              </div>
              {integration.access ? (
                <div className="flex justify-between border-b border-[#0a0a0a]/10 pb-3">
                  <span className="uppercase tracking-[0.18em] text-[11px]">Access</span>
                  <span className="text-[#0a0a0a]">
                    {integration.access === "OPEN"
                      ? "Open API"
                      : integration.access === "PARTNER"
                      ? "Partner program"
                      : "Plan tier required"}
                  </span>
                </div>
              ) : null}
              {integration.auth ? (
                <div className="flex justify-between border-b border-[#0a0a0a]/10 pb-3">
                  <span className="uppercase tracking-[0.18em] text-[11px]">Auth</span>
                  <span className="text-[#0a0a0a]">{integration.auth}</span>
                </div>
              ) : null}
              <div className="flex justify-between border-b border-[#0a0a0a]/10 pb-3">
                <span className="uppercase tracking-[0.18em] text-[11px]">Practice areas</span>
                <span className="text-[#0a0a0a]">
                  {integration.practiceAreas.map((p) => PRACTICE_AREA_LABEL[p]).join(", ")}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#0a0a0a]/10 pb-3">
                <span className="uppercase tracking-[0.18em] text-[11px]">Category</span>
                <span className="text-[#0a0a0a]">{CATEGORIES[integration.category].label}</span>
              </div>
              {integration.docsUrl ? (
                <div className="flex justify-between border-b border-[#0a0a0a]/10 pb-3">
                  <span className="uppercase tracking-[0.18em] text-[11px]">Vendor docs</span>
                  <a
                    href={integration.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0a0a0a] underline-offset-2 hover:underline"
                  >
                    Reference ↗
                  </a>
                </div>
              ) : null}
              {integration.notes ? (
                <p className="text-[13px] leading-[1.6] text-[#0a0a0a]/55 mt-4">{integration.notes}</p>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── Definition paragraph — 134-167 word citable block ─────────── */}
      <section className="bg-white px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-[1680px]">
          <div className="max-w-[80ch]">
            <h2
              className="text-[#0a0a0a] mb-6"
              style={{
                fontSize: "clamp(1.5rem, 2.4vw, 28px)",
                lineHeight: "1.2",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              What is the ClaireAI × {integration.name} integration?
            </h2>
            <p className="text-[17px] md:text-[18px] leading-[1.6] text-[#0a0a0a]/80">
              {definition}
            </p>
          </div>
        </div>
      </section>

      {/* ─────────── Sync table ─────────── */}
      <section className="bg-white px-6 py-20 md:py-24 border-t border-[#e4e4e7]">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
            Sync map
          </p>
          <h2
            className="text-[#0a0a0a] max-w-[24ch] mb-12"
            style={{
              fontSize: "clamp(1.75rem, 3vw, 40px)",
              lineHeight: "1.1",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            What does ClaireAI sync to {integration.name}?
          </h2>
          <div className="max-w-[80ch] border-t border-[#0a0a0a]/10">
            {syncRows.map((row, idx) => (
              <div
                key={idx}
                className="flex items-baseline justify-between border-b border-[#0a0a0a]/10 py-5"
              >
                <span className="text-[15.5px] md:text-[16px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>
                  {row.left}
                </span>
                <span className="text-[14px] md:text-[15px] text-[#0a0a0a]/65 text-right">
                  {row.right}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Workflows ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#e4e4e7]">
        <div className="mx-auto max-w-[1680px]">
          <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
            How it works
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
            How does ClaireAI work with {integration.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            {workflows.map((w, idx) => (
              <div key={idx}>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-5">
                  0{idx + 1}
                </p>
                <p
                  className="text-[#0a0a0a] mb-3 text-[18px] leading-[1.3]"
                  style={{ letterSpacing: "-0.01em", fontWeight: 500 }}
                >
                  {w.title}
                </p>
                <p className="text-[15.5px] md:text-[16px] leading-[1.55] text-[#0a0a0a]/65">
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Setup ─────────── */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-[#e4e4e7]">
        <div className="mx-auto max-w-[1680px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
            <div>
              <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
                Setup
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
                How long does {integration.name} setup take?
              </h2>
              <p className="mt-6 text-[16px] leading-[1.55] text-[#0a0a0a]/65 max-w-[40ch]">
                Under an hour for most U.S. law firms. No IT involvement required.
              </p>
            </div>
            <ol className="space-y-10">
              {setupSteps.map((step, idx) => (
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
            {integration.name} integration questions, answered.
          </h2>
          <div className="border-t border-[#e4e4e7]">
            {faqs.map((f, idx) => (
              <div key={idx} className="border-b border-[#e4e4e7] py-8">
                <p
                  className="text-[#0a0a0a] mb-3 text-[18px] md:text-[20px] leading-[1.3]"
                  style={{ letterSpacing: "-0.01em", fontWeight: 500 }}
                >
                  {f.question}
                </p>
                <p className="text-[15.5px] md:text-[16px] leading-[1.6] text-[#0a0a0a]/65 max-w-[120ch]">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── Related ─────────── */}
      {related.length ? (
        <section className="bg-white px-6 py-24 md:py-32 border-t border-[#e4e4e7]">
          <div className="mx-auto max-w-[1680px]">
            <p className="text-[15.5px] md:text-[16px] uppercase tracking-[0.18em] text-[#0a0a0a]/40 mb-6">
              Related integrations
            </p>
            <h2
              className="text-[#0a0a0a] max-w-[28ch] mb-16"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 40px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                fontWeight: 500,
              }}
            >
              More in {CATEGORIES[integration.category].label}.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((r) => {
                const hasLogo = !!r.logoUrl;
                const tileBg = hasLogo ? "#fafaf9" : r.brand?.bg ?? "#1f2937";
                const ink = hasLogo
                  ? "text-[#0a0a0a]"
                  : r.brand?.ink === "dark"
                  ? "text-[#0a0a0a]"
                  : "text-white";
                const inkDim = hasLogo
                  ? "text-[#0a0a0a]/60"
                  : r.brand?.ink === "dark"
                  ? "text-[#0a0a0a]/70"
                  : "text-white/70";
                return (
                  <Link
                    key={r.id}
                    href={`/integrations/${r.id}`}
                    className="group relative flex flex-col justify-between p-7 aspect-[4/5] overflow-hidden transition-transform duration-300 ease-out hover:-translate-y-1"
                    style={{ backgroundColor: tileBg }}
                  >
                    <span className={`text-[10px] uppercase tracking-[0.18em] ${inkDim}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                    {hasLogo ? (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <img
                          src={r.logoUrl}
                          alt={`${r.name} logo`}
                          className="w-[78%] h-[55%] object-contain"
                          loading="lazy"
                        />
                      </div>
                    ) : null}
                    <div className="relative">
                      <p
                        className={`${ink} text-[17px] md:text-[18px] leading-[1.3]`}
                        style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
                      >
                        {r.name}
                      </p>
                      <p className={`mt-4 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.18em] ${inkDim}`}>
                        Explore <span aria-hidden="true">→</span>
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

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
            className="font-sans text-[#0a0a0a] max-w-[20ch]"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 72px)",
              lineHeight: "1.05",
              letterSpacing: "-0.02em",
              fontWeight: 500,
            }}
          >
            See Claire push a real call into {integration.name}.
          </h2>
          <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[48ch] text-[18px] leading-[1.5] text-[#0a0a0a]/70">
              Book a 20-minute walkthrough. We&apos;ll run a live test call against your {integration.name} sandbox.
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
