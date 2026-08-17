"""Render the site-wide Open Graph card at exactly 1200x630.

Drawn with PIL so the output is deterministic and matches the palette in
app/globals.css. Run: python3 make_og.py <out.png>
"""
import sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

W, H = 1200, 630
SS = 2  # supersample factor, downsampled at the end for clean edges

VOID = (5, 5, 10)
DEEP = (12, 12, 26)
INK = (232, 232, 240)
INK_DIM = (168, 168, 192)
INK_MUTE = (141, 141, 176)
INK_FAINT = (124, 124, 158)
CYAN = (34, 211, 238)
MAGENTA = (255, 43, 214)
LIME = (163, 230, 53)

HN = "/System/Library/Fonts/HelveticaNeue.ttc"
MONO = "/System/Library/Fonts/SFNSMono.ttf"

BOLD, REGULAR, MEDIUM = 1, 0, 10


def hn(size, index=BOLD):
    return ImageFont.truetype(HN, size * SS, index=index)


def mono(size):
    return ImageFont.truetype(MONO, size * SS)


def lerp(a, b, t):
    return tuple(round(a[i] + (b[i] - a[i]) * t) for i in range(3))


def glow_mask(w, h, cx, cy, radius, peak):
    """Soft radial falloff, computed small then scaled up."""
    n = 100
    g = Image.new("L", (n, n), 0)
    px = g.load()
    aspect = w / h
    for y in range(n):
        for x in range(n):
            dx = (x / n - cx) * aspect
            dy = y / n - cy
            d = (dx * dx + dy * dy) ** 0.5
            v = max(0.0, 1.0 - d / radius)
            px[x, y] = int(255 * (v ** 2.2) * peak)
    return g.resize((w, h), Image.BICUBIC)


