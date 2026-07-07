export const locales = [
  "uk", // Ukrainian (default)
  "en", // English
  "pl", // Polish
  "de", // German
  "it", // Italian
  "es", // Spanish
  "fr", // French
  "pt", // Portuguese
  "zh", // Mandarin Chinese
  "hi", // Hindi
  "ar", // Arabic
  "bn", // Bengali
  "ur", // Urdu
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "uk";

/** Locales rendered right-to-left. */
export const rtlLocales: readonly Locale[] = ["ar", "ur"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dirFor(locale: Locale): "ltr" | "rtl" {
  return rtlLocales.includes(locale) ? "rtl" : "ltr";
}

/** Native language names for the language switcher. */
export const localeNames: Record<Locale, string> = {
  uk: "Українська",
  en: "English",
  pl: "Polski",
  de: "Deutsch",
  it: "Italiano",
  zh: "中文",
  hi: "हिन्दी",
  es: "Español",
  fr: "Français",
  ar: "العربية",
  bn: "বাংলা",
  pt: "Português",
  ur: "اردو",
};

/** og:locale values (language_TERRITORY). */
export const ogLocales: Record<Locale, string> = {
  uk: "uk_UA",
  en: "en_US",
  pl: "pl_PL",
  de: "de_DE",
  it: "it_IT",
  zh: "zh_CN",
  hi: "hi_IN",
  es: "es_ES",
  fr: "fr_FR",
  ar: "ar_SA",
  bn: "bn_BD",
  pt: "pt_PT",
  ur: "ur_PK",
};

/** The word "translation" in every supported language — the brand ribbon. */
export const translationWords: Record<Locale, string> = {
  uk: "переклад",
  en: "translation",
  pl: "tłumaczenie",
  de: "Übersetzung",
  it: "traduzione",
  zh: "翻译",
  hi: "अनुवाद",
  es: "traducción",
  fr: "traduction",
  ar: "ترجمة",
  bn: "অনুবাদ",
  pt: "tradução",
  ur: "ترجمہ",
};
