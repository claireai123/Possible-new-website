"use client";

import Link from "next/link";
import React from 'react';
import { usePathname } from 'next/navigation';

const cols = {
  Platform: [
    { name: "Virtual Receptionist", href: "/solutions/virtual-receptionist" },
    { name: "Legal Intake", href: "/solutions/legal-intake" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Careers", href: "/careers" },
  ],
  Resources: [
    { name: "Help Center", href: "/help" },
    { name: "Features", href: "#" },
    { name: "Integrations", href: "/integrations" },
    { name: "Legal Encyclopedia", href: "#" },
  ],
  "Support & Legal": [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Contact", href: "/contact" },
    { name: "Security", href: "#" },
  ],
};

const LinkedInIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);

const InstagramIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069v-2.163zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
);

const TwitterIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
);

const FacebookIcon = (props: React.ComponentProps<"svg">) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
);

export function Footer() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="mx-auto max-w-[1680px] px-8 pt-[120px] pb-10">
        
        {/* Harvey-style Minimalist CTA Block */}
        <div className="flex flex-col justify-between border-b border-white/10 pb-16 mb-16 md:flex-row md:items-center">
          <div>
            <h2 className="text-[36px] tracking-[-0.03em] font-serif text-white md:text-[48px] leading-[1]">
              Unlock World-Class Intake for Your Firm
            </h2>
          </div>
          <div className="mt-8 flex md:mt-0 md:justify-end">
            <Link href="/contact" className="w-full transition-opacity hover:opacity-90 md:w-auto">
              <div className="flex items-center justify-center rounded-none bg-white px-10 py-5 text-[#0a0a0a] text-[12px] uppercase font-bold tracking-[0.2em]">
                Request a Demo
              </div>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr] md:gap-14">
          
          {/* Logo Section */}
          <div className="flex justify-start md:items-start md:border-r md:border-white/10 md:pr-14 md:pt-[2px]">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/q_auto/f_auto/v1775172708/WHITE_NO_BACKGROUND.png"
                alt="ClaireAI"
                className="w-48 max-w-full drop-shadow-sm"
              />
            </Link>
          </div>

          {/* Links and Socials Section */}
          <div className="flex flex-col">
            {/* Nav Columns */}
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-10">
              {Object.entries(cols).map(([title, links]) => (
                <div key={title}>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-white">{title}</p>
                  <ul className="mt-6 space-y-[14px]">
                    {links.map((l) => (
                      <li key={l.name}>
                        <Link href={l.href} className="text-[13px] font-bold tracking-[0.2px] text-white transition-colors hover:text-white/80">
                          {l.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-14 flex items-center gap-6 text-white">
              <a href="#" aria-label="Facebook" className="transition-colors hover:text-white">
                <FacebookIcon className="h-[22px] w-[22px]" />
              </a>
              <a href="https://twitter.com/theclaireai" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                <TwitterIcon className="h-[22px] w-[22px]" />
              </a>
              <a href="https://www.instagram.com/theclaireai/" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                <InstagramIcon className="h-[22px] w-[22px]" />
              </a>
              <a href="https://www.linkedin.com/company/theclaireai" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                <LinkedInIcon className="h-[22px] w-[22px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-[10px] font-bold tracking-[0.5px] uppercase text-white">
            &copy; {new Date().getFullYear()} CLAIREAI, INC. ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-white uppercase">
            <Link href="/sitemap" className="transition-colors hover:text-white">
              SITEMAP
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
