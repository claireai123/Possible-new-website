"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

/* ── Dropdown data ── */

const productLinks = [
  { name: "Overview", desc: "The AI receptionist for law firms", href: "/product" },
  { name: "Intake", desc: "Every call answered on the first ring", href: "/product/intake" },
  { name: "Case Qualification", desc: "Police reports, fault & treatment confirmed", href: "/product/case-qualification" },
  { name: "Retainer Automation", desc: "From intake to signed retainer, hands-free", href: "/product/retainer-automation" },
  { name: "Consultation Booking", desc: "Calendar synced, conflicts checked", href: "/product/consultation-booking" },
  { name: "Bilingual Support", desc: "English & Spanish, native fluency", href: "/product/bilingual" },
  { name: "CRM Integrations", desc: "Clio, Filevine, MyCase & more", href: "/integrations" },
  { name: "Call Analytics", desc: "Transcripts, scoring & insights", href: "/product/analytics" },
];

const productVideos = [
  {
    title: "Every call answered, every lead qualified",
    label: "Product demo",
    href: "https://www.youtube.com/watch?v=eo5AUYB9g6o",
    thumb: "https://img.youtube.com/vi/eo5AUYB9g6o/maxresdefault.jpg",
  },
];

const solutionsByArea = [
  { name: "Personal Injury", desc: "Maximize case intake value", href: "/solutions/personal-injury" },
  { name: "Criminal Defense", desc: "24/7 urgent case capture", href: "/solutions/criminal-defense" },
  { name: "Family Law", desc: "Sensitive, bilingual intake", href: "/solutions/family-law" },
  { name: "Immigration Law", desc: "Multilingual client support", href: "/solutions/immigration-law" },
];

const solutionsByType = [
  { name: "Solo & Small Firms", desc: "Never miss a lead", href: "/solutions/small-firms" },
  { name: "Mid-Size Firms", desc: "Scale without headcount", href: "/solutions/mid-size" },
  { name: "Enterprise", desc: "Multi-office, multi-practice", href: "/solutions/enterprise" },
];

const resourceItems = [
  { name: "Blog", desc: "Insights and analysis", href: "/blog" },
  { name: "Case Studies", desc: "Real results from real firms", href: "/case-studies" },
  { name: "Help Center", desc: "Guides and documentation", href: "/help" },
  { name: "Legal Intake Report", desc: "2026 benchmark data", href: "/legal-intake-report" },
  { name: "vs Smith.ai", desc: "Feature comparison", href: "/compare-smith-ai" },
  { name: "vs Ruby", desc: "Feature comparison", href: "/compare-ruby-receptionists" },
];

