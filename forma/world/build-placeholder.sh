#!/bin/bash
# Builds FREE footage for the scroll-world walkthrough (no AI video, no credits).
#
# Architecture A (continuous forward walkthrough): one leg per scene. Each leg is a
# slow camera push-in on the scene image in world/sources/<id>.jpg. Leg i>0 opens on the ACTUAL last frame
# of leg i-1 (still drifting forward) and dissolves into its own photo, so every
# seam is frame-identical — the same seam rule the real AI chain follows.
#
# Replace with the real Higgsfield/Monid chain later (see world/brief.md); the page
# config in src/data/content.ts only needs new file paths.
#
# Usage: bash world/build-placeholder.sh   (run from forma/)
set -euo pipefail

CACHE="world/.cache"
OUT="public/world"
mkdir -p "$CACHE" "$OUT/vid"

# scene ids in scroll order; each needs world/sources/<id>.jpg
SCENES="home site sketch material inside"

W=1920; H=1080; FPS=30
LEG=6        # seconds of push-in per scene
BLEND=1.2    # seconds of dissolve from the previous leg's last frame
ZEND=1.22    # how far each push-in travels (zoom 1.0 → 1.22)
CRF=25       # placeholder footage: lighter than the skill's crf 20 for real AI clips
FX=0.61; FY=0.5  # point the camera pushes toward (fraction of width/height): the island's centre

encode() {  # master encode for smooth scrubbing (SKILL Step 6)
  ffmpeg -y -loglevel error -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
    -c:v libx264 -preset slow -crf $CRF -pix_fmt yuv420p \
    -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2"
}

# zoompan is jittery on small inputs, so work from a 3x upscale.
pushin() {  # $1 image, $2 seconds, $3 zoom start, $4 zoom end, $5 out
  local frames; frames=$(awk "BEGIN{print int($2*$FPS)}")
  ffmpeg -y -loglevel error -loop 1 -i "$1" -vf \
    "scale=$((W*3)):$((H*3)):force_original_aspect_ratio=increase,crop=$((W*3)):$((H*3)),zoompan=z='$3+($4-$3)*on/($frames-1)':x='(iw-iw/zoom)*$FX':y='(ih-ih/zoom)*$FY':d=$frames:s=${W}x${H}:fps=$FPS,format=yuv420p" \
    -frames:v "$frames" -c:v libx264 -crf 12 -preset fast "$5"
}

prev_last=""
for id in $SCENES; do
  src="world/sources/$id.jpg"

  # 16:9 poster / reduced-motion still
  ffmpeg -y -loglevel error -i "$src" -vf "scale=$W:$H:force_original_aspect_ratio=increase,crop=$W:$H" -q:v 3 "$OUT/$id.jpg"

  pushin "$src" "$LEG" 1.0 "$ZEND" "$CACHE/$id-push.mp4"

  if [ -z "$prev_last" ]; then
    cp "$CACHE/$id-push.mp4" "$CACHE/$id-leg.mp4"
  else
    # keep drifting forward on the previous leg's real last frame while dissolving in
    pushin "$prev_last" "$BLEND" 1.0 1.04 "$CACHE/$id-carry.mp4"
    ffmpeg -y -loglevel error -i "$CACHE/$id-carry.mp4" -i "$CACHE/$id-push.mp4" \
      -filter_complex "[0][1]xfade=transition=fade:duration=$BLEND:offset=0,format=yuv420p" \
      -c:v libx264 -crf 12 -preset fast "$CACHE/$id-leg.mp4"
  fi

  encode "$CACHE/$id-leg.mp4" "$OUT/vid/$id.mp4"
  prev_last="$CACHE/$id-last.png"
  # -update 1 without -frames keeps overwriting, so the file ends as the true last frame
  ffmpeg -y -loglevel error -sseof -0.5 -i "$CACHE/$id-leg.mp4" -update 1 "$prev_last"
  echo "built $id"
done
