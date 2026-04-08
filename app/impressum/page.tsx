import type { Metadata } from "next";

import { EditorialSectionIntro } from "@/components/editorial-primitives";
import { buildCanonical, company, legalNotice } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Impressum | Bertig Sanitär- und Heizungstechnik",
  alternates: {
    canonical: buildCanonical("/impressum"),
  },
};

export default function ImpressumPage() {
  return (
    <div className="editorial-page editorial-page-legal">
      <section className="editorial-legal-hero">
        <EditorialSectionIntro kicker="Impressum" title={company.name} />
        <p>Rechtliche Angaben in ruhiger, klarer Darstellung.</p>
      </section>

      <section className="editorial-legal-stack">
        <article className="editorial-legal-card">
          <h2>Anbieter</h2>
          <p>
            Einzelunternehmen
            <br />
            Inhaber: {company.owner}
            <br />
            {company.address.street}
            <br />
            {company.address.postalCode} {company.address.city}
          </p>
          <p>
            Telefon: <a href={company.phones.landlineHref}>{company.phones.landline}</a>
            <br />
            Mobil: <a href={company.phones.mobileHref}>{company.phones.mobile}</a>
            <br />
            E-Mail: <a href={`mailto:${company.email}`}>{company.email}</a>
          </p>
        </article>

        <article className="editorial-legal-card">
          <h2>Berufsrechtliche Angaben</h2>
          <p>Zuständige Kammer: {legalNotice.chamber}</p>
        </article>

        <article className="editorial-legal-card">
          <h2>Hinweis</h2>
          <p>{legalNotice.taxNotice}</p>
        </article>
      </section>
    </div>
  );
}
