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
