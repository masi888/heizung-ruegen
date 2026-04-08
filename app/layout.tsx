import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  buildCanonical,
  buildLocalBusinessJsonLd,
  company,
  metadataDefaults,
  siteUrl,
} from "@/lib/site-data";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: metadataDefaults.title,
    template: `%s | ${company.name}`,
  },
  description: metadataDefaults.description,
  alternates: {
    canonical: buildCanonical("/"),
  },
  openGraph: {
    title: metadataDefaults.title,
    description: metadataDefaults.description,
    url: siteUrl,
    siteName: company.name,
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={manrope.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="bg-surface text-on-surface font-display antialiased">
        <JsonLd data={buildLocalBusinessJsonLd()} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
