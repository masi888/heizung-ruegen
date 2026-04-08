#!/bin/bash
# Extrahiert das Bertig-Logo aus public/brand/bertig-logo.jpg und erzeugt transparente PNGs.
#
# Benoetigt: ImageMagick (brew install imagemagick)
#
# Vorgehen:
# 1. Original JPG laden, Alpha-Kanal aktivieren
# 2. Vom Navy-Hintergrund aus den vier Ecken floodfill zu transparent
#    (saubere Kanten, kein globales Keying das die weisse Schrift angreift)
# 3. Trim auf den nicht-transparenten Inhalt
# 4. Signet (linker Kreis) separat als quadratischen Crop

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/public/brand/bertig-logo.jpg"
OUT_DIR="$ROOT/public/brand/logo"
mkdir -p "$OUT_DIR"

WIDTH=$(magick "$SRC" -format "%w" info:)
HEIGHT=$(magick "$SRC" -format "%h" info:)

magick "$SRC" \
  -alpha set -fuzz 25% -fill none \
  -draw "alpha 0,0 floodfill" \
  -draw "alpha 0,$((HEIGHT - 1)) floodfill" \
  -draw "alpha $((WIDTH - 1)),0 floodfill" \
  -draw "alpha $((WIDTH - 1)),$((HEIGHT - 1)) floodfill" \
  -trim +repage \
  "$OUT_DIR/bertig-logo-light.png"

LIGHT_WIDTH=$(magick "$OUT_DIR/bertig-logo-light.png" -format "%w" info:)
LIGHT_HEIGHT=$(magick "$OUT_DIR/bertig-logo-light.png" -format "%h" info:)
echo "Wrote $OUT_DIR/bertig-logo-light.png  (${LIGHT_WIDTH}x${LIGHT_HEIGHT})"

magick "$OUT_DIR/bertig-logo-light.png" \
  -crop "${LIGHT_HEIGHT}x${LIGHT_HEIGHT}+0+0" +repage \
  "$OUT_DIR/bertig-signet-only.png"

SIGNET_WIDTH=$(magick "$OUT_DIR/bertig-signet-only.png" -format "%w" info:)
SIGNET_HEIGHT=$(magick "$OUT_DIR/bertig-signet-only.png" -format "%h" info:)
echo "Wrote $OUT_DIR/bertig-signet-only.png  (${SIGNET_WIDTH}x${SIGNET_HEIGHT})"
