import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested does not exist on ClaireAI.",
  robots: { index: false, follow: false },
};

const SUGGESTED: { href: string; label: string }[] = [
  { href: "/", label: "Homepage" },
  { href: "/solutions", label: "Solutions by practice area" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations", label: "Integrations" },
  { href: "/blog", label: "Blog" },
  { href: "/help", label: "Help Center" },
];

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] bg-white text-[#0a0a0a]">
      <section className="px-6 pt-32 pb-24 sm:pt-40">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">404</p>
          <h1
            className="mt-6 max-w-[20ch] text-balance text-pretty text-[#0a0a0a]"
            style={{
              fontSize: "clamp(2.25rem, 4.5vw, 56px)",
              lineHeight: "1.05",
              letterSpacing: "-0.03em",
              fontWeight: 400,
            }}
          >
            We couldn&apos;t find that page.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[18px] leading-[1.55] text-[#0a0a0a]/65">
            The URL you tried doesn&apos;t exist on ClaireAI — it may have moved, or you may have followed a stale link. Try one of the places below, or contact our team and we&apos;ll find what you need.
          </p>

          <div className="mt-12">
            <p className="text-[11px] uppercase tracking-[0.14em] text-[#0a0a0a]/55">Suggested pages</p>
            <ul className="mt-6 grid grid-cols-1 gap-y-3 sm:grid-cols-2">
              {SUGGESTED.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group inline-flex items-center gap-2 text-[#0a0a0a] hover:text-[#0a0a0a]/65 transition-colors"
                    style={{ fontSize: "17px", letterSpacing: "-0.005em" }}
                  >
                    <span>{s.label}</span>
                    <span className="text-[#0a0a0a]/35 group-hover:text-[#0a0a0a]/60 transition-colors">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-col flex-wrap gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center rounded bg-[#0a0a0a] px-5 py-3 text-[14px] font-normal text-white hover:bg-[#0a0a0a]/85"
            >
              Back to homepage
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded border border-[#0a0a0a]/15 px-5 py-3 text-[14px] font-normal text-[#0a0a0a] hover:border-[#0a0a0a]/40"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
