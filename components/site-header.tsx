"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { company, navItems } from "@/lib/site-data";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Bei Routenwechsel / Escape das Menü schließen, damit es nicht stehen bleibt
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-effect bg-surface/80 border-b border-outline-variant/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center shrink-0"
          aria-label={company.name}
          onClick={() => setMobileOpen(false)}
        >
          <span className="bg-primary rounded-lg px-3 py-2 inline-flex items-center">
            <Image
              src="/brand/logo/bertig-logo-light.webp"
              alt={company.name}
              width={930}
              height={348}
              priority
              className="h-7 sm:h-8 w-auto"
            />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-primary/70 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={company.phones.mobileHref}
            className="hidden md:inline-flex items-center gap-2 text-error font-bold text-sm"
            aria-label="Notdienst anrufen"
          >
            <Icon name="emergency" />
            Notdienst
          </a>
          <Button tone="primary" href="/kontakt" className="hidden sm:inline-flex">
            Termin buchen
          </Button>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg bg-surface-container-high text-primary"
          >
            <Icon name={mobileOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden border-t border-outline-variant/20 bg-surface/95 backdrop-blur-xl"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-1 text-base font-semibold">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-primary hover:bg-surface-container-high transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="h-px bg-outline-variant/20 my-3" />
            <a
              href={company.phones.mobileHref}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-error font-bold"
            >
              <Icon name="emergency" /> Notdienst: {company.phones.mobile}
            </a>
            <Link
              href="/kontakt"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-3 rounded-lg font-bold"
            >
              Termin buchen
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
