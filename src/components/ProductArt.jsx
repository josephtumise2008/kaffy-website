// Illustrated product art so the sample works without photos.
// In the full build, replace with Kaffy's real product photos.
export default function ProductArt({ product }) {
  const { art, color: c, accent: a, name } = product;

  if (art === "heart") {
    const roses = [[78, 62], [100, 70], [122, 62], [88, 84], [112, 84], [100, 100], [68, 78], [132, 78]];
    return (
      <svg viewBox="0 0 200 160" role="img" aria-label={name}>
        <path d="M100 140 C40 100 20 70 40 42 C58 18 88 24 100 46 C112 24 142 18 160 42 C180 70 160 100 100 140Z" fill={c} />
        <path d="M100 126 C55 95 40 72 54 52 C67 34 89 39 100 58 C111 39 133 34 146 52 C160 72 145 95 100 126Z" fill={a} opacity=".35" />
        {roses.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="9" fill={c} />
            <circle cx={x} cy={y} r="4.5" fill="#6E0B1E" />
          </g>
        ))}
      </svg>
    );
  }

  if (art === "bag") {
    return (
      <svg viewBox="0 0 200 160" role="img" aria-label={name}>
        <path d="M78 52 C78 28 122 28 122 52" fill="none" stroke={a} strokeWidth="5" strokeLinecap="round" />
        <path d="M56 50 H144 L152 146 H48Z" fill={c} />
        <path d="M56 50 H144 L146 62 H54Z" fill="#000" opacity=".08" />
        <circle cx="100" cy="98" r="18" fill="none" stroke={a} strokeWidth="3" />
        <path d="M92 98 l6 6 l10 -12" fill="none" stroke={a} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (art === "roll") {
    return (
      <svg viewBox="0 0 200 160" role="img" aria-label={name}>
        <rect x="36" y="58" width="128" height="52" rx="4" fill={c} />
        {[52, 76, 100, 124, 148].map((x) => <path key={x} d={`M${x} 66 l5 9 l-5 9 l-5 -9z`} fill={a} />)}
        {[64, 88, 112, 136].map((x) => <circle key={x} cx={x} cy="96" r="3" fill={a} />)}
        <ellipse cx="164" cy="84" rx="10" ry="26" fill="#0F3A2D" />
        <ellipse cx="164" cy="84" rx="4" ry="10" fill="#08241C" />
        <path d="M36 110 Q60 128 92 116 L92 134 Q60 146 36 128Z" fill={c} opacity=".85" />
      </svg>
    );
  }

  if (art === "notebook") {
    return (
      <svg viewBox="0 0 200 160" role="img" aria-label={name}>
        <rect x="58" y="26" width="84" height="112" rx="6" fill={c} />
        <rect x="124" y="26" width="8" height="112" fill={a} />
        <rect x="74" y="58" width="40" height="22" rx="2" fill="none" stroke={a} strokeWidth="2" />
        <rect x="150" y="34" width="8" height="100" rx="4" fill={a} />
        <path d="M150 134 l4 10 l4 -10z" fill={a} />
      </svg>
    );
  }

  // Lidded gift box with ribbon
  return (
    <svg viewBox="0 0 200 160" role="img" aria-label={name}>
      <rect x="46" y="62" width="108" height="78" rx="3" fill={c} />
      <rect x="40" y="48" width="120" height="22" rx="3" fill={c} />
      <rect x="40" y="66" width="120" height="4" fill="#000" opacity=".15" />
      <rect x="94" y="48" width="12" height="92" fill={a} />
      <path d="M100 48 C80 22 62 34 76 46 C84 52 94 50 100 48Z" fill={a} />
      <path d="M100 48 C120 22 138 34 124 46 C116 52 106 50 100 48Z" fill={a} />
      <circle cx="100" cy="48" r="5" fill={c} stroke={a} strokeWidth="2" />
    </svg>
  );
}
