type TrustCard = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

type TrustGridVariant = "default" | "personal-injury" | "family-law" | "criminal-defense";

const STROKE = 1.4;

const ICONS = {
  shield: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3.5 L23.5 7v6c0 5.6-3.8 10.4-9.5 11.5C8.3 23.4 4.5 18.6 4.5 13V7L14 3.5z" />
      <path d="M9.5 14l3.2 3.2L19 11" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 5h11l4 4v14a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" />
      <path d="M17.5 5v4h4" />
      <path d="M14 12v6M11 15h6" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="6" y="12.5" width="16" height="10.5" rx="1" />
      <path d="M9 12.5V9a5 5 0 0 1 10 0v3.5" />
      <circle cx="14" cy="17.5" r="1.4" fill="currentColor" />
    </svg>
  ),
  noTrain: (
    <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="14" cy="14" r="10" />
      <path d="M7 7l14 14" />
    </svg>
  ),
};

const CARDS_BY_VARIANT: Record<TrustGridVariant, TrustCard[]> = {
  default: [
    {
      title: "SOC 2 Type II infrastructure",
      body: "Hosted on cloud infrastructure independently audited to SOC 2 Type II. Continuous monitoring, formal access reviews, and incident response procedures aligned with AICPA Trust Services Criteria. Our own SOC 2 Type II audit is in progress.",
      icon: ICONS.shield,
    },
    {
      title: "HIPAA-aligned controls",
      body: "Administrative, physical, and technical safeguards aligned with the HIPAA Security Rule (45 CFR §§ 164.308–164.312). Business Associate Agreements available for firms handling PHI from medical-records intake.",
      icon: ICONS.doc,
    },
    {
      title: "End-to-end encryption",
      body: "Every call recording, transcript, and CRM payload encrypted with AES-256 at rest and TLS 1.3 in transit. Per-tenant key isolation, quarterly key rotation, and no cross-tenant data sharing — ever.",
      icon: ICONS.lock,
    },
    {
      title: "We don't train on your calls",
      body: "Your firm's recordings, transcripts, and prospect data are never used to train any AI model — ours or our subprocessors'. Your data stays your data, contractually binding in our Data Processing Agreement.",
      icon: ICONS.noTrain,
    },
  ],

  "personal-injury": [
    {
      title: "SOC 2 Type II infrastructure",
      body: "PI case files include settlement positions worth $100K to $7M+. Hosted on cloud infrastructure independently audited to SOC 2 Type II. Continuous monitoring, formal access reviews, and incident response aligned with AICPA Trust Services Criteria. Our own audit is in progress.",
      icon: ICONS.shield,
    },
    {
      title: "HIPAA-aligned PHI handling",
      body: "PI intake captures protected health information on the first call — ER visits, ongoing PT, surgery dates, MedPay claims, provider records. Safeguards aligned with the HIPAA Security Rule (45 CFR §§ 164.308–164.312). BAAs available for medical-record and provider-authorization handling.",
      icon: ICONS.doc,
    },
    {
      title: "End-to-end encryption",
      body: "Every accident-call recording, treatment transcript, and CRM payload encrypted with AES-256 at rest and TLS 1.3 in transit. Per-tenant key isolation, quarterly key rotation, no cross-tenant data sharing — your client's MRI scans and recorded statements never touch another firm's environment.",
      icon: ICONS.lock,
    },
    {
      title: "We don't train on your cases",
      body: "Your firm's accident recordings, statute-of-limitations data, settlement positions, and prospect information are never used to train any AI model — ours or our subprocessors'. Privileged work-product stays with your firm, contractually binding in our Data Processing Agreement.",
      icon: ICONS.noTrain,
    },
  ],

  "family-law": [
    {
      title: "SOC 2 Type II infrastructure",
      body: "Family-law case files include custody evaluations, financial disclosures, and DV records — every one of them privileged. Hosted on cloud infrastructure independently audited to SOC 2 Type II. Continuous monitoring, formal access reviews, and incident response aligned with AICPA Trust Services Criteria. Our own audit is in progress.",
      icon: ICONS.shield,
    },
    {
      title: "HIPAA-aligned PHI handling",
      body: "Family-law intake regularly touches PHI — mental health records, substance-abuse evaluations, child medical records, paternity testing. Safeguards aligned with the HIPAA Security Rule (45 CFR §§ 164.308–164.312). Business Associate Agreements available for firms handling protected health information.",
      icon: ICONS.doc,
    },
    {
      title: "End-to-end encryption",
      body: "Every distressed-caller recording, custody-evaluation transcript, and CRM payload encrypted with AES-256 at rest and TLS 1.3 in transit. Per-tenant key isolation, quarterly key rotation, no cross-tenant data sharing — your client's financial disclosures and DV statements never touch another firm's environment.",
      icon: ICONS.lock,
    },
    {
      title: "We don't train on your cases",
      body: "Your firm's DV recordings, custody disputes, financial-disclosure data, and prospect information are never used to train any AI model — ours or our subprocessors'. Privileged client communications stay with your firm, contractually binding in our Data Processing Agreement.",
      icon: ICONS.noTrain,
    },
  ],

  "criminal-defense": [
    {
      title: "SOC 2 Type II infrastructure",
      body: "Criminal-defense files include charging documents, plea negotiations, and privileged attorney-client communications where a client's liberty is at stake. Hosted on cloud infrastructure independently audited to SOC 2 Type II. Continuous monitoring, formal access reviews, and incident response aligned with AICPA Trust Services Criteria. Our own audit is in progress.",
      icon: ICONS.shield,
    },
    {
      title: "HIPAA-aligned PHI handling",
      body: "Criminal cases often involve mental-health evaluations, substance-abuse records, competency assessments, and prescription history for capacity defenses and mitigation. Safeguards aligned with the HIPAA Security Rule (45 CFR §§ 164.308–164.312). Business Associate Agreements available for firms handling protected health information.",
      icon: ICONS.doc,
    },
    {
      title: "End-to-end encryption",
      body: "Every jail-call recording, charging-document transcript, and CRM payload encrypted with AES-256 at rest and TLS 1.3 in transit. Per-tenant key isolation, quarterly key rotation, no cross-tenant data sharing — your client's plea positions never touch another firm's environment.",
      icon: ICONS.lock,
    },
    {
      title: "We don't train on your cases",
      body: "Your firm's charging documents, plea positions, defense strategies, and prospect information are never used to train any AI model — ours or our subprocessors'. Privileged attorney-client communications stay with your firm, contractually binding in our Data Processing Agreement.",
      icon: ICONS.noTrain,
    },
  ],
};