def spaced(draw, xy, text, font, fill, tracking):
    """Letter-spaced text. PIL has no tracking, so step glyph by glyph."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking * SS
    return x


def main(out):
    w, h = W * SS, H * SS

    # --- ground -----------------------------------------------------------
    img = Image.new("RGB", (w, h), VOID)
    d = ImageDraw.Draw(img)
    for y in range(h):
        d.line([(0, y), (w, y)], fill=lerp(DEEP, VOID, (y / h) ** 0.8))

    # --- corner glows (additive) -----------------------------------------
    for color, cx, cy, r, peak in (
        (CYAN, 0.12, 0.24, 0.70, 0.30),
        (MAGENTA, 0.94, 0.92, 0.62, 0.26),
    ):
        tint = Image.new("RGB", (w, h), color)
        img = ImageChops.add(img, Image.composite(tint, Image.new("RGB", (w, h)),
                                                  glow_mask(w, h, cx, cy, r, peak)))

    # --- CRT scanlines ----------------------------------------------------
    stripes = Image.new("RGB", (w, h), (0, 0, 0))
    sd = ImageDraw.Draw(stripes)
    for y in range(0, h, 4 * SS):
        sd.line([(0, y), (w, y)], fill=(7, 7, 9), width=2 * SS)
    img = ImageChops.add(img, stripes)

    # --- neon bloom behind the name --------------------------------------
    f_name = hn(88)
    lines = [("Matthew", 186, CYAN), ("Thomas-Wicher", 284, MAGENTA)]
    bloom = Image.new("RGB", (w, h), (0, 0, 0))
    bd = ImageDraw.Draw(bloom)
    for text, y, color in lines:
        bd.text((96 * SS, y * SS), text, font=f_name,
                fill=tuple(int(c * 0.55) for c in color))
    bloom = bloom.filter(ImageFilter.GaussianBlur(16 * SS))
    img = ImageChops.add(img, bloom)

    d = ImageDraw.Draw(img)

    # --- corner frame marks ----------------------------------------------
    d.line([(64 * SS, 60 * SS), (64 * SS, 100 * SS)], fill=CYAN, width=2 * SS)
    d.line([(64 * SS, 60 * SS), (104 * SS, 60 * SS)], fill=CYAN, width=2 * SS)
    d.line([(1136 * SS, 570 * SS), (1136 * SS, 530 * SS)], fill=MAGENTA, width=2 * SS)
    d.line([(1136 * SS, 570 * SS), (1096 * SS, 570 * SS)], fill=MAGENTA, width=2 * SS)

    # --- eyebrow ----------------------------------------------------------
    f_eyebrow = mono(16)
    d.rectangle([96 * SS, 124 * SS, 105 * SS, 144 * SS], fill=CYAN)
    x = spaced(d, (122 * SS, 124 * SS), "PORTFOLIO", f_eyebrow, INK_MUTE, 5.0)
    x = spaced(d, (x + 12 * SS, 124 * SS), "//", f_eyebrow, (70, 70, 96), 5.0)
    spaced(d, (x + 12 * SS, 124 * SS), "MTHOMASWICHER.COM", f_eyebrow, INK_MUTE, 5.0)

    # --- name -------------------------------------------------------------
    for text, y, _ in lines:
        d.text((96 * SS, y * SS), text, font=f_name, fill=INK)

    # --- accent rule ------------------------------------------------------
    rule_y, rule_w = 404, 640
    for i in range(rule_w):
        t = i / rule_w
        color = lerp(CYAN, MAGENTA, min(1.0, t * 2))
        alpha = 1.0 if t < 0.45 else max(0.0, 1.0 - (t - 0.45) / 0.55)
        base = img.getpixel(((96 + i) * SS, rule_y * SS))
        d.rectangle([(96 + i) * SS, rule_y * SS,
                     (96 + i) * SS + SS - 1, rule_y * SS + 2 * SS],
                    fill=lerp(base, color, alpha))

    # --- role lines -------------------------------------------------------
    d.text((96 * SS, 440 * SS), "Sr. Product Designer, Washington, D.C.",
           font=hn(31, MEDIUM), fill=INK_DIM)
    d.text((96 * SS, 488 * SS),
           "Design and full-stack engineering. Currently Capital One, DevX.",
           font=hn(24, REGULAR), fill=INK_MUTE)

    # --- stat strip -------------------------------------------------------
    f_stat = mono(14)
    sx = 96 * SS
    for label in ("7 YRS", "SAAS + FINTECH", "AI TOOLING", "DESIGN SYSTEMS"):
        sx = spaced(d, (sx, 556 * SS), label, f_stat, INK_FAINT, 3.0)
        sx += 32 * SS

    # --- cartridge motif --------------------------------------------------
    ox, oy = 906 * SS, 170 * SS
    d.rounded_rectangle([ox, oy, ox + 196 * SS, oy + 252 * SS], radius=8 * SS,
                        fill=(14, 14, 32), outline=(22, 120, 136), width=2 * SS)
    d.rounded_rectangle([ox + 22 * SS, oy + 26 * SS, ox + 174 * SS, oy + 122 * SS],
                        radius=4 * SS, fill=(21, 21, 44), outline=(112, 28, 96), width=SS)
    for dy, wd, col in ((46, 86, CYAN), (64, 120, (112, 112, 142)),
                        (82, 64, (78, 78, 108)), (100, 100, LIME)):
        d.rounded_rectangle([ox + 38 * SS, oy + dy * SS,
                             ox + (38 + wd) * SS, oy + (dy + 7) * SS],
                            radius=3 * SS, fill=col)
    for i in range(5):
        px = ox + (46 + i * 24) * SS
        d.rounded_rectangle([px, oy + 156 * SS, px + 12 * SS, oy + 190 * SS],
                            radius=2 * SS, fill=(20, 92, 106))
    d.rounded_rectangle([ox + 22 * SS, oy + 212 * SS, ox + 174 * SS, oy + 230 * SS],
                        radius=4 * SS, fill=VOID, outline=(62, 62, 88), width=SS)

    img.resize((W, H), Image.LANCZOS).save(out, "PNG", optimize=True)
    print("wrote", out)


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "og.png")
