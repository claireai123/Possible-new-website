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

type ChipTone = "success" | "urgent" | "info" | "warn";
type RowItem = {
  chip: { tone: ChipTone; label: string };
  title: string;
  checks: { done: boolean; label: string; accent?: "green" | "red" | "neutral" }[];
};
type Row = {
  area: string;
  headline: string;
  body: string;
  stats: { value: string; label: string }[];
  card: RowItem;
  reverse?: boolean;
};

const chipStyles: Record<ChipTone, { bg: string; fg: string }> = {
  success: { bg: "#e6f0ea", fg: "#1f5132" },
  urgent: { bg: "#fde7e7", fg: "#8a1a1a" },
  info: { bg: "#e7ecfb", fg: "#2a3c8f" },
  warn: { bg: "#fdf2dd", fg: "#7a5310" },
};

const rows: Row[] = [
  {
    area: "Personal Injury",
    headline: "Intake that converts before they hang up.",
    body:
      "Claire answers every MVA, slip-and-fall, and premises call on the first ring — qualifying police reports, liability, injuries, and treatment status in seconds. Strong cases are routed to your intake team with a ranked summary before the caller has time to dial the next firm on Google.",
    stats: [
      { value: "A–D", label: "Lead grade auto-assigned" },
      { value: "42%", label: "Qualified → signed" },
    ],
    card: {
      chip: { tone: "success", label: "LEAD SCORE · A" },
      title: "New MVA Lead",
      checks: [
        { done: true, label: "Police report obtained", accent: "green" },
        { done: true, label: "Clear liability", accent: "green" },
        { done: true, label: "ER treatment within 48h", accent: "green" },
        { done: false, label: "Coverage uncertain", accent: "red" },
      ],
    },
  },
  {
    area: "Criminal Defense",
    headline: "Urgent calls, answered at 3 a.m.",
    body:
      "When an arrest happens, minutes matter. Claire captures jurisdiction, charges, bail status, and arraignment window — then pages the on-call attorney inside 60 seconds, day or night. No more missed retainers because the phone rolled to voicemail at 2 a.m.",
    stats: [
      { value: "3:14 a.m.", label: "Median arrest call" },
      { value: "14 min", label: "Retainer to client" },
    ],
    card: {
      chip: { tone: "urgent", label: "URGENT · DUI ARREST" },
      title: "New Matter: In-Custody",
      checks: [
        { done: true, label: "Jurisdiction & booking # captured", accent: "green" },
        { done: true, label: "Charges identified", accent: "green" },
        { done: true, label: "On-call attorney paged", accent: "green" },
        { done: false, label: "Bail hearing ETA", accent: "neutral" },
      ],
    },
    reverse: true,
  },
  {
    area: "Family Law",
    headline: "Sensitive intake, handled with care.",
    body:
      "Divorce, custody, and protective-order calls demand a different tone. Claire listens, adapts her pacing, runs a conflict check against your client list, and books the initial consultation in English or Spanish — all without making the caller repeat their story twice.",
    stats: [
      { value: "100%", label: "Conflict-checked before booking" },
      { value: "2.3 days", label: "Avg time-to-consultation" },
    ],
    card: {
      chip: { tone: "info", label: "NEW MATTER · CUSTODY" },
      title: "Sensitive intake — EN/ES",
      checks: [
        { done: true, label: "Conflict check clean", accent: "green" },
        { done: true, label: "Children's ages recorded", accent: "green" },
        { done: true, label: "Consultation booked · Thu 2pm", accent: "green" },
        { done: false, label: "Prior order requested", accent: "neutral" },
      ],
    },
  },
  {
    area: "Immigration",
    headline: "Every deadline. Every language. Every time zone.",
    body:
      "Claire speaks 10+ languages natively, captures USCIS receipt numbers and priority dates, and flags deadline windows the moment a call comes in. Consultations are booked across every time zone, so nothing slips between an H-1B cap window and a master calendar hearing.",
    stats: [
      { value: "12", label: "Languages spoken natively" },
      { value: "48h", label: "Advance USCIS deadline alert" },
    ],
    card: {
      chip: { tone: "warn", label: "DEADLINE · 42 DAYS" },
      title: "New Filing: I-485",
      checks: [
        { done: true, label: "USCIS receipt # captured", accent: "green" },
        { done: true, label: "Priority date verified", accent: "green" },
        { done: true, label: "Interpreter scheduled", accent: "green" },
        { done: false, label: "Biometrics notice pending", accent: "neutral" },
      ],
    },
    reverse: true,
  },
];

