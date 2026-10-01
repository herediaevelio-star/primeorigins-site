#!/usr/bin/env python3
"""
make-logo.py: generate every v2 (dog + cat) logo SVG from one definition.

Features (eyes, muzzle, the gaps between ears/head and dog/cat) are PAINTED in the
background color instead of cut out with <mask>. Some apps' image renderers ignore
masks, which made the eyes vanish in shared previews. Painting means each file is
made for a known background, so the `bg` below must match where the file is used.

Usage: python3 brand/make-logo.py   (then brand/build-icons.sh renders the PNGs)
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

DOG_HEAD = 'M38 36 C52 36 60 46 60 60 C60 76 50 86 38 86 C26 86 16 76 16 60 C16 46 24 36 38 36 Z'
EAR_L = 'M25 40 C14 39 8 51 9 65 C10 72 16 74 19 69 C22 63 22 55 29 46 Z'
EAR_R = 'M51 40 C62 39 68 51 67 65 C66 72 60 74 57 69 C54 63 54 55 47 46 Z'
CAT_EARS = 'M60 36 L63 15 L73 27 Z M79 26 L90 14 L91 36 Z'
# Larger, rounder eyes than the first version so they survive small sizes and compression.
CAT_EYES = 'M64.6 41 Q68.5 35.6 72.4 41 Q68.5 46.4 64.6 41 Z M77.6 41 Q81.5 35.6 85.4 41 Q81.5 46.4 77.6 41 Z'
CAT_NOSE = 'M72.8 47.2 h4.4 l-2.2 2.6 z'


def mark(dog, cat, bg, tile=None, tile_full=False, scale=1.0):
    """dog/cat = fill colors, bg = color the features are painted in (the backdrop)."""
    body = f'''
    <g fill="{cat}" stroke="{cat}" stroke-width="4" stroke-linejoin="round"><path d="{CAT_EARS}"/></g>
    <ellipse cx="75" cy="42" rx="18" ry="16" fill="{cat}"/>
    <path d="{CAT_EYES} {CAT_NOSE}" fill="{bg}"/>
    <g fill="{dog}" stroke="{bg}" stroke-width="4" paint-order="stroke" stroke-linejoin="round">
      <path d="{DOG_HEAD}"/><path d="{EAR_L}"/><path d="{EAR_R}"/>
    </g>
    <circle cx="30" cy="57" r="4.3" fill="{bg}"/><circle cx="46" cy="57" r="4.3" fill="{bg}"/>
    <ellipse cx="38" cy="72" rx="10" ry="7.5" fill="{bg}"/>
    <ellipse cx="38" cy="68.5" rx="4.6" ry="3.3" fill="{dog}"/>
    <path d="M38 71.5 V75" stroke="{dog}" stroke-width="2" stroke-linecap="round"/>'''
    if scale != 1.0:
        body = f'\n  <g transform="translate(50 50) scale({scale}) translate(-50 -50)">{body}\n  </g>'
    back = ''
    if tile:
        back = (f'<rect x="0" y="0" width="100" height="100" fill="{tile}"/>' if tile_full
                else f'<rect x="5" y="5" width="90" height="90" rx="20" fill="{tile}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="5 5 90 90" role="img" aria-label="Prime Origins">\n'
            f'  {back}{body}\n</svg>\n')


# Bag palette (2026-10-01): crimson tile, cream dog, gold cat.
CRIMSON, DEEP, CREAM_DOG, GOLD = '#6c1f21', '#4e1416', '#f8f1e4', '#c9a227'
PAGE, OG_TILE = '#f8f1e4', '#8a2626'
ESPRESSO, CORAL, OAT, CREAM, INK = DEEP, GOLD, CREAM_DOG, PAGE, DEEP

out = {
    # site header (cream background) and footer (ink background)
    'brand/logo-v2-mark.svg':          mark(ESPRESSO, CORAL, CREAM),
    'brand/logo-v2-mark-reversed.svg': mark(OAT, CORAL, INK),
    # browser favicon: rounded espresso tile
    'brand/logo-v2-favicon.svg':       mark(CREAM_DOG, GOLD, CRIMSON, tile=CRIMSON, scale=.8),
    # full-bleed squares for phone icons (iOS/Android round the corners themselves)
    'brand/icons/icon-apple.svg':      mark(CREAM_DOG, GOLD, CRIMSON, tile=CRIMSON, tile_full=True, scale=.72),
    'brand/icons/icon-maskable.svg':   mark(CREAM_DOG, GOLD, CRIMSON, tile=CRIMSON, tile_full=True, scale=.62),
    # link-preview card: sits on the card's mark tile
    'brand/og/mark-og.svg':            mark(CREAM_DOG, GOLD, OG_TILE),
}
for path, svg in out.items():
    with open(os.path.join(ROOT, path), 'w') as f:
        f.write(svg)
for src, dst in [('brand/logo-v2-mark.svg', 'logo-mark.svg'),
                 ('brand/logo-v2-mark-reversed.svg', 'logo-mark-reversed.svg'),
                 ('brand/logo-v2-favicon.svg', 'favicon.svg')]:
    with open(os.path.join(ROOT, src)) as a, open(os.path.join(ROOT, dst), 'w') as b:
        b.write(a.read())
print('logo SVGs written:', ', '.join(out))
