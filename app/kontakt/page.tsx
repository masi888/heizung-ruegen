import type { Metadata } from "next";

import { EditorialClosingBand, EditorialHero, EditorialSectionIntro } from "@/components/editorial-primitives";
import { RequestForms } from "@/components/request-forms";
import { pageVisuals } from "@/lib/editorial-content";
import { buildCanonical, company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Kontakt auf Rügen | Bertig Sanitär- und Heizungstechnik",
  description: "Kontakt für Heizungsmodernisierung, Wärmepumpe, Wartung, Badmodernisierung und Notdienst auf Rügen.",
  alternates: {
    canonical: buildCanonical("/kontakt"),
  },
};

export default function ContactPage() {
  return (
    <div className="editorial-page">
      <EditorialHero
        actions={[
          { href: company.phones.mobileHref, label: "Notdienst anrufen", tone: "primary" },
          { href: `mailto:${company.email}`, label: "E-Mail senden", tone: "secondary" },
        ]}
        imageAlt={pageVisuals.contact.alt}
        imageSrc={pageVisuals.contact.src}
        kicker="Kontakt"
        lead="Für planbare Vorhaben reicht eine strukturierte Anfrage. Für akute Störungen ist der direkte Anruf weiterhin der schnellste Weg."
        title="Direkt anfragen. Persönlich Rückmeldung bekommen."
      />

      <section className="editorial-section editorial-form-layout">
        <div className="editorial-info-card">
          <EditorialSectionIntro
            kicker="Direkter Kontakt"
            title={company.name}
          />
          <p>
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.city}
          </p>
          <p>
            Festnetz: <a href={company.phones.landlineHref}>{company.phones.landline}</a>
            <br />
            Mobil / Notdienst: <a href={company.phones.mobileHref}>{company.phones.mobile}</a>
            <br />
            E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
          <ul className="editorial-inline-list">
            <li>Kurze Wege auf Rügen</li>
            <li>Persönliche Rückmeldung</li>
            <li>Wartung, Heizung, Sanitär und Bad aus einer Hand</li>
          </ul>
        </div>

        <div className="editorial-form-shell">
          <EditorialSectionIntro
            copy="Projektanfragen bleiben bewusst knapp. Bei Wartungen fragen wir die Angaben ab, die für die Vorbereitung des Einsatzes wirklich helfen."
            kicker="Anfrageformular"
            title="Strukturiert anfragen, ohne unnötige Schleifen."
          />
          <RequestForms />
        </div>
      </section>

      <EditorialClosingBand
        actions={[
          { href: company.phones.mobileHref, label: company.phones.mobile, tone: "primary" },
          { href: "/leistungen", label: "Leistungen ansehen", tone: "secondary" },
        ]}
        copy="Wenn das Vorhaben schon klar ist, reicht eine kurze Nachricht. Bei Störungen zählt der direkte Anruf."
        kicker="Erreichbarkeit"
        title="Heizung, Sanitär und Wartung ohne Umwege anfragen."
      />
    </div>
  );
}
