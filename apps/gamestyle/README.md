# gamestyle

Wiederverwendbarer Grafikstil für Spiele: Design-Tokens, Themes, Komponenten und feste Spielauflösung mit scharfer Skalierung. Kein Build, keine Runtime nötig.

## In einem anderen Projekt nutzen
Ordner `gamestyle/` kopieren (oder per Symlink einbinden), dann:

```html
<link rel="stylesheet" href="gamestyle/themes/amiga.css">
<link rel="stylesheet" href="gamestyle/gamestyle.css">
<body class="theme-amiga fx-scanlines">
<div class="gs-screen"><canvas class="gs-stage"></canvas></div>
<script src="gamestyle/gamestyle.js"></script>
<script>const s = GameStyle.screen(document.querySelector('.gs-screen'));  // s.ctx, s.toLogical(e)</script>
```

Theme wechseln = andere `themes/<name>.css` und `theme-<name>`-Klasse. Siehe `demo.html`.

## Auflösung
- Jedes Theme setzt `--res-w`/`--res-h` (z. B. amiga 320×256, arcade 256×224, monochrome 160×144) und `--pixelated`.
- Du zeichnest in der logischen Auflösung; `gamestyle.js` skaliert ganzzahlig (`integer:false` für glatt) und passt bei Resize an.
- `toLogical(event)` rechnet Mausposition in Spielpixel um.
- Überschreiben: `GameStyle.screen(el, {width, height})` oder `.gs-crisp` / `.gs-smooth` am `.gs-screen`.

## Tokens
`--bg --surface --text --primary --accent --border-color --radius --border-width --gap --padding --shadow --font-body --font-heading`

## Quelle
Die Themes in `<L4UNCHAPP>/themes/*.md` bleiben die einzige Quelle (L4UNCHAPP nutzt sie direkt). Nach Änderungen: `python3 apps/gamestyle/build.py`. Auflösungen pro Theme stehen in `build.py` (`RES`).
