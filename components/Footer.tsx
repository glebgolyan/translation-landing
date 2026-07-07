import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {dict.footer.rights}
      </p>
    </footer>
  );
}
