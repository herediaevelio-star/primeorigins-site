#!/bin/sh
# Stamp CSS/JS links with a content hash so browsers fetch new versions immediately
# (index.html is revalidated on every visit; the assets are cached for hours). Run before each deploy.
set -e
cd "$(dirname "$0")"
for f in styles.css app.js fonts/fonts.css; do
  h=$(shasum "$f" | cut -c1-10)
  sed -i '' -E "s#(href|src)=\"/${f//\//\\/}(\?v=[0-9a-f]+)?\"#\1=\"/$f?v=$h\"#" index.html
done
grep -oE '(href|src)="/(styles\.css|app\.js|fonts/fonts\.css)\?v=[0-9a-f]+"' index.html
