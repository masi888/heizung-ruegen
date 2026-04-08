import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Datenschutz — Bertig Sanitär- und Heizungstechnik",
  description: "Datenschutzerklärung gemäß DSGVO.",
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <>
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Kicker className="mb-6">Rechtliches</Kicker>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05]">
            Datenschutz&shy;erklärung
          </h1>
        </div>
      </section>

      <Section tone="surface-low">
        <div className="max-w-2xl space-y-10 text-sm text-on-surface-variant leading-relaxed break-words">
          {/* Hinweis für juristische Review */}
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 text-on-surface">
            <p className="font-bold text-primary mb-1">Hinweis (intern)</p>
            <p>
              Diese Datenschutzerklärung enthält Platzhalter. Vor dem Livegang
              bitte durch einen Datenschutzbeauftragten oder Rechtsanwalt
              prüfen und ergänzen lassen.
            </p>
          </div>

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
            <h2 className="text-xl font-bold text-primary">
              2. Erhebung und Verarbeitung personenbezogener Daten
            </h2>
            <p>
              Wir erheben personenbezogene Daten, wenn Sie uns über das
              Kontaktformular, per E-Mail oder telefonisch kontaktieren. Dies
              umfasst Name, Telefonnummer, E-Mail-Adresse sowie Angaben zur
              Anfrage. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
              lit. b DSGVO sowie Art. 6 Abs. 1 lit. f DSGVO.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">3. Kontaktformular</h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden
              Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort
              angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für
              den Fall von Anschlussfragen bei uns gespeichert. Diese Daten
              geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">4. Server-Log-Dateien</h2>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch
              Informationen in so genannten Server-Log-Dateien, die Ihr Browser
              automatisch übermittelt. Dies sind: Browsertyp, Betriebssystem,
              Referrer-URL, Hostname, Uhrzeit der Serveranfrage, IP-Adresse.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">5. Cookies</h2>
            <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20">
              <p className="font-semibold text-primary mb-1">
                [PLATZHALTER — juristische Review erforderlich]
              </p>
              <p>
                Dieser Abschnitt muss entsprechend der tatsächlich eingesetzten
                Cookies und Tracking-Technologien ergänzt werden.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">6. Ihre Rechte</h2>
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
              7. Drittanbieter-Dienste
            </h2>
            <div className="bg-surface-container rounded-lg p-4 border border-outline-variant/20">
              <p className="font-semibold text-primary mb-1">
                [PLATZHALTER — juristische Review erforderlich]
              </p>
              <p>
                Falls externe Dienste (z.B. Google Fonts, Analytics, Maps)
                eingesetzt werden, ist hier deren datenschutzrechtliche
                Einbindung zu dokumentieren.
              </p>
            </div>
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
