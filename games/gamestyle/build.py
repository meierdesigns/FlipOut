#!/usr/bin/env python3
"""Generates gamestyle/themes/*.css and gamestyle/gamestyle.css from content/themes/*.md.
The MD themes remain the single source. Usage: python3 games/gamestyle/build.py"""
from pathlib import Path
import html, re, sys
HERE = Path(__file__).parent
ROOT = HERE.parents[1]
sys.path.insert(0, str(ROOT / "src"))
from backend.content import frontmatter
from backend.theme import theme_values, theme_css  # gleiche Token-Logik wie L4UNCHAPP

# Resolution per theme: logical pixels (width x height) and pixel look
RES = {"amiga": (320, 256), "retro": (320, 240), "arcade": (256, 224), "win95": (640, 480),
       "terminal": (640, 400), "cyberpunk": (480, 270), "monochrome": (160, 144)}
PIXEL_FONTS = {"pixel", "terminal"}

for src in sorted((ROOT / "content" / "themes").glob("*.md")):
    name = src.stem
    v = theme_values(frontmatter(src.read_text())[1])
    vars_ = html.unescape(theme_css(v))  # theme_css escapes for HTML attributes, here we need plain CSS
    w, h = RES.get(name, (640, 360))
    crisp = v.get("font") in PIXEL_FONTS
    out = f".theme-{name}{{{vars_};--res-w:{w};--res-h:{h};--pixelated:{'pixelated' if crisp else 'auto'}}}\n"
    if v.get("scanlines") == "true": out += f".theme-{name}.fx-scanlines::after{{opacity:.22}}\n"
    if v.get("glow") == "true": out += f".theme-{name}.fx-glow h1,.theme-{name}.fx-glow .gs-hud strong{{text-shadow:0 0 12px var(--primary)}}\n"
    (HERE / "themes" / f"{name}.css").write_text(out)
    print("ok", name, f"{w}x{h}")
