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
