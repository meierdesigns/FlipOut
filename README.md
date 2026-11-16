# MD•APP

Eine winzige Markdown-native Runtime für Mini-Apps – plus **Flipp-Out**, ein Breakout-/Minigolf-Spiel im Flipper-Stil, das als eigenständiges Modul darin läuft.

Bewusst ohne React, Build-Tooling, Datenbank oder Komponenten-Framework: Python-Standardbibliothek im Backend, Vanilla-JS/CSS im Browser.

## Starten

```bash
python3 app.py          # http://127.0.0.1:8000
python3 app.py 9000     # anderer Port (oder PORT=9000)
```

Voraussetzung: Python 3. `requirements.txt` ist leer – es gibt keine Abhängigkeiten.

Das Spiel läuft auch ganz ohne Runtime: `games/flippout/index.html` im Browser öffnen.

## Grundidee

> Anwendungslogik gehört in die Runtime, Inhalt und Zusammenstellung in Markdown.

Eine Seite ist nur eine `.md`-Datei:

```md
---
title: Flipp-Out Breakout
app: golf
mode: breakout
desc: Kurzbeschreibung für die Kachel
---
```

Die Runtime liest das Frontmatter, rendert den Markdown-Text und hängt bei `app: golf` das Spiel an. Die Seite bleibt deklarativ – kein HTML, kein JavaScript nötig.

## Projektstruktur

```
app.py                  Einstieg (startet src/backend/server.py)
src/                    die Runtime (Code)
  backend/              Daten & Routen – kein HTML-Markup außer Markdown-Render
    paths.py            zentrale Pfade und URL-Präfixe (/static, /games)
    content.py          Frontmatter, Markdown-Renderer, @module-Expansion, Seiten laden/speichern
    theme.py            Theme-MD -> CSS-Variablen
    server.py           http.server, Routing, statische Dateien, POST /apps
  frontend/             Darstellung in Python-Funktionen (Strings in, HTML-String raus)
    shell.py            Seitenrahmen (Head, Sidebar, Main)
    workspace.py        Startseite (Kachelraster)
    components/         je Komponente eine .py (nur Markup): tile, modal, new_app_form
  static/               Basis-CSS und pro Komponente CSS/JS (tile, modal, flippout-host)
content/                der Inhalt (Markdown, kein Code)
  pages/*.md            jede Datei = eine Route (/<dateiname>)
  modules/*.md          wiederverwendbare Snippets mit {{ platzhaltern }}
  themes/*.md           Theme-Presets
  theme.md              aktive Theme-Auswahl
games/                  eigenständige Spiele/Bibliotheken, kennen die Runtime nicht
  flippout/             das Spiel (+ itch/ mit Deploy-Zip und Seitentexten)
  gamestyle/            Grafikstil-Bibliothek
docs/                   framework.md (Vertrag), archive/ (alter Prototyp)
tools/                  Entwicklerwerkzeuge (VS-Code-Extension server-sidebar)
```

Faustregel: **src** = Code, **content** = Markdown, **games** = austauschbare Fremdmodule. Abhängigkeiten laufen nur in eine Richtung: content -> games/src, src -> nichts.

### Request-Fluss

```
Browser ──GET /breakout──> server.Handler.do_GET
                         ├─ /static/*, /games/*  -> Datei ausliefern (Pfad-Check gegen ROOT)
                         └─ sonst render_page():
                              content.get_page(slug)      content/pages/breakout.md lesen, Frontmatter trennen
                              content.app_content(...)    Markdown -> HTML, app:golf -> content/modules/golf.md
                              theme.load_theme()          theme.md über themes/<name>.md legen
                              frontend.shell(...)         alles in den Rahmen setzen
```

`/` (index) rendert statt einer Seite den Workspace: `content.list_pages()` liefert alle Seiten, `frontend.workspace` baut daraus Kacheln.

### Wichtige Konzepte

- **Seiten = Routen.** `content/pages/foo.md` ist automatisch `/foo` und erscheint in der Sidebar und als Kachel. Sortierung: `index` zuerst, dann `order` (Frontmatter), dann Titel.
- **Module.** `content/modules/<name>.md` ist ein HTML-Template mit `{{ key }}`-Platzhaltern (Werte werden HTML-escaped). Aufruf in einer Seite:

  ```md
  @stats
  label: Fortschritt
  value: 72%
  change: +8%
  @end
  ```

  oder einzeilig: `@card title="Hallo" text="Welt"`.
- **Minimaler Markdown-Renderer** (`content.render`): Überschriften, Listen, Absätze, `**fett**`, `` `code` ``. Absichtlich klein; Eingaben werden mit `html.escape` behandelt.
- **Komponenten kennen kein Backend.** Eine Komponente ist eine Funktion, die Strings bekommt und Markup zurückgibt; ihr CSS/JS liegt in `static/components/`. Dadurch lassen sich Komponenten in andere Projekte kopieren.
- **Themes.** `theme.md` wählt ein Preset (`theme: aqua`), Werte darin überschreiben dessen Tokens. `theme.py` macht daraus CSS-Variablen (`--bg`, `--primary`, `--radius` …) am `<body>`. Neues Theme = neue Datei in `content/themes/`.
- **Neue Mini-App aus der UI.** Das Modal „Neue Mini-App" schickt `POST /apps`; `content.save_page` validiert den Slug (`[a-z0-9-]+`) und schreibt die `.md` nach `pages/`.
- **Sicherheit (Prototyp).** Server bindet nur an `127.0.0.1`; statische Auslieferung prüft, dass der Pfad unter `ROOT` bleibt. Nicht für den Betrieb im Netz gedacht.

