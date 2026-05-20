// ──────────────────────────────────────────────────────────────────────────
// Help Center article store.
//
// Each article leads with a "lead" — a 1-2 sentence definitive answer that
// LLMs can cite verbatim. TL;DR bullets follow for passage-level citability.
// Section content uses an explicit AST so we can render structured HTML and
// generate Article + BreadcrumbList JSON-LD without re-parsing markdown.
// ──────────────────────────────────────────────────────────────────────────

export type HelpCategory = {
  slug: string;
  name: string;
  desc: string;
};

export type HelpAuthor = {
  name: string;
  credentials: string;
  bio: string;
};

export type HelpInlineSpan =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "code"; text: string }
  | { kind: "link"; text: string; href: string };

export type HelpSection =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "p"; spans: HelpInlineSpan[] }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | { type: "callout"; tone: "note" | "warning" | "success"; title: string; body: string }
  | { type: "code"; lang: string; text: string };

export type HelpArticle = {
  slug: string;
  category: string; // category slug
  title: string;
  /** A one-to-two sentence definitive answer — the citable passage for AI Overviews / ChatGPT / Perplexity. */
  lead: string;
  tldr: string[];
  /** ISO date for sitemap + JSON-LD dateModified */
  lastUpdated: string;
  datePublished: string;
  readingTime: string;
  author: HelpAuthor;
  keywords: string[];
  sections: HelpSection[];
  /** Slugs of related help articles. */
  related: string[];
  /** Optional Q&A pairs. Surfaced visually AND as FAQPage JSON-LD. */
  faq?: { q: string; a: string }[];
};

export const HELP_CATEGORIES: HelpCategory[] = [
  {
    slug: "getting-started",
    name: "Getting started",
    desc: "Activate your number, set business hours, take your first live call.",
  },
  {
    slug: "intake-and-scripts",
    name: "Intake and scripts",
    desc: "Calibrate scripts by practice area, edit qualifying questions, tune transcripts.",
  },
  {
    slug: "integrations",
    name: "Integrations",
    desc: "Connect Clio, Filevine, MyCase, PracticePanther, and 62 more systems.",
  },
  {
    slug: "call-routing",
    name: "Call routing and transfers",
    desc: "Warm transfers, after-hours routing, voicemail behaviour, escalation rules.",
  },
  {
    slug: "billing-and-plans",
    name: "Billing and plans",
    desc: "Pricing tiers, usage, invoices, upgrades, and overage handling.",
  },
  {
    slug: "security-and-compliance",
    name: "Security and compliance",
    desc: "HIPAA BAA, conflict screening, data retention, SOC 2, audit logs.",
  },
  {
    slug: "troubleshooting",
    name: "Troubleshooting",
    desc: "Diagnose missed calls, transfer failures, integration syncs, audio quality.",
  },
];

const AUTHORS: Record<string, HelpAuthor> = {
  tiago: {
    name: "Tiago Strammiello",
    credentials: "Founder, ClaireAI",
    bio: "Tiago leads product at ClaireAI. He has spent the last three years building telephony and intake systems for U.S. law firms.",
  },
  caleo: {
    name: "Caleo Tsiapalis",
    credentials: "Co-Founder, ClaireAI",
    bio: "Caleo runs ClaireAI's customer success and writes the runbooks every onboarding follows.",
  },
  cal: {
    name: "Cal Stein",
    credentials: "Engineering, ClaireAI",
    bio: "Cal owns ClaireAI's integration platform and security posture, including the HIPAA and SOC 2 programs.",
  },
};

