// Founder + team data drives /team/[slug] static-export pages.
// Each member emits a Schema.org Person with sameAs links to public
// profiles — this is the canonical author/founder identity Google uses
// for E-E-A-T attribution.

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  isFounder?: boolean;
  bio: string;
  knowsAbout: string[];
  sameAs: string[];
  jobTitle: string;
};

export const TEAM: TeamMember[] = [
  {
    slug: "tiago-stram",
    name: "Tiago Stram",
    role: "Co-founder & CEO",
    isFounder: true,
    jobTitle: "Co-founder & Chief Executive Officer",
    bio: "Tiago co-founded ClaireAI in 2024 to build the AI receptionist purpose-built for U.S. law firms. Before ClaireAI he spent time inside legal operations watching the same pattern repeat: the first phone call to a firm — the moment a person decides whether they've found help — too often ended in a voicemail. ClaireAI exists to fix that specific problem. He lives in Miami.",
    knowsAbout: [
      "AI receptionist for law firms",
      "Legal intake operations",
      "Conflict screening under Model Rule 1.18",
      "Personal injury intake automation",
      "Criminal defense intake automation",
      "Family law intake automation",
      "Voice AI infrastructure",
      "B2B SaaS go-to-market",
    ],
    sameAs: [
      "https://www.linkedin.com/in/tiagostram",
      "https://x.com/tiagostram",
    ],
  },
  {
    slug: "cal-stein",
    name: "Cal Stein",
    role: "Co-founder & CTO",
    isFounder: true,
    jobTitle: "Co-founder & Chief Technology Officer",
    bio: "Cal co-founded ClaireAI in 2024 and leads engineering. The platform's voice pipeline, CRM-integration architecture, and Lead IQ scoring model all run through his team. Cal cares about latency, calibration, and shipping code that holds up to a managing partner reading the transcript at 9 p.m.",
    knowsAbout: [
      "Voice AI systems",
      "Real-time conversational pipelines",
      "Speech-to-text and TTS infrastructure",
      "LiveKit voice infrastructure",
      "Legal CRM integration architecture",
      "AI lead scoring",
      "Distributed systems",
      "AWS infrastructure",
    ],
    sameAs: [
      "https://www.linkedin.com/in/calstein",
    ],
  },
];

export function getTeamMember(slug: string): TeamMember | undefined {
  return TEAM.find((m) => m.slug === slug);
}
