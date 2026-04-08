"""Extrahiert das Bertig-Logo aus dem JPG und erzeugt transparente PNGs.

Keyed den dunkelblauen Hintergrund des Originals weg. Erzeugt zwei Varianten:
- bertig-logo-light.png  -> volle Logo-Komposition fuer dunkle Backgrounds
- bertig-signet-only.png -> isoliertes Signet (linke Haelfte) fuer Header-Badges
"""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "brand" / "bertig-logo.jpg"
OUT_DIR = ROOT / "public" / "brand" / "logo"
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Farb-Toleranz fuer Navy Hintergrund
NAVY_TARGET = (30, 45, 78)
TOLERANCE = 55


def is_navy(r: int, g: int, b: int) -> bool:
    return (
        abs(r - NAVY_TARGET[0]) < TOLERANCE
        and abs(g - NAVY_TARGET[1]) < TOLERANCE
        and abs(b - NAVY_TARGET[2]) < TOLERANCE
    )


def keyed(img: Image.Image) -> Image.Image:
    img = img.convert("RGBA")
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        if is_navy(r, g, b):
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    return img


def main() -> None:
    if not SRC.exists():
        raise SystemExit(f"Source logo not found at {SRC}")

    img = Image.open(SRC)
    light = keyed(img)
    light_path = OUT_DIR / "bertig-logo-light.png"
    light.save(light_path, "PNG")
    print(f"Wrote {light_path}  ({light.size})")

    # Signet isolieren -- linke Haelfte des Logos
    w, h = light.size
    signet = light.crop((0, 0, int(w * 0.45), h))
    signet_path = OUT_DIR / "bertig-signet-only.png"
    signet.save(signet_path, "PNG")
    print(f"Wrote {signet_path}  ({signet.size})")


if __name__ == "__main__":
    main()
