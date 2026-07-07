/**
 * Inline, render-blocking-by-design micro-script that sets data-theme
 * before first paint: stored preference wins, otherwise the system
 * preference. Prevents a flash of the wrong theme.
 */
const script = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="light"}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
