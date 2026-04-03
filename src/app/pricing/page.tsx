import React from 'react';
import Link from 'next/link';
import { FaqSection } from '@/components/pricing/faq-section';
import { AllPlansFeatures } from '@/components/pricing/all-plans-features';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#fefefc] text-[#0a0a0a] pt-32 pb-24 font-sans selection:bg-[#0a0a0a]/10">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 space-y-6">
        <h1 
          className="text-6xl md:text-7xl lg:text-[80px] font-serif text-[#0a0a0a]"
          style={{
            fontSize: "clamp(3.5rem, 6vw, 80px)",
            letterSpacing: "normal",
            fontFeatureSettings: '"liga" 0',
            lineHeight: "0.95",
          }}
        >
          Transparent pricing.<br /> Infinite ROI.
        </h1>
        <p className="text-lg md:text-xl text-[#0a0a0a]/60 max-w-2xl mx-auto leading-relaxed">
          The true cost of missing calls isn't the software you pay for, it's the high-value cases you lose to competitors. We bridge the gap.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative z-10 w-full">
        
        {/* Starter Tier */}
        <div className="rounded-none border border-[#e4e4e7] bg-white p-10 md:p-14 flex flex-col h-full hover:border-[#0a0a0a]/20 transition-colors shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-bold tracking-wide text-[#0a0a0a] uppercase mb-2">Starter</h3>
            <p className="text-[#0a0a0a]/50 text-sm h-10">
              "Never miss another call"
            </p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-bold tracking-tight text-[#0a0a0a]">$450</span>
              <span className="text-sm text-[#0a0a0a]/50 ml-2">/month</span>
            </div>
            <div className="mt-2 text-xs text-[#0a0a0a]/40 font-medium">
              +$25 / signed retainer<br/>
              +$0.65 / overage minute
            </div>
          </div>
          
          <Link href="/contact" className="w-full text-center py-3 rounded-none border border-[#e4e4e7] text-[#0a0a0a] font-medium hover:border-[#0a0a0a] hover:bg-[#fafafa] transition-all mb-8 shadow-sm">
            Get Started
          </Link>

          <div className="flex-grow">
            <p className="text-xs font-semibold text-[#0a0a0a]/60 uppercase tracking-widest mb-4">What's included</p>
            <ul className="space-y-4 text-sm text-[#0a0a0a]/80">
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>24/7 AI call answering</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Lead qualification (screening logic)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Call summaries emailed instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Up to 150 calls/month</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>1 phone number & 1 practice area</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Basic CRM integration (Clio <strong>OR</strong> MyCase)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Business hours call transfer</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Voicemail-to-text & Mobile notifications</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Professional Tier */}
        <div className="rounded-none border-2 border-[#1b4332] bg-[#fcfdfc] p-10 md:p-14 flex flex-col h-full transform md:-translate-y-4 shadow-xl relative z-20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="bg-[#1b4332] text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-none">
              Most Popular
            </span>
          </div>

          <div className="mb-8 mt-2">
            <h3 className="text-xl font-bold tracking-wide text-[#0a0a0a] uppercase mb-2">Professional</h3>
            <p className="text-[#0a0a0a]/60 text-sm h-10 italic">
              "Sign cases while they're still on the line"
            </p>
            <div className="mt-6 flex items-baseline">
              <span className="text-5xl font-bold tracking-tight text-[#0a0a0a]">$850</span>
              <span className="text-sm text-[#0a0a0a]/50 ml-2">/month</span>
            </div>
            <div className="mt-2 text-xs text-[#0a0a0a]/40 font-medium">
              +$25 / signed retainer
            </div>
          </div>
          
          <Link href="/contact" className="w-full text-center py-3 rounded-none bg-[#0a0a0a] text-white font-semibold hover:bg-black/85 transition-all mb-8 shadow-md">
            Get Professional
          </Link>

          <div className="flex-grow">
            <p className="text-xs font-semibold text-[#0a0a0a]/60 uppercase tracking-widest mb-4">Everything in Starter, plus:</p>
            <ul className="space-y-4 text-sm text-[#0a0a0a]/90">
              <li className="flex items-start gap-3">
                <HighlightCheckIcon /> <span className="font-medium text-[#0a0a0a]">Retainer delivery for e-signature on the call</span>
              </li>
              <li className="flex items-start gap-3">
                <HighlightCheckIcon /> <span className="font-medium text-[#0a0a0a]">Conflict check automation</span>
              </li>
              <li className="flex items-start gap-3">
                <HighlightCheckIcon /> <span className="font-medium text-[#0a0a0a]">Statute of limitations calculation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Up to 500 calls/month</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Up to 3 numbers & 3 practice areas</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>All CRM integrations (Clio, MyCase, FileVine, PracticePanther)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Live call monitoring (listen-in mode)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>After-hours transfers to on-call attorney</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Post-call automation pipeline</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Control Room dashboard & Weekly reports</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Enterprise Tier */}
        <div className="rounded-none border border-[#e4e4e7] bg-white p-10 md:p-14 flex flex-col h-full hover:border-[#0a0a0a]/20 transition-colors shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-bold tracking-wide text-[#0a0a0a] uppercase mb-2">Enterprise</h3>
            <p className="text-[#0a0a0a]/50 text-sm h-10">
              "Full-service AI intake department"
            </p>
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-bold tracking-tight text-[#0a0a0a]">$1,800</span>
              <span className="text-sm text-[#0a0a0a]/50 ml-2">/month</span>
            </div>
            <div className="mt-2 text-xs text-[#0a0a0a]/40 font-medium">
              +$15 / signed retainer
            </div>
          </div>
          
          <Link href="/contact" className="w-full text-center py-3 rounded-none border border-[#e4e4e7] text-[#0a0a0a] font-medium hover:border-[#0a0a0a] hover:bg-[#fafafa] transition-all mb-8 shadow-sm">
            Contact Sales
          </Link>

          <div className="flex-grow">
            <p className="text-xs font-semibold text-[#0a0a0a]/60 uppercase tracking-widest mb-4">Everything in Pro, plus:</p>
            <ul className="space-y-4 text-sm text-[#0a0a0a]/80">
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Up to 800 calls/month</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span className="font-medium text-[#0a0a0a]">Live call takeover mode</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Custom AI voice cloning (Firm's brand)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Custom integrations (LawPay, Calendly, Webhooks)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Multi-location geo-routing</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Live case notes</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckIcon /> <span>Monthly strategy calls</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* All Plans Tombstone Cards */}
      <AllPlansFeatures />

      {/* FAQ Section */}
      <div className="px-6">
        <FaqSection />
      </div>

    </div>
  );
}

// Icon Helpers
function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#0a0a0a]/40 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function HighlightCheckIcon() {
  return (
    <svg className="w-5 h-5 text-[#1b4332] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}
