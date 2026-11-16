# MD•APP

A tiny Markdown-native application runtime for mini-apps – plus **Flipp-Out**, a pinball-style breakout / mini-golf game that runs inside it as a standalone module.

Deliberately no React, no build tooling, no database, no component framework: Python standard library on the backend, vanilla JS/CSS in the browser.

## Run

```bash
python3 app.py          # http://127.0.0.1:8000
python3 app.py 9000     # another port (or PORT=9000)
```

Requires Python 3. `requirements.txt` is empty – there are no dependencies.

The game also runs without the runtime: open `games/flippout/index.html` in a browser.

## Core idea

> Keep application logic in the runtime, content and composition in Markdown.

A page is just a `.md` file:

```md
---
title: Flipp-Out Breakout
app: golf
mode: breakout
desc: Short description for the tile
---
```

The runtime reads the frontmatter, renders the Markdown text and, for `app: golf`, attaches the game. The page stays declarative – no HTML, no JavaScript needed.

## Project structure

```
app.py                  entry point (starts src/backend/server.py)
src/                    the runtime (code)
  backend/              data & routes – no HTML markup except the Markdown renderer
    paths.py            central paths and URL prefixes (/static, /games)
    content.py          frontmatter, Markdown renderer, @module expansion, load/save pages
    theme.py            theme MD -> CSS variables
    server.py           http.server, routing, static files, POST /apps
  frontend/             presentation as Python functions (strings in, HTML string out)
    shell.py            page shell (head, sidebar, main)
    workspace.py        start page (tile grid)
    components/         one .py per component (markup only): tile, modal, new_app_form
  static/               base CSS plus per-component CSS/JS (tile, modal, flippout-host)
content/                the content (Markdown, no code)
  pages/*.md            each file = one route (/<filename>)
  modules/*.md          reusable snippets with {{ placeholders }}
  themes/*.md           theme presets
  theme.md              active theme selection
games/                  standalone games/libraries, they do not know the runtime
  flippout/             the game (+ itch/ with deploy zip and page texts)
  gamestyle/            graphics style library
docs/                   framework.md (contract), archive/ (old prototype)
```

Rule of thumb: **src** = code, **content** = Markdown, **games** = swappable foreign modules. Dependencies point one way only: content -> games/src, src -> nothing.

### Request flow

```
Browser ──GET /breakout──> server.Handler.do_GET
                             ├─ /static/*, /games/*  -> serve file (path check against the base dir)
                             └─ otherwise render_page():
                                  content.get_page(slug)      read content/pages/breakout.md, split frontmatter
                                  content.app_content(...)    Markdown -> HTML, app:golf -> content/modules/golf.md
                                  theme.load_theme()          layer theme.md over themes/<name>.md
                                  frontend.shell(...)         put everything into the shell
```

`/` (index) renders the workspace instead of a page: `content.list_pages()` returns all pages and `frontend.workspace` builds tiles from them.

### Key concepts

- **Pages = routes.** `content/pages/foo.md` is automatically `/foo` and shows up in the sidebar and as a tile. Order: `index` first, then `order` (frontmatter), then title.
- **Modules.** `content/modules/<name>.md` is an HTML template with `{{ key }}` placeholders (values are HTML-escaped). Use in a page:

  ```md
  @stats
  label: Progress
  value: 72%
  change: +8%
  @end
  ```

  or on one line: `@card title="Hello" text="World"`.
- **Minimal Markdown renderer** (`content.render`): headings, lists, paragraphs, `**bold**`, `` `code` ``. Intentionally small; input goes through `html.escape`.
- **Components know no backend.** A component is a function that takes strings and returns markup; its CSS/JS lives in `src/static/components/`. That makes components copyable to other projects.
- **Themes.** `content/theme.md` picks a preset (`theme: aqua`); values in it override that preset's tokens. `src/backend/theme.py` turns them into CSS variables (`--bg`, `--primary`, `--radius` …) on `<body>`. New theme = new file in `content/themes/`.
- **New mini-app from the UI.** The "New mini-app" modal sends `POST /apps`; `content.save_page` validates the slug (`[a-z0-9-]+`) and writes the `.md` into `content/pages/`.
- **Security (prototype).** The server binds to `127.0.0.1` only; static serving checks that the path stays inside its base directory. Not meant to be exposed to a network.

