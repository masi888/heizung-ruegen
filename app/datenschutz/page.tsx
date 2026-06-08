import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Datenschutz — Bertig Sanitär- und Heizungstechnik",
  description: "Datenschutzerklärung von Bertig Sanitär- und Heizungstechnik — Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <>
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <Kicker className="mb-6">Rechtliches</Kicker>
          <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl lg:leading-[1.05] font-extrabold text-primary tracking-[-0.02em] break-words hyphens-auto">
            Datenschutz&shy;erklärung
          </h1>
        </div>
      </section>

      <Section tone="surface-low">
        <div className="max-w-2xl space-y-10 text-sm text-on-surface-variant leading-relaxed break-words">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">1. Verantwortlicher</h2>
            <p>
              Verantwortlicher im Sinne der DSGVO ist:
              <br />
              <strong>{company.legalName}</strong>
              <br />
              {company.address.street}, {company.address.postalCode}{" "}
              {company.address.city}
              <br />
              E-Mail:{" "}
              <a href={`mailto:${company.email}`} className="text-primary">
                {company.email}
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">2. Zugriffsdaten und Server-Logs</h2>
            <p>
              Beim Aufruf dieser Website werden technisch notwendige
              Verbindungsdaten verarbeitet. Dazu zählen insbesondere
              Browsertyp, Betriebssystem, Referrer-URL, Hostname, Uhrzeit der
              Serveranfrage und IP-Adresse. Die Verarbeitung erfolgt zur
              sicheren Bereitstellung der Website auf Grundlage von Art. 6
              Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">3. Kontaktaufnahme und Formulare</h2>
            <p>
              Wenn Sie uns per Formular, E-Mail oder Telefon kontaktieren,
              verarbeiten wir die von Ihnen mitgeteilten Angaben zur Bearbeitung
              Ihrer Anfrage. Dazu gehören insbesondere Name, Telefonnummer,
              E-Mail-Adresse sowie die in der Anfrage enthaltenen Projekt- oder
              Anlagendaten. Die Verarbeitung erfolgt auf Grundlage von Art. 6
              Abs. 1 lit. b DSGVO und ergänzend Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">4. Versand von Formularanfragen per E-Mail</h2>
            <p>
              Formularanfragen werden serverseitig verarbeitet und zur
              Zustellung an unseren geschäftlichen Posteingang über den für
              diese Website konfigurierten SMTP-Mailserver übertragen. Dabei
              werden ausschließlich die Daten verarbeitet, die für die
              Übermittlung und Bearbeitung Ihrer Anfrage erforderlich sind.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">5. Cookies</h2>
            <p>
              Diese Website verwendet derzeit keine eigenen Analyse- oder
              Marketing-Cookies. Technisch notwendige Funktionen des
              eingesetzten Frameworks oder der Hosting-Umgebung können
              vorübergehende, rein funktionale Speichermechanismen einsetzen,
              soweit dies für die Bereitstellung der Website erforderlich ist.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">6. Externe Ressourcen</h2>
            <p>
              Zur Darstellung der auf der Website verwendeten Material-Symbole
              wird aktuell ein Stylesheet von Google Fonts geladen. Dabei kann
              es zu einer Verbindung mit Servern von Google kommen. Die
              Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
              DSGVO, da wir ein einheitliches, funktionsfähiges Erscheinungsbild
              der Website sicherstellen möchten.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">7. Ihre Rechte</h2>
            <p>
              Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
              (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der
              Verarbeitung (Art. 18 DSGVO) sowie Datenübertragbarkeit (Art. 20
              DSGVO). Außerdem haben Sie das Recht, sich bei einer
              Datenschutzaufsichtsbehörde zu beschweren (Art. 77 DSGVO).
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">
              8. Aktualität und Änderungen
            </h2>
            <p>
              Diese Datenschutzerklärung ist aktuell gültig. Durch die
              Weiterentwicklung unserer Website kann es notwendig werden, diese
              Datenschutzerklärung anzupassen.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
