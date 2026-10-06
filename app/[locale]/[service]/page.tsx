import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, ogLocales, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getServicePage, hasServicePages, serviceLocales, servicePages } from "@/lib/services";
import { contactLinks, site } from "@/lib/site";
import { ContactButtons } from "@/components/ContactButtons";
import { JsonLdScript, orgId, organizationNode } from "@/components/seo/JsonLd";

type Params = { locale: string; service: string };
type PageProps = { params: Promise<Params> };

/**
 * Service pages exist only for locales listed in serviceLocales.
 * Params are generated bottom-up (locale + service) rather than from the
 * parent's params: returning [] for some parent locales makes Next 16
 * drop the whole segment from prerendering.
 */
export function generateStaticParams() {
  return serviceLocales.flatMap((locale) =>
    servicePages.map((page) => ({ locale, service: page.slug }))
  );
}

export const dynamicParams = false;

async function resolve(params: Promise<Params>) {
  const { locale, service } = await params;
  if (!isLocale(locale) || !hasServicePages(locale)) notFound();
  const page = getServicePage(service);
  if (!page) notFound();
  return { locale: locale as Locale, page };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, page } = await resolve(params);
  const path = `/${locale}/${page.slug}`;

  return {
    metadataBase: new URL(site.url),
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.legalName,
      title: page.metaTitle,
      description: page.metaDescription,
      locale: ogLocales[locale],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ServicePageRoute({ params }: PageProps) {
  const { locale, page } = await resolve(params);
  const dict = await getDictionary(locale);
  const homeUrl = `${site.url}/${locale}`;
  const pageUrl = `${homeUrl}/${page.slug}`;
  const homeName = dict.hero.title;
  const others = servicePages.filter((p) => p.slug !== page.slug);

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(dict),
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.name,
        description: page.metaDescription,
        url: pageUrl,
        provider: { "@id": orgId },
        areaServed: { "@type": "City", name: site.address.addressLocality },
        inLanguage: locale,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: homeName, item: homeUrl },
          { "@type": "ListItem", position: 2, name: page.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: locale,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <main className="article" id="main">
      <JsonLdScript graph={graph} />

      <nav className="breadcrumbs" aria-label="Breadcrumbs">
        <ol>
          <li>
            <a href={`/${locale}`}>{homeName}</a>
          </li>
          <li aria-current="page">{page.name}</li>
        </ol>
      </nav>

      <header className="articleHeader">
        <p className="eyebrow">{dict.hero.eyebrow}</p>
        <h1 className="title">{page.h1}</h1>
        <p className="tagline">{page.intro}</p>
      </header>

      {page.sections.map((section) => (
        <section key={section.heading} className="articleSection">
          <h2 className="sectionTitle">{section.heading}</h2>
          {section.paragraphs?.map((text) => (
            <p key={text} className="leadText">
              {text}
            </p>
          ))}
          {section.list && (
            <ul className="serviceList">
              {section.list.map((item) => (
                <li key={item} className="serviceItem">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}

      <section className="articleSection" aria-labelledby="faq-title">
        <h2 id="faq-title" className="sectionTitle">
          {dict.faq.title}
        </h2>
        <div className="faqList">
          {page.faq.map((item) => (
            <details key={item.question} className="faqItem">
              <summary>{item.question}</summary>
              <p className="faqAnswer">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="articleSection articleCta" aria-labelledby="contacts-title">
        <h2 id="contacts-title" className="sectionTitle">
          {dict.contacts.title}
        </h2>
        <p className="contactsLead">{dict.contacts.lead}</p>
        <p className="phoneRow">
          <a className="phoneLink" href={contactLinks.phone}>
            {site.phoneDisplay}
          </a>
          <a className="emailLink" href={contactLinks.email}>
            {site.email}
          </a>
        </p>
        <ContactButtons dict={dict} />
        <p className="address">
          <span className="addressLabel">{dict.map.addressLabel}: </span>
          {dict.map.address}
        </p>
      </section>

      <nav className="articleSection" aria-labelledby="other-services-title">
        <h2 id="other-services-title" className="sectionTitle">
          {dict.services.title}
        </h2>
        <ul className="serviceList">
          {others.map((other) => (
            <li key={other.slug} className="serviceItem">
              <a className="serviceLink" href={`/${locale}/${other.slug}`}>
                {other.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
