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
  Contact: [
    { name: "Book a demo", href: "/contact" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  if (hideOn.includes(pathname)) return null;

  return (
    <footer className="border-t border-[#0a0a0a]/10 bg-white">
      <div className="mx-auto max-w-[1728px] px-6 pt-10 pb-5">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/e_colorize:100,co_rgb:0a0a0a/v1772837716/Claire_AI_White-removebg-preview.png"
                alt="ClaireAI"
                className="h-5 w-auto"
              />
            </Link>
          </div>
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <p className="text-[10px] font-normal uppercase tracking-[0.12em] text-[#0a0a0a]/50">{title}</p>
              <ul className="mt-3 space-y-1.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[12px] font-normal text-[#0a0a0a]/55 transition-colors hover:text-[#0a0a0a]">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between border-t border-[#0a0a0a]/10 pt-4">
          <p className="text-[11px] font-normal text-[#0a0a0a]/40">&copy; {new Date().getFullYear()} ClaireAI</p>
          <p className="text-[11px] font-normal text-[#0a0a0a]/40">AI receptionist for law firms &middot; 24/7 &middot; English &amp; Spanish</p>
        </div>
      </div>
    </footer>
  );
}
