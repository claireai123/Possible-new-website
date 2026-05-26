"use client";

import { useState } from "react";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-0 w-full border-t border-[#e4e4e7]">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const triggerId = `faq-trigger-${index}`;
        return (
          <div key={index} className="border-b border-[#e4e4e7] bg-transparent">
            <h3 className="m-0">
              <button
                type="button"
                id={triggerId}
                className="w-full text-left py-8 flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/40 focus-visible:ring-offset-2 group"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span
                  className={`font-bold text-[19px] md:text-[22px] motion-safe:transition-colors ${
                    isOpen ? "text-[#0a0a0a]" : "text-[#0a0a0a]/90 group-hover:text-[#0a0a0a]"
                  }`}
                >
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`text-[#0a0a0a] ml-4 flex-shrink-0 motion-safe:transition-transform motion-safe:duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
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
