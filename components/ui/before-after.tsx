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
