import Image from "next/image";
import Link from "next/link";

import { ClosingBand } from "@/components/ui/closing-band";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company, knowledgeEntries } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Ratgeber — Bertig Sanitär- und Heizungstechnik",
  description:
    "Wissenswertes zu Wärmepumpe, Heizungsförderung, Wärmeplanung, Wartung und Badsanierung auf Rügen — verständlich erklärt vom Fachbetrieb.",
  path: "/ratgeber",
  imagePath: "/images/ratgeber/waermepumpe.jpg",
});

const ratgeberImages: Record<string, string> = {
  "/ratgeber/waermepumpe-im-bestand-ruegen": "/images/ratgeber/waermepumpe.jpg",
  "/ratgeber/heizungswartung-was-wirklich-gemacht-wird": "/images/ratgeber/wartung.jpg",
  "/ratgeber/bad-modernisieren-ohne-komplettumbau": "/images/ratgeber/bad.jpg",
  "/ratgeber/heizungsfoerderung-2026-ruegen": "/images/ratgeber/wartung.jpg",
  "/ratgeber/heizungsgesetz-waermeplanung-ruegen-2026": "/images/ratgeber/waermepumpe.jpg",
  "/ratgeber/barrierearmes-bad-foerderung-ruegen-2026": "/images/ratgeber/bad.jpg",
};

const topicHubs = [
  {
    href: "/waermepumpen-ruegen",
    title: "Wärmepumpen auf Rügen",
    copy: "Von der ersten Machbarkeitsfrage direkt zur passenden Leistungsseite.",
  },
  {
    href: "/wartung-service",
    title: "Wartung & Service",
    copy: "Praktisch weiter zu Wartungspaketen, Anfrageformular und Serviceablauf.",
  },
  {
    href: "/badsanierung-ruegen",
    title: "Badsanierung auf Rügen",
    copy: "Wenn aus einem Ratgeberthema ein konkretes Badprojekt werden soll.",
  },
  {
    href: "/faq",
    title: "Häufige Fragen",
    copy: "Für kurze Antworten und weitere interne Einstiegspunkte.",
  },
];

export default function RatgeberPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Kicker className="mb-6">Ratgeber</Kicker>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05]">
              Wissen für bessere Entscheidungen.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Heizung, Förderung, Wärmeplanung, Wartung, Bad — wir erklären,
              was auf Rügen gerade wirklich relevant ist. Damit Sie als
              Eigentümer oder Verwalter fundiert entscheiden können.
            </p>
          </div>
        </div>
      </section>

      {/* Artikel-Grid */}
      <Section tone="surface-low">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

      <Section tone="surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Kicker className="mb-4">Themen vertiefen</Kicker>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary">
              Vom Wissen direkt zur passenden Leistungsseite
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {topicHubs.map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="group bg-surface-container-low rounded-xl p-8 border border-outline-variant/10 hover:border-accent/30 transition-colors"
              >
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {hub.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {hub.copy}
                </p>
              </Link>
            ))}
          </div>
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
