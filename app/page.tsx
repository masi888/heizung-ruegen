import Image from "next/image";
import Link from "next/link";

import { BeforeAfter } from "@/components/ui/before-after";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClosingBand } from "@/components/ui/closing-band";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { TrustBar } from "@/components/ui/trust-bar";
import {
  company,
  faqEntries,
  homeContent,
  homeHero,
  maintenancePackages,
} from "@/lib/site-data";

const services = [
  {
    icon: "heat_pump",
    title: "Wärmepumpen",
    copy: "Ehrlich geprüft, sauber geplant. Wir sagen ehrlich, wann sie passt — und wann nicht.",
    href: "/waermepumpen-ruegen",
  },
  {
    icon: "local_fire_department",
    title: "Heizung modernisieren",
    copy: "Vom Öl-Austausch bis zum Gas-Brennwert und Bosch Premium Partner-Technik.",
    href: "/heizung-ruegen",
  },
  {
    icon: "build_circle",
    title: "Wartung & Service",
    copy: "Drei klare Pakete, Typenschild-Upload und saubere Rückmeldung statt Blackbox.",
    href: "/wartung-service",
  },
  {
    icon: "shower",
    title: "Badsanierung",
    copy: "Teilmodernisierung oder Komplettumbau, koordiniert aus einer Hand.",
    href: "/badsanierung-ruegen",
  },
  {
    icon: "mode_fan",
    title: "Klimaanlagen",
    copy: "Kühlen und entfeuchten für Ferienimmobilien und Wohnhäuser auf Rügen.",
    href: "/klimaanlagen-ruegen",
  },
  {
    icon: "emergency",
    title: "24h-Notdienst",
    copy: "Wenn die Heizung ausfällt, zählt direkte Erreichbarkeit.",
    href: "/notdienst",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Task 4.1 — Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 editorial-grid items-center">
          <div className="col-span-12 lg:col-span-7 lg:pr-12">
            <Kicker className="mb-6">{homeHero.eyebrow}</Kicker>
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[5.5rem] lg:leading-[1.05] font-extrabold tracking-[-0.02em] text-primary mb-8 break-words hyphens-auto">
              Wärme für Generationen.
              <br />
              <span className="text-accent">Vater &amp; Sohn.</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {homeHero.lead}
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
              <Button tone="primary" size="lg" href="/leistungen">
                Unsere Leistungen <Icon name="arrow_forward" />
              </Button>
              <Link
                href={company.phones.mobileHref}
                className="flex items-center gap-4 px-6 py-4 bg-surface-container-high rounded-lg w-full sm:w-auto min-w-0"
              >
                <div className="flex -space-x-3">
                  <span className="w-10 h-10 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-on-primary text-xs font-bold">
                    EB
                  </span>
                  <span className="w-10 h-10 rounded-full border-2 border-surface bg-accent flex items-center justify-center text-on-accent text-xs font-bold">
                    MB
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">
                  Direkt vom Inhaber
                </span>
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/hero/vater-sohn-werkstatt.jpg"
                alt="Präzise Handwerksarbeit an einer modernen Heizungsanlage"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-xl shadow-xl max-w-[260px]">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="verified" className="text-accent" fill />
                <span className="font-bold text-primary">Insel-Expertise</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                {homeContent.sections?.[1]?.items?.[1] ??
                  "Wir kennen die Anforderungen von Wohnhäusern und Ferienimmobilien auf Rügen."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Task 4.2 — Trust Bar + Services */}
      <TrustBar />
      <Section tone="surface-low" id="leistungen">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <Kicker className="mb-4">Technik, die bleibt.</Kicker>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
              Sechs Leistungsfelder,
              <br />
              eine klare Handschrift.
            </h2>
          </div>
          <p className="text-on-surface-variant max-w-md">
            Von der Modernisierung bis zur hochmodernen Wärmepumpe — wir rüsten
            Ihr Zuhause auf Rügen für die Zukunft.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.href}>
              <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center mb-6">
                <Icon name={service.icon} className="text-primary text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">
                {service.title}
              </h3>
              <p className="text-on-surface-variant leading-relaxed mb-6">
                {service.copy}
              </p>
              <Link
                href={service.href}
                className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Mehr erfahren <Icon name="east" />
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Task 4.3 — Story Section */}
      <Section tone="surface" id="ueber-uns">
        <div className="editorial-grid items-center gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/images/atmosphere/werkstatt-detail.jpg"
                alt="Traditionelles Werkzeug trifft moderne Technik"
                width={1600}
                height={1200}
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="hidden md:flex absolute -top-10 -right-6 lg:-right-10 w-36 lg:w-40 h-36 lg:h-40 bg-accent rounded-full items-center justify-center text-center border-8 border-surface transform rotate-[8deg]">
                <span className="text-primary font-black text-lg leading-tight">
                  Seit 1990 auf Rügen
                </span>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
            <Kicker className="mb-4">Unsere Geschichte</Kicker>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-8 leading-tight">
              Tradition trifft <span className="text-accent">Next Gen.</span>
            </h2>
            <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
              <p>
                Was 1990 als Ein-Mann-Betrieb in Breege begann, ist heute ein
                Familienbetrieb mit klarer Linie: belastbare Planung, saubere
                Ausführung und Erreichbarkeit auf der ganzen Insel.
              </p>
              <p>
                Vater und Sohn arbeiten Seite an Seite — jahrzehntelanges
                Praxiswissen trifft moderne Technik und neue Ausbildung.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-12">
              <div>
                <div className="text-4xl font-black text-primary mb-1">
                  100%
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                  Insel-Fokus
                </div>
              </div>
              <div>
                <div className="text-4xl font-black text-primary mb-1">
                  24/7
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
                  Notdienst-Bereit
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Task 4.4 — Vorher/Nachher Showcase */}
      <Section tone="surface-container" id="vorher-nachher">
        <div className="editorial-grid items-center gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <Kicker className="mb-4">Vorher / Nachher</Kicker>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight">
              Was bei uns aus einer Modernisierung wird.
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              Ein Bad aus den 80ern oder eine alte Heizung kann mit klarer
              Planung und sauberer Ausführung zu einem spürbar besseren Alltag
              werden. Ziehen Sie den Regler — so sieht der Unterschied aus.
            </p>
            <Button tone="primary" href="/kontakt">
              Projekt anfragen
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <BeforeAfter
              beforeSrc="/images/before-after/bad-vorher.jpg"
              afterSrc="/images/before-after/bad-nachher.jpg"
              alt="Badsanierung"
              caption="Badmodernisierung — dieselbe Raumgeometrie, neue Funktion."
            />
            <BeforeAfter
              beforeSrc="/images/before-after/heizung-vorher.jpg"
              afterSrc="/images/before-after/heizung-nachher.jpg"
              alt="Heizungsmodernisierung"
              caption="Kesseltausch — alter Ölkessel zu modernem Brennwertgerät."
            />
          </div>
        </div>
      </Section>

      {/* Task 4.5 — Wartungs-Teaser */}
      <Section tone="surface" id="wartung">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Kicker className="mb-4">Wartung &amp; Service</Kicker>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-6">
            Drei klare Pakete. Ein strukturierter Weg.
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Klare Leistungen, Typenschild-Upload und persönliche Rückmeldung
            statt Wartungs-Blackbox.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {maintenancePackages.map((pkg) => (
            <Card
              key={pkg.slug}
              className={pkg.recommended ? "ring-2 ring-accent" : ""}
            >
              {pkg.recommended && (
                <span className="inline-block bg-accent text-on-accent text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-md mb-4">
                  Empfohlen
                </span>
              )}
              <h3 className="text-2xl font-bold text-primary mb-2">
                {pkg.name}
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">
                {pkg.audience}
              </p>
              <p className="text-lg font-bold text-primary mb-6">
                {pkg.priceLabel}
              </p>
              <ul className="space-y-3 text-sm text-on-surface-variant mb-8">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Icon name="check_circle" className="text-accent text-base" fill />
                    {item}
                  </li>
                ))}
              </ul>
              <Button tone="secondary" href="/wartung-service">
                {pkg.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Task 4.5 — FAQ Teaser */}
      <Section tone="surface-low" id="faq-teaser">
        <div className="editorial-grid gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-4">
            <Kicker className="mb-4">Häufige Fragen</Kicker>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
              Was Kunden uns vor einem Projekt fragen.
            </h2>
            <Button tone="ghost" href="/faq" className="mt-8">
              Alle Fragen <Icon name="east" />
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {faqEntries.slice(0, 3).map((entry) => (
              <details
                key={entry.question}
                className="group bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10"
              >
                <summary className="flex items-center justify-between cursor-pointer font-bold text-primary">
                  {entry.question}
                  <Icon
                    name="expand_more"
                    className="transition-transform group-open:rotate-180"
                  />
                </summary>
                <p className="mt-4 text-on-surface-variant leading-relaxed">
                  {entry.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* Task 4.5 — Closing Band */}
      <ClosingBand
        kicker="Direkter Kontakt"
        title="Bereit für ein warmes Zuhause?"
        copy="Vereinbaren Sie noch heute ein unverbindliches Beratungsgespräch direkt bei Ihnen vor Ort auf Rügen."
        actions={[
          { href: "/kontakt", label: "Termin vereinbaren", tone: "accent" },
          {
            href: company.phones.mobileHref,
            label: "Rückruf anfordern",
            tone: "outline",
          },
        ]}
      />
    </>
  );
}
