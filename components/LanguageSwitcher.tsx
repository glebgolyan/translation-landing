"use client";

import { useRouter } from "next/navigation";
import { localeNames, locales, type Locale } from "@/lib/i18n/config";

/**
 * Navigates between locale URLs (real routes — no client-side text swapping)
 * and persists the choice in the NEXT_LOCALE cookie so the root redirect
 * respects it on future visits.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const router = useRouter();

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const next = event.target.value as Locale;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.push(`/${next}`);
  }

  return (
    <label className="langSwitcher">
      <span className="visuallyHidden">{label}</span>
      <select className="langSelect" value={current} onChange={onChange} aria-label={label}>
        {locales.map((locale) => (
          <option key={locale} value={locale} lang={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </label>
  );
}
