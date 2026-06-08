import Image from "next/image";
import Link from "next/link";

import { ClosingBand } from "@/components/ui/closing-band";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Unsere Leistungen",
  description:
    "Heizung, Wärmepumpen, Wartung, Bad, Klima und Notdienst — alle Leistungen von Bertig auf einen Blick.",
  path: "/leistungen",
  imagePath: "/images/services/leistungen-hero.jpg",
});

const services = [
  {
    href: "/heizung-ruegen",
    icon: "local_fire_department",
    title: "Heizung",
    lead: "Öl, Gas, modern oder hybrid — wir planen passend zum Haus.",
    bullets: ["Austausch & Modernisierung", "Brennwerttechnik", "Hybridlösungen"],
  },
  {
    href: "/waermepumpen-ruegen",
    icon: "heat_pump",
    title: "Wärmepumpen",
    lead: "Ehrliche Machbarkeitsprüfung bevor wir planen und installieren.",
    bullets: ["Luft-Wasser-Wärmepumpen", "Systemplanung", "Inbetriebnahme"],
  },
  {
    href: "/wartung-service",
    icon: "build",
    title: "Wartung & Service",
    lead: "Drei klare Pakete, planbare Kosten, persönliche Rückmeldung.",
    bullets: ["Jahreswartung", "Ferndiagnose", "Prüfprotokoll"],
  },
  {
    href: "/badsanierung-ruegen",
    icon: "bathtub",
    title: "Badsanierung",
    lead: "Von der Planung bis zur sauberen Übergabe aus einer Hand.",
    bullets: ["Komplettbad", "Barrierefreie Lösungen", "Vorher/Nachher"],
  },
  {
    href: "/klimaanlagen-ruegen",
    icon: "ac_unit",
    title: "Klimaanlagen",
    lead: "Split-Klimaanlagen für Wohn- und Ferienimmobilien auf Rügen.",
    bullets: ["Kühlen & Heizen", "Montage & Wartung", "Energieklasse A"],
  },
  {
    href: "/notdienst",
    icon: "emergency",
    title: "24h-Notdienst",
    lead: "Heizungsausfall oder Wasserrohrbruch — wir kommen auf Rügen.",
    bullets: ["Tag & Nacht erreichbar", "Schnelle Reaktion", "Rügen-weit"],
  },
  {
    href: "/wartung-service#enthaertung",
    icon: "water_drop",
    title: "Enthärtungsanlagen",
    lead: "Wartung für Ihre Wasserenthärtung — weniger Kalk, gleichbleibende Wasserqualität.",
    bullets: ["Jahreswartung", "Anlagenreinigung & -optimierung", "24/7-Notdienst"],
  },
];

export default function LeistungenPage() {
  return (
    <>
      <section className="pt-24 pb-12 sm:pt-32 sm:pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <Kicker className="mb-6">Leistungen</Kicker>
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-7xl lg:leading-[1.05] font-extrabold text-primary tracking-[-0.02em] break-words hyphens-auto">
              Haustechnik mit klarer Handschrift.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Sie suchen keinen Bauchladen, sondern einen Betrieb, der moderne
              Technik verständlich plant und sauber ausführt. Genau darauf ist
              Bertig ausgerichtet.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <Image
            src="/images/services/leistungen-hero.jpg"
            alt="Bertig Werkstatt"
            width={1600}
            height={900}
            className="w-full rounded-2xl"
          />
        </div>
      </section>

      <Section tone="surface-low">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Card key={s.href}>
              <Link href={s.href} className="block group">
                <div className="flex items-center gap-3 mb-4">
                  <Icon
                    name={s.icon}
                    className="text-accent text-3xl"
                    fill
                  />
                  <h2 className="text-xl font-bold text-primary">{s.title}</h2>
                </div>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                  {s.lead}
                </p>
                <ul className="space-y-2 mb-6">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-on-surface">
                      <Icon name="check" className="text-accent text-base" fill />
                      {b}
                    </li>
                  ))}
                </ul>
                <span className="text-sm font-bold text-accent group-hover:underline">
                  Mehr erfahren
                </span>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      <ClosingBand
        kicker="Direkter Kontakt"
        title="Welches Thema ist bei Ihnen dran?"
        copy="Ein kurzer Anruf oder eine Anfrage reicht. Wir sortieren und melden uns persönlich zurück."
        actions={[
          { href: "/kontakt", label: "Projekt anfragen", tone: "accent" },
          { href: company.phones.mobileHref, label: "Jetzt anrufen", tone: "outline" },
        ]}
      />
    </>
  );
}
