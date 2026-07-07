import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${site.url}/${locale}`])
  );

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "uk" ? 1 : 0.8,
    alternates: { languages: { ...languages, "x-default": `${site.url}/` } },
  }));
}
