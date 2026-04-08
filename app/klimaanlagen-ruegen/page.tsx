import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ClosingBand } from "@/components/ui/closing-band";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { company, findPageRoute } from "@/lib/site-data";

const route = findPageRoute("klimaanlagen-ruegen");

export const metadata: Metadata = {
  title: route?.title ?? "Klimaanlagen auf Rügen | Bertig",
  description:
    route?.description ??
    "Klimaanlagen für Wohnhäuser, Ferienimmobilien und kleine Gewerbeobjekte auf Rügen – sauber geplant und fachgerecht umgesetzt.",
};

const arbeitsweise = [
  {
    icon: "checklist",
    title: "Bedarfsanalyse",
    copy: "Raumgröße, Nutzungsart und Ausrichtung bestimmen die richtige Auslegung.",
  },
  {
    icon: "architecture",
    title: "Planung & Auswahl",
    copy: "Wir wählen Systeme, die zur Nutzung, zum Raum und zu Ihrer Immobilie passen.",
  },
  {
    icon: "construction",
    title: "Fachgerechter Einbau",
    copy: "Saubere Installation nach Herstellervorgaben, mit Prüfung der Kältemittelkreisläufe.",
  },
  {
    icon: "support_agent",
    title: "Übergabe & Service",
    copy: "Einweisung, Dokumentation und direkter Ansprechpartner auch nach dem Einbau.",
  },
];

const anwendungsfaelle = [
  { icon: "cottage", label: "Ferienimmobilien" },
  { icon: "home", label: "Wohnhäuser" },
  { icon: "store", label: "Kleines Gewerbe" },
  { icon: "meeting_room", label: "Einzelräume & OG" },
];

export default function KlimaanlagenRuegenPage() {
  const headline =
    route?.headline ?? "Klimaanlagen für mehr Komfort in Wohnhaus und Ferienimmobilie";
  const lead =
    route?.lead ??
    "Gerade auf Rügen werden Obergeschosse, Ferienwohnungen und gut gedämmte Räume im Sommer schnell warm.";
  const bullets: string[] = (route as { bullets?: string[] })?.bullets ?? [
    "Kühlung und Entfeuchtung sinnvoll kombinieren",
    "für Wohnhaus, Ferienobjekt und kleines Gewerbe",
    "Auslegung passend zu Nutzung und Raumstruktur",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 items-center gap-8">
          <div className="col-span-12 lg:col-span-7 lg:pr-12">
            <Kicker className="mb-6">Klimaanlagen auf Rügen</Kicker>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight mb-8">
              {headline}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button tone="primary" size="lg" href="/kontakt">
                Klimaanlage anfragen <Icon name="arrow_forward" />
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
                src="/images/services/klimaanlage-innen.jpg"
                alt="Klimaanlage in einem Wohnraum auf Rügen"
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
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <Kicker className="mb-4">Leistungsumfang</Kicker>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary mb-6 leading-tight">
              Was wir für Sie umsetzen
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Klimaanlagen kühlen nicht nur — sie regulieren auch Luftfeuchtigkeit und
              verbessern die Luftqualität. Gerade in dicht gedämmten Gebäuden oder
              Ferienimmobilien ein echter Mehrwert.
            </p>
            <ul className="space-y-4">
              {bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Icon name="check_circle" className="text-accent text-xl shrink-0 mt-0.5" fill />
                  <span className="text-on-surface leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              {anwendungsfaelle.map((item) => (
                <div
                  key={item.label}
                  className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="text-primary text-2xl" />
                  </div>
                  <span className="font-bold text-primary">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Arbeitsweise */}
      <Section tone="surface" id="arbeitsweise">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Kicker className="mb-4">Unsere Arbeitsweise</Kicker>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
            Von der Planung bis zur Übergabe.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {arbeitsweise.map((step, index) => (
            <div key={step.title} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black text-accent bg-accent/10 rounded-full w-7 h-7 flex items-center justify-center">
                  {index + 1}
                </span>
                <Icon name={step.icon} className="text-primary text-xl" />
              </div>
              <h3 className="font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{step.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <ClosingBand
        kicker="Klimaanlage anfragen"
        title="Kühler Kopf im Sommer."
        copy="Wir beraten Sie, welches System zu Ihrer Immobilie auf Rügen passt — und setzen es sauber um."
        actions={[
          { href: "/kontakt", label: "Klimaanlage anfragen", tone: "accent" },
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
