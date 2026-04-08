import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-primary text-on-primary flex items-center justify-center px-6">
      <div className="text-center space-y-8 max-w-lg">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
          Fehler
        </p>
        <p className="text-[12rem] leading-none font-extrabold text-on-primary/10 select-none">
          404
        </p>
        <div className="-mt-8 space-y-4">
          <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
            Diese Seite gibt es nicht.
          </h1>
          <p className="text-on-primary/70 leading-relaxed">
            Die Seite, die Sie suchen, existiert nicht oder wurde verschoben.
            Zurück zur Startseite — wir helfen Ihnen gerne weiter.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-accent text-on-accent px-10 py-5 rounded-lg font-bold text-lg hover:brightness-95 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">home</span>
          Zurück zur Startseite
        </Link>
      </div>
    </section>
  );
}
