import os
import numpy as np
import imageio.v3 as iio
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(BASE_DIR, "style", "assets", "videos")
OUT_PATH = os.path.join(OUT_DIR, "kyltm-gallery.mp4")

W, H = 1280, 720
FPS = 24
DURATION = 8


def load_font(size):
    for name in ("arial.ttf", "segoeui.ttf", "calibri.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def center_text(draw, text, font, y, color=(255, 255, 255)):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    draw.text(((W - tw) // 2, y), text, font=font, fill=color)


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    title_font = load_font(54)
    sub_font = load_font(30)
    small_font = load_font(22)
    frames = []

    for i in range(FPS * DURATION):
        t = i / (FPS * DURATION)
        img = Image.new("RGB", (W, H))
        draw = ImageDraw.Draw(img)

        for y in range(H):
            ratio = y / H
            r = int(20 + (29 - 20) * ratio)
            g = int(90 + (159 - 90) * ratio)
            b = int(70 + (111 - 70) * ratio)
            draw.line([(0, y), (W, y)], fill=(r, g, b))

        pulse = 0.85 + 0.15 * np.sin(t * 6.28 * 2)
        cx, cy = W // 2, H // 2 - 40
        radius = int(70 * pulse)
        draw.ellipse(
            [cx - radius, cy - radius, cx + radius, cy + radius],
            fill=(255, 255, 255),
            outline=(255, 255, 255),
        )

        tri_w, tri_h = 28, 36
        draw.polygon(
            [
                (cx - tri_w // 2 + 8, cy - tri_h // 2),
                (cx - tri_w // 2 + 8, cy + tri_h // 2),
                (cx + tri_w // 2 + 8, cy),
            ],
            fill=(29, 159, 111),
        )

        center_text(draw, "KYLTM", title_font, 120)
        center_text(
            draw,
            "Kadastr ve Yerqurulusu Layihe-Tedqiqat Merkezi",
            sub_font,
            210,
            (230, 245, 238),
        )
        center_text(draw, "Video qalereya", small_font, 560, (220, 235, 228))

        bar_w = int(W * 0.5 * min(1.0, t * 1.2))
        draw.rectangle([W // 2 - bar_w // 2, 500, W // 2 + bar_w // 2, 506], fill=(255, 255, 255))

        frames.append(np.array(img))

    iio.imwrite(OUT_PATH, frames, fps=FPS, codec="libx264", quality=8, pixelformat="yuv420p")
    print(OUT_PATH)
    print(os.path.getsize(OUT_PATH))


if __name__ == "__main__":
    main()
