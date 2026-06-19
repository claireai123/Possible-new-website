"use client";

import { useEffect } from "react";
import { INTEGRATIONS } from "@/data/integrations";

// ──────────────────────────────────────────────────────────────────────────
// WebMCP — exposes ClaireAI's brand actions to AI agents running in the
// browser (e.g. Chrome with WebMCP, Anthropic's browser tool). The agent
// calls navigator.modelContext.getTools() to discover what it can do, then
// invokes the tools directly without scraping HTML.
//
// Spec: https://webmachinelearning.github.io/webmcp/
// Chrome dev preview: https://developer.chrome.com/blog/webmcp-epp
//
// All tools here are read-or-navigate only. None mutate server state or
// submit forms on the user's behalf — the user still owns final confirmation
// in /contact and /pricing flows.
// ──────────────────────────────────────────────────────────────────────────

type ModelContextTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input: Record<string, unknown>) => Promise<unknown> | unknown;
};

type ModelContext = {
  provideContext?: (ctx: { tools: ModelContextTool[] }) => void | Promise<void>;
  removeContext?: (toolNames: string[]) => void | Promise<void>;
};

declare global {
  interface Navigator {
    modelContext?: ModelContext;
  }
}

const TOOLS: ModelContextTool[] = [
  {
    name: "book_demo",
    description:
      "Open the ClaireAI demo booking page. Optionally prefill the firm name, practice area, email, and phone via URL query params so the user only needs to confirm and submit. Returns the destination URL.",
    inputSchema: {
      type: "object",
      properties: {
        firm_name: { type: "string", description: "Law firm name" },
        practice_area: {
          type: "string",
          enum: [
            "personal-injury",
            "criminal-defense",
            "family-law",
            "immigration-law",
            "other",
          ],
        },
        email: { type: "string", format: "email" },
        phone: { type: "string", description: "E.164 or US national format" },
      },
      additionalProperties: false,
    },
    execute: (input) => {
      const params = new URLSearchParams();
      const set = (k: string, v: unknown) =>
        typeof v === "string" && v.length > 0 ? params.set(k, v) : null;
      set("firm", input.firm_name as string);
      set("practice", input.practice_area as string);
      set("email", input.email as string);
      set("phone", input.phone as string);
      const query = params.toString();
      const url = `/contact${query ? `?${query}` : ""}`;
      if (typeof window !== "undefined") window.location.assign(url);
      return { ok: true, url };
    },
  },
  {
    name: "get_pricing",
    description:
      "Return ClaireAI's current published plan pricing, included call volume, and ROI assumptions. Source: /llms.txt and /pricing — fetch those URLs for the full machine-readable knowledge.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: () => ({
      currency: "USD",
      billing: "monthly",
      free_trial_days: 7,
      plans: [
        {
          id: "starter",
          name: "Starter",
          monthly_price: 650,
          included_calls_per_month: 100,
          target: "Solo practitioners",
        },
        {
          id: "growth",
          name: "Growth",
          monthly_price: 1299,
          included_calls_per_month: 500,
          target: "Small firms",
        },
        {
          id: "enterprise",
          name: "Enterprise",
          monthly_price: 2999,
          included_calls_per_month: null,
          included_calls_note: "Unlimited",
          target: "Multi-office firms",
        },
      ],
      pricing_url: "https://theclaireai.com/pricing",
      knowledge_url: "https://theclaireai.com/llms.txt",
    }),
  },
  {
    name: "find_integration",
    description:
      "Search ClaireAI's integration directory for a CRM, phone system, document platform, or other tool by name. Returns the integration record if supported, or null if not.",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description:
            "CRM or tool name (case-insensitive). Examples: 'Clio', 'Filevine', 'MyCase', 'Salesforce', 'HubSpot'.",
        },
      },
      required: ["name"],
      additionalProperties: false,
    },
    execute: (input) => {
      const q = String(input.name ?? "")
        .trim()
        .toLowerCase();
      if (!q) return { match: null };
      const match = INTEGRATIONS.find(
        (i) => i.name.toLowerCase() === q || i.id.toLowerCase() === q
      );
      if (!match) {
        const partial = INTEGRATIONS.find((i) =>
          i.name.toLowerCase().includes(q)
        );
        return {
          match: partial
            ? {
                id: partial.id,
                name: partial.name,
                category: partial.category,
                status: partial.status,
                docs: partial.docsUrl ?? null,
                exact: false,
              }
            : null,
          directory_url: "https://theclaireai.com/integrations",
        };
      }
      return {
        match: {
          id: match.id,
          name: match.name,
          category: match.category,
          status: match.status,
          docs: match.docsUrl ?? null,
          exact: true,
        },
        directory_url: "https://theclaireai.com/integrations",
      };
    },
  },
  {
    name: "get_contact_info",
    description:
      "Return the primary sales/support contact channels for ClaireAI: phone, email, and demo-booking URL.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
    execute: () => ({
      phone_e164: "+15612505789",
      phone_display: "+1 (561) 250-5789",
      sales_email: "contact@theclaireai.com",
      demo_url: "https://theclaireai.com/contact",
      languages: ["English", "Spanish"],
      hours: "24/7/365",
    }),
  },
];

export function WebMcpTools() {
  useEffect(() => {
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (!nav?.modelContext?.provideContext) return;
    const names = TOOLS.map((t) => t.name);
    try {
      void nav.modelContext.provideContext({ tools: TOOLS });
    } catch {
      // WebMCP is browser-experimental — fail closed, never throw into render.
    }
    return () => {
      try {
        void nav.modelContext?.removeContext?.(names);
      } catch {
        // ignore
      }
    };
  }, []);
  return null;
}
