"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const blurFade = {
  hidden: { y: 8, opacity: 0, filter: "blur(6px)" },
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
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const grainyGreen: React.CSSProperties = {
  backgroundColor: "#ffffff",
};

export function SocialProof() {
  return (
    <section style={grainyGreen} className="px-6 py-[120px]">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
          {/* ── Left: editorial quote + attribution ── */}
          <FadeIn>
            <div className="flex h-full flex-col justify-start">
              <span
                aria-hidden
                className="font-serif text-[#0a0a0a]/80"
                style={{ fontSize: 48, lineHeight: 0.6, letterSpacing: "-0.02em" }}
              >
                &rdquo;
              </span>
              <blockquote>
                <p
                  className="font-serif text-[#0a0a0a]"
                  style={{
                    fontSize: "clamp(1.75rem, 2.4vw, 2.5rem)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.015em",
                    fontWeight: 400,
                    marginTop: 20,
                  }}
                >
                  ClaireAI captured 312 consultations we would have missed. $1.2
                  million in new case value in a single month. The ROI was
                  obvious within the first week.
                </p>
                <footer className="mt-10">
                  <p className="text-[15px] font-medium text-[#0a0a0a]">
                    Managing Partner
                  </p>
                  <p className="mt-1 text-[14px] text-[#0a0a0a]/55">
                    Top 50 Personal Injury Firm
                  </p>
                </footer>
              </blockquote>
            </div>
          </FadeIn>

          {/* ── Right: video / poster with play button ── */}
          <FadeIn delay={0.15}>
            <div>
              <button
                type="button"
                aria-label="Play testimonial video"
                className="group relative block w-full overflow-hidden rounded-[6px]"
                style={{
                  aspectRatio: "16 / 10",
                  backgroundColor: "#1a1f1c",
                  backgroundImage:
                    "linear-gradient(135deg, #2a332d 0%, #1a1f1c 55%, #0e120f 100%)",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {/* play button */}
                <span
                  className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-white/95 backdrop-blur transition-transform duration-300 ease-out group-hover:scale-105"
                  style={{
                    width: 72,
                    height: 72,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <svg
                    width="20"
                    height="22"
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19 11L0.999999 21.3923L1 0.607696L19 11Z" fill="#0a0a0a" />
                  </svg>
                </span>
              </button>

              <p
                className="mt-6 max-w-[640px] text-[15px] leading-[1.55] text-[#0a0a0a]/70"
              >
                Firms that deploy ClaireAI stop leaking after-hours leads within
                the first week — converting missed calls into booked
                consultations and signed cases.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
