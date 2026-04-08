import Image from "next/image";
import Link from "next/link";

import { RequestForms } from "@/components/request-forms";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClosingBand } from "@/components/ui/closing-band";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import {
  buildPageMetadata,
  company,
  findPageRoute,
  maintenancePackages,
} from "@/lib/site-data";

const route = findPageRoute("wartung-service");

export const metadata = buildPageMetadata({
  title: route?.title ?? "Wartung & Service auf Rügen | Bertig",
  description:
    route?.description ??
    "Heizungswartung mit drei klaren Paketen, persönlicher Rückmeldung und strukturierter Datenerfassung auf Rügen.",
  path: "/wartung-service",
  imagePath: "/images/services/wartung-inspektion.jpg",
});

export default function WartungServicePage() {
  const headline = route?.headline ?? "Wartung und Service mit klarem Ablauf statt endlosem Hin und Her";
  const lead =
    route?.lead ??
    "Regelmäßige Wartung schützt vor Ausfällen, verlängert die Lebensdauer Ihrer Anlage und schafft planbare Sicherheit.";
  const benefits: string[] = (route as { benefits?: string[] })?.benefits ?? [
    "weniger Rückfragen durch strukturierte Datenerfassung",
    "bessere Einsatzvorbereitung mit Typenschildfoto",
    "klare Pakete statt unklarer Wartungsbegriffe",
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 items-center gap-8">
          <div className="col-span-12 lg:col-span-7 lg:pr-12">
            <Kicker className="mb-6">Wartung &amp; Service</Kicker>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight mb-8">
              {headline}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button tone="primary" size="lg" href="#anfrage">
                Wartung anfragen <Icon name="arrow_downward" />
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
                src="/images/services/wartung-inspektion.jpg"
                alt="Heizungswartung durch Bertig auf Rügen"
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

      {/* Benefits */}
      <Section tone="surface-low">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Kicker className="mb-4">Warum strukturiert</Kicker>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-primary">
            Weniger Aufwand. Bessere Vorbereitung.
          </h2>
        </div>
        <ul className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-start gap-4 bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10"
            >
              <Icon name="check_circle" className="text-accent text-xl mt-0.5 shrink-0" fill />
              <span className="text-on-surface-variant leading-relaxed">{benefit}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Pakete */}
      <Section tone="surface" id="pakete">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Kicker className="mb-4">Unsere Pakete</Kicker>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-6">
            Drei klare Wartungspakete.
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            Wählen Sie das Paket, das zu Ihrer Anlage passt. Bei Fragen melden Sie sich einfach direkt.
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
              <h3 className="text-2xl font-bold text-primary mb-2">{pkg.name}</h3>
              <p className="text-sm text-on-surface-variant mb-4">{pkg.audience}</p>
              <p className="text-lg font-bold text-primary mb-6">{pkg.priceLabel}</p>
              <ul className="space-y-3 text-sm text-on-surface-variant mb-8">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Icon name="check_circle" className="text-accent text-base shrink-0 mt-0.5" fill />
                    {item}
                  </li>
                ))}
              </ul>
              <Button tone="secondary" href="#anfrage">
                {pkg.cta}
              </Button>
            </Card>
          ))}
        </div>
      </Section>

      {/* Anfrageformular */}
      <Section tone="surface-low" id="anfrage">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Kicker className="mb-4">Wartung anfragen</Kicker>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary mb-4">
              Jetzt Wartungstermin anfragen
            </h2>
            <p className="text-on-surface-variant">
              Füllen Sie das Formular aus — wir melden uns persönlich zurück.
            </p>
          </div>
          <div className="bg-surface-container-highest rounded-2xl border-b-2 border-accent p-8 shadow-sm">
            <RequestForms initialMode="maintenance" />
          </div>
        </div>
      </Section>

      <ClosingBand
        kicker="Direkter Kontakt"
        title="Wartung jetzt anfragen."
        copy="Persönliche Rückmeldung statt Callcenter. Wir melden uns zeitnah zurück."
        actions={[
          { href: "#anfrage", label: "Wartung anfragen", tone: "accent" },
          {
            href: company.phones.mobileHref,
            label: `Direkt anrufen: ${company.phones.mobile}`,
            tone: "outline",
          },
        ]}
      />
    </>
  );
}
