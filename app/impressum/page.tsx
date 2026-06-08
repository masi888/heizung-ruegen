import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company, legalNotice } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Impressum — Bertig Sanitär- und Heizungstechnik",
  description: "Gesetzliche Anbieterkennzeichnung gemäß § 5 DDG.",
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <>
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <Kicker className="mb-6">Rechtliches</Kicker>
          <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl lg:leading-[1.05] font-extrabold text-primary tracking-[-0.02em] break-words hyphens-auto">
            Impressum
          </h1>
        </div>
      </section>

      <Section tone="surface-low">
        <div className="max-w-2xl space-y-10 break-words">
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Angaben gemäß § 5 DDG
            </h2>
            <p className="text-on-surface leading-relaxed">
              {company.legalName}
              <br />
              {company.address.street}
              <br />
              {company.address.postalCode} {company.address.city}
              <br />
              Deutschland
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Kontakt
            </h2>
            <p className="text-on-surface leading-relaxed">
              Telefon:{" "}
              <a href={company.phones.mobileHref} className="text-primary hover:text-accent">
                {company.phones.mobile}
              </a>
              <br />
              E-Mail:{" "}
              <a href={`mailto:${company.email}`} className="text-primary hover:text-accent">
                {company.email}
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Inhaber
            </h2>
            <p className="text-on-surface">{company.owner}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Steuernummer
            </h2>
            <p className="text-on-surface">082/205/09835</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Berufsbezeichnung &amp; zuständige Kammer
            </h2>
            <p className="text-on-surface leading-relaxed">
              Sanitär- und Heizungstechnik (SHK)
              <br />
              {legalNotice.chamber}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Haftung für Inhalte
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter
              sind wir für eigene Inhalte dieser Website nach den allgemeinen
              Gesetzen verantwortlich.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Haftung für Links
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Für die Inhalte der
              verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
              der Seiten verantwortlich.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
              Urheberrecht
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
