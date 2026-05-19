"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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

interface Scenario {
  id: string;
  label: string;
  subtitle: string;
  duration: number;
  lines: Line[];
}

const scenarios: Scenario[] = [
  {
    id: "pi",
    label: "Personal Injury",
    subtitle: "After-hours car accident intake",
    duration: 107,
    lines: [
      { t: 0, role: "claire", text: "Good evening, Johnson & Associates. This is Claire — how can I help you tonight?" },
      { t: 5.5, role: "caller", text: "Hi, uh, I was in a car accident about an hour ago and I don't really know what to do." },
      { t: 12, role: "claire", text: "I'm so sorry that happened — are you safe right now? Are you hurt?", chip: "AI Empathy" },
      { t: 17.5, role: "caller", text: "I'm home. My neck and back are killing me but the paramedics said I should be fine." },
      { t: 25, role: "claire", text: "Okay. Let's take this one step at a time. Can I get your full name?", chip: "Lead Intake" },
      { t: 30, role: "caller", text: "Maria Santos." },
      { t: 33, role: "claire", text: "Thank you, Maria. Were you the driver, and was anyone else in the car with you?" },
      { t: 39, role: "caller", text: "I was driving, alone. The other driver ran a red light on Main and 4th." },
      { t: 46, role: "claire", text: "Did the police come to the scene and file a report?" },
      { t: 50, role: "caller", text: "Yeah, they filed a report. I have the reference number here." },
      { t: 55, role: "claire", text: "Perfect. Before I book your consultation, I need to check you aren't a current client elsewhere at the firm — one moment.", chip: "Conflict Check" },
      { t: 63, role: "claire", text: "All clear. Given ER-level injuries and a police report, this qualifies as urgent — I'll get you in first thing tomorrow.", chip: "Urgency Triage" },
      { t: 72, role: "caller", text: "That would be amazing, thank you." },
      { t: 76, role: "claire", text: "Attorney Johnson has 10 AM open. I'll book that now and send you a calendar invite.", chip: "Booking" },
      { t: 84, role: "caller", text: "Okay, perfect." },
      { t: 87, role: "claire", text: "I'm also sending a preliminary retainer to your email and phone — no signature needed tonight, just review when you can.", chip: "Retainer" },
      { t: 96, role: "caller", text: "Got it. Thank you so much, Claire." },
      { t: 100, role: "claire", text: "You're welcome, Maria. Rest tonight. We'll see you at 10." },
    ],
  },
  {
    id: "family",
    label: "Family Law",
    subtitle: "Divorce consultation request",
    duration: 92,
    lines: [
      { t: 0, role: "claire", text: "Thank you for calling Johnson & Associates, this is Claire." },
      { t: 4, role: "caller", text: "Hi. I'm looking for help with a divorce. I don't even know where to start." },
      { t: 10, role: "claire", text: "I understand — this is a hard call to make, and I appreciate you reaching out.", chip: "AI Empathy" },
      { t: 16, role: "caller", text: "Thank you." },
      { t: 18, role: "claire", text: "So I can match you with the right attorney, can I ask a few questions? Your name first.", chip: "Lead Intake" },
      { t: 24, role: "caller", text: "David Chen." },
      { t: 26.5, role: "claire", text: "Thanks, David. Have you or your spouse already filed anything with the court?" },
      { t: 32, role: "caller", text: "No, nothing filed yet. We've talked but that's it." },
      { t: 37, role: "claire", text: "Are there children involved, and do you currently live in the same home?" },
      { t: 43, role: "caller", text: "Two kids, seven and ten. We're still under one roof for now." },
      { t: 49, role: "claire", text: "Let me make sure neither party is already a client of the firm.", chip: "Conflict Check" },
      { t: 55, role: "claire", text: "No conflicts. Family law consults are typically in-person — we have Thursday at 2 PM with Attorney Rivera.", chip: "Booking" },
      { t: 64, role: "caller", text: "Thursday at 2 works." },
      { t: 67, role: "claire", text: "Booked. I'm texting you a confirmation plus an intake form so we can hit the ground running.", chip: "Retainer" },
      { t: 76, role: "caller", text: "Perfect, thank you." },
      { t: 79, role: "claire", text: "Take care, David. We'll see you Thursday." },
    ],
  },
  {
    id: "criminal",
    label: "Criminal Defense",
    subtitle: "Urgent arraignment — 11 PM",
    duration: 78,
    lines: [
      { t: 0, role: "claire", text: "Johnson & Associates, this is Claire." },
      { t: 3, role: "caller", text: "My brother was just arrested. He has an arraignment tomorrow morning. I need a lawyer tonight." },
      { t: 10, role: "claire", text: "Okay, I hear you — we'll move fast. Is your brother currently in custody?", chip: "AI Empathy" },
      { t: 17, role: "caller", text: "Yes, he's at county. Bail hearing at 9 AM." },
      { t: 22, role: "claire", text: "Can you give me his full name and your name too?", chip: "Lead Intake" },
      { t: 27, role: "caller", text: "I'm Alex Brooks. My brother is Jordan Brooks." },
      { t: 32, role: "claire", text: "Do you know the charges he's facing?" },
      { t: 35, role: "caller", text: "Felony DUI. First offense I think." },
      { t: 40, role: "claire", text: "Checking for conflicts — one moment.", chip: "Conflict Check" },
      { t: 44, role: "claire", text: "We're clear. This is time-critical, so I'm paging Attorney Rivera's on-call line right now.", chip: "Urgency Triage" },
      { t: 52, role: "caller", text: "Thank you." },
      { t: 54, role: "claire", text: "Attorney Rivera will call you within fifteen minutes. I've also reserved a 7 AM prep slot before the arraignment.", chip: "Booking" },
      { t: 64, role: "claire", text: "I'm texting you the retainer now so Rivera can file appearance tonight.", chip: "Retainer" },
      { t: 70, role: "caller", text: "Got it. Thank you so much." },
    ],
  },
];

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
    out.push(Math.min(0.98, envelope * conversation + noise) * silence);
  }
  return out;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

