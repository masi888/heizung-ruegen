import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EditorialClosingBand, EditorialHero, EditorialSectionIntro } from "@/components/editorial-primitives";
import { RequestForms } from "@/components/request-forms";
import { aboutHighlights, routeLabels, servicePageCopy, serviceVisuals } from "@/lib/editorial-content";
import { buildCanonical, company, findServiceRoute, routeSlugs, serviceRoutes } from "@/lib/site-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return routeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = findServiceRoute(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: buildCanonical(page.slug),
    },
  };
}

function getPageItems(page: ReturnType<typeof findServiceRoute>) {
  if (!page) {
    return [];
  }

  if ("bullets" in page && page.bullets) {
    return page.bullets;
  }

  if ("benefits" in page && page.benefits) {
    return page.benefits;
  }

  if ("checklist" in page && page.checklist) {
    return page.checklist;
  }

  return [];
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const page = findServiceRoute(slug);

  if (!page) {
    notFound();
  }

  const visual = serviceVisuals[page.slug] ?? serviceVisuals["/heizung-ruegen"];
  const copy = servicePageCopy[page.slug] ?? servicePageCopy["/heizung-ruegen"];
  const items = getPageItems(page);
  const heroTitle = "headline" in page && typeof page.headline === "string" ? page.headline : page.title;
  const heroLead = "lead" in page && typeof page.lead === "string" ? page.lead : page.description;
  const related = serviceRoutes.filter((route) => route.slug !== page.slug).slice(0, 3);
  const isMaintenance = page.slug === "/wartung-service";
  const isEmergency = page.slug === "/notdienst";
  const isAbout = page.slug === "/ueber-uns";

  return (
    <div className="editorial-page">
      <EditorialHero
        actions={[
          { href: page.slug === "/notdienst" ? company.phones.mobileHref : "/kontakt", label: page.cta ?? "Kontakt aufnehmen", tone: "primary" },
          { href: "/leistungen", label: "Zur Leistungsübersicht", tone: "secondary" },
        ]}
        imageAlt={visual.alt}
        imageSrc={visual.src}
        kicker={routeLabels[page.slug] ?? page.slug}
        lead={heroLead}
        note={visual.note}
        title={heroTitle}
      />

      <section className="editorial-section editorial-two-column">
        <div className="editorial-copy-card">
          <EditorialSectionIntro
            copy={copy.overviewCopy}
            kicker="Einordnung"
            title={copy.overviewTitle}
          />
          {isAbout ? (
            <ul className="feature-list">
              {aboutHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>
              {page.description}
            </p>
          )}
        </div>

        <div className="editorial-list-panel">
          <p className="ref-kicker">{copy.listTitle}</p>
          <ul className="feature-list">
            {(isAbout ? aboutHighlights : items).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {isMaintenance ? (
        <section className="editorial-section editorial-form-layout">
          <div className="editorial-info-card">
            <EditorialSectionIntro
              copy="Die Wartungspakete bleiben auf der passenden Unterseite, nicht auf der Startseite. So ist die Struktur klarer und die Anfrage bleibt fachlich sinnvoll eingeordnet."
              kicker="Wartung"
              title="Pakete und Anfrage sauber getrennt von der Startseite."
            />
            <div className="editorial-card-grid editorial-card-grid-compact">
              {related.slice(0, 2).map((entry) => (
                <article key={entry.slug} className="editorial-content-card">
                  <p className="ref-kicker">{routeLabels[entry.slug] ?? entry.slug}</p>
                  <h3>{entry.headline}</h3>
                  <p>{entry.lead}</p>
                  <Link href={entry.slug}>Mehr erfahren</Link>
                </article>
              ))}
            </div>
          </div>

          <div className="editorial-form-shell">
            <EditorialSectionIntro
              copy="Hier werden die Angaben abgefragt, die für eine gute Vorbereitung des Einsatzes wirklich helfen."
              kicker="Anfrage"
              title="Wartung strukturiert anfragen."
            />
            <RequestForms initialMode="maintenance" />
          </div>
        </section>
      ) : null}

      {page.slug === "/notdienst" ? (
        <EditorialClosingBand
          actions={[
            { href: company.phones.mobileHref, label: company.phones.mobile, tone: "primary" },
            { href: "/kontakt", label: "Projektanfrage senden", tone: "secondary" },
          ]}
          copy="Für akute Störungen zählt der direkte Anruf. Für planbare Arbeiten bleibt der normale Anfrageweg sinnvoller."
          kicker="Direkter Kontakt"
          title="Wenn es dringend ist, bitte direkt anrufen."
        />
      ) : (
        <section className="editorial-section">
          <EditorialSectionIntro
            copy="Diese Seiten werden oft zusammen betrachtet, wenn aus der ersten Frage ein konkreteres Projekt wird."
            kicker="Verwandte Themen"
            title="Was oft direkt dazugehört."
          />
          <div className="editorial-card-grid">
            {related.map((entry) => (
              <article key={entry.slug} className="editorial-content-card">
                <p className="ref-kicker">{routeLabels[entry.slug] ?? entry.slug}</p>
                <h3>{entry.headline}</h3>
                <p>{entry.lead}</p>
                <Link href={entry.slug}>Zur Seite</Link>
              </article>
            ))}
          </div>
        </section>
      )}

      {!isMaintenance && !isEmergency ? (
        <EditorialClosingBand
          actions={[
            { href: "/kontakt", label: page.cta ?? "Kontakt aufnehmen", tone: "primary" },
            { href: company.phones.mobileHref, label: "Notdienst", tone: "secondary" },
          ]}
          copy="Wenn das Thema für das eigene Haus konkret wird, hilft der direkte Kontakt mehr als weitere allgemeine Informationen."
          kicker="Nächster Schritt"
          title={isAbout ? "Aus dem Betrieb direkt in den persönlichen Kontakt." : "Vom Thema direkt in die passende Anfrage."}
        />
      ) : null}
    </div>
  );
}
