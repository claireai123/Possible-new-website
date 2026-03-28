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

export function SocialProof() {
  return (
    <section className="bg-[#0a0a0a] px-6 py-[120px]">
      <div className="mx-auto max-w-[1728px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* ── Left column: stat ── */}
          <FadeIn>
            <div>
              <span
                className="block font-serif text-white"
                style={{
                  fontSize: "clamp(5rem, 12vw, 140px)",
                  letterSpacing: "-0.03em",
                  lineHeight: "0.9",
                }}
              >
                312
              </span>
              <p
                className="mt-6 max-w-md text-[16px] leading-[1.5] text-white/40"
              >
                consultations captured in a single month that would have been
                missed.
              </p>
            </div>
          </FadeIn>

          {/* ── Right column: testimonial ── */}
          <FadeIn delay={0.15}>
            <div className="flex h-full flex-col justify-center">
              <blockquote>
                <p className="text-[18px] leading-[1.6] text-white/70 lg:text-[20px]">
                  &ldquo;ClaireAI captured 312 consultations we would have
                  missed. $1.2 million in new case value in a single month. The
                  ROI was obvious within the first week.&rdquo;
                </p>
                <footer className="mt-8">
                  <span
                    className="text-[13px] tracking-wide text-white/30"
                    style={{ letterSpacing: "0.05em" }}
                  >
                    &mdash; Managing Partner, Top 50 PI Firm
                  </span>
                </footer>
              </blockquote>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
