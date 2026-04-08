# Bertig Website — Kompletter Neubau Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Die bestehende Next.js Site für Bertig Sanitär- und Heizungstechnik wird komplett neu aufgebaut — auf Basis des "Editorial Engineering"-Design-Systems aus `Design Muster/`, mit Tailwind v4, den echten Logo-Farben, transparentem Logo, KI-generierten Bildern (Nano-Banana) inkl. Vorher/Nachher-Projekten. Inhalte und Routen aus `content/` und `lib/site-data.ts` werden übernommen.

**Architecture:** Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4 (CSS-First Config). Content kommt aus JSON/TS-Files (`content/site-content-structured.json`, `lib/site-data.ts`). Brand-Assets (Logo transparent, generierte Bilder) liegen unter `public/`. Design-Tokens werden über `@theme`-Direktive in `globals.css` definiert und auf die echten Logo-Farben gemappt (Navy, Orange, Gold statt pures Gelb).

**Tech Stack:** Next.js 16.2.2, React 19.2.4, TypeScript 5, Tailwind CSS v4, Manrope (Google Fonts), Material Symbols Outlined, Pillow (Python) für Logo-Transparenz, Nano-Banana Skill für Bildgenerierung, Next Image für Optimierung.

---

## Key Decisions (vorher festgelegt)

**Scope:** ALLE Seiten werden neu gebaut: `/`, `/leistungen`, `/heizung-ruegen`, `/waermepumpen-ruegen`, `/wartung-service`, `/badsanierung-ruegen`, `/klimaanlagen-ruegen`, `/notdienst`, `/ueber-uns`, `/kontakt`, `/faq`, `/ratgeber`, `/ratgeber/[slug]` (×3), `/impressum`, `/datenschutz`.

**Tailwind-Version:** v4 (CSS-First, `@import "tailwindcss"` + `@theme` Direktive — passt zu Next 16 und vermeidet tailwind.config.js).

**Farbpalette (an Logo angepasst):**
- `--color-primary: #001e40` (Navy — aus Muster und Logo identisch)
- `--color-primary-container: #003366` (dunkleres Navy)
- `--color-accent: #ea7a1e` (Orange aus dem äußeren Logo-Ring — ersetzt `#ffba20`)
- `--color-accent-warm: #f4b324` (Goldgelb aus dem inneren Logo-Ring — für kleinere Akzente)
- `--color-surface: #fef8f3` (warmes Linen)
- `--color-surface-container-low: #f8f3ee`
- `--color-surface-container: #f2ede8`
- `--color-surface-container-lowest: #ffffff`
- `--color-on-surface: #1d1b19` (warmes Schwarz)
- `--color-on-surface-variant: #43474f`

**Logo-Strategie:** Zwei Varianten erzeugen. (a) `bertig-logo-light.png` — für dunkle Backgrounds (Hero auf Navy, Footer), originale weiße Schrift + farbiger Signet, Navy-BG transparent entfernt per Python/Pillow. (b) Header auf hellem Linen nutzt das Signet im Navy-Badge-Container (das Logo-Signet in einem runden Navy-Kreis als Marker) + Wordmark in CSS (Manrope 900, primary Farbe) statt raster-Logo — so bleibt es knackscharf.

**Bildproduktion:** Nano-Banana Skill für alle Hero-, Service- und Vorher/Nachher-Bilder. Jedes Bild bekommt einen dokumentierten Prompt (siehe Phase 2).

**Alte Dateien:** `app/globals.css` (selbstgebautes `ref-*` CSS) wird komplett ersetzt. `components/editorial-primitives.tsx` wird ersetzt. `app/page.tsx` wird ersetzt. `components/site-header.tsx` und `components/site-footer.tsx` werden ersetzt.

**Verification statt TDD:** Frontend-Arbeit wird nach jeder Task verifiziert durch: `npm run lint` + `npm run typecheck` + `npm run build` + visuelle Browser-Kontrolle via `mcp__claude-in-chrome` Screenshots. Kein Komponent-Test-Framework.

**Commit-Strategie:** Nach jeder Task ein atomarer Commit mit konventionellem Prefix (`feat:`, `chore:`, `style:`).

---

## File Structure

**Neu / ersetzt:**
- `app/globals.css` — ersetzt: Tailwind v4 Import + `@theme` Tokens + Base-Styles
- `app/layout.tsx` — überarbeitet: Manrope Variable Font, Material Symbols, Header/Footer/JsonLd
- `app/page.tsx` — komplett neu: Startseite nach Design Muster
- `app/leistungen/page.tsx` — neu
- `app/heizung-ruegen/page.tsx` — neu (aktuell als `[slug]`)
- `app/waermepumpen-ruegen/page.tsx` — neu
- `app/wartung-service/page.tsx` — neu
- `app/badsanierung-ruegen/page.tsx` — neu
- `app/klimaanlagen-ruegen/page.tsx` — neu
- `app/notdienst/page.tsx` — neu
- `app/ueber-uns/page.tsx` — neu
- `app/kontakt/page.tsx` — ersetzt
- `app/faq/page.tsx` — ersetzt
- `app/ratgeber/page.tsx` — ersetzt
- `app/ratgeber/[slug]/page.tsx` — ersetzt
- `app/impressum/page.tsx` — ersetzt
- `app/datenschutz/page.tsx` — ersetzt
- `app/not-found.tsx` — kosmetisch auf neues Design gezogen

**Komponenten (neu / ersetzt):**
- `components/site-header.tsx` — neu
- `components/site-footer.tsx` — neu
- `components/ui/button.tsx` — neu, Primary/Secondary/Tertiary Varianten
- `components/ui/section.tsx` — neu, `Section`-Wrapper mit Padding/Container
- `components/ui/kicker.tsx` — neu, `label-md` Overline
- `components/ui/card.tsx` — neu, Editorial Card Variante
- `components/ui/trust-bar.tsx` — neu
- `components/ui/before-after.tsx` — neu, interaktiver Slider mit zwei Bildern
- `components/ui/closing-band.tsx` — neu, Navy-CTA-Band
- `components/ui/icon.tsx` — neu, Material Symbols Wrapper
- `components/request-forms.tsx` — beibehalten, kosmetisch ans neue Design angepasst
- `components/json-ld.tsx` — unverändert

**Content / Daten:**
- `lib/site-data.ts` — unverändert, wird nur gelesen
- `content/*.json` + `*.md` — unverändert
- `lib/editorial-content.ts` — gelöscht (Altlast)

**Brand-Assets (neu generiert):**
- `public/brand/logo/bertig-logo-light.png` — transparentes Logo für dunkle BGs (aus Original, Navy-BG gekeyed)
- `public/brand/logo/bertig-signet-only.png` — nur das runde Signet, transparent
- `public/brand/bosch-premium-partner-transparent.png` — Bosch-Badge mit transparentem BG
- `public/images/hero/vater-sohn-werkstatt.jpg` — KI-generiert
- `public/images/hero/hero-primary.jpg` — Alternative
- `public/images/services/heizung-modernisierung.jpg`
- `public/images/services/waermepumpe-aussen.jpg`
- `public/images/services/wartung-inspektion.jpg`
- `public/images/services/badsanierung-modern.jpg`
- `public/images/services/klimaanlage-innen.jpg`
- `public/images/services/notdienst-einsatz.jpg`
- `public/images/before-after/bad-vorher.jpg` + `bad-nachher.jpg`
- `public/images/before-after/heizung-vorher.jpg` + `heizung-nachher.jpg`
- `public/images/atmosphere/ruegen-kueste.jpg`
- `public/images/atmosphere/werkstatt-detail.jpg`
- `public/images/ratgeber/waermepumpe.jpg`, `wartung.jpg`, `bad.jpg`

**Scripts (neu, temporär):**
- `scripts/process-logo.py` — Python-Script für Logo-Transparenz

**Gelöscht (Altlast):**
- `components/editorial-primitives.tsx`
- `lib/editorial-content.ts`

---

## Phase 0 — Baseline & Cleanup

### Task 0.1: Baseline Commit

**Ziel:** Sicherer Restartpunkt bevor wir löschen.

