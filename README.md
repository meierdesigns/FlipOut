# MD•APP

A tiny Markdown-native application runtime for mini-apps.

## Run

```bash
python3 app.py
```

Then open http://127.0.0.1:8000

## Structure

- `app.py` — Einstieg
- `backend/` — Daten, Routen (paths, content, theme, server)
- `frontend/` — shell, workspace, components/
- `pages/` — Routen/Seiten (Markdown)
- `modules/` — wiederverwendbare Snippets; `golf.md` bindet das Spiel ein
- `apps/` — eigenständige Spiele/Apps, unabhängig von L4UNCHAPP (z.B. `apps/flippout/`, Standalone-fähig, siehe dessen README)
- `apps/gamestyle/` — Grafikstil-Bibliothek für Spiele
- `static/` — Basis-CSS, `components/` pro Komponente (inkl. `flippout-host.css`)
- `themes/`, `theme.md` — Theme-Presets / Auswahl
- `tools/server-sidebar/` — VS-Code-Extension
- `framework.md` — Framework-Vertrag

## Mini-app from MD

```md
---
title: Ingolf
app: golf
---

# Ingolf

Ein minimalistisches Golfspiel.
```

The runtime reads `app: golf` and embeds the Flipp-Out game via `modules/golf.md`.
The MD file stays declarative; HTML and JavaScript are not needed in the page.

This prototype intentionally avoids React, build tooling, a database and a large component framework.
