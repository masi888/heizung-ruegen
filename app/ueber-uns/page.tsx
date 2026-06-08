import Image from "next/image";

import { ClosingBand } from "@/components/ui/closing-band";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company } from "@/lib/site-data";

export const metadata = buildPageMetadata({
  title: "Über uns — Bertig Sanitär- und Heizungstechnik",
  description:
    "Familienbetrieb seit 1990 in Breege auf Rügen. Paul Bertig steht für persönliche Handwerksqualität auf der Insel.",
  path: "/ueber-uns",
  imagePath: "/images/hero/vater-sohn-werkstatt.webp",
});

const timeline = [
  {
    year: "1990",
    title: "Gründung",
    copy: "Eckhard Bertig gründet den Betrieb in Breege. Heizung und Sanitär für die Inselbewohner — persönlich, verlässlich, ohne Umwege.",
  },
  {
    year: "2000er",
    title: "Wachstum auf der Insel",
    copy: "Das Leistungsspektrum wächst: Wartungsverträge, Badsanierungen und die erste Generation moderner Brennwerttechnik kommen hinzu.",
  },
  {
    year: "2010er",
    title: "Wärmepumpen & erneuerbare Systeme",
    copy: "Bertig spezialisiert sich früh auf Wärmepumpen und Hybridlösungen — passend zu Rügens Bestandsgebäuden und Ferienimmobilien.",
  },
  {
    year: "Heute",
    title: "Paul Bertig übernimmt",
    copy: "Der Betrieb arbeitet mit kurzen Wegen, direktem Kontakt und dem Anspruch, Technik verständlich zu erklären — statt sie zu verkaufen.",
  },
];

const values = [
  {
    icon: "handshake",
    title: "Persönlich",
    copy: "Kein Callcenter, kein Subunternehmer-Chaos. Sie erreichen uns direkt — und wir kommen selbst.",
  },
  {
    icon: "schedule",
    title: "Verlässlich",
    copy: "Termine halten, Rückmeldungen geben, Abläufe erklären. Das ist für uns Standard, nicht Ausnahme.",
  },
  {
    icon: "lightbulb",
    title: "Klar beraten",
    copy: "Wir empfehlen, was zu Ihrem Gebäude passt — nicht das teuerste System, das gerade im Trend liegt.",
  },
  {
    icon: "location_on",
    title: "Auf Rügen verwurzelt",
    copy: "Breege ist unser Zuhause. Wir kennen die Gegebenheiten auf der Insel — Küstenklima, Ferienimmobilien, alte Bausubstanz.",
  },
];

export default function UeberUnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-12 gap-6 lg:gap-8 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Kicker className="mb-6">Über uns</Kicker>
            <h1 className="text-[2rem] leading-[1.1] sm:text-5xl lg:text-7xl lg:leading-[1.05] font-extrabold text-primary tracking-[-0.02em] break-words hyphens-auto">
              Familienbetrieb.<br />Seit 1990.
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <p className="text-lg text-on-surface-variant leading-relaxed">
              Bertig Sanitär- und Heizungstechnik steht für über drei Jahrzehnte
              handwerkliche Kompetenz auf Rügen. Gegründet von Eckhard Bertig,
              heute von Paul Bertig weitergeführt — persönlich, direkt und ohne
              Umwege.
            </p>
          </div>
        </div>
      </section>

      {/* Portrait Vater & Sohn */}
      <Section tone="surface-low">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/vater-sohn-werkstatt.webp"
                alt="Paul Bertig in der Werkstatt"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            {/* Signet Badge */}
            <div className="absolute -bottom-5 -right-5 w-24 h-24 rounded-full bg-primary hidden sm:flex items-center justify-center shadow-xl border-4 border-surface-container-low">
              <Image
                src="/brand/logo/bertig-signet-only.webp"
                alt="Bertig Signet"
                width={64}
                height={64}
                className="w-14 h-14 object-contain"
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <Kicker className="mb-2">Die Menschen dahinter</Kicker>
            <h2 className="text-4xl font-extrabold text-primary leading-tight">
              Erfahrung trifft frische Perspektive.
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              Eckhard Bertig gründete den Betrieb 1990 und hat über drei
              Jahrzehnte aufgebaut, was heute Bertig Sanitär- und
              Heizungstechnik ausmacht. Heute führt sein Sohn Paul Bertig das
              Unternehmen weiter — mit moderner Systemtechnik und digitalem
              Know-how, aber denselben Werten.
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              Das Ergebnis: ein Betrieb, der handwerkliche Sorgfalt mit
              zeitgemäßer Technik verbindet — und dabei immer direkt
              ansprechbar bleibt.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <div className="text-center">
                <p className="text-4xl font-extrabold text-primary">35+</p>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Jahre Erfahrung
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-outline-variant/30" />
              <div className="text-center">
                <p className="text-4xl font-extrabold text-primary">Rügen</p>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Unser Zuhause
                </p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-outline-variant/30" />
              <div className="text-center">
                <p className="text-4xl font-extrabold text-primary">24h</p>
                <p className="text-xs uppercase tracking-widest text-on-surface-variant font-semibold">
                  Notdienst
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="surface">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Kicker className="mb-4">Geschichte</Kicker>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
              Drei Jahrzehnte auf der Insel.
            </h2>
          </div>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-on-primary font-black text-xs">{i + 1}</span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-outline-variant/30 my-2" />
                  )}
                </div>
                <div className="pb-12">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-primary mt-1 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Werte */}
      <Section tone="surface-low">
        <div className="text-center mb-16">
          <Kicker className="mb-4">Unsere Werte</Kicker>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
            Was uns antreibt.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-surface-container-lowest rounded-xl p-8 space-y-4"
            >
              <Icon name={v.icon} className="text-4xl text-accent" />
              <h3 className="text-xl font-bold text-primary">{v.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {v.copy}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <ClosingBand
        kicker="Direkt ansprechen"
        title="Wir sind persönlich für Sie da."
        copy="Rufen Sie uns an oder schreiben Sie uns — kein Ticketsystem, keine Weiterleitungsschleife."
        actions={[
          { href: "/kontakt", label: "Kontakt aufnehmen", tone: "accent" },
          {
            href: company.phones.mobileHref,
            label: "Direkt anrufen",
            tone: "outline",
          },
        ]}
      />
    </>
  );
}
