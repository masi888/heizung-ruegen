# Bertig Website Rebuild — Session Log

Chronologisches Protokoll der Editorial-Engineering-Rebuild-Session auf
`rebuild/editorial-engineering`. Start am 2026-04-08 auf Basis von
`docs/superpowers/plans/2026-04-08-bertig-rebuild.md`.

Alle Git-SHAs beziehen sich auf diese Branch. Die Commit-History ist die
primäre Quelle der Wahrheit — dieses Log ergänzt nur die "Warum"-Schicht und
fasst die Phasen zusammen.

---

## Phase 1 — Plan-Ausführung (Team "bertig-rebuild")

Großer Team-Lauf über den gesamten 8-Phasen-Plan aus
`docs/superpowers/plans/2026-04-08-bertig-rebuild.md`. Orchestriert vom Lead
(team-lead@bertig-rebuild) mit bis zu vier parallelen Executor-Workern
(worker-1 bis worker-4).

### Foundation (Lead, sequentiell)

- Baseline-Commits für Content und Next-App-Scaffold (`8bc9f76`, `5b28075`)
- Tailwind v4 (`4.2.2`) + `@tailwindcss/postcss` installiert
- `postcss.config.mjs`, neue `app/globals.css` mit `@theme`-Tokens nach echten
  Logo-Farben (Navy `#001e40`, Orange `#ea7a1e`, Gold `#f4b324`,
  Linen `#fef8f3`), Manrope Variable Font, Material Symbols
- `app/layout.tsx` neu verdrahtet, Stubs für `SiteHeader` / `SiteFooter`
- Alle Bestands-Pages, die auf das gelöschte `editorial-primitives`
  verwiesen, als Placeholder umgestellt, damit der Build während der
  Parallel-Phase grün bleibt
- `.omc/` in `.gitignore` aufgenommen
- Commit: `c41588e feat(foundation): tailwind v4 tokens, layout shell, placeholder routes`

### Brand Assets (Lead, sequentiell)

- `scripts/process-logo.py` mit Pillow für Logo-Transparenz — erste Runde
  mit Python 3.9 + ARM64-Pillow (Pillow musste mit `arch -arm64 pip install`
  neu installiert werden, weil die System-Pillow x86_64 war)
- `content/image-prompts.md` als Katalog für alle nano-banana Prompts
- 17 Bilder über nano-banana generiert (2K Flash), parallel im Hintergrund
  als Background-Bash-Tasks:
  - 1 Hero (vater-sohn-werkstatt, 4:5)
  - 7 Services (heizung, waermepumpe, wartung, bad, klima, notdienst, leistungen-hero)
  - 4 Before/After (bad + heizung, Nachher mit `-r <vorher>` für
    Framing-Konsistenz)
  - 2 Atmosphäre (werkstatt-detail, ruegen-kueste)
  - 3 Ratgeber-Varianten
- Dateien von `.jpeg` zu `.jpg` umbenannt, damit die Component-Pfade stimmen
- Duplikate aus dem Retry (`notdienst-einsatz.jpeg` neben `.jpg`) wieder entfernt
- Commits: `31f3cce`, `eb63bc0`, `dac5576`

### Shared Components (worker-1)

- `components/ui/{icon,button,section,kicker,card}.tsx` nach Plan Phase 3.1
- `components/site-header.tsx` als glass-effect Editorial-Header mit
  improvisiertem B-Badge + CSS-Wordmark (wurde später durch das echte Logo
  ersetzt, siehe Phase 3)
- `components/site-footer.tsx` als Navy-Footer mit Logo + Kontaktdaten
- `components/ui/{trust-bar,closing-band,before-after}.tsx`
- Commits: `d83a784`, `2f0162c`, `d39de9c`, `a5d9150`, `4e8f4d1`, `17006ce`

### Parallel Pages (worker-1 bis worker-4)

