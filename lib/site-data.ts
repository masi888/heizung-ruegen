import type { Metadata } from "next";

import maintenancePackagesSource from "@/content/maintenance-packages.json";
import siteContentSource from "@/content/site-content-structured.json";

export const siteUrl = "https://www.heizung-ruegen.de";

export const company = {
  name: "Bertig Sanitär- und Heizungstechnik",
  legalName: "Bertig Sanitär- und Heizungstechnik, Inhaber Paul Bertig",
  owner: "Paul Bertig",
  address: {
    street: "Dorfstraße 56",
    postalCode: "18556",
    city: "Breege",
    country: "DE",
  },
  coordinates: {
    lat: 54.618,
    lng: 13.366,
  },
  phones: {
    mobile: "0171 6831051",
    mobileHref: "tel:+491716831051",
  },
  email: "info@heizung-rügen.de",
  serviceArea: ["Rügen", "Wittow", "Jasmund", "Mönchgut", "Breege", "Binz", "Sellin", "Baabe", "Göhren", "bis Stralsund"],
  openingHours: [
    { day: "Monday", opens: "07:30", closes: "17:00" },
    { day: "Tuesday", opens: "07:30", closes: "17:00" },
    { day: "Wednesday", opens: "07:30", closes: "17:00" },
    { day: "Thursday", opens: "07:30", closes: "17:00" },
    { day: "Friday", opens: "07:30", closes: "15:00" },
  ],
  foundingYear: 1990,
  emergency: "24h-Notdienst",
};

type RouteEntry = (typeof siteContentSource.routes)[number];
type KnowledgeEntry = (typeof siteContentSource.knowledge)[number];
type FaqEntry = (typeof siteContentSource.faq)[number];

export const siteContent = siteContentSource;
export const homeContent = siteContentSource.routes.find((route) => route.slug === "/")!;
export const homeHero = homeContent.hero!;

export const serviceRoutes = siteContentSource.routes.filter((route) =>
  [
    "/heizung-ruegen",
    "/waermepumpen-ruegen",
    "/wartung-service",
    "/badsanierung-ruegen",
    "/klimaanlagen-ruegen",
    "/notdienst",
    "/ueber-uns",
  ].includes(route.slug),
);

export const groupedRoutes = {
  all: siteContentSource.routes,
  services: serviceRoutes,
  faq: siteContentSource.faq,
  knowledge: siteContentSource.knowledge,
};

export const navItems = [
  { href: "/", label: "Start" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/wartung-service", label: "Wartung" },
  { href: "/waermepumpen-ruegen", label: "Wärmepumpe" },
  { href: "/badsanierung-ruegen", label: "Bad" },
  { href: "/kontakt", label: "Kontakt" },
];

export const trustItems = [
  "Familienbetrieb seit 1990",
  "24h-Notdienst",
  "Persönliche Erreichbarkeit",
  "Kurze Wege auf Rügen",
];

const allPackages = maintenancePackagesSource.packages.map((pkg) => ({ ...pkg }));
export const maintenancePackages = allPackages.filter((pkg) => pkg.category !== "enthaertung");
export const softenerPackages = allPackages.filter((pkg) => pkg.category === "enthaertung");

export const maintenanceFieldLabels: Record<string, string> = {
  name: "Name",
  telefon: "Telefon",
  email: "E-Mail",
  anlagenadresse: "Adresse der Anlage",
  rechnungsanschrift: "Rechnungsanschrift",
  geraetetyp: "Gerätetyp",
  geraetebezeichnung: "Gerätebezeichnung",
  seriennummer: "Seriennummer",
  hersteller_optional: "Hersteller",
  letzte_wartung_optional: "Letzte Wartung",
  foto_typenschild_optional: "Typenschild / Anlagenfotos",
  hinweise_optional: "Zusätzliche Hinweise",
};

export const legalNotice = {
  chamber: "Handwerkskammer Ostmecklenburg-Vorpommern",
};

export function findServiceRoute(slug: string): RouteEntry | undefined {
  return serviceRoutes.find((route) => route.slug === `/${slug}`);
}

export function findKnowledgeRoute(slug: string): KnowledgeEntry | undefined {
  return siteContentSource.knowledge.find((route) => route.slug === `/ratgeber/${slug}`);
}

export function findPageRoute(slug: string): RouteEntry | undefined {
  return siteContentSource.routes.find((route) => route.slug === `/${slug}`);
}

export const knowledgeEntries: KnowledgeEntry[] = siteContentSource.knowledge;
export const faqEntries: FaqEntry[] = siteContentSource.faq;

export const routeSlugs = serviceRoutes.map((route) => route.slug.slice(1));
export const knowledgeSlugs = knowledgeEntries.map((entry) => entry.slug.replace("/ratgeber/", ""));

export const metadataDefaults = {
  title: homeContent.title,
  description: homeContent.description,
};

export function buildCanonical(path: string) {
  return new URL(path, siteUrl).toString();
}

const defaultSocialImagePath = "/brand/bertig-logo.webp";
const defaultSocialImageAlt = "Bertig Sanitär- und Heizungstechnik — Logo";

function withBrand(title: string) {
  if (/bertig|sanitär- und heizungstechnik/i.test(title)) {
    return title;
  }

  return `${title} | ${company.name}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  type?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath = defaultSocialImagePath,
  imageAlt = defaultSocialImageAlt,
  imageWidth = 1457,
  imageHeight = 811,
  type = "website",
}: PageMetadataOptions): Metadata {
  const normalizedTitle = withBrand(title);
  const canonical = buildCanonical(path);
  const imageUrl = buildCanonical(imagePath);

  return {
    title: normalizedTitle,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: normalizedTitle,
      description,
      url: canonical,
      siteName: company.name,
      locale: "de_DE",
      type,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: normalizedTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    image: `${siteUrl}/brand/bertig-logo.webp`,
    telephone: company.phones.mobile,
    email: company.email,
    foundingDate: String(company.foundingYear),
    areaServed: company.serviceArea,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.coordinates.lat,
      longitude: company.coordinates.lng,
    },
    openingHoursSpecification: company.openingHours.map((item) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${item.day}`,
      opens: item.opens,
      closes: item.closes,
    })),
    sameAs: [],
  };
}

export function buildFaqJsonLd(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type ArticleJsonLdOptions = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  datePublished?: string;
  dateModified?: string;
};

export function buildArticleJsonLd({
  title,
  description,
  path,
  imagePath = defaultSocialImagePath,
  datePublished,
  dateModified,
}: ArticleJsonLdOptions) {
  const articleUrl = buildCanonical(path);
  const imageUrl = buildCanonical(imagePath);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
    image: [imageUrl],
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Organization",
      name: company.name,
    },
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/bertig-logo.webp`,
      },
    },
  };
}
