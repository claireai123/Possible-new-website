import Link from "next/link";

const cols = {
  Product: [
    { name: "Virtual Receptionist", href: "/solutions/virtual-receptionist" },
    { name: "Legal Intake", href: "/solutions/legal-intake" },
    { name: "Integrations", href: "/integrations" },
    { name: "Pricing", href: "/pricing" },
  ],
  Solutions: [
    { name: "Personal Injury", href: "/solutions/personal-injury" },
    { name: "Criminal Defense", href: "/solutions/criminal-defense" },
    { name: "Family Law", href: "/solutions/family-law" },
    { name: "Immigration Law", href: "/solutions/immigration-law" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Careers", href: "/careers" },
    { name: "Help Center", href: "/help" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a]">
      <div className="mx-auto max-w-[1400px] px-6 py-20">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/">
              <img
                src="https://res.cloudinary.com/dwzsqumf6/image/upload/v1772837716/Claire_AI_White-removebg-preview.png"
                alt="ClaireAI"
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-white/30">
              AI-powered legal receptionist.<br />24/7. English & Spanish.
            </p>
          </div>
          {Object.entries(cols).map(([title, links]) => (
            <div key={title}>
              <p className="text-[11px] font-medium uppercase tracking-wider text-white/30">{title}</p>
              <ul className="mt-4 space-y-2.5">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[13px] text-white/50 transition-colors hover:text-white">{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-[11px] text-white/20">&copy; {new Date().getFullYear()} ClaireAI</p>
          <div className="flex gap-6 text-[11px] text-white/20">
            <span>SOC 2 Type II</span><span>·</span><span>HIPAA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
