import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { ClosingBand } from "@/components/ui/closing-band";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import {
  buildArticleJsonLd,
  buildFaqJsonLd,
  buildPageMetadata,
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
  "heizungsfoerderung-2026-ruegen": "/images/ratgeber/wartung.jpg",
  "heizungsgesetz-waermeplanung-ruegen-2026": "/images/ratgeber/waermepumpe.jpg",
  "barrierearmes-bad-foerderung-ruegen-2026": "/images/ratgeber/bad.jpg",
};

export function generateStaticParams() {
  return knowledgeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = findKnowledgeRoute(slug);
  if (!entry) return {};
  const imgSrc = articleImages[slug] ?? "/images/ratgeber/waermepumpe.jpg";

  return {
    ...buildPageMetadata({
      title: entry.title,
      description: entry.description ?? entry.intro,
      path: `/ratgeber/${slug}`,
      imagePath: imgSrc,
      type: "article",
    }),
  };
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default async function RatgeberArticlePage({ params }: Props) {
  const { slug } = await params;
  const entry = findKnowledgeRoute(slug);
  if (!entry) notFound();

  const imgSrc = articleImages[slug] ?? "/images/ratgeber/waermepumpe.jpg";
  const articlePath = `/ratgeber/${slug}`;
  const articleJsonLd = buildArticleJsonLd({
    title: entry.title,
    description: entry.description ?? entry.intro,
    path: articlePath,
    imagePath: imgSrc,
    datePublished: entry.publishedAt,
    dateModified: entry.updatedAt,
  });
  const hasFaq = Array.isArray(entry.faq) && entry.faq.length > 0;
  const hasSources = Array.isArray(entry.sources) && entry.sources.length > 0;
  const hasRelatedLinks =
    Array.isArray(entry.relatedLinks) && entry.relatedLinks.length > 0;

  return (
    <>
      <JsonLd data={articleJsonLd} />
      {hasFaq ? <JsonLd data={buildFaqJsonLd(entry.faq)} /> : null}

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-0 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl mb-10">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-sm text-on-surface-variant mb-6"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Start
              </Link>
              <span>/</span>
              <Link href="/ratgeber" className="hover:text-primary transition-colors">
                Ratgeber
              </Link>
              <span>/</span>
              <span className="text-primary">{entry.title}</span>
            </nav>
            <Kicker className="mb-6">Ratgeber</Kicker>
            {entry.updatedAt ? (
              <p className="text-sm text-on-surface-variant mb-4">
                Stand: {formatDate(entry.updatedAt)}
              </p>
            ) : null}
            <h1 className="text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-6xl lg:leading-[1.1] font-extrabold text-primary tracking-[-0.02em] break-words hyphens-auto">
              {entry.title}
            </h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
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
          <p className="text-xl text-on-surface-variant leading-relaxed font-medium">
            {entry.intro}
          </p>

          {entry.answer ? (
            <div className="bg-surface-container-low rounded-2xl p-6 sm:p-8 border border-outline-variant/10 space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Kurzantwort
              </p>
              <p className="text-lg text-on-surface leading-relaxed">
                {entry.answer}
              </p>
            </div>
          ) : null}

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
                  <Icon
                    name="check_circle"
                    className="text-accent mt-0.5 text-xl flex-shrink-0"
                    fill
                  />
                  <span className="text-on-surface leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {entry.sections?.map((section) => (
            <div key={section.title} className="space-y-5">
              <h2 className="text-2xl font-extrabold text-primary">
                {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-on-surface-variant leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-3 text-on-surface leading-relaxed"
                    >
                      <Icon
                        name="check_circle"
                        className="text-accent text-lg mt-0.5"
                        fill
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {hasFaq ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-primary">
                Häufige Fragen
              </h2>
              <div className="space-y-3">
                {entry.faq.map((item) => (
                  <details
                    key={item.question}
                    className="group bg-surface-container-low rounded-xl border border-outline-variant/10 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 sm:p-6 font-bold text-primary list-none">
                      <span>{item.question}</span>
                      <Icon
                        name="expand_more"
                        className="text-accent flex-shrink-0 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-on-surface-variant leading-relaxed">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ) : null}

          {hasSources ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-primary">
                Quellen und Orientierung
              </h2>
              <ul className="space-y-3">
                {entry.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:text-accent underline-offset-4 hover:underline"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {hasRelatedLinks ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-primary">
                Passende nächste Schritte
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {entry.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="bg-surface-container-low rounded-xl p-5 border border-outline-variant/10 hover:border-accent/30 transition-colors"
                  >
                    <div className="text-sm font-bold text-primary">
                      {link.label}
                    </div>
                    <div className="text-sm text-on-surface-variant mt-1">
                      {link.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

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
              <Link
                href="/kontakt"
                className="bg-accent text-on-accent px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold hover:brightness-95 transition-all active:scale-[0.98]"
              >
                Anfrage stellen
              </Link>
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
