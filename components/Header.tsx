import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <header className="header">
      <a className="brand" href={`/${locale}`} aria-label={dict.header.home}>
        <Logo />
        <span className="brandName">Babylon</span>
      </a>
      <div className="headerActions">
        <LanguageSwitcher current={locale} label={dict.header.language} />
        <ThemeToggle
          toggleLabel={dict.header.themeToggle}
          lightLabel={dict.header.themeLight}
          darkLabel={dict.header.themeDark}
        />
      </div>
    </header>
  );
}
