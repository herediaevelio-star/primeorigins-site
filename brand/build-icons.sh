#!/bin/sh
# Rebuild every PNG the site serves from the SVG logo + the og card design.
# Run after any logo or palette change, then deploy. Needs rsvg-convert and Google Chrome.
set -e
cd "$(dirname "$0")"
python3 make-logo.py
rsvg-convert -w 180 -h 180 icons/icon-apple.svg    -o ../apple-touch-icon.png
rsvg-convert -w 192 -h 192 icons/icon-apple.svg    -o ../icon-192.png
rsvg-convert -w 512 -h 512 icons/icon-apple.svg    -o ../icon-512.png
rsvg-convert -w 512 -h 512 icons/icon-maskable.svg -o ../icon-maskable-512.png
rsvg-convert -w 32  -h 32  logo-v2-favicon.svg     -o ../favicon-32.png
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars \
  --allow-file-access-from-files --virtual-time-budget=3000 --window-size=1200,630 \
  --screenshot="$PWD/og/og-image.png" "file://$PWD/og/og-card.html" 2>/dev/null
cp og/og-image.png ../og-image.png
echo "icons + og-image rebuilt"
