import Image from "next/image";
import Link from "next/link";

import { company, navItems } from "@/lib/site-data";

export function SiteHeader() {
  const headerNavItems = navItems.filter((item) =>
    ["/leistungen", "/waermepumpen-ruegen", "/badsanierung-ruegen", "/kontakt"].includes(item.href),
  );

  return (
    <header className="site-header">
      <div className="header-bar">
        <Link className="brand-lockup brand-lockup-visual" href="/" aria-label={`${company.name} Startseite`}>
          <Image
            alt="Bertig Signet"
            className="brand-signet-image"
            height={420}
            priority
            src="/brand/processed/bertig-signet-header.png"
            width={420}
          />
          <span className="brand-wording">
            <strong>Bertig</strong>
            <small>Heizung &amp; Sanitär</small>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Hauptnavigation">
          {headerNavItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="button button-secondary" href="/kontakt">
            Anfrage
          </Link>
          <a className="button button-primary" href={company.phones.mobileHref}>
            Notdienst
          </a>
        </div>
      </div>
    </header>
  );
}
