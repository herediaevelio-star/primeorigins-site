#!/bin/sh
# Stamp asset URLs in index.html with a content hash (?v=...) so browsers and chat apps fetch
# new versions immediately. index.html is revalidated on every visit, but assets are cached for
# hours (a stale green logo was observed after the palette change). Run before each deploy.
set -e
cd "$(dirname "$0")"
for f in styles.css app.js fonts/fonts.css logo-mark.svg logo-mark-reversed.svg \
         favicon.svg favicon-32.png apple-touch-icon.png og-image.png site.webmanifest; do
  h=$(shasum "$f" | cut -c1-10)
  esc=$(printf '%s' "$f" | sed 's/[.\/]/\\&/g')
  # matches src="/f", href="/f" and content="https://primeoriginsco.com/f", with or without an old ?v=
  sed -i '' -E "s#((src|href)=\"|content=\"https://primeoriginsco\.com)/${esc}(\?v=[0-9a-f]+)?\"#\1/$f?v=$h\"#g" index.html
done
grep -oE '(src|href|content)="[^"]*\?v=[0-9a-f]+"' index.html
