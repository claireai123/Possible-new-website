# Agent Discovery — Implementation Notes

Date: 2026-06-19
Audit source: Cloudflare AI optimization scan (isitagentready.com)

This document tracks every recommendation the Cloudflare AI-readiness scan
returned for `theclaireai.com`. It records what was implemented in the repo,
what needs to be done manually outside the repo (DNS), and what was skipped
for a documented reason.

---

## Shipped in this commit

| # | Recommendation | Where it lives |
|---|---|---|
| 1 | Content-Signal directives in robots.txt | `public/robots.txt` |
| 2 | RFC 8288 Link headers for agent discovery | `public/_headers` |
| 3 | `/.well-known/api-catalog` (RFC 9727 linkset) | `public/.well-known/api-catalog` |
| 4 | `/.well-known/agent-skills/index.json` (v0.2.0) | `public/.well-known/agent-skills/index.json` |
| 5 | WebMCP browser-tool registration | `src/components/agent/web-mcp-tools.tsx` + mounted in `src/app/layout.tsx` |

### How to verify after deploy

```bash
# Link headers
curl -sI https://theclaireai.com/ | grep -i ^link

# Content-Signal in robots.txt
curl -s https://theclaireai.com/robots.txt | grep Content-Signal

# Discovery documents
curl -sI https://theclaireai.com/.well-known/api-catalog | grep -i content-type
curl -s   https://theclaireai.com/.well-known/api-catalog | jq .
curl -s   https://theclaireai.com/.well-known/agent-skills/index.json | jq .

# Agent-skills digest is honest
DIGEST=$(curl -s https://theclaireai.com/llms.txt | shasum -a 256 | awk '{print $1}')
echo "expected $DIGEST"
curl -s https://theclaireai.com/.well-known/agent-skills/index.json | jq -r '.skills[0].sha256'
```

If `llms.txt` changes, **update the `sha256` in `agent-skills/index.json`** —
add this to the release checklist.

---

## Needs manual deploy (DNS — not in repo)

### DNS for AI Discovery (DNS-AID)

DNS-AID publishes agent entrypoints via SVCB / HTTPS records under a
`_<service>._agents.<domain>` name. These records cannot be deployed from a
Cloudflare Pages repo; they must be added in **Cloudflare DNS → theclaireai.com**.

Records to add (one at a time, via the dashboard):

| Name | Type | Priority | Target | SvcParams |
|---|---|---|---|---|
| `_index._agents.theclaireai.com` | HTTPS | 1 | `theclaireai.com.` | `alpn="h2,http/1.1" endpoint="/.well-known/agent-skills/index.json"` |
| `_api-catalog._agents.theclaireai.com` | HTTPS | 1 | `theclaireai.com.` | `alpn="h2,http/1.1" endpoint="/.well-known/api-catalog"` |

Then enable DNSSEC for `theclaireai.com` if it isn't already:
**Cloudflare → DNS → Settings → DNSSEC → Enable**. Copy the DS record
Cloudflare emits and paste it into the registrar (likely Cloudflare Registrar
already; in which case it's one-click).

Verification once propagated (5–30 min):

```bash
dig +short HTTPS _index._agents.theclaireai.com
dig +short HTTPS _api-catalog._agents.theclaireai.com
dig +dnssec theclaireai.com SOA | grep -E 'RRSIG|ad flag'
```

Specs: <https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/>,
<https://www.rfc-editor.org/rfc/rfc9460>

---

## Skipped — with reasons

The Cloudflare scan flagged several items that do not apply to a static
marketing-site host. Publishing fabricated discovery for them would mislead
agents (a card pointing at a non-existent MCP server, or OAuth metadata
without a real authorization server, both cause agents to fail mid-task).
We will revisit each item if/when the underlying capability ships.

| Recommendation | Why skipped | Revisit when |
|---|---|---|
| `/.well-known/mcp/server-card.json` (SEP-1649) | No MCP server backs `theclaireai.com`. Marketing site is a static export; `api.theclaireai.com` does not expose MCP. | An MCP server is deployed. Card should live on the MCP host itself. |
| `/.well-known/openid-configuration` / `oauth-authorization-server` (RFC 8414 / OIDC Discovery) | No protected APIs on this host. Customer auth lives on `portal.theclaireai.com` (Supabase). | Discovery documents should be published on the OAuth issuer host, not the marketing brand host. |
| `/.well-known/oauth-protected-resource` (RFC 9728) | Same — there is no protected resource on this host. | Publish on `api.theclaireai.com` when we open a public API surface. |
| `/auth.md` (WorkOS) | Documents agent registration for an API. No agent-facing API on this host. | Same trigger as OAuth: when an external API surface ships. |
| `/.well-known/acp.json` (Agentic Commerce Protocol) | ClaireAI is sold via sales calls. No self-serve agent checkout. | If/when a self-serve plan with agentic checkout goes online. |
| `/.well-known/ucp` (Universal Commerce Protocol) | Same as ACP — no commerce surface. | Same trigger as ACP. |
| x402 payment protocol | No paid HTTP endpoints. ClaireAI is invoice-billed, not pay-per-API-call. | If we ship a metered public API. |
| MPP (Machine Payment Protocol) | Same — no payable routes. | Same trigger as x402. |

---

## Release checklist (when changing knowledge content)

1. If `public/llms.txt` changed, recompute its sha256 and update
   `public/.well-known/agent-skills/index.json` → `skills[].sha256`.

   ```bash
   shasum -a 256 public/llms.txt | awk '{print $1}'
   ```

2. If new top-level pages are added or removed, consider whether they belong
   in `/.well-known/api-catalog` under `related[]`.

3. If a new integration is added to `src/data/integrations.ts`, the WebMCP
   `find_integration` tool picks it up automatically — no change needed.
