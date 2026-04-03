"use client";

import React, { useState } from 'react';

export function RoiCalculator() {
  const [missedCalls, setMissedCalls] = useState(15);
  const [caseValue, setCaseValue] = useState(10000);

  // Math Setup
  const WEEKS_PER_MONTH = 4;
  const CONVERSION_RATE = 0.10; // Assume 10% of missed calls would sign
  const PROFESSIONAL_TIER_COST = 850;

  const totalMissedMonthly = missedCalls * WEEKS_PER_MONTH;
  const lostCases = totalMissedMonthly * CONVERSION_RATE;
  const lostRevenue = lostCases * caseValue;

  const daysToPayoff = Math.max(1, Math.round((PROFESSIONAL_TIER_COST / lostRevenue) * 30));

  return (
    <div className="w-full max-w-[1400px] mx-auto mt-32 rounded-3xl border border-[#e4e4e7] bg-white p-8 md:p-16 shadow-sm relative overflow-hidden">
      
      <div className="relative flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        
        {/* Left: Inputs */}
        <div className="w-full md:w-1/2 space-y-10">
          <div>
            <h3 className="text-4xl md:text-[48px] font-serif text-[#0a0a0a] mb-4 tracking-[-0.02em] leading-tight">
              Calculate Your Lost Revenue
            </h3>
            <p className="text-[#0a0a0a]/60 text-base md:text-lg">
              Even conservative estimates show how quickly AI intake pays for itself.
            </p>
          </div>
          <div className="space-y-8">
            {/* Slider */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-[#0a0a0a]/80">
                <label>How many calls does your firm miss per week?</label>
                <span className="text-[#0a0a0a] font-bold bg-[#f4f4f5] border border-[#e4e4e7] px-3 py-1 rounded-full">{missedCalls}</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="1"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full h-2 bg-[#e4e4e7] rounded-lg appearance-none cursor-pointer accent-[#1b4332]"
              />
            </div>

            {/* Select Dropdown */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#0a0a0a]/80">What is your average case value?</label>
              <div className="relative">
                <select 
                  value={caseValue}
                  onChange={(e) => setCaseValue(Number(e.target.value))}
                  className="w-full appearance-none bg-white border border-[#e4e4e7] text-[#0a0a0a] rounded-lg px-4 py-3 outline-none focus:border-[#0a0a0a]/40 transition-colors shadow-sm"
                  title="Average Case Value"
                >
                  <option value={5000}>$5,000</option>
                  <option value={10000}>$10,000</option>
                  <option value={25000}>$25,000</option>
                  <option value={50000}>$50,000</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#0a0a0a]/50">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="w-full md:w-1/2 bg-[#fefefc] rounded-2xl border border-[#e4e4e7] p-10 md:p-14 flex flex-col justify-center text-center relative overflow-hidden shadow-sm">
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1b4332]/20 to-transparent"></div>
          
          <p className="text-[#0a0a0a]/60 text-base mb-6">You're losing an estimated</p>
          <p className="text-5xl md:text-[64px] font-bold text-[#0a0a0a] mb-4 tracking-tight">
            ${lostRevenue.toLocaleString()}
          </p>
          <p className="text-[#0a0a0a]/60 text-base mb-10">per month in missed cases.*</p>

          <div className="bg-white border border-[#e4e4e7] rounded-xl p-6 shadow-sm">
            <p className="text-[#0a0a0a]/80 text-base">
              ClaireAI Professional pays for itself in <br/>
              <span className="text-[#1b4332] font-bold text-2xl inline-block mt-3">
                {daysToPayoff} {daysToPayoff === 1 ? 'day' : 'days'}
              </span>
            </p>
          </div>
          <p className="text-xs text-[#0a0a0a]/40 mt-8">*Assumes a highly conservative 10% conversion rate on missed calls.</p>
        </div>

      </div>
    </div>
  );
}
