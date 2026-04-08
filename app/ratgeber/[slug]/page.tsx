import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ClosingBand } from "@/components/ui/closing-band";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import {
  company,
  findKnowledgeRoute,
  knowledgeSlugs,
} from "@/lib/site-data";

type Props = {
  params: Promise<{ slug: string }>;
};

const articleImages: Record<string, string> = {
  "waermepumpe-im-bestand-ruegen": "/images/ratgeber/waermepumpe.jpg",
  "heizungswartung-was-wirklich-gemacht-wird": "/images/ratgeber/wartung.jpg",
  "bad-modernisieren-ohne-komplettumbau": "/images/ratgeber/bad.jpg",
};

export function generateStaticParams() {
  return knowledgeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = findKnowledgeRoute(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Bertig Ratgeber`,
    description: entry.intro,
  };
}

export default async function RatgeberArticlePage({ params }: Props) {
  const { slug } = await params;
  const entry = findKnowledgeRoute(slug);
  if (!entry) notFound();

  const imgSrc = articleImages[slug] ?? "/images/ratgeber/waermepumpe.jpg";

  return (
    <>
      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-0 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="max-w-3xl mb-10">
            <Kicker className="mb-6">Ratgeber</Kicker>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-primary tracking-[-0.02em] leading-[1.1]">
              {entry.title}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="aspect-[16/7] rounded-2xl overflow-hidden">
            <Image
              src={imgSrc}
              alt={entry.title}
              width={1600}
              height={700}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Artikel-Inhalt */}
      <Section tone="surface">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Intro */}
          <p className="text-xl text-on-surface-variant leading-relaxed font-medium">
            {entry.intro}
          </p>

          {/* Points als Editorial-List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-primary">
              Das Wichtigste im Überblick
            </h2>
            <ul className="space-y-4">
              {entry.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-4 bg-surface-container-low rounded-xl p-5"
                >
                  <span className="material-symbols-outlined text-accent mt-0.5 text-xl flex-shrink-0">
                    check_circle
                  </span>
                  <span className="text-on-surface leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA-Box */}
          <div className="bg-primary text-on-primary rounded-2xl p-8 lg:p-10 space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Persönliche Beratung
            </p>
            <h3 className="text-2xl font-extrabold leading-tight">
              {entry.cta}
            </h3>
            <p className="text-on-primary/80 leading-relaxed">
              Wir schauen uns Ihre konkrete Situation an — vor Ort auf Rügen,
              ohne Standardformular und ohne Verkaufsdruck.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="/kontakt"
                className="bg-accent text-on-accent px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:brightness-95 transition-all active:scale-[0.98]"
              >
                Anfrage stellen
              </a>
              <a
                href={company.phones.mobileHref}
                className="border-2 border-on-primary/30 text-on-primary px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:bg-on-primary/10 transition-all"
              >
                {company.phones.mobile}
              </a>
            </div>
          </div>
        </div>
      </Section>

      <ClosingBand
        kicker="Weitere Themen"
        title="Mehr aus dem Ratgeber."
        copy="Wärmepumpe, Wartung, Badsanierung — alle Artikel im Überblick."
        actions={[
          { href: "/ratgeber", label: "Alle Artikel", tone: "accent" },
          { href: "/kontakt", label: "Direkt anfragen", tone: "outline" },
        ]}
      />
    </>
  );
}
