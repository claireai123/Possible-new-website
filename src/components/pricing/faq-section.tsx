"use client";

import React, { useState } from 'react';

const faqs = [
  {
    question: "What happens if I go over my call limit?",
    answer: "We'll never cut off your calls. If you exceed your monthly plan limit, additional call volume is billed at $0.65 per overage minute — every call still gets answered, qualified, and booked. If you consistently exceed your limit, we'll reach out to discuss upgrading to a tier that fits your volume."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes — every plan includes a 7-day free trial. Claire goes live on your number from day one: answering calls, qualifying leads, and booking consultations. No credit card required to start. Most firms see real qualified leads inside the first 48 hours."
  },
  {
    question: "Is ClaireAI fully bilingual?",
    answer: "Yes. ClaireAI natively speaks English and Spanish, detects the caller's language on the first phrase, and switches mid-conversation when the caller prefers. Spanish-language transcripts are also stored in English for attorney review."
  },
  {
    question: "How long does onboarding take?",
    answer: "Most firms are live within 3–5 business days. Onboarding includes mirroring your existing intake script, training Claire on your practice areas and routing rules, wiring CRM and calendar integrations, and porting your main number. Setup is white-glove — we handle the integration work, not you."
  },
  {
    question: "Are there setup fees or hidden costs?",
    answer: "No setup fee, no onboarding fee, no per-integration fee. The monthly subscription plus the per-signed-retainer success fee ($25 on Starter and Professional, $15 on Enterprise) is the entire cost. You only pay the success fee when Claire actually books and converts a matter."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. All plans are month-to-month with no annual commitment. Cancel anytime with 30 days' notice. Annual prepay is available at a discount on Professional and Enterprise tiers if you prefer the lower rate."
  },
  {
    question: "What counts as a call against my plan limit?",
    answer: "A call is any inbound voice call that reaches Claire and is not filtered as spam. Hang-ups under 10 seconds, wrong numbers, and known robocallers are not counted. Outbound callback confirmations made on your behalf are also not counted against the plan limit."
  },
  {
    question: "Why is ClaireAI priced per call instead of per minute like Smith.ai or Ruby?",
    answer: "Per-minute pricing penalizes the firm for thorough intake — every clarifying question costs more. Claire is priced as a flat monthly subscription so your bill is predictable, and so we're aligned with completing the intake properly, not racing the clock. Most firms replace a $2,000–$4,000/month answering service with a $450–$1,800/month Claire plan."
  },
  {
    question: "Do you charge for spam or sales calls?",
    answer: "No. Known spam, debt collector, and robocaller numbers are filtered before they touch the intake script — you're never charged for them. Sales solicitations (\"We can rank your firm on Google\") are politely declined, logged, and don't count against your plan."
  },
  {
    question: "Are there volume discounts for high-call-volume firms?",
    answer: "Yes. Firms doing more than 800 calls/month, multi-location firms, and multi-attorney firms with custom routing typically move to a usage-based Enterprise quote. Contact sales for a custom plan — pricing scales down per call as volume goes up."
  },
  {
    question: "Can I switch plans mid-month?",
    answer: "Yes. Plan changes take effect on your next billing cycle with the higher rate prorated. Upgrades can be activated immediately if you're approaching the call limit — we'll never throttle you mid-month."
  },
  {
    question: "Do separate office locations need separate plans?",
    answer: "Not necessarily. The Professional plan supports up to 3 phone numbers and 3 practice areas, which covers most multi-office firms. Enterprise includes multi-location geo-routing and unlimited numbers under one plan."
  },
  {
    question: "Is ClaireAI HIPAA and SOC 2 compliant?",
    answer: "Yes. ClaireAI runs on SOC 2 Type II infrastructure with HIPAA-aligned controls — AES-256 encryption at rest and TLS 1.3 in transit. Our own SOC 2 Type II audit is in progress. A Business Associate Agreement (BAA) is available on Professional and Enterprise plans for firms handling protected health information in personal injury or medical malpractice matters."
  },
  {
    question: "What's the refund policy?",
    answer: "The 7-day free trial means you've already tested Claire on real calls before any money changes hands. After that, monthly subscriptions are non-refundable but you can cancel anytime with 30 days' notice. We've never had a firm finish the trial and ask to leave — most see qualified leads inside the first two days."
  },
  {
    question: "How does ClaireAI's per-call pricing compare to Smith.ai's $292/mo for 30 calls or Ruby's $720/mo for 200 minutes?",
    answer: "ClaireAI Starter is $450/mo and includes far more billable calls than Smith.ai's 30-call tier — Smith.ai's $9.75–$11 per-call overage and Ruby's $25–$40 effective per-intake cost on the Team plan add up fast for any firm doing more than a few hundred calls a month. We also don't charge $2.25 extra per call for appointment booking or conflict-check capture the way Smith.ai does; both are included. If you handle more than ~120 calls/month, ClaireAI is almost always cheaper than either incumbent."
  },
  {
    question: "What happens to my existing phone number — do I have to port it?",
    answer: "No. The fastest path is conditional call forwarding (busy / no-answer / after-hours) from your existing carrier to the ClaireAI number we assign you — that's how most firms launch in under 24 hours. If you'd rather have ClaireAI as the primary answer point, you can port your main line to us (FCC requires your old carrier to release it; typical timeline is 10–15 business days). We recommend forwarding for week one so you have a rollback if anything feels off."
  },
  {
    question: "Will my callers know they're talking to AI? Has anyone complained?",
    answer: "Our cascaded voice pipeline routinely fools callers — one personal-injury firm using a comparable AI receptionist had clients ask the front desk where \"Megan\" sits in the office. ClaireAI introduces itself by name (e.g., \"Hi, this is Claire with [Firm Name]\") and we don't pretend to be a licensed attorney. If a caller insists on a human, Claire warm-transfers to your on-call attorney or takes a callback message."
  },
  {
    question: "Can ClaireAI warm-transfer an urgent call to my cell phone in real time?",
    answer: "Yes. Claire detects priority keywords (e.g., \"arrested,\" \"ER,\" \"accident last night,\" \"deadline tomorrow\") and warm-transfers to whichever attorney is on-call — with a spoken context handoff so you know who's on the line and why before you say hello. Cold/blind transfers are also available if you prefer the AI to drop off silently. This is one of the biggest gaps versus services that only support blind transfers."
  },
  {
    question: "Is the monthly fee tax-deductible as a business expense?",
    answer: "Yes — ClaireAI fees are an ordinary and necessary business expense for a law practice, deductible on Schedule C or your firm's entity return the same way you deduct Clio, Lexis, malpractice insurance, or a W-2 receptionist's salary. The per-signed-retainer success fee is also deductible. We provide a year-end invoice summary in your dashboard for your accountant. (Not tax advice — confirm with your CPA.)"
  },
  {
    question: "Does ClaireAI integrate with Clio, MyCase, Lawmatics, or Filevine — and is there an extra fee?",
    answer: "Yes to all four, and integration is included at every tier (no Zapier-tax, no $400/seat enterprise add-on like some legal CRMs charge). Intake data, conflict-check fields, and call recordings drop straight into the matter — no copy-paste. If you use a CRM not on our standard list, Enterprise includes a custom integration build."
  },
  {
    question: "What's the per-signed-retainer success fee actually covering — isn't a flat monthly enough?",
    answer: "The $25 (Starter/Pro) or $15 (Enterprise) success fee is only charged when an intake call results in a signed retainer attributed to ClaireAI — not for every call, not for consultations that don't convert. It aligns our incentives with yours: we're not just answering, we're closing. A PI firm signing 20 retainers/mo pays $500 extra; that's a rounding error against a single $15K–$50K case. Every other competitor charges you the same whether they book you cases or not."
  },
  {
    question: "How does this work for after-hours, weekends, and holidays — any surcharge?",
    answer: "24/7/365 is included at every tier. No after-hours surcharge, no holiday premium, no weekend rate (unlike services that charge extra outside 7 a.m.–5 p.m. M–F or on federal holidays). For criminal defense and PI firms where the highest-value calls come in at 2 a.m. or Saturday morning, this is usually where ClaireAI pays for itself in the first month."
  },
  {
    question: "Are calls recorded, and how do you handle two-party-consent states like California or Florida?",
    answer: "Yes, every call is recorded and stored in your dashboard for 90 days (Enterprise: configurable retention). Claire's opening greeting includes the required disclosure (\"This call may be recorded for quality and case-handling purposes\") which satisfies all-party-consent statutes in CA, FL, IL, MA, MD, PA, WA, and the other two-party states. You can disable recording per number if your jurisdiction's bar ethics opinion requires it."
  },
  {
    question: "Does ClaireAI ever give legal advice — and could that expose me to a UPL complaint?",
    answer: "No. Claire is explicitly prompted to collect facts and never to characterize them legally — she will not tell a caller whether they \"have a case,\" whether a statute of limitations has run, or what their case is worth. If a caller pushes, she says \"an attorney will review that with you\" and books the consult. This is the same UPL guardrail the ABA and NC State Bar recommend for AI client-facing tools."
  },
  {
    question: "Do I get a custom intake script for my practice area, or is it a generic template?",
    answer: "Custom by default. During onboarding (typically 3–5 business days) we build qualifying questions specific to your practice — PI firms get accident-date, injury severity, fault, insurance, SOL flag, prior counsel; criminal defense gets charge type, custody status, court date, jurisdiction; immigration gets visa category, current status, USCIS deadline; family law gets jurisdiction, parties, children, urgency. You review and approve the script before Claire goes live, and you can edit it anytime in the dashboard."
  },
  {
    question: "What if ClaireAI mishandles a call and we lose a client?",
    answer: "Every call is recorded, transcribed, and time-stamped, so you can audit any intake in seconds and our team can debug any caller-handling issue you flag. In practice, the bigger risk runs the other direction — the average PI case is worth $6.5K–$50K and roughly 35% of law-firm calls currently go unanswered, so the cost of not having a 24/7 receptionist usually dwarfs any single mishandled call."
  }
];


export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="px-6">
      <div className="w-full max-w-[1200px] mx-auto mt-40 mb-32">
        <div className="text-center mb-16">
          <h2
            className="text-[#0a0a0a] font-serif mb-6 tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem, 4vw, 56px)", lineHeight: "1.05" }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-[#0a0a0a]/60 text-lg md:text-xl">Everything you need to know about scaling your intake.</p>
        </div>

        <div className="space-y-0 w-full border-t border-[#e4e4e7]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `pricing-faq-panel-${index}`;
            const triggerId = `pricing-faq-trigger-${index}`;
            return (
              <div
                key={index}
                className="border-b border-[#e4e4e7] bg-transparent"
              >
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left py-8 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white group"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className={`font-bold text-[19px] md:text-[22px] motion-safe:transition-colors ${isOpen ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]/90 group-hover:text-[#0a0a0a]'}`}>
                      {faq.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-[#0a0a0a] ml-4 flex-shrink-0 motion-safe:transition-transform motion-safe:duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className={`grid overflow-hidden motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300 motion-safe:ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="min-h-0">
                    <div className="pb-10 pt-2 text-[#0a0a0a]/70 text-[17px] leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
