// Source of truth for the /integrations directory and per-integration detail pages.
// Subset of fields carries display metadata only for the marquee "featured" tiles
// at the top of /integrations; the rest render in the full-directory grid below.

export type IntegrationStatus = "LIVE" | "P0" | "P1" | "P2";
export type IntegrationAccess = "OPEN" | "PARTNER" | "TIER";
export type PracticeArea = "PI" | "CR" | "FA";

export type IntegrationCategory =
  | "practice-management"
  | "intake-crm"
  | "payments-esign"
  | "phone-voip"
  | "jail-phone"
  | "calendar"
  | "documents"
  | "court-records"
  | "accounting"
  | "call-tracking"
  | "notifications-workflow";

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  status: IntegrationStatus;
  access?: IntegrationAccess;
  practiceAreas: PracticeArea[];
  docsUrl?: string;
  auth?: string;
  notes?: string;

  // Display metadata (set for featured + future-detail-page rendering)
  featured?: boolean;
  tagline?: string;
  brand?: { bg: string; ink: "light" | "dark" };
  oneLiner?: string;
  logoUrl?: string;
}

export const CATEGORIES: Record<IntegrationCategory, { label: string; short: string }> = {
  "practice-management":    { label: "Practice Management Systems", short: "Practice Management" },
  "intake-crm":             { label: "Intake CRMs & Lead Management", short: "Intake CRM" },
  "payments-esign":         { label: "Payments & E-Signature", short: "Payments & E-Sign" },
  "phone-voip":             { label: "Phone Systems & VoIP", short: "Phone & VoIP" },
  "jail-phone":             { label: "Jail Inmate Phone Systems", short: "Jail Phone" },
  "calendar":               { label: "Calendar & Scheduling", short: "Calendar" },
  "documents":              { label: "Document Management", short: "Documents" },
  "court-records":          { label: "Court Records & Deadlines", short: "Court Records" },
  "accounting":             { label: "Accounting", short: "Accounting" },
  "call-tracking":          { label: "Call Tracking & Marketing", short: "Call Tracking" },
  "notifications-workflow": { label: "Notifications & Workflow", short: "Workflow" },
};

export const STATUS_LABEL: Record<IntegrationStatus, string> = {
  LIVE: "Live now",
  P0: "Coming next",
  P1: "On the roadmap",
  P2: "By request",
};

export const PRACTICE_AREA_LABEL: Record<PracticeArea, string> = {
  PI: "Personal Injury",
  CR: "Criminal Defense",
  FA: "Family Law",
};

