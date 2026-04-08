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
