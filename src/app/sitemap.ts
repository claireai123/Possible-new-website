import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";
import path from "node:path";
import { INTEGRATIONS } from "@/data/integrations";
import { HELP_ARTICLES } from "@/data/help-articles";

const BASE_URL = "https://theclaireai.com";
const ROOT = path.resolve(__dirname, "../..");
const FALLBACK_DATE = new Date();

/**
 * Resolve the last real edit timestamp for a file via `git log -1 --format=%cI`.
 *
 * Why: Google's sitemap docs (developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
 * say lastmod is only used "if consistently and verifiably accurate." Emitting `new Date()` on every URL
 * on every build trips Google's inaccuracy detection and causes the entire domain's lastmod to be ignored.
 * Per-file git mtime keeps the signal honest.
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
  { url: `${BASE_URL}/about`, source: "src/app/about/page.tsx" },
  { url: `${BASE_URL}/product`, source: "src/app/product/page.tsx" },
  { url: `${BASE_URL}/product/legal-intake`, source: "src/app/product/legal-intake/page.tsx" },
  { url: `${BASE_URL}/product/lead-iq`, source: "src/app/product/lead-iq/page.tsx" },
  { url: `${BASE_URL}/solutions/personal-injury`, source: "src/app/solutions/personal-injury/page.tsx" },
  { url: `${BASE_URL}/solutions/criminal-defense`, source: "src/app/solutions/criminal-defense/page.tsx" },
  { url: `${BASE_URL}/solutions/family-law`, source: "src/app/solutions/family-law/page.tsx" },
  { url: `${BASE_URL}/solutions/small-firms`, source: "src/app/solutions/small-firms/page.tsx" },
  { url: `${BASE_URL}/solutions/mid-size`, source: "src/app/solutions/mid-size/page.tsx" },
  { url: `${BASE_URL}/solutions/enterprise`, source: "src/app/solutions/enterprise/page.tsx" },
  { url: `${BASE_URL}/blog`, source: "src/app/blog/page.tsx" },
  { url: `${BASE_URL}/help`, source: "src/app/help/page.tsx" },
  { url: `${BASE_URL}/blog/2026-legal-intake-benchmark-report`, source: "src/data/posts.ts" },
  { url: `${BASE_URL}/compare-smith-ai`, source: "src/app/compare-smith-ai/page.tsx" },
  { url: `${BASE_URL}/compare-ruby-receptionists`, source: "src/app/compare-ruby-receptionists/page.tsx" },
  { url: `${BASE_URL}/privacy-policy`, source: "src/app/privacy-policy/page.tsx" },
  { url: `${BASE_URL}/terms-of-service`, source: "src/app/terms-of-service/page.tsx" },
  { url: `${BASE_URL}/careers`, source: "src/app/careers/page.tsx" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const core: Entry[] = corePages.map(({ url, source }) => ({
    url,
    lastModified: gitMtime(source),
  }));

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

  return [...core, ...help, ...integrations];
}
