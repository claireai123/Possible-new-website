"use client";

import { useEffect, useRef, useState } from "react";

type Role = "claire" | "caller";
type Capability =
  | "AI Empathy"
  | "Lead Intake"
  | "Conflict Check"
  | "Urgency Triage"
  | "Booking"
  | "Retainer";

interface Line {
  t: number;
  role: Role;
  text: string;
  chip?: Capability;
}

// Drop the real intake MP3 at /public/audio/personal-injury-intake.mp3.
// Update the `lines` array below so each `t` (seconds) matches the real audio.
const audioSrc = "/audio/personal-injury-intake.mp3";
const subtitle = "Personal injury intake — daytime call";

const lines: Line[] = [
  { t: 0, role: "claire", text: "Hello. Thanks for calling Exotic Law Firm. This is Mila on the intake team. How can I help you today?" },
  { t: 8, role: "caller", text: "Hi, I just got in a car accident. I'm looking for a lawyer." },
  { t: 13, role: "claire", text: "I'm sorry to hear about your accident. I can help get you scheduled for a free strategy session with one of our attorneys.", chip: "AI Empathy" },
  { t: 19, role: "claire", text: "May I have your full name, please?", chip: "Lead Intake" },
  { t: 21, role: "caller", text: "Yes, it's Tiffany White." },
  { t: 24, role: "claire", text: "Thank you, Tiffany. What's the best phone number to reach you at?" },
  { t: 28, role: "caller", text: "954-550-1234." },
  { t: 33, role: "claire", text: "Got it. And could you please provide your email address?" },
  { t: 37, role: "caller", text: "Yes, it's Tiffany.White@gmail.com." },
  { t: 42, role: "claire", text: "Thank you, Tiffany. Could you tell me the city and state where the accident occurred?" },
  { t: 47, role: "caller", text: "Yes, it was in Boca Raton, Florida." },
  { t: 52, role: "claire", text: "Thank you. Can you tell me the date when the accident happened?" },
  { t: 56, role: "caller", text: "It was September 9, 2024." },
  { t: 60, role: "claire", text: "Thank you. Could you please describe the type of incident? For example, was it a car, truck, or motorcycle accident?" },
  { t: 68, role: "caller", text: "It was a car accident." },
  { t: 71, role: "claire", text: "Thank you for the information. Were there any injuries, and did you receive any medical treatment, such as visiting the ER or urgent care?" },
  { t: 79, role: "caller", text: "No, I was fine." },
  { t: 82, role: "claire", text: "I'm glad to hear that you weren't injured. Do you have any information about the other party involved or their insurance?" },
];

const FALLBACK_DURATION = 107;
const waveform = generateWaveform(96);

