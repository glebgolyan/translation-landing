import type { Locale } from "./config";

export type Dictionary = typeof import("./locales/uk.json");

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  uk: () => import("./locales/uk.json").then((m) => m.default),
  en: () => import("./locales/en.json").then((m) => m.default),
  zh: () => import("./locales/zh.json").then((m) => m.default),
  hi: () => import("./locales/hi.json").then((m) => m.default),
  es: () => import("./locales/es.json").then((m) => m.default),
  fr: () => import("./locales/fr.json").then((m) => m.default),
  ar: () => import("./locales/ar.json").then((m) => m.default),
  bn: () => import("./locales/bn.json").then((m) => m.default),
  pt: () => import("./locales/pt.json").then((m) => m.default),
  ur: () => import("./locales/ur.json").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
