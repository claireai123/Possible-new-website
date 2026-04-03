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
    <div className="w-full max-w-[1400px] mx-auto mt-32 rounded-none border border-white/10 bg-[#0a0a0a] p-8 md:p-16 relative overflow-hidden">
      
      <div className="relative flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        
        {/* Left: Inputs */}
        <div className="w-full md:w-1/2 space-y-10">
          <div>
            <h3 className="text-4xl md:text-[48px] font-serif text-white mb-4 tracking-[-0.02em] leading-tight">
              Calculate Your Lost Revenue
            </h3>
            <p className="text-white/60 text-base md:text-lg">
              Even conservative estimates show how quickly AI intake pays for itself.
            </p>
          </div>
          <div className="space-y-8">
            {/* Slider */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-white/80">
                <label>How many calls does your firm miss per week?</label>
                <span className="text-white font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-none tracking-widest">{missedCalls}</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="50" 
                step="1"
                value={missedCalls}
                onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full h-[1px] bg-white/20 rounded-none appearance-none cursor-pointer accent-white hover:accent-white/90"
              />
            </div>

            {/* Select Dropdown */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-white/80">What is your average case value?</label>
              <div className="relative">
                <select 
                  value={caseValue}
                  onChange={(e) => setCaseValue(Number(e.target.value))}
                  className="w-full appearance-none bg-transparent border border-white/10 text-white rounded-none px-4 py-3 outline-none focus:border-white/40 transition-colors"
                  title="Average Case Value"
                >
                  <option value={5000} className="bg-[#0a0a0a] text-white">$5,000</option>
                  <option value={10000} className="bg-[#0a0a0a] text-white">$10,000</option>
                  <option value={25000} className="bg-[#0a0a0a] text-white">$25,000</option>
                  <option value={50000} className="bg-[#0a0a0a] text-white">$50,000</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white/50">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Output */}
        <div className="w-full md:w-1/2 bg-white/[0.02] rounded-none border border-white/10 p-10 md:p-14 flex flex-col justify-center text-center relative overflow-hidden">
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <p className="text-white/60 text-base mb-6">You're losing an estimated</p>
          <p className="text-5xl md:text-[64px] font-bold text-white mb-4 tracking-tight">
            ${lostRevenue.toLocaleString()}
          </p>
          <p className="text-white/60 text-base mb-12">per month in missed cases.*</p>

          <div className="pt-8 border-t border-white/10">
            <p className="text-white/80 text-base">
              ClaireAI Professional pays for itself in <br/>
              <span className="text-white font-serif italic text-3xl inline-block mt-4">
                {daysToPayoff} {daysToPayoff === 1 ? 'day' : 'days'}
              </span>
            </p>
          </div>
          <p className="text-xs text-white/40 mt-8">*Assumes a highly conservative 10% conversion rate on missed calls.</p>
        </div>

      </div>
    </div>
  );
}
