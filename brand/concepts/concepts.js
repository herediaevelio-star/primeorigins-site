const C = {
  F: '#1f3a2b', S: '#e9dcc3', K: '#b8643c'
};
const concepts = [
  { id: 'v2-split', name: 'A · Best Friends Face',
    note: 'One face that is half dog, half cat: a floppy dog ear on the left, an upright cat ear and whiskers on the right. Reads as “for all pets” in a single shape, and stays legible as a 16px favicon.',
    svg: (fg, bg) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M57 32 L77 15 Q80 13 80 17 L77 42 Z" fill="${fg}" stroke="${fg}" stroke-width="6" stroke-linejoin="round"/>
      <path d="M62 33 L75 22 L73 37 Z" fill="${bg}" opacity=".35"/>
      <circle cx="50" cy="57" r="27" fill="${fg}"/>
      <path d="M45 30 C31 25 18 32 15 47 C13 57 14 65 18 69 C22 72 26 67 27 61 C28 53 31 45 41 38 Z" fill="${fg}" stroke="${bg}" stroke-width="3" paint-order="stroke"/>
      <circle cx="41" cy="55" r="3.8" fill="${bg}"/><circle cx="59" cy="55" r="3.8" fill="${bg}"/>
      <path d="M46 63.5 H54 Q55.5 63.5 54.6 64.8 L51 68.6 Q50 69.6 49 68.6 L45.4 64.8 Q44.5 63.5 46 63.5 Z" fill="${bg}"/>
      <path d="M44.5 71 Q47.25 74 50 71 Q52.75 74 55.5 71" stroke="${bg}" stroke-width="2" fill="none" stroke-linecap="round"/>
      <path d="M63 64 L73 62 M63 68 L73 69" stroke="${bg}" stroke-width="1.8" stroke-linecap="round"/>
    </svg>` },
  { id: 'v2-duo', name: 'B · Side by Side',
    note: 'A dog with its cat buddy peeking from behind. Two colors make the pair obvious, and it feels the warmest and most “family.” It is the busiest at tiny sizes, so the favicon may need a simplified version.',
    svg: (fg, bg, accent) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(8 -4)">
      <g fill="${accent}" stroke="${accent}" stroke-width="4" stroke-linejoin="round">
        <path d="M52 40 L55 19 L65 31 Z"/><path d="M71 30 L82 18 L83 40 Z"/>
      </g>
      <ellipse cx="67" cy="46" rx="18" ry="16" fill="${accent}"/>
      <path d="M57.5 45 Q60.5 41 63.5 45 Q60.5 49 57.5 45 Z M70.5 45 Q73.5 41 76.5 45 Q73.5 49 70.5 45 Z" fill="${bg}"/>
      <path d="M65.3 51 h3.4 l-1.7 2 z" fill="${bg}"/>
      </g>
      <g fill="${fg}" stroke="${bg}" stroke-width="4" paint-order="stroke">
        <path d="M38 36 C52 36 60 46 60 60 C60 76 50 86 38 86 C26 86 16 76 16 60 C16 46 24 36 38 36 Z"/>
        <path d="M25 40 C14 39 8 51 9 65 C10 72 16 74 19 69 C22 63 22 55 29 46 Z"/>
        <path d="M51 40 C62 39 68 51 67 65 C66 72 60 74 57 69 C54 63 54 55 47 46 Z"/>
      </g>
      <circle cx="30" cy="57" r="3.3" fill="${bg}"/><circle cx="46" cy="57" r="3.3" fill="${bg}"/>
      <ellipse cx="38" cy="72" rx="10" ry="7.5" fill="${bg}"/>
      <ellipse cx="38" cy="68.5" rx="4.4" ry="3.1" fill="${fg}"/>
      <path d="M38 71.5 V75" stroke="${fg}" stroke-width="1.8" stroke-linecap="round"/>
    </svg>` },
  { id: 'v2-leaf-ears', name: 'C · Leaf with Ears',
    note: 'Keeps today’s leaf at the center for continuity with the v1 logo, and gives the badge a dog ear and a cat ear. The quietest option, and the smallest step from the current look.',
    svg: (fg, bg) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <path d="M57 32 L77 15 Q80 13 80 17 L77 42 Z" fill="${fg}" stroke="${fg}" stroke-width="6" stroke-linejoin="round"/>
      <circle cx="50" cy="57" r="27" fill="${fg}"/>
      <path d="M45 30 C31 25 18 32 15 47 C13 57 14 65 18 69 C22 72 26 67 27 61 C28 53 31 45 41 38 Z" fill="${fg}" stroke="${bg}" stroke-width="3" paint-order="stroke"/>
      <path d="M50 38 C40 45 36 53 36 61 a14 14 0 0 0 28 0 c0-8 -4-16 -14-23z" fill="${bg}"/>
      <path d="M50 47 V74" stroke="${fg}" stroke-width="3" stroke-linecap="round"/>
    </svg>` },
];
