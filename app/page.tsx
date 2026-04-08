import Image from "next/image";
import Link from "next/link";

import { EditorialClosingBand } from "@/components/editorial-primitives";
import { company } from "@/lib/site-data";

const serviceHighlights = [
  {
    href: "/waermepumpen-ruegen",
    label: "Wärmepumpen",
    title: "Sauber geplant statt schnell verkauft.",
    copy: "Machbarkeit, Heizflächen und Nutzung werden vorab realistisch eingeordnet.",
  },
  {
    href: "/heizung-ruegen",
    label: "Heizungen",
    title: "Modernisierung mit Blick auf Bestand und Wartbarkeit.",
    copy: "Für Wohnhäuser, Ferienimmobilien und Umbauten mit klarer technischer Linie.",
  },
  {
    href: "/badsanierung-ruegen",
    label: "Sanitär und Bad",
    title: "Bäder, die besser funktionieren und besser aussehen.",
    copy: "Teilmodernisierung oder kompletter Umbau mit ruhiger Material- und Technikplanung.",
  },
];

const regionStats = [
  { value: "100%", label: "Insel-Fokus" },
  { value: "24/7", label: "Notdienst bereit" },
];

export default function HomePage() {
  return (
    <div className="reference-home">
      <section className="ref-hero">
        <div className="ref-hero-copy">
          <p className="ref-kicker">Handwerksbetrieb auf Rügen</p>
          <h1 className="ref-title">
            Wärme für Häuser,
            <br />
            Technik für morgen.
            <br />
            <span>Heizung. Sanitär. Bad.</span>
          </h1>
          <p className="ref-lead">
            Bertig plant und installiert moderne Heizungs- und Sanitärtechnik für Wohnhäuser,
            Ferienimmobilien und Umbauten auf Rügen. Direkt erreichbar, sauber in der Ausführung und
            seit {company.foundingYear} regional verankert.
          </p>

          <div className="ref-actions">
            <Link className="button button-primary" href="/leistungen">
              Unsere Leistungen
            </Link>
            <Link className="button button-secondary" href="/kontakt">
              Projekt anfragen
            </Link>
          </div>

          <div className="ref-proof">
            <span>Direkter Ansprechpartner</span>
            <span>Kurze Wege auf Rügen</span>
          </div>
        </div>

        <div className="ref-hero-visual">
          <div className="ref-hero-frame">
            <Image
              alt="Präzise Handwerksarbeit an einer Sanitärinstallation"
              className="ref-hero-image"
              height={1953}
              priority
              src="/site/handwerk-detail.jpg"
              width={1482}
            />
          </div>

          <div className="ref-hero-note">
            <span>Insel-Expertise</span>
            <strong>Saubere Technik für Bestand, Modernisierung und Ferienobjekte.</strong>
          </div>
        </div>
      </section>

      <section className="ref-services">
        <div className="ref-section-head">
          <p className="ref-kicker">Technik, die bleibt.</p>
          <h2>Drei klare Leistungsfelder statt überladener Startseite.</h2>
          <p>
            Die Startseite zeigt nur die Themen, die für den Betrieb wirklich zählen. Tiefer geht es erst in
            den jeweiligen Leistungsseiten.
          </p>
        </div>

        <div className="ref-service-grid">
          {serviceHighlights.map((service) => (
            <article key={service.href} className="ref-service-card">
              <p className="ref-service-label">{service.label}</p>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <Link href={service.href}>Mehr erfahren</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="ref-story">
        <div className="ref-story-visual">
          <div className="ref-story-plaque">
            <Image
              alt="Bertig Signet"
              className="ref-story-signet"
              height={430}
              src="/brand/processed/bertig-signet-header.png"
              width={430}
            />
          </div>
          <div className="ref-story-badge">
            <span>Seit</span>
            <strong>{company.foundingYear}</strong>
            <span>auf Rügen</span>
          </div>
        </div>

        <div className="ref-story-copy">
          <p className="ref-kicker">Unsere Geschichte</p>
          <h2>Regional nah genug für kurze Wege. Modern genug für neue Technik.</h2>
          <p>
            Bertig verbindet langjährige Erfahrung mit einem klaren Blick auf heutige Anforderungen: Wärmepumpe,
            Heizungsmodernisierung, Sanitär und Badumbau nicht als Baukasten, sondern als saubere Lösung für den
            Alltag.
          </p>
          <p>
            Gerade auf Rügen zählen Erreichbarkeit, belastbare Planung und eine Ausführung, die auch später noch
            gut wartbar bleibt.
          </p>

          <div className="ref-stats">
            {regionStats.map((item) => (
              <div key={item.label} className="ref-stat">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EditorialClosingBand
        actions={[
          { href: "/kontakt", label: "Projekt anfragen", tone: "primary" },
          { href: company.phones.mobileHref, label: "Notdienst anrufen", tone: "secondary" },
        ]}
        copy="Für planbare Projekte reicht eine kurze Anfrage. Bei akuten Störungen zählt der direkte Anruf."
        kicker="Direkter Kontakt"
        title="Bereit für moderne Heizungs- und Sanitärtechnik auf Rügen?"
      />
    </div>
  );
}
