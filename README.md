# heizung-rügen.de

Website-Projekt fuer Bertig Sanitär- und Heizungstechnik.

## Ziel

Die Website soll als moderner, hochwertiger und lokaler Autoritätsauftritt fuer Ruegen funktionieren und vor allem:

- planbare Projektanfragen erzeugen
- Wartungsvertraege und Wartungsanfragen qualifizieren
- Vertrauen ueber Region, Erreichbarkeit, Generationenbetrieb und Bosch Premium Partner aufbauen

## Aktueller Stack

- Next.js 16 App Router (Turbopack build)
- React 19
- TypeScript
- Tailwind CSS v4 (CSS-First `@theme` Tokens in `app/globals.css`)
- Manrope Variable Font + Material Symbols Outlined
- ESLint
- Vercel-kompatibles Deployment
- serverseitiger Anfrage-Endpoint unter `app/api/inquiry/route.ts`

## Design-System

Die Seite lebt auf einem editorialen Grundlayout (vgl. `Design Muster/DESIGN.md`) mit
den echten Logo-Farben:

- Primary Navy `#001e40`
- Accent Orange `#ea7a1e` (aeusserer Logo-Ring)
- Accent Warm `#f4b324` (innerer Logo-Ring)
- Surface Linen `#fef8f3`

Wiederverwendete Primitives liegen in `components/ui/`:
`icon.tsx`, `button.tsx`, `section.tsx`, `kicker.tsx`, `card.tsx`,
`trust-bar.tsx`, `closing-band.tsx`, `before-after.tsx`.

Alle Bilder unter `public/images/` sind ueber nano-banana generiert,
die Prompts dazu liegen in `content/image-prompts.md`.

Das Logo wird ueber `scripts/process-logo.py` (Pillow) aus dem
Original-JPG in transparente Varianten ueberfuehrt.

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

Der Versand erfolgt serverseitig ueber SMTP-Zugangsdaten der eigenen Domain
beziehungsweise des verwendeten Mailhosters. Die Zugangsdaten bleiben dabei
auf dem Server; sie werden nicht im Browser verwendet.

Noetige Env-Variablen:

```bash
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
INQUIRY_FROM_EMAIL=
INQUIRY_TO_EMAIL=bertig.shk@web.de
```

Siehe auch:

- `.env.example`

Ohne diese Variablen antwortet die API bewusst mit einem Konfigurationsfehler statt still zu scheitern.

## Vor Livegang noch offen

- echte SMTP-Versanddaten setzen (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `INQUIRY_FROM_EMAIL`)
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
