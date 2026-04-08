import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { company, navItems } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-effect bg-surface/80 border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={company.name}>
          <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary">
            <span className="text-on-primary font-black text-lg leading-none">B</span>
            <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tight text-primary">Bertig</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-on-surface-variant">
              Heizung &amp; Sanitär
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-primary/70 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={company.phones.mobileHref}
            className="hidden lg:inline-flex items-center gap-2 text-error font-bold text-sm"
          >
            <Icon name="emergency" />
            Notdienst
          </a>
          <Button tone="primary" href="/kontakt">
            Termin buchen
          </Button>
        </div>
      </div>
    </header>
  );
}
