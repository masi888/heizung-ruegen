import Link from "next/link";

import { EditorialSectionIntro } from "@/components/editorial-primitives";

export default function NotFound() {
  return (
    <div className="editorial-page editorial-page-legal">
      <section className="editorial-legal-hero">
        <EditorialSectionIntro kicker="Nicht gefunden" title="Diese Seite gibt es hier nicht." />
        <p>Am besten zurück zur Startseite oder direkt zur Leistungsübersicht.</p>
        <div className="button-row">
          <Link className="button button-primary" href="/">
            Zur Startseite
          </Link>
          <Link className="button button-secondary" href="/leistungen">
            Zu den Leistungen
          </Link>
        </div>
      </section>
    </div>
  );
}
