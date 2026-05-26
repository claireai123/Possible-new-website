"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback, KeyboardEvent as ReactKeyboardEvent } from "react";

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

/* Map dropdown id → root path used for "active route" detection */
const dropRootPath: Record<string, string> = {
  product: "/product",
  solutions: "/solutions",
  resources: "/blog", // resources groups /blog + /help; treat /blog as primary
};

/* ── Header component ── */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

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

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const open = useCallback((id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(id);
  }, []);

  const close = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 120);
  }, []);

  // Immediate switch (used when hovering an adjacent trigger) to prevent flicker
  const switchTo = useCallback((id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(id);
  }, []);

  const toggle = useCallback((id: string) => {
    if (timer.current) clearTimeout(timer.current);
    setActive((curr) => (curr === id ? null : id));
  }, []);

  // Outside-click-to-close on desktop mega-menus
  useEffect(() => {
    if (!active) return;
    const onDocClick = (e: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(e.target as Node)) {
        if (timer.current) clearTimeout(timer.current);
        setActive(null);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [active]);

  // Global Escape handler — closes whichever menu is open
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (active) {
        if (timer.current) clearTimeout(timer.current);
        setActive(null);
      }
      if (mobileOpen) {
        setMobileOpen(false);
        // restore focus to hamburger
        requestAnimationFrame(() => hamburgerRef.current?.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, mobileOpen]);

  // Focus trap inside mobile drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector));
    if (focusables.length > 0) {
      // Focus the first link in the drawer
      requestAnimationFrame(() => focusables[0]?.focus());
    }
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = Array.from(drawer.querySelectorAll<HTMLElement>(focusableSelector));
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    drawer.addEventListener("keydown", onKey);
    return () => drawer.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    requestAnimationFrame(() => hamburgerRef.current?.focus());
  }, []);

  // Active-route detection for nav styling
  const isPathActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const isDropActive = (id: string) => {
    const root = dropRootPath[id];
    if (!root) return false;
    if (id === "resources") {
      return pathname.startsWith("/blog") || pathname.startsWith("/help");
    }
    return pathname === root || pathname.startsWith(root + "/");
  };

  return (
    <>
      <header ref={headerRef} className="fixed top-0 z-50 w-full">
        <nav
          aria-label="Primary"
          className="transition-all duration-300"
          style={{
            backgroundColor: scrolled ? "rgba(255,255,255,0.92)" : "#ffffff",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid #e4e4e7" : "1px solid transparent",
          }}
        >
          <div className="mx-auto flex h-12 max-w-[1680px] items-center justify-between px-6">
            {/* Logo */}
            <Link href="/" aria-label="ClaireAI home" className="flex-shrink-0">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/e_colorize:100,co_rgb:0a0a0a/q_auto/f_auto/v1772837716/Claire_AI_White-removebg-preview.png"
                alt="ClaireAI — AI Legal Receptionist"
                width={24}
                height={24}
                className="h-6 w-auto"
              />
            </Link>

            {/* Center nav */}
            <div className="hidden items-center lg:flex">
              <NavDrop
                label="Product"
                id="product"
                href="/product"
                active={active}
                isActiveRoute={isDropActive("product")}
                open={open}
                close={close}
                switchTo={switchTo}
                toggle={toggle}
              />
              <NavDrop
                label="Solutions"
                id="solutions"
                href="/solutions/personal-injury"
                active={active}
                isActiveRoute={isDropActive("solutions")}
                open={open}
                close={close}
                switchTo={switchTo}
                toggle={toggle}
              />
              <NL href="/pricing" active={isPathActive("/pricing")}>Pricing</NL>
              <NavDrop
                label="Resources"
                id="resources"
                href="/blog"
                active={active}
                isActiveRoute={isDropActive("resources")}
                open={open}
                close={close}
                switchTo={switchTo}
                toggle={toggle}
              />
            </div>

            {/* Right */}
            <div className="hidden items-center gap-4 lg:flex">
              <Link href="https://claire-ai-two.vercel.app" className="text-[13px] text-[#0a0a0a]/65 hover:text-[#0a0a0a]">
                Log in
              </Link>
              <Link
                href="/contact"
                className="rounded bg-[#0a0a0a] px-5 py-2.5 text-[13px] font-normal text-white transition-colors hover:bg-[#0a0a0a]/85"
              >
                Book a Demo
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              ref={hamburgerRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-[#0a0a0a]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </nav>


        {/* ── Product mega-menu (Legora-style: links left, video right) ── */}
        {active === "product" && (
          <MegaPanel id="mega-product" onEnter={() => open("product")} onLeave={close}>
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
                          width={420}
                          height={236}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0a0a0a]/60 transition-transform group-hover:scale-110">
                            <svg className="ml-1 h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          <MegaPanel id="mega-solutions" onEnter={() => open("solutions")} onLeave={close}>
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
                      width={420}
                      height={236}
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
          <MegaPanel id="mega-resources" onEnter={() => open("resources")} onLeave={close}>
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
                      width={420}
                      height={236}
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
        <>
          {/* Backdrop — behind the drawer panel */}
          <div
            className="fixed inset-0 z-30 bg-black/40 lg:hidden"
            onClick={closeMobile}
            aria-hidden="true"
          />
          <div
            id="mobile-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed inset-0 z-40 bg-[#ffffff] pt-20 lg:hidden"
          >
            <div className="h-full overflow-y-auto px-6 pb-8">
              <MG title="Product" items={productLinks} close={closeMobile} />
              <MG title="Practice areas" items={solutionsLinks} close={closeMobile} />
              <MG title="Resources" items={resourceItems} close={closeMobile} />
              <div className="mt-6 border-t border-[#e4e4e7] pt-6">
                <Link
                  href="/pricing"
                  className="flex min-h-[48px] items-center text-base text-[#0a0a0a]"
                  onClick={closeMobile}
                >
                  Pricing
                </Link>
              </div>
              <Link
                href="https://claire-ai-two.vercel.app"
                className="mt-6 flex min-h-[48px] items-center text-base text-[#0a0a0a]"
                onClick={closeMobile}
              >
                Log in
              </Link>
              <Link
                href="/contact"
                className="mt-4 flex min-h-[48px] w-full items-center justify-center rounded bg-[#0a0a0a] text-[13px] font-normal text-white"
                onClick={closeMobile}
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/* ── Sub-components ── */

function NL({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-[13px] transition-colors ${
        active ? "text-[#0a0a0a]" : "text-[#0a0a0a]/65 hover:text-[#0a0a0a]"
      }`}
    >
      {children}
    </Link>
  );
}

function NavDrop({
  label, id, href, active, isActiveRoute, open, close, switchTo, toggle,
}: {
  label: string;
  id: string;
  href: string;
  active: string | null;
  isActiveRoute: boolean;
  open: (s: string) => void;
  close: () => void;
  switchTo: (s: string) => void;
  toggle: (s: string) => void;
}) {
  const isOpen = active === id;
  // On hover, if some OTHER menu is already open, snap to this one instantly (prevents flicker).
  const handleMouseEnter = () => {
    if (active && active !== id) switchTo(id);
    else open(id);
  };
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      open(id);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };
  const labelTone = isOpen || isActiveRoute ? "text-[#0a0a0a]" : "text-[#0a0a0a]/65 hover:text-[#0a0a0a]";
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={close} className="flex items-center">
      <Link
        href={href}
        className={`pl-3 pr-1 py-2 text-[13px] transition-colors ${labelTone}`}
      >
        {label}
      </Link>
      <button
        type="button"
        onClick={() => toggle(id)}
        onKeyDown={handleKeyDown}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`mega-${id}`}
        aria-label={`${label} menu`}
        className={`pl-1 pr-3 py-2 text-[13px] transition-colors ${labelTone}`}
      >
        <span className="text-[10px] opacity-40">+</span>
      </button>
    </div>
  );
}

function MegaPanel({
  id, children, onEnter, onLeave,
}: {
  id: string;
  children: React.ReactNode;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      id={id}
      role="menu"
      className="absolute left-0 w-full border-b border-[#e4e4e7] bg-white"
      style={{ boxShadow: "0 8px 30px -5px rgba(0,0,0,0.06)" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="mx-auto max-w-[1680px] px-6 py-10">
        {children}
      </div>
    </div>
  );
}

function MG({ title, items, close }: { title: string; items: { name: string; href: string }[]; close: () => void }) {
  return (
    <div className="mb-6">
      <h2 className="mb-2 text-[11px] font-normal uppercase tracking-wider text-[#0a0a0a]/30">{title}</h2>
      {items.map((i) => (
        <Link key={i.href} href={i.href} className="flex min-h-[48px] items-center text-base text-[#0a0a0a]" onClick={close}>{i.name}</Link>
      ))}
    </div>
  );
}