export function AudioDemo() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const rafRef = useRef<number>(0);
  const startedAtRef = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const scenario = useMemo(
    () => scenarios.find((s) => s.id === scenarioId) ?? scenarios[0],
    [scenarioId]
  );

  useEffect(() => {
    if (!isPlaying) return;
    startedAtRef.current = Date.now() - elapsed * 1000;
    const tick = () => {
      const next = Math.min((Date.now() - startedAtRef.current) / 1000, scenario.duration);
      setElapsed(next);
      if (next >= scenario.duration) {
        setIsPlaying(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, scenario.duration]);

  useEffect(() => {
    setElapsed(0);
    setIsPlaying(false);
  }, [scenarioId]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [menuOpen]);

  const progress = elapsed / scenario.duration;
  const activeIndex = scenario.lines.findIndex((l, i) => {
    const next = scenario.lines[i + 1]?.t ?? scenario.duration;
    return elapsed >= l.t && elapsed < next;
  });
  const visibleLines = scenario.lines.slice(0, Math.max(activeIndex + 1, 0));

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
    if (elapsed >= scenario.duration) setElapsed(0);
    setIsPlaying((v) => !v);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const next = Math.max(0, Math.min(1, ratio)) * scenario.duration;
    setElapsed(next);
    if (isPlaying) startedAtRef.current = Date.now() - next * 1000;
  };

  return (
    <section className="bg-[#ffffff] px-6 py-[120px]">
      <div className="mx-auto grid max-w-[1728px] gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Left column wrapper (stretches to grid row) */}
        <div>
          <div style={{ position: "sticky", top: "72px" }}>
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
          <div className="flex items-center gap-4 border-b border-[#0a0a0a]/[0.06] px-6 py-5">
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
              className="flex h-10 flex-1 cursor-pointer items-center gap-[2px]"
              onClick={seek}
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
              {fmt(scenario.duration)}
            </span>

            {/* Scenario picker */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-md border border-[#0a0a0a]/[0.08] bg-[#ffffff] px-3 py-2 text-[13px] text-[#0a0a0a]/80 transition-colors hover:bg-[#f5f4f1]"
              >
                {scenario.label}
                <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-50">
                  <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full z-10 mt-2 w-[260px] overflow-hidden rounded-lg border border-[#0a0a0a]/[0.08] bg-white shadow-lg">
                  {scenarios.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => {
                        setScenarioId(s.id);
                        setMenuOpen(false);
                      }}
                      className={`flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left transition-colors hover:bg-[#f5f4f1] ${
                        s.id === scenario.id ? "bg-[#f5f4f1]" : ""
                      }`}
                    >
                      <span className="text-[13px] font-medium text-[#0a0a0a]">{s.label}</span>
                      <span className="text-[11px] text-[#0a0a0a]/50">{s.subtitle}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Transcript */}
          <div
            ref={transcriptRef}
            className="relative h-[520px] overflow-y-auto px-6 py-6"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(10,10,10,0.15) transparent",
              overscrollBehavior: "contain",
            }}
          >
            {visibleLines.length === 0 && (
              <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#0a0a0a]/30">
                  {scenario.subtitle}
                </div>
                <div className="mt-3 text-[15px] text-[#0a0a0a]/50">
                  Press play to hear Claire.
                </div>
              </div>
            )}

            {visibleLines.map((line, i) => (
              <TranscriptLine
                key={`${scenario.id}-${i}`}
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