export const HELP_ARTICLES: HelpArticle[] = [
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "activate-your-claireai-number",
    category: "getting-started",
    title: "Activate your ClaireAI phone number",
    lead: "To activate your ClaireAI phone number, log in to your dashboard, open Settings → Phone numbers, click Activate, then forward your existing main line to the ClaireAI number we provision. Activation takes under five minutes and your first live call can be answered the same day.",
    tldr: [
      "Activation has three steps: provision a number, forward your main line, confirm a test call.",
      "ClaireAI provisions a U.S. local or toll-free number in any U.S. area code within 30 seconds.",
      "Most firms forward their existing main line so the AI receptionist answers without changing what's printed on cards, signs, or Google Business.",
      "A test call is logged in the dashboard within one second of hanging up — confirm before going live.",
      "If you already use a softphone (RingCentral, Dialpad, Nextiva), forwarding is configured in their admin console under Call Forwarding.",
    ],
    lastUpdated: "2026-05-19",
    datePublished: "2026-02-10",
    readingTime: "4 min",
    author: AUTHORS.caleo,
    keywords: [
      "activate ClaireAI",
      "phone number setup",
      "call forwarding for law firm",
      "AI receptionist activation",
    ],
    sections: [
      { type: "h2", text: "Before you start", id: "before-you-start" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "You need admin access to your ClaireAI dashboard and admin access to your current phone provider (RingCentral, Dialpad, Nextiva, OpenPhone, Vonage, or your carrier's PBX). If your firm uses a physical PBX, your IT vendor can complete the forwarding step in roughly 10 minutes." },
        ],
      },
      { type: "h2", text: "Step 1 — Provision a ClaireAI number", id: "step-1" },
      {
        type: "ol",
        items: [
          "Sign in to your dashboard at app.theclaireai.com.",
          "Open Settings → Phone numbers.",
          "Click Provision number. Choose Local or Toll-free, then enter the area code you want.",
          "ClaireAI returns a list of available numbers within 30 seconds. Pick one and click Activate.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Local vs toll-free",
        body: "Local numbers convert at a higher rate for personal injury and family law practices, because callers recognize the area code. Toll-free is better for multi-state firms.",
      },
      { type: "h2", text: "Step 2 — Forward your main line", id: "step-2" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "The recommended pattern is to forward your existing main line to the ClaireAI number. This means everything printed — business cards, Google Business listings, Avvo profile, signage — keeps working. Callers never see the ClaireAI number." },
        ],
      },
      { type: "h3", text: "RingCentral", id: "ringcentral-forwarding" },
      {
        type: "ol",
        items: [
          "RingCentral Admin → Phone System → Users → select the main user.",
          "Call Handling → Forward all calls.",
          "Paste the ClaireAI number and save.",
        ],
      },
      { type: "h3", text: "Carrier PBX (Comcast, Spectrum, AT&T)", id: "carrier-pbx" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Dial " },
          { kind: "code", text: "*72" },
          { kind: "text", text: " followed by the ClaireAI number on a landline phone. To turn forwarding off, dial " },
          { kind: "code", text: "*73" },
          { kind: "text", text: ". Some carriers require touch-tone confirmation." },
        ],
      },
      { type: "h2", text: "Step 3 — Place a test call", id: "step-3" },
      {
        type: "ol",
        items: [
          "Call your main firm number from a cell phone.",
          "Confirm ClaireAI answers. A new call should appear in your dashboard within one second of hanging up.",
          "Open the call detail. Listen to the recording, confirm the transcript, and verify the routing decision (transfer, voicemail, or message).",
        ],
      },
      {
        type: "callout",
        tone: "success",
        title: "You're live",
        body: "Once the test call appears in your dashboard with a complete transcript, the AI receptionist is answering every call. There is no second activation step.",
      },
    ],
    related: ["connect-clio-grow", "warm-transfer-setup", "after-hours-routing"],
    faq: [
      {
        q: "How long does ClaireAI activation take?",
        a: "Activation takes under five minutes for a firm using a softphone provider, and under 15 minutes for a firm on a carrier PBX. The bottleneck is your phone provider's forwarding propagation, not ClaireAI.",
      },
      {
        q: "Do I have to change my phone number?",
        a: "No. The recommended pattern is to forward your existing main line to the ClaireAI number you provision. Callers continue to dial the number printed on your cards and signage.",
      },
      {
        q: "Can I port my existing number to ClaireAI?",
        a: "Yes. Number porting takes 5–10 business days and is free. Contact support@theclaireai.com with your current carrier and account number to start the port.",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "connect-clio-grow",
    category: "integrations",
    title: "Connect ClaireAI to Clio Grow",
    lead: "To connect ClaireAI to Clio Grow, open Settings → Integrations in your ClaireAI dashboard, click Clio Grow, and sign in with a Clio admin account. After OAuth, every qualified call automatically becomes a Clio Grow lead with the contact, intake answers, recording, and transcript attached.",
    tldr: [
      "Integration is a 60-second OAuth handshake — no API keys, no webhook setup.",
      "Every qualified call creates a Clio Grow lead with full intake data, recording, and transcript as attachments.",
      "Field mapping is automatic for Clio's standard fields and configurable for custom fields.",
      "Unqualified or conflicted calls do NOT push to Clio — they are logged in ClaireAI only, so your Clio pipeline stays clean.",
      "Two-way sync: when you mark a Clio lead as Closed Won, ClaireAI updates the call's outcome.",
    ],
    lastUpdated: "2026-05-12",
    datePublished: "2026-01-15",
    readingTime: "6 min",
    author: AUTHORS.cal,
    keywords: [
      "Clio Grow integration",
      "law firm CRM",
      "AI receptionist Clio",
      "intake to Clio",
    ],
    sections: [
      { type: "h2", text: "What gets synced", id: "what-gets-synced" },
      {
        type: "ul",
        items: [
          "Contact: first name, last name, phone, email, preferred contact method.",
          "Matter: practice area, jurisdiction, incident date (for PI), urgency.",
          "Intake script answers, mapped 1:1 to Clio's custom fields.",
          "Call recording (MP3) and transcript (PDF) attached to the lead.",
          "Source = ClaireAI in Clio so you can filter pipeline by intake channel.",
        ],
      },
      { type: "h2", text: "Connect Clio Grow", id: "connect" },
      {
        type: "ol",
        items: [
          "Open Settings → Integrations in ClaireAI.",
          "Find Clio Grow in the list and click Connect.",
          "You will be redirected to Clio's OAuth screen. Sign in with a Clio admin account.",
          "Grant ClaireAI the read/write scopes Clio requests. The OAuth screen lists each scope.",
          "After confirming, you are redirected back to ClaireAI with the integration marked Active.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Why admin access?",
        body: "Clio Grow's API requires admin-level OAuth scopes to write leads and attach files. ClaireAI never sees your password — Clio handles the credential exchange via OAuth 2.0.",
      },
      { type: "h2", text: "Map custom fields", id: "map-fields" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "If your Clio Grow workspace has custom fields (for example, a personal injury firm might have " },
          { kind: "code", text: "incident_date" },
          { kind: "text", text: " or " },
          { kind: "code", text: "at_fault_party" },
          { kind: "text", text: "), open the Field mapping tab. ClaireAI auto-detects fields by name; manually map anything that didn't match." },
        ],
      },
      { type: "h2", text: "Filter what pushes to Clio", id: "filtering" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "By default, only " },
          { kind: "bold", text: "qualified" },
          { kind: "text", text: " calls (the caller answered the intake script and was not screened out by conflict rules) push to Clio. Spam, wrong numbers, and conflicted callers stay in ClaireAI only. You can change this under Integrations → Clio Grow → Sync rules." },
        ],
      },
      { type: "h2", text: "What happens if Clio is down?", id: "clio-outage" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "ClaireAI queues failed syncs and retries with exponential backoff for 24 hours. If Clio is unreachable for longer than 24 hours, the failed leads stay in ClaireAI marked Sync failed and you receive an email notification. No call data is ever lost — Clio is treated as a secondary destination." },
        ],
      },
    ],
    related: ["activate-your-claireai-number", "edit-intake-script", "conflict-screening-rule-118"],
    faq: [
      {
        q: "Does ClaireAI write to Clio Grow or Clio Manage?",
        a: "Both. The Clio Grow integration writes new leads. The Clio Manage integration converts qualified leads into matters and time entries. Most firms enable both — connect them in the same Settings → Integrations screen.",
      },
      {
        q: "Do conflicted calls get sent to Clio?",
        a: "No. When the conflict screening step (Rule 1.18) flags a caller as conflicted, ClaireAI logs the call internally but does not push it to Clio. This prevents accidental disclosure of conflicted matter details to your intake team.",
      },
      {
        q: "How fast does a new lead show up in Clio?",
        a: "The Clio Grow lead is created within 2–4 seconds of the call ending. The recording attaches within 30 seconds, the transcript within 60 seconds. If your firm uses Clio webhooks for downstream automation (Zapier, native rules), they fire on the lead-created event.",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "warm-transfer-setup",
    category: "call-routing",
    title: "Set up warm transfers to your intake team",
    lead: "A warm transfer hands a qualified caller to a human at your firm with a brief verbal hand-off. To enable it, open Settings → Call routing → Warm transfer, add the destination numbers in order of preference, and choose the criteria that trigger a transfer instead of a voicemail.",
    tldr: [
      "Warm transfer = ClaireAI briefs the human (\"PI caller, slip and fall, ready to retain\") before handing off.",
      "Cold transfer = direct hand-off with no briefing.",
      "Default trigger: caller passes the intake script AND your business hours window. You can tighten or loosen both.",
      "Transfer fallback chains support up to five destinations (paralegal → senior associate → managing partner).",
      "If nobody picks up, ClaireAI takes a detailed message and dispatches it via your chosen channel (SMS, email, Slack, push).",
    ],
    lastUpdated: "2026-05-08",
    datePublished: "2026-01-20",
    readingTime: "5 min",
    author: AUTHORS.tiago,
    keywords: ["warm transfer", "call transfer", "AI receptionist hand-off", "intake team routing"],
    sections: [
      { type: "h2", text: "Decide who answers transfers", id: "who-answers" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Most firms route warm transfers to a paralegal or intake specialist during business hours, with a senior partner as the after-hours fallback for urgent matters (criminal defense arrests, restraining orders, ER referrals). Set up the chain top-down: the first number tried is the one most likely to answer." },
        ],
      },
      { type: "h2", text: "Configure the chain", id: "configure-chain" },
      {
        type: "ol",
        items: [
          "Open Settings → Call routing → Warm transfer.",
          "Click Add destination. Enter the phone number, label (e.g. \"Sarah – Paralegal\"), and ring duration.",
          "Repeat for up to five destinations. The chain is tried in order.",
          "Set the global rules: business hours window, qualification threshold (Standard or High), and the fallback action if nobody picks up (Voicemail, SMS, Email, Slack).",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Don't transfer everyone",
        body: "Firms that transfer 100% of callers see staff burnout and lower close rates because intake teams field too many unqualified calls. The intake script is doing screening for a reason — trust it.",
      },
      { type: "h2", text: "Customize the briefing line", id: "briefing" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Before connecting the caller, ClaireAI says a short briefing to the human picking up. Default: " },
          { kind: "code", text: "\"Hi, this is the ClaireAI receptionist at {firm}. I have {caller_name} on the line — a {practice_area} matter, urgency {urgency_level}. Connecting now.\"" },
          { kind: "text", text: " You can rewrite this under Call routing → Briefing template. Available variables are listed in the side panel." },
        ],
      },
      { type: "h2", text: "Test the chain", id: "test" },
      {
        type: "ol",
        items: [
          "Call your main firm number from a cell.",
          "Answer the intake script as a real qualified caller would.",
          "ClaireAI should announce \"Connecting you now\" and dial the first destination.",
          "Confirm the briefing line plays for the human, and audio is clear in both directions after connection.",
        ],
      },
    ],
    related: ["after-hours-routing", "edit-intake-script", "troubleshoot-missed-call"],
    faq: [
      {
        q: "What's the difference between warm and cold transfer?",
        a: "A warm transfer plays a briefing line to the human before connecting the caller, so the human knows who is on the line and what the matter is about. A cold transfer hands off silently. Warm transfer is recommended for legal intake because the briefing saves the human 30–45 seconds of re-asking the caller's basic facts.",
      },
      {
        q: "What happens if the first transfer destination doesn't answer?",
        a: "ClaireAI rings each destination in the chain for the duration you set (default 20 seconds), then moves to the next. If the entire chain misses, the fallback action runs — typically taking a message and dispatching it via SMS, email, or Slack.",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "edit-intake-script",
    category: "intake-and-scripts",
    title: "Edit your intake script by practice area",
    lead: "ClaireAI ships with intake scripts pre-calibrated for personal injury, criminal defense, family law, immigration, and 12 other practice areas. To customize a script, open Intake → Scripts, pick the practice area, and edit the question list. Changes go live within 30 seconds — no redeploy.",
    tldr: [
      "Scripts are organized by practice area. Each script is a list of qualifying questions.",
      "Questions support skip logic — if the caller answers \"no\" to \"injury within last 4 years\", the script can skip to a polite decline.",
      "Edits go live within 30 seconds. There is no deploy step.",
      "Every script has a conflict-screening step (Rule 1.18) that runs before any matter details are captured.",
      "Templates exist for sub-practices: PI → MVA, slip-and-fall, dog bite, premises; Family → divorce, custody, adoption.",
    ],
    lastUpdated: "2026-05-15",
    datePublished: "2026-01-25",
    readingTime: "7 min",
    author: AUTHORS.tiago,
    keywords: ["intake script", "legal intake calibration", "AI receptionist script editor", "Rule 1.18 conflict"],
    sections: [
      { type: "h2", text: "How a script is structured", id: "structure" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Every script has four blocks: greeting, conflict screen, qualification, and disposition. The greeting and disposition are short and rarely edited. The conflict screen runs verbatim and cannot be removed — it satisfies Model Rule 1.18 by capturing minimal information until consent is given. The qualification block is where you spend your editing time." },
        ],
      },
      { type: "h2", text: "Edit a script", id: "edit" },
      {
        type: "ol",
        items: [
          "Open Intake → Scripts. Pick a practice area from the left rail.",
          "Click any question to edit the wording. The right panel shows the question type (open-ended, yes/no, date, dollar amount).",
          "Use the toggle on each question to mark it Required or Optional.",
          "Drag questions to reorder. Use the Skip logic button to branch based on prior answers.",
          "Click Save. The change is live within 30 seconds — confirm with a test call.",
        ],
      },
      { type: "h2", text: "Sub-practice templates", id: "sub-practice" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "For personal injury, the base script covers the universal questions (date of incident, fault, injuries, prior representation). Sub-practice templates extend it: MVA adds questions about insurance carriers and police reports; slip-and-fall adds property owner and witness questions; dog bite adds breed, prior bite history, and animal control reports." },
        ],
      },
      { type: "h2", text: "Skip logic", id: "skip-logic" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Skip logic lets you keep the script short for callers who would never qualify. Example: if statute of limitations is 4 years and the caller says the incident was 6 years ago, skip directly to a polite decline — there's no point asking 12 more questions about an unviable matter." },
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Edits roll out instantly",
        body: "There is no deploy or release step. The agent fetches the active script at the start of every call, so the next call after you click Save uses the new script.",
      },
    ],
    related: ["activate-your-claireai-number", "conflict-screening-rule-118", "connect-clio-grow"],
    faq: [
      {
        q: "Can I A/B test different scripts?",
        a: "Yes. Under Intake → Scripts → Experiments, you can split traffic between two scripts (e.g. 50/50) and compare qualification rates and close rates over a chosen window.",
      },
      {
        q: "What happens if a caller refuses to answer a question?",
        a: "ClaireAI politely re-asks once, then moves on. The unanswered question is logged in the call detail as Skipped — caller declined.",
      },
    ],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "after-hours-routing",
    category: "call-routing",
    title: "Configure after-hours and weekend routing",
    lead: "After-hours and weekend routing tells ClaireAI to behave differently when your firm is closed. To configure, open Settings → Call routing → Business hours, set your hours per weekday, and choose the after-hours action: message-only, urgent transfer, or modified intake.",
    tldr: [
      "Business hours are set per weekday. ClaireAI uses your firm's primary timezone.",
      "After-hours options: (1) take a message only, (2) transfer urgent calls (criminal defense, ER referrals), (3) run a modified intake with a shorter script.",
      "Holiday hours can be loaded from the calendar (federal holidays auto-imported) or added manually.",
      "Urgent flagging uses keyword matching plus practice-area heuristics — \"arrested\", \"emergency\", \"restraining order\" route differently.",
    ],
    lastUpdated: "2026-05-10",
    datePublished: "2026-02-01",
    readingTime: "5 min",
    author: AUTHORS.caleo,
    keywords: ["after-hours routing", "weekend calls", "law firm phone hours", "AI receptionist business hours"],
    sections: [
      { type: "h2", text: "Set business hours", id: "business-hours" },
      {
        type: "ol",
        items: [
          "Open Settings → Call routing → Business hours.",
          "Set hours per weekday. The default is 9 AM – 5 PM in your firm's primary timezone.",
          "Click Add holiday to load federal holidays or add a custom closure (firm retreat, weather closure).",
        ],
      },
      { type: "h2", text: "Choose an after-hours action", id: "after-hours-action" },
      {
        type: "ul",
        items: [
          "Message only — take a thorough message and dispatch it via SMS, email, or Slack at the start of the next business day.",
          "Urgent transfer — for criminal defense and PI firms, ClaireAI listens for urgency keywords (arrested, in custody, emergency room, restraining order). Urgent callers are transferred to the on-call partner; non-urgent callers get the message-only flow.",
          "Modified intake — run a shorter script (typically 6–8 questions instead of 15) so the caller gets booked for a morning call without holding them on the phone for too long.",
        ],
      },
      { type: "h2", text: "On-call rotation", id: "on-call" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "If you choose urgent transfer, configure the on-call rotation under Call routing → On-call. The rotation supports weekly, daily, or custom schedules. The active number receives all urgent transfers until the rotation switches over." },
        ],
      },
    ],
    related: ["warm-transfer-setup", "edit-intake-script", "troubleshoot-missed-call"],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "request-hipaa-baa",
    category: "security-and-compliance",
    title: "Request a HIPAA Business Associate Agreement (BAA)",
    lead: "ClaireAI signs a HIPAA Business Associate Agreement (BAA) with any law firm that handles protected health information — personal injury, medical malpractice, workers' compensation, and elder law are common. To request a BAA, email legal@theclaireai.com with your firm name and the practice areas covered. Turnaround is typically two business days.",
    tldr: [
      "ClaireAI offers a HIPAA-aligned BAA at no extra cost.",
      "Personal injury, med-mal, workers' comp, and elder law firms should sign one before going live.",
      "The BAA covers call recordings, transcripts, and any caller-provided PHI that gets stored.",
      "Audit logs, encryption at rest (AES-256), and encryption in transit (TLS 1.3) are documented in the BAA appendix.",
      "Turnaround is two business days for standard BAAs and 5–10 days if you need redlines reviewed.",
    ],
    lastUpdated: "2026-05-01",
    datePublished: "2026-02-05",
    readingTime: "3 min",
    author: AUTHORS.cal,
    keywords: ["HIPAA BAA", "law firm compliance", "PHI", "business associate agreement"],
    sections: [
      { type: "h2", text: "What the BAA covers", id: "coverage" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "ClaireAI's standard BAA covers all data that flows through the platform during legal intake: call audio, call transcripts, intake answers, and any caller-provided PHI. It commits ClaireAI to the safeguards required by 45 CFR §§ 164.502, 164.504, 164.314, and 164.502(e)." },
        ],
      },
      { type: "h2", text: "Request a BAA", id: "request" },
      {
        type: "ol",
        items: [
          "Email legal@theclaireai.com with your firm name, the practice areas covered, and the signer's title.",
          "We send the BAA via DocuSign within two business days.",
          "Sign — both parties get a fully executed PDF.",
          "If you need redlines, send them in track changes. Standard redlines (carve-outs for subpoenas, breach notification timeframes) we accept within 24 hours.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Subprocessor list",
        body: "ClaireAI uses a small set of HIPAA-aligned subprocessors (AWS for storage, LiveKit for voice, Azure OpenAI for the model). The current subprocessor list is in BAA Appendix A and you are notified at least 30 days before any change.",
      },
    ],
    related: ["conflict-screening-rule-118", "data-retention-policy", "connect-clio-grow"],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "billing-overage-handling",
    category: "billing-and-plans",
    title: "How ClaireAI bills for usage and overage",
    lead: "ClaireAI bills a flat monthly subscription per firm. Every plan includes a monthly call allowance and a per-call overage rate published on the pricing page. There are no per-minute charges, no per-integration fees, and no setup fees.",
    tldr: [
      "Flat monthly subscription. Plan tiers and current pricing are published on the pricing page.",
      "Every plan includes a monthly call allowance; overage is metered per qualified call.",
      "Spam, hangups, wrong numbers, and pre-script abandons are not billed.",
      "Invoiced on the 1st of each month via Stripe. Net terms are available for higher tiers.",
      "Annual plans receive a discount and a multi-year price freeze.",
    ],
    lastUpdated: "2026-05-18",
    datePublished: "2026-02-08",
    readingTime: "5 min",
    author: AUTHORS.caleo,
    keywords: ["ClaireAI pricing", "AI receptionist cost", "law firm billing", "overage"],
    sections: [
      { type: "h2", text: "What counts as a call", id: "what-counts" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Only " },
          { kind: "bold", text: "qualified" },
          { kind: "text", text: " calls count toward your monthly allowance. A call is qualified when the caller completed at least the first three intake questions. Spam, hangups, wrong numbers, and pre-script abandons are not billed." },
        ],
      },
      { type: "h2", text: "How overage is calculated", id: "overage" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "If your firm exceeds its monthly allowance, each additional qualified call is billed at the overage rate for your plan. Overage is metered in real time and appears in the dashboard so there are no end-of-month surprises. You can set a soft cap that pages your admin once usage crosses a threshold (e.g. 80% of allowance)." },
        ],
      },
      { type: "h2", text: "Annual vs monthly", id: "annual" },
      {
        type: "ul",
        items: [
          "Monthly — no commitment, cancel anytime.",
          "Annual — list-price discount, paid up front, with a multi-year price freeze.",
          "Multi-office — discount stacks for firms running multiple offices. Talk to sales.",
        ],
      },
    ],
    related: ["activate-your-claireai-number", "data-retention-policy"],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "conflict-screening-rule-118",
    category: "security-and-compliance",
    title: "How ClaireAI screens conflicts under Rule 1.18",
    lead: "ClaireAI runs a Rule 1.18 conflict screen at the start of every legal intake call, before any matter details are captured. The agent captures the minimum information needed to check — caller name and the names of any adverse parties — then queries your conflicts database. If a conflict exists, the caller is politely declined and the call data is sequestered from your intake team.",
    tldr: [
      "Conflict screen runs before any matter details are taken — satisfies the Rule 1.18 limited disclosure requirement.",
      "The agent collects caller name and any adverse parties named.",
      "ClaireAI checks the names against your conflicts database (Clio, Filevine, MyCase, or a CSV upload).",
      "Conflicted calls are declined politely. The intake team never sees the call.",
      "Audit trail: every conflict screen is logged with the names checked, the database queried, and the decision.",
    ],
    lastUpdated: "2026-05-14",
    datePublished: "2026-02-12",
    readingTime: "6 min",
    author: AUTHORS.cal,
    keywords: ["Rule 1.18 conflict", "legal ethics", "prospective client", "conflict check"],
    sections: [
      { type: "h2", text: "Why Rule 1.18 matters for intake", id: "why-rule-118" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Model Rule 1.18 limits how much information a lawyer can receive from a prospective client without taking on conflicts of interest. If your intake captures full matter details before checking for conflicts, you can be disqualified from representing an existing client whose interests are adverse to the new caller. The remedy is to screen for conflicts up front, with only minimal information captured before consent." },
        ],
      },
      { type: "h2", text: "How ClaireAI runs the screen", id: "how-it-runs" },
      {
        type: "ol",
        items: [
          "After greeting the caller, the agent asks for their full name and whether anyone else is involved (adverse driver, opposing party, opposing counsel).",
          "Names are normalized (suffixes, hyphenated names, common nicknames) and queried against your conflicts database.",
          "If a match is found above the confidence threshold, the agent politely declines: \"I appreciate you reaching out, but we may not be able to represent you on this matter. I'll have to ask you to look for separate counsel.\"",
          "Conflicted call data is sequestered — visible only to the firm's ethics partner, not to the intake team.",
        ],
      },
      {
        type: "callout",
        tone: "note",
        title: "Confidence threshold",
        body: "The default match threshold is 0.85. You can raise it to be more conservative (more declines, fewer false positives) or lower it (more callers proceed, more manual review). The recommended setting depends on practice area and firm size.",
      },
      { type: "h2", text: "What if the database is wrong?", id: "data-quality" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Garbage in, garbage out. If your Clio conflicts database is stale or misspelled, the screen will produce false positives (declining callers who aren't actually conflicted) or false negatives. ClaireAI surfaces a Conflicts data health report under Settings → Security so you can audit the data quality and clean up stale entries." },
        ],
      },
    ],
    related: ["request-hipaa-baa", "data-retention-policy", "edit-intake-script"],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "troubleshoot-missed-call",
    category: "troubleshooting",
    title: "Troubleshooting: ClaireAI missed a call",
    lead: "If a caller says ClaireAI didn't answer, the cause is almost always the call forwarding configuration on your phone provider — not ClaireAI. Verify forwarding is active, check the carrier's last-mile logs, and re-run a test call.",
    tldr: [
      "99% of missed-call reports trace to broken forwarding on the firm's phone provider, not ClaireAI.",
      "Step 1: confirm forwarding is still active in your phone provider's admin.",
      "Step 2: check the call detail in ClaireAI — if the call doesn't appear, the call never reached us.",
      "Step 3: ask the caller for the time and the number they dialed. Cross-check with your carrier's CDR.",
      "If ClaireAI received the call but failed to answer, contact support — we'll pull platform-side logs.",
    ],
    lastUpdated: "2026-05-16",
    datePublished: "2026-02-15",
    readingTime: "7 min",
    author: AUTHORS.tiago,
    keywords: ["missed call", "AI receptionist troubleshooting", "call forwarding broken", "law firm support"],
    sections: [
      { type: "h2", text: "Confirm the call reached ClaireAI", id: "confirm-arrival" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Open the dashboard and search for the caller's number under Calls → All. If the call appears, ClaireAI received it. If the call is absent, it never reached us — the issue is upstream in your phone provider." },
        ],
      },
      { type: "h2", text: "Common upstream causes", id: "upstream-causes" },
      {
        type: "ul",
        items: [
          "Call forwarding accidentally turned off (most common).",
          "A staff member changed the main line's call handling in the softphone admin.",
          "Your softphone provider had a regional outage (RingCentral, Vonage, Nextiva publish status pages).",
          "Carrier-level issue on the caller's side (rare for U.S. mobile, more common with international).",
        ],
      },
      { type: "h2", text: "Pull your carrier's CDR", id: "cdr" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "Your carrier or softphone provider keeps a call detail record (CDR) for every inbound call. Search the CDR for the caller's number and the timestamp. If the CDR shows the call arrived at your main line but does NOT show it being forwarded to ClaireAI, forwarding is broken — fix it in the provider admin." },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Test calls don't replace forwarding alerts",
        body: "Set up a recurring monthly test under Settings → Health checks. ClaireAI auto-dials your main line and alerts you if forwarding silently breaks (which providers occasionally do after firmware updates).",
      },
      { type: "h2", text: "When to escalate to support", id: "escalate" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "If the call appears in ClaireAI's dashboard but the caller heard silence, a busy signal, or no greeting, escalate to support@theclaireai.com with the call ID. We pull platform-side logs and reply with a root cause within 4 business hours." },
        ],
      },
    ],
    related: ["activate-your-claireai-number", "warm-transfer-setup", "after-hours-routing"],
  },
  // ─────────────────────────────────────────────────────────────────────
  {
    slug: "data-retention-policy",
    category: "security-and-compliance",
    title: "ClaireAI's data retention and deletion policy",
    lead: "ClaireAI retains call recordings for 90 days, transcripts indefinitely, and intake data indefinitely by default. Any of these can be shortened on request. Customers can delete a specific call or wipe all data through the dashboard, with deletion completing within 24 hours and irreversible after 30 days.",
    tldr: [
      "Default retention: recordings 90 days, transcripts and intake data indefinite.",
      "Per-firm policy override available — shorten to 30 days, 14 days, or 7 days on request.",
      "Per-call deletion available from any call detail page; deletes propagate to backups within 24 hours.",
      "Bulk delete on request via support — typically used at the end of a customer engagement.",
      "Data is encrypted at rest with AES-256 and in transit with TLS 1.3.",
    ],
    lastUpdated: "2026-05-05",
    datePublished: "2026-02-20",
    readingTime: "4 min",
    author: AUTHORS.cal,
    keywords: ["data retention", "deletion policy", "law firm data", "AI receptionist compliance"],
    sections: [
      { type: "h2", text: "Default retention windows", id: "defaults" },
      {
        type: "ul",
        items: [
          "Call recordings — 90 days, then automatically purged from primary storage and backups within 24 hours.",
          "Transcripts — indefinite by default. Customers commonly shorten to 1 year.",
          "Intake answers — indefinite by default; these are typically already synced to your CRM, so they're not the primary record after sync.",
          "Audit logs — 7 years for SOC 2 and HIPAA evidence.",
        ],
      },
      { type: "h2", text: "Delete a specific call", id: "delete-call" },
      {
        type: "ol",
        items: [
          "Open the call detail page.",
          "Click ⋯ → Delete call.",
          "Confirm. The call is removed from the dashboard immediately.",
          "Backup propagation completes within 24 hours; after 30 days the deletion is irreversible.",
        ],
      },
      { type: "h2", text: "Wipe all data", id: "wipe-all" },
      {
        type: "p",
        spans: [
          { kind: "text", text: "If you are ending your engagement with ClaireAI and want all data removed, email support@theclaireai.com with the request. We process bulk deletes within 7 business days and issue a written deletion certificate." },
        ],
      },
    ],
    related: ["request-hipaa-baa", "conflict-screening-rule-118", "billing-overage-handling"],
  },
];