/* ── Header component ── */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const open = (id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(id);
  };
  const close = () => {
    timer.current = setTimeout(() => setActive(null), 120);
  };

  return (
    <>
      <header className="fixed top-0 z-50 w-full">
        <nav
          className="transition-all duration-300"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "#fefefc",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid #e4e4e7" : "1px solid transparent",
          }}
        >
          <div className="mx-auto flex h-12 max-w-[1728px] items-center justify-between px-6">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/e_colorize:100,co_rgb:0a0a0a/v1772837716/Claire_AI_White-removebg-preview.png"
                alt="ClaireAI — AI Legal Receptionist"
                className="h-8 w-auto"
              />
            </Link>

            {/* Center nav */}
            <div className="hidden items-center lg:flex">
              <NavDrop label="Platform" id="product" active={active} open={open} close={close} />
              <NavDrop label="Solutions" id="solutions" active={active} open={open} close={close} />
              <NL href="/pricing">Pricing</NL>
              <NavDrop label="Resources" id="resources" active={active} open={open} close={close} />
              <NL href="/about">About</NL>
            </div>

            {/* Right */}
            <div className="hidden items-center gap-4 lg:flex">
              <Link href="#" className="text-[13px] text-[#0a0a0a]/50 hover:text-[#0a0a0a]">Log in</Link>
              <Link
                href="/contact"
                className="rounded bg-[#0a0a0a] px-5 py-2.5 text-[13px] font-normal text-white transition-colors hover:bg-[#0a0a0a]/85"
              >
                Book a Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              <svg className="h-5 w-5 text-[#0a0a0a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </nav>


        {/* ── Product mega-menu (Legora-style: links left, videos right) ── */}
        {active === "product" && (
          <MegaPanel onEnter={() => open("product")} onLeave={close}>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-20">
              {/* Left two columns: product links */}
              <div className="col-span-2">
                <p className="mb-8 text-[11px] font-normal text-[#0a0a0a]/30">
                  Product
                </p>
                <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                  {productLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group block py-4"
                    >
                      <p className="text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450 }}>
                        {item.name}
                      </p>
                      <p className="mt-1 text-[14px] text-[#0a0a0a]/35">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right column: video card */}
              <div className="w-[420px]">
                <p className="mb-8 text-[11px] font-normal text-[#0a0a0a]/30">
                  Product videos
                </p>
                <div className="space-y-8">
                  {productVideos.map((vid) => (
                    <a key={vid.href} href={vid.href} target="_blank" rel="noopener noreferrer" className="group block">
                      <div className="relative aspect-[16/9] overflow-hidden bg-[#e8e5de]">
                        <img
                          src={vid.thumb}
                          alt={vid.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a0a0a]/60 transition-transform group-hover:scale-110">
                            <svg className="ml-1 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-[11px] text-[#0a0a0a]/30">
                        {vid.label}
                      </p>
                      <p className="mt-1 text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450 }}>
                        {vid.title}
                      </p>
                      <p className="mt-2 text-[14px] text-[#0a0a0a]/35">
                        Watch video
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </MegaPanel>
        )}

        {/* ── Solutions mega-menu ── */}
        {active === "solutions" && (
          <MegaPanel onEnter={() => open("solutions")} onLeave={close}>
            <div className="grid grid-cols-3 gap-16">
              <div>
                <p className="mb-6 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">By area</p>
                {solutionsByArea.map((i) => (
                  <Link key={i.href} href={i.href} className="group block py-3">
                    <p className="text-[15px] font-normal text-[#0a0a0a] group-hover:text-[#c4913c]">{i.name}</p>
                    <p className="mt-0.5 text-[13px] text-[#0a0a0a]/40">{i.desc}</p>
                  </Link>
                ))}
              </div>
              <div>
                <p className="mb-6 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">By type</p>
                {solutionsByType.map((i) => (
                  <Link key={i.href} href={i.href} className="group block py-3">
                    <p className="text-[15px] font-normal text-[#0a0a0a] group-hover:text-[#c4913c]">{i.name}</p>
                    <p className="mt-0.5 text-[13px] text-[#0a0a0a]/40">{i.desc}</p>
                  </Link>
                ))}
              </div>
              <div>
                <p className="mb-6 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">Latest</p>
                {/* Placeholder for featured case study / blog post */}
                <Link href="/case-studies" className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#e8e5de]">
                    <div className="flex h-full items-center justify-center text-[13px] text-[#0a0a0a]/20">
                      Case study image
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-[#0a0a0a]/35">Case study</p>
                  <p className="mt-1 text-[15px] font-normal text-[#0a0a0a] group-hover:text-[#c4913c]">
                    How a PI firm captured $1.2M in 30 days
                  </p>
                </Link>
              </div>
            </div>
          </MegaPanel>
        )}

        {/* ── Resources mega-menu ── */}
        {active === "resources" && (
          <MegaPanel onEnter={() => open("resources")} onLeave={close}>
            <div className="grid grid-cols-[1fr_1fr_auto] gap-16">
              <div className="col-span-2">
                <p className="mb-6 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">Resources</p>
                <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                  {resourceItems.map((i) => (
                    <Link key={i.href} href={i.href} className="group block py-3">
                      <p className="text-[15px] font-normal text-[#0a0a0a] group-hover:text-[#c4913c]">{i.name}</p>
                      <p className="mt-0.5 text-[13px] text-[#0a0a0a]/40">{i.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-[300px]">
                <p className="mb-6 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">Featured</p>
                <Link href="/legal-intake-report" className="group block">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#e8e5de]">
                    <div className="flex h-full items-center justify-center text-[13px] text-[#0a0a0a]/20">
                      Report cover
                    </div>
                  </div>
                  <p className="mt-3 text-[11px] text-[#0a0a0a]/35">Report</p>
                  <p className="mt-1 text-[15px] font-normal text-[#0a0a0a] group-hover:text-[#c4913c]">
                    2026 Legal Intake Report
                  </p>
                  <p className="mt-1 text-[13px] text-[#0a0a0a]/40">Download free →</p>
                </Link>
              </div>
            </div>
          </MegaPanel>
        )}
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#fefefc] pt-20 lg:hidden">
          <div className="h-full overflow-y-auto px-6 pb-8">
            <MG title="Product" items={productLinks} close={() => setMobileOpen(false)} />
            <MG title="By area" items={solutionsByArea} close={() => setMobileOpen(false)} />
            <MG title="By type" items={solutionsByType} close={() => setMobileOpen(false)} />
            <div className="mt-6 border-t border-[#e4e4e7] pt-6">
              {[
                { name: "Pricing", href: "/pricing" },
                { name: "About", href: "/about" },
                { name: "Blog", href: "/blog" },
                { name: "Case Studies", href: "/case-studies" },
                { name: "Help Center", href: "/help" },
              ].map((t) => (
                <Link key={t.href} href={t.href} className="block py-2.5 text-base text-[#0a0a0a]" onClick={() => setMobileOpen(false)}>{t.name}</Link>
              ))}
            </div>
            <Link href="/contact" className="mt-6 block w-full rounded bg-[#0a0a0a] py-2.5 text-center text-[13px] font-normal text-white" onClick={() => setMobileOpen(false)}>
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Sub-components ── */

function NL({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="px-3 py-2 text-[13px] text-[#0a0a0a]/60 hover:text-[#0a0a0a]">{children}</Link>;
}

function NavDrop({
  label, id, active, open, close,
}: {
  label: string; id: string; active: string | null;
  open: (s: string) => void; close: () => void;
}) {
  return (
    <div onMouseEnter={() => open(id)} onMouseLeave={close}>
      <button className={`flex items-center gap-1 px-3 py-2 text-[13px] transition-colors ${
        active === id ? "text-[#0a0a0a]" : "text-[#0a0a0a]/60 hover:text-[#0a0a0a]"
      }`}>
        {label}
        <span className="text-[10px] opacity-40">+</span>
      </button>
    </div>
  );
}

function MegaPanel({ children, onEnter, onLeave }: { children: React.ReactNode; onEnter: () => void; onLeave: () => void }) {
  return (
    <div
      className="absolute left-0 w-full border-b border-[#e4e4e7] bg-white"
      style={{ boxShadow: "0 8px 30px -5px rgba(0,0,0,0.06)" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="mx-auto max-w-[1728px] px-6 py-10">
        {children}
      </div>
    </div>
  );
}

function MG({ title, items, close }: { title: string; items: { name: string; href: string }[]; close: () => void }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">{title}</p>
      {items.map((i) => (
        <Link key={i.href} href={i.href} className="block py-2 text-base text-[#0a0a0a]" onClick={close}>{i.name}</Link>
      ))}
    </div>
  );
}
