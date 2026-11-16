# Flipp-Out

Breakout im Flipper-Stil: Ein biegsamer Balken lädt, spannt und schlägt den Ball; durch 10 Welten (Western, Vaporwave, Dungeon, Golfplatz …) mit eigenem Look, Bossen und Shop. Auch als Minigolf-Variante spielbar.

Eigenstaendiges Spiel Keine Abhaengigkeiten, kein Build, kennt die Host-App nicht.

## Standalone
`index.html` im Browser oeffnen (oder `python3 -m http.server` im Ordner).

## Einbinden
```html
<div data-flippout data-mode="breakout" data-label="Flipp-Out"></div>
<link rel="stylesheet" href="flippout.css">
<script src="flippout.js"></script>
```
`data-mode`: `breakout` | `golf`. Oder per Code: `Flippout.mount(el, {mode, label})`.

## Host-Hooks (optional)
- `body.golf-bare` (F2) blendet den Rahmen aus; die Host-App kann darauf reagieren (z.B. Sidebar ausblenden).
- Speicherstand/Einstellungen: `localStorage` (`golf*`) / `sessionStorage`.

