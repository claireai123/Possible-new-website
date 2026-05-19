const FAQS: { question: string; answer: string }[] = [
  {
    question: "What does ClaireAI actually do?",
    answer:
      "ClaireAI is an AI voice receptionist purpose-built for U.S. law firms. She answers every inbound call 24/7 in English and Spanish, qualifies the matter against your case-acceptance criteria, runs a real-time conflict check, books the consult on the right attorney's calendar, grades the lead A through D, drops a one-page brief into your CRM (Clio, Filevine, Lawmatics, MyCase, PracticePanther, HubSpot), and dispatches a DocuSign retainer over SMS before the caller hangs up.",
  },
  {
    question: "Is ClaireAI a chatbot, an IVR, or something different?",
    answer:
      "Neither. An IVR makes the caller press menu buttons; a chatbot is text-only. Claire is a real-time voice agent — she listens, understands plain English or Spanish, asks legally-relevant follow-up questions, and decides what to do next. Callers don't navigate a tree; they have a conversation, and the average qualified intake completes in under two minutes.",
  },
  {
    question: "Is ClaireAI safe for law-firm data?",
    answer:
      "Yes. ClaireAI runs on SOC 2 Type II infrastructure with HIPAA-aligned controls — every tenant is isolated, retention is firm-controlled, and we never use your firm's calls to train third-party models. Call audio, transcripts, and PII are encrypted at rest with AES-256 and in transit with TLS 1.3. A BAA is available on Professional and Enterprise tiers, and our own SOC 2 Type II audit is in progress.",
  },
  {
    question: "Can I hear Claire on a real call before I commit?",
    answer:
      "Yes. The fastest way is the audio sample on this page, where Claire qualifies a personal-injury lead end to end. If you'd rather Claire phone you, request a live demo and we'll have her call within minutes. Every plan also includes a 7-day free trial so you can run Claire on real inbound traffic before signing anything.",
  },
  {
    question: "Will my callers know they're talking to AI?",
    answer:
      "Claire identifies herself as your firm's AI receptionist at the start of every call — transparency is the policy, and the FCC's 2024 rule on AI voice disclosure makes it the right legal default. In practice, callers rarely care once the conversation flows naturally; what they notice is that someone picked up, in their language, at 11 p.m. on a Saturday.",
  },
  {
    question: "How is ClaireAI different from Smith.ai, Ruby, or LEX Reception?",
    answer:
      "Smith.ai, Ruby, and LEX are human (or hybrid-human) answering services priced per minute or per call — great for low volumes, but cost climbs with every ring and human staff aren't trained on your specific case-acceptance criteria. ClaireAI is a pure AI agent on flat-rate pricing: 24/7 instant pickup, bilingual by default, and Claire actually completes the intake, books the consult, runs conflicts, and sends the retainer — not just takes messages.",
  },
  {
    question: "Who built ClaireAI and where are you based?",
    answer:
      "ClaireAI was founded in 2024 and is headquartered in Miami, Florida. We're a focused team of voice-AI and legal-tech engineers — not a general AI receptionist platform retrofitted for law firms. Every workflow, prompt, and integration in Claire was built specifically for U.S. legal intake.",
  },
  {
    question: "How many firms use ClaireAI, and can I see a case study?",
    answer:
      "ClaireAI runs intake for 50+ U.S. law firms across personal injury, criminal defense, family, and immigration practice areas. Customers consistently see double-digit lifts in sign-rate within the first 60 days — driven by sub-five-minute response time, which Clio's Legal Trends Report links to a 78% inquiry-conversion rate. Case studies are available on request during your demo.",
  },
  {
    question: "How quickly can ClaireAI go live for my firm?",
    answer:
      "Most firms are answering live calls within 48 to 72 hours. Onboarding is a single working session: you share your case-acceptance criteria, calendar, CRM, and any forms; we tune Claire to your voice and practice areas; we port or forward your number; we test on staged calls; you flip the switch.",
  },
  {
    question: "What happens on a call Claire can't handle?",
    answer:
      "Claire is trained to recognize her own edges. For genuine emergencies, hostile callers, or matters outside your firm's scope, she warm-transfers in real time to an on-call attorney or staff line you designate. For complex cases that need human follow-up, she captures the full intake, flags it as priority, and notifies your team by SMS and CRM task — so nothing gets dropped.",
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

export function HomeFaq() {
  return (
    <section className="bg-white px-6 py-24 md:py-32 border-t border-[#e4e4e7]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-[1728px]">
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
          ClaireAI, answered.
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
  );
}
