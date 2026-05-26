# Cloudflare Optimization + Search Console Runbook
**Plan**: Cloudflare Enterprise Website (confirmed via API on zone `f6645555c0ab4290c4eff77d780266d4`)
**Created**: 2026-05-26 post-cutover

All toggles below are dashboard-only — Cloudflare's OAuth scopes don't allow setting them via wrangler. Times are estimates per item.

---

## A. Cloudflare zone optimizations
**Path for all**: `dash.cloudflare.com → theclaireai.com zone → <Section>`

### A1. Speed → Optimization
| Setting | Value | Why | Time |
|---------|-------|-----|------|
| **Auto Minify** (HTML/CSS/JS) | **OFF for all three** | Next.js already minifies. Double-minifying breaks the JS occasionally + adds build-time cost. | 30s |
| **Brotli** | **ON** | Better compression than gzip; Cloudflare default but verify. | 10s |
| **Rocket Loader** | **OFF** | Rewrites `<script>` tags, breaks React hydration on Next.js apps. Common gotcha — leave OFF. | 10s |
| **Early Hints** | **ON** | Sends HTTP 103 ahead of 200 with preload directives. Free LCP improvement, no code change. | 10s |
| **Speed Brain** | **ON** (Enterprise) | Predictive prefetching for instant next-page nav. Already partially on per response headers. | 10s |
| **HTTP/3 (QUIC)** | **ON** | Faster connection setup over UDP. | 10s |
| **0-RTT Connection Resumption** | **ON** | Sub-RTT TLS resumption for repeat visitors. | 10s |

### A2. Caching → Configuration
| Setting | Value | Why | Time |
|---------|-------|-----|------|
| **Browser Cache TTL** | `Respect Existing Headers` | Next.js emits correct cache headers; don't override. | 10s |
| **Crawler Hints** | **ON** | Tells Bing/IndexNow when content changes — no integration needed beyond toggling. | 10s |
| **Tiered Cache** | **Enable Tiered Caching → Smart Tiering** | Enterprise feature. Reduces origin egress + faster repeat-pop hits. | 30s |
| **Always Online** | **ON** | Serves cached HTML if origin goes down. | 10s |

### A3. Caching → Cache Rules (one rule)
Create a single rule for static asset aggressive caching:
- **Rule name**: `Static assets - long TTL`
- **When**: URI Path matches `/_next/static/*` OR URI Path matches `*.css` OR `*.js` OR `*.woff2` OR `*.png` OR `*.jpg` OR `*.svg`
- **Then**:
  - Cache eligibility: **Eligible for cache**
  - Edge TTL: **1 year** (Override origin)
  - Browser TTL: **1 year**

Static assets get hashed filenames so a 1-year cache is safe — when content changes, the URL changes.
Time: 2 min.

### A4. SSL/TLS → Edge Certificates
| Setting | Value | Why | Time |
|---------|-------|-----|------|
| **Always Use HTTPS** | **ON** | Force redirect from any http→https. | 10s |
| **Minimum TLS Version** | **TLS 1.2** | Drop TLS 1.0/1.1 attacks. | 10s |
| **TLS 1.3** | **ON** | Faster handshake + better security. | 10s |
| **HSTS** | **Enable** with max-age 12mo, include subdomains, **NoSniff**, **Preload** ON | Forces browsers to remember HTTPS. Hardens against downgrade. | 30s |
| **Automatic HTTPS Rewrites** | **ON** | Auto-rewrites any `http://` link in HTML. | 10s |

### A5. Speed → Image Optimization (Enterprise)
| Setting | Value | Why | Time |
|---------|-------|-----|------|
| **Polish** | **Lossy** + **WebP** ON | Compresses Cloudinary PNG/JPG further at the edge. Cloudinary already serves WebP/AVIF via `f_auto`, so the Polish layer is mostly redundant — but harmless. | 10s |
| **Mirage** | **ON** | Image-loading optimization for low-bandwidth mobile devices. Worth it. | 10s |

### A6. Security → Bots
| Setting | Value | Why | Time |
|---------|-------|-----|------|
| **Super Bot Fight Mode** | **Configured per category**: Verified bots ALLOW (lets Googlebot/GPTBot/ClaudeBot through). Definitely-automated traffic CHALLENGE. Likely-automated leave at default. | Keeps real search/AI crawlers in, blocks scrapers. | 1 min |
| **Bot Score → Cache** | Cache only when bot score > 30 | Prevents scrapers from poisoning cache. | 1 min |

