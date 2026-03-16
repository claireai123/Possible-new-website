"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Kanban column data — all PI ── */
const columns = [
  {
    title: "Newly Added",
    cards: [
      { name: "Maria Santos", type: "Rear-End Collision", claire: true },
      { name: "James Richardson", type: "T-Bone Accident", claire: true },
    ],
  },
  {
    title: "Consult Scheduled",
    cards: [
      { name: "Angela Torres", type: "Uber Passenger Injury", claire: true },
      { name: "David Chen", type: "Hit & Run", claire: false },
    ],
  },
  {
    title: "Pending Engagement",
    cards: [
      { name: "Lisa Patel", type: "Motorcycle Accident", claire: true },
    ],
  },
  {
    title: "Waiting on Retainer",
    cards: [
      { name: "Carlos Vega", type: "Truck Accident", claire: true },
      { name: "Sarah Mitchell", type: "Pedestrian Accident", claire: false },
    ],
  },
];

export function MockCRM() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
    >
      {/* ── Main CRM card ── */}
      <div
        className="flex flex-col overflow-hidden rounded-2xl bg-white"
        style={{ boxShadow: "0 25px 80px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.03)" }}
      >
        {/* Top chrome */}
        <div className="flex items-center justify-between bg-[#2b5ea7] px-[1.2vw] py-[1vh]">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="5.5" stroke="white" strokeWidth="1.4" />
              <path d="M6 8L7.5 9.5L10.5 6.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-white/10 px-[1vw] py-[0.5vh]">
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
              <circle cx="5.5" cy="5.5" r="4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              <path d="M9 9L12 12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <span className="text-[11px] text-white/35">Search matters, contacts...</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-[#2a9d6e] px-[0.8vw] py-[0.5vh]">
            <span className="text-[11px] font-semibold text-white">Quick Intake</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 3L4 5L6 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Matters header */}
        <div className="flex items-center justify-between border-b border-[#f0f0ee] px-[1.5vw] py-[1.5vh]">
          <div>
            <h3 className="text-[16px] font-bold tracking-tight text-[#1a2332]">Matters</h3>
            <div className="mt-1.5 flex items-center gap-[1.2vw]">
              <span className="border-b-2 border-[#2b5ea7] pb-1 text-[11px] font-semibold text-[#2b5ea7]">Intake</span>
              <span className="pb-1 text-[11px] text-[#1a2332]/25">Hired</span>
              <span className="pb-1 text-[11px] text-[#1a2332]/25">Did Not Hire</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-[#2a9d6e] px-[0.8vw] py-[0.5vh]">
            <span className="text-[11px] font-semibold text-white">New Matter</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M2 3L4 5L6 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Kanban */}
        <div className="flex flex-1 gap-0">
          {columns.map((col, ci) => (
            <div
              key={col.title}
              className={`flex flex-1 flex-col ${ci < columns.length - 1 ? "border-r border-[#f0f0ee]" : ""}`}
            >
              <div className="px-[0.8vw] pb-[0.8vh] pt-[1.2vh]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1a2332]/35">
                  {col.title}
                </span>
              </div>
              <div className="space-y-[0.8vw] px-[0.8vw] pb-[1.5vh]">
                {col.cards.map((card, i) => (
                  <motion.div
                    key={card.name}
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + ci * 0.12 + i * 0.08, duration: 0.35 }}
                    className={`rounded-lg border bg-white p-[0.8vw] ${
                      card.claire ? "border-[#c4913c]/15" : "border-[#f0f0ee]"
                    }`}
                  >
                    <div className="mb-2 h-1.5 w-3/4 rounded-full bg-[#f0f0ee]" />
                    <div className="mb-2 flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#2a9d6e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#1a2332]" />
                    </div>
                    <p className="text-[12px] font-semibold tracking-tight text-[#1a2332]">{card.name}</p>
                    <p className="mt-0.5 text-[10px] text-[#1a2332]/30">{card.type}</p>
                    {card.claire && (
                      <div className="mt-2 flex items-center gap-1">
                        <img src="https://res.cloudinary.com/dwzsqumf6/image/upload/w_48,h_48,c_fill,q_auto,f_auto/v1765854413/Gemini_Generated_Image_dpj1j6dpj1j6dpj1.jpg" alt="ClaireAI" className="h-5 w-5 rounded-md object-cover" />
                        <span className="text-[9px] font-medium text-[#c4913c]/60">Added by ClaireAI</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
