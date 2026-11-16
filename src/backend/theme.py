"""Backend: Theme laden und als CSS-Variablen ausgeben."""
import html
from .paths import THEME_FILE, THEMES
from .content import frontmatter

def theme_values(src):
    values = {}
    section = None
    for raw_line in src.splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#"):
            continue
        if line.endswith(":") and not line.startswith(" "):
            section = line[:-1].strip()
            continue
        if ":" not in line:
            continue
        key, value = line.split(":", 1)
        key, value = key.strip(), value.strip().strip('"\'')
        values[f"{section}-{key}" if section else key] = value
    return values

def load_theme():
    active = THEME_FILE
    active_meta, active_src = frontmatter(active.read_text() if active.exists() else "")
    name = active_meta.get("theme", "modern")
    preset = THEMES / f"{name}.md"
    preset_meta, preset_src = frontmatter(preset.read_text() if preset.exists() else "")
    values = theme_values(preset_src)
    values.update(theme_values(active_src))
    values["name"] = name
    return values

def theme_css(values):
    fonts = {
        "system": "system-ui, sans-serif",
        "pixel": "'Courier New', monospace",
        "terminal": "'Courier New', monospace",
        "serif": "Georgia, serif",
        "aqua": "'Lucida Grande', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    }
    variables = {
        "--font-body": fonts.get(values.get("font", "system"), fonts["system"]),
        "--font-heading": fonts.get(values.get("heading-font", values.get("font", "system")), fonts["system"]),
        "--bg": values.get("colors-bg", "#f6f7f9"),
        "--surface": values.get("colors-surface", "#ffffff"),
        "--text": values.get("colors-text", "#20242a"),
        "--primary": values.get("colors-primary", "#16804a"),
        "--accent": values.get("colors-accent", "#ffcc00"),
        "--border-color": values.get("colors-border", "#d7dbe0"),
        "--radius": values.get("radius", "12") + "px",
        "--border-width": values.get("border", "1") + "px",
        "--gap": values.get("gap", "16") + "px",
        "--padding": values.get("padding", "22") + "px",
        "--shadow": "4px 4px 0 var(--text)" if values.get("shadow") == "hard" else "0 8px 24px #00000014",
    }
    return ";".join(f"{key}:{html.escape(value, quote=True)}" for key, value in variables.items())
