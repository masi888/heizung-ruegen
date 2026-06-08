import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ClosingBand } from "@/components/ui/closing-band";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { buildPageMetadata, company, findPageRoute } from "@/lib/site-data";

const route = findPageRoute("notdienst");

export const metadata = buildPageMetadata({
  title: route?.title ?? "24h-Heizungsnotdienst auf Rügen | Bertig",
  description:
    route?.description ??
    "Schnelle Hilfe bei Störungen und Heizungsausfall auf Rügen. 24h-Notdienst von Bertig Sanitär- und Heizungstechnik.",
  path: "/notdienst",
  imagePath: "/images/services/notdienst-einsatz.webp",
});

export default function NotdienstPage() {
  const headline =
    route?.headline ??
    "Wenn die Heizung ausfällt, brauchen Sie keinen Umweg – sondern direkte Erreichbarkeit.";
  const lead =
    route?.lead ?? "Bei akuten Störungen zählt vor allem eins: schnell jemanden erreichen, der sich auskennt.";
  const checklist: string[] = (route as { checklist?: string[] })?.checklist ?? [
    "Hersteller bereithalten",
    "Gerätetyp oder Störungsbild nennen",
    "wenn möglich Foto vom Display oder Typenschild senden",
  ];

  return (
    <>
      {/* Hero — roter Akzent */}
      <section className="pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 bg-error/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-12 items-center gap-8">
          <div className="col-span-12 lg:col-span-7 lg:pr-12">
            <div className="inline-flex items-center gap-2 bg-error/10 text-error px-4 py-2 rounded-full mb-6">
              <Icon name="emergency" className="text-error text-base" fill />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">24h-Notdienst</span>
            </div>
            <h1 className="text-[2rem] leading-[1.1] md:text-5xl lg:text-6xl lg:leading-tight font-extrabold tracking-tight text-primary mb-8 break-words hyphens-auto">
              {headline}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {lead}
            </p>

            {/* Primärer CTA: Telefon prominent */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={company.phones.mobileHref}
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-4 sm:py-5 bg-error text-white rounded-xl font-extrabold text-lg sm:text-xl shadow-lg hover:brightness-95 active:scale-[0.98] transition-all"
              >
                <Icon name="call" className="text-white text-2xl" />
                {company.phones.mobile}
              </Link>
            </div>
            <p className="mt-4 text-sm text-on-surface-variant">
              Direkte Leitung zum Inhaber, auch außerhalb der Bürozeiten.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/services/notdienst-einsatz.webp"
                alt="Bertig-Techniker im Notdiensteinsatz auf Rügen"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-error/30 to-transparent" />
            </div>
            {/* Notdienst-Badge */}
            <div className="hidden md:block absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-error text-white p-5 rounded-xl shadow-xl">
              <div className="text-3xl font-black">24/7</div>
              <div className="text-xs font-bold uppercase tracking-wider opacity-80">Erreichbar</div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkliste — was bereitlegen */}
      <Section tone="surface-low">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Kicker className="mb-4">Vorbereitung hilft</Kicker>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary">
              Was Sie bereithalten sollten
            </h2>
            <p className="mt-4 text-on-surface-variant">
              Damit wir schnell helfen können, sind diese Informationen hilfreich:
            </p>
          </div>
          <ul className="space-y-4">
            {checklist.map((item, index) => (
              <li
                key={item}
                className="flex items-start gap-5 bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10"
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-error/10 text-error font-black text-sm shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-on-surface leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Erreichbarkeit */}
      <Section tone="surface" id="kontakt">
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-12">
          <div className="col-span-12 lg:col-span-6">
            <Kicker className="mb-4">Erreichbarkeit</Kicker>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight">
              Direkt zum Inhaber — ohne Umweg.
            </h2>
            <p className="text-on-surface-variant leading-relaxed mb-8">
              Kein Callcenter, keine Warteschleife. Bei akuten Störungen erreichen Sie uns
              direkt auf dem Handy — auch abends und am Wochenende.
            </p>
            <div className="space-y-4">
              <Link
                href={company.phones.mobileHref}
                className="flex items-center gap-4 p-5 bg-error/5 border border-error/20 rounded-xl hover:bg-error/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                  <Icon name="smartphone" className="text-error text-xl" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-error mb-1">
                    Mobil — bevorzugt
                  </div>
                  <div className="text-xl font-extrabold text-primary group-hover:text-error transition-colors">
                    {company.phones.mobile}
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 bg-surface-container-low rounded-2xl p-8 border border-outline-variant/10">
            <h3 className="font-bold text-primary mb-6 text-xl">Nicht dringend?</h3>
            <p className="text-on-surface-variant mb-6 leading-relaxed">
              Wenn Ihr Anliegen keine sofortige Reaktion erfordert, nutzen Sie unser
              Kontaktformular. Wir melden uns am nächsten Werktag persönlich zurück.
            </p>
            <Button tone="primary" href="/kontakt">
              Anfrage senden <Icon name="arrow_forward" />
            </Button>
            <div className="mt-6 pt-6 border-t border-outline-variant/10">
              <p className="text-xs text-on-surface-variant">
                <strong className="text-primary">Bürozeiten:</strong> Mo–Do 07:30–17:00 Uhr,
                Fr 07:30–15:00 Uhr
              </p>
            </div>
          </div>
        </div>
      </Section>

      <ClosingBand
        kicker="Notdienst"
        title="Störung? Wir sind erreichbar."
        copy="Rufen Sie direkt an — ohne Callcenter, ohne Umweg. Bertig ist auch in akuten Situationen persönlich für Sie da."
        actions={[
          {
            href: company.phones.mobileHref,
            label: `Jetzt anrufen: ${company.phones.mobile}`,
            tone: "accent",
          },
          { href: "/kontakt", label: "Nicht dringend — Formular", tone: "outline" },
        ]}
      />
    </>
  );
}
