"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const blurFade = {
  hidden: { y: 8, opacity: 0, filter: "blur(6px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)" },
};

const boxes = [
  {
    title: "Claire answers",
    desc: "First ring. Every time. English or Spanish, 24/7/365.",
  },
  {
    title: "Claire qualifies",
    desc: "Police report? Not at fault? Medical treatment? Every qualifying detail confirmed.",
  },
  {
    title: "Claire sends retainers",
    desc: "Statute checked. Consultation booked. Retainer emailed. Case signed before morning.",
  },
];

export function FeatureBoxes() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {boxes.map((box, i) => {
        const ref = useRef<HTMLDivElement>(null);
        const isInView = useInView(ref, { once: true, margin: "-80px" });
        return (
          <motion.div
            key={box.title}
            ref={ref}
            variants={blurFade}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
            className="group cursor-pointer"
          >
            {/* Tall placeholder image area — like Legora */}
            <div
              className="overflow-hidden rounded-xl bg-[#e8e5de] transition-transform duration-500 group-hover:scale-[0.98]"
              style={{ aspectRatio: "3/4" }}
            />
            {/* Title + desc below the card */}
            <h3 className="mt-6 text-[15px] text-[#0a0a0a]" style={{ fontWeight: 450 }}>
              {box.title}
            </h3>
            <p className="mt-2 text-[15px] leading-[1.5] text-[#0a0a0a]/45">
              {box.desc}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
