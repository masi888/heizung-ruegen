export const pageVisuals = {
  services: {
    src: "/site/wasserheizer-service.jpg",
    alt: "Monteur arbeitet konzentriert an einer Heizungsanlage",
  },
  contact: {
    src: "/site/handwerk-detail.jpg",
    alt: "Präzise Handwerksarbeit an einer Sanitärinstallation",
  },
  faq: {
    src: "/site/handwerk-detail.jpg",
    alt: "Detailaufnahme aus dem handwerklichen Arbeitsalltag",
  },
  knowledge: {
    src: "/site/bad-modern.jpg",
    alt: "Modernes Bad mit ruhigen Materialien und klarer Gestaltung",
  },
  legal: {
    src: "/brand/processed/bertig-signet-header.png",
    alt: "Bertig Signet",
  },
} as const;

export const serviceVisuals: Record<string, { src: string; alt: string; note: { label: string; text: string } }> = {
  "/heizung-ruegen": {
    src: "/site/wasserheizer-service.jpg",
    alt: "Monteur bei der Arbeit an einer Heizungsanlage",
    note: {
      label: "Heizungsmodernisierung",
      text: "Passend zu Bestand, Nutzung und langfristiger Wartbarkeit.",
    },
  },
  "/waermepumpen-ruegen": {
    src: "/site/wasserheizer-service.jpg",
    alt: "Technische Arbeit an einer modernen Anlageninstallation",
    note: {
      label: "Wärmepumpe",
      text: "Nicht nach Schema F, sondern mit realistischer Vorprüfung.",
    },
  },
  "/wartung-service": {
    src: "/site/handwerk-detail.jpg",
    alt: "Handwerkliches Detail an einer Sanitärinstallation",
    note: {
      label: "Wartung",
      text: "Strukturiert angefragt, sauber vorbereitet und klar rückgemeldet.",
    },
  },
  "/badsanierung-ruegen": {
    src: "/site/bad-modern.jpg",
    alt: "Modernes Bad mit warmen Oberflächen und klarer Linienführung",
    note: {
      label: "Badmodernisierung",
      text: "Material, Alltag und Technik werden gemeinsam gedacht.",
    },
  },
  "/klimaanlagen-ruegen": {
    src: "/site/bad-modern.jpg",
    alt: "Reduzierter Innenraum mit ruhiger Materialität",
    note: {
      label: "Klimaanlagen",
      text: "Komfort, Luftführung und Nutzung sinnvoll aufeinander abgestimmt.",
    },
  },
  "/notdienst": {
    src: "/site/wasserheizer-service.jpg",
    alt: "Monteur im Einsatz an einer technischen Anlage",
    note: {
      label: "Notdienst",
      text: "Wenn es ausfällt, zählt direkte Erreichbarkeit statt Umwege.",
    },
  },
  "/ueber-uns": {
    src: "/site/handwerk-detail.jpg",
    alt: "Detailbild aus dem Handwerksalltag des Betriebs",
    note: {
      label: "Familienbetrieb",
      text: "Seit 1990 auf Rügen im Einsatz, persönlich und erreichbar.",
    },
  },
} as const;

export const servicePageCopy: Record<
  string,
  {
    overviewTitle: string;
    overviewCopy: string;
    listTitle: string;
  }
> = {
  "/heizung-ruegen": {
    overviewTitle: "Heizungen müssen heute funktionieren und später noch sinnvoll betreibbar sein.",
    overviewCopy:
      "Deshalb geht es nicht um Austausch um des Austauschs willen, sondern um eine Lösung, die zum Gebäude, zur Nutzung und zur geplanten Modernisierung passt.",
    listTitle: "Worauf es bei diesem Thema ankommt",
  },
  "/waermepumpen-ruegen": {
    overviewTitle: "Wärmepumpen lohnen sich dort, wo Gebäude und Nutzung wirklich dazu passen.",
    overviewCopy:
      "Bertig prüft nicht nur das Gerät, sondern die Ausgangslage: Heizflächen, Vorlauftemperaturen, Warmwasserbedarf und Alltag.",
    listTitle: "Was vor der Entscheidung sauber geprüft wird",
  },
  "/wartung-service": {
    overviewTitle: "Wartung wird besser, wenn die Anlage vor dem Termin sauber eingeordnet ist.",
    overviewCopy:
      "Typenschild, Fotos und Anlagendaten helfen dabei, den Einsatz vorzubereiten und unnötige Rückfragen zu vermeiden.",
    listTitle: "Warum der Ablauf so aufgebaut ist",
  },
  "/badsanierung-ruegen": {
    overviewTitle: "Ein gutes Bad ist nicht nur schöner, sondern im Alltag klarer, ruhiger und funktionaler.",
    overviewCopy:
      "Gerade bei Umbauten im Bestand zählen Materialwahl, Raumgefühl und technische Umsetzung genauso wie die Optik.",
    listTitle: "Was bei Badprojekten entscheidend ist",
  },
  "/klimaanlagen-ruegen": {
    overviewTitle: "Klimatisierung ist dann sinnvoll, wenn sie zum Raum, zur Nutzung und zum Gebäude passt.",
    overviewCopy:
      "Deshalb wird nicht nur die Kühlleistung betrachtet, sondern auch Luftführung, Entfeuchtung und der tatsächliche Alltag im Objekt.",
    listTitle: "Worauf bei der Planung geachtet wird",
  },
  "/notdienst": {
    overviewTitle: "Im Notfall zählt nicht ein langes Formular, sondern eine klare Erstinformation.",
    overviewCopy:
      "Mit wenigen Angaben kann der Einsatz schneller eingeordnet werden. Danach geht es direkt in den Kontakt, nicht in unnötige Schleifen.",
    listTitle: "Was den Einsatz beschleunigt",
  },
  "/ueber-uns": {
    overviewTitle: "Bertig ist ein regionaler Handwerksbetrieb mit klarer Haltung statt austauschbarer Service-Hülle.",
    overviewCopy:
      "Verlässlichkeit, direkte Erreichbarkeit und saubere technische Arbeit sind keine Claims, sondern die Basis des Betriebs seit 1990.",
    listTitle: "Wofür der Betrieb heute steht",
  },
};

export const aboutHighlights = [
  "Familienbetrieb mit regionaler Verankerung auf Rügen",
  "Direkte Ansprechpartner statt Weiterleitungsschleifen",
  "Saubere Heizungs-, Sanitär- und Badprojekte im Bestand",
  "Klare Planung mit Blick auf Wartbarkeit und Alltag",
];

export const routeLabels: Record<string, string> = {
  "/heizung-ruegen": "Heizung",
  "/waermepumpen-ruegen": "Wärmepumpen",
  "/wartung-service": "Wartung",
  "/badsanierung-ruegen": "Sanitär und Bad",
  "/klimaanlagen-ruegen": "Klimaanlagen",
  "/notdienst": "Notdienst",
  "/ueber-uns": "Über uns",
};
