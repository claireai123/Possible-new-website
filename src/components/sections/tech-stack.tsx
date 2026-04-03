"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const blurFade = {
  hidden: { y: 12, opacity: 0, filter: "blur(4px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)" },
};

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={blurFade}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stackData = [
  {
    title: "SOC 2 Type II",
    desc: "Every call, every transcript, every data point runs through SOC 2 Type II audited infrastructure — verified annually by independent third-party assessors.",
    icon: "/soc2-badge.png",
  },
  {
    title: "ISO 27001",
    desc: "Our cloud environments carry ISO 27001 certification, the global benchmark for information security management trusted by Fortune 500 enterprises.",
    icon: "/iso27001-badge.png",
  },
  {
    title: "CCPA & GDPR",
    desc: "Whether your clients are in California or across the Atlantic, their data rights are fully protected under both CCPA and GDPR frameworks.",
    icon: "/gdpr-ccpa-badge.png",
  },
  {
    title: "AES-256 Encryption",
    desc: "Voice recordings, caller data, and legal transcripts are encrypted end-to-end — in transit and at rest. Nothing leaves our environment unprotected.",
    icon: "/aes256-badge.png",
  },
];

export function TechStack() {
  return (
    <section className="bg-white px-6 py-[120px] text-[#0a0a0a]">
      <div className="mx-auto max-w-[1680px]">
        {/* Header Block */}
        <div className="mb-24">
          <FadeIn>
            <span className="mb-6 block text-[10px] font-bold tracking-[0.2em] uppercase text-[#0a0a0a]/40">
              Certified & Compliant
            </span>
            <h2 className="max-w-[1200px] font-serif text-[#0a0a0a] tracking-[-0.03em] leading-[1.1] text-[clamp(2rem,4vw,48px)]">
              Your clients trust you with their most sensitive matters. We built ClaireAI to honor that trust at every layer.
            </h2>
          </FadeIn>
        </div>

        {/* 4-Column Grid Block */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 border-t border-[#0a0a0a]/10 border-b lg:grid-cols-4">
            {stackData.map((item, index) => (
              <div
                key={item.title}
                className={`flex flex-col p-8 md:p-10 ${
                  index !== stackData.length - 1 ? "lg:border-r border-[#0a0a0a]/10 border-b lg:border-b-0" : ""
                }`}
              >
                <h3 className="mb-4 text-[16px] font-medium text-[#0a0a0a]">
                  {item.title}
                </h3>
                <p className="text-[14px] text-[#0a0a0a]/60">
                  {item.desc}
                </p>
                
                {/* Certification badge */}
                <div className="mt-auto pt-16">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#0a0a0a]/70">
                    {index === 0 && (
                      /* SOC 2 — Shield with checkmark */
                      <g>
                        <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M17 24l5 5 9-9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </g>
                    )}
                    {index === 1 && (
                      /* ISO 27001 — Circle with seal marks */
                      <g>
                        <circle cx="24" cy="24" r="19" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1" fill="none"/>
                        <path d="M18 24h12M24 18v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
                          <line key={angle} x1="24" y1="3" x2="24" y2="6" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${angle} 24 24)`}/>
                        ))}
                      </g>
                    )}
                    {index === 2 && (
                      /* GDPR/CCPA — Shield with EU-style stars */
                      <g>
                        <path d="M24 4L6 12v12c0 11.1 7.7 21.5 18 24 10.3-2.5 18-12.9 18-24V12L24 4z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        {[0, 60, 120, 180, 240, 300].map(angle => {
                          const r = 8;
                          const cx = 24 + r * Math.cos((angle - 90) * Math.PI / 180);
                          const cy = 24 + r * Math.sin((angle - 90) * Math.PI / 180);
                          return <circle key={angle} cx={cx} cy={cy} r="1.5" fill="currentColor"/>;
                        })}
                      </g>
                    )}
                    {index === 3 && (
                      /* AES-256 — Padlock */
                      <g>
                        <rect x="12" y="22" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                        <path d="M16 22v-6a8 8 0 0116 0v6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                        <circle cx="24" cy="31" r="2.5" fill="currentColor"/>
                        <line x1="24" y1="33.5" x2="24" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </g>
                    )}
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