## Flipp-Out (`games/flippout/`)

Breakout where a flexible bar charges, tensions and hits the ball – through 10 worlds (Western, Vaporwave, Dungeon, Golf course …) with bosses, a shop and a mini-golf mode. Three files, no dependencies, no build; the game does not know the host app.

```html
<div data-flippout data-mode="breakout" data-label="Flipp-Out"></div>
<link rel="stylesheet" href="games/flippout/flippout.css">
<script src="games/flippout/flippout.js"></script>
```

`data-mode`: `breakout` | `golf`. Or via code: `Flippout.mount(el, {mode, label})`.

**Language:** the game is English by default. The **DE/EN** button in the game header switches the language (saved in `localStorage.golfLang`; the page reloads, progress is saved first).

### Architecture of `flippout.js`

A single IIFE (~1500 lines), deliberately without a module system so it can be embedded as one file.

- **Embedding:** `mount()` puts a template (built by `tpl()`) into the container and calls `start(game)`. `auto()` mounts every `[data-flippout]` element.
- **i18n:** all source strings are English and wrapped in `L('...')`. `DE` maps English -> German and is only consulted when the language is German; unknown strings fall back to English. To add a language, extend the dictionary and the `LANG` check.
- **Fixed render size:** drawing happens on a 300×225 canvas (4:3); CSS scales it with crisp pixels. All graphics are hand-written pixel code (`box`, `disc`, a 3×5 bitmap font in `txt`) in a 16-color Amiga-style palette – no image files.
- **Game loop:** `requestAnimationFrame` + accumulator; logic runs in fixed ~60 steps/s (`step()`), `draw()` renders once per frame. Physics is independent of the frame rate.
- **State machine:** `state` (title, world map, tee, play, shop, look, …) decides what `step()` and `draw()` do.
- **Procedural levels:** `layout()` rebuilds the playfield every round from a seed (`rnd()` is a linear congruential generator) and the width; `makeBricks()` places bricks from patterns (`brickOn`). Same seed = same level.
- **Physics:** circle-vs-segment collision (`segDist`, `bounce`), flipper bar with charge/hit mechanics, multi-ball (`split`), power-ups (`PU`).
- **Worlds & bosses:** data tables (`LEVELS`, `BOSSES`, `BATK`) – each scene has its own palette, landmarks (`drawLandmark`) and boss attack patterns.
- **Shop & meta game:** upgrades (`ITEMS`), styles/quality/cheats as tabs; cost and tier logic in `buy`/`toggle`.
- **Autopilot/Ambience:** `ambientAI()` plays by itself and shops – useful as a demo and for testing.
- **Persistence:** `localStorage` only (`golfSave_<mode>`, `golfCos`, `golfLang`, …) and `sessionStorage`; saved on `pagehide`/`visibilitychange`.
- **Input:** pointer events with pointer lock (click captures the mouse, `Esc` releases it) plus keyboard (A/D, arrows, Space, `B` shop, `Tab` autopilot, `F2` hide frame).
- **Host hooks:** `body.golf-bare` (F2) hides the frame; the host app can react to it. The adapter lives in `src/static/components/flippout-host.css` – not in the game.

More: [`games/flippout/README.md`](games/flippout/README.md). itch.io package and page texts: [`games/flippout/itch/`](games/flippout/itch/).

## gamestyle (`games/gamestyle/`)

Reusable graphics-style library for games: design tokens, themes and a fixed logical resolution with integer scaling (`GameStyle.screen(el)`, `toLogical(event)`). The themes are generated from `content/themes/*.md` (`python3 games/gamestyle/build.py`) – the MD themes stay the single source, and `build.py` uses the same token logic as `src/backend/theme.py`. Details: [`games/gamestyle/README.md`](games/gamestyle/README.md).

## Adding your own game/module

1. Put the game in its own folder `games/<name>/` (JS + CSS, mountable via a `data-` attribute).
2. Write the embed snippet as `content/modules/<name>.md` (see `content/modules/golf.md`).
3. Extend the `app:` mapping in `src/backend/content.py:app_content`.
4. Create a page `content/pages/<name>.md` with `app: <name>`.

## Philosophy

- One file per thing, readable without tooling.
- Format over framework: Markdown + frontmatter + placeholders.
- Components and games are swappable and do not know their host.

## License

MIT, see [`LICENSE`](LICENSE).
