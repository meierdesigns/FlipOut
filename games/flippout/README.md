# Flipp-Out

Breakout with a pinball feel: a flexible bar charges, tensions and hits the ball through 10 worlds (Western, Vaporwave, Dungeon, Golf course …), each with its own look, bosses and a shop. Also playable as a mini-golf variant.

Standalone game. No dependencies, no build, does not know the host app.

## Standalone
Open `games/flippout/index.html` in a browser (or run `python3 -m http.server` in the folder).

## Embed
```html
<div data-flippout data-mode="breakout" data-label="Flipp-Out"></div>
<link rel="stylesheet" href="games/flippout/flippout.css">
<script src="games/flippout/flippout.js"></script>
```
`data-mode`: `breakout` | `golf`. Or via code: `Flippout.mount(el, {mode, label})`.

## Controls
Mouse: aim at the tee, move the bar in play, hold click to charge a hit. Keyboard: **A/D or arrows** = flight direction / bar, **Space** = charge and release, `B` shop, `Tab` autopilot, `F2` hide frame, `H` tutorial help.

## Language
English by default. The **DE/EN** button in the header switches to German and back (saved in `localStorage.golfLang`).

## Host hooks (optional)
- `body.golf-bare` (F2) hides the frame; the host app can react to it (e.g. hide the sidebar).
- Save game/settings: `localStorage` (`golf*`) / `sessionStorage`.

In MD•APP the game is only loaded through the module `content/modules/golf.md` (adapter: `src/static/components/flippout-host.css`).
