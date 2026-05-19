"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type MetricTickerProps = {
  value: string;
  /** Stagger delay before the entrance animation starts. Default 0. */
  delay?: number;
};

/**
 * Single fade-in entrance — no count-up, no per-frame text or transform
 * updates. The final value is painted once when the section scrolls into
 * view. This is the smoothest possible animation: one transition, GPU
 * compositor only, zero CPU work during the motion.
 */
export function MetricTicker({ value, delay = 0 }: MetricTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.span
      ref={ref}
      className="inline-block whitespace-nowrap"
      style={{
        willChange: "transform, opacity",
        transform: "translateZ(0)",
        fontVariantNumeric: "tabular-nums",
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {value}
    </motion.span>
  );
}