export function TrustGrid({ variant = "default" }: { variant?: TrustGridVariant } = {}) {
  const cards = CARDS_BY_VARIANT[variant];

  return (
    <section className="bg-white px-6 py-24 md:py-28 border-t border-[#0a0a0a]/[0.06]">
      <div className="mx-auto max-w-[1680px]">
        <p className="text-[12.5px] uppercase tracking-[0.22em] text-[#0a0a0a]/55 mb-6">
          Security &amp; privacy
        </p>
        <h2
          className="font-serif text-[#0a0a0a] max-w-[26ch] mb-16 md:mb-20"
          style={{
            fontSize: "clamp(2rem, 4vw, 56px)",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            fontWeight: 500,
          }}
        >
          Built for legal data.
        </h2>

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div key={card.title} className="flex flex-col">
              <div className="mb-7 h-8 w-8 text-[#0a0a0a]/80">{card.icon}</div>
              <h3
                className="text-[#0a0a0a]"
                style={{
                  fontSize: "17px",
                  lineHeight: "1.3",
                  letterSpacing: "-0.01em",
                  fontWeight: 600,
                }}
              >
                {card.title}
              </h3>
              <p className="mt-4 text-[14.5px] md:text-[15px] leading-[1.6] text-[#0a0a0a]/60 max-w-[34ch]">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
