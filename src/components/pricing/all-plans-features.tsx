import React from 'react';

const features = [
  {
    title: "Secure, reliable cloud software",
    desc: "Built on top of enterprise-grade, SOC 2 compliant cloud infrastructure to guarantee the highest standards of data security and encryption.",
    icon: (
      <svg className="w-16 h-16 text-emerald-800" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: "Award-winning 24/7 support",
    desc: "Get the support you need, when you need it with unlimited support by phone, email, or live chat.",
    icon: (
      <svg className="w-14 h-14 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Worry-free onboarding",
    desc: "Bring in everyone's data and get set up in a way that works for your firm. We handle the heavy lifting.",
    icon: (
      <svg className="w-14 h-14 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  {
    title: "Seamless CRM sync",
    desc: "Every transcript and case note beamed directly into your system of record anytime, anywhere.",
    icon: (
      <svg className="w-14 h-14 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    )
  },
  {
    title: "Real-time calibrations",
    desc: "Instantly tweak Claire's exact phrasing and logic trees as your firm evolves without leaving the dashboard.",
    icon: (
      <svg className="w-16 h-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    )
  }
];

export function AllPlansFeatures() {
  return (
    <div className="w-full max-w-[1728px] mx-auto px-6 md:px-12 py-24 bg-[#fefefc]">
      <div className="mb-16 border-b border-[#0a0a0a] pb-4">
        <h2 className="text-3xl text-[#0a0a0a] font-serif tracking-tight uppercase">
          Core Infrastructure
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 w-full border-t border-l border-[#e4e4e7]">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="bg-white p-10 md:p-14 flex flex-col justify-start border-r border-b border-[#e4e4e7] hover:bg-[#fafafa] transition-colors h-full min-h-[500px]"
          >
            <h3 className="text-[#0a0a0a] font-serif font-bold text-xl md:text-2xl mb-8 leading-tight tracking-tight">
              <span className="opacity-40 text-xs block mb-3 uppercase tracking-widest font-sans">{String(i + 1).padStart(2, '0')} //</span>
              {feature.title}
            </h3>
            <p className="text-[#0a0a0a]/60 text-base md:text-lg leading-relaxed font-sans">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
