"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

const items = [
  {
    area: "Personal Injury",
    desc: "Capture every lead at first ring — qualify police reports, treatment status, and fault in seconds.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/v1774646534/alex-robertson-RPFvgzbPWxA-unsplash_zkn0wy.jpg",
  },
  {
    area: "Criminal Defense",
    desc: "Route urgent felony and DUI calls 24/7 with instant attorney escalation, day or night.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/v1774652618/kateryna-hliznitsova-8a1b7Ldia_w-unsplash.jpg",
  },
  {
    area: "Family Law",
    desc: "Sensitive intake in English or Spanish — custody, divorce, and protective orders handled with care.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/v1774646534/dane-deaner-_-KLkj7on_c-unsplash_jgkqae.jpg",
  },
  {
    area: "Immigration",
    desc: "10+ languages supported. Visa deadlines tracked. Consultations booked across every time zone.",
    img: "https://res.cloudinary.com/dwzsqumf6/image/upload/v1774646535/jean-philippe-delberghe-zZvYBYY70uo-unsplash_x0davy.jpg",
  },
];

export function PracticeAreas() {
  return (
    <section className="bg-white px-6 py-[120px]">
      <div className="mx-auto w-full max-w-[1680px]">
        <FadeIn>
          <div className="grid items-end gap-[80px] lg:grid-cols-[1fr_2fr]">
            <p className="max-w-xs text-[13px] text-[#0a0a0a]/40">
              Every practice area has different intake needs. Claire adapts her questions, qualifications, and urgency routing to match yours.
            </p>
            <h2 className="font-serif text-[clamp(2.5rem,7vw,88px)] text-[#0a0a0a] tracking-[-0.03em] leading-[0.95] [font-feature-settings:'liga'_0]">
              Built for every<br />
              practice area.
            </h2>
          </div>

          <div className="mt-10 border-t border-[#0a0a0a]/10" />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => (
              <FadeIn key={item.area} delay={0.08 * i}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden rounded-none transition-transform duration-500 group-hover:scale-[0.98]">
                    <img
                      src={item.img}
                      alt={item.area}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mt-5 text-[15px] font-medium text-[#0a0a0a]">
                    {item.area}
                  </h3>
                  <p className="mt-2 text-[15px] max-w-[400px] text-[#0a0a0a]/50">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
