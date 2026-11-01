#!/bin/bash
# Renders the REAL AI walkthrough (scroll-world architecture B) through Monid / Seedance 2.0.
# PAID: every clip spends Monid balance (~$0.28 per 4 s clip at 480p).
#
#   bash world/render-world.sh dives        # 5 dives in parallel, each starting on world/sources/<id>.jpg
#   bash world/render-world.sh connectors   # 4 flights: dive i's real LAST frame -> dive i+1's real FIRST frame
#   bash world/render-world.sh one <name>   # re-render a single dive id, or conn1..conn4
#
# Raw results land in world/.cache/ai3d/ (<name>.mp4, <name>.run.json with the cost).
# Run from forma/. Needs: monid (with a key), ffmpeg, jq, curl.
set -uo pipefail
export NO_COLOR=1 FORCE_COLOR=0

VRES="${VRES:-480p}"; DUR="${DUR:-4}"
WORK="world/.cache/ai3d"; mkdir -p "$WORK"
IDS="home site sketch material inside"

STYLE="Soft matte clay diorama, tilt-shift miniature, warm studio light, palette of warm timber, white lime render, grey stone, deep charcoal and small warm-yellow lights. Smooth, graceful, slow motion, subtle parallax. Keep the plain white background around the island. No text, no captions."

dive_prompt() {
  local focal action
  case "$1" in
    home)     focal="the glowing windows of the house"
              action="The house lights glow warmer, the tree's leaves sway gently, the two small clay figures turn toward the house and the little dog wags its tail." ;;
    site)     focal="the string lines marking out the future house"
              action="The small architect figure pulls a string line taut between two wooden stakes while the other figure points at the view, and the grass sways in a light breeze." ;;
    sketch)   focal="the desk with the white card model"
              action="The small architect figure draws on the tracing paper with a pencil, the client figure leans in over the card model, and the desk lamp glows." ;;
    material) focal="the scaffold and the white wall"
              action="The small builder figure on the scaffold rolls white lime render up the wall, another figure carries a timber board across the yard, and the architect figure checks a plan." ;;
    inside)   focal="the cut-away living room"
              action="The small architect figure hands a set of brass keys to the two homeowner figures, who take them happily." ;;
  esac
  echo "Single continuous cinematic camera move, no cuts. Begin with the whole floating miniature island in view, like a tiny clay model. The camera slowly glides forward and descends toward $focal, as if flying into the miniature. $action $STYLE"
}

label() {
  case "$1" in home) echo "the finished house" ;; site) echo "the empty building plot" ;;
    sketch) echo "the architect's studio" ;; material) echo "the house under construction" ;; inside) echo "the finished living room" ;; esac
}

conn_prompt() {  # from-id to-id
  echo "Single continuous camera move, no cuts. The camera smoothly pulls up and back out of $(label "$1"), rising above the floating island, then glides across the white space and arrives above $(label "$2"), beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. $STYLE"
}

# Upload a local image to Monid's free file store; print a public URL for it.
frame_url() {  # localImage remoteName
  local jpg="$WORK/up_$2.jpg" size up
  ffmpeg -v error -y -i "$1" -vf "scale='min(1536,iw)':-2" -q:v 2 "$jpg"
  size=$(wc -c < "$jpg" | tr -d ' ')
  up=$(monid run -p sfs -e /put -i "{\"path\":\"forma3d/$2.jpg\",\"sizeBytes\":$size,\"ttl\":\"1h\"}" -w 60 -j 2>/dev/null | jq -r '.output.uploadUrl')
  curl -fsS -T "$jpg" "$up" > /dev/null
  monid run -p sfs -e /cat -i "{\"path\":\"forma3d/$2.jpg\",\"ttl\":\"1d\"}" -w 60 -j 2>/dev/null | jq -r '.output.url'
}

# Fire one clip, wait for it, download it. $1 name, $2 prompt, $3 start url, $4 end url (optional)
render() {
  local name="$1" body="$WORK/$1.body.json" run="$WORK/$1.run.json" rid st cost vurl
  if [ -n "${4:-}" ]; then
    jq -n --arg p "$2" --arg s "$3" --arg e "$4" --arg r "$VRES" --argjson d "$DUR" \
      '{content:[{type:"text",text:$p},{type:"image_url",image_url:{url:$s},role:"first_frame"},{type:"image_url",image_url:{url:$e},role:"last_frame"}],
        resolution:$r, duration:$d, ratio:"16:9", generate_audio:false}' > "$body"
  else
    jq -n --arg p "$2" --arg s "$3" --arg r "$VRES" --argjson d "$DUR" \
      '{content:[{type:"text",text:$p},{type:"image_url",image_url:{url:$s},role:"first_frame"}],
        resolution:$r, duration:$d, ratio:"16:9", generate_audio:false}' > "$body"
  fi
  rid=$(monid run -p bytedance -e /v1/video/seedance-2.0 -f "$body" -j 2>/dev/null | jq -r '.runId')
  echo "$name: started run $rid"
  while :; do
    monid runs get -r "$rid" -j > "$run" 2>/dev/null || true
    st=$(jq -r '.status // empty' "$run")
    case "$st" in COMPLETED|FAILED|BLOCKED|STOPPED|TIMED_OUT) break ;; esac
    sleep 10
  done
  cost=$(jq -r '.cost.value // "?"' "$run")
  vurl=$(jq -r '.output.content.video_url // empty' "$run")
  if [ "$st" = COMPLETED ] && [ -n "$vurl" ] && curl -fsSL "$vurl" -o "$WORK/$name.mp4"; then
    echo "$name: OK (cost \$$cost)"
  else
    echo "$name: $st (cost \$$cost) $(jq -c '.error // .controls // empty' "$run" 2>/dev/null)"
  fi
}

first_frame() { ffmpeg -v error -y -i "$WORK/$1.mp4" -frames:v 1 "$WORK/$1_first.png"; }
last_frame()  { ffmpeg -v error -y -sseof -0.5 -i "$WORK/$1.mp4" -update 1 "$WORK/$1_last.png"; }

do_dive() { render "$1" "$(dive_prompt "$1")" "$(frame_url "world/sources/$1.jpg" "src_$1")"; }

do_conn() {  # n (1..4)
  local arr=($IDS) a b
  a=${arr[$(($1-1))]}; b=${arr[$1]}
  last_frame "$a"; first_frame "$b"
  render "conn$1" "$(conn_prompt "$a" "$b")" \
    "$(frame_url "$WORK/${a}_last.png" "${a}_last")" "$(frame_url "$WORK/${b}_first.png" "${b}_first")"
}

case "${1:-}" in
  dives)      for id in $IDS; do do_dive "$id" & sleep 2; done; wait ;;
  connectors) for n in 1 2 3 4; do do_conn "$n" & sleep 2; done; wait ;;
  one)        case "$2" in conn*) do_conn "${2#conn}" ;; *) do_dive "$2" ;; esac ;;
  *) echo "usage: $0 dives | connectors | one <name>"; exit 1 ;;
esac
NO_COLOR=1 monid balance 2>/dev/null | grep -i "balance:"
