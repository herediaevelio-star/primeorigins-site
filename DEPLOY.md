# Prime Origins: deploy & security notes

Live at https://primeoriginsco.com (and www) on Cloudflare Pages project `primeorigins`.
Registrar: GoDaddy. DNS: Cloudflare (nameservers `langston` / `samara.ns.cloudflare.com`).

## Deploy
The Cloudflare token (`~/vsevens/.cloudflare`) can manage Pages, zones and DNS but **not Workers**.
Never deploy from the repo root, because it would upload `.git`. Copy the site files to a clean
dir first:

```bash
DIST=$(mktemp -d)
./stamp.sh && rsync -a --exclude .git --exclude brand --exclude DEPLOY.md --exclude stamp.sh ./ "$DIST"/
cd "$DIST"
CLOUDFLARE_API_TOKEN="$(cat ~/vsevens/.cloudflare)" CLOUDFLARE_ACCOUNT_ID=<account id from ~/vsevens/cf> \
  npx wrangler@latest pages deploy . --project-name primeorigins --branch main --commit-dirty=true
```
Test risky changes on a preview branch first (`--branch lockdown-preview` →
`https://lockdown-preview.primeorigins.pages.dev`), which still applies `_headers`.

## Security posture (matches the other client sites)
Min TLS 1.2 · SSL Strict · Always-Use-HTTPS · 0-RTT off · Browser Integrity Check ·
junk-probe WAF rule (`~/vsevens/scripts/waf-baseline.py`, zone registered there) ·
HSTS preload · strict CSP with no `'unsafe-inline'` · frame-deny · nosniff ·
DNSSEC (DS at GoDaddy: key tag 2371 / alg 13 / digest type 2, added 2026-10-01).

### The CSP shapes how this site is written
- Fonts are **self-hosted** in `fonts/` (Fraunces + Inter, latin subset). Don't link Google Fonts.
- **No inline anything**: no `<style>`, no `<script>` bodies, no `style="…"`, no `onclick=`.
  CSS goes in `styles.css`, JS in `app.js` (wired with `addEventListener`).
- The only external origin allowed is Cloudflare's cookieless Web Analytics beacon.

### ⚠️ Cloudflare features that fight the CSP: keep OFF
`email_obfuscation` (ON by default on a new zone, turned off 2026-10-01), `rocket_loader`,
`mirage`, `polish`. They inject inline scripts that the CSP blocks.

## Mail: the domain deliberately sends and receives nothing
`null MX` (`0 .`) · `v=spf1 -all` · `DMARC p=reject; adkim=s; aspf=s` · `*._domainkey` → `v=DKIM1; p=`.
🚨 **Replace these (don't add alongside them) the day real email is set up.** Leaving them in
place next to a live mailbox makes mail fail silently. The wildcard DKIM revoke in particular will
make any provider's DKIM key read as revoked.

## Before adding pages
The WAF rule blocks any path containing `/wp-`, `/.env` or `/.git`. Check before adding routes:
`find . -type f -not -path './.git/*' | grep -iE '/wp-|/\.env|/\.git'`
Then verify the live edge: `~/vsevens/scripts/waf-baseline.py verify primeoriginsco.com`.

## Link previews & phone icons
`og-image.png` (1200×630) is the card iMessage/WhatsApp/Facebook/X show when the link is shared;
`apple-touch-icon.png`, `icon-*.png` and `site.webmanifest` are the home-screen/app icons.
They are generated from the SVG logo, so after any logo or palette change run `brand/build-icons.sh`,
then deploy. Messaging apps cache previews per URL, so an old preview can stick for a while;
Facebook/Instagram can be refreshed at https://developers.facebook.com/tools/debug/.
`Browser Integrity Check` is on but verified not to block the preview crawlers (2026-10-01).
