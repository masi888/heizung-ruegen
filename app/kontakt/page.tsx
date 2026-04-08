import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { RequestForms } from "@/components/request-forms";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildLocalBusinessJsonLd, company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Kontakt — Bertig Sanitär- und Heizungstechnik",
  description:
    "Projektanfrage, Wartung oder allgemeine Fragen — wir sind direkt erreichbar. Telefon, E-Mail und Anfrageformular.",
};

const openingHourLabels: Record<string, string> = {
  Monday: "Montag",
  Tuesday: "Dienstag",
  Wednesday: "Mittwoch",
  Thursday: "Donnerstag",
  Friday: "Freitag",
  Saturday: "Samstag",
  Sunday: "Sonntag",
};

export default function KontaktPage() {
  return (
    <>
      <JsonLd data={buildLocalBusinessJsonLd()} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Kicker className="mb-6">Kontakt</Kicker>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05]">
              Direkt bei uns anfragen.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Kein Callcenter, keine Weiterleitungsschleife. Sie erreichen uns
              direkt — per Telefon, E-Mail oder über das Formular unten.
            </p>
          </div>
        </div>
      </section>

      {/* Kontaktbox + Formular */}
      <Section tone="surface-low">
        <div className="grid grid-cols-12 gap-12">
          {/* Kontaktdaten */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-surface-container-lowest rounded-xl p-8 space-y-6">
              <h2 className="text-xl font-bold text-primary">
                {company.name}
              </h2>
              <div className="space-y-3 text-sm text-on-surface-variant">
                <p className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-accent text-lg mt-0.5">place</span>
                  <span>
                    {company.address.street}
                    <br />
                    {company.address.postalCode} {company.address.city}
                  </span>
                </p>
                <a
                  href={company.phones.landlineHref}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-accent text-lg">call</span>
                  {company.phones.landline}
                </a>
                <a
                  href={company.phones.mobileHref}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-accent text-lg">smartphone</span>
                  {company.phones.mobile}
                </a>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-accent text-lg">mail</span>
                  {company.email}
                </a>
              </div>
            </div>

            {/* Öffnungszeiten */}
            <div className="bg-surface-container-lowest rounded-xl p-8 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                Öffnungszeiten
              </h3>
              <ul className="space-y-2 text-sm">
                {company.openingHours.map((h) => (
                  <li key={h.day} className="flex justify-between">
                    <span className="text-on-surface-variant">
                      {openingHourLabels[h.day] ?? h.day}
                    </span>
                    <span className="font-semibold text-primary">
                      {h.opens} – {h.closes} Uhr
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-on-surface-variant/70 pt-2 border-t border-outline-variant/15">
                Notdienst 24h erreichbar unter{" "}
                <a
                  href={company.phones.mobileHref}
                  className="font-semibold text-primary hover:text-accent"
                >
                  {company.phones.mobile}
                </a>
              </p>
            </div>
          </div>

          {/* Formular */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-surface-container-lowest rounded-xl p-8 lg:p-12">
              <Kicker className="mb-4">Anfrage stellen</Kicker>
              <h2 className="text-3xl font-extrabold text-primary mb-8 leading-tight">
                Was können wir für Sie tun?
              </h2>
              <RequestForms initialMode="project" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