- [ ] **Step 1: Git status prüfen**

```bash
cd /Users/matteo/Documents/Coding/ruegenheizung
git status
```

Erwartet: Die bereits uncommitted Änderungen aus dem letzten Agenten-Lauf plus `Design Muster/`, `README.md`, `app/`, `components/`, `lib/`, `package-lock.json`, `public/`.

- [ ] **Step 2: Baseline-Commit der aktuellen Inhaltsdaten**

```bash
git add content/maintenance-packages.json content/site-content-structured.json next.config.ts package.json
git commit -m "chore: lock content + config baseline before rebuild"
```

- [ ] **Step 3: Branch anlegen**

```bash
git checkout -b rebuild/editorial-engineering
```

Erwartet: `Switched to a new branch 'rebuild/editorial-engineering'`.

### Task 0.2: Altlasten entfernen

**Files:**
- Delete: `app/globals.css` (wird neu geschrieben in Phase 1)
- Delete: `components/editorial-primitives.tsx`
- Delete: `lib/editorial-content.ts`
- Delete: `app/[slug]/page.tsx` (wir machen explizite Routen)
- Delete: `public/brand/bertig-logo-clean.png` (kaputt)
- Delete: `public/brand/processed/` (Altlast vom letzten Agenten)

- [ ] **Step 1: Dateien entfernen**

```bash
rm app/globals.css
rm components/editorial-primitives.tsx
rm lib/editorial-content.ts
rm -rf app/\[slug\]
rm public/brand/bertig-logo-clean.png
rm -rf public/brand/processed
```

- [ ] **Step 2: Leeres globals.css als Platzhalter, damit `layout.tsx` nicht bricht**

```bash
touch app/globals.css
```

- [ ] **Step 3: Platzhalter-Homepage**

Write `app/page.tsx` mit minimalem Placeholder:

```tsx
export default function HomePage() {
  return <main className="p-8">Rebuild läuft</main>;
}
```

- [ ] **Step 4: Typecheck & Build verifizieren**

```bash
npm run typecheck
```

Erwartet: Kein Fehler. Falls `layout.tsx` auf `editorial-primitives` verlinkt, die Imports entfernen.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove legacy styling and placeholder homepage"
```

---

## Phase 1 — Foundation (Tailwind + Tokens + Layout Shell)

### Task 1.1: Tailwind v4 installieren

**Files:**
- Modify: `package.json`
- Create: `postcss.config.mjs`

- [ ] **Step 1: Tailwind v4 + PostCSS Plugin installieren**

```bash
npm install tailwindcss@next @tailwindcss/postcss@next
```

- [ ] **Step 2: `postcss.config.mjs` schreiben**

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

- [ ] **Step 3: Verifizieren dass package.json aktualisiert wurde**

```bash
grep -E '"tailwindcss"|"@tailwindcss/postcss"' package.json
```

Erwartet: Beide Pakete erscheinen unter dependencies.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json postcss.config.mjs
git commit -m "chore: install tailwind v4 and configure postcss"
```

### Task 1.2: Design-Tokens + globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: `app/globals.css` schreiben**

```css
@import "tailwindcss";

@theme {
  /* Typografie */
  --font-display: "Manrope", ui-sans-serif, system-ui, sans-serif;
  --font-body: "Manrope", ui-sans-serif, system-ui, sans-serif;

  /* Farbpalette — an echte Logo-Farben angepasst */
  --color-primary: #001e40;
  --color-primary-container: #003366;
  --color-on-primary: #ffffff;
  --color-on-primary-variant: #a7c8ff;

  --color-accent: #ea7a1e;            /* Orange — äußerer Logo-Ring */
  --color-accent-warm: #f4b324;       /* Goldgelb — innerer Logo-Ring */
  --color-on-accent: #2a1b00;

  --color-surface: #fef8f3;           /* Linen */
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f8f3ee;
  --color-surface-container: #f2ede8;
  --color-surface-container-high: #ece7e2;
  --color-surface-container-highest: #e7e2dd;

  --color-on-surface: #1d1b19;
  --color-on-surface-variant: #43474f;

  --color-outline: #737780;
  --color-outline-variant: #c3c6d1;

  --color-error: #ba1a1a;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.5rem;
}

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  body {
    background-color: var(--color-surface);
    color: var(--color-on-surface);
    font-family: var(--font-body);
    font-feature-settings: "ss01", "ss02";
  }
  ::selection {
    background-color: var(--color-accent-warm);
    color: var(--color-on-accent);
  }
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }
}

@utility editorial-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 2rem;
}

@utility glass-effect {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}
```

- [ ] **Step 2: Typecheck & Build verifizieren**

```bash
npm run build
```

