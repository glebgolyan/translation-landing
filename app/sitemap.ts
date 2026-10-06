import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { site } from "@/lib/site";
import { serviceLocales, servicePages } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${site.url}/${locale}`])
  );

  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "uk" ? 1 : 0.8,
    alternates: { languages: { ...languages, "x-default": `${site.url}/` } },
  }));

  const services: MetadataRoute.Sitemap = serviceLocales.flatMap((locale) =>
    servicePages.map((page) => ({
      url: `${site.url}/${locale}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }))
  );

  return [...home, ...services];
}
