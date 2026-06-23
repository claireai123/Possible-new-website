# Cloudflare Live-State Audit — theclaireai.com

**Date:** 2026-06-22/23
**Zone:** theclaireai.com · zone_id `f6645555c0ab4290c4eff77d780266d4` · account `7b6c395f95e746a637d7b0572ae65131` · **plan Enterprise Website** · status active
**Origin:** Cloudflare Pages project `claireaiwebsite` (static Next.js export), apex CNAME-flattened to `claireaiwebsite.pages.dev` (proxied).

## Method & honest limitations
- The API token in `.env.local` (`cfut…`) is **narrowly scoped** (DNS + zone-read). It returned `9109 Unauthorized` for **Zone Settings, Page Rules**, `10000` for **all rulesets phases**, and `null` for **bot_management**. So the speed toggles (Argo, Polish, Speed Brain, Rocket Loader, compression rules, Tiered Cache) and the bot/AI control toggles **could not be read from the control plane**.
- Reading the broader **wrangler OAuth token** was **correctly blocked by the environment's credential guardrail**; I did not work around it.
- Therefore the control-plane state was verified **functionally** instead: by requesting the site **as each AI crawler** (UA spoof from a non-bot IP) and by inspecting **served response headers** and **DNS**. These are strong signals but not a substitute for a dashboard read. **Action for user:** confirm the four AI toggles in the dashboard (checklist at end).

---

## AI CRAWLER ACCESS — the headline (GOOD)

Functional test — GET `https://theclaireai.com/` with each User-Agent:

| Crawler (role) | Result |
|---|---|
| GPTBot (OpenAI training) | **200** |
| OAI-SearchBot (ChatGPT citation gatekeeper) | **200** |
| ChatGPT-User (live fetch) | **200** |
| ClaudeBot (Anthropic training) | **200** |
| Claude-SearchBot (Claude citation gatekeeper) | **200** |
| Claude-User (live fetch) | **200** |
| PerplexityBot (Perplexity citation gatekeeper) | **200** |
| Googlebot (AIO/AI Mode + Search) | **200** |
| Normal browser | **200** |

**Verdict: no AI crawler is being blocked.** The four deny-by-default traps (per `12-cloudflare-enterprise-best-practice-2026.md`) assessed:
1. **"Block AI bots" toggle** — functionally **OFF** (every citation bot returns 200; the toggle blocks by UA even from non-bot IPs, so a block would have shown). *Confirm in dashboard.*
2. **Managed robots.txt** — **OFF**. The served `robots.txt` is the repo's hand-authored file (custom Content-Signal + per-bot Allow blocks), **not** a Cloudflare-injected `Disallow:/` set.
3. **Content Signals** — present and **mostly favorable**: `search=yes, ai-input=yes, ai-train=no`. `ai-input=yes` is the citation-governing signal — correct. **`ai-train=no` is the one flag** (see below).
4. **Pay-per-crawl** — functionally **OFF** (bots get 200, not 402).

### ⚠️ The one AI flag: `ai-train=no`
robots.txt declares `ai-train=no` to compliant model trainers. Per `11-ai-citation-mechanics-2026.md` (Q-D): blocking *training* is low-value and does **not** affect *citation*, but for a brand that *wants* AI mindshare, telling foundation-model trainers "don't learn ClaireAI exists" works against long-term recall. **Recommendation:** flip to `ai-train=yes` (or drop the restriction) unless a content-licensing strategy says otherwise. Low effort, repo-only (`public/robots.txt`).

---

## Cache & headers reality (served, verified by curl)

