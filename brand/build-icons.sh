#!/bin/sh
# Rebuild every PNG the site serves from the SVG logo + the og card design.
# Run after any logo or palette change, then deploy. Needs rsvg-convert and Google Chrome.
set -e
cd "$(dirname "$0")"
sed -e 's#<rect x="5" y="5" width="90" height="90" rx="20" fill="\(#[0-9a-f]*\)"/>#<rect x="0" y="0" width="100" height="100" fill="\1"/>#' logo-v2-favicon.svg > icons/icon-square.svg
sed -e 's#scale(.8)#scale(.72)#' icons/icon-square.svg > icons/icon-apple.svg       # iOS rounds corners
sed -e 's#scale(.8)#scale(.62)#' icons/icon-square.svg > icons/icon-maskable.svg    # Android safe zone
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
