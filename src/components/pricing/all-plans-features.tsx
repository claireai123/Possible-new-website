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
    title: "Trained on proven intake playbooks",
    desc: "Claire's qualifying flows come from thousands of reviewed legal intake scripts and attorney playbooks — not from your clients' calls.",
    icon: (
      <svg className="w-14 h-14 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.25c-1.857-1.1-4.64-1.75-7-1.75v13c2.36 0 5.143.65 7 1.75m0-13c1.857-1.1 4.64-1.75 7-1.75v13c-2.36 0-5.143.65-7 1.75m0-13v13" />
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
    <div className="w-full max-w-[1728px] mx-auto px-6 md:px-12 py-24 bg-[#ffffff]">
      <div className="mb-16 border-b border-[#0a0a0a]/15 pb-6">
        <h2
          className="font-serif text-[#0a0a0a]"
          style={{
            fontSize: "clamp(2.25rem, 4vw, 56px)",
            lineHeight: "1",
            letterSpacing: "-0.01em",
            fontWeight: 400,
            fontVariationSettings: '"opsz" 144',
            fontFeatureSettings: '"liga" 0',
          }}
        >
          Core Infrastructure
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 w-full border-t border-l border-[#e4e4e7]">
        {features.map((feature, i) => (
          <div 
            key={i} 
            className="bg-white p-10 md:p-14 flex flex-col justify-start border-r border-b border-[#e4e4e7] hover:bg-[#fafafa] transition-colors h-full min-h-[500px]"
          >
            <h3
              className="text-[#0a0a0a] mb-8 leading-[1.25]"
              style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}
            >
              <span className="opacity-40 text-[10px] block mb-3 uppercase tracking-[0.14em] font-medium">
                {String(i + 1).padStart(2, '0')} //
              </span>
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
