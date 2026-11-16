"""Zentrale Pfade."""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / "src"
CONTENT = ROOT / "content"
PAGES = CONTENT / "pages"
MODULES = CONTENT / "modules"
THEMES = CONTENT / "themes"
THEME_FILE = CONTENT / "theme.md"
# URL-Praefix -> Verzeichnis (statische Auslieferung)
STATIC_ROUTES = {"/static/": SRC / "static", "/games/": ROOT / "games"}
