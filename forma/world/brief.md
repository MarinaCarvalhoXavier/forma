# Forma scroll-world: brief for the real AI render

The page in this branch runs on **free placeholder footage**: slow camera push-ins on
stock photos (`world/build-placeholder.sh`). This brief holds everything needed to
replace that footage with a real AI camera flight using the scroll-world skill. Nothing
here has been generated or paid for yet.

## Intake (scroll-world Step 1)

- **Subject:** Forma, a solo architecture practice. Calm, material-led homes, from the
  first walk around the site to handover.
- **Brand:** forma
- **Palette (Design.md):** background `#000000`, surface `#171717`, text `#FFFFFF`,
  secondary `#A1A1AA`, border `#525252`, accent `#EAB308`
- **Tone:** calm, premium, restrained
- **Art direction:** photoreal architectural (full-bleed scenes on a dark page)
- **Camera:** continuous forward walkthrough (architecture A: no connectors). This was
  chosen for the prototype. **Confirm before rendering:** fly-through (B) or locked
  isometric glide are the alternatives.
- **Mobile version (native 9:16):** not decided; it roughly doubles the video cost.
  The prototype is desktop-only and degrades gracefully on phones.
- **Video tier:** not decided (see cost below).

## Style preamble (identical in every still prompt)

```
Ultra-photorealistic architectural photography of a single cohesive contemporary home
by a small architecture practice, cinematic wide-angle, warm golden-hour light, natural
materials (timber, lime render, stone, steel), restrained designer furnishings, a calm
landscape setting, editorial magazine quality (Architectural Digest), shallow depth of
field, no people. Cohesive palette of warm timber, off-white lime, grey stone and deep
charcoal, with a single small accent of warm yellow light. Centered composition, 3:2,
absolutely no text, no letters, no numbers, no logos.
```

## Scenes (one still + one leg each, in scroll order)

| # | id | Subject for the still | Focal point for the leg |
|---|---|---|---|
| 1 | home | The finished house at dusk seen from the garden, interior lights glowing | the glazed living room |
| 2 | site | The empty plot before building: a gentle slope, mature trees, morning light, survey stakes and string lines | the string lines marking the future house |
| 3 | sketch | An architect's desk in a quiet studio: hand sketches, tracing paper and a small white card model of the house | the card model |
| 4 | material | A close architectural view of the house under construction: timber cladding, lime render and a stone plinth meeting cleanly | where timber meets stone |
| 5 | inside | The finished living room on handover day: daylight, linen, oak floor, a set of keys on the table | the keys on the table |

Copy for each scene lives in `src/data/content.ts` (`world.sections`).

## Leg prompt (architecture A, from prompts.md)

Leg 1 starts from scene 1's still. Each later leg starts from the **previous leg's
actual last frame**. Never pass an end image.

```
Single continuous cinematic camera move, no cuts. Continue the same slow, steady
forward glide. The camera moves into [SCENE] toward [FOCAL POINT]. In the final
second, settle back into a slow, steady forward glide toward the next space.
Ultra-photorealistic architectural film, warm golden-hour light, natural materials.
Smooth, graceful, slow motion, subtle parallax. Empty, unoccupied, no people. No text,
no captions.
```

Suggested mid-leg moves (skill camera grammar, "real estate / hospitality"): a
steadicam glide through doorways for `home` and `inside`, and a gentle crane-up over
the plot for `site`.

## Cost estimate (5 scenes, desktop only, architecture A = 5 legs)

These numbers come from the skill's own measurements. Re-check balances before you
start.

| Option | Videos | Stills |
|---|---|---|
| Monid, 1080p | 5 × ~$2.99 ≈ **$15** (+15% re-rolls ≈ $17) | 5 on Higgsfield ≈ 75 credits |
| Monid, 720p | 5 × ~$1.21 ≈ **$6** (+15% ≈ $7) | same |
| Monid, 480p preview pass | 5 × ~$0.28 ≈ **$1.40** | same |

Adding the native 9:16 mobile chain roughly doubles the video column.

## Swapping in the real footage

1. Run the skill's pipeline (`references/pipeline.md`) with the prompts above.
2. Encode per skill Step 6 (crf 20, `-g 8`, no audio) into `public/world/vid/<id>.mp4`.
3. Replace `public/world/<id>.jpg` with each scene's still (16:9).
4. No code changes are needed: `world.sections` in `src/data/content.ts` already points
   at those paths. Then QA the seams (skill Step 8).
