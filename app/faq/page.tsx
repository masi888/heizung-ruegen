import type { Metadata } from "next";

import { EditorialClosingBand, EditorialHero } from "@/components/editorial-primitives";
import { JsonLd } from "@/components/json-ld";
import { pageVisuals } from "@/lib/editorial-content";
import { buildCanonical, buildFaqJsonLd, company, faqEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "FAQ zu Heizung, Wartung und Bad auf Rügen | Bertig",
  description: "Antworten auf typische Fragen zu Notdienst, Wärmepumpe, Wartung, Badmodernisierung und Einsatzgebiet auf Rügen.",
  alternates: {
    canonical: buildCanonical("/faq"),
  },
};

export default function FaqPage() {
  return (
    <div className="editorial-page">
      <JsonLd data={buildFaqJsonLd(faqEntries)} />
      <EditorialHero
        actions={[
          { href: "/kontakt", label: "Kontakt aufnehmen", tone: "primary" },
          { href: company.phones.mobileHref, label: "Notdienst", tone: "secondary" },
        ]}
        imageAlt={pageVisuals.faq.alt}
        imageSrc={pageVisuals.faq.src}
        kicker="FAQ"
        lead="Kurze Antworten zu Einsatzgebiet, Wärmepumpe, Wartung, Notdienst und typischen Projektfragen."
        title="Fragen, die vor einer Anfrage meist zuerst auftauchen."
      />

      <section className="editorial-section">
        <div className="editorial-faq-list">
          {faqEntries.map((entry) => (
            <article key={entry.question} className="editorial-faq-card">
              <h2>{entry.question}</h2>
              <p>{entry.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <EditorialClosingBand
        actions={[
          { href: "/kontakt", label: "Projekt anfragen", tone: "primary" },
          { href: "/leistungen", label: "Leistungen ansehen", tone: "secondary" },
        ]}
        copy="Wenn die wichtigsten Fragen geklärt sind, ist der nächste Schritt eine kurze, saubere Anfrage."
        kicker="Kontakt"
        title="Von der Antwort direkt in den nächsten sinnvollen Schritt."
      />
    </div>
  );
}
