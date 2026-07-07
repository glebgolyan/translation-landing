/**
 * Placeholder brand mark: a minimal ziggurat — three stacked tiers,
 * the top one gold. Replace this component (or drop in an <Image>)
 * when a final logo is ready.
 */
export function Logo() {
  return (
    <svg
      className="logoMark"
      width="30"
      height="30"
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="64" height="64" rx="14" fill="var(--logo-bg)" />
      <rect x="24" y="16" width="16" height="7" rx="1.5" fill="var(--gold)" />
      <rect x="18" y="27" width="28" height="7" rx="1.5" fill="var(--logo-fg)" />
      <rect x="12" y="38" width="40" height="7" rx="1.5" fill="var(--logo-fg)" />
    </svg>
  );
}