| Surface | Served value | Verdict |
|---|---|---|
| HTML (`/`) | `cache-control: public, max-age=0, must-revalidate`; `cf-cache-status: HIT` (age ~1500s) | OK — edge caches HTML; browser revalidates (fine for a frequently-updated site) |
| **Hashed static assets** (`/_next/static/chunks/*.js`) | `cache-control: public, max-age=0, must-revalidate`; cf-cache HIT | **🔴 WRONG** — content-hashed immutable files force a browser revalidation every repeat view. Should be `max-age=31536000, immutable`. |
| RFC 8288 Link headers | all 5 present (api-catalog, service-doc, describedby, sitemap, agent-skills) | ✅ |
| HSTS | `max-age=31536000; includeSubDomains; preload` | ✅ (free, on) |
| HTTP/3 | `alt-svc: h3` advertised | ✅ |
| Compression | `br` ✅, `gzip` ✅, **`zstd` → uncompressed** | 🟠 zstd not enabled (minor: real browsers offer br, so they get br; only zstd-only clients lose out). |

**Fix for assets:** add to `public/_headers` (ships with deploy, version-controlled — the recommended mechanism for a static export):
```
/_next/static/*
  Cache-Control: public, max-age=31536000, immutable
```
Optionally back it with a Cloudflare **Cache Rule** (Browser TTL override, by extension) — but `_headers` alone fixes the browser layer, which is where the bug is.

---

## DNS

| Record | Value | Verdict |
|---|---|---|
| apex `theclaireai.com` | CNAME → `claireaiwebsite.pages.dev`, **proxied** | ✅ correct |
| **`www.theclaireai.com`** | CNAME → `apex-loadbalancer.netlify.com`, proxied | **🔴 BROKEN — returns HTTP 526** (invalid SSL at dead Netlify backend). Every www visitor hits a Cloudflare error page. |
| DNSSEC | **active**; DS present at `.com` parent (algo 13 ECDSAP256SHA256) | ✅ **RESOLVED** (was "pending" on 2026-06-19; now fully chained) |
| DNS-AID | HTTPS/SVCB + TXT for `_api-catalog._agents` / `_index._agents` | Present; ~zero citation value (harmless) |
| Email | SPF, DKIM (google), DMARC `p=quarantine`, BIMI | ✅ configured |

**🔴 Fix www (highest-severity infra item):** either (a) add `www.theclaireai.com` as a custom domain on the `claireaiwebsite` Pages project, or (b) repoint the CNAME to `claireaiwebsite.pages.dev`, then add a **Redirect Rule** `www → apex` (301). Apex is canonical; www must not serve a second/stale origin.

---

## Speed features NOT readable via token (verify in dashboard; recommendations from research)
- **Rocket Loader** — must be **OFF** (breaks Next/React hydration). *Verify.*
- **Argo / Cache Reserve** — recommend **skip** (static-edge content; little origin to optimize).
- **Smart Tiered Cache** — recommend **ON** (free); Pages already serves assets through tiered cache.
- **Speed Brain** — recommend **ON** (Enterprise zones don't get it by default; speeds next-nav prefetch).
- **Polish / Transformations** — **MOOT**: all images are Cloudinary-hosted (off-domain `res.cloudinary.com`), so Cloudflare image products don't apply. Image optimization is Cloudinary's job (already `f_auto,q_auto`).
- **Observatory + RUM** — RUM/Web Analytics is auto-injected on the proxied custom domain (free); use it for real CWV (see `23-performance-audit.md`).

---

## Recommended changes (ranked)
1. **🔴 Fix `www` 526** (add www to Pages custom domains or redirect www→apex).
2. **🔴 Asset caching**: `/_next/static/*` → `max-age=31536000, immutable` in `_headers`.
3. **🟠 `ai-train=no` → `ai-train=yes`** in robots.txt (brand mindshare; citation-neutral).
4. **🟠 Dashboard pre-flight confirm**: Block AI bots OFF · Managed robots.txt OFF · Pay-per-crawl OFF · SBFM verified+AI = Allow · Rocket Loader OFF.
5. **🟢 Speed Brain ON, Smart Tiered Cache ON** (free Enterprise wins).
6. **🟢 zstd Compression Rule** (minor).
