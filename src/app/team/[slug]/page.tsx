import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TEAM, getTeamMember } from "@/data/team";

const BASE_URL = "https://theclaireai.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return TEAM.map((m) => ({ slug: m.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const m = getTeamMember(slug);
  if (!m) return { title: "Not found" };
  const url = `${BASE_URL}/team/${m.slug}`;
  const description = `${m.name} — ${m.jobTitle} at ClaireAI. ${m.bio.slice(0, 120)}`;
  return {
    title: `${m.name} — ${m.role}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${m.name} — ${m.role} at ClaireAI`,
      description,
      url,
      type: "profile",
    },
  };
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const m = getTeamMember(slug);
  if (!m) notFound();

  const url = `${BASE_URL}/team/${m.slug}`;

  // Person schema — knowsAbout + sameAs are the load-bearing fields for
  // E-E-A-T attribution. worksFor links the founder back to the
  // Organization @id in layout.tsx so the entity graph stays connected.
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${url}#person`,
    name: m.name,
    jobTitle: m.jobTitle,
    description: m.bio,
    url,
    worksFor: { "@id": `${BASE_URL}/#organization` },
    ...(m.sameAs.length > 0 ? { sameAs: m.sameAs } : {}),
    knowsAbout: m.knowsAbout,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Team", item: `${BASE_URL}/team` },
      { "@type": "ListItem", position: 3, name: m.name, item: url },
    ],
  };

  return (
    <main className="bg-[#fbfbf9] text-[#0a0a0a]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="px-6 pt-[88px] pb-12">
        <div className="mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.12em] text-[#0a0a0a]/45">
            <Link href="/" className="hover:text-[#0a0a0a]">ClaireAI</Link>
            <span className="px-2 text-[#0a0a0a]/25">/</span>
            <span>Team</span>
          </nav>
          <p className="mt-12 text-[12px] uppercase tracking-[0.2em] text-[#0a0a0a]/40">{m.role}</p>
          <h1
            className="mt-6 text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2.5rem, 7vw, 96px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: "0.95",
            }}
          >
            {m.name}
          </h1>
        </div>
      </section>

      <section className="px-6 pb-[140px] border-t border-[#0a0a0a]/[0.08]">
        <div className="mx-auto max-w-[1100px] pt-16">
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 md:grid-cols-[1fr_2fr]">
            <div className="md:sticky md:top-24 md:self-start">
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/45">Role</p>
              <p className="mt-3 text-[15px] text-[#0a0a0a]">{m.role}</p>
              <p className="mt-1 text-[13.5px] text-[#0a0a0a]/55">ClaireAI &middot; Miami, FL</p>
              {m.sameAs.length > 0 && (
                <>
                  <p className="mt-8 text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/45">Profiles</p>
                  <ul className="mt-3 space-y-2">
                    {m.sameAs.map((href) => {
                      const host = new URL(href).hostname.replace(/^www\./, "").replace(/^x\.com$/, "X");
                      const label = host.split(".")[0];
                      return (
                        <li key={href}>
                          <a href={href} target="_blank" rel="noopener noreferrer me" className="inline-flex items-center gap-2 text-[15px] text-[#0a0a0a] underline decoration-[#0a0a0a]/25 underline-offset-[3px] hover:decoration-[#0a0a0a]">
                            {label.charAt(0).toUpperCase() + label.slice(1)}
                            <span aria-hidden="true">↗</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}
            </div>

            <div>
              <p className="text-[#0a0a0a]" style={{ fontSize: "clamp(20px, 2vw, 22px)", lineHeight: "1.55", letterSpacing: "-0.005em", fontWeight: 400 }}>
                {m.bio}
              </p>

              <h2 className="mt-16 text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/45">Areas of focus</h2>
              <ul className="mt-6 grid grid-cols-1 gap-y-2 text-[15.5px] text-[#0a0a0a]/85 sm:grid-cols-2">
                {m.knowsAbout.map((k) => (
                  <li key={k} className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[#0a0a0a]/45"></span>
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
