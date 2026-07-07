/**
 * Single source of truth for site-wide constants.
 * Change values here and they propagate to metadata, JSON-LD,
 * the sitemap, contact buttons and the map embed.
 */
export const site = {
  /** Production origin. Used for metadataBase, canonical URLs, OG, sitemap, JSON-LD. */
  url: "https://www.babylontranslationagency.com",
  /** Brand name (Latin, used in logo, OG images and schema). */
  name: "Babylon",
  legalName: "Babylon Translation Agency",

  /** Contact channels */
  phoneDisplay: "096 344 1021",
  phoneE164: "+380963441021",
  email: "babylon.lutsk@gmail.com",
  telegramUser: "babylonTranslationAgency",

  /** Physical address (native form is localized in dictionaries). */
  address: {
    streetAddress: "вулиця Винниченка, 2",
    addressLocality: "Луцьк",
    addressRegion: "Волинська область",
    postalCode: "43000",
    addressCountry: "UA",
  },
  /** Approximate coordinates of Vynnychenka St, 2, Lutsk (for LocalBusiness schema). */
  geo: { latitude: 50.7442, longitude: 25.3232 },

  /** Google Maps embed (iframe, no JS API) — keyless and lightweight. */
  mapEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("вулиця Винниченка, 2, Луцьк, Волинська область, 43000") +
    "&output=embed",
  mapLinkHref:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("вулиця Винниченка, 2, Луцьк, Волинська область, 43000"),

  /** Opening hours — also rendered in the UI and in LocalBusiness schema. */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "17:00" },
    { days: ["Friday"], opens: "09:00", closes: "16:30" },
  ],
} as const;

export const contactLinks = {
  viber: `viber://chat?number=%2B380963441021`,
  telegram: `https://t.me/${site.telegramUser}`,
  whatsapp: `https://wa.me/${site.phoneE164.replace("+", "")}`,
  email: `mailto:${site.email}`,
  phone: `tel:${site.phoneE164}`,
} as const;
