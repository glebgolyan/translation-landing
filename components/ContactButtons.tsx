import type { Dictionary } from "@/lib/i18n/dictionaries";
import { contactLinks } from "@/lib/site";

/**
 * Server-rendered one-click contact links. Icons are simple neutral
 * glyphs (chat, paper plane, phone bubble, envelope) rather than
 * trademarked brand logos.
 */
export function ContactButtons({ dict }: { dict: Dictionary }) {
  const buttons = [
    {
      href: contactLinks.viber,
      label: "Viber",
      aria: dict.contacts.viberAria,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.4 8.4 0 0 1-8.6 8.3 9 9 0 0 1-2.6-.4L5 21l.9-3.6A8 8 0 0 1 3.8 12 8.4 8.4 0 0 1 12.4 3.2 8.4 8.4 0 0 1 21 11.5Z" />
          <path d="M9.5 9.2c.3-.8 1.3-.9 1.6-.2l.5 1c.1.3 0 .6-.2.8l-.5.5c.4.9 1.1 1.6 2 2l.5-.5c.2-.2.5-.3.8-.2l1 .5c.7.3.6 1.3-.2 1.6-2.7 1-6.5-2.8-5.5-5.5Z" />
        </svg>
      ),
    },
    {
      href: contactLinks.telegram,
      label: "Telegram",
      aria: dict.contacts.telegramAria,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 4 3.6 10.7c-.8.3-.8 1.4 0 1.7l4.4 1.6 1.7 5c.2.8 1.2 1 1.7.4l2.4-2.6 4.5 3.3c.6.4 1.4.1 1.6-.6L23 5.2c.2-.9-.7-1.6-2-1.2Z" transform="scale(0.92) translate(0.5 0.5)" />
          <path d="m8.5 13.8 9-7.3" />
        </svg>
      ),
    },
    {
      href: contactLinks.whatsapp,
      label: "WhatsApp",
      aria: dict.contacts.whatsappAria,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 21a9 9 0 1 0-7.8-4.5L3 21l4.6-1.2A9 9 0 0 0 12 21Z" />
          <path d="M8.8 9.2c.3-.9 1.4-1 1.7-.2l.4.9c.1.3.1.6-.1.8l-.5.6c.4 1 1.2 1.8 2.2 2.2l.6-.5c.2-.2.5-.2.8-.1l.9.4c.8.3.7 1.4-.2 1.7-2.9 1-6.8-2.9-5.8-5.8Z" />
        </svg>
      ),
    },
    {
      href: contactLinks.email,
      label: dict.contacts.emailButton,
      aria: dict.contacts.emailAria,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
    },
  ];

  return (
    <ul className="contactButtons">
      {buttons.map((b) => (
        <li key={b.label}>
          <a className="contactButton" href={b.href} aria-label={b.aria} rel="noopener" target="_blank">
            <span className="contactIcon">{b.icon}</span>
            <span>{b.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
