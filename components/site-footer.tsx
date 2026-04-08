import Image from "next/image";
import Link from "next/link";

import { company, trustItems } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <section className="footer-callout">
        <p className="eyebrow">Direkter Kontakt</p>
        <h2>Heizung, Sanitär und Wartung ohne Umwege anfragen.</h2>
        <p>
          Für akute Störungen zählt der direkte Anruf. Für planbare Vorhaben reicht eine kurze Projektanfrage mit den
          wichtigsten Eckdaten.
        </p>
        <div className="button-row">
          <a className="button button-primary" href={company.phones.mobileHref}>
            {company.phones.mobile}
          </a>
          <Link className="button button-secondary" href="/kontakt">
            Projekt anfragen
          </Link>
        </div>
      </section>

      <section className="footer-grid">
        <div className="footer-brand-column">
          <div className="footer-brand-lockup">
            <Image
              alt="Bertig Signet"
              className="footer-signet-image"
              height={420}
              src="/brand/processed/bertig-signet-header.png"
              width={420}
            />
            <div className="footer-brand-text">
              <strong>Bertig</strong>
              <span>Heizung &amp; Sanitär</span>
            </div>
          </div>
          <p>
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.city}
          </p>
        </div>
        <div>
          <p className="footer-title">Schnellzugriff</p>
          <div className="footer-links">
            <Link href="/leistungen">Leistungen</Link>
            <Link href="/wartung-service">Wartung</Link>
            <Link href="/waermepumpen-ruegen">Wärmepumpen</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>
        <div>
          <p className="footer-title">Vertrauen</p>
          <ul className="footer-trust">
            {trustItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="footer-title">Recht</p>
          <div className="footer-links">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <a href={`mailto:${company.email}`}>{company.email}</a>
          </div>
        </div>
      </section>
    </footer>
  );
}
