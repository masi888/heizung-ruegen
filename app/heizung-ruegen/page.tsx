import type { Metadata } from "next";
import Image from "next/image";

import { ClosingBand } from "@/components/ui/closing-band";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { company, findPageRoute } from "@/lib/site-data";

const route = findPageRoute("heizung-ruegen")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
};

const steps = [
  {
    icon: "fact_check",
    title: "Einordnung",
    copy: "Gebäude, Nutzung und Bestand prüfen — ohne Schnellverkauf.",
  },
  {
    icon: "engineering",
    title: "Planung",
    copy: "Modernes System passend zu Heizlast, Warmwasser und späterer Wartung.",
  },
  {
    icon: "handyman",
    title: "Umsetzung",
    copy: "Saubere Ausführung mit klaren Abläufen in bewohnten Häusern.",
  },
];

export default function HeizungPage() {
  return (
    <>
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-7">
            <Kicker className="mb-6">Heizung · Rügen</Kicker>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05] mb-8">
              {route.headline}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed mb-10">
              {route.lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button tone="primary" size="lg" href="/kontakt">
                Beratung anfragen
              </Button>
              <Button tone="secondary" size="lg" href={company.phones.mobileHref}>
                <Icon name="call" /> Jetzt anrufen
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/services/heizung-modernisierung.jpg"
                alt="Moderne Heizungsinstallation"
                width={1200}
                height={1500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Section tone="surface-low">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <Kicker className="mb-4">Wobei wir helfen</Kicker>
            <h2 className="text-4xl font-extrabold text-primary leading-tight">
              Von Öl-Austausch bis Gas-Brennwert.
            </h2>
          </div>
          <ul className="col-span-12 lg:col-span-7 space-y-5">
            {route.bullets?.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-4 bg-surface-container-lowest rounded-xl p-5"
              >
                <Icon name="check_circle" className="text-accent mt-0.5" fill />
                <span className="text-on-surface leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="surface">
        <Kicker className="mb-4">Arbeitsweise</Kicker>
        <h2 className="text-4xl font-extrabold text-primary mb-12 leading-tight max-w-3xl">
          Drei Schritte vom Gespräch zur fertigen Anlage.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="bg-surface-container-lowest rounded-xl p-8">
              <div className="text-accent text-sm font-black uppercase tracking-widest mb-4">
                0{i + 1}
              </div>
              <Icon name={s.icon} className="text-primary text-4xl mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">{s.title}</h3>
              <p className="text-on-surface-variant">{s.copy}</p>
            </div>
          ))}
        </div>
      </Section>

      <ClosingBand
        kicker="Heizung modernisieren"
        title="Sprechen wir über Ihre Heizung."
        copy="Ein Termin vor Ort klärt meist mehr als zehn Telefonate. Wir kommen auf Rügen bei Ihnen vorbei."
        actions={[
          { href: "/kontakt", label: "Termin vereinbaren", tone: "accent" },
          { href: company.phones.mobileHref, label: "Direkt anrufen", tone: "outline" },
        ]}
      />
    </>
  );
}
