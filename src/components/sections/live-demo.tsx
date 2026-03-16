"use client";

import { useEffect, useRef, useState } from "react";

const transcript = [
  { who: "claire", text: "Good evening, Johnson & Associates. This is Claire, how can I help you?" },
  { who: "caller", text: "Hi, I was in a car accident yesterday and I think I need a lawyer." },
  { who: "claire", text: "I'm sorry to hear that. I'd like to help connect you with an attorney. Can I get your name?" },
  { who: "caller", text: "Maria Santos." },
  { who: "claire", text: "Thank you, Maria. Were you the driver or a passenger?" },
  { who: "caller", text: "I was driving. The other car ran a red light." },
  { who: "claire", text: "Were you taken to the hospital or have you sought medical treatment?" },
  { who: "caller", text: "Yes, I went to the ER. Whiplash and a possible concussion." },
  { who: "claire", text: "I've noted that. I have a consultation available tomorrow at 2 PM with Attorney Johnson. Shall I book that for you?" },
  { who: "caller", text: "Yes, please." },
];

const actions = [
  { label: "Lead created", detail: "Maria Santos", icon: "+" },
  { label: "Tagged: Personal Injury", detail: "Motor Vehicle Accident", icon: "◆" },
  { label: "Urgency: High", detail: "ER visit, active injuries", icon: "!" },
  { label: "Conflict check", detail: "No conflicts found", icon: "✓" },
  { label: "Booked", detail: "Tomorrow 2:00 PM — Atty. Johnson", icon: "◉" },
];

export function LiveDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [lines, setLines] = useState(0);
  const [acts, setActs] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const timers: NodeJS.Timeout[] = [];
    transcript.forEach((_, i) => {
      timers.push(setTimeout(() => setLines(i + 1), 1200 * (i + 1)));
    });
    actions.forEach((_, i) => {
      timers.push(setTimeout(() => setActs(i + 1), 2400 + 2000 * i));
    });
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section ref={ref} className="bg-[#ecece7] px-6 py-4">
      <div className="mx-auto max-w-[1400px]">
        {/* Two-column immersive area */}
        <div className="grid min-h-[80vh] gap-6 lg:grid-cols-[1fr_380px]">

          {/* Left: live call transcript — looks like a real document/interface */}
          <div className="overflow-hidden rounded-2xl bg-white p-10 shadow-sm">
            {/* Header bar */}
            <div className="mb-8 flex items-center justify-between border-b border-[#e4e4e7] pb-6">
              <div className="flex items-center gap-3">
                <div className="relative h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </div>
                <span className="text-[13px] font-medium text-[#0a0a0a]">Live Intake Call</span>
                <span className="text-[13px] text-[#0a0a0a]/40">Personal Injury</span>
              </div>
              <div className="flex items-center gap-2">
                {/* Waveform mini */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-[2px] rounded-full bg-[#0a0a0a]/15"
                    style={{
                      height: `${6 + Math.sin(i * 0.8) * 10 + Math.random() * 6}px`,
                      animation: started ? `waveform ${0.5 + Math.random() * 0.6}s ease-in-out ${i * 0.05}s infinite` : "none",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Transcript body — styled like a real document */}
            <div className="space-y-6">
              {transcript.slice(0, lines).map((line, i) => (
                <div key={i} className="animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-[#0a0a0a]/30">
                    {line.who === "claire" ? "Claire" : "Caller"}
                  </span>
                  <p className={`mt-1 text-[17px] leading-relaxed ${
                    line.who === "claire" ? "text-[#0a0a0a]" : "text-[#0a0a0a]/60"
                  }`}>
                    {line.text}
                  </p>
                </div>
              ))}
              {started && lines < transcript.length && (
                <div className="flex gap-1.5 pl-1">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#0a0a0a]/20" />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#0a0a0a]/20" style={{ animationDelay: "0.15s" }} />
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#0a0a0a]/20" style={{ animationDelay: "0.3s" }} />
                </div>
              )}
            </div>
          </div>

          {/* Right: floating action cards — like Legora's "Sources" panel */}
          <div className="flex flex-col gap-4 py-10">
            <p className="text-[13px] font-medium text-[#0a0a0a]/50">
              Syncing to Clio
            </p>

            {actions.slice(0, acts).map((a, i) => (
              <div
                key={i}
                className="animate-fade-up rounded-2xl bg-white px-6 py-5 shadow-sm"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#0a0a0a]/5 text-xs text-[#0a0a0a]/60">
                    {a.icon}
                  </span>
                  <div>
                    <p className="text-[14px] font-medium text-[#0a0a0a]">{a.label}</p>
                    <p className="mt-0.5 text-[12px] text-[#0a0a0a]/40">{a.detail}</p>
                  </div>
                </div>
              </div>
            ))}

            {started && acts < actions.length && (
              <div className="flex items-center gap-2 px-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0a0a0a]/10 border-t-[#0a0a0a]/40" />
                <span className="text-[12px] text-[#0a0a0a]/30">Processing...</span>
              </div>
            )}

            {acts >= actions.length && (
              <div className="animate-fade-up rounded-2xl bg-[#0a0a0a] px-6 py-5 text-white">
                <p className="text-[14px] font-medium">Intake complete</p>
                <p className="mt-1 text-[12px] text-white/50">0:47 call · High value · Consultation booked</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