function Chip({ tone, label }: { tone: ChipTone; label: string }) {
  const s = chipStyles[tone];
  return (
    <span
      className="inline-flex items-center rounded-[3px] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ backgroundColor: s.bg, color: s.fg }}
    >
      {label}
    </span>
  );
}

function CheckIcon({ done, accent = "green" }: { done: boolean; accent?: "green" | "red" | "neutral" }) {
  if (!done) {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <circle cx="8" cy="8" r="6.5" stroke="#0a0a0a" strokeOpacity="0.2" strokeWidth="1" />
      </svg>
    );
  }
  const color = accent === "red" ? "#b83a3a" : accent === "neutral" ? "#0a0a0a" : "#1f7a3e";
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" fill={color} />
      <path d="M4.8 8.3L7 10.5L11.4 5.9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MockCard({ item }: { item: RowItem }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 sm:p-14"
      style={{
        backgroundColor: "#8c9c82",
        backgroundImage: `
          url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.32 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"),
          radial-gradient(120% 90% at 20% 10%, #a9b8a0 0%, #8c9c82 45%, #7a8a72 100%)
        `,
        backgroundSize: "280px 280px, 100% 100%",
        backgroundRepeat: "repeat, no-repeat",
      }}
    >
      <div className="relative mx-auto w-full max-w-[540px] rounded-lg bg-white p-7 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
        <Chip tone={item.chip.tone} label={item.chip.label} />
        <p className="mt-3 text-[16px] font-semibold text-[#0a0a0a]" style={{ letterSpacing: "-0.01em" }}>
          {item.title}
        </p>
        <div className="mt-3 h-px w-full bg-[#0a0a0a]/10" />
        <ul className="mt-4 space-y-2.5">
          {item.checks.map((c) => (
            <li key={c.label} className="flex items-center gap-2.5">
              <CheckIcon done={c.done} accent={c.accent} />
              <span
                className="text-[13px]"
                style={{
                  color:
                    c.accent === "red"
                      ? "#b83a3a"
                      : c.done
                      ? "#0a0a0a"
                      : "rgba(10,10,10,0.45)",
                }}
              >
                {c.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PracticeAreas() {
  return (
    <section className="bg-white px-6 py-[120px]">
      <div className="mx-auto w-full max-w-[1728px]">
        <FadeIn>
          <div className="grid items-end gap-[60px] lg:grid-cols-[2fr_3fr]">
            <p className="text-[14px] leading-[1.5] text-[#0a0a0a]/45">
              Every practice area has different intake needs — Claire adapts her questions, qualifications, and routing to match your firm.
            </p>
            <h2
              className="text-right font-serif text-[clamp(2rem,4vw,48px)] text-[#0a0a0a]"
              style={{ letterSpacing: "-0.02em", lineHeight: "0.95", fontFeatureSettings: '"liga" 0' }}
            >
              Built for every<br />
              practice area.
            </h2>
          </div>
        </FadeIn>

        <div className="mt-[80px] flex flex-col">
          {rows.map((row, i) => (
            <FadeIn key={row.area} delay={0.05}>
              <div
                className={`grid items-center gap-10 py-8 lg:gap-16 ${
                  row.reverse ? "lg:grid-cols-[6fr_5fr]" : "lg:grid-cols-[5fr_6fr]"
                }`}
                style={{
                  minHeight: "calc((100vh - 48px) / 2)",
                  scrollSnapAlign: "start",
                }}
              >
                <div className={row.reverse ? "lg:order-2" : ""}>
                  <MockCard item={row.card} />
                </div>
                <div className={row.reverse ? "lg:order-1" : ""}>
                  <p className="text-[11px] font-medium tracking-[0.14em] text-[#0a0a0a]/35">
                    {String(i + 1).padStart(2, "0")} / 04
                  </p>
                  <h3
                    className="mt-3 font-serif text-[#0a0a0a]"
                    style={{
                      fontSize: "clamp(2.25rem, 4.2vw, 56px)",
                      lineHeight: 1.0,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {row.area}
                  </h3>
                  <p
                    className="mt-5 max-w-[560px] text-[#0a0a0a]/85"
                    style={{
                      fontSize: "clamp(1rem, 1.3vw, 19px)",
                      lineHeight: 1.35,
                      fontWeight: 450,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {row.headline}
                  </p>
                  <p className="mt-4 max-w-[560px] text-[15px] leading-[1.6] text-[#0a0a0a]/55">
                    {row.body}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
                    {row.stats.map((s) => (
                      <div key={s.label}>
                        <p
                          className="text-[28px] font-semibold text-[#0a0a0a]"
                          style={{ letterSpacing: "-0.02em", lineHeight: 1 }}
                        >
                          {s.value}
                        </p>
                        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.14em] text-[#0a0a0a]/45">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