- **worker-1** — `app/page.tsx` (Home, 5 Sections aus Plan Phase 4)
- **worker-2** — `app/leistungen`, `app/heizung-ruegen`, `app/waermepumpen-ruegen`
- **worker-3** — `app/wartung-service`, `app/badsanierung-ruegen`,
  `app/klimaanlagen-ruegen`, `app/notdienst`
- **worker-4** — `app/ueber-uns`, `app/kontakt`, `app/faq`, `app/ratgeber`,
  `app/ratgeber/[slug]`, `app/impressum`, `app/datenschutz`, `app/not-found.tsx`
- Content aus `lib/site-data.ts` (homeHero, homeContent, company,
  maintenancePackages, faqEntries, findPageRoute, knowledgeEntries, etc.)
- Pro Seite ein atomarer Commit mit Conventional-Prefix
  (`feat(home)`, `feat(leistungen)`, ...)
- Commits: `477ae25` bis `af7da17`

### Verification + Finalize (Lead)

- Lint-Warning in `postcss.config.mjs` gefixt (anonymous default export
  als `const` benannt)
- `README.md` um Stack-Info + Design-System + Logo-Script-Hinweis erweitert
- Commit: `a31a323`

### Cleanup

- `.omc/handoffs/team-plan.md` und `.omc/handoffs/team-verify.md` als
  Stage-Handoff-Artefakte
- `TeamDelete` für `bertig-rebuild`, alle Worker via `shutdown_request`
  sauber runtergefahren

**Ergebnis nach Phase 1:** `rebuild/editorial-engineering` grün auf `lint`,
`typecheck`, `build` (23 Routen prerendern, dynamisch `/api/inquiry`).

---

## Phase 2 — Dev-Server Unblock

Nach Start von `npm run dev` lieferte die Homepage einen Runtime-Error von
`next/image`: `Invalid src prop (/images/hero/vater-sohn-werkstatt.jpg) ...
does not match images.localPatterns configured in your next.config.js`.

Die `next.config.ts` hatte `localPatterns` streng auf `/brand/**` und
`/site/**` beschränkt. Der Rebuild legt die nano-banana Assets aber unter
`/public/images/**` ab, deshalb blockierte die Image-Optimization den Pfad.

**Fix:** `/images/**` zur Whitelist der `localPatterns` hinzugefügt.

Commit: `0b0f8d5 fix(next-config): allow /images/** in next image localPatterns`

---

## Phase 3 — Brand & Header-Fix

### Logo ohne Ränder + echtes Logo im Header

Der User hat das Wunsch-Logo im Original geliefert — dasselbe JPG, das
schon unter `public/brand/bertig-logo.jpg` lag. Das Python/Pillow-Skript
hat bei Fuzz 55 noch einen sichtbaren Navy-Rand um die Kanten gelassen,
weil JPG-Kompressionsartefakte die globale Farbtoleranz aufweichten.

**Neuer Ansatz mit ImageMagick:** Statt global nach Navy-Pixeln zu suchen,
wird ein Corner-Floodfill von allen vier Bildecken aus auf `alpha 0`
gesetzt. Fuzz 25 % erreicht die Logo-Ränder sauber, ohne die weiße
Wordmark oder den orange-gold Ring anzugreifen. Danach `-trim +repage`
auf den tatsächlichen Content (930×348 px) und ein quadratischer Crop
für das Signet (348×348 px).

- `scripts/process-logo.py` → `scripts/process-logo.sh` (Bash, dokumentierte
  Shell-Pipeline, `chmod +x`)
- `public/brand/logo/bertig-logo-light.png` und `bertig-signet-only.png` neu
  generiert

### Header mit echtem Logo + Mobile Drawer

Der bisherige Header zeigte einen improvisierten "B"-Badge + CSS-Wordmark
"Bertig / Heizung & Sanitär". Der User wollte das echte Logo. Weil das Logo
weiße Schrift auf transparentem Grund hat und der Header auf Linen-Surface
sitzt, steckt es jetzt in einem Navy-Container:

