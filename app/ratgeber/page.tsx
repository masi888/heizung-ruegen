import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ClosingBand } from "@/components/ui/closing-band";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { company, knowledgeEntries } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Ratgeber — Bertig Sanitär- und Heizungstechnik",
  description:
    "Wissenswertes zu Wärmepumpe, Heizungswartung und Badsanierung auf Rügen — verständlich erklärt vom Fachbetrieb.",
};

const ratgeberImages: Record<string, string> = {
  "/ratgeber/waermepumpe-im-bestand-ruegen": "/images/ratgeber/waermepumpe.jpg",
  "/ratgeber/heizungswartung-was-wirklich-gemacht-wird": "/images/ratgeber/wartung.jpg",
  "/ratgeber/bad-modernisieren-ohne-komplettumbau": "/images/ratgeber/bad.jpg",
};

export default function RatgeberPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Kicker className="mb-6">Ratgeber</Kicker>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05]">
              Wissen für bessere Entscheidungen.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Heizung, Wärmepumpe, Wartung, Bad — wir erklären, was wirklich
              dahintersteckt. Damit Sie als Eigentümer oder Verwalter fundiert
              entscheiden können.
            </p>
          </div>
        </div>
      </section>

      {/* Artikel-Grid */}
      <Section tone="surface-low">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {knowledgeEntries.map((entry) => {
            const imgSrc = ratgeberImages[entry.slug] ?? "/images/ratgeber/waermepumpe.jpg";
            const slug = entry.slug.replace("/ratgeber/", "");
            return (
              <Link
                key={entry.slug}
                href={`/ratgeber/${slug}`}
                className="group bg-surface-container-lowest rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,30,64,0.25)]"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <Image
                    src={imgSrc}
                    alt={entry.title}
                    width={800}
                    height={533}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8 space-y-3">
                  <h2 className="text-xl font-bold text-primary leading-snug">
                    {entry.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                    {entry.intro}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent group-hover:gap-3 transition-all">
                    Artikel lesen
                    <span className="material-symbols-outlined text-base">east</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <ClosingBand
        kicker="Beratung anfragen"
        title="Fragen zum Artikel? Wir sind direkt erreichbar."
        copy="Kein Kontaktformular-Labyrinth. Rufen Sie an oder schreiben Sie uns — wir antworten persönlich."
        actions={[
          { href: "/kontakt", label: "Anfrage stellen", tone: "accent" },
          { href: company.phones.mobileHref, label: "Jetzt anrufen", tone: "outline" },
        ]}
      />
    </>
  );
}
