import type { Dictionary } from "@/lib/i18n/dictionaries";
import { site } from "@/lib/site";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {dict.footer.rights}
      </p>
      <p>
        <a
          className="reviewLink"
          href={site.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          ★ {dict.footer.review}
        </a>
      </p>
    </footer>
  );
}
