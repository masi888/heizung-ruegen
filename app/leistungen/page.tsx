import Link from "next/link";

import { EditorialClosingBand, EditorialHero, EditorialSectionIntro } from "@/components/editorial-primitives";
import { pageVisuals, routeLabels } from "@/lib/editorial-content";
import { company, serviceRoutes } from "@/lib/site-data";

export const metadata = {
  title: "Leistungen auf Rügen | Bertig Sanitär- und Heizungstechnik",
  description: "Heizung, Wärmepumpe, Wartung, Badmodernisierung, Klima und Notdienst auf Rügen – in einer klaren Leistungsübersicht.",
};

export default function ServicesPage() {
  return (
    <div className="editorial-page">
      <EditorialHero
        actions={[
          { href: "/kontakt", label: "Projekt anfragen", tone: "primary" },
          { href: company.phones.mobileHref, label: "Notdienst", tone: "secondary" },
        ]}
        imageAlt={pageVisuals.services.alt}
        imageSrc={pageVisuals.services.src}
        kicker="Leistungsübersicht"
        lead="Bertig konzentriert sich auf die Themen, die auf Rügen im Alltag wirklich gefragt sind: Heizung, Wärmepumpe, Wartung, Badmodernisierung, Klima und schnelle Hilfe bei Störungen."
        title="Leistungen mit klaren Schwerpunkten statt großem Bauchladen."
      />

      <section className="editorial-section">
        <EditorialSectionIntro
          copy="Jede Leistungsseite erklärt kurz, worum es geht, wie gearbeitet wird und welcher nächste Schritt sinnvoll ist."
          kicker="Überblick"
          title="Die wichtigsten Themen in einer ruhigen, klaren Übersicht."
        />

        <div className="editorial-card-grid">
          {serviceRoutes.map((route) => (
            <article key={route.slug} className="editorial-content-card">
              <p className="ref-kicker">{routeLabels[route.slug] ?? route.slug}</p>
              <h3>{route.headline}</h3>
              <p>{route.lead}</p>
              <Link href={route.slug}>{route.cta ?? "Mehr erfahren"}</Link>
            </article>
          ))}
        </div>
      </section>

      <EditorialClosingBand
        actions={[
          { href: "/kontakt", label: "Projekt anfragen", tone: "primary" },
          { href: "/faq", label: "Häufige Fragen", tone: "secondary" },
        ]}
        copy="Wenn schon klar ist, worum es geht, reicht eine kurze Anfrage. Wenn noch Fragen offen sind, hilft die FAQ oder der direkte Kontakt."
        kicker="Nächster Schritt"
        title="Von der Leistungsübersicht direkt in den passenden Kontaktweg."
      />
    </div>
  );
}
