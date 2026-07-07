import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Picks the best locale for a first-time visitor:
 * 1. A previously chosen locale (cookie) always wins — stable URLs for
 *    returning users and no fighting with the language switcher.
 * 2. Otherwise the Accept-Language header is matched against supported
 *    locales (base-language match, quality-ordered).
 * 3. Falls back to Ukrainian, the site's default locale.
 */
function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => {
        const [tag, qPart] = part.trim().split(";");
        const q = qPart?.startsWith("q=") ? parseFloat(qPart.slice(2)) : 1;
        return { base: tag.trim().toLowerCase().split("-")[0], q: Number.isNaN(q) ? 0 : q };
      })
      .sort((a, b) => b.q - a.q);

    for (const { base } of preferred) {
      if (isLocale(base)) return base;
    }
  }

  return defaultLocale;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  // 307 (temporary): the target depends on the visitor's language,
  // so it must never be cached as permanent.
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Skip Next internals, extension-less metadata routes (apple-icon)
  // and any file with an extension (icon.svg, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next|api|apple-icon|.*\\..*).*)"],
};
