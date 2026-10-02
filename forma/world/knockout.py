#!/usr/bin/env python3
"""Background knockout for the 3D island images (adapted from the scroll-world skill's
references/knockout.py).

The generated images have a light-grey background with a thin near-white rim at the very
edge, so the skill's version (which samples the corner pixels) would match the rim, not
the background. This copy trims the rim first, samples the background a little inside
each corner, then flood-fills from the borders — so colours inside the island that
happen to match the background are kept.

Usage: python3 world/knockout.py in.png out.png    (TOL env var, default 34)
"""
import os
import sys
from collections import deque
from PIL import Image, ImageFilter

TOL = float(os.environ.get("TOL", "34"))  # RGB distance counted as background
RIM = 8  # px trimmed from each edge (the near-white rim)


def knock(inp, outp):
    im = Image.open(inp).convert("RGB")
    w, h = im.size
    im = im.crop((RIM, RIM, w - RIM, h - RIM))
    w, h = im.size
    px = im.load()

    pts = [(16, 16), (w - 17, 16), (16, h - 17), (w - 17, h - 17)]
    cr, cg, cb = (sum(px[x, y][c] for x, y in pts) // 4 for c in range(3))
    tol2 = TOL * TOL

    def is_bg(x, y):
        r, g, b = px[x, y]
        return (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2 <= tol2

    bg = bytearray(w * h)
    seen = bytearray(w * h)
    dq = deque()
    edge = [(x, y) for x in range(w) for y in (0, h - 1)] + [(x, y) for y in range(h) for x in (0, w - 1)]
    for x, y in edge:
        i = y * w + x
        if not seen[i]:
            seen[i] = 1
            if is_bg(x, y):
                bg[i] = 1
                dq.append((x, y))
    while dq:
        x, y = dq.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h:
                i = ny * w + nx
                if not seen[i]:
                    seen[i] = 1
                    if is_bg(nx, ny):
                        bg[i] = 1
                        dq.append((nx, ny))

    alpha = Image.new("L", (w, h), 255)
    ap = alpha.load()
    for y in range(h):
        base = y * w
        for x in range(w):
            if bg[base + x]:
                ap[x, y] = 0
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.4))  # soften the cut edge
    out = im.convert("RGBA")
    out.putalpha(alpha)
    out.save(outp)
    print(f"knocked {inp} (bg rgb {cr},{cg},{cb})")


if __name__ == "__main__":
    knock(sys.argv[1], sys.argv[2])
