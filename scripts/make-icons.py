"""Render the favicon and Apple touch icon.

Next's App Router picks up app/icon.png and app/apple-icon.png automatically.
Run from the repo root: python3 scripts/make-icons.py
"""
from PIL import Image, ImageDraw, ImageFont

VOID = (10, 10, 22)
CYAN = (34, 211, 238)
MAGENTA = (255, 43, 214)
HN = "/System/Library/Fonts/HelveticaNeue.ttc"


def render(size, padding_ratio, radius_ratio, out):
    """Drawn at 8x then downsampled so the curves and stem stay clean."""
    s = size * 8
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    pad = round(s * padding_ratio)
    d.rounded_rectangle([pad, pad, s - pad - 1, s - pad - 1],
                        radius=round(s * radius_ratio), fill=VOID)

    inner = s - pad * 2
    font = ImageFont.truetype(HN, round(inner * 0.72), index=1)  # Bold
    box = d.textbbox((0, 0), "M", font=font)
    d.text((s / 2 - (box[0] + box[2]) / 2,
            s / 2 - (box[1] + box[3]) / 2 - inner * 0.06),
           "M", font=font, fill=CYAN)

    bar_w = round(inner * 0.44)
    bar_h = max(1, round(inner * 0.075))
    bar_y = round(pad + inner * 0.80)
    d.rounded_rectangle([s / 2 - bar_w / 2, bar_y, s / 2 + bar_w / 2, bar_y + bar_h],
                        radius=bar_h / 2, fill=MAGENTA)

    img.resize((size, size), Image.LANCZOS).save(out, "PNG", optimize=True)
    print("wrote", out, size)


if __name__ == "__main__":
    # favicon: no outer padding, the tile fills the square
    render(512, 0.0, 0.16, "app/icon.png")
    # apple touch icon: iOS masks it itself, so keep a square ground and inset
    render(180, 0.0, 0.0, "app/apple-icon.png")
