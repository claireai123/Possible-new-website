"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const hideOn = ["/contact"];

const cols = {
  Product: [
    { name: "Product Overview", href: "/product" },
    { name: "How It Works", href: "/how-it-works" },
    { name: "Lead IQ", href: "/product/lead-iq" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
  ],
  Solutions: [
    { name: "Personal Injury", href: "/solutions/personal-injury" },
    { name: "Family Law", href: "/solutions/family-law" },
    { name: "Criminal Defense", href: "/solutions/criminal-defense" },
  ],
  Resources: [
    { name: "Blog", href: "/blog" },
    { name: "Help Center", href: "/help" },
    { name: "Book a demo", href: "/contact" },
  ],
  Company: [
    { name: "Careers", href: "/careers" },
    { name: "Tiago Stram, CEO", href: "/team/tiago-stram" },
    { name: "Cal Stein, CTO", href: "/team/cal-stein" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  if (hideOn.includes(pathname)) return null;

  return (
    <footer className="border-t border-[#0a0a0a]/[0.08] bg-white">
      <div className="mx-auto max-w-[1680px] px-6 pt-10 pb-10">
        <nav aria-label="Footer">
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-5">
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="inline-block">
                <img
                  src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/e_colorize:100,co_rgb:0a0a0a/v1772837716/Claire_AI_White-removebg-preview.png"
                  alt="ClaireAI"
                  width={80}
                  height={20}
                  loading="lazy"
                  className="h-5 w-auto"
                />
              </Link>
            </div>
            {Object.entries(cols).map(([title, links]) => (
              <div key={title}>
                <h2 className="text-[12px] font-normal uppercase tracking-[0.12em] text-[#0a0a0a]/70">{title}</h2>
                <ul className="mt-3 space-y-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="flex min-h-[44px] items-center text-[13px] font-normal text-[#0a0a0a]/75 transition-colors hover:text-[#0a0a0a] md:min-h-0 md:py-2">{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <div className="mt-8 flex flex-col gap-2 border-t border-[#0a0a0a]/[0.08] pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] font-normal text-[#0a0a0a]/65">&copy; {new Date().getFullYear()} ClaireAI</p>
          <p className="text-[12px] font-normal text-[#0a0a0a]/65">AI receptionist for law firms &middot; 24/7 &middot; English &amp; Spanish</p>
        </div>
      </div>
    </footer>
  );
}