## Flipp-Out (`games/flippout/`)

Breakout, bei dem ein biegsamer Balken den Ball lädt, spannt und schlägt – durch 10 Welten (Western, Vaporwave, Dungeon, Golfplatz …) mit Bossen, Shop und Minigolf-Modus. Drei Dateien, keine Abhängigkeiten, kein Build; das Spiel kennt die Host-App nicht.

```html
<div data-flippout data-mode="breakout" data-label="Flipp-Out"></div>
<link rel="stylesheet" href="games/flippout/flippout.css">
<script src="games/flippout/flippout.js"></script>
```

`data-mode`: `breakout` | `golf`. Alternativ per Code: `Flippout.mount(el, {mode, label})`.

### Architektur von `flippout.js`

Eine einzige IIFE (~1500 Zeilen), bewusst ohne Module-System, damit sie als eine Datei einbettbar ist.

- **Einbettung:** `mount()` setzt ein im Skript eingebettetes HTML-Template (`TPL`) in den Container und ruft `start(game)`. `auto()` mountet alle `[data-flippout]`-Elemente.
- **Festes Render-Format:** Gezeichnet wird auf ein 300×225-Canvas (4:3); die sichtbare Größe regelt CSS mit scharfer Pixel-Skalierung. Alle Grafik ist eigener Pixel-Code (`box`, `disc`, 3×5-Bitmap-Font in `txt`) in einer 16-Farben-Palette im Amiga-Stil – keine Bilddateien.
- **Game-Loop:** `requestAnimationFrame` + Akkumulator, die Logik läuft mit festen ~60 Schritten/s (`step()`), `draw()` rendert einmal pro Frame. Dadurch ist die Physik unabhängig von der Bildrate.
- **Zustandsmaschine:** `state` (u. a. Titel, Weltkarte, Abschlag, Spiel, Shop, Look) steuert, was `step()` und `draw()` tun.
- **Prozedurale Level:** `layout()` baut das Spielfeld jede Runde neu aus einem Seed (`rnd()` ist ein linearer Kongruenzgenerator) und der Breite; `makeBricks()` platziert Steine aus Mustern (`brickOn`). Gleicher Seed = gleiches Level.
- **Physik:** Kreis-gegen-Segment-Kollision (`segDist`, `bounce`), Flipper-Balken mit Lade-/Schlagmechanik, Multi-Ball (`split`), Power-ups (`PU`).
- **Welten & Bosse:** Daten in Tabellen (`LEVELS`, `BOSSES`, `BATK`) – pro Kulisse eigene Palette, Landmarks (`drawLandmark`) und Boss-Angriffsmuster.
- **Shop & Meta-Spiel:** Upgrades (`ITEMS`), Stile/Qualität/Cheats als Tabs; Kosten- und Stufenlogik in `buy`/`toggle`.
- **Autopilot/Ambience:** `ambientAI()` spielt selbst und kauft im Shop ein – nützlich als Demo und zum Testen.
- **Persistenz:** nur `localStorage` (`golfSave_<mode>`, `golfCos`, …) und `sessionStorage`; gespeichert wird bei `pagehide`/`visibilitychange`.
- **Eingabe:** Pointer-Events mit Pointer-Lock (Klick fängt die Maus, `Esc` gibt sie frei) plus Tastatur (A/D, Pfeile, Leertaste, `B` Shop, `Tab` Autopilot, `F2` Rahmen aus).
- **Host-Hooks:** `body.golf-bare` (F2) blendet den Rahmen aus; die Host-App kann darauf reagieren. Der Adapter dafür liegt hier in `src/static/components/flippout-host.css` – nicht im Spiel.

Mehr: [`games/flippout/README.md`](games/flippout/README.md). Itch.io-Paket und Seitentexte: [`games/flippout/itch/`](games/flippout/itch/).

## gamestyle (`games/gamestyle/`)

Wiederverwendbare Grafikstil-Bibliothek für Spiele: Design-Tokens, Themes und feste logische Auflösung mit ganzzahliger Skalierung (`GameStyle.screen(el)`, `toLogical(event)`). Die Themes werden aus `content/themes/*.md` generiert (`python3 games/gamestyle/build.py`) – die MD-Themes bleiben die einzige Quelle, `build.py` nutzt dafür dieselbe Token-Logik wie `src/backend/theme.py`. Details: [`games/gamestyle/README.md`](games/gamestyle/README.md).

## Eigenes Spiel/Modul ergänzen

1. Spiel als eigenständigen Ordner in `games/<name>/` anlegen (JS + CSS, mountbar über ein `data-`-Attribut).
2. Einbinde-Snippet als `content/modules/<name>.md` schreiben (siehe `content/modules/golf.md`).
3. In `src/backend/content.py:app_content` das `app:`-Mapping ergänzen.
4. Seite `content/pages/<name>.md` mit `app: <name>` anlegen.

## Philosophie

- Eine Datei pro Sache, lesbar ohne Tooling.
- Format statt Framework: Markdown + Frontmatter + Platzhalter.
- Komponenten und Spiele sind austauschbar und kennen ihren Host nicht.

## Lizenz

MIT, siehe [`LICENSE`](LICENSE).
