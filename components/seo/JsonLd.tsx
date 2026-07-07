import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

/**
 * Reusable structured-data component. Emits a single @graph with
 * Organization + LocalBusiness (ProfessionalService), WebSite and
 * WebPage nodes, localized per route.
 */
export function JsonLd({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const orgId = `${site.url}/#organization`;
  const webSiteId = `${site.url}/#website`;
  const pageUrl = `${site.url}/${locale}`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": orgId,
        name: site.legalName,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        email: site.email,
        telephone: site.phoneE164,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.streetAddress,
          addressLocality: site.address.addressLocality,
          addressRegion: site.address.addressRegion,
          postalCode: site.address.postalCode,
          addressCountry: site.address.addressCountry,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        openingHoursSpecification: site.openingHours.map((spec) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: spec.days,
          opens: spec.opens,
          closes: spec.closes,
        })),
        makesOffer: dict.services.items.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service },
        })),
        sameAs: [`https://t.me/${site.telegramUser}`],
      },
      {
        "@type": "WebSite",
        "@id": webSiteId,
        url: site.url,
        name: site.legalName,
        publisher: { "@id": orgId },
        inLanguage: locale,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: locale,
        isPartOf: { "@id": webSiteId },
        about: { "@id": orgId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
