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
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 sm:py-24 lg:py-32 text-center relative">
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