```tsx
<span className="bg-primary rounded-lg px-3 py-2 inline-flex items-center">
  <Image src="/brand/logo/bertig-logo-light.png" ... className="h-7 sm:h-8 w-auto" />
</span>
```

Zusätzlich: Hamburger-Toggle unter `lg`, vollbreites Drawer mit Nav,
Notdienst-CTA und Termin-Button, Escape + body-scroll-lock via
`useEffect`-Hook.

### BeforeAfter-Slider: Click-to-drag

**Bug:** Der alte Slider trackte `onMouseMove` direkt auf dem Container —
der Handle folgte also sofort dem Cursor, ohne dass der User klicken musste.

**Fix:** Expliziter `isDragging`-State. `mousedown` / `touchstart` setzt
`true` und ruft `moveTo` einmalig auf. Während `isDragging` werden
`mousemove` / `mouseup` / `touchmove` / `touchend` / `touchcancel` global am
`window` registriert, damit die Geste beim Verlassen der Box nicht abreißt.
Nach dem Release wird wieder abgemeldet.

Zusätzlich:
- Keyboard-Support: Arrow-Links/Rechts bewegen den Handle ±5 %
- ARIA `role="slider"` + `aria-valuemin/max/now`
- `cursor-grab` / `cursor-grabbing` je nach State
- `focus-visible:ring-2 focus-visible:ring-accent`
- `touch-none` um Scroll-Hijacking auf Mobile zu vermeiden
- Unicode-Glyph `⇔` durch Material Symbol `swap_horiz` ersetzt
- `pointer-events-none` auf Images + Labels, damit der Slider-Container
  alle Events bekommt

Commit: `b2d059c fix(brand+ui): real header logo, clean keyed variants, drag-on-click slider`

---

## Phase 4 — Mobile Polish (Team "bertig-polish")

Zweiter Team-Lauf für den Mobile-Review-Sweep. Zwei Worker parallel:

- **polisher-1** — Home + 7 Service-Seiten
- **polisher-2** — 7 Info/Legal-Seiten

### Globales Fundament

`editorial-grid` in `app/globals.css` hat jetzt einen responsiven Gap:
1.5 rem auf kleinen Viewports, 2 rem ab `min-width: 768px`. Das verhindert,
dass die 12-col Grids auf Phones zu viel Luft zwischen den Children haben.

Commit: `bd2a5ee style(tokens): responsive gap for editorial-grid utility`

### Per-Seite Checklist (14 fix-Commits)

Jede Seite wurde gegen dieselbe Checklist gefahren:

1. **Hero Padding** — `pt-32 pb-20 lg:pt-48 lg:pb-32` → `pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32`. Mit 64-px-Header auf mobile reicht `pt-24` als Clearance.
2. **Hero H1** — `text-5xl lg:text-7xl` → `text-4xl sm:text-5xl lg:text-7xl`. Home-Hero behält `lg:text-[5.5rem]`.
3. **editorial-grid gap** — `gap-12` innerhalb der Grids → `gap-8 lg:gap-12`.
4. **Floating Badges** — `-top-10 -right-10 w-40 h-40`, `-bottom-6 -left-6` etc. → reduzierte Offsets auf mobile + responsive Sizes, oder `hidden sm:flex`.
5. **Buttons / CTAs** — `w-full sm:w-auto`, Paddings `px-6 py-3 sm:px-8 sm:py-4`.
6. **Zwei-Spalten Layouts** (z.B. Kontakt) — stacken sauber ab `lg`.
7. **FAQ `<details>`** — `p-6` → `p-5 sm:p-6`.
8. **Ratgeber Cards** — `gap-8` → `gap-6 md:gap-8`.
9. **Impressum/Datenschutz** — lange Links mit `break-words`.

