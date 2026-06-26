#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────
# build-cpanel.sh  —  Build Seloaxum for cPanel / Softaculous
# Run from the repo root:  bash artifacts/seloaxum/build-cpanel.sh
# ─────────────────────────────────────────────────────────────
set -e

echo "==> Building Seloaxum for cPanel deployment..."

# Build with production env — PORT is irrelevant for static build
PORT=3000 BASE_PATH=/ NODE_ENV=production \
  pnpm --filter @workspace/seloaxum run build

echo "==> Build complete. Output: artifacts/seloaxum/dist/public/"

# Create zip archive ready for cPanel File Manager upload
cd artifacts/seloaxum/dist/public
zip -r ../../../../seloaxum-cpanel.zip . --exclude "*.map"
cd ../../../../

echo ""
echo "✓  seloaxum-cpanel.zip is ready."
echo ""
echo "Upload instructions for cPanel:"
echo "  1. Open cPanel → File Manager"
echo "  2. Navigate to public_html (or a subdomain folder)"
echo "  3. Upload seloaxum-cpanel.zip and extract it there"
echo "  4. The .htaccess file handles SPA routing automatically"
echo "  5. Visit your domain — the site is live!"
echo ""
