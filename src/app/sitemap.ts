import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { INTEGRATIONS } from "@/data/integrations";
import { HELP_ARTICLES } from "@/data/help-articles";
import { POSTS } from "@/data/posts";

const BASE_URL = "https://theclaireai.com";
// process.cwd() is the project root during `next build` and `next dev`.
// The previous path.resolve(__dirname, "../..") resolved to .next/ at build
// time, silently making `git log -- "<path>"` return nothing — every URL
// then fell back to `new Date()` and shipped the same lastmod, which trips
// Google's lastmod-inaccuracy detection.
const ROOT = process.cwd();
const FALLBACK_DATE = new Date();

/**
 * Resolve the last real edit timestamp for a file via `git log -1 --format=%cI`.
 *
 * Google's sitemap docs say lastmod is only honored "if consistently and
 * verifiably accurate." Per-file git mtime keeps the signal honest.
 */
function gitMtime(relativePath: string): Date {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${relativePath}"`, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return iso ? new Date(iso) : FALLBACK_DATE;
  } catch {
    return FALLBACK_DATE;
  }
}

type Entry = { url: string; lastModified: Date };

const corePages: { url: string; source: string }[] = [
  { url: BASE_URL, source: "src/app/page.tsx" },
  { url: `${BASE_URL}/how-it-works`, source: "src/app/how-it-works/page.tsx" },
  { url: `${BASE_URL}/pricing`, source: "src/app/pricing/page.tsx" },
  { url: `${BASE_URL}/integrations`, source: "src/app/integrations/page.tsx" },
  { url: `${BASE_URL}/contact`, source: "src/app/contact/page.tsx" },
  { url: `${BASE_URL}/product`, source: "src/app/product/page.tsx" },
  { url: `${BASE_URL}/product/lead-iq`, source: "src/app/product/lead-iq/page.tsx" },
  { url: `${BASE_URL}/solutions`, source: "src/app/solutions/page.tsx" },
  { url: `${BASE_URL}/solutions/personal-injury`, source: "src/app/solutions/personal-injury/page.tsx" },
  { url: `${BASE_URL}/solutions/criminal-defense`, source: "src/app/solutions/criminal-defense/page.tsx" },
  { url: `${BASE_URL}/solutions/family-law`, source: "src/app/solutions/family-law/page.tsx" },
  { url: `${BASE_URL}/blog`, source: "src/app/blog/page.tsx" },
  { url: `${BASE_URL}/help`, source: "src/app/help/page.tsx" },
];

/**
 * In production builds, fail loudly if a sitemap row references a file that
 * does not exist. This catches the class of bug where a route is removed but
 * its sitemap row is forgotten, and Google ends up crawling 404s.
 */
function assertSourceExists(source: string): void {
  const abs = path.resolve(ROOT, source);
  if (fs.existsSync(abs)) return;
  const msg = `[sitemap] ${source} referenced in corePages but file does not exist`;
  if (process.env.NODE_ENV === "production") {
    throw new Error(msg);
  }
  console.warn(msg);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const core: Entry[] = corePages.map(({ url, source }) => {
    assertSourceExists(source);
    return { url, lastModified: gitMtime(source) };
  });

  // Blog posts — every entry in POSTS becomes a sitemap row. Lastmod uses the
  // post's own `lastUpdated` string when parseable, falling back to posts.ts
  // git mtime so removing-a-post-from-array doesn't ship a stale date for it.
  const postsDataMtime = gitMtime("src/data/posts.ts");
  const blog: Entry[] = POSTS.map((p) => {
    const dateStr = p.lastUpdated ?? p.date;
    const parsed = dateStr ? new Date(dateStr) : null;
    return {
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: parsed && !isNaN(parsed.getTime()) ? parsed : postsDataMtime,
    };
  });

  const integrationsLastMod = gitMtime("src/data/integrations.ts");
  const integrationSlugTemplateLastMod = gitMtime("src/app/integrations/[slug]/page.tsx");
  const perIntegrationLastMod = integrationsLastMod > integrationSlugTemplateLastMod
    ? integrationsLastMod
    : integrationSlugTemplateLastMod;

  const integrations: Entry[] = INTEGRATIONS.map((i) => ({
    url: `${BASE_URL}/integrations/${i.id}`,
    lastModified: perIntegrationLastMod,
  }));

  // Help articles: use each article's own lastUpdated, falling back to git mtime
  // of the data file. Per-article dates are honest signals to Google and to
  // AI crawlers that re-index when content changes.
  const helpDataMtime = gitMtime("src/data/help-articles.ts");
  const help: Entry[] = HELP_ARTICLES.map((a) => {
    const parsed = new Date(a.lastUpdated + "T00:00:00Z");
    return {
      url: `${BASE_URL}/help/${a.slug}`,
      lastModified: !isNaN(parsed.getTime()) ? parsed : helpDataMtime,
    };
  });

  return [...core, ...blog, ...help, ...integrations];
}
