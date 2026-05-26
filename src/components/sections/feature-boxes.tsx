"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const blurFade = {
  hidden: { y: 8, opacity: 0, filter: "blur(6px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)" },
};

/* Fine, even grain — dark noise with moderate alpha so it multiplies as
   paper-like texture over light pastels. */
const grainUrl =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E";

type Box = {
  title: string;
  desc: string;
  label: string;
  image: string;
  mesh: string;
  labelColor: string;
};

/* Mesh gradients — each box has 3 soft blobs that blend into each other.
   Palette = warm Claire: cream / amber / blush / terracotta. */
const boxes: Box[] = [
  {
    title: "Claire captures evidence",
    desc: "Every incident detail, police report, injury, and witness account — captured on the first ring, in English or Spanish, 24/7/365.",
    label: "01 / Capture",
    image: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1776978378/ChatGPT_Image_Apr_23_2026_at_05_05_55_PM.jpg",
    // Buttery cream → soft gold (fallback behind image)
    mesh: `
      radial-gradient(at 22% 18%, #fbf2dd 0%, transparent 55%),
      radial-gradient(at 78% 28%, #f4dfb0 0%, transparent 50%),
      radial-gradient(at 55% 82%, #e6c88c 0%, transparent 65%),
      #f4e6c4
    `,
    labelColor: "rgba(70, 50, 20, 0.55)",
  },
  {
    title: "Claire qualifies",
    desc: "Police report? Not at fault? Medical treatment? Every qualifying detail confirmed.",
    label: "02 / Qualify",
    image: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1776977690/ChatGPT_Image_Apr_23_2026_at_04_54_35_PM.jpg",
    // Peach → muted amber (fallback behind image)
    mesh: `
      radial-gradient(at 28% 22%, #f7dfc0 0%, transparent 55%),
      radial-gradient(at 82% 30%, #e9c29a 0%, transparent 55%),
      radial-gradient(at 45% 85%, #d1a370 0%, transparent 60%),
      #ecc9a4
    `,
    labelColor: "rgba(85, 55, 25, 0.6)",
  },
  {
    title: "Claire sends retainers",
    desc: "Statute checked. Consultation booked. Retainer emailed. Case signed before morning.",
    label: "03 / Close",
    image: "https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1776977565/ChatGPT_Image_Apr_23_2026_at_04_52_06_PM.jpg",
    // Blush → warm terracotta (fallback behind image)
    mesh: `
      radial-gradient(at 30% 20%, #f2d0bc 0%, transparent 55%),
      radial-gradient(at 80% 55%, #d99a7a 0%, transparent 55%),
      radial-gradient(at 40% 90%, #bd7a58 0%, transparent 60%),
      #e3b49a
    `,
    labelColor: "rgba(80, 35, 15, 0.65)",
  },
];

function FeatureBox({ box, i }: { box: Box; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={blurFade}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <div
        className="relative overflow-hidden transition-transform duration-500 group-hover:scale-[0.98]"
        style={{
          aspectRatio: "3/4",
          background: box.mesh,
        }}
      >
        {/* Primary grain — multiply keeps it dark & fine on light pastels */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${grainUrl}")`,
            backgroundSize: "240px 240px",
            backgroundRepeat: "repeat",
            mixBlendMode: "multiply",
            opacity: 0.18,
          }}
        />
        {/* Secondary soft-light pass for tonal richness */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${grainUrl}")`,
            backgroundSize: "120px 120px",
            backgroundRepeat: "repeat",
            mixBlendMode: "soft-light",
            opacity: 0.4,
          }}
        />
        {/* Soft corner vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(at 50% 35%, transparent 0%, rgba(80,45,15,0.12) 100%)",
          }}
        />
        {box.image && (
          <>
            <img
              src={box.image}
              alt={box.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)",
              }}
            />
          </>
        )}
        <div className="absolute inset-x-6 bottom-6">
          <span
            className="text-[11px] font-medium uppercase tracking-[0.22em]"
            style={{ color: box.image ? "rgba(255,255,255,0.9)" : box.labelColor }}
          >
            {box.label}
          </span>
        </div>
      </div>
      <h3 className="mt-6 text-[15px] text-[#0a0a0a]" style={{ fontWeight: 450 }}>
        {box.title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.5] text-[#0a0a0a]/45">
        {box.desc}
      </p>
    </motion.div>
  );
}

export function FeatureBoxes() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {boxes.map((box, i) => (
        <FeatureBox key={box.title} box={box} i={i} />
      ))}
    </div>
  );
}
