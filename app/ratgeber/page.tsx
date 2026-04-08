import type { Metadata } from "next";
import Link from "next/link";

import { EditorialClosingBand, EditorialHero } from "@/components/editorial-primitives";
import { pageVisuals } from "@/lib/editorial-content";
import { buildCanonical, knowledgeEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Ratgeber zu Wärmepumpe, Wartung und Bad auf Rügen | Bertig",
  description: "Hilfreiche, lokale und verständliche Wissensinhalte zu Wärmepumpe im Bestand, Heizungswartung und Badmodernisierung auf Rügen.",
  alternates: {
    canonical: buildCanonical("/ratgeber"),
  },
};

export default function KnowledgeHubPage() {
  return (
    <div className="editorial-page">
      <EditorialHero
        actions={[
          { href: "/kontakt", label: "Projekt anfragen", tone: "primary" },
          { href: "/faq", label: "FAQ ansehen", tone: "secondary" },
        ]}
        imageAlt={pageVisuals.knowledge.alt}
        imageSrc={pageVisuals.knowledge.src}
        kicker="Ratgeber"
        lead="Diese Inhalte sollen Kunden wirklich weiterbringen und gleichzeitig die fachliche Positionierung von Bertig auf Rügen stärken."
        title="Hilfreiche Antworten statt leerer SEO-Texte."
      />

      <section className="editorial-section">
        <div className="editorial-card-grid">
          {knowledgeEntries.map((entry) => (
            <article key={entry.slug} className="editorial-content-card">
              <p className="ref-kicker">Ratgeber</p>
              <h3>{entry.title}</h3>
              <p>{entry.intro}</p>
              <ul className="editorial-inline-list">
                {entry.points.slice(0, 3).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link href={entry.slug}>Artikel lesen</Link>
            </article>
          ))}
        </div>
      </section>

      <EditorialClosingBand
        actions={[
          { href: "/kontakt", label: "Thema besprechen", tone: "primary" },
          { href: "/leistungen", label: "Leistungen ansehen", tone: "secondary" },
        ]}
        copy="Wenn aus einer Frage ein konkretes Vorhaben wird, ist der nächste Schritt eine kurze, qualifizierte Anfrage."
        kicker="Nächster Schritt"
        title="Wissen ist hilfreich. Entscheidend bleibt eine saubere Umsetzung."
      />
    </div>
  );
}
