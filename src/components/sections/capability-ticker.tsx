"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const items = [
  "Intake Reports",
  "Police Report Checks",
  "Statute of Limitations",
  "Consultation Booking",
  "Retainer Delivery",
  "Bilingual Intake",
  "Lead Qualification",
  "CRM Sync",
];

const LINE_HEIGHT = 56;
const VISIBLE = 5;
const CENTER = 2;

export function CapabilityTicker() {
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, [isInView]);

  // Duplicate items enough to never run out
  const total = items.length;
  const rows = Array.from({ length: VISIBLE + 2 }, (_, i) => {
    const idx = ((tick + i - 1) % total + total) % total;
    return items[idx];
  });

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[24px] bg-[#f5f5f3]"
      style={{ height: LINE_HEIGHT * VISIBLE }}
    >
      <div
        className="transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{ transform: `translateY(-${LINE_HEIGHT}px)` }}
        key={tick}
      >
        {rows.map((text, i) => {
          const distFromCenter = Math.abs(i - 1 - CENTER);
          const isCenter = i - 1 === CENTER;
          const opacity = isCenter ? 1 : Math.max(0.1, 0.35 - distFromCenter * 0.1);

          return (
            <div
              key={`${tick}-${i}`}
              className="flex items-center px-10"
              style={{ height: LINE_HEIGHT }}
            >
              <span
                className="font-serif transition-opacity duration-500"
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  letterSpacing: "-0.035em",
                  color: "#0a0a0a",
                  opacity,
                  fontWeight: isCenter ? 500 : 400,
                }}
              >
                {text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
