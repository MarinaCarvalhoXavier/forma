#!/bin/bash
# Builds the lighter phone versions of the AI walkthrough clips (free, local ffmpeg).
# The engine serves these on phones (clipMobile / connectorsMobile in content.ts), so
# each scene's clip finishes downloading before the visitor scrolls past it.
# Same frames and framing as the desktop clips, so the seams still match; only the
# compression is stronger (crf 26 instead of 20, about a third of the size).
#
#   bash world/encode-mobile.sh     # run from forma/; reads public/world/ai/, writes public/world/ai/m/
set -euo pipefail

SRC="public/world/ai"; OUT="$SRC/m"; mkdir -p "$OUT"
for f in "$SRC"/*.mp4; do
  ffmpeg -v error -y -i "$f" -an -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p \
    -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$OUT/$(basename "$f")"
  echo "$(basename "$f"): $(( $(wc -c < "$f") / 1024 )) KB -> $(( $(wc -c < "$OUT/$(basename "$f")") / 1024 )) KB"
done
