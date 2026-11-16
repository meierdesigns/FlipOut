# gamestyle

Reusable graphics style for games: design tokens, themes, components and a fixed game resolution with crisp scaling. No build, no runtime needed.

## Use in another project
Copy the `gamestyle/` folder (or symlink it), then:

```html
<link rel="stylesheet" href="gamestyle/themes/amiga.css">
<link rel="stylesheet" href="gamestyle/gamestyle.css">
<body class="theme-amiga fx-scanlines">
<div class="gs-screen"><canvas class="gs-stage"></canvas></div>
<script src="gamestyle/gamestyle.js"></script>
<script>const s = GameStyle.screen(document.querySelector('.gs-screen'));  // s.ctx, s.toLogical(e)</script>
```

Switch theme = load another `themes/<name>.css` and use the `theme-<name>` class. See `demo.html`.

## Resolution
- Each theme sets `--res-w`/`--res-h` (e.g. amiga 320×256, arcade 256×224, monochrome 160×144) and `--pixelated`.
- You draw in the logical resolution; `gamestyle.js` scales by integer factors (`integer:false` for smooth) and adapts on resize.
- `toLogical(event)` converts the mouse position to game pixels.
- Override: `GameStyle.screen(el, {width, height})` or `.gs-crisp` / `.gs-smooth` on `.gs-screen`.

## Tokens
`--bg --surface --text --primary --accent --border-color --radius --border-width --gap --padding --shadow --font-body --font-heading`

## Source
The themes in `content/themes/*.md` remain the single source (MD•APP uses them directly). After changes run `python3 games/gamestyle/build.py`. Per-theme resolutions are in `build.py` (`RES`).
