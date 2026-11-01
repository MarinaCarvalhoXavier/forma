#!/bin/bash
# Renders ONE real AI leg of the walkthrough with Seedance 2.0 via Monid (paid, per clip).
# Architecture A: leg 1 starts on its scene image; every later leg starts on the
# previous leg's ACTUAL last frame (pass it as START). No end image.
#
# Usage (from forma/):
#   VRES=480p DUR=4 bash world/render-ai.sh <id> "<focal point>" [START_IMAGE]
# Output: world/.cache/ai/<id>.mp4 (raw), its last frame, and the run JSON with cost.
set -euo pipefail
export NO_COLOR=1 FORCE_COLOR=0

ID="$1"; FOCAL="$2"; START="${3:-world/sources/$ID.jpg}"
VRES="${VRES:-480p}"; DUR="${DUR:-4}"
WORK="world/.cache/ai"; mkdir -p "$WORK"

PROMPT="Single continuous cinematic camera move, no cuts. Continue the same slow, steady forward glide. The camera moves gently toward $FOCAL. In the final second, settle back into a slow, steady forward glide. Ultra-photorealistic architectural film, warm natural light, natural materials: timber, lime render, stone, steel. Smooth, graceful, slow motion, subtle parallax. Empty, unoccupied, no people. No text, no captions."

# 1. Upload the start frame to Monid's free file store and get a public URL.
jpg="$WORK/${ID}_start.jpg"
ffmpeg -v error -y -i "$START" -vf "scale='min(1536,iw)':-2" -q:v 2 "$jpg"
size=$(wc -c < "$jpg" | tr -d ' ')
up=$(monid run -p sfs -e /put -i "{\"path\":\"forma/${ID}_start.jpg\",\"sizeBytes\":$size,\"ttl\":\"1h\"}" -w 60 -j 2>/dev/null | jq -r '.output.uploadUrl')
curl -fsS -T "$jpg" "$up" > /dev/null
url=$(monid run -p sfs -e /cat -i "{\"path\":\"forma/${ID}_start.jpg\",\"ttl\":\"1d\"}" -w 60 -j 2>/dev/null | jq -r '.output.url')

# 2. Fire the video run (no audio, explicit 16:9, no end image).
jq -n --arg p "$PROMPT" --arg u "$url" --arg r "$VRES" --argjson d "$DUR" \
  '{content:[{type:"text",text:$p},{type:"image_url",image_url:{url:$u},role:"first_frame"}],
    resolution:$r, duration:$d, ratio:"16:9", generate_audio:false}' > "$WORK/$ID.body.json"
rid=$(monid run -p bytedance -e /v1/video/seedance-2.0 -f "$WORK/$ID.body.json" -j 2>/dev/null | jq -r '.runId')
echo "run $rid started"

# 3. Poll until it finishes (typically ~3 minutes).
while :; do
  monid runs get -r "$rid" -j > "$WORK/$ID.run.json" 2>/dev/null || true
  st=$(jq -r '.status // empty' "$WORK/$ID.run.json")
  case "$st" in COMPLETED|FAILED|BLOCKED|STOPPED|TIMED_OUT) break ;; esac
  sleep 10
done

cost=$(jq -r '.cost.value // "?"' "$WORK/$ID.run.json")
vurl=$(jq -r '.output.content.video_url // empty' "$WORK/$ID.run.json")
if [ "$st" != COMPLETED ] || [ -z "$vurl" ]; then echo "$ID: $st (cost \$$cost)"; exit 1; fi
curl -fsSL "$vurl" -o "$WORK/$ID.mp4"
ffmpeg -v error -y -sseof -0.5 -i "$WORK/$ID.mp4" -update 1 "$WORK/${ID}_last.png"
echo "$ID: done, cost \$$cost"