function generateWaveform(n: number): number[] {
  const out: number[] = [];
  let seed = 42;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < n; i++) {
    const pos = i / n;
    const envelope = Math.sin(pos * Math.PI) * 0.7 + 0.15;
    const conversation = 0.35 + 0.5 * Math.abs(Math.sin(pos * 11));
    const noise = rand() * 0.35;
    const silence = rand() < 0.08 ? 0.08 : 1;
    out.push(Math.round(Math.min(0.98, envelope * conversation + noise) * silence * 1000) / 1000);
  }
  return out;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function AudioDemo() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(FALLBACK_DURATION);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setElapsed(audio.currentTime);
    const onLoaded = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const progress = duration > 0 ? elapsed / duration : 0;
  const activeIndex = lines.findIndex((l, i) => {
    const next = lines[i + 1]?.t ?? duration;
    return elapsed >= l.t && elapsed < next;
  });
  const visibleLines = lines.slice(0, Math.max(activeIndex + 1, 0));

  useEffect(() => {
    const container = transcriptRef.current;
    if (!container || activeIndex < 0) return;
    const active = container.querySelector<HTMLElement>(`[data-idx="${activeIndex}"]`);
    if (!active) return;
    const cRect = container.getBoundingClientRect();
    const aRect = active.getBoundingClientRect();
    const bottomMargin = 80;
    const topMargin = 24;
    let delta = 0;
    if (aRect.bottom > cRect.bottom - bottomMargin) {
      delta = aRect.bottom - (cRect.bottom - bottomMargin);
    } else if (aRect.top < cRect.top + topMargin) {
      delta = aRect.top - (cRect.top + topMargin);
    } else {
      return;
    }
    container.scrollTo({ top: container.scrollTop + delta, behavior: "smooth" });
  }, [activeIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    if (audio.ended || elapsed >= duration) {
      audio.currentTime = 0;
      setElapsed(0);
    }
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const next = Math.max(0, Math.min(1, ratio)) * duration;
    audio.currentTime = next;
    setElapsed(next);
  };

  const seekTo = (next: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(duration, next));
    audio.currentTime = clamped;
    setElapsed(clamped);
  };

  const onWaveformKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      seekTo(elapsed - 5);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      seekTo(elapsed + 5);
    } else if (e.key === "Home") {
      e.preventDefault();
      seekTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      seekTo(duration);
    }
  };

  return (
    <section className="bg-[#ffffff] px-6 py-[120px]">
      <audio ref={audioRef} src={audioSrc} preload="metadata" />
      <div className="mx-auto grid max-w-[1728px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left column wrapper (stretches to grid row) */}
        <div>
          <div className="lg:sticky lg:top-[72px]">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#0a0a0a]/40">
              Hear a real call
            </p>
            <h2
              className="mt-6 font-serif text-[#0a0a0a]"
              style={{
                fontSize: "clamp(2.25rem, 4.5vw, 64px)",
                letterSpacing: "-0.02em",
                lineHeight: "0.95",
                fontFeatureSettings: '"liga" 0',
              }}
            >
              Listen to Claire<br />
              handle an intake call.
            </h2>
            <p className="mt-8 max-w-md text-[17px] leading-[1.5] text-[#0a0a0a]/50">
              Every qualifying question asked, every conflict checked, every consultation booked —
              in under two minutes, around the clock.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-[13px] text-[#0a0a0a]/45">
              <Stat number="0.8s" label="First response" />
              <Stat number="24/7" label="Always on" />
              <Stat number="100%" label="Calls answered" />
            </div>
          </div>
        </div>

        {/* Right: demo card */}
        <div
          className="w-full rounded-2xl border border-[#0a0a0a]/[0.06] bg-white"
          style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.04), 0 20px 60px -16px rgba(10,10,10,0.12)" }}
        >
          {/* Player row */}
          <div className="flex flex-wrap items-center gap-4 border-b border-[#0a0a0a]/[0.06] px-6 py-5">
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] transition-transform hover:scale-[1.04] active:scale-95"
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <rect x="2" y="1" width="2.5" height="10" rx="0.5" fill="white" />
                  <rect x="7.5" y="1" width="2.5" height="10" rx="0.5" fill="white" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" className="ml-[2px]">
                  <path d="M3 1l8 5-8 5V1z" fill="white" />
                </svg>
              )}
            </button>

            {/* Waveform */}
            <div
              className="flex h-10 flex-1 cursor-pointer items-center gap-[2px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a0a0a]/30 rounded"
              onClick={seek}
              onKeyDown={onWaveformKeyDown}
              tabIndex={0}
              role="slider"
              aria-label="Seek"
              aria-valuenow={Math.round(progress * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              {waveform.map((h, i) => {
                const past = i / waveform.length <= progress;
                return (
                  <div
                    key={i}
                    className="flex-1 transition-colors duration-100"
                    style={{
                      height: `${Math.max(6, h * 100)}%`,
                      borderRadius: 1,
                      background: past ? "#0a0a0a" : "rgba(10,10,10,0.12)",
                    }}
                  />
                );
              })}
            </div>

            <span className="shrink-0 text-[12px] tabular-nums text-[#0a0a0a]/45">
              {fmt(elapsed)}
              <span className="text-[#0a0a0a]/20">{" / "}</span>
              {fmt(duration)}
            </span>

            {/* Static practice-area badge */}
            <span className="hidden md:inline-flex shrink-0 rounded-md border border-[#0a0a0a]/[0.08] bg-[#ffffff] px-3 py-2 text-[13px] text-[#0a0a0a]/80">
              Personal Injury
            </span>
          </div>

          {/* Transcript */}
          <div
            ref={transcriptRef}
            className="relative h-[420px] md:h-[520px] overflow-y-auto px-6 py-6 md:[overscroll-behavior:contain]"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(10,10,10,0.15) transparent",
            }}
          >
            {visibleLines.length === 0 && (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/30">
                  {subtitle}
                </div>
                <div className="mt-3 text-[15px] text-[#0a0a0a]/50">
                  Press play to hear Claire.
                </div>
              </div>
            )}

            {visibleLines.map((line, i) => (
              <TranscriptLine
                key={`pi-${i}`}
                line={line}
                idx={i}
                isActive={i === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TranscriptLine({
  line,
  idx,
  isActive,
}: {
  line: Line;
  idx: number;
  isActive: boolean;
}) {
  const isClaire = line.role === "claire";
  return (
    <div
      data-idx={idx}
      className="mb-5 flex gap-4 transition-opacity duration-300"
      style={{ opacity: isActive ? 1 : 0.55 }}
    >
      <div
        className="w-16 shrink-0 pt-1 text-[10px] font-medium uppercase tracking-[0.16em]"
        style={{ color: isClaire ? "#0a0a0a" : "rgba(10,10,10,0.4)" }}
      >
        {isClaire ? "Claire" : "Caller"}
      </div>
      <div className="flex-1">
        <p
          className={`${
            isClaire ? "font-serif text-[17px] leading-[1.5] text-[#0a0a0a]" : "text-[15px] leading-[1.55] text-[#0a0a0a]/70"
          }`}
          style={isClaire ? { letterSpacing: "-0.005em" } : undefined}
        >
          {line.text}
        </p>
        {line.chip && (
          <span
            className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#0a0a0a]/[0.04] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#0a0a0a]/55"
            style={{ animation: "chipFade 0.35s ease-out both" }}
          >
            <ChipIcon chip={line.chip} />
            {line.chip}
          </span>
        )}
      </div>
      <style>{`@keyframes chipFade { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

function ChipIcon({ chip }: { chip: Capability }) {
  const d: Record<Capability, React.ReactNode> = {
    "AI Empathy": (
      <path d="M7 12.5s-4-2.5-4-6.5a2.5 2.5 0 014-2 2.5 2.5 0 014 2c0 4-4 6.5-4 6.5z" />
    ),
    "Lead Intake": <path d="M3 4h8M3 7h8M3 10h5" />,
    "Conflict Check": <path d="M3 7l2.5 2.5L11 4" />,
    "Urgency Triage": <path d="M7 2v6m0 3v.5" />,
    Booking: <path d="M3 5h8v7H3zM5 3v2M9 3v2M3 7h8" />,
    Retainer: <path d="M4 2h4l3 3v7H4zM8 2v3h3" />,
  };
  return (
    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {d[chip]}
    </svg>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-serif text-[22px] text-[#0a0a0a]" style={{ letterSpacing: "-0.02em" }}>
        {number}
      </span>
      <span className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/40">{label}</span>
    </div>
  );
}
