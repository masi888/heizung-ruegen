import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { company, navItems } from "@/lib/site-data";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

const resourceLinks = [
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/faq", label: "FAQ" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/kontakt", label: "Kontakt" },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6">
          <Image
            src="/brand/logo/bertig-logo-light.png"
            alt={company.name}
            width={320}
            height={120}
            className="h-14 w-auto"
          />
          <p className="text-on-primary/75 max-w-md leading-relaxed">
            Familienbetrieb seit {company.foundingYear} in Breege auf Rügen.
            Persönlich erreichbar für Heizung, Sanitär, Wartung und Bad.
          </p>
          <div className="flex flex-col gap-2 text-sm text-on-primary/80">
            <a href={company.phones.landlineHref} className="flex items-center gap-2 hover:text-accent">
              <Icon name="call" /> {company.phones.landline}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-accent">
              <Icon name="mail" /> {company.email}
            </a>
            <p className="flex items-center gap-2">
              <Icon name="place" /> {company.address.street}, {company.address.postalCode}{" "}
              {company.address.city}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-4">
            Navigation
          </h4>
          <nav className="flex flex-col gap-2 text-on-primary/80">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-4">
            Rechtliches
          </h4>
          <nav className="flex flex-col gap-2 text-on-primary/80">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-4">
            Wissen & Hilfe
          </h4>
          <nav className="flex flex-col gap-2 text-on-primary/80">
            {resourceLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-on-primary/10 py-6 text-center text-xs text-on-primary/60">
        © {new Date().getFullYear()} {company.name}
      </div>
    </footer>
  );
}
