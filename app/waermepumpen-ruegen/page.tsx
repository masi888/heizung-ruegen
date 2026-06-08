import Image from "next/image";
import Link from "next/link";

import { ClosingBand } from "@/components/ui/closing-band";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company, findPageRoute } from "@/lib/site-data";

const route = findPageRoute("waermepumpen-ruegen")!;

export const metadata = buildPageMetadata({
  title: route.title,
  description: route.description,
  path: "/waermepumpen-ruegen",
  imagePath: "/images/services/waermepumpe-aussen.webp",
});

const steps = [
  {
    icon: "fact_check",
    title: "Machbarkeit",
    copy: "Bestand, Heizlast und Vorlauftemperatur ehrlich prüfen — bevor wir etwas empfehlen.",
  },
  {
    icon: "engineering",
    title: "Konzept",
    copy: "Systemplanung passend zu Gebäude, Nutzung und Warmwasserbedarf.",
  },
  {
    icon: "handyman",
    title: "Installation & Monitoring",
    copy: "Saubere Inbetriebnahme und regionaler Ansprechpartner auch danach.",
  },
];

const relatedLinks = [
  {
    href: "/ratgeber/waermepumpe-im-bestand-ruegen",
    title: "Ratgeber: Wärmepumpe im Bestand",
    copy: "Die inhaltliche Vertiefung zu Heizflächen, Warmwasser und Nutzung auf Rügen.",
  },
  {
    href: "/ratgeber/heizungsfoerderung-2026-ruegen",
    title: "Ratgeber: Heizungsförderung 2026 auf Rügen",
    copy: "Welche KfW-Bausteine beim Systemwechsel aktuell wirklich zählen.",
  },
  {
    href: "/ratgeber/heizungsgesetz-waermeplanung-ruegen-2026",
    title: "Ratgeber: Heizungsgesetz und Wärmeplanung 2026",
    copy: "Die aktuelle Einordnung für Eigentümer auf Rügen und in kleineren Gemeinden.",
  },
];

export default function WaermepumpenPage() {
  return (
    <>
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-12 gap-6 items-center">
          <div className="col-span-12 lg:col-span-7">
            <Kicker className="mb-6">Wärmepumpen · Rügen</Kicker>
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-7xl lg:leading-[1.05] font-extrabold text-primary tracking-[-0.02em] mb-8 break-words hyphens-auto">
              {route.headline}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed mb-10">
              {route.lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button tone="primary" size="lg" href="/kontakt">
                Machbarkeit besprechen
              </Button>
              <Button tone="secondary" size="lg" href={company.phones.mobileHref}>
                <Icon name="call" /> Jetzt anrufen
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/services/waermepumpe-aussen.webp"
                alt="Wärmepumpe Außeneinheit"
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
              Ehrlich geprüft, sauber geplant.
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
          Von der Machbarkeitsprüfung zur laufenden Anlage.
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

      <Section tone="surface-low">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Kicker className="mb-4">Weiterführende Inhalte</Kicker>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary">
              Die passenden nächsten Seiten zur Wärmepumpe
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 hover:border-accent/30 transition-colors"
              >
                <h3 className="text-lg font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {item.copy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <ClosingBand
        kicker="Wärmepumpe auf Rügen"
        title="Passt eine Wärmepumpe zu Ihrem Gebäude?"
        copy="Wir klären das gemeinsam — mit einer Einschätzung, die auf Ihrem Bestand basiert, nicht auf Verkaufszielen."
        actions={[
          { href: "/kontakt", label: "Termin vereinbaren", tone: "accent" },
          { href: company.phones.mobileHref, label: "Direkt anrufen", tone: "outline" },
        ]}
      />
    </>
  );
}