Commits: `2075bd4`, `98e94f6`, `66f7efc`, `ecc6d40`, `b6558b2`, `933c74f`,
`e41e4bd`, `5d9bc08`, `6ed5ea6`, `71e9ad4`, `4568f4c`, `7ad96a1`, `60c3623`,
`c2c55f0`.

### Cleanup

- Worker via `shutdown_request` abgeschaltet
- `TeamDelete` für `bertig-polish`

---

## Phase 5 — Form-Rewrite (Wartung/Kontakt)

**Bug:** Das `RequestForms`-Client-Component (`components/request-forms.tsx`)
verwendete noch handgeschriebene CSS-Klassen (`forms-shell`, `tab-row`,
`tab-button`, `field-grid`, `package-grid`, `package-card`, `form-note`,
`form-feedback`, `button`, `button-primary`) aus der alten
`app/globals.css`. Die wurde in Phase 1 komplett durch Tailwind v4 `@theme`
Tokens ersetzt — die CSS-Klassen gab es also schlicht nicht mehr, und
das Formular sah auf `/wartung-service` und `/kontakt` völlig kaputt aus
(unsichtbare Tabs, ungestylte Inputs, keine Package-Cards, keine Buttons).

**Fix:** Komplettes Rewrite auf Tailwind-v4-Klassen im Editorial-Stil.

- Tab-Leiste als `grid grid-cols-2 gap-2 bg-surface-container rounded-xl p-1.5`
  mit aktivem State in `bg-primary text-on-primary`
- Alle Inputs / Selects / Textareas nutzen eine geteilte
  `fieldControl`-Klasse: `bg-surface-container-low`, abgesetzter unterer
  `border-b-2`, Focus-Ring in `accent` mit `ring-accent/20`
- Labels als `text-xs font-bold uppercase tracking-[0.15em]`
- Package-Cards nutzen `has-[:checked]:border-accent` für reaktiven
  Selected-State ohne zusätzlichen JS-State
- Empfohlene Pakete bekommen ein absolut positioniertes "Empfohlen"-Badge
- File-Input mit `file:`-Pseudoelement-Klassen für den Upload-Button
- Feedback-Banner je nach Status (`success` / `error`) mit farblich
  passenden Borders
- `autoComplete` Attribute für Browser-Autofill
- Content identisch: gleiche Field-Labels aus `maintenanceFieldLabels`,
  gleiche Package-Liste aus `maintenancePackages`, gleiche
  `/api/inquiry`-Verdrahtung, gleicher FormData-Body

---

## Offen / Nicht in dieser Session

- Visuelle QA aller Routen in einem echten Browser (Chrome-MCP war
  in dieser Session nicht angebunden, nur `curl`-Smoke-Test gegen
  `localhost:3000`)
- Manueller Absende-Test für `/api/inquiry` (benötigt echte
  `RESEND_API_KEY` / `INQUIRY_FROM_EMAIL` / `INQUIRY_TO_EMAIL`)
- Juristische Review der Datenschutz-Platzhaltertexte
- Merge-Entscheidung `rebuild/editorial-engineering` → `main`
- Optional: echte Portraits für Vater & Sohn statt KI-Hero

---

## Relevante Pfade

| Zweck | Pfad |
|---|---|
| Implementation-Plan | `docs/superpowers/plans/2026-04-08-bertig-rebuild.md` |
| Design-Referenz | `Design Muster/DESIGN.md` |
| Session-Log | `docs/rebuild-session-log.md` (diese Datei) |
| Stage-Handoffs | `.omc/handoffs/team-plan.md`, `.omc/handoffs/team-verify.md` |
| Design-Tokens | `app/globals.css` (`@theme`) |
| Content-Quelle | `lib/site-data.ts`, `content/*.json` |
| Brand-Assets | `public/brand/logo/`, `public/images/` |
| Logo-Processing | `scripts/process-logo.sh` (ImageMagick) |
| Nano-Banana Prompts | `content/image-prompts.md` |
