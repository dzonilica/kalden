#!/usr/bin/env python3
"""
Build the served media from the originals in public/media.

Three jobs, all idempotent — rerun it after dropping a new photograph in:

1. Photographs: AVIF and WebP variants at 480, 960, 1440 and 1800 wide, written
   beside the JPEG. Nothing is upscaled, so a small source simply produces
   fewer variants, and src/media-manifest.js records exactly which ones exist
   so a srcset never points at a file that was never built.
2. Open Graph card: a 1200x630 crop, because every photograph the school has is
   square and a square card is cropped unpredictably by each network.
3. Hero film: 720p and 480p renditions in MP4 and WebM, plus a sharp poster
   frame. The original is 12s at 2 Mbps, which is 3.1 MB to start a home page
   with. It runs behind a navy veil at a size nobody inspects, so it is encoded
   for weight rather than for fidelity.

   H.264 only, no WebM: on this footage — a slow pan across lettering, all
   edges — VP9 came out consistently larger than x264 at matched quality, and a
   second format that is never the smaller one is just another file to build.

Needs Pillow (with AVIF) and ffmpeg on PATH:

    python scripts/build-media.py            # everything
    python scripts/build-media.py film       # one stage: photos | og | film
"""

from __future__ import annotations

import json
import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image, features

ROOT = Path(__file__).resolve().parent.parent
PHOTOS = ROOT / "public/media/foto"
VIDEO = ROOT / "public/media/video"
MANIFEST = ROOT / "src/media-manifest.js"

# 1800 is the native width of the square originals. It exists for the two
# full-bleed surfaces — the home hero and every page hero, both of which hint
# sizes="100vw" — where a 1440 file on a 1920 display is visibly soft. Every
# other layout caps itself well below it through its own sizes hint, so the
# rung is built once and downloaded only where it is actually needed.
WIDTHS = (480, 960, 1440, 1800)
QUALITY = {"webp": 78, "avif": 55}

# The card the networks crop to 1.91:1. Three cars read at thumbnail size.
OG_SOURCE = PHOTOS / "vozni-park-3-auta-poligon.jpg"
OG_OUT = ROOT / "public/media/og.jpg"
OG_SIZE = (1200, 630)

SOURCE_FILM = VIDEO / "natpis-na-vratima.mp4"
POSTER_AT = "00:00:01.2"


def targets_for(source_width: int) -> list[int]:
    """
    The ladder for one photograph: the standard widths it can actually fill,
    plus its own width when it tops out below the largest.

    Without that last rung a 900px source would offer nothing above 480, and a
    browser laying out a full-width hero takes the widest it is offered — so it
    would pick the 480 and upscale it, which is worse than the JPEG it replaced.
    """
    targets = [width for width in WIDTHS if width <= source_width]
    if source_width < max(WIDTHS) and source_width not in targets:
        targets.append(source_width)
    return sorted(targets)


def variants_for(photo: Path) -> dict[str, list[int]]:
    """AVIF and WebP cuts of one photograph; returns what was actually written."""
    built: dict[str, list[int]] = {"avif": [], "webp": []}

    with Image.open(photo) as image:
        image = image.convert("RGB")
        for width in targets_for(image.width):
            height = round(image.height * width / image.width)
            resized = image.resize((width, height), Image.LANCZOS)

            for fmt in ("avif", "webp"):
                out = photo.with_name(f"{photo.stem}-{width}.{fmt}")
                resized.save(out, format=fmt.upper(), quality=QUALITY[fmt])
                built[fmt].append(width)

    return built


def open_graph() -> None:
    with Image.open(OG_SOURCE) as image:
        image = image.convert("RGB")
        # Cover the 1.91:1 frame, then take the middle band — the cars sit
        # across the centre of every one of these photographs.
        scale = max(OG_SIZE[0] / image.width, OG_SIZE[1] / image.height)
        resized = image.resize(
            (round(image.width * scale), round(image.height * scale)), Image.LANCZOS
        )
        left = (resized.width - OG_SIZE[0]) // 2
        top = (resized.height - OG_SIZE[1]) // 2
        resized.crop((left, top, left + OG_SIZE[0], top + OG_SIZE[1])).save(
            OG_OUT, format="JPEG", quality=84, optimize=True, progressive=True
        )
    print(f"  og.jpg                    {OG_OUT.stat().st_size // 1024} KB")


def run(args: list[str]) -> None:
    subprocess.run(args, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def film() -> None:
    for label, width, crf in (("720", 1280, 30), ("480", 854, 32)):
        mp4 = VIDEO / f"natpis-{label}.mp4"

        run([
            "ffmpeg", "-y", "-i", str(SOURCE_FILM),
            "-an",  # the loop is silent by design; the audio track is dead weight
            "-vf", f"scale={width}:-2",
            "-c:v", "libx264", "-profile:v", "high", "-crf", str(crf),
            "-preset", "slow", "-pix_fmt", "yuv420p",
            # Moves the index to the front, so the loop starts playing before
            # the whole file is in.
            "-movflags", "+faststart",
            str(mp4),
        ])
        print(f"  {mp4.name:<25} {mp4.stat().st_size // 1024} KB")

    # A sharp frame, not the blurred first one the old site shipped.
    poster = VIDEO / "natpis-poster.jpg"
    run([
        "ffmpeg", "-y", "-ss", POSTER_AT, "-i", str(SOURCE_FILM),
        "-frames:v", "1", "-vf", "scale=1280:-2", "-q:v", "4", str(poster),
    ])
    with Image.open(poster) as image:
        small = image.convert("RGB")
        small = small.resize((960, round(small.height * 960 / small.width)), Image.LANCZOS)
        small.save(VIDEO / "natpis-poster-960.webp", format="WEBP", quality=78)
    print(f"  natpis-poster.jpg         {poster.stat().st_size // 1024} KB")


def photographs() -> None:
    manifest: dict[str, dict[str, list[int]]] = {}
    for photo in sorted(PHOTOS.glob("*.jpg")):
        built = variants_for(photo)
        manifest[f"/media/foto/{photo.name}"] = built
        print(f"  {photo.name:<40} {', '.join(map(str, built['webp']))}")

    MANIFEST.write_text(
        "/*\n"
        " * Generated by scripts/build-media.py — do not edit by hand.\n"
        " *\n"
        " * Maps each photograph to the widths that exist beside it per format, so a\n"
        " * srcset never points at a variant that was never built (small sources are\n"
        " * not upscaled).\n"
        " */\n"
        "export const mediaVariants = "
        + json.dumps(manifest, indent=2, sort_keys=True)
        + ";\n",
        encoding="utf-8",
    )
    print(f"  wrote {MANIFEST.relative_to(ROOT)}")


STAGES = {"photos": photographs, "og": open_graph, "film": film}


def main(argv: list[str]) -> int:
    if shutil.which("ffmpeg") is None:
        print("ffmpeg is not on PATH.", file=sys.stderr)
        return 1
    if not features.check("avif"):
        print("Pillow was built without AVIF support.", file=sys.stderr)
        return 1

    wanted = argv or list(STAGES)
    unknown = [name for name in wanted if name not in STAGES]
    if unknown:
        print(f"unknown stage: {', '.join(unknown)}", file=sys.stderr)
        return 1

    for name in wanted:
        print(name)
        STAGES[name]()
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
