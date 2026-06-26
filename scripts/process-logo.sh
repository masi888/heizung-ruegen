#!/bin/bash
# Extrahiert das Bertig-Logo aus der Kundendatei und erzeugt transparente Web-Assets.
#
# Benoetigt: ImageMagick (brew install imagemagick)
#
# Vorgehen:
# 1. Original PNG laden, Alpha-Kanal aktivieren
# 2. Weissen Hintergrund aus den vier Ecken floodfill zu transparent
# 3. Trim auf den nicht-transparenten Inhalt
# 4. Voll-Logo als WebP, Bildzeichen separat als WebP und App-Icon

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/kundenbilder/Bertig-3-neues-logo.png"
OUT_DIR="$ROOT/public/brand/logo"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

mkdir -p "$OUT_DIR"

WIDTH=$(magick "$SRC" -format "%w" info:)
HEIGHT=$(magick "$SRC" -format "%h" info:)

magick "$SRC" \
  -alpha set -fuzz 8% -fill none \
  -draw "alpha 0,0 floodfill" \
  -draw "alpha 0,$((HEIGHT - 1)) floodfill" \
  -draw "alpha $((WIDTH - 1)),0 floodfill" \
  -draw "alpha $((WIDTH - 1)),$((HEIGHT - 1)) floodfill" \
  -trim +repage \
  "$TMP_DIR/bertig-logo.png"

magick "$TMP_DIR/bertig-logo.png" \
  -resize "900x900>" \
  -quality 90 -define webp:method=6 \
  "$ROOT/public/brand/bertig-logo.webp"

LOGO_WIDTH=$(magick "$ROOT/public/brand/bertig-logo.webp" -format "%w" info:)
LOGO_HEIGHT=$(magick "$ROOT/public/brand/bertig-logo.webp" -format "%h" info:)
echo "Wrote $ROOT/public/brand/bertig-logo.webp  (${LOGO_WIDTH}x${LOGO_HEIGHT})"

FULL_WIDTH=$(magick "$TMP_DIR/bertig-logo.png" -format "%w" info:)
FULL_HEIGHT=$(magick "$TMP_DIR/bertig-logo.png" -format "%h" info:)
SIGNET_CROP_HEIGHT=$((FULL_HEIGHT * 655 / 1000))

magick "$TMP_DIR/bertig-logo.png" \
  -crop "${FULL_WIDTH}x${SIGNET_CROP_HEIGHT}+0+0" +repage \
  -trim +repage \
  "$TMP_DIR/bertig-signet.png"

SIGNET_SIZE=$(magick "$TMP_DIR/bertig-signet.png" -format "%[fx:max(w,h)]" info:)

magick "$TMP_DIR/bertig-signet.png" \
  -background none -gravity center -extent "${SIGNET_SIZE}x${SIGNET_SIZE}" \
  -resize "512x512" \
  -quality 90 -define webp:method=6 \
  "$OUT_DIR/bertig-signet-only.webp"

magick "$TMP_DIR/bertig-signet.png" \
  -background none -gravity center -extent "${SIGNET_SIZE}x${SIGNET_SIZE}" \
  -resize "192x192" -strip \
  "$ROOT/app/icon.png"

magick "$ROOT/app/icon.png" \
  -resize "180x180" -strip \
  "$ROOT/app/apple-icon.png"

echo "Wrote $OUT_DIR/bertig-signet-only.webp  (512x512)"
echo "Wrote $ROOT/app/icon.png  (192x192)"
echo "Wrote $ROOT/app/apple-icon.png  (180x180)"
