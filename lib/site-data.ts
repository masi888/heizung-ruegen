import maintenancePackagesSource from "@/content/maintenance-packages.json";
import siteContentSource from "@/content/site-content-structured.json";

export const siteUrl = "https://www.heizung-ruegen.de";

export const company = {
  name: "Bertig Sanitär- und Heizungstechnik",
  legalName: "Bertig Sanitär- und Heizungstechnik, Inhaber Eckhard Bertig",
  owner: "Eckhard Bertig",
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
    landline: "038391 341",
    landlineHref: "tel:+4938391341",
    mobile: "0171 6831051",
    mobileHref: "tel:+491716831051",
  },
  email: "bertig.shk@web.de",
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

export const maintenancePackages = maintenancePackagesSource.packages.map((pkg, index) => ({
  ...pkg,
  priceLabel: ["ab 179 €", "ab 249 €", "ab 349 €"][index] ?? pkg.priceLabel,
}));

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
  taxNotice: "Steuernummer liegt vor und wird vor Livegang im finalen Impressum ergänzt, sofern sie dort veröffentlicht werden soll.",
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
  title: "Bertig Sanitär- und Heizungstechnik auf Rügen",
  description:
    "Moderner Familienbetrieb für Heizung, Wärmepumpen, Wartung, Badsanierung und 24h-Notdienst auf Rügen.",
};

export function buildCanonical(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    legalName: company.legalName,
    image: `${siteUrl}/brand/bertig-logo.jpg`,
    telephone: company.phones.landline,
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
