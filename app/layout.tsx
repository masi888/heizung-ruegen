import type { Metadata } from "next";
import { Manrope } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildLocalBusinessJsonLd, buildCanonical, company, metadataDefaults, siteUrl } from "@/lib/site-data";

import "./globals.css";

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const bodyText = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: metadataDefaults.title,
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
    images: [
      {
        url: "/site/wasserheizer-service.jpg",
        width: 1548,
        height: 1161,
        alt: `${company.name} bei der Arbeit`,
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className={`${body.variable} ${bodyText.variable}`}>
        <JsonLd data={buildLocalBusinessJsonLd()} />
        <div className="page-background" />
        <div className="site-shell">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
