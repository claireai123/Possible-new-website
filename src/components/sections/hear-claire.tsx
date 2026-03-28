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
    <section className="relative overflow-hidden px-6 py-[120px]" style={{ backgroundColor: "#f5f4f1" }}>
      {/* Background waveform decoration */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.05]">
        <div className="flex items-end gap-[3px]" style={{ height: 300, width: "80%" }}>
          {waveform.map((h, i) => (
            <div
              key={i}
              className="flex-1"
              style={{
                height: `${h * 100}%`,
                borderRadius: 2,
                background: "#0a0a0a",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-[1728px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Left: headline + subtitle */}
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#c4913c]/60">
              Voice AI
            </p>
            <h2
              className="mt-5 font-serif text-[clamp(2.5rem,5vw,56px)] font-normal text-[#0a0a0a]"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.05 }}
            >
              Hear Claire qualify<br />
              a PI lead.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.5] text-[#0a0a0a]/45">
              Real conversation. Every qualifying question asked,
              consultation booked, retainer sent — under two minutes.
            </p>
          </div>

          {/* Right: player card */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="w-full max-w-[480px] rounded-2xl p-8"
              style={{
                backgroundColor: "#fefefc",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 12px 40px -8px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {/* Title */}
              <p className="text-[13px] font-medium text-[#0a0a0a]/50">PI Intake Call</p>

              {/* Player */}
              <div className="mt-5 flex items-center gap-4">
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

                <div className="flex flex-1 items-end gap-[1.5px]" style={{ height: 40 }}>
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
                          background: past ? "#c4913c" : "rgba(10,10,10,0.10)",
                        }}
                      />
                    );
                  })}
                </div>

                <span className="shrink-0 text-[12px] tabular-nums text-[#0a0a0a]/30">
                  {fmt(progress * DURATION)}
                  <span className="text-[#0a0a0a]/15">{" / "}</span>
                  1:47
                </span>
              </div>

              {/* Outcomes */}
              <div className="mt-7 grid grid-cols-2 gap-3">
                {outcomes.map((o, i) => {
                  const active = i < revealed;
                  return (
                    <div
                      key={i}
                      className="rounded-lg p-3 transition-all duration-500"
                      style={{ backgroundColor: "rgba(10,10,10,0.03)" }}
                    >
                      <p
                        className="text-[9px] uppercase tracking-[0.14em] transition-colors duration-500"
                        style={{ color: active ? "#c4913c" : "rgba(10,10,10,0.25)" }}
                      >
                        {o.label}
                      </p>
                      <p
                        className="mt-1 text-[13px] leading-snug transition-colors duration-500"
                        style={{ color: active ? "rgba(10,10,10,0.80)" : "rgba(10,10,10,0.25)" }}
                      >
                        {o.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
