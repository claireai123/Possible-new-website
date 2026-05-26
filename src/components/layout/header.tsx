"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

/* ── Dropdown data (trimmed) ── */

const productLinks = [
  { name: "Overview", desc: "The AI receptionist for law firms", href: "/product" },
  { name: "How it works", desc: "From first ring to signed retainer in minutes", href: "/how-it-works" },
  { name: "Lead IQ", desc: "AI lead scoring with a one-page brief to your team", href: "/product/lead-iq" },
  { name: "CRM Integrations", desc: "Clio, Filevine, MyCase & more", href: "/integrations" },
];

const productVideos = [
  {
    title: "Every call answered, every lead qualified",
    label: "Product demo",
    href: "https://www.youtube.com/watch?v=eo5AUYB9g6o",
    thumb: "https://img.youtube.com/vi/eo5AUYB9g6o/maxresdefault.jpg",
  },
];

const solutionsLinks = [
  { name: "Personal Injury", desc: "Maximize case intake value", href: "/solutions/personal-injury" },
  { name: "Criminal Defense", desc: "24/7 urgent case capture", href: "/solutions/criminal-defense" },
  { name: "Family Law", desc: "Sensitive, bilingual intake", href: "/solutions/family-law" },
];

const resourceItems = [
  { name: "Blog", desc: "Insights and analysis", href: "/blog" },
  { name: "Help Center", desc: "Guides and documentation", href: "/help" },
];

/* ── Header component ── */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close any open menus when route changes so they don't snap back on return to "/".
  useEffect(() => {
    setActive(null);
    setMobileOpen(false);
  }, [pathname]);

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
            backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "#ffffff",
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
                className="h-6 w-auto"
              />
            </Link>

            {/* Center nav */}
            <div className="hidden items-center lg:flex">
              <NavDrop label="Product" id="product" active={active} open={open} close={close} />
              <NavDrop label="Solutions" id="solutions" active={active} open={open} close={close} />
              <NL href="/pricing">Pricing</NL>
              <NavDrop label="Resources" id="resources" active={active} open={open} close={close} />
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


        {/* ── Product mega-menu (Legora-style: links left, video right) ── */}
        {active === "product" && (
          <MegaPanel onEnter={() => open("product")} onLeave={close}>
            <div className="grid grid-cols-[1fr_auto] gap-20">
              <div>
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
                      <p className="text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450, letterSpacing: "-0.02em" }}>
                        {item.name}
                      </p>
                      <p className="mt-1 text-[14px] text-[#0a0a0a]/35">
                        {item.desc}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>

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
                      <p className="mt-1 text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450, letterSpacing: "-0.02em" }}>
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
            <div className="grid grid-cols-[1fr_auto] gap-20">
              <div>
                <p className="mb-8 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">Practice areas</p>
                <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                  {solutionsLinks.map((i) => (
                    <Link key={i.href} href={i.href} className="group block py-4">
                      <p className="text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450, letterSpacing: "-0.02em" }}>{i.name}</p>
                      <p className="mt-1 text-[14px] text-[#0a0a0a]/35">{i.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-[420px]">
                <p className="mb-8 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">Featured</p>
                <Link href="/solutions/personal-injury" className="group block">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#8c9c82]">
                    <img
                      src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1779215106/ChatGPT_Image_May_19_2026_at_02_24_50_PM.jpg"
                      alt="ClaireAI personal injury intake — purpose-built for PI firms."
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0) 100%)",
                      }}
                    />
                    <div className="relative flex h-full flex-col justify-end p-6 text-white">
                      <p className="text-[11px] uppercase tracking-wider opacity-80">Solution spotlight</p>
                      <p className="mt-2 font-serif text-[22px] leading-tight" style={{ fontWeight: 500, letterSpacing: "-0.02em" }}>
                        Personal injury intake
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-[11px] text-[#0a0a0a]/30">Featured solution</p>
                  <p className="mt-1 text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450, letterSpacing: "-0.02em" }}>
                    Purpose-built for PI firms
                  </p>
                </Link>
              </div>
            </div>
          </MegaPanel>
        )}

        {/* ── Resources mega-menu ── */}
        {active === "resources" && (
          <MegaPanel onEnter={() => open("resources")} onLeave={close}>
            <div className="grid grid-cols-[1fr_auto] gap-20">
              <div>
                <p className="mb-8 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">Resources</p>
                <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                  {resourceItems.map((i) => (
                    <Link key={i.href} href={i.href} className="group block py-4">
                      <p className="text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450, letterSpacing: "-0.02em" }}>{i.name}</p>
                      <p className="mt-1 text-[14px] text-[#0a0a0a]/35">{i.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="w-[420px]">
                <p className="mb-8 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">Featured</p>
                <Link href="/blog/2026-legal-intake-benchmark-report" className="group block">
                  <div className="aspect-[16/9] overflow-hidden rounded-lg bg-[#e8e5de]">
                    <img
                      src="https://res.cloudinary.com/dwzsqumf6/image/upload/c_fill,ar_16:9,w_840,g_center,q_auto,f_auto/v1779817604/ChatGPT_Image_May_26_2026_at_01_46_32_PM.jpg"
                      alt="ClaireAI 1000 Firm Study 2026 — definitive report on AI adoption, growth, and efficiency in top law firms"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-4 text-[11px] text-[#0a0a0a]/30">Research</p>
                  <p className="mt-1 text-[18px] text-[#0a0a0a] group-hover:text-[#0a0a0a]/60" style={{ fontWeight: 450, letterSpacing: "-0.02em" }}>
                    Measuring the impact of AI on 1,000 law firms
                  </p>
                  <p className="mt-2 text-[14px] text-[#0a0a0a]/35">Read the report →</p>
                </Link>
              </div>
            </div>
          </MegaPanel>
        )}
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#ffffff] pt-20 lg:hidden">
          <div className="h-full overflow-y-auto px-6 pb-8">
            <MG title="Product" items={productLinks} close={() => setMobileOpen(false)} />
            <MG title="Practice areas" items={solutionsLinks} close={() => setMobileOpen(false)} />
            <MG title="Resources" items={resourceItems} close={() => setMobileOpen(false)} />
            <div className="mt-6 border-t border-[#e4e4e7] pt-6">
              {[
                { name: "Pricing", href: "/pricing" },
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