export function getHelpArticle(slug: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): HelpArticle[] {
  return HELP_ARTICLES.filter((a) => a.category === categorySlug);
}

export function getCategory(slug: string): HelpCategory | undefined {
  return HELP_CATEGORIES.find((c) => c.slug === slug);
}

export function getRelatedHelpArticles(slugs: string[]): HelpArticle[] {
  return slugs
    .map((s) => HELP_ARTICLES.find((a) => a.slug === s))
    .filter((a): a is HelpArticle => !!a);
}

/**
 * Truncate the article lead into a SERP-safe meta description (≤155 chars).
 *
 * Google's snippet algorithm truncates around 155–160 characters on desktop SERPs.
 * The lead is intentionally longer because it doubles as the in-page citable
 * passage for AI Overviews / ChatGPT, which have no length budget. This helper
 * gives us a short version for `<meta name="description">` and OG without losing
 * the long citable form in the article body.
 */
export function shortDescription(lead: string, maxLen = 155): string {
  if (lead.length <= maxLen) return lead;
  const cutoff = lead.slice(0, maxLen);
  const lastSpace = cutoff.lastIndexOf(" ");
  return cutoff.slice(0, lastSpace > 0 ? lastSpace : maxLen).replace(/[.,;:—–-]+$/, "") + "…";
}

