"use client";

import React, { useState } from 'react';

const faqs = [
  {
    question: "What happens if I go over my call limit?",
    answer: "We'll never cut off your calls. If you exceed your monthly plan limit, additional call volume is simply billed at $0.65 per minute. If you consistently exceed your limit, we'll reach out to discuss upgrading to a tier that fits your volume."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Given the complexity of setting up custom AI, CRM integrations, and conflict-checking parameters, we don't offer a self-serve free trial. However, all plans come with a performance guarantee."
  },
  {
    question: "Is ClaireAI fully bilingual?",
    answer: "Yes, ClaireAI natively speaks English and Spanish, and can switch between languages mid-conversation based on the caller's preference."
  },
  {
    question: "How long does onboarding take?",
    answer: "Most firms are up and running within 3-5 business days. We handle the CRM integration, phone tree routing, and AI prompting on our end."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="w-full max-w-[1200px] mx-auto mt-40 mb-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-[56px] text-[#0a0a0a] font-serif mb-6 tracking-[-0.02em]">
          Frequently Asked Questions
        </h2>
        <p className="text-[#0a0a0a]/60 text-lg md:text-xl">Everything you need to know about scaling your intake.</p>
      </div>

      <div className="space-y-0 w-full border-t border-[#e4e4e7]">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border-b border-[#e4e4e7] bg-transparent"
            >
              <button
                className="w-full text-left py-8 flex justify-between items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 group"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className={`font-bold text-[19px] md:text-[22px] transition-colors ${isOpen ? 'text-[#0a0a0a]' : 'text-[#0a0a0a]/90 group-hover:text-[#0a0a0a]'}`}>
                  {faq.question}
                </span>
                <span className={`text-[#0a0a0a] ml-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pb-10 pt-2 pr-8 text-[#0a0a0a]/70 text-[17px] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
