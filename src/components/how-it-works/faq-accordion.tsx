"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-0 w-full border-t border-[#e4e4e7]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-[#e4e4e7] bg-transparent">
            <button
              className="w-full text-left py-8 flex justify-between items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#0a0a0a]/20 group"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span
                className={`font-bold text-[19px] md:text-[22px] transition-colors ${
                  isOpen ? "text-[#0a0a0a]" : "text-[#0a0a0a]/90 group-hover:text-[#0a0a0a]"
                }`}
              >
                {faq.question}
              </span>
              <span
                className={`text-[#0a0a0a] ml-4 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>

            <div
              className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="min-h-0">
                <div className="pb-10 pt-2 pr-8 text-[#0a0a0a]/70 text-[17px] leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
