import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildFaqJsonLd, buildPageMetadata, faqEntries } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Häufige Fragen — Bertig Sanitär- und Heizungstechnik",
  description:
    "Antworten auf häufige Fragen zu Heizung, Wärmepumpe, Wartung und Badsanierung auf Rügen.",
  path: "/faq",
});

const directLinks = [
  {
    href: "/waermepumpen-ruegen",
    title: "Wärmepumpen auf Rügen",
    copy: "Wenn es um Machbarkeit, Bestand und ehrliche Systemplanung geht.",
  },
  {
    href: "/wartung-service",
    title: "Wartung & Service",
    copy: "Für regelmäßige Wartung, strukturierte Datenerfassung und klare Pakete.",
  },
  {
    href: "/badsanierung-ruegen",
    title: "Badsanierung auf Rügen",
    copy: "Wenn Sie vom FAQ direkt ins konkrete Badprojekt springen möchten.",
  },
  {
    href: "/ratgeber",
    title: "Ratgeber lesen",
    copy: "Für vertiefende Antworten zu Wärmepumpe, Wartung und Badmodernisierung.",
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={buildFaqJsonLd(faqEntries)} />

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Kicker className="mb-6">Häufige Fragen</Kicker>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05]">
              Was Kunden uns fragen.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Klare Antworten auf die Fragen, die uns vor einem Projekt am
              häufigsten erreichen — zu Heizung, Wärmepumpe, Wartung und Bad.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ-Liste */}
      <Section tone="surface-low">
        <div className="max-w-3xl mx-auto space-y-3">
          {faqEntries.map((entry) => (
            <details
              key={entry.question}
              className="group bg-surface-container-lowest rounded-xl border border-outline-variant/10 overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 sm:p-6 font-bold text-primary list-none">
                <span>{entry.question}</span>
                <span className="material-symbols-outlined text-accent flex-shrink-0 transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-on-surface-variant leading-relaxed">
                {entry.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Kicker className="mb-4">Direkt weiter</Kicker>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary">
              Die passenden nächsten Seiten zum Thema
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {directLinks.map((link) => (
              <Card key={link.href}>
                <Link href={link.href} className="block group">
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {link.copy}
                  </p>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section tone="surface-low">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <Kicker className="mb-2">Noch Fragen?</Kicker>
          <h2 className="text-3xl font-extrabold text-primary leading-tight">
            Ihre Frage war nicht dabei?
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Rufen Sie uns an oder schreiben Sie uns direkt. Wir antworten
            persönlich und ohne Skript.
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-primary-container transition-colors"
          >
            Frage stellen
          </a>
        </div>
      </Section>
    </>
  );
}