/** Lightweight searchable index used by the client-side search component. */
export type HelpSearchEntry = {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  lead: string;
  readingTime: string;
  keywords: string[];
  haystack: string;
};

export function getSearchIndex(): HelpSearchEntry[] {
  return HELP_ARTICLES.map((a) => {
    const cat = HELP_CATEGORIES.find((c) => c.slug === a.category);
    const sectionText = a.sections
      .map((s) => {
        if (s.type === "h2" || s.type === "h3") return s.text;
        if (s.type === "p") return s.spans.map((sp) => sp.text).join(" ");
        if (s.type === "ol" || s.type === "ul") return s.items.join(" ");
        if (s.type === "callout") return `${s.title} ${s.body}`;
        if (s.type === "code") return s.text;
        return "";
      })
      .join(" ");
    const faqText = (a.faq ?? []).map((f) => `${f.q} ${f.a}`).join(" ");
    return {
      slug: a.slug,
      title: a.title,
      category: a.category,
      categoryName: cat?.name ?? "",
      lead: a.lead,
      readingTime: a.readingTime,
      keywords: a.keywords,
      haystack: [
        a.title,
        a.lead,
        a.tldr.join(" "),
        sectionText,
        faqText,
        a.keywords.join(" "),
        cat?.name ?? "",
      ]
        .join(" ")
        .toLowerCase(),
    };
  });
}