### A7. Workers & Pages → claireaiwebsite → Settings
| Setting | Value |
|---------|-------|
| Build command | `npm run build` (already set via API) |
| Build output directory | `out` (already set via API) |
| Environment variable `NODE_VERSION` | `20` (already set via API) |
| **Git source** | **Switch from `claireai123/CLAIREAI-website` to `claireai123/Possible-new-website`** ← THIS STILL NEEDS YOUR CLICK |

The Git source switch is the only thing I couldn't do from API. Once you reconnect, every `git push origin main` auto-deploys.

---

## B. Google Search Console
**URL**: search.google.com/search-console

### B1. Verify the property (if not already)
- Property type: **Domain** (covers http/https + all subdomains) — best option since DNS is on Cloudflare, just add the TXT record they give you in the DNS tab.
- If you already have a property, skip.

### B2. Submit the sitemap (the only required action after this deploy)
1. Left sidebar → **Sitemaps**
2. Enter `sitemap.xml` (Search Console will prepend `https://theclaireai.com/`)
3. **Submit**
4. Status should go from "Couldn't fetch" → "Success" within 10-60 min

### B3. Request re-indexing of the homepage (priority)
1. Top URL bar → paste `https://theclaireai.com/`
2. Click **URL Inspection** result → wait for it to test the live URL
3. Click **Request Indexing**
4. Repeat for `/pricing` and `/contact` (your 3 highest-value pages)

GSC has a quota of ~10 manual indexing requests per day — use them on the pages that matter most.

### B4. Configure (one-time)
- **Settings → Crawl rate**: leave at "Let Google optimize" unless you see crawl errors
- **Settings → Property settings → International targeting**: country = United States
- **Indexing → Pages**: monitor for any new "Not indexed" entries after the deploy — `/about` will appear as "Page with redirect" which is expected (we 301 to /)

### B5. Watch over the next 1-2 weeks
- **Pages → Indexed** count should rise to ~95 (matching sitemap)
- **Crawl stats** — should see a fetch spike as Google re-crawls everything after a major change

---

## C. Bing Webmaster Tools
**URL**: bing.com/webmasters

### C1. Verify + import from Google Search Console (fast path)
1. Sign in
2. **Add a site** → enter `https://theclaireai.com/`
3. **Import from Google Search Console** option appears — use it. Pulls verification + sitemap from GSC automatically. Saves ~10 min.

### C2. Submit sitemap explicitly (belt + suspenders)
- **Sitemaps** → **Submit sitemap** → `https://theclaireai.com/sitemap.xml`

### C3. Enable IndexNow integration
Bing supports **IndexNow** — when your content changes, you ping a single endpoint and Bing/Yandex/Naver/Seznam all get notified at once. Two paths:

**Path 1 — Cloudflare Crawler Hints (already enabled in A2)**: Cloudflare automatically publishes IndexNow updates when it sees content change. Zero code, free, works for Bing immediately.

**Path 2 — Manual IndexNow key on the site**: only needed if you skip Cloudflare's Crawler Hints. Add an IndexNow API key file at `public/<key>.txt`. Skip if A2 is done.

### C4. Optional: Bing search settings
- **Configure My Site → Crawl Control**: leave at default
- **SEO → Backlinks**: monitor for new inbound links after the launch

---

## D. The order I'd do these in (3 sessions, ~30 min total)

**Session 1 (10 min) — Right now, blockers**
1. Click **"Purge Everything"** on theclaireai.com Caching → Configuration (still needed from earlier)
2. Reconnect Git source: claireaiwebsite project → Settings → Builds & deployments → switch repo from `CLAIREAI-website` to `Possible-new-website`
3. Do A1 + A2 + A4 (Speed/Cache/SSL toggles)

**Session 2 (10 min) — High-impact optimization**
1. A3 — Cache Rule for static assets
2. A5 — Polish + Mirage
3. A6 — Super Bot Fight Mode

**Session 3 (10 min) — Tell the search engines**
1. B2 — GSC submit sitemap
2. B3 — Request re-indexing on top 3 pages
3. C1+C2 — Bing add site + import sitemap

---

## E. What I just did for you in this session (no clicks needed)
- ✅ Mobile drawer link tap targets: 36px → 48px (WCAG AAA)
- ✅ Footer link tap targets: 32px → 44px on mobile only (WCAG AA)
- ✅ Added favicon via Next.js metadata (eliminates favicon.ico 404 hit)
- ✅ Built + deployed latest to `claireaiwebsite` Pages project (`458afa4`)
- ✅ Pages project build_config set: `npm run build` / output `out` / `NODE_VERSION=20`

The "preloaded but not used" warnings in the browser console are Cloudflare Speed Brain doing predictive prefetch — feature, not bug. Lighthouse may flag it but real users get faster nav. Leave on.
