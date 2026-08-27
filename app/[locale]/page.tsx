import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";
import { ContactButtons } from "@/components/ContactButtons";
import { WorkingHours } from "@/components/WorkingHours";
import { MapEmbed } from "@/components/MapEmbed";
import { contactLinks, site } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string }> };

export default async function LandingPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale as Locale);

  return (
    <>
    <main className="main" id="main">
      {/* Left column: message + conversion */}
      <div className="col colContent">
        <section className="hero" aria-labelledby="site-title">
          <p className="eyebrow">{dict.hero.eyebrow}</p>
          <h1 id="site-title" className="title">
            {dict.hero.title}
          </h1>
          <p className="tagline">{dict.hero.tagline}</p>
          <p className="ribbon" aria-label={dict.hero.ribbonLabel}>
            {dict.hero.highlights.map((item, i) => (
              <span key={item} className="ribbonWord">
                {item}
                {i < dict.hero.highlights.length - 1 && (
                  <span className="ribbonDot" aria-hidden="true">
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        </section>

        <section className="services" aria-labelledby="services-title">
          <h2 id="services-title" className="sectionTitle">
            {dict.services.title}
          </h2>
          <ul className="serviceList">
            {dict.services.items.map((item) => (
              <li key={item} className="serviceItem">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="contacts" aria-labelledby="contacts-title">
          <h2 id="contacts-title" className="sectionTitle">
            {dict.contacts.title}
          </h2>
          <p className="contactsLead">{dict.contacts.lead}</p>
          <p className="phoneRow">
            <a className="phoneLink" href={contactLinks.phone} target="_blank" rel="noopener noreferrer">
              {site.phoneDisplay}
            </a>
            <a className="emailLink" href={contactLinks.email} target="_blank" rel="noopener noreferrer">
              {site.email}
            </a>
          </p>
          <ContactButtons dict={dict} />
        </section>
      </div>

      {/* Right column: map + practical details */}
      <div className="col colAside">
        <section className="mapSection" aria-labelledby="map-title">
          <h2 id="map-title" className="sectionTitle">
            {dict.map.title}
          </h2>
          <MapEmbed dict={dict} />
          <p className="address">
            <span className="addressLabel">{dict.map.addressLabel}: </span>
            {dict.map.address}
          </p>
        </section>

        <section className="faqSection" aria-labelledby="faq-title">
          <h2 id="faq-title" className="sectionTitle">
            {dict.faq.title}
          </h2>
          <div className="faqList">
            {dict.faq.items.map((item) => (
              <details key={item.question} className="faqItem">
                <summary>{item.question}</summary>
                <p className="faqAnswer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="hoursSection" aria-labelledby="hours-title">
          <h2 id="hours-title" className="sectionTitle">
            {dict.hours.title}
          </h2>
          <WorkingHours dict={dict} />
        </section>
      </div>
    </main>

    <section className="seoSection" aria-labelledby="why-us-title">
      <h2 id="why-us-title" className="sectionTitle">
        {dict.whyUs.title}
      </h2>
      <p className="leadText">{dict.whyUs.lead}</p>
    </section>
    </>
  );
}
