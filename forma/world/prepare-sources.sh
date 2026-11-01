#!/bin/bash
# Turns the five 3D island images (3:2, from forma/photos/) into 16:9 scene sources in
# world/sources/<id>.jpg. Each island's grey background is removed (world/knockout.py) and
# the island is placed right of centre on a near-white canvas matching the walkthrough, leaving the left side free for the walkthrough copy.
# These are also the start frames for the AI video legs.
#
# Usage (from forma/): bash world/prepare-sources.sh
set -euo pipefail

BG="0xFEFDFD"   # canvas colour; must match --sw-bg in src/app/globals.css
W=1920; H=1080
IMG_H=900       # island image height on the canvas
X=496           # left offset: puts the island's centre at ~61% of the width

prep() {  # $1 id, $2 source file in photos/
  mkdir -p world/.cache/knock
  # Remove the images' light-grey background so the island floats on the page colour.
  python3 world/knockout.py "photos/$2" "world/.cache/knock/$1.png"
  ffmpeg -v error -y -i "world/.cache/knock/$1.png" -filter_complex \
    "color=c=$BG:s=${W}x${H}[bg];[0]scale=-2:$IMG_H[img];[bg][img]overlay=x=$X:y=($H-$IMG_H)/2:shortest=1" \
    -frames:v 1 -q:v 2 "world/sources/$1.jpg"
  echo "prepared $1"
}

prep home     "Cosy Floating Island Home at Dusk.png"
prep site     "Floating Garden Building Site.png"
prep sketch   "Cozy Floating Island Architect’s Studio.png"
prep material "Floating Island House Under Construction.png"
prep inside   "Warm House Handover Diorama.png"