export const INTEGRATIONS: Integration[] = [
  // ─── Practice Management ───────────────────────────────────────
  {
    id: "clio",
    name: "Clio Manage",
    category: "practice-management",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://app.clio.com/api/v4/documentation",
    auth: "OAuth 2.0",
    featured: true,
    tagline: "The most-used legal CRM, wired into Claire's intake.",
    oneLiner:
      "Every qualified lead lands in Clio Manage with full transcript, practice-area tags, and a custom-field mapped intake — before the caller hangs up.",
    brand: { bg: "#1B3656", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854428/6408debf8f29905e63913c85_5b4669b0bc344ee8d46ce80a_clio-logomark-4-2.png",
  },
  {
    id: "mycase",
    name: "MyCase",
    category: "practice-management",
    status: "LIVE",
    access: "TIER",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://help.mycase.com",
    auth: "OAuth + key",
    notes: "Advanced tier $89/mo",
    featured: true,
    tagline: "Native two-way sync with MyCase Advanced.",
    oneLiner:
      "Claire pushes new matters, contacts, and intake notes directly into MyCase — no double entry, no copy-paste from the call transcript.",
    brand: { bg: "#4B2E83", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854431/6408dec5a5cfb4a7395b71ee_62a7d11f5d414a83c151f860_mycase-1650999637-logo.png",
  },
  {
    id: "filevine",
    name: "Filevine",
    category: "practice-management",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI"],
    docsUrl: "https://developer.filevine.io/docs/v2-us",
    auth: "OAuth 2.0 client credentials",
    featured: true,
    tagline: "Built for the PI volume firm running Filevine.",
    oneLiner:
      "Mechanism of injury, treatment status, liability facts, and insurance — pushed straight into the Filevine project the moment the call hangs up.",
    brand: { bg: "#FF6B00", ink: "dark" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851153/Filevine_Company_Logo.png",
  },
  {
    id: "casepeer",
    name: "CASEpeer",
    category: "practice-management",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI"],
    featured: true,
    tagline: "PI-only intake, mapped straight to CASEpeer cases.",
    brand: { bg: "#0A4D52", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851896/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJjb250ZW50ZnVsIn0sInBhdGgiOiJhZmZpbmlwYXlcL2ZpbGVcL280VXZ2azh1akZ4cERnNEY0eDYzLndlYnAifQ-affinipay-vHnCaz2DnrDtC1VVjI-OhAF2abMc1CRW4Im-bw_1Jmc.png",
    oneLiner:
      "Mechanism of injury, treatment status, liability facts, and lead grade — pushed into the matching CASEpeer custom fields the moment the call ends. Your existing PI pipeline runs automatically.",
  },
  {
    id: "smartadvocate",
    name: "SmartAdvocate",
    category: "practice-management",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI"],
    featured: true,
    tagline: "Volume PI firms running SmartAdvocate, fully synced.",
    brand: { bg: "#F58220", ink: "dark" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851253/Logo_SmartAdvocate-1.png",
    oneLiner:
      "Claire writes SmartAdvocate cases with full intake — incident facts, insurance carriers, medical providers, and lead grade — mapped 1:1 to your existing fields. Volume PI firms get matters in seconds, not after a coordinator gets to them.",
  },
  {
    id: "litify",
    name: "Litify",
    category: "practice-management",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI"],
    featured: true,
    tagline: "Salesforce-native PI firms on Litify.",
    brand: { bg: "#0E4A8C", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851286/a93e8af6-7576-4660-ad31-c2f59cf980ac.png",
    oneLiner:
      "Claire creates Salesforce-native Litify matters with incident type, parties, jurisdiction, and lead grade populated. Your existing Litify rules and dashboards reflect Claire-generated matters identically to manual ones.",
  },
  {
    id: "neos",
    name: "Neos (Assembly)",
    category: "practice-management",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI"],
    featured: true,
    tagline: "Assembly Neos for serious PI volume.",
    brand: { bg: "#0FB0AE", ink: "dark" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851360/Neos-LL.png.png",
    oneLiner:
      "New Neos cases land with full transcript, incident facts, and lead grade attached. Claire respects your Neos workflow stages and case-type templates so existing routing fires on the new matter.",
  },
  {
    id: "cloudlex",
    name: "CloudLex",
    category: "practice-management",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI"],
    featured: true,
    tagline: "Cloud-native PI matter management.",
    brand: { bg: "#1F4E8C", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851883/apps.6163.45c7dfcd-198f-4022-aeea-951990102bb6.50d98f43-2dda-4d7b-a372-4c93960d5387.c9e0ca18-f2d7-43d7-a856-e17629ea1c57.png",
    oneLiner:
      "Claire creates CloudLex matters with mechanism-of-injury, insurance, treatment, and lead grade pre-populated. PI firms on CloudLex stop losing matters between the call and the coordinator's inbox.",
  },
  {
    id: "practicepanther",
    name: "PracticePanther",
    category: "practice-management",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://support.practicepanther.com/en/articles/479897-practicepanther-api",
    featured: true,
    tagline: "PracticePanther firms, on a 5-minute setup.",
    brand: { bg: "#1A1A1A", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854434/6408dec626e7bf014bc33cc5_5b46709c2605270d92f54f21_practice-panther-logomark-4.png",
    oneLiner:
      "Claire pushes new PracticePanther matters with full transcript and intake fields mapped — solo and small-firm setup runs in five minutes over OAuth, no IT involvement required.",
  },
  {
    id: "smokeball",
    name: "Smokeball",
    category: "practice-management",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://docs.smokeball.com",
    featured: true,
    tagline: "Smokeball matters created from the call transcript.",
    brand: { bg: "#E04E39", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851399/eyJvYXV0aCI6eyJjbGllbnRfaWQiOiJjb250ZW50ZnVsIn0sInBhdGgiOiJhZmZpbmlwYXlcL2ZpbGVcL3l1cm1lQlZ4dDdBOVlKYUE0WUYyLndlYnAifQ-affinipay-gIl4AN3h-73fxfnly7HGU6vcOPXixwy82ke4fH_ViXQ.png",
    oneLiner:
      "Smokeball matters created from the call transcript with Form Library tags ready and client intake fields populated. Document automation runs against Claire-generated matters identically to manual ones.",
  },
  {
    id: "rocket-matter",
    name: "Rocket Matter",
    category: "practice-management",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://developer.rocketmatter.com",
    featured: true,
    tagline: "Rocket Matter, with intake wired in.",
    brand: { bg: "#C92433", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851434/2wbAlSYebAxbo3NimYWkU2N5o3Mbmlz6sXoPmjv9.png",
    oneLiner:
      "Claire creates Rocket Matter cases with full intake, lead grade, and transcript attached. Time tracking and billing rules apply to Claire-generated matters from minute one.",
  },
  {
    id: "caret-legal",
    name: "CARET Legal",
    category: "practice-management",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://caretlegal.com/public-api",
    featured: true,
    tagline: "CARET Legal (formerly Zola Suite), connected.",
    brand: { bg: "#2D7D32", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851469/caret-legal_logo_color_primary_rgb.tmb-vendorlogo.png",
    oneLiner:
      "Formerly Zola Suite. Claire writes new matters into CARET Legal with full transcript, parties, and intake fields mapped — your existing workflow templates trigger on the new case.",
  },
  {
    id: "cosmolex",
    name: "CosmoLex",
    category: "practice-management",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    featured: true,
    tagline: "CosmoLex with built-in trust accounting.",
    brand: { bg: "#003366", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851503/CosmoLex-1400x398.png",
    oneLiner:
      "CosmoLex matters and trust ledger entries are created from the call with practice-area tags and intake fields mapped. Trust accounting starts clean on every Claire-generated matter.",
  },
  {
    id: "actionstep",
    name: "Actionstep",
    category: "practice-management",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    featured: true,
    tagline: "Actionstep for full-suite firms.",
    brand: { bg: "#0066CC", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1778851539/actionstep-actionstep-logo-rgb-1.png",
    oneLiner:
      "Claire creates Actionstep matters with full-suite intake mapped — workflows, document templates, and matter-type rules run on the new case automatically.",
  },

  // ─── Intake CRMs ───────────────────────────────────────────────
  {
    id: "lawmatics",
    name: "Lawmatics",
    category: "intake-crm",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://docs.lawmatics.com",
    auth: "OAuth 2.0",
    tagline: "The intake CRM, kept in sync from the first ring.",
    oneLiner:
      "Claire fires every call into Lawmatics with grade, practice area, and transcript attached — running your existing intake automations on day one.",
    brand: { bg: "#0F2740", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854433/6408dec417d27f45a610910f_5cb51e3743310512688df15c_lawmatics-sq.png",
  },
  {
    id: "lead-docket",
    name: "Lead Docket",
    category: "intake-crm",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI"],
    docsUrl: "https://support.leaddocket.com",
    auth: "API key + webhooks",
    tagline: "Lead Docket leads, populated before the call ends.",
    oneLiner:
      "PI firms running Lead Docket get a new lead in under 5 seconds — source attribution, lead grade, qualification path, and full transcript pre-populated so your existing Lead Docket assignment rules fire correctly.",
  },
  {
    id: "clio-grow",
    name: "Clio Grow",
    category: "intake-crm",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Clio Grow leads, fed by Claire.",
    oneLiner:
      "Already running Clio Grow for intake? Claire writes new prospects with stage, source, and qualification fields mapped — your existing Clio Grow workflows trigger automatically on the Claire-generated lead.",
  },
  {
    id: "captorra",
    name: "Captorra",
    category: "intake-crm",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR"],
    docsUrl: "https://www.captorra.com/captorra-api-posting",
    tagline: "Captorra intake, captured live.",
    oneLiner:
      "Mass-tort and PI firms running Captorra get Claire-qualified leads with case-type, jurisdiction, and intake-form responses populated. Captorra's existing scoring runs identically on Claire-generated leads.",
  },
  {
    id: "law-ruler",
    name: "Law Ruler",
    category: "intake-crm",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI"],
    docsUrl: "https://www.lawruler.com/api",
    tagline: "Law Ruler intake, kept in lockstep.",
    oneLiner:
      "PI firms running Law Ruler get new leads with source, lead grade, and intake fields populated. Law Ruler's existing assignment and follow-up rules apply to Claire-generated leads from the moment they're written.",
  },
  {
    id: "simplyconvert",
    name: "SimplyConvert",
    category: "intake-crm",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI"],
    tagline: "SimplyConvert flows, fed from voice.",
    oneLiner:
      "Already running SimplyConvert chat intake? Claire adds the voice channel: every qualified call writes a SimplyConvert lead with grade, intake responses, and transcript so your conversion funnels operate across voice and chat.",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "intake-crm",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    auth: "OAuth 2.0",
    tagline: "HubSpot CRM, with intake calls turning into deals.",
    oneLiner:
      "Claire creates HubSpot contacts and deals straight from the call, with lifecycle stage, qualification grade, and full transcript synced — your existing HubSpot workflows trigger automatically.",
    brand: { bg: "#FF7A59", ink: "dark" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854439/6408dec3a5cfb436515b7177_5b466ff95de4cb8a3e25d9de_hubspot-logomark-4.png",
  },

  // ─── Payments & E-Sign ────────────────────────────────────────
  {
    id: "docusign",
    name: "DocuSign",
    category: "payments-esign",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://developers.docusign.com",
    auth: "OAuth 2.0",
    tagline: "Retainers signed before the caller dials the next firm.",
    oneLiner:
      "For pre-cleared matter types, Claire dispatches the DocuSign engagement letter directly from the call. Most clients sign before they hang up.",
    brand: { bg: "#FFCC00", ink: "dark" },
  },
  {
    id: "lawpay",
    name: "LawPay",
    category: "payments-esign",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI", "CR", "FA"],
    docsUrl: "https://developers.8am.com",
    tagline: "Trust-compliant retainer payment in the same call.",
    oneLiner:
      "Claire generates a LawPay payment link on the call and texts it before hang-up. Funds route to the correct trust or operating account based on matter type.",
    brand: { bg: "#1F3552", ink: "light" },
  },
  {
    id: "affinipay",
    name: "AffiniPay",
    category: "payments-esign",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "AffiniPay-powered retainers, signed in-call.",
    oneLiner:
      "Claire dispatches AffiniPay payment links during the call with trust-account routing and matter classification pre-set — funds land in the right account on the first transaction.",
  },
  {
    id: "adobe-sign",
    name: "Adobe Sign",
    category: "payments-esign",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Adobe Sign engagement letters, dispatched live.",
    oneLiner:
      "For pre-cleared matter types, Claire sends Adobe Sign engagement letters during the call. Signed-status fires back into Claire's outbound engine, so reminder cadence runs automatically until execution.",
  },
  {
    id: "vinesign",
    name: "Vinesign",
    category: "payments-esign",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI"],
    notes: "Auto-covered via Filevine",
    tagline: "Vinesign for Filevine-native PI firms.",
    oneLiner:
      "Vinesign engagement letters are dispatched during the call for PI firms running Filevine. Signed retainers post automatically against the matter the moment the client executes.",
  },
  {
    id: "gravity-legal",
    name: "Gravity Legal",
    category: "payments-esign",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Trust-account-aware retainer payments.",
    oneLiner:
      "Claire generates Gravity Legal payment links on the call with trust or operating account routing pre-set by matter type. Trust-ledger entries post automatically against the new matter.",
  },

  // ─── Phone / VoIP ─────────────────────────────────────────────
  {
    id: "telnyx",
    name: "Telnyx",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    notes: "SMS + DID provisioning (voice path runs on LiveKit Cloud)",
    tagline: "Telnyx SMS + DIDs, paired with LiveKit voice.",
    oneLiner:
      "Claire uses Telnyx for SMS dispatch and DID provisioning while the actual call audio runs on LiveKit Cloud — clean carrier separation, no number porting required for new ClaireAI numbers.",
  },
  {
    id: "ringcentral",
    name: "RingCentral",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Drop Claire in front of your RingCentral DIDs.",
    oneLiner:
      "Claire routes through your existing RingCentral numbers via SIP — no number porting, no new hardware, no change to how your team dials out.",
    brand: { bg: "#FF7A00", ink: "dark" },
  },
  {
    id: "dialpad",
    name: "Dialpad",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Dialpad numbers forwarded to Claire.",
    oneLiner:
      "SIP forwarding on your Dialpad lines routes inbound calls to Claire in 0.8 seconds. Caller-ID is preserved end-to-end; call logs stay in Dialpad alongside Claire's transcript and recording.",
  },
  {
    id: "zoom-phone",
    name: "Zoom Phone",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Zoom Phone, with Claire on the front line.",
    oneLiner:
      "Claire receives forwarded calls from your Zoom Phone numbers via SIP — handles overflow, after-hours, or every call, with warm transfers back to attorneys on Zoom for handoff.",
  },
  {
    id: "ms-teams-phone",
    name: "Microsoft Teams Phone",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Microsoft Teams Phone calls, answered in 0.8 seconds.",
    oneLiner:
      "Your Teams Phone numbers forward to Claire over SIP. Calls qualified by Claire transfer back into Teams for the matter-routed attorney with the transcript already loaded.",
  },
  {
    id: "8x8",
    name: "8x8",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "8x8 cloud PBX, with Claire answering first.",
    oneLiner:
      "Your 8x8 numbers forward to Claire via SIP. Existing 8x8 call routing rules continue to govern outbound and internal calls — Claire handles inbound qualification only.",
  },
  {
    id: "vonage",
    name: "Vonage",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Vonage Business numbers, fronted by Claire.",
    oneLiner:
      "SIP forwarding on Vonage Business Communications routes inbound calls to Claire. Caller-ID preservation and warm transfers back to Vonage attorneys ship out of the box.",
  },
  {
    id: "nextiva",
    name: "Nextiva",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Nextiva cloud phone, in front of Claire.",
    oneLiner:
      "Nextiva numbers forward to Claire via SIP for overflow, after-hours, or full-time answering. Call recordings drop in Claire's portal; Nextiva keeps the call detail records on its side.",
  },
  {
    id: "openphone",
    name: "OpenPhone",
    category: "phone-voip",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "OpenPhone for solo and small firms, with Claire answering.",
    oneLiner:
      "OpenPhone numbers forward to Claire via SIP. Solo practitioners get 24/7 coverage without changing their OpenPhone setup — Claire handles inbound while OpenPhone handles outbound and team chat.",
  },

  // ─── Jail Phones (PSTN routing) ───────────────────────────────
  {
    id: "securus",
    name: "Securus",
    category: "jail-phone",
    status: "LIVE",
    practiceAreas: ["CR"],
    notes: "PSTN routing via caller-ID detection",
    tagline: "In-custody calls, recognized and routed.",
    oneLiner:
      "Securus caller-ID patterns are detected before the script runs. Time-critical matters page the on-call attorney by SMS within seconds — no missed jail call.",
    brand: { bg: "#0B2240", ink: "light" },
  },
  {
    id: "viapath",
    name: "ViaPath (GTL)",
    category: "jail-phone",
    status: "LIVE",
    practiceAreas: ["CR"],
    notes: "PSTN routing",
    tagline: "ViaPath inmate calls, captured for criminal defense.",
    oneLiner:
      "ViaPath (formerly GTL) inmate calls are detected by caller-ID pattern and routed to Claire's criminal-defense intake script. Urgent matters page the on-call attorney by SMS within seconds.",
  },
  {
    id: "ic-solutions",
    name: "IC Solutions",
    category: "jail-phone",
    status: "LIVE",
    practiceAreas: ["CR"],
    tagline: "IC Solutions inmate calls, answered for the defense.",
    oneLiner:
      "IC Solutions caller-ID patterns flag the call as in-custody before Claire's script runs. Charge, jurisdiction, and prior-counsel questions sequence appropriately for criminal defense intake.",
  },
  {
    id: "smart-comms",
    name: "Smart Communications",
    category: "jail-phone",
    status: "LIVE",
    practiceAreas: ["CR"],
    tagline: "Smart Communications inmate calls, captured.",
    oneLiner:
      "Smart Communications caller-ID detection routes in-custody calls through Claire's criminal-defense intake script. Time-critical matters page the on-call attorney inside the facility's call window.",
  },

  // ─── Calendar ─────────────────────────────────────────────────
  {
    id: "ms365",
    name: "Microsoft 365 / Outlook",
    category: "calendar",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Consults on the right attorney's Outlook calendar.",
    oneLiner:
      "Claire books consults directly on the matter-routed attorney's Outlook calendar with conflict checking, SMS confirmation, and a calendar invite before hang-up.",
    brand: { bg: "#0078D4", ink: "light" },
  },
  {
    id: "google-workspace",
    name: "Google Workspace",
    category: "calendar",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Google Calendar booking, with the conflicts handled.",
    oneLiner:
      "Claire reads your Google Calendar availability live, books the consult, and sends the confirmation by email and SMS — all before the caller hangs up.",
    brand: { bg: "#1F2937", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854417/65cb83e9780d84b0f198e29f_Google_Icons-03-512.png",
  },
  {
    id: "calendly",
    name: "Calendly",
    category: "calendar",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Drop into your existing Calendly funnel.",
    oneLiner:
      "Already running Calendly for consultations? Claire books straight onto your Calendly event types — no duplicate scheduling system to maintain.",
    brand: { bg: "#006BFF", ink: "light" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854418/6408debe8f29907cce913c7c_62f57e5c44a9e531596a4346_calendly_brand_mark_color.png",
  },
  {
    id: "acuity",
    name: "Acuity Scheduling",
    category: "calendar",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["CR", "FA"],
    tagline: "Acuity Scheduling, fed by Claire's intake.",
    oneLiner:
      "Claire books consults directly onto your Acuity Scheduling event types, respecting buffer rules and time-zone normalization — confirmations and reminders fire on Acuity's existing cadence.",
  },
  {
    id: "ms-bookings",
    name: "Microsoft Bookings",
    category: "calendar",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Microsoft Bookings appointments, written live.",
    oneLiner:
      "Claire writes appointments into Microsoft Bookings respecting service catalogs and per-staff availability — your existing Bookings confirmation emails fire automatically on Claire-generated appointments.",
  },

  // ─── Documents ────────────────────────────────────────────────
  {
    id: "netdocuments",
    name: "NetDocuments",
    category: "documents",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "NetDocuments matter workspaces, created on call.",
    oneLiner:
      "Claire creates per-matter NetDocuments workspaces on call qualification with transcript, recording, and intake PDF auto-deposited. Profile fields and security inherit from your existing configuration.",
  },
  {
    id: "imanage",
    name: "iManage",
    category: "documents",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "iManage matter folders, opened automatically.",
    oneLiner:
      "iManage Work workspaces are created per matter the moment Claire qualifies the call. Client and matter naming follows your existing iManage taxonomy; permissions inherit from the practice area.",
  },
  {
    id: "sharepoint",
    name: "SharePoint / OneDrive",
    category: "documents",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "SharePoint and OneDrive folders for every new matter.",
    oneLiner:
      "Per-matter SharePoint or OneDrive folders are created on call qualification with transcript and intake form attached. Permissions inherit from your site or library configuration.",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    category: "documents",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Google Drive matter folders, ready before hang-up.",
    oneLiner:
      "Claire creates per-matter Google Drive folders with the transcript, recording, and intake form attached — sharing settings inherit from your Workspace configuration.",
  },
  {
    id: "box",
    name: "Box",
    category: "documents",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Box workspaces for every Claire-qualified matter.",
    oneLiner:
      "Box matter folders are created on call qualification with metadata templates honored. Box Governance rules apply identically to Claire-generated folders.",
  },
  {
    id: "dropbox",
    name: "Dropbox",
    category: "documents",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Dropbox folders for every new matter.",
    oneLiner:
      "Per-matter Dropbox folders are created on call qualification with transcript and intake form pre-loaded. Existing sharing rules and team-folder structures continue to apply.",
  },

  // ─── Court Records ────────────────────────────────────────────
  {
    id: "pacer",
    name: "PACER",
    category: "court-records",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["CR", "PI"],
    tagline: "Federal court records, looked up live.",
    oneLiner:
      "Claire queries PACER during the call to confirm case numbers, hearing dates, opposing counsel, and prior representation — verifying federal-court matters against authoritative data before intake completes.",
  },
  {
    id: "courtlistener",
    name: "CourtListener",
    category: "court-records",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["CR", "PI"],
    tagline: "Free Law Project records, live during intake.",
    oneLiner:
      "CourtListener API powers free, real-time court-records lookups on qualifying calls. State and federal cases verified against authoritative data; results write to the intake record automatically.",
  },
  {
    id: "lawtoolbox",
    name: "LawToolBox",
    category: "court-records",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["FA", "CR"],
    tagline: "Court deadline rules, applied to new matters.",
    oneLiner:
      "Claire registers new matters with LawToolBox so jurisdiction-specific deadlines (filing, discovery, response) auto-calculate on day one — no manual deadline calendar setup required.",
  },
  {
    id: "docket-alarm",
    name: "Docket Alarm",
    category: "court-records",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["CR", "PI"],
    tagline: "Docket Alarm court tracking, wired to intake.",
    oneLiner:
      "Claire enrolls new matters in Docket Alarm court tracking on call completion. Hearing alerts and docket updates flow back to the matter record automatically.",
  },

  // ─── Accounting ───────────────────────────────────────────────
  {
    id: "quickbooks",
    name: "QuickBooks Online",
    category: "accounting",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "QuickBooks Online with trust-aware retainer posting.",
    oneLiner:
      "Claire posts retainer transactions to QuickBooks Online with trust or operating routing pre-set by matter type — no end-of-month reclassification cleanup required.",
  },
  {
    id: "xero",
    name: "Xero",
    category: "accounting",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Xero accounting, fed by intake retainers.",
    oneLiner:
      "Retainer payments collected on call post to Xero with matter, client, and tracking-category set. Refunds and voids flow through as offsetting entries automatically.",
  },
  {
    id: "leanlaw",
    name: "LeanLaw",
    category: "accounting",
    status: "LIVE",
    access: "PARTNER",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "LeanLaw for QuickBooks-using firms.",
    oneLiner:
      "Claire feeds LeanLaw with new matters and retainer transactions — trust-aware posting and matter-level billing rules apply from day one.",
  },

  // ─── Call Tracking ────────────────────────────────────────────
  {
    id: "callrail",
    name: "CallRail",
    category: "call-tracking",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "CallRail attribution, preserved through Claire.",
    oneLiner:
      "Calls forwarded from CallRail tracking numbers reach Claire with source, campaign, keyword, and visitor session intact. Conversion events fire back to your ad platforms on lead qualification — accurate cost-per-signed-case end-to-end.",
  },
  {
    id: "whatconverts",
    name: "WhatConverts",
    category: "call-tracking",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "FA"],
    tagline: "WhatConverts source attribution, end-to-end.",
    oneLiner:
      "WhatConverts tracking numbers forward to Claire with full source attribution preserved. Lead value and conversion events post back automatically — ad spend reports show real cost-per-signed-case by source.",
  },
  {
    id: "ctm",
    name: "CallTrackingMetrics",
    category: "call-tracking",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI"],
    tagline: "CallTrackingMetrics, with Claire on the front.",
    oneLiner:
      "CallTrackingMetrics tracking numbers route to Claire with full attribution preserved. CTM's existing conversion rules and ad-platform integrations apply to Claire-qualified calls automatically.",
  },

  // ─── Notifications & Workflow ─────────────────────────────────
  {
    id: "slack",
    name: "Slack",
    category: "notifications-workflow",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854404/6477e8387c4665b59cd9fa35_6438745c487cb0d27bf44527_Slack_icon_2019-2.png",
    tagline: "New leads in Slack, the moment they qualify.",
    oneLiner:
      "Claire posts qualified leads, transferred calls, and signed retainers into Slack channels in real time. On-call attorneys get paged on urgent criminal-defense calls without leaving the channel.",
  },
  {
    id: "ms-teams",
    name: "Microsoft Teams",
    category: "notifications-workflow",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Microsoft Teams channels, fed by Claire events.",
    oneLiner:
      "Claire posts call lifecycle events into Microsoft Teams channels — qualified leads, transfers, retainers signed. On-call escalation routes through Teams' existing notification rules.",
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "notifications-workflow",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Plug Claire into 5,000+ apps via Zapier.",
    oneLiner:
      "Don't see your tool listed? Claire ships with native Zapier triggers — connect to anything in the Zapier ecosystem in under 5 minutes.",
    brand: { bg: "#FF4A00", ink: "dark" },
    logoUrl:
      "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1765854419/6408deca083a046bf97f0897_62d09cc5a1cadc53a359f377_150px_402x.png",
  },
  {
    id: "make",
    name: "Make",
    category: "notifications-workflow",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Make scenarios, triggered by Claire.",
    oneLiner:
      "Claire fires webhook events into Make for every call milestone. Build scenarios that touch any of Make's 1,500+ app integrations without writing code.",
  },
  {
    id: "n8n",
    name: "n8n",
    category: "notifications-workflow",
    status: "LIVE",
    access: "OPEN",
    practiceAreas: ["PI", "CR", "FA"],
    tagline: "Self-hosted n8n workflows, fed by Claire.",
    oneLiner:
      "For firms running n8n self-hosted, Claire fires webhook events on every call milestone — full data sovereignty over the workflow layer.",
  },
];

export const FEATURED_INTEGRATIONS = INTEGRATIONS.filter((i) => i.featured);

export function findIntegration(id: string): Integration | undefined {
  return INTEGRATIONS.find((i) => i.id === id);
}

export function byCategory(category: IntegrationCategory): Integration[] {
  return INTEGRATIONS.filter((i) => i.category === category);
}
