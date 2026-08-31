// The Inframiq monogram — the dotted "i" hook interlocking with the
// arched "n" form and its descender, redrawn from the master logo as a
// single-colour geometric mark. Strokes inherit `currentColor` so the
// mark sits correctly against either theme in the Navbar/Footer lockup;
// the favicon and OG image carry the literal brand navy instead.
type BrandMarkProps = {
  className?: string;
  title?: string;
};

export default function BrandMark({ className, title }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 74 104"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      <circle cx="11" cy="10" r="8.5" fill="currentColor" />
      <path
        d="M11 18 L11 50 C11 64 17 74 28 74 C40 74 45 66 42 54"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 47 C25 34 26 26 36 26 C48 26 58 30 58 44 L58 74 C58 84 59 89 61 91"
        stroke="currentColor"
        strokeWidth="18"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
