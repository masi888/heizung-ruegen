import type { Metadata } from "next";

import { EditorialSectionIntro } from "@/components/editorial-primitives";
import { buildCanonical, company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Datenschutz | Bertig Sanitär- und Heizungstechnik",
  alternates: {
    canonical: buildCanonical("/datenschutz"),
  },
};

export default function PrivacyPage() {
  return (
    <div className="editorial-page editorial-page-legal">
      <section className="editorial-legal-hero">
        <EditorialSectionIntro kicker="Datenschutz" title="Datenschutzhinweise" />
        <p>
          Diese Hinweise beschreiben die Verarbeitung personenbezogener Daten beim Besuch der Website und bei der
          Übermittlung von Kontakt- und Wartungsanfragen.
        </p>
      </section>

      <section className="editorial-legal-stack">
        <article className="editorial-legal-card">
          <h2>Verantwortlicher</h2>
          <p>
            {company.name}
            <br />
            Inhaber: {company.owner}
            <br />
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.city}
            <br />
            E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </article>

        <article className="editorial-legal-card">
          <h2>Server-Logfiles</h2>
          <p>
            Beim Aufruf der Website können durch das Hosting technische Zugriffsdaten in Server-Logfiles verarbeitet
            werden. Dazu gehören etwa IP-Adresse, Datum und Uhrzeit des Zugriffs, Browsertyp und aufgerufene
            Ressourcen.
          </p>
        </article>

        <article className="editorial-legal-card">
          <h2>Kontakt- und Wartungsanfragen</h2>
          <p>
            Wenn Sie ein Formular auf dieser Website nutzen, werden die eingegebenen Daten serverseitig verarbeitet,
            um die Anfrage an den Betrieb zuzustellen und die Bearbeitung vorzubereiten.
          </p>
          <p>
            Je nach Anfrageart können auch technische Anlageninformationen und freiwillig hochgeladene Dateien
            verarbeitet werden.
          </p>
        </article>

        <article className="editorial-legal-card">
          <h2>Rechtsgrundlagen</h2>
          <p>
            Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO zur Durchführung vorvertraglicher Maßnahmen
            sowie gemäß Art. 6 Abs. 1 lit. f DSGVO auf Grundlage des berechtigten Interesses an einer sicheren und
            funktionalen Website.
          </p>
        </article>

        <article className="editorial-legal-card">
          <h2>Betroffenenrechte</h2>
          <p>
            Betroffene Personen haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung
            und Widerspruch im gesetzlichen Rahmen.
          </p>
        </article>

        <article className="editorial-legal-card">
          <h2>Hinweis vor Livegang</h2>
          <p>
            Vor Veröffentlichung müssen die eingesetzten Versanddienste, E-Mail-Absender, Hostingdaten und eventuelle
            weitere Drittanbieter final geprüft und in dieser Erklärung exakt gespiegelt werden.
          </p>
        </article>
      </section>
    </div>
  );
}
