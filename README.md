# heizung-ruegen.de

Website-Projekt fuer Bertig Sanitär- und Heizungstechnik.

## Ziel

Die Website soll als moderner, hochwertiger und lokaler Autoritätsauftritt fuer Ruegen funktionieren und vor allem:

- planbare Projektanfragen erzeugen
- Wartungsvertraege und Wartungsanfragen qualifizieren
- Vertrauen ueber Region, Erreichbarkeit, Generationenbetrieb und Bosch Premium Partner aufbauen

## Aktueller Stack

- Next.js App Router
- TypeScript
- ESLint
- Vercel-kompatibles Deployment
- serverseitiger Anfrage-Endpoint unter `app/api/inquiry/route.ts`

## Lokaler Start

```bash
npm install
npm run dev
```

oder Production-Start lokal:

```bash
npm run build
npm run start
```

Standard-URL lokal:

`http://127.0.0.1:3000`

## Wichtige Dateien

- `app/`
  - eigentliche Website-Routen und Layout
- `components/`
  - Header, Footer, Formulare, JSON-LD
- `lib/site-data.ts`
  - zentrale strukturierte Daten fuer Firma, Navigation, Inhalte und SEO
- `content/`
  - Planungs-, Copy- und Inhaltsartefakte
- `public/brand/`
  - Markenassets wie Bertig-Logo und Bosch Premium Partner Bild

## Inhalte und Strategie

Die inhaltliche Planung und Copy-Grundlage liegt in:

- `.omx/plans/website-strategy-20260407.md`
- `.omx/context/bertig-website-20260407T123934Z.md`
- `content/route-content-map.md`
- `content/page-copy-deck.md`
- `content/site-content-structured.json`
- `content/maintenance-packages.json`
- `content/faq-and-knowledge.md`
- `content/implementation-handoff.md`
- `content/content-acceptance-checklist.md`

## Formulare / E-Mail-Versand

Die Website hat einen echten serverseitigen Endpoint:

- `app/api/inquiry/route.ts`

Der Versand ist aktuell fuer eine Resend-kompatible HTTP-Anbindung vorbereitet.

Noetige Env-Variablen:

```bash
RESEND_API_KEY=
INQUIRY_FROM_EMAIL=
INQUIRY_TO_EMAIL=bertig.shk@web.de
```

Siehe auch:

- `.env.example`

Ohne diese Variablen antwortet die API bewusst mit einem Konfigurationsfehler statt still zu scheitern.

## Vor Livegang noch offen

- echte Versanddaten setzen (`RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`)
- Wartungs-`ab`-Preise kaufmaennisch final bestaetigen
- echte Portraits fuer Vater und Sohn einbauen
- nach Moeglichkeit bessere Logo-Datei (PNG oder SVG) besorgen
- Impressum / Datenschutz final gegen reale Unternehmens- und Hostingdaten pruefen
- echte Bewertungen spaeter sauber einsammeln, nicht erfinden

## SEO / Struktur

Bereits vorhanden:

- serviceorientierte Unterseiten
- FAQ
- kleines Ratgebermodul
- `robots.txt`
- `sitemap.xml`
- LocalBusiness / FAQ JSON-LD
- kanonische URLs und Metadaten

## Bekannte Leitplanken

- keine erfundenen Bewertungen
- keine erfundenen Referenzprojekte
- KI-Visuals nur als Inspiration / Bildwelt, nicht als behauptete echte Kundenprojekte
- Fokus auf Ruegen, mit starken regionalen Signalen wie Wittow, Jasmund und Moenchgut

## Verifikation zuletzt erfolgreich

Zuletzt erfolgreich gelaufen:

- `npm run lint`
- `npm run typecheck`
- `npm run build`

Zusatzchecks:

- lokale HTTP-Pruefung auf Port 3000
- `robots.txt` und `sitemap.xml` abrufbar
- Safari-Titeltests fuer Startseite, Wartung und FAQ
