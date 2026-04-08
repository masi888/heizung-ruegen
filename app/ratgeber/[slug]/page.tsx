import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EditorialClosingBand, EditorialHero } from "@/components/editorial-primitives";
import { pageVisuals } from "@/lib/editorial-content";
import { buildCanonical, company, findKnowledgeRoute, knowledgeSlugs } from "@/lib/site-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return knowledgeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = findKnowledgeRoute(slug);

  if (!entry) {
    return {};
  }

  return {
    title: `${entry.title} | Bertig Ratgeber`,
    description: entry.intro,
    alternates: {
      canonical: buildCanonical(entry.slug),
    },
  };
}

export default async function KnowledgeArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const entry = findKnowledgeRoute(slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="editorial-page">
      <EditorialHero
        actions={[
          { href: "/kontakt", label: entry.cta, tone: "primary" },
          { href: "/ratgeber", label: "Zurück zum Ratgeber", tone: "secondary" },
        ]}
        imageAlt={pageVisuals.knowledge.alt}
        imageSrc={pageVisuals.knowledge.src}
        kicker="Ratgeber"
        lead={entry.intro}
        title={entry.title}
      />

      <article className="editorial-article-shell">
        <div className="editorial-richtext">
          <p>
            Auf Rügen wirken Heiztechnik, Nutzung und Gebäuderealität oft anders zusammen als in pauschalen
            Online-Versprechen. Deshalb ordnet Bertig Themen lieber ehrlich und regional ein, statt nur Schlagwörter
            zu wiederholen.
          </p>
          <ul className="feature-list feature-list-wide">
            {entry.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p>
            Wenn daraus ein konkretes Projekt wird, ist der nächste sinnvolle Schritt kein blindes Sofortangebot,
            sondern eine qualifizierte Anfrage oder ein sauber vorbereiteter Vor-Ort-Termin.
          </p>
          <p>
            Wer lieber direkt sprechen möchte, erreicht den Betrieb auch telefonisch unter{" "}
            <a href={company.phones.mobileHref}>{company.phones.mobile}</a>.
          </p>
        </div>
      </article>

      <EditorialClosingBand
        actions={[
          { href: "/kontakt", label: entry.cta, tone: "primary" },
          { href: "/ratgeber", label: "Weitere Themen lesen", tone: "secondary" },
        ]}
        copy="Wenn das Thema für das eigene Haus konkret wird, hilft keine allgemeine Liste mehr, sondern eine gute Einordnung vor Ort."
        kicker="Kontakt"
        title="Aus dem Thema direkt in den nächsten sinnvollen Schritt."
      />
    </div>
  );
}