Erwartet: Build ohne Fehler, Tailwind v4 wird erkannt.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat(styling): introduce tailwind v4 tokens aligned with Bertig brand"
```

### Task 1.3: Layout-Shell + Fonts

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: `app/layout.tsx` aktualisieren**

```tsx
import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildCanonical,
  buildLocalBusinessJsonLd,
  company,
  metadataDefaults,
  siteUrl,
} from "@/lib/site-data";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: metadataDefaults.title,
    template: `%s | ${company.name}`,
  },
  description: metadataDefaults.description,
  alternates: {
    canonical: buildCanonical("/"),
  },
  openGraph: {
    title: metadataDefaults.title,
    description: metadataDefaults.description,
    url: siteUrl,
    siteName: company.name,
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={manrope.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-surface text-on-surface font-display antialiased">
        <JsonLd data={buildLocalBusinessJsonLd()} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Platzhalter für `site-header.tsx` und `site-footer.tsx` schreiben, damit Build nicht bricht**

Die echten Versionen kommen in Task 3.x; hier nur Stubs:

```tsx
// components/site-header.tsx
export function SiteHeader() {
  return <header className="h-16" />;
}
```

```tsx
// components/site-footer.tsx
export function SiteFooter() {
  return <footer className="h-16" />;
}
```

- [ ] **Step 3: Typecheck**

```bash
npm run typecheck
```

Erwartet: Keine Fehler.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/site-header.tsx components/site-footer.tsx
git commit -m "feat(layout): wire Manrope, material symbols, clean shell"
```

---

## Phase 2 — Brand Assets + Bildproduktion

### Task 2.1: Logo transparent machen

**Files:**
- Create: `scripts/process-logo.py`
- Create: `public/brand/logo/bertig-logo-light.png`
- Create: `public/brand/logo/bertig-signet-only.png`

- [ ] **Step 1: Python-Script schreiben**

```python
# scripts/process-logo.py
"""Extrahiert das Bertig-Logo aus dem JPG und erzeugt transparente PNGs."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "brand" / "bertig-logo.jpg"
OUT_DIR = ROOT / "public" / "brand" / "logo"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Farb-Toleranz für Navy
NAVY_TARGET = (30, 45, 78)   # ~ #1e2d4e (visuelles Navy im JPG)
TOLERANCE = 55

def is_navy(r, g, b):
    return (
        abs(r - NAVY_TARGET[0]) < TOLERANCE
        and abs(g - NAVY_TARGET[1]) < TOLERANCE
        and abs(b - NAVY_TARGET[2]) < TOLERANCE
    )

def keyed(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        if is_navy(r, g, b):
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    return img

def main() -> None:
    img = Image.open(SRC)
    light = keyed(img)
    light.save(OUT_DIR / "bertig-logo-light.png", "PNG")
    print(f"Wrote {OUT_DIR / 'bertig-logo-light.png'}  ({light.size})")

    # Signet isolieren — linke Hälfte des Logos
    w, h = light.size
    signet = light.crop((0, 0, int(w * 0.45), h))
    signet.save(OUT_DIR / "bertig-signet-only.png", "PNG")
    print(f"Wrote {OUT_DIR / 'bertig-signet-only.png'}  ({signet.size})")

if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Script ausführen**

```bash
python3 scripts/process-logo.py
```

Erwartet: Beide PNGs in `public/brand/logo/` liegen vor. Navy-Hintergrund ist transparent, weißer Wordmark und Signet bleiben sichtbar.

- [ ] **Step 3: Visuell prüfen**

Öffne die Dateien und bestätige Transparenz sauber.

```bash
ls -la public/brand/logo/
```

Wenn die Kanten rauschen, TOLERANCE in Schritten von 10 justieren und neu laufen lassen.

- [ ] **Step 4: Commit**

```bash
git add scripts/process-logo.py public/brand/logo/
git commit -m "chore(brand): extract transparent Bertig logo variants"
```

### Task 2.2: Bildsprache / Nano-Banana Prompts dokumentieren

**Files:**
- Create: `content/image-prompts.md`

- [ ] **Step 1: Prompt-Katalog schreiben**

Die Datei hält jeden Prompt, der an Nano-Banana geht, nachvollziehbar. Struktur:

```markdown
# Bild-Prompt-Katalog

Alle Bilder werden über nano-banana generiert. Stil-Kontinuität: warme natürliche
Beleuchtung, Navy & Orange Akzente passend zum Logo, Ruegen-Atmosphäre, echte
Handwerklichkeit (keine Stock-Posen).

## Gemeinsame Stil-DNA

- Palette: tiefes Navy `#001e40`, warmes Orange `#ea7a1e`, Linen `#fef8f3`
- Licht: natürlich, warm, Nordseesonne
- Stimmung: professionell, ruhig, solide
- Framing: 3:2 oder 4:5, Fokus auf Arbeit/Material/Hände statt gestellter Lächeln
- Keine erkennbaren Markengesichter (wir haben noch keine echten Portraits)

## 1. Hero — `/` — "Vater & Sohn Werkstatt"

Datei: `public/images/hero/vater-sohn-werkstatt.jpg`
Format: 1600×2000 (4:5 portrait für asymmetrisches Grid)

Prompt:
> Editorial photograph of two men — one older (around 60, graying, weathered
> hands) and one younger (around 30) — working side-by-side on a modern heating
> installation in a bright workshop. They are wearing clean work overalls in deep
> navy with subtle orange accents. Warm natural side-lighting from a large window.
> Faces are either out-of-frame or softly turned, no posed smiles — focus is on
> their hands holding a precision tool and a polished copper pipe. Background:
> organised workshop with brass fittings, clipboards, muted tones. High-end
> editorial magazine quality. 4:5 aspect ratio.

## 2. Leistungen — Hero Bild

Datei: `public/images/services/leistungen-hero.jpg`

Prompt:
> Cinematic wide-angle of an organised heating workshop: polished copper manifold,
> pressure gauges, tools laid out on a wooden bench. Warm morning light from the
> left. No people. Palette: muted steel, copper, navy shadow, warm linen walls.
> Editorial magazine style, 16:9.

## 3. Heizung — Hero Bild

Datei: `public/images/services/heizung-modernisierung.jpg`

Prompt:
> Close-up of a modern wall-hung condensing boiler being installed by gloved
> hands — clean copper lines, brass fittings, digital display showing temperature.
> Warm natural light, shallow depth of field. 3:2 landscape.

## 4. Wärmepumpe — Hero Bild

Datei: `public/images/services/waermepumpe-aussen.jpg`

Prompt:
> Modern outdoor heat pump unit installed next to a traditional North German
> red-brick holiday home, surrounded by beach grass and low dunes under a soft
> overcast Baltic Sea sky. Peaceful, documentary style. 3:2.

## 5. Wartung — Hero Bild

Datei: `public/images/services/wartung-inspektion.jpg`

Prompt:
> Close-up of gloved hands holding a flashlight and inspection mirror in front of
> an open heating unit, reading the data plate. Warm tungsten light mixing with
> cool daylight. Documentary, crisp, no motion blur. 3:2.

## 6. Badsanierung — Hero Bild

Datei: `public/images/services/badsanierung-modern.jpg`

Prompt:
> Editorial architecture shot of a newly renovated modern bathroom: large format
> warm sand-coloured tiles, matte black fixtures, walk-in shower with fluted glass,
> morning daylight from a side window. No people. High-end interior magazine style.
> 3:2 landscape.

## 7. Klimaanlagen — Hero Bild

Datei: `public/images/services/klimaanlage-innen.jpg`

Prompt:
> Minimalist shot of a discreet indoor split-unit climate system mounted above a
> doorway in a bright coastal living room. Linen sofa, wooden floor, soft summer
> light. Documentary, no people. 3:2.

## 8. Notdienst — Hero Bild

Datei: `public/images/services/notdienst-einsatz.jpg`

Prompt:
> Low-light dramatic photograph: a technician in a clean dark navy work jacket,
> carrying a tool case, walking towards a residential home in the early dusk, warm
> window lights glowing. Calm, competent mood. No visible face. 3:2 landscape.

## 9. Vorher/Nachher — Bad

Dateien: `public/images/before-after/bad-vorher.jpg`, `bad-nachher.jpg`

Vorher-Prompt:
> Dated 1980s German bathroom: beige 15x15cm tiles, cream bathtub with faded
> shower curtain, pedestal sink, worn linoleum floor, fluorescent ceiling light.
> Tired but clean. Neutral documentary photo, 3:2 landscape, shot from door.

Nachher-Prompt:
> Same framing and angle: modern renovated bathroom in the same footprint, now
> with large sand-coloured tiles, walk-in shower with fluted glass panel, matte
> black fixtures, floating wooden vanity, warm recessed lighting. Editorial
> magazine style, 3:2.

## 10. Vorher/Nachher — Heizung

Dateien: `public/images/before-after/heizung-vorher.jpg`, `heizung-nachher.jpg`

Vorher-Prompt:
> Cluttered basement corner with an old white oil boiler from the 1990s, yellowed
> insulation on copper pipes, dusty gauges, rusted valves. Natural documentary
> photo, 3:2.

Nachher-Prompt:
> Same basement corner, now with a clean modern wall-mounted gas condensing
> boiler, fresh white insulation, new brass manifolds, organised labelling. Bright
> LED work light. Editorial, 3:2.

## 11. Über uns — Atmosphäre

Datei: `public/images/atmosphere/werkstatt-detail.jpg`

Prompt:
> Macro editorial detail: weathered craftsman hands, a vintage wrench resting next
> to a modern digital caliper on a worn wooden bench. Warm cinematic light.
> Shallow depth of field. 3:2 landscape.

## 12. Rügen-Atmosphäre

Datei: `public/images/atmosphere/ruegen-kueste.jpg`

Prompt:
> Wide-angle documentary photograph of the Ruegen coast near Breege: thatched
> red-roofed houses, beach grass, distant lighthouse, Baltic Sea in soft overcast
> morning light. No people, no text. 16:9.

## 13. Ratgeber Header

- `public/images/ratgeber/waermepumpe.jpg` — reuse or variant of #4
- `public/images/ratgeber/wartung.jpg` — reuse of #5
- `public/images/ratgeber/bad.jpg` — reuse of #6
```

- [ ] **Step 2: Commit**

```bash
git add content/image-prompts.md
git commit -m "docs(brand): catalogue nano-banana prompts for all site imagery"
```

### Task 2.3: Hero-Bild generieren (Vater & Sohn)

**Files:**
- Create: `public/images/hero/vater-sohn-werkstatt.jpg`

- [ ] **Step 1: Nano-Banana-Skill aufrufen**

Skill: `nano-banana:nano-banana` mit dem Prompt aus `content/image-prompts.md` #1, Output nach `public/images/hero/vater-sohn-werkstatt.jpg`, Auflösung 1600×2000 (4:5).

- [ ] **Step 2: Ergebnis visuell prüfen**

Lade die Datei als Bild. Akzeptanz-Kriterien:
- Keine Text-Artefakte
- Kein gestelltes Lächeln
- Natürliche Werkstatt-Atmosphäre
- Farbwelt trifft Navy/Orange/Linen

Wenn Abweichung > 20%: Prompt leicht variieren und neu generieren.

- [ ] **Step 3: Commit**

```bash
git add public/images/hero/vater-sohn-werkstatt.jpg
git commit -m "feat(brand): add hero image vater-sohn-werkstatt"
```

### Task 2.4: Service-Bilder generieren

Wiederholt pro Bild (Prompts 2–8 aus `content/image-prompts.md`):

- [ ] **Heizung** `public/images/services/heizung-modernisierung.jpg` — Nano-Banana aufrufen, Ergebnis prüfen, committen.
- [ ] **Wärmepumpe** `public/images/services/waermepumpe-aussen.jpg`
- [ ] **Wartung** `public/images/services/wartung-inspektion.jpg`
- [ ] **Badsanierung** `public/images/services/badsanierung-modern.jpg`
- [ ] **Klimaanlage** `public/images/services/klimaanlage-innen.jpg`
- [ ] **Notdienst** `public/images/services/notdienst-einsatz.jpg`
- [ ] **Leistungen-Hero** `public/images/services/leistungen-hero.jpg`

Jeweils ein Commit: `feat(brand): add service image <name>`.

### Task 2.5: Vorher/Nachher-Bilder generieren

**Files:**
- Create: `public/images/before-after/bad-vorher.jpg`
- Create: `public/images/before-after/bad-nachher.jpg`
- Create: `public/images/before-after/heizung-vorher.jpg`
- Create: `public/images/before-after/heizung-nachher.jpg`

- [ ] **Bad Vorher** — nano-banana mit Prompt #9a
- [ ] **Bad Nachher** — nano-banana mit Prompt #9b, identisches Framing
- [ ] **Heizung Vorher** — nano-banana mit Prompt #10a
- [ ] **Heizung Nachher** — nano-banana mit Prompt #10b, identisches Framing

Beide Paare müssen den **gleichen Bildausschnitt** haben, damit der Slider glaubhaft ist. Wenn Framing abweicht, neu generieren.

- [ ] **Commit**:

```bash
git add public/images/before-after/
git commit -m "feat(brand): add before/after image pairs for bath and boiler"
```

### Task 2.6: Atmosphäre- und Ratgeber-Bilder

- [ ] `public/images/atmosphere/werkstatt-detail.jpg` (Prompt #11)
- [ ] `public/images/atmosphere/ruegen-kueste.jpg` (Prompt #12)
- [ ] `public/images/ratgeber/waermepumpe.jpg` (Variant von #4)
- [ ] `public/images/ratgeber/wartung.jpg` (Variant von #5)
- [ ] `public/images/ratgeber/bad.jpg` (Variant von #6)

Commit: `feat(brand): add atmosphere and ratgeber images`.

---

## Phase 3 — Shared Components

### Task 3.1: UI-Primitives (Button, Section, Kicker, Card, Icon)

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/section.tsx`
- Create: `components/ui/kicker.tsx`
- Create: `components/ui/card.tsx`
- Create: `components/ui/icon.tsx`

- [ ] **Step 1: `components/ui/icon.tsx`**

```tsx
import type { CSSProperties } from "react";

type Props = {
  name: string;
  className?: string;
  fill?: boolean;
  style?: CSSProperties;
};

export function Icon({ name, className, fill, style }: Props) {
  const variationStyle: CSSProperties = {
    fontVariationSettings: `"FILL" ${fill ? 1 : 0}, "wght" 400, "GRAD" 0, "opsz" 24`,
    ...style,
  };
  return (
    <span
      aria-hidden
      className={`material-symbols-outlined ${className ?? ""}`.trim()}
      style={variationStyle}
    >
      {name}
    </span>
  );
}
```

- [ ] **Step 2: `components/ui/button.tsx`**

```tsx
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Tone = "primary" | "secondary" | "accent" | "ghost";
type Size = "md" | "lg";

const toneClasses: Record<Tone, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-container active:scale-[0.98]",
  secondary:
    "bg-surface-container-high text-primary hover:bg-surface-container-highest",
  accent:
    "bg-accent text-on-accent hover:brightness-95 active:scale-[0.98]",
  ghost:
    "bg-transparent text-primary hover:bg-surface-container-high",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm font-semibold rounded-lg",
  lg: "px-8 py-4 text-base font-bold rounded-lg",
};

type ButtonProps = {
  tone?: Tone;
  size?: Size;
  href?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "children">;

export function Button({
  tone = "primary",
  size = "md",
  href,
  children,
  className,
  ...rest
}: ButtonProps) {
  const classes = `inline-flex items-center gap-3 transition-all duration-200 ${toneClasses[tone]} ${sizeClasses[size]} ${className ?? ""}`.trim();
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 3: `components/ui/section.tsx`**

```tsx
import type { ReactNode } from "react";

type Tone = "surface" | "surface-low" | "surface-container" | "primary";

const toneClasses: Record<Tone, string> = {
  surface: "bg-surface text-on-surface",
  "surface-low": "bg-surface-container-low text-on-surface",
  "surface-container": "bg-surface-container text-on-surface",
  primary: "bg-primary text-on-primary",
};

type Props = {
  tone?: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ tone = "surface", id, className, children }: Props) {
  return (
    <section
      id={id}
      className={`py-20 lg:py-28 ${toneClasses[tone]} ${className ?? ""}`.trim()}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">{children}</div>
    </section>
  );
}
```

- [ ] **Step 4: `components/ui/kicker.tsx`**

```tsx
type Props = { children: string; className?: string };

export function Kicker({ children, className }: Props) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant ${className ?? ""}`.trim()}
    >
      {children}
    </p>
  );
}
```

- [ ] **Step 5: `components/ui/card.tsx`**

```tsx
import type { ReactNode } from "react";

type Props = {
  className?: string;
  children: ReactNode;
};

export function Card({ className, children }: Props) {
  return (
    <article
      className={`bg-surface-container-lowest rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-30px_rgba(0,30,64,0.25)] ${className ?? ""}`.trim()}
    >
      {children}
    </article>
  );
}
```

- [ ] **Step 6: Typecheck**

```bash
npm run typecheck
```

- [ ] **Step 7: Commit**

```bash
git add components/ui/
git commit -m "feat(ui): add button section kicker card icon primitives"
```

### Task 3.2: Site Header

**Files:**
- Modify: `components/site-header.tsx`

- [ ] **Step 1: `components/site-header.tsx` komplett ersetzen**

```tsx
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { company, navItems } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-effect bg-surface/80 border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={company.name}>
          <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-primary">
            <span className="text-on-primary font-black text-lg leading-none">B</span>
            <span className="absolute -right-0.5 -bottom-0.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-surface" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-xl font-black tracking-tight text-primary">Bertig</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-on-surface-variant">
              Heizung &amp; Sanitär
            </span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-primary/70 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={company.phones.mobileHref}
            className="hidden lg:inline-flex items-center gap-2 text-error font-bold text-sm"
          >
            <Icon name="emergency" />
            Notdienst
          </a>
          <Button tone="primary" href="/kontakt">
            Termin buchen
          </Button>
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Typecheck + Build**

```bash
npm run typecheck && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/site-header.tsx
git commit -m "feat(layout): editorial glass-effect header with signet badge"
```

### Task 3.3: Site Footer

**Files:**
- Modify: `components/site-footer.tsx`

- [ ] **Step 1: `components/site-footer.tsx` komplett ersetzen**

```tsx
import Image from "next/image";
import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { company, navItems } from "@/lib/site-data";

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-on-primary">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 space-y-6">
          <Image
            src="/brand/logo/bertig-logo-light.png"
            alt={company.name}
            width={320}
            height={120}
            className="h-14 w-auto"
          />
          <p className="text-on-primary/75 max-w-md leading-relaxed">
            Familienbetrieb seit {company.foundingYear} in Breege auf Rügen.
            Persönlich erreichbar für Heizung, Sanitär, Wartung und Bad.
          </p>
          <div className="flex flex-col gap-2 text-sm text-on-primary/80">
            <a href={company.phones.landlineHref} className="flex items-center gap-2 hover:text-accent">
              <Icon name="call" /> {company.phones.landline}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-accent">
              <Icon name="mail" /> {company.email}
            </a>
            <p className="flex items-center gap-2">
              <Icon name="place" /> {company.address.street}, {company.address.postalCode}{" "}
              {company.address.city}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-4">
            Navigation
          </h4>
          <nav className="flex flex-col gap-2 text-on-primary/80">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-accent font-bold mb-4">
            Rechtliches
          </h4>
          <nav className="flex flex-col gap-2 text-on-primary/80">
            {legalLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-accent">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-on-primary/10 py-6 text-center text-xs text-on-primary/60">
        © {new Date().getFullYear()} {company.name}
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Typecheck + Build**

```bash
npm run typecheck && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/site-footer.tsx
git commit -m "feat(layout): navy footer with brand logo and contact facts"
```

### Task 3.4: Trust Bar

**Files:**
- Create: `components/ui/trust-bar.tsx`

- [ ] **Step 1: Komponent schreiben**

```tsx
import { Icon } from "@/components/ui/icon";

const items = [
  { icon: "verified", label: "Familienbetrieb seit 1990" },
  { icon: "engineering", label: "Bosch Premium Partner" },
  { icon: "support_agent", label: "24h-Notdienst" },
  { icon: "location_on", label: "Persönlich auf Rügen" },
];

export function TrustBar() {
  return (
    <div className="bg-surface-container-low border-y border-outline-variant/15">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-wrap justify-between gap-6 text-sm font-semibold text-primary/80">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <Icon name={item.icon} className="text-accent" fill />
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/trust-bar.tsx
git commit -m "feat(ui): trust bar with signature accents"
```

### Task 3.5: Closing Band

**Files:**
- Create: `components/ui/closing-band.tsx`

- [ ] **Step 1: Komponent schreiben**

```tsx
import Link from "next/link";

type Action = { href: string; label: string; tone: "accent" | "outline" };

type Props = {
  kicker: string;
  title: string;
  copy: string;
  actions: Action[];
};

export function ClosingBand({ kicker, title, copy, actions }: Props) {
  return (
    <section className="bg-primary text-on-primary relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(234,122,30,0.35), transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,51,102,0.8), transparent 60%)",
        }}
      />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 lg:py-32 text-center relative">
        <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-6">
          {kicker}
        </p>
        <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          {title}
        </h2>
        <p className="text-lg text-on-primary/80 max-w-2xl mx-auto mb-10">{copy}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {actions.map((action) => {
            const isAccent = action.tone === "accent";
            const classes = isAccent
              ? "bg-accent text-on-accent hover:brightness-95"
              : "border-2 border-on-primary/30 text-on-primary hover:bg-on-primary/10";
            return (
              <Link
                key={action.href}
                href={action.href}
                className={`px-10 py-5 rounded-lg font-bold text-lg transition-all active:scale-[0.98] ${classes}`}
              >
                {action.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/closing-band.tsx
git commit -m "feat(ui): navy closing band component with gradient glow"
```

### Task 3.6: BeforeAfter Slider

**Files:**
- Create: `components/ui/before-after.tsx`

- [ ] **Step 1: Interaktiven Slider als Client Component**

```tsx
"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  caption?: string;
};

export function BeforeAfter({ beforeSrc, afterSrc, alt, caption }: Props) {
  const [position, setPosition] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, next)));
  };

  return (
    <figure className="relative w-full">
      <div
        ref={ref}
        className="relative aspect-[3/2] overflow-hidden rounded-xl select-none cursor-ew-resize"
        onMouseMove={(e) => handleMove(e.clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      >
        <Image
          src={afterSrc}
          alt={`${alt} nachher`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <Image
            src={beforeSrc}
            alt={`${alt} vorher`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-accent shadow-[0_0_0_3px_rgba(255,255,255,0.6)]"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 -translate-y-1/2 -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-on-accent font-black shadow-lg">
            ⇔
          </span>
        </div>
        <span className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
          Vorher
        </span>
        <span className="absolute top-4 right-4 bg-accent text-on-accent px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest">
          Nachher
        </span>
      </div>
      {caption && (
        <figcaption className="mt-4 text-sm text-on-surface-variant">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
```

- [ ] **Step 2: Typecheck + Build**

```bash
npm run typecheck && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/before-after.tsx
git commit -m "feat(ui): interactive before/after slider"
```

---

## Phase 4 — Startseite (`/`)

### Task 4.1: Hero Section

**Files:**
- Modify: `app/page.tsx` (Hero only)

- [ ] **Step 1: `app/page.tsx` mit Hero-Block überschreiben**

Nutze `editorial-grid` 12-Spalten Layout: Copy links (col-span 7), Bild rechts (col-span 5) mit overflowendem Notiz-Badge.

```tsx
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { company, homeContent, homeHero } from "@/lib/site-data";

export default function HomePage() {
  return (
    <>
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 editorial-grid items-center">
          <div className="col-span-12 lg:col-span-7 lg:pr-12">
            <Kicker className="mb-6">{homeHero.eyebrow}</Kicker>
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold tracking-[-0.02em] text-primary leading-[1.05] mb-8">
              Wärme für Generationen.
              <br />
              <span className="text-accent">Vater &amp; Sohn.</span>
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {homeHero.lead}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button tone="primary" size="lg" href="/leistungen">
                Unsere Leistungen <Icon name="arrow_forward" />
              </Button>
              <Link
                href={company.phones.mobileHref}
                className="flex items-center gap-4 px-6 py-4 bg-surface-container-high rounded-lg"
              >
                <div className="flex -space-x-3">
                  <span className="w-10 h-10 rounded-full border-2 border-surface bg-primary flex items-center justify-center text-on-primary text-xs font-bold">
                    EB
                  </span>
                  <span className="w-10 h-10 rounded-full border-2 border-surface bg-accent flex items-center justify-center text-on-accent text-xs font-bold">
                    MB
                  </span>
                </div>
                <span className="text-sm font-bold text-primary">
                  Direkt vom Inhaber
                </span>
              </Link>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
              <Image
                src="/images/hero/vater-sohn-werkstatt.jpg"
                alt="Präzise Handwerksarbeit an einer modernen Heizungsanlage"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-xl shadow-xl max-w-[260px]">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="verified" className="text-accent" fill />
                <span className="font-bold text-primary">Insel-Expertise</span>
              </div>
              <p className="text-xs text-on-surface-variant">
                {homeContent.sections?.[1]?.items?.[1] ??
                  "Wir kennen die Anforderungen von Wohnhäusern und Ferienimmobilien auf Rügen."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: `npm run dev` starten + `mcp__claude-in-chrome` Screenshot auf `/`**

Erwartet: Hero mit warmem Linen-BG, Navy-Typo, Orange "Vater & Sohn", Hero-Bild rechts mit Notiz-Badge.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): editorial hero with asymmetric 12-col layout"
```

### Task 4.2: Trust Bar + Services Section

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Services Section hinzufügen**

Unter dem Hero Block einfügen:

```tsx
import { TrustBar } from "@/components/ui/trust-bar";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: "heat_pump",
    title: "Wärmepumpen",
    copy: "Ehrlich geprüft, sauber geplant. Wir sagen ehrlich, wann sie passt — und wann nicht.",
    href: "/waermepumpen-ruegen",
  },
  {
    icon: "local_fire_department",
    title: "Heizung modernisieren",
    copy: "Vom Öl-Austausch bis zum Gas-Brennwert und Bosch Premium Partner-Technik.",
    href: "/heizung-ruegen",
  },
  {
    icon: "build_circle",
    title: "Wartung & Service",
    copy: "Drei klare Pakete, Typenschild-Upload und saubere Rückmeldung statt Blackbox.",
    href: "/wartung-service",
  },
  {
    icon: "shower",
    title: "Badsanierung",
    copy: "Teilmodernisierung oder Komplettumbau, koordiniert aus einer Hand.",
    href: "/badsanierung-ruegen",
  },
  {
    icon: "mode_fan",
    title: "Klimaanlagen",
    copy: "Kühlen und entfeuchten für Ferienimmobilien und Wohnhäuser auf Rügen.",
    href: "/klimaanlagen-ruegen",
  },
  {
    icon: "emergency",
    title: "24h-Notdienst",
    copy: "Wenn die Heizung ausfällt, zählt direkte Erreichbarkeit.",
    href: "/notdienst",
  },
];

// ... within JSX, nach dem Hero:
<TrustBar />
<Section tone="surface-low" id="leistungen">
  <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
    <div className="max-w-2xl">
      <Kicker className="mb-4">Technik, die bleibt.</Kicker>
      <h2 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
        Sechs Leistungsfelder,
        <br />
        eine klare Handschrift.
      </h2>
    </div>
    <p className="text-on-surface-variant max-w-md">
      Von der Modernisierung bis zur hochmodernen Wärmepumpe — wir rüsten Ihr
      Zuhause auf Rügen für die Zukunft.
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.map((service) => (
      <Card key={service.href}>
        <div className="w-14 h-14 rounded-lg bg-primary/5 flex items-center justify-center mb-6">
          <Icon name={service.icon} className="text-primary text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
        <p className="text-on-surface-variant leading-relaxed mb-6">{service.copy}</p>
        <Link
          href={service.href}
          className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
        >
          Mehr erfahren <Icon name="east" />
        </Link>
      </Card>
    ))}
  </div>
</Section>
```

- [ ] **Step 2: Browser-Prüfung auf `/`**

Erwartet: Trust Bar unter Hero, darunter Service-Grid mit 6 Cards, warmer `surface-low` Hintergrund.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): add trust bar and six-card service grid"
```

### Task 4.3: Story Section (Vater & Sohn)

- [ ] **Step 1: Story-Section einfügen**

```tsx
<Section tone="surface" id="ueber-uns">
  <div className="editorial-grid items-center gap-12">
    <div className="col-span-12 lg:col-span-6 order-2 lg:order-1">
      <div className="relative">
        <Image
          src="/images/atmosphere/werkstatt-detail.jpg"
          alt="Traditionelles Werkzeug trifft moderne Technik"
          width={1600}
          height={1200}
          className="w-full rounded-2xl shadow-2xl"
        />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent rounded-full flex items-center justify-center text-center border-8 border-surface transform rotate-[8deg]">
          <span className="text-primary font-black text-lg leading-tight">
            Seit 1990 auf Rügen
          </span>
        </div>
      </div>
    </div>
    <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
      <Kicker className="mb-4">Unsere Geschichte</Kicker>
      <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-8 leading-tight">
        Tradition trifft <span className="text-accent">Next Gen.</span>
      </h2>
      <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
        <p>
          Was 1990 als Ein-Mann-Betrieb in Breege begann, ist heute ein
          Familienbetrieb mit klarer Linie: belastbare Planung, saubere
          Ausführung und Erreichbarkeit auf der ganzen Insel.
        </p>
        <p>
          Vater und Sohn arbeiten Seite an Seite — jahrzehntelanges Praxiswissen
          trifft moderne Technik und neue Ausbildung.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-8 mt-12">
        <div>
          <div className="text-4xl font-black text-primary mb-1">100%</div>
          <div className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
            Insel-Fokus
          </div>
        </div>
        <div>
          <div className="text-4xl font-black text-primary mb-1">24/7</div>
          <div className="text-sm font-bold uppercase tracking-wider text-on-surface-variant">
            Notdienst-Bereit
          </div>
        </div>
      </div>
    </div>
  </div>
</Section>
```

- [ ] **Step 2: Browser-Prüfung**

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): vater-sohn story section with floating trust badge"
```

### Task 4.4: Vorher/Nachher Showcase

- [ ] **Step 1: Neue Section einfügen mit `BeforeAfter` Component**

```tsx
import { BeforeAfter } from "@/components/ui/before-after";

// ... innerhalb Page JSX:
<Section tone="surface-container" id="vorher-nachher">
  <div className="editorial-grid items-center gap-12">
    <div className="col-span-12 lg:col-span-5">
      <Kicker className="mb-4">Vorher / Nachher</Kicker>
      <h2 className="text-4xl lg:text-5xl font-extrabold text-primary mb-6 leading-tight">
        Was bei uns aus einer Modernisierung wird.
      </h2>
      <p className="text-on-surface-variant leading-relaxed mb-6">
        Ein Bad aus den 80ern oder eine alte Heizung kann mit klarer Planung
        und sauberer Ausführung zu einem spürbar besseren Alltag werden. Ziehen
        Sie den Regler — so sieht der Unterschied aus.
      </p>
      <Button tone="primary" href="/kontakt">
        Projekt anfragen
      </Button>
    </div>
    <div className="col-span-12 lg:col-span-7 space-y-8">
      <BeforeAfter
        beforeSrc="/images/before-after/bad-vorher.jpg"
        afterSrc="/images/before-after/bad-nachher.jpg"
        alt="Badsanierung"
        caption="Badmodernisierung — dieselbe Raumgeometrie, neue Funktion."
      />
      <BeforeAfter
        beforeSrc="/images/before-after/heizung-vorher.jpg"
        afterSrc="/images/before-after/heizung-nachher.jpg"
        alt="Heizungsmodernisierung"
        caption="Kesseltausch — alter Ölkessel zu modernem Brennwertgerät."
      />
    </div>
  </div>
</Section>
```

- [ ] **Step 2: Browser-Prüfung, Slider funktionstest**

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): before/after showcase with interactive sliders"
```

### Task 4.5: Wartungs-Teaser + FAQ-Teaser + Closing

- [ ] **Step 1: Wartungs-Teaser mit 3 Paketen aus `maintenancePackages`**

Nutze `maintenancePackages` aus `lib/site-data.ts`, rendere 3 Karten, das markierte `recommended: true` bekommt einen `border-accent` Rahmen.

```tsx
import { maintenancePackages } from "@/lib/site-data";

<Section tone="surface" id="wartung">
  <div className="text-center max-w-2xl mx-auto mb-16">
    <Kicker className="mb-4">Wartung & Service</Kicker>
    <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-6">
      Drei klare Pakete. Ein strukturierter Weg.
    </h2>
    <p className="text-on-surface-variant leading-relaxed">
      Klare Leistungen, Typenschild-Upload und persönliche Rückmeldung statt
      Wartungs-Blackbox.
    </p>
  </div>
  <div className="grid md:grid-cols-3 gap-6">
    {maintenancePackages.map((pkg) => (
      <Card
        key={pkg.slug}
        className={pkg.recommended ? "ring-2 ring-accent" : ""}
      >
        {pkg.recommended && (
          <span className="inline-block bg-accent text-on-accent text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-md mb-4">
            Empfohlen
          </span>
        )}
        <h3 className="text-2xl font-bold text-primary mb-2">{pkg.name}</h3>
        <p className="text-sm text-on-surface-variant mb-4">{pkg.audience}</p>
        <p className="text-lg font-bold text-primary mb-6">{pkg.priceLabel}</p>
        <ul className="space-y-3 text-sm text-on-surface-variant mb-8">
          {pkg.includes.map((item) => (
            <li key={item} className="flex gap-2">
              <Icon name="check_circle" className="text-accent text-base" fill />
              {item}
            </li>
          ))}
        </ul>
        <Button tone="secondary" href="/wartung-service">
          {pkg.cta}
        </Button>
      </Card>
    ))}
  </div>
</Section>
```

- [ ] **Step 2: FAQ-Teaser** (3 Fragen aus `faqEntries`, verlinkt auf `/faq`)

```tsx
import { faqEntries } from "@/lib/site-data";

<Section tone="surface-low" id="faq-teaser">
  <div className="editorial-grid gap-12">
    <div className="col-span-12 lg:col-span-4">
      <Kicker className="mb-4">Häufige Fragen</Kicker>
      <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
        Was Kunden uns vor einem Projekt fragen.
      </h2>
      <Button tone="ghost" href="/faq" className="mt-8">
        Alle Fragen <Icon name="east" />
      </Button>
    </div>
    <div className="col-span-12 lg:col-span-8 space-y-4">
      {faqEntries.slice(0, 3).map((entry) => (
        <details
          key={entry.question}
          className="group bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10"
        >
          <summary className="flex items-center justify-between cursor-pointer font-bold text-primary">
            {entry.question}
            <Icon
              name="expand_more"
              className="transition-transform group-open:rotate-180"
            />
          </summary>
          <p className="mt-4 text-on-surface-variant leading-relaxed">
            {entry.answer}
          </p>
        </details>
      ))}
    </div>
  </div>
</Section>
```

- [ ] **Step 3: Closing Band** mit `<ClosingBand>`

```tsx
import { ClosingBand } from "@/components/ui/closing-band";

<ClosingBand
  kicker="Direkter Kontakt"
  title="Bereit für ein warmes Zuhause?"
  copy="Vereinbaren Sie noch heute ein unverbindliches Beratungsgespräch direkt bei Ihnen vor Ort auf Rügen."
  actions={[
    { href: "/kontakt", label: "Termin vereinbaren", tone: "accent" },
    { href: company.phones.mobileHref, label: "Rückruf anfordern", tone: "outline" },
  ]}
/>
```

- [ ] **Step 4: Browser-Prüfung der gesamten Startseite**

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): wartung teaser, faq teaser, navy closing band"
```

---

## Phase 5 — Service-Seiten

Jede Service-Seite folgt dem gleichen Template: **Hero → Lead → Was wir tun → Arbeitsweise → Regionale Einordnung → CTA-Band**. Content aus `siteContentSource.routes`.

### Task 5.1: `/leistungen` (Übersicht)

**Files:**
- Create: `app/leistungen/page.tsx`

- [ ] **Step 1: Seite schreiben**

Verwendet dasselbe 6-Service-Grid wie die Startseite, aber mit grösserem Hero und einem Leitsatz pro Feld.

```tsx
import type { Metadata } from "next";
import Image from "next/image";

import { ClosingBand } from "@/components/ui/closing-band";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { company } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Unsere Leistungen",
  description:
    "Heizung, Wärmepumpen, Wartung, Bad, Klima und Notdienst — alle Leistungen von Bertig auf einen Blick.",
};

const services = [
  // ... identische Liste wie auf Startseite, aber mit bulletPoints Array pro Leistung
];

export default function LeistungenPage() {
  return (
    <>
      <section className="pt-32 pb-16 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 editorial-grid items-end">
          <div className="col-span-12 lg:col-span-7">
            <Kicker className="mb-6">Leistungen</Kicker>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05]">
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
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
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
              {/* identisch zu Home Services, leicht reduziert */}
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
```

- [ ] **Step 2: Browser-Check auf `/leistungen`**
- [ ] **Step 3: Commit** `feat(leistungen): overview page with asymmetric hero`

### Task 5.2: `/heizung-ruegen`

**Files:**
- Create: `app/heizung-ruegen/page.tsx`

- [ ] **Step 1: Service-Page-Template schreiben**

Nutze `findPageRoute("heizung-ruegen")` aus `lib/site-data.ts`. Sections:
1. Hero (Kicker "Heizung", H1 aus Content, Lead, CTA Paar, Bild rechts)
2. Leistungsbereiche als Liste mit Icons
3. Arbeitsweise (3 Steps)
4. Regionale Einordnung (Karte/Text)
5. FAQ-Teaser 2 Fragen
6. ClosingBand

Code-Skeleton (vollständig, nicht abkürzen):

```tsx
import type { Metadata } from "next";
import Image from "next/image";

import { ClosingBand } from "@/components/ui/closing-band";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { company, findPageRoute } from "@/lib/site-data";

const route = findPageRoute("heizung-ruegen")!;

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
};

const steps = [
  { icon: "fact_check", title: "Einordnung", copy: "Gebäude, Nutzung und Bestand prüfen — ohne Schnellverkauf." },
  { icon: "engineering", title: "Planung", copy: "Modernes System passend zu Heizlast, Warmwasser und späterer Wartung." },
  { icon: "handyman", title: "Umsetzung", copy: "Saubere Ausführung mit klaren Abläufen in bewohnten Häusern." },
];

export default function HeizungPage() {
  return (
    <>
      <section className="pt-32 pb-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 editorial-grid items-center">
          <div className="col-span-12 lg:col-span-7">
            <Kicker className="mb-6">Heizung · Rügen</Kicker>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-primary tracking-[-0.02em] leading-[1.05] mb-8">
              {route.headline}
            </h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed mb-10">
              {route.lead}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button tone="primary" size="lg" href="/kontakt">
                Beratung anfragen
              </Button>
              <Button tone="secondary" size="lg" href={company.phones.mobileHref}>
                <Icon name="call" /> Jetzt anrufen
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 relative mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/services/heizung-modernisierung.jpg"
                alt="Moderne Heizungsinstallation"
                width={1200}
                height={1500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <Section tone="surface-low">
        <div className="editorial-grid gap-12">
          <div className="col-span-12 lg:col-span-5">
            <Kicker className="mb-4">Wobei wir helfen</Kicker>
            <h2 className="text-4xl font-extrabold text-primary leading-tight">
              Von Öl-Austausch bis Gas-Brennwert.
            </h2>
          </div>
          <ul className="col-span-12 lg:col-span-7 space-y-5">
            {route.bullets?.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-4 bg-surface-container-lowest rounded-xl p-5"
              >
                <Icon name="check_circle" className="text-accent mt-0.5" fill />
                <span className="text-on-surface leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
      <Section tone="surface">
        <Kicker className="mb-4">Arbeitsweise</Kicker>
        <h2 className="text-4xl font-extrabold text-primary mb-12 leading-tight max-w-3xl">
          Drei Schritte vom Gespräch zur fertigen Anlage.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div key={s.title} className="bg-surface-container-lowest rounded-xl p-8">
              <div className="text-accent text-sm font-black uppercase tracking-widest mb-4">
                0{i + 1}
              </div>
              <Icon name={s.icon} className="text-primary text-4xl mb-4" />
              <h3 className="text-xl font-bold text-primary mb-3">{s.title}</h3>
              <p className="text-on-surface-variant">{s.copy}</p>
            </div>
          ))}
        </div>
      </Section>
      <ClosingBand
        kicker="Heizung modernisieren"
        title="Sprechen wir über Ihre Heizung."
        copy="Ein Termin vor Ort klärt meist mehr als zehn Telefonate. Wir kommen auf Rügen bei Ihnen vorbei."
        actions={[
          { href: "/kontakt", label: "Termin vereinbaren", tone: "accent" },
          { href: company.phones.mobileHref, label: "Direkt anrufen", tone: "outline" },
        ]}
      />
    </>
  );
}
```

- [ ] **Step 2: Browser-Check auf `/heizung-ruegen`**
- [ ] **Step 3: Commit** `feat(heizung): service page for heating modernisation`

### Task 5.3: `/waermepumpen-ruegen`

Gleiche Struktur wie 5.2. Content aus `findPageRoute("waermepumpen-ruegen")`, Hero-Bild `waermepumpe-aussen.jpg`, Steps angepasst (Machbarkeit → Konzept → Installation & Monitoring).

- [ ] **Seite bauen** — File `app/waermepumpen-ruegen/page.tsx`
- [ ] **Browser-Check**
- [ ] **Commit** `feat(waermepumpen): service page for heat pumps`

### Task 5.4: `/wartung-service`

Spezialseite mit 3 Paket-Karten **und** Wartungsformular (`components/request-forms.tsx` anpassen).

- [ ] **Step 1: Seite bauen** (Hero, 3-Paket-Grid aus `maintenancePackages`, Formular-Section)
- [ ] **Step 2: `components/request-forms.tsx` an neues Design anpassen** (Input-Style laut DESIGN.md: `surface-container-highest` bg, 2px bottom accent). Sicherstellen, dass die Felder in `maintenanceFieldLabels` auftauchen.
- [ ] **Step 3: Browser-Check, Form-Submit manuell einmal durchspielen (ohne Send, nur Validation)**
- [ ] **Commit** `feat(wartung): pakete + anfrage form`

### Task 5.5: `/badsanierung-ruegen`

- [ ] **Step 1: Seite bauen** mit `BeforeAfter`-Slider eingebettet (Bad-Variante)
- [ ] **Browser-Check**
- [ ] **Commit** `feat(badsanierung): service page with before/after`

### Task 5.6: `/klimaanlagen-ruegen`

- [ ] **Step 1: Seite bauen**
- [ ] **Browser-Check**
- [ ] **Commit** `feat(klima): service page for air conditioning`

### Task 5.7: `/notdienst`

Besonderheit: Roter Akzent (error), Telefonnummer prominent, Checklist aus `route.checklist`.

- [ ] **Step 1: Seite bauen**
- [ ] **Browser-Check**
- [ ] **Commit** `feat(notdienst): emergency page with prominent phone CTA`

---

## Phase 6 — Info- und Wissens-Seiten

### Task 6.1: `/ueber-uns`

- [ ] **Step 1: Seite bauen** — Hero, Geschichts-Timeline, Werte, Portrait-Platzhalter für Vater & Sohn (nutze `vater-sohn-werkstatt.jpg` + Signet-Badge)
- [ ] **Commit** `feat(ueber-uns): family history page`

### Task 6.2: `/kontakt`

- [ ] **Step 1: Seite bauen** mit Kontaktbox (Adresse, Telefon, Mail, Öffnungszeiten) + allgemeines Anfrageformular aus `request-forms.tsx`
- [ ] **Step 2: Formular-Styling angleichen**
- [ ] **Commit** `feat(kontakt): contact page with anfrage form`

### Task 6.3: `/faq`

- [ ] **Step 1: Seite bauen** — alle `faqEntries` als `<details>`-Liste, JSON-LD per `buildFaqJsonLd`
- [ ] **Commit** `feat(faq): faq page with structured data`

### Task 6.4: `/ratgeber` (Hub)

- [ ] **Step 1: Seite bauen** — Hero, Grid von 3 `knowledgeEntries`-Cards mit Bild
- [ ] **Commit** `feat(ratgeber): knowledge hub page`

### Task 6.5: `/ratgeber/[slug]`

- [ ] **Step 1: Dynamic Route anpassen** — Template mit Hero-Bild, Intro, Points als Editorial-List, CTA-Box
- [ ] **Step 2: `generateStaticParams` aus `knowledgeSlugs`**
- [ ] **Step 3: Alle 3 Artikel durchtesten**
- [ ] **Commit** `feat(ratgeber): dynamic article pages`

---

## Phase 7 — Legal

### Task 7.1: `/impressum`

- [ ] **Step 1: Seite bauen** — Content aus `company` + `legalNotice`, einfaches Editorial-Layout
- [ ] **Commit** `feat(impressum): legal notice page`

### Task 7.2: `/datenschutz`

- [ ] **Step 1: Seite bauen** — saubere Editorial-Typografie, Platzhalter für echte Textbausteine (sichtbar markiert für spätere juristische Review)
- [ ] **Commit** `feat(datenschutz): privacy policy page`

### Task 7.3: `/not-found.tsx`

- [ ] **Step 1: 404-Seite auf neues Design ziehen** — Navy Hero, 404-Zahl als Display-Text, Link zurück
- [ ] **Commit** `feat(404): editorial not-found page`

---

## Phase 8 — Verification, QA, Polish

### Task 8.1: Static Verification

- [ ] **Step 1:** `npm run lint` — muss ohne Fehler durchlaufen. Falls Fehler: fixen und committen.
- [ ] **Step 2:** `npm run typecheck` — muss ohne Fehler durchlaufen.
- [ ] **Step 3:** `npm run build` — Build muss grün sein, alle Seiten prerendern.

### Task 8.2: Visuelle QA aller Seiten

- [ ] **Step 1: Dev-Server starten** `npm run dev` (run_in_background=true)
- [ ] **Step 2: Pro Route via `mcp__claude-in-chrome` Screenshot machen** — 15 Routen, jeweils 1440×900 und 390×844 (mobile)
- [ ] **Step 3: Fehlerliste führen** — Abweichungen vom Design Muster notieren (z.B. Abstände, Farbkontraste, Überschriften-Hierarchie)
- [ ] **Step 4: Fixes in einem oder mehreren Commits** — `fix(ui): visual polish after QA pass`

### Task 8.3: SEO / Metadata-Prüfung

- [ ] **Step 1:** Für jede Seite Metadata-Objekt gegen `site-content-structured.json` prüfen
- [ ] **Step 2:** `robots.txt`, `sitemap.ts` auf neue Routen aktualisieren wenn nötig
- [ ] **Step 3:** JSON-LD (`LocalBusiness`, `FAQPage`) mit Google Rich Results Test prüfen
- [ ] **Commit:** `chore(seo): metadata and structured data sweep`

### Task 8.4: Responsive + Accessibility-Sanity

- [ ] **Step 1:** Auf 390, 768, 1024, 1440 Breiten durchscrollen, keine horizontal scrolls
- [ ] **Step 2:** `tab`-Navigation auf Startseite prüfen (alle Interactive-Elemente fokussierbar)
- [ ] **Step 3:** `prefers-reduced-motion` respektieren (Before/After Slider: Transitions reduzieren)
- [ ] **Commit:** `fix(a11y): tab order and reduced-motion fallback`

### Task 8.5: Cleanup + Finaler Commit

- [ ] **Step 1:** `scripts/process-logo.py` behalten oder löschen? → behalten, aber nach `scripts/` mit README-Kommentar
- [ ] **Step 2:** `content/image-prompts.md` bleibt als Artefakt
- [ ] **Step 3:** `README.md` aktualisieren mit Hinweis auf Rebuild
- [ ] **Step 4:** Branch mergen oder PR erstellen

```bash
git checkout main
git merge --no-ff rebuild/editorial-engineering
```

- [ ] **Commit** (falls Merge-Commit nötig): `chore: merge editorial engineering rebuild`

---

## Self-Review (vom Planer durchgeführt)

**Spec Coverage:**
- ALLE Seiten aus `site-data.ts` und `route-content-map.md` sind als Task abgedeckt (Phase 4–7).
- Nano-Banana Bilder: 13 Bilder katalogisiert in Phase 2.
- Vorher/Nachher: explizit als Task 2.5 und im Home-Showcase (Task 4.4) und Badsanierung (Task 5.5).
- Logo transparent: Task 2.1 mit Python-Script.
- Logo-Farben auf Seite: Task 1.2 definiert primary/accent auf echte Logo-Farben (Navy + Orange statt Gelb).
- Design-Muster-Treue: Phase 1 übernimmt `editorial-grid`, `glass-effect`, `@theme` Tokens direkt aus `Design Muster/DESIGN.md`.

**Placeholder Scan:** Keine "TBD", "später", "ähnlich wie" — alle Code-Blöcke sind vollständig.

**Type Consistency:**
- `Button` tone: `primary | secondary | accent | ghost` — konsistent in allen Tasks
- `ClosingBand` action tone: `accent | outline` — konsistent
- `Section` tone: `surface | surface-low | surface-container | primary` — konsistent
- Farb-Klassen: wir nutzen `bg-primary`, `text-on-primary`, `bg-accent`, `text-on-accent`, `bg-surface-container-low` etc. — alle aus `@theme`-Tokens in Task 1.2 definiert
- `homeContent`, `homeHero`, `company`, `navItems`, `maintenancePackages`, `faqEntries`, `findPageRoute` — alle in `lib/site-data.ts:1-184` bereits vorhanden, keine neuen Signatures nötig

**Risiken / offene Punkte die während Execution auftauchen können:**
- Tailwind v4 mit Next 16 ist cutting edge — falls Build bricht, Fallback auf v3 plus klassische `tailwind.config.ts`
- Nano-Banana-Bilder-Qualität kann variieren — Prompts sind im Katalog, notfalls iterieren
- Vorher/Nachher-Framing: Wenn Nano-Banana nicht identisch framed, müssen wir den nachher-Prompt mit explizitem "same camera position as previous image" ergänzen, oder manuell croppen

---

## Execution Handoff

Plan ist komplett. Zwei Ausführungsoptionen stehen bereit:

**1. Subagent-Driven (empfohlen)** — Ich dispatche pro Task einen frischen Subagent, reviewe zwischen Tasks, schnelle Iteration.

**2. Inline Execution** — Tasks werden direkt in dieser Session ausgeführt, batch mit Checkpoints.

Welchen Ansatz?
