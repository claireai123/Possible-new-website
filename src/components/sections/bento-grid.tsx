"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MockCRM } from "./mock-crm";

const blurFade = {
  hidden: { y: 8, opacity: 0, filter: "blur(6px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)" },
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

const capabilities = [
  { name: "Intake", desc: "Autonomous client capture.", color: "bg-[#c9c3b6]/40" },
  { name: "Qualify", desc: "Every detail confirmed.", color: "bg-[#c4c6d1]/40" },
  { name: "Book", desc: "Consultations, hands-free.", color: "bg-[#bec8bc]/40" },
  { name: "Retainer", desc: "Sent before morning.", color: "bg-[#d4cec2]/40" },
];

export function BentoGrid() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          Section 1: Platform + capabilities
          ═══════════════════════════════════════════════════════ */}
      <section className="flex min-h-screen items-center border-t border-[#e4e4e7] bg-[#f5f4f1]">
        <div className="mx-auto w-full max-w-[90vw] py-[8vh]">
          <FadeIn>
            <div className="grid items-center gap-[4vw] lg:grid-cols-[1.3fr_1fr]">
              <div className="space-y-[1.2vh]">
                {capabilities.map((cap, i) => (
                  <FadeIn key={cap.name} delay={0.05 * i}>
                    <div className={`flex items-center justify-between rounded-2xl ${cap.color} px-[3vw] py-[2.5vh]`}>
                      <span
                        className="font-serif text-[clamp(1.8rem,3.5vw,2.8rem)] text-[#0a0a0a]/80"
                        style={{ letterSpacing: "-0.03em" }}
                      >
                        {cap.name}
                      </span>
                      <span className="text-[16px] text-[#0a0a0a]/35">{cap.desc}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]/25">
                  The Platform
                </p>
                <h2
                  className="mt-[1.5vh] font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-normal text-[#0a0a0a]"
                  style={{ letterSpacing: "-0.04em", lineHeight: "1.02" }}
                >
                  One receptionist.<br />
                  <span className="font-semibold">Every capability.</span>
                </h2>
                <p className="mt-[2vh] max-w-lg text-[17px] leading-relaxed text-[#0a0a0a]/40">
                  ClaireAI works where your firm works. From first ring to signed retainer,
                  fully autonomous.
                </p>
                <Link
                  href="/product"
                  className="mt-[2.5vh] inline-flex items-center gap-2 text-[15px] font-medium text-[#0a0a0a] hover:text-[#c4913c]"
                >
                  Explore platform
                  <span className="text-[18px]">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          Section 2: Integrations — Interactive CRM
          ═══════════════════════════════════════════════════════ */}
      <section className="flex min-h-screen items-center bg-white">
        <div className="mx-auto w-full max-w-[90vw] py-[8vh]">
          <FadeIn>
            <div className="grid items-center gap-[4vw] lg:grid-cols-[1fr_1.8fr]">
              <div className="order-2 flex flex-col justify-center lg:order-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a]/25">
                  Integrations
                </p>
                <h2
                  className="mt-[1.5vh] font-serif text-[clamp(3rem,5.5vw,5.5rem)] font-normal text-[#0a0a0a]"
                  style={{ letterSpacing: "-0.04em", lineHeight: "1.02" }}
                >
                  Your CRM.<br />
                  <span className="font-semibold">Already connected.</span>
                </h2>
                <p className="mt-[2vh] max-w-lg text-[17px] leading-relaxed text-[#0a0a0a]/40">
                  New contacts, matters, and calendar entries created automatically.
                  No copy-paste. No data entry.
                </p>
                <Link
                  href="/integrations"
                  className="mt-[2.5vh] inline-flex items-center gap-2 text-[15px] font-medium text-[#0a0a0a] hover:text-[#c4913c]"
                >
                  View integrations
                  <span className="text-[18px]">→</span>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <div className="overflow-hidden rounded-[28px] bg-[#e8e6e1] p-[2.5vw]">
                  <MockCRM />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </>
  );
}
