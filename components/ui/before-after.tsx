"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Icon } from "@/components/ui/icon";

type Props = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  caption?: string;
};

export function BeforeAfter({ beforeSrc, afterSrc, alt, caption }: Props) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveTo = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, next)));
  }, []);

  // Global listeners waehrend drag, damit der User die Maus auch aus der
  // Slider-Box heraus bewegen kann ohne dass der drag abreisst.
  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      moveTo(event.clientX);
    };
    const onMouseUp = () => setIsDragging(false);
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 0) return;
      moveTo(event.touches[0].clientX);
    };
    const onTouchEnd = () => setIsDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isDragging, moveTo]);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    moveTo(event.clientX);
    setIsDragging(true);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    moveTo(event.touches[0].clientX);
    setIsDragging(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((prev) => Math.max(0, prev - 5));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <figure className="relative w-full">
      <div
        ref={containerRef}
        role="slider"
        tabIndex={0}
        aria-label={`Vorher-Nachher-Vergleich: ${alt}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        className={`relative aspect-[3/2] overflow-hidden rounded-xl select-none touch-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={handleKeyDown}
      >
        <Image
          src={afterSrc}
          alt={`${alt} nachher`}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover pointer-events-none"
          draggable={false}
        />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${position}%` }}
        >
          <Image
            src={beforeSrc}
            alt={`${alt} vorher`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-accent shadow-[0_0_0_3px_rgba(255,255,255,0.6)] pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 -translate-y-1/2 -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-on-accent font-black shadow-lg">
            <Icon name="swap_horiz" className="text-lg" />
          </span>
        </div>
        <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-on-primary px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-widest pointer-events-none">
          Vorher
        </span>
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-accent text-on-accent px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-bold uppercase tracking-widest pointer-events-none">
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
