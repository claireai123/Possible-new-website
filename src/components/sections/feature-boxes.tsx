"use client";

import { motion, useMotionValue, useMotionTemplate, useInView } from "framer-motion";
import { useRef, MouseEvent } from "react";

const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const blurFade = {
  hidden: { y: 8, opacity: 0, filter: "blur(6px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)" },
};

const boxes = [
  {
    gradient: "linear-gradient(160deg, #c9c3b6 0%, #d5cfc3 50%, #c0bab0 100%)",
    title: "Claire answers",
    desc: "First ring. Every time. English or Spanish, 24/7/365.",
  },
  {
    gradient: "linear-gradient(160deg, #c4c6d1 0%, #d0d2dc 50%, #bfc1cc 100%)",
    title: "Claire qualifies",
    desc: "Police report? Not at fault? Medical treatment? Every qualifying detail confirmed.",
  },
  {
    gradient: "linear-gradient(160deg, #bec8bc 0%, #cdd6ca 50%, #b9c3b7 100%)",
    title: "Claire sends retainers",
    desc: "Statute checked. Consultation booked. Retainer emailed. Case signed before morning.",
  },
];

export function FeatureBoxes() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {boxes.map((box, i) => (
        <Box key={box.title} {...box} delay={i * 0.1} />
      ))}
    </div>
  );
}

function Box({
  gradient,
  title,
  desc,
  delay,
}: {
  gradient: string;
  title: string;
  desc: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  function handleMouse(e: MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

  return (
    <motion.div
      ref={ref}
      variants={blurFade}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: 0.1 + delay, duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="group relative transform-gpu cursor-default"
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onMouseMove={handleMouse}
        onMouseLeave={() => { mouseX.set(-200); mouseY.set(-200); }}
      >
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-[20px]"
          style={{ background: gradient }}
        >
          {/* Noise grain */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[20px] opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: noiseSvg }}
          />
          {/* Mouse spotlight */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
          {/* Hover overlay */}
          <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-black/0 transition-colors duration-300 group-hover:bg-black/[.02]" />
          {/* Placeholder — replace with wireframe illustrations or video */}
        </div>
      </motion.div>
      <h3 className="mt-5 text-[20px] font-semibold text-[#0a0a0a]" style={{ letterSpacing: "-0.02em" }}>
        {title}
      </h3>
      <p className="mt-1.5 text-[14px] leading-relaxed text-[#0a0a0a]/45">{desc}</p>
    </motion.div>
  );
}
