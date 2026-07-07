import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/literata";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@/styles/globals.css";

import { dirFor, isLocale, locales, ogLocales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { ThemeScript } from "@/components/ThemeScript";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Only the ten supported locales are ever rendered.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, `/${l}`])
  );
  languages["x-default"] = "/";

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: site.legalName,
      title: dict.meta.title,
      description: dict.meta.description,
      locale: ogLocales[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F7F9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1022" },
  ],
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <html lang={locale} dir={dirFor(locale)} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <JsonLd locale={locale} dict={dict} />
        <div className="page">
          <Header locale={locale} dict={dict} />
          {children}
          <Footer dict={dict} />
        </div>
      </body>
    </html>
  );
}
