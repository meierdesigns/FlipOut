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
Mouse: aim at the tee, move the bar in play, hold click to charge a hit. In menus the **left** click confirms and the **right** click goes back. Keyboard: **A/D or arrows** = flight direction / bar, **Space** = charge and release, `P` pause / back, `B` shop, `Tab` autopilot, `F2` hide frame, `H` tutorial help.

All keyboard shortcuts can be rebound: pause menu > Settings > Keys (two keys per action, saved in `localStorage.golfKeys2`). Esc only releases the mouse.

## Gameplay notes
- **Charge** the bar by holding click/Space (bowl or arch with the mouse); **shake it quickly** to overcharge it (full ball energy and a faster shot).
- A charged bar **catches boss shots**; caught shots become balls that you shoot at the boss and that break on impact. Every boss has its own ability.
- The **BALL CLASH** hard upgrade (HARD tab) lets balls collide and charge each other.
- **Stages** are unlocked one after another (stage map, locked ones are greyed out). A new game opens the map on the tutorial section.
- **Shop tabs** (UPS, LOOK, GFX, CHEAT, HARD) stay hidden until their secret is found: a stage with a `?` on the map hides a *shop pickup* in an obstacle or boss; collecting it pauses the game and shows the new tab. Without any tab the shop shows "SHOP'S CLOSED". A new game locks the tabs again.

## Language
English by default. The **DE/EN** button in the header switches to German and back (saved in `localStorage.golfLang`).

## Host hooks (optional)
- `body.golf-bare` (F2) hides the frame; the host app can react to it (e.g. hide the sidebar).
- Save game/settings: `localStorage` (`golf*`) / `sessionStorage`.

In MD•APP the game is only loaded through the module `content/modules/golf.md` (adapter: `src/static/components/flippout-host.css`).

## Dev mode (stage editor)
Files: `flippout-dev.js` (editor storage, **never in the deploy zip**) and `flippout-secrets.js` (shipped settings). In MD•APP both are loaded by `content/modules/golf.md`; for the standalone page see `index.html`.

With the dev file loaded, the title menu shows **VIEW STAGES**: the stage viewer becomes an editor.
- Click an obstacle (brick, block, bumper, boss) and **drag a shop tab button onto it** (or select it and click the button): the tab is hidden in that obstacle. Hover a button for a tooltip with a thumbnail of its stage.
- *Stage list* (clusters, dropdown per cluster chooses the cluster's background), *ALL* (preview all tabs/stages), *MARK* (show secrets in the field), *RELOCK*, *RESET STAGE*, *RESET ALL*.
- **EXPORT** copies the settings; paste them into `flippout-secrets.js` for the release (`{tab: {stage, obs, idx}}` plus optional `bgmap` for cluster backgrounds). Without exported secrets the release shop stays closed.

## Release (itch.io)
Version lives in `VERSION`. Bump it, then `python3 games/flippout/itch/build.py` builds `itch/flippout_<version>.zip` (older zips are moved to `itch/archive/`). The zip contains `index.html` (dev script tag removed), `flippout.js`, `flippout-secrets.js`, `flippout.css` and `LICENSE`. Tag the release: `git tag v<version>`.
