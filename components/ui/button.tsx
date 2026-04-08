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
