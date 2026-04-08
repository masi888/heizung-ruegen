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
