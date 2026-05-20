"use client";

import { useEffect, useRef, useState } from "react";
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
 *
 * Visibility safety net: when IntersectionObserver doesn't fire (full-page
 * screenshot harnesses, no-JS preview, scroll-restored deep links, prerender
 * + cached above-the-fold paint) the number must still appear. We mount-flip
 * to visible after 1s no matter what — animation still plays on real scroll
 * because inView wins the race in practice, but the fallback guarantees the
 * value is never permanently invisible.
 */
export function MetricTicker({ value, delay = 0 }: MetricTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0, margin: "-80px" });
  const [forcedVisible, setForcedVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setForcedVisible(true), 1000);
    return () => window.clearTimeout(t);
  }, []);

  const visible = inView || forcedVisible;

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
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
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
