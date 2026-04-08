import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BeforeAfter } from "@/components/ui/before-after";
import { Button } from "@/components/ui/button";
import { ClosingBand } from "@/components/ui/closing-band";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { company, findPageRoute } from "@/lib/site-data";

const route = findPageRoute("badsanierung-ruegen");

export const metadata: Metadata = {
  title: route?.title ?? "Badsanierung auf Rügen | Bertig",
  description:
    route?.description ??
    "Badsanierung und Badmodernisierung auf Rügen – persönlich geplant, sauber koordiniert.",
};

const arbeitsweise = [
  {
    icon: "forum",
    title: "Gespräch & Bedarfsanalyse",
    copy: "Wir hören zu, bevor wir planen. Was soll sich verbessern, was soll bleiben?",
  },
  {
    icon: "architecture",
    title: "Planung & Koordination",
    copy: "Sanitär, Heizung und Komfortdetails aus einer Hand, sauber aufeinander abgestimmt.",
  },
  {
    icon: "construction",
    title: "Saubere Umsetzung",
    copy: "Strukturierter Ablauf, verlässliche Termine, direkter Ansprechpartner.",
  },
  {
    icon: "verified",
    title: "Abnahme & Nachbetreuung",
    copy: "Wir übergeben erst, wenn alles stimmt — und bleiben erreichbar.",
  },
];

export default function BadsanierungRuegenPage() {
  const headline =
    route?.headline ?? "Bäder modernisieren, die im Alltag wirklich besser funktionieren";
  const lead =
    route?.lead ??
    "Ein gutes Bad sieht nicht nur besser aus – es nutzt sich täglich angenehmer, pflegeleichter und sicherer.";
  const bullets: string[] = (route as { bullets?: string[] })?.bullets ?? [
    "Teilmodernisierung oder Komplettumbau",
    "Duschumbau und alltagstaugliche Lösungen",
    "Modernisierung für Ferienimmobilien und private Wohnhäuser",
    "Abstimmung von Sanitär, Heizung und Komfortdetails",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 items-center gap-8">
          <div className="col-span-12 lg:col-span-7 lg:pr-12">
            <Kicker className="mb-6">Badsanierung auf Rügen</Kicker>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight mb-8">
              {headline}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button tone="primary" size="lg" href="/kontakt">
                Badprojekt anfragen <Icon name="arrow_forward" />
              </Button>
              <Link
                href={company.phones.mobileHref}
                className="flex items-center gap-3 px-6 py-4 bg-surface-container-high rounded-lg font-bold text-primary"
              >
                <Icon name="call" className="text-accent" />
                {company.phones.mobile}
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/services/badsanierung-modern.jpg"
                alt="Modernes Bad nach Sanierung durch Bertig auf Rügen"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Leistungsübersicht */}
      <Section tone="surface-low">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <Kicker className="mb-4">Leistungsumfang</Kicker>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary">
            Was wir für Sie übernehmen
          </h2>
        </div>
        <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-4 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10"
            >
              <Icon name="check_circle" className="text-accent text-xl shrink-0 mt-0.5" fill />
              <span className="text-on-surface leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Before/After Slider */}
      <Section tone="surface-container" id="vorher-nachher">
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <Kicker className="mb-4">Vorher / Nachher</Kicker>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight">
              Sehen Sie den Unterschied selbst.
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Ziehen Sie den Regler — so sieht ein Bad aus, das wir modernisiert
              haben. Gleiche Raumgeometrie, neue Funktion, besserer Alltag.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <BeforeAfter
              beforeSrc="/images/before-after/bad-vorher.jpg"
              afterSrc="/images/before-after/bad-nachher.jpg"
              alt="Badsanierung auf Rügen"
              caption="Badmodernisierung — dieselbe Raumgeometrie, neue Funktion."
            />
          </div>
        </div>
      </Section>

      {/* Arbeitsweise */}
      <Section tone="surface" id="arbeitsweise">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Kicker className="mb-4">Unsere Arbeitsweise</Kicker>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
            So läuft ein Badprojekt bei uns ab.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {arbeitsweise.map((step, index) => (
            <div key={step.title} className="relative">
              <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-black text-accent bg-accent/10 rounded-full w-7 h-7 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <Icon name={step.icon} className="text-primary text-xl" />
                </div>
                <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <ClosingBand
        kicker="Badprojekt starten"
        title="Ihr Bad. Neu gedacht."
        copy="Erzählen Sie uns, was Sie sich vorstellen. Wir besprechen Machbarkeit und Umfang direkt vor Ort."
        actions={[
          { href: "/kontakt", label: "Projekt anfragen", tone: "accent" },
          {
            href: company.phones.mobileHref,
            label: `Anrufen: ${company.phones.mobile}`,
            tone: "outline",
          },
        ]}
      />
    </>
  );
}
