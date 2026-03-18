"use client";

import { useState, useRef, useEffect } from "react";

/* Waveform shaped like a real two-person phone call */
const waveform = [
  .18,.35,.52,.68,.74,.81,.70,.58,.65,.72,.80,.68,.55,.42,.30,
  .08,.05,.06,.04,
  .15,.28,.45,.55,.62,.70,.58,.48,.55,.65,.72,.60,.45,.32,.20,
  .06,.04,.05,.03,
  .12,.25,.40,.52,.65,.78,.85,.72,.60,.68,.75,.82,.70,.55,.62,.75,.80,.65,.50,.38,.25,
  .05,.04,.06,.04,
  .10,.22,.38,.50,.60,.55,.45,.52,.62,.68,.55,.40,.28,.18,
  .04,.05,.03,.04,
  .10,.20,.35,.48,.58,.68,.75,.82,.88,.80,.72,.65,.70,.78,.85,.90,.82,.75,.68,.72,.80,.85,.78,.65,.52,.40,.30,.20,.12,
  .06,.04,.03,.02,
];

const outcomes = [
  { label: "Injury", value: "Neck & back — ER same day" },
  { label: "Report", value: "Police report filed" },
  { label: "Consult", value: "Booked tomorrow, 10 AM" },
  { label: "Retainer", value: "Sent via email + SMS" },
];

const DURATION = 107;

export function HearClaire() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!isPlaying) return;
    startRef.current = Date.now() - progress * DURATION * 1000;

    const tick = () => {
      const p = Math.min((Date.now() - startRef.current) / (DURATION * 1000), 1);
      setProgress(p);
      if (p >= 1) { setIsPlaying(false); return; }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying]);

  const play = () => {
    if (progress >= 1) setProgress(0);
    setIsPlaying((v) => !v);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  };

  const revealed = progress >= 1 ? 4 : Math.floor(progress * 5);

  return (
    <section className="bg-[#fefefc] px-6 py-[140px]">
      <div className="mx-auto max-w-[1080px]">

        {/* Header */}
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#c4913c]/50">
              Live Demo
            </p>
            <h2
              className="mt-5 font-serif text-[clamp(2rem,4vw,44px)] font-normal text-white/90"
              style={{ letterSpacing: "-0.025em", lineHeight: 1.1 }}
            >
              Hear Claire qualify a PI lead.
            </h2>
          </div>
          <p className="max-w-sm text-[14px] leading-[1.5] text-white/35 lg:text-right">
            Real conversation. Every qualifying question asked,
            consultation booked, retainer sent — under two minutes.
          </p>
        </div>

        {/* Player card */}
        <div className="mt-14 rounded-2xl p-8 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-5">
            <button
              onClick={play}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c4913c] transition-transform hover:scale-[1.04] active:scale-[0.97]"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="13" height="13" viewBox="0 0 12 12">
                  <rect x="2" y="1" width="2.5" height="10" rx=".5" fill="white" />
                  <rect x="7.5" y="1" width="2.5" height="10" rx=".5" fill="white" />
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 12 12" className="ml-[2px]">
                  <path d="M3 1l8 5-8 5V1z" fill="white" />
                </svg>
              )}
            </button>

            <div className="flex flex-1 items-end gap-[1.5px]" style={{ height: 44 }}>
              {waveform.map((h, i) => {
                const pos = i / waveform.length;
                const past = pos <= progress;
                return (
                  <div
                    key={i}
                    className="flex-1 transition-colors duration-150"
                    style={{
                      height: `${h * 100}%`,
                      borderRadius: 1,
                      background: past
                        ? "#c4913c"
                        : "rgba(255,255,255,0.10)",
                    }}
                  />
                );
              })}
            </div>

            <span className="shrink-0 text-[13px] tabular-nums text-white/30">
              {fmt(progress * DURATION)}
              <span className="text-white/15">{" / "}</span>
              1:47
            </span>
          </div>

          {/* Outcomes row inside the card */}
          <div className="mt-8 grid grid-cols-4 border-t border-white/[0.06] pt-7">
            {outcomes.map((o, i) => {
              const active = i < revealed;
              return (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    paddingLeft: i > 0 ? 24 : 0,
                    borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.16em] transition-colors duration-500"
                    style={{ color: active ? "#c4913c" : "rgba(255,255,255,0.25)" }}
                  >
                    {o.label}
                  </p>
                  <p
                    className="mt-2 text-[14px] leading-snug transition-colors duration-500"
                    style={{ color: active ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.30)" }}
                  >
                    {o.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
