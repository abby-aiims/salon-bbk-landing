/**
 * Google's G, flat in the current text colour.
 *
 * The one mark on the page that is not from the Material Symbols subset, for
 * the simple reason that the icon font carries no brand logos and there is no
 * glyph that reads as "Google". Drawn monochrome rather than in the four
 * brand colours because it sits inline in muted supporting text, where the
 * colour version would pull rank on the words next to it.
 *
 * Decorative everywhere it is used: the text beside it already says Google.
 */
export function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`googleMark ${className}`.trim()}
      viewBox="0 0 18 18"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.909c1.702-1.567 2.683-3.874 2.683-6.615z" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.806.54-1.837.859-3.047.859-2.344 0-4.328-1.583-5.036-3.71H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.346l2.582-2.582C13.463.892 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}
